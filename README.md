# Multi Folders & Files Creator

A Visual Studio Code extension that allows you to create multiple folders and files at once with an intuitive syntax using `folder: file1, file2` notation.

## Features

- Create multiple files and folders with a single command
- Automatically create parent directories if they don't exist
- Use file templates based on file extensions
- Customize the separator character and other settings
- Support for status reporting and error handling

### How It Works

Right-click on any folder in the explorer and select "Create Multiple Folders or Files":

![Context Menu](https://raw.githubusercontent.com/Kavindu-Wijesekara/multi-folders-files-creator/main/images/context-menu.png)

Enter the folder and file structure using the new syntax:

![Input Box](https://raw.githubusercontent.com/Kavindu-Wijesekara/multi-folders-files-creator/main/images/input-box.png)

All files and folders are created instantly:

![Result](https://raw.githubusercontent.com/Kavindu-Wijesekara/multi-folders-files-creator/main/images/result.png)

## Usage

1. Right-click on a folder in the Explorer panel
2. Select "Create Multiple Folders or Files" from the context menu
3. Use the new intuitive syntax:
   - `folder: file1, file2` - Creates a folder with multiple files inside
   - `standalone.js` - Creates a standalone file
   - Combine with semicolons: `src: index.ts, api: get.ts, post.ts; README.md`

### Examples

**Create organized folder structure:**
```
src: index.ts, api: get.ts, post.ts; README.md
```
Creates:
```
src/
├── index.ts
└── api/
    ├── get.ts
    └── post.ts
README.md
```

**Create multiple folders with files:**
```
components: Button.js, Header.js; styles: main.css, theme.css; utils/
```
Creates:
```
components/
├── Button.js
└── Header.js
styles/
├── main.css
└── theme.css
utils/
```

**Mix folders and standalone files:**
```
models: User.js, Product.js; controllers: auth.js; config.json
```
Creates:
```
models/
├── User.js
└── Product.js
controllers/
└── auth.js
config.json
```

## Extension Settings

This extension contributes the following settings:

* `multiFoldersFilesCreator.separator`: Character used to separate multiple file/folder paths (default: `;`)
* `multiFoldersFilesCreator.defaultTemplate`: Default content for new files without a specific template (default: empty)
* `multiFoldersFilesCreator.confirmLargeOperations`: Show a confirmation dialog when creating many files/folders at once (default: `true`)
* `multiFoldersFilesCreator.largeOperationThreshold`: Number of files/folders that triggers the confirmation dialog (default: `5`)
* `multiFoldersFilesCreator.autoOpenFiles`: Automatically open created files in the editor (default: `false`)
* `multiFoldersFilesCreator.useFileTemplates`: Use predefined templates for file types, disable to create empty files (default: `true`)

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
