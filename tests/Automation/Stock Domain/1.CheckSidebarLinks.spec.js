
import { test, expect, Page, chromium } from "@playwright/test";

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";

import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import Environment from "../../../Pages/BaseClasses/Environment";
import StockSideBar from "../../../Pages/StockDomain/StockSidebar";
import StockAllLocations from "../../../Pages/StockDomain/StockAllLocations";


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

    await page.pause()
    // Stock Location Tab
    await stocksidebar.clickOnStockLocationsTab();
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnAllLocationsLink();
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnKitchensLink();
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnLabLinks();
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnPharmaciesLink();
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnStockLocationsLink();
    await page.waitForTimeout(1000);

    //Manage Stock Tab
    await stocksidebar.clickOnManageStockTab()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnSearchAndAddStockLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnAddStockRequisitionLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnBatchedLink()
    await page.waitForTimeout(1000);

    //External Requisition Tab
    
    await stocksidebar.clickOnExternalRequisitionTab()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnOrderReceived()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnOrderApproved()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnOrderPicked()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnOrderDispatch()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnImportedStock()
    await page.waitForTimeout(1000);
    

    // Internal Requisition Tab

    await stocksidebar.clickOnInternalRequisitionTab()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnDraftLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnAwaitingApprovalLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnRequestedLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnCompletedLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnIncompleteLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnRejectedLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnReceivingLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnReturnsLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnStockConsumptionLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnTransferLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnViewStockFormularyLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnViewStockRequisitionsLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnViewPrintDispatchLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnViewPrintPickListLink()
    await page.waitForTimeout(1000);

    // Cold storage tab

    await stocksidebar.clickOnColdStorageTab()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnChangeLocationLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnFreezersLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnFreezerStatusLink()
    await page.waitForTimeout(1000);


    // Stock Report Tab

    await stocksidebar.clickOnStockReportsTab()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnTodaysStockExpiryLink()
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnStockReportLink()
    await page.waitForTimeout(1000);



  });
});
