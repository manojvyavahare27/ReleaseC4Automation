class AddToListItem
{
    constructor(page)
    {
        this.page=page
        //this.DropdownListItemList=page.getByLabel('Choose')
        this.DropdownListItemList=page.getByRole('button', { name: 'Open' })

        this.btnFilter=page.getByTestId('Filter')
        this.btnAddListItems=page.getByTestId('Add List Item')
        this.dropdownService=page.getByTestId('service').getByLabel('Service')
       // this.dropdownApplicationList=page.getByTestId('Application List').getByRole('button', { name: 'Open' })
        this.dropdownApplicationList=page.getByLabel('Application List')
        this.txtboxText=page.getByTestId('Text')
        this.txtboxinOtherLang=page.getByTestId('Text In Other Language')
        this.txtNumericVal=page.getByTestId('Numeric Value')
        this.dropdowncodetype=page.getByLabel('Code Type')
        this.txtcode=page.getByTestId('Code')
        this.txtcodetext=page.getByTestId('Code Text')
        this.txthexcolor=page.getByTestId('Hex Colour (supply #)')
        this.btnsavelistitem=page.getByTestId('Save')
        
    }
    async clickOnSavelistItemButton()
    {
        await this.btnsavelistitem.click()
    }
    async enterHextColor(Text)
    {
        await this.txthexcolor.type(Text)
    }
    async enterCodeText(Text)
    {
        await this.txtcodetext.type(Text)
    }
    async enterCode(Text)
    {
        await this.txtcode.type(Text)
    }
    async selectDropDownCodeType(eli_code_type)
    {
        await this.dropdowncodetype.click()
        await this.page.getByRole('option', { name: eli_code_type }).click()
    }
    async enterNumericValue(Text)
    {
        await this.txtNumericVal.type(Text)
    }
    async enterTextInOtherLang(Text)
    {
        await this.txtboxinOtherLang.type(Text)
    }
    async enterTextInTextBox(Text)
    {
        await this.txtboxText.type(Text)
    }
    async selectDropDownApplicationList()
    {
        await this.dropdownApplicationList.click()
        await this.page.getByRole('option', { name: 'City Name' }).click()
    }
    async selectDropdownFromService()
    {
        await this.dropdownService.click()
        await this.page.getByRole('option', { name: 'General Medicine Automation' }).click()

    }
    async selectListItemList()
    {
        await this.DropdownListItemList.click()
        await this.page.getByRole('option', { name: 'City Name' }).click()
    }
    async clickOnFilterButton()
    {
        await this.btnFilter.click()
    }
    async clickOnAddListItemsButton()
    {
        await this.btnAddListItems.click()
    }
}
module.exports=AddToListItem