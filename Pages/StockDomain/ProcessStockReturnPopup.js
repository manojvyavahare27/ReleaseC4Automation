class ProcessStockReturnPopup
{
    constructor(page)
    {
        this.page=page
        this.returnButton=page.locator("xpath=//button[@data-testid='Return']")
        this.transferButton=page.locator("xpath=//button[@data-testid='Transfer']")
        this.cancelbutton=page.locator("xpath=//button[@aria-label='cancelIcon']")


    }
    async clickOnReturnbutton()
    {
        await this.returnButton.click()
    }

    async clickOntransferbutton()
    {
        await this.transferButton.click()
    }

    async clickOnClosePopup()
    {
        await this.cancelbutton.click()
    }
}
module.exports=ProcessStockReturnPopup