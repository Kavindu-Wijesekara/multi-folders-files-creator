# Multi Folders & Files Creator

A Visual Studio Code extension that allows you to create multiple folders and files at once with a simple syntax.

## Features

- Create multiple files and folders with a single command
- Automatically create parent directories if they don't exist
- Use file templates based on file extensions
- Customize the separator character and other settings
- Support for status reporting and error handling

### How It Works

Right-click on any folder in the explorer and select "Create Multiple Folders or Files":

![Context Menu](https://raw.githubusercontent.com/Kavindu-Wijesekara/multi-folders-files-creator/main/images/context-menu.png)

Enter the paths separated by semicolons (or your custom separator):

![Input Box](https://raw.githubusercontent.com/Kavindu-Wijesekara/multi-folders-files-creator/main/images/input-box.png)

All files and folders are created instantly:

![Result](https://raw.githubusercontent.com/Kavindu-Wijesekara/multi-folders-files-creator/main/images/result.png)

## Usage

1. Right-click on a folder in the Explorer panel
2. Select "Create Multiple Folders or Files" from the context menu
3. Enter the paths you want to create, separated by semicolons (by default)
   - End paths with `/` to create folders
   - Paths without `/` at the end will create files
   - Nested paths will automatically create parent directories

### Examples

```
src/components/Button.js;src/components/Header.js;src/styles/main.css
```
Creates three files: Button.js, Header.js, and main.css, with their respective parent directories.

```
src/utils/;src/components/;src/assets/images/
```
Creates three folders: utils, components, and images (with its parent directory assets).

```
models/User.js;models/Product.js;controllers/
```
Creates two files (User.js and Product.js) and one folder (controllers).

## Extension Settings

This extension contributes the following settings:

* `multiFoldersFilesCreator.separator`: Character used to separate multiple file/folder paths (default: `;`)
* `multiFoldersFilesCreator.defaultTemplate`: Default content for new files without a specific template (default: empty)
* `multiFoldersFilesCreator.confirmLargeOperations`: Show a confirmation dialog when creating many files/folders at once (default: `true`)
* `multiFoldersFilesCreator.largeOperationThreshold`: Number of files/folders that triggers the confirmation dialog (default: `5`)

## Supported File Templates

The extension automatically adds templates for these file types:

- `.ts` - TypeScript files
- `.js` - JavaScript files
- `.html` - HTML files
- `.css` - CSS files
- `.json` - JSON files
- `.md` - Markdown files
- `.py` - Python files
- `.java` - Java files
- `.c` - C files
- `.cpp` - C++ files

## Release Notes

### 0.0.1

- Initial release
- Basic functionality to create multiple files and folders
- File templates for common file types
- Configuration options for customization
- Status reporting and error handling

## Upcoming Features

- Custom templates for different file types
- Ability to save and reuse common file structures
- Command palette support
- Support for workspace-specific templates
- Preview mode to see what will be created before confirming

---

## Contributing

Feel free to open issues or PRs on the [GitHub repository](https://github.com/Kavindu-Wijesekara/multi-folders-files-creator).

**Enjoy!**
