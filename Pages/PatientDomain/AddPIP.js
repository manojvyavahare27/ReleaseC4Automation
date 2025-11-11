class AddPIP
{
    constructor(page)
    {
        this.page=page
         this.dropdown_PIPTitle=page.locator("xpath=//input[@id='addPipTitle']")
        this.txtbox_PIPFamilyName=page.locator("xpath=//input[@id='addPipFamilyName']")
        this.txtbox_PIPGivenName=page.locator("xpath=//input[@id='addPipGivenName']")
        this.txtbox_PIPMiddleName=page.locator("xpath=//input[@id='addPipMiddleNamePip']")
        this.calender_PIPBornDate=page.locator("xpath=//input[@id='addPipBorn']")
       // this.dropdown_PIPEthnicity=page.locator("xpath=//div[@id='addPipEthnicity']")
        this.dropdown_PIPEthnicity=page.locator("xpath=//input[@id='addPipEthnicity']")
        //this.dropdown_PIPEthnicity=page.locator("xpath=//input[@id='addPipTitle']")
       // this.dropdown_PIPOccupation=page.locator("xpath=//div[@id='addPipOccupation']")
        this.dropdown_PIPOccupation=page.locator("xpath=//input[@id='addPipOccupation']")
        // this.txtbox_PIPMobile=page.locator("xpath=//input[@data-testid='Mobile']")
        // this.txtbox_PIPEmail=page.locator("xpath=//input[@data-testid='Email']")
        this.txtbox_PIPMobile=page.getByTestId('Mobile')
        this.txtbox_PIPEmail=page.getByTestId('Email')
       // this.dropdown_PIPRelation=page.locator("xpath=//div[@id='addPipRelationship']")    
        this.dropdown_PIPRelation=page.locator("xpath=//input[@id='addPipRelationship']")                                 
       // this.dropdownPIPNextOfkin=page.locator("xpath=//div[@id='addPipNextOfKin']")
        this.dropdownPIPNextOfkin=page.locator("xpath=//input[@id='addPipNextOfKin']")
        this.chiNumber=page.locator("xpath=//input[@id='CHI Number']")
		
       // this.dropdownPIPFamilyAwareOfIllness=page.locator("xpath=//div[@id='addPipFamilyAwareOfIllness']")
         this.dropdownPIPFamilyAwareOfIllness=page.locator("xpath=//input[@id='addPipFamilyAwareOfIllness']")
       // this.dropdownPIPIdentifierType=page.locator("xpath=//div[@id='addPipIdentifierType']")
        this.dropdownPIPIdentifierType=page.locator("xpath=//input[@id='addPipIdentifierType']")
        // this.txtboxPIPIdentifier=page.locator("xpath=//input[@name='identifierNumber']")		
        //  this.txtbox_PIPEnternalProf=page.locator("xpath=//div[@data-testid='externalProfessional']")
          this.txtboxPIPIdentifier=page.getByTestId('Identifier')
        this.txtbox_PIPEnternalProf=page.getByTestId('externalProfessional').getByLabel('External Professional')
        this.txtbox_PIPProfessionalTitle=page.locator("xpath=//input[@data-testid='Professional Title']")
        //this.dropdown_PIPReceivePatientLetter=page.locator("xpath=//div[@id='addPipReceivePatientLetter']")
       this.dropdown_PIPReceivePatientLetter=page.locator("xpath=//input[@id='addPipReceivePatientLetter']")
       this.dropdown_PIPReceiveAppointmentLtr=page.locator("xpath=//input[@id='addPipReceiveAppointmentLetters']")
       // this.dropdown_PIPReceiveAppointmentLtr=page.locator("xpath=//div[@id='addPipReceiveAppointmentLetters']")
        //this.dropdown_PIPPrintPartnerdetailsOnReg=page.getByTestId('Print Partner Details On Birth Registration Form').getByRole('button', { name: 'No' })
        //this.dropdown_PIPPrintPartnerdetailsOnReg=page.locator("xpath=//div[@id='addPipPartnerDetailsOnBirth']")
        this.dropdown_PIPPrintPartnerdetailsOnReg=page.locator("xpath=//input[@id='addPipPartnerDetailsOnBirth']")
        this.chkbox_SendPatientTextEmail=page.getByRole('checkbox', { name: 'Send Patient Text/Email' })
        this.chkbox_PIPIsReferrer=page.getByRole('checkbox', { name: 'Is Referrer' })
        this.txtbox_PIPNotes=page.getByLabel('Notes', { exact: true })

        this.chkbox_AssistingInPartner=page.getByRole('checkbox', { name: 'Assisting in partner\'s care and treatments' })
        this.chkbox_HelpingPatients=page.getByRole('checkbox', { name: 'Helping patients and their families understanding the process' })
        this.chkbox_BeingPhotographed=page.getByRole('checkbox', { name: 'Being photographed or videoed for on-going training and teaching purposes' })
        this.chkbox_GeneralPublicity=page.getByRole('checkbox', { name: 'For use on the Automation Est website and general publicity' })
        this.btnSavePIP=page.getByTestId('Save')

    }
    async ClickOnSavePIP()
    {
        await this.btnSavePIP.click()
    }
    async checkGeneralPublicity()
    {
        await this.chkbox_GeneralPublicity.click()
    }
    async checkBeingPhotographed()
    {
        await this.chkbox_BeingPhotographed.click()
    }
    async checkHelpingPatients()
    {
        await this.chkbox_HelpingPatients.click()
    }
    async checkcAssistingInPartner()
    {
        await this.chkbox_AssistingInPartner.click()
    }
    async enterPIPNotes(pip_notes)
    {
        await this.txtbox_PIPNotes.type(pip_notes)
    }
    async checkIsReferrer()
    {
        await this.chkbox_PIPIsReferrer.click()
    }
    async checkSendPatientTextEmail(pip_send_txt_email_yes)
    {
        await this.chkbox_SendPatientTextEmail.click()
       // await this.page.getByRole('option',{ name: pip_send_txt_email_yes}).click()
    }
    async selectPIPPartnerDetailsOnRegForm()
    {
        await this.dropdown_PIPPrintPartnerdetailsOnReg.click()
        //await this.page.getByRole('option', { name: 'No' }).click()
    }
    async selectPIPReceiveAppointmentLetter(pip_receive_pat_appt_letter_no)
    {
        await this.dropdown_PIPReceiveAppointmentLtr.click()
        await this.page.getByRole('option', { name: pip_receive_pat_appt_letter_no }).click()
    }
    async selectPIPReceivePatientLetter(pip_receive_patient_letter_no)
    {
        await this.dropdown_PIPReceivePatientLetter.click()
        await this.page.getByRole('option', { name: pip_receive_patient_letter_no }).click()
    }
    async enterProfessionalTitle(pip_professional_title)
    {
        await this.txtbox_PIPProfessionalTitle.type(pip_professional_title)
    }

    async enterExternalProfessional(name)
    {
        await this.txtbox_PIPEnternalProf.type(name)
    }
    async enterPIPIdentifier(pip_identifier_number)
    {
        await this.txtboxPIPIdentifier.type(pip_identifier_number)
    }
    async selectPIPIdentifierType(pip_identifier_type)
    {
        await this.dropdownPIPIdentifierType.click()
       await this.page.getByRole('option', { name: pip_identifier_type }).click()
    }
    async enterCHInumber(pip_identifier_type)
    {
        await this.chiNumber.type(pip_identifier_type)
    }

    async SelectPIPFamilyAwareOfIllness(pip_family_aware_illness_yes)
    {
        await this.dropdownPIPFamilyAwareOfIllness.click()
        await this.page.getByRole('option', { name: pip_family_aware_illness_yes }).click()
    }

    async selectPIPNextOfKin(pip_next_of_kin_Yes)
    {
        await this.dropdownPIPNextOfkin.click()
        await this.page.getByRole('option', { name: pip_next_of_kin_Yes }).click()
    }
    async selectPIPRelation(pip_relationship)
    {
        await this.dropdown_PIPRelation.click()
        await this.page.getByRole('option', { name: pip_relationship }).click()
    }
    async enterPIPEmailId(name)
    {
        await this.txtbox_PIPEmail.type(name)
    }
    async enterPIPMobileNumber(name)
    {
        await this.txtbox_PIPMobile.type(name)
    }
    async selectPIPOccupation()
    {
        await this.dropdown_PIPOccupation.click()
        await this.page.getByRole('option', { name: 'Trainer', exact: true }).click()
    }
    async selecrPIPEthnicity(pip_ethnicity_text)
    {
        await this.dropdown_PIPEthnicity.click()
        await this.page.getByRole('option', { name: pip_ethnicity_text, exact: true }).click()
    }
    async selectPIPBornDate(pip_dob)
    {
        await this.calender_PIPBornDate.click()
        await this.calender_PIPBornDate.type(pip_dob)
    }
    async enterPIPMiddleName(pip_middlename)
    {
        await this.txtbox_PIPMiddleName.type(pip_middlename)
    }
    async enterPIPGivenName(pip_surname)
    {
        await this.txtbox_PIPGivenName.type(pip_surname)
    }
    async enterPIPFamilyName(pip_firstname)
    {
        await this.txtbox_PIPFamilyName.type(pip_firstname)
    }
    async selectPIPTitle(pip_title)
    {
        await this.dropdown_PIPTitle.click()
        await this.page.getByRole('option', { name: pip_title, exact: true }).click()
    }
}
module.exports=AddPIP