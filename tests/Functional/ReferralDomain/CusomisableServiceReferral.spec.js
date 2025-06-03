import { test, expect, Page, chromium } from '@playwright/test';
import LoginPage from '../../../Pages/BaseClasses/LoginPage';
import Homepage from '../../../Pages/BaseClasses/Homepage';
import Environment from '../../../Pages/BaseClasses/Environment';
import Menu from '../../../Pages/BaseClasses/Menu';;
import TopBlueBar from '../../../Pages/BaseClasses/TopBlueBar';
import AddReferral from '../../../Pages/PatientDomain/AddReferral';
import ServiceReferrals from '../../../Pages/ReferralDomain/ServiceReferrals';
import ServiceReferralsCustom from '../../../Pages/ReferralDomain/ServiceReferralsCustom';

const logindata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/Login.json")))

test('Service Referrals @Functional @ReferralDomain', async ({ page }) => {
    const loginpage = new LoginPage(page)
    const homepage = new Homepage(page)
    const environment = new Environment(page)
    const menu = new Menu(page)
    const topbluebar = new TopBlueBar(page)
    const addreferral = new AddReferral(page)
    const servicereferrals = new ServiceReferrals(page)
    const servicereferralcustom= new ServiceReferralsCustom(page)

    await page.goto(environment.Test)
    await loginpage.enterUsername(logindata.username)
    await loginpage.enter_Password(logindata.password)
    await loginpage.clickOnLogin()
    
    await homepage.clickOnSideIconReferrals()
    await servicereferrals.clickOnSettingButton()
    await servicereferrals.clickOnCustomizableViewButton()
    await servicereferralcustom.clickOnBackButton()
    await servicereferrals.clickOnSettingButton()
    await servicereferrals.clickOnCustomizableViewButton()
    //await page.pause()
    await servicereferralcustom.clickOnSaveButton()
    await expect(page.getByText('Customize view updated successfully')).toHaveText('Customize view updated successfully')
    await servicereferrals.clickOnSettingButton()
    await servicereferrals.clickOnCustomizableViewButton()
    await page.pause()
    await servicereferralcustom.clickOnResetToDefaultViewButton()
    await servicereferralcustom.clickOnOkButton()
    //await expect(page.getByText('Customize view updated successfully')).toHaveText('Customize view updated successfully')



});