
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
    //await homepage.clickonSidebarHomeIcon();
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
  // await page.pause()
    await stockItemsFliters.selectFormulary('Testing formulary')
    await stockItemsFliters.clearItemName()
   await stockItemsFliters.clickSearchButton()

   await stockItemsFliters.enterItemName(jsonData.AddNewStock[0].stock_name)
   await stockItemsFliters.clickSearchButton()
   await page.waitForTimeout(1000)
   await addStockItems.clickOnExpandsDefaultPharmacy()
      await stockallLoc.clickOnAddBatchLink()
   await page.waitForTimeout(500)
   await addFormulary.clickOnClosePopup()
   await page.waitForTimeout(500)
   await stockallLoc.clickOnAddBatchLink()
   await addBatch.enterSupplierName(jsonData.AddBatch[0].stbat_supplier)
   await addBatch.enterBatchNumber(jsonData.AddBatch[0].stbat_batch_number)
   await addBatch.enterBatchQuantity(jsonData.AddBatch[0].stbat_quantity)
   await addBatch.enterSerialNumber(jsonData.AddBatch[0].stbat_serial_number)
   await addBatch.enterManufacturedDate(jsonData.AddBatch[0].stbat_manufacture_date)
   await addBatch.enterReceivedDate(jsonData.AddBatch[0].stbat_batch_received_date)
   await addBatch.enterExpiryDate(jsonData.AddBatch[0].stbat_expiry_date)
   await addBatch.enterRetailPrice(jsonData.AddBatch[0].stbat_retail_price)
   
   await page.pause()
    await page.waitForTimeout(500) 
   await addBatch.clickSave()
  
   //await addFormulary.clickOnAddFormularyButton()
 //  await expect(page.getByText('Batch added successfully')).toHaveText('Batch added successfully')
   //await addFormulary.clickOnClosePopup()
   await page.waitForTimeout(500) 

   //get Stock Id from DB

   var sqlQuery =  "select * from c4_stock_items ORDER BY 1 DESC LIMIT 1;";
        console.log(sqlQuery)        
        var sqlFilePath = "SQLResults/StockDomain/AddDeleteBatch.json";
        var results = await executeQuery(sqlQuery, sqlFilePath);        
        const stock_id = results[0].stock_id;     
        console.log("Stock id is: "+stock_id); 

   //check DB for add Batch
    var sqlQuery =  "SELECT * FROM stock_batches where stbat_stock_id=1398 order by 1 desc limit 1;";
        console.log(sqlQuery)        
        var sqlFilePath = "SQLResults/StockDomain/AddBatch.json";
        var results = await executeQuery(sqlQuery, sqlFilePath);        
        //const stock_id = results[0].stock_id;     
        //console.log("Stock id is: "+stock_id);            
        var match = await compareJsons(sqlFilePath, null, jsonData.AddBatch[index]);
        if (match) {
          console.log("\n Add New Stock Comparision: Parameters from both JSON files match!\n");
        } else {
          console.log("\n Add New Stock Comparision: Parameters from both JSON files do not match!\n");
        }

   //Delete Batch
   
   await addStockItems.clickOnExpandsDefaultPharmacy()
   await addBatch.clickOnExtraBatchLink()
   await page.waitForTimeout(3000)
   await page.getByTestId('batch').click();
   await page.waitForTimeout(500) 
   await addBatch.enterInStockQuantity(jsonData.DeleteBatch[0].stbat_quantity)
   await addBatch.enterPurchaseRate(jsonData.DeleteBatch[0].stbat_purchase_price)
   await addBatch.enterUnitCost(jsonData.DeleteBatch[0].stbat_unit_cost)



   await page.waitForTimeout(500) 
    
    await page.getByLabel('saveStockItem').click()
   //await addBatch.clickSave()
   await page.waitForTimeout(200) 
   await expect(page.getByText('Stock item updated successfully')).toHaveText('Stock item updated successfully')
   await page.waitForTimeout(500) 
   await addStockItems.clickOnExpandsDefaultPharmacy()
   await addBatch.clickOnExtraBatchLink()

   await page.waitForTimeout(2000)
   await page.getByTestId('batch').click();
   
   //await addStockItems.enterRetailPrice(jsonData.AddBatch[0].stbat_retail_price)
   await addBatch.clickOndeleteBatch()   

   //Delete Batch

    //check DB for add Batch
    var sqlQuery =  "SELECT stbat_serial_number,stbat_quantity,stbat_manufacture_date,stbat_expiry_date,stbat_batch_number,stbat_supplier,stbat_batch_received_date,stbat_purchase_price,stbat_unit_cost,stbat_retail_price FROM stock_batches where stbat_stock_id=1398 order by 1 desc limit 1;";
        console.log(sqlQuery)        
        var sqlFilePath = "SQLResults/StockDomain/DeleteBatch.json";
        var results = await executeQuery(sqlQuery, sqlFilePath);        
        //const stock_id = results[0].stock_id;     
        //console.log("Stock id is: "+stock_id);            
        var match = await compareJsons(sqlFilePath, null, jsonData.DeleteBatch[index]);
        if (match) {
          console.log("\n Add New Stock Comparision: Parameters from both JSON files match!\n");
        } else {
          console.log("\n Add New Stock Comparision: Parameters from both JSON files do not match!\n");
        }

   await page.waitForTimeout(500) 
   await addStockItems.clickOnLogout(page)
   //await addStockItems.enterPurchaseRate('5.00')

  });
});
