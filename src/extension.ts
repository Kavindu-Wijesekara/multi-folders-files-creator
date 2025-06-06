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
		largeOperationThreshold: config.get<number>('largeOperationThreshold', 5),
		autoOpenFiles: config.get<boolean>('autoOpenFiles', false),
		useFileTemplates: config.get<boolean>('useFileTemplates', true)
	};
}

// Get content for a new file based on its extension
function getFileContent(filePath: string): string {
	const ext = path.extname(filePath);
	const config = getConfiguration();

	// If templates are disabled, return empty string or default template
	if (!config.useFileTemplates) {
		return config.defaultTemplate;
	}

	// Use predefined templates if enabled
	if (ext in fileTemplates) {
		let template = fileTemplates[ext];
		
		// Special handling for Java files to use actual class name
		if (ext === '.java') {
			const fileName = path.basename(filePath, '.java');
			template = `public class ${fileName} {\n\tpublic static void main(String[] args) {\n\t\t// TODO: Implement\n\t}\n}`;
		}
		
		return template;
	}

	return config.defaultTemplate;
}

// Parse the new syntax: "folder: file1, file2; file3" and "src: index.ts, api: get.ts, post.ts"
function parseInput(input: string, separator: string): Array<{path: string, isFolder: boolean}> {
	const result: Array<{path: string, isFolder: boolean}> = [];
	const segments = input.split(separator).map(s => s.trim()).filter(s => s !== '');
	
	for (const segment of segments) {
		if (segment.includes(':')) {
			// Handle complex folder syntax like "src: index.ts, api: get.ts, post.ts"
			const colonIndex = segment.indexOf(':');
			const folderPart = segment.substring(0, colonIndex).trim();
			const contentPart = segment.substring(colonIndex + 1).trim();
			
			// Add the main folder (remove extra slash)
			result.push({path: folderPart, isFolder: true});
			
			// Parse the content after the colon - need to handle nested syntax properly
			const parsedContent = parseNestedContent(contentPart, folderPart);
			result.push(...parsedContent);
		} else {
			// Handle standalone files or folders
			const isFolder = segment.endsWith('/');
			const cleanPath = isFolder ? segment.slice(0, -1) : segment;
			result.push({path: cleanPath, isFolder});
		}
	}
	
	return result;
}

// Helper function to parse nested content like "index.ts, api: get.ts, post.ts"
function parseNestedContent(content: string, parentFolder: string): Array<{path: string, isFolder: boolean}> {
	const result: Array<{path: string, isFolder: boolean}> = [];
	
	// Split by comma but be careful about nested colons
	const items: string[] = [];
	let current = '';
	let depth = 0;
	
	for (let i = 0; i < content.length; i++) {
		const char = content[i];
		if (char === ':') {
			depth++;
		} else if (char === ',' && depth === 0) {
			items.push(current.trim());
			current = '';
			continue;
		} else if (char === ',' && depth > 0) {
			// This comma belongs to nested content, keep collecting
			depth = 0; // Reset after handling nested content
		}
		current += char;
	}
	
	if (current.trim()) {
		items.push(current.trim());
	}
	
	// Now process each item
	for (const item of items) {
		if (item.includes(':')) {
			// This is a nested folder like "api: get.ts, post.ts"
			const nestedColonIndex = item.indexOf(':');
			const nestedFolder = item.substring(0, nestedColonIndex).trim();
			const nestedContent = item.substring(nestedColonIndex + 1).trim();
			
			// Add the nested folder
			const nestedFolderPath = path.join(parentFolder, nestedFolder).replace(/\\/g, '/');
			result.push({path: nestedFolderPath, isFolder: true});
			
			// Add files in the nested folder
			const nestedFiles = nestedContent.split(',').map(f => f.trim()).filter(f => f !== '');
			for (const file of nestedFiles) {
				const isFolder = file.endsWith('/');
				const cleanFileName = isFolder ? file.slice(0, -1) : file;
				const filePath = path.join(parentFolder, nestedFolder, cleanFileName).replace(/\\/g, '/');
				result.push({path: filePath, isFolder});
			}
		} else {
			// Regular file or folder in the parent folder
			const isFolder = item.endsWith('/');
			const cleanName = isFolder ? item.slice(0, -1) : item;
			const itemPath = path.join(parentFolder, cleanName).replace(/\\/g, '/');
			result.push({path: itemPath, isFolder});
		}
	}
	
	return result;
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.createMultiple', async (uri: vscode.Uri) => {
		const config = getConfiguration();

		const input = await vscode.window.showInputBox({
			placeHolder: `Example: src: index.ts, api: get.ts, post.ts${config.separator} README.md`,
			prompt: 'Use "folder: file1, file2" syntax or standalone files separated by "' + config.separator + '"'
		});

		if (!input) {
			return;
		}

		const entries = parseInput(input, config.separator);

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
			failedPaths: [] as string[],
			createdFiles: [] as string[]
		};

		try {
			for (const entry of entries) {
				const fullPath = path.join(uri.fsPath, entry.path);
				const dir = entry.isFolder ? fullPath : path.dirname(fullPath);

				try {
					// Create directories
					fs.mkdirSync(dir, { recursive: true });

					// Create file if not a directory
					if (!entry.isFolder) {
						const content = getFileContent(fullPath);
						fs.writeFileSync(fullPath, content);
						results.createdFiles.push(fullPath);
					}

					results.success++;
				} catch (error) {
					results.failed++;
					results.failedPaths.push(entry.path);
					console.error(`Failed to create ${fullPath}:`, error);
				}

				// Update status bar with current progress
				const completed = results.success + results.failed;
				statusBar.text = `$(sync~spin) Creating files... (${completed}/${entries.length})`;
			}
		} finally {
			statusBar.dispose();
		}

		// Auto-open created files if enabled
		if (config.autoOpenFiles && results.createdFiles.length > 0) {
			for (const filePath of results.createdFiles) {
				try {
					const document = await vscode.workspace.openTextDocument(filePath);
					await vscode.window.showTextDocument(document, { preview: false });
				} catch (error) {
					console.error(`Failed to open file ${filePath}:`, error);
				}
			}
		}

		// Show result message
		if (results.failed === 0) {
			const autoOpenMsg = config.autoOpenFiles && results.createdFiles.length > 0 ? ' and opened' : '';
			vscode.window.showInformationMessage(`${results.success} file(s)/folder(s) created${autoOpenMsg} successfully!`);
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
