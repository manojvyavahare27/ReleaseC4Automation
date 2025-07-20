//Sathyanarayan

const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql2");
const convertExcelToJson = require("../../../config/global-setupOptimized");

const { test, expect } = require("@playwright/test");
const connectToDatabase = require("../../../manoj").default;
const { executeQuery } = require("../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../compareFileOrJson";

import logger from "../../../Pages/BaseClasses/logger";
import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import ConfirmExisting from "../../../Pages/PatientDomain/ConfirmExisting";
import ContactHistory from "../../../Pages/ClinicalDomain/PatientSummary/ContactHistory";
import PatientSearch from "../../../Pages/PatientDomain/PatientSearch";
import Environment from "../../../Pages/BaseClasses/Environment";
import Menu from "../../../Pages/BaseClasses/Menu";
import ClinicalSummary from "../../../Pages/ClinicalDomain/PatientSummary/ClinicalSummary";
import ClinicalExtraDetails from "../../../Pages/ClinicalDomain/PatientSummary/ClinicalExtraDetails";
import pharmacyLocation from "../../../Pages/PharmacyDomain/PharmacySidebar"
import pharmacyHome from "../../../Pages/PharmacyDomain/PharmacyHomePage"



import { TIMEOUT } from "dns";
import { error } from "console";
import { before } from "node:test";
import { toggleDivVisibility } from "../../../UtilFiles/DynamicUtility";
import PharmacyHomePage from "../../../Pages/PharmacyDomain/PharmacyHomePage";

// Array to store console logs

const consoleLogs = [];
let jsonData;

test.describe("Excel Conversion Medications Category", () => {
  test("Extract Patient Summary Details", async ({}) => {
    const excelFilePath =
      process.env.EXCEL_FILE_PATH || "./ExcelFiles/PharmacyDomain.xlsx";
    const jsonFilePath = "./TestDataWithJSON/PharmacyDomain/PharmacyDetails.json";

    console.log("excelFilePath:", excelFilePath);
    console.log("jsonFilePath:", jsonFilePath);
    const conversionSuccess = await convertExcelToJson(
      excelFilePath,
      jsonFilePath
    );
    if (conversionSuccess) {
      // jsonData = require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json");
      jsonData = require("../../../TestDataWithJSON/PharmacyDomain/PharmacyDetails.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });
});

test.describe("Medications Category", () => {
  test("Add Medications", async ({ page }) => {
    if (!jsonData || !jsonData.addPatient) {
      throw new Error("JSON data is missing or invalid.");
    }
    let index = 0;
    for (const data of jsonData.addPatient) {
      const loginpage = new LoginPage(page);
      const homepage = new Homepage(page);
      const environment = new Environment(page);
      const confirmexisting = new ConfirmExisting(page);
      const contacthistory = new ContactHistory(page);
      const patientsearch = new PatientSearch(page);
      const Medications = new ClinicalSummary(page);
      const MedicationsExtraDetails = new ClinicalExtraDetails(page);
      const pharmacyLoc=new pharmacyLocation(page)
      const pharmacyHome=new PharmacyHomePage(page)
      

      const menu = new Menu(page);
      await page.goto(environment.Test);
      await loginpage.enterUsername(jsonData.loginDetails[0].username);
      logger.info("Username enter successfully");
      await page.waitForTimeout(1000);
      await loginpage.enter_Password(jsonData.loginDetails[0].password);
      logger.info("Password enter successfully");
      await loginpage.clickOnLogin();  
      
      logger.info("Clicked on Login button successfully");
      await page.pause()
      await homepage.clickOnHomeDashboardIcon()
      await homepage.clickOnPharmacyIcon()
      //await pharmacyLoc.clickOnCardioLocation()
      await homepage.clickOnMenuFindPatientLink()
      
      
      
      await patientsearch.clickOnSearchButton();
      logger.info("Clicked on Search button successfully");
      await patientsearch.enterGivenName(data.pat_firstname);
      logger.info("Given Name entered successfully");
      //await page.pause()
      await patientsearch.enterFamilyName(data.pat_surname);
      logger.info("Family Name entered successfully");
      await patientsearch.selectSex(data.pat_sex);

    await patientsearch.selectBornDate(data.pat_dob);
    await page.pause()
      //await patientsearch.selectBornDate(formattedDate);
      await patientsearch.clickOnSearchButton();
      await patientsearch.clickOnSearchPatientLink();

      await patientsearch.ClickOnYesConfirmLegitimateRelationship()
      await page.waitForTimeout(2000);
      //await confirmexisting.clickOnConfirmExistingDetails();
      await homepage.clickOnMedicationSidebar()
      await page.pause()
      await page.waitForTimeout(2000);
      await homepage.clickOnAddMedicationlink()
      //await page.pause()
      await page.waitForTimeout(1000);
      await page.getByRole('button', { name: 'cancelIcon' }).click()
      await homepage.clickOnContactHistoryCategory()


      await page.waitForTimeout(1000);
       await contacthistory.clickOnShowFilter()
      await contacthistory.selectServiceFilter("General Medicine Automation");
      await contacthistory.selectContactReasonFilter("Assessments");
      await contacthistory.enterContactDate("26/04/2024");
      await contacthistory.selectContactReason("Assessments");
      await contacthistory.selectContactLocation("Cardio Location");
      //await contacthistory.enterContactWith("Dr Sathya");
      await contacthistory.clickOnAddContact();
      await Medications.clickOnViewContactItemsMenu();
      await Medications.clickOnPinContactItemsMenu();
      await Medications.selectCategoryFromList("Medications");
      await page.waitForTimeout(2000)
     // await page.pause()
       ////////REVIEW EXISTING ITEM AND DELETE/////

       
       if(await Medications.checkItemOnHistoryTable(jsonData.AddMedication[index].pacr_que_name)){
        //await Medications.clickOnItemReview(jsonData.AddMedication[index].pacr_que_name);
        //console.log("Item reviewed before deleting");
        await Medications.clickOnItemEdit(jsonData.AddMedication[index].pacr_que_name);
        await page.waitForTimeout(1000)
        await MedicationsExtraDetails.clickOnDelete();
        await MedicationsExtraDetails.clickOnConfirmDelete();
        await MedicationsExtraDetails.enterDeleteReason('Deleted Existing item');
        await MedicationsExtraDetails.clickOnSaveDeleteReason();
        console.log('\x1bItem was deleted successfully\x1b[0m');
        }
        await page.waitForTimeout(2000)

      
       //////Fetch Patient Details/////////
      var sqlQuery =
      "select * from patient_audit where paa_use_username='" + jsonData.loginDetails[0].username + 
      "' and paa_type='selected' order by 1 desc limit 1";
      var sqlFilePath = "SQLResults/PatientDomain/PatientAudit.json";
      var results = await executeQuery(sqlQuery, sqlFilePath);
      console.log("\n Patient Details stored into the database: \n", results);
      const patId = results[0].paa_pat_id;
      console.log("Patient Accessed by User:" + patId);

      

        // Add New Medication
      await Medications.selectandAddClinicalItem(jsonData.AddMedication[index].pacr_que_name)
      await page.waitForTimeout(2000);      
      await page.getByLabel('cancelIcon').click();      
      await Medications.selectandAddClinicalItem(jsonData.AddMedication[index].pacr_que_name)
      await page.waitForTimeout(2000);            
      //await page.pause()      
      await MedicationsExtraDetails.EnterOnDose(page,jsonData.AddMedication[index].medi_dose,jsonData.AddMedication[index].pacr_que_name)
      await MedicationsExtraDetails.enterForm()
      await MedicationsExtraDetails.selectFrequency(jsonData.AddMedication[index].medi_frequency)
      await MedicationsExtraDetails.selectRoute(jsonData.AddMedication[index].medi_route)

      await MedicationsExtraDetails.enterDuration(jsonData.AddMedication[index].medi_duration)
      //await MedicationsExtraDetails.enterUnits(jsonData.AddMedication[index].medi_route)



      //await MedicationsExtraDetails.enterDays(jsonData.AddMedication[index].medi_duration)
      await MedicationsExtraDetails.selectSite(jsonData.AddMedication[index].meded_value)
      await MedicationsExtraDetails.selectPrescribeBy(jsonData.AddMedication[index].medi_prescribed_by)
      await MedicationsExtraDetails.enterStartDate(jsonData.AddMedication[index].medi_start_date)
      await MedicationsExtraDetails.enterReviewDate(jsonData.AddMedication[index].medi_stop_date)      
      await MedicationsExtraDetails.enterStopDate(jsonData.AddMedication[index].medi_stop_date)
      await MedicationsExtraDetails.selectSideEffects(jsonData.AddMedication[index].mse_text)  
      await MedicationsExtraDetails.selectIndication(jsonData.AddMedication[index].meded_value) 
      await MedicationsExtraDetails.selectStoppedReason(jsonData.AddMedication[index].medi_stopped_reason_eli_text)
      await MedicationsExtraDetails.selectPGDPSD(jsonData.AddMedication[index].meded_value_PGD)       
      await MedicationsExtraDetails.enterMedicationGradeForAdministrator(jsonData.AddMedication[index].meded_value_Administrator)
      await MedicationsExtraDetails.selectMaxReffills(jsonData.AddMedication[index].meded_value_MaxReffills)       
      //await MedicationsExtraDetails.selectQuantity(jsonData.AddMedication[index].meded_value_Quantity)
      
      await MedicationsExtraDetails.enterUnit(jsonData.AddMedication[index].meded_value_Unit)
      await MedicationsExtraDetails.selectCurrentLocation(jsonData.AddMedication[index].pcl_location_name)      
      await MedicationsExtraDetails.selectAdherent(jsonData.AddMedication[index].meded_value_Adherent)
      await MedicationsExtraDetails.clickOnPrescribeAndSupply()
      await MedicationsExtraDetails.clickOnSuitableForDelivery()
      await MedicationsExtraDetails.clickOnAddToPrescribe()
      await MedicationsExtraDetails.clickOnSupply()
      await MedicationsExtraDetails.clickOnSetAsDefault()
      await MedicationsExtraDetails.clickOnRepeatable()
      await MedicationsExtraDetails.clickOPrivateRecord()  
      await MedicationsExtraDetails.selectEndoserment(jsonData.AddMedication[index].paprd_endorsement) 
      await MedicationsExtraDetails.enterPriceCheckQuantity(jsonData.AddMedication[index].meded_value_Price_check_quantity)  
      await MedicationsExtraDetails.enterClinicalItemNotes(jsonData.AddMedication[index].medi_notes) 
            
      await page.waitForTimeout(1000);  
      await MedicationsExtraDetails.clickOnSaveExtraDetails();      
      await page.waitForTimeout(1000);           
      await MedicationsExtraDetails.clickOnSaveCheckList()      
      await page.waitForTimeout(1000); 

      ////// Database comparison- Patient Clinical Records - ADDING NEW Medications/////////
      sqlQuery =
      "select pacr_id, pacr_category, pacr_que_name, pacr_clinic_date, pacr_risk, medi_notes"+
      " from patient_clinical_records join patient_clinical_records_details on pacr_id=pacrd_pacr_id join Medications on pacr_id=medi_pacr_id where pacr_record_status='approved'"+
      " and pacr_pat_id=" + patId +
      " and pacr_record_status='approved' and pacr_que_name='" + jsonData.AddMedication[index].pacr_que_name +
      "' and pacr_category='Medication' order by 1 desc limit 1";

    console.log("Manoj add Medications:  "+ sqlQuery);           
    sqlFilePath = "SQLResults/ClinicalDomain/patientClinicalRecord.json";
    results = await executeQuery(sqlQuery, sqlFilePath);
    const pacrId = results[0].pacr_id;
    console.log("\n Patient Clinical Records stored into the database: \n", results);
    var match = await compareJsons(sqlFilePath, null, jsonData.AddMedication[index]);
    if (match) {
      console.log("\n Patient Clinical Records Comparision adding new Medications: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Patient Clinical Records Comparision adding new Medications: Parameters from both JSON files do not match!\n");
    } 
    }
  });
});
