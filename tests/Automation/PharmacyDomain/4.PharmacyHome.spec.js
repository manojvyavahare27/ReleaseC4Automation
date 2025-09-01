//Sathyanarayan

const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql2");
const convertExcelToJson = require("../../../config/global-setupOptimized");

const { test, expect } = require("@playwright/test");
const connectToDatabase = require("../../../manoj").default;
const { executeQuery } = require("../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../compareFileOrJson";

import logger from "../../../Pages/BaseClasses/logger";
import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import ConfirmExisting from "../../../Pages/PatientDomain/ConfirmExisting";
import ContactHistory from "../../../Pages/ClinicalDomain/PatientSummary/ContactHistory";
import PatientSearch from "../../../Pages/PatientDomain/PatientSearch";
import Environment from "../../../Pages/BaseClasses/Environment";
import Menu from "../../../Pages/BaseClasses/Menu";
import ClinicalSummary from "../../../Pages/ClinicalDomain/PatientSummary/ClinicalSummary";
import ClinicalExtraDetails from "../../../Pages/ClinicalDomain/PatientSummary/ClinicalExtraDetails";
import PharmacyLocation from "../../../Pages/PharmacyDomain/PharmacySidebar"
import PharmacyHome from "../../../Pages/PharmacyDomain/PharmacyHomePage"
import PharmacySidebars from "../../../Pages/PharmacyDomain/PharmacySidebar";



import { TIMEOUT } from "dns";
import { error } from "console";
import { before } from "node:test";
import { toggleDivVisibility } from "../../../UtilFiles/DynamicUtility";
import PharmacyHomePage from "../../../Pages/PharmacyDomain/PharmacyHomePage";
import PharmacySidebar from "../../../Pages/PharmacyDomain/PharmacySidebar";

// Array to store console logs

const consoleLogs = [];
let jsonData;

test.describe("Excel Conversion Medications Category", () => {
  test("Extract Patient Summary Details", async ({}) => {
    const excelFilePath =
      process.env.EXCEL_FILE_PATH || "./ExcelFiles/PharmacyDomain.xlsx";
    const jsonFilePath = "./TestDataWithJSON/PharmacyDomain/PharmacyDetails.json";

    console.log("excelFilePath:", excelFilePath);
    console.log("jsonFilePath:", jsonFilePath);
    const conversionSuccess = await convertExcelToJson(
      excelFilePath,
      jsonFilePath
    );
    if (conversionSuccess) {
      // jsonData = require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json");
      jsonData = require("../../../TestDataWithJSON/PharmacyDomain/PharmacyDetails.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });
});

test.describe("Medications Category", () => {
  test("Add Medications", async ({ page }) => {
    if (!jsonData || !jsonData.addPatient) {
      throw new Error("JSON data is missing or invalid.");
    }
    let index = 0;
    for (const data of jsonData.addPatient) {
      const loginpage = new LoginPage(page);
      const homepage = new Homepage(page);
      const environment = new Environment(page);
      const confirmexisting = new ConfirmExisting(page);
      const contacthistory = new ContactHistory(page);
      const patientsearch = new PatientSearch(page);
      const Medications = new ClinicalSummary(page);
      const MedicationsExtraDetails = new ClinicalExtraDetails(page);
      const pharmacyLoc=new PharmacyLocation(page)
      const pharmacyHomePage=new PharmacyHome(page)
      const pharmacySidebar=new PharmacySidebar(page)
      
      

      const menu = new Menu(page);
      await page.goto(environment.Test);
      await loginpage.enterUsername(jsonData.loginDetails[0].username);
      logger.info("Username enter successfully");
      await page.waitForTimeout(1000);
      await loginpage.enter_Password(jsonData.loginDetails[0].password);
      logger.info("Password enter successfully");
      await loginpage.clickOnLogin();      
      logger.info("Clicked on Login button successfully");
      await page.pause()
      await homepage.clickOnHomeDashboardIcon()
      await homepage.clickOnPharmacyIcon()
      //await pharmacyLoc.clickOnCardioLocation()
      
      // Prescription Tab
      await pharmacyHomePage.clickPrescriptionTab();
      await pharmacyHomePage.clickPrescriptionTab();
      await pharmacyHomePage.clickSearchButton();
      await pharmacyHomePage.enterRxBarcode('');
      await pharmacyHomePage.enterPatientGivenName(jsonData.addPatient[index].pat_firstname.toString());
      await pharmacyHomePage.enterPatientFamilyName(jsonData.addPatient[index].pat_surname.toString());
      //await pharmacyHomePage.enterServiceName('General Medicine Automation');
      //await pharmacyHomePage.enterPrescriptionStatus('Collected');
      //await pharmacyHomePage.enterPharmacySearchLocation('Cardio Location');
      await pharmacyHomePage.ClickOnSearchButton()
      
      await pharmacySidebar.clickOnFindPatientSidebarLink()

      //Search for patient
      await patientsearch.enterGivenName(jsonData.addPatient[index].pat_firstname.toString());
      logger.info("Given Name entered successfully");
     
      await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname.toString());
      logger.info("Family Name entered successfully");
      //await patientsearch.selectSex(data.pat_sex);
      //await patientsearch.selectBornDate(data.pat_dob);
      //await patientsearch.selectBornDate(formattedDate);
      await patientsearch.clickOnSearchButton();
      await patientsearch.clickOnSearchPatientLink();
        await patientsearch.ClickOnYesConfirmLegitimateRelationship()
      await page.waitForTimeout(2000);
      await page.pause()
      await pharmacyHomePage.fillPrescriptionType('General');
      await pharmacyHomePage.fillPrescriptionCode('123');
      await pharmacyHomePage.fillNotes('add for testing');
      
      

     // await Medications.selectandAddClinicalItem(jsonData.AddMedication[index].pacr_que_name)
      await pharmacyHomePage.clickHistoryIconForMedicine(jsonData.AddMedication[index].pacr_que_name)
      
      // await pharmacyHomePage.clickOnClosePopup()
      // await pharmacyHomePage.clickOnAssociatedConditionIcon()
      // await pharmacyHomePage.clickOnClosePopup()
      // await pharmacyHomePage.clickOnSideEffectIcon()
      // await pharmacyHomePage.clickOnClosePopup()
      await pharmacyHomePage.selectCheckBoxforPrescription()
      await pharmacyHomePage.clickOncreatePrescription()
      await page.waitForTimeout(1000);
      
      await pharmacyHomePage.clickOnitemWithPrescriptionLink()
      await pharmacyHomePage.clickOnitemsOnlyLink()
      await pharmacyHomePage.clickOncancelledPrescriptionLink()
      await pharmacyHomePage.clickOnitemsOnlyLink()
      await pharmacyHomePage.clickOnitemNotOnPrescriptionLink()
      await pharmacyHomePage.clickOnitemWithPrescriptionLink()
      await pharmacyHomePage.ClickOnExpandMedication()
      await pharmacyHomePage.clickOnRefillLeftLink()
      await pharmacyHomePage.enterExternalRefillQty()
      await page.getByTestId('CommonCellmaPopup').getByTestId('Save').click();
      //await pharmacyHomePage.clickOnSaveExternalRefillQty()
      //Updated Prescription Refills
      await expect(page.getByText("Updated Prescription Refills")).toHaveText("Updated Prescription Refills");

      await pharmacyHomePage.clickOnAwaitingProductionLink()
      await pharmacyHomePage.clickAwaitingProduction()
      await page.getByRole('button', { name: 'Save' }).click()
      //await pharmacyHomePage.clickOnSaveButton()
      await expect(page.getByText("Prescription updated successfully")).toHaveText("Prescription updated successfully");
      await page.waitForTimeout(1000)
      await pharmacyHomePage.clickOnAwaitingProductionLink()
      await pharmacyHomePage.clickPartiallyProduced()
      await page.getByRole('button', { name: 'Save' }).click()
      //await pharmacyHomePage.clickOnSaveButton()
      await expect(page.getByText("Prescription updated successfully")).toHaveText("Prescription updated successfully");
      await page.waitForTimeout(1000)
      await page.pause()
      await pharmacyHomePage.clickOnPartiallyProducedLink()
      await pharmacyHomePage.clickOnExpandIconForDispense()
      await page.waitForTimeout(1000)
      await pharmacyHomePage.enterDispenseQty()
      await page.waitForTimeout(1000)
      await pharmacyHomePage.clickOnDispenseButton()
      await page.getByRole('button', { name: 'Save' }).click()
      //await pharmacyHomePage.clickOnSaveButton()

      await expect(page.getByText("Prescription updated successfully")).toHaveText("Prescription updated successfully");
      await pharmacyHomePage.clickProduced()
      await page.getByRole('button', { name: 'Save' }).click()
      await pharmacyHomePage.clickOnProducedLink()
      await page.waitForTimeout(1000)
      await pharmacyHomePage.clickCollected()
      await page.getByRole('button', { name: 'Save' }).click()
      //await pharmacyHomePage.clickOnSaveButton()
      await expect(page.getByText("Prescription updated successfully")).toHaveText("Prescription updated successfully");
      await page.waitForTimeout(1000)      
      // await page.pause()
      //  await pharmacyHomePage.clickExpandIcon()
      //  await page.waitForTimeout(1000)
      //  await pharmacyHomePage.clickOnBackToStockButton()
      //  await page.waitForTimeout(1000)
      //  await backtoStock.enterBatchQty()
      //  await backtoStock.enterReasonforReturn()
      //  await backtoStock.clickOnSavebutton()       
      //  await expect(page.getByText("Items returned successfully")).toHaveText("Items returned successfully");
      //  await page.waitForTimeout(2000)
      //await addStockItems.clickOnLogout(page)   



    }
  });
});
