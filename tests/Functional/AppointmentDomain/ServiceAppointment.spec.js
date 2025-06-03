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
//import Pool from 'mysql/lib/Pool';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))
const serviceappdetails=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/ServiceApp.json")))
//const attendedpatientappointments=JSON.stringify(require("../../../Pages/AppointmentDomain/AttendedPatientAppointments"))
//const app_patient_details_data=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))

test('Service Appointment @Appt',async ({page})=>{

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
    const addeditpatientappointment=new AddEditPatientAppointment(page)
    const serviceapp=new ServiceAppointment(page)

    await page.goto(environment.Test)
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password);
    await loginpage.clickOnLogin()
    await expect(page.getByText('Login success')).toHaveText('Login success')   
    await homepage.clickOnSidebarAppointmentIcon()       
    await serviceapp.clickOnSeachButton()
    await serviceapp.enterStartDate(serviceappdetails.startdate)
    await serviceapp.enterEndDate(serviceappdetails.enddate)
    await serviceapp.clickOnSeachButton()
    await page.pause()
    await serviceapp.clickOnAppTypeLink()
    await serviceapp.clickOnNewAppTypeLink()    
    await serviceapp.clickOnChangeButton()
    await expect(page.getByText('Appointment type has been changed successfully')).toHaveText('Appointment type has been changed successfully')     
    
    await page.pause()
});
