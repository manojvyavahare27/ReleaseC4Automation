// stockTransferPage.js
class StockTransferPage {
    constructor(page) {
        this.page = page;
        this.requestLocationInput = page.locator('xpath=//input[@id="requestLocation"]');
        this.defaultPharmacyLink=page.locator("xpath=//a[@aria-label='Default Pharmacy']")
        this.formularyInput = page.locator('xpath=//input[@id="formulary"]');
        this.transferStatusInput = page.locator('xpath=//input[@id="transferStatus"]');
        this.requestIdInput = page.locator('xpath=//input[@id="Request Id"]');
        this.searchStockItemInput = page.locator('xpath=//input[@id="Search Stock Item To Transfer"]');
        this.startDateInput = page.locator('xpath=//input[@id="Start Date"]');
        this.endDateInput = page.locator('xpath=//input[@id="End Date"]');
        this.reloadButton = page.locator('xpath=//button[@data-testid="Reload"]');
        this.sortByInput = page.locator('xpath=//input[@id="sortBy"]');

        ///////////////////
        this.approvedQuantity=page.locator("xpath=//input[@id='Approved Quantity']")
        this.pickedquantity=page.locator("xpath=//input[@id='Picked Quantity']")
        this.CheckBox=page.locator("xpath=//input[@class='PrivateSwitchBase-input mui-j8yymo']")
        this.savebutton=page.locator("xpath=//button[@data-testid='saveStockTransfer']")
        this.createPickListButton=page.locator("xpath=//button[@data-testid='createPickList']")
        this.createDispatchOrderButton=page.locator("xpath=//button[@data-testid='createDispatchOrder']")
        this.Okbutton=page.locator("xpath=//button[@data-testid='Ok']")
    }

    async enterRequestLocation(location) {

        await this.requestLocationInput.fill(location);
        
    }
    async clickOnDefaultPharmacyLink()
    {
        await this.defaultPharmacyLink.click()
    }

    async enterFormulary(formulary) {
        await this.formularyInput.fill(formulary);
    }

    async enterTransferStatus(status) {
        await this.transferStatusInput.fill(status);
    }

    async enterRequestId(id) {
        await this.requestIdInput.fill(id);
    }

    async enterSearchStockItem(item) {
        await this.searchStockItemInput.fill(item);
    }

    async enterStartDate(date) {
        await this.startDateInput.fill(date);
    }

    async enterEndDate(date) {
        await this.endDateInput.fill(date);
    }

    async clickReloadButton() {
        await this.reloadButton.click();
    }

    async enterSortBy(value) {
        await this.sortByInput.fill(value);
    }

    async enterApprovedQuantity()
    {
        await this.approvedQuantity.clear()
        await this.approvedQuantity.type('45')
    }
    async enterPickedQuantity()
    {
        await this.pickedquantity.clear()
        await this.pickedquantity.type('45')
    }
    async clickOncheckBox()
    {
        await this.CheckBox.click()
    }
    async clickOnSaveButton()
    {
        await this.savebutton.click()
    }

    async clickOnCreatePickListButton()
    {
        await this.createPickListButton.click()
    }
    async clickOnDispatchOrderButton()
    {
        await this.createDispatchOrderButton.click()
    }

    async clickOnOkbutton()
    {
        await this.Okbutton.click()
    }

    // async clickOnDeleteItemFromStockTransfer(itemName,page)
    // {
    //     const deleteButtonXPath = `//tbody[@class='MuiTableBody-root css-y6j1my']//tr[.//h1[normalize-space()='${itemName}']]//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-mfslm7']`;

    //     const deleteButton = await page.locator(deleteButtonXPath);
    //     await deleteButton.click();
    // }


    async clickOnDeleteItemFromStockTransfer(itemName, page) {
    const deleteButtonXPath = `//tbody[@class='MuiTableBody-root css-y6j1my']//tr[.//h1[normalize-space()='${itemName}']]//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-mfslm7']`;
    
    const deleteButton = page.locator(deleteButtonXPath);
    const count = await deleteButton.count();

    if (count > 0) {
        await deleteButton.first().click(); // in case of multiple, click first
        console.log(`✅ Deleted item: ${itemName}`);
    } else {
        console.log(`❌ Item not found: ${itemName}`);
    }
}
}
module.exports=StockTransferPage

