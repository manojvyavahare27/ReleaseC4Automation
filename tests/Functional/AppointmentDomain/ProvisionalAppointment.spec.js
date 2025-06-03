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
import ServiceAppointment from "../../../Pages/AppointmentDomain/ServiceAppointment";
import ProvisionalAppointment from "../../../Pages/AppointmentDomain/ProvisionalAppointment";


const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))
const serviceappdetails=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/ServiceApp.json")))
const provisionalappData=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/ProvisionalApp.json")))
//const attendedpatientappointments=JSON.stringify(require("../../../Pages/AppointmentDomain/AttendedPatientAppointments"))
//const app_patient_details_data=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))

test('Provisional Appointment @Appt',async ({page})=>{

    const loginpage=new LoginPage(page)
    const homepage=new Homepage(page)
    const environment=new Environment(page)
    const addreferral=new AddReferral(page)
    const patientsearch=new PatientSearch(page)
    const serviceapp=new ServiceAppointment(page)
    const provisionalapp=new ProvisionalAppointment(page)
    const confirmexisting=new ConfirmExisting(page)
    

    await page.goto(environment.Test)
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password);
    await loginpage.clickOnLogin()
    await expect(page.getByText('Login success')).toHaveText('Login success')
    
    await homepage.clickOnSidebarAppointmentIcon()     
    await patientsearch.clickonBackButton()
    await homepage.clickOnSidebarAppointmentIcon()
    await serviceapp.clickOnProvisionalAppLink()
    await provisionalapp.clickOnSearchBtn()
    await provisionalapp.clickOnAllLinks()
    await provisionalapp.clickOnProvisionalApp()

    //Search for Patient
    await patientsearch.enterGivenName(patientdetailsdata.New_GivenName)
    await patientsearch.enterFamilyName(patientdetailsdata.New_FamilyName)
    await patientsearch.selectSex(patientdetailsdata.SexM) 
    await patientsearch.clickOnSearchbtnOnPopup()   
    await expect(page.getByText('Patient List Found')).toHaveText('Patient List Found') 
    await patientsearch.clickOnSearchPatientLink()
    await confirmexisting.clickOnConfirmExistingDetails() 
    //await page.pause()
    const addReferralText= await page.locator("xpath=//div/h1[text()='Add a Referral']").isVisible()   
    //console.log(addReferralText)
    if(addReferralText==true)
    {  
       // await page.pause()
    await addreferral.enterReceiveReferrldate()
    await addreferral.enterApproveReferralDate()
    await addreferral.enterDateOfReferral()
    await addreferral.enterTimeOfReferral()     
    await addreferral.selectSourceOfReferrals()
    await addreferral.selectReferralType()    
    await addreferral.selectReferralReason()   
    await addreferral.enterReferringProfessional()
    await addreferral.selectModeOfreferral()    
    await addreferral.selectService()
    await addreferral.selectClinicType()
    await addreferral.selectClinicLocation()
    await addreferral.selectTeam()
    await addreferral.selectPatientcare()
    await addreferral.selectPreferredSexForAssessment()
    await addreferral.selectConsultant()   
    await addreferral.selectMethodOfArrival()
    await addreferral.enterTimeOfArrival()   
    await addreferral.clickOnSaveButton()
    await expect(page.getByText('Referral added successfully')).toHaveText('Referral added successfully')
   // await page.pause()
    await provisionalapp.clickOnProvisionalApp()

    }
    else{
    await provisionalapp.clickOnSaveProvisionalApp()
    await expect(page.getByText('Appointment Type required')).toHaveText('Appointment Type required')
    await expect(page.getByText('Specialty required')).toHaveText('Specialty required')
    await expect(page.getByText('Clinic Type required')).toHaveText('Clinic Type required')
    await expect(page.getByText('Clinic Location required')).toHaveText('Clinic Location required')
    await expect(page.getByText('Appointment Date required')).toHaveText('Appointment Date required')
    await expect(page.getByText('Appointment Confirmation Start Date Required')).toHaveText('Appointment Confirmation Start Date Required')
    await expect(page.getByText('Appointment Confirmation End Date Required')).toHaveText('Appointment Confirmation End Date Required')
    await provisionalapp.selectAppType()
    await provisionalapp.selectSpeciality()
    await provisionalapp.selectClinicType()
    await provisionalapp.selectClinicLocation()    
    await provisionalapp.selectTeams()
    await provisionalapp.enterAppDate(provisionalappData.AppointmentDate)
    await provisionalapp.enterConfirmStartDate(provisionalappData.AppointmentConfirmationStartDate)
    await provisionalapp.enterAppconfirmEndDate(provisionalappData.AppointmentConfirmationEndDate)
    await provisionalapp.selectReasonforApp()
    await provisionalapp.enterNotes()
    await provisionalapp.clickOnSaveProvisionalApp()    
    await expect(page.getByText('Provisional appointment booked successfully')).toHaveText('Provisional appointment booked successfully')
    //await page.pause()
    }

})