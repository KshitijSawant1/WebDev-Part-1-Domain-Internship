const prompt = require("prompt-sync")();
//hello user
function hellouser(name) {
  console.log(`Hello ${name} user`);
}

// Positive and Negative
function posneg() {
  console.log();
  console.log("Positive Negative");

  let num = 2;
  if (num >= 0) {
    console.log("Positive");
  } else {
    console.log("Negative");
  }
}

// Even or Odd
function evnodd() {
  console.log();
  console.log("Even Odd");

  let num = 2;
  if (num % 2 == 0) {
    console.log("Even");
  } else {
    console.log("Odd");
  }
}

// Table Code
function tablecode(num) {
  console.log();
  console.log("Table Code");
  for (let i = 1; i <= 10; i++) {
    console.log(`${num} × ${i} = ${num * i}`);
  }
}

// 0 to N
function zeroton(n) {
  console.log();
  console.log("Zero to N");
  for (let i = 0; i <= n; i++) {
    console.log(i);
  }
}

// N to 0
function ntozero(n) {
  console.log();
  console.log("N to Zero Print");
  for (let i = n; i >= 0; i--) {
    console.log(i);
  }
}

//Fibonacci Series
function fibo(n) {
  console.log();
  console.log("Fibbonacci Series");

  a = 0;
  b = 1;
  console.log(a);
  console.log(b);
  for (i = 2; i < n; i++) {
    c = a + b;
    console.log(c);
    a = b;
    b = c;
  }
}

//fizzBuzz
function FBZ(n) {
  console.log();
  console.log("Fizz Buzz Code");
  for (i = 1; i <= n; i++) {
    if (i % 3 == 0) {
      console.log("Fizz");
      if (i % 5 == 0) {
        console.log("Buzz");
      }
    } else {
      console.log(i);
    }
  }
}

//Factorial
function factn(n) {
  console.log();
  console.log("Factorial Code");
  factres = 1;
  for (i = 1; i <= n; i++) {
    factres = factres * i;
  }
  console.log(`Factorial of number ${n} is ${factres}`);
}

//Matrix addition
function matadd() {
  console.log();
  console.log("Matrix Addition");

  a = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  b = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  c = [[], [], []];
  for (i = 0; i <= 2; i++) {
    for (j = 0; j <= 2; j++) {
      c[i][j] = a[i][j] + b[i][j];
    }
  }
  console.log(c);
}

//Linear Search
function LS() {
  console.log();
  console.log("Linear Search");
  key = prompt("Enter your Key Value : ");
  Data = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  console.log(Data);
  Flag = false;
  index = 0;
  n = Data.length;
  for (i = 0; i <= n; i++) {
    if (key == Data[i]) {
      index = i;
      Flag = true;
      break;
    }
  }
  if (Flag == true) {
    console.log(`Key ${key} Found at Index : ${index}`);
  } else {
    console.log("Element Not found");
  }
}
// Function Calling
LS();
let name = prompt("Enter your name : ");
hellouser(name);

posneg();
evnodd();

let tn = Number(prompt("Enter the number for Table: "));
tablecode(tn);

let ztn = Number(prompt("Enter value for 0 to N: "));
zeroton(ztn);

let ntz = Number(prompt("Enter value for N to 0: "));
ntozero(ntz);

let fibn = Number(prompt("Enter value for Fibonnaci Series: "));
fibo(fibn);

matadd();

let fizbiz = Number(prompt("Enter value for Fizz Buzz Range: "));
FBZ(fizbiz);

let factnum = Number(prompt("Enter value for Factorial: "));
factn(factnum);
