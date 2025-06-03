class ServiceReferralsCustom
{
    constructor(page)
    {
        this.page=page
        this.btnBack=page.getByLabel('Back Button')
        this.btnSave=page.getByTestId('Save')     
        this.btnResetToDefaultView=page.getByTestId('Reset To Default View')
        this.btnOk=page.getByTestId('Ok')
        

    }
    async clickOnOkButton()
    {
        await this.btnOk.click()
    }
    async clickOnResetToDefaultViewButton()
    {
        await this.btnResetToDefaultView.click()
    }
    async clickOnBackButton()
    {
        await this.btnBack.click()
    }
    async clickOnSaveButton()
    {
        await this.btnSave.click()
    }
   
}
module.exports=ServiceReferralsCustom