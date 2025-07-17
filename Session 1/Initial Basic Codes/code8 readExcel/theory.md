# Reading Excel Files in Node.js Using `xlsx`

- In web development or automation tasks, it is often necessary to read data from Excel files.
- In Node.js, the popular `xlsx` package allows us to read `.xlsx` files and convert them into a format (like JSON) that is easy to work with.

---

## `xlsx` Module: 

- `xlsx` is a Node.js module used to read and write Excel files.
- It supports formats like `.xlsx`, `.xls`, and `.csv`.
- You can install it with:

```bash
npm install xlsx

Example Code: readExcel.js
// readExcel.js

const XLSX = require("xlsx");  // Load the xlsx module

// Read the Excel file
const workbook = XLSX.readFile("people.xlsx");

// Get the first sheet name
const sheetName = workbook.SheetNames[0];

// Access the sheet data
const worksheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

// Print the result
console.log("Data from Excel file:");
console.log(data);
```
 ### Output in the Terminal:
 Data from Excel file:
[
  { Name: 'Alice', Age: 25, City: 'Mumbai' },
  { Name: 'Bob', Age: 30, City: 'Delhi' },
  { Name: 'Charlie', Age: 22, City: 'Pune' }
]
## Explanation of the commands 

| Line / Command                             | What It Does                                                       |
|--------------------------------------------|---------------------------------------------------------------------|
| `const XLSX = require("xlsx");`            | Imports the `xlsx` module so we can use its functions              |
| `XLSX.readFile("people.xlsx")`             | Opens and reads the Excel file named `people.xlsx`                 |
| `workbook.SheetNames[0]`                   | Gets the name of the first worksheet in the Excel file             |
| `workbook.Sheets[sheetName]`               | Accesses the actual content of the selected worksheet              |
| `XLSX.utils.sheet_to_json(worksheet)`      | Converts the worksheet into an array of objects (JSON format)      |
| `console.log(data)`                        | Prints the final JSON data to the terminal                         |

## Summary

| Function                         | Purpose                                |
|----------------------------------|----------------------------------------|
| `XLSX.utils.json_to_sheet()`     | Converts JSON data to Excel format     |
| `XLSX.utils.book_new()`          | Creates a new workbook                 |
| `XLSX.utils.book_append_sheet()` | Adds worksheet to workbook             |
| `XLSX.writeFile()`               | Saves Excel file to disk               |