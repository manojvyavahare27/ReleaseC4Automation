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
    await singlepage.selectMarritalStatus()
    await singlepage.selectReligion()
    await singlepage.selectSourceOfReferral()
    await singlepage.SelectService()
    await singlepage.selectServiceLocation()
    //await singlepage.SelectServiceType()
    await singlepage.selectConsultant()
    await singlepage.selectPatientType()
   // await page.pause()
    await singlepage.selectAppointmentType()
    await singlepage.selectMethodOfArrival()
    await singlepage.selectReferralReason()
    await singlepage.selectLanguage()
    await singlepage.selectEthnicity()
    await singlepage.selectOccupation()
   // await editpatient.selectCurrentlyPregnant()
    await singlepage.selectNationality()
    await singlepage.enterRoadAndNo()
    await singlepage.enterCountry()
    //await singlepage.enterCountry()
   // await page.pause()
    await singlepage.clickOnSavebtn()
    

    //Patient Wizard- Add Patient
    // await patientwizard.select_MaritalStatus()
    // await patientwizard.select_SexualOrientation()

    //await addpatient.selectMaritalStatusDropdown()
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
    //await page.pause()
    await addpatient.clickOnsavebutton()
    //await addpatient.clickOnNextButton()
     
    await editpatient.clickOnPatientAddressLink()

    //Permanent Address
   // await page.pause()
   await addaddress.enterNumberAndRoad(jsonData.SPtempAddress[index].add_address1)
   await addaddress.enterTownInAddress(jsonData.SPtempAddress[index].add_address3)
   await addaddress.enterDestrict(jsonData.SPtempAddress[index].add_address2)
   await addaddress.enterCounty(jsonData.SPtempAddress[index].add_address4)
   await addaddress.enterPostCode(jsonData.SPtempAddress[index].add_address5.toString())    
   await addaddress.clickOnFindPostCode()
   await addaddress.enterCountryonPopup(jsonData.SPtempAddress[index].add_address6.toString())
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
      await addgp.enterGpAddressNumberAndRoad(jsonData.gpAddress[index].egp_gmc_code)
      await addgp.enterGpAddressDistrict(jsonData.gpAddress[index].egp_gmc_code)
      await addgp.enterGpAddressTown(jsonData.gpAddress[index].egp_gmc_code)
      await addgp.enterGpAddressCounty(jsonData.gpAddress[index].egp_gmc_code)
      await addgp.enterGPAddressPostCode(jsonData.gpAddress[index].egp_gmc_code)

      await addgp.enterGPPhone(jsonData.gpAddress[index].add_phone)
      await addgp.enterGPFax(jsonData.gpAddress[index].add_fax)
      await addgp.enterGPWorkPhone(jsonData.gpAddress[index].add_work_phone)
      await addgp.enterGPMobile(jsonData.gpAddress[index].add_mobile)
      await addgp.enterGPEmail(jsonData.gpAddress[index].add_email)
    //await page.pause()
    await addgp.clickOnSaveGPButton()
    await expect(page.getByText('GP Added Successfully')).toHaveText('GP Added Successfully')
    
    //Add GP To Patient
    await addgp.enterGPFullName(jsonData.addGP[index].egp_fullname)    
    await addgp.clickOnSearchGPBtn()
    await expect(page.getByText('Local GP found')).toHaveText('Local GP found')    
    await addgp.clickOnPersonAddButton()
    await expect(page.getByText('GP added to patient successfully')).toHaveText('GP added to patient successfully')
    //await addgp.clickOnNextButtonOnSearchGp()
    await editpatient.clickOnSaveGpbutton()    

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
  await expect(page.getByText('Patient photo uploaded successfully')).toHaveText('Patient photo uploaded successfully')
  //await page.getByTestId('Save').click();   
  await printidcard.clickOnSavebtn()
  await page.waitForTimeout(2000)  
  await menu.clickOnMenubtn()
  await menu.clickOnLogout()

  // await page.goto('http://10.0.0.84:8080/cellmaWEB/index.do');  
  // await page.locator('div:nth-child(9) > .homePageIcon').click();  
  // await page.getByText('Service Settings').click();
  // await page.getByRole('tab', { name: 'Service Details' }).click();
  // await page.locator('a').filter({ hasText: 'Service Details' }).click();
  // await page.locator('#clinicId').getByText('Cardiology').click()
  // await page.getByRole('button', { name: 'Submit' }).click();
  // await page.locator('#cliAllowSinglePageRegistration').selectOption('Yes')
  // await page.getByRole('button', { name: 'Change Service Details' }).click()

  });
});
});