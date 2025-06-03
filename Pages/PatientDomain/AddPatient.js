class AddPatient
{
    constructor(page)
    {
        this.page=page
        this.dropdown_PtnameinOtherLang=page.getByTestId('Pt name in other language')
        this.dropdown_marrital_status=page.getByTestId('Marital Status').getByLabel('​', { exact: true })
        this.dropdown_sexualorientation=page.locator("xpath=//div[@id='mui-component-select-patSexualOrientationEliId']")
        this.dropdown_CurrentlyPregnant=page.getByTestId('Currently Pregnant').getByRole('button', { name: '​' })
        this.dropdown_ethnicity=page.locator("xpath=//div[@id='mui-component-select-patEthnicityText']")
        this.dropdown_occupation=page.locator("xpath=//div[@id='mui-component-select-patOccupation']")
        this.dropdown_religion=page.locator("xpath=//div[@id='mui-component-select-patReligion']")
        this.txtbox_townofbirth=page.locator("xpath=//input[@id='Town Of Birth']")
        this.txtbox_countyofbirth=page.locator("xpath=//input[@id='County Of Birth']")
        this.dropdown_countryofbirth=page.locator("xpath=//div[@id='mui-component-select-patCountryOfBirth']")
        this.dropdown_nationality=page.locator("xpath=//div[@id='mui-component-select-patNationality']")
        this.dropdown_regdisable=page.locator("xpath=//div[@id='mui-component-select-patRegisteredDisabled']")
        this.dropdown_primarydisablity=page.getByTestId('Primary Disability').getByRole('button', { name: '​' })
        this.txtbox_assistanceneeded=page.locator("xpath=//input[@aria-label='Assistance Needed']")
        this.txtbox_DisabilityNotes=page.locator("xpath=//input[@id='Disability Note']")
        this.dropdown_Language=page.locator("xpath=//div[@aria-labelledby='mui-component-select-patLanguage']")
        this.dropdown_interpreterneeded=page.locator("xpath=//div[@aria-labelledby='mui-component-select-patNeedInterpreterAtAppointments']")
        this.dropdown_interpretertype=page.locator("xpath=//div[@aria-labelledby='mui-component-select-patInterpreterTypeEliId']")
        this.txtbox_NHSNo=page.getByTestId('NHS.No')
        this.txtbox_hospitalref=page.getByTestId('Hospital Ref')
        this.txtbox_Identifier=page.getByTestId('Identifier')
        this.txtbox_PasId=page.getByTestId('PAS ID')
        this.dropdownPatientType=page.locator("xpath=//div[@aria-labelledby='mui-component-select-patType']")
        this.dropdown_Prisoner=page.locator("xpath=//div[@aria-labelledby='mui-component-select-patPrisoner']")
        this.dropdown_BloodType=page.locator("xpath=//div[@aria-labelledby='mui-component-select-patBloodGroup']")
        this.dropdown_Restricted_Registration=page.locator("xpath=//div[@aria-labelledby='mui-component-select-patBanned']")
        this.dropdown_Patientwebregistration=page.locator("xpath=//div[@aria-labelledby='mui-component-select-patRegisteredWithPatientweb']")
        this.checkbox_LockPatientWebAccount=page.getByRole('checkbox', { name: 'Lock Patient Web Account' })
        this.link_ResetPassword=page.getByTestId('Reset Password')
        this.txtbox_Notes=page.locator("xpath=//textarea[@aria-label='Notes']")
        this.btn_Next=page.getByTestId('Next')
        this.btn_Save=page.getByTestId('Save')   
        
        //Add Identifier
        this.btnAddPatientIdentifier=page.getByTestId('Add Patient Unique Identifier')
        this.dropdownUniqueIdentifier=page.getByTestId('Unique Identification').getByLabel('​', { exact: true })
        this.txtboxIdentifierNumber=page.locator('#numberUnique')
        this.dropdownCountry=page.locator('#mui-component-select-issuingCountry').first()
        this.btnAddUniqueIdentfier=page.getByTestId('Add').first()



    }

    async clickOnResetPasswordLink()
    {
        await this.link_ResetPassword.click()
    }
    async enterPatientNameInOtherLang()
    {
        await this.dropdown_PtnameinOtherLang.type('Cellma')
    }

    async clickOnLockPatientWebAccountCheckbox()
    {
        await this.checkbox_LockPatientWebAccount.click()
    }
    async selectMaritalStatusDropdown(pat_marital_status)
    {
        await this.dropdown_marrital_status.click()
        await this.page.getByRole('option', { name: pat_marital_status }).click()
    }
    async selectSexualOrientation(pat_sexual_orientation_eli_text)
    {
        await this.dropdown_sexualorientation.click()
        await this.page.getByRole('option', { name: 'Heterosexuality' }).click()
    }
    async selectCurrentlyPregnant()
    {
        await this.dropdown_CurrentlyPregnant.click()
        await this.page.getByRole('option', { name: 'No' }).click()
    }
    async selectEthnicity(pat_ethnicity_text)
    {
        await this.dropdown_ethnicity.click()
        //await this.page.getByRole('option', { name: 'Indian' }).click()
        await this.page.getByRole('option', { name: pat_ethnicity_text, exact: true }).click()
    }
    async selectOccupation(pat_occupation)
    {
        await this.dropdown_occupation.click()
        await this.page.getByRole('option', { name: pat_occupation, exact: true }).click()
    }
    async SelectReligion(pat_religion)
    {
        await this.dropdown_religion.click()
        await this.page.getByRole('option', { name: pat_religion, exact: true }).click()
    }
    async enterTownOfBirth(pat_town_of_birth)
    {
        await this.txtbox_townofbirth.type(pat_town_of_birth)
    }
    async enterCountyOfBirth(pat_county_of_birth)
    {
        await this.txtbox_countyofbirth.type(pat_county_of_birth)
    }
    async selectCountryOfBirth(pat_country_of_birth)
    {
        await this.dropdown_countryofbirth.click()
        await this.page.getByRole('option', { name: pat_country_of_birth, exact: true }).click()
    }
    async selectNationality(pat_nationality)
    {
        await this.dropdown_nationality.click()
        await this.page.getByRole('option', { name: pat_nationality, exact: true }).click()
    }
    async selectRegDisable(pat_registered_disabled_yes)
    {
        await this.dropdown_regdisable.click()
        await this.page.getByRole('option', { name: pat_registered_disabled_yes, exact: true }).click()
    }
    async selectPrimaryDisablity()
    {
        await this.dropdown_primarydisablity.click()
        await this.page.getByRole('option', { name: 'NO' }).getByRole('checkbox').click()
        await this.page.getByTestId('Family Name').click()
       // await this.page.getByRole('option', { name: 'Blindness', exact: true }).getByRole('checkbox').click()
    }
    async enterAssestanceNeeded(name)
    {
        await this.txtbox_assistanceneeded.click()
        await this.txtbox_assistanceneeded.type(name)
    }
    async enterDisablityNotes(pat_disability_note)
    {
        await this.txtbox_DisabilityNotes.type(pat_disability_note)
    }
    async selectLanguage(pat_language)
    {
        await this.dropdown_Language.click()
        await this.page.getByRole('option', { name: pat_language, exact: true }).click()
    }
    async selectInterpreterNeeded()
    {
        await this.dropdown_interpreterneeded.click()
        await this.page.getByRole('option', { name: 'Yes' }).click()
    }
     
    async selectInterpreterType()
    {
        await this.dropdown_interpretertype.click()
        await this.page.getByRole('option', { name: 'Whisper', exact: true }).click()
    }
    async enterNHSNo(NHSNo)
    {
        await this.txtbox_NHSNo.type(NHSNo)
    }
    async enterHospitalRef(pat_hospital_ref)
    {
        await this.txtbox_hospitalref.type(pat_hospital_ref)
    }
    async enterIdentifier(name)
    {
        await this.txtbox_Identifier.fill(name)
    }
    async enterPASId(name)
    {
        await this.txtbox_PasId.type(name)
    }
    async selectPatientType(pat_type)
    {
        await this.dropdownPatientType.click()
        await this.page.getByRole('option', { name: pat_type, exact: true }).click()
    }
    async selectPrisoner(pat_prisoner_yes)
    {
        await this.dropdown_Prisoner.click()
        await this.page.getByRole('option', { name: pat_prisoner_yes, exact: true }).click()
    }
    async selectBloodType(pat_blood_group)
    {
        await this.dropdown_BloodType.click()
        await this.page.getByRole('option', { name: pat_blood_group, exact: true }).click()
    }
    async selectRestrictedRegistration()
    {
        await this.dropdown_Restricted_Registration.click()
        //await this.getByRole('option', { name: 'No' }).click()
        await this.page.locator("xpath=//body/div[@id='menu-patBanned']/div[3]/ul[1]/li[2]").click()
    }

    async selectPatientWebRegistration()
    {
        await this.dropdown_Patientwebregistration.click()
        await this.page.getByRole('option', { name: 'No', exact: true }).click()
    }
    async enterNotes(pat_notes)
    {
        await this.txtbox_Notes.type(pat_notes)
    }
    async clickOnAddPatientIdentifierButton()
    {
        await this.btnAddPatientIdentifier.click()
    }
    async selectUniqueIdentifier()
    {
        await this.dropdownUniqueIdentifier.click()
        await this.page.getByRole('option', { name: 'Aadhar Card' }).click()
    }
    async enterUniqueIdentifierNumber()
    {
        await this.txtboxIdentifierNumber.fill('454512120000')
    }
    async selectUniqueIdentifierCountry()
    {
        await this.dropdownCountry.click()
        await this.page.getByRole('option', { name: 'India', exact: true }).click()
    }
    async clickOnAddIdentifierButton()
    {
        await this.btnAddUniqueIdentfier.click()
    }
    async clickOnNextButton()
    {
        await this.btn_Next.click()
    }
    async clickOnsavebutton()
    {
        await this.btn_Save.click()
    }

}

module.exports=AddPatient