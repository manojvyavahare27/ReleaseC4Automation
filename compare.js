const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Define paths to JSON files relative to the root directory
  const jsonFilePath1 = path.join('./a.json');
  const jsonFilePath2 = path.join('./b.json');

  console.log("path added successfully")

  // Read the first JSON file
  const fs = require('fs');
  const jsonData1 = fs.readFileSync(jsonFilePath1, 'utf8');
  const parametersFromJson1 = JSON.parse(jsonData1);
 // console.log("JSON read successfully from file 1")
  // Read the second JSON file
  const jsonData2 = fs.readFileSync(jsonFilePath2, 'utf8');
  const parametersFromJson2 = JSON.parse(jsonData2);
  //console.log("JSON read successfully from file 2")
  // Compare parameters from both JSON files
  if (JSON.stringify(parametersFromJson1) === JSON.stringify(parametersFromJson2)) {
    console.log('Parameters from both JSON files match!');
  } else {
    console.log('Parameters from both JSON files do not match!');
  }

  // Close browser
  await browser.close();
})();
