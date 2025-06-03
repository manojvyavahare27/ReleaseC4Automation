import { test,expect,Page,chromium } from "@playwright/test";
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

test('Service Appointment @AdminDomain',async ({page})=>{

    const loginpage=new LoginPage(page)
    const homepage=new Homepage(page)
    const environment=new Environment(page)
    const patientsearch=new PatientSearch(page)
    const confirmexisting=new ConfirmExisting(page)
    const servicebookapp=new ServiceBookApp(page)
    const siteadmin=new SiteAdmin(page)
    const setrooms=new SetRooms(page)

    await page.goto(environment.Test)   
    await loginpage.enterUsername(logindata.username)    
    await loginpage.enter_Password(logindata.password);
    await loginpage.clickOnLogin()
    await expect(page.getByText('Login success')).toHaveText('Login success')
    
    await homepage.clickOnAdminIcon()     
    await setrooms.clickonBackButton()
    await homepage.clickOnAdminIcon()   
    await siteadmin.clickOnConfigurationTab()
    await siteadmin.clickOnSidebarLinkRooms()
    await setrooms.clickonBackButton()
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
    
    await setrooms.clickOnSearchButton()    
    await setrooms.selectDropdownLocation()
    await setrooms.selectDropdownZone()    
    await setrooms.selectDropdownRooms()
    await setrooms.selectStartDate()
    await setrooms.selectEndDate()
    await setrooms.selectStartTime()
    await setrooms.selectEndTime()
    await setrooms.selectRoomStatus()
    await setrooms.enterReason()       
    await setrooms.clickOnSaveButton()  
    
   // await expect(page.getByText('Room availability set successfully')).toHaveText('Room availability set successfully')
    
    //Search Rooms
    await setrooms.selectRoomLocation()
    await setrooms.clickOnSearchRoomButton()
   
    
    //Edit Room Details
   // await page.pause()
    await setrooms.ClickOnEditRoomDetails()
    await expect(page.getByText('If room availability is updated, room schedules will be reset')).toHaveText('If room availability is updated, room schedules will be reset')
    await setrooms.clickOnSaveButtonRoomAvailability() 
    await expect(page.getByText('Room availability updated successfully')).toHaveText('Room availability updated successfully')
    await setrooms.ClickOnEditRoomDetails()
    //await expect(page.getByText('If room availability is updated, room schedules will be reset')).toHaveText('If room availability is updated, room schedules will be reset')
    

    //Add Room Schedule 1
    
    await setrooms.selectRoomSchedule1ActivityType()
    await setrooms.selectStartDateRoomSchedule1()
    await setrooms.selectEndDateRoomSchedule1()    
    await setrooms.selectStartTimeRoomSchedule1()                                        
    await setrooms.selectEndTimeRoomSchedule1()
    await setrooms.selectRoomStatusRoomSchedule1()    
    await setrooms.EnterReasonRoomSchedule1()    
    await setrooms.clickOnSaveButtonRoomSchedule1()    
   // await expect(page.getByText('Room schedule set successfully')).toHaveText('Room schedule set successfully')
     
    await setrooms.ClickOnEditRoomDetails()
    await setrooms.ClickOnAddAdditionalRoomLink1()


    //Add Room Schedule 2
    await setrooms.selectRoomSchedule1ActivityType2()
    await setrooms.selectStartDateRoomSchedule2()
    await setrooms.selectEndDateRoomSchedule2()    
    await setrooms.selectStartTimeRoomSchedule2()                                        
    await setrooms.selectEndTimeRoomSchedule2()
    await setrooms.selectRoomStatusRoomSchedule2()    
    await setrooms.EnterReasonRoomSchedule2()    
    await setrooms.clickOnSaveButtonRoomSchedule2()
   // await expect(page.getByText('Room schedule set successfully')).toHaveText('Room schedule set successfully')
     
    await setrooms.ClickOnEditRoomDetails()
    await setrooms.ClickOnAddAdditionalRoomLink1()


    //Add Room Schedule 3
     
    await setrooms.selectRoomSchedule1ActivityType3()
    await setrooms.selectStartDateRoomSchedule3()
    await setrooms.selectEndDateRoomSchedule3()    
    await setrooms.selectStartTimeRoomSchedule3()                                        
    await setrooms.selectEndTimeRoomSchedule3()
    await setrooms.selectRoomStatusRoomSchedule3() 
      
    await setrooms.EnterReasonRoomSchedule3()    
    await setrooms.clickOnSaveButtonRoomSchedule3()
    //await expect(page.getByText('Room schedule set successfully')).toHaveText('Room schedule set successfully')     
    await setrooms.ClickOnEditRoomDetails()
    await setrooms.ClickOnAddAdditionalRoomLink1()

    //Add Room Schedule 4
    
    await setrooms.selectRoomSchedule1ActivityType4()
    await setrooms.selectStartDateRoomSchedule4()
    await setrooms.selectEndDateRoomSchedule4()    
    await setrooms.selectStartTimeRoomSchedule4()                                        
    await setrooms.selectEndTimeRoomSchedule4()
    await setrooms.selectRoomStatusRoomSchedule4() 
   //await page.pause()   
    await setrooms.EnterReasonRoomSchedule4()    
    await setrooms.clickOnSaveButtonRoomSchedule4()
   // await expect(page.getByText('Room schedule set successfully')).toHaveText('Room schedule set successfully')     
    await setrooms.ClickOnEditRoomDetails()
    await setrooms.ClickOnAddAdditionalRoomLink1()

    //Add Room Schedule 5
   // await page.pause() 
    await setrooms.selectRoomSchedule1ActivityType5()
    await setrooms.selectStartDateRoomSchedule5()
    await setrooms.selectEndDateRoomSchedule5()    
    await setrooms.selectStartTimeRoomSchedule5()                                        
    await setrooms.selectEndTimeRoomSchedule5()
    await setrooms.selectRoomStatusRoomSchedule5() 
     
    await setrooms.EnterReasonRoomSchedule5()    
    await setrooms.clickOnSaveButtonRoomSchedule5()
    //await expect(page.getByText('Room schedule set successfully')).toHaveText('Room schedule set successfully')     
    await setrooms.ClickOnEditRoomDetails()
    //await page.pause() 
    //Expands Row
    await setrooms.clickOnExpandRowButton()

    //Delete 4th and 5th Child Record
    await setrooms.deleteFifthChildRecord()
    await setrooms.clickOnYesToDelete()
   // await page.pause() 
    await expect(page.getByText('Record deleted successfully')).toHaveText('Record deleted successfully')     
    await setrooms.deletefourthRecord()
    await setrooms.clickOnYesToDelete()
    await expect(page.getByText('Record deleted successfully')).toHaveText('Record deleted successfully')     
    
    //Reschedule 3rd Child Record
    await setrooms.clickOn3rdChildCheckbox()
    await setrooms.clickOnRepeateScheduleButton()
    await setrooms.enterEndDateforRepearSchedule()
    await setrooms.clickOnSaveButtononEndDatePopup()
    await expect(page.getByText('Schedule repeated successfully')).toHaveText('Schedule repeated successfully')     
    await setrooms.clickOnParentDeleteicon()
    await setrooms.clickOnYesToDelete()

    
    
   // await page.pause()


    
               


})

