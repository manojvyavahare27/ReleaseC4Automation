import { test, expect, Page, chromium } from "@playwright/test";

const convertExcelToJson = require("../../../config/global-setupOptimized");
const { executeQuery } = require("../../../databaseWriteFile");
import compareJsons from "../../../compareFileOrJson";

import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import Environment from "../../../Pages/BaseClasses/Environment";
import Menu from "../../../Pages/BaseClasses/Menu";
import TopBlueBar from "../../../Pages/BaseClasses/TopBlueBar";
import AddReferral from "../../../Pages/PatientDomain/AddReferral";
import ServiceReferrals from "../../../Pages/ReferralDomain/ServiceReferrals";


const logindata = JSON.parse(
  JSON.stringify(require("../../../TestData/PatientDomain/Login.json"))
);

const consoleLogs = [];
let jsonData;

test.describe("Database Comparison Service Referrals", () => {
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

  test("Service Referrals @Functional @ReferralDomain", async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new Homepage(page);
    const environment = new Environment(page);
    const menu = new Menu(page);
    const topbluebar = new TopBlueBar(page);
    const addreferral = new AddReferral(page);
    const servicereferrals = new ServiceReferrals(page);
    

    let index = 0;

    await page.goto(environment.Test);
    await page.waitForTimeout(1500);
    await loginpage.enterUsername(jsonData.loginDetails[0].username);
    await page.waitForTimeout(1500);
    await loginpage.enter_Password(jsonData.loginDetails[0].password);
    await page.waitForTimeout(1500);
    await loginpage.clickOnLogin();
    await homepage.clickonSidebarHomeIcon();
    await page.pause()
    await homepage.clickOnSideIconReferrals();
    //Appointment Tab
    //await servicereferrals.clickonSidebarlinkAddAppointments()
    await servicereferrals.enterStartDate(
      jsonData.serviceReferral[index].ref_start_date
    );
    await servicereferrals.enterEndDate(
      jsonData.serviceReferral[index].ref_end_date
    );
    await servicereferrals.selectStatusTypeAwaitingAcceptance();
    
    await servicereferrals.clickOnSearchButton();
    //await page.pause()
    //await servicereferrals.clickOnPatientNameLink()
   

    await page.waitForTimeout(2000)

    let records = await page.getByText("No Records Found").isVisible();
    if (records) {
      //No action, proceed with script
    } else {
      //await servicereferrals.clickOnAddLink();
      // await servicereferrals.SelectAssessment();
      // await servicereferrals.clickOnShowButton();
      await servicereferrals.clickOnAcceptLink();
      await expect(page.getByText("Referral accepted successfully")).toHaveText(
        "Referral accepted successfully"
      );

      ////////// Patient Service Referral comparison/////////
      var sqlQuery =
        "select * from patients where pat_hospital_ref= '" +
        jsonData.addPatient[index].pat_hospital_ref +
        "' order by pat_id desc limit 1";

      var sqlFilePath = "SQLResults/ReferralDomain/ServiceReferralDetails.json";
      var results = await executeQuery(sqlQuery, sqlFilePath);

      const patId = results[0].pat_id;
      console.log("Patient id is:" + patId);

      sqlQuery =
        "select * from referrals where ref_pat_id ='" +
        patId +
        "' order by ref_id desc limit 1";
      console.log(sqlQuery);
      results = await executeQuery(sqlQuery, sqlFilePath);

      var match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.acceptedReferral[index]
      );
      if (match) {
        console.log(
          "\n Referral Details Comparison: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n Referral Details Comparison: Parameters from both JSON files do not match!\n"
        );
      }
    }

    await servicereferrals.selectStatusTypeAcceptedRequiresAppointment();
    await servicereferrals.clickOnSearchButton();


    await page.waitForTimeout(2000)
    // await servicereferrals.clickOnAddLink();
    // await servicereferrals.SelectAssessment();
    // await servicereferrals.clickOnShowButton();

    await page.waitForTimeout(2000)
    // await servicereferrals.selectStatusTypeAcceptedRequiresAppointment();
    // await servicereferrals.clickOnSearchButton();   
    await page.waitForTimeout(2000)
    await servicereferrals.clickOnRejectLink();
      await servicereferrals.enterRejectReferralNotes();
      await servicereferrals.enterRejectReason();
      await servicereferrals.clickOnRejectButtonOnPopup();
      await expect(page.getByText("Referral rejected successfully")).toHaveText(
        "Referral rejected successfully");

        await page.waitForTimeout(2000)
        await servicereferrals.selectStatusTypeAcceptedAndRejected();    
    await servicereferrals.clickOnSearchButton();
    await page.waitForTimeout(2000)
    // await servicereferrals.clickOnAcceptLink();
    // await expect(page.getByText("Referral accepted successfully")).toHaveText(
    //   "Referral accepted successfully"
    // );
    // await servicereferrals.clickOnRejectLink();
    //   await servicereferrals.enterRejectReferralNotes();
    //   await servicereferrals.enterRejectReason();
    //   await servicereferrals.clickOnRejectButtonOnPopup();
    //   await expect(page.getByText("Referral rejected successfully")).toHaveText(
    //     "Referral rejected successfully");

    //records = await page.getByText('No Records Found').isVisible();
    if (records) {
      //No action, proceed with script
    } else {
      await servicereferrals.clickOnRejectLink();
      await servicereferrals.enterRejectReferralNotes();
      await servicereferrals.enterRejectReason();
      await servicereferrals.clickOnRejectButtonOnPopup();
      await expect(page.getByText("Referral rejected successfully")).toHaveText(
        "Referral rejected successfully"
      );


      ////////// Patient Service Referral comparison/////////
      var sqlQuery =
        "select * from patients where pat_hospital_ref= '" +
        jsonData.addPatient[index].pat_hospital_ref +
        "' order by pat_id desc limit 1";

      var sqlFilePath = "SQLResults/ReferralDomain/ServiceReferralDetails.json";
      var results = await executeQuery(sqlQuery, sqlFilePath);

      const patId = results[0].pat_id;
      console.log("Patient id is:" + patId);

      sqlQuery =
        "select * from referrals where ref_pat_id ='" +
        patId +
        "' order by ref_id desc limit 1";
      console.log(sqlQuery);
      results = await executeQuery(sqlQuery, sqlFilePath);

      var match = await compareJsons(
        sqlFilePath,
        null,
        jsonData.rejectedReferral[index]
      );
      if (match) {
        console.log(
          "\n Referral Details Comparison: Parameters from both JSON files match!\n"
        );
      } else {
        console.log(
          "\n Referral Details Comparison: Parameters from both JSON files do not match!\n"
        );
      }
    }

    //await page.pause()
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

    //await page.pause()

    //await menu.clickOnLogout();
    //Listen for console events
    page.on("console", async (msg) => {
      const args = await Promise.all(msg.args().map((arg) => arg.jsonValue()));
      consoleLogs.push({
        type: msg.type(),
        text: args.join(" "),
      });
    });

    page.on("console", async (msg) => {
      const args = await Promise.all(msg.args().map((arg) => arg.jsonValue()));
      consoleLogs.push({
        type: msg.type(),
        text: args.join(" "),
      });
    });
  });
});
