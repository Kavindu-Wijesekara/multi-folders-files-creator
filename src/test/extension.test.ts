import * as assert from 'assert';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	let testDir: string;

	setup(() => {
		// Create a temporary directory for tests
		testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'multi-folders-files-creator-tests-'));
	});

	teardown(() => {
		// Clean up the test directory
		if (fs.existsSync(testDir)) {
			// Helper function to recursively delete a directory
			const deleteFolderRecursive = (folderPath: string) => {
				if (fs.existsSync(folderPath)) {
					fs.readdirSync(folderPath).forEach((file) => {
						const curPath = path.join(folderPath, file);
						if (fs.lstatSync(curPath).isDirectory()) {
							deleteFolderRecursive(curPath);
						} else {
							fs.unlinkSync(curPath);
						}
					});
					fs.rmdirSync(folderPath);
				}
			};
			deleteFolderRecursive(testDir);
		}
	});

	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('publisher.multi-folders-files-creator'));
	});

	test('Configuration should have default values', () => {
		const config = vscode.workspace.getConfiguration('multiFoldersFilesCreator');
		assert.strictEqual(config.get('separator'), ';');
		assert.strictEqual(config.get('defaultTemplate'), '');
		assert.strictEqual(config.get('confirmLargeOperations'), true);
		assert.strictEqual(config.get('largeOperationThreshold'), 5);
	});

	// Note: The following test is a placeholder for a real integration test
	// Real integration tests would require mocking the file system operations
	// or using the actual extension command
	test('Should handle multiple file path inputs correctly', () => {
		// Example of how to parse file paths - simulating what the extension does
		const input = 'src/index.ts;db.ts;utils/helpers.ts';
		const entries = input.split(';').map(e => e.trim()).filter(e => e !== '');

		assert.strictEqual(entries.length, 3);
		assert.strictEqual(entries[0], 'src/index.ts');
		assert.strictEqual(entries[1], 'db.ts');
		assert.strictEqual(entries[2], 'utils/helpers.ts');
	});
});
