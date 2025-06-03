class Formulary {
    constructor(page) {
        this.page = page;
        this.AddFormulary=page.locator("xpath=//tr[contains(@class, 'MuiTableRow-root') and .//h1[text()='Automation formulary']]//button[@data-testid='Add']")
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