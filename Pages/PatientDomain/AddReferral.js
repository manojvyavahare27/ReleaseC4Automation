class AddReferral{
    constructor(page)
    {
        this.page=page
        this.backbuttononaddreferral=page.getByRole('button', { name: 'Back Button' })
        // this.dropdownReceiveReferralDate=page.getByTestId('Received Referral Date').getByPlaceholder('dd/mm/yyyy')
        // this.dropdownApproveReferralDate=page.getByTestId('Approved Referral Date').getByPlaceholder('dd/mm/yyyy')
        // this.dropdowndateofreferral=page.getByTestId('Date of Referral').getByPlaceholder('dd/mm/yyyy')

        this.dropdownReceiveReferralDate=page.getByTestId('Received Referral Date')
        this.dropdownApproveReferralDate=page.getByTestId('Approved Referral Date')
        this.dropdowndateofreferral=page.getByTestId('Date of Referral')

        //this.dropdowntimeofreferral=page.getByTestId('Time of Referral').getByPlaceholder('hh:mm')
        this.dropdowntimeofreferral=page.getByTestId('Time of Referral')
        this.dropdownsourceofreferral=page.locator("xpath=//input[@id='sourceOfReferral']")
                                                          //div[@data-testid='Source of Referral']
        this.dropdownreferraltype=page.locator("xpath=//input[@name='referralType']")
        //this.dropdownreferralreason=page.locator("xpath=//input[@id='referralReasonReferrer']")
        this.dropdownreferralreason=page.locator("xpath=//input[@id='referralReasonReferrer']")
        this.dropdownreferrername=page.getByTestId('Referrer Name').getByRole('button', { name: '​' })
        //this.dropdownmodeofreferral=page.locator("xpath=//div[@id='mui-component-select-modeOfReferral']")
        this.dropdownmodeofreferral=page.locator("xpath=//input[@id='modeOfReferral']")
       //this.txtboxreferringprofessional=page.locator("xpath=//input[@id='referringProfessional']")
       this.txtboxreferringprofessional=page.getByLabel('Referring Professional')
       // this.dropdownservice=page.locator("xpath=//div[@data-testid='Service']")
        this.dropdownservice=page.locator("xpath=//input[@id='service']")
        //this.dropdownclinictype=page.locator("xpath=//div[@data-testid='Clinic Type']")
          this.dropdownclinictype=page.locator("xpath=//input[@id='clinicType']")
        //this.dropdowncliniclocation=page.locator("xpath=//input[@id='clinicLocationReferTo']")
		this.dropdowncliniclocation=page.locator("xpath=//input[@name='clinicLocation']")
        // this.dropdownteam=page.locator("xpath=//div[@data-testid='team']")

         this.dropdownteam=page.locator("xpath=//input[@id='team']")
        this.dropdownpatientcare=page.locator("xpath=//input[@id='patientCareReferTo']")
        
        //this.dropdownpreferrersexforassessment=page.locator("xpath=//div[@data-testid='Preferred Sex for Assessment']")
          this.dropdownpreferrersexforassessment=page.locator("xpath=//input[@id='preferredSexForAssessment']")
        //this.dropdownconsultant=page.locator("xpath=//div[@aria-labelledby='mui-component-select-consultantReferTo']")
         this.dropdownconsultant=page.locator("xpath=//input[@name='consultantReferTo']")
        this.dropdownclinicPriority=page.locator("xpath=//input[@id='clinicalPriority']")
        this.dropdownmethodofarrival=page.locator("xpath=//input[@id='methodOfArrivalOtherDetails']")
        this.dropdowntimeofarrival=page.locator("xpath=//input[@name='timeOfArrival']")
        this.radiobuttonAwaitReferralAcceptance=page.locator("xpath=//input[@value='acceptReferral']")
        this.btnsave=page.getByTestId('Save')
        this.btnBack=page.getByLabel('Back Button')
        //await page.getByLabel('Back Button').click();

    }
    async clickOnBackButton()
    {
        await this.btnBack.click()
    }
    async clickOnSaveButton()
    {
        await this.btnsave.click()
    }
    async clickOnAwaitReferralAcceptance()
    {
        await this.radiobuttonAwaitReferralAcceptance.click()
    }
    async enterTimeOfArrival(ref_time_of_arrival)
    {
        await this.dropdowntimeofarrival.click()
        await this.dropdowntimeofarrival.type(ref_time_of_arrival)
    }
    async selectMethodOfArrival(ref_method_of_arrival)
    {
        await this.dropdownmethodofarrival.click()
        await this.page.getByRole('option', { name: ref_method_of_arrival }).click()
    }
    async selectConsultant()
    {
        await this.dropdownconsultant.click()
        await this.page.getByRole('option', { name: 'Mr Prerelease AutoEst' }).click()
       //await this.page.getByRole('option', { name: 'Dhanashree BATrainer' }).click()
    }
    async selectclinicPriority(ref_cli_priority)
    {
        await this.dropdownclinicPriority.click()
        await this.page.getByRole('option', { name: ref_cli_priority }).click()
    }

    async selectPreferredSexForAssessment(ref_preferred_examiner_sex)
    {
        await this.dropdownpreferrersexforassessment.click()
        await this.page.getByRole('option', { name: ref_preferred_examiner_sex, exact: true }).click()
    }
    async selectPatientcare()
    {
        await this.dropdownpatientcare.click()
        await this.page.getByRole('option', { name: 'Out Patient' }).click()
    }
    
    
    async selectTeam(ref_region_eli_text)

    {
        await this.dropdownteam.click()
        await this.page.getByRole('option', { name: ref_region_eli_text }).click()
       // await this.page.getByRole('option', { name: 'Team 1' }).click()
    }
    async selectClinicLocation(ref_clinic_location)
    {
        await this.dropdowncliniclocation.click()
        await this.page.getByRole('option', { name: ref_clinic_location }).click()
       //await this.page.getByRole('option', { name: 'Cardiology 1' }).click()
    }
    async selectClinicType(ref_clinic_type)
    {
        await this.dropdownclinictype.click()
        await this.page.getByRole('option', { name: ref_clinic_type, exact: true }).click()
    }

    async selectService(cli_name)
    {
        await this.dropdownservice.click()
        await this.page.getByRole('option', { name: cli_name }).click()
        //await this.page.getByRole('option', { name: 'Cardiology' }).click()
    }

    async selectModeOfreferral(ref_referral_mode)
    {
        await this.dropdownmodeofreferral.click()
        await this.page.getByRole('option', { name: ref_referral_mode }).click()
    }
    async enterReferringProfessional()
    {
        await this.txtboxreferringprofessional.type("BA Manoj")
    }
    async selectReferrerName()
    {
        await this.dropdownreferrername.click()
        await this.page.getByRole('option', { name: 'Wednesday Tester' }).first().click()

    }
    async selectReferralReason()
    {
        await this.dropdownreferralreason.click()
        await this.page.getByRole('option', { name: 'In Patient' }).click()
    }
    async selectReferralType(ref_referral_type_eli_text)
    {
        await this.dropdownreferraltype.click()
        await this.page.getByRole('option', { name: ref_referral_type_eli_text }).click()
    }
    async selectSourceOfReferrals()
    {
        await this.dropdownsourceofreferral.click()
        await this.page.getByRole('option', { name: 'Self' }).click()
    }
    async enterTimeOfReferral(ref_time_set)
    {
        await this.dropdowntimeofreferral.click()
        await this.dropdowntimeofreferral.type(ref_time_set)
    }

    async enterDateOfReferral(ref_referral_date)
    {
        await this.dropdowndateofreferral.click()
        await this.dropdowndateofreferral.type(ref_referral_date)
    }
    async enterApproveReferralDate(rtt_referral_approved_date)
    {
        await this.dropdownApproveReferralDate.click()
        await this.dropdownApproveReferralDate.type(rtt_referral_approved_date)
    }
    async enterReceiveReferrldate(rtt_referral_received_date)
    {
        await this.dropdownReceiveReferralDate.click()
        await this.dropdownReceiveReferralDate.type(rtt_referral_received_date)
    }
    async clickOnAddReferralBackButton()
    {
        await this.backbuttononaddreferral.click()
    }
}
module.exports=AddReferral