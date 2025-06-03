class PatientWizard
{
    constructor(page)
    {
        this.page=page

   this.dropdown_MaritalStatus=page.getByTestId('Marital Status').getByRole('button', { name: '' })
   //this.dropdown_MaritalStatusValue=page.getByRole('option', { name: 'Single' })
//    this.dropdown_SexualOrientation=page.getByTestId('Sexual Orientation').getByRole('button', { name: '​' })
//    this.dropdown_SexualOrientationValue=page.getByRole('option', { name: 'Heterosexuality' })

//    this.dropdown_Religion=page.locator('#mui-component-select-religion')
//    this.dropdown_ReligionValue=page.getByRole('option', { name: 'Hindu' })
//    this.dropdown_sourceOfReferral=page.locator('#mui-component-select-sourceOfReferral')
//    this.dropdown_sourceOfReferralValue=page.getByRole('option', { name: 'Self' })
//    this.dropdown_Service=page.locator('#mui-component-select-service')
//    this.dropdown_ServiceValue=page.getByRole('option', { name: 'Administration' })
//    this.dropdownserviceLocation=page.locator('#mui-component-select-serviceLocation')
//    this.dropdownserviceLocationValue=page.getByRole('option', { name: 'BHRC location' })
//    this.dropdown_consultant=page.locator('#mui-component-select-consultant')
//    this.dropdown_consultantValue=page.getByRole('option', { name: 'Celine Admin' })
//    this.dropdown_patientType=page.locator('#mui-component-select-patientType')
//    this.dropdown_patientTypeValue=page.getByRole('option', { name: 'Regular', exact: true })
//    this.dropdown_appointmentType=page.locator('#mui-component-select-appointmentType')
//    this.dropdown_appointmentTypeValue=page.getByRole('option', { name: 'New', exact: true })
//    this.dropdown_methodOfArrival=page.locator('#mui-component-select-methodOfArrival')
//    this.dropdown_methodOfArrivalValue=page.getByRole('option', { name: 'Walking' })
//    this.dropdown_referralReason=page.locator('#mui-component-select-referralReason')
//    this.dropdown_referralReasonValue=page.getByRole('option', { name: 'In patient' })
//    this.dropdown_countryOfBirth=page.locator('#mui-component-select-countryOfBirth')
//    this.dropdown_countryOfBirthValue=page.getByRole('option', { name: 'India', exact: true })
//    this.dropdown_language=page.locator('#mui-component-select-language')
//    this.dropdown_languageValue=page.getByRole('option', { name: 'German' })
//    this.dropdown_ethnicity=page.locator('#mui-component-select-ethnicity')
//    this.dropdown_ethnicityValue=page.getByRole('option', { name: 'Asian or Asian British - Indian' })
//    this.dropdown_occupation=page.locator('#mui-component-select-occupation')
//    this.dropdown_occupationvalue=page.getByRole('option', { name: 'Professional', exact: true })
//    this.dropdown_nationality=page.locator('#mui-component-select-nationality')
//    this.dropdown_nationalityValue=page.getByRole('option', { name: 'Indian' })

//    this.txtbox_PostcodeSearch=page.getByRole('textbox', { name: 'Postcode Search' })
//    this.txtboxNumberandRoad=page.getByRole('textbox', { name: 'Number & Road' })
//    this.txtboxTown=page.getByRole('textbox', { name: 'Town' })
//    this.txtboxDistrict=page.getByRole('textbox', { name: 'District' })
//    this.txtboxCounty=page.getByRole('textbox', { name: 'County' })
//    this.txtboxCountry=page.getByRole('textbox', { name: 'Country' })
//    this.btnSave=page.getByRole('button', { name: 'Save' })
    }
   
    async select_MaritalStatus()
    {
        await this.dropdown_MaritalStatus.click()
       // await this.dropdown_MaritalStatusValue.click()
       await this.page.getByRole('option', { name: 'Single' }).click()
    }
    // async select_SexualOrientation()
    // {
    //     await this.dropdown_SexualOrientation.click()
    //     await this.dropdown_SexualOrientationValue.click()
    // }
    // async selectReligion()
    // {
    //     await this.dropdown_Religion.click()
    //     await this.dropdown_ReligionValue.click()
    // }
    // async selectSourceOfReferral()
    // {
    //     await this.dropdown_sourceOfReferral.click()
    //     await this.dropdown_sourceOfReferralValue.click()
    // }
    // async selectService()
    // {
    //     await this.dropdown_Service.click()
    //     await this.dropdown_ServiceValue.click()
    // }
    // async selectServiceLocation()
    // {
    //     await this.dropdownserviceLocation.click()
    //     await this.dropdownserviceLocationValue.click()
    // }
    // async selectConsultant()
    // {
    //     await this.dropdown_consultant.click()
    //     await this.dropdown_consultantValue.click()
    // }
    // async selectPatientType()
    // {
    //     await this.dropdown_patientType.click()
    //     await this.dropdown_patientTypeValue.click()
    // }
    // async selectAppointmentType()
    // {
    //     await this.dropdown_appointmentType.click()
    //     await this.dropdown_appointmentTypeValue.click()
    // }
    // async selectMethodOFArrival()
    // {
    //     await this.dropdown_methodOfArrival.click()
    //     await this.dropdown_methodOfArrivalValue.click()
    // }
    // async selectReferralReason()
    // {
    //     await this.dropdown_referralReason.click()
    //     await this.dropdown_referralReasonValue.click()
    // }
    // async selectCountryOfBirth()
    // {
    //     await this.dropdown_countryOfBirth.click()
    //     await this.dropdown_countryOfBirthValue.click()
    // }
    // async selectLanguage()
    // {
    //     await this.dropdown_language.click()
    //     await this.dropdown_languageValue.click()
    // }
    // async selectEthinicity()
    // {
    //     await this.dropdown_ethnicity.click()
    //     await this.dropdown_ethnicityValue.click()
    // }
    // async selectOccupatient()
    // {
    //     await this.dropdown_occupation.click()
    //     await this.dropdown_occupationvalue.click()
    // }
    // async selectNationality()
    // {
    //     await this.dropdown_nationality.click()
    //     await this.dropdown_nationalityValue.click()
    // }
    // async enterPostCodeSearch()
    // {
    //     await this.txtbox_PostcodeSearch.type('411028')
    // }
    // async enterNumberandRoad()
    // {
    //     await this.txtboxNumberandRoad.type('15 Number')
    // }
    // async enterTown()
    // {
    //     await this.txtboxTown.type('Kharadi')
    // }
    // async enterDistrict()
    // {
    //     await this.txtboxDistrict.type('Pune')
    // }
    // async enterCounty()
    // {
    //     await this.txtboxCounty.type('Maharashtra')
    // }
    // async enterCountry()
    // {
    //     await this.txtboxCountry.type('India')
    // }
    // async clickOnSaveButton()
    // {
    //     await this.btnSave.click()
    // }



}
module.exports=PatientWizard