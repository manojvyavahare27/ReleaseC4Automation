const { chromium } = require('playwright');
const path = require('path');
//const moment = require('moment');


(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Define paths to JSON files relative to the root directory
  const jsonFilePath1 = path.join('./SearchPatientDetailsQueryResult.json');
  const jsonFilePath2 = path.join('./PatientSearchNetworkTabResult.json');

  // Read the first JSON file
  const fs = require('fs');
  const jsonData1 = fs.readFileSync(jsonFilePath1, 'utf8');
  const parametersFromJson1 = JSON.parse(jsonData1);
  //console.log(parametersFromJson1)

  // Read the second JSON file
  const jsonData2 = fs.readFileSync(jsonFilePath2, 'utf8');
  const parametersFromJson2 = JSON.parse(jsonData2);

  const parametersToCompare = ['patFirstname', 'patSurname','patDob','patSex']; // Add more parameters as needed
  let allMatch = true;

  let i=0;
  parametersToCompare.forEach(param => {
    if (parametersFromJson1[0][param] == parametersFromJson2[0][param])
     {
       console.log(`Values of '${param}' from both JSON files match!`);
       allMatch = false;
     }
     else
     {
      console.log(`Values of '${param}' from both JSON files did not match!`)
     }
    }
  )

  if (allMatch) {
  console.log('Values of all parameters from both JSON files match!');
}
 // Close browser
  await browser.close();
})();
