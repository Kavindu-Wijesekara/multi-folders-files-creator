# Change Log

All notable changes to the "Multi Folders & Files Creator" extension will be documented in this file.

## [0.1.0] - 2025-06-06

### Added
- **Preview Mode**: Visual tree structure preview showing files/folders before creation
- Modal dialog with file type icons for quick preview
- Detailed output channel view for large operations
- New configuration option: `multiFoldersFilesCreator.showPreview`

### Fixed
- Nested folder parsing now properly handles syntax like `src: index.ts, api: get.ts, post.ts`
- Path normalization removes double slashes in folder paths
- Progress counter now shows accurate completed vs total items
- Java templates now use actual filename for class names instead of generic "NewFile"

### Improved
- Better tree structure parsing with proper indentation
- Enhanced user experience with visual confirmations

## [0.0.1] - 2025-06-04

### Added
- Initial release of Multi Folders & Files Creator
- Feature to create multiple files and folders at once
- Support for file templates based on file extensions
- Configuration options for customization
- Error handling and status reporting
- Confirmation dialog for large operations