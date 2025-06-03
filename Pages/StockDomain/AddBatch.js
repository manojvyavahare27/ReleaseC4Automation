class AddBatch {
    constructor(page) {
        this.page = page;
        this.suppliername=page.locator("xpath=//input[@name='supplierName']")
        this.manufacturer = page.locator('xpath=//input[@name="manufacturer"]');
        this.batchNumber = page.locator('xpath=//*[@data-testid="Batch Number"]');
        this.batchQuantity = page.locator('xpath=//*[@data-testid="Batch Quantity"]');
        this.inStockQuantity=page.locator("xpath=//input[@name='inStockQuantity']")
        this.purchaseQuantity = page.locator('xpath=//*[@data-testid="Purchase Quantity"]');
        this.serialNumber = page.locator('xpath=//*[@data-testid="Serial Number"]');
        this.sterlisationExpiryDate = page.locator('xpath=//*[@data-testid="Sterlisation Expiry Date"]');
        this.manufacturedDate = page.locator('xpath=//*[@data-testid="Manufactured Date"]');
        this.receivedDate = page.locator('xpath=//*[@data-testid="Received Date"]');
        this.expiryDate = page.locator('xpath=//*[@data-testid="Expiry Date"]');
        this.retailPrice = page.locator('xpath=//input[@name="retailPrice"]');
        this.purchaseRate=page.locator("xpath=//input[@name='purchaseRate']")
        this.unitCost=page.locator("xpath=//input[@name='unitCostField']")
        this.saveButton=page.locator("xpath=//button[@data-testid='Save']")
        this.deleteBatch=page.locator("xpath=//button[@data-testid='Delete Batch']")


        //Increment/Decrement Batch
        this.quantityChahngeType=page.locator("xpath=//input[@name='quantityChangeType']")
        this.batchQuantityChange=page.locator("xpath=//input[@name='batchQuantityChange']")
        this.saveButton=page.locator("xpath=//button[@data-testid='Save']")
        this.selectIncreReason=page.locator("xpath=//input[@name='reason']")
        this.saveButtonForIncreDecreReasonbutton=page.locator("xpath=//button[@aria-label='saveReason']")



        //Extra Batch Details
        this.extraBatchLink=page.locator("xpath=//a[@aria-label='ExtraBatch']")
        

    }

    async enterSupplierName(value) {
    await this.suppliername.fill(value);
    const actual = await this.suppliername.inputValue();
    if (actual !== value) throw new Error(`❌ Supplier Name mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Supplier Name filled correctly: "${actual}"`);
}

    async enterManufacturer(value) {
    await this.manufacturer.fill(value);
    const actual = await this.manufacturer.inputValue();
    if (actual !== value) throw new Error(`❌ Manufacturer mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Manufacturer filled correctly: "${actual}"`);
}

    async enterBatchNumber(value) {
    await this.batchNumber.fill(value);
    const actual = await this.batchNumber.inputValue();
    if (actual !== value) throw new Error(`❌ Batch Number mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Batch Number filled correctly: "${actual}"`);
}

    async enterBatchQuantity(value) {
    await this.batchQuantity.fill(value);
    const actual = await this.batchQuantity.inputValue();
    if (actual !== value) throw new Error(`❌ Batch Quantity mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Batch Quantity filled correctly: "${actual}"`);
}
    async enterInStockQuantity(value) {
    await this.inStockQuantity.fill(value);
    const actual = await this.inStockQuantity.inputValue();
    if (actual !== value) throw new Error(`❌ In-Stock Quantity mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ In-Stock Quantity filled correctly: "${actual}"`);
}

    async enterPurchaseQuantity(value) {
    await this.purchaseQuantity.fill(value);
    const actual = await this.purchaseQuantity.inputValue();
    if (actual !== value) throw new Error(`❌ Purchase Quantity mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Purchase Quantity filled correctly: "${actual}"`);
}

async enterSerialNumber(value) {
    await this.serialNumber.fill(value);
    const actual = await this.serialNumber.inputValue();
    if (actual !== value) throw new Error(`❌ Serial Number mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Serial Number filled correctly: "${actual}"`);
}

    async enterSterilisationExpiryDate(value) {
    await this.sterlisationExpiryDate.fill(value);
    const actual = await this.sterlisationExpiryDate.inputValue();
    if (actual !== value) throw new Error(`❌ Sterilisation Expiry Date mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Sterilisation Expiry Date filled correctly: "${actual}"`);
}

async enterManufacturedDate(value) {
    await this.manufacturedDate.fill(value);
    const actual = await this.manufacturedDate.inputValue();
    if (actual !== value) throw new Error(`❌ Manufactured Date mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Manufactured Date filled correctly: "${actual}"`);
}

    async enterReceivedDate(value) {
    await this.receivedDate.fill(value);
    const actual = await this.receivedDate.inputValue();
    if (actual !== value) throw new Error(`❌ Received Date mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Received Date filled correctly: "${actual}"`);
}

async enterExpiryDate(value) {
    await this.expiryDate.fill(value);
    const actual = await this.expiryDate.inputValue();
    if (actual !== value) throw new Error(`❌ Expiry Date mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Expiry Date filled correctly: "${actual}"`);
}


    async enterRetailPrice(value) {
    await this.retailPrice.fill(value);
    const actual = await this.retailPrice.inputValue();
    if (actual !== value) throw new Error(`❌ Retail Price mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Retail Price filled correctly: "${actual}"`);
}

async enterPurchaseRate(value) {
    await this.purchaseRate.fill(value);
    const actual = await this.purchaseRate.inputValue();
    if (actual !== value) throw new Error(`❌ Purchase Rate mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Purchase Rate filled correctly: "${actual}"`);
}

async enterUnitCost(value) {
    await this.unitCost.fill(value);
    const actual = await this.unitCost.inputValue();
    if (actual !== value) throw new Error(`❌ Unit Cost mismatch. Expected: "${value}", Found: "${actual}"`);
    console.log(`✅ Unit Cost filled correctly: "${actual}"`);
}

     async clickOndeleteBatch()
     {
        await this.deleteBatch.click()
     }

    async clickSave() {
        await this.saveButton.click();
    }

    //Increment/Decrement Batch

    async selectQuantityChangeType(ChangeType)
    {
        await this.quantityChahngeType.click()
        await this.page.getByRole('option', { name: ChangeType }).click()
    }

    

    async enterBatchQuantityChange()
    {
        await this.batchQuantityChange.type('5')
    }

    async ClickOnAddIncreDecresaveButton()
    {
        await this.saveButton.click()
    }

    async selectAddBatchReason(selectReason)
    {
        await this.selectIncreReason.click()
        await this.page.getByRole('option', { name: selectReason }).click()
    }
    async ClickOnSaveReason()
    {
        await this.saveButtonForIncreDecreReasonbutton.click()
    }



    //Extra Batch Details
    async clickOnExtraBatchLink()
    {
        await this.extraBatchLink.click()
    }
 
}
module.exports=AddBatch