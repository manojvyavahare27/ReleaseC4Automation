class ProvisionalAppointment
{
    constructor(page)
    {
        this.page=page
        //this.SearchBtn=page.getByTestId('Search')
        this.SearchBtn=page.locator("xpath=//button[@data-testid='Search']")
        this.ClearBtn=page.getByTestId('Clear')
        this.AllLinks=page.getByTestId('Links')
        this.linkAddProvisionalApp=page.getByRole('heading', { name: 'Add Provisional Appointment' })

        //Add Provisional Appointment Pop up
        this.dropdownAppType=page.getByTestId('CommonCellmaPopup').getByTestId('appointmentType').getByLabel('Open')
        this.dropdownService=page.getByTestId('service').getByLabel('Open')
        this.dropdownSpecility=page.getByTestId('specialty').getByLabel('Open')
        this.dropdownClinicType=page.getByTestId('CommonCellmaPopup').getByTestId('clinicType').getByLabel('Open')
        this.dropdownClinicLocation=page.getByTestId('clinicLocation').getByLabel('Open')
        this.dropdownTeams=page.getByTestId('teams').getByLabel('Open')
        this.txtboxAppDate=page.getByTestId('Appointment Date')
        this.txtAppconfirmStartDate=page.getByTestId('Appointment Confirmation Start Date')
        this.txtAppconfirmEndDate=page.getByTestId('Appointment Confirmation End Date')
        this.dropdownReasonForApp=page.getByTestId('reasonForAppointment').getByLabel('Open')
        this.txtboxNotes=page.getByTestId('Notes')
        this.btnSaveProvisionalApp=page.getByTestId('Save')        
        
    }
    //Add Provisional Appointment Pop up
    async enterNotes(notes)
    {
        await this.txtboxNotes.fill(notes)
    }
    async selectReasonforApp()
    {
        await this.dropdownReasonForApp.click()
        await this.page.getByRole('option', { name: 'Appointment Reason for Testing' }).click()
    }
    async enterAppconfirmEndDate(AppointmentConfirmationEndDate)
    {
        await this.txtAppconfirmEndDate.click()
        await this.txtAppconfirmEndDate.fill(AppointmentConfirmationEndDate)
    }
    async enterConfirmStartDate(AppointmentConfirmationStartDate)
    {
        await this.txtAppconfirmStartDate.click()
        await this.txtAppconfirmStartDate.fill(AppointmentConfirmationStartDate)
    }
    async enterAppDate(AppointmentDate)
    {
        
        await this.txtboxAppDate.click()
        await this.txtboxAppDate.fill(AppointmentDate)
    }
    async selectTeams(teams)
    {
        await this.dropdownTeams.click()
        await this.page.getByRole('option', { name: teams }).click()
    }
    async selectClinicLocation(clinicLocation)
    {
        await this.dropdownClinicLocation.click()
        await this.page.getByRole('option', { name: clinicLocation }).click()
    }
    async selectClinicType(clinicType)
    {
        await this.dropdownClinicType.click()
        await this.page.getByRole('option', { name: clinicType }).click()
    }
    async selectSpeciality(specialty)
    {
        await this.dropdownSpecility.click()
        await this.page.getByRole('option', { name: specialty }).click()
    }
    async selectAppType(appType)
    {
        await this.dropdownAppType.click()
        await this.page.getByRole('option', { name: appType, exact: true }).click()
    }
    async clickOnSaveProvisionalApp()
    {
        await this.btnSaveProvisionalApp.click()
    }
    //Links
    async clickOnProvisionalApp()
    {
        await this.linkAddProvisionalApp.click()
    }
    async clickOnAllLinks()
    {
        await this.AllLinks.click()
    }
    async clickOnSearchBtn()
    {
        await this.SearchBtn.click()
    }
}
module.exports=ProvisionalAppointment