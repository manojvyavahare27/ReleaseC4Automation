class StockReturnsPage
{
    constructor(page)
    {
        this.page=page
        this.pendingReturnLinkLast=page.locator("xpath=(//a[@data-testid='pendingReturn'])[last()]")
        this.ReturnLinkLast=page.locator("xpath=(//a[@data-testid='returned'])[last()]")
        this.TransferLinkLast=page.locator("xpath=(//a[@data-testid='transferred'])[last()]")
    }

    async clickOnLastPendingReturnLink()
    {
        await this.pendingReturnLinkLast.click()
    }

    async clickOnLastReturnLink()
    {
        await this.ReturnLinkLast.click()
    }

    async clickOnLastTransferLink()
    {
        await this.TransferLinkLast.click()
    }
}
module.exports=StockReturnsPage