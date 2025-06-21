
import { test, expect, Page, chromium } from "@playwright/test";

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";

import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import Environment from "../../../Pages/BaseClasses/Environment";
import StockSideBar from "../../../Pages/StockDomain/StockSidebar";
import StockAllLocations from "../../../Pages/StockDomain/StockAllLocations";
import StockItemFiltersPage from "../../../Pages/StockDomain/StockItemFilters";
import AddStockItems from "../../../Pages/StockDomain/AddStockItems";
import Formulary from "../../../Pages/StockDomain/Formulary"
import AddBatch from "../../../Pages/StockDomain/AddBatch";


const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")));


const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Add New Referral", () => {
  test("Extract Patient Details", async ({ }) => {
    const excelFilePath = process.env.EXCEL_FILE_PATH || "./ExcelFiles/StockDomain.xlsx";
    const jsonFilePath = "./TestDataWithJSON/StockDomain/StockDetails.json";
    const conversionSuccess = await convertExcelToJson(excelFilePath, jsonFilePath);

    if (conversionSuccess) {
      jsonData = require("../../../TestDataWithJSON/StockDomain/StockDetails.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });

  test("Add New Referral @Functional @ReferralDomain", async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new Homepage(page);
    const environment = new Environment(page);
    const stocksidebar = new StockSideBar(page)
    const stockallLoc=new StockAllLocations(page)
    const stockItemsFliters=new StockItemFiltersPage(page)
    const addStockItems=new AddStockItems(page)
    const addFormulary=new Formulary(page)
    const addBatch=new AddBatch(page)

    let index = 0;

    await page.goto(environment.Test);
    await page.waitForTimeout(2000);
    await loginpage.enterUsername(jsonData.loginDetails[0].username);
    await page.waitForTimeout(2000);
    await loginpage.enter_Password(jsonData.loginDetails[0].password);
    await page.waitForTimeout(2000);
    await loginpage.clickOnLogin();
    await homepage.clickonSidebarHomeIcon();
    await homepage.clickOnSideIconStock()

    await stockallLoc.clickOnShowHiddenLocationButton()
    await stockallLoc.clickOnDefaultStockLocation()
    await page.waitForTimeout(2000);   

   // Stock items filters
  
   await stockItemsFliters.selectLocation('Default Pharmacy')
   await stockItemsFliters.selectCategory(jsonData.EditStockItem[0].stock_category)
   await stockItemsFliters.selectFilter('All Stock')
   await stockItemsFliters.selectExpiringDate('Before Expiry Date')   
   await stockItemsFliters.selectFormulary('Automation formulary')
   await stockItemsFliters.enterItemName('Allopurinol 100mg tablets')
   await stockItemsFliters.clickSearchButton()
   
    await stockItemsFliters.selectFormulary('Testing formulary')
    await stockItemsFliters.clearItemName()
   await stockItemsFliters.clickSearchButton()
  
   await stockItemsFliters.enterItemName(jsonData.AddNewStock[0].stock_name)
   await stockItemsFliters.clickSearchButton()
   await page.waitForTimeout(1000)
   await addStockItems.clickOnExpandsDefaultPharmacy()
   

//    await stockallLoc.clickOnAddBatchLink()
//    await page.waitForTimeout(500)
//    await addFormulary.clickOnClosePopup()
   await page.waitForTimeout(500)   
   await stockallLoc.clickOnAddStockQuantityLink()
  await page.waitForTimeout(500)
   await addBatch.ClickOnAddIncreDecresaveButton()
   await expect(page.getByText('Quantity Change Type required')).toHaveText('Quantity Change Type required')
   await expect(page.getByText('Batch Quantity Change required')).toHaveText('Batch Quantity Change required')
   
   
   //Increment
    await addBatch.selectQuantityChangeType('Increment')
    await addBatch.enterBatchQuantityChange()
    await addBatch.ClickOnAddIncreDecresaveButton()
    await addBatch.selectAddBatchReason('stock increased')
    await addBatch.ClickOnSaveReason()
    await expect(page.getByText('Batch updated successfully')).toHaveText('Batch updated successfully')
    await page.waitForTimeout(2000)

    //check for Batch Id

    var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/StockItemDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    const stbat_id = results[0].stbat_id;
    console.log("Stock Item bat_id is: " + stbat_id);
    

    //check for Increment Db comparsion

    var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, sb.stbat_batch_change_type, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/BatchIncrementDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    // const stbat_id = results[0].stbat_id;
    // console.log("Stock Item bat_id is: " + stbat_id);
    var match = await compareJsons(sqlFilePath, null, jsonData.BatchIncrement[0]);
    if (match) {
      console.log("\n Check Approved status Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Check Approved status Comparision: Parameters from both JSON files do not match!\n");
    }






    //Decrement
   
    await stockallLoc.clickOnAddStockQuantityLink()
    await page.waitForTimeout(2000)
    await addBatch.selectQuantityChangeType('Decrement')
    await page.waitForTimeout(1000)
    await addBatch.enterBatchQuantityChange()
    await addBatch.ClickOnAddIncreDecresaveButton()
    await addBatch.selectAddBatchReason('Stock expired')
    await addBatch.ClickOnSaveReason()
   
    await expect(page.getByText('Batch updated successfully')).toHaveText('Batch updated successfully')
    await page.waitForTimeout(2000)


    //check for Decrement Db comparsion

    var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, sb.stbat_batch_change_type, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/BatchDecrementDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    // const stbat_id = results[0].stbat_id;
    // console.log("Stock Item bat_id is: " + stbat_id);
    var match = await compareJsons(sqlFilePath, null, jsonData.BatchDecrement[0]);
    if (match) {
      console.log("\n Check Approved status Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Check Approved status Comparision: Parameters from both JSON files do not match!\n");
    }


   await page.waitForTimeout(500) 
   await addStockItems.clickOnLogout(page)
   //await addStockItems.enterPurchaseRate('5.00')

  });
});
