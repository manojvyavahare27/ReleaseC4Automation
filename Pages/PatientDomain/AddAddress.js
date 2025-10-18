class AddAddress
{
    constructor(page)
    {
        this.page=page
        this.btn_save=page.getByTestId('Save')

        // Permanent Address Locators
        this.txtbox_numberandroad=page.locator('input[name="numberRoad"]')
        this.txtbox_town=page.locator('input[name="town"]')
        this.txtbox_district=page.locator('input[name="district"]')
        this.txtbox_county=page.locator('input[name="county"]')
        this.txtbox_postcode=page.locator('input[name="postcode"]')
        this.btn_FindPostcode=page.getByTestId('Find Postcode').first()
        //this.dropdownCountry=page.locator("xpath=//input[@name='country']")
        this.btn_FindPostcode2=page.getByTestId('Find Postcode').nth(1)
        this.txtbox_PopupCountry=page.getByTestId('CommonCellmaPopup').getByTestId('Country')
        this.btn_PopupSave=page.getByTestId('CommonCellmaPopup').getByTestId('Save')
        this.txtbox_permISOCountryCode=page.locator('input[name="iSOCountryCode"]')
       // this.dropdown_Country=page.locator('#mui-component-select-country')
        this.dropdown_Country=page.locator('input[name="country"]')
       this.txtbox_permICAOCountryCode=page.locator('input[name="iCAOCountryCode"]')         
        this.txtbox_permPhone=page.locator('input[name="phone"]')
        this.txtbox_permEmail=page.locator('input[name="email"]')
        this.txtbox_PerMobileNumber=page.getByTestId('Mobile').first()
        this.txtbox_permWorkPhone=page.locator('input[name="workPhone"]')
        this.txtbox_permFax=page.locator('input[name="fax"]')
        //this.dropdown_permHealthRegion=page.locator('#mui-component-select-healthRegion')
       // this.dropdown_permLocationZone=page.locator('#mui-component-select-locationZone')
        this.dropdown_permHealthRegion=page.locator('//input[@id="healthRegionPermanentAddress"]')
        this.dropdown_permLocationZone=page.locator('//input[@id="locationZonePermanentAddress"]')
        this.btn_PermAddressAddView=page.getByTestId('Add/View Notes').first()
         this.txtbox_PermAddressNotes=page.getByTestId('Notes')
         //this.txtbox_TempAddressNotes=page.getByTestId('Notes')
        this.btn_ClosePermAddressNotesPopup=page.getByTestId('CancelIcon').locator('path')

        



        //Temporary Address Locators
        this.txtbox_tempNumberandRoad=page.locator('input[name="tempNumberRoad"]')
        this.txtbox_temptown=page.locator('input[name="tempTown"]')
        this.txtbox_tempDistrict=page.locator('input[name="tempDistrict"]')
        this.txtbox_tempCounty=page.locator('input[name="tempCounty"]')
        this.txtbox_PostCode=page.locator('input[name="tempPostcode"]')
        //this.dropdown_TempCountry=page.locator('#mui-component-select-tempCountry')
        this.dropdown_TempCountry=page.locator('//input[@id="countryTemporaryAddress"]')
        this.txtbox_tempISOCountryCode=page.locator('input[name="tempISOCountryCode"]')
        this.txtbox_tempICAOCountryCode=page.locator('input[name="tempICAOCountryCode"]')
        this.txtbox_tempPhone=page.locator('input[name="tempPhone"]')
        this.txtbox_tempEmail=page.locator('input[name="tempEmail"]')
        this.txtbox_TempMobileNumber=page.locator('#temporaryMobileNumber')
        this.txtbox_tempWorkPhone=page.locator('input[name="tempWorkPhone"]')
        this.txtbox_tempFax=page.locator('input[name="tempFax"]')
        // this.dropdown_tempHealthRegion=page.locator('#mui-component-select-tempHealthRegion')
        // this.dropdown_tempLocationZone=page.locator('#mui-component-select-tempLocationZone')
        this.dropdown_tempHealthRegion=page.locator('//input[@id="healthRegionTemporaryAddress"]')
        this.dropdown_tempLocationZone=page.locator('//input[@id="locationZoneTemporaryAddress"]')
        this.btn_tempAddressAddView=page.getByTestId('Add/View Notes').nth(1)
        this.txtbox_TempAddressNotes=page.getByTestId('Notes')
        this.btn_CloseTempAddressNotesPopup=page.getByTestId('CancelIcon')

        //Billing Corrospondance
        this.radiobtn_billingCorr=page.getByTestId('TA Billing Correspondence').getByRole('radio', { name: 'A' })
        this.calender_StartDate=page.getByTestId('Start Date')
        this.calender_EndDate=page.getByTestId('End Date')

        //Save Address button
        this.btn_SaveForAddress=page.getByTestId('Save')

    }
    async clickOnSaveButton()
    {
        await this.btn_save.click()
    }
    async enterNumberAndRoad(add_address1)
    {
        await this.txtbox_numberandroad.fill('')
        await this.txtbox_numberandroad.type(add_address1)
        //await this.txtbox_postcode.type(name)
    }
    async enterTownInAddress(add_address3)
    {
        await this.txtbox_town.fill(add_address3)
    }
    async enterDestrict(add_address2)
    {
        await this.txtbox_district.fill(add_address2)
    }
    async enterCounty(add_address4)
    {
        await this.txtbox_county.fill(add_address4)
    }
    async enterPostCode(add_address5)
    {
        await this.txtbox_postcode.fill(add_address5)
    }
    async clickOnFindPostCode()
    {
        await this.btn_FindPostcode.click()
    }

    async clickOnFindPostCode2()
    {
        await this.btn_FindPostcode2.click()
    }
    async enterCountryonPopup(add_address6)
    {
        await this.txtbox_PopupCountry.fill(add_address6)
    }
    async clickOnSaveButtonOnPopup()
    {
        await this.btn_PopupSave.click()
    }
    //Temp Address functions

    async enterTempNumberandRoad(add_address1)
    {
        await this.txtbox_tempNumberandRoad.type(add_address1)
    }
    async enterTempTown(add_address3)
    {
        await this.txtbox_temptown.type(add_address3)
    }
    async enterTempDistrict(add_address2)
    {
        await this.txtbox_tempDistrict.type(add_address2)
    }
    async enterTempCounty(add_address4)
    {
        await this.txtbox_tempCounty.type(add_address4)
    }
    async enterTempPostcode(add_address5)
    {
        await this.txtbox_PostCode.type(add_address5)
    }

   async selectTempCountry()
   {
    await this.dropdown_TempCountry.click()
    await this.page.getByRole('option', { name: 'India', exact: true }).click()
   }
    async enterTempISOCountryCode(add_iso_country_code)
    {
        await this.txtbox_tempISOCountryCode.type(add_iso_country_code)
    }
    async enterTempICAOCountryCode(add_icao_country_code)
    {
        await this.txtbox_tempICAOCountryCode.type(add_icao_country_code)
    }
    async enterTempPhone(add_phone)
    {
        await this.txtbox_tempPhone.type(add_phone)
    }

    async enterTempEmail(add_email)
    {
        await this.txtbox_tempEmail.type(add_email)
    }
    
    async enterTempMobileNumber(add_mobile)
    {
        await this.txtbox_TempMobileNumber.fill(add_mobile)
    }
    async enterTempWorkPhone(add_work_phone)
    {
        await this.txtbox_tempWorkPhone.type(add_work_phone)
    }
    async enterTempFax(add_fax)
    {
        await this.txtbox_tempFax.type(add_fax)
    }
    async selectTempHealthRegion()
    {
        await this.dropdown_tempHealthRegion.click()
        await this.page.getByRole('option', { name: 'Health Region' }).click()
    }
    async selectTempLocationZone()
    {
        await this.dropdown_tempLocationZone.click()
        await this.page.getByRole('option', { name: 'Zone 1' }).click()
    }
    async clickOnTempAddressAddViewBnt()
    {
        await this.btn_tempAddressAddView.click()
    }
    async enterTempAddresNotes(add_notes)
    {
        await this.txtbox_TempAddressNotes.type(add_notes)
        await this.page.getByTestId('CommonCellmaPopup').getByTestId('Save').click()
    }
    async closeTempAddressNotesPopup()
    {
       await this.btn_CloseTempAddressNotesPopup.click()
    }

    //Permanent Address functions
    async enterPermISOCountryCode(add_isocountycode)
    {
        await this.txtbox_permISOCountryCode.type(add_isocountycode)
    }
    async enterPermICAOCode(add_icaocode)
    { 
        await this.txtbox_permICAOCountryCode.type(add_icaocode)
    }
    async selectCountry()
    {
        await this.dropdown_Country.click()
        await this.page.getByRole('option', { name: 'India', exact: true }).click()
    }
    async enterPremPhone(add_permphone)
    {
        await this.txtbox_permPhone.type(add_permphone)
    }
    async enterPermEmail(add_email)
    {
        await this.txtbox_permEmail.fill('')
        await this.txtbox_permEmail.type(add_email)
    }
    async enterPerMobileNumber(add_mobile)
    {
        await this.txtbox_PerMobileNumber.fill('')
        await this.txtbox_PerMobileNumber.type(add_mobile)
    }
    async enterPermWorkPhone(add_permworkphone)
    {
        await this.txtbox_permWorkPhone.type(add_permworkphone)
    }
    async enterPermFax(add_fax)
    {
        await this.txtbox_permFax.type(add_fax)
    }
    async selectPermHealthRegion()
    {
        await this.dropdown_permHealthRegion.click()
        await this.page.getByRole('option', { name: 'Health Region' }).click()
    }
    async selectPermLocationZone()
    {
        await this.dropdown_permLocationZone.click()
        await this.page.getByRole('option', { name: 'Zone 1' }).click()
    }
    async clickOnPermAddressAddViewBnt()
    {
        await this.btn_PermAddressAddView.click()
    }
    async enterPermAddresNotes(add_notes)
    {
        await this.txtbox_PermAddressNotes.type(add_notes)
        await this.page.getByTestId('CommonCellmaPopup').getByTestId('Save').click()
    }
    async closePermAddressNotesPopup()
    {
        await this.btn_ClosePermAddressNotesPopup.click()
    }

    //Billing Corrospondance

    async CheckRadiobtnBilllingCorrespondence()
    {
        await this.radiobtn_billingCorr.click()
    }
    async SelectStartEndDate()
    {
        await this.calender_StartDate.click()
        await this.calender_StartDate.type("01/06/2025")
        await this.calender_EndDate.click()
        await this.calender_EndDate.type("01/08/2025")
    }

    //Save Address
    async clickOnSaveAddress()
    {
        await this.btn_SaveForAddress.click()
    }
}
module.exports=AddAddress