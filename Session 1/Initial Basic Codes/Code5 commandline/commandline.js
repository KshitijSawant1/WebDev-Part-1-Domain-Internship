// commandLine.js

// process.argv[0] -> node
// process.argv[1] -> filename
// process.argv[2] -> first input
// process.argv[3] -> second input

const num1 = parseInt(process.argv[2]);
const num2 = parseInt(process.argv[3]);
console.log(isNaN(num1))
console.log(isNaN(num2))

if (isNaN(num1) || isNaN(num2)) {
  console.log("Please provide two valid numbers.");
} else {
  console.log(`The sum of ${num1} and ${num2} is ${num1 + num2}`);
}
