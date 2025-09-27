// Create By: Manoj V
// Date:19/06/2023

import { test, expect, Page, chromium } from '@playwright/test';

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";

import LoginPage from '../../../Pages/BaseClasses/LoginPage';
import Homepage from '../../../Pages/BaseClasses/Homepage';
import Environment from '../../../Pages/BaseClasses/Environment';
import Menu from '../../../Pages/BaseClasses/Menu';
import TopBlueBar from '../../../Pages/BaseClasses/TopBlueBar';
import EditPatient from '../../../Pages/PatientDomain/EditPatient';
import PatientDeath from '../../../Pages/PatientDomain/PatientDeath';
import UserSearch from '../../../Pages/UserDomain/UserSearch';
import AddUserWizard from '../../../Pages/UserDomain/AddUserWizard';
import UserPage from '../../../Pages/UserDomain/UserPage';
import SetHPDairy from '../../../Pages/UserDomain/SetHPDiary';
import HPDiary from '../../../Pages/UserDomain/HpDiary';


const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")))
const pipdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))
const deadpatient=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/DeadPatientDetails.json")))
const createuserdata=JSON.parse(JSON.stringify(require("../../../TestData/UserDomain/CreateUserData.json")))

let jsonData;

test.describe("Database Comparison Edit HP Diary", () => {
    test("Extract User Details", async ({}) => {
      const excelFilePath =
        process.env.EXCEL_FILE_PATH || "./ExcelFiles/UserDomain.xlsx";
      const jsonFilePath = "./TestDataWithJSON/UserDomain/UserDetails.json";
      const conversionSuccess = await convertExcelToJson(
        excelFilePath,
        jsonFilePath
      );
  
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

    test('Edit User and Add Leave @User Domain', async ({page}) => {
        const loginpage=new LoginPage(page)
        const homepage=new Homepage(page)
        const environment=new Environment(page)   
        const menu=new Menu(page)
        const topbluebar=new TopBlueBar(page)
        const editpatient=new EditPatient(page)
        const patientdeath=new PatientDeath(page)
        const usersearch=new UserSearch(page)
        const adduserwizard=new AddUserWizard(page)
        const sethpdairy=new SetHPDairy(page)
        const hpdiary=new HPDiary(page)

        const index = 0;

        await page.goto(environment.Test)     
        await page.waitForTimeout(2000)
        await loginpage.enterUsername(jsonData.loginDetails[0].username);
        await page.waitForTimeout(1500);
        await loginpage.enter_Password(jsonData.loginDetails[0].password);
        await page.waitForTimeout(2000)  
        await loginpage.clickOnLogin()  
        await homepage.clickonSidebarHomeIcon()
        await homepage.clickOnUserIcon()   
        //await page.pause()
        //Check Links  
        await usersearch.clickOnLinkLinks()
        await usersearch.clickOnAddMPIUserLink()
        await usersearch.clickOnCancelbutton()
        await usersearch.clickOnLinkLinks()
        await usersearch.clickOnRefreshlink()
        await usersearch.clickOnCancelbutton()
        await usersearch.clickOnLinkLinks()
        await usersearch.clickOnServiceDetailsLink()
        await usersearch.clickOnCancelbutton()


        //Search User
        await usersearch.enterUserSearch(jsonData.createUser[index].use_username)
        await usersearch.enterGivenName(jsonData.createUser[index].use_firstname)
        await usersearch.enterFamilyName(jsonData.createUser[index].use_surname)
        await usersearch.selectUserStatus()    

        
        await usersearch.clickOnSearchButton()
        
        await usersearch.clickOnEditUser()    
        await page.waitForTimeout(3000)
        //await adduserwizard.toggleUserIsHP()    
        await adduserwizard.clickOnNext()
        
        
        await sethpdairy.enterStartdate(jsonData.editHpDiary[index].hpd_start_date)
        await sethpdairy.enterEndDate(jsonData.editHpDiary[index].hpd_end_date)
        //await page.pause()
        await sethpdairy.clickOnSearchbutton()
        //await page.pause()
        
        await sethpdairy.clickOnHpSchedlue()
        await sethpdairy.clickOnClinicSchedule()
        await sethpdairy.clickOnCombinedSchedule()
        await sethpdairy.clickOnHpSchedlue()
        //await page.pause()
        //await sethpdairy.clickOndeleteHPSchedule()
        //await sethpdairy.clickOnYesToDeleteHpSchedule()   
        //await expect(page.getByText('Record deleted successfully')).toHaveText('Record deleted successfully')
        //await sethpdairy.clickOnHpSchedlue()
        await sethpdairy.selectRepeatSchedule()
        await sethpdairy.clickOnRepeatSchedule()
        // await sethpdairy.closeRepeatSchedulePopupPage()
        // await sethpdairy.clickOnRepeatSchedule()
        await sethpdairy.enterRepeatScheduleEndDate()
        await sethpdairy.clickOnSaveForRepeatSchedule()
        //await expect(page.getByText('HP work schedule set successfully')).toHaveText('HP work schedule set successfully')
        
        // await sethpdairy.clickOnHpStartDate()
        // await sethpdairy.clickOnHpEndDate()
        // await sethpdairy.selectWorkingDays()
        // await sethpdairy.enterHpWorkingStartTime()
        await page.waitForTimeout(2000)
        await sethpdairy.clickOnNextButton()
        
       // await page.pause()
        //HP Diary
        //await page.pause()
        //await page.getByTestId('Next').click()
        await page.waitForTimeout(1000)
        await hpdiary.clickOnNextButton()
        await hpdiary.clickOnClinicDiarybutton()
        await hpdiary.selectDaywiseView()
        await hpdiary.selectWeekwiseView()
        await hpdiary.selectmonthwiseView()
        await hpdiary.clickOnHpDiaryButton()
        await hpdiary.selectDaywiseView()
        await hpdiary.selectWeekwiseView()
        await hpdiary.selectmonthwiseView()
        await hpdiary.changeDate()
        await hpdiary.clickOnDate()
    // await hpdiary.selectLeaveType()
        await hpdiary.selectLeaveType(jsonData.editHpLeave[index].hpd_leave_type_eli_text)
        await hpdiary.checkCheckboxDays()
        await hpdiary.selectLeaveType(jsonData.editHpLeave[index].hpd_leave_type_eli_text)
        await hpdiary.enterLeavesStartDate(jsonData.editHpLeave[index].hpd_start_date)
        await hpdiary.enterLeavesEndDate(jsonData.editHpLeave[index].hpd_end_date)
        //await page.pause()
        await hpdiary.clickOnSaveLeaveButton()
        //await page.pause()

        //Sidebar Functionality
        //await sethpdairy.clickOnOpenSidebar()
        //await sethpdairy.clickOnOpenSidebar()
        await page.waitForTimeout(2000)
        await page.getByRole('button', { name: 'cancelIcon' }).click()
        await page.waitForTimeout(2000)
        await usersearch.clickOnSearchUserLink()
        await usersearch.clickOnUserGroupLink()
        await usersearch.clickOnCancelPopup()
        await usersearch.clickOnUserGroupGroupinglink()
        await usersearch.clickOnCancelPopup()
        await usersearch.clickOnServiceGroup()
        await usersearch.clickOnCancelPopup()
        await usersearch.clickOnUserMonitoring()
        await usersearch.clickOnCancelPopup()
        await usersearch.clickOnTrainingPortal()
        await usersearch.clickOnCancelPopup()
        //await page.pause()


        var sqlQuery =
        "select * from users where use_username = '" +
        jsonData.createUser[index].use_username_old + "'";
      console.log(sqlQuery);
      var sqlFilePath = "SQLResults/UserDomain/UserDetails.json";
      var results = await executeQuery(sqlQuery, sqlFilePath);
  
      const espId = results[0].use_esp_id;
      console.log("Establishment Profession ID is:" + espId);

        ////////////////// Hp Diary Leave //////////////////
        sqlQuery =
        "select * from hp_diary where hpd_esp_id = '" +
        espId +
        "' order by 1 desc limit 1";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/UserDomain/EditHpDiaryLeave.json";
      results = await executeQuery(sqlQuery, sqlFilePath);

      var match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.editHpLeave[index]
      );
      if (match) {
        console.log(
          "\n HP Diary Leave Comparision: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n HP Diary Leave Comparision: Parameters from both JSON files do not match!\n"
        );
      }

        ////////////////// Hp Clinic Diary Leave //////////////////
        sqlQuery =
        "select * from hp_clinic_diary where hcd_esp_id = '" +
        espId +
        "' order by 1 desc limit 1";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/UserDomain/EditHpClinicDiaryLeave.json";
      results = await executeQuery(sqlQuery, sqlFilePath);
  
      match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.editHpClinicLeave[index]
      );
      if (match) {
        console.log(
          "\n HP Clinic Diary Leave Comparision: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n HP Clinic Diary Leave Comparision: Parameters from both JSON files do not match!\n"
        );
      } ``

      await page.waitForTimeout(1000)
      await menu.clickOnLogout(page);
        
    });

});