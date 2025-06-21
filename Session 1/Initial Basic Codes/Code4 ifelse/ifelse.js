/*let number = 7;

if (number % 2 === 0) {
  console.log(`${number} is even`);
} else {
  console.log(`${number} is odd`);
}
*/

let num = parseInt(process.argv[2]);

if (isNaN(num)) {
  console.log("Please provide a valid number.");
} else if (num > 0) {
  console.log(`${num} is positive`);
} else if (num < 0) {
  console.log(`${num} is negative`);
} else {
  console.log(`The number is zero`);
}
