import { test,expect,Page,chromium } from "@playwright/test";
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

    await page.goto(environment.Test)
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password);
    await loginpage.clickOnLogin()
    await expect(page.getByText('Login success')).toHaveText('Login success')
    
    await homepage.clickOnAppointmentIcon()     
    await patientsearch.clickonBackButton()
    await homepage.clickOnAppointmentIcon()   
    await patientsearch.clickOnsettingbutton()
    
    await patientsearch.clickOncustomizableViewforPatientSearchOnAppointment()    
    await patientsearch.clickOnResetToDefaultViewButton()
    
    await page.getByRole('img', { name: 'Cellma Image Avatar' }).click()
   
    await homepage.clickOnAppointmentIcon()     
    await patientsearch.clickOnSearchButton()
    await patientsearch.enterGivenName(patientdetailsdata.New_GivenName)
    await patientsearch.enterFamilyName(patientdetailsdata.New_FamilyName)
    await patientsearch.selectSex(patientdetailsdata.SexM)     
    await patientsearch.clickOnSearchButton()
    await expect(page.getByText('Patient List Found')).toHaveText('Patient List Found') 
    await patientsearch.clickOnSearchPatientLink()       
    //await patientsearch.ClickOnYesConfirmLegitimateRelationship()    
    await confirmexisting.clickOnConfirmExistingDetails()
    await page.waitForTimeout(3000);   
    const addReferralText= await page.locator("xpath=//div/h1[text()='Add a Referral']").isVisible()   
    //console.log(addReferralText)
   // await page.pause()
    if(addReferralText==true)
    {       

     await menu.clickOnMenubtn()
     await menu.clickOnAddReferrallink()
    //Add New Referral to Patient.
   
    await addreferral.enterReceiveReferrldate()
    await addreferral.enterApproveReferralDate()
    await addreferral.enterDateOfReferral()
    await addreferral.enterTimeOfReferral()     
    await addreferral.selectSourceOfReferrals()
    await addreferral.selectReferralType()
   // await page.pause()
    await addreferral.selectReferralReason()
    //await addreferral.selectReferrerName()
    await addreferral.enterReferringProfessional()
    await addreferral.selectModeOfreferral()    
    await addreferral.selectService()
    await addreferral.selectClinicType()
    await addreferral.selectClinicLocation()
    //await addreferral.selectTeam()
    await addreferral.selectPatientcare()
    await addreferral.selectPreferredSexForAssessment()
    await addreferral.selectConsultant()
    //await page.pause()
    await addreferral.selectMethodOfArrival()
    await addreferral.enterTimeOfArrival()
   
    await addreferral.clickOnSaveButton()
    await expect(page.getByText('Referral added successfully')).toHaveText('Referral added successfully')
    await addreferral.clickOnBackButton()
            
     //*********************************************************** */
     await page.getByRole('button', { name: 'Add Appointments' }).click()
     await servicebookapp.SelectDate()     
     await servicebookapp.clickOnNextAvailableAppButton()
     await servicebookapp.clickonClinicTypeButton()
     await servicebookapp.clickOnCardioLocationButton()
     await servicebookapp.clickOnNextButton()
     await servicebookapp.clickOnAfterNoonSlot()
     await servicebookapp.clickOnNextButton()     
     await servicebookapp.selectAppDetailsAppointmentType()    
     await servicebookapp.selectAppDetailsAppReason()
     await servicebookapp.selectSendAppTextEmail()
     await servicebookapp.selectPatientType()
     //await servicebookapp.selectFreeAppointment()
     await servicebookapp.selectReasonForAppdelay()
     await servicebookapp.enterTriage()
     await servicebookapp.enterNotes()
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
     await servicebookapp.SelectDate()     
     await servicebookapp.clickOnNextAvailableAppButton()
     await servicebookapp.clickonClinicTypeButton()
     await servicebookapp.clickOnCardioLocationButton()
     await servicebookapp.clickOnNextButton()
     await servicebookapp.clickOnAfterNoonSlot()
     await servicebookapp.clickOnNextButton()
     //await page.pause()
     await servicebookapp.selectAppDetailsAppointmentType()        
     await servicebookapp.selectAppDetailsAppReason()
     await servicebookapp.selectSendAppTextEmail()
     await servicebookapp.selectPatientType()
     await servicebookapp.selectReasonForAppdelay()
     await servicebookapp.enterTriage()  
     await servicebookapp.enterNotes()     
     await servicebookapp.clickOnNextButton()
     //Communication Consent
     await servicebookapp.selectCommConsentNo()
     await servicebookapp.clikcOnRadioAllNo()
     await servicebookapp.clickOnRadioAllYes()
     await servicebookapp.clickOnCommuConsentSaveButton()
     await expect(page.getByText('Communication consent saved successfully')).toHaveText('Communication consent saved successfully')     
     
    }
    
     //await page.pause()
     //SchedulePatientAppointment Page. Links
     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnAddAppointmentLink()
     await patientsearch.clickonBackButton()

     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnAddProvisionalApp()
     await scheduleserviceapp.closePopUpWindow()

     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnAddAssessment()
     await scheduleserviceapp.closePopUpWindow()

     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnAddAttended()
     await attendedpatientappointments.clickOnBackButton()

     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnCancel()
     await cancelledaatientappointments.clickOnBackButton()

     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnConsent()
     await scheduleserviceapp.closePopUpWindow()

     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnDidNotAttenede()
     await  didnotattendedpatientappointments.clickOnBackButton()
//
     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnHistory()
     await scheduleserviceapp.closePopUpWindow()
//
     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnLetter()
     await scheduleserviceapp.closePopUpWindow()
//
     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnPatientRTT()
     await scheduleserviceapp.closePopUpWindow()

     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnPIPLabel()
     await scheduleserviceapp.closePopUpWindow()

     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickOnReferral()
     await scheduleserviceapp.closePopUpWindow()

     await scheduleserviceapp.clickOnLinksMenu()
     await scheduleserviceapp.clickonRefresh()
     await scheduleserviceapp.closePopUpWindow()
     //await page.pause()
     // await scheduleserviceapp.clickOnLinksMenu()
     // await scheduleserviceapp.clickonServiceApp()
     // await serviceappointment.clicOnBackButton()
    // await scheduleserviceapp.closePopUpWindow()


     // await scheduleserviceapp.clickOnLinksMenu()
     // await scheduleserviceapp.clickOnWaitNotSeen()
     // await waitednotseenpatientappointments.clickOnBackButton()
     
    // await page.pause()

    //change Appoitntment Type

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

//Cancel Appointment
    await scheduleserviceapp.clickOnAppScheduleStatus()
    await scheduleserviceapp.clickOnCancelButton()
    await scheduleserviceapp.selectAppCancellationReason()
    await scheduleserviceapp.clickOnSaveCancelledAppButton()
    await expect(page.getByText('Patient appointment cancelled successfully')).toHaveText('Patient appointment cancelled successfully')     
    
    //await page.pause()
        
    })

