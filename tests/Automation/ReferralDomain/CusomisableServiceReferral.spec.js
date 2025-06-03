import { test, expect, Page, chromium } from '@playwright/test';

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";

import LoginPage from '../../../Pages/BaseClasses/LoginPage';
import Homepage from '../../../Pages/BaseClasses/Homepage';
import Environment from '../../../Pages/BaseClasses/Environment';
import Menu from '../../../Pages/BaseClasses/Menu';;
import TopBlueBar from '../../../Pages/BaseClasses/TopBlueBar';
import AddReferral from '../../../Pages/PatientDomain/AddReferral';
import ServiceReferrals from '../../../Pages/ReferralDomain/ServiceReferrals';
import ServiceReferralsCustom from '../../../Pages/ReferralDomain/ServiceReferralsCustom';

const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))

const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Customisable Service Referral", () => {
  test("Extract Patient Details", async ({}) => {
    const excelFilePath =
      process.env.EXCEL_FILE_PATH || "./ExcelFiles/ReferralDomain.xlsx";
    const jsonFilePath =
      "./TestDataWithJSON/ReferralDomain/ReferralDetails.json";
    const conversionSuccess = await convertExcelToJson(
      excelFilePath,
      jsonFilePath
    );

    if (conversionSuccess) {
      jsonData = require("../../../TestDataWithJSON/ReferralDomain/ReferralDetails.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });

    test('Customisable Service referral @Automation @ReferralDomain', async ({ page }) => {
        const loginpage = new LoginPage(page)
        const homepage = new Homepage(page)
        const environment = new Environment(page)
        const menu = new Menu(page)
        const topbluebar = new TopBlueBar(page)
        const addreferral = new AddReferral(page)
        const servicereferrals = new ServiceReferrals(page)
        const servicereferralcustom= new ServiceReferralsCustom(page)

        let index = 0

        await page.pause()
        await page.goto(environment.Test)
        await page.waitForTimeout(1500)
        await loginpage.enterUsername(jsonData.loginDetails[0].username)
        await page.waitForTimeout(1500)
        await loginpage.enter_Password(jsonData.loginDetails[0].password)   
        await page.waitForTimeout(1500) 
        await loginpage.clickOnLogin()
        await homepage.clickonSidebarHomeIcon()
        await homepage.clickOnSideIconReferrals()
        await servicereferrals.clickOnSettingButton()
        await servicereferrals.clickOnCustomizableViewButton()
        await servicereferralcustom.clickOnBackButton()
        await servicereferrals.clickOnSettingButton()
        await servicereferrals.clickOnCustomizableViewButton()
        await servicereferralcustom.clickOnSaveButton()
        //await expect(page.getByText('Customize view updated successfully')).toHaveText('Customize view updated successfully')
        await servicereferrals.clickOnSettingButton()
        await servicereferrals.clickOnCustomizableViewButton()
        //await page.pause()
        await servicereferralcustom.clickOnResetToDefaultViewButton()
        await servicereferralcustom.clickOnOkButton()
        //await expect(page.getByText('Customize view updated successfully')).toHaveText('Customize view updated successfully')

        await menu.clickOnLogout();
        //Listen for console events
        page.on("console", async (msg) => {
          const args = await Promise.all(
            msg.args().map((arg) => arg.jsonValue())
          );
          consoleLogs.push({
            type: msg.type(),
            text: args.join(" "),
          });
        });
  
        page.on("console", async (msg) => {
          const args = await Promise.all(
            msg.args().map((arg) => arg.jsonValue())
          );
          consoleLogs.push({
            type: msg.type(),
            text: args.join(" "),
          });
        });
    });

});