import * as vscode from "vscode";
import { readFileSync } from "fs";
import { join } from "path";

type Keyword<T = any> = {
	[key: string]: T;
};

const keywords = {
	global: createKeywordMap(false, "./keywords/global.json"),
};
const keywordsReversed = {
	global: createKeywordMap(true, "./keywords/global.json"),
};

export function cycleFwd() {
	changeKeyword(keywords);
}

export function cycleBwd() {
	changeKeyword(keywordsReversed);
}

// Load jsonfiles and create keywordmaps
function createKeywordMap(reverse: boolean, ...pathnames: string[]) {
	const keywords: Keyword<string> = {};

	pathnames.forEach((pathname) => {
		const lists: string[][] = JSON.parse(
			readFileSync(join(__dirname, pathname), "utf-8")
		);

		if (reverse) {
			lists.map((row: Keyword) => row.reverse()).reverse();
		}

		lists.forEach((pair) => {
			pair.forEach(
				(value, index) => (keywords[value] = pair[index + 1] || pair[0])
			);
		});
	});

	return keywords;
}

function changeKeyword(keywords: Keyword<Keyword<string>>) {
	const activeTextEditor = vscode.window.activeTextEditor;

	if (!activeTextEditor) return;

	const document = activeTextEditor.document;

	const languageKeywords = keywords.global;

	// const languageKeywords = keywords[document.languageId];
	// if (!languageKeywords) return;

	let selections: any = activeTextEditor.selections;
	const empties: boolean[] = [];

	if (!selections.length) return;

	selections = sortSelections(document, selections);

	activeTextEditor
		.edit((editBuilder: vscode.TextEditorEdit) => {
			selections.forEach((selection) => {
				let range = null;

				if (selection.isEmpty) {
					empties.push(true);
					range = document.getWordRangeAtPosition(selection.start);
					if (!range) return;
				} else {
					empties.push(false);
					range = selection.with();
				}

				const nextKeyword = languageKeywords[document.getText(range)];

				if (nextKeyword) editBuilder.replace(range, nextKeyword);
			});
		})
		.then(() => {
			let newSelections = activeTextEditor.selections;

			newSelections = activeTextEditor.selections = newSelections.map(
				(selection, index) => {
					return empties[index]
						? new vscode.Selection(selection.end, selection.end)
						: selection;
				}
			);
		});
}

function sortSelections(
	document: vscode.TextDocument,
	selections: vscode.Selection[]
) {
	return selections.sort((selectionA, selectionB) => {
		const offsetA = document.offsetAt(selectionA.start);
		const offsetB = document.offsetAt(selectionB.start);

		return -(offsetA < offsetB) || +(offsetA > offsetB) || 0;
	});
}
