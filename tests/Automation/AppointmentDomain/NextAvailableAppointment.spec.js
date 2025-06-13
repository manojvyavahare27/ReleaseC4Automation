import { test,expect,Page,chromium } from "@playwright/test";

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
import AddReferral from '../../../Pages/PatientDomain/AddReferral';
import Menu from "../../../Pages/BaseClasses/Menu";
import SchedulePatientApp from "../../../Pages/AppointmentDomain/SchedulePatientAppointment";
import CancelledPatientAppointments from "../../../Pages/AppointmentDomain/CancelledPatientAppointments"
import AttendedPatientAppointments from "../../../Pages/AppointmentDomain/AttendedPatientAppointments";
import DidNotAttendedPatientAppointments from "../../../Pages/AppointmentDomain/DidNotAttendedPatientAppointments"
import WaitedNotSeenPatientAppointments from "../../../Pages/AppointmentDomain/WaitedNotSeenPatientAppointments"
import AddEditPatientAppointment from "../../../Pages/AppointmentDomain/AddEditPatientAppointment"
import ServiceAppointment from "../../../Pages/AppointmentDomain/ServiceAppointment"

//import Pool from 'mysql/lib/Pool';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))
const serviceappdetails=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/ServiceApp.json")))
//const attendedpatientappointments=JSON.stringify(require("../../../Pages/AppointmentDomain/AttendedPatientAppointments"))
//const app_patient_details_data=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))


const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Add Edit Patient", () => {
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

     test('Next Available Appointment @Appt',async ({page})=>{

    const loginpage=new LoginPage(page)
    const homepage=new Homepage(page)
    const environment=new Environment(page)
    const patientsearch=new PatientSearch(page)
    const confirmexisting=new ConfirmExisting(page)
    const servicebookapp=new ServiceBookApp(page)
    const patientselectalert=new PatientSelectAlert(page)
    const addreferral=new AddReferral(page)
    const menu=new Menu(page)
    const scheduleserviceapp=new SchedulePatientApp(page)
    const attendedpatientappointments=new AttendedPatientAppointments(page)
    const cancelledaatientappointments=new CancelledPatientAppointments(page)
    const didnotattendedpatientappointments=new DidNotAttendedPatientAppointments(page)
    const waitednotseenpatientappointments=new WaitedNotSeenPatientAppointments(page)
    const adeditpatientappointment=new AddEditPatientAppointment(page)
    const serviceappointment=new ServiceAppointment(page)

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
    
    await page.getByRole('img', { name: 'Cellma Image Avatar' }).click()
    await homepage.clickonSidebarHomeIcon()
    await homepage.clickOnAppointmentIcon()     
    await patientsearch.clickOnSearchPatButton()
    await patientsearch.enterGivenName(jsonData.addPatient[index].pat_firstname);
    await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname);
    await patientsearch.selectSex(jsonData.addPatient[index].pat_sex);
    await patientsearch.enterHospitalRef(jsonData.addPatient[index].pat_hospital_ref);
    await patientsearch.clickOnSearchPatButton()
    await expect(page.getByText('Patient list found')).toHaveText('Patient list found') 
    await patientsearch.clickOnSearchPatientLink()       
    //await patientsearch.ClickOnYesConfirmLegitimateRelationship()    
    await confirmexisting.clickOnConfirmExistingDetails()
    await page.waitForTimeout(4000);   
     await page.pause() 
     const addReferralText = await page.getByRole('heading', { name: 'Add a Referral' }).isVisible();
    //console.log(addReferralText)
    await page.pause()
    if(addReferralText==true)
    {       

     //await menu.clickOnMenubtn()
    // await menu.clickOnAddReferrallink()
    //Add New Referral to Patient.
   
    await addreferral.enterReceiveReferrldate(jsonData.AddReferral[index].rtt_referral_received_date.toString())
    await addreferral.enterApproveReferralDate(jsonData.AddReferral[index].rtt_referral_approved_date.toString())
    await addreferral.enterDateOfReferral(jsonData.AddReferral[index].ref_referral_date.toString())
    await addreferral.enterTimeOfReferral(jsonData.AddReferral[index].ref_time_set.toString())     
    await addreferral.selectSourceOfReferrals()
    await addreferral.selectReferralType(jsonData.AddReferral[index].ref_referral_type_eli_text.toString())
   // await page.pause()
    await addreferral.selectReferralReason()
    //await addreferral.selectReferrerName()
    await addreferral.enterReferringProfessional()
    await addreferral.selectModeOfreferral(jsonData.AddReferral[index].ref_referral_mode.toString())    
    await addreferral.selectService(jsonData.AddReferral[index].cli_name.toString())
    await addreferral.selectClinicType(jsonData.AddReferral[index].ref_clinic_type.toString())
    await addreferral.selectClinicLocation(jsonData.AddReferral[index].ref_clinic_location)
    //await addreferral.selectTeam(jsonData.AddReferral[index].ref_region_eli_text.toString())
    await addreferral.selectPatientcare()
    await addreferral.selectPreferredSexForAssessment(jsonData.AddReferral[index].ref_preferred_examiner_sex_entry)
    await addreferral.selectConsultant()
    //await page.pause()
    await addreferral.selectMethodOfArrival(jsonData.AddReferral[index].ref_method_of_arrival.toString())
    await addreferral.enterTimeOfArrival(jsonData.AddReferral[index].ref_time_of_arrival.toString())
   
    await addreferral.clickOnSaveButton()
    await page.waitForTimeout(1500)
    await expect(page.getByText('Referral added successfully')).toHaveText('Referral added successfully')
    await addreferral.clickOnBackButton()
            
    await page.pause()
     //*********************************************************** */
     //await page.getByRole('button', { name: 'Add Appointments' }).click()
     await servicebookapp.SelectDate(jsonData.nextAvailAppointments[index].rea_date.toString())     
    // await servicebookapp.clickOnNextAvailableAppButton()
     await servicebookapp.clickonClinicTypeButton(jsonData.nextAvailAppointments[index].rea_clinic_type)
     await servicebookapp.clickOnCardioLocationButton(jsonData.nextAvailAppointments[index].rea_location)
    await servicebookapp.ClickonSearchHPButton()
    await page.getByText('Mr Saurabh Riomed').click()
    
    // await servicebookapp.clickOnNextButton()
     await servicebookapp.clickOnAfterNoonSlot(jsonData.nextAvailAppointments[index].reaNextAvailApp)
     await servicebookapp.clickOnNextButton()     
     await servicebookapp.selectAppDetailsAppointmentType(jsonData.nextAvailAppointments[index].reaType)    
     await servicebookapp.selectAppDetailsAppReason(jsonData.nextAvailAppointments[index].rea_review_reason)
     await servicebookapp.selectSendAppTextEmail()
     await servicebookapp.selectPatientType(jsonData.nextAvailAppointments[index].rea_patient_type)
     //await servicebookapp.selectFreeAppointment()
     await servicebookapp.selectReasonForAppdelay(jsonData.nextAvailAppointments[index].rea_reason_for_delay)
     await servicebookapp.enterTriage(jsonData.nextAvailAppointments[index].rea_triage.toString())
     await servicebookapp.enterNotes(jsonData.nextAvailAppointments[index].rea_notes)
     await servicebookapp.clickOnNextButton()
     //await servicebookapp.clickOnSaveAndBookbTodaysDateButton()

    // await page.pause()
     //Communication Consent
     await servicebookapp.selectCommConsentNo()
     await servicebookapp.clikcOnRadioAllNo()
     await servicebookapp.clickOnRadioAllYes()
     await servicebookapp.clickOnCommuConsentSaveButton()
     await expect(page.getByText('Communication consent saved successfully')).toHaveText('Communication consent saved successfully')     
       
}
else{    
     await page.pause()     
     await servicebookapp.SelectDate(jsonData.nextAvailAppointments[index].rea_date.toString())     
     //await servicebookapp.clickOnNextAvailableAppButton()
     await servicebookapp.clickonClinicTypeButton(jsonData.nextAvailAppointments[index].rea_clinic_type)
     await servicebookapp.clickOnCardioLocationButton(jsonData.nextAvailAppointments[index].rea_location)
    await servicebookapp.ClickonSearchHPButton()
    await servicebookapp.clickOnHPnameLink(jsonData.nextAvailAppointments[index].rea_hp_name_link)  
    // await servicebookapp.clickOnNextButton()
     await servicebookapp.clickOnAfterNoonSlot(jsonData.nextAvailAppointments[index].reaNextAvailApp)
     await servicebookapp.clickOnNextButton()
     //await page.pause()
     await servicebookapp.selectAppDetailsAppointmentType(jsonData.nextAvailAppointments[index].reaType)        
     await servicebookapp.selectAppDetailsAppReason(jsonData.nextAvailAppointments[index].rea_review_reason)
     await servicebookapp.selectSendAppTextEmail()
     await servicebookapp.selectPatientType(jsonData.nextAvailAppointments[index].rea_patient_type)
     await servicebookapp.selectReasonForAppdelay(jsonData.nextAvailAppointments[index].rea_reason_for_delay)
     await servicebookapp.enterTriage(jsonData.nextAvailAppointments[index].rea_triage.toString())  
     await servicebookapp.enterNotes(jsonData.nextAvailAppointments[index].rea_notes)     
     await servicebookapp.clickOnNextButton()
     //Communication Consent
     await servicebookapp.selectCommConsentNo()
     await servicebookapp.clikcOnRadioAllNo()
     await servicebookapp.clickOnRadioAllYes()
     await servicebookapp.clickOnCommuConsentSaveButton()
     await expect(page.getByText('Communication consent saved successfully')).toHaveText('Communication consent saved successfully')     
     
    }
    
     await page.pause()
     //SchedulePatientAppointment Page. Links
     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnAddAppointmentLink()
     await patientsearch.clickonBackButton()

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
//      await patientsearch.clickonBackButton()

//      await scheduleserviceapp.clickOnLinksMenu()
//      await scheduleserviceapp.clickonRefresh()
//      await scheduleserviceapp.closePopUpWindow()


     //await page.pause()
     // await scheduleserviceapp.clickOnLinksMenu()
     // await scheduleserviceapp.clickonServiceApp()
     // await serviceappointment.clicOnBackButton()
    // await scheduleserviceapp.closePopUpWindow()


     // await scheduleserviceapp.clickOnLinksMenu()
     // await scheduleserviceapp.clickOnWaitNotSeen()
     // await waitednotseenpatientappointments.clickOnBackButton()

    //change Appoitntment Type
    await page.pause()
    await scheduleserviceapp.ClickonAppTypeLink()
    await scheduleserviceapp.clickOnCloseAppTypePopup()
    await scheduleserviceapp.ClickonAppTypeLink()
    await scheduleserviceapp.selectAppTypeDropdown()
    await scheduleserviceapp.clickOnChangeButton()
    await expect(page.getByText('Appointment type has been changed successfully')).toHaveText('Appointment type has been changed successfully')     
    const AppType= await page.getByTestId('Appointment Type').isVisible()
    console.log(AppType)          


    //Click On Date Link
    await scheduleserviceapp.clickOnDateLink()
    await adeditpatientappointment.clickOnBackButton()

    // await page.pause()
    //Change App Status
//     const AppStatus=await page.getByTestId('Status').isVisible()
//     if(AppStatus=="Scheduled")

 //Reschedule Appointment
//  await scheduleserviceapp.clickOnAppScheduleStatus()
//  await scheduleserviceapp.clickOnReScheduleAppButton()
//  await scheduleserviceapp.selectDropdownReasonForRescheduling()
//  await scheduleserviceapp.clickOnSaveReschedulingReason()
//  await scheduleserviceapp.clickOnCancelReschedulingConfirmation()

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
        "' and rea_record_status = 'approved' order by 1 desc limit 1";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/AppointmentDomain/nextAvailableApp.json";
      results = await executeQuery(sqlQuery, sqlFilePath);
      const reaId = results[0].rea_id;
      console.log("Referral Appointment id is:" + reaId);

      var match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.nextAvailAppointments[index]
      );
      if (match) {
        console.log(
          "\n Next Available Appointment Details Comparison: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n Next Available Appointment Details Comparison: Parameters from both JSON files do not match!\n"
        );
      }

//Cancel Appointment
    await scheduleserviceapp.clickOnAppScheduleStatus()
    await scheduleserviceapp.clickOnCancelButton()
    await scheduleserviceapp.selectAppCancellationReason(jsonData.nextAvailAppointments[index].rea_cancelled_reason)
    await scheduleserviceapp.clickOnSaveCancelledAppButton()
    await expect(page.getByText('Patient appointment cancelled successfully')).toHaveText('Patient appointment cancelled successfully')     
    
    //await page.pause()

    sqlQuery = "select * from referral_appointments where rea_id = " + reaId;
    console.log(sqlQuery);
    results = await executeQuery(sqlQuery, sqlFilePath);

    match = await compareJsons(
      sqlFilePath,
      null,
      jsonData.nextAvailAppointments[index]
    );
    if (match) {
      console.log(
        "\n Next Available Appointment Updated Details Comparison: Parameters from both JSON files match!\n"
      );
    } else {
      console.log(
        "\n Next Available Appointment Updated Details Comparison: Parameters from both JSON files do not match!\n"
      );
    }
        
    });
});