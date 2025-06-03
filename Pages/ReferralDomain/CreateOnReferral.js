class CreateOnReferral
{
    constructor(page)
    {
        this.page=page
        this.mainlinks=page.getByTestId('Links')
        this.dropdownConsultant=page.getByTestId('Consultant').getByLabel('​', { exact: true })
        this.txtboxDateOfReferral=page.getByPlaceholder('dd/mm/yyyy')
        this.dropdownReferralReason=page.getByTestId('referralReason').getByLabel('Open')
        this.dropdownService=page.getByLabel('​', { exact: true })
        this.btnContinue=page.getByTestId('Continue')

        // Add Referral
        this.dropdownClinicType=page.getByTestId('Clinic Type').getByLabel('​', { exact: true })
        this.dropdownClinicLocation=page.getByTestId('clinicLocation').getByLabel('Open')
        this.dropdownTeams=page.getByTestId('team').getByLabel('Open')
        this.dropdownHealthcareProfessional=page.getByTestId('healthCareProf').getByLabel('Open')
        this.dropdownPatientType=page.getByTestId('Patient Type').getByLabel('​', { exact: true })
        this.dropdownPatientCare=page.getByTestId('patientCare').getByLabel('Open')
        this.dropdownConsultant1=page.locator('#mui-component-select-consultantReferTo')

        this.linkAddTriageAssessment=page.getByText('Add', { exact: true })//getByTestId('Add Triage Assessment')
        this.dropdownselectAssessment=page.getByTestId('assessment').getByLabel('Open')
        this.closeSelectAssessmentPopupbtn=page.getByLabel('cancelIcon')
        this.txtboxaddReferralNotes=page.locator('#notesReferralLetter0')
        this.txtboxaddNotes=page.locator('textarea[name="notes"]')
        this.btnAdd=page.getByTestId('Add')
        this.rejectLink=page.getByRole('row', { name: '01/01/2024 787674 B/O LinuxA Riomedtest HP Region1 Cardio Location Cardiology - messages document Add 10749clinicalPriority Accept Reject bookAppointment inviteSentSuccessfully addedToWaitingList awaiting acceptance - Completely Reject -' }).getByTestId('Reject')
                            // getByRole('row', { name: '01/01/2024 787674 B/O LinuxA Riomedtest HP Region1 Cardio Location Cardiology - messages document Add 10731clinicalPriority Accept Reject bookAppointment inviteSentSuccessfully addedToWaitingList awaiting acceptance - Completely Reject -' }).getByTestId('Reject')  
        this.txtboxRejectRason=page.getByTestId('Reason')
        this.btnRejectOnPopUp=page.getByTestId('CommonCellmaPopup').getByTestId('Reject')

    }   
    async clickOnRejectReasonButton()
    {
        await this.btnRejectOnPopUp.click()
    }
    async enterRejectReason()
    {
        await this.txtboxRejectRason.fill('For testing')
    }

    async clickOnRejectLink()
    {
        await this.rejectLink.click()
    }
    async clickOnAddButton()
    {
        await this.btnAdd.click()
    }
    async addNotes()
    {
        await this.txtboxaddNotes.fill('Added main notes for testing')
    }

    async addReferralNotes()
    {
        await this.txtboxaddReferralNotes.fill('Added for testing')
    }
    async closeSelectAssessmentPopup()
    {
        await this.closeSelectAssessmentPopupbtn.click()
    }
    async selectAssessmentFromDropdown()
    {
        await this.dropdownselectAssessment.click()
        await this.page.getByRole('option', { name: 'Triage Assessment' }).click()
    }
    async clickOnAddTriageAssessmentLink()
    {
        await this.linkAddTriageAssessment.click()
    }

    async selectConsultant()
    {
        await this.dropdownConsultant1.click()
        await this.page.getByRole('option', { name: 'Mr Prerelease AutoEst' }).click()
    }
    async selectPatientCare()
    {
        await this.dropdownPatientCare.click()
        await this.page.getByRole('option', { name: 'In Patient' }).click()
    }
    async selectPatientType()
    {
        await this.dropdownPatientType.click()
        await this.page.getByRole('option', { name: 'Regular' }).click()
    }
    async selectHealthcareProfessional()
    {
        await this.dropdownHealthcareProfessional.click()
        await this.page.getByRole('option', { name: 'Mr Prerelease AutoEst' }).click()
    }
    async selectTeams()
    {
        await this.dropdownTeams.click()
        await this.page.getByRole('option', { name: 'HP Region1' }).click()
    }
    async selectClinicLocation()
    {
        await this.dropdownClinicLocation.click()
        await this.page.getByRole('option', { name: 'Cardio Location' }).click()
    }
    

    async selectClinicType()
    {
        await this.dropdownClinicType.click()
        await this.page.getByRole('option', { name: 'Cardiology' }).click()
    }

    async clickOnContinueButton()
    {
        await this.btnContinue.click()
    }
    async selectServiceDropdown()
    {
        await this.dropdownService.click()
        await this.page.getByRole('option', { name: 'General Medicine Automation' }).click()
    }
    async selectReferralReason()
    {
        await this.dropdownReferralReason.click()
        await this.page.getByRole('option', { name: 'In Patient' }).click()
    }

    async enterDateOfReferral()
    {
        await this.txtboxDateOfReferral.fill('01/01/2024')
    }
    async selectConsultantdropdown()
    {
        await this.dropdownConsultant.click()
        await this.page.getByRole('option', { name: 'Mr Prerelease AutoEst' }).click()
    }
    
}
module.exports=CreateOnReferral