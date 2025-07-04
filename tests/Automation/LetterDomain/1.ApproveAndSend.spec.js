import { test,expect,Page,chromium } from "@playwright/test";

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";


import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import Environment from "../../../Pages/BaseClasses/Environment";
import PatientSearch from "../../../Pages/PatientDomain/PatientSearch";
import ConfirmExisting from "../../../Pages/PatientDomain/ConfirmExisting";
import PatientSideBar from "../../../Pages/PatientDomain/PatientSideBar";
import lettersOrSummaries from "../../../Pages/LetterDomain/lettersOrSummaries"

//import Pool from 'mysql/lib/Pool';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))
const serviceappdetails=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/ServiceApp.json")))



const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Book New App and Cancel", () => {
     test("Extract Patient Details", async ({}) => {
     const excelFilePath = process.env.EXCEL_FILE_PATH || "./ExcelFiles/LettersDomain.xlsx";
     const jsonFilePath ="./TestDataWithJSON/LetterDomain/LetterDomain.json";
     const conversionSuccess = await convertExcelToJson(excelFilePath,jsonFilePath);

     if (conversionSuccess) {
          jsonData = require("../../../TestDataWithJSON/LetterDomain/LetterDomain.json");
          console.log("Excel file has been converted successfully!");
          console.log("jsonData:", jsonData); // Log the loaded JSON data
          console.log("excelFilePath after conversion:", excelFilePath);
          console.log("jsonFilePath after conversion:", jsonFilePath);
     } else {
          throw new Error("Excel to JSON conversion failed.");
     }
     });

     test('Service Appointment @Appt',async ({page})=>{
     const loginpage=new LoginPage(page)
     const homepage=new Homepage(page)
     const environment=new Environment(page)
     const patientsearch=new PatientSearch(page)
     const confirmexisting=new ConfirmExisting(page)
     const patientsidebar=new PatientSideBar(page)
     const letterorSummeries=new lettersOrSummaries(page)   
     const index = 0;
     await page.goto(environment.Test);
     await page.waitForTimeout(1500);
     await loginpage.enterUsername(jsonData.loginDetails[1].username);
     await page.waitForTimeout(1500);
     await loginpage.enter_Password(jsonData.loginDetails[1].password);
     await page.waitForTimeout(1500);
     await loginpage.clickOnLogin();         
     await homepage.clickOnSideIconPatient()
     await patientsearch.enterGivenName(jsonData.patDetails[index].pat_firstname)
     await patientsearch.enterFamilyName(jsonData.patDetails[index].pat_surname)     
     await patientsearch.clickOnSearchPatButton()
     //await expect(page.getByText('Patient list found')).toHaveText('Patient list found') 
     await patientsearch.clickOnSearchPatientLink()       
     await page.waitForTimeout(1000);    
     await confirmexisting.clickOnConfirmExistingDetails()
     await page.waitForTimeout(1000);
     await patientsidebar.clickOnLettersCategory()   
     // await letterorSummeries.selectLetterLocation(jsonData.letterSendApproved[index].patletd_patient_location)
     // await page.waitForTimeout(1000);
     // await letterorSummeries.selectLetterName(jsonData.letterSendApproved[index].patlet_name)
     // await page.waitForTimeout(1000);
     // await letterorSummeries.enterinputStartDate(jsonData.letterSendApproved[index].patletd_start_date)
     // await page.waitForTimeout(1000);
     // await letterorSummeries.enterinputEndDate(jsonData.letterSendApproved[index].patletd_end_date)
     // await page.waitForTimeout(1000);
     // await letterorSummeries.clickOnDraftbutton()       
     await letterorSummeries.selectLetterLocation(jsonData.letterSummries[index].patletd_patient_location)
      await page.waitForTimeout(1000);
     await letterorSummeries.selectLetterName(jsonData.letterSummries[index].patlet_name)
      await page.waitForTimeout(1000);
     await letterorSummeries.enterinputStartDate(jsonData.letterSummries[index].patletd_start_date)
      await page.waitForTimeout(1000);
     await letterorSummeries.enterinputEndDate(jsonData.letterSummries[index].patletd_end_date)
      await page.waitForTimeout(1000);
     await letterorSummeries.clickOnDraftbutton() 
     await page.waitForTimeout(1000);
     await letterorSummeries.selectSendforApproval()
     await page.waitForTimeout(1000);
     await letterorSummeries.clickOnSendforApprovalButton()    
     await page.waitForTimeout(1000);     
     await letterorSummeries.clickOnOkButton()
     await page.waitForTimeout(200)
     await expect(page.getByText("Letter added to patient successfully")).toHaveText("Letter added to patient successfully");


    //check DB
    var sqlQuery =  "SELECT patlet_id,patletd_patient_location,patlet_name,patlet_type,patlet_status FROM patient_letters pl JOIN patient_letter_details pld ON pl.patlet_id = pld.patletd_patlet_id ORDER BY pl.patlet_id DESC LIMIT 1;";
        console.log(sqlQuery)        
        var sqlFilePath = "SQLResults/LetterDomain/LetterData.json";
        var results = await executeQuery(sqlQuery, sqlFilePath);        
        const LetterId = results[0].patlet_id;     
        console.log("Patient id is: "+LetterId);            
        var match = await compareJsons(sqlFilePath, null, jsonData);
        if (match) {
          console.log("\n Letters Comparision: Parameters from both JSON files match!\n");
        } else {
          console.log("\n Letters Comparision: Parameters from both JSON files do not match!\n");
        }



    //await page.pause()
     await letterorSummeries.clickSearchButton()
     await letterorSummeries.enterStartDate(jsonData.letterSendApproved[index].patletd_start_date)
     await letterorSummeries.enterEndDate(jsonData.letterSendApproved[index].patletd_end_date)
     await letterorSummeries.clearStatus()
     //await letterorSummeries.enterStatus(jsonData.letterSendApproved[index].patlet_status)
    // await page.pause()
     await letterorSummeries.clickSearchButton()

     //await letterorSummeries.expandsLetter()
     await page.getByLabel('expandRowIconundefined').click()
     await letterorSummeries.clickOnWordFormatIcon()
    
     // await letterorSummeries.clickOnPdfIcon()
     // await letterorSummeries.clickOnclosePopup()
     await letterorSummeries.clickOnHtmlIcon()
     //await letterorSummeries.clickOnclosePopup()


      await letterorSummeries.clickOnEditHistoryIcon()
      await letterorSummeries.clickOnclosePopup()
      await letterorSummeries.clickOnSendEmailButton()
      await letterorSummeries.clickOnclosePopup()
      await letterorSummeries.clickOnApproveRecordLink()
      await expect(page.getByText("Letter approve successfully")).toHaveText("Letter approve successfully");      
     //await page.pause()
      await letterorSummeries.clickOnDeleteRecordLink()
      await letterorSummeries.clickOnOkButton()      
      await expect(page.getByText("Letter deleted successfully")).toHaveText("Letter deleted successfully");


      //Delete Record

      //////// Patient Primary Cause of Death comparison/////////
     var sqlQuery = "select * from patient_letters where patlet_id="+LetterId+" limit 1";
     console.log(sqlQuery)
      var sqlFilePath = "SQLResults/LetterDomain/LetterData.json";
     var results = await executeQuery(sqlQuery, sqlFilePath);
     console.log("\n Patient Details stored into the database: \n", results);
     var match = await compareJsons(sqlFilePath, null,jsonData.DeleteRecord[index]);
     if (match)      
     {
         console.log("\n Letters deleted Comparision: Parameters from both JSON files match!\n");
     } else {
         console.log("\n Letters deleted Comparision: Parameters from both JSON files do not match!\n");
     }

     // await page.pause()
          
     });
});