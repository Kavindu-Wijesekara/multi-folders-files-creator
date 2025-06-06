# Contributing to Multi Folders & Files Creator

Thank you for your interest in contributing to Multi Folders & Files Creator! This guide will help you get started.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- [Visual Studio Code](https://code.visualstudio.com/)

### Setting Up the Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/Kavindu-Wijesekara/multi-folders-files-creator.git
   cd multi-folders-files-creator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open the project in VS Code:
   ```bash
   code .
   ```

4. Press `F5` to start debugging. This will open a new VS Code window with the extension loaded.

### Making Changes

1. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the codebase.

3. Test your changes by pressing `F5` in VS Code.

4. Run linting and tests:
   ```bash
   npm run lint
   npm test
   ```

5. Commit your changes with a descriptive commit message:
   ```bash
   git commit -m "Add feature: your feature description"
   ```

### Pull Requests

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a pull request against the main repository.

3. Describe your changes in the pull request description.

4. Ensure all checks pass before requesting a review.

## Adding New Templates

To add a new file template:

1. Open `src/extension.ts`
2. Find the `fileTemplates` object
3. Add a new entry for your file extension with the template content

Example:
```typescript
const fileTemplates: Record<string, string> = {
    // Existing templates...
    '.vue': '<template>\n\t<div>\n\t\t\n\t</div>\n</template>\n\n<script>\nexport default {\n\tname: "Component"\n}\n</script>\n\n<style scoped>\n\n</style>',
};
```

## Code Style

- Use TypeScript for all new code
- Follow the existing code style (enforced by ESLint)
- Write meaningful commit messages
- Update documentation when necessary

## License

By contributing, you agree that your contributions will be licensed under the project's license.

Thank you for contributing!
