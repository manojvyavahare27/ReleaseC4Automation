class StockItemFiltersPage {
    constructor(page) {
        this.page = page;

        // Inputs using assumed `Input` wrapper with XPath locators
        this.location = page.locator("xpath=//input[@name='service']");
        this.category = page.locator("xpath=//input[@name='category']");
        this.filter = page.locator("xpath=//input[@name='filter']");
        this.expiringDate = page.locator("xpath=//input[@name='expiringDate']");
        this.subCategory = page.locator("xpath=//input[@name='subCategory']");
        this.formulary = page.locator("xpath=//input[@name='formulary']");
        this.itemName = page.locator("xpath=//input[@name='itemName']");
        this.itemBarcode = page.locator("xpath=//input[@name='itemBarcode']");

        // Checkbox and button
        this.showZeroStockCheckbox = page.locator("xpath=//input[@type='checkbox']");
        this.searchButton = page.locator("xpath=//button[@data-testid='Search']");
        this.buttonAdd = page.locator("xpath=//button[@data-testid='Add']")
        // Header
        this.defaultPharmacyHeader = page.locator("xpath=//h1[contains(@class, 'MuiTypography-h4')]");
    }



    async selectLocation(location) {
        await this.location.fill(location);

        const actual = await this.location.inputValue();
        if (actual !== location) throw new Error(`❌ location mismatch. Expected: "${location}", Found: "${actual}"`);
        console.log(`✅ location filled correctly: "${actual}"`);

    }

    async selectCategory(category) {
        await this.category.fill(category);
        const actual = await this.category.inputValue();
        if (actual !== category) throw new Error(`❌ Category mismatch. Expected: "${category}", Found: "${actual}"`);
        console.log(`✅ Category filled correctly: "${actual}"`);
    }

    async selectFilter(filter) {
        await this.filter.fill(filter);
        const actual = await this.filter.inputValue();
        if (actual !== filter) throw new Error(`❌ Filter mismatch. Expected: "${filter}", Found: "${actual}"`);
        console.log(`✅ Filter filled correctly: "${actual}"`);
    }

    async selectExpiringDate(date) {
        await this.expiringDate.fill(date);
        const actual = await this.expiringDate.inputValue();
        if (actual !== date) throw new Error(`❌ Expiring Date mismatch. Expected: "${date}", Found: "${actual}"`);
        console.log(`✅ Expiring Date filled correctly: "${actual}"`);
    }

    async selectSubCategory(subCategory) {
        await this.subCategory.fill(subCategory);
        const actual = await this.subCategory.inputValue();
        if (actual !== subCategory) throw new Error(`❌ SubCategory mismatch. Expected: "${subCategory}", Found: "${actual}"`);
        console.log(`✅ SubCategory filled correctly: "${actual}"`);
    }

    async selectFormulary(formulary) {
        await this.formulary.fill(formulary);
        const actual = await this.formulary.inputValue();
        if (actual !== formulary) throw new Error(`❌ Formulary mismatch. Expected: "${formulary}", Found: "${actual}"`);
        console.log(`✅ Formulary filled correctly: "${actual}"`);
    }

    async enterItemName(stock_name) {
        await this.itemName.type(stock_name);
        const actual = await this.itemName.inputValue();
        if (actual !== stock_name) throw new Error(`❌ Item Name mismatch. Expected: "${stock_name}", Found: "${actual}"`);
        console.log(`✅ Item Name typed correctly: "${actual}"`);
    }

    async clearItemName() {
        await this.itemName.fill('');
        const actual = await this.itemName.inputValue();
        if (actual !== '') throw new Error(`❌ Item Name not cleared. Found: "${actual}"`);
        console.log(`✅ Item Name cleared successfully.`);
    }

    async fillItemBarcode(itemBarcode) {
        await this.itemBarcode.fill(itemBarcode);
        const actual = await this.itemBarcode.inputValue();
        if (actual !== itemBarcode) throw new Error(`❌ Item Barcode mismatch. Expected: "${itemBarcode}", Found: "${actual}"`);
        console.log(`✅ Item Barcode filled correctly: "${actual}"`);
    }



    async toggleShowZeroStock() {
        await this.showZeroStockCheckbox.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickOnAddButton() {
        await this.buttonAdd.click()
    }

    async getDefaultPharmacyHeader() {
        return await this.defaultPharmacyHeader.textContent();
    }
}
module.exports = StockItemFiltersPage