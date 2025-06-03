class PatientSearchCustomizable {
    constructor(page) {
        this.page = page
        this.btnSaveCustomizableView = page.getByTestId('Save')
        this.btnResetToDefaultView = page.getByTestId('Reset to Default View')
        this.btnOkResetToDefaultView = page.getByTestId('Ok')
    }
    async clickOnSaveButton()
    {
        await this.btnSaveCustomizableView.click()
    }
    async clickOnResetToDefaultViewButton()
    {
        await this.btnResetToDefaultView.click()
    }
    async clickOnOkResetToDefaultViewButton()
    {
        await this.btnOkResetToDefaultView.click()
    }
    

}
module.exports=PatientSearchCustomizable