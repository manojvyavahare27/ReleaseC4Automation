import { test,expect,Page,chromium } from "@playwright/test";

import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Environment from "../../../Pages/BaseClasses/Environment";
import PortalHome from "../../../Pages/ReferralPortal/PortalHome";
import PortalSelectScreen from "../../../Pages/ReferralPortal/PortalSelectScreen";
import AddReferralDetails from "../../../Pages/ReferralPortal/AddReferralDetails";
import PatientSearchCustomizable from "../../../Pages/ReferralPortal/PatientSearchCustomizable";


//import Pool from 'mysql/lib/Pool';

const logindata= JSON.parse(JSON.stringify(require("../../../TestData/ReferralPortal/Login.json")))
const patientdetailsdata=JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))
const addreferraldetailsdata=JSON.parse(JSON.stringify(require('../../../TestData/ReferralPortal/AddReferralDetails.json')))

test('Add Referral Details @ReferralPortal',async ({page})=>{

    const loginpage=new LoginPage(page)    
    const environment=new Environment(page)
    const portalhome=new PortalHome(page)
    const portalselectscreen=new PortalSelectScreen(page)
    const addreferraldetails=new AddReferralDetails(page)
    const patientsearchcustomizable=new PatientSearchCustomizable(page)
    

    await page.goto(environment.RefPortal)   
    //await page.pause() 
    await portalhome.clickOnReferralPortalButton()
    await loginpage.enterReferralPortalUserName(logindata.username)    
    await loginpage.enterRefrralPortalPassword(logindata.password);
    await loginpage.clickOnReferralPortalLoginButton()
    await expect(page.getByText('Login success')).toHaveText('Login success')
    await portalselectscreen.clickOnReferralRequestButton()    
    //await page.pause() 
    //Customizable view
    await addreferraldetails.clickOnSettingButton()
    await addreferraldetails.clickOnCustomizableViewButton()
    await patientsearchcustomizable.clickOnSaveButton()
    //await page.pause() 
    //await expect(page.getByText('Customize view updated successfully')).toHaveText('Customize view updated successfully')
    await addreferraldetails.clickOnSettingButton()
    await addreferraldetails.clickOnCustomizableViewButton()    
    await patientsearchcustomizable.clickOnResetToDefaultViewButton()
    await patientsearchcustomizable.clickOnOkResetToDefaultViewButton()     
    //await page.pause()
    await addreferraldetails.enterBarcode(addreferraldetailsdata.Barcode)
    await addreferraldetails.clickOnSearchButton()
    await addreferraldetails.clearBarcode()
    await addreferraldetails.enterGivenName(addreferraldetailsdata.GivenName)
    await addreferraldetails.enterFamilyName(addreferraldetailsdata.FamilyName)
    await addreferraldetails.selectSex()
    await addreferraldetails.enterBornDate(addreferraldetailsdata.BornDate)
    //await page.pause()
    await addreferraldetails.clickOnPatientSearchButton()
    await addreferraldetails.clickOnAddPatientButton()
     

    //Add referral Details
    await addreferraldetails.clickOnPatientDetailsAccordion()
    await addreferraldetails.clickOnPatientDetailsAccordion()
    await addreferraldetails.clickOnCreatePatientButton()

    await addreferraldetails.enterIdentifer(addreferraldetailsdata.Identifier)
    await addreferraldetails.selectTitle()
    await addreferraldetails.enterGivenName(addreferraldetailsdata.GivenName)
    await addreferraldetails.enterFamilyName(addreferraldetailsdata.FamilyName)
    await addreferraldetails.selectSex()
    await addreferraldetails.enterBornDate(addreferraldetailsdata.BornDate)
    await addreferraldetails.clickOnCreatePatientButton()
    await page.pause()


    //Service Referral Accordion

    await addreferraldetails.clickOnServiceReferralAccordion()
    await addreferraldetails.clickOnServiceReferralAccordion()
    await addreferraldetails.selectEstablishment()
    await addreferraldetails.selectService()
    await page.pause()
    await addreferraldetails.selectClinicType()
    await addreferraldetails.selectClinicLocation()
    //await addreferraldetails.enterDateOfReferral()
    await addreferraldetails.enterTimeOfReferral()
    await addreferraldetails.selectConsultant()
    await addreferraldetails.selectPriority()
    await addreferraldetails.selectReferralType()
    await addreferraldetails.selectReferralReason()
    await addreferraldetails.enterReferralNotes()

    // Referral Document Accordion
    await addreferraldetails.clickOnReferralDocumentTab()
    await addreferraldetails.clickOnReferralDocumentTab()
    await page.pause()
    await addreferraldetails.clickOnReferPatientButton()
    await expect(page.getByText('Referral Added Successfully')).toHaveText('Referral Added Successfully')
    
    await page.waitForTimeout(1000)
    await addreferraldetails.clickOnTrackReferralButton()
    
    await page.pause()



})

