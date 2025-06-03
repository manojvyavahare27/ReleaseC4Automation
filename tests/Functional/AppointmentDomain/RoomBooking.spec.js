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
import RoomBooking from "../../../Pages/AppointmentDomain/RoomBooking";
import RoomDiary from "../../../Pages/AppointmentDomain/RoomDiary";

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
    const serviceapp=new ServiceAppointment(page)  
    const roombooking=new RoomBooking(page)
    const roomdiary=new RoomDiary(page)

    await page.goto(environment.Test)
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password);
    await loginpage.clickOnLogin()
    await expect(page.getByText('Login success')).toHaveText('Login success')
    
    await homepage.clickOnSidebarAppointmentIcon()     
    await patientsearch.clickonBackButton()
    await homepage.clickOnSidebarAppointmentIcon()   
    await serviceapp.clickOnRoomBookingLink()
    await roombooking.clickOnOpenDropdown()
    await roombooking.clickOnSelectButton()
    await roomdiary.clickOnSlot()
    await roomdiary.enterRoomMeetingDuration()
    await roomdiary.enterRoomMeetingReason()
    await roomdiary.clicOnSaveButton()
    await expect(page.getByText('Room booked successfully')).toHaveText('Room booked successfully')
    await roomdiary.checkBookingConfirmationLinkClick()
    await roomdiary.clickOnCanceMeeting()
    

    await page.pause()

        
    })

