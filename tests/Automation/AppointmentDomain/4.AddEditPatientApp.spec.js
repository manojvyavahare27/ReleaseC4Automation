import { test, expect, Page, chromium } from "@playwright/test";

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";

import ServiceBookApp from "../../../Pages/AppointmentDomain/ServiceBookApp";
import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import Environment from "../../../Pages/BaseClasses/Environment";
import PatientSearch from "../../../Pages/PatientDomain/PatientSearch";
import ConfirmExisting from "../../../Pages/PatientDomain/ConfirmExisting";
import PatientSelectAlert from "../../../Pages/BaseClasses/PatientSelectAlert";
import AddReferral from "../../../Pages/PatientDomain/AddReferral";
import Menu from "../../../Pages/BaseClasses/Menu";
import SchedulePatientApp from "../../../Pages/AppointmentDomain/SchedulePatientAppointment";
import CancelledPatientAppointments from "../../../Pages/AppointmentDomain/CancelledPatientAppointments";
import AttendedPatientAppointments from "../../../Pages/AppointmentDomain/AttendedPatientAppointments";
import DidNotAttendedPatientAppointments from "../../../Pages/AppointmentDomain/DidNotAttendedPatientAppointments";
import WaitedNotSeenPatientAppointments from "../../../Pages/AppointmentDomain/WaitedNotSeenPatientAppointments";
import AddEditPatientAppointment from "../../../Pages/AppointmentDomain/AddEditPatientAppointment";

//import Pool from 'mysql/lib/Pool';

const logindata = JSON.parse(
  JSON.stringify(require("../../../TestData/PatientDomain/Login.json"))
);
const patientdetailsdata = JSON.parse(
  JSON.stringify(
    require("../../../TestData/AppointmentDomain/PatientDetails.json")
  )
);
const serviceappdetails = JSON.parse(
  JSON.stringify(require("../../../TestData/AppointmentDomain/ServiceApp.json"))
);
//const attendedpatientappointments=JSON.stringify(require("../../../Pages/AppointmentDomain/AttendedPatientAppointments"))
//const app_patient_details_data=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))

const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Add Edit Patient", () => {
  test("Extract Patient Details", async ({ }) => {
    const excelFilePath =
      process.env.EXCEL_FILE_PATH || "./ExcelFiles/AppointmentDomain.xlsx";
    const jsonFilePath =
      "./TestDataWithJSON/AppointmentDomain/AppointmentDetails.json";
    const conversionSuccess = await convertExcelToJson(
      excelFilePath,
      jsonFilePath
    );

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

  test("Service Appointment @Appt", async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new Homepage(page);
    const environment = new Environment(page);
    const patientsearch = new PatientSearch(page);
    const confirmexisting = new ConfirmExisting(page);
    const servicebookapp = new ServiceBookApp(page);
    const patientselectalert = new PatientSelectAlert(page);
    const addreferral = new AddReferral(page);
    const menu = new Menu(page);
    const scheduleserviceapp = new SchedulePatientApp(page);
    const attendedpatientappointments = new AttendedPatientAppointments(page);
    const cancelledaatientappointments = new CancelledPatientAppointments(page);
    const didnotattendedpatientappointments =
      new DidNotAttendedPatientAppointments(page);
    const waitednotseenpatientappointments =
      new WaitedNotSeenPatientAppointments(page);
    const addeditpatientappointment = new AddEditPatientAppointment(page);

    const index = 0;

    await page.goto(environment.Test);
    await page.waitForTimeout(1500);
    await loginpage.enterUsername(jsonData.loginDetails[0].username);
    await page.waitForTimeout(1500);
    await loginpage.enter_Password(jsonData.loginDetails[0].password);
    await page.waitForTimeout(1500);
    await loginpage.clickOnLogin();

   // await expect(page.getByText("Login success")).toHaveText("Login success");
    await homepage.clickonSidebarHomeIcon();
    await homepage.clickOnAppointmentIcon();
    await patientsearch.clickonBackButton();
    await homepage.clickOnAppointmentIcon();
    await patientsearch.clickOnsettingbutton();
    await patientsearch.clickOncustomizableViewforPatientSearchOnAppointment();
    await patientsearch.clickOnResetToDefaultViewButton();
    await page.getByRole("img", { name: "Cellma Image Avatar" }).click();
    await homepage.clickonSidebarHomeIcon();
    await homepage.clickOnAppointmentIcon();
    await patientsearch.clickOnSearchPatButton();
   
    await patientsearch.enterGivenName(jsonData.addPatient[index].pat_firstname);
    await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname);
    await patientsearch.selectSex(jsonData.addPatient[index].pat_sex);
    await patientsearch.enterHospitalRef(jsonData.addPatient[index].pat_hospital_ref);

    await patientsearch.clickOnSearchPatButton();
    await patientsearch.clickOnSearchPatientLink();
    await patientsearch.ClickOnYesConfirmLegitimateRelationship()
    await page.waitForTimeout(4000);
    await confirmexisting.clickOnConfirmExistingDetails();
    await page.waitForTimeout(3000);
    //await page.pause()
    const addReferralText = await page.getByRole('heading', { name: 'Add a Referral' }).isVisible();

    if (addReferralText) {
      // Add New Referral to Patient.
      await page.waitForTimeout(2500);
      await addreferral.enterReceiveReferrldate(jsonData.AddReferral[index].rtt_referral_received_date.toString());
      await addreferral.enterApproveReferralDate(jsonData.AddReferral[index].rtt_referral_approved_date.toString());
      await addreferral.enterDateOfReferral(jsonData.AddReferral[index].ref_referral_date.toString());
      await addreferral.enterTimeOfReferral(jsonData.AddReferral[index].ref_time_set.toString());
      await addreferral.selectSourceOfReferrals();
      await addreferral.selectReferralType(jsonData.AddReferral[index].ref_referral_type_eli_text.toString());
      await addreferral.selectReferralReason();
      // await addreferral.selectReferrerName()
      await addreferral.enterReferringProfessional();
      await addreferral.selectModeOfreferral(jsonData.AddReferral[index].ref_referral_mode.toString());
      await addreferral.selectService(jsonData.AddReferral[index].cli_name.toString());
      await addreferral.selectClinicType(jsonData.AddReferral[index].ref_clinic_type.toString());
      await addreferral.selectClinicLocation(jsonData.AddReferral[index].ref_clinic_location);
      await addreferral.selectTeam(jsonData.AddReferral[index].ref_region_eli_text.toString());
      await addreferral.selectPatientcare();
      await addreferral.selectPreferredSexForAssessment(jsonData.AddReferral[index].ref_preferred_examiner_sex_entry);
      await addreferral.selectConsultant();
    
      await addreferral.selectMethodOfArrival(jsonData.AddReferral[index].ref_method_of_arrival.toString());
      await addreferral.enterTimeOfArrival(jsonData.AddReferral[index].ref_time_of_arrival.toString());

      await addreferral.clickOnSaveButton();
      await expect(page.getByText("Referral added successfully")).toHaveText("Referral added successfully");

      await servicebookapp.SelectDate(jsonData.addEditAppointments[index].rea_date.toString());
      await servicebookapp.selectDropdownSpecility(jsonData.addEditAppointments[index].rea_special);
      await servicebookapp.selectDropdownClinicType(jsonData.addEditAppointments[index].rea_clinic_type);
      await servicebookapp.selectDropdownClinicLocation(jsonData.addEditAppointments[index].rea_location);
      await servicebookapp.selectTeam(jsonData.addEditAppointments[index].rea_region_eli_text);
      await servicebookapp.ClickonSearchHPButton();
      await servicebookapp.clickOnHPnameLink(jsonData.addEditAppointments[index].rea_hp_name_link);
      await servicebookapp.clickOnShowCalendarbtn();

      // Select Morning Slots
      await servicebookapp.clickOnMorningSlotstoAddApp(jsonData.addEditAppointments[index].convertedTime);
      await servicebookapp.clickOnNextButton();
      await servicebookapp.selectAppDetailsAppointmentType(jsonData.addEditAppointments[index].reaType);
      // await servicebookapp.selectAppDetailsZone()
      
      await servicebookapp.selectAppDetailsAppReason(jsonData.addEditAppointments[index].rea_review_reason);
      await servicebookapp.selectSendAppTextEmail(); // ?
      await servicebookapp.selectPatientType(jsonData.addEditAppointments[index].rea_patient_type);
      // await servicebookapp.selectFreeAppointment()
      await servicebookapp.selectReasonForAppdelay(jsonData.addEditAppointments[index].rea_reason_for_delay);
      await servicebookapp.enterTriage(jsonData.addEditAppointments[index].rea_triage.toString());
      await servicebookapp.enterNotes(jsonData.addEditAppointments[index].rea_notes);
      // await servicebookapp.clickOnNextButton()
      
      await servicebookapp.clickOnSaveAndBookbTodaysDateButton();
      await servicebookapp.clickOnCommuConsentSaveButton();

      var sqlQuery = "select * from patients where pat_hospital_ref= '" + jsonData.addPatient[index].pat_hospital_ref + "' order by pat_id desc limit 1";
      console.log(sqlQuery);
      var sqlFilePath = "SQLResults/AppointmentDomain/patientData.json";
      var results = await executeQuery(sqlQuery, sqlFilePath);
      const patId = results[0].pat_id;
      console.log("Patient id is:" + patId);

      sqlQuery = "select * from referral_appointments where rea_pat_id = '" + patId + "' and rea_time = '" + jsonData.addEditAppointments[index].rea_time + "' and rea_record_status = 'approved'";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/AppointmentDomain/addEditPatientApp.json";
      results = await executeQuery(sqlQuery, sqlFilePath);
      var reaId = results[0].rea_id;
      console.log("Referral Appointment id is:" + reaId);

      var match = await compareJsons(sqlFilePath, null, jsonData.addEditAppointments[index]);
      if (match) {
        console.log("\n Add Edit Appointment Details Comparision: Parameters from both JSON files match!\n");
      } else {
        console.log("\n Add Edit Appointment Details Comparision: Parameters from both JSON files do not match!\n");
      }
    
      await scheduleserviceapp.clickOnDateLink();
      await page.waitForTimeout(7000);
      await addeditpatientappointment.selectConsultant();
      await addeditpatientappointment.selectAppointmentDuration(jsonData.addEditAppointments[index].rea_duration);
      await addeditpatientappointment.clickOnRescheduleDate(jsonData.addEditAppointments[index].rea_edited_date);
      await addeditpatientappointment.enterRescheduleTime(jsonData.addEditAppointments[index].rea_edited_time);
      await addeditpatientappointment.selectResonforReviewAppointment(jsonData.addEditAppointments[index].rea_review_reason);
      //await page.pause()
      await addeditpatientappointment.clickOnSaveButton();

      await expect(page.getByText("Appointment updated successfully")).toHaveText("Appointment updated successfully");
     
      //await page.pause()
      //Communication Consent      
      //  await expect(page.getByText('Communication consent saved successfully')).toHaveText('Communication consent saved successfully')
      await scheduleserviceapp.clickOnAppScheduleStatus();
      await scheduleserviceapp.clickOnCancelButton();
      await scheduleserviceapp.selectAppCancellationReason(jsonData.addEditAppointments[index].rea_cancelled_reason);
      await scheduleserviceapp.clickOnSaveCancelledAppButton();
      await expect(page.getByText("Patient appointment cancelled successfully")).toHaveText("Patient appointment cancelled successfully");
      // await menu.clickOnMenubtn()
      //await menu.clickOnLogout()

      sqlQuery = "select * from referral_appointments where rea_id = " + reaId;
      console.log(sqlQuery);
      results = await executeQuery(sqlQuery, sqlFilePath);

      match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.addEditAppointments[index]
      );
      if (match) {
        console.log(
          "\n Add Edit Appointment Details Comparision: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n Add Edit Appointment Details Comparision: Parameters from both JSON files do not match!\n"
        );
      }
    } else {
      //await page.pause()
      await servicebookapp.SelectDate(jsonData.addEditAppointments[index].rea_date.toString());
      await page.waitForTimeout(1000)
      await servicebookapp.selectDropdownSpecility(jsonData.addEditAppointments[index].rea_special);
      await servicebookapp.selectDropdownClinicType(jsonData.addEditAppointments[index].rea_clinic_type);
      //await page.pause();
      await servicebookapp.selectDropdownClinicLocation(jsonData.addEditAppointments[index].rea_location);
      await servicebookapp.selectTeam(jsonData.addEditAppointments[index].rea_region_eli_text);
      await servicebookapp.ClickonSearchHPButton();
      await servicebookapp.clickOnHPnameLink(jsonData.addEditAppointments[index].rea_hp_name_link);
      await servicebookapp.clickOnShowCalendarbtn();
      //await servicebookapp.clickOnHPnameLink(serviceappdetails.HPNameLink)

      await servicebookapp.clickOnMorningSlotstoAddApp(jsonData.addEditAppointments[index].convertedTime);
      await servicebookapp.clickOnNextButton();
       await servicebookapp.selectAppDetailsAppointmentType(jsonData.addEditAppointments[index].reaType);
      // await servicebookapp.selectAppDetailsZone()

      await servicebookapp.selectAppDetailsAppReason(jsonData.addEditAppointments[index].rea_review_reason);
      await servicebookapp.selectSendAppTextEmail();
      await servicebookapp.selectPatientType(jsonData.addEditAppointments[index].rea_patient_type);
      //await servicebookapp.selectFreeAppointment()
      await servicebookapp.selectReasonForAppdelay(jsonData.addEditAppointments[index].rea_reason_for_delay);
      await servicebookapp.enterTriage(jsonData.addEditAppointments[index].rea_triage.toString());
      await servicebookapp.enterNotes(jsonData.addEditAppointments[index].rea_notes);
      await servicebookapp.clickOnSaveAndBookbTodaysDateButton();


      //Communication Consent     
      await servicebookapp.clikcOnRadioAllNo();
      await servicebookapp.clickOnRadioAllYes();
      await page.waitForTimeout(2000);
      await servicebookapp.clickOnCommuConsentSaveButton();
      await expect(page.getByText("Communication consent saved successfully")).toHaveText("Communication consent saved successfully");

      var sqlQuery = "select * from patients where pat_hospital_ref= '" + jsonData.addPatient[index].pat_hospital_ref + "' order by pat_id desc limit 1";
      console.log(sqlQuery);
      var sqlFilePath = "SQLResults/AppointmentDomain/patientData.json";
      var results = await executeQuery(sqlQuery, sqlFilePath);
      const patId = results[0].pat_id;
      console.log("Patient id is:" + patId);

      sqlQuery = "select * from referral_appointments where rea_pat_id = '" + patId + "' and rea_time = '" + jsonData.addEditAppointments[index].rea_time + "' and rea_record_status = 'approved'";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/AppointmentDomain/addEditPatientApp.json";
      results = await executeQuery(sqlQuery, sqlFilePath);
      const reaId = results[0].rea_id;
      console.log("Referral Appointment id is:" + reaId);

      var match = await compareJsons(sqlFilePath, null, jsonData.addEditAppointments[index]);
      if (match) {
        console.log("\n Add Edit Appointment Details Comparision: Parameters from both JSON files match!\n");
      } else {
        console.log("\n Add Edit Appointment Details Comparision: Parameters from both JSON files do not match!\n");
      }

    //await page.pause()
      // Edit Patient App.
      await scheduleserviceapp.clickOnDateLink();
      await page.waitForTimeout(2000);
      await addeditpatientappointment.selectAppointmentDuration(jsonData.addEditAppointments[index].rea_duration);
      await addeditpatientappointment.selectResonforReviewAppointment(jsonData.addEditAppointments[index].rea_review_reason);
      await addeditpatientappointment.clickOnSaveButton();
      //await expect(page.getByText("Appointment updated successfully")).toHaveText("Appointment updated successfully");
      //Cancel Appointment
      await page.waitForTimeout(5000);
      //await page.getByTestId('Ok').click()
      await scheduleserviceapp.clickOnAppScheduleStatus();
      await scheduleserviceapp.clickOnCancelButton();
      await scheduleserviceapp.selectAppCancellationReason(
        jsonData.addEditAppointments[index].rea_cancelled_reason
      );
      await scheduleserviceapp.clickOnSaveCancelledAppButton();
      await expect(page.getByText("Patient appointment cancelled successfully")).toHaveText("Patient appointment cancelled successfully");

      await page.waitForTimeout(1000)
      await menu.clickOnLogout(page);
      sqlQuery = "select * from referral_appointments where rea_id = " + reaId;
      console.log(sqlQuery);
      results = await executeQuery(sqlQuery, sqlFilePath);

      match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.addEditAppointments[index]
      );
      if (match) {
        console.log(
          "\n Add Edit Appointment Details Comparision: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n Add Edit Appointment Details Comparision: Parameters from both JSON files do not match!\n"
        );
      }
    }
  });
});
