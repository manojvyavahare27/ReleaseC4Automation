class ProcessPickListPopup
{
    constructor(page)
    {
        this.page=page
        this.closeIcon=page.locator("xpath=//button[@aria-label='cancelIcon']")
    }
    async clickOncloseIcon()
    {
        await this.closeIcon.click()
    }
}
module.exports=ProcessPickListPopup