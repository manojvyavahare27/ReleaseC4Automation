const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql");

import { test, expect } from "@playwright/test";
const connectToDatabase = require("../../../manoj").default;
const { executeQuery } = require("../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../compareFileOrJson";

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
const pipdetailsdata=JSON.parse(JSON.stringify(require("../../..//TestData/PatientDomain/PIPDetails.json")))
const gpdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))
const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json")));

test.describe("Login Tests", () => {
jsonData.SearchPatient.forEach(async (data, index) => {
test('Confirm Existing Details @Functional', async ({page}) => {
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

    await page.goto(environment.Test)  
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password)    
    await loginpage.clickOnLogin()       
    await homepage.clickonSidebarHomeIcon() 
    await homepage.clickOnPatientIcon()  
    await patientsearch.clickOnSearchButton()
    await patientsearch.enterGivenName(jsonData.SearchPatient[index].pat_firstname.toString());
      await patientsearch.enterFamilyName(jsonData.SearchPatient[index].pat_surname.toString());
    await patientsearch.clickOnSearchButton()
    await patientsearch.clickOnSearchPatientLink()
    //await page.pause()
    // await patientsearch.ClickOnYesConfirmLegitimateRelationship()
    // await confirmexisting.entertxtboxAlsoKnow()    
    //await confirmexisting.selectInterpreterReq()
    await confirmexisting.entertxtboxAlsoKnow(jsonData.ConfirmExistingDetails[index].pat_name_other_lang.toString());
    //await confirmexisting.selectInterpreterReq()
    await confirmexisting.enterEmailId(jsonData.ConfirmExistingDetails[index].add_email.toString());
    await confirmexisting.enterMobile(jsonData.ConfirmExistingDetails[index].add_mobile.toString());
    await confirmexisting.enterPhoneNo(jsonData.ConfirmExistingDetails[index].add_phone.toString());
    // await confirmexisting.selectTitleForNextofKin()
    // await confirmexisting.enterGivenNameOfNextOfKin()
    // await confirmexisting.enterFamilyNameforNextofKin()
    // await confirmexisting.selectRelationship()   
    // await confirmexisting.enterEmailIsForNextofKin()
    // await confirmexisting.enterMobileforNextOfKin()
    // await confirmexisting.enterPhoneNoofNextOfKin()
    await confirmexisting.enterCompanyName(jsonData.ConfirmExistingDetailsTAdd[index].add_company_name.toString());
      await confirmexisting.enterRoadNumber(jsonData.ConfirmExistingDetailsTAdd[index].add_address1.toString());
      await confirmexisting.enterPostCode(jsonData.ConfirmExistingDetailsTAdd[index].add_address5.toString());   
    await confirmexisting.enterTempContactDetails()
    //await confirmexisting.selectBilling()
    await confirmexisting.enterTempAddressDetails()
    await confirmexisting.clickOnSaveChangeDetails()
    //await expect(page.getByText('Patient details changed successfully')).toHaveText('Patient details changed successfully')
    
}
);
});
});