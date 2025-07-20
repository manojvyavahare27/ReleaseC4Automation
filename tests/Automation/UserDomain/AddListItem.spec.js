// Create By: Manoj V
// Date:19/06/2023

import { test, expect, Page, chromium } from "@playwright/test";

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";

import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import Environment from "../../../Pages/BaseClasses/Environment";
import Menu from "../../../Pages/BaseClasses/Menu";
import TopBlueBar from "../../../Pages/BaseClasses/TopBlueBar";
import EditPatient from "../../../Pages/PatientDomain/EditPatient";
import PatientDeath from "../../../Pages/PatientDomain/PatientDeath";
import UserSearch from "../../../Pages/UserDomain/UserSearch";
import AddUserWizard from "../../../Pages/UserDomain/AddUserWizard";
import UserPage from "../../../Pages/UserDomain/UserPage";
import SetHPDairy from "../../../Pages/UserDomain/SetHPDiary";
import HPDiary from "../../../Pages/UserDomain/HpDiary";
import AddToListItem from "../../../Pages/UserDomain/AddToListItem";

const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")));
const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")));
const pipdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")));
const gpdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")));
const deadpatient = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/DeadPatientDetails.json")));
const createuserdata = JSON.parse(JSON.stringify(require("../../../TestData/UserDomain/CreateUserData.json")));
const addlistitem = JSON.parse(JSON.stringify(require("../../../TestData/UserDomain/AddListItem.json")));

const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Add List Item", () => {
  test("Extract User Details", async ({ }) => {
    const excelFilePath =
      process.env.EXCEL_FILE_PATH || "./ExcelFiles/UserDomain.xlsx";
    const jsonFilePath = "./TestDataWithJSON/UserDomain/UserDetails.json";
    const conversionSuccess = await convertExcelToJson(excelFilePath,jsonFilePath);

    if (conversionSuccess) {
      jsonData = require("../../../TestDataWithJSON/UserDomain/UserDetails.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });

  test("Add List Items @User Domain", async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new Homepage(page);
    const environment = new Environment(page);
    const menu = new Menu(page);
    const topbluebar = new TopBlueBar(page);
    const editpatient = new EditPatient(page);
    const patientdeath = new PatientDeath(page);
    const usersearch = new UserSearch(page);
    const adduserwizard = new AddUserWizard(page);
    const sethpdairy = new SetHPDairy(page);
    const hpdiary = new HPDiary(page);
    const addtolistitem = new AddToListItem(page);

    const index = 0;

    await page.goto(environment.Test);
    await page.waitForTimeout(1500);
    await loginpage.enterUsername(jsonData.loginDetails[0].username);
    await page.waitForTimeout(1500);
    await loginpage.enter_Password(jsonData.loginDetails[0].password);
    await page.waitForTimeout(1500);
    await loginpage.clickOnLogin();
    //await page.pause()
    await homepage.clickonSidebarHomeIcon();

    await homepage.clickOnUserIcon();

    //Sidebar Functionality
    //await sethpdairy.clickOnOpenSidebar()
    await usersearch.clickOnSetUpTab();
    await usersearch.clickOnListLink();

    //Check Links
    //await page.pause()
    await usersearch.clickOnLinkLinks();
    //await usersearch.clickOnAddMPIUserLink()
    await usersearch.clickOnServiceHpDefaultApp();
    await usersearch.clickOnCancelbutton();
    // await usersearch.clickOnLinkLinks()
    // await usersearch.clickOnRefreshlink()
    // await usersearch.clickOnCancelbutton()
    await usersearch.clickOnLinkLinks();
    await usersearch.clickOnMedicalcategoryDisplayedNameLinking();
    await usersearch.clickOnCancelbutton();

    await addtolistitem.selectListItemList();
    await addtolistitem.clickOnFilterButton();
    await addtolistitem.clickOnAddListItemsButton();

    //AddToList

    await addtolistitem.selectDropdownFromService();
    //await page.pause()
    await addtolistitem.selectDropDownApplicationList();
    await addtolistitem.enterTextInTextBox(jsonData.addListItem[index].eli_text);
    await addtolistitem.enterTextInOtherLang(jsonData.addListItem[index].eli_text_other_lang);
    await addtolistitem.enterNumericValue(jsonData.addListItem[index].eli_numeric_value);
    // await addtolistitem.selectDropDownCodeType(jsonData.addListItem[index].eli_code_type);
    // await addtolistitem.enterCode(jsonData.addListItem[index].eli_code);
    
    await addtolistitem.enterCodeText(jsonData.addListItem[index].eli_code_text);
    //await addtolistitem.enterHextColor(addlistitem.HexColor)

    await addtolistitem.clickOnSavelistItemButton();
    await expect(page.getByText("List item added successfully")).toHaveText(
      "List item added successfully"
    );

    var sqlQuery ="select * from establishment_list_items where eli_text = '" +
      jsonData.addListItem[index].eli_text +"' and eli_app_id = 111 order by eli_id desc limit 1";
    console.log(sqlQuery);
    var sqlFilePath = "SQLResults/UserDomain/listItemData.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);

    const eliId = results[0].eli_id;
    console.log("Establishment List Item ID is:" + eliId);

    var match = await compareJsons(sqlFilePath, null, jsonData.addListItem[index])
       if (match) {
      console.log("\n Add List Item Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Add List Item Comparision: Parameters from both JSON files do not match!\n");
    }

    // await page.pause()
  });
});
