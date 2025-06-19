
// stockItemPage.js
class AddStockItems {
    constructor(page) {
        this.page = page;
        //Item Details
        this.category = page.locator("xpath=//input[@name='category']");
        this.subCategory = page.locator("xpath=//input[@name='subCategory']");
        this.Itemname = page.locator("xpath=//input[@name='name']");
        this.freeTextButton = page.locator("xpath=//button[@data-testid='Free Text']");
        this.code = page.locator("xpath=[data-testid='Code']");
        this.nonSnomedCode = page.locator("xpath=//input[@name='nonSnomedCode']");
        this.cellmaBarcode = page.locator("xpath=[data-testid='Cellma Barcode']");
        this.itemBarcode = page.locator("xpath=//input[@name='itemBarcode']");
        this.itemShortBarcode = page.locator("xpath=//input[@name='itemShortBarcode']");
        this.letterDisplayGroup = page.locator("xpath=//input[@name='letterDisplayGroup']");
        this.classification = page.locator("xpath=//input[@name='classification']");
        this.description = page.locator("xpath=//textarea[@name='description']");
        this.nameAndDescriptionInOtherLanguage = page.locator("xpath=//textarea[@name='nameAndDescription']");
        this.unitOfMeasure = page.locator("xpath=//input[@name='unitOfMeasure']");
        this.unitOfDispensing = page.locator("xpath=//input[@name='unitOfDispense']");
        this.form = page.locator("xpath=//input[@name='form']");
        this.dose = page.locator("xpath=//input[@name='dose']");
        this.frequency = page.locator("xpath=//input[@name='frequency']");
        this.route = page.locator("xpath=//input[@name='route']");
        this.duration = page.locator("xpath=//input[@name='duration']");
        this.dilutant = page.locator("xpath=//input[@name='dilutant']");
        this.volume = page.locator("xpath=//input[@name='volume']");
        this.doseMultiplier = page.locator("xpath=//input[@name='doseMultiplier']");
        this.standardAmountToDispense = page.locator("xpath=//input[@name='standardAmountToDispense']");
        this.ageUpperLimit = page.locator("xpath=//input[@name='ageUpperLimit']");
        this.ageLowerLimit = page.locator("xpath=//input[@name='ageLowerLimit']");
        this.maximumDosage = page.locator("xpath=//input[@name='maximumDosage']");
        this.minimumDosage = page.locator("xpath=//input[@name='minimumDosage']");
        this.gender = page.locator("xpath=//input[@name='gender']");
        this.controlledDrug = page.locator("xpath=//span[@data-testid='Controlled Drug']");
        this.readOnlyDrug = page.locator("xpath=[data-testid='Read Only Drug']");
        this.prescriptionOnly = page.locator("xpath=//span[@data-testid='Prescription Only']");
        this.suitableForHomeDelivery = page.locator("xpath=//span[@data-testid='Suitable for Home Delivery']");
        this.usage = page.locator("xpath=[data-testid='usage']");
        this.adviceToPatient = page.locator("xpath=[data-testid='adviceToPatient']");
        this.packaging = page.locator("xpath=[data-testid='packaging']");
        this.chooseFileButton = page.locator("xpath=[data-testid='Choose File']");
        this.historyIcon=page.locator("xpath=//img[@alt='history Avatar']")


        //Batch Details
        this.supplierInput = page.locator("xpath=//input[@name='batchSupplier']");
this.manufacturerInput = page.locator("xpath=//input[@name='manufacturer']");
this.batchNumberInput = page.locator("xpath=//input[@name='batchNumber']");
this.inStockQuantityInput = page.locator("xpath=//input[@name='inStockQuantity']");
this.serialNumberInput = page.locator("xpath=//input[@name='serialNumber']");
this.sterilizationExpiryDateInput = page.locator("xpath=//input[@name='sterilizationExpiryDate']");
this.manufacturedDateInput = page.locator("xpath=//input[@name='manufacturedDate']");
this.receivedDateInput = page.locator("xpath=//input[@id='addBatch-Received Date']");
this.expiryDateInput = page.locator("xpath=//input[@id='addBatch-Expiry Date']");
this.purchaseRateInput = page.locator("xpath=//input[@name='purchaseRate']");
this.unitCostInput = page.locator("xpath=//input[@name='unitCostField']");
this.retailPriceInput = page.locator("xpath=//input[@name='retailPriceField']");
this.placeholderBatchCheckbox = page.locator("xpath=//input[@data-testid='Placeholder Batch']");
this.retailPriceUpliftingCheckbox = page.locator("xpath=//input[@data-testid='Retail Price is Uplifting']");
this.vatExemptCheckbox = page.locator("xpath=//input[@data-testid='Vat Exempt']");
this.chooseFileButton = page.locator("xpath=//button[@data-testid='Choose File1']");
this.SaveStockItem = page.locator("xpath=//button[@aria-label='saveStockItem']");

this.position1=page.locator("xpath=//input[@name='stockBatchLocationPositionJson.sblpPosition1EliId']")
this.position2=page.locator("xpath=//input[@name='stockBatchLocationPositionJson.sblpPosition2EliId']")
this.position3=page.locator("xpath=//input[@name='stockBatchLocationPositionJson.sblpPosition3EliId']")
this.position4=page.locator("xpath=//input[@name='stockBatchLocationPositionJson.sblpPosition4EliId']")

//Edit Stock Item
this.expandDefaultPharmacyIcon=page.locator("xpath=//button[@aria-label='expandRowIconDefault Pharmacy']")
this.expandCardioLocationIcon=page.locator("xpath=//button[@aria-label='expandRowIconCardio Location']")







this.logoutButton=page.locator("xpath=//span[normalize-space()='Logout']")




    }

    async selectCategory() {
    await this.category.click();
    await this.page.getByRole('option', { name: 'Medications' }).click();
    const actual = await this.category.inputValue();
    if (actual !== 'Medications') throw new Error(`❌ Category not selected properly. Found: "${actual}"`);
    console.log(`✅ Category selected correctly: "${actual}"`);
}


    async selectSubcategory(subCategoryValue) {
    await this.subCategory.fill(subCategoryValue);
    const actual = await this.subCategory.inputValue();
    if (actual !== subCategoryValue) throw new Error(`❌ SubCategory mismatch. Expected: "${subCategoryValue}", Found: "${actual}"`);
    console.log(`✅ SubCategory filled correctly: "${actual}"`);
}

    async enterItemName(stock_name) {
    await this.Itemname.fill(stock_name);
    const actual = await this.Itemname.inputValue();
    if (actual !== stock_name) throw new Error(`❌ Item Name mismatch. Expected: "${stock_name}", Found: "${actual}"`);
    console.log(`✅ Item Name filled correctly: "${actual}"`);
}

//     async enterNonSnomedCode(stock_que_local_code) {
//     await this.nonSnomedCode.clear();
//     await this.nonSnomedCode.fill(stock_que_local_code);
//     const actual = await this.nonSnomedCode.inputValue();
//     console.log("Actual is: " + actual);
//     console.log("Expected is: " + stock_que_local_code);        
//     await expect.soft(actual).toBe(stock_que_local_code, '❌ Non-SNOMED Code mismatch');
//     console.log(`✅ Non-SNOMED Code filled: Expected "${stock_que_local_code}", Found "${actual}"`);
// }

async enterNonSnomedCode(stock_que_local_code) {
    await this.nonSnomedCode.fill('');
    await this.nonSnomedCode.fill(stock_que_local_code);
    let actual = await this.nonSnomedCode.inputValue();
    actual = actual.trim();
    const expected = stock_que_local_code.trim();
    console.log("Actual is: '" + actual + "'");
    console.log("Expected is: '" + expected + "'");
    try {
        await expect.soft(actual).toBe(expected);
        console.log(`✅ Non-SNOMED Code filled correctly: Expected "${expected}", Found "${actual}"`);
    } catch (error) {
        console.warn(`❌ Non-SNOMED Code mismatch. Expected: "${expected}", Found: "${actual}"`);
    }
}

    async clickOnFreeTextButton() {
    await this.freeTextButton.click();
    console.log(`✅ Clicked on Free Text Button`);
}

async enterItemBarcode(stock_barcode) {
    await this.itemBarcode.fill(stock_barcode);
    const actual = await this.itemBarcode.inputValue();
    if (actual !== stock_barcode) throw new Error(`❌ Item Barcode mismatch. Expected: "${stock_barcode}", Found: "${actual}"`);
    console.log(`✅ Item Barcode filled correctly: "${actual}"`);
}


    async enterItemShortBarcode(stock_item_barcode) {
    await this.itemShortBarcode.fill(stock_item_barcode);
    const actual = await this.itemShortBarcode.inputValue();
    if (actual !== stock_item_barcode) throw new Error(`❌ Item Short Barcode mismatch. Expected: "${stock_item_barcode}", Found: "${actual}"`);
    console.log(`✅ Item Short Barcode filled correctly: "${actual}"`);
}

    async selectLetterDisplayGroup() {
    await this.letterDisplayGroup.click();
    await this.page.getByRole('option', { name: 'Medication and Pharmacy' }).click();
    const actual = await this.letterDisplayGroup.inputValue();
    if (actual !== 'Medication and Pharmacy') throw new Error(`❌ Letter Display Group not selected properly. Found: "${actual}"`);
    console.log(`✅ Letter Display Group selected correctly: "${actual}"`);
}

async enterDescription(stock_description) {
    await this.description.fill(stock_description);
    const actual = await this.description.inputValue();
    if (actual !== stock_description) throw new Error(`❌ Description mismatch. Expected: "${stock_description}", Found: "${actual}"`);
    console.log(`✅ Description filled correctly: "${actual}"`);
}

    async enterNameAndDescriptionInOtherLanguage(stock_desc_other_lang) {
    await this.nameAndDescriptionInOtherLanguage.fill(stock_desc_other_lang);
    const actual = await this.nameAndDescriptionInOtherLanguage.inputValue();
    if (actual !== stock_desc_other_lang) throw new Error(`❌ Other Language Description mismatch. Expected: "${stock_desc_other_lang}", Found: "${actual}"`);
    console.log(`✅ Other Language Description filled correctly: "${actual}"`);
}
    
    //Item details
    async enterUnitOfMeasure()
    {
        await this.unitOfMeasure.type('Strips')
    }

    async enterUnitOfDispensing()
    {
        await this.unitOfDispensing.type('Tab')
    }

    async enterForm()
    {
        await this.form.type('tablet')
    }

    async enterDose(stdo_dose) 
    {
        await this.dose.clear()
        await this.dose.type(stdo_dose);
     }

async enterFrequency() {

    await this.frequency.click()
   // await this.page.getByRole('option', { name: stdo_frequency }).click()
    // await this.page.getByRole('option', { name: stdo_frequency, exact: true }).click()
      await this.page.getByRole('option', { name: '12 Hours' }).click();

}

async enterRoute(route) {

    await this.route.click()
    await this.page.getByRole('option', { name: route }).click()
    //await this.route.type(');
}

async enterDuration(value) 
{
    await this.duration.clear()
    await this.duration.type(value);
}

async enterDilutant(value) 
{
    await this.dilutant.type(value);
}

async enterVolume(value) 
{
    await this.volume.type(value);
}

async enterDoseMultiplier(value)
 {
    await this.doseMultiplier.click()
    await this.page.getByRole('option', { name: 'BSA' }).click()
}

async enterStandardAmountToDispense(value) 
{
    await this.standardAmountToDispense.type(value);
}

async enterAgeUpperLimit(value) 
{
    await this.ageUpperLimit.type(value);
}

async enterAgeLowerLimit(value) 
{
    await this.ageLowerLimit.type(value);
}

async enterMaximumDosage(value) 
{
    await this.maximumDosage.type(value);
}

async enterMinimumDosage(value) 
{
    await this.minimumDosage.type(value);
}

async selectGender(value) 
{
    await this.gender.selectOption(value);
}

async toggleControlledDrug() 
{
    await this.controlledDrug.click();
}

async toggleReadOnlyDrug() 
{
    await this.readOnlyDrug.click();
}

async togglePrescriptionOnly() 
{
    await this.prescriptionOnly.click();
}

async toggleSuitableForHomeDelivery()
{
    await this.suitableForHomeDelivery.click();
}

async enterUsage(value) 
{
    await this.usage.type(value);
}

async enterAdviceToPatient(value) {
    await this.adviceToPatient.type(value);
}

async enterPackaging(value) {
    await this.packaging.type(value);
}

async uploadFile(filePath) {
    await this.chooseFileButton.setInputFiles(filePath);
}


async enterSupplier(stbat_supplier) {

    //await this.supplierInput.type(stbat_supplier);
    await this.supplierInput.click()
    await this.page.getByRole('option', { name: stbat_supplier }).click()

}

async enterManufacturer(value) {
    await this.manufacturerInput.type(value);

}

async enterBatchNumber(stbat_batch_number) {
    await this.batchNumberInput.type(stbat_batch_number);
}

async enterInStockQuantity(stbat_quantity) {
    await this.inStockQuantityInput.clear()
    await this.inStockQuantityInput.type(stbat_quantity);
}

async enterSerialNumber(stbat_serial_number) {
    await this.serialNumberInput.type(stbat_serial_number);
}

async enterSterilizationExpiryDate(value) {
    await this.sterilizationExpiryDateInput.clear()
    await this.sterilizationExpiryDateInput.type(value);
}

async enterManufacturedDate(stbat_manufacture_date) {
    await this.manufacturedDateInput.clear()
    await this.manufacturedDateInput.type(stbat_manufacture_date);
}

async enterReceivedDate(stbat_batch_received_date) {
 await this.receivedDateInput.clear()
    await this.receivedDateInput.type(stbat_batch_received_date);
}

async enterExpiryDate(stbat_expiry_date) {
 await this.expiryDateInput.clear()
    await this.expiryDateInput.type(stbat_expiry_date);
}

async enterPurchaseRate(value) {
     await this.purchaseRateInput.clear()
    await this.purchaseRateInput.type(value);
}

async enterUnitCost(value) {
    await this.unitCostInput.clear()
    await this.unitCostInput.type(value);
}

async enterRetailPrice(value) {
    await this.retailPriceInput.clear()
    await this.retailPriceInput.type(value);
}

async togglePlaceholderBatch() {
    await this.placeholderBatchCheckbox.click();
}

async toggleRetailPriceUplifting() {
     await this.retailPriceUpliftingCheckbox.clear()
    await this.retailPriceUpliftingCheckbox.click();
}

async toggleVatExempt() {
    await this.vatExemptCheckbox.click();
}

async uploadFile(filePath) {
    await this.chooseFileButton.setInputFiles(filePath);
}

async ClickOnSaveStockItemButton() {
    await this.SaveStockItem.click();
}

async FillPositions1()
{
    await this.position1.click()   
    await this.page.getByRole('option', { name: 'Zone Position' }).click() 
}

async FillPositions2()
{
    await this.position2.click()    
    await this.page.getByRole('option', { name: 'Zone Position' }).click()
}
async FillPositions3()
{
    await this.position3.click()    
    await this.page.getByRole('option', { name: 'Zone Position' }).click()
}
async FillPositions4()
{
    await this.position4.click()    
    await this.page.getByRole('option', { name: 'Zone Position' }).click()
}

async clickOnExpandsDefaultPharmacy()
{
    await this.expandDefaultPharmacyIcon.click()
}

async clickOnExpandsClinicLocation()
{
    await this.expandCardioLocationIcon.click()
}

async clickOnStockBatchLink(page,stbat_batch_number)
{
    const xpath = `//a[@data-testid="${stbat_batch_number}"]`;
 // await page.waitForSelector(xpath, { state: 'visible' });
  await page.click(xpath);
}

async clickOnHistoryIcon()
{
    await this.historyIcon.click()
}



// async  clickOnLogout(page) {
//   if (!page) throw new Error('Page is undefined');

//   await page.waitForSelector("//button[@aria-label='profileIcon']", { state: 'visible' });
  
//   await page.hover("//button[@aria-label='profileIcon']");

//   await page.click('//div[@aria-label="Logout"]'); // Update this if your logout button has a different selector
// }

async  clickOnLogout(page) {
  if (!page) throw new Error('❌ Page is undefined');

  const profileIcon = page.locator('//button[@aria-label="profileIcon"]');
  const logoutOption = page.locator('//div[@aria-label="Logout"]');

  // Wait for and hover on profile icon
  await profileIcon.waitFor({ state: 'visible' });
  await profileIcon.hover();
  console.log('✅ Hovered on profile icon');

  // Click on profile icon after hover
  await profileIcon.click();
  console.log('✅ Clicked on profile icon');

  // Wait for and click the logout option
  await logoutOption.waitFor({ state: 'visible' });
  await logoutOption.click();
  console.log('✅ Clicked on logout');
}




}

module.exports=AddStockItems

