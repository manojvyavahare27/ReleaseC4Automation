class PortalHome {
    constructor(page) {
        this.page = page
        this.btnReferralPoral = page.locator("xpath=//div[contains(text(),'Referral Portal')]")
        this.btnPharmacyPortal = page.locator("xpath=//div[contains(text(),'Pharmacy Portal')]")

    }
    async clickOnReferralPortalButton() {
        await this.btnReferralPoral.click()
    }
    async clickOnPharmacyPortalButton() {
        await this.btnPharmacyPortal.click()
    }
}
module.exports = PortalHome