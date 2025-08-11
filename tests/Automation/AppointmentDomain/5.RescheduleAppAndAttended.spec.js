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

//import Pool from 'mysql/lib/Pool';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))
const serviceappdetails=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/ServiceApp.json")))
//const attendedpatientappointments=JSON.stringify(require("../../../Pages/AppointmentDomain/AttendedPatientAppointments"))
//const app_patient_details_data=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))


const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Reschedule Appointment and Attended", () => {
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

    test('Reschedule Appointment and Attended @Appt',async ({page})=>{

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

        const index = 0;

        await page.goto(environment.Test);
        // Set zoom level to 80% using CSS
        //await page.evaluate(() => {document.body.style.zoom = "80%";});
        await page.waitForTimeout(1500);
        await loginpage.enterUsername(jsonData.loginDetails[0].username);
        await page.waitForTimeout(1500);
        await loginpage.enter_Password(jsonData.loginDetails[0].password);
        await page.waitForTimeout(1500);
        await page.pause()
        await loginpage.clickOnLogin()
       // await expect(page.getByText('Login success')).toHaveText('Login success')
        // Scroll to the bottom of the page
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await homepage.clickonSidebarHomeIcon()
        await homepage.clickOnAppointmentIcon()     
        await patientsearch.clickonBackButton()
        await homepage.clickOnAppointmentIcon()   
        await patientsearch.clickOnsettingbutton()
        await page.waitForTimeout(2000);
        await patientsearch.clickOncustomizableViewforPatientSearchOnAppointment()    
        await patientsearch.clickOnResetToDefaultViewButton()
        //await patientsearch.ClickOnSaveButtonForUnknownPatient()

        //await expect(page.getByText('Customize view added successfully')).toHaveText('Customize view added successfully')
        
        await page.getByRole('img', { name: 'Cellma Image Avatar' }).click()
        await page.waitForTimeout(3000);
        //await homepage.clickOnPatientIcon()
        await homepage.clickonSidebarHomeIcon()
        await homepage.clickOnAppointmentIcon()     
        await patientsearch.clickOnSearchPatButton()
        await patientsearch.enterGivenName(jsonData.addPatient[index].pat_firstname)
        await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname);
        await patientsearch.selectSex(jsonData.addPatient[index].pat_sex);
        await patientsearch.enterHospitalRef(jsonData.addPatient[index].pat_hospital_ref);  

        //await patientsearch.selectBornDate()
        await patientsearch.clickOnSearchPatButton()
        await expect(page.getByText('Patient list found')).toHaveText('Patient list found') 
        await patientsearch.clickOnSearchPatientLink()   
        await patientsearch.ClickOnYesConfirmLegitimateRelationship()
        //await patientsearch.ClickOnYesConfirmLegitimateRelationship()
        await page.waitForTimeout(4000);
        await confirmexisting.clickOnConfirmExistingDetails();
        await page.waitForTimeout(3000);
        const addReferralText = await page.getByRole('heading', { name: 'Add a Referral' }).isVisible();
        //console.log(addReferralText)
        if(addReferralText==true)
        {       

        // await menu.clickOnMenubtn()
        // await menu.clickOnAddReferrallink()
        //Add New Referral to Patient.
        await addreferral.enterReceiveReferrldate(jsonData.AddReferral[index].rtt_referral_received_date.toString())
        await addreferral.enterApproveReferralDate(jsonData.AddReferral[index].rtt_referral_approved_date.toString())
        await addreferral.enterDateOfReferral(jsonData.AddReferral[index].ref_referral_date.toString())
        await addreferral.enterTimeOfReferral(jsonData.AddReferral[index].ref_time_set.toString())     
        await addreferral.selectSourceOfReferrals()
        await addreferral.selectReferralType(jsonData.AddReferral[index].ref_referral_type_eli_text.toString())
        await addreferral.selectReferralReason()
        //await addreferral.selectReferrerName()
        await addreferral.enterReferringProfessional()
        await addreferral.selectModeOfreferral(jsonData.AddReferral[index].ref_referral_mode.toString())    
        await addreferral.selectService(jsonData.AddReferral[index].cli_name.toString())
        await addreferral.selectClinicType(jsonData.AddReferral[index].ref_clinic_type)
        await addreferral.selectClinicLocation(jsonData.AddReferral[index].ref_clinic_location)
        await addreferral.selectTeam(jsonData.AddReferral[index].ref_region_eli_text.toString())
        await addreferral.selectPatientcare()
        await addreferral.selectPreferredSexForAssessment(jsonData.AddReferral[index].ref_preferred_examiner_sex_entry)
        await addreferral.selectConsultant()
        //await page.pause()
        await addreferral.selectMethodOfArrival(jsonData.AddReferral[index].ref_method_of_arrival.toString())
        await addreferral.enterTimeOfArrival(jsonData.AddReferral[index].ref_time_of_arrival.toString())
        await addreferral.clickOnSaveButton()
        await expect(page.getByText('Referral added successfully')).toHaveText('Referral added successfully')
        await addreferral.clickOnBackButton()
        await servicebookapp.SelectDate(jsonData.rescheduleAppointments[index].rea_date)
        await servicebookapp.selectDropdownSpecility(jsonData.rescheduleAppointments[index].rea_special)
        await servicebookapp.selectDropdownClinicType(jsonData.rescheduleAppointments[index].rea_clinic_type)
        await servicebookapp.selectDropdownClinicLocation(jsonData.rescheduleAppointments[index].rea_location)
        await servicebookapp.selectTeam(jsonData.rescheduleAppointments[index].rea_region_eli_text)
        await servicebookapp.ClickonSearchHPButton()
        
        await servicebookapp.clickOnHPnameLink(jsonData.rescheduleAppointments[index].rea_hp_name_link)  
        await servicebookapp.clickOnShowCalendarbtn()
        
        
        //Select Morning Slots
        await servicebookapp.clickOnMorningSlots(jsonData.rescheduleAppointments[index].convertedTime)
        // await expect(page.getByText('Appointment slot selected for 11: AM')).toHaveText('Appointment slot selected for 11:25 AM')     

        
        await servicebookapp.clickOnNextButton()
        //await page.pause()
        await servicebookapp.selectAppDetailsAppointmentType(jsonData.rescheduleAppointments[index].reaType)
        // await servicebookapp.selectAppDetailsZone()
   
        await servicebookapp.selectAppDetailsAppReason(jsonData.rescheduleAppointments[index].rea_review_reason)
        await servicebookapp.selectSendAppTextEmail()
        await servicebookapp.selectPatientType(jsonData.rescheduleAppointments[index].rea_patient_type)
        //await servicebookapp.selectFreeAppointment()
        await servicebookapp.selectReasonForAppdelay(jsonData.rescheduleAppointments[index].rea_reason_for_delay)
        await servicebookapp.enterTriage(jsonData.rescheduleAppointments[index].rea_triage.toString())
        await servicebookapp.enterNotes(jsonData.rescheduleAppointments[index].rea_notes)
        //await servicebookapp.clickOnNextButton()
        await servicebookapp.clickOnSaveAndBookbTodaysDateButton()

         await page.pause()
        //Communication Consent
        await servicebookapp.selectCommConsentNo()
        await servicebookapp.clikcOnRadioAllNo()
        await servicebookapp.clickOnRadioAllYes()
        await servicebookapp.clickOnCommuConsentSaveButton()
        await expect(page.getByText('Communication consent saved successfully')).toHaveText('Communication consent saved successfully')     
        await page.waitForTimeout(2000);
        //Atteded Appointment
        await scheduleserviceapp.clickOnAppScheduleStatus()
        await scheduleserviceapp.clickOnAddAttended()
        await scheduleserviceapp.clickOnSaveButton()

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
        jsonData.rescheduleAppointments[index].rea_time +
        "' and rea_record_status = 'approved'";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/AppointmentDomain/rescheduleApp.json";
      results = await executeQuery(sqlQuery, sqlFilePath);
      var reaId = results[0].rea_id;
      console.log("Referral Appointment id is:" + reaId);
   
      var match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.rescheduleAppointments[index]
      );
      if (match) {
        console.log(
          "\n Reschedule Appointment and Attended Comparision: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n Reschedule Appointment and Attended Comparision: Parameters from both JSON files do not match!\n"
        );
      }
        
    }
    else{         

        await page.pause()
        await servicebookapp.SelectDate(jsonData.rescheduleAppointments[index].rea_date)
        await servicebookapp.selectDropdownSpecility(jsonData.rescheduleAppointments[index].rea_special)
        await servicebookapp.selectDropdownClinicType(jsonData.rescheduleAppointments[index].rea_clinic_type)
        await servicebookapp.selectDropdownClinicLocation(jsonData.rescheduleAppointments[index].rea_location)
        await servicebookapp.selectTeam(jsonData.rescheduleAppointments[index].rea_region_eli_text)
        await servicebookapp.ClickonSearchHPButton()
        //
        await servicebookapp.clickOnHPnameLink(jsonData.rescheduleAppointments[index].rea_hp_name_link)
        await servicebookapp.clickOnShowCalendarbtn() 
        
        //await page.pause()
        //Select Morning Slots
        await servicebookapp.clickOnMorningSlots(jsonData.rescheduleAppointments[index].convertedTime) //12:50
        // await expect(page.getByText('Appointment slot selected for 11: AM')).toHaveText('Appointment slot selected for 11:25 AM')     


        //  await servicebookapp.clickOnNextButton()     
        //  await servicebookapp.clickOnCancelButtonforDaySlot()
        //  await servicebookapp.selectWeekSlot()
        //  await servicebookapp.clickOnNextButton()     
        //  await servicebookapp.clickOnCancelButtonforDaySlot()
        //  await servicebookapp.selectMonthSlot()    
        //  await servicebookapp.selectAvailableSlots()     
        //  await servicebookapp.clickOnNextButton()    
        
        
        await servicebookapp.clickOnNextButton()
        //await page.pause()
        await servicebookapp.selectAppDetailsAppointmentType(jsonData.rescheduleAppointments[index].reaType)
        // await servicebookapp.selectAppDetailsZone()
   
        await servicebookapp.selectAppDetailsAppReason(jsonData.rescheduleAppointments[index].rea_review_reason)
        await servicebookapp.selectSendAppTextEmail()
        await servicebookapp.selectPatientType(jsonData.rescheduleAppointments[index].rea_patient_type)
        //await servicebookapp.selectFreeAppointment()
        await servicebookapp.selectReasonForAppdelay(jsonData.rescheduleAppointments[index].rea_reason_for_delay)
        await servicebookapp.enterTriage(jsonData.rescheduleAppointments[index].rea_triage.toString())
        await servicebookapp.enterNotes(jsonData.rescheduleAppointments[index].rea_notes)
        //await servicebookapp.clickOnNextButton()
        await servicebookapp.clickOnSaveAndBookbTodaysDateButton()

        // await page.pause()
        //Communication Consent
        await servicebookapp.selectCommConsentNo()
        await servicebookapp.clikcOnRadioAllNo()
        await servicebookapp.clickOnRadioAllYes()
        await servicebookapp.clickOnCommuConsentSaveButton()
        await expect(page.getByText('Communication consent saved successfully')).toHaveText('Communication consent saved successfully')     
        await page.pause()

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
        jsonData.rescheduleAppointments[index].rea_time +
        "' and rea_record_status = 'approved'";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/AppointmentDomain/rescheduleApp.json";
      results = await executeQuery(sqlQuery, sqlFilePath);
      var reaId = results[0].rea_id;
      console.log("Referral Appointment id is:" + reaId);
   
      var match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.rescheduleAppointments[index]
      );
      if (match) {
        console.log(
          "\n Appointment Creation Comparison: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n Appointment Creation Comparison: Parameters from both JSON files do not match!\n"
        );
      }
        
        //  //Cancel Appointment
        // await scheduleserviceapp.clickOnAppScheduleStatus()
        // await scheduleserviceapp.clickOnCancelButton()
        // await scheduleserviceapp.selectAppCancellationReason()
        // await scheduleserviceapp.clickOnSaveCancelledAppButton()
        // await expect(page.getByText('Patient appointment cancelled successfully')).toHaveText('Patient appointment cancelled successfully')     



                

        //change Appoitntment Type

        await scheduleserviceapp.ClickonAppTypeLink()
        await scheduleserviceapp.clickOnCloseAppTypePopup()
        await scheduleserviceapp.ClickonAppTypeLink()
        await scheduleserviceapp.selectAppTypeDropdown()
        await scheduleserviceapp.clickOnChangeButton()
        await expect(page.getByText('Appointment type has been changed successfully')).toHaveText('Appointment type has been changed successfully')     
        // const AppType= await page.getByTestId('Appointment Type').isVisible()
        // console.log(AppType)
        //await expect(AppType).toHaveText('Emergency')     
        
        sqlQuery = "select * from referral_appointments where rea_id = " + reaId;
        console.log(sqlQuery);
        sqlFilePath = "SQLResults/AppointmentDomain/rescheduleApp.json";
        results = await executeQuery(sqlQuery, sqlFilePath);
     
        var match = await compareJsons(
          sqlFilePath,
          null,
          jsonData.rescheduleAppointments[index]
        );
        if (match) {
          console.log(
            "\n Appointment type changed Comparison: Parameters from both JSON files match!\n"
          );
        } else {
          console.log(
            "\n Appointment type changed Comparison: Parameters from both JSON files do not match!\n"
          );
        }


        //Click On Date Link
        await scheduleserviceapp.clickOnDateLink()
        await adeditpatientappointment.clickOnBackButton()

    //await page.pause()
        //Change App Status
    //     const AppStatus=await page.getByTestId('Status').isVisible()
    //     if(AppStatus=="Scheduled")


    //Change status to Reschedule Appointment
    //await page.pause()
    await scheduleserviceapp.clickOnAppScheduleStatus()
    await scheduleserviceapp.clickOnReScheduleAppButton()
    await scheduleserviceapp.selectDropdownReasonForRescheduling()
    await scheduleserviceapp.clickOnSaveReschedulingReason()
    await scheduleserviceapp.clickOnCancelReschedulingConfirmation()
    await scheduleserviceapp.clickOnSaveReschedulingReason()
    await scheduleserviceapp.clickOnPreceedReschedulingConfirmation()


    //Rescheduled New Appointment.
    await page.pause()
        await servicebookapp.RescheduleSelectDate(jsonData.rescheduleAppointments[index].rea_date)
        await servicebookapp.selectDropdownSpecility(jsonData.rescheduleAppointments[index].rea_special)
        await servicebookapp.selectDropdownClinicType(jsonData.rescheduleAppointments[index].rea_clinic_type)
        await servicebookapp.selectDropdownClinicLocation(jsonData.rescheduleAppointments[index].rea_location)
        await servicebookapp.selectTeam(jsonData.rescheduleAppointments[index].rea_region_eli_text)
        await servicebookapp.ClickonSearchHPButton()
        await servicebookapp.clickOnHPnameLink(jsonData.rescheduleAppointments[index].rea_hp_name_link)
        await servicebookapp.clickOnShowCalendarbtn() 
        // await page.pause()
        //await servicebookapp.clickOnMorningSlots(serviceappdetails.RescheduledAppSlot)
        await servicebookapp.clickOnAfterNoonSlots(jsonData.rescheduleAppointments[index].convertedEditedTime)
        await page.waitForTimeout(3000)
        await servicebookapp.clickOnNextButton()
        
        const overbookConfirmation = await page.getByRole('heading', { name: 'Confirmation' }).isVisible()
        if(overbookConfirmation) {
           await page.getByTestId('Ok').click()
        }

        await servicebookapp.selectAppDetailsAppointmentType(jsonData.rescheduleAppointments[index].reaType)    
        await servicebookapp.selectAppDetailsAppReason(jsonData.rescheduleAppointments[index].rea_review_reason)
        await servicebookapp.selectSendAppTextEmail()
        await servicebookapp.selectPatientType(jsonData.rescheduleAppointments[index].rea_patient_type)    
        await servicebookapp.selectReasonForAppdelay(jsonData.rescheduleAppointments[index].rea_reason_for_delay)
        await servicebookapp.enterTriage(jsonData.rescheduleAppointments[index].rea_triage.toString())
        await servicebookapp.enterNotes(jsonData.rescheduleAppointments[index].rea_notes)
        await servicebookapp.clickOnSaveAndBookbTodaysDateButton()

        //Communication Consent
        await servicebookapp.selectCommConsentNo()
        await servicebookapp.clikcOnRadioAllNo()
        await servicebookapp.clickOnRadioAllYes()
        await servicebookapp.clickOnCommuConsentSaveButton()
        await expect(page.getByText('Communication consent saved successfully')).toHaveText('Communication consent saved successfully')     
   
      sqlQuery =
        "select * from referral_appointments where rea_pat_id = '" +
        patId +
        "' and rea_time = '" +
        jsonData.rescheduleAppointments[index].rea_edited_time +
        "' and rea_record_status = 'approved'";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/AppointmentDomain/rescheduleApp.json";
      results = await executeQuery(sqlQuery, sqlFilePath);
      var reaId2 = results[0].rea_id;
      console.log("Referral Appointment id is:" + reaId2);
   
      var match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.rescheduleAppointments[index]
      );
      if (match) {
        console.log(
          "\n Reschedule Appointment and Attended Comparision: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n Reschedule Appointment and Attended Comparision: Parameters from both JSON files do not match!\n"
        );
      }

        //SchedulePatientAppointment Page. Links
        // await scheduleserviceapp.clickOnLinksMenu()
        // await scheduleserviceapp.clickOnAddAppointmentLink()
        // await scheduleserviceapp.closePopUpWindow()

        // await scheduleserviceapp.clickOnLinksMenu()
        // await scheduleserviceapp.clickOnAddProvisionalApp()
        // await scheduleserviceapp.closePopUpWindow()

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

    //      await scheduleserviceapp.clickOnLinksMenu()
    //      await scheduleserviceapp.clickonServiceApp()
    //      await scheduleserviceapp.closePopUpWindow()


    //      await scheduleserviceapp.clickOnLinksMenu()
    //      await scheduleserviceapp.clickOnWaitNotSeen()
    //      await waitednotseenpatientappointments.clickOnBackButton()
        
    //      await page.pause()

    //      //Atteded Appointment
    //     await scheduleserviceapp.clickOnAppScheduleStatus()
    //     await page.pause()
    //Cancel Appointment
        await scheduleserviceapp.clickOnAppScheduleStatus()
        await scheduleserviceapp.clickOnCancelButton()
        await scheduleserviceapp.selectAppCancellationReason(jsonData.rescheduleAppointments[index].rea_cancelled_reason)
        await scheduleserviceapp.clickOnSaveCancelledAppButton()
        await expect(page.getByText('Patient appointment cancelled successfully')).toHaveText('Patient appointment cancelled successfully')     
        
        //await page.pause()

        sqlQuery = "select * from referral_appointments where rea_id = " + reaId2;
        console.log(sqlQuery);
        sqlFilePath = "SQLResults/AppointmentDomain/rescheduleApp.json";
        results = await executeQuery(sqlQuery, sqlFilePath);
     
        var match = await compareJsons(
          sqlFilePath,
          null,
          jsonData.rescheduleAppointments[index]
        );
        if (match) {
          console.log("\n Cancelled Appointment Comparison: Parameters from both JSON files match!\n" );
        } else {
          console.log("\n Cancelled Appointment Comparison: Parameters from both JSON files do not match!\n");
        }

        }
            
    })
});