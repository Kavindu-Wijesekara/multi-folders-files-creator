import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// File templates for different file types
const fileTemplates: Record<string, string> = {
	'.ts': '// TypeScript file created with multi-folders-files-creator\n',
	'.js': '// JavaScript file created with multi-folders-files-creator\n',
	'.html': '<!DOCTYPE html>\n<html>\n<head>\n\t<title>New Page</title>\n\t<meta charset="utf-8">\n</head>\n<body>\n\t\n</body>\n</html>',
	'.css': '/* CSS file created with multi-folders-files-creator */\n',
	'.json': '{\n\t\n}',
	'.md': '# New Markdown File\n\n',
	'.py': '# Python file created with multi-folders-files-creator\n',
	'.java': 'public class NewFile {\n\tpublic static void main(String[] args) {\n\t\t// TODO: Implement\n\t}\n}',
	'.c': '#include <stdio.h>\n\nint main() {\n\t// TODO: Implement\n\treturn 0;\n}',
	'.cpp': '#include <iostream>\n\nint main() {\n\t// TODO: Implement\n\treturn 0;\n}',
};

// Get configuration
function getConfiguration() {
	const config = vscode.workspace.getConfiguration('multiFoldersFilesCreator');
	return {
		separator: config.get<string>('separator', ';'),
		defaultTemplate: config.get<string>('defaultTemplate', ''),
		confirmLargeOperations: config.get<boolean>('confirmLargeOperations', true),
		largeOperationThreshold: config.get<number>('largeOperationThreshold', 5)
	};
}

// Get content for a new file based on its extension
function getFileContent(filePath: string): string {
	const ext = path.extname(filePath);
	const config = getConfiguration();

	if (ext in fileTemplates) {
		return fileTemplates[ext];
	}

	return config.defaultTemplate;
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.createMultiple', async (uri: vscode.Uri) => {
		const config = getConfiguration();

		const input = await vscode.window.showInputBox({
			placeHolder: `Example: src/index.ts${config.separator}db.ts${config.separator}utils/helpers.ts`,
			prompt: 'Enter paths separated by "' + config.separator + '". End with "/" for folders.'
		});

		if (!input) {
			return;
		}

		const entries = input.split(config.separator).map(e => e.trim()).filter(e => e !== '');

		// Confirm large operations
		if (config.confirmLargeOperations && entries.length > config.largeOperationThreshold) {
			const confirm = await vscode.window.showWarningMessage(
				`You're about to create ${entries.length} files/folders. Do you want to continue?`,
				'Yes', 'No'
			);
			if (confirm !== 'Yes') {
				return;
			}
		}

		// Create status bar item for progress
		const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
		statusBar.text = `$(sync~spin) Creating files...`;
		statusBar.show();

		const results = {
			success: 0,
			failed: 0,
			failedPaths: [] as string[]
		};

		try {
			for (const entry of entries) {
				const fullPath = path.join(uri.fsPath, entry);
				const dir = path.dirname(fullPath);

				try {
					// Create directories
					fs.mkdirSync(dir, { recursive: true });

					// Create file if not a directory
					if (!entry.endsWith('/')) {
						const content = getFileContent(fullPath);
						fs.writeFileSync(fullPath, content);
					}

					results.success++;
				} catch (error) {
					results.failed++;
					results.failedPaths.push(entry);
					console.error(`Failed to create ${fullPath}:`, error);
				}

				// Update status bar
				statusBar.text = `$(sync~spin) Creating files... (${results.success}/${entries.length})`;
			}
		} finally {
			statusBar.dispose();
		}

		// Show result message
		if (results.failed === 0) {
			vscode.window.showInformationMessage(`${results.success} file(s)/folder(s) created successfully!`);
		} else {
			const message = `${results.success} file(s)/folder(s) created, ${results.failed} failed.`;
			const details = 'Show Details';

			const action = await vscode.window.showErrorMessage(message, details);
			if (action === details) {
				const outputChannel = vscode.window.createOutputChannel('Multi Folders Files Creator');
				outputChannel.appendLine('Failed to create the following files/folders:');
				results.failedPaths.forEach(p => outputChannel.appendLine(`- ${p}`));
				outputChannel.show();
			}
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	// Clean up resources when the extension is deactivated
}
