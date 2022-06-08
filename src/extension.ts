import * as vscode from "vscode";
import { getKeywords } from "./utils";
import type { Keyword } from "./utils";

let keywords = getKeywords(vscode.workspace.getConfiguration("keyword-o-mat").get("defaultKeywords"));

vscode.workspace.onDidChangeConfiguration(() => {
	keywords = getKeywords(vscode.workspace.getConfiguration("keyword-o-mat").get("defaultKeywords"));
});

const cycleKeyword = (keywords: Keyword<Keyword<string>>) => {
	const activeTextEditor = vscode.window.activeTextEditor;
	if (!activeTextEditor) return;

	const document = activeTextEditor.document;
	const activeKeywords = { ...keywords.user, ...keywords.global };
	if (!activeKeywords) return;

	let selections: any = activeTextEditor.selections;
	if (!selections.length) return;

	selections = sortSelections(document, selections);
	const empties: boolean[] = [];

	activeTextEditor
		.edit((editBuilder: vscode.TextEditorEdit) => {
			selections.forEach((selection: any) => {
				let range = null;

				if (selection.isEmpty) {
					empties.push(true);
					range = document.getWordRangeAtPosition(selection.start);
					if (!range) return;
				} else {
					empties.push(false);
					range = selection.with();
				}

				const nextKeyword = activeKeywords[document.getText(range)];
				if (nextKeyword) editBuilder.replace(range, nextKeyword);
			});
		})

		.then(() => {
			let newSelections = activeTextEditor.selections;
			newSelections = activeTextEditor.selections = newSelections.map((selection, index) => {
				return empties[index] ? new vscode.Selection(selection.end, selection.end) : selection;
			});

		});
};

const sortSelections = (document: vscode.TextDocument, selections: vscode.Selection[]) => {
	return selections.sort((selectionA, selectionB) => {
		const offsetA = document.offsetAt(selectionA.start);
		const offsetB = document.offsetAt(selectionB.start);
		return -(offsetA < offsetB) || +(offsetA > offsetB) || 0;
	});
};

const cycleFwd = () => cycleKeyword(keywords.adders);
const cycleBwd = () => cycleKeyword(keywords.subtractors);

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("keyword-o-mat.cycleForward", () => cycleFwd()));
	context.subscriptions.push(vscode.commands.registerCommand("keyword-o-mat.cycleBackward", () => cycleBwd()));
}

export function deactivate() { }
