//Added by Manoj Vyavahare

const fs = require("fs");
const XLSX = require("xlsx");
//const path = "D:/Riomed/Cellma4Automation";
const path = require('path');
const mysql = require("mysql2");
const convertExcelToJson = require('../../../config/global-setupOptimized');

const { test, expect, chromium } = require("@playwright/test");
const connectToDatabase = require("../../../manoj");
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
import { error, log } from "console";
import { before } from "node:test";

const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PharmacyDomain/Login.json")));
const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PharmacyDomain/PatientDetails.json")));
const pipdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PharmacyDomain/PIPDetails.json")));
const gpdata = JSON.parse(JSON.stringify(require("../../../TestData/PharmacyDomain/NewGPDetails.json")));
//const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/ExcelToJSON.json")))

// // Array to store console logs
const consoleLogs = [];
let jsonData;

test.describe('Excel Conversion', () => {
  test('Extract Patient Details', async ({}) => {
    const excelFilePath = process.env.EXCEL_FILE_PATH || './ExcelFiles/PharmacyDomain.xlsx';
    const jsonFilePath = "./TestDataWithJSON/PharmacyDomain/PharmacyDetails.json";
    const conversionSuccess = await convertExcelToJson(excelFilePath, jsonFilePath);
    
    if (conversionSuccess) {
      jsonData = require("../../../TestDataWithJSON/PharmacyDomain/PharmacyDetails.json");
      console.log('Excel file has been converted successfully!');
      console.log('jsonData:', jsonData); // Log the loaded JSON data
      console.log('excelFilePath after conversion:', excelFilePath);
      console.log('jsonFilePath after conversion:', jsonFilePath);
    } else {
      throw new Error('Excel to JSON conversion failed.');
    }
  });
})

  // Proceed with the test loop after Excel to JSON conversion
  test.describe('Pharmacy New Patient', () => {
    test('Pharmacy Register New Patient', async ({ page }) => {
      if (!jsonData || !jsonData.addPatient) {
        throw new Error('JSON data is missing or invalid.');
      }
      let index=0
      for (const data of jsonData.addPatient) {
    
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
        await page.waitForTimeout(1000);
        await loginpage.enter_Password(jsonData.loginDetails[0].password);
        logger.info("Password enter successfully");
        await loginpage.clickOnLogin();
        logger.info("Clicked on Login button successfully");
        //await homepage.clickonSidebarHomeIcon()
        await homepage.clickOnSideIconPatient()
       // await page.pause()
       // await homepage.clickOnPatientIcon();
        logger.info("Clicked on Patient Icon successfully");
        await patientsearch.clickOnSearchButton();
        logger.info("Clicked on Search button successfully");
        await patientsearch.enterGivenName(data.pat_firstname);
        //await patientsearch.enterGivenName("EonFVBY");
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
        //await page.pause();
        await patientsearch.clickOnSearchButton();
        await patientsearch.clickOnAddPatientbutton();
        await patientduplicatecheck.clickOnDuplicateCheckButton();
        await expect(page.getByText("Photo Identification required")).toHaveText("Photo Identification required");
        await expect(page.getByText("Photo Identification ID required")).toHaveText("Photo Identification ID required");
        await expect(page.getByText("Middle name(s) is required")).toHaveText("Middle name(s) is required");

       
        await patientduplicatecheck.selectUniqueIdentification();
         //await patientduplicatecheck.enterUniqueIdentificationId(patientdetailsdata.UniqueIdentificationId)
        //await patientduplicatecheck.enterUniqueIdentificationId(jsonData.patientIdentifier[index].pid_value1.toString());
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
        
        await patientduplicatecheck.enterMobileNumber(jsonData.patientIdentifier[index].pid_value1.toString());
        //await page.pause
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
        await addpatient.enterDisablityNotes(jsonData.addPatient[index].pat_disability_note);
        await addpatient.selectLanguage(jsonData.addPatient[index].pat_language);       
        await addpatient.enterHospitalRef(data.pat_hospital_ref);  
        await addpatient.selectPatientType(jsonData.addPatient[index].pat_type);
        await addpatient.selectPrisoner(jsonData.addPatient[index].pat_prisoner_yes);       
        await addpatient.selectBloodType(jsonData.addPatient[index].pat_blood_group);
        await addpatient.selectRestrictedRegistration();
        await addpatient.selectPatientWebRegistration();
        await addpatient.enterNotes(jsonData.addPatient[index].pat_notes);
        await addpatient.clickOnNextButton();

        //Add Address page  
        //await page.pause()      
        await addaddress.clickOnSaveButton();
        await addaddress.enterNumberAndRoad(jsonData.permanentAddress[index].add_address1);
        await addaddress.enterTownInAddress(jsonData.permanentAddress[index].add_address3);
        await addaddress.enterDestrict(jsonData.permanentAddress[index].add_address2);
        await addaddress.enterCounty(jsonData.permanentAddress[index].add_address4);
        await addaddress.enterPostCode(jsonData.permanentAddress[index].add_address5.toString());        
        await addaddress.selectCountry()
        await page.getByTestId('Add/View Notes').first().click();
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
        await addaddress.enterTempNumberandRoad(jsonData.tempAddress[index].add_address1);
        await addaddress.enterTempTown(jsonData.tempAddress[index].add_address3);
        await addaddress.enterTempDistrict(jsonData.tempAddress[index].add_address2);
        await addaddress.enterTempCounty(jsonData.tempAddress[index].add_address4);
        await addaddress.enterTempPostcode(jsonData.tempAddress[index].add_address5.toString());        
        await addaddress.selectCountry()
        await page.getByTestId('Add/View Notes').nth(1).click();
        await addaddress.clickOnSaveButtonOnPopup();
        await addaddress.enterTempISOCountryCode(jsonData.tempAddress[index].add_iso_country_code.toString());
        await addaddress.enterTempICAOCountryCode(jsonData.tempAddress[index].add_icao_country_code.toString());      
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
       
        await addaddress.clickOnSaveAddress();
        await page.waitForTimeout(500);
        
        //Add PIP        
        await addpip.enterPIPFamilyName(jsonData.pip[index].pip_surname);
        await addpip.enterPIPGivenName(jsonData.pip[index].pip_firstname);
        await addpip.enterPIPMiddleName(jsonData.pip[index].pip_middlename);
        await addpip.selectPIPBornDate(jsonData.pip[index].pip_dob);
        await addpip.selecrPIPEthnicity(jsonData.pip[index].pip_ethnicity_text);
        await addpip.selectPIPOccupation();        
        await addpip.selectPIPRelation(jsonData.pip[index].pip_relationship);
        await addpip.selectPIPNextOfKin(jsonData.pip[index].pip_next_of_kin_Yes);
        await addpip.SelectPIPFamilyAwareOfIllness(jsonData.pip[index].pip_family_aware_illness_yes);       
        await addpip.selectPIPIdentifierType(jsonData.pip[index].pip_identifier_type)


        if (await addpip.dropdownPIPIdentifierType.isVisible()) {
        await addpip.enterPIPIdentifier(jsonData.pip[index].pip_identifier_number.toString());
      } else if (await addpip.chiNumber.isVisible()) {
        await addpip.enterCHInumber(jsonData.pip[index].pip_chiNumber.toString());
      } else {
        throw new Error('Neither PIP Identifier dropdown nor CHI Number field is visible on the screen.');
      }      
        await addpip.enterProfessionalTitle(jsonData.pip[index].pip_professional_title);
        await addpip.selectPIPReceivePatientLetter(jsonData.pip[index].pip_receive_patient_letter_no);
        await addpip.selectPIPReceiveAppointmentLetter(jsonData.pip[index].pip_receive_pat_appt_letter_no);        
        await addpip.checkSendPatientTextEmail(jsonData.pip[index].pip_send_txt_email_yes);
        await addpip.checkIsReferrer();
        await addpip.enterPIPNotes(jsonData.pip[index].pip_notes);
        await addpip.checkcAssistingInPartner();
        await addpip.checkHelpingPatients();
        await addpip.checkBeingPhotographed();
        await addpip.checkGeneralPublicity();
        await addpip.ClickOnSavePIP();
        await page.waitForTimeout(1000);
       
        //View PIP       
        await viewpip.clickOnViewPIPLink();
        await viewpip.clickOnCloseViewPopup();
        await viewpip.clickOnNextbntViewPIP();

        //Search GP      
        await addgp.clickOnSearchGPBtn();
        await expect(page.getByText("Local GP found")).toHaveText("Local GP found");
        await addgp.enterGpSearch();
        await addgp.clickOnAddGPBtn();        
        // Add GP       
        await addgp.enterGPTitle(jsonData.addGP[index].egp_title);
        await addgp.enterGPInitials(jsonData.addGP[index].egp_initials);
        await addgp.enterGPGivenName(jsonData.addGP[index].egp_first_name);
        await addgp.enterGPFamilyName(jsonData.addGP[index].egp_surname);
        await addgp.enterGPCode(jsonData.addGP[index].egp_gp_code);
        await addgp.enterGPPracticeCode(jsonData.addGP[index].egp_practise_code);        
        await addgp.enterGPGMCCode(jsonData.addGP[index].egp_gmc_code);
        await addgp.clickOnShowbnt();
        await addgp.selectUnknownPostCode();
        
        //Gp Address Details       
        await addgp.enterLocalGPPostcode()
        await page.waitForTimeout(1000)
        await addgp.enterGpAddressNumberAndRoad(jsonData.gpAddress[index].add_address1)
        await addgp.enterGpAddressDistrict(jsonData.gpAddress[index].add_address3)
        await addgp.enterGpAddressTown(jsonData.gpAddress[index].add_address2)
        await addgp.enterGpAddressCounty(jsonData.gpAddress[index].add_address4)
        await addgp.enterGPAddressPostCode(jsonData.gpAddress[index].add_address5)       
        
      await addgp.enterGPPhone(jsonData.gpAddress[index].add_phone.toString())
      await addgp.enterGPFax(jsonData.gpAddress[index].add_fax.toString())
      await addgp.enterGPWorkPhone(jsonData.gpAddress[index].add_work_phone.toString())
      await addgp.enterGPMobile(jsonData.gpAddress[index].add_mobile.toString())
      await addgp.enterGPEmail(jsonData.gpAddress[index].add_email)
      
        await addgp.clickOnSaveGPButton();
        await page.waitForTimeout(1000);
        await expect(page.getByText("GP Added Successfully")).toHaveText("GP Added Successfully");
      
        await addgp.enterAppGpSearch(jsonData.SPaddGP[index].egp_fullname);
        // Add GP To Patient
        await addgp.clickOnPersonAddButton();      
        await addgp.clickOnNextButtonOnSearchGp();
         await page.waitForTimeout(3000);
        

        // Print Id Card        
        // const fileInput = page.getByTestId('PhotoCameraIcon');
        // const filePath = "../Cellma4Automation/UploadPics/Patient.png";        
        // await fileInput.setInputFiles(filePath,fileInput);
        // await page.waitForTimeout(2000);
        // await page.getByTestId("Upload").click();

         /**
               * Recursively searches for a specific file in a directory tree.
               * @param {string} dir - Directory to start searching from.
               * @param {string} targetFile - Name of the file to find.
               * @returns {string|null} - Absolute path to the file, or null if not found.
               */
              function findFileRecursive(dir, targetFile) {
                const files = fs.readdirSync(dir);
                for (const file of files) {
                  const fullPath = path.join(dir, file);
                  const stat = fs.statSync(fullPath);
              
                  if (stat.isDirectory()) {
                    const result = findFileRecursive(fullPath, targetFile);
                    if (result) return result;
                  } else if (file === targetFile) {
                    return fullPath;
                  }
                }
                return null;
              }
              
              // Get Jenkins workspace root or current directory
              const workspaceRoot = process.env.WORKSPACE || process.cwd();
              const targetFilePath = findFileRecursive(workspaceRoot, 'Patient.png');
              
              if (!targetFilePath) {
                throw new Error('❌ Patient.png not found anywhere under the workspace!');
              }
              
              console.log('✅ Found Patient.png at:', targetFilePath);
              
              // Upload the file using Playwright
              const fileInput = await page.getByTestId('PhotoCameraIcon');
              await fileInput.setInputFiles(targetFilePath);
              
              await page.getByTestId("Upload").click();
              await page.waitForTimeout(1000);

        //await page.waitForTimeout(1000);
        await expect(page.getByText('Patient photo uploaded successfully')).toHaveText('Patient photo uploaded successfully')
        await printidcard.clickOnSavebtn();
        await page.waitForTimeout(2000);
       // await page.pause();
        await page.getByLabel('profileIcon').click();
        //await page.getByText('Logout').click();
       
        //await menu.clickOnMenubtn();
        //await menu.clickOnLogout();
        //await page.pause();     
      index++
      }
    })
    })
