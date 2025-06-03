
const axios = require('axios');
const { chromium } = require('playwright');
const path = require('path');
//const moment = require('moment');
const fs = require('fs');
//const { getDataFromDatabase } = require('/Riomed/FebAutomation/db');



import { test, expect, Page } from '@playwright/test';
import LoginPage from '../../../Pages/BaseClasses/LoginPage';
import Homepage from '../../../Pages/BaseClasses/Homepage';
import PatientSearch from '../../../Pages/PatientDomain/PatientSearch';
import PatientDetails from '../../../Pages/PatientDomain/PatientDetails'
import Environment from '../../../Pages/BaseClasses/Environment';
import Menu from '../../../Pages/BaseClasses/Menu';
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
//import Pool from 'mysql/lib/Pool';

const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")))
const pipdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))

test('Register New Patient @Functional @Regression', async ({ }) => {

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();


  const loginpage = new LoginPage(page)
  const homepage = new Homepage(page)
  const environment = new Environment(page)
  const patientsearch = new PatientSearch(page)
  const patientduplicatecheck = new PatientDuplicateCheck(page)
  const addpatient = new AddPatient(page)
  const addaddress = new AddAddress(page)
  const addpip = new AddPIP(page)
  const viewpip = new ViewPIP(page)
  const addgp = new AddGP(page)
  const printidcard = new PrintIDCard(page)
  //const patientwizard=new PatientWizard(page)
  const menu = new Menu(page)

  await page.goto(environment.Test)
  await loginpage.enterUsername(logindata.username)
  await loginpage.enter_Password(logindata.password)
  await loginpage.clickOnLogin()
  console.log("Login Successfully")
  await homepage.clickonSidebarHomeIcon()
  //await page.goto(environment.Test)
  console.log('HomePageAPIResponse')
  await page.pause()

  try {
    const HomePageAPIResponse = await page.waitForResponse(response => response.url().includes('http://10.0.0.64:8080/cellmaUserAPI/user/login/display'),0);
    const Homepagedate = await HomePageAPIResponse.json();
    console.log(Homepagedate)
  }
  catch (err) {
    console.error(err);
  }
  

  await page.pause()
  await loginpage.enterUsername(logindata.username)
  await loginpage.enter_Password(logindata.password)
  await loginpage.clickOnLogin()
  console.log('/////////LoginPageAPIResponse////////////')

  try {
    const LoginPageAPIResponse = await page.waitForResponse(response => response.url().includes('http://10.0.0.64:8080/cellmaUserAPI/user/login'),0);
    const Logindata = await LoginPageAPIResponse.json();
    console.log(Logindata)
  }
  catch (err) {
    console.error(err);
  }
 
  console.log('///////////HeaderApiResponse//////////')
  try {
    const HeaderAPIResponse = await page.waitForResponse(response => response.url().includes('http://10.0.0.64:8080/cellmaUserAPI/user/header'),0);
    const HeaderRespData = await HeaderAPIResponse.json();
    console.log(HeaderRespData)
  }
  catch (err) {
    console.error(err);
  }


  console.log('///////////HomeApiResponse//////////')
  try {
    const HomeApiRespons = await page.waitForResponse(response => response.url().includes('http://10.0.0.64:8080/cellmaUserAPI/user/home'),0);
    const HomeRespData = await HomeApiRespons.json();
    console.log(HomeRespData)
  }
  catch (err) {
    console.error(err);
  }
  
  console.log('///////////HomepagesidebarApiResponse//////////')
  try {
    const HomepagesidebarApiRespons = await page.waitForResponse(response => response.url().includes('http://10.0.0.64:8080/cellmaUserAPI/user/home-page-sidebar'),0);
    const HomepagesidebarRespData = await HomepagesidebarApiRespons.json();
    console.log(HomepagesidebarRespData)
  }
  catch (err) {
    console.error(err);
  }


  console.log("Login Successfully")
  await page.pause()
  await homepage.clickOnPatientIcon()

  console.log('///////////PatientDisplayApiResponse//////////')
  try {
    const PatientDisplayApiResponse = await page.waitForResponse(response => response.url().includes('http://10.0.0.64:8080/cellmaUserAPI/patient/patients-display'),0);
    const PatientDisplayApidata = await PatientDisplayApiResponse.json();
    console.log(PatientDisplayApidata)

     //store Patient Search result into JSON file
  fs.writeFile('C:/Riomed/FebAutomation/TestData/AppointmentDomain/Manoj.json', JSON.stringify(PatientDisplayApidata, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }
    console.log('JSON response saved to File');
  });
  }
  catch (err) {
    console.error(err);
  }
  //await patientsearch.clickOnSearchButton()
  await page.pause()

  try{

  console.log('///////////PatientSearchApiResponse//////////')
  await patientsearch.enterGivenName(patientdetailsdata.pat_firstname)
  await patientsearch.enterFamilyName(patientdetailsdata.New_FamilyName)
  await patientsearch.selectSex(patientdetailsdata.SexM)
  await patientsearch.clickOnSearchButton()  

// Wait for both response and navigation to complete
  const [PatientSearchApiResponse] = await Promise.all([
  page.waitForResponse(response => response.url().includes('http://10.0.0.64:8080/cellmaUserAPI/patient/patients')),
  await page.waitForTimeout(1000)
          ]);
  const PatientSearchApidata = await PatientSearchApiResponse.json();
  console.log(PatientSearchApidata)
  const patientListData=PatientSearchApidata.entity.patientsList
  console.log(patientListData)

  //store Patient Search result into JSON file
  fs.writeFile('C:\Riomed\FebAutomation\TestData\AppointmentDomain\PatientSearchNetworkTabResult.json', JSON.stringify(patientListData, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }
    console.log('JSON response saved to File');
  });

  //Comparasion code
  console.log("Comparasion code")
  const sqlQuery='SELECT pat_id AS patId, pat_barcode AS patBarcode, pat_egp_id AS patEgpId, pat_est_id AS patEstId, pat_add_id AS patAddId, pat_firstname AS patFirstname, pat_surname AS patSurname, pat_maiden_name AS patMaidenName, pat_middlename AS patMiddlename, pat_dob AS patDob, pat_sex AS patSex, pat_dod AS patDod, pat_show AS patShow, pat_title AS patTitle, pat_hospital_ref AS patHospitalRef, pat_nhs_ref AS patNhsRef, pat_identifier AS patIdentifier, add_mobile AS patAddMobile, pat_mpi_number AS patMpiNumber, pat_religion AS patReligion, pat_marital_status AS patMaritalStatus, pat_occupation AS patOccupation, pat_practising_religion AS patPractisingReligion, pat_blood_group AS patBloodGroup, pat_language AS patLanguage, pat_currently_pregnant AS patCurrentlyPregnant, pat_registered_disabled AS patRegisteredDisabled, pat_hemoglobin_electrophoresis AS patHemoglobinElectrophoresis, pat_disability AS patDisability, pat_riomed_identifier AS patRiomedIdentifier, pat_est_mrn_number AS patEstMrnNumber, pat_pasid AS patPasid, pat_banned AS patBanned, pat_merge_id AS patMergeId, pat_password AS patPassword, pat_external_directory AS patExternalDirectory FROM patients join addresses on pat_id = add_pat_id where pat_firstname like "%Copy%" and pat_surname like "%Riomedtest%" and pat_sex = "M" and add_billing_address=1 group by pat_id';

  try {
    // Get data from MySQL
    const data = await getDataFromDatabase(sqlQuery);

    // Write data to a JSON file
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return;
      }
      console.log('Data saved to data.json');
    });
  } catch (error) {
    console.error('Error:', error);
  }







}
catch(err)
{
  console.log(err)
}

  // try {
  //   const PatientSearchApidata = await PatientSearchApiResponse.json();
  //   console.log(PatientSearchApidata)
  // }
  // catch (err) {
  //   console.error(err);
  // }




  //await page.locator("xpath=//div[contains(text(),'Search')]").click()
  //await page.waitForTimeout(2000)
  //API Testig 
  //const responsePromise = await patientsearch.page.waitForResponse('http://10.0.0.64:8080/cellmaUserAPI/patient/patients');
 
  //const respData= await responsePromise.json();
  
  // await patientsearch.getByText('trigger response').click();
  // const response = await responsePromise; 



  //const getPatientPatientsResponse = await page.waitForResponse(response => response.url().includes('http://10.0.0.64:8080/cellmaUserAPI/patient/patients'));

  //const responseBody = await getPatientPatientsResponse.json();
  //console.log(response);

  // const getApiResponse =await axios.get(apiUrl, {     
  // headers: 
  // { Authorization:`Bearer${jwtToken}`},      
  // params: {
  //   patFirstname:'value1', 
  //   patSurname:'value2',
  //   patSex:
  //   patDob:
  // },
  // // Add your query parameters here
  // })


  //await page.pause()

  await patientsearch.clickOnAddPatientbutton()

  await patientsearch.clickOnAddPatientbutton()
  await page.pause()

  //await page.goto("http://10.0.0.64:3000/cellmaUser/patient/patientDuplicateCheck")
  //await page.pause()
  await patientduplicatecheck.clickOnDuplicateCheckButton()
  await expect(page.getByText('Photo Identification required')).toHaveText('Photo Identification required')
  await expect(page.getByText('Photo Identification ID required')).toHaveText('Photo Identification ID required')
  await expect(page.getByText('Middle name(s) is required')).toHaveText('Middle name(s) is required')
  await expect(page.getByText('Baby born in this hospital required')).toHaveText('Baby born in this hospital required')
  await patientduplicatecheck.selectUniqueIdentification()
  await patientduplicatecheck.enterUniqueIdentificationId(patientdetailsdata.UniqueIdentificationId)
  await patientduplicatecheck.selectPhotoIdentification()
  await patientduplicatecheck.enterPhotoIdentification(patientdetailsdata.PhotoIdentificationId)
  await patientduplicatecheck.selectIssuingCountry()
  await patientduplicatecheck.selectTitle()
  await patientduplicatecheck.enterMiddleName(patientdetailsdata.MiddleName)
  await patientduplicatecheck.enterMaidenName(patientdetailsdata.MaidenName)
  //await page.pause()
  //Is baby born in hospital
  await patientduplicatecheck.selectIsBabyBornInHospital()
  await patientduplicatecheck.enterMobileNumber(patientdetailsdata.MobileNumber)
  await patientduplicatecheck.enterEmailId(patientdetailsdata.EmailId)
  await patientduplicatecheck.clickOnDuplicateCheckButton()
  //await expect(page.getByText('Duplicate Patients not found')).toHaveText('Duplicate Patients not found')   
  await patientduplicatecheck.clickOnCreatePatientButton()

  //Patient Wizard- Add Patient
  // await patientwizard.select_MaritalStatus()
  // await patientwizard.select_SexualOrientation()
  await addpatient.selectMaritalStatusDropdown()
  await addpatient.selectSexualOrientation()
  await addpatient.selectEthnicity()
  await addpatient.selectOccupation()
  await addpatient.SelectReligion()
  await addpatient.enterTownOfBirth(patientdetailsdata.TownOfBirth)
  await addpatient.enterCountyOfBirth("Maharashtra")
  await addpatient.selectCountryOfBirth()
  await addpatient.selectNationality()
  await addpatient.selectRegDisable()
  //
  //await addpatient.selectPrimaryDisablity()
  await addpatient.enterAssestanceNeeded(patientdetailsdata.AssistanceNeeded)
  await addpatient.enterDisablityNotes(patientdetailsdata.DisablityNotes)
  await addpatient.selectLanguage()
  //await page.pause()
  //await page.pause()
  await addpatient.selectInterpreterNeeded()
  await addpatient.selectInterpreterType()
  await addpatient.enterNHSNo(patientdetailsdata.NHSNo)
  await addpatient.enterHospitalRef(patientdetailsdata.HospitalRef)
  await addpatient.enterIdentifier(patientdetailsdata.Identifier)
  await addpatient.enterPASId(patientdetailsdata.PASId)
  await addpatient.selectPatientType()
  await addpatient.selectPrisoner()
  await addpatient.selectBloodType()
  await addpatient.selectRestrictedRegistration()
  await addpatient.selectPatientWebRegistration()
  await addpatient.enterNotes()
  await addpatient.clickOnNextButton()

  //Add Address page    
  await addaddress.clickOnSaveButton()
  await addaddress.enterNumberAndRoad(patientdetailsdata.NumberandRoad)
  await addaddress.enterTown(patientdetailsdata.Town)
  await addaddress.enterDestrict(patientdetailsdata.Destrict)
  await addaddress.enterCounty(patientdetailsdata.County)
  await addaddress.enterPostCode(patientdetailsdata.PostCode)

  await addaddress.clickOnFindPostCode()
  await addaddress.enterCountryonPopup()
  await addaddress.clickOnSaveButtonOnPopup()

  //Permanent Address
  // await page.pause()
  await addaddress.enterPermISOCountryCode()
  await addaddress.enterPermICAOCode()
  await addaddress.enterPremPhone()
  await addaddress.enterPermEmail()
  await addaddress.enterPermWorkPhone()
  await addaddress.enterPermFax()

  await addaddress.selectPermHealthRegion()
  await addaddress.selectPermLocationZone()
  await addaddress.clickOnPermAddressAddViewBnt()
  await addaddress.enterPermAddresNotes()


  //Temporary Address
  // await page.pause()
  await addaddress.enterTempNumberandRoad()
  await addaddress.enterTempTown()
  await addaddress.enterTempDistrict()
  await addaddress.enterTempCounty()
  await addaddress.enterTempPostcode()
  await addaddress.enterTempISOCountryCode()
  await addaddress.enterTempICAOCountryCode()
  //await page.pause()
  await addaddress.enterTempPhone(patientdetailsdata.MobileNumber)
  await addaddress.enterTempEmail(patientdetailsdata.EmailId)
  await addaddress.enterTempWorkPhone(patientdetailsdata.WorkPhone)
  await addaddress.enterTempFax(patientdetailsdata.Fax)
  await addaddress.selectTempHealthRegion()
  await addaddress.selectTempLocationZone()
  await addaddress.clickOnTempAddressAddViewBnt()
  await addaddress.enterTempAddresNotes()
  await addaddress.clickOnTempAddressAddViewBnt()
  await addaddress.closeTempAddressNotesPopup()

  //Billing Corrospondance
  await addaddress.CheckRadiobtnBilllingCorrespondence()
  await addaddress.SelectStartEndDate()
  // await page.pause()
  await addaddress.clickOnSaveAddress()
  await expect(page.getByText('Patient address added successfully')).toHaveText('Patient address added successfully')

  //Add PIP
  //await page.pause()
  await addpip.selectPIPTitle()
  await addpip.enterPIPFamilyName(pipdetailsdata.FamilyName)
  await addpip.enterPIPGivenName(pipdetailsdata.GivenName)
  await addpip.enterPIPMiddleName(pipdetailsdata.MiddleName)
  await addpip.selectPIPBornDate()
  //await page.pause()
  await addpip.selecrPIPEthnicity()
  await addpip.selectPIPOccupation()
  await addpip.enterPIPMobileNumber(pipdetailsdata.MobileNo)
  await addpip.enterPIPEmailId(pipdetailsdata.Email)
  await addpip.selectPIPRelation()
  await addpip.selectPIPNextOfKin()
  await addpip.SelectPIPFamilyAwareOfIllness()
  //await page.pause()
  //await addpip.selectPIPIdentifierType()
  // await addpip.enterPIPIdentifier()
  await addpip.enterExternalProfessional(pipdetailsdata.ExternalProfessional)
  //await page.pause() 
  await addpip.enterProfessionalTitle(pipdetailsdata.PIPTitle)
  await addpip.selectPIPReceivePatientLetter()
  await addpip.selectPIPReceiveAppointmentLetter()
  await addpip.selectPIPPartnerDetailsOnRegForm()
  await addpip.checkSendPatientTextEmail()
  await addpip.checkIsReferrer()
  await addpip.enterPIPNotes()
  //await page.pause()
  await addpip.checkcAssistingInPartner()
  await addpip.checkHelpingPatients()
  await addpip.checkBeingPhotographed()
  await addpip.checkGeneralPublicity()
  await addpip.ClickOnSavePIP()
  await expect(page.getByText('Patient interested party details added successfully')).toHaveText('Patient interested party details added successfully')

  //View PIP
  //await page.pause()
  await viewpip.clickOnViewPIPLink()
  await viewpip.clickOnCloseViewPopup()
  await viewpip.clickOnNextbntViewPIP()

  //Search GP
  await addgp.clickOnSearchGPBtn()
  await addgp.enterGpSearch()
  //await page.pause()
  //await expect(page.getByText('Local GP found')).toHaveText('Local GP found')

  await addgp.clickOnAddGPBtn()

  // Add GP
  await addgp.enterGPTitle(gpdata.GPTitle)
  await addgp.enterGPInitials(gpdata.GPInitial)
  await addgp.enterGPGivenName(gpdata.GPGivenName)
  await addgp.enterGPFamilyName(gpdata.GPFamilyName)
  await addgp.enterGPCode(gpdata.GPCode)
  await addgp.enterGPPracticeCode(gpdata.GPPracticeCode)
  await addgp.enterGPGMCCode(gpdata.GPGMCCode)
  await addgp.clickOnShowbnt()
  await addgp.selectUnknownPostCode()
  await addgp.enterGPPhone(gpdata.GPPhone)
  await addgp.enterGPFax(gpdata.GPFax)
  await addgp.enterGPWorkPhone(gpdata.GPWorkPhone)
  await addgp.enterGPMobile(gpdata.GPMobile)
  await addgp.enterGPEmail(gpdata.GPEmail)

  await addgp.clickOnSaveGPButton()
  await expect(page.getByText('GP Added Successfully')).toHaveText('GP Added Successfully')  
  await addgp.enterAppGpSearch()
  // Add GP To Patient     
  await addgp.clickOnPersonAddButton()
  await addgp.clickOnNextButtonOnSearchGp()
  await page.waitForTimeout(3000)

  // Print Id Card    
  // Get the upload input element
  const fileInput = await page.$('input[type=file]');
  // Set the file to upload
  const filePath = '../Cellma4Automation/UploadPics/Patient.png';
  // Upload the file
  await fileInput.setInputFiles(filePath);
  await page.getByTestId('Upload').click()
  //await expect(page.getByText('Patient photo uploaded successfully')).toHaveText('Patient photo uploaded successfully')
  await printidcard.clickOnSavebtn()
  await page.waitForTimeout(2000)
  await menu.clickOnMenubtn()
  await menu.clickOnLogout()

});
