# Writing Excel Files in Node.js using `xlsx`

In Node.js, you can **create and write Excel files** using the `xlsx` module. This is useful when you want to export data such as user lists, reports, logs, or records in `.xlsx` format.

### What is an .xlsx file?
An .xlsx file is the standard file format used by Microsoft Excel to store spreadsheet data. It is commonly used for organizing, analyzing, and storing data in tabular form.

### Technical Overview
.xlsx stands for Excel Open XML Spreadsheet.

Introduced by Microsoft Office 2007 as a replacement for the older .xls format.

It is based on XML (Extensible Markup Language) and stored as a ZIP archive of multiple XML files.

## Step 1: Install the `xlsx` Module

Before using, install it via npm:

```bash
npm install xlsx
```
### Example:
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

console.log("Excel file 'people.xlsx' created successfully!");

## Concept Breakdown

| Line / Function                                | Description                                             |
|------------------------------------------------|---------------------------------------------------------|
| `require('xlsx')`                              | Imports the `xlsx` module                               |
| `data = [...]`                                 | Sample data to write to the Excel file                  |
| `XLSX.utils.json_to_sheet(data)`               | Converts JSON data into a worksheet format              |
| `XLSX.utils.book_new()`                        | Creates a new Excel workbook                            |
| `XLSX.utils.book_append_sheet(workbook, sheet, name)` | Adds the worksheet to the workbook with a given sheet name |
| `XLSX.writeFile(workbook, "filename.xlsx")`    | Writes the workbook to an Excel file                    |

### How to Run
- Save the file as writeExcel.js.
- Open terminal in the same directory.
- Run the script using:node writeExcel.js
- It will create people.xlsx in your project folder.

## Summary

| Function                         | Purpose                                |
|----------------------------------|----------------------------------------|
| `XLSX.utils.json_to_sheet()`     | Converts JSON data to Excel format     |
| `XLSX.utils.book_new()`          | Creates a new workbook                 |
| `XLSX.utils.book_append_sheet()` | Adds worksheet to workbook             |
| `XLSX.writeFile()`               | Saves Excel file to disk               |

