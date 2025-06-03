import { test, expect, Page, chromium } from '@playwright/test';
import LoginPage from '../../../Pages/BaseClasses/LoginPage';
import Homepage from '../../../Pages/BaseClasses/Homepage';
import Environment from '../../../Pages/BaseClasses/Environment';
import Menu from '../../../Pages/BaseClasses/Menu';;
import TopBlueBar from '../../../Pages/BaseClasses/TopBlueBar';
import AddReferral from '../../../Pages/PatientDomain/AddReferral';
import ServiceReferrals from '../../../Pages/ReferralDomain/ServiceReferrals';

const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))

test('Service Referrals @Functional @ReferralDomain', async ({ page }) => {
    const loginpage = new LoginPage(page)
    const homepage = new Homepage(page)
    const environment = new Environment(page)
    const menu = new Menu(page)
    const topbluebar = new TopBlueBar(page)
    const addreferral = new AddReferral(page)
    const servicereferrals = new ServiceReferrals(page)

    await page.goto(environment.Test)
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password)
    await loginpage.clickOnLogin()
    await page.pause()
    await homepage.clickOnOurPendingonReferrals()
    //Appointment Tab
    //await servicereferrals.clickonSidebarlinkAddAppointments()
    await servicereferrals.enterStartDate()
    await servicereferrals.enterEndDate()
    await servicereferrals.selectStatusTypeAwaitingAcceptance()
    await servicereferrals.clickOnSearchButton()
    await page.pause()
   // await servicereferrals.clickOnPatientNameLink()
    await servicereferrals.clickOnAddLink()
    await servicereferrals.SelectAssessment()
    await servicereferrals.clickOnShowButton()

    await servicereferrals.clickOnAcceptLink()
    await expect(page.getByText('Referral accepted successfully')).toHaveText('Referral accepted successfully')

    await servicereferrals.selectStatusTypeAcceptedRequiresAppointment()
    await page.pause()
    await servicereferrals.clickOnSearchButton()
    await servicereferrals.clickOnRejectLink()
    await servicereferrals.enterRejectReferralNotes()
    await servicereferrals.enterRejectReason()

    await servicereferrals.clickOnRejectButtonOnPopup()
    await expect(page.getByText('Referral rejected successfully')).toHaveText('Referral rejected successfully')
    await page.pause()

    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonSidebarlinkServiceAppointment()
    // await servicereferrals.clickonSidebarlinkHPAppointments()
    // await servicereferrals.clickonSidebarlinkProvisionalAppointment()
    // await servicereferrals.clickonSidebarlinkWaitingRoom()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonSidebarlinkWaitingList()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonSidebarRoomBooking()
    // await servicereferrals.clickonSidebarCloseAppointmentTab()

    //Patient Tab
    // await servicereferrals.clickonsidebarPatientTab()
    // await servicereferrals.clickonlinkAlert()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonlinkMyTask()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarlinkPathway()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarProms()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarDocument()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarServiceLetter()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarlinkContraceptionUnmatch()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarTemplate()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarPatientTab()

    //Cellma Inbox
    // await servicereferrals.clickonsidebarTabCellmaInbox()
    // await servicereferrals.clickonsidebarlinkSent()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarlinkReceived()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarTabCellmaInbox()

    //Order Comm
    //await servicereferrals.clickonsidebarTabOrdercomm()
    //Lab
    // await servicereferrals.clickonsidebarTabLab()
    // await servicereferrals.clickonsidebarOutstanding()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarlinkRequest()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarlinkResult()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarTabLab()


    //Imaging
    // await servicereferrals.clickonsidebarTabImaging()
    // await servicereferrals.clickonsidebarlinkOutstanding()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarlinkRequest()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarTabImaging()

    //Outstanding Invest
    // await servicereferrals.clickonsidebartabOutstandingInvest()
    // await servicereferrals.clickonsidebarlinkAllInvestigation()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebartabOutstandingInvest()
    // await servicereferrals.clickonsidebarTabOrdercomm()


    //Service Setting Tab
    // await servicereferrals.clickonTabServiceSetting()
    //Service Details Tab

    // await servicereferrals.clickonTabServiceDetails()
    //await homepage.closeCellmaVersionPopup()
    //await servicereferrals.clickonClosePopup()

    // await servicereferrals.clickonlinkServiceDetails()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonlinkScheduling()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarFinance()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarPatientSummary()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonsidebarWatingRoomMessage()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonHideHelpSection()
    // await homepage.closeCellmaVersionPopup()
    ////// await page.pause()
    //////await servicereferrals.clickonlinkServiceDetails()
    // await servicereferrals.clickonPreference()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonServiceDashboard()
    // await homepage.closeCellmaVersionPopup()
    // await servicereferrals.clickonServiceDefaultuestion()
    // await homepage.closeCellmaVersionPopup()




















    await page.pause()




})

