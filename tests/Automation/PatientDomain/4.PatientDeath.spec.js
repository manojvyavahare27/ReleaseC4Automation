import fs from 'fs';
import path from 'path';

import convertExcelToJson from "../../../config/global-setupOptimized";
import compareJsons from "../../../compareFileOrJson";
import { executeQuery } from "../../../databaseWriteFile";

// import all your pages here...
// ...


import { test, expect, Page, chromium } from '@playwright/test';
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
import PrintIDCard from '../../../Pages/PatientDomain/PrintIDCard';
import ConfirmExisting from '../../../Pages/PatientDomain/ConfirmExisting';
import TopBlueBar from '../../../Pages/BaseClasses/TopBlueBar';
import EditPatient from '../../../Pages/PatientDomain/EditPatient';
import PatientDeath from '../../../Pages/PatientDomain/PatientDeath';

const EXCEL_PATH = "./ExcelFiles/PatientDomain.xlsx";
const JSON_PATH = "./TestDataWithJSON/PatientDomain/PatientDetails.json";

// Step 1: Convert Excel to JSON before test registration (sync if possible)
if (!fs.existsSync(JSON_PATH)) {
  console.error("ERROR: JSON file does not exist. Run Excel to JSON conversion first.");
  process.exit(1); // prevent tests from running
}

const jsonData = require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json");

test.describe("Patient Domain DB Comparison", () => {

  test.describe("Login Tests", () => {

    for (const [index, data] of jsonData?.addPatient?.entries() || []) {
      test(`Patient ${data.pat_firstname} Demographics Details`, async ({ page }) => {

        // create instances for page objects
        const loginpage = new LoginPage(page);
        const homepage = new Homepage(page);
        const environment = new Environment(page);
        const patientsearch = new PatientSearch(page);
        const confirmexisting = new ConfirmExisting(page);
        const topbluebar = new TopBlueBar(page);
        const editpatient = new EditPatient(page);
        const patientdeath = new PatientDeath(page);

        await page.goto(environment.Test);
        await loginpage.enterUsername(jsonData.loginDetails[0].username);
        await loginpage.enter_Password(jsonData.loginDetails[0].password);
        await loginpage.clickOnLogin();
        await homepage.clickonSidebarHomeIcon();
        await homepage.clickOnPatientIcon();

        await patientsearch.enterGivenName(jsonData.patDetails[index].pat_firstname);
        await patientsearch.enterFamilyName(jsonData.patDetails[index].pat_surname);
        await patientsearch.clickOnSearchButton();
        await patientsearch.clickOnSearchPatientLink();
        await confirmexisting.clickOnConfirmExistingDetails();

        await topbluebar.clickOnTopBlueBar();
        await editpatient.clickOnPatientDetails();
        await editpatient.clickOnLinks();
        await editpatient.clickOnDeathLink();

        await patientdeath.enterCauseOfDeathReason(jsonData.patCauseOfDeath[index].pod_cause);
        await patientdeath.selectCheckBoxDeathCauseReason();
        await patientdeath.enterCauseOfDeathType();
        await patientdeath.enterOtherCauseeOfDeath();
        await patientdeath.enterAdditionalNotes(jsonData.patDetails[index].pat_death_notes);
        await patientdeath.selectDateOfDeath();
        await patientdeath.selectMarkPatientAsDead();
        await patientdeath.clickOnSaveButton();

        // Patient DB Verification
        const sqlQuery1 = `select * from patients where pat_hospital_ref='${jsonData.patDetails[index].pat_hospital_ref}' order by pat_id desc limit 1`;
        const sqlFile1 = "SQLResults/PatientDomain/patientDeathData.json";
        const results1 = await executeQuery(sqlQuery1, sqlFile1);
        const patId = results1[0].pat_id;
        const match1 = await compareJsons(sqlFile1, null, data);
        console.log(match1 ? "✅ Patient Death matched" : "❌ Patient Death mismatch");

        const sqlQuery2 = `select * from patient_cause_of_death where pod_pat_id=${patId} limit 1`;
        const sqlFile2 = "SQLResults/PatientDomain/patientCauseOfDeath.json";
        const results2 = await executeQuery(sqlQuery2, sqlFile2);
        const match2 = await compareJsons(sqlFile2, null, jsonData.patCauseOfDeath[index]);
        console.log(match2 ? "✅ Primary Cause matched" : "❌ Primary Cause mismatch");

        const sqlQuery3 = `select * from patient_cause_of_death where pod_pat_id=${patId} order by 1 desc limit 1`;
        const sqlFile3 = "SQLResults/PatientDomain/patientCauseOfDeath.json";
        const results3 = await executeQuery(sqlQuery3, sqlFile3);
        const match3 = await compareJsons(sqlFile3, null, jsonData.patOtherCauseOfDeath[index]);
        console.log(match3 ? "✅ Other Cause matched" : "❌ Other Cause mismatch");

        await patientdeath.clickOnViewInReadOnly();
      });
    }
  });
});
