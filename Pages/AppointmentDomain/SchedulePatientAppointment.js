const { expect } = require("@playwright/test")

class ServiceBookApp
{
    //const AllLink;
    constructor(page)
    {
        this.page=page
        //Close Pop up
        this.closePopup=page.getByLabel('cancelIcon')

        //Links
        this.linksLink=page.getByTestId('Links')
        this.linkAddAppointment=page.getByRole('heading', { name: 'Add Appointment' })
        this.linkAddProvisionalAppointment=page.getByRole('heading', { name: 'Add Provisional Appointment' })
        this.linkAssessment=page.getByRole('heading', { name: 'Assessment' })
        this.linkReSchedule=page.getByTestId('Rescheduled')
        this.dropdownReasonforRescheduling=page.getByLabel('Open')
        this.buttonSaveReschedulingStatus=page.locator("xpath=//button[@data-testid='saveAppointmentStatus']")
        this.buttonCancelReschedulingConfirmation=page.getByRole('button', { name: 'Cancel', exact: true })
        this.buttonProceedReschedulingConfirmation=page.getByTestId('Proceed')
        this.linkAttended=page.getByTestId('attended')
        this.linkCancel=page.getByRole('heading', { name: 'Cancel' })
        this.linkConsent=page.getByRole('heading', { name: 'Consent' })
        this.linkDidNotAttended=page.getByRole('heading', { name: 'Did Not Attended' })
        this.linkHistory=page.getByRole('heading', { name: 'History' })
        this.linkLetter=page.getByRole('heading', { name: 'Letters' })
        this.linkPatientRTT=page.getByRole('heading', { name: 'Patient RTT' })
        this.linkPIPLabel=page.getByRole('heading', { name: 'PIP Label' })
        this.linkReferral=page.getByRole('heading', { name: 'Referral' })
        this.linkRefresh=page.getByRole('heading', { name: 'Refresh' })
        this.linkSchedule=page.getByRole('heading', { name: 'Schedule' })
        this.linkServiceApp=page.getByRole('heading', { name: 'Service Appointments' })
        this.linkWaitNotSeen=page.getByRole('heading', { name: 'Waited Not Seen' })  
        
        //Change Appointment Type:
        this.linkAppType=page.locator("xpath=//a[@data-testid='Appointment Type']")
        this.btncloseAppTypePopup=page.getByLabel('cancelIcon')
        this.dropdownAppType=page.getByLabel('Open')
        this.btnChange=page.getByTestId('Change')

        //Change Appointment Status
        this.linkAppStautsSchedule=page.getByTestId('Status')

        //Click On Date
        this.Datelink=page.getByTestId('Date')
        this.btnCancel=page.getByTestId('Cancel')
        this.dropdownAppCalcelReason=page.getByLabel('Please enter reason for appointment cancellation *')
        this.btnSaveCancelApp=page.locator("xpath=//button[@data-testid='saveAppointmentStatus']")

        //change Status
        this.btnWaiting=page.getByTestId('Waiting') 
        this.btnWaitingNotSeen=page.getByTestId('Waited Not Seen')   

    }

    //Click on Status
    async clickOnWaitingNotSeenButton()
    {
        await this.btnWaitingNotSeen.click()
    }
    async clickOnWaitingButton()
    {
        await this.btnWaiting.click()
    }

    //Click on Date Link
    async clickOnDateLink()
    {
        await this.Datelink.click()
    }
    async clickOnCancelButton()
    {
        await this.btnCancel.click()
    }
    async selectAppCancellationReason(rea_cancelled_reason)
    {
        await this.dropdownAppCalcelReason.click()
        await this.page.getByRole('option', { name: rea_cancelled_reason }).click()

    }

    //Change Appointment Status

    async clickOnSaveCancelledAppButton()
    {
        await this.btnSaveCancelApp.click()
    }
    async clickOnSaveButton()
    {
        await this.btnSaveCancelApp.click()
    }
    async clickOnAppScheduleStatus()
    {
        await this.linkAppStautsSchedule.click()
    }
    async clickOnReScheduleAppButton()
    {
        await this.linkReSchedule.click()
    }
    async selectDropdownReasonForRescheduling()
    {
        await this.dropdownReasonforRescheduling.click()
        await this.page.getByRole('option', { name: 'App Cancel for Testing Reason' }).click()
    }
    async clickOnSaveReschedulingReason()
    {
        await this.buttonSaveReschedulingStatus.click()
    }
    async clickOnCancelReschedulingConfirmation()
    {
        await this.buttonCancelReschedulingConfirmation.click()
    }
    async clickOnPreceedReschedulingConfirmation()
    {
        await this.buttonProceedReschedulingConfirmation.click()
    }
    //Change Appointment Type
   
    async clickOnChangeButton()
    {
        await this.btnChange.click()
    }
    async selectAppTypeDropdown()
    {
        await this.dropdownAppType.click()
        await this.page.getByRole('option', { name: 'Emergency' }).click()

    }
    async clickOnCloseAppTypePopup()
    {
        await this.btncloseAppTypePopup.click()
    }
    async ClickonAppTypeLink()
    {
        await this.linkAppType.click()
    }

    async clickonChangeAppType()
    {
        this.linkAddAppointment.click()
    }
    async closePopUpWindow()
    {
        await this.closePopup.click()
    }
    async clickOnLinksMenu()
    {
        await this.linksLink.click()
    }   
    
    async clickOnAddAppointmentLink()
    {
        await this.linkAddAppointment.click()
    }
    async clickOnAddProvisionalApp()
    {
        await this.linkAddProvisionalAppointment.click()
    }
    async clickOnAddAssessment()
    {
        await this.linkAssessment.click()
    }
    async clickOnAddAttended()
    {
        await this.linkAttended.click()
    }
    async clickOnCancel()
    {
        await this.linkCancel.click()
    }
    async clickOnConsent()
    {
        await this.linkConsent.click()
    }
    async clickOnDidNotAttenede()
    {
        await this.linkDidNotAttended.click()
    }
    async clickOnHistory()
    {
        await this.linkHistory.click()
    }
    async clickOnLetter()
    {
        await this.linkLetter.click()
    }
    async clickOnPatientRTT()
    {
        await this.linkPatientRTT.click()
    }
    async clickOnPIPLabel()
    {
        await this.linkPIPLabel.click()
    }
    async clickOnReferral()
    {
        await this.linkReferral.click()
    }
    async clickonRefresh()
    {
        await this.linkRefresh.click()
    }
    async clickOnSchedule()
    {
        await this.linkSchedule.click()
    }
    async clickonServiceApp()
    {
        await this.linkServiceApp.click()
    }
    async clickOnWaitNotSeen()
    {
        await this.linkWaitNotSeen.click()
    }
        
    // async clickonLinks()
    // {
    //     const links= page.locator("xpath=//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']")
    //     // elements = page.locator("xpath=//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']")
    //     //  link_number = elements.count()  
    //     // if (link_number>0){
    //     // elements.first.click()
    //     // }
    // }
}
module.exports=ServiceBookApp