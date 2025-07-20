class ProcessDispatchOrderPopup
{
    constructor(page)
    {
        this.page=page
         this.closeIcon=page.locator("xpath=//button[@aria-label='cancelIcon']")
         this.createDispatchOrderButton=page.locator("xpath=//div[@class='MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-spacing-xs-3 mui-1ckp3ow']//button[@data-testid='Create Dispatch Order'][1]")
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