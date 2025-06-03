// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let lastEditor: vscode.TextEditor | undefined;

	const disposable = vscode.commands.registerCommand('extension.exitInsertModeOnblur', () => {
		vscode.window.onDidChangeWindowState((state: vscode.WindowState) => {
			const config = vscode.workspace.getConfiguration('exitInsertModeOnblur');
			const exitOnFocusLost = config.get('exitOnFocusLost');

			if (!state.focused && exitOnFocusLost) {
				vscode.commands.executeCommand('extension.vim_escape');
			}
		});

		vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
			const config = vscode.workspace.getConfiguration('exitInsertModeOnblur');
			const exitOnTabChange = config.get('exitOnTabChange');

			if (lastEditor !== editor && exitOnTabChange) {
				vscode.commands.executeCommand('extension.vim_escape');
				lastEditor = editor;
			}
		});
	});

	context.subscriptions.push(disposable);
	vscode.commands.executeCommand('extension.exitInsertModeOnblur');
}
exports.activate = activate;

// This method is called when your extension is deactivated
export function deactivate() {
	module.exports = {
		activate,
		deactivate,
	};
}
