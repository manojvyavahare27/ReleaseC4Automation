class AddGP
{
    constructor(page)
    {
        this.page=page
        this.btnSearchGP=page.getByRole('button', { name: 'Search' })
        this.btnAddGP=page.getByTestId('Add GP')
        //Add GP Page
        this.txtbox_GPTitle=page.getByTestId('Title')
        this.txtbox_GPInitials=page.getByTestId('Initial')
        this.txtbox_GPGivenName=page.getByTestId('Given Name') 
        this.txtbox_GPFamilyName=page.getByTestId('Family Name') 
        this.txtbox_GPCode=page.getByTestId('GP Code')
        this.txtbox_GPPracticeCode=page.getByTestId('Practice Code')
        this.txtbox_GPGMCCode=page.getByTestId('GMC Code')
       this.btnShowGP=page.locator("xpath=//input[@name='show']")
        this.dropdown_UnknownPostcode=page.locator("xpath=//div[@data-testid='Unknown, No Fixed Abode, or Overseas Visitor']")
        //GP Contact Details
        this.txtbox_GPPhone=page.locator("xpath=//input[@data-testid='GP Phone']")
        this.txtbox_GPFax=page.locator("xpath=//input[@data-testid='Fax']")
        this.txtbox_GPWorkPhone=page.locator("xpath=//input[@data-testid='Work Phone']")
        this.txtbox_GPMobile=page.locator("xpath=//input[@data-testid='Mobile']")
        this.txtbox_GPEmail=page.locator("xpath=//input[@data-testid='Email']")
        this.btnSaveGP=page.locator("xpath=//button[@data-testid='Save']")

        //Gp Address Details
        this.txtPostcodeSearch=page.locator("xpath=//input[@name='postcodeSearch']")
        this.postcodeValue=page.getByRole('option', { name: 'Gondhalenagar Post Office,' })
        this.txtbox_GPNumberandRoad=page.getByTestId('Number & Road')
        this.txtbox_District=page.getByTestId('District')
        this.txtbox_GPTown=page.getByTestId('Town')
        this.txtbox_GPCounty=page.getByTestId('County')
        this.txtbox_GpAddressPostCode=page.getByTestId('Postcode')



        //Add GP To Patient
        this.txtbox_GPFullName=page.locator("xpath=//input[@id='Search']")
        //this.btn_PersonAdd=page.getByRole('button', { name: 'personAdd' })
       // this.btn_PersonAdd=page.getByRole('row', { name: '113 Mr R tiya India India tiya R GP010 - ZZ99 3VZ personAdd edit' }).getByLabel('personAdd')
       this.btn_PersonAdd=page.getByLabel('personAdd')
       
                                
        this.btnNextonSearchGP=page.getByTestId('Next')
   
        //Search GP
        this.txtbox_SearchGP=page.getByRole('textbox', { name: 'Search' })

    }
    async enterGpSearch()
    {
        await this.txtbox_SearchGP.type('sharon')
    }
    async enterAppGpSearch(egp_fullname)
    {
        await this.txtbox_SearchGP.type(egp_fullname)
    }
 
    async clickOnNextButtonOnSearchGp()
    {
        await this.btnNextonSearchGP.click()
    }

    async clickOnPersonAddButton()
    {
        await this.btn_PersonAdd.click()
    }

    async enterGPFullName(egp_fullname)
    {
        await this.txtbox_GPFullName.type(egp_fullname)
    }
    async clickOnSaveGPButton()
    {
        await this.btnSaveGP.click()
    }
    async enterGPEmail(add_email)
    {
        await this.txtbox_GPEmail.type(add_email)
    }
    async enterGPMobile(add_mobile)
    {
        await this.txtbox_GPMobile.type(add_mobile)
    }
    async enterGPWorkPhone(add_work_phone)
    {
        await this.txtbox_GPWorkPhone.type(add_work_phone)
    }
    async enterGPFax(add_fax)
    {
        await this.txtbox_GPFax.type(add_fax)
    }
    async enterGPPhone(add_phone)
    {
        await this.txtbox_GPPhone.type(add_phone)
    }
    async selectUnknownPostCode()
    {
        await this.dropdown_UnknownPostcode.click()
        await this.page.getByRole('option', { name: 'Asked, but not given' }).click()
        await this.dropdown_UnknownPostcode.click()
        await this.page.getByRole('option', { name: 'Please Select' }).click()
    }
    async clickOnShowbnt()
    {
        await this.btnShowGP.click()
        await this.btnShowGP.click()

    }
    async enterGPGMCCode(egp_gmc_code)
    {
        await this.txtbox_GPGMCCode.type(egp_gmc_code)
    }
    async enterGPPracticeCode(egp_pct_code)
    {
        await this.txtbox_GPPracticeCode.type(egp_pct_code)
    }
    async enterGPCode(egp_gp_code)
    {
        await this.txtbox_GPCode.type(egp_gp_code)
    }
    async enterGPFamilyName(egp_surname)
    {
        await this.txtbox_GPFamilyName.type(egp_surname)
    }
    async enterGPGivenName(egp_first_name)
    {
        await this.txtbox_GPGivenName.type(egp_first_name)
    }
    async enterGPInitials(egp_initials)
    {
        await this.txtbox_GPInitials.type(egp_initials)
    }
    async enterGPTitle(egp_title)
    {
        await this.txtbox_GPTitle.type(egp_title)
    }
    async clickOnAddGPBtn()
    {
        await this.btnAddGP.click()
    }
    async clickOnSearchGPBtn()
    {
        await this.btnSearchGP.click()
    }
    //Add Address details of GP
    async enterLocalGPPostcode()
    {        // // Interact with the dropdown
        await this.txtPostcodeSearch.fill('PUNE')
       // await this.postcodeValue.click();
       //await page.getByRole('option', { name: 'Puneh & Juli Hair & Beauty' }).click();
       await this.page.getByRole('option', { name: 'Puner House 4 Teign View Road' }).click();
    }
    async enterGpAddressNumberAndRoad(add_address1)
    {
        await this.txtbox_GPNumberandRoad.fill("")
        await this.txtbox_GPNumberandRoad.fill(add_address1)
    }
    async enterGpAddressDistrict(add_address3)
    {
        await this.txtbox_District.fill(add_address3)
    }
    async enterGpAddressTown(add_address2)
    {
        await this.txtbox_GPTown.fill(add_address2)
    }
    async enterGpAddressCounty(add_address4)
    {
        await this.txtbox_GPCounty.fill(add_address4)
    }
    async enterGPAddressPostCode(add_address5)
    {
        await this.txtbox_GpAddressPostCode.fill(add_address5)
    }
}
module.exports=AddGP