const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql");

import { test, expect } from "@playwright/test";
const connectToDatabase = require("../../../manoj").default;
const { executeQuery } = require("../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../compareFileOrJson";

import logger from '../../../Pages/BaseClasses/logger'
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
const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")));
const pipdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")));
const gpdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")));
const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json")));

test.describe("Login Tests", () => {
  jsonData.addPatient.forEach(async (data, index) => {
    test("Confirm Existing Details ${data.pat_firstname}", async ({ page }) => {
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

      await page.goto(environment.Test);
      await loginpage.enterUsername(jsonData.loginDetails[0].username);
      logger.info("Username enter successfully");
      await loginpage.enter_Password(jsonData.loginDetails[0].password);
      logger.info("Password enter successfully");
      await loginpage.clickOnLogin();
      logger.info("Clicked on Login button successfully");
      await homepage.clickonSidebarHomeIcon()
      // await loginpage.enter_Password(logindata.password);
      // await loginpage.clickOnLogin();
    
      await homepage.clickOnPatientIcon();
      await patientsearch.clickOnSearchButton();
      await patientsearch.enterGivenName(jsonData.addPatient[index].pat_firstname.toString());
      await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname.toString());
      await patientsearch.clickOnSearchButton();
      await patientsearch.clickOnSearchPatientLink();
      //await patientsearch.ClickOnYesConfirmLegitimateRelationship()  
      await page.waitForTimeout(2000)    
      await confirmexisting.clickOnConfirmExistingDetails()
      await addreferral.clickOnSaveButton();
      await expect(page.getByText("Received Referral Date required")).toHaveText("Received Referral Date required");
      await expect(page.getByText("Approved Referral Date required")).toHaveText("Approved Referral Date required");
      await expect(page.getByText("Date of Referral required")).toHaveText("Date of Referral required");
      await expect(page.getByText("Source of Referral required")).toHaveText("Source of Referral required");
      await expect(page.getByText("Service required")).toHaveText("Service required");
      await expect(page.getByText("Team required")).toHaveText("Team required");
      await expect(page.getByText("Method of Arrival required")).toHaveText("Method of Arrival required");

      //await page.pause();
      await addreferral.enterReceiveReferrldate(jsonData.AddReferral[index].rtt_referral_received_date.toString());
      await addreferral.enterApproveReferralDate(jsonData.AddReferral[index].rtt_referral_approved_date.toString());
      await addreferral.enterDateOfReferral(jsonData.AddReferral[index].ref_referral_date.toString());
      await addreferral.enterTimeOfReferral(jsonData.AddReferral[index].ref_time_set.toString());

      await addreferral.selectSourceOfReferrals();
      await addreferral.selectReferralType(jsonData.AddReferral[index].ref_referral_type_eli_text.toString());
      await addreferral.selectReferralReason();
      //await addreferral.selectReferrerName()
      await addreferral.enterReferringProfessional();
      await addreferral.selectModeOfreferral(jsonData.AddReferral[index].ref_referral_mode.toString());
      await addreferral.selectService(jsonData.AddReferral[index].cli_name.toString());
      await addreferral.selectClinicType(jsonData.AddReferral[index].ref_clinic_type.toString());
      await addreferral.selectClinicLocation();
      await addreferral.selectTeam(jsonData.AddReferral[index].ref_region_eli_text.toString());
      await addreferral.selectPatientcare();
      //await page.pause();
      await addreferral.selectPreferredSexForAssessment(jsonData.AddReferral[index].ref_preferred_examiner_sex.toString());
      await addreferral.selectConsultant();
      await addreferral.selectMethodOfArrival(jsonData.AddReferral[index].ref_method_of_arrival.toString());
      await addreferral.enterTimeOfArrival(jsonData.AddReferral[index].ref_time_of_arrival.toString());
      await addreferral.clickOnAwaitReferralAcceptance();

      await addreferral.clickOnSaveButton();
      await page.waitForTimeout(1000);
      await expect(page.getByText("Awaiting referral added successfully")).toHaveText("Awaiting referral added successfully");
      //await page.pause()
      //Again select same patient.
      await homepage.clickOnHomeDashboardIcon()
      //await menu.clickOnFindPatientlink();
      await homepage.clickOnPatientIcon();
      //Confirm Existing Details
      //await page.pause();
      await patientsearch.enterGivenName(jsonData.addPatient[index].pat_firstname.toString());
      await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname.toString());
      await patientsearch.clickOnSearchButton();
      await patientsearch.clickOnSearchPatientLink();
      //await patientsearch.ClickOnYesConfirmLegitimateRelationship()
      await confirmexisting.entertxtboxAlsoKnow(jsonData.ConfirmExistingDetails[index].pat_name_other_lang.toString());
      //await confirmexisting.selectInterpreterReq()
      await confirmexisting.enterEmailId(jsonData.ConfirmExistingDetails[index].add_email.toString());
      await confirmexisting.enterMobile(jsonData.ConfirmExistingDetails[index].add_mobile.toString());
      await confirmexisting.enterPhoneNo(jsonData.ConfirmExistingDetails[index].add_phone.toString());

      //Next Of Kin
      await confirmexisting.selectTitleForNextofKin(jsonData.pip[index].pip_title);
      await confirmexisting.enterGivenNameOfNextOfKin(jsonData.pip[index].pip_firstname);
      await confirmexisting.enterFamilyNameforNextofKin(jsonData.pip[index].pip_surname);
      await confirmexisting.selectRelationship(jsonData.pip[index].pip_relationship);
      await confirmexisting.enterEmailIsForNextofKin(jsonData.pip[index].pip_relationship);
      // await confirmexisting.enterMobileforNextOfKin();
      // await confirmexisting.enterPhoneNoofNextOfKin();

      //Patient Temp Address
      //await confirmexisting.enterCompanyName(jsonData.tempAddress[index].add_company_name.toString());
      await confirmexisting.enterRoadNumber(jsonData.tempAddress[index].add_address1.toString());
      await confirmexisting.enterPostCode(jsonData.tempAddress[index].add_address5.toString());
      // await confirmexisting.enterTempContactDetails(jsonData.ConfirmExistingDetailsTAdd[index].add_company_name.toString());
      // await confirmexisting.enterTempAddressDetails(jsonData.ConfirmExistingDetailsTAdd[index].add_company_name.toString());
      await confirmexisting.clickOnSaveChangeDetails();
      await page.waitForTimeout(1000)
      await expect(page.getByText("Patient details changed successfully")).toHaveText("Patient details changed successfully");
      //await page.pause()
    });

  
    // //////// Patient Referral comparison///////// 
    const query ="select add_email, add_mobile, add_phone,pat_name_other_lang, pat_need_interpreter_at_appointments from patients join addresses on pat_add_id = add_id where pat_hospital_ref= '"+ data.pat_hospital_ref+"';"  
    //// const query ="select add_email, add_mobile, add_phone,pat_name_other_lang, pat_need_interpreter_at_appointments from patients join addresses on pat_add_id = add_id where pat_hospital_ref= '" + data.pat_hospital_ref +"'";
    const patSqlFile =
      "C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientReferralDetails.json";
    const results = await executeQuery(query, patSqlFile);
    console.log("\n Patient Details stored into the database: \n", results);
    const patId = results[0].pat_id;
    const jsonFilePath1 =
      "C:\\Riomed\\Cellma4Automation\\SQLResults\\PatientDomain\\patientReferralDetails.json";
    var match1 = await compareJsons(jsonFilePath1, null, data);
    if (match1) {
      console.log("\n Patient Referral Comparision: Parameters from both JSON files match!\n");
    } else {
      console.log("\n Patient Referral Comparision: Parameters from both JSON files do not match!\n");
    }


  });
});
