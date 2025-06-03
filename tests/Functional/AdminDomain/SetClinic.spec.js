import { test,expect,Page,chromium } from "@playwright/test";
import ServiceBookApp from "../../../Pages/AppointmentDomain/ServiceBookApp";
import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import Environment from "../../../Pages/BaseClasses/Environment";
import PatientSearch from "../../../Pages/PatientDomain/PatientSearch";
import ConfirmExisting from "../../../Pages/PatientDomain/ConfirmExisting";
import SiteAdmin from "../../../Pages/AdminDomain/SiteAdmin";
import SetClinics from "../../../Pages/AdminDomain/SetClinics";
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
    const setclinics=new SetClinics(page)
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
    await siteadmin.clickOnSidebarLinkClinics()
    await setrooms.clickonBackButton()
    await siteadmin.clickOnSidebarLinkClinics()    
    await setclinics.clickOnLinksLink()
    
    //Check all Links
    await setclinics.clickOnSummaryLink()
    await setclinics.clicoOnClosePopup()
    await setclinics.clickOnLinksLink()
    await setclinics.clickOnServiceLink()
    await setclinics.clicoOnClosePopup()
    await setclinics.clickOnLinksLink()
    await setclinics.clickOnTryVoiceLink()
    await setclinics.clicoOnClosePopup()
    await setclinics.clickOnAddButton()
        
         await expect(page.getByText('Specialty required')).toHaveText('Specialty required')
    await expect(page.getByText('Clinic Type required')).toHaveText('Clinic Type required')
    await expect(page.getByText('Clinic Location required')).toHaveText('Clinic Location required')    
    await expect(page.getByText('Team required')).toHaveText('Team required')  
    
    
   
    //await setclinics.clickOnSearchButton()
        
    await setclinics.selectSpecility() 
    await setclinics.selectClinicType()
    await setclinics.selectClinicLocationInput()  
    await setclinics.selectTeam()
    await setclinics.selectPatientWeb()
    await setclinics.selectProtocolLocation()
    
    await setclinics.selectGender()
    await setclinics.selectFrequency()
    //await page.pause()
    await setclinics.clickOnAddButton()

    // await setrooms.clickOnSetRoomsScheduleLink()
     await expect(page.getByText('Clinic added successfully')).toHaveText('Clinic added successfully')
     

     //Search by location
      await setclinics.selectClinicLocationDropdown()
     await setclinics.clickOnSearchButton()

     //Change frequency
    //  await setclinics.clickOnFrequencyLink()
    //  await setclinics.selectChangeFrequency()


    
   // await setrooms.clickOnSearchButton()
    // await setrooms.selectDropdownLocation()
    // await setrooms.selectDropdownZone()
    // await setrooms.selectDropdownRooms()
    // await setrooms.selectStartDate()
    // await setrooms.selectEndDate()
    // await setrooms.selectStartTime()
    // await setrooms.selectEndTime()
    // await setrooms.selectRoomStatus()
    // await setrooms.enterReason()
    // await setrooms.clickOnSaveButton()
    //await page.pause()


    //await expect(page.getByText('Same Room already exists. Please set another room')).toHaveText('Same Room already exists. Please set another room')
    
    //await page.pause()
    // await expect(page.getByText('Room availability set successfully')).toHaveText('Room availability set successfully')
    await setclinics.clickOnDeleteIcon()
    await setclinics.clickOnYesToDelete()
    //await page.pause()
    await expect(page.getByText('Record deleted successfully')).toHaveText('Record deleted successfully')

})

