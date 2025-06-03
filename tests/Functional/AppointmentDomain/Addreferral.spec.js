import { test, expect, Page, chromium } from '@playwright/test';
import LoginPage from '../../../Pages/BaseClasses/LoginPage';
import Homepage from '../../../Pages/BaseClasses/Homepage';
import PatientSearch from '../../../Pages/PatientDomain/PatientSearch';
import PatientDetails from '../../../Pages/PatientDomain/PatientDetails'
import Environment from '../../../Pages/BaseClasses/Environment';
import Menu from '../../../Pages/BaseClasses/Menu';
import PatientWizard from '../../../Pages/PatientDomain/PatientWizard';
import PatientDuplicateCheck from '../../../Pages/PatientDomain/PatientDuplicateCheck';
import Demographics from '../../../Pages/PatientDomain/Demographics';
import AddPatient from '../../../Pages/PatientDomain/AddPatient';
import AddAddress from '../../../Pages/PatientDomain/AddAddress';
import AddPIP from '../../../Pages/PatientDomain/AddPIP';
import ViewPIP from '../../../Pages/PatientDomain/ViewPIP';
import AddGP from '../../../Pages/PatientDomain/AddGP';
import PrintIDCard from '../../../Pages/PatientDomain/PrintIDCard';
import ConfirmExisting from '../../../Pages/PatientDomain/ConfirmExisting';
import TopBlueBar from '../../../Pages/BaseClasses/TopBlueBar';
import EditPatient from '../../../Pages/PatientDomain/EditPatient'
import AddReferral from '../../../Pages/PatientDomain/AddReferral';

const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/AppointmentDomain/PatientDetails.json")))
const pipdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))

test('Confirm Existing Details @Functional @ReferralDomain', async ({ page }) => {
    const loginpage = new LoginPage(page)
    const homepage = new Homepage(page)
    const environment = new Environment(page)
    const patientsearch = new PatientSearch(page)
    const patientduplicatecheck = new PatientDuplicateCheck(page)
    const addpatient = new AddPatient(page)
    const addaddress = new AddAddress(page)
    const demogrphics = new Demographics(page)
    const addpip = new AddPIP(page)
    const viewpip = new ViewPIP(page)
    const addgp = new AddGP(page)
    const printidcard = new PrintIDCard(page)
    const confirmexisting = new ConfirmExisting(page)
    const menu = new Menu(page)
    const topbluebar = new TopBlueBar(page)
    const editpatient = new EditPatient(page)
    const addreferral = new AddReferral(page)

    await page.goto(environment.Test)
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password)
    await loginpage.clickOnLogin()
        await homepage.clickOnPatientIcon()
    await patientsearch.clickOnSearchButton()
    await patientsearch.enterGivenName(patientdetailsdata.New_GivenName)
    await patientsearch.enterFamilyName(patientdetailsdata.New_FamilyName)
    await patientsearch.clickOnSearchButton()
    await patientsearch.clickOnSearchPatientLink()
    //await patientsearch.ClickOnYesConfirmLegitimateRelationship()
    //await page.pause()
    await menu.clickOnMenubtn()
    await menu.clickOnAddReferrallink()

    await addreferral.enterReceiveReferrldate()
    await addreferral.enterApproveReferralDate()
    await addreferral.enterDateOfReferral()
    await addreferral.enterTimeOfReferral()
    //await page.pause()
    await addreferral.selectSourceOfReferrals()
    await addreferral.selectReferralType()
    await addreferral.selectReferralReason()
    //await addreferral.selectReferrerName()
    await addreferral.enterReferringProfessional()
    await addreferral.selectModeOfreferral()
    //await page.pause()
    await addreferral.selectService()
    await addreferral.selectClinicType()
    await addreferral.selectClinicLocation()
    await addreferral.selectTeam()
    await addreferral.selectPatientcare()

    await addreferral.selectPreferredSexForAssessment()
    await addreferral.selectConsultant()
    await addreferral.selectMethodOfArrival()
    await addreferral.enterTimeOfArrival()
    await addreferral.clickOnAwaitReferralAcceptance()

    await addreferral.clickOnSaveButton()
    await expect(page.getByText('Awaiting referral added successfully')).toHaveText('Awaiting referral added successfully')
   // await page.pause()
    //Again select same patient.
    await menu.clickOnMenubtn()
    await menu.clickOnFindPatientlink()


    //await homepage.clickOnPatientIcon()  
    //await patientsearch.clickOnSearchButton()
    await patientsearch.enterGivenName(patientdetailsdata.New_GivenName)
    await patientsearch.enterFamilyName(patientdetailsdata.New_FamilyName)
    await patientsearch.clickOnSearchButton()
    await patientsearch.clickOnSearchPatientLink()
    //await patientsearch.ClickOnYesConfirmLegitimateRelationship()    
    await confirmexisting.entertxtboxAlsoKnow()
    //await confirmexisting.selectInterpreterReq()
    await confirmexisting.enterEmailId()
    await confirmexisting.enterMobile()
    await confirmexisting.enterPhoneNo()

    await confirmexisting.selectTitleForNextofKin()
    await confirmexisting.enterGivenNameOfNextOfKin()
    await confirmexisting.enterFamilyNameforNextofKin()
    await confirmexisting.selectRelationship()
    await confirmexisting.enterEmailIsForNextofKin()
    await confirmexisting.enterMobileforNextOfKin()
    await confirmexisting.enterPhoneNoofNextOfKin()
    await confirmexisting.enterCompanyName()
    await confirmexisting.enterRoadNumber()
    await confirmexisting.enterPostCode()
    await confirmexisting.enterTempContactDetails()
    await confirmexisting.enterTempAddressDetails()
    await confirmexisting.clickOnSaveChangeDetails()
    await expect(page.getByText('Patient details changed successfully')).toHaveText('Patient details changed successfully')

}
);