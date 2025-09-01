const { expect } = require("@playwright/test");

class ServiceBookApp {
  //const AllLink;
  constructor(page) {
    this.page = page;
    this.afternoonSlot = page.getByTestId("Mr Prerelease AutoEst 12:00 PM");
    //this.afternoonSlot=page.getByTestId('Mr Manoj Vyavahare 12:00 PM')

    //links

    this.linkLink = page.getByTestId("Links");
    this.linkAppReminder = page.getByRole("heading", {
      name: "Appointment Reminders",
    });
    this.btnBackFromServiceAppReminder = page.getByRole("button", {
      name: "Back Button",
    });
    this.linkBookApp = page.getByRole("heading", { name: "Book Appointment" });
    this.btnclosepopup = page.getByRole("button", { name: "cancelIcon" });
    this.linkDietetics = page.getByRole("heading", { name: "Dietetics" });
    this.linkFinance = page.getByRole("heading", { name: "Finance" });
    this.linkInfusion = page.getByRole("heading", { name: "Infusions" });
    this.linkPatientAdd = page.getByRole("heading", { name: "Patient Add" });
    this.linkRefresh = page.getByTestId("refresh");
    this.linkRoomMAnagement = page.getByRole("heading", {
      name: "Room Management",
    });
    this.linkRoom = page.getByTestId("rooms");
    this.linkService = page
      .getByTestId("service")
      .getByRole("heading", { name: "Service" });
    this.linkServiceAppointment = page
      .getByTestId("serviceAppointments")
      .getByRole("heading", { name: "Service Appointments" });
    this.linkServiceAppointmentAvailability = page.getByRole("heading", {
      name: "Service Appointments Availability",
    });
    this.linkSummary = page.getByRole("heading", { name: "Summary" });
    this.linkWorklist = page.getByRole("heading", { name: "Worklists" });

    //const Alllinks=(this.AllLink=page.$$("[role='menu'] li"))
    this.AllLinks = page.locator("//body/div[2]/div[3]/ul/div/li[1]");
    this.dropdownspecility = page.getByTestId("specialty").getByLabel("Open");
    this.SpecilityValueSurgeon = page.getByRole("option", { name: "Surgeon" });
    this.dropdownClinicType = page.getByLabel("Clinic Type");
    this.dropdownClinicLocation = page.getByTestId('clinicLocation').getByPlaceholder('Please Select')// page.getByLabel("Clinic Location");
    this.dropdownTeam = page.getByTestId("team").getByLabel("Open");
    this.TeamValueHPRegion1 = page.getByRole("option", { name: "HP Region1" });
    this.btnSearchHP = page.locator("xpath=//button[@data-testid='searchHP']")
    this.checkboxHPname = page.getByRole("checkbox", {
      name: "Mr Manoj Tester",
    });
    this.btnshowCalendar = page.getByTestId("Show Calender");
    this.btnClinicType = page.getByTestId("Cardiology");
    this.btnCardioLocation = page.getByTestId("Cath Lab Location");
    //this.linkHPName=page.getByText('Mr Prerelease AutoEst')
    this.btnShowCalendar = page.getByTestId("Show Calender");
    this.slotDay = page.getByTestId("day");
    this.slotWeek = page.getByTestId("week");
    this.slowMonth = page.getByTestId("month");
    this.slotAvailableSlot = page.getByTestId("availableSlots");
    //this.bntNext = page.getByTestId("Next");
    this.bntNext=page.locator("xpath=//button[@data-testid='Next']")

    this.btncancel = page.getByTestId("Cancel");
    this.btnslot830 = page.getByTestId("08:15 AM");

    //Links While Add Referral
    this.linkReferralAddGP = page.getByRole("heading", { name: "Add GP" });
    this.linkReferralPathway = page.getByRole("heading", { name: "Pathway" });
    this.linkReferralPIP = page.getByRole("heading", { name: "PIP" });
    this.linkReferralVideo = page.getByRole("heading", { name: "Video" });
    this.linkReferralWorkList = page.getByRole("heading", { name: "Worklist" });

    //Select Slots
    this.selectMorningSlot = page.getByTestId("07:40 AM");

    //Next Available Appointment
    this.btnNextAvailableApp = page.getByTestId("Next Available Appointment");

    // Appointment details
    this.dropdownAppDetailsClinicType = page
      .getByLabel("appointmentDetailClinicType")
      .getByLabel("Open");
    this.dropdownAppDetailsConsultant = page
      .getByTestId("consultant")
      .getByLabel("Consultant");
    this.dropdownAppDetailsAddToPathway = page.getByLabel("Add To Pathway");
    this.dropdownAppDetailsAppType = page
      .getByTestId("appointmentType")
      .getByLabel("Open");
    this.dropdownAppDetailsZone = page.getByTestId("zone").getByLabel("Zone");
    this.dropdownAppReason = page.getByLabel("Appointment Reason");
    this.dropdownAppDetailsTextEmail = page.getByLabel(
      "Send Appointment Text/Email to Patient"
    );
    this.dropdownAppDetailsPatientType = page
      .getByTestId("patientType")
      .getByLabel("Patient Type");
    this.dropdownAppDetailsFreeApp = page.getByLabel("Free Appointment");
    this.dropdownAppDeailsReasonForApp = page.getByLabel(
      "Reason for Appointment Delay"
    );
    this.txtboxTriage = page.getByTestId("Triage");
    this.txtboxNotes = page.getByTestId("Notes");

    this.btnSaveAndBookbTodaysDate = page.getByTestId(
      "Save And Book Today's Date"
    );

    //Communication Consent
    // this.radioContactGP=page.locator('div').filter({ hasText: /^GP address Number & RoadGP address Number & Road Contact GPYesNo$/ }).getByLabel('No')
    // //this.radioContactGP=page.locator('div').filter({ hasText: /^GP address Number & RoadGP address Number & RoadContact GPYesNo$/ }).getByLabel('No')
    // this.radioContactByMobile=page.locator('div').filter({ hasText: /^Patient MobilePatient Mobile Contact By MobileYesNo$/ }).getByLabel('No')
    // this.radioContactBysmsAppliInfo=page.locator('div').filter({ hasText: /^Patient MobilePatient Mobile Contact By SMS - Appointment InformationYesNo$/ }).getByLabel('No')
    // this.radioContactBysmsClinicalInfo=page.locator('div').filter({ hasText: /^Patient MobilePatient Mobile Contact By SMS - Clinical InformationYesNo$/ }).getByLabel('No')
    // this.radioContactByEmail=page.locator('div').filter({ hasText: /^Patient EmailPatient Email Contact By EmailYesNo$/ }).getByLabel('No')
    // this.radioContactByLetter=page.locator('input[name="contactByLetter"]').nth(1)
    // this.radioNotiandResultViaPortal=page.locator('input[name="notificationAndResult"]').nth(1)


    // this.radioContactGP=page.locator("xpath=//span[@class='MuiButtonBase-root MuiRadio-root MuiRadio-colorPrimary PrivateSwitchBase-root MuiRadio-root MuiRadio-colorPrimary MuiRadio-root MuiRadio-colorPrimary css-clez3k']//input[@name='contactGp']")
    // //this.radioContactGP=page.locator('div').filter({ hasText: /^GP address Number & RoadGP address Number & RoadContact GPYesNo$/ }).getByLabel('No')
    // this.radioContactByMobile=page.locator("xpath=//span[@class='MuiButtonBase-root MuiRadio-root MuiRadio-colorPrimary PrivateSwitchBase-root MuiRadio-root MuiRadio-colorPrimary MuiRadio-root MuiRadio-colorPrimary css-clez3k']//input[@name='contactByMobile']")
    // this.radioContactBysmsAppliInfo=page.locator("xpath=//span[@class='MuiButtonBase-root MuiRadio-root MuiRadio-colorPrimary PrivateSwitchBase-root MuiRadio-root MuiRadio-colorPrimary MuiRadio-root MuiRadio-colorPrimary css-clez3k']//input[@name='contactBySms']")
    // this.radioContactBysmsClinicalInfo=page.locator("xpath=//span[@class='MuiButtonBase-root MuiRadio-root MuiRadio-colorPrimary PrivateSwitchBase-root MuiRadio-root MuiRadio-colorPrimary MuiRadio-root MuiRadio-colorPrimary css-clez3k']//input[@name='contactBySmsClinical']")
    // this.radioContactByEmail=page.locator("xpath=//span[@class='MuiButtonBase-root MuiRadio-root MuiRadio-colorPrimary PrivateSwitchBase-root MuiRadio-root MuiRadio-colorPrimary MuiRadio-root MuiRadio-colorPrimary css-clez3k']//input[@name='contactByEmail']")
    // this.radioContactByLetter=page.locator("xpath=//span[@class='MuiButtonBase-root MuiRadio-root MuiRadio-colorPrimary PrivateSwitchBase-root MuiRadio-root MuiRadio-colorPrimary MuiRadio-root MuiRadio-colorPrimary css-clez3k']//input[@name='contactByLetter']")
    // this.radioNotiandResultViaPortal=page.locator("xpath=//span[@class='MuiButtonBase-root MuiRadio-root MuiRadio-colorPrimary PrivateSwitchBase-root MuiRadio-root MuiRadio-colorPrimary MuiRadio-root MuiRadio-colorPrimary css-clez3k']//input[@name='notificationAndResult']")


    this.radioContactGP=page.locator("xpath=//h1[@aria-label='Contact GP']/following::span[contains(@class, 'MuiRadio-root')][1]")    

    this.radioContactByMobile=page.locator("xpath=//h1[@aria-label='Contact By Mobile']/following::span[contains(@class, 'MuiRadio-root')][1]")
    this.radioContactBysmsAppliInfo=page.locator("xpath=//h1[@aria-label='Contact By SMS - Appointment Information']/following::span[contains(@class, 'MuiRadio-root')][1]")
    this.radioContactBysmsClinicalInfo=page.locator("xpath=//h1[@aria-label='Contact By SMS - Clinical Information']/following::span[contains(@class, 'MuiRadio-root')][1]")
    this.radioContactByEmail=page.locator("xpath=//h1[@aria-label='Contact By Email']/following::span[contains(@class, 'MuiRadio-root')][1]")
    this.radioContactByLetter=page.locator("xpath=//h1[@aria-label='Contact By Letter']/following::span[contains(@class, 'MuiRadio-root')][1]")
    this.radioNotiandResultViaPortal=page.locator("xpath=//h1[@aria-label='Notification and Result via Patient Portal']/following::span[contains(@class, 'MuiRadio-root')][1]")



    this.radioAllNo=page.getByLabel('All No')
    this.radioAllYes=page.getByLabel('All Yes')
    this.btnSaveCommuConsent=page.locator("xpath=//button[@data-testid='Save']")
  }
  async clickOnAfterNoonSlot(reaNextAvailAppt) {
    await this.page.getByTestId(reaNextAvailAppt).click()
  }

  //Links While Add Referral
  async clickOnReferralLinkAddGP() {
    await this.linkReferralAddGP.click();
  }
  async clickOnReferralLinkPathway() {
    await this.linkReferralPathway.click();
  }
  async clickOnReferralLinkPIP() {
    await this.linkReferralPIP.click();
  }
  async clickOnReferralLinkVideo() {
    await this.linkReferralVideo.click();
  }
  async clickOnReferralLinkWorkList() {
    await this.linkReferralWorkList.click();
  }

  //Book Slots
  async clickOnMorningSlots(NewAppSlot) {
    //getByTestId('07:15 AM')
    await this.page.getByTestId(NewAppSlot).click();
    //await this.page.getByTestId('07:05 AM')
    //await this.selectMorningSlot.AppSlot.click()
  }
  async clickOnMorningSlotstoAddApp(rea_time) {
    //getByTestId('07:15 AM')
    await this.page.getByTestId(rea_time).click();
    //await this.page.getByTestId('07:05 AM')
    //await this.selectMorningSlot.AppSlot.click()
  }

  async clickOnAfterNoonSlots(RescheduledAppSlot) {
    await this.page.getByTestId(RescheduledAppSlot).click();
    //await this.selectMorningSlot.AppSlot.click()
  }
  //Communication Consents
  async clickOnCommuConsentSaveButton() {
    await this.btnSaveCommuConsent.click();
  }
  async clickOnRadioAllYes() {
    await this.radioAllYes.click();
  }
  async clikcOnRadioAllNo() {
    await this.radioAllNo.click();
  }
  async selectCommConsentNo() {
    await this.radioContactGP.click();
    await this.radioContactByMobile.click();
    await this.radioContactBysmsAppliInfo.click();
    await this.radioContactBysmsClinicalInfo.click();
    await this.radioContactByEmail.click();
    await this.radioContactByLetter.click();
    await this.radioNotiandResultViaPortal.click();
  }
  async clickOnSaveAndBookbTodaysDateButton() {
    await this.btnSaveAndBookbTodaysDate.click();
  }
  async enterNotes(rea_notes) {
    await this.txtboxNotes.type(rea_notes);
  }
  async enterTriage(rea_triage) {
    await this.txtboxTriage.type(rea_triage);
  }
  async selectReasonForAppdelay(rea_reason_for_delay) {
    await this.dropdownAppDeailsReasonForApp.click();
    await this.page
      .getByRole("option", {
        name: rea_reason_for_delay
      })
      .click();
  }
  async selectFreeAppointment() {
    await this.dropdownAppDetailsFreeApp.click();
    await this.page.getByRole("option", { name: "No" }).click();
  }
  async selectPatientType(rea_patient_type) {
    await this.dropdownAppDetailsPatientType.click();
    await this.page.getByRole("option", { name: rea_patient_type }).click();
  }
  async selectSendAppTextEmail() {
    await this.dropdownAppDetailsTextEmail.click();
    await this.page.getByRole("option", { name: "Yes" }).click();
  }
  async selectAppDetailsAppReason(rea_review_reason) {
    await this.dropdownAppReason.click();
    await this.page.getByRole("option", { name: rea_review_reason }).click();
  }
  async selectAppDetailsZone() {
    await this.dropdownAppDetailsZone.click();
    await this.page.getByRole("option", { name: "Zone 1" }).click();
  }
  async selectAppDetailsAppointmentType(rea_type) {
    await this.dropdownAppDetailsAppType.click();
    await this.page
      .getByRole("option", { name: rea_type, exact: true })
      .click();
  }
  async selectAppDetailsAddToPathway() {
    await this.dropdownAppDetailsAddToPathway.click();
    await this.page
      .getByRole("option", { name: "Appointment Pathway" })
      .click();
  }
  async selectAppDetailsConsultant() {
    await this.dropdownAppDetailsConsultant.click();
    await this.page
      .getByRole("option", { name: "Mr Prerelease AutoEst" })
      .click();
  }
  async SelectAppDetailsClinicType() {
    await this.dropdownAppDetailsClinicType.click();
    await this.page.getByRole("option", { name: "Sexual Health" }).click();
  }
  async clickOn830Slot() {
    await this.btnslot830.click();
  }

  async clickOnClosepopup() {
    await this.btnclosepopup.click();
  }

  async clickonWorklistlink() {
    await this.linkWorklist.click();
  }
  async clickonSummarylink() {
    await this.linkSummary.click();
  }
  async clickOnServiceAppavailibility() {
    await this.linkServiceAppointmentAvailability.click();
  }
  async clickOnServiceAppointmentlink() {
    await this.linkServiceAppointment.click();
  }
  async clickOnService() {
    await this.linkService.click();
  }
  async clickOnRoom() {
    await this.linkRoom.click();
  }
  async clickOnRoomManagement() {
    await this.linkRoomMAnagement.click();
  }
  async clickOnRefreshLink() {
    await this.linkRefresh.click();
  }
  async clickOnPatientaddLink() {
    await this.linkPatientAdd.click();
  }
  async clickOnInfusionLink() {
    await this.linkInfusion.click();
  }
  async clickOnFinanceLink() {
    await this.linkFinance.click();
  }
  async clickOnDieteticsLink() {
    await this.linkDietetics.click();
  }

  async clickOnlinkBookApp() {
    await this.linkBookApp.click();
  }
  async clickOnBackbntOnServiceAppReminder() {
    await this.btnBackFromServiceAppReminder.click();
  }

  async clickOnLinkAppReminder() {
    await this.linkAppReminder.click();
  }
  async clickOnLinks() {
    await this.linkLink.click();
  }
  async clickOnNextButton() {
    await this.bntNext.click();
  }

  async clickOnCancelButtonforDaySlot() {
    await this.btncancel.click();
  }
  async selectDaySlot() {
    await this.slotDay.click();
  }
  async selectWeekSlot() {
    await this.slotWeek.click();
  }
  async selectMonthSlot() {
    await this.slowMonth.click();
  }
  async selectAvailableSlots() {
    await this.slotAvailableSlot.click();
  }
  async clickOnShowCalendarbtn() {
    await this.btnShowCalendar.click();
  }
  async clickOnHPnameLink(HPNameLink) {
    await this.page.getByText(HPNameLink).click();
    // await this.linkHPName.click(HPNameLink)
  }
  async clickOnCardioLocationButton(rea_location) {
   //await this.page.getByTestId(rea_location).click();
   await this.page.getByTestId('clinicLocation').getByPlaceholder('Please Select').click()
   //await this.page.getByTestId('clinicLocation').getByPlaceholder(rea_location).click()
   await this.page.getByRole('option', { name: rea_location }).click()
  }
  async clickonClinicTypeButton(rea_clinic_type) {
    //await this.page.getByTestId(rea_clinic_type).click();
    await this.page.getByTestId('clinicType').getByPlaceholder('Please Select').click()
    //await this.page.getByTestId('clinicType').getByPlaceholder(rea_clinic_type).click()
    await this.page.getByRole('option', { name: rea_clinic_type }).click()
  }
  async clickOnShowCalendarbutton() {
    await this.btnshowCalendar.click();
  }
  async checkHPNameCheckbox() {
    await this.checkboxHPname.click();
  }
  async ClickonSearchHPButton() {
    await this.btnSearchHP.click();
  }

  async selectTeam(rea_region_eli_text) {
    await this.dropdownTeam.click();
    await this.page.getByRole("option", { name: rea_region_eli_text }).click();
  }
  async selectDropdownClinicLocation(rea_location) {
    await this.dropdownClinicLocation.click();
    await this.page.getByRole("option", { name: rea_location, exact: true}).click();
  }
  async selectDropdownClinicType(rea_clinic_type) {
    await this.dropdownClinicType.click();
    await this.page.getByRole("option", { name: rea_clinic_type }).click();
  }
  async clickOnNextAvailableAppButton() {
    await this.btnNextAvailableApp.click();
  }
  async selectDropdownSpecility(rea_special) {
    await this.dropdownspecility.click();
    await this.page.getByRole("option", { name: rea_special }).click();
  }

  async SelectDate(rea_date) {
    const months = ["January","February","March","April","May","June","July","August",'Sep','Oct','Nov','Dec'];
    const values = rea_date.split('/');
    const date = new Date(values[2],values[1]-1,values[0]);
    let day = date.getDate()
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    await this.page.getByRole('button', { name: 'calendar view is open, switch to year view' }).click()
    await this.page.getByRole('radio', { name: year }).click()
    await this.page.getByRole('radio', { name: month }).click()
   // await this.page.getByLabel(month, { exact: true }).click()
    await this.page.getByRole('gridcell', { name: day }).click()
  }

  async RescheduleSelectDate(rea_date) {
   // const months = ["January","February","March","April","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];
    const months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
    const values = rea_date.split('/');
    const date = new Date(values[2],values[1]-1,values[0]);
    let day = date.getDate()
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    await this.page.getByRole('button', { name: 'calendar view is open, switch to year view' }).click()
    await this.page.getByRole('radio', { name: year }).click()
    await this.page.getByLabel(month, { exact: true }).click()
    await this.page.getByRole('gridcell', { name: day }).click()
  }

  async selecLinks() {
    const alltext = await this.AllLinks.count();
    console.log(alltext);
    for (let i = 0; i < alltext.length; i++) {
      //console.log(this.alltext[i]);
      const test = alltext[i];
      console.log(test);
      // if(this.alltext[i].trim()==='Appointment Reminders')
      // {
      //     console.log("element found in list")
      //     break;
      // }
    }

    // const options= await this.AllLinks
    // console.log("This is testing");
    // const counts=options.counts()
    // console.log(counts);
    // //let linkText=await this.AllLinks;
    // for(let option of options)
    // {
    //     const links=await option.textContent()
    //     console.log(links);
    // }

    // const value=await this.AllLinks
    // for (let i = 0; i < linkCount; i++) {
    //     console.log(value);
    //     await value.click()

    // }

    //const AllLinks=await page.$$("[role='menu'] li")
    //await expect(AllLinks).toHaveCount(14)
    //console.log(AllLinks.lenth);
    // for(let Toplink of AllLinks)
    // {
    //     await Toplink.click()
    //    //const value=await Toplink.textContaint()
    //    //console.log(value.length);
    //   // await Toplink.click()
    // }
  }
}
module.exports = ServiceBookApp;
