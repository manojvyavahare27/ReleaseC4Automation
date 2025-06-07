
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
import ReturnItemsPopup from "../../../Pages/StockDomain/ReturnItemsPopup";
import StockReturnsPage from "../../../Pages/StockDomain/StockReturnsPage"
import ProcessStockReturnPopup from "../../../Pages/StockDomain/ProcessStockReturnPopup"


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
        const returnItemsPopup = new ReturnItemsPopup(page)
        const stockReturnPage = new StockReturnsPage(page)
        const processStockReturnPopup = new ProcessStockReturnPopup(page)

        let index = 0;

        await page.goto(environment.Test);

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
        await page.waitForTimeout(1000)
        await stockItemsFliters.enterItemName(jsonData.AddNewStock[0].stock_name)
        await stockItemsFliters.clickSearchButton()
        await page.waitForTimeout(1000)
        await addStockItems.clickOnExpandsClinicLocation()
        await stockallLoc.clickOnReturnLink()
       // await returnItemsPopup.enterLocationToReturn(jsonData.ReturnItem[0].sttra_stloc_id_transfer_to)
         await page.waitForTimeout(1000)
        await returnItemsPopup.enterReasonForReturn(jsonData.ReturnItem[0].sttra_return_reason)
         await page.waitForTimeout(1000)
        await returnItemsPopup.enterAmountToReturn(jsonData.ReturnItem[0].sttra_quantity)
         await page.waitForTimeout(1000)
        await returnItemsPopup.enterAdditionalNotes(jsonData.ReturnItem[0].sttra_additional_notes)
        await returnItemsPopup.clickReturnButton()
        //await page.pause()
        // const [printPopup] = await Promise.all([
        //     page.context().waitForEvent('page'),
        //     returnItemsPopup.clickReturnButton(),
        // ]);

        // await printPopup.waitForLoadState();
        // await printPopup.close();


       //await page.pause()
        await page.waitForTimeout(500)
        await addStockItems.clickOnLogout(page)

        //check Pending Return Status

    //await page.pause()    
    //Check approved status after click receive item into another location

     var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/ReturnStockItemDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    // const stbat_id = results[0].stbat_id;
    // console.log("Stock Item bat_id is: " + stbat_id);
    var match = await compareJsons(sqlFilePath, null, jsonData.ReturnItem[index]);
    if (match) {
      console.log("\n Pending Return Status Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Pending Return Status Comparision: Parameters from both JSON files do not match!\n");
    }



        //Login with Another user(manoj.auto)


        await loginpage.enterUsername(jsonData.loginDetails[0].username);
        await page.waitForTimeout(2000);
        await loginpage.enter_Password(jsonData.loginDetails[0].password);
        await page.waitForTimeout(2000);
        await loginpage.clickOnLogin();
        await homepage.clickonSidebarHomeIcon();
        await homepage.clickOnSideIconStock()

        await stockallLoc.clickOnShowHiddenLocationButton()
       // await page.pause()
        await stockTransferPage.enterRequestLocation('Default Pharmacy')


        // Stock Return Page
        await stocksidebar.clickOnManageStockTab()
        await stocksidebar.clickOnReturnsLink()
        await stockReturnPage.clickOnLastPendingReturnLink()
        await page.waitForTimeout(2000)
        await processStockReturnPopup.clickOnReturnbutton()
        await expect(page.getByText('The items will be transferred to Default Pharmacy')).toHaveText('The items will be transferred to Default Pharmacy')
        await page.waitForTimeout(2000)


        //check Return Status

    //await page.pause()    
    //Check approved status after click receive item into another location

     var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/ReturnStockItemDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    // const stbat_id = results[0].stbat_id;
    // console.log("Stock Item bat_id is: " + stbat_id);
    var match = await compareJsons(sqlFilePath, null, jsonData.ReturnItem[index]);
    if (match) {
      console.log("\n Return Status Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Return Status Comparision: Parameters from both JSON files do not match!\n");
    }


        await stockReturnPage.clickOnLastReturnLink()
        await page.waitForTimeout(2000)
        await processStockReturnPopup.clickOntransferbutton()
        await expect(page.getByText('Transfer successfully')).toHaveText('Transfer successfully')
        await page.waitForTimeout(2000)


         //check Transfered Status

   // await page.pause()    
    //Check approved status after click receive item into another location

     var sqlQuery = "SELECT sb.stbat_id,sb.stbat_batch_number, cst.sttra_quantity, cst.sttra_request_type, cst.sttra_status FROM c4_stock_transfer cst JOIN  stock_batches sb ON cst.sttra_stbat_id = sb.stbat_id WHERE sb.stbat_id = 773 ORDER BY cst.sttra_id DESC LIMIT 1;"
    console.log(sqlQuery)
    var sqlFilePath = "SQLResults/StockDomain/ReturnStockItemDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);
    // const stbat_id = results[0].stbat_id;
    // console.log("Stock Item bat_id is: " + stbat_id);
    var match = await compareJsons(sqlFilePath, null, jsonData.ReturnItem[index]);
    if (match) {
      console.log("\n Transfered Status Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Transfered Status Comparision: Parameters from both JSON files do not match!\n");
    }



        await stockReturnPage.clickOnLastTransferLink()
        await page.waitForTimeout(1000)
        await processStockReturnPopup.clickOnClosePopup()

       // await page.pause()
        await page.waitForTimeout(500)
        await addStockItems.clickOnLogout(page)
    });
});
