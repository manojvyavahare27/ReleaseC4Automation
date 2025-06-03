class TopBlueBar{
    constructor(page)
    {
        this.page=page
        this.btnBannerButton=page.getByLabel('Banner Button')
        this.btn_BannerButtonKeyboadrArrow=page.locator('//button[@aria-label=\'KeyboardArrowDownIcon\']')
        this.link_ViewAllContactDetails=page.getByTestId('View All Contact Details')
    }
    async ClickOnViewAllContactDetails()
    {
        await this.link_ViewAllContactDetails.click()
    }
    async clickOnBannerButtonKeyboardArrow()
    {
        await this.btn_BannerButtonKeyboadrArrow.click()
    }
    async clickOnTopBlueBar()
    {
        await this.btnBannerButton.click()
    }
}
module.exports=TopBlueBar