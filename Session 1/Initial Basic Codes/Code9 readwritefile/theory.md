# Reading and Writing Files in Node.js

- In Node.js, we use the built-in **File System (fs)** module to interact with the file system.
- This allows us to create, read, write, update, and delete files programmatically — without needing any external libraries.

## File Operations used for:
- Automate file generation (logs, reports, backups)
- Save or load user data
- Create or read configuration files
- Build applications that work with local files (CLI tools, data parsers, etc.)

## Step 1: The `fs` Module
- The `fs` (short for **File System**) module is included with Node.js.
- No need to install anything separately.
```js
const fs = require('fs');
```
## Example Code: Writing and Reading a File

// fileOperations.js
const fs = require('fs');

// Write to a file
fs.writeFileSync('myfile.txt', 'Hello, this file was created by Node.js!');
console.log('File has been written.');

// Read the file content
const data = fs.readFileSync('myfile.txt', 'utf-8');
console.log('Content of the file:');
console.log(data);

## Commands used in the code

| Line / Function                                | Description                                                              |
|------------------------------------------------|--------------------------------------------------------------------------|
| `const fs = require('fs');`                    | Imports Node.js's built-in File System module                            |
| `fs.writeFileSync('filename', 'content')`      | Writes the content into a file (creates the file if it doesn't exist)    |
| `'myfile.txt'`                                 | The name of the file to write to                                         |
| `'Hello, this file was created by Node.js!'`   | The content to be written to the file                                    |
| `console.log(...)`                             | Prints confirmation message to the terminal                              |
| `fs.readFileSync('filename', 'utf-8')`         | Reads the content of the file as a string (using `'utf-8'` encoding)     |
| `console.log(data)`                            | Displays the content of the file on the console                          |

### How to Run This Script
- Save the code to a file named readwritefile.js
- Open your terminal/command prompt
- Run the script with Node.js:
node readwritefile.js

 ### Output
File has been written.
Content of the file:
Hello, this file was created by Node.js!

## Summary

| Function / Parameter        | Purpose                                      |
|-----------------------------|----------------------------------------------|
| `fs.writeFileSync()`        | Write data to a file (synchronous method)    |
| `fs.readFileSync()`         | Read data from a file (synchronous method)   |
| `'utf-8'`                   | Encoding type to get readable string output  |
| `console.log()`             | Output message or data to terminal           |