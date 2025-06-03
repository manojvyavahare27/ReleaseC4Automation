class PatientSelectAlert
{
    constructor(page)
    {
        this.page=page
        this.checkBoxSelectAll=page.getByRole('checkbox', { name: 'Select All' })
        this.SaveBtn=page.getByTestId('Save')
    }
    async clickOnSelectAllCheckBox()
    {
       await this.checkBoxSelectAll.click()
    }
    async clickOnSaveButton()
    {
        await this.SaveBtn.click()
    }
}
module.exports=PatientSelectAlert