const fs = require("fs");
const XLSX = require("xlsx");
const path = require("path");
const mysql = require("mysql2");

const { test, expect } = require('@playwright/test');
const convertExcelToJson = require('../../../config/global-setupOptimized');
const connectToDatabase = require("../../../manoj");
const { executeQuery } = require("../../../databaseWriteFile");
const compareJsons = require("../../../compareFileOrJson");

//import { test, expect, Page, chromium } from '@playwright/test';
import logger from '../../../Pages/BaseClasses/logger'
import LoginPage from '../../../Pages/BaseClasses/LoginPage';
import Homepage from '../../../Pages/BaseClasses/Homepage';
import PatientSearch from '../../../Pages/PatientDomain/PatientSearch';
import PatientDetails from '../../../Pages/PatientDomain/PatientDetails'
import Environment from '../../../Pages/BaseClasses/Environment';
import Menu from '../../../Pages/BaseClasses/Menu';
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
import PatientDeath from '../../../Pages/PatientDomain/PatientDeath';

//const LoginPage = require('../../../Pages/BaseClasses/LoginPage');
// const Homepage = require('../../../Pages/BaseClasses/Homepage');
// const PatientSearch = require('../../../Pages/PatientDomain/PatientSearch');
// const PatientDetails = require('../../../Pages/PatientDomain/PatientDetails');
// const Environment = require('../../../Pages/BaseClasses/Environment');
// const Menu = require('../../../Pages/BaseClasses/Menu');
// const PatientWizard = require('../../../Pages/PatientDomain/PatientWizard');
// const PatientDuplicateCheck = require('../../../Pages/PatientDomain/PatientDuplicateCheck');
// const AddPatient = require('../../../Pages/PatientDomain/AddPatient');
// const AddAddress = require('../../../Pages/PatientDomain/AddAddress');
// const AddPIP = require('../../../Pages/PatientDomain/AddPIP');
// const ViewPIP = require('../../../Pages/PatientDomain/ViewPIP');
// const AddGP = require('../../../Pages/PatientDomain/AddGP');
// const PrintIDCard = require('../../../Pages/PatientDomain/PrintIDCard');
// const ConfirmExisting = require('../../../Pages/PatientDomain/ConfirmExisting');
// const TopBlueBar = require('../../../Pages/BaseClasses/TopBlueBar');
// const EditPatient = require('../../../Pages/PatientDomain/EditPatient');
// const PatientDeath = require('../../../Pages/PatientDomain/PatientDeath');

const consoleLogs = [];
let jsonData;

test.describe("Patient Domain Db Comparison", () => {
  test.beforeAll(async () => {
    const excelFilePath = process.env.EXCEL_FILE_PATH || "./ExcelFiles/PatientDomain.xlsx";
    const jsonFilePath = "./TestDataWithJSON/PatientDomain/PatientDetails.json";
    const conversionSuccess = await convertExcelToJson(excelFilePath, jsonFilePath);
    if (!conversionSuccess) {
      throw new Error("Excel to JSON conversion failed.");
    }
    jsonData = require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json");
    console.log("Excel converted and JSON loaded successfully.");
  });

  test.describe('Pharmacy New Patient', () => {
    test('Pharmacy Register New Patient', async ({ page }) => {
      if (!jsonData || !jsonData.addPatient) {
        throw new Error('JSON data is missing or invalid.');
      }
      let index = 0
      for (const data of jsonData.addPatient) {
        const loginpage = new LoginPage(page);
        const homepage = new Homepage(page);
        const environment = new Environment(page);
        const patientsearch = new PatientSearch(page);
        const confirmexisting = new ConfirmExisting(page);
        const topbluebar = new TopBlueBar(page);
        const editpatient = new EditPatient(page);
        const patientdeath = new PatientDeath(page);

        await page.goto(environment.Test);
        await page.waitForTimeout(1000);
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

        // DB: Patient Details
        const sqlQuery1 = `SELECT * FROM patients WHERE pat_hospital_ref='${jsonData.patDetails[index].pat_hospital_ref}' ORDER BY pat_id DESC LIMIT 1`;
        const sqlFile1 = "SQLResults/PatientDomain/patientDeathData.json";
        const result1 = await executeQuery(sqlQuery1, sqlFile1);
        const patId = result1[0].pat_id;
        const match1 = await compareJsons(sqlFile1, null, data);
        console.log(match1
          ? "\n✅ Patient Death details match!"
          : "\n❌ Patient Death details do NOT match!");

        // DB: Primary Cause of Death
        const sqlQuery2 = `SELECT * FROM patient_cause_of_death WHERE pod_pat_id=${patId} LIMIT 1`;
        const sqlFile2 = "SQLResults/PatientDomain/patientPrimaryCause.json";
        const result2 = await executeQuery(sqlQuery2, sqlFile2);
        const match2 = await compareJsons(sqlFile2, null, jsonData.patCauseOfDeath[index]);
        console.log(match2
          ? "\n✅ Primary cause of death matches!"
          : "\n❌ Primary cause of death does NOT match!");

        // DB: Other Cause of Death
        const sqlQuery3 = `SELECT * FROM patient_cause_of_death WHERE pod_pat_id=${patId} ORDER BY 1 DESC LIMIT 1`;
        const sqlFile3 = "SQLResults/PatientDomain/patientOtherCause.json";
        const result3 = await executeQuery(sqlQuery3, sqlFile3);
        const match3 = await compareJsons(sqlFile3, null, jsonData.patOtherCauseOfDeath[index]);
        console.log(match3
          ? "\n✅ Other cause of death matches!"
          : "\n❌ Other cause of death does NOT match!");

        await patientdeath.clickOnViewInReadOnly();
      }
    });
  });
});
