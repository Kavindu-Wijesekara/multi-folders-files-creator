#!/bin/bash

# Script to help package and publish the extension

# Ensure we have the latest dependencies
echo "Installing dependencies..."
npm install

# Lint the code
echo "Linting..."
npm run lint

# Compile the code
echo "Compiling..."
npm run compile

# Run tests
echo "Running tests..."
npm test

# Package the extension
echo "Packaging extension..."
npx @vscode/vsce package

echo "------------------------------"
echo "Extension packaged successfully!"
echo "You can find the .vsix file in the current directory."
echo ""
echo "To install the extension locally, run:"
echo "code --install-extension multi-folders-files-creator-0.0.1.vsix"
echo ""
echo "To publish to the VS Code Marketplace, you need to:"
echo "1. Create a publisher account at https://marketplace.visualstudio.com/manage"
echo "2. Get a Personal Access Token"
echo "3. Run: npx @vscode/vsce publish -p <your-access-token>"
echo "------------------------------"
