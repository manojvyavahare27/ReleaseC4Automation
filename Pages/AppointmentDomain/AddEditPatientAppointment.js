const { expect } = require("@playwright/test")

class AddEditPatientAppointment
{
    //const AllLink;
    constructor(page)
    {
        this.page=page
        //Close Pop up
        this.closePopup=page.getByLabel('cancelIcon')
        this.btnback=page.getByLabel('Back Button')
        this.dropdownTypeOfAppointment=page.locator("xpath=//input[@id='typeOfAppointment']")
        this.dropdownwithHealthPrefessional=page.locator("//input[@id='withHealthProfessional']")
        this.dropdownCosultant=page.locator("//input[@id='consultant']")
        this.dropdownAppDuration=page.locator("//input[@id='appointmentDuration']")
        this.linkCheckAppointment=page.getByTestId('Check Appointment')
        this.linkTime=page.getByPlaceholder('hh:mm')
                           //getByPlaceholder('hh:mm')
        this.btnCancelPopupIcon=page.getByLabel('cancelIcon')
        this.selectRescheduleDate=page.getByPlaceholder('dd/mm/yyyy')


        this.dropdownAppReview=page.locator("//input[@id='appointmentReview']")
        this.dropdownAppNotes=page.locator("//input[@id='Notes']")
        this.btnSaveRescheduledApp=page.getByTestId('Save')
    }
    async clickOnSaveButton()
    {
      await this.btnSaveRescheduledApp.click()
    }

    async selectResonforReviewAppointment(rea_review_reason)
    {
      await this.dropdownAppReview.click()
      await this.page.getByRole('option', { name: rea_review_reason }).click()
    }
    async enterRescheduleTime(rea_edited_time)
    {
      await this.linkTime.type(rea_edited_time)
    }
    async clickOnRescheduleDate(rea_edited_date)
    {
      await this.selectRescheduleDate.type(rea_edited_date)
    }
    async clickOnCancelPopupIcon()
    {
      await this.btnCancelPopupIcon.click()
    }
    async selectTypeOfAppointment()
     {
        await this.dropdownTypeOfAppointment.click()
     }   
     async selectHealtProfessional()
     {
        await this.dropdownwithHealthPrefessional.click()
        await this.page.getByRole('option', { name: 'Mr Manoj Vyavahare' }).click()
     }
     async selectConsultant()
     {
        await this.dropdownCosultant.click()
        await this.page.getByRole('option', { name: 'Mr Manoj Tester' }).click()
     }
     async selectAppointmentDuration(rea_duration)
     {
        await this.dropdownAppDuration.click()
        await this.page.getByRole('option', { name: rea_duration + ' minutes', exact: true }).click()
     }
     async ClickOnLinkCheckAppdate()
     {
        await this.linkCheckAppointment.click()
        //await this.page.getByLabel('Choose date, selected date is Dec 01, 2023').click()
        //await this.page.getByRole('gridcell', { name: '01' }).click()        
     }
     async changeTime()
     {
      await this.linkTime.click()
      await this.linkTime.type("07:45")
     }

    async clickOnBackButton()
    {
        await this.btnback.click()
    }
}
module.exports=AddEditPatientAppointment
