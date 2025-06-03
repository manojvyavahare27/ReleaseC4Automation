const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql");

const { test, expect } = require("@playwright/test");
const connectToDatabase = require("../../../manoj").default;
const { executeQuery } = require("../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../compareFileOrJson"; // Update the path accordingly

import logger from "../../../Pages/BaseClasses/logger";
import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import PatientSearch from "../../../Pages/PatientDomain/PatientSearch";
import PatientDetails from "../../../Pages/PatientDomain/PatientDetails";
import Environment from "../../../Pages/BaseClasses/Environment";
import Menu from "../../../Pages/BaseClasses/Menu";
import PatientWizard from "../../../Pages/PatientDomain/PatientWizard";
import PatientDuplicateCheck from "../../../Pages/PatientDomain/PatientDuplicateCheck";
import AddPatient from "../../../Pages/PatientDomain/AddPatient";
import AddAddress from "../../../Pages/PatientDomain/AddAddress";
import AddPIP from "../../../Pages/PatientDomain/AddPIP";
import ViewPIP from "../../../Pages/PatientDomain/ViewPIP";
import AddGP from "../../../Pages/PatientDomain/AddGP";
import PrintIDCard from "../../../Pages/PatientDomain/PrintIDCard";
import { TIMEOUT } from "dns";
import { error } from "console";

const logindata = JSON.parse(
  JSON.stringify(require("../../../TestData/PatientDomain/Login.json"))
);
const patientdetailsdata = JSON.parse(
  JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json"))
);
const pipdetailsdata = JSON.parse(
  JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json"))
);
const gpdata = JSON.parse(
  JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json"))
);
//const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/ExcelToJSON.json")))

const jsonData = JSON.parse(
  JSON.stringify(
    require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json")
  )
);

// // Array to store console logs
const consoleLogs = [];

test.describe("Login Tests", () => {
  jsonData.addPatient.forEach(async (data, index) => {
    test(`Register New Patient ${data.pat_firstname}`, async ({ page }) => {
      //	try {
      const loginpage = new LoginPage(page);
      const homepage = new Homepage(page);
      const environment = new Environment(page);
      const patientsearch = new PatientSearch(page);
      const patientduplicatecheck = new PatientDuplicateCheck(page);
      const addpatient = new AddPatient(page);
      const addaddress = new AddAddress(page);
      const addpip = new AddPIP(page);
      const viewpip = new ViewPIP(page);
      const addgp = new AddGP(page);
      const printidcard = new PrintIDCard(page);
      //const patientwizard=new PatientWizard(page)
      const menu = new Menu(page);

      await page.goto(environment.Test);
      await loginpage.enterUsername(jsonData.loginDetails[0].username);
      logger.info("Username enter successfully");
      await loginpage.enter_Password(jsonData.loginDetails[0].password);
      logger.info("Password enter successfully");
      await loginpage.clickOnLogin();
      logger.info("Clicked on Login button successfully");
      await homepage.clickonSidebarHomeIcon()
      await homepage.clickOnPatientIcon();
      logger.info("Clicked on Patient Icon successfully");
      await patientsearch.clickOnSearchButton();
      logger.info("Clicked on Search button successfully");

      await patientsearch.enterGivenName(data.pat_firstname);
      logger.info("Given Name entered successfully");

      await patientsearch.enterFamilyName(data.pat_surname);
      logger.info("Family Name entered successfully");

      await patientsearch.selectSex(data.pat_sex);
      // await page.pause()
      // const patient_dob = jsonData.addPatient[index].pat_dob;  
	    // console.log(patient_dob);    
      // const date = new Date(patient_dob);      
      // const day = date.getUTCDate();
      // const month = date.getUTCMonth() + 1; // Months are 0-based, so add 1
      // const year = date.getUTCFullYear();      
      // const formattedDate = `${day}/${month}/${year}`;

      await patientsearch.selectBornDate(jsonData.addPatient[index].pat_dob);
	  //await patientsearch.selectBornDate(formattedDate);
      await patientsearch.clickOnSearchButton();
      await patientsearch.clickOnAddPatientbutton();
      await patientduplicatecheck.clickOnDuplicateCheckButton();
      await expect(page.getByText("Photo Identification required")).toHaveText("Photo Identification required");
      await expect(page.getByText("Photo Identification ID required")).toHaveText("Photo Identification ID required");
      await expect(page.getByText("Middle name(s) is required")).toHaveText("Middle name(s) is required");

      //await page.pause()
      await patientduplicatecheck.selectUniqueIdentification();
      // await patientduplicatecheck.enterUniqueIdentificationId(patientdetailsdata.UniqueIdentificationId)
      await patientduplicatecheck.enterUniqueIdentificationId(jsonData.patientIdentifier[index].pid_value1.toString());
      await patientduplicatecheck.selectPhotoIdentification();
      await patientduplicatecheck.enterPhotoIdentification(jsonData.patientIdentifier[index].pid_value2.toString());
      await patientduplicatecheck.selectIssuingCountry(jsonData.patientIdentifier[index].pat_country);
      await patientduplicatecheck.selectTitle(jsonData.patientIdentifier[index].pat_title);
      await patientduplicatecheck.enterMiddleName(jsonData.patientIdentifier[index].pat_middlename);
      await patientduplicatecheck.enterMaidenName(patientdetailsdata.MaidenName);

      //Is baby born in hospital
      const dateValue = await page.$eval("#Born", (textbox) => textbox.value);
      const selectedDate = new Date(dateValue);
      const selectedDateOnly = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      const currentDate = new Date();
      // Format the date into DD/MM/YYYY
      //const currentDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

      const currentDateOnly = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const differenceInMs = currentDateOnly - selectedDateOnly;
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
      //await page.pause()
      await patientduplicatecheck.enterMobileNumber(jsonData.patientIdentifier[index].pid_value1.toString());
      await patientduplicatecheck.enterEmailId(jsonData.patientIdentifier[index].add_email);
      await patientduplicatecheck.clickOnDuplicateCheckButton();
      //await expect(page.getByText('Duplicate Patients not found')).toHaveText('Duplicate Patients not found')
      await patientduplicatecheck.clickOnCreatePatientButton();

      //Patient Wizard- Add Patient
      await addpatient.selectMaritalStatusDropdown(jsonData.addPatient[index].pat_marital_status);
      await addpatient.selectSexualOrientation(jsonData.addPatient[index].pat_sexual_orientation_eli_text);
      await addpatient.selectEthnicity(jsonData.addPatient[index].pat_ethnicity_text);
      await addpatient.selectOccupation(jsonData.addPatient[index].pat_occupation);
      await addpatient.SelectReligion(jsonData.addPatient[index].pat_religion);
      await addpatient.enterTownOfBirth(jsonData.addPatient[index].pat_town_of_birth);
      await addpatient.enterCountyOfBirth(jsonData.addPatient[index].pat_county_of_birth);
      await addpatient.selectCountryOfBirth(jsonData.addPatient[index].pat_country_of_birth);
      await addpatient.selectNationality(jsonData.addPatient[index].pat_nationality);
      await addpatient.selectRegDisable(jsonData.addPatient[index].pat_registered_disabled_yes);
      //
      //await addpatient.selectPrimaryDisablity()
      //await addpatient.enterAssestanceNeeded(patientdetailsdata.AssistanceNeeded)
      await addpatient.enterDisablityNotes(patientdetailsdata.DisablityNotes);
      await addpatient.selectLanguage(jsonData.addPatient[index].pat_language);
      //await addpatient.selectInterpreterNeeded()
      //await addpatient.selectInterpreterType()
      //await addpatient.enterNHSNo(patientdetailsdata.NHSNo)
      //await addpatient.enterHospitalRef(patientdetailsdata.HospitalRef)
      await addpatient.enterHospitalRef(jsonData.addPatient[index].pat_hospital_ref);
      // await addpatient.enterIdentifier(patientdetailsdata.Identifier)
      //await addpatient.enterPASId(patientdetailsdata.PASId)

      await addpatient.selectPatientType(jsonData.addPatient[index].pat_type);
      await addpatient.selectPrisoner(jsonData.addPatient[index].pat_prisoner_yes);
      //await page.pause()
      await addpatient.selectBloodType(jsonData.addPatient[index].pat_blood_group);
      await addpatient.selectRestrictedRegistration();
      await addpatient.selectPatientWebRegistration();
      await addpatient.enterNotes();
      await addpatient.clickOnNextButton();

      //Add Address page
      await page.pause();
      await addaddress.clickOnSaveButton();
      await addaddress.enterNumberAndRoad(jsonData.permanentAddress[index].add_address1);
      await addaddress.enterTownInAddress(jsonData.permanentAddress[index].add_address3);
      await addaddress.enterDestrict(jsonData.permanentAddress[index].add_address2);
      await addaddress.enterCounty(jsonData.permanentAddress[index].add_address4);
      await addaddress.enterPostCode(jsonData.permanentAddress[index].add_address5.toString());
      await addaddress.clickOnFindPostCode();
      await addaddress.enterCountryonPopup(jsonData.permanentAddress[index].add_address6.toString());
      await addaddress.clickOnSaveButtonOnPopup();
      //Permanent Address
       
      await addaddress.enterPermISOCountryCode(jsonData.permanentAddress[index].add_iso_country_code.toString());
      await addaddress.enterPermICAOCode(jsonData.permanentAddress[index].add_icao_country_code.toString());
      await addaddress.enterPremPhone(jsonData.permanentAddress[index].add_phone.toString());
      await addaddress.enterPermEmail(jsonData.permanentAddress[index].add_email);
      await addaddress.enterPerMobileNumber(jsonData.permanentAddress[index].add_mobile.toString())
      await addaddress.enterPermWorkPhone(jsonData.permanentAddress[index].add_work_phone.toString());
      await addaddress.enterPermFax(jsonData.permanentAddress[index].add_fax.toString());
      await addaddress.selectPermHealthRegion();
      await addaddress.selectPermLocationZone();
      await addaddress.clickOnPermAddressAddViewBnt();
      await addaddress.enterPermAddresNotes(jsonData.permanentAddress[index].add_notes);

      //Temporary Address
      //await page.pause()
      await addaddress.enterTempNumberandRoad(jsonData.tempAddress[index].add_address1);
      await addaddress.enterTempTown(jsonData.tempAddress[index].add_address3);
      await addaddress.enterTempDistrict(jsonData.tempAddress[index].add_address2);
      await addaddress.enterTempCounty(jsonData.tempAddress[index].add_address4);
      await addaddress.enterTempPostcode(jsonData.tempAddress[index].add_address5.toString());
      await addaddress.clickOnFindPostCode2();
      await addaddress.enterCountryonPopup(jsonData.permanentAddress[index].add_address6.toString());
      await addaddress.clickOnSaveButtonOnPopup();

      await addaddress.enterTempISOCountryCode(jsonData.tempAddress[index].add_iso_country_code.toString());
      await addaddress.enterTempICAOCountryCode(jsonData.tempAddress[index].add_icao_country_code.toString());
     // await page.pause()

      await addaddress.enterTempPhone(jsonData.tempAddress[index].add_phone.toString());
      await addaddress.enterTempEmail(jsonData.tempAddress[index].add_email);
      await addaddress.enterTempMobileNumber(jsonData.tempAddress[index].add_mobile.toString());
      
      await addaddress.enterTempWorkPhone(jsonData.tempAddress[index].add_work_phone.toString());
      await addaddress.enterTempFax(jsonData.tempAddress[index].add_fax.toString());
      await addaddress.selectTempHealthRegion();
      await addaddress.selectTempLocationZone();
      await addaddress.clickOnTempAddressAddViewBnt();
      await addaddress.enterTempAddresNotes(jsonData.tempAddress[index].add_notes);
      await addaddress.clickOnTempAddressAddViewBnt();
      await addaddress.closeTempAddressNotesPopup();

      //Billing Corrospondance
      await addaddress.CheckRadiobtnBilllingCorrespondence();
      await addaddress.SelectStartEndDate();
      //await page.pause();
      await addaddress.clickOnSaveAddress();
      await page.waitForTimeout(2000);
      //await expect(page.getByText('Patient address added successfully')).toHaveText('Patient address added successfully')

      //Add PIP
      //await page.pause()
      await addpip.selectPIPTitle(jsonData.pip[index].pip_title);
      await addpip.enterPIPFamilyName(jsonData.pip[index].pip_surname);
      await addpip.enterPIPGivenName(jsonData.pip[index].pip_firstname);
      await addpip.enterPIPMiddleName(jsonData.pip[index].pip_middlename);
      await addpip.selectPIPBornDate();

      await addpip.selecrPIPEthnicity();
      await addpip.selectPIPOccupation();
      await addpip.enterPIPMobileNumber(pipdetailsdata.MobileNo);
      await addpip.enterPIPEmailId(pipdetailsdata.Email);
      await addpip.selectPIPRelation();
      await addpip.selectPIPNextOfKin();
      await addpip.SelectPIPFamilyAwareOfIllness();

      //await addpip.selectPIPIdentifierType()
      // await addpip.enterPIPIdentifier()
      await addpip.enterExternalProfessional(pipdetailsdata.ExternalProfessional);
      //await page.pause()
      await addpip.enterProfessionalTitle(pipdetailsdata.PIPTitle);
      await addpip.selectPIPReceivePatientLetter();
      await addpip.selectPIPReceiveAppointmentLetter();
      await addpip.selectPIPPartnerDetailsOnRegForm();
      await addpip.checkSendPatientTextEmail();
      await addpip.checkIsReferrer();
      await addpip.enterPIPNotes();
      await addpip.checkcAssistingInPartner();
      await addpip.checkHelpingPatients();
      await addpip.checkBeingPhotographed();
      await addpip.checkGeneralPublicity();
      await addpip.ClickOnSavePIP();
      await page.waitForTimeout(1000);
      await expect(page.getByText("Patient interested party details added successfully")).toHaveText("Patient interested party details added successfully");

      //View PIP
      //await page.pause()
      await viewpip.clickOnViewPIPLink();
      await viewpip.clickOnCloseViewPopup();
      await viewpip.clickOnNextbntViewPIP();

      //Search GP
     
      await addgp.clickOnSearchGPBtn();
      await addgp.enterGpSearch();
      await page.waitForTimeout(1000);
      await expect(page.getByText("Local GP found")).toHaveText("Local GP found");
      await addgp.clickOnAddGPBtn();

      // Add GP
      //await page.pause()
      await addgp.enterGPTitle(jsonData.addGP[index].egp_title);
      await addgp.enterGPInitials(jsonData.addGP[index].egp_initials);
      await addgp.enterGPGivenName(jsonData.addGP[index].egp_first_name);
      await addgp.enterGPFamilyName(jsonData.addGP[index].egp_surname);
      await addgp.enterGPCode(jsonData.addGP[index].egp_gp_code);
      await addgp.enterGPPracticeCode(jsonData.addGP[index].egp_pct_code);
      
      await addgp.enterGPGMCCode(jsonData.addGP[index].egp_gmc_code);
      await addgp.clickOnShowbnt();
      await addgp.selectUnknownPostCode();
      //Gp Address Details
      //await page.pause()
      await addgp.enterLocalGPPostcode()
      await addgp.enterGpAddressNumberAndRoad(jsonData.gpAddress[index].add_address1)
      await addgp.enterGpAddressDistrict(jsonData.gpAddress[index].add_address3)
      await addgp.enterGpAddressTown(jsonData.gpAddress[index].add_address2)
      await addgp.enterGpAddressCounty(jsonData.gpAddress[index].add_address4)
      await addgp.enterGPAddressPostCode(jsonData.gpAddress[index].add_address5)


      
      // await addgp.enterGPPhone(gpdata.GPPhone);
      // await addgp.enterGPFax(gpdata.GPFax);
      // await addgp.enterGPWorkPhone(gpdata.GPWorkPhone);
      // await addgp.enterGPMobile(gpdata.GPMobile);
      // await addgp.enterGPEmail(gpdata.GPEmail);
    await addgp.enterGPPhone(jsonData.gpAddress[index].add_phone.toString())
    await addgp.enterGPFax(jsonData.gpAddress[index].add_fax.toString())
    await addgp.enterGPWorkPhone(jsonData.gpAddress[index].add_work_phone.toString())
    await addgp.enterGPMobile(jsonData.gpAddress[index].add_mobile.toString())
    await addgp.enterGPEmail(jsonData.gpAddress[index].add_email)
    //await page.pause();
      await addgp.clickOnSaveGPButton();
      await page.waitForTimeout(3000);
      await expect(page.getByText("GP Added Successfully")).toHaveText("GP Added Successfully");
     // await page.pause();
      await addgp.enterAppGpSearch(jsonData.SPaddGP[index].egp_fullname);
      // Add GP To Patient
      await addgp.clickOnPersonAddButton();
     // await page.getByTestId('Save').click()
       await addgp.clickOnNextButtonOnSearchGp();
      // await page.waitForTimeout(3000);
      //await page.pause();

      // Print Id Card
      //  await page.getByTestId('Print Id Card').click()
      // Get the upload input element
      // const fileInput = await page.$("input[type=file]");
      // // Set the file to upload
      // const filePath = "../Cellma4Automation/UploadPics/Patient.png";
      // // Upload the file
      // await fileInput.setInputFiles(filePath);
      // await page.getByTestId("Upload").click();
      // await page.waitForTimeout(1000);
      // await expect(page.getByText('Patient photo uploaded successfully')).toHaveText('Patient photo uploaded successfully')
      // await printidcard.clickOnSavebtn();
// Print Id Card    
// Get the upload input element
const fileInput = await page.$('//input[@id="file"]');  
// Set the file to upload
const filePath = '../Cellma4Automation/UploadPics/Patient.png';  
// Upload the file
await fileInput.setInputFiles(filePath); 
await page.getByTestId('Upload').click()
await page.waitForTimeout(2000);
//await expect(page.getByText('Patient photo uploaded successfully')).toHaveText('Patient photo uploaded successfully')
await printidcard.clickOnSavebtn()

      await page.waitForTimeout(2000);

      // //////// Patient Detail comparison/////////

      // // select add_email, add_mobile, add_phone,pat_name_other_lang, pat_need_interpreter_at_appointments from patients join addresses on pat_add_id = add_id where pat_id = 787310;
      // const query = "select * from patients where pat_hospital_ref= '"+data.pat_hospital_ref+"' order by pat_id desc limit 1"
      // const patSqlFile='C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientData.json'
      // const results = await executeQuery(query,patSqlFile);
      // console.log('\n Patient Details stored into the database: \n', results);
      // const patId=results[0].pat_id;
      // const jsonFilePath1 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientData.json';
      // var match1 = await compareJsons(jsonFilePath1, null, data);
      // if (match1) {
      // 	console.log('\n Patient Details Comparision: Parameters from both JSON files match!\n');
      // } else {
      // 	console.log('\n Patient Details Comparision: Parameters from both JSON files do not match!\n');
      // }

      // //////// Patient UNique Identifier comparison/////////

      // const queryI = "Select pid_value from patient_identifiers where pid_pat_id="+patId;
      // const patSqlFileI='C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientIData.json'
      // const resultsI = await executeQuery(queryI,patSqlFileI);
      // var match3=0
      // if(resultsI[0].pid_value==jsonData.AddNewPatient[index].pid_value1)
      // {
      // 	if(resultsI[1].pid_value==jsonData.AddNewPatient[index].pid_value2)
      // 	match3=1
      // }
      // else if(resultsI[0].pid_value==jsonData.AddNewPatient[index].pid_value2)
      // {
      // 	if(resultsI[1].pid_value==jsonData.AddNewPatient[index].pid_value1)
      // 	match3=1
      // }
      // if (match3) {
      // 	console.log('\n Patient Identifier Comparision: Parameters from both JSON files match!\n');
      // } else {
      // 	console.log('\n Patient Identifier Comparision: Parameters from both JSON files do not match!\n');
      // }

      // //////// Address Detail comparison/////////
      // const query1 = "select * from addresses where add_pat_id="+patId+" and add_temp_permanent='P' order by add_id limit 1"
      // const patSqlFile1='C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'
      // const results1 = await executeQuery(query1,patSqlFile1);
      // console.log('\n Address Details stored into the database: \n', results1);
      // // Option 1: Provide a second JSON file path
      // // Provide both file path to the compareJsons.js file
      // const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
      // const match2 = await compareJsons(jsonFilePath3, null, jsonData.AddAddress[index]);
      // if (match2) {
      // 	console.log('\n Address Details Comparision: Parameters from both JSON files match!\n');
      // } else {
      // 	console.log('\n Address Details Comparision: Parameters from both JSON files do not match!\n');
      // }

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
      await menu.clickOnMenubtn();
      await menu.clickOnLogout();
      //Listen for console events
      page.on("console", async (msg) => {
        const args = await Promise.all(
          msg.args().map((arg) => arg.jsonValue())
        );
        consoleLogs.push({
          type: msg.type(),
          text: args.join(" "),
        });
      });

      // await menu.clickOnMenubtn()
      // await menu.clickOnLogout()
      // Listen for console events
      page.on("console", async (msg) => {
        const args = await Promise.all(
          msg.args().map((arg) => arg.jsonValue())
        );
        consoleLogs.push({
          type: msg.type(),
          text: args.join(" "),
        });
      });

      ////////////////////////////////////////////////////////////////////////////////////////////
      // Array to store console logs
      // const consoleLogs = [];
      // // Listen for console events and store logs
      // page.on('console', async msg => {
      //     const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
      //     consoleLogs.push({ type: msg.type(), message: args.join(' ') });
      // });
      // } catch (error) {
      //     console.error('Error during test:', error);
      // } finally {
      //     //await browser.close();
      //     const htmlContent = generateHTMLReport(consoleLogs);
      //     fs.writeFileSync('playwright_report.html', htmlContent);
      //     console.log('HTML report generated: playwright_report.html');
      // }
    });
  });
});
