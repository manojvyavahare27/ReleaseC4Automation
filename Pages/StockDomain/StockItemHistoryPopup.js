class StockItemHistoryPopup
{
    constructor(page)
    {
        this.page=page
        this.closePopupButton=page.locator("xpath=//button[@aria-label='cancelIcon']")
    }
    async clickOnclosePopup()
    {
        await this.closePopupButton.click()
    }
}
module.exports=StockItemHistoryPopup