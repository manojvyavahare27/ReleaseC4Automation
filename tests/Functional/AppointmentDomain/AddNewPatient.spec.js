const fs = require('fs');
const XLSX = require('xlsx');
const path = 'C:/Riomed/Cellma4Automation'
const mysql = require('mysql');

const { test, expect } = require('@playwright/test');
const connectToDatabase = require('../../../manoj').default;
const { executeQuery } = require('../../../databaseWriteFile'); // Update the path accordingly
import compareJsons from '../../../compareFileOrJson'; // Update the path accordingly

import logger from '../../../Pages/BaseClasses/logger'
import LoginPage from '../../../Pages/BaseClasses/LoginPage';
import Homepage from '../../../Pages/BaseClasses/Homepage';
import PatientSearch from '../../../Pages/PatientDomain/PatientSearch';
import PatientDetails from '../../../Pages/PatientDomain/PatientDetails'
import Environment from '../../../Pages/BaseClasses/Environment';
import Menu from '../../../Pages/BaseClasses/Menu';
import PatientWizard from '../../../Pages/PatientDomain/PatientWizard';
import PatientDuplicateCheck from '../../../Pages/PatientDomain/PatientDuplicateCheck';
import AddPatient from '../../../Pages/PatientDomain/AddPatient';
import AddAddress from '../../../Pages/PatientDomain/AddAddress';
import AddPIP from '../../../Pages/PatientDomain/AddPIP';
import ViewPIP from '../../../Pages/PatientDomain/ViewPIP';
import AddGP from '../../../Pages/PatientDomain/AddGP';
import PrintIDCard from '../../../Pages/PatientDomain/PrintIDCard'
import { TIMEOUT } from 'dns';
import { error } from 'console';

const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")))
const pipdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))
//const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/ExcelToJSON.json")))

const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json")))

// // Array to store console logs
 const consoleLogs = [];

test.describe('Login Tests', () => {
	jsonData.SearchPatient.forEach(async (data, index) => {
		test(`Register New Patient ${data.pat_firstname}`, async ({ page }) => {
		//	try {
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
			logger.info('Username enter successfully')
			await loginpage.enter_Password(logindata.password)
			logger.info('Password enter successfully')
			await loginpage.clickOnLogin()
			logger.info('Clicked on Login button successfully')

			console.log("Login Successfully")
			await homepage.clickOnPatientIcon()
			logger.info('Clicked on Patient Icon successfully')

			await patientsearch.clickOnSearchButton()
			logger.info('Clicked on Search button successfully')

			await patientsearch.enterGivenName(data.pat_firstname)
			logger.info('Given Name entered successfully')

			await patientsearch.enterFamilyName(data.pat_surname)
			logger.info('Family Name entered successfully')

			await patientsearch.selectSex(data.pat_sex)
			//await page.pause()  
			await patientsearch.selectBornDate(data.patdob)
			await patientsearch.clickOnSearchButton()
			await patientsearch.clickOnAddPatientbutton()
			await patientduplicatecheck.clickOnDuplicateCheckButton()
			await expect(page.getByText('Photo Identification required')).toHaveText('Photo Identification required')
			await expect(page.getByText('Photo Identification ID required')).toHaveText('Photo Identification ID required')
			await expect(page.getByText('Middle name(s) is required')).toHaveText('Middle name(s) is required')
			
			//await page.pause()
			await patientduplicatecheck.selectUniqueIdentification()
			// await patientduplicatecheck.enterUniqueIdentificationId(patientdetailsdata.UniqueIdentificationId)
			await patientduplicatecheck.enterUniqueIdentificationId(jsonData.AddNewPatient[index].pid_value1.toString())
			await patientduplicatecheck.selectPhotoIdentification()
			await patientduplicatecheck.enterPhotoIdentification(jsonData.AddNewPatient[index].pid_value2.toString())
			await patientduplicatecheck.selectIssuingCountry(jsonData.AddNewPatient[index].pat_country)
			await patientduplicatecheck.selectTitle(data.pat_title)
			await patientduplicatecheck.enterMiddleName(data.pat_middlename)
			await patientduplicatecheck.enterMaidenName(patientdetailsdata.MaidenName)
			
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


	
			await patientduplicatecheck.enterMobileNumber(data.pat_mobile.toString())
			await patientduplicatecheck.enterEmailId(data.pat_email)
			await patientduplicatecheck.clickOnDuplicateCheckButton()
			//await expect(page.getByText('Duplicate Patients not found')).toHaveText('Duplicate Patients not found')   
			await patientduplicatecheck.clickOnCreatePatientButton()

			//Patient Wizard- Add Patient
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
			await addpatient.selectInterpreterNeeded()
			await addpatient.selectInterpreterType()
			//await addpatient.enterNHSNo(patientdetailsdata.NHSNo)
			//await addpatient.enterHospitalRef(patientdetailsdata.HospitalRef)
			await addpatient.enterHospitalRef(data.pat_hospital_ref)
			// await addpatient.enterIdentifier(patientdetailsdata.Identifier)
			await addpatient.enterPASId(patientdetailsdata.PASId)
			
			await addpatient.selectPatientType()
			await addpatient.selectPrisoner()
			//await page.pause()
			await addpatient.selectBloodType()
			await addpatient.selectRestrictedRegistration()
			await addpatient.selectPatientWebRegistration()
			await addpatient.enterNotes()
			await addpatient.clickOnNextButton()

			//Add Address page    
			//await page.pause()
			await addaddress.clickOnSaveButton()
			await addaddress.enterNumberAndRoad(jsonData.AddAddress[index].add_address1)
			await addaddress.enterTownInAddress(jsonData.AddAddress[index].add_address3)
			await addaddress.enterDestrict(jsonData.AddAddress[index].add_address2)
			await addaddress.enterCounty(jsonData.AddAddress[index].add_address6)
			await addaddress.enterPostCode(jsonData.AddAddress[index].add_address5.toString())
			await addaddress.clickOnFindPostCode()
			await addaddress.enterCountryonPopup()
			await addaddress.clickOnSaveButtonOnPopup()
			//Permanent Address
			// await page.pause()
			await addaddress.enterPermISOCountryCode(jsonData.AddAddress[index].add_iso_country_code.toString())
			await addaddress.enterPermICAOCode(jsonData.AddAddress[index].add_icao_country_code.toString())
			await addaddress.enterPremPhone(jsonData.AddAddress[index].add_phone.toString())
			await addaddress.enterPermEmail(jsonData.AddAddress[index].add_email)
			await addaddress.enterPermWorkPhone(jsonData.AddAddress[index].add_work_phone.toString())
			await addaddress.enterPermFax(jsonData.AddAddress[index].add_fax.toString())
			await addaddress.selectPermHealthRegion()
			await addaddress.selectPermLocationZone()
			await addaddress.clickOnPermAddressAddViewBnt()
			await addaddress.enterPermAddresNotes(jsonData.AddAddress[index].add_notes)

			//Temporary Address
			//await page.pause()			
			await addaddress.enterTempNumberandRoad(jsonData.AddAddress[index].add_address1)
			await addaddress.enterTempTown(jsonData.AddAddress[index].add_address3)
			await addaddress.enterTempDistrict(jsonData.AddAddress[index].add_address2)
			await addaddress.enterTempCounty(jsonData.AddAddress[index].add_address6)
			await addaddress.enterTempPostcode(jsonData.AddAddress[index].add_address5.toString())
			await addaddress.enterTempISOCountryCode()
			await addaddress.enterTempICAOCountryCode()
			//await page.pause()
			await addaddress.enterTempPhone(jsonData.AddAddress[index].add_phone.toString())
			await addaddress.enterTempEmail(jsonData.AddAddress[index].add_email)
			await addaddress.enterTempWorkPhone(jsonData.AddAddress[index].add_work_phone.toString())
			await addaddress.enterTempFax(jsonData.AddAddress[index].add_fax.toString())
			await addaddress.selectTempHealthRegion()
			await addaddress.selectTempLocationZone()
			await addaddress.clickOnTempAddressAddViewBnt()
			await addaddress.enterTempAddresNotes()
			await addaddress.clickOnTempAddressAddViewBnt()
			await addaddress.closeTempAddressNotesPopup(jsonData.AddAddress[index].add_notes)

			//Billing Corrospondance
			await addaddress.CheckRadiobtnBilllingCorrespondence()
			await addaddress.SelectStartEndDate()
			//await page.pause()
			await addaddress.clickOnSaveAddress()
			await page.waitForTimeout(2000)
			//await expect(page.getByText('Patient address added successfully')).toHaveText('Patient address added successfully')

			//Add PIP
			//await page.pause()
			await addpip.selectPIPTitle()
			await addpip.enterPIPFamilyName(pipdetailsdata.FamilyName)
			await addpip.enterPIPGivenName(pipdetailsdata.GivenName)
			await addpip.enterPIPMiddleName(pipdetailsdata.MiddleName)
			await addpip.selectPIPBornDate()
			
			await addpip.selecrPIPEthnicity()
			await addpip.selectPIPOccupation()
			await addpip.enterPIPMobileNumber(pipdetailsdata.MobileNo)
			await addpip.enterPIPEmailId(pipdetailsdata.Email)
			await addpip.selectPIPRelation()
			await addpip.selectPIPNextOfKin()
			await addpip.SelectPIPFamilyAwareOfIllness()
			
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
			await addpip.checkcAssistingInPartner()
			await addpip.checkHelpingPatients()
			await addpip.checkBeingPhotographed()
			await addpip.checkGeneralPublicity()
			await addpip.ClickOnSavePIP()
			await page.waitForTimeout(1000)
			await expect(page.getByText('Patient interested party details added successfully')).toHaveText('Patient interested party details added successfully')

			//View PIP
			//await page.pause()
			await viewpip.clickOnViewPIPLink()
			await viewpip.clickOnCloseViewPopup()
			await viewpip.clickOnNextbntViewPIP()

			//Search GP
			await addgp.clickOnSearchGPBtn()
			await addgp.enterGpSearch()
			await page.waitForTimeout(1000)
			await expect(page.getByText('Local GP found')).toHaveText('Local GP found')
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
			await page.waitForTimeout(1000)
			await expect(page.getByText('GP Added Successfully')).toHaveText('GP Added Successfully')
			
			await addgp.enterAppGpSearch()
			// Add GP To Patient     
			await addgp.clickOnPersonAddButton()
			await addgp.clickOnNextButtonOnSearchGp()
			await page.waitForTimeout(3000)
			//await page.pause()

			// Print Id Card    
			// Get the upload input element
			const fileInput = await page.$('input[type=file]');
			// Set the file to upload
			const filePath = '../Cellma4Automation/UploadPics/Patient.png';
			// Upload the file
			await fileInput.setInputFiles(filePath);
			await page.getByTestId('Upload').click()
			await page.waitForTimeout(1000)
			
			//await expect(page.getByText('Patient photo uploaded successfully')).toHaveText('Patient photo uploaded successfully')
			await printidcard.clickOnSavebtn()
			await page.waitForTimeout(2000)

			//////// Patient Detail comparison/////////

			// select add_email, add_mobile, add_phone,pat_name_other_lang, pat_need_interpreter_at_appointments from patients join addresses on pat_add_id = add_id where pat_id = 787310;
			const query = "select * from patients where pat_hospital_ref= '"+data.pat_hospital_ref+"' order by pat_id desc limit 1"
			const patSqlFile='C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientData.json'
			const results = await executeQuery(query,patSqlFile);
			console.log('\n Patient Details stored into the database: \n', results);
			const patId=results[0].pat_id;			
			const jsonFilePath1 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientData.json';
			var match1 = await compareJsons(jsonFilePath1, null, data);
			if (match1) {
				console.log('\n Patient Details Comparision: Parameters from both JSON files match!\n');
			} else {
				console.log('\n Patient Details Comparision: Parameters from both JSON files do not match!\n');
			}
			
			//////// Patient UNique Identifier comparison/////////

			const queryI = "Select pid_value from patient_identifiers where pid_pat_id="+patId;
			const patSqlFileI='C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientIData.json'
			const resultsI = await executeQuery(queryI,patSqlFileI);
			var match3=0
  		 	if(resultsI[0].pid_value==jsonData.AddNewPatient[index].pid_value1)
			{
  				if(resultsI[1].pid_value==jsonData.AddNewPatient[index].pid_value2)
				match3=1
			}
			else if(resultsI[0].pid_value==jsonData.AddNewPatient[index].pid_value2)
			{
  				if(resultsI[1].pid_value==jsonData.AddNewPatient[index].pid_value1)
				match3=1
			}
			if (match3) {
				console.log('\n Patient Identifier Comparision: Parameters from both JSON files match!\n');
			} else {
				console.log('\n Patient Identifier Comparision: Parameters from both JSON files do not match!\n');
			}
			

			//////// Address Detail comparison/////////	
			const query1 = "select * from addresses where add_pat_id="+patId+" and add_temp_permanent='P' order by add_id limit 1"
			const patSqlFile1='C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'
			const results1 = await executeQuery(query1,patSqlFile1);
			console.log('\n Address Details stored into the database: \n', results1);
			// Option 1: Provide a second JSON file path
			// Provide both file path to the compareJsons.js file
			const jsonFilePath3 = 'C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientAddressData.json'; // Update with the actual file path
			const match2 = await compareJsons(jsonFilePath3, null, jsonData.AddAddress[index]);
			if (match2) {
				console.log('\n Address Details Comparision: Parameters from both JSON files match!\n');
			} else {
				console.log('\n Address Details Comparision: Parameters from both JSON files do not match!\n');
			}

			await menu.clickOnMenubtn()
			await menu.clickOnLogout()
			//Listen for console events
			page.on('console', async msg => {
				const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
				consoleLogs.push({
					type: msg.type(),
					text: args.join(' ')
				});
			});

			// await menu.clickOnMenubtn()
			// await menu.clickOnLogout()
			// Listen for console events
			page.on('console', async msg => {
				const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
				consoleLogs.push({
					type: msg.type(),
					text: args.join(' ')
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
})
});
});
