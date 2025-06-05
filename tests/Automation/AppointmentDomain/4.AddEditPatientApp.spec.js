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
  test("Extract Patient Details", async ({}) => {
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
    await expect(page.getByText("Login success")).toHaveText("Login success");
    await homepage.clickonSidebarHomeIcon();
    await homepage.clickOnAppointmentIcon();
    await patientsearch.clickonBackButton();
    await homepage.clickOnAppointmentIcon();
    await patientsearch.clickOnsettingbutton();
    await patientsearch.clickOncustomizableViewforPatientSearchOnAppointment();
    await patientsearch.clickOnResetToDefaultViewButton();
    //await patientsearch.ClickOnSaveButtonForUnknownPatient()

    //await expect(page.getByText('Customize view added successfully')).toHaveText('Customize view added successfully')

    await page.getByRole("img", { name: "Cellma Image Avatar" }).click();

    //await homepage.clickOnPatientIcon()
    await homepage.clickonSidebarHomeIcon();
    await homepage.clickOnAppointmentIcon();
    await patientsearch.clickOnSearchPatButton();
    await patientsearch.enterGivenName(
      jsonData.addPatient[index].pat_firstname
    );
    await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname);
    await patientsearch.selectSex(jsonData.addPatient[index].pat_sex);
    await patientsearch.enterHospitalRef(
      jsonData.addPatient[index].pat_hospital_ref
    );

    //await patientsearch.selectBornDate()
    await patientsearch.clickOnSearchPatButton();
    //await expect(page.getByText('Patient list found')).toHaveText('Patient list found')
    await patientsearch.clickOnSearchPatientLink();
    //await patientsearch.ClickOnYesConfirmLegitimateRelationship()
    await page.waitForTimeout(5000);
    await confirmexisting.clickOnConfirmExistingDetails();
   // await page.pause();
    await page.waitForTimeout(5000);
    const addReferralText = await page.getByRole('heading', { name: 'Add a Referral' }).isVisible();
    //const addReferralText = await page.locator("xpath=//div/h1[text()='Add a Referral']").isVisible();
    //console.log(addReferralText)
    //await page.pause()
    if (addReferralText) {
      // await menu.clickOnMenubtn()
      // await menu.clickOnAddReferrallink()
      //Add New Referral to Patient.
      await page.waitForTimeout(2500);
      await addreferral.enterReceiveReferrldate(
        jsonData.AddReferral[index].rtt_referral_received_date.toString()
      );
      await addreferral.enterApproveReferralDate(
        jsonData.AddReferral[index].rtt_referral_approved_date.toString()
      );
      await addreferral.enterDateOfReferral(
        jsonData.AddReferral[index].ref_referral_date.toString()
      );
      await addreferral.enterTimeOfReferral(
        jsonData.AddReferral[index].ref_time_set.toString()
      );
      await addreferral.selectSourceOfReferrals();
      await addreferral.selectReferralType(
        jsonData.AddReferral[index].ref_referral_type_eli_text.toString()
      );
      await addreferral.selectReferralReason();
      //await addreferral.selectReferrerName()
      await addreferral.enterReferringProfessional();
      await addreferral.selectModeOfreferral(
        jsonData.AddReferral[index].ref_referral_mode.toString()
      );
      await addreferral.selectService(
        jsonData.AddReferral[index].cli_name.toString()
      );
      await addreferral.selectClinicType(
        jsonData.AddReferral[index].ref_clinic_type.toString()
      );
      await addreferral.selectClinicLocation(
        jsonData.AddReferral[index].ref_clinic_location
      );
      await addreferral.selectTeam(
        jsonData.AddReferral[index].ref_region_eli_text.toString()
      );
      await addreferral.selectPatientcare();
      await addreferral.selectPreferredSexForAssessment(
        jsonData.AddReferral[index].ref_preferred_examiner_sex_entry
      );
      await addreferral.selectConsultant();
      //await page.pause()
      await addreferral.selectMethodOfArrival(
        jsonData.AddReferral[index].ref_method_of_arrival.toString()
      );
      await addreferral.enterTimeOfArrival(
        jsonData.AddReferral[index].ref_time_of_arrival.toString()
      );

      await addreferral.clickOnSaveButton();
      await expect(page.getByText("Referral added successfully")).toHaveText(
        "Referral added successfully"
      );
      //await addreferral.clickOnBackButton();
      //*********************************************************** */
      //links

      //  await servicebookapp.clickOnLinks()
      //  await servicebookapp.clickOnReferralLinkAddGP()
      //  await servicebookapp.clickOnClosepopup()

      //  await servicebookapp.clickOnLinks()
      //  await servicebookapp.clickOnReferralLinkPathway()
      //  await servicebookapp.clickOnClosepopup()

      //  await servicebookapp.clickOnLinks()
      //  await servicebookapp.clickOnReferralLinkPIP()
      //  await servicebookapp.clickOnClosepopup()

      //  await servicebookapp.clickOnLinks()
      //  await servicebookapp.clickOnReferralLinkVideo()
      //  await servicebookapp.clickOnClosepopup()

      // await servicebookapp.clickOnLinks()
      // await servicebookapp.clickOnReferralLinkWorkList()
      // await servicebookapp.clickOnClosepopup()
      //*********************************************************** */
      // await page.getByRole('button', { name: 'Add Appointments' }).click()
      await servicebookapp.SelectDate(
        jsonData.addEditAppointments[index].rea_date.toString()
      );
      await servicebookapp.selectDropdownSpecility(
        jsonData.addEditAppointments[index].rea_special
      );
      await servicebookapp.selectDropdownClinicType(
        jsonData.addEditAppointments[index].rea_clinic_type
      );
      await servicebookapp.selectDropdownClinicLocation(
        jsonData.addEditAppointments[index].rea_location
      );
      await servicebookapp.selectTeam(
        jsonData.addEditAppointments[index].rea_region_eli_text
      );
      await servicebookapp.ClickonSearchHPButton();
      //await page.pause()
      await servicebookapp.clickOnHPnameLink(
        jsonData.addEditAppointments[index].rea_hp_name_link
      );
      await servicebookapp.clickOnShowCalendarbtn();
      // TS
      //await page.pause()
      //Select Morning Slots
      await servicebookapp.clickOnMorningSlotstoAddApp(
        jsonData.addEditAppointments[index].convertedTime
      );
      // await expect(page.getByText('Appointment slot selected for 11: AM')).toHaveText('Appointment slot selected for 11:25 AM')

      //  await servicebookapp.clickOnNextButton()
      //  await servicebookapp.clickOnCancelButtonforDaySlot()
      //  await servicebookapp.selectWeekSlot()
      //  await servicebookapp.clickOnNextButton()
      //  await servicebookapp.clickOnCancelButtonforDaySlot()
      //  await servicebookapp.selectMonthSlot()
      //  await servicebookapp.selectAvailableSlots()
      //  await servicebookapp.clickOnNextButton()

      await servicebookapp.clickOnNextButton();
      //await page.pause()
      await servicebookapp.selectAppDetailsAppointmentType(
        jsonData.addEditAppointments[index].reaType
      );
      // await servicebookapp.selectAppDetailsZone()
      //await page.pause()
      await servicebookapp.selectAppDetailsAppReason(
        jsonData.addEditAppointments[index].rea_review_reason
      );
      await servicebookapp.selectSendAppTextEmail(); //?
      await servicebookapp.selectPatientType(
        jsonData.addEditAppointments[index].rea_patient_type
      );
      //await servicebookapp.selectFreeAppointment()
      await servicebookapp.selectReasonForAppdelay(
        jsonData.addEditAppointments[index].rea_reason_for_delay
      );
      await servicebookapp.enterTriage(
        jsonData.addEditAppointments[index].rea_triage.toString()
      );
      await servicebookapp.enterNotes(
        jsonData.addEditAppointments[index].rea_notes
      );
      //await servicebookapp.clickOnNextButton()
      await servicebookapp.clickOnSaveAndBookbTodaysDateButton();
      await servicebookapp.clickOnCommuConsentSaveButton();
      //await servicebookapp.clickOnSave()

      var sqlQuery =
        "select * from patients where pat_hospital_ref= '" +
        jsonData.addPatient[index].pat_hospital_ref +
        "' order by pat_id desc limit 1";
      console.log(sqlQuery);
      var sqlFilePath = "SQLResults/AppointmentDomain/patientData.json";
      var results = await executeQuery(sqlQuery, sqlFilePath);
      const patId = results[0].pat_id;
      console.log("Patient id is:" + patId);

      sqlQuery =
        "select * from referral_appointments where rea_pat_id = '" +
        patId +
        "' and rea_time = '" +
        jsonData.addEditAppointments[index].rea_time +
        "' and rea_record_status = 'approved'";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/AppointmentDomain/addEditPatientApp.json";
      results = await executeQuery(sqlQuery, sqlFilePath);
      var reaId = results[0].rea_id;
      console.log("Referral Appointment id is:" + reaId);

      var match = await compareJsons(
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
      //await page.pause();
      await scheduleserviceapp.clickOnDateLink();
      await page.waitForTimeout(7000);
      // await addeditpatientappointment.selectTypeOfAppointment()
      //await addeditpatientappointment.selectHealtProfessional()
      await addeditpatientappointment.selectConsultant();
      await addeditpatientappointment.selectAppointmentDuration(
        jsonData.addEditAppointments[index].rea_duration
      );
      await addeditpatientappointment.clickOnRescheduleDate(
        jsonData.addEditAppointments[index].rea_edited_date
      );
      await addeditpatientappointment.enterRescheduleTime(
        jsonData.addEditAppointments[index].rea_edited_time
      );
      await addeditpatientappointment.selectResonforReviewAppointment(
        jsonData.addEditAppointments[index].rea_review_reason
      );
      //await addeditpatientappointment.enterNotes()
      await addeditpatientappointment.clickOnSaveButton();

      await expect(
        page.getByText("Appointment updated successfully")
      ).toHaveText("Appointment updated successfully");

      //Communication Consent
      //  await servicebookapp.selectCommConsentNo()
      //  await servicebookapp.clikcOnRadioAllNo()
      //  await servicebookapp.clickOnRadioAllYes()
      //  await servicebookapp.clickOnCommuConsentSaveButton()
      //  await expect(page.getByText('Communication consent saved successfully')).toHaveText('Communication consent saved successfully')
      await scheduleserviceapp.clickOnAppScheduleStatus();
      await scheduleserviceapp.clickOnCancelButton();
      await scheduleserviceapp.selectAppCancellationReason(
        jsonData.addEditAppointments[index].rea_cancelled_reason
      );
      await scheduleserviceapp.clickOnSaveCancelledAppButton();
      await expect(
        page.getByText("Patient appointment cancelled successfully")
      ).toHaveText("Patient appointment cancelled successfully");
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
      await servicebookapp.SelectDate(
        jsonData.addEditAppointments[index].rea_date.toString()
      );
      await servicebookapp.selectDropdownSpecility(
        jsonData.addEditAppointments[index].rea_special
      );
      await servicebookapp.selectDropdownClinicType(
        jsonData.addEditAppointments[index].rea_clinic_type
      );
      //await page.pause();
      await servicebookapp.selectDropdownClinicLocation(
        jsonData.addEditAppointments[index].rea_location
      );
      await servicebookapp.selectTeam(
        jsonData.addEditAppointments[index].rea_region_eli_text
      );
      await servicebookapp.ClickonSearchHPButton();
      await servicebookapp.clickOnHPnameLink(
        jsonData.addEditAppointments[index].rea_hp_name_link
      );
      await servicebookapp.clickOnShowCalendarbtn();
      //await servicebookapp.clickOnHPnameLink(serviceappdetails.HPNameLink)

      await servicebookapp.clickOnMorningSlotstoAddApp(
        jsonData.addEditAppointments[index].convertedTime
      );
      //await servicebookapp.clickOnShowCalendarbtn()

      //await page.pause()
      //Select Morning Slots
      // await servicebookapp.clickOnMorningSlots(serviceappdetails.AddEditPatientSlot)
      // await expect(page.getByText('Appointment slot selected for 11: AM')).toHaveText('Appointment slot selected for 11:25 AM')

      //  await servicebookapp.clickOnNextButton()
      //  await servicebookapp.clickOnCancelButtonforDaySlot()
      //  await servicebookapp.selectWeekSlot()
      //  await servicebookapp.clickOnNextButton()
      //  await servicebookapp.clickOnCancelButtonforDaySlot()
      //  await servicebookapp.selectMonthSlot()
      //  await servicebookapp.selectAvailableSlots()
      //  await servicebookapp.clickOnNextButton()

      await servicebookapp.clickOnNextButton();
      //await page.pause()
      await servicebookapp.selectAppDetailsAppointmentType(
        jsonData.addEditAppointments[index].reaType
      );
      // await servicebookapp.selectAppDetailsZone()

      await servicebookapp.selectAppDetailsAppReason(
        jsonData.addEditAppointments[index].rea_review_reason
      );
      await servicebookapp.selectSendAppTextEmail();
      await servicebookapp.selectPatientType(
        jsonData.addEditAppointments[index].rea_patient_type
      );
      //await servicebookapp.selectFreeAppointment()
      await servicebookapp.selectReasonForAppdelay(
        jsonData.addEditAppointments[index].rea_reason_for_delay
      );
      await servicebookapp.enterTriage(
        jsonData.addEditAppointments[index].rea_triage.toString()
      );
      await servicebookapp.enterNotes(
        jsonData.addEditAppointments[index].rea_notes
      );
      await servicebookapp.clickOnSaveAndBookbTodaysDateButton();

      //  await page.pause()
      //Communication Consent
      //await servicebookapp.selectCommConsentNo()
      await servicebookapp.clikcOnRadioAllNo();
      await servicebookapp.clickOnRadioAllYes();
      await page.waitForTimeout(2000);
      await servicebookapp.clickOnCommuConsentSaveButton();
      await expect(
        page.getByText("Communication consent saved successfully")
      ).toHaveText("Communication consent saved successfully");

      var sqlQuery =
        "select * from patients where pat_hospital_ref= '" +
        jsonData.addPatient[index].pat_hospital_ref +
        "' order by pat_id desc limit 1";
      console.log(sqlQuery);
      var sqlFilePath = "SQLResults/AppointmentDomain/patientData.json";
      var results = await executeQuery(sqlQuery, sqlFilePath);
      const patId = results[0].pat_id;
      console.log("Patient id is:" + patId);

      sqlQuery =
        "select * from referral_appointments where rea_pat_id = '" +
        patId +
        "' and rea_time = '" +
        jsonData.addEditAppointments[index].rea_time +
        "' and rea_record_status = 'approved'";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/AppointmentDomain/addEditPatientApp.json";
      results = await executeQuery(sqlQuery, sqlFilePath);
      const reaId = results[0].rea_id;
      console.log("Referral Appointment id is:" + reaId);

      var match = await compareJsons(
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
     // await page.pause();
      //Edit Patient App.
      await scheduleserviceapp.clickOnDateLink();
      //await addeditpatientappointment.selectTypeOfAppointment()
      //await addeditpatientappointment.selectHealtProfessional()
      //await addeditpatientappointment.selectConsultant()
      await page.waitForTimeout(8000);
      await addeditpatientappointment.selectAppointmentDuration(
        jsonData.addEditAppointments[index].rea_duration
      );
      // await addeditpatientappointment.clickOnRescheduleDate(
      //   jsonData.addEditAppointments[index].rea_edited_date
      // );
      // await addeditpatientappointment.enterRescheduleTime(
      //   jsonData.addEditAppointments[index].rea_edited_time
      // );
      await addeditpatientappointment.selectResonforReviewAppointment(
        jsonData.addEditAppointments[index].rea_review_reason
      );
      //await addeditpatientappointment.enterNotes()
      await addeditpatientappointment.clickOnSaveButton();

      await expect(
        page.getByText("Appointment updated successfully")
      ).toHaveText("Appointment updated successfully");

      //Cancel Appointment
      await scheduleserviceapp.clickOnAppScheduleStatus();
      await scheduleserviceapp.clickOnCancelButton();
      await scheduleserviceapp.selectAppCancellationReason(
        jsonData.addEditAppointments[index].rea_cancelled_reason
      );
      await scheduleserviceapp.clickOnSaveCancelledAppButton();
      await expect(
        page.getByText("Patient appointment cancelled successfully")
      ).toHaveText("Patient appointment cancelled successfully");

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

      //      //SchedulePatientAppointment Page. Links
      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnAddAppointmentLink()
      //      await scheduleserviceapp.closePopUpWindow()

      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnAddProvisionalApp()
      //      await scheduleserviceapp.closePopUpWindow()

      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnAddAssessment()
      //      await scheduleserviceapp.closePopUpWindow()

      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnAddAttended()
      //      await attendedpatientappointments.clickOnBackButton()

      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnCancel()
      //      await cancelledaatientappointments.clickOnBackButton()

      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnConsent()
      //      await scheduleserviceapp.closePopUpWindow()

      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnDidNotAttenede()
      //      await  didnotattendedpatientappointments.clickOnBackButton()
      // //
      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnHistory()
      //      await scheduleserviceapp.closePopUpWindow()
      // //
      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnLetter()
      //      await scheduleserviceapp.closePopUpWindow()
      // //
      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnPatientRTT()
      //      await scheduleserviceapp.closePopUpWindow()

      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnPIPLabel()
      //      await scheduleserviceapp.closePopUpWindow()

      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickOnReferral()
      //      await scheduleserviceapp.closePopUpWindow()

      //      await scheduleserviceapp.clickOnLinksMenu()
      //      await scheduleserviceapp.clickonRefresh()
      //      await scheduleserviceapp.closePopUpWindow()

      // await scheduleserviceapp.clickOnLinksMenu()
      // await scheduleserviceapp.clickonServiceApp()
      // await scheduleserviceapp.closePopUpWindow()

      // await scheduleserviceapp.clickOnLinksMenu()
      // await scheduleserviceapp.clickOnWaitNotSeen()
      // await waitednotseenpatientappointments.clickOnBackButton()

      //Click On Date Link
      // await scheduleserviceapp.clickOnDateLink()
      // await addeditpatientappointment.clickOnBackButton()
      // await scheduleserviceapp.clickOnDateLink()
      // await addeditpatientappointment.selectTypeOfAppointment()
      // await addeditpatientappointment.selectHealtProfessional()
      // await addeditpatientappointment.selectConsultant()
      // await addeditpatientappointment.selectAppointmentDuration()
      // await addeditpatientappointment.ClickOnLinkCheckAppdate()
      // await addeditpatientappointment.clickOnCancelPopupIcon()
      // await addeditpatientappointment.clickOnRescheduleDate()
      // await addeditpatientappointment.enterRescheduleTime()
      // await addeditpatientappointment.clickOnSaveButton()

      //Cancel Appointment
      // await scheduleserviceapp.clickOnAppScheduleStatus()
      // await scheduleserviceapp.clickOnCancelButton()
      // await scheduleserviceapp.selectAppCancellationReason()
      // await scheduleserviceapp.clickOnSaveCancelledAppButton()
      // await expect(page.getByText('Patient appointment cancelled successfully')).toHaveText('Patient appointment cancelled successfully')
    }

    //Edit Patient App.
    //     await page.pause()
    //     await scheduleserviceapp.Datelink()
    //     await addeditpatientappointment.selectTypeOfAppointment()
    //     await addeditpatientappointment.dropdownwithHealthPrefessional()
    //     await addeditpatientappointment.selectConsultant()
    //     await addeditpatientappointment.selectAppointmentDuration()
    //     await addeditpatientappointment.SelectDate()
    //     await addeditpatientappointment.enterRescheduleTime()
    //     await addeditpatientappointment.selectResonforReviewAppointment()
    //     await addeditpatientappointment.enterNotes()
    //     await addeditpatientappointment.clickOnSaveButton()

    //     await expect(page.getByText('Appointment updated successfully')).toHaveText('Appointment updated successfully')

    //     //Change Status to waiting
    //     await scheduleserviceapp.clickOnAppScheduleStatus()
    //     await scheduleserviceapp.clickOnWaitingButton()
    //     //await scheduleserviceapp.selectAppCancellationReason()
    //     await scheduleserviceapp.clickOnSaveCancelledAppButton()
    //     await expect(page.getByText('Appointment status saved successfully')).toHaveText('Appointment status saved successfully')

    //     await page.pause()

    //     //Change Status to waiting
    //     await scheduleserviceapp.clickOnAppScheduleStatus()
    //     await scheduleserviceapp.clickOnWaitingNotSeenButton()
    //     //await scheduleserviceapp.selectAppCancellationReason()
    //     await scheduleserviceapp.clickOnSaveCancelledAppButton()
    //     await expect(page.getByText('Appointment status saved successfully')).toHaveText('Appointment status saved successfully')
    // await menu.clickOnMenubtn()
    // await menu.clickOnLogout()
  });
});
