class Formulary {
    constructor(page) {
        this.page = page;
        this.AddFormulary=page.locator("xpath=//button[@data-testid='Add']")
        this.closePopup=page.locator("xpath=//button[@aria-label='cancelIcon']")
    }

    async clickOnAddFormularyButton()
    {
        await this.AddFormulary.click()
    }
    async clickOnClosePopup()
    {
        await this.closePopup.click()
    }
 

}
module.exports=Formulary