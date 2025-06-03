const { chromium, expect } = require('@playwright/test')
const fs = require('fs');
const XLSX = require('xlsx');

async function convertExcelToJson(excelFilePath, jsonFilePath) {
//Excel to JSON Convertor for patient
  if(excelFilePath){
    const workbook = XLSX.readFile(excelFilePath);
    const jsonData = {};
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      jsonData[sheetName] = XLSX.utils.sheet_to_json(worksheet);
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    });
    return true
  }
  return false
}
module.exports = convertExcelToJson;