
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

  test("Add New Stock @Functional @StockDomain", async ({ page }) => {
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
    await homepage.clickonSidebarHomeIcon();
    await homepage.clickOnSideIconStock()

    await stockallLoc.clickOnShowHiddenLocationButton()
    await stockallLoc.clickOnDefaultStockLocation()
    await page.waitForTimeout(2000);

   

   // Stock items filters
   
   await stockItemsFliters.selectLocation('Default Pharmacy')
   await stockItemsFliters.selectCategory(jsonData.AddNewStock[0].stock_category)
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
   await stockItemsFliters.clickOnAddButton()

   await addStockItems.selectCategory(jsonData.AddNewStock[0].stock_category)
   await addStockItems.enterItemName(jsonData.AddNewStock[0].stock_name)
   await addStockItems.clickOnFreeTextButton()
   await addStockItems.enterNonSnomedCode(jsonData.AddNewStock[0].stock_que_local_code)   

   await addStockItems.enterItemBarcode(jsonData.AddNewStock[0].stock_barcode)
   await addStockItems.enterItemShortBarcode(jsonData.AddNewStock[0].stock_item_barcode)

   await addStockItems.selectLetterDisplayGroup()
   await addStockItems.enterDescription(jsonData.AddNewStock[0].stock_description)
   await addStockItems.enterNameAndDescriptionInOtherLanguage(jsonData.AddNewStock[0].stock_desc_other_lang)
   await addStockItems.enterUnitOfMeasure()
   await addStockItems.enterUnitOfDispensing()
   await addStockItems.enterForm()
   
   await addStockItems.enterDose(jsonData.AddNewStock[0].stdo_dose)
   //await addStockItems.enterFrequency(jsonData.AddNewStock[0].stdo_frequency)
   await addStockItems.enterFrequency()
   await addStockItems.enterRoute(jsonData.AddNewStock[0].stdo_route)
   await addStockItems.enterDuration(jsonData.AddNewStock[0].stdo_duration)
   await addStockItems.enterDilutant('Yes')
   await addStockItems.enterDoseMultiplier()
   await addStockItems.enterStandardAmountToDispense(jsonData.AddNewStock[0].stdo_num_to_dispensed)
   await addStockItems.enterAgeUpperLimit('65')
   await addStockItems.enterAgeLowerLimit('3')
   await addStockItems.enterMaximumDosage('5')
   await addStockItems.enterMinimumDosage('2')
   await addStockItems.toggleControlledDrug()
   await addStockItems.togglePrescriptionOnly()
   await addStockItems.toggleSuitableForHomeDelivery()

   await page.getByTestId('batch').click();
   //Add Batch Details
   await addStockItems.enterSupplier(jsonData.AddNewStock[0].stbat_supplier)
   //await addStockItems.enterManufacturer(jsonData.AddNewStock[0].stbat_supplier)
   await addStockItems.enterBatchNumber(jsonData.AddNewStock[0].stbat_batch_number)
   await addStockItems.enterInStockQuantity(jsonData.AddNewStock[0].stbat_quantity)
   await addStockItems.enterSerialNumber(jsonData.AddNewStock[0].stbat_serial_number)
   await page.waitForTimeout(1500)
  //  await addStockItems.enterSterilizationExpiryDate('01/01/2030')
  //  await page.waitForTimeout(1500)
   await addStockItems.enterManufacturedDate(jsonData.AddNewStock[0].stbat_manufacture_date)
   await page.waitForTimeout(1500)
   await addStockItems.enterReceivedDate(jsonData.AddNewStock[0].stbat_batch_received_date)
   await page.waitForTimeout(1500)
   await addStockItems.enterExpiryDate(jsonData.AddNewStock[0].stbat_expiry_date)

   await addStockItems.enterPurchaseRate(jsonData.AddNewStock[0].stbat_purchase_price)
   await addStockItems.enterUnitCost(jsonData.AddNewStock[0].stbat_unit_cost)
   await addStockItems.enterRetailPrice(jsonData.AddNewStock[0].stbat_retail_price)
   
   await addStockItems.FillPositions1()
   await addStockItems.FillPositions2()
   await addStockItems.FillPositions3()
   await addStockItems.FillPositions4()

   await addStockItems.ClickOnSaveStockItemButton()
   await page.waitForTimeout(200)
   await expect(page.getByText('Stock item added successfully')).toHaveText('Stock item added successfully')  

   //await page.pause()

  

   //check DB
    var sqlQuery =  "select si.stock_name,si.stock_category,si.stock_barcode,si.stock_item_barcode,si.stock_description,si.stock_desc_other_lang, sb.stbat_serial_number,sb.stbat_quantity,sb.stbat_manufacture_date,sb.stbat_expiry_date,sb.stbat_batch_number,sb.stbat_supplier,sb.stbat_batch_received_date,sb.stbat_purchase_price,sb.stbat_unit_cost,sb.stbat_retail_price from c4_stock_items si JOIN stock_batches sb ON si.stock_id = sb.stbat_stock_id ORDER BY stock_id DESC limit 1";
        console.log(sqlQuery)        
        var sqlFilePath = "SQLResults/StockDomain/AddNewStock.json";
        var results = await executeQuery(sqlQuery, sqlFilePath);        
        const stock_id = results[0].stock_id;     
        console.log("Stock id is: "+stock_id);            
        var match = await compareJsons(sqlFilePath, null, jsonData.AddNewStock[index]);
        if (match) {
          console.log("\n Add New Stock Comparision: Parameters from both JSON files match!\n");
        } else {
          console.log("\n Add New Stock Comparision: Parameters from both JSON files do not match!\n");
        }



 await page.waitForTimeout(2000)
   await addStockItems.clickOnLogout(page)
   

  });
});
