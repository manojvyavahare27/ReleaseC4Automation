// compareJsons.js
const { chromium } = require('playwright');

async function compareJsons(jsonFilePath1, jsonFilePath2 = null, customJson = null) {
  //const browser = await chromium.launch();
  //const page = await browser.newPage();

  // Read the first JSON file
  const fs = require('fs');
  const jsonData1 = fs.readFileSync(jsonFilePath1, 'utf8');
  const parametersFromJson1 = JSON.parse(jsonData1);

  let parametersFromJson2 = [];

  // Read the second JSON file if provided
  if (jsonFilePath2) {
    const jsonData2 = fs.readFileSync(jsonFilePath2, 'utf8');
    parametersFromJson2 = JSON.parse(jsonData2);
  } else if (customJson && Array.isArray(customJson)) {
    // If custom JSON is provided and is an array, use it directly
    parametersFromJson2 = customJson;
  } else if (customJson && !Array.isArray(customJson)) {
    // If custom JSON is provided but not an array, wrap it in an array
    parametersFromJson2 = [customJson];
  }

  // Check if parametersFromJson2 is an array before using forEach
  if (!Array.isArray(parametersFromJson2)) {
    console.error('\n Invalid custom JSON format or no second JSON file provided.');
    await browser.close();
    return false;
  }

  // Find common keys for each object in the array
  const commonKeysArray = parametersFromJson1.map(obj1 =>
    Object.keys(obj1).filter(key => parametersFromJson2[0] && key in parametersFromJson2[0])
  );

  // Find the intersection of all common keys
  const commonKeys = commonKeysArray.reduce((acc, keys) =>
    acc.filter(key => keys.includes(key))
  );

  // Compare values of common keys for each object
  const mismatchedValues = [];
  parametersFromJson1.forEach(obj1 => {
    parametersFromJson2.forEach(obj2 => {
      commonKeys.forEach(key => {
        const value1 = obj1[key] !== null ? obj1[key].toString() : null;
        const value2 = obj2[key] !== null ? obj2[key].toString() : null;

        // Compare values ignoring date format differences
        if (isDate(value1) && isDate(value2)) {
          const date1 = value1.replace(/\//g, '-');
          const date2 = value2.replace(/\//g, '-');
          if (date1 !== date2) {
            mismatchedValues.push({
              key,
              valueFromJson1: value1,
              valueFromJson2: value2,
            });
          }
        } else if (value1 !== value2) {
          mismatchedValues.push({
            key,
            valueFromJson1: value1,
            valueFromJson2: value2,
          });
        }
      });
    });
  });

  // Log common keys
  console.log('\nThe common keys are:\n', commonKeys);

  // Log mismatched values
  console.log('\nMismatched values:\n', mismatchedValues);

  // Close browser
  //await browser.close();

  return mismatchedValues.length === 0;
}

module.exports = compareJsons;

// Function to check if the value is a date
function isDate(value) {
  const dateRegex = /\d{2}[/-]\d{2}[/-]\d{4}/;
  return dateRegex.test(value);
}
