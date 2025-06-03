const XLSX = require('xlsx');

async function executeScriptsFromExcel(page, filePath,SheetNamesi,SheetName) {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[SheetNamesi];
  const worksheet = workbook.Sheets[SheetName];

  // Convert the worksheet to JSON
  const data = XLSX.utils.sheet_to_json(worksheet);

  // Iterate over each row (each set of credentials)
  for (const row of data) {
    // Extract username and password from the row
    const username = row.Username;
    const password = row.Password;

    // Execute login logic using username and password
    await page.goto(loginUrl);
    await page.fill(loginSelector.username, username);
    await page.fill(loginSelector.password, password);
    await page.click(loginSelector.loginButton);

    await page.waitForTimeout(2000);
    }
}

module.exports = { executeScriptsFromExcel };
