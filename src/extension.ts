import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.createMultiple', async (uri: vscode.Uri) => {
		const input = await vscode.window.showInputBox({
			placeHolder: 'Example: src/index.ts;db.ts;utils/helpers.ts'
		});

		if (!input) {
			return;
		}

		const entries = input.split(';').map(e => e.trim()).filter(e => e !== '');

		for (const entry of entries) {
			const fullPath = path.join(uri.fsPath, entry);
			const dir = path.dirname(fullPath);

			fs.mkdirSync(dir, { recursive: true });

			if (!entry.endsWith('/')) {
				fs.writeFileSync(fullPath, '');
			}
		}

		vscode.window.showInformationMessage('Folders/files created successfully!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
