import { test, expect, Page, chromium } from "@playwright/test";

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";

import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import PatientSearch from "../../../Pages/PatientDomain/PatientSearch";
import PatientDetails from "../../../Pages/PatientDomain/PatientDetails";
import Environment from "../../../Pages/BaseClasses/Environment";
import Menu from "../../../Pages/BaseClasses/Menu";
import PatientWizard from "../../../Pages/PatientDomain/PatientWizard";
import PatientDuplicateCheck from "../../../Pages/PatientDomain/PatientDuplicateCheck";
import Demographics from "../../../Pages/PatientDomain/Demographics";
import AddPatient from "../../../Pages/PatientDomain/AddPatient";
import AddAddress from "../../../Pages/PatientDomain/AddAddress";
import AddPIP from "../../../Pages/PatientDomain/AddPIP";
import ViewPIP from "../../../Pages/PatientDomain/ViewPIP";
import AddGP from "../../../Pages/PatientDomain/AddGP";
import PrintIDCard from "../../../Pages/PatientDomain/PrintIDCard";
import ConfirmExisting from "../../../Pages/PatientDomain/ConfirmExisting";
import TopBlueBar from "../../../Pages/BaseClasses/TopBlueBar";
import EditPatient from "../../../Pages/PatientDomain/EditPatient";
import AddReferral from "../../../Pages/PatientDomain/AddReferral";

const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")));
const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/ReferralDomain/PatientDetails.json")));
const pipdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")));
const gpdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")));

const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Add New Referral", () => {
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

  test("Add New Referral @Functional @ReferralDomain", async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new Homepage(page);
    const environment = new Environment(page);
    const patientsearch = new PatientSearch(page);
    const patientduplicatecheck = new PatientDuplicateCheck(page);
    const addpatient = new AddPatient(page);
    const addaddress = new AddAddress(page);
    const demogrphics = new Demographics(page);
    const addpip = new AddPIP(page);
    const viewpip = new ViewPIP(page);
    const addgp = new AddGP(page);
    const printidcard = new PrintIDCard(page);
    const confirmexisting = new ConfirmExisting(page);
    const menu = new Menu(page);
    const topbluebar = new TopBlueBar(page);
    const editpatient = new EditPatient(page);
    const addreferral = new AddReferral(page);

    let index = 0;

   await page.goto(environment.Test);
       await page.waitForTimeout(2000);
       await loginpage.enterUsername(jsonData.loginDetails[0].username);
       await page.waitForTimeout(2000);
       await loginpage.enter_Password(jsonData.loginDetails[0].password);
       await page.waitForTimeout(2000);
       await loginpage.clickOnLogin();
       await homepage.clickonSidebarHomeIcon();
       await homepage.clickOnPatientIcon();
       await patientsearch.clickOnSearchButton();
       await patientsearch.enterGivenName(jsonData.addPatient[index].pat_firstname.toString());
       await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname.toString());
       await patientsearch.selectSex(jsonData.addPatient[index].pat_sex);     
       //await patientsearch.selectBornDate(jsonData.addPatient[index].pat_dob);
       await patientsearch.clickOnSearchButton();
       await patientsearch.clickOnSearchPatientLink();  
       await patientsearch.ClickOnYesConfirmLegitimateRelationship()
       await page.waitForTimeout(1500);
       await page.pause()
       await confirmexisting.selectRelationship(jsonData.pip[index].pip_relationship);
       await page.waitForTimeout(1500);   
       await confirmexisting.clickOnConfirmExistingDetails();
       await page.waitForTimeout(1500);
       // await addreferral.enterReceiveReferrldate(jsonData.AddReferral[index].rtt_referral_received_date.toString());
       // await addreferral.enterApproveReferralDate(jsonData.AddReferral[index].rtt_referral_approved_date.toString());
       await addreferral.enterDateOfReferral(jsonData.AddReferral[index].ref_referral_date.toString());
       await addreferral.enterTimeOfReferral(jsonData.AddReferral[index].ref_time_set.toString());
       await addreferral.selectSourceOfReferrals();
      // await addreferral.selectReferralType(jsonData.AddReferral[index].ref_referral_type_eli_text.toString());
       await addreferral.selectReferralReason();
       //await addreferral.selectReferrerName()
       await addreferral.enterReferringProfessional();
       await addreferral.selectModeOfreferral(jsonData.AddReferral[index].ref_referral_mode.toString());
       await addreferral.selectService(jsonData.AddReferral[index].cli_name.toString());
      await addreferral.selectClinicType(jsonData.AddReferral[index].ref_clinic_type.toString());
       await page.pause()
       await addreferral.selectClinicLocation(jsonData.AddReferral[index].ref_clinic_location);
      await addreferral.selectTeam(jsonData.AddReferral[index].ref_region_eli_text.toString());
       await addreferral.selectPatientcare();
       await addreferral.selectPreferredSexForAssessment(jsonData.AddReferral[index].ref_preferred_examiner_sex_entry.toString());
       await addreferral.selectclinicPriority(jsonData.AddReferral[index].ref_cli_priority)
       await addreferral.selectConsultant();
      // await addreferral.selectMethodOfArrival(jsonData.AddReferral[index].ref_method_of_arrival.toString());
       await addreferral.enterTimeOfArrival(jsonData.AddReferral[index].ref_time_of_arrival.toString());
       //await addreferral.clickOnAwaitReferralAcceptance();
      // await addreferral.clickOnAwaitReferralAcceptance();
       await addreferral.clickOnSaveButton();
       await page.waitForTimeout(200);   
       await expect(page.getByText("Referral added successfully")).toHaveText("Referral added successfully");     
  });
});
