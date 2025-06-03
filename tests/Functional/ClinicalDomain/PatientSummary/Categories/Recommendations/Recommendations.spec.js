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
import ExaminationHomePage from "../../../../../../Pages/ClinicalDomain/PatientSummary/Categories/Examinations/ExaminationsHomePage";
import ExaminationAddED from "../../../../../../Pages/ClinicalDomain/PatientSummary/Categories/Examinations/ExaminationAddED";
import RecommendationHomePage from "../../../../../../Pages/ClinicalDomain/PatientSummary/Categories/Recommendations/RecommendationsHomepage";
import RecommendationED from "../../../../../../Pages/ClinicalDomain/PatientSummary/Categories/Recommendations/RecommendationAddED";
import PatientSummary from "../../../../../../Pages/ClinicalDomain/PatientSummary/PatientSummary";

import { TIMEOUT } from "dns";
import { error } from "console";
import { before } from "node:test";

// Array to store console logs

const consoleLogs = [];
let jsonData;

test.describe("Excel Conversion Examination Category", () => {
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
      jsonData = require("../../../../../../TestDataWithJSON/PatientDomain/PatientSummary.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });
});

test.describe("Examination Category", () => {
  test("Add Examination", async ({ page }) => {
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
      const examinationhome = new ExaminationHomePage(page);
      const examinationEd = new ExaminationAddED(page);
      const recommendationhome = new RecommendationHomePage(page);
      const recommendationEd = new RecommendationED(page);
      const patientsummary = new PatientSummary(page);

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

      await patientsearch.selectBornDate(jsonData.PatientDetails[index].pat_dob);
      //await patientsearch.selectBornDate(formattedDate);
      await patientsearch.clickOnSearchButton();
      await patientsearch.clickOnSearchPatientLink();
      await page.waitForTimeout(1000);
      await confirmexisting.clickOnConfirmExistingDetails();
      await contacthistory.clickOnMenuIcon();
      await page.waitForTimeout(2000);
      await contacthistory.clickOnMenuIcon();
      
      //Add Recommendation
      const flag = false;
      await patientsummary.clickOniconRecommendation();
   
        await recommendationhome.searchRecommendation(jsonData.AddRecommendations[index].pacr_que_name);
        await recommendationhome.clickonAddRecommendationButton();
        await recommendationEd.clickOnExpandRecommendation();
        await recommendationEd.selectSubcategory();
        await recommendationEd.enterReviewDate();
        await recommendationEd.selectCheckboxPrivateRecord();
        await recommendationEd.selectCheckboxSetAsDefault();
        await page.pause()
        await recommendationEd.enterNotes();
        
        await recommendationEd.clickOnSaveButton();

        const Rectoplastylocator = page.getByRole("heading", {name: "Rectoplasty"});
      //const portfolio = page.getByRole("link", { name: "Portfolio" });
      await page.waitForTimeout(2000)
      if (await Rectoplastylocator.isVisible()) {
        await page.waitForTimeout(2000)
        await Rectoplastylocator.click();
      } else {
        await recommendationhome.searchRecommendation(jsonData.AddRecommendations[index].pacr_que_name);
        await recommendationhome.clickonAddRecommendationButton();
        await recommendationEd.clickOnExpandRecommendation();
        await recommendationEd.selectSubcategory();
        await recommendationEd.enterReviewDate();
        await recommendationEd.selectCheckboxPrivateRecord();
        await recommendationEd.selectCheckboxSetAsDefault();
        await recommendationEd.enterNotes();
        await recommendationEd.clickOnSaveButton();
      }


        

      //Contact History page


      //Edit Recommendation
      






      //////Fetch Patient Details/////////
      // sqlQuery =
      //   "select * from patient_audit where paa_use_username='" +
      //   jsonData.loginDetails[0].username +
      //   "' and paa_type='selected' order by 1 desc limit 1";
      // sqlFilePath = "SQLResults/PatientDomain/PatientAudit.json";
      // results = await executeQuery(sqlQuery, sqlFilePath);
      // console.log("\n Patient Details stored into the database: \n", results);
      // const patId = results[0].paa_pat_id;
      // console.log("Patient Accessed by User:" + patId);

      //////Examination Database comparison/////////
      // sqlQuery =
      //   "select * from patient_clinical_records where pacr_pat_id=" +
      //   patId +
      //   " and pacr_que_name='Dry eye' order by 1 desc limit 1;";
      // sqlFilePath = "SQLResults/PatientDomain/SPpatientData.json";
      // results = await executeQuery(sqlQuery, sqlFilePath);
      // console.log("\n Patient Details stored into the database: \n", results);
      // var match = await compareJsons(sqlFilePath, null, data);
      // if (match) {
      //   console.log("\n Patient Details Comparision: Parameters from both JSON files match!\n" );
      // } else {
      //   console.log("\n Patient Details Comparision: Parameters from both JSON files do not match!\n");
      // }

      //Check Examination History section
     
      await examinationhome.expandExaminationHistory();
      await examinationhome.expandExaminationHistory();
      await examinationhome.clickOnAllLinks();
      await examinationhome.clickOnHistoryIcon();
      await examinationhome.expandsHistoryofExaminationIcon();
      await examinationhome.expandsHistoryofExaminationIcon();
      await examinationhome.closeExaminationHistoryPopup();
      await page.waitForTimeout(2000);
      await examinationhome.clickOnReviewExaminationButton();
      await page.waitForTimeout(2000);
      await examinationhome.clickOnHighlightedNoneRisk();
      await page.waitForTimeout(2000);
      await examinationhome.clickOnLowRiskLevel();
      await page.waitForTimeout(2000);
      await examinationhome.clickOnModerateRiskLevel();
      await page.waitForTimeout(2000);
      await examinationhome.clickOnHighRiskLevel();
      await page.waitForTimeout(2000);
      await examinationhome.clickOnAllRiskLevel();
      await page.waitForTimeout(1000);
     
      await examinationhome.checkExtradetailsLevel();

      await examinationhome.clickOnEditExaminationButton()
      await examinationEd.clickOnExpandExamination();
      //await examinationEd.selectSubCategory(jsonData.AddExamination[index].pacr_category)
      await examinationEd.selectSubCategory();
      //await examinationEd.EnterClinicalDate()
      await examinationEd.SelectOutcome(jsonData.AddExamination[index].Edit_exam_outcome);
      await examinationEd.EnterNotes(jsonData.AddExamination[index].Edit_exam_notes);

      await examinationEd.clickOnSaveButton();
      await page.waitForTimeout(500);
      await expect(page.getByText('Examination Record Updated Successfully')).toHaveText("Examination Record Updated Successfully");

       //Delete Examination
      await examinationhome.clickOnEditExaminationButton()
      await examinationEd.clickOnExpandExamination()
      await examinationEd.clickOnDeleteButton()
      await examinationEd.clickOnCancelExamination()
      await examinationEd.clickOnDeleteButton()
      await examinationEd.clickOnOkDeleteExamination()
      await examinationEd.enterDeleteExaminationReason()
      await examinationEd.clickOnSaveForReason()
      await page.waitForTimeout(500);
      await expect(page.getByText('Examination deleted')).toHaveText("Examination deleted");
      //await page.pause()
    }

  });
});
