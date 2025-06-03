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
import ServiceAppointment from "../../../Pages/AppointmentDomain/ServiceAppointment";
//import Pool from 'mysql/lib/Pool';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))
const serviceappdetails=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/ServiceApp.json")))
//const attendedpatientappointments=JSON.stringify(require("../../../Pages/AppointmentDomain/AttendedPatientAppointments"))
//const app_patient_details_data=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))

const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Service Appointment", () => {
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

        const index = 0;

        await page.goto(environment.Test);
        await page.waitForTimeout(1500);
        await loginpage.enterUsername(jsonData.loginDetails[0].username);
        await page.waitForTimeout(1500);
        await loginpage.enter_Password(jsonData.loginDetails[0].password);
        await page.waitForTimeout(1500);
        await loginpage.clickOnLogin()
        await expect(page.getByText('Login success')).toHaveText('Login success')   
        await homepage.clickonSidebarHomeIcon()
        await homepage.clickOnSidebarAppointmentIcon()       
        await serviceapp.clickOnSeachButton()
        await serviceapp.enterStartDate(jsonData.serviceAppointments[index].serviceStartDate)
        await serviceapp.enterEndDate(jsonData.serviceAppointments[index].serviceEndDate)
        await serviceapp.clickOnSeachButton()
        //await page.pause()
        await serviceapp.clickOnAppTypeLink()
        await serviceapp.clickOnNewAppTypeLink()    
        await serviceapp.clickOnChangeButton()
        await expect(page.getByText('Appointment type has been changed successfully')).toHaveText('Appointment type has been changed successfully')     
        

      
      var sqlFilePath = "SQLResults/AppointmentDomain/ServiceAppointment.json";
      var sqlQuery =
        "select * from referral_appointments where rea_id = '" +
        jsonData.serviceAppointments[index].rea_id +
        "' and rea_record_status = 'approved'";
      console.log(sqlQuery);

      var results = await executeQuery(sqlQuery, sqlFilePath);
        var match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.serviceAppointments[index]
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

        await serviceapp.clickOnAppTypeLink()
        await serviceapp.clickOnEmergencyAppTypeLink()
        await serviceapp.clickOnChangeButton()
        //await page.pause()
    });
});