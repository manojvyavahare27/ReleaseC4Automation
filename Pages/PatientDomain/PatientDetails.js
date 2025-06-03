class PatientDetails{
    constructor(page)
    {
        this.page=page       
        this.txtbox_Identifier=page.getByRole('textbox', { name: 'Identifier' })
        this.txtbox_Barcode=page.getByRole('textbox' , {name: 'Barcode'})

        this.dropdown_uniqueIdentification=page.locator('#mui-component-select-uniqueIdentification')        
        this.txtbox_uniqueIdentificationID=page.locator("xpath=//input[@id='Unique Identification ID']")
        this.txtbox_uniqueIdentificationID_Value=page.getByRole('option', { name: 'Passport ID' })        
        this.dropdown_photoIdentification=page.locator('#mui-component-select-photoIdentification')
        this.dropdown_photoIdentification_Value=page.getByRole('option', { name: 'Aadhar Card' })
        this.txt_photoIdentificationID=page.locator("xpath=//input[@id='Photo Identification ID']")   
        
        this.dropdown_country=page.locator('#mui-component-select-issuingCountry')
        this.dropdown_country_value=page.getByRole('option', { name: 'India', exact: true })

        this.dropdown_Title=page.locator('#mui-component-select-title')
        this.dropdown_Title_value=page.getByRole('option', { name: 'Mr', exact: true })

        this.txtbox_Maiden=page.getByRole('textbox', { name: 'Maiden Name' })
        this.txtbox_MobileNumber=page.getByRole('spinbutton', { name: 'Mobile' })
        this.txtbox_Email=page.getByRole('textbox', { name: 'Email' })


        this.txtbox_middle_Name=page.getByRole('textbox', { name: 'Middle Name(s)' })
        this.calendar_bornDate=page.getByPlaceholder('dd/mm/yyyy')
        this.btnDuplicateCheck=page.getByRole('button', { name: 'Duplicate Check' })
        this.btnCreatePatient=page.getByRole('button', { name: 'Create Patient' })


        //this.
        //getByRole('button', { name: 'Duplicate Check' })
    }
    async enter_Barcode(New_Barcode)
    {
        await this.txtbox_Barcode.type(New_Barcode)
    }
    async selectDropdown_UniqueIdentification()
    {
        await this.dropdown_uniqueIdentification.click()
        await this.txtbox_uniqueIdentificationID_Value.click()
    }
    async enter_uniqueIdentificationID()
    {
       await this.txtbox_uniqueIdentificationID.type("Passport2022")
    }
    async selectDropdown_PhotoIdentification(photo_id)
    {
        await this.dropdown_photoIdentification.click()
        await this.dropdown_photoIdentification_Value.click()
    }
    async enter_PhotoIdentificationID(photoidfId)
    {
        await this.txt_photoIdentificationID.type(photoidfId)
    }
    async selectDropdown_IssuingCountry()
    {
        await this.dropdown_country.click()
        await this.dropdown_country_value.click()
    }
    async selectDropdown_Title()
    {
        await this.dropdown_Title.click()
        await this.dropdown_Title_value.click()
    }
    async enter_middleName()
    {
        await this.txtbox_middle_Name.type("Tester")
    }
    async selectBornDate()
    {
        await this.calendar_bornDate.type("01/02/1995")
    }
    async clickOnDuplicateCheckbtn()
    {
        await this.btnDuplicateCheck.click()
    }
    async clickOnCreatePatientbtn()
    {
        await this.btnCreatePatient.click()
    }
    async enterMaidenName()
    {
        await this.txtbox_Maiden.type("Pune")
    }
}
module.exports=PatientDetails