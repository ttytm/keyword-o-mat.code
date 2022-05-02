import * as vscode from "vscode";
import { cycleFwd, cycleBwd } from "./keyword-o-mat";

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("keyword-o-mat.cycleForward", () =>
			cycleFwd()
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("keyword-o-mat.cycleBackward", () =>
			cycleBwd()
		)
	);
}

export function deactivate() {}
