class ProcessDispatchOrderPopup
{
    constructor(page)
    {
        this.page=page
         this.closeIcon=page.locator("xpath=//button[@aria-label='cancelIcon']")
         this.createDispatchOrderButton=page.locator("xpath=//button[@data-testid='createDispatchOrderPopup']")
    }
    async clickOncloseIcon()
    {
        await this.closeIcon.click()
    }

    async clickOnCreateDispatchOrderButtonFromPopUp()
    {
        await this.createDispatchOrderButton.click()
    }
}
module.exports=ProcessDispatchOrderPopup