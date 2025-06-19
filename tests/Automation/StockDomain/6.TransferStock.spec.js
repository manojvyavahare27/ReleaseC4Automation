
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
import StockTransferPopUp from "../../../Pages/StockDomain/StockTransferPopUp";
import StockTransferPage from "../../../Pages/StockDomain/StockTransferPage";
import ProcessPickListPopup from "../../../Pages/StockDomain/ProcessPickListPopup";
import ProcessDispatchOrderPopup from "../../../Pages/StockDomain/ProcessDispatchOrderPopup"
import StockRecevingquantity from "../../../Pages/StockDomain/StockReceving"
import StockItemHistoryPopup from "../../../Pages/StockDomain/StockItemHistoryPopup"

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
    const stockallLoc = new StockAllLocations(page)
    const stockItemsFliters = new StockItemFiltersPage(page)
    const addStockItems = new AddStockItems(page)
    const stockTransferPopUp = new StockTransferPopUp(page)
    const stockTransferPage = new StockTransferPage(page)
    const processPickListPopup = new ProcessPickListPopup(page)
    const processDispatchOrderPopup = new ProcessDispatchOrderPopup(page)
    const stockReceving = new StockRecevingquantity(page)
    const stockItemHistoryPopup = new StockItemHistoryPopup(page)

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
    //await page.pause()
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


    //Add New Medication
    await stockItemsFliters.enterItemName(jsonData.AddNewStock[0].stock_name)
    await stockItemsFliters.clickSearchButton()
    await page.waitForTimeout(1000)
    await addStockItems.clickOnExpandsDefaultPharmacy()
   // await page.pause()
    await stockallLoc.clickOnTransferLink()
    //await addStockItems.clickOnStockBatchLink(page,jsonData.AddNewStock[0].stbat_batch_number)
    await stockTransferPopUp.selectLocationToTransferTo()
    await stockTransferPopUp.enterQuantityToTransfer('45')
    await stockTransferPopUp.clickOnTransferButton()
    await page.waitForTimeout(200)
    await expect(page.getByText('Stock transfer requested')).toHaveText('Stock transfer requested')

           
   //await page.pause()


    //DB for Select Transfer quantity

    var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/StockItemDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    const stbat_id = results[0].stbat_id;
    console.log("Stock Item bat_id is: " + stbat_id);
    var match = await compareJsons(sqlFilePath, null, jsonData.StockTransfer[index]);
    if (match) {
      console.log("\n Add New Stock Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Add New Stock Comparision: Parameters from both JSON files do not match!\n");
    }






    await stocksidebar.clickOnManageStockTab()
    await stocksidebar.clickOnTransferLink()

    await stockTransferPage.enterRequestLocation('Default Pharmacy')
    await stockTransferPage.clickReloadButton()
    await stockTransferPage.clickOncheckBox()
    await stockTransferPage.enterApprovedQuantity()
    await stockTransferPage.clickOnSaveButton()

    await page.waitForTimeout(200)
    await expect(page.getByText('Item approved successfully')).toHaveText('Item approved successfully')
  
   // await page.pause()

    //Check Approved status after click on save checklist

     var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/StockItemDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    // const stbat_id = results[0].stbat_id;
    // console.log("Stock Item bat_id is: " + stbat_id);
    var match = await compareJsons(sqlFilePath, null, jsonData.StockTransfer[1]);
    if (match) {
      console.log("\n Check Approved status Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Check Approved status Comparision: Parameters from both JSON files do not match!\n");
    }



    await stockTransferPage.enterPickedQuantity()
    await stockTransferPage.clickOnCreatePickListButton()
    await processPickListPopup.clickOncloseIcon()

    //Check Picklist Status.

   // await page.pause()
    
    //Check Approved status after click on save checklist

     var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/StockItemDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    // const stbat_id = results[0].stbat_id;
    // console.log("Stock Item bat_id is: " + stbat_id);
    var match = await compareJsons(sqlFilePath, null, jsonData.StockTransfer[2]);
    if (match) {
      console.log("\n Check Picklist Status Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Check Picklist Status Comparision: Parameters from both JSON files do not match!\n");
    }

    await stockTransferPage.clickOncheckBox()
//await page.pause()
    await stockTransferPage.clickOnDispatchOrderButton()
    await page.waitForTimeout(1000)
    await stockTransferPage.clickOnOkbutton()
    await page.waitForTimeout(2000)
    //await expect(page.getByText('Only items with transferred status will be dispatched.')).toHaveText('Only items with transferred status will be dispatched.')
    await stockTransferPage.clickOnSaveButton()
    //await page.pause()
    //await stockTransferPage.clickOnOkbutton()
    await page.waitForTimeout(2000)
    await stockTransferPage.clickOnDispatchOrderButton()
    await page.waitForTimeout(2000)
    await processDispatchOrderPopup.clickOnCreateDispatchOrderButtonFromPopUp()

    await expect(page.getByText('Item successfully received')).toHaveText('Item successfully received')
    await processDispatchOrderPopup.clickOncloseIcon()
    //await page.pause()

    //check Dispatch Status

   // await page.pause()
    
    //Check Dispatch status after click on Create dispatch order

     var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/StockItemDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    // const stbat_id = results[0].stbat_id;
    // console.log("Stock Item bat_id is: " + stbat_id);
    var match = await compareJsons(sqlFilePath, null, jsonData.StockTransfer[3]);
    if (match) {
      console.log("\n check Dispatch Status Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Check Dispatch Status Comparision: Parameters from both JSON files do not match!\n");
    }


    await addStockItems.clickOnLogout(page)

    await page.waitForTimeout(2000);
    await loginpage.enterUsername(jsonData.loginDetails[1].username);
    await page.waitForTimeout(2000);
    await loginpage.enter_Password(jsonData.loginDetails[1].password);
    await page.waitForTimeout(2000);
    await loginpage.clickOnLogin();
    await homepage.clickonSidebarHomeIcon();
    await homepage.clickOnSideIconStock()

    await stockallLoc.clickOnShowHiddenLocationButton()
    //await page.pause()
    await stockallLoc.clickOnCardioLocation()
    //await stockTransferPage.enterRequestLocation('Cardio Location')

    await page.waitForTimeout(1000)
    await stocksidebar.clickOnManageStockTab()
    await page.waitForTimeout(1000)
    await stocksidebar.clickOnReceivingLink()
    await page.waitForTimeout(1000)
    await stockReceving.enterRecevingQuantity()
    await page.waitForTimeout(1000)
    await stockReceving.selectCheckBox()
    await page.waitForTimeout(1000)
    await stockReceving.clickOnSavebutton()
    await expect(page.getByText('Item received successfully')).toHaveText('Item received successfully')
    await page.waitForTimeout(1000)
    //await stocksidebar.clickOnManageStockTab()

    //check approved Status

   // await page.pause()
    
    //Check approved status after click receive item into another location

     var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/StockItemDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    // const stbat_id = results[0].stbat_id;
    // console.log("Stock Item bat_id is: " + stbat_id);
    var match = await compareJsons(sqlFilePath, null, jsonData.StockTransfer[4]);
    if (match) {
      console.log("\n check Dispatch Status Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Check Dispatch Status Comparision: Parameters from both JSON files do not match!\n");
    }

    await page.waitForTimeout(1000)
    await stocksidebar.clickOnSearchAndAddStockLink()
    await page.waitForTimeout(1000)
    await stockItemsFliters.clearItemName()
    await stockItemsFliters.enterItemName(jsonData.AddNewStock[0].stock_name)
    await stockItemsFliters.clickSearchButton()
    await page.waitForTimeout(2000)
    await addStockItems.clickOnExpandsClinicLocation()
    await page.waitForTimeout(1000)
    await addStockItems.clickOnHistoryIcon()
    await page.waitForTimeout(1000)
    await stockItemHistoryPopup.clickOnclosePopup()
    //await page.pause()
    await page.waitForTimeout(500)
    await addStockItems.clickOnLogout(page)
  });
});
