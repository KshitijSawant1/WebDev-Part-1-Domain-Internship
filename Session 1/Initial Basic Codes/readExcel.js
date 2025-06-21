// readExcel.js
const XLSX = require("xlsx");

// Read the Excel file
const workbook = XLSX.readFile("people.xlsx");

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

console.log("📄 Data from Excel file:");
console.log(data);
