// Create By: Manoj V
// Date:19/06/2023

import { test, expect, Page, chromium } from '@playwright/test';
import LoginPage from '../../../Pages/BaseClasses/LoginPage';
import Homepage from '../../../Pages/BaseClasses/Homepage';

import Environment from '../../../Pages/BaseClasses/Environment';
import Menu from '../../../Pages/BaseClasses/Menu';
import TopBlueBar from '../../../Pages/BaseClasses/TopBlueBar';
import EditPatient from '../../../Pages/PatientDomain/EditPatient';
import PatientDeath from '../../../Pages/PatientDomain/PatientDeath';
import UserSearch from '../../../Pages/UserDomain/UserSearch';
import AddUserWizard from '../../../Pages/UserDomain/AddUserWizard';
import UserPage from '../../../Pages/UserDomain/UserPage';
import SetHPDairy from '../../../Pages/UserDomain/SetHPDiary';
import HPDiary from '../../../Pages/UserDomain/HpDiary';
import AddToListItem from '../../../Pages/UserDomain/AddToListItem';


const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")))
const pipdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))
const deadpatient=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/DeadPatientDetails.json")))
const createuserdata=JSON.parse(JSON.stringify(require("../../../TestData/UserDomain/CreateUserData.json")))
const addlistitem=JSON.parse(JSON.stringify(require("../../../TestData/UserDomain/AddListItem.json")))

test('Add List Items @User Domain', async ({page}) => {
    const loginpage=new LoginPage(page)
    const homepage=new Homepage(page)
    const environment=new Environment(page)   
    const menu=new Menu(page)
    const topbluebar=new TopBlueBar(page)
    const editpatient=new EditPatient(page)
    const patientdeath=new PatientDeath(page)
    const usersearch=new UserSearch(page)
    const adduserwizard=new AddUserWizard(page)
    const sethpdairy=new SetHPDairy(page)
    const hpdiary=new HPDiary(page)
    const addtolistitem=new AddToListItem(page)

    await page.goto(environment.Test)     
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password)    
    await loginpage.clickOnLogin()  
    //await page.pause()
    await homepage.clickOnUserIcon()   
    
    //Sidebar Functionality
    await sethpdairy.clickOnOpenSidebar()
    await usersearch.clickOnSetUpTab()
    await usersearch.clickOnListLink()

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
    



   // await page.pause()


    
});
