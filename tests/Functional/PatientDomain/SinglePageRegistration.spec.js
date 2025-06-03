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
//import PatientWizard from '../../Pages/PatientWizard';
//import PatientWizard from '../../Pages/PatientWizard';
import AddPatient from '../../../Pages/PatientDomain/AddPatient';
import AddAddress from '../../../Pages/PatientDomain/AddAddress';
import AddPIP from '../../../Pages/PatientDomain/AddPIP';
import ViewPIP from '../../../Pages/PatientDomain/ViewPIP';
import AddGP from '../../../Pages/PatientDomain/AddGP';
import PrintIDCard from '../../../Pages/PatientDomain/PrintIDCard'
import SinglePageRegistration from '../../../Pages/PatientDomain/SinglePageRegistration'
import EditPatient from '../../../Pages/PatientDomain/EditPatient';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")))
const pipdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))

const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json")))
// // Array to store console logs
 const consoleLogs = [];
 
 test.describe("Login Tests", () => {
  jsonData.SPaddPatient.forEach(async (data, index) => {
    test(`Single page Registration for Patient ${data.pat_firstname} - ${index}`, async ({ page }) => {
    const loginpage=new LoginPage(page)
    const homepage=new Homepage(page)
    const environment=new Environment(page) 
    const patientsearch=new PatientSearch(page)
    const patientduplicatecheck=new PatientDuplicateCheck(page)
    const addpatient=new AddPatient(page)
    const addaddress=new AddAddress(page)
    const addpip=new AddPIP(page)
    const viewpip=new ViewPIP(page)
    const addgp=new AddGP(page)
    const printidcard=new PrintIDCard(page)
    const singlepage=new SinglePageRegistration(page)
    //const patientwizard=new PatientWizard(page)
    const editpatient=new EditPatient(page)

    const menu=new Menu(page)
   
    await page.goto(environment.Test);
    await loginpage.enterUsername(jsonData.loginDetails[0].username);
    logger.info("Username enter successfully");
    await loginpage.enter_Password(jsonData.loginDetails[0].password);
    logger.info("Password enter successfully");
    await loginpage.clickOnLogin();
    logger.info("Clicked on Login button successfully");
    await homepage.clickonSidebarHomeIcon()

    await page.pause()
    await homepage.clickOnPatientIcon()   
    await patientsearch.enterGivenName(data.pat_firstname);
    logger.info("Given Name entered successfully");
      await patientsearch.enterFamilyName(data.pat_surname);
      logger.info("Family Name entered successfully");

      await patientsearch.selectSex(data.pat_sex);
      await patientsearch.selectBornDate(data.pat_dob);
    await patientsearch.clickOnSearchButton()
    await patientsearch.clickOnAddPatientbutton()
    await patientduplicatecheck.clickOnDuplicateCheckButton()    
    await expect(page.getByText('Photo Identification required')).toHaveText('Photo Identification required')
    await expect(page.getByText('Photo Identification ID required')).toHaveText('Photo Identification ID required')
    await expect(page.getByText('Middle name(s) is required')).toHaveText('Middle name(s) is required')
   // await expect(page.getByText('Baby born in this hospital required')).toHaveText('Baby born in this hospital required')
    await page.pause()
			await patientduplicatecheck.selectUniqueIdentification()
			// await patientduplicatecheck.enterUniqueIdentificationId(patientdetailsdata.UniqueIdentificationId)
			await patientduplicatecheck.enterUniqueIdentificationId(jsonData.SPpatientIdentifier[index].pid_value1.toString())
			await patientduplicatecheck.selectPhotoIdentification()
			await patientduplicatecheck.enterPhotoIdentification(jsonData.SPpatientIdentifier[index].pid_value2.toString())
			await patientduplicatecheck.selectIssuingCountry(jsonData.SPpatientIdentifier[index].pat_country)
      await patientduplicatecheck.selectTitle(data.pat_title)
			await patientduplicatecheck.enterMiddleName(data.pat_middlename)
			await patientduplicatecheck.enterMaidenName(patientdetailsdata.MaidenName)
      await page.pause()
    //await page.pause()
    //Is baby born in hospital
    //await patientduplicatecheck.selectIsBabyBornInHospital()
    //Is baby born in hospital
  const dateValue = await page.$eval('#Born', textbox => textbox.value);
  const selectedDate = new Date(dateValue);
  const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  const currentDate = new Date();
  // Format the date into DD/MM/YYYY
  //const currentDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

  const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const differenceInMs = currentDateOnly-selectedDateOnly;
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
  console.log(differenceInDays);
 // await page.pause()
  // Check if the difference is less than 5 days
  if (differenceInDays < 5) {
	// await expect(page.getByText('Baby born in this hospital required')).toHaveText('Baby born in this hospital required')

    // console.log("Date is less than 5 days from current date");
	// await patientduplicatecheck.selectIsBabyBornInHospital()
  } else {
    console.log("Date is not less than 5 days from current date");
  }
      await patientduplicatecheck.enterMobileNumber(jsonData.SPpatientIdentifier[index].pid_value1.toString())
			await patientduplicatecheck.enterEmailId(jsonData.SPpatientIdentifier[index].add_email)  
    await patientduplicatecheck.clickOnDuplicateCheckButton()
    //await expect(page.getByText('Duplicate Patients not found')).toHaveText('Duplicate Patients not found')   
    await patientduplicatecheck.clickOnCreatePatientButton()
    

    // Single page Registration
    //await page.pause()
    await singlepage.selectMarritalStatus(jsonData.SPaddPatient[index].pat_marital_status)
    await singlepage.selectReligion(jsonData.SPaddPatient[index].pat_religion)
    await singlepage.selectSourceOfReferral(jsonData.AddReferral[index].SourceOFReferral)
    await singlepage.SelectService(jsonData.AddReferral[index].cli_name)
    await singlepage.selectServiceLocation(jsonData.SPaddPatient[index].ref_clinic_type)
    //await singlepage.SelectServiceType()
    await singlepage.selectConsultant()
    await singlepage.selectPatientType(jsonData.SPaddPatient[index].pat_type)
    await page.pause()
    await singlepage.selectAppointmentType()
    await singlepage.selectMethodOfArrival(jsonData.AddReferral[index].ref_method_of_arrival)
    await singlepage.selectReferralReason(jsonData.AddReferral[index].ReferralReason)
    await singlepage.SelectCountryOfBirth(jsonData.SPaddPatient[index].pat_country_of_birth)
    await singlepage.selectLanguage(jsonData.SPaddPatient[index].pat_language)
    await singlepage.selectEthnicity(jsonData.SPaddPatient[index].pat_ethnicity_text)
    await singlepage.selectOccupation(jsonData.SPaddPatient[index].pat_occupation)
   // await editpatient.selectCurrentlyPregnant()
    await singlepage.selectNationality(jsonData.SPaddPatient[index].pat_nationality)
    //Add Address
    await page.pause()
    await singlepage.enterRoadAndNo(jsonData.SPAddress[index].add_address1)
    await singlepage.enterTown(jsonData.SPAddress[index].add_address3)
    await singlepage.enterDistrict(jsonData.SPAddress[index].add_address2)
    await singlepage.enterCounty(jsonData.SPAddress[index].add_address4)
    await singlepage.enterPostCode(jsonData.SPAddress[index].add_address5)
    await singlepage.enterCountry(jsonData.SPAddress[index].add_address6)
    //await singlepage.enterCountry()
   // 
    await singlepage.clickOnSavebtn()
    
    await page.pause()
    
    ////////// Patient Detail comparison/////////
    // var sqlQuery = "select use_est_id from users where use_username="+jsonData.loginDetails[0].username;
    // var sqlFilePath = "SQLResults/PatientDomain/SPestablishmentId.json";
    // var results = await executeQuery(sqlQuery, sqlFilePath);
    // const estId= results[0].est_id;

    // sqlQuery = "select est_code_preference from establishments where est_id="+estId; 
    // sqlFilePath = "SQLResults/PatientDomain/SPestablishmentCodePref.json";
    // results = await executeQuery(sqlQuery, sqlFilePath);
    // const estcodepreference= results[0].est_code_preference;
    // if(estcodepreference=='N'){
    //   sqlQuery = 
    //   "select * from patients where pat_nhs_ref= '" +
    //   data.pat_nhs_ref +
    //   "' order by pat_id desc limit 1";
    // }
    // else if(estcodepreference=='I'){
    //   sqlQuery = 
    //   "select * from patients where pat_identifier= '" +
    //   data.pat_identifier +
    //   "' order by pat_id desc limit 1";
    // }
    // else if(estcodepreference=='H'){
    //   sqlQuery = 
    //   "select * from patients where pat_hospital_ref= '" +
    //   data.pat_hospital_ref +
    //   "' order by pat_id desc limit 1";
    // }

    //////// Patient Detail comparison/////////
    sqlQuery = "select * from patients where pat_firstname='"+ data.pat_firstname+"'"; 
  sqlFilePath = "SQLResults/PatientDomain/SPpatientData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Patient Details stored into the database: \n", results);
  const patId = results[0].pat_id;
  const patAddId = results[0].pat_add_id;
  const patEgpId=results[0].pat_egp_Id
  var match = await compareJsons(sqlFilePath, null, data);
  if (match) {
    console.log("\n Patient Details Comparision: Parameters from both JSON files match!\n"
    );
  } else {
    console.log(
      "\n Patient Details Comparision: Parameters from both JSON files do not match!\n"
    );
  }

  //////// Patient UNique Identifier comparison/////////
  // sqlQuery = "Select pid_value from patient_identifiers where pid_pat_id=" + patId;
  // sqlFilePath = "SQLResults/PatientDomain/SPpatientIData.json";
  // results = await executeQuery(sqlQuery, sqlFilePath);
  // match = 0;
  // if (results[0].pid_value == jsonData.patientIdentifier[index].pid_value1) {
  //     if (
  //         results[1].pid_value == jsonData.patientIdentifier[index].pid_value2
  //     )
  //         match = 1;
  // } else if (results[0].pid_value == jsonData.patientIdentifier[index].pid_value2) {
  //     if (
  //         results[1].pid_value == jsonData.patientIdentifier[index].pid_value1
  //     )
  //         match = 1;
  // }
  // if (match) {
  //     console.log(
  //         "\n Patient Identifier Comparision: Parameters from both JSON files match!\n"
  //     );
  // } else {
  //     console.log(
  //         "\n Patient Identifier Comparision: Parameters from both JSON files do not match!\n"
  //     );
  // }

  //////// Permanent Address Detail comparison/////////
  sqlQuery = "select * from addresses where add_id=" + patAddId;
  sqlFilePath = "SQLResults/PatientDomain/SPpatientAddressData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath,null,jsonData.SPAddress[index]);
  if (match) {
    console.log("\n Patient Permanent Address Details Comparision: Parameters from both JSON files match!\n");
  } else {
    console.log("\n Patient Permanent Address Details Comparision: Parameters from both JSON files do not match!\n");
  }

  //////// Temporary Address Detail comparison/////////
  sqlQuery =
    "select * from addresses where add_pat_id="+ patId +"";
  sqlFilePath = "SQLResults/PatientDomain/SPpatientTempAddressData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath,null,jsonData.SPtempAddress[index]);
  if (match) {
    console.log("\n Patient Temporary Address Details Comparision: Parameters from both JSON files match!\n");
  } else {
    console.log("\n Patient Temporary Address Details Comparision: Parameters from both JSON files do not match!\n");
  }

  //////// PIP Detail comparison/////////
  sqlQuery =
    "select * from patient_interested_parties where pip_pat_id=" + patId;
  sqlFilePath = "SQLResults/PatientDomain/SPpatientPIPData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  const pipAddId = results[0].pip_add_id;
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath, null, jsonData.SPpip[index]);
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
  sqlFilePath = "SQLResults/PatientDomain/SPpatientPIPAddressData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath, null, jsonData.pipAddress[index]);
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
  sqlFilePath = "SQLResults/PatientDomain/SPpatientNewGPData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  const egpId= results[0].egp_Id
  const egpAddId=results[0].egp_add_id
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath, null, jsonData.SPaddGP[index]);
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
  sqlQuery = "select * from addresses where add_id="+ egpAddId;
  sqlFilePath = "SQLResults/PatientDomain/SPpatientGPAddressData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath, null, jsonData.SPgpAddress[index]);
  if (match) {
    console.log(
      "\n Patient GP Address comparison: Parameters from both JSON files match!\n"
    );
  } else {
    console.log(
      "\n Patient GP Address comparison: Parameters from both JSON files do not match!\n"
    );
  }
/// NEED TO CONFIRM WHAT DATA IS BEING SENT ///
      // //////// Patient Referral comparison///////// 
      const query ="select * from referrals where ref_pat_id="+patId+" order by 1 desc limit 1"  
      //// const query ="select add_email, add_mobile, add_phone,pat_name_other_lang, pat_need_interpreter_at_appointments from patients join addresses on pat_add_id = add_id where pat_hospital_ref= '" + data.pat_hospital_ref +"'";
      const patSqlFile = "SQLResults/PatientDomain/SPsinglePatientReferralDetails.json";
      results = await executeQuery(query, patSqlFile);
      console.log("\n Patient Details stored into the database: \n", results);
      //const jsonFilePath1 ="TestDataWithJSON/PatientDomain/singlePatientReferralDetails.json";
      var match1 = await compareJsons(patSqlFile, null, data);
      if (match1) {
        console.log("\n Patient Referral Comparision: Parameters from both JSON files match!\n");
      } else {
        console.log("\n Patient Referral Comparision: Parameters from both JSON files do not match!\n");
      }

  await page.waitForTimeout(2000)  
  await menu.clickOnMenubtn()
  await menu.clickOnLogout()
  });
});
});