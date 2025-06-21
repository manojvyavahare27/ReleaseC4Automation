
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

    let index = 0;

    await page.goto(environment.Test);
    await page.waitForTimeout(2000);
    await loginpage.enterUsername(jsonData.loginDetails[0].username);
    await page.waitForTimeout(2000);
    await loginpage.enter_Password(jsonData.loginDetails[0].password);
    await page.waitForTimeout(2000);
    await loginpage.clickOnLogin();
    //await homepage.clickonSidebarHomeIcon();
    await homepage.clickOnSideIconStock()
    await page.waitForTimeout(2000);
   
    await stockallLoc.clickOnShowHiddenLocationButton()
    await page.waitForTimeout(2000);
    await stockallLoc.clickOnCardioLocation()
    await page.waitForTimeout(2000);
   // Stock items filters
  
   await stockItemsFliters.selectLocation('Cardio Location')
   await stockItemsFliters.selectCategory(jsonData.EditStockItem[0].stock_category)
   await stockItemsFliters.selectFilter('All Stock')
   await stockItemsFliters.selectExpiringDate('Before Expiry Date')   
   await stockItemsFliters.selectFormulary('Automation formulary')
   await stockItemsFliters.enterItemName('Allopurinol 100mg tablets')
   await stockItemsFliters.clickSearchButton()
    await stockItemsFliters.selectFormulary('Testing formulary')
    await stockItemsFliters.clearItemName()
   await stockItemsFliters.clickSearchButton()
   
   // make 0 qty in to PrinceTown
   await stockItemsFliters.enterItemName(jsonData.EditStockItem[0].stock_name)
   await stockItemsFliters.clickSearchButton()
 //await addStockItems.clicksearchShowZeroStockcheckbox()

   await page.waitForTimeout(1000)
   //await addStockItems.clickOnCardioLocation()
   await addStockItems.clickOnExpandsClinicLocation()
    await page.waitForTimeout(1000)
   await addStockItems.clickOnStockBatchLink(page,jsonData.EditStockItem[0].stbat_batch_number)
 await page.waitForTimeout(1000)
   await page.getByTestId('batch').click();
   //Add Batch Details   
    await page.waitForTimeout(1000)
   await addStockItems.enterInStockQuantityZero() 
   await page.waitForTimeout(1500)

   await addStockItems.ClickOnSaveStockItemButton()
   await page.waitForTimeout(200)
   await expect(page.getByText('Stock item updated successfully')).toHaveText('Stock item updated successfully')  

// make 0 qty in to default pharmacy
   await stocksidebar.clickOnStockLocationsTab();
    await page.waitForTimeout(1000);

    await stocksidebar.clickOnAllLocationsLink();
    await page.waitForTimeout(1000);

    await stockallLoc.clickOnShowHiddenLocationButton()
    await page.waitForTimeout(2000);

   
    await stockallLoc.clickOnDefaultStockLocation()
    await page.waitForTimeout(2000);
    await stockItemsFliters.clearItemName()
    await stockItemsFliters.enterItemName(jsonData.EditStockItem[0].stock_name)
   await stockItemsFliters.clickSearchButton()
   await page.waitForTimeout(1000)
   await addStockItems.clickOnExpandsDefaultPharmacy()
   await addStockItems.clickOnStockBatchLink(page,jsonData.EditStockItem[0].stbat_batch_number)
   await page.getByTestId('batch').click();

   await addStockItems.enterInStockQuantityZero() 
   await page.waitForTimeout(1500)
   await addStockItems.ClickOnSaveStockItemButton()
  
 
   //await stockItemsFliters.showZeroStockCheckbox()
   await page.waitForTimeout(1000)
   await stockItemsFliters.clearItemName()
   await page.waitForTimeout(1000)
   await stockItemsFliters.enterItemName(jsonData.EditStockItem[0].stock_name)
   await page.waitForTimeout(1000)
   
   //await stockItemsFliters.clicksearchShowZeroStockcheckbox()
   await page.getByRole('checkbox', { name: 'Show Zero Stock' }).click()
   await page.waitForTimeout(1000)
   await stockItemsFliters.clickSearchButton()
   await page.waitForTimeout(1000)
   
   await addStockItems.clickOnExpandsDefaultPharmacy()
   await page.waitForTimeout(1000)
   await addStockItems.clickOnStockBatchLink(page,jsonData.EditStockItem[0].stbat_batch_number)
   await page.waitForTimeout(1000)
   await page.getByTestId('batch').click();
await page.waitForTimeout(1000)
   await addStockItems.clickOnDeleteItemButton()
await page.waitForTimeout(1000)
   await addStockItems.clickOnLogout(page)
   

  });
});
