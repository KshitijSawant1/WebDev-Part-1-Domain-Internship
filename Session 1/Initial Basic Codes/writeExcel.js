//npm install xlsx
// writeExcel.js
const XLSX = require('xlsx');

// Your data (array of objects)
const data = [
  { Name: "Alice", Age: 25, City: "Mumbai" },
  { Name: "Bob", Age: 30, City: "Delhi" },
  { Name: "Charlie", Age: 22, City: "Pune" }
];

// Convert data to worksheet
const worksheet = XLSX.utils.json_to_sheet(data);

// Create a new workbook and append the sheet
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "People");

// Write to Excel file
XLSX.writeFile(workbook, "people.xlsx");

console.log("✅ Excel file 'people.xlsx' created successfully!");
