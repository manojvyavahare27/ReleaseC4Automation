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
    test("Single page Registration for Patient ${data.pat_firstname}", async ({ page }) => {
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
    await expect(page.getByText('Baby born in this hospital required')).toHaveText('Baby born in this hospital required')
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
   // await page.pause()
    await singlepage.selectAppointmentType()
    await singlepage.selectMethodOfArrival(jsonData.AddReferral[index].ref_method_of_arrival)
    await singlepage.selectReferralReason(jsonData.AddReferral[index].ReferralReason)
    await singlepage.selectLanguage(jsonData.SPaddPatient[index].pat_language)
    await singlepage.selectEthnicity(jsonData.SPaddPatient[index].pat_ethnicity_text)
    await singlepage.selectOccupation(jsonData.SPaddPatient[index].pat_occupation)
   // await editpatient.selectCurrentlyPregnant()
    await singlepage.selectNationality(jsonData.SPaddPatient[index].pat_nationality)
    await singlepage.enterRoadAndNo()
    await singlepage.enterCountry()
    //await singlepage.enterCountry()
   // await page.pause()
    await singlepage.clickOnSavebtn()
    

    //Patient Wizard- Add Patient
    // await patientwizard.select_MaritalStatus()
    // await patientwizard.select_SexualOrientation()

    await addpatient.selectMaritalStatusDropdown(jsonData.SPaddPatient[index].pat_marital_status)
    //await page.pause()
    await addpatient.selectSexualOrientation(jsonData.SPaddPatient[index].pat_sexual_orientation_eli_text)
    //await page.pause()
    await addpatient.selectEthnicity(jsonData.SPaddPatient[index].pat_ethnicity_text)
    await addpatient.selectOccupation(jsonData.SPaddPatient[index].pat_occupation)
    await addpatient.SelectReligion(jsonData.SPaddPatient[index].pat_religion)    
    await addpatient.enterTownOfBirth(jsonData.SPaddPatient[index].pat_town_of_birth)    
    await addpatient.selectNationality(jsonData.SPaddPatient[index].pat_nationality)    
    await addpatient.selectRegDisable(jsonData.SPaddPatient[index].pat_registered_disabled_yes)
   // await addpatient.selectPrimaryDisablity()    
    //await addpatient.selectPrimaryDisablity()
    //await addpatient.enterAssestanceNeeded(patientdetailsdata.AssistanceNeeded)
    await addpatient.enterDisablityNotes(jsonData.SPaddPatient[index].pat_notes)
    await addpatient.selectLanguage(jsonData.SPaddPatient[index].pat_language)
    //await page.pause()

    //await addpatient.selectInterpreterNeeded()
    // await editpatient.selectInterpreterNeeded()
    // await addpatient.selectInterpreterType()
    // await addpatient.enterNHSNo(patientdetailsdata.NHSNo)
     await addpatient.enterHospitalRef(jsonData.SPaddPatient[index].pat_hospital_ref)
    // await addpatient.enterIdentifier(patientdetailsdata.Identifier)
    // await addpatient.enterPASId(patientdetailsdata.PASId)
    await addpatient.selectPatientType(jsonData.SPaddPatient[index].pat_type)   
    await addpatient.selectPrisoner(jsonData.SPaddPatient[index].pat_prisoner_yes)
    await addpatient.selectBloodType(jsonData.SPaddPatient[index].pat_blood_group)
    await addpatient.selectRestrictedRegistration()    
    await addpatient.selectPatientWebRegistration()
    await addpatient.clickOnLockPatientWebAccountCheckbox()
    await addpatient.enterNotes()
    await addpatient.clickOnAddPatientIdentifierButton()
    await addpatient.selectUniqueIdentifier()
    await addpatient.enterUniqueIdentifierNumber()
    await addpatient.selectUniqueIdentifierCountry()
    await addpatient.clickOnAddIdentifierButton()


    await page.pause()
    await addpatient.clickOnsavebutton()
    //await addpatient.clickOnNextButton()
     //Add Patient Identifier


    await editpatient.clickOnPatientAddressLink()

    //Permanent Address
    await page.pause()

   await addaddress.enterNumberAndRoad(jsonData.SPpermanentAddress[index].add_address1)
   await addaddress.enterTownInAddress(jsonData.SPpermanentAddress[index].add_address3)
   await addaddress.enterDestrict(jsonData.SPpermanentAddress[index].add_address2)
   await addaddress.enterCounty(jsonData.SPpermanentAddress[index].add_address4)
   await addaddress.enterPostCode(jsonData.SPpermanentAddress[index].add_address5.toString())    
   await addaddress.clickOnFindPostCode()
   await addaddress.enterCountryonPopup(jsonData.SPpermanentAddress[index].add_address6.toString())
   await addaddress.clickOnSaveButtonOnPopup()

   await addaddress.enterPermISOCountryCode(jsonData.SPpermanentAddress[index].add_iso_country_code.toString());
   await addaddress.enterPermICAOCode(jsonData.SPpermanentAddress[index].add_icao_country_code.toString());
   await addaddress.enterPremPhone(jsonData.SPpermanentAddress[index].add_phone.toString());
   await addaddress.enterPermEmail(jsonData.SPpermanentAddress[index].add_email);
   await addaddress.enterPerMobileNumber(jsonData.SPpermanentAddress[index].add_mobile.toString())
   await addaddress.enterPermWorkPhone(jsonData.SPpermanentAddress[index].add_work_phone.toString());
   await addaddress.enterPermFax(jsonData.SPpermanentAddress[index].add_fax.toString());
   await addaddress.selectPermHealthRegion();
   await addaddress.selectPermLocationZone();
   await addaddress.clickOnPermAddressAddViewBnt();
   await addaddress.enterPermAddresNotes(jsonData.SPpermanentAddress[index].add_notes);   
 


    //Add Address page   
    //await page.pause()  
    await addaddress.clickOnSaveButton()   
   // await page.pause() 
    await addaddress.enterTempNumberandRoad(jsonData.SPtempAddress[index].add_address1)
    await addaddress.enterTempTown(jsonData.SPtempAddress[index].add_address3)
    await addaddress.enterTempDistrict(jsonData.SPtempAddress[index].add_address2)
    await addaddress.enterTempCounty(jsonData.SPtempAddress[index].add_address4)
    await addaddress.enterTempPostcode(jsonData.SPtempAddress[index].add_address5.toString())    
    await addaddress.clickOnFindPostCode()
    await addaddress.enterCountryonPopup(jsonData.SPtempAddress[index].add_address6.toString())
    await addaddress.clickOnSaveButtonOnPopup()
  
    //Temporary Address
    //await page.pause()   
    await addaddress.enterTempISOCountryCode(jsonData.SPtempAddress[index].add_iso_country_code.toString());
    await addaddress.enterTempICAOCountryCode(jsonData.SPtempAddress[index].add_icao_country_code.toString());
    await addaddress.enterTempPhone(jsonData.SPtempAddress[index].add_phone.toString());
    await addaddress.enterTempEmail(jsonData.SPtempAddress[index].add_email);
    await addaddress.enterTempMobileNumber(jsonData.SPtempAddress[index].add_mobile.toString());
    await addaddress.enterTempWorkPhone(jsonData.SPtempAddress[index].add_work_phone.toString());
    await addaddress.enterTempFax(jsonData.SPtempAddress[index].add_fax.toString());

    await addaddress.selectTempHealthRegion()
    await addaddress.selectTempLocationZone()
    await addaddress.clickOnTempAddressAddViewBnt()
    await addaddress.enterTempAddresNotes(jsonData.SPtempAddress[index].add_notes);
    await addaddress.clickOnTempAddressAddViewBnt()
    await addaddress.closeTempAddressNotesPopup()

    //Billing Corrospondance
    await addaddress.CheckRadiobtnBilllingCorrespondence()
    await addaddress.SelectStartEndDate()
    //await page.pause()
    await addaddress.clickOnSaveAddress()
    //await expect(page.getByText('Patient address added successfully')).toHaveText('Patient address added successfully')  

    //Add PIP
    //await page.pause()
    await editpatient.clickOnPatientPIPLink()
    await editpatient.clickOnAddInteretedPartiesbutton()
    await addpip.selectPIPTitle(jsonData.SPpip[index].pip_title)
    await addpip.enterPIPFamilyName(jsonData.SPpip[index].pip_surname)
    await addpip.enterPIPGivenName(jsonData.SPpip[index].pip_firstname)
    await addpip.enterPIPMiddleName(jsonData.SPpip[index].pip_middlename)
    await addpip.selectPIPBornDate()
    await addpip.selecrPIPEthnicity()
    await addpip.selectPIPOccupation()
    await addpip.enterPIPMobileNumber(pipdetailsdata.MobileNo)
    await addpip.enterPIPEmailId(pipdetailsdata.Email)
    await addpip.selectPIPRelation()
    await addpip.selectPIPNextOfKin()
    await addpip.SelectPIPFamilyAwareOfIllness()
   // await page.pause()
   //await addpip.selectPIPIdentifierType()
   // await addpip.enterPIPIdentifier()
    await addpip.enterExternalProfessional(pipdetailsdata.ExternalProfessional)
    //await page.pause() 
    await addpip.enterProfessionalTitle(pipdetailsdata.PIPTitle)
    //await addpip.selectPIPReceivePatientLetter()
    //await addpip.selectPIPReceiveAppointmentLetter()
    //await addpip.selectPIPPartnerDetailsOnRegForm()
    await addpip.checkSendPatientTextEmail()
    await addpip.checkIsReferrer()
    await addpip.enterPIPNotes()
    await addpip.checkcAssistingInPartner()
    await addpip.checkHelpingPatients()
    await addpip.checkBeingPhotographed()
    await addpip.checkGeneralPublicity()
    await addpip.ClickOnSavePIP()
   // await expect(page.getByText('Patient interested party details added successfully')).toHaveText('Patient interested party details added successfully')  

    //View PIP
    //await page.pause()
    await viewpip.clickOnViewPIPLink()
    await viewpip.clickOnCloseViewPopup()
    await viewpip.EnterPIPInSearch("Monday")
    await viewpip.EnterPIPInSearch("")


    
    //Search GP
    //await page.pause()
    await editpatient.clickOnPatientGPlink()

   await editpatient.clickOnFindGPbutton()
    await addgp.clickOnSearchGPBtn()
    //await expect(page.getByText('Local GP found')).toHaveText('Local GP found')
    await addgp.clickOnAddGPBtn()

    // Add GP
    //await page.pause()

    await addgp.enterGPTitle(gpdata.GPTitle)
    await addgp.enterGPInitials(gpdata.GPInitial)
    await addgp.enterGPGivenName(gpdata.GPGivenName)
    await addgp.enterGPFamilyName(gpdata.GPFamilyName)
    await addgp.enterGPCode(gpdata.GPCode)
    await addgp.enterGPPracticeCode(gpdata.GPPracticeCode)
    await addgp.enterGPGMCCode(gpdata.GPGMCCode)
    await addgp.clickOnShowbnt()
    await addgp.selectUnknownPostCode()

    await addgp.enterLocalGPPostcode()
      await addgp.enterGpAddressNumberAndRoad(jsonData.SPgpAddress[index].add_address1)
      await addgp.enterGpAddressDistrict(jsonData.SPgpAddress[index].add_address3)
      await addgp.enterGpAddressTown(jsonData.SPgpAddress[index].add_address2)
      await addgp.enterGpAddressCounty(jsonData.SPgpAddress[index].add_address4)
      await addgp.enterGPAddressPostCode(jsonData.SPgpAddress[index].add_address5)
      await page.pause()
    await addgp.enterGPPhone(jsonData.SPgpAddress[index].add_phone)
    await addgp.enterGPFax(jsonData.SPgpAddress[index].add_fax)
    await addgp.enterGPWorkPhone(jsonData.SPgpAddress[index].add_work_phone)
    await addgp.enterGPMobile(jsonData.SPgpAddress[index].add_mobile)
    await addgp.enterGPEmail(jsonData.SPgpAddress[index].add_email)
    //await page.pause()
    await addgp.clickOnSaveGPButton()
   // await expect(page.getByText('GP Added Successfully')).toHaveText('GP Added Successfully')
    

    //Add GP To Patient
    await page.pause()
    
      // Add GP To Patient
      await addgp.enterGPFullName(jsonData.SPaddGP[index].egp_fullname)
      await addgp.clickOnPersonAddButton();
      // await addgp.clickOnNextButtonOnSearchGp();
      // await page.waitForTimeout(3000);
    // await addgp.enterGPFullName(jsonData.SPaddGP[index].egp_fullname)    
    // await addgp.clickOnSearchGPBtn()    
    // await expect(page.getByText('Local GP found')).toHaveText('Local GP found') 
    // await page.pause()
    // await addgp.clickOnPersonAddButton()
    // await expect(page.getByText('GP added to patient successfully')).toHaveText('GP added to patient successfully')
    // //await addgp.clickOnNextButtonOnSearchGp()
     await editpatient.clickOnSaveGpbutton()    
     //await addgp.enterAppGpSearch(jsonData.SPaddGP[index].egp_fullname);
      await printidcard.clickOnLinkPrintIdCard()
   // await page.pause()
    //Print Id Card    
  // // Get the upload input element
  const fileInput = await page.$('input[type=file]');  
  // Set the file to upload
  const filePath = '../Cellma4Automation/UploadPics/Patient.png';  
  // Upload the file
  await fileInput.setInputFiles(filePath);   

  //await printidcard.Uploadphoto()
  await page.getByTestId('Upload').click()
  //await printidcard.clickOnUploadbtn()

  //   //await page.pause()
  //   //Print Id Card    
  // // // Get the upload input element
  // const fileInput = await page.$('input[type=file]');  
  // // Set the file to upload
  // const filePath = '../UploadPics/Patient.png';  
  // // Upload the file
  // await fileInput.setInputFiles(filePath);   

  // //await printidcard.Uploadphoto()
  // await page.getByTestId('Upload').click()
  //await printidcard.clickOnUploadbtn()
  //await page.waitForTimeout(2000)
  //await expect(page.getByText('Patient photo uploaded successfully')).toHaveText('Patient photo uploaded successfully')
  //await page.getByTestId('Save').click();   
  await printidcard.clickOnSavebtn()

    //////// Patient Detail comparison/////////
    var sqlQuery =
    "select * from patients where pat_hospital_ref= '" +
    data.pat_hospital_ref +
    "' order by pat_id desc limit 1";
  var sqlFilePath = "SQLResults/PatientDomain/SPpatientData.json";
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
  sqlQuery = "Select pid_value from patient_identifiers where pid_pat_id=" + patId;
  sqlFilePath = "SQLResults/PatientDomain/SPpatientIData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  match = 0;
  if (results[0].pid_value == jsonData.patientIdentifier[index].pid_value1) {
      if (
          results[1].pid_value == jsonData.patientIdentifier[index].pid_value2
      )
          match = 1;
  } else if (results[0].pid_value == jsonData.patientIdentifier[index].pid_value2) {
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
  sqlFilePath = "SQLResults/PatientDomain/SPpatientAddressData.json";
  results = await executeQuery(sqlQuery, sqlFilePath);
  console.log("\n Address Details stored into the database: \n", results);
  // Option 1: Provide a second JSON file path
  // Provide both file path to the compareJsons.js file
  //const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
  match = 0;
  match = await compareJsons(sqlFilePath,null,jsonData.SPpermanentAddress[index]);
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