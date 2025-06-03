const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql");
const convertExcelToJson = require("../../../../../../config/global-setupOptimized");

const { test, expect } = require("@playwright/test");
const connectToDatabase = require("../../../../../../manoj").default;
const { executeQuery } = require("../../../../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../../../../../Cellma4Automation/compareFileOrJson";

import logger from "../../../../../../Pages/BaseClasses/logger";
import LoginPage from "../../../../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../../../../Pages/BaseClasses/Homepage";
import ConfirmExisting from "../../../../../../Pages/PatientDomain/ConfirmExisting";
import ContactHistory from "../../../../../../Pages/PatientDomain/ContactHistory";
import PatientSearch from "../../../../../../Pages/PatientDomain/PatientSearch";
import Environment from "../../../../../../Pages/BaseClasses/Environment";
import Menu from "../../../../../../Pages/BaseClasses/Menu";
import MedicationHomePage from "../../../../../../Pages/ClinicalDomain/PatientSummary/Categories/Medications/MedicationHomePage";
import MedicationAddED from "../../../../../../Pages/ClinicalDomain/PatientSummary/Categories/Medications/MedicationAddED";

import { TIMEOUT } from "dns";
import { error } from "console";
import { before } from "node:test";

// const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")));
// const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")));
// const pipdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")));
// const gpdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")));

// Array to store console logs

const consoleLogs = [];
let jsonData;

test.describe("Excel Conversion Medication Category", () => {
  test("Extract Patient Summary Details", async ({}) => {
    const excelFilePath =
      process.env.EXCEL_FILE_PATH || "./ExcelFiles/PatientSummary.xlsx";
    const jsonFilePath = "./TestDataWithJSON/PatientDomain/PatientSummary.json";

    console.log("excelFilePath:", excelFilePath);
    console.log("jsonFilePath:", jsonFilePath);
    const conversionSuccess = await convertExcelToJson(
      excelFilePath,
      jsonFilePath
    );
    if (conversionSuccess) {
      // jsonData = require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json");
      jsonData = require("../../../../../../TestDataWithJSON/PharmacyDomain/PatientSummary.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });
});

test.describe("Medication Category", () => {
  test("Add Medication", async ({ page }) => {
    if (!jsonData || !jsonData.PatientDetails) {
      throw new Error("JSON data is missing or invalid.");
    }
    let index = 0;
    for (const data of jsonData.PatientDetails) {
      const loginpage = new LoginPage(page);
      const homepage = new Homepage(page);
      const environment = new Environment(page);
      const confirmexisting = new ConfirmExisting(page);
      const contacthistory = new ContactHistory(page);
      const patientsearch = new PatientSearch(page);
      const medicationhome = new MedicationHomePage(page);
      const medicationEd = new MedicationAddED(page);

      const menu = new Menu(page);
      await page.goto(environment.Test);
      await loginpage.enterUsername(jsonData.loginDetails[0].username);
      logger.info("Username enter successfully");
      await loginpage.enter_Password(jsonData.loginDetails[0].password);
      logger.info("Password enter successfully");
      await loginpage.clickOnLogin();
      logger.info("Clicked on Login button successfully");
      await homepage.clickOnPatientIcon();
      logger.info("Clicked on Patient Icon successfully");
      await patientsearch.clickOnSearchButton();
      logger.info("Clicked on Search button successfully");
      await patientsearch.enterGivenName(data.pat_firstname);
      logger.info("Given Name entered successfully");
      //await page.pause()
      await patientsearch.enterFamilyName(data.pat_surname);
      logger.info("Family Name entered successfully");
      await patientsearch.selectSex(data.pat_sex);

      await patientsearch.selectBornDate(
        jsonData.PatientDetails[index].pat_dob
      );
      //await patientsearch.selectBornDate(formattedDate);
      await patientsearch.clickOnSearchButton();
      await patientsearch.clickOnSearchPatientLink();
      await page.waitForTimeout(1000);

      await confirmexisting.clickOnConfirmExistingDetails();
      await contacthistory.clickOnMenuIcon();
      await page.waitForTimeout(2000);
      await contacthistory.clickOnMenuIcon();
      await medicationhome.clickOnAddMedicationButton();
      await contacthistory.clickOnMedicationCategoryIcon();
      //await page.pause()
      await medicationhome.searchMedication(
        jsonData.AddMedication[index].pacr_que_name
      );
      await medicationhome.clickOnAddMedicationButton();
      await medicationEd.expandMedicationSection();
      await medicationEd.selectSubcategory();
      await medicationEd.enterDose(
        jsonData.AddMedication[index].medi_dose.toString()
      );
      await medicationEd.selectFrequency(
        jsonData.AddMedication[index].medi_frequency
      );
      await medicationEd.selectRoute(jsonData.AddMedication[index].medi_route);
      await medicationEd.enterDays(
        jsonData.AddMedication[index].medi_duration.toString()
      );
      await medicationEd.selectSite(jsonData.AddMedication[index].meded_value);
      await medicationEd.selectPrescribeBy(
        jsonData.AddMedication[index].medi_prescribed_by
      );
      //await medicationEd.enterMethod(jsonData.AddMedication[index].medi_method)

      await medicationEd.selectStartEndDate(
        jsonData.AddMedication[index].medi_start_date.toString(),
        jsonData.AddMedication[index].medi_stop_date.toString()
      );
      await medicationEd.selectSideEffect(
        jsonData.AddMedication[index].mse_text
      );
      await medicationEd.selectStatus(
        jsonData.AddMedication[index].pacr_status
      );
      await medicationEd.selectIndication(
        jsonData.AddMedication[index].meded_value
      );

      await medicationEd.selectPGDPSD(
        jsonData.AddMedication[index].meded_value_PGD
      );

      await medicationEd.selectMedicationGradeForAdministrator(
        jsonData.AddMedication[index].meded_value_Administrator
      );
      await medicationEd.selectMaxReffills(
        jsonData.AddMedication[index].meded_value_MaxReffills
      );

      await medicationEd.enterQuantity(
        jsonData.AddMedication[index].meded_value_Quantity.toString()
      );
      await medicationEd.enterUnit(
        jsonData.AddMedication[index].meded_value_Unit
      );
      await medicationEd.selectCurrentLocation(
        jsonData.AddMedication[index].pcl_location_name
      );
      // await medicationEd.selectLinkToDiagnosis()
      await medicationEd.selectAdherent(
        jsonData.AddMedication[index].meded_value_Adherent
      );
      await medicationEd.checkAllCheckboxes();
      await medicationEd.selectendoserment(
        jsonData.AddMedication[index].paprd_endorsement
      );
      // await medicationEd.selectForCondition()
      await medicationEd.selectPriceCheckQuantity(jsonData.AddMedication[index].meded_value_Price_check_quantity.toString());
      await medicationEd.enterTotalCost(jsonData.AddMedication[index].paprd_cost.toString());
      await medicationEd.enterNotes(jsonData.AddMedication[index].medi_notes);
      await page.pause();
      await medicationEd.clickOnSaveMedicationButton();
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await expect(page.getByText("Medication added successfully")).toHaveText("Medication added successfully");

      await medicationEd.expandAddedMedication();
      await medicationEd.clickOnMedicationHistoryIcon();
      //History of Medication
      await medicationEd.clickOnExpandMedicationButton();
      await medicationEd.closeMedicationHistoryPopup();
      await medicationEd.clickOnMedicationReviewIcon();
      await medicationEd.clickOnMedicationHighlisghtIcon();

      await page.pause();
    }
  });
});
