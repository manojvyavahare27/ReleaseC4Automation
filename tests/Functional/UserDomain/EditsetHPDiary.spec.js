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


const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")))
const pipdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))
const deadpatient=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/DeadPatientDetails.json")))
const createuserdata=JSON.parse(JSON.stringify(require("../../../TestData/UserDomain/CreateUserData.json")))

test('Edit User and Add Leave @User Domain', async ({page}) => {
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

    await page.goto(environment.Test)     
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password)    
    await loginpage.clickOnLogin()  
    
    await homepage.clickOnUserIcon()   
    
    //Check Links  
    await usersearch.clickOnLinkLinks()
    await usersearch.clickOnAddMPIUserLink()
    await usersearch.clickOnCancelbutton()
    await usersearch.clickOnLinkLinks()
    await usersearch.clickOnRefreshlink()
    await usersearch.clickOnCancelbutton()
    await usersearch.clickOnLinkLinks()
    await usersearch.clickOnServiceDetailsLink()
    await usersearch.clickOnCancelbutton()


    //Search User
    await usersearch.enterUserSearch(createuserdata.UserName)
    await usersearch.enterGivenName(createuserdata.GivenName)
    await usersearch.enterFamilyName(createuserdata.FamilyName)
    await usersearch.selectUserStatus()    
    await usersearch.clickOnSearchButton()
    //await page.pause()
    await usersearch.clickOnEditUser()    
    
    //await adduserwizard.toggleUserIsHP()    
    await adduserwizard.clickOnNext()
       
    await page.pause()
    await sethpdairy.enterStartdate()
    await sethpdairy.enterEndDate()
    await sethpdairy.clickOnSearchbutton()
    await page.pause()
    await sethpdairy.clickOnClinicSchedule()
    await sethpdairy.clickOnCombinedSchedule()
   
    await sethpdairy.clickOnHpSchedlue()
    // await sethpdairy.clickOndeleteHPSchedule()
    // await sethpdairy.clickOnYesToDeleteHpSchedule()
   
    //await expect(page.getByText('Record deleted successfully')).toHaveText('Record deleted successfully')

    await sethpdairy.selectRepeatSchedule()
    await sethpdairy.clickOnRepeatSchedule()
    // await sethpdairy.closeRepeatSchedulePopupPage()
    // await sethpdairy.clickOnRepeatSchedule()
    await sethpdairy.enterRepeatScheduleEndDate()
    await sethpdairy.clickOnSaveForRepeatSchedule()
    await expect(page.getByText('HP work schedule set successfully')).toHaveText('HP work schedule set successfully')
    
    // await sethpdairy.clickOnHpStartDate()
    // await sethpdairy.clickOnHpEndDate()
    // await sethpdairy.selectWorkingDays()
    // await sethpdairy.enterHpWorkingStartTime()
    await sethpdairy.clickOnNextButton()
    

    //HP Diary
    await page.pause()
    await page.getByTestId('Next').click()
    await hpdiary.clickOnClinicDiarybutton()
    await hpdiary.selectDaywiseView()
    await hpdiary.selectWeekwiseView()
    await hpdiary.selectmonthwiseView()
    await hpdiary.clickOnHpDiaryButton()
    await hpdiary.selectDaywiseView()
    await hpdiary.selectWeekwiseView()
    await hpdiary.selectmonthwiseView()
    await hpdiary.changeDate()
    await hpdiary.clickOnDate()
    await hpdiary.selectLeaveType()
    await hpdiary.selectLeaveType()
    await hpdiary.checkCheckboxDays()
    await hpdiary.enterLeavesStartDate()
    await hpdiary.enterLeavesEndDate()
    //await page.pause()
    await hpdiary.clickOnSaveLeaveButton()
    //await page.pause()

    //Sidebar Functionality
    await sethpdairy.clickOnOpenSidebar()
    await usersearch.clickOnSearchUserLink()
    await usersearch.clickOnUserGroupLink()
    await usersearch.clickOnCancelPopup()
    await usersearch.clickOnUserGroupGroupinglink()
    await usersearch.clickOnCancelPopup()
    await usersearch.clickOnServiceGroup()
    await usersearch.clickOnCancelPopup()
    await usersearch.clickOnUserMonitoring()
    await usersearch.clickOnCancelPopup()
    await usersearch.clickOnTrainingPortal()
    await usersearch.clickOnCancelPopup()
    //await page.pause()


    
});
