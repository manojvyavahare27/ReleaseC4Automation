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
const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json"))
);
const pipdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")));
const gpdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")));

const consoleLogs = [];
let jsonData;

test.describe("Appointment Domain Db COmparison", () => {
  test("Extract Patient Details", async ({}) => {
    const excelFilePath =process.env.EXCEL_FILE_PATH || "./ExcelFiles/AppointmentDomain.xlsx";
    const jsonFilePath ="./TestDataWithJSON/AppointmentDomain/AppointmentDetails.json";
    const conversionSuccess = await convertExcelToJson(excelFilePath,jsonFilePath);

    if (conversionSuccess) {
      jsonData = require("../../../TestDataWithJSON/AppointmentDomain/AppointmentDetails.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });

  test("Confirm Existing Details @Functional @ReferralDomain", async ({
    page,
  }) => {
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

    const index = 0;

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
    await patientsearch.clickOnSearchButton();
    await page.waitForTimeout(1500);
    await patientsearch.clickOnSearchPatientLink();
    //await patientsearch.ClickOnYesConfirmLegitimateRelationship()
    await page.waitForTimeout(1500);
    //await menu.clickOnMenubtn()

    await page.waitForTimeout(1500);
    await confirmexisting.selectRelationship(jsonData.pip[index].pip_relationship);
    await page.waitForTimeout(1500);
    //await confirmexisting.clickOnSaveChangeDetails();
    await confirmexisting.clickOnConfirmExistingDetails();
    await page.waitForTimeout(1500);
    await addreferral.enterReceiveReferrldate(jsonData.AddReferral[index].rtt_referral_received_date.toString());
    await addreferral.enterApproveReferralDate(jsonData.AddReferral[index].rtt_referral_approved_date.toString());
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
    await addreferral.selectClinicLocation(jsonData.AddReferral[index].ref_clinic_location);
    await addreferral.selectTeam(jsonData.AddReferral[index].ref_region_eli_text.toString());
    await addreferral.selectPatientcare();
    await addreferral.selectPreferredSexForAssessment(jsonData.AddReferral[index].ref_preferred_examiner_sex_entry.toString());
    await addreferral.selectConsultant();
    await addreferral.selectMethodOfArrival(jsonData.AddReferral[index].ref_method_of_arrival.toString());
    await addreferral.enterTimeOfArrival(jsonData.AddReferral[index].ref_time_of_arrival.toString());
    await addreferral.clickOnAwaitReferralAcceptance();
    await addreferral.clickOnSaveButton();
    await page.waitForTimeout(1000);
    
    // await page.pause()
    //Again select same patient.
    //await menu.clickOnMenubtn()
    //await menu.clickOnFindPatientlink()
    await homepage.clickOnHomePageIcon();
    await homepage.clickOnPatientIcon();
    //await patientsearch.clickOnSearchButton()
    await patientsearch.enterGivenName(
      jsonData.addPatient[index].pat_firstname.toString()
    );
    await patientsearch.enterFamilyName(
      jsonData.addPatient[index].pat_surname.toString()
    );
    await patientsearch.clickOnSearchButton();
    await patientsearch.clickOnSearchPatientLink();
    //await patientsearch.ClickOnYesConfirmLegitimateRelationship()
    await confirmexisting.entertxtboxAlsoKnow(jsonData.ConfirmExistingDetails[index].pat_name_other_lang.toString());
    //await confirmexisting.selectInterpreterReq()
    await confirmexisting.enterEmailId(jsonData.ConfirmExistingDetails[index].add_email.toString());
    await confirmexisting.enterMobile(jsonData.ConfirmExistingDetails[index].add_mobile.toString());
    await confirmexisting.enterPhoneNo(jsonData.ConfirmExistingDetails[index].add_phone.toString());

    await confirmexisting.selectTitleForNextofKin(jsonData.pip[index].pip_title);
    await confirmexisting.enterGivenNameOfNextOfKin(jsonData.pip[index].pip_firstname);
    await confirmexisting.enterFamilyNameforNextofKin(jsonData.pip[index].pip_surname);
    await confirmexisting.selectRelationship(jsonData.pip[index].pip_relationship);
    await confirmexisting.enterEmailIsForNextofKin(jsonData.pip[index].pip_relationship);
    //await confirmexisting.enterMobileforNextOfKin();
    //await confirmexisting.enterPhoneNoofNextOfKin();
    //await confirmexisting.enterCompanyName();
    await confirmexisting.enterRoadNumber(
      jsonData.tempAddress[index].add_address1.toString()
    );
    await confirmexisting.enterPostCode(
      jsonData.tempAddress[index].add_address5.toString()
    );
    
    //await confirmexisting.enterTempAddressDetails();
    //await page.pause()
    await confirmexisting.clickOnSaveChangeDetails();
    await expect(
      page.getByText("Patient details changed successfully")
    ).toHaveText("Patient details changed successfully");

    ////////// Patient Referral comparison/////////
    var sqlQuery =
      "select * from patients where pat_hospital_ref= '" +
      jsonData.addPatient[index].pat_hospital_ref +
      "' order by pat_id desc limit 1";

    var sqlFilePath = "SQLResults/PatientDomain/patientReferralDetails.json";
    var results = await executeQuery(sqlQuery, sqlFilePath);

    const patId = results[0].pat_id;
    console.log("Patient id is:" + patId);

    sqlQuery =
      "select * from referrals join referral_treatment_target_times on rtt_ref_id = ref_id where ref_pat_id ='" +
      patId +
      "' order by ref_id desc limit 1";
    console.log(sqlQuery);
    results = await executeQuery(sqlQuery, sqlFilePath);

    var match = await compareJsons(
      sqlFilePath,
      null,
      jsonData.AddReferral[index]
    );
    if (match) {
      console.log(
        "\n Referral Details Comparision: Parameters from both JSON files match!\n"
      );
    } else {
      console.log(
        "\n Referral Details Comparision: Parameters from both JSON files do not match!\n"
      );
    }
  });
});
