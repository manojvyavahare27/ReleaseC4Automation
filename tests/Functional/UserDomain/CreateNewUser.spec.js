// Create By: Supriya B
// Date:30/05/2023

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
import SetHPDairy from '../../../Pages/UserDomain/SetHPDiary1';
import HPDiary from '../../../Pages/UserDomain/HpDiary';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")))
const pipdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))
const deadpatient=JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/DeadPatientDetails.json")))
const createuserdata=JSON.parse(JSON.stringify(require("../../../TestData/UserDomain/CreateUserData.json")))

test('Create New User @User Domain', async ({page}) => {
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
    await homepage.clickonSidebarHomeIcon()
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
   
    //User List page    
    await usersearch.enterUserSearch(createuserdata.UserName)
    await usersearch.clickOnSearchButton()
    await usersearch.clickOnViewLink()
    await hpdiary.clickOnBackButton()
    await usersearch.enterUserSearch(createuserdata.UserName)
    await usersearch.clickOnSearchButton()
    await usersearch.clickOnResetLink()
    // await usersearch.enterInvConfirmNewPassword(createuserdata.InvNewPassword)
    // await usersearch.enterInvConfirmPassword(createuserdata.InvConfirmPassword)
    // await page.pause()
    // await usersearch.clickOnSavePasswordBtn()
    // await expect(page.getByText('Please enter different Password')).toHaveText('Please enter different Password')
    await usersearch.enterConfirmNewPassword(createuserdata.ConfirmNewPassword)
    await usersearch.enterConfirmPassword(createuserdata.ConfirmConfirmPassword)
    await usersearch.clickOnSavePasswordBtn()
    await expect(page.getByText('Password has been changed successfully')).toHaveText('Password has been changed successfully')

    //Search User
    await usersearch.enterUserSearch(createuserdata.NewUserName)
    await usersearch.enterGivenName(createuserdata.GivenName)
    await usersearch.enterFamilyName(createuserdata.FamilyName)
    
    await usersearch.selectUserStatus()
    await page.waitForTimeout(1000)
    await usersearch.selectUserService()    
    await usersearch.clickOnSearchButton()
    await usersearch.clickOnAddUser()
    await adduserwizard.clickOnBackButton()
    await usersearch.clickOnAddUser()  

    //Customisable view
    await adduserwizard.clickOnCustomSettingbtn()
    await adduserwizard.clickOnCustomisableView()
    await adduserwizard.clickOnSave()
    await expect(page.getByText('Customize view added successfully')).toHaveText('Customize view added successfully')
    await adduserwizard.clickOnSave()
    //check mandatory fields message
    await expect(page.getByText('Username required')).toHaveText('Username required')    
    //await expect(page.getByText('Password required')).toHaveText('Password required')
    //await expect(page.getByText('Confirm Password required')).toHaveText('Confirm Password required')
    await expect(page.getByText('Email required')).toHaveText('Email required')
    await expect(page.getByText('Given Name required')).toHaveText('Given Name required')
    await expect(page.getByText('Family Name required')).toHaveText('Family Name required')
    await expect(page.getByText('Profession required')).toHaveText('Profession required')

    //Upload Photo
    //await page.getByTestId('EditIcon').click()
    
    // Get the upload input element
    await page.getByTestId('EditIcon').locator('path').click();
    const fileInput = page.getByTestId('PhotoCameraIcon');  
    // Set the file to upload
    const filePath = '../Cellma4Automation/UploadPics/User_1.png';  
    // Upload the file
    await fileInput.setInputFiles(filePath); 
    await page.getByTestId('Upload').click()

    //Upload Digital signature
    // await page.pause()    
    // const filePath1 = '../Cellma4Automation/UploadPics/Digital_Signature.png';
    // await fileInput.setInputFiles(filePath1); 
    // await page.getByText('No File Chosen').setInputFiles(filePath1);
    
//   await page.getByTestId('EditIcon').locator('path').click();
//   await page.getByTestId('PhotoCameraIcon').click();
//   const filePath = '../Cellma4Automation/UploadPics/Patient.png'; 
//   await fileInput.setInputFiles(filePath);
//   await page.getByTestId('Upload').click();

    //User Wizard 
    //User details
    await adduserwizard.selectTitle()
    await adduserwizard.enterUsername(createuserdata.UserName)
    await adduserwizard.enterPassword(createuserdata.Password)
    await adduserwizard.enterConfirmPassword(createuserdata.ConfirmPassword)
    await adduserwizard.enterEmail(createuserdata.Email)
    await adduserwizard.enterGivenName(createuserdata.GivenName)
    await adduserwizard.enterFamilyName(createuserdata.FamilyName)
    await adduserwizard.selectSubscribed()
    await adduserwizard.selectUserServiceGroup()    
    await adduserwizard.enterNotes(createuserdata.Notes)
    //await adduserwizard.selectShowOnExtRefPage()
    await adduserwizard.enterMobileNumber(createuserdata.Mobile)
    await adduserwizard.selectShowExternalRequestPage()
    await adduserwizard.enterUserExpireDate(createuserdata.UserExpireDate)
    await adduserwizard.selectProfession()
    await adduserwizard.enterMCRNNumber(createuserdata.MCRN)
    
    //await adduserwizard.selectUserStatus()
    //await adduserwizard.selectResetPassword()    

    //Add user group pop up details
  
    await adduserwizard.clickOnAddLink()
    await page.waitForTimeout(2000)    
    await adduserwizard.addUserGroup()   
    
    //User HP Details
    //await adduserwizard.toggleContactHidden()
    //await adduserwizard.toggleHPOnDiary()
    //await adduserwizard.toggleUserIsHP()

    // Create By: Manoj V.
    // Date:30/05/2023
   // 
    await adduserwizard.toggleUserIsHP()
    await adduserwizard.enterInitial(createuserdata.DocInitial)
    await adduserwizard.selectConsultant()
    await adduserwizard.enterPROMsSurname(createuserdata.PromesSurName)    
    await adduserwizard.selectSpecialty(createuserdata.Specility)
    await adduserwizard.enterFirstValidity(createuserdata.FirstConsultationValidity)
    await adduserwizard.selectShow()
    await adduserwizard.enterConstCode(createuserdata.ConsultantCode)
    await adduserwizard.enterFollowupValidity(createuserdata.FollowupConsultationValidity)    
    await adduserwizard.selectGenericHP()
    await page.pause()
    await adduserwizard.selectTeams()
    await adduserwizard.enterNPINumber(createuserdata.NPINumber)   
    await adduserwizard.selectApptEmail()
    await adduserwizard.selectPROMsReason()
    await adduserwizard.selectLocal()
    await adduserwizard.selectCommissionLevel()      
    await adduserwizard.enterPROMsNumber(createuserdata.PROMsNumber)    
    await adduserwizard.clickOnSave()
    await expect(page.getByText('User Already Exists')).toHaveText('User Already Exists')    
    await usersearch.enterUserSearch(createuserdata.NewUserName)
   // await page.pause()
    await adduserwizard.clickOnSave()
   // await expect(page.getByText('User and HP created successfully')).toHaveText('User and HP created successfully')
   
    //await this.page.locator('div').filter({ hasText: 'Is User Going On DiaryYesNo' }).getByRole('button', { name: 'Yes' }).click()
    //await page.pause()

    await adduserwizard.clickOnNext()
    
    // Set HP Dairy
    await sethpdairy.clickOnSavebnt()
    await expect(page.getByText('Please select Start Date')).toHaveText('Please select Start Date')
    await expect(page.getByText('Please select End Date')).toHaveText('Please select End Date')
    await expect(page.getByText('Please select Start Time')).toHaveText('Please select Start Time')
    await expect(page.getByText('Please select End Time')).toHaveText('Please select End Time')
    await page.pause()
    await sethpdairy.enterStartdate()
    await sethpdairy.enterEndDate()
    await sethpdairy.clickOnSearchbutton()
    await sethpdairy.clickOnHpStartDate()
    await sethpdairy.clickOnHpEndDate()   
    await page.pause() 
    await sethpdairy.selectWorkingDays()
    await sethpdairy.enterHpWorkingStartTime()
    await sethpdairy.enterHpWorkingEndTime()   
    await page.pause()
    await sethpdairy.selectHpWorkingHrsOccuranceType()
    await sethpdairy.selectHpworkingHrsOccurance()
    await sethpdairy.selectClinicScheduleStartDate()
    await sethpdairy.selectClinicScheduleEndDate()   
    await sethpdairy.selectClinicScheduleWrokingDays()
    await sethpdairy.enterClinicScheduleWorkingHrsStartTime()
    await sethpdairy.enterClinicScheduleWorkingHrsEndTime()
    await sethpdairy.selectClinicScheduleOccuranceType()
    await sethpdairy.selectClinicScheduleOccurance()    
    await page.waitForTimeout(3000)
    await page.pause()
    await sethpdairy.clickOnSavebnt()
    await sethpdairy.clickOnNextbtn()
   
   // await expect(page.getByText('HP work schedule set successfully')).toHaveText('HP work schedule set successfully')
    await page.getByTestId('Next').click()

    //HP Diary    
    await hpdiary.clickOnClinicDiarybutton()
    await hpdiary.selectDaywiseView()
    await hpdiary.selectWeekwiseView()
    await hpdiary.selectmonthwiseView()
    await hpdiary.clickOnHpDiaryButton()
    await hpdiary.selectDaywiseView()
    await hpdiary.selectWeekwiseView()
    await hpdiary.selectmonthwiseView()
    await page.pause()
    await hpdiary.changeDate()
    await hpdiary.clickOnDate()
    await hpdiary.selectLeaveType()
    await hpdiary.selectLeaveType()
    await hpdiary.checkCheckboxDays()
    await hpdiary.enterLeavesStartDate()
    await hpdiary.enterLeavesEndDate()    
    await hpdiary.clickOnSaveLeaveButton()
    //await page.pause()
    //Sidebar Functionality
    // await sethpdairy.clickOnOpenSidebar()
    // await usersearch.clickOnSearchUserLink()
    // await usersearch.clickOnUserGroupLink()
    // await usersearch.clickOnCancelPopup()
    // await usersearch.clickOnUserGroupGroupinglink()
    // await usersearch.clickOnCancelPopup()
    // await usersearch.clickOnServiceGroup()
    // await usersearch.clickOnCancelPopup()
    // await usersearch.clickOnUserMonitoring()
    // await usersearch.clickOnCancelPopup()
    // await usersearch.clickOnTrainingPortal()
    // await usersearch.clickOnCancelPopup()
       
});
