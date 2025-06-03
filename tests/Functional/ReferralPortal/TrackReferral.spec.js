import { test,expect,Page,chromium } from "@playwright/test";

import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Environment from "../../../Pages/BaseClasses/Environment";
import PortalHome from "../../../Pages/ReferralPortal/PortalHome";
import PortalSelectScreen from "../../../Pages/ReferralPortal/PortalSelectScreen";
import AddReferralDetails from "../../../Pages/ReferralPortal/AddReferralDetails";
import PatientSearchCustomizable from "../../../Pages/ReferralPortal/PatientSearchCustomizable";
import TrackReferral from "../../../Pages/ReferralPortal/TrackReferral";


//import Pool from 'mysql/lib/Pool';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/ReferralPortal/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))
const addreferraldetailsdata=JSON.parse(JSON.stringify(require('../../../TestData/ReferralPortal/AddReferralDetails.json')))
const trackreferraldata=JSON.parse(JSON.stringify(require('../../../TestData/ReferralPortal/TrackReferral.json')))

test('Add Referral Details @ReferralPortal',async ({page})=>{

    const loginpage=new LoginPage(page)    
    const environment=new Environment(page)
    const portalhome=new PortalHome(page)
    const portalselectscreen=new PortalSelectScreen(page)
    const addreferraldetails=new AddReferralDetails(page)
    const patientsearchcustomizable=new PatientSearchCustomizable(page)
    const trackreferral=new TrackReferral(page)
    

    await page.goto(environment.RefPortal)   
    //await page.pause() 
    await portalhome.clickOnReferralPortalButton()
    await loginpage.enterReferralPortalUserName(logindata.username)    
    await loginpage.enterRefrralPortalPassword(logindata.password);
    await loginpage.clickOnReferralPortalLoginButton()
    await expect(page.getByText('Login success')).toHaveText('Login success')
    await portalselectscreen.clickOnTrackReferralButton()
    await page.pause() 
    await trackreferral.enterStartDate(trackreferraldata.StartDate)
    await trackreferral.enterEndDate(trackreferraldata.EndDate)
    await trackreferral.selectStatus()
    await trackreferral.clickOnSearchButton()
    // await trackreferral.enterNameinSearchBox(addreferraldetailsdata.GivenName)
    // await page.waitForTimeout(1500)
    await trackreferral.clickOnViewHistoryIcon()
    await trackreferral.clickOnAddDocumentIcon()
    await trackreferral.selectDocumentCategory()
    await trackreferral.enteraddNotes()
    await trackreferral.clickOnUploadButton()
    await trackreferral.clickOnViewDocumentIcon()

    await trackreferral.clickOnLogoutButton()

    //await page.pause()


    

})

