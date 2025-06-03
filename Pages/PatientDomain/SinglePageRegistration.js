class SinglePageRegistration
{
    constructor(page)
    {
        this.page=page
        this.dropdown_marritalStatus=page.locator("xpath=//div[@aria-labelledby='mui-component-select-maritalStatus']")
        this.dropdown_Religion=page.locator("xpath=//div[@aria-labelledby='mui-component-select-religion']")
        this.dropdown_SourceOfReferral=page.locator("xpath=//div[@aria-labelledby='mui-component-select-sourceOfReferral']")
        this.dropdown_SelectService=page.locator("xpath=//div[@aria-labelledby='mui-component-select-service']")
        this.dropdown_ServiceLocation=page.locator("xpath=//div[@aria-labelledby='mui-component-select-serviceLocation']")
        this.dropdown_ServiceType=page.locator("xpath=//div[@aria-labelledby='mui-component-select-serviceType']")
        this.dropdown_Consultant=page.locator("xpath=//div[@aria-labelledby='mui-component-select-consultant']")
        this.dropdown_PatientType=page.locator("xpath=//div[@aria-labelledby='mui-component-select-patientType']")
        this.dropdown_AppointmentType=page.locator("xpath=//div[@aria-labelledby='mui-component-select-appointmentType']")
        this.dropdown_MethodOfArrival=page.locator("xpath=//div[@aria-labelledby='mui-component-select-methodOfArrival']")
        this.dropdown_CountyOfBirth=page.locator("xpath=//div[@aria-labelledby='mui-component-select-countryOfBirth']")
        this.dropdown_ReferralReason=page.locator("xpath=//div[@aria-labelledby='mui-component-select-referralReason']")
        this.dropdown_Language=page.locator("xpath=//div[@aria-labelledby='mui-component-select-language']")
        this.dropdown_Ethnicity=page.locator("xpath=//div[@aria-labelledby='mui-component-select-ethnicity']")
        this.dropdown_Occupation=page.locator("xpath=//div[@aria-labelledby='mui-component-select-occupation']")
        this.dropdown_Nationality=page.locator("xpath=//div[@aria-labelledby='mui-component-select-nationality']")
        this.txtbox_RoadAndNo=page.getByTestId('Number & Road')
        this.txtbox_Town=page.locator("xpath=//input[@aria-label='Town']")
        this.txtbox_District=page.locator("xpath=//input[@aria-label='District']")
        this.txtbox_County=page.locator("xpath=//input[@aria-label='County']")
        this.txtbox_Postcode=page.locator("xpath=//input[@aria-label='Postcode']")
        this.txtbox_Country=page.getByTestId('Country')
        this.dropdown_PrimaryDisablity=page.getByTestId('Primary Disability').getByRole('button', { name: '​' })
        this.btn_Save=page.getByTestId('Save')

    }
    async selectPrimaryDisablity()
    {
        await this.dropdown_PrimaryDisablity.click()
        await this.page.getByRole('option', { name: 'Arthritis' }).getByRole('checkbox').click()
    }
    async clickOnSavebtn()
    {
        await this.btn_Save.click()
    }
   
    async enterRoadAndNo(add_address1)
    {
      await this.txtbox_RoadAndNo.type(add_address1)
    }    
    async enterTown(add_address3)
    {
        await this.txtbox_Town.type(add_address3)
    }
    async enterDistrict(add_address2)
    {
        await this.txtbox_District.type(add_address2)
    }
    async enterCounty(add_address4)
    {
        await this.txtbox_County.type(add_address4)
    }
    async enterPostCode(add_address5)
    {
        await this.txtbox_Postcode.type(add_address5)
    }
    async enterCountry(add_address6)
    {
        await this.txtbox_Country.type(add_address6)
    }

    async selectNationality(pat_nationality)
    {
        await this.dropdown_Nationality.click()
        await this.page.getByRole('option', { name: pat_nationality }).click()
    }
    async selectOccupation(pat_occupation)
    {
        await this.dropdown_Occupation.click()
        await this.page.getByRole('option', { name: pat_occupation, exact: true }).click()
    }
    async selectEthnicity(pat_ethnicity_text)
    {
        await this.dropdown_Ethnicity.click()
        await this.page.getByRole('option', { name: pat_ethnicity_text, exact: true }).click()
    }
    async selectLanguage(pat_language)
    {
        await this.dropdown_Language.click()
        await this.page.getByRole('option', { name: pat_language }).click()
    }
    async selectReferralReason(ReferralReason)
    {
        await this.dropdown_ReferralReason.click()
        await this.page.getByRole('option', { name: ReferralReason }).click()
        //await this.page.getByRole('option', { name: 'Need Advice' }).click()
    }
    async selectMethodOfArrival(ref_method_of_arrival)
    {
        await this.dropdown_MethodOfArrival.click()
        await this.page.getByRole('option', { name: ref_method_of_arrival }).click()
    }
    async SelectCountryOfBirth(pat_country_of_birth)
    {
        await this.dropdown_CountyOfBirth.click()
        await this.page.getByRole('option', { name: pat_country_of_birth, exact: true }).click()
    }
    async selectAppointmentType()
    {
        await this.dropdown_AppointmentType.click()
        await this.page.getByRole('option', { name: 'Vaccine 1st dose', exact: true }).click()
    }
    async selectPatientType(pat_type)
    {
        await this.dropdown_PatientType.click()
        await this.page.getByRole('option', { name: pat_type, exact: true }).click()
    }
    async selectConsultant()
    {
        await this.dropdown_Consultant.click()
        await this.page.getByRole('option', { name: 'Mr Prerelease AutoEst' }).click()
    }
    async SelectServiceType()
    {
        await this.dropdown_ServiceType.click()
        await this.page.getByRole('button', { name: 'In Patient' }).click()
    }
    async selectServiceLocation(ref_clinic_type)
    {
        await this.dropdown_ServiceLocation.click()
        await this.page.getByRole('option', { name: 'Cardio Location' }).click()
    }

    async SelectService(cli_name)
    {
        await this.dropdown_SelectService.click()
        await this.page.getByRole('option', { name: cli_name }).click()
    }
    async selectSourceOfReferral(SourceOFReferral)
    {
        await this.dropdown_SourceOfReferral.click()
        await this.page.getByRole('option', { name: SourceOFReferral }).click()
    }
    async selectReligion(pat_religion)
    {
        await this.dropdown_Religion.click()
        await this.page.getByRole('option', { name: pat_religion }).click()
    }
    
    async selectMarritalStatus(pat_marital_status)
    {
        await this.dropdown_marritalStatus.click()
        await this.page.getByRole('option', { name: pat_marital_status }).click()
    }
    
}
module.exports=SinglePageRegistration