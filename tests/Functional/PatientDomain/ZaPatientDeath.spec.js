const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql");

//import { test, expect } from "@playwright/test";
const connectToDatabase = require("../../../manoj").default;
const { executeQuery } = require("../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../compareFileOrJson";


import { test, expect, Page, chromium } from '@playwright/test';
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
import PrintIDCard from '../../../Pages/PatientDomain/PrintIDCard';
import ConfirmExisting from '../../../Pages/PatientDomain/ConfirmExisting';
import TopBlueBar from '../../../Pages/BaseClasses/TopBlueBar';
import EditPatient from '../../../Pages/PatientDomain/EditPatient';
import PatientDeath from '../../../Pages/PatientDomain/PatientDeath';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")))
const pipdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))
const deadpatient=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/DeadPatientDetails.json")))
const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json")))
// // Array to store console logs
 const consoleLogs = [];

 test.describe("Login Tests", () => {
  jsonData.addPatient.forEach(async (data, index) => {
    test("Patient ${data.pat_firstname} is Dead", async ({ page }) => {
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
    const confirmexisting=new ConfirmExisting(page)
    const menu=new Menu(page)
    const topbluebar=new TopBlueBar(page)
    const editpatient=new EditPatient(page)
    const patientdeath=new PatientDeath(page)
    
    await page.goto(environment.Test);
    await loginpage.enterUsername(jsonData.loginDetails[0].username);    
    await loginpage.enter_Password(jsonData.loginDetails[0].password);   
    await loginpage.clickOnLogin();   
   // await page.pause()
    await homepage.clickonSidebarHomeIcon()
    await homepage.clickOnPatientIcon()   
    await patientsearch.enterGivenName(jsonData.patDetails[index].pat_firstname);  
      await patientsearch.enterFamilyName(jsonData.patDetails[index].pat_surname);       
    await patientsearch.clickOnSearchButton()
    await patientsearch.clickOnSearchPatientLink()
    // await page.pause()
  
    //await patientsearch.ClickOnYesConfirmLegitimateRelationship()
    await confirmexisting.clickOnConfirmExistingDetails()    
    await topbluebar.clickOnTopBlueBar()
    await editpatient.clickOnPatientDetails()
    await editpatient.clickOnLinks()
    await editpatient.clickOnDeathLink()
    // await page.pause()
    await patientdeath.enterCauseOfDeathReason(jsonData.patCauseOfDeath[index].pod_cause)
    //await page.pause()
    await patientdeath.selectCheckBoxDeathCauseReason()
   // await page.pause()
    //await patientdeath.enterCauseOfDeathWithCode()
    await patientdeath.enterCauseOfDeathType()
    // await page.pause()
    await patientdeath.enterOtherCauseeOfDeath()
   // await patientdeath.checkSearchAntecedentcauseofDeath()
    
    await patientdeath.enterAdditionalNotes(jsonData.patDetails[index].pat_death_notes)
    await patientdeath.selectDateOfDeath(jsonData.patDetails[index].pat_dod)
    await patientdeath.selectMarkPatientAsDead()
    await patientdeath.clickOnSaveButton()


     //////// Patient Death Detail comparison/////////
     var sqlQuery = "select * from patients where pat_hospital_ref= '" + jsonData.patDetails[index].pat_hospital_ref + "' order by pat_id desc limit 1";
     var sqlFilePath = "SQLResults/PatientDomain/patientDeathData.json";
     var results = await executeQuery(sqlQuery, sqlFilePath);
     console.log("\n Patient Details stored into the database: \n", results);
     const patId = results[0].pat_id;
     var match = await compareJsons(sqlFilePath, null, data);
     if (match) {
        console.log("\n Patient Death Details Comparision: Parameters from both JSON files match!\n");
     } else {
         console.log("\n Patient Death Details Comparision: Parameters from both JSON files do not match!\n");
     }
    
     
     //////// Patient Primary Cause of Death comparison/////////
     var sqlQuery = "select * from patient_cause_of_death where pod_pat_id="+patId+" limit 1";
     var sqlFilePath = "SQLResults/PatientDomain/patientCauseOfDeath.json";
     var results = await executeQuery(sqlQuery, sqlFilePath);
     console.log("\n Patient Details stored into the database: \n", results);
     var match = await compareJsons(sqlFilePath, null,jsonData.patCauseOfDeath[index]);
     if (match)      
     {
         console.log("\n Patient's Primary Cause of Death Comparision: Parameters from both JSON files match!\n");
     } else {
         console.log("\n Patient's Primary Cause of Death Comparision: Parameters from both JSON files do not match!\n");
     }
    
     
     //////// Patient Other Cause of Death comparison/////////
     var sqlQuery = "select * from patient_cause_of_death where pod_pat_id="+patId+" order by 1 desc limit 1";
     var sqlFilePath = "SQLResults/PatientDomain/patientCauseOfDeath.json";
     var results = await executeQuery(sqlQuery, sqlFilePath);
     console.log("\n Patient Details stored into the database: \n", results);
     var match = await compareJsons(sqlFilePath, null,jsonData.patOtherCauseOfDeath[index]);
     if (match) {
         console.log(
             "\n Patient's Other Cause of Death Comparision: Parameters from both JSON files match!\n"
         );
     } else {
         console.log(
             "\n Patient's Other Cause of Death Comparision: Parameters from both JSON files do not match!\n"
         );
     }
        
    //await expect(page.getByText('Patient death added successfully')).toHaveText('Patient death added successfully')
   // await expect(page.getByText('No GP associated with patient In order to send texts to the patient the patient\'')).toHaveText('No GP associated with patient In order to send texts to the patient the patient\'')
    await patientdeath.clickOnViewInReadOnly()
    
    //await expect(page.getByRole('heading', { name: 'This patient is deceased' })).toHaveText('This patient is deceased')
   // await patientdeath.enterCauseOfDeathType()
   // await page.pause()

});
});
});