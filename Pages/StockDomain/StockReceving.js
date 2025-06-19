class StockReceving
{
    constructor(page)
    {
        this.page=page
        this.recevingquantity=page.locator("xpath=//input[@name='sttReceivedQuantity']")
        this.checkBox=page.locator("xpath=//span[@data-testid='hideLabel']")
        this.saveStockRecevingbutton=page.locator("xpath=//button[@aria-label='stockReceivingSave']")
    }
    async enterRecevingQuantity()
    {
        await this.recevingquantity.type('40')
    }
    async selectCheckBox()
    {
        await this.checkBox.click()
    }
    async clickOnSavebutton()
    {
        await this.saveStockRecevingbutton.click()
    }
}
module.exports=StockReceving