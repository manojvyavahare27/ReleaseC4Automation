const fs = require("fs");
const XLSX = require("xlsx");
//const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql2");
const convertExcelToJson = require("../../../../config/global-setupOptimized");
//\\\config\global-setupOptimized.js
const { test, expect } = require("@playwright/test");

const connectToDatabase = require("../../../../manoj").default;
const { executeQuery } = require("../../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../../compareJson.js";
//D:\Pre-release clinical\Cellma4ClinicalAuto\compareFileOrJson.js
import logger from "../../../../Pages/BaseClasses/logger.js";
import LoginPage from "../../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../../Pages/BaseClasses/Homepage";
import ConfirmExisting from "../../../../Pages/PatientDomain/ConfirmExisting";
import ContactHistory from "../../../../Pages/ClinicalDomain/PatientSummary/ContactHistory";
import PatientSearch from "../../../../Pages/PatientDomain/PatientSearch";
import Environment from "../../../../Pages/BaseClasses/Environment";
import Menu from "../../../../Pages/BaseClasses/Menu";
import ClinicalSummary from "../../../../Pages/ClinicalDomain/PatientSummary/ClinicalSummary.js";
import ClinicalExtraDetails from "../../../../Pages/ClinicalDomain/PatientSummary/ClinicalExtraDetails";


import { TIMEOUT } from "dns";
import { error } from "console";
import { before } from "node:test";
import { toggleDivVisibility } from "../../../../UtilFiles/DynamicUtility.js";
// Array to store console logs

const consoleLogs = [];
let jsonData;

test.describe("Excel Conversion Master Price", () => {
  test("Extract Finance Details", async ({}) => {
    const excelFilePath =
      process.env.EXCEL_FILE_PATH || "./ExcelFiles/Finance.xlsx";
    //const jsonFilePath = "./TestDataWithJSON/FinanceDomain/FinanceDetails.json";
    const jsonFilePath = "./TestDataWithJSON/FinanceDomain/FinanceDetails.json";

    console.log("excelFilePath:", excelFilePath);
    console.log("jsonFilePath:", jsonFilePath);
    const conversionSuccess = await convertExcelToJson(excelFilePath,jsonFilePath);
    if (conversionSuccess) {
      // jsonData = require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json");
      //jsonData = require("../../../TestDataWithJSON/FinanceDomain/FinanceDetails.json");
      jsonData = require("../../../../TestDataWithJSON/FinanceDomain/FinanceDetails.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });
});

test.describe("MasterPrice Category", () => {
  test("Add MasterPriceItem", async ({ page }) => {
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
      const masterPrice = new ClinicalSummary(page);
      const InterpretationsExtraDetails = new ClinicalExtraDetails(page);
      

      const menu = new Menu(page);
      await page.goto(environment.Test);
      await loginpage.enterUsername(jsonData.loginDetails[0].username);
      logger.info("Username enter successfully");
      await loginpage.enter_Password(jsonData.loginDetails[0].password);
      logger.info("Password enter successfully");
      await loginpage.clickOnLogin();      
      logger.info("Clicked on Login button successfully");
      await homepage.clickOnHomeDashboardIcon()      
      await masterPrice.clickFinanceIcon()
      await page.waitForTimeout(2000)
      await masterPrice.clickmasterPriceDrawer()
      await masterPrice.clickmasterPriceLink()
      //await patientsearch.selectSex(data.pat_sex);
      await page.waitForTimeout(2000)
      await masterPrice.selectAllCategory(jsonData.MasterPrice[0].mepr_category)
      await masterPrice.clickSearchMasterPrice()
      await masterPrice.clickAddMasterPrice()
      await page.waitForTimeout(2000)
      await masterPrice.selectAllCategory(jsonData.MasterPrice[0].mepr_category)
      await masterPrice.selectandMasterPriceItem(jsonData.MasterPrice[0].mepr_item_name);
      await masterPrice.selectCode2Type(jsonData.MasterPrice[0].mepr_item_code2_type)
      await masterPrice.enterItemCode2(jsonData.MasterPrice[0].mepr_item_code2)
      await masterPrice.enterMasterPrice(jsonData.MasterPrice[0].mepr_master_price)
      await masterPrice.clickAddButton()

      await page.waitForTimeout(5000)
      await masterPrice.clickVariablePriceLink()
      await page.waitForTimeout(2500)
      await page.pause()
      await page.getByLabel('', { exact: true }).click();
      //await masterPrice.clickVariableType()
      await masterPrice.selectCustomerTypeCheckbox()
      await page.mouse.click(10, 10);
      //await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();

      await page.pause()

      await masterPrice.selectCustomerType(jsonData.MasterPrice[0].varpriVariableTypeEliText)
      await masterPrice.enterRateForCustomerType1(jsonData.MasterPrice[0].varpriRate)
      await masterPrice.clickAddCustomerType()
      await page.waitForTimeout(2500)
      await masterPrice.clickDeleteCustomerType2()
      await masterPrice.clickSaveVariablePrice()
       
      await page.pause()

      ////// Database comparison- Master Price/////////
      // var sqlQuery =
      // "select mepr_item_name, mepr_category, mepr_item_code2, mepr_item_code2_type,mepr_master_price"+
      // " from master_prices where mepr_record_status='approved'and mepr_item_name='Special Bed'"+ 
      // "' order by 1 desc limit 1";
    //   var sqlQuery =
    //   "SELECT mepr_item_name, mepr_category, mepr_item_code2, mepr_item_code2_type, mepr_master_price " +
    //   "FROM master_prices WHERE mepr_record_status='approved' AND mepr_item_name='Special Bed' " +
    //   "ORDER BY 1 DESC LIMIT 1";
    //   var sqlFilePath = "SQLResults/MasterPriceList/MasterPriceList.json";
    //   var results = await executeQuery(sqlQuery, sqlFilePath);

    // console.log("Master Price:  "+ sqlQuery);
    //        await page.pause() 
    // sqlFilePath = "SQLResults/MasterPriceList/MasterPriceList.json";
    // results = await executeQuery(sqlQuery, sqlFilePath);
    // //const pacrId = results[0].pacr_id;
    // console.log("\n Patient Clinical Records stored into the database: \n", results);
    // var match = await compareJsons(sqlFilePath, null, jsonData.MasterPrice[index]);
    // if (match) {
    //   console.log("\n Add Mater Price List: Parameters from both JSON files match!\n");
    // } else {
    //   console.log("\n Add Mater Price List: Parameters from both JSON files do not match!\n");
    // }
   
    /////////////
      await page.waitForTimeout(5000)
      await masterPrice.clickBackButton()
      await masterPrice.selectAllCategory(jsonData.MasterPrice[0].mepr_category)
      await masterPrice.enterSearchFieldMasterPrice(jsonData.MasterPrice[0].mepr_item_name)
      await masterPrice.clickSearchMasterPrice()
      await page.waitForTimeout(2000)
      await masterPrice.clickExpandSpecialBed()
      await page.waitForTimeout(2000)
      await masterPrice.clickExpandCustomerType()
      await page.waitForTimeout(2000)
      await masterPrice.clickEditBedPrice()
      await page.waitForTimeout(2000)
      await masterPrice.enterMasterPrice(jsonData.EditMasterPrice[0].mepr_master_price)
      await masterPrice.clickSaveMasterPrice()
      await page.waitForTimeout(5000)
    //   var sqlQuery =
    //   "SELECT mepr_item_name, mepr_category, mepr_item_code2, mepr_item_code2_type, mepr_master_price " +
    //   "FROM master_prices WHERE mepr_record_status='approved' AND mepr_item_name='Special Bed' " +
    //   "ORDER BY 1 DESC LIMIT 1";
    //   var sqlFilePath = "SQLResults/MasterPriceList/MasterPriceList.json";
    //   var results = await executeQuery(sqlQuery, sqlFilePath);

    // console.log("Master Price:  "+ sqlQuery);
    //        await page.pause() 
    // sqlFilePath = "SQLResults/MasterPriceList/MasterPriceList.json";
    // results = await executeQuery(sqlQuery, sqlFilePath);
    // //const pacrId = results[0].pacr_id;
    // console.log("\n Patient Clinical Records stored into the database: \n", results);
    // var match = await compareJsons(sqlFilePath, null, jsonData.EditMasterPrice[index]);
    // if (match) {
    //   console.log("\n Edit Mater Price List: Parameters from both JSON files match!\n");
    // } else {
    //   console.log("\n Edit Mater Price List: Parameters from both JSON files do not match!\n");
    // }
      await masterPrice.selectAllCategory(jsonData.MasterPrice[0].mepr_category)
      await masterPrice.enterSearchFieldMasterPrice(jsonData.MasterPrice[0].mepr_item_name)
      await masterPrice.clickSearchMasterPrice()
      await page.waitForTimeout(2000)
      await masterPrice.clickExpandSpecialBed()
      await page.waitForTimeout(2000)
      await masterPrice.clickExpandCustomerType()
      await page.waitForTimeout(2000)
      await masterPrice.clickSearchMasterPrice()
      await masterPrice.clickEditBedPrice()
      await masterPrice.clickDeleteButton()
      await page.pause()
      await masterPrice.cancelDelete()
      await page.waitForTimeout(2000)
      await masterPrice.clickDeleteButton()
      await masterPrice.confirmDelete()

    }
  });
});
