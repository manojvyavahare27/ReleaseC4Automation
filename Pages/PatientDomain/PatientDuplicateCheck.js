class PatientDuplicateCheck
{
    constructor(page)
    {
        this.page=page
        this.txtbox_Identifier=page.locator("xpath=//input[@id='Identifier']")
        this.dropdown_unique_Identification=page.locator("xpath=//input[@id='uniqueIdentification']")
        this.txtbox_unique_Identification_Id=page.getByTestId('Unique Identification ID')
        this.dropdown_photo_Identification=page.getByTestId('photoIdentification').getByLabel('Open')
        this.txtbox_photo_Identification_Id=page.getByTestId('Photo Identification ID')
        this.dropdown_issuing_Country=page.getByTestId('issuingCountry').getByLabel('Open')
        this.dropdown_Title=page.getByTestId('Title').getByLabel('​', { exact: true })
        this.txtbox_middleName=page.getByTestId('Middle Name(s)')
        this.txtbox_maidenName=page.getByTestId('Maiden Name')
        this.dropdown_is_baby_born_inthe_hospital=page.getByTestId('Is baby born in this hospital?').getByRole('button', { name: '​' })
        this.txtbox_mobile=page.getByTestId('Mobile')
        this.txtbox_EmailID=page.getByTestId('Email')
        this.btn_Duplicate_check=page.locator("xpath=//div[contains(text(),'Duplicate Check')]")
        this.btn_Create_Patient=page.getByTestId('Create Patient')

    }
    async enterIdentifier(name)
    {
        await this.txtbox_Identifier.type(name)
    }
    async selectUniqueIdentification()
    {
        //await this.dropdown_unique_Identification.selectOption(page.getByRole('option', { name: 'Passport ID' }).click())
        await this.dropdown_unique_Identification.click()
        await this.page.getByRole('option', { name: 'Passport ID' }).click()        
    }

    async enterUniqueIdentificationId(pid_value1)
    {
        await this.txtbox_unique_Identification_Id.type(pid_value1)
    }

    async selectPhotoIdentification()
    {
        await this.dropdown_photo_Identification.click()
        await this.page.getByRole('option', { name: 'Adhar Card' }).click()
    }

    async enterPhotoIdentification(pid_value2)
    {
        await this.txtbox_photo_Identification_Id.type(pid_value2)
    }
    
    async selectIssuingCountry(pat_country)
    {
        await this.dropdown_issuing_Country.click()
        await this.page.getByRole('option', { name: pat_country, exact: true }).click();
    }

    async selectTitle(pat_title)
    {
        // await this.dropdown_Title.click()
        // await this.page.getByRole('option', { name: 'B/O', exact: true }).click();        
        await this.dropdown_Title.click()
        await this.page.getByRole('option', { name: pat_title, exact: true }).click()
        
    }

    async enterMiddleName(pat_middlename)
    {
        await this.txtbox_middleName.type(pat_middlename)
    }
    async enterMaidenName(name)
    {
        await this.txtbox_maidenName.type(name)
    }

    async selectIsBabyBornInHospital()
    {
        await this.dropdown_is_baby_born_inthe_hospital.click()
        await this.page.getByRole('option', { name: 'Yes' }).click()
    }
    async enterMobileNumber(pid_value1)
    {
        await this.txtbox_mobile.type(pid_value1)
    }    
    async enterEmailId(pat_email)
    {
        await this.txtbox_EmailID.type(pat_email)
    }
    async clickOnDuplicateCheckButton()
    {
        await this.btn_Duplicate_check.click()
    }
    async clickOnCreatePatientButton()
    {
        await this.btn_Create_Patient.click()
    }
}

module.exports=PatientDuplicateCheck