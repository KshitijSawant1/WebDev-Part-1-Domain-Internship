const fs = require('fs');

// Write to a file
fs.writeFileSync('myfile.txt', 'Hello, this file was created by Node.js!');
console.log('File has been written.');

// Read the file content
const data = fs.readFileSync('myfile.txt', 'utf-8');
console.log(' Content of the file:');
console.log(data);
