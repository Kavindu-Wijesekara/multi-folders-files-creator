# Custom Templates

This file contains examples of custom templates you can set in your configuration.

## TypeScript File
```typescript
// TypeScript file created with multi-folders-files-creator
// Author: Your Name
// Created: <%= new Date().toLocaleDateString() %>

export interface IExample {
    method(): void;
}

export class Example implements IExample {
    public method(): void {
        console.log('Hello, World!');
    }
}
```

## JavaScript File
```javascript
// JavaScript file created with multi-folders-files-creator
// Author: Your Name
// Created: <%= new Date().toLocaleDateString() %>

class Example {
    method() {
        console.log('Hello, World!');
    }
}

module.exports = Example;
```

## React Component
```jsx
import React from 'react';
import './style.css';

function Component() {
    return (
        <div className="component">
            <h1>New Component</h1>
            <p>This component was created with multi-folders-files-creator</p>
        </div>
    );
}

export default Component;
```

## Python File
```python
# Python file created with multi-folders-files-creator
# Author: Your Name
# Created: <%= new Date().toLocaleDateString() %>

class Example:
    def method(self):
        print("Hello, World!")

if __name__ == "__main__":
    Example().method()
```

To use these templates, copy the content and set it as your `multiFoldersFilesCreator.defaultTemplate` in settings.json,
or create file-specific templates in your extension config.
