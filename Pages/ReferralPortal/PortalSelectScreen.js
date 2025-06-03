class PortalSelectScreen
{
    constructor(page)
    {
        this.page=page
        this.btnReferralRequest=page.locator("xpath=//div[contains(text(),'Referral Request')]")
        this.btnTrackReferral=page.locator("xpath=//div[contains(text(),'Track Referral')]")
    }
    async clickOnReferralRequestButton()
    {
        await this.btnReferralRequest.click()
    }
    async clickOnTrackReferralButton()
    {
        await this.btnTrackReferral.click()
    }
}
module.exports=PortalSelectScreen