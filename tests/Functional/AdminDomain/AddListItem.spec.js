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
    
    //await page.pause()
    await siteadmin.clickOnList()
   //Check Links  
    //await page.pause()
    await usersearch.clickOnLinkLinks()
    //await usersearch.clickOnAddMPIUserLink()
    await usersearch.clickOnServiceHpDefaultApp()
    await usersearch.clickOnCancelbutton()
    // await usersearch.clickOnLinkLinks()
    // await usersearch.clickOnRefreshlink()
    // await usersearch.clickOnCancelbutton()
    await usersearch.clickOnLinkLinks()
    await usersearch.clickOnMedicalcategoryDisplayedNameLinking()
    await usersearch.clickOnCancelbutton()
    
    await addtolistitem.selectListItemList()
    await addtolistitem.clickOnFilterButton()
    await addtolistitem.clickOnAddListItemsButton()

    //AddToList
    
    await addtolistitem.selectDropdownFromService()
    //await page.pause()
    await addtolistitem.selectDropDownApplicationList()
    await addtolistitem.enterTextInTextBox(addlistitem.Text)
    await addtolistitem.enterTextInOtherLang(addlistitem.Text)
    await addtolistitem.enterNumericValue(addlistitem.NumericVal)
    await addtolistitem.selectDropDownCodeType()
    await addtolistitem.enterCode(addlistitem.Code)
   // await page.pause()
    await addtolistitem.enterCodeText(addlistitem.CodeText)
    //await addtolistitem.enterHextColor(addlistitem.HexColor)
    
    
    await addtolistitem.clickOnSavelistItemButton()
    await expect(page.getByText('List item added successfully')).toHaveText('List item added successfully')
    



})

