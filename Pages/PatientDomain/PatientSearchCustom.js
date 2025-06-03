class PatientSearchCustom{
    constructor(page)
    {
        this.page=page
        this.btn_ResetToDefaultView=page.getByTestId('Reset to Default View')
        this.btn_Ok=page.getByTestId('Ok')
        this.btn_Save=page.getByTestId('Save')
    }
    async clickOnSaveButton()
    {
        await this.btn_Save.click()
    }

    async clickOnOkButton()
    {
        await this.btn_Ok.click()
    }

    async clickOnResetToDefaultViewButton()
    {
        await this.btn_ResetToDefaultView.click()
    }
}
module.exports=PatientSearchCustom