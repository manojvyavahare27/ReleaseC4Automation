class stockTransferPopUp {
    constructor(page) {
        this.page = page;               
        this.LocationToTransferTo=page.locator("xpath=//input[@name='LocationToTransferTo']")
        this.QuantityToTransfer=page.locator("xpath=//input[@id='QuantityToTransfer']")
        this.Transferbutton=page.locator("xpath=//div[contains(text(),'Transfer')]")

        //locators from Stock Transfer
        this.requestLocationInput = page.locator('xpath=//input[@id="requestLocation"]');
        this.formularyInput = page.locator('xpath=//input[@id="formulary"]');
        this.transferStatusInput = page.locator('xpath=//input[@id="transferStatus"]');
        this.requestIdInput = page.locator('xpath=//input[@id="Request Id"]');
        this.searchStockItemInput = page.locator('xpath=//input[@id="Search Stock Item To Transfer"]');
        this.startDateInput = page.locator('xpath=//input[@id="Start Date"]');
        this.endDateInput = page.locator('xpath=//input[@id="End Date"]');
        this.reloadButton = page.locator('xpath=//button[@data-testid="Reload"]');
        this.sortByInput = page.locator('xpath=//input[@id="sortBy"]');
    }

    async selectLocationToTransferTo()
    {
        await this.LocationToTransferTo.click()
        await this.page.getByRole('option', { name: 'Cardio Location' }).click()
    }

    async enterQuantityToTransfer(Qty)
    {
        await this.QuantityToTransfer.type(Qty)
    }
    
    async clickOnTransferButton()
    {
        await this.Transferbutton.click()
    }

    
 

}
module.exports=stockTransferPopUp