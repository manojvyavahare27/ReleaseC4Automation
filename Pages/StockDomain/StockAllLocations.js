class StockAllLocations
{
    constructor(page)
    {
        this.page=page
        this.backButton=page.locator("xpath=//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1mbytd0']")
        this.showHiddenlLocationButton=page.locator("xpath=//div[contains(text(),'Show Hidden Locations')]")
        this.searchStockLocation=page.locator("xpath=//input[@id='searchStockLocation']")
        this.searchButton=page.locator("xpath=//button[@data-testid='Search']")
        this.addStockLocationButton=page.locator("xpath=//button[@data-testid='Add Stock Location']")
        this.expandDefaultStockLocation=page.locator("xpath=//a[normalize-space(text())='Default Stock Location']/following::button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-xoenso'][1]")
        this.expandDefaultPharmacy=page.locator("xpath=//a[normalize-space(text())='Default Pharmacy']/following::button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-xoenso'][1]")        

        //Stock locations
        this.defaultStockLocation=page.locator("xpath=//a[@aria-label='Default Pharmacy']")
        this.cardioLocation=page.locator("xpath=//a[@aria-label='Cardio Location']")

        //All Links for Items
        this.addFormularyLink=page.locator("xpath=//h1[normalize-space()='Formulary']/following::a[@data-testid='Add'][1]")
        this.addBatchLink=page.locator("xpath=//h1[normalize-space()='Formulary']/following::a[@data-testid='Add'][2]")
        this.addStockQuantityLink=page.locator("xpath=//a[@aria-label='addundefined']")
        
        this.transferLink=page.locator("xpath=//a[@aria-label='transferundefined']")
        this.returnLink=page.locator("xpath=//a[@aria-label='returnundefined']")

    }

    async clickOnbackButton()
    {
        await this.backButton.click()
    }

    async clickOnShowHiddenLocationButton() {
        await this.showHiddenlLocationButton.click();
    }

    async enterSearchTextInStockLocation(text) {
        await this.searchStockLocation.fill(text);
    }

    async clickOnSearchButton() {
        await this.searchButton.click();
    }

    async clickOnAddStockLocationButton() {
        await this.addStockLocationButton.click();
    }

    async clickOnExpandDefaultStockLocation() {
        await this.expandDefaultStockLocation.click();
    }

    async clickOnExpandDefaultPharmacy() {
        await this.expandDefaultPharmacy.click();
    }

    //Stock locations

    async clickOnDefaultStockLocation()
    {
        await this.defaultStockLocation.click()
    }
    async clickOnCardioLocation()
    {
        await this.cardioLocation.click()
    }
    //All Item Links
    async clickOnAddFormularyLink()
    {
        await this.addFormularyLink.click()
    }

    async clickOnAddBatchLink()
    {
        await this.addBatchLink.click()
    }

    async clickOnAddStockQuantityLink()
    {
        await this.addStockQuantityLink.click()
    }

    async clickOnTransferLink()
    {
        await this.transferLink.click()
    }
    async clickOnReturnLink()
    {
        await this.returnLink.click()
    }


}
module.exports=StockAllLocations