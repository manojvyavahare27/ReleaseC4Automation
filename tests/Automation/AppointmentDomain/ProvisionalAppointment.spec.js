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
import ProvisionalAppointment from "../../../Pages/AppointmentDomain/ProvisionalAppointment";


const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))
const serviceappdetails=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/ServiceApp.json")))
const provisionalappData=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/ProvisionalApp.json")))
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

    test('Provisional Appointment @Appt',async ({page})=>{

        const loginpage=new LoginPage(page)
        const homepage=new Homepage(page)
        const environment=new Environment(page)
        const addreferral=new AddReferral(page)
        const patientsearch=new PatientSearch(page)
        const serviceapp=new ServiceAppointment(page)
        const provisionalapp=new ProvisionalAppointment(page)
        const confirmexisting=new ConfirmExisting(page)

        const index = 0;        

        await page.goto(environment.Test)
        await page.waitForLoadState('networkidle');
        await loginpage.enterUsername(jsonData.loginDetails[0].username);       
        await loginpage.enter_Password(jsonData.loginDetails[0].password);       
        await loginpage.clickOnLogin()
        //await expect(page.getByText('Login success')).toHaveText('Login success')
        //await page.pause()
        await homepage.clickonSidebarHomeIcon()
        await homepage.clickOnSidebarAppointmentIcon()     
        await patientsearch.clickonBackButton()
        await homepage.clickOnSidebarAppointmentIcon()
        
        await serviceapp.clickOnProvisionalAppLink()
      //  await page.waitForLoadState('networkidle');
        await provisionalapp.clickOnSearchBtn()
        await provisionalapp.clickOnAllLinks()
        await provisionalapp.clickOnProvisionalApp()

        //Search for Patient
        await patientsearch.enterGivenName(jsonData.addPatient[index].pat_firstname);
        await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname);
        await patientsearch.selectSex(jsonData.addPatient[index].pat_sex);
        await patientsearch.enterHospitalRef(jsonData.addPatient[index].pat_hospital_ref);
        await patientsearch.clickOnSearchbtnOnPopup()   
        await expect(page.getByText('Patient list found')).toHaveText('Patient list found') 
        await patientsearch.clickOnSearchPatientLink()
        await patientsearch.ClickOnYesConfirmLegitimateRelationship()
        await page.waitForTimeout(4000) 
        await confirmexisting.clickOnConfirmExistingDetails() 
        await page.waitForTimeout(2000) 
        const addReferralText = await page.getByRole('heading', { name: 'Add a Referral' }).isVisible();   
        //console.log(addReferralText)
        //await page.pause()
        if(addReferralText==true)
        {  
          await page.waitForTimeout(2000) 
        await addreferral.enterReceiveReferrldate(jsonData.AddReferral[index].rtt_referral_received_date.toString())
        await addreferral.enterApproveReferralDate(jsonData.AddReferral[index].rtt_referral_approved_date.toString())
        await addreferral.enterDateOfReferral(jsonData.AddReferral[index].ref_referral_date.toString())
        await addreferral.enterTimeOfReferral(jsonData.AddReferral[index].ref_time_set.toString())     
        await addreferral.selectSourceOfReferrals()
        await addreferral.selectReferralType(jsonData.AddReferral[index].ref_referral_type_eli_text.toString())    
        await addreferral.selectReferralReason()   
        await page.waitForTimeout(2000) 
        await addreferral.enterReferringProfessional()
        await addreferral.selectModeOfreferral(jsonData.AddReferral[index].ref_referral_mode.toString())    
        await addreferral.selectService(jsonData.AddReferral[index].cli_name.toString())
        await addreferral.selectClinicType(jsonData.AddReferral[index].ref_clinic_type.toString())
        await addreferral.selectClinicLocation(jsonData.AddReferral[index].ref_clinic_location)
        await addreferral.selectTeam(jsonData.AddReferral[index].ref_region_eli_text.toString())
        await addreferral.selectPatientcare()
        await addreferral.selectPreferredSexForAssessment(jsonData.AddReferral[index].ref_preferred_examiner_sex_entry)
        await addreferral.selectConsultant()   
        await addreferral.selectMethodOfArrival(jsonData.AddReferral[index].ref_method_of_arrival.toString())
        await addreferral.enterTimeOfArrival(jsonData.AddReferral[index].ref_time_of_arrival.toString())   
        await addreferral.clickOnSaveButton()
        await expect(page.getByText('Referral added successfully')).toHaveText('Referral added successfully')

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
        //await page.pause()
        await page.waitForTimeout(3000)
        await serviceapp.clickOnProvisionalAppLink()
        await provisionalapp.clickOnSearchBtn()
        await provisionalapp.clickOnAllLinks()
        await provisionalapp.clickOnProvisionalApp()

        await provisionalapp.clickOnSaveProvisionalApp()
        await expect(page.getByText('Appointment Type required')).toHaveText('Appointment Type required')
        await expect(page.getByText('Specialty required')).toHaveText('Specialty required')
        await expect(page.getByText('Clinic Type required')).toHaveText('Clinic Type required')
        await expect(page.getByText('Clinic Location required')).toHaveText('Clinic Location required')
        await expect(page.getByText('Appointment Date required')).toHaveText('Appointment Date required')
        await expect(page.getByText('Appointment Confirmation Start Date Required')).toHaveText('Appointment Confirmation Start Date Required')
        await expect(page.getByText('Appointment Confirmation End Date Required')).toHaveText('Appointment Confirmation End Date Required')
        await provisionalapp.selectAppType(jsonData.prvAppointments[index].prv_type_entry)
        await provisionalapp.selectSpeciality(jsonData.prvAppointments[index].prv_speciality_eli_text)
        await provisionalapp.selectClinicType(jsonData.prvAppointments[index].prv_clinic_type_eli_text)
        await provisionalapp.selectClinicLocation(jsonData.prvAppointments[index].prv_clinic_location_eli_text)   
        //await page.waitForTimeout(2000) 
        await page.waitForLoadState('networkidle');
        await provisionalapp.selectTeams(jsonData.prvAppointments[index].prv_region_eli_text)
        await provisionalapp.enterAppDate(jsonData.prvAppointments[index].prv_date)
        await provisionalapp.enterConfirmStartDate(jsonData.prvAppointments[index].prv_confirmation_start_date)
        await provisionalapp.enterAppconfirmEndDate(jsonData.prvAppointments[index].prv_confirmation_end_date)
        // await page.pause()
        await provisionalapp.selectReasonforApp(jsonData.prvAppointments[index].prv_reason)
        await provisionalapp.enterNotes(jsonData.prvAppointments[index].prv_notes)
        await provisionalapp.clickOnSaveProvisionalApp()   
       // await page.waitForTimeout(2000) 
       await page.waitForLoadState('networkidle');
        //await expect(page.getByText('Provisional appointment booked successfully')).toHaveText('Provisional appointment booked successfully')
        //await page.pause()
        

        ////////// Provisional Appointment Comparison //////////
      var results = await executeQuery(sqlQuery, sqlFilePath);

      sqlQuery =
        "select * from provisional_appointment where prv_pat_id = '" +
        patId +
        "' and prv_record_status = 'approved' order by 1 desc limit 1";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/AppointmentDomain/ProvisionalApp.json";
      results = await executeQuery(sqlQuery, sqlFilePath);

      var match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.prvAppointments[index]
      );
      if (match) {
        console.log(
          "\n Provisional Appointment Comparison: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n Provisional Appointment Comparison: Parameters from both JSON files do not match!\n"
        );
      }
        

        }
        else{
            // await page.pause()
        await provisionalapp.clickOnSaveProvisionalApp()
        await expect(page.getByText('Appointment Type required')).toHaveText('Appointment Type required')
        await expect(page.getByText('Specialty required')).toHaveText('Specialty required')
        await expect(page.getByText('Clinic Type required')).toHaveText('Clinic Type required')
        await expect(page.getByText('Clinic Location required')).toHaveText('Clinic Location required')
        await expect(page.getByText('Appointment Date required')).toHaveText('Appointment Date required')
        await expect(page.getByText('Appointment Confirmation Start Date Required')).toHaveText('Appointment Confirmation Start Date Required')
        await expect(page.getByText('Appointment Confirmation End Date Required')).toHaveText('Appointment Confirmation End Date Required')
        await provisionalapp.selectAppType(jsonData.prvAppointments[index].prv_type_entry)
        await provisionalapp.selectSpeciality(jsonData.prvAppointments[index].prv_speciality_eli_text)
        await provisionalapp.selectClinicType(jsonData.prvAppointments[index].prv_clinic_type_eli_text)
        await provisionalapp.selectClinicLocation(jsonData.prvAppointments[index].prv_clinic_location_eli_text)   
        await page.waitForTimeout(2000) 
        await provisionalapp.selectTeams(jsonData.prvAppointments[index].prv_region_eli_text)
        await provisionalapp.enterAppDate(jsonData.prvAppointments[index].prv_date)
        await provisionalapp.enterConfirmStartDate(jsonData.prvAppointments[index].prv_confirmation_start_date)
        await provisionalapp.enterAppconfirmEndDate(jsonData.prvAppointments[index].prv_confirmation_end_date)
        // await page.pause()
        await provisionalapp.selectReasonforApp(jsonData.prvAppointments[index].prv_reason)
        await provisionalapp.enterNotes(jsonData.prvAppointments[index].prv_notes)
        await provisionalapp.clickOnSaveProvisionalApp()   
        await page.waitForTimeout(2000) 
        //await expect(page.getByText('Provisional appointment booked successfully')).toHaveText('Provisional appointment booked successfully')
        //await page.pause()
        }

        ////////// Provisional Appointment Comparison //////////
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
        "select * from provisional_appointment where prv_pat_id = '" +
        patId +
        "' and prv_record_status = 'approved' order by 1 desc limit 1";
      console.log(sqlQuery);
      sqlFilePath = "SQLResults/AppointmentDomain/ProvisionalApp.json";
      results = await executeQuery(sqlQuery, sqlFilePath);

      var match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.prvAppointments[index]
      );
      if (match) {
        console.log(
          "\n Provisional Appointment Comparison: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n Provisional Appointment Comparison: Parameters from both JSON files do not match!\n"
        );
      }

    })
});