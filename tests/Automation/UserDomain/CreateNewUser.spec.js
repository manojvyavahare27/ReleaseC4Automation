// Create By: Supriya B
const fs = require("fs");
const XLSX = require("xlsx");
//const path = "D:/Riomed/Cellma4Automation";
const path = require('path');
const mysql = require("mysql");
const convertExcelToJson = require('../../../config/global-setupOptimized');
import { test, expect, Page, chromium } from '@playwright/test';

//const convertExcelToJson = require("../../../config/global-setupOptimized");
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

test.describe("Database Comparison Add New User", () => {
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

    test('Create New User @User Domain', async ({page}) => {
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
        await page.waitForTimeout(1500)
        await loginpage.enterUsername(jsonData.loginDetails[0].username);
        await page.waitForTimeout(1500);
        await loginpage.enter_Password(jsonData.loginDetails[0].password); 
        await page.waitForTimeout(1500)
        await loginpage.clickOnLogin()    
       // await page.pause()
        await homepage.clickonSidebarHomeIcon() 
        await homepage.clickOnUserIcon()   
        
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

        //User List page 

        await usersearch.enterUserSearch(jsonData.createUser[index].use_username_old)
        await usersearch.clickOnSearchButton()
       // await page.pause()
        await usersearch.clickOnViewLink()
        await hpdiary.clickOnBackButton()
        await usersearch.enterUserSearch(jsonData.createUser[index].use_username_old)
        await usersearch.clickOnSearchButton()
        await usersearch.clickOnResetLink()
        // await usersearch.enterInvConfirmNewPassword(createuserdata.InvNewPassword)
        // await usersearch.enterInvConfirmPassword(createuserdata.InvConfirmPassword)
        // await page.pause()
        // await usersearch.clickOnSavePasswordBtn()
        // await expect(page.getByText('Please enter different Password')).toHaveText('Please enter different Password')
        await usersearch.enterConfirmNewPassword(jsonData.createUser[index].use_password)
        await usersearch.enterConfirmPassword(jsonData.createUser[index].use_password)
        await usersearch.clickOnSavePasswordBtn()
        await expect(page.getByText('Password has been changed successfully')).toHaveText('Password has been changed successfully')
        //await page.pause()
        //Search User
        await usersearch.enterUserSearch(jsonData.createUser[index].use_username)
        await usersearch.enterGivenName(jsonData.createUser[index].use_firstname)
        await usersearch.enterFamilyName(jsonData.createUser[index].use_surname)
        
        await usersearch.selectUserStatus()
        await page.waitForTimeout(1000)
        await usersearch.selectUserService()
        //await page.pause()
        await usersearch.clickOnSearchButton()
        await usersearch.clickOnAddUser()
        await adduserwizard.clickOnBackButton()
        await usersearch.clickOnAddUser()

       // await page.pause()
        //Customisable view
        // await adduserwizard.clickOnCustomSettingbtn()
        // await adduserwizard.clickOnCustomisableView()
        // await adduserwizard.clickOnSave()
        //await expect(page.getByText('Customize view added successfully')).toHaveText('Customize view added successfully')
        await adduserwizard.clickOnSave()
        //check mandatory fields message
       // await expect(page.getByText('Username required')).toHaveText('Username required')    
        //await expect(page.getByText('Password required')).toHaveText('Password required')
        //await expect(page.getByText('Confirm Password required')).toHaveText('Confirm Password required')
        await expect(page.getByText('Email required')).toHaveText('Email required')
        await expect(page.getByText('Given Name required')).toHaveText('Given Name required')
        await expect(page.getByText('Family Name required')).toHaveText('Family Name required')
        await expect(page.getByText('Profession required')).toHaveText('Profession required')

        //Upload Photo

        //await page.getByTestId('EditIcon').click()
        
        // Get the upload input element
        await page.getByTestId('EditIcon').locator('path').click();
        // const fileInput = page.getByTestId('PhotoCameraIcon');  
        // // Set the file to upload
        // const filePath = '../Cellma Daily Change/UploadPics/User_1.png';  
        // // Upload the file
        // await fileInput.setInputFiles(filePath); 
        // await page.getByTestId('Upload').click()

        //const fileInput = await page.$("input[type=file]");
        ////////////////////////////////
        // const fileInput = page.getByTestId('PhotoCameraIcon');
        // const filePath = "../Cellma4Automation/UploadPics/User_1.png";        
        // await fileInput.setInputFiles(filePath,fileInput);
        // await page.getByTestId("Upload").click();
        // await page.waitForTimeout(1000);
////////////////////////////

/////////////////////////////
    /**
 * Recursively searches for a specific file in a directory tree.
 * @param {string} dir - Directory to start searching from.
 * @param {string} targetFile - Name of the file to find.
 * @returns {string|null} - Absolute path to the file, or null if not found.
 */
function findFileRecursive(dir, targetFile) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const result = findFileRecursive(fullPath, targetFile);
      if (result) return result;
    } else if (file === targetFile) {
      return fullPath;
    }
  }
  return null;
}

// Get Jenkins workspace root or current directory
const workspaceRoot = process.env.WORKSPACE || process.cwd();
const targetFilePath = findFileRecursive(workspaceRoot, 'Patient.png');

if (!targetFilePath) {
  throw new Error('❌ Patient.png not found anywhere under the workspace!');
}

console.log('✅ Found Patient.png at:', targetFilePath);

// Upload the file using Playwright
const fileInput = await page.getByTestId('PhotoCameraIcon');
await fileInput.setInputFiles(targetFilePath);

    // Select the file input element and upload the file
    //  const filePath = 'path/to/your/photo.jpg';
    //  await page.setInputFiles('input[type="file"]', filePath);








        //Upload Digital signature
        // await page.pause()    
        // const filePath1 = '../Cellma4Automation/UploadPics/Digital_Signature.png';
        // await fileInput.setInputFiles(filePath1); 
        // await page.getByText('No File Chosen').setInputFiles(filePath1);
        
        // await page.getByTestId('EditIcon').locator('path').click();
        // await page.getByTestId('PhotoCameraIcon').click();
        // const filePath = '../Cellma4Automation/UploadPics/Patient.png'; 
        // await fileInput.setInputFiles(filePath);
        // await page.getByTestId('Upload').click();

        //User Wizard 
        //User details
        await page.getByLabel('cancelIcon').click()
        await adduserwizard.selectTitle(jsonData.createUser[index].use_title)
        await adduserwizard.enterUsername(jsonData.createUser[index].use_username_old)
        await adduserwizard.enterPassword(jsonData.createUser[index].use_password)
        await adduserwizard.enterConfirmPassword(jsonData.createUser[index].use_password)
        await adduserwizard.enterEmail(jsonData.createUser[index].use_email)
        await adduserwizard.enterGivenName(jsonData.createUser[index].use_firstname)
        await adduserwizard.enterFamilyName(jsonData.createUser[index].use_surname)
        await adduserwizard.selectSubscribed()
        await adduserwizard.selectUserServiceGroup()    
        await adduserwizard.enterNotes(jsonData.createUser[index].use_notes)
        //await adduserwizard.selectShowOnExtRefPage()
        await adduserwizard.enterMobileNumber(jsonData.createUser[index].use_mobile.toString())
        await adduserwizard.selectShowExternalRequestPage()
        await adduserwizard.enterUserExpireDate(jsonData.createUser[index].use_expires)
        await adduserwizard.selectProfession(jsonData.createUser[index].use_profession)
        await adduserwizard.enterMCRNNumber(jsonData.createUser[index].use_mcrn_number.toString())
        
        //await adduserwizard.selectUserStatus()
        //await adduserwizard.selectResetPassword()    
        //Add user group pop up details
    
        await adduserwizard.clickOnAddLink()
        await page.waitForTimeout(2000)   
        
        await adduserwizard.addUserGroup(page) 
        await adduserwizard.addHpDeaultRole()  
        
        //User HP Details
        //await adduserwizard.toggleContactHidden()
        //await adduserwizard.toggleHPOnDiary()
        //await adduserwizard.toggleUserIsHP()

        // Create By: Manoj V.
        // Date:30/05/2023
        //await page.pause()
        await adduserwizard.toggleUserIsHP()
        await adduserwizard.toggleHPOnDiary()
        await adduserwizard.enterInitial(jsonData.createEstProfessional[index].esp_initials)
        await adduserwizard.selectConsultant()
        await adduserwizard.enterPROMsSurname(jsonData.createEstProfessional[index].esp_surname)    
        await adduserwizard.selectSpecialty(jsonData.createEstProfessional[index].esp_specialty)
        await adduserwizard.enterFirstValidity(jsonData.createEstProfessional[index].esp_first_consultation_validity.toString())
        await adduserwizard.selectShow()
        await adduserwizard.enterConstCode(jsonData.createEstProfessional[index].esp_consultant_code)
        await adduserwizard.enterFollowupValidity(jsonData.createEstProfessional[index].esp_follow_up_consultation_validity.toString())    
        await adduserwizard.selectGenericHP()
       // await page.pause()
        await adduserwizard.selectTeams(jsonData.createEstProfessional[index].esp_region_eli_text)
        await adduserwizard.enterNPINumber(jsonData.createEstProfessional[index].esp_npi_number.toString())   
        await adduserwizard.selectApptEmail()
        await adduserwizard.selectPROMsReason()
        await adduserwizard.selectLocal()
        await adduserwizard.selectCommissionLevel(jsonData.createEstProfessional[index].esp_commision_level)      
        //await adduserwizard.enterPROMsNumber(jsonData.createEstProfessional[index].esp_hp_proms_code)    
        await adduserwizard.clickOnSave()
        await expect(page.getByText('User Already Exists')).toHaveText('User Already Exists')    
        await usersearch.enterUserSearch(jsonData.createUser[index].use_username)
        await page.waitForTimeout(1000)
        await adduserwizard.clickOnSave()
        await page.waitForTimeout(1000)
        //await expect(page.getByText('User and HP created successfully')).toHaveText('User and HP created successfully')
    
        //await this.page.locator('div').filter({ hasText: 'Is User Going On DiaryYesNo' }).getByRole('button', { name: 'Yes' }).click()
        
         // await page.pause() 
        await adduserwizard.clickOnNext()
               
        await page.waitForTimeout(2000)
        // Set HP Dairy
        await sethpdairy.clickOnSavebnt()
        await expect(page.getByText('Please select Start Date')).toHaveText('Please select Start Date')
        await expect(page.getByText('Please select End Date')).toHaveText('Please select End Date')
        await expect(page.getByText('Please select Start Time')).toHaveText('Please select Start Time')
        await expect(page.getByText('Please select End Time')).toHaveText('Please select End Time')

        await sethpdairy.enterStartdate(jsonData.setHpDiary[index].searchStartDate)
        await page.waitForTimeout(2000)
        await sethpdairy.enterEndDate(jsonData.setHpDiary[index].searchEndDate)
        await page.waitForTimeout(2000)
        await sethpdairy.clickOnSearchbutton()
        await page.waitForTimeout(2000)
        await sethpdairy.clickOnHpStartDate(jsonData.setHpDiary[index].hpd_start_date)
        await page.waitForTimeout(2000)
        await sethpdairy.clickOnHpEndDate(jsonData.setHpDiary[index].hpd_end_date)
       // await page.pause() 
       await page.waitForTimeout(1000)
        await sethpdairy.selectWorkingDays()
        await page.waitForTimeout(2000)
        await sethpdairy.enterHpWorkingStartTime(jsonData.setHpDiary[index].hpd_working_start_time)
        await page.waitForTimeout(2000)
        await sethpdairy.enterHpWorkingEndTime(jsonData.setHpDiary[index].hpd_working_end_time)   
        await page.pause()
        //await sethpdairy.selectHpWorkingHrsOccuranceType()
        //await sethpdairy.selectHpworkingHrsOccurance()
        await page.waitForTimeout(2000)
        await sethpdairy.selectClinicScheduleStartDate(jsonData.setHpClinicDiary[index].hcd_start_date)
        await page.waitForTimeout(2000)
        await sethpdairy.selectClinicScheduleEndDate(jsonData.setHpClinicDiary[index].hcd_end_date)
        await page.waitForTimeout(2000)
        await sethpdairy.selectClinicScheduleWrokingDays()
        await page.waitForTimeout(2000)
        await sethpdairy.enterClinicScheduleWorkingHrsStartTime(jsonData.setHpClinicDiary[index].hcd_clinic_start_time)
        await page.waitForTimeout(2000)
        await sethpdairy.enterClinicScheduleWorkingHrsEndTime(jsonData.setHpClinicDiary[index].hcd_clinic_end_time)
        // await sethpdairy.selectClinicScheduleOccuranceType()
        // await sethpdairy.selectClinicScheduleOccurance()
        await page.pause()
        await page.waitForTimeout(1000)  
        await sethpdairy.clickOnSavebnt()
        await page.waitForTimeout(500)
        await expect(page.getByText('HP work schedule set successfully')).toHaveText('HP work schedule set successfully')
        await sethpdairy.clickOnNextbtn()
        await page.waitForTimeout(4000)
        await page.getByTestId('Next').click()
        
        //HP Diary    
       // await page.pause() 
       await page.waitForTimeout(2000)
        await hpdiary.clickOnClinicDiarybutton()
        await page.waitForTimeout(1000)
        await hpdiary.selectDaywiseView()
        await page.waitForTimeout(1000)
        await hpdiary.selectWeekwiseView()
        await page.waitForTimeout(1000)
        await hpdiary.selectmonthwiseView()
        await page.waitForTimeout(1000)
        await hpdiary.clickOnHpDiaryButton()
        await page.waitForTimeout(1000)
        await hpdiary.selectDaywiseView()
        await page.waitForTimeout(1000)
        await hpdiary.selectWeekwiseView()
        await page.waitForTimeout(1000)
        await hpdiary.selectmonthwiseView()
        await page.waitForTimeout(2000)
        //await page.pause() 
        await page.waitForTimeout(1000)
        await hpdiary.changeDate()
        await page.waitForTimeout(1000)
        await hpdiary.clickOnDate()
        await page.waitForTimeout(1000)
        await hpdiary.selectLeaveType(jsonData.setHpLeave[index].hpd_leave_type_eli_text)
        await hpdiary.checkCheckboxDays()
        await hpdiary.selectLeaveType(jsonData.setHpLeave[index].hpd_leave_type_eli_text)
        await page.waitForTimeout(1000)
        await hpdiary.enterLeavesStartDate(jsonData.setHpLeave[index].hpd_start_date)
        await page.waitForTimeout(1000)
        await hpdiary.enterLeavesEndDate(jsonData.setHpLeave[index].hpd_end_date)    
        await hpdiary.clickOnSaveLeaveButton()

        //await page.pause()
        //Sidebar Functionality
        // await sethpdairy.clickOnOpenSidebar()
        // await usersearch.clickOnSearchUserLink()
        // await usersearch.clickOnUserGroupLink()
        // await usersearch.clickOnCancelPopup()
        // await usersearch.clickOnUserGroupGroupinglink()
        // await usersearch.clickOnCancelPopup()
        // await usersearch.clickOnServiceGroup()
        // await usersearch.clickOnCancelPopup()
        // await usersearch.clickOnUserMonitoring()
        // await usersearch.clickOnCancelPopup()
        // await usersearch.clickOnTrainingPortal()
        // await usersearch.clickOnCancelPopup()

         ///////// User Comparison ///////////////
         var sqlQuery =
         "select * from users where use_username = '" +
         jsonData.createUser[index].use_username + "'";
       console.log(sqlQuery);
       var sqlFilePath = "SQLResults/UserDomain/UserDetails.json";
       var results = await executeQuery(sqlQuery, sqlFilePath);
   
       const espId = results[0].use_esp_id;
       console.log("Establishment Profession ID is:" + espId);
   
       var match = await compareJsons(
         sqlFilePath,
         null,
         jsonData.createUser[index]
       );
       if (match) {
         console.log(
           "\n Add New User Comparison: Parameters from both JSON files match!\n"
         );
       } else {
         console.log(
           "\n Add New User Comparison: Parameters from both JSON files do not match!\n"
         );
       }
 
       //////////// Establishment Professional Comparison ///////////////
       sqlQuery =
         "select * from establishment_professionals where esp_id = '" +
         espId + "'";
         console.log(sqlQuery);
       sqlFilePath = "SQLResults/UserDomain/EstablishmentProfessionals.json";
       results = await executeQuery(sqlQuery, sqlFilePath);
       match = await compareJsons(
         sqlFilePath,
         null,
         jsonData.createEstProfessional[index]
       );
       if (match) {
         console.log(
           "\n Add Establishment Professional Comparison: Parameters from both JSON files match!\n"
         );
       } else {
         console.log(
           "\n Add Establishment Professional Comparison: Parameters from both JSON files do not match!\n"
         );
       }


       ////////////////// Hp Diary //////////////////
       sqlQuery ="select * from hp_diary where hpd_esp_id = '" +  espId + "' order by 1 asc limit 1";
     console.log(sqlQuery);
     sqlFilePath = "SQLResults/UserDomain/HpDiary.json";
     results = await executeQuery(sqlQuery, sqlFilePath);

     match = await compareJsons( sqlFilePath,  null,  jsonData.setHpDiary[index]);
     if (match) {
       console.log("\n HP Diary Comparision: Parameters from both JSON files match!\n");
     } else {
       console.log("\n HP Diary Comparision: Parameters from both JSON files do not match!\n");
     }

     //////////// HP Clinic Diary ///////////////

     sqlQuery ="select * from hp_clinic_diary where hcd_esp_id = '" +  espId + "' order by 1 asc limit 1";
   console.log(sqlQuery);
   sqlFilePath = "SQLResults/UserDomain/HpClinicDiary.json";
   results = await executeQuery(sqlQuery, sqlFilePath);

   match = await compareJsons(sqlFilePath, null,jsonData.setHpClinicDiary[index]);
   if (match) {
     console.log("\n HP Clinic Diary Comparision: Parameters from both JSON files match!\n");
   } else {
     console.log("\n HP Clinic Diary Comparision: Parameters from both JSON files do not match!\n");
   }


   ////////////////// Hp Diary Leave //////////////////
        sqlQuery = "select * from hp_diary where hpd_esp_id = '" +espId +"' order by 1 desc limit 1";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/UserDomain/HpDiaryLeave.json";
      results = await executeQuery(sqlQuery, sqlFilePath);

      match = await compareJsons(sqlFilePath,null,jsonData.setHpLeave[index]);
      if (match) {
        console.log( "\n HP Diary Leave Comparision: Parameters from both JSON files match!\n");
      } else {
        console.log("\n HP Diary Leave Comparision: Parameters from both JSON files do not match!\n");
      }


      ////////////////// Hp Clinic Diary Leave //////////////////
      sqlQuery =
      "select * from hp_clinic_diary where hcd_esp_id = '" +
      espId +
      "' order by 1 desc limit 1";
    console.log(sqlQuery);
    sqlFilePath = "SQLResults/UserDomain/HpClinicDiaryLeave.json";
    results = await executeQuery(sqlQuery, sqlFilePath);

    match = await compareJsons(
      sqlFilePath,
      null,
      jsonData.setHpClinicLeave[index]
    );
    if (match) {
      console.log(
        "\n HP Clinic Diary Leave Comparision: Parameters from both JSON files match!\n"
      );
    } else {
      console.log(
        "\n HP Clinic Diary Leave Comparision: Parameters from both JSON files do not match!\n"
      );
    }

     // await menu.clickOnLogout();
        
    });
});
