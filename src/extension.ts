// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let lastEditor: vscode.TextEditor | undefined;

	const disposable = vscode.commands.registerCommand('extension.vim_exit_insertmode_onblur', () => {
		vscode.window.onDidChangeWindowState((state: vscode.WindowState) => {
			if (!state.focused) {
				vscode.commands.executeCommand('extension.vim_escape');
			}
		});
		vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
			if (lastEditor !== editor) {
				vscode.commands.executeCommand('extension.vim_escape');
				lastEditor = editor;
			}
		});
	});

	context.subscriptions.push(disposable);
	vscode.commands.executeCommand('extension.vim_exit_insertmode_onblur');
}
exports.activate = activate;

// This method is called when your extension is deactivated
export function deactivate() {
	module.exports = {
		activate,
		deactivate,
	};
}
