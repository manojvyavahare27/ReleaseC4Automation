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
import CreateOnReferral from '../../../Pages/ReferralDomain/CreateOnReferral';
import RejectServiceOnReferral from '../../../Pages/ReferralDomain/RejectServiceOnReferral';

const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))
const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/ReferralDomain/PatientDetails.json")))
const pipdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PIPDetails.json")))
const gpdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/NewGPDetails.json")))

test('Create On Referral @Functional @ReferralDomain', async ({ page }) => {
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
    const createonreferral = new CreateOnReferral(page)
    const rejectserviceonreferral = new RejectServiceOnReferral(page)

    await page.goto(environment.Test)
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password)
    await loginpage.clickOnLogin()
    await page.pause()
    await homepage.clickOnSideIconRejectedReferrals()
    await rejectserviceonreferral.clickOnMainLinks()
    await rejectserviceonreferral.clickOnLinkCreateServiceOnReferral()
    await page.pause()
    await rejectserviceonreferral.selectPatientName()
    await createonreferral.selectConsultantdropdown()
    await createonreferral.enterDateOfReferral()
    await createonreferral.selectReferralReason()
    await createonreferral.selectServiceDropdown()
    await createonreferral.clickOnContinueButton()

    //Refer To
    await createonreferral.selectClinicType()
    await createonreferral.selectClinicLocation()
    await createonreferral.selectTeams()
    await createonreferral.selectHealthcareProfessional()
    await createonreferral.selectPatientType()
    await createonreferral.selectPatientCare()
    await createonreferral.selectConsultant()
    await createonreferral.clickOnAddTriageAssessmentLink()
    await createonreferral.selectAssessmentFromDropdown()
    await createonreferral.closeSelectAssessmentPopup()
    await createonreferral.addReferralNotes()
    await createonreferral.addNotes()
    await createonreferral.clickOnAddButton()
    await expect(page.getByText('Referral added successfully')).toHaveText('Referral added successfully')
    await rejectserviceonreferral.clickOnLinkCreateServiceOnReferral()
    await page.waitForTimeout(2000)
    await page.pause()
    await createonreferral.clickOnRejectLink()
    await createonreferral.enterRejectReason()
    await createonreferral.clickOnRejectReasonButton()
    await expect(page.getByText('Referral rejected successfully')).toHaveText('Referral rejected successfully')
    
    await page.pause()
}
);