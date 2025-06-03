class PatientSideBar{
    constructor(page)
    {
        this.page=page
        //sidebar Patient
        this.iconCloseMenu=page.getByRole('button', { name: 'Close Menu' })
        this.sidebarPatientlink=page.getByTestId('Patient')
        this.sidebarLabellink=page.getByTestId('Labels')
        this.sidebarInsurancelink=page.getByRole('button', { name: 'Insurance' })       
        this.sidebarClosePopupbtn=page.getByTestId('CancelIcon')                                                
        this.sidebarDuplicatelink=page.getByTestId('Duplicate Check')
        this.sidebarGPlink=page.getByTestId('GP')
        this.sidebarInterestedPartylink=page.getByTestId('Interested Party')

        //Sidebar Consent
        this.sidebarConsentlink=page.getByTestId('Consent')
        this.sidebarAddconsentlink=page.getByTestId('Add Concent')
        this.sidebarViewConsentlink=page.getByTestId('View Concent')

        //Sidebar Appointment
        this.sidebarAppointmentlink=page.getByRole('button', { name: 'Appointment Image Avatar Appointments' })
        this.sidebarAddAppointmentlink=page.getByTestId('Add Appointment')
        this.sidebarViewAppointmentlink=page.getByTestId('View Appointment')

        //Sidebar Referral
        this.sidebarReferrallink=page.getByRole('button', { name: 'Referrals Image Avatar Referral' })
        this.sidebarAddReferrallink=page.getByTestId('Add Referral')
        this.sidebarViewReferrallink=page.getByTestId('View Referral')

        //PatientSummary
        this.Lettercategory=page.locator("xpath=//h1[normalize-space()='Letters']")

    }

    //Patient summary
    async clickOnLettersCategory()
    {
        await this.Lettercategory.click()
    }
    async clickOnViewReferralLink()
    {
        await this.sidebarViewReferrallink.click()
    }
    async clickOnAddReferralLink()
    {
        await this.sidebarAddReferrallink.click()
    }
    async clickOnreferrallink()
    {
        await this.sidebarReferrallink.click()
    }
    async clickOnViewAppointmentlink()
    {
        await this.sidebarViewAppointmentlink.click()
    }
    async clickOnAddAppointmentlink()
    {
        await this.sidebarAddAppointmentlink.click()
    }
    async clickOnAppointmentlink()
    {
        await this.sidebarAppointmentlink.click()
    }
    async clickOnViewConsentlink()
    {
        await this.sidebarViewConsentlink.click()
    }
    async clickOnAddConsentlink()
    {
        await this.sidebarAddconsentlink.click()
    }
    async clickOnconsentSidebar()
    {
        await this.sidebarConsentlink.click()
    }
    async clickOnInterestedPartySidebar()
    {
        await this.sidebarInterestedPartylink.click()
    }
    async clickOnGpSidebar()
    {
        await this.sidebarGPlink.click()
    }
    async clickOnDuplicatelinkSidebar()
    {
        await this.sidebarDuplicatelink.click()
    }
    async closePopupOfSidebar()
    {
        await this.sidebarClosePopupbtn.click()
    }
    // async closeInsurancePopup()
    // {
    //     await this.sidebarInsuranceClosePopupbtn.click()
    // }
    async clickOnInsurancelink()
    {
        await this.sidebarInsurancelink.click()
    }
    
    async clickOnLabellink()
    {
        await this.sidebarLabellink.click()
    }
    async clickOnPatientSidebar()
    {
        await this.sidebarPatientlink.click()
    }
    async clickOnCloseMenu()
    {
        await this.iconCloseMenu.click()
    }
}
module.exports=PatientSideBar