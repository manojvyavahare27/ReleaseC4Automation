class ReturnItemsPopup {
    constructor(page) {
        this.page = page
        this.LocationToReturn = page.locator("xpath=//input[@id='locationToReturnTo']")
        this.resdonForReturn = page.locator("xpath=//input[@id='reasonForReturn']")
        this.amountToReturn = page.locator("xpath=//input[@name='amountToReturn']")
        this.additionalNotes = page.locator("xpath=//textarea[@name='additionalNotes']")
        this.returnButton = page.locator("xpath=//button[@data-testid='Return']")
    }

    async enterLocationToReturn(sttra_stloc_id_transfer_to) {
        await this.LocationToReturn.type(sttra_stloc_id_transfer_to);
        await this.page.getByRole('option', { name: 'Default Pharmacy' }).click()
    }

    async enterReasonForReturn(sttra_return_reason) {
        await this.resdonForReturn.type(sttra_return_reason);
        await this.page.getByRole('option', { name: 'Broken' }).click()
    }

    async enterAmountToReturn(sttra_quantity) {
        await this.amountToReturn.fill(sttra_quantity);
    }

    async enterAdditionalNotes(sttra_additional_notes) {
        await this.additionalNotes.type(sttra_additional_notes);
    }

    async clickReturnButton() {
        await this.returnButton.click();
    }

}
module.exports = ReturnItemsPopup