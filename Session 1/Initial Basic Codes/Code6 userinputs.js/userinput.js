// save as inputReadline.js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', function(name) {
  console.log(`Hello, ${name}!`);
  rl.close();
});
