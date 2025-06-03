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
import SiteAdmin from "../../../Pages/AdminDomain/SiteAdmin";
import SetRooms from "../../../Pages/AdminDomain/SetRooms";

//import Pool from 'mysql/lib/Pool';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))

const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Set Rooms", () => {
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

    test('Service Appointment @AdminDomain',async ({page})=>{

        const loginpage=new LoginPage(page)
        const homepage=new Homepage(page)
        const environment=new Environment(page)
        const patientsearch=new PatientSearch(page)
        const confirmexisting=new ConfirmExisting(page)
        const servicebookapp=new ServiceBookApp(page)
        const siteadmin=new SiteAdmin(page)
        const setrooms=new SetRooms(page)

        const index = 0;

        await page.goto(environment.Test)   
        await page.waitForTimeout(1500);
        await loginpage.enterUsername(jsonData.loginDetails[0].username);
        await page.waitForTimeout(1500);
        await loginpage.enter_Password(jsonData.loginDetails[0].password);
        await page.waitForTimeout(1500);
        await loginpage.clickOnLogin()
        await expect(page.getByText('Login success')).toHaveText('Login success')
        await homepage.clickonSidebarHomeIcon()
        await page.pause()
        await homepage.clickOnAdminIcon()     
        await setrooms.clickonBackButton()
        await homepage.clickOnAdminIcon()   
        await siteadmin.clickOnConfigurationTab()
        await siteadmin.clickOnSidebarLinkRooms()
        await setrooms.clickonBackButton()
        await page.waitForTimeout(1000)
        await siteadmin.clickOnSidebarLinkRooms()
    // await setrooms.clickOnSetRoomsSchedule()       
        await setrooms.clickOnSaveButton()      

        await expect(page.getByText('Location required')).toHaveText('Location required')
        await expect(page.getByText('Room required')).toHaveText('Room required')
        await expect(page.getByText('Start Date required')).toHaveText('Start Date required')
        await expect(page.getByText('End Date required')).toHaveText('End Date required')
        await expect(page.getByText('Start Time required')).toHaveText('Start Time required')
        await expect(page.getByText('End Time required')).toHaveText('End Time required')
        await expect(page.getByText('Room Status required')).toHaveText('Room Status required')
        
        await page.pause()
        await setrooms.clickOnSearchButton()    
        await setrooms.selectDropdownLocation(jsonData.appRooms[index].ars_clinic_location_text)
        await setrooms.selectDropdownZone(jsonData.appRooms[index].ars_zone)    
        await setrooms.selectDropdownRooms(jsonData.appRooms[index].ars_name)
        await page.waitForTimeout(1000)
        await setrooms.selectStartDate(jsonData.appRooms[index].ars_start_date)
        await page.waitForTimeout(1000)
        await setrooms.selectEndDate(jsonData.appRooms[index].ars_end_date)
        await page.waitForTimeout(1000)
        await setrooms.selectStartTime(jsonData.appRooms[index].ars_start)
        await page.waitForTimeout(1000)
        await setrooms.selectEndTime(jsonData.appRooms[index].ars_end)
        await setrooms.selectRoomStatus(jsonData.appRooms[index].ars_room_status_entry)
        await setrooms.enterReason(jsonData.appRooms[index].ars_reason)       
        await setrooms.clickOnSaveButton()  
        
    //await expect(page.getByText('Room availability set successfully')).toHaveText('Room availability set successfully')
    await page.waitForTimeout(2000)
        //Search Rooms
        
        await setrooms.enterRoomStartDate(jsonData.appRooms[index].ars_start_date)
        await setrooms.enterRoomEndDate(jsonData.appRooms[index].ars_end_date)
        await setrooms.selectRoomLocation(jsonData.appRooms[index].ars_clinic_location_text)
        await setrooms.clickOnSearchRoomButton()
        await page.waitForTimeout(2000)
        
        //Edit Room Details
        await page.pause()
        await setrooms.ClickOnEditRoomDetails()
        //await expect(page.getByText('If room availability is updated, room schedules will be reset')).toHaveText('If room availability is updated, room schedules will be reset')
        await setrooms.clickOnSaveButtonRoomAvailability() 
        //await expect(page.getByText('Room availability updated successfully')).toHaveText('Room availability updated successfully')
        await setrooms.ClickOnEditRoomDetails()
        //await expect(page.getByText('If room availability is updated, room schedules will be reset')).toHaveText('If room availability is updated, room schedules will be reset')
        
        // var sqlFilePath = "SQLResults/AppointmentDomain/AppointmentRooms.json";
        // var sqlQuery = "select * from appointment_rooms where ars_record_status = 'approved' order by 1 desc limit 1";
        // console.log(sqlQuery);
  
        // var results = await executeQuery(sqlQuery, sqlFilePath);
        // const arsId = results[0].ars_id;
        // console.log("Appointment Room Id is:" + arsId)          
        
        // var match = await compareJsons(
        //   sqlFilePath,
        //   null,
        //   jsonData.appRooms[index]
        // );
        // if (match) {
        //   console.log(
        //     "\n Appointment Rooms Comparison: Parameters from both JSON files match!\n"
        //   );
        // } else {
        //   console.log(
        //     "\n Appointment Rooms Comparison: Parameters from both JSON files do not match!\n"
        //   );
        // }
        
        //Add Room Schedule 1
        //await page.pause()
        await setrooms.selectRoomSchedule1ActivityType(jsonData.appRoomSchedule1[index].aps_room_type_eli_text)
        await page.waitForTimeout(2000)
        await setrooms.selectStartDateRoomSchedule1(jsonData.appRoomSchedule1[index].aps_start_date)
        await page.waitForTimeout(2000)
        await setrooms.selectEndDateRoomSchedule1(jsonData.appRoomSchedule1[index].aps_end_date)  
        await page.waitForTimeout(2000)  
        await setrooms.selectStartTimeRoomSchedule1(jsonData.appRoomSchedule1[index].aps_start_time) 
        await page.waitForTimeout(2000)                                       
        await setrooms.selectEndTimeRoomSchedule1(jsonData.appRoomSchedule1[index].aps_end_time)
        await page.waitForTimeout(2000)
        await setrooms.selectRoomStatusRoomSchedule1(jsonData.appRoomSchedule1[index].aps_room_status_entry)
        await page.waitForTimeout(2000)    
        await setrooms.EnterReasonRoomSchedule1(jsonData.appRoomSchedule1[index].aps_reason)    
        await page.waitForTimeout(2000)
        await page.pause()
        await setrooms.clickOnSaveButtonRoomSchedule1() 
        await page.waitForTimeout(3000)   
        //await expect(page.getByText('Room schedule set successfully')).toHaveText('Room schedule set successfully')
        
        await setrooms.ClickOnEditRoomDetails()
        await page.waitForTimeout(2000)
        await setrooms.ClickOnAddAdditionalRoomLink1()

        // sqlQuery = "select * from appointment_room_schedule where aps_ars_id = '"+ arsId +"' order by 1 desc limit 1;";
        // console.log(sqlQuery);
        
        // results = await executeQuery(sqlQuery, sqlFilePath);      
        
        // match = await compareJsons(
        //   sqlFilePath,
        //   null,
        //   jsonData.appRoomSchedule1[index]
        // );
        // if (match) {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files match!\n"
        //   );
        // } else {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files do not match!\n"
        //   );
        // }

        //Add Room Schedule 2
        await setrooms.selectRoomSchedule1ActivityType2(jsonData.appRoomSchedule2[index].aps_room_type_eli_text)
        await page.waitForTimeout(2000)
        await setrooms.selectStartDateRoomSchedule2(jsonData.appRoomSchedule2[index].aps_start_date)
        await page.waitForTimeout(2000)
        await setrooms.selectEndDateRoomSchedule2(jsonData.appRoomSchedule2[index].aps_end_date)    
        await page.waitForTimeout(2000)
        await setrooms.selectStartTimeRoomSchedule2(jsonData.appRoomSchedule2[index].aps_start_time)       
        await page.waitForTimeout(2000)                                 
        await setrooms.selectEndTimeRoomSchedule2(jsonData.appRoomSchedule2[index].aps_end_time)
        await page.waitForTimeout(2000)
        await setrooms.selectRoomStatusRoomSchedule2(jsonData.appRoomSchedule2[index].aps_room_status_entry) 
        await page.waitForTimeout(2000)   
        await setrooms.EnterReasonRoomSchedule2(jsonData.appRoomSchedule2[index].aps_reason)    
        await page.waitForTimeout(3000)
        await page.pause()
        await setrooms.clickOnSaveButtonRoomSchedule2()
        //await expect(page.getByText('Room schedule set successfully')).toHaveText('Room schedule set successfully')
        //await page.pause()
        await page.waitForTimeout(2000)
        await setrooms.ClickOnEditRoomDetails()
        await page.waitForTimeout(2000)
        await setrooms.ClickOnAddAdditionalRoomLink1()

        // sqlQuery = "select * from appointment_room_schedule where aps_ars_id = '"+ arsId +"' order by 1 desc limit 1;";
        // console.log(sqlQuery);
        
        // results = await executeQuery(sqlQuery, sqlFilePath);      
        
        // match = await compareJsons(
        //   sqlFilePath,
        //   null,
        //   jsonData.appRoomSchedule2[index]
        // );
        // if (match) {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files match!\n"
        //   );
        // } else {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files do not match!\n"
        //   );
        // }

        //Add Room Schedule 3
        
        await setrooms.selectRoomSchedule1ActivityType3(jsonData.appRoomSchedule3[index].aps_room_type_eli_text)
        await page.waitForTimeout(2000)
        await setrooms.selectStartDateRoomSchedule3(jsonData.appRoomSchedule3[index].aps_start_date)
        await page.waitForTimeout(2000)
        await setrooms.selectEndDateRoomSchedule3(jsonData.appRoomSchedule3[index].aps_end_date)    
        await page.waitForTimeout(2000)
        await setrooms.selectStartTimeRoomSchedule3(jsonData.appRoomSchedule3[index].aps_start_time)                                        
        await page.waitForTimeout(2000)
        await setrooms.selectEndTimeRoomSchedule3(jsonData.appRoomSchedule3[index].aps_end_time)
        await page.waitForTimeout(2000)
        await setrooms.selectRoomStatusRoomSchedule3(jsonData.appRoomSchedule3[index].aps_room_status_entry) 
        await page.waitForTimeout(2000)
        await setrooms.EnterReasonRoomSchedule3(jsonData.appRoomSchedule3[index].aps_reason) 
        await page.waitForTimeout(3000)
        await page.pause()   
        await setrooms.clickOnSaveButtonRoomSchedule3()
        //await expect(page.getByText('Room schedule set successfully')).toHaveText('Room schedule set successfully')     
        await setrooms.ClickOnEditRoomDetails()
        await page.waitForTimeout(2000)
        await setrooms.ClickOnAddAdditionalRoomLink1()

        // sqlQuery = "select * from appointment_room_schedule where aps_ars_id = '"+ arsId +"' order by 1 desc limit 1;";
        // console.log(sqlQuery);
        
        // results = await executeQuery(sqlQuery, sqlFilePath);
        // const apsId3 = results[0].aps_id;
        // console.log("Appointment Room Schedule Id is:" + apsId3);
        
        // match = await compareJsons(
        //   sqlFilePath,
        //   null,
        //   jsonData.appRoomSchedule3[index]
        // );
        // if (match) {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files match!\n"
        //   );
        // } else {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files do not match!\n"
        //   );
        // }

        //Add Room Schedule 4
        await setrooms.selectRoomSchedule1ActivityType4(jsonData.appRoomSchedule4[index].aps_room_type_eli_text)
        await page.waitForTimeout(2000)
        await setrooms.selectStartDateRoomSchedule4(jsonData.appRoomSchedule4[index].aps_start_date)
        await page.waitForTimeout(2000)
        await setrooms.selectEndDateRoomSchedule4(jsonData.appRoomSchedule4[index].aps_end_date)    
        await page.waitForTimeout(2000)
        await setrooms.selectStartTimeRoomSchedule4(jsonData.appRoomSchedule4[index].aps_start_time)  
        await page.waitForTimeout(2000)                                      
        await setrooms.selectEndTimeRoomSchedule4(jsonData.appRoomSchedule4[index].aps_end_time)
        await page.waitForTimeout(2000)
        await setrooms.selectRoomStatusRoomSchedule4(jsonData.appRoomSchedule4[index].aps_room_status_entry) 
        await page.waitForTimeout(2000)
        await page.pause()   
        await setrooms.EnterReasonRoomSchedule4(jsonData.appRoomSchedule4[index].aps_reason)  
        await page.pause()
        await page.waitForTimeout(3000)
        await setrooms.clickOnSaveButtonRoomSchedule4()
        //await expect(page.getByText('Room schedule set successfully')).toHaveText('Room schedule set successfully')
        await page.waitForTimeout(2000)  
        await setrooms.ClickOnEditRoomDetails()
        await page.waitForTimeout(2000)
        await setrooms.ClickOnAddAdditionalRoomLink1()

        // sqlQuery = "select * from appointment_room_schedule where aps_ars_id = '"+ arsId +"' order by 1 desc limit 1;";
        // console.log(sqlQuery);
        
        // results = await executeQuery(sqlQuery, sqlFilePath);      
        
        // match = await compareJsons(
        //   sqlFilePath,
        //   null,
        //   jsonData.appRoomSchedule4[index]
        // );
        // if (match) {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files match!\n"
        //   );
        // } else {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files do not match!\n"
        //   );
        // }

        //Add Room Schedule 5
        await setrooms.selectRoomSchedule1ActivityType5(jsonData.appRoomSchedule5[index].aps_room_type_eli_text)
        await page.waitForTimeout(2000)
        await setrooms.selectStartDateRoomSchedule5(jsonData.appRoomSchedule5[index].aps_start_date)
        await page.waitForTimeout(2000)
        await setrooms.selectEndDateRoomSchedule5(jsonData.appRoomSchedule5[index].aps_end_date)    
        await page.waitForTimeout(2000)
        await setrooms.selectStartTimeRoomSchedule5(jsonData.appRoomSchedule5[index].aps_start_time)    
        await page.waitForTimeout(2000)                                    
        await setrooms.selectEndTimeRoomSchedule5(jsonData.appRoomSchedule5[index].aps_end_time)
        await page.waitForTimeout(2000)
        await setrooms.selectRoomStatusRoomSchedule5(jsonData.appRoomSchedule5[index].aps_room_status_entry) 
        await page.waitForTimeout(2000)
        await setrooms.EnterReasonRoomSchedule5(jsonData.appRoomSchedule5[index].aps_reason)   
        await page.pause()
        await page.waitForTimeout(3000)
        await setrooms.clickOnSaveButtonRoomSchedule5()      
        //await expect(page.getByText('Room schedule set successfully')).toHaveText('Room schedule set successfully')     
        //await page.pause()
        await page.waitForTimeout(2000)

        // sqlQuery = "select * from appointment_room_schedule where aps_ars_id = '"+ arsId +"' order by 1 desc limit 1;";
        // console.log(sqlQuery);
        
        // results = await executeQuery(sqlQuery, sqlFilePath);      
        
        // match = await compareJsons(
        //   sqlFilePath,
        //   null,
        //   jsonData.appRoomSchedule5[index]
        // );
        // if (match) {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files match!\n"
        //   );
        // } else {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files do not match!\n"
        //   );
        // }
       // await page.pause()
        await setrooms.ClickOnEditRoomDetails()
        //await page.pause() 
        //Expands Row
        await setrooms.clickOnExpandRowButton()

        //Delete 4th and 5th Child Record
        await setrooms.deleteFifthChildRecord()
        await setrooms.clickOnYesToDelete()
    // await page.pause() 
        await expect(page.getByText('Record deleted successfully')).toHaveText('Record deleted successfully')     
        // await setrooms.deletefourthRecord()
        // await setrooms.clickOnYesToDelete()
        // await expect(page.getByText('Record deleted successfully')).toHaveText('Record deleted successfully')     
        await page.pause()
        //Reschedule 3rd Child Record
       await setrooms.clickOn3rdChildCheckbox()
      await setrooms.clickOnRepeateScheduleButton()
       await setrooms.enterEndDateforRepearSchedule(jsonData.appRoomRemoved[index].aps_end_date)
       await setrooms.clickOnSaveButtononEndDatePopup()
       await expect(page.getByText('Schedule repeated successfully')).toHaveText('Schedule repeated successfully')     
        await setrooms.clickOnParentDeleteicon()
        await setrooms.clickOnYesToDelete()

        // sqlQuery = "select ars_record_status, aps_record_status, aps_deleted, aps_deleted_by, aps_end_date from appointment_rooms join appointment_room_schedule on ars_id = aps_ars_id where aps_ars_id = '" + arsId + "' and aps_id = '" + apsId3 + "' order by 1 desc limit 1";
        // console.log(sqlQuery);
        
        // results = await executeQuery(sqlQuery, sqlFilePath);      
        
        // match = await compareJsons(
        //   sqlFilePath,
        //   null,
        //   jsonData.appRoomRemoved[index]
        // );
        // if (match) {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files match!\n"
        //   );
        // } else {
        //   console.log(
        //     "\n Appointment Room Schedule Comparison: Parameters from both JSON files do not match!\n"
        //   );
        // }
        
    })

});