const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql");

//import { test, expect } from "@playwright/test";
const connectToDatabase = require("../../../manoj").default;
const { executeQuery } = require("../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../compareFileOrJson";


import { test, expect, Page, chromium } from '@playwright/test';
import logger from '../../../Pages/BaseClasses/logger'
import LoginPage from '../../../Pages/BaseClasses/LoginPage';
import Homepage from '../../../Pages/BaseClasses/Homepage';
import PatientSearch from '../../../Pages/PatientDomain/PatientSearch';
import PatientDetails from '../../../Pages/PatientDomain/PatientDetails'
import Environment from '../../../Pages/BaseClasses/Environment';
import Menu  from '../../../Pages/BaseClasses/Menu';
import PatientWizard from '../../../Pages/PatientDomain/PatientWizard';
import PatientDuplicateCheck from '../../../Pages/PatientDomain/PatientDuplicateCheck';
import Demographics from '../../../Pages/PatientDomain/Demographics';
//import PatientWizard from '../../Pages/PatientWizard';
//import PatientWizard from '../../Pages/PatientWizard';
import AddPatient from '../../../Pages/PatientDomain/AddPatient';
import AddAddress from '../../../Pages/PatientDomain/AddAddress';
import AddPIP from '../../../Pages/PatientDomain/AddPIP';
import ViewPIP from '../../../Pages/PatientDomain/ViewPIP';
import AddGP from '../../../Pages/PatientDomain/AddGP';
import PrintIDCard from '../../../Pages/PatientDomain/PrintIDCard';
import ConfirmExisting from '../../../Pages/PatientDomain/ConfirmExisting';
import TopBlueBar from '../../../Pages/BaseClasses/TopBlueBar';
import EditPatient from '../../../Pages/PatientDomain/EditPatient'

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")))
const pipdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))
const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json")));

test.describe("Login Tests", () => {
    jsonData.addPatient.forEach(async (data, index) => {
      test("Patient ${data.pat_firstname} Demographics Details", async ({ page }) => {
    const loginpage=new LoginPage(page)
    const homepage=new Homepage(page)
    const environment=new Environment(page) 
    const patientsearch=new PatientSearch(page)
    const patientduplicatecheck=new PatientDuplicateCheck(page)
    const addpatient=new AddPatient(page)
    const addaddress=new AddAddress(page)
    const demogrphics=new Demographics(page)
    const addpip=new AddPIP(page)
    const viewpip=new ViewPIP(page)
    const addgp=new AddGP(page)
    const printidcard=new PrintIDCard(page)
    const confirmexisting=new ConfirmExisting(page)
    const menu=new Menu(page)
    const topbluebar=new TopBlueBar(page)
    const editpatient=new EditPatient(page)

    await page.goto(environment.Test);
    await loginpage.enterUsername(jsonData.loginDetails[0].username);
    logger.info("Username enter successfully");
    await loginpage.enter_Password(jsonData.loginDetails[0].password);
    logger.info("Password enter successfully");
    await loginpage.clickOnLogin();
    logger.info("Clicked on Login button successfully");
    await homepage.clickonSidebarHomeIcon()
    await homepage.clickOnPatientIcon()    
    await patientsearch.clickOnSearchButton()    
    await patientsearch.enterGivenName(jsonData.addPatient[index].pat_firstname.toString());
    await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname.toString());
    await patientsearch.clickOnSearchButton()
    //await page.pause()
    await patientsearch.clickOnSearchPatientLink()
    await page.waitForTimeout(1000)
    // await patientsearch.ClickOnNoConfirmLegitimateRelationship()
    // await patientsearch.clickOnSearchPatientLink()
    // await patientsearch.ClickOnYesConfirmLegitimateRelationship()
    await patientsearch.clickOnBackbuttonOnPatientSearch()
    await page.waitForTimeout(1000)
    //await confirmexisting.clickOnConfirmExistingDetails()
    
    await topbluebar.clickOnBannerButtonKeyboardArrow()
    await topbluebar.ClickOnViewAllContactDetails()

    //Click On Links
    // await demogrphics.ClickOnLinkLinks()
    // await demogrphics.ClickOnLinkDetails()
    // await demogrphics.ClickOnCloseAllPopup()

    await demogrphics.ClickOnLinkLinks()
    await demogrphics.ClickOnLinkPatientIdentifier()
    await demogrphics.ClickOnCloseAllPopup()

    // await demogrphics.ClickOnLinkLinks()
    // await demogrphics.ClickOnLinkPIP()
    // await demogrphics.ClickOnCloseAllPopup()

    await demogrphics.ClickOnLinkLinks()
    await demogrphics.ClickOnLinkQAndA()
    await demogrphics.ClickOnCloseAllPopup()

    await demogrphics.ClickOnLinkLinks()
    await demogrphics.ClickOnLinkSummary()
    await demogrphics.ClickOnCloseAllPopup()

    await demogrphics.ClickOnLinkLinks()
    await demogrphics.ClickOnLinkWorkList()
    await demogrphics.ClickOnCloseAllPopup()

    await demogrphics.ClickOnLinkLinks()
    await demogrphics.ClickOnLinkTest()
    await demogrphics.SelectDropdownTestPatient()
    //await expect(page.getByText('Successfully marked patient as test patient')).toHaveText('Successfully marked patient as test patient')
    
    await topbluebar.clickOnBannerButtonKeyboardArrow()
    await topbluebar.ClickOnViewAllContactDetails()
 

    //Expands Patient Details on demographics page
    await demogrphics.ClickOnExpandsPatientInformation()
    //await demogrphics.ClickOnExpandsPatientInformation()
    await demogrphics.ClickOnExpandsPatientIdentifier()
    await demogrphics.ClickOnExpandsPatientIdentifier()
    await demogrphics.ClickOnExpandsPatientAddress()
    await demogrphics.ClickOnExpandsPatientAddress()
    await demogrphics.ClickOnExpandsPatientPIP()
    await demogrphics.ClickOnExpandsPatientPIP()
    await demogrphics.ClickOnExpandsPatientGP()
    await demogrphics.ClickOnExpandsPatientGP()

    //await page.pause()
    await demogrphics.SelectRadioButtonForConsentForPhotographcsNo()
    await demogrphics.SelectRadioButtonForConsentForPhotographcsYes()
    await demogrphics.ClickSaveButtonForConsentForPhotographcs()


    await topbluebar.clickOnTopBlueBar()
    
    await page.waitForTimeout(3000)
    await editpatient.clickOnPatientDetails()
    await editpatient.clickOnPatientAddress() 
    await editpatient.clickOnPatientDetails()
      
    // await expect(page.getByText('Sex required')).toHaveText('Sex required')
    // await expect(page.getByText('Ethnicity required')).toHaveText('Ethnicity required')
    // await expect(page.getByText('Religion required')).toHaveText('Religion required')
   // await page.pause()
    await editpatient.selectSexualOrientation(jsonData.editPatient[index].pat_sexual_orientation_eli_text)
    //await editpatient.selectCurrentlyPrgenant(jsonData.editPatient[index].pat_currently_pregnant_yes)
    //await editpatient.selectSexDropdown()
    await editpatient.selectEthnicityDropdown(jsonData.editPatient[index].pat_ethnicity_text)
    await editpatient.selectReligionDropdown(jsonData.editPatient[index].pat_religion)
    //await editpatient.selectPrimaryDisablity()
    await editpatient.selectPrisoner(jsonData.editPatient[index].pat_prisoner_yes)
    
    await editpatient.clickOnSaveForPatientDetails()
    await expect(page.getByText('Patient updated successfully')).toHaveText('Patient updated successfully')    
    await editpatient.clickOnPatientAddress()   
    await editpatient.clickOnSaveForPatientDetails() 
   // await expect(page.getByText('Patient address added successfully')).toHaveText('Patient address added successfully')
    await editpatient.clickOnPatientPIP()    
    //await page.pause()
    await editpatient.enterIntoSearchGP('Wednesday')

    await editpatient.clickOnViewPIPLink()

    await page.waitForTimeout(2000)
    await editpatient.clickOnClosePIPAddressPopup() 
    await editpatient.clickOnExportListbtn()    
    //await editpatient.clickOnViewforInterestedPartyList()
    await page.waitForTimeout(2000)
   // await editpatient.clickOnAddressPIP()
    //await page.pause()
    await editpatient.clickOnExportToCSVLink()
    await page.waitForTimeout(1000)
    await editpatient.clickOnExportToExcelLink()
    await page.waitForTimeout(1000)
    await editpatient.clickOnExportToXMLLink()
    await page.waitForTimeout(1000)
    await editpatient.clickOnExportToPDFLink()
    await page.waitForTimeout(1000)
    await editpatient.clickOnCloseInterestedPartyPopup()  
    await editpatient.clickOnPatientGP()    
    await editpatient.clickOnPrintIdCard()

    //////// Patient Detail comparison/////////
    var sqlQuery =
    "select * from patients where pat_hospital_ref= '" +
    data.pat_hospital_ref +
    "' order by pat_id desc limit 1";
  var sqlFilePath = "SQLResults/PatientDomain/patientData.json";
  var results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Patient Details stored into the database: \n", results);
  const patId = results[0].pat_id;
  const patAddId = results[0].pat_add_id;
  const patEgpId=results[0].pat_egp_Id
  var match = await compareJsons(sqlFilePath, null, data);
  if (match) {
    console.log(
      "\n Patient Details Comparision: Parameters from both JSON files match!\n"
    );
  } else {
    console.log(
      "\n Patient Details Comparision: Parameters from both JSON files do not match!\n"
    );
  }

  //////// Patient UNique Identifier comparison/////////
  sqlQuery =
    "Select pid_value from patient_identifiers where pid_pat_id=" + patId;
  sqlFilePath = "SQLResults/PatientDomain/patientIData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  match = 0;
  if (
    results[0].pid_value == jsonData.patientIdentifier[index].pid_value1
  ) {
    if (
      results[1].pid_value == jsonData.patientIdentifier[index].pid_value2
    )
      match = 1;
  } else if (
    results[0].pid_value == jsonData.patientIdentifier[index].pid_value2
  ) {
    if (
      results[1].pid_value == jsonData.patientIdentifier[index].pid_value1
    )
      match = 1;
  }
  if (match) {
    console.log(
      "\n Patient Identifier Comparision: Parameters from both JSON files match!\n"
    );
  } else {
    console.log(
      "\n Patient Identifier Comparision: Parameters from both JSON files do not match!\n"
    );
  }

  //////// Permanent Address Detail comparison/////////
  sqlQuery = "select * from addresses where add_id=" + patAddId;
  sqlFilePath = "SQLResults/PatientDomain/patientAddressData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(
    sqlFilePath,
    null,
    jsonData.permanentAddress[index]
  );
  if (match) {
    console.log("\n Patient Permanent Address Details Comparision: Parameters from both JSON files match!\n");
  } else {
    console.log("\n Patient Permanent Address Details Comparision: Parameters from both JSON files do not match!\n");
  }

  //////// Temporary Address Detail comparison/////////
  sqlQuery =
    "select * from addresses where add_pat_id=" +
    patId +
    " and add_temp_permanent='T' order by 1 desc limit 1;";
  sqlFilePath = "SQLResults/PatientDomain/patientTempAddressData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath,null,jsonData.tempAddress[index]);
  if (match) {
    console.log("\n Patient Temporary Address Details Comparision: Parameters from both JSON files match!\n");
  } else {
    console.log("\n Patient Temporary Address Details Comparision: Parameters from both JSON files do not match!\n");
  }

  //////// PIP Detail comparison/////////
  sqlQuery =
    "select * from patient_interested_parties where pip_pat_id=" + patId;
  sqlFilePath = "SQLResults/PatientDomain/patientPIPData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  const pipAddId = results[0].pip_add_id;
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath, null, jsonData.pip[index]);
  if (match) {
    console.log(
      "\n PIP Details Comparision: Parameters from both JSON files match!\n"
    );
  } else {
    console.log(
      "\n PIP Details Comparision: Parameters from both JSON files do not match!\n"
    );
  }

  //////// PIP Address Detail comparison/////////
  sqlQuery = "select * from addresses where add_id=" + pipAddId;
  sqlFilePath = "SQLResults/PatientDomain/patientPIPAddressData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath, null, jsonData.permanentAddress[index]);
  if (match) {
    console.log(
      "\n PIP Permanent Address Details Comparision: Parameters from both JSON files match!\n"
    );
  } else {
    console.log(
      "\n PIP Permanent Address Details Comparision: Parameters from both JSON files do not match!\n"
    );
  }

  //////// Added GP Detail comparison/////////
  sqlQuery =
    "select * from establishment_gps where egp_gp_code='" + jsonData.addGP[index].egp_gp_code +"' order by 1 desc limit 1";
  sqlFilePath = "SQLResults/PatientDomain/patientNewGPData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  const egpId= results[0].egp_Id
  const egpAddId=results[0].egp_add_id
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath, null, jsonData.addGP[index]);
  if (match) {
    console.log("\n GP Details Comparision: Parameters from both JSON files match!\n");
  } else {
    console.log("\n GP Details Comparision: Parameters from both JSON files do not match!\n");
  }

  //////// Patient GP Detail comparison/////////
  if(patEgpId==egpId)
  {        
      console.log("\n Newly created GP was linked successfully! \n");
    } else {
      console.log("\n Newly created GP was not linked to the patient!\n" );       
  }

 ////////  GP Address comparison/////////
  sqlQuery = "select * from addresses where add_id="+ egpAddId +"";
  sqlFilePath = "SQLResults/PatientDomain/patientGPAddressData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath, null, jsonData.gpAddress[index]);
  if (match) {
    console.log(
      "\n Patient GP Address comparison: Parameters from both JSON files match!\n"
    );
  } else {
    console.log(
      "\n Patient GP Address comparison: Parameters from both JSON files do not match!\n"
    );
  }

  await menu.clickOnLogout();
    
    //await page.pause()

      })
});
});
