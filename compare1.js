const { chromium } = require('playwright');
const path = require('path');
const moment = require('moment');


(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Define paths to JSON files relative to the root directory
  const jsonFilePath1 = path.join('./a.json');
  const jsonFilePath2 = path.join('./b.json');

  // Read the first JSON file
  const fs = require('fs');
  const jsonData1 = fs.readFileSync(jsonFilePath1, 'utf8');
  const parametersFromJson1 = JSON.parse(jsonData1);

  // Read the second JSON file
  const jsonData2 = fs.readFileSync(jsonFilePath2, 'utf8');
  const parametersFromJson2 = JSON.parse(jsonData2);

// // Compare the values of multiple parameters
// const newDate = new Date(parametersFromJson2.BornDate)
// //console.log("new date",newDate)

// newDate.setHours(0)
// newDate.setMinutes(0)
// newDate.setSeconds(0)
// newDate.setMilliseconds(0);

// const BornDate=moment(newDate).format("DD/MM/YYYY")
// console.log(newDate)

// console.log(BornDate)
// parametersFromJson2.BornDate=BornDate



const parametersToCompare = ['pat_firstname', 'New_FamilyName','BornDate']; // Add more parameters as needed
let allMatch = true;

parametersToCompare.forEach(param => {
    console.log(param)
    console.log('1st File',parametersFromJson1[param])
    console.log('2nd File',parametersFromJson2[param])
  if (parametersFromJson1[param] == parametersFromJson2[param]) {
    console.log(`Values of '${param}' from both JSON files match!`);
    allMatch = false;
  }
 
});

// if (allMatch) {
//   console.log('Values of all parameters from both JSON files match!');
// }

  // Close browser
  await browser.close();
})();
