import { test, expect, Page, chromium } from '@playwright/test';

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";

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

const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Add Edit Patient", () => {
  test("Extract Patient Details", async ({}) => {
    const excelFilePath =
      process.env.EXCEL_FILE_PATH || "./ExcelFiles/ReferralDomain.xlsx";
    const jsonFilePath =
      "./TestDataWithJSON/ReferralDomain/ReferralDetails.json";
    const conversionSuccess = await convertExcelToJson(
      excelFilePath,
      jsonFilePath
    );

    if (conversionSuccess) {
      jsonData = require("../../../TestDataWithJSON/ReferralDomain/ReferralDetails.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });

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

        let index = 0;
        
        await page.goto(environment.Test)
        await page.waitForTimeout(1500)
        await loginpage.enterUsername(jsonData.loginDetails[0].username)
        await page.waitForTimeout(1500)
        await loginpage.enter_Password(jsonData.loginDetails[0].password)   
        await page.waitForTimeout(1500) 
        await loginpage.clickOnLogin()
        await page.pause()
        await homepage.clickonSidebarHomeIcon()
        await homepage.clickOnPatientIcon();
        
        await patientsearch.enterGivenName(jsonData.addPatient[index].pat_firstname);
        await patientsearch.enterFamilyName(jsonData.addPatient[index].pat_surname);
        await patientsearch.selectSex(jsonData.addPatient[index].pat_sex);
        await patientsearch.selectBornDate(jsonData.addPatient[index].pat_dob);
        await patientsearch.clickOnSearchButton();
        await patientsearch.clickOnSearchPatientLink();
        await page.waitForTimeout(3000);
        await confirmexisting.clickOnConfirmExistingDetails();




        await page.pause()
        await homepage.clickonSidebarHomeIcon()
        await homepage.clickOnSideIconRejectedReferrals()
        await rejectserviceonreferral.clickOnMainLinks()
        await rejectserviceonreferral.clickOnLinkCreateServiceOnReferral()
        
        // await rejectserviceonreferral.selectPatientName()
        // await createonreferral.selectConsultantdropdown()
        // await createonreferral.enterDateOfReferral()
        // await createonreferral.selectReferralReason()
        // await createonreferral.selectServiceDropdown()
        // await createonreferral.clickOnContinueButton()

        // //Refer To
        // await createonreferral.selectClinicType()
        // await createonreferral.selectClinicLocation()
        // await createonreferral.selectTeams()
        // await createonreferral.selectHealthcareProfessional()
    //await page.pause()
        // await createonreferral.selectPatientType()
        // await createonreferral.selectPatientCare()
        // await createonreferral.selectConsultant()
        await page.waitForTimeout(2000)
        // await createonreferral.clickOnAddTriageAssessmentLink()
        // await createonreferral.selectAssessmentFromDropdown()
        // await createonreferral.closeSelectAssessmentPopup()
    // await createonreferral.addReferralNotes()
        //await createonreferral.addNotes()
        //await createonreferral.clickOnAddButton()
        //await expect(page.getByText('Referral added successfully')).toHaveText('Referral added successfully')
        // await rejectserviceonreferral.clickOnLinkCreateServiceOnReferral()
        // await page.waitForTimeout(2000)
        //await page.pause()
        // await createonreferral.clickOnRejectLink()
        // await createonreferral.enterRejectReason()
        // await createonreferral.clickOnRejectReasonButton()
        // await expect(page.getByText('Referral rejected successfully')).toHaveText('Referral rejected successfully')
        
        // await page.pause()
        await page.waitForSelector('//button[@aria-label="profileIcon"]');
        await page.hover('//button[@aria-label="profileIcon"]');

        await menu.clickOnLogout();
        //Listen for console events
        page.on("console", async (msg) => {
          const args = await Promise.all(
            msg.args().map((arg) => arg.jsonValue())
          );
          consoleLogs.push({
            type: msg.type(),
            text: args.join(" "),
          });
        });
  
        page.on("console", async (msg) => {
          const args = await Promise.all(
            msg.args().map((arg) => arg.jsonValue())
          );
          consoleLogs.push({
            type: msg.type(),
            text: args.join(" "),
          });
        });
    });

});