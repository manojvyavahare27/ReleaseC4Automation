class PharmacyHomePage {
  constructor(page) {
    this.page=page
    this.BackButton = page.locator('button[aria-label="Back-Button"]');
    this.prescriptionTab = page.locator("[data-testid=prescription]");
    this.ptSearchButton = page.locator("button[data-testid=Search]");
    this.ptRxBarcode = page.locator('input[data-testid="Rx Barcode"]');
    this.ptPatientGivenName = page.locator('input[data-testid="Patient Given Name"]');
    this.ptFamilyName = page.locator('input[data-testid="Patient Family Name"]');
    
    this.ptServiceName = page.locator("xpath=//input[@id='papreCliId']");
    this.ptPrescriptionStatus = page.locator('input[data-testid="papreStatus"]');
    this.ptPharmacySearchLocation = page.locator("xpath=//input[@id='pharmacyLocationSearch']");

    this.ptSearchButton=page.locator("xpath=//div[contains(text(),'Search')]")

    //Links
    this.payLink=page.locator("xpath=//a[@data-testid='Pay']")
    this.changeStatusLink=page.locator("xpath=//a[@data-testid='Change Status']")
    this.itemsNotOnPrescriptionButton = page.locator('[data-testid="itemsNotOnPrescription"]');
    this.itemsWithPrescriptionButton = page.locator('[data-testid="itemsWithPrescription"]');
    this.itemsOnlyButton = page.locator('[data-testid="itemsOnly"]');
    this.cancelledPrescriptionButton = page.locator('[data-testid="cancelledPrescription"]');

    this.awaitingProductionLink=page.locator("xpath=//a[normalize-space()='Awaiting Production']")
    this.partiallyProducedLink=page.locator("xpath=//a[normalize-space()='Partially Produced']")
    this.producedLink=page.locator("xpath=//a[normalize-space()='Produced']")

    //Prescription Details
    this.prescriptionTypeInput = page.locator('xpath=//input[@name="prescriptionType"]');
this.prescribedByInput = page.locator('xpath=//input[@name="prescribedBy"]');
this.prescriptionCodeInput = page.locator('xpath=//input[@name="prescriptionCode"]');
this.pdsNominationInput = page.locator('xpath=//input[@name="pdsNomination"]');
this.pharmacyLocationInput = page.locator('xpath=//input[@name="pharmacyLocation"]');
this.forServiceInput = page.locator('xpath=//input[@name="forService"]');
this.clinicDateInput = page.locator('xpath=//input[@name="clinicDate"]');
this.notesInput = page.locator('xpath=//textarea[@name="notes"]');
this.uploadButton = page.locator('xpath=//button[@aria-label="Choose File"]');
this.createPrescriptionButton = page.locator('xpath=//button[@data-testid="Create Prescription"]');
this.createAndAdministerPrescriptionButton = page.locator('xpath=//button[@data-testid="Create and Administer Prescription"]');

    //Dispensing Details
    this.dispensingTab = page.locator('xpath=//button[@data-testid="dispensing"]');
    this.awaitingProductionIcon = page.locator('xpath=//*[@data-testid="Awaiting Production"]');
    this.partiallyProducedIcon = page.locator('xpath=//*[@data-testid="Partially Produced"]');
    this.producedIcon = page.locator('xpath=//*[@data-testid="Produced"]');
    this.collectedIcon = page.locator('xpath=//*[@data-testid="Collected"]');
    this.neverCollectedIcon = page.locator('xpath=//*[@data-testid="Never Collected"]');

    this.buttonSaveDetails=page.locator("xpath=//button[@id=':r46a:']//div[@class='MuiGrid2-root MuiGrid2-direction-xs-row css-1n5khr6'][normalize-space()='Save']")
    this.expandMedicationForDispense=page.locator("xpath=//button[@aria-label='expandRowIconParacetamol 125mg suppositories']")
    this.txtboxDispenseQty=page.locator("xpath=//label[@id='Dispense Quantity']")
    this.butttonDispense=page.locator("xpath=//button[@aria-label='Dispense']")
    this.buttobBackToStock=page.locator("xpath=//button[@data-testid='Back to Stock']")
    this.backtoStockQuantity=page.locator("xpath=//input[@aria-label='quantity_1805']")
    this.txtareaReasonForReturn=page.locator("xpath=//textarea[@id='reasonForReturn']")
    this.buttonSaveBackToStock=page.locator("xpath=//button[@data-testid='saveBacKToStock']")

    //
    this.expandMedicationIcon=page.locator('svg[data-testid="ExpandCircleDownOutlinedIcon"]');
    this.dispenseButton = page.locator("xpath=button[data-testid='Dispense']")
    this.selectCheckBox=page.locator("xpath=//span[@data-testid='hideLabel']//input[@type='checkbox']")
   

    //Labels Printing
    this.smallLabel=page.locator('label[data-testid="Small"] input[type="radio"]');
    this.mediumLabel=page.locator('label[data-testid="Medium"] input[type="radio"]');
    this.largeLabel=page.locator('label[data-testid="Large"] input[type="radio"]');
    this.PrintLabelButton=page.locator("xpath=//div[contains(text(),'Print Multiple Labels')]")

    this.closePopup=page.locator("xpath=//button[@aria-label='cancelIcon']")
    this.associatedCondition=page.locator("xpath=//button[@title='Asthma']")
    this.sideEffectIcon=page.locator("xpath=//button[@id=':rf3i:']//img[@alt='Test Image Avatar']")

    //top 4 links
    this.itemWithPrescriptionLink=page.locator("xpath=//button[@data-testid='itemsWithPrescription']")
    this.itemsOnlyLink=page.locator("xpath=//button[@data-testid='itemsOnly']")
    this.cancelledPrescriptionLink=page.locator("xpath=//button[@data-testid='cancelledPrescription']")
    this.itemNotOnPrescriptionLink=page.locator("xpath=//button[@data-testid='itemsNotOnPrescription']")


   //ItemWithPrescriptionLink
   this.expandMedication=page.locator("xpath=//button[@aria-label='expandRowIconundefined']")
   this.refillLeft=page.locator("xpath=//a[@aria-label='refillsLeft']")
   this.externalRefillNo=page.locator("xpath=//input[@data-testid='External Refills No.']")
    this.saveButton=page.locator("xpath=//button[@data-testid='Save']")

  }

  async clickOnSaveExternalRefillQty()
  {
    await this.saveButton.click()
  }
  async enterExternalRefillQty()
  {
    await this.externalRefillNo.clear()
    await this.externalRefillNo.type('1')
  }

  async ClickOnExpandMedication()
  {
    await this.expandMedication.click()
  }
  async clickOnRefillLeftLink()
  {
    await this.refillLeft.click()
  }

  //top 4 links methods
  async clickOnitemWithPrescriptionLink() {
    await this.itemWithPrescriptionLink.click();
  }
  
  async clickOnitemsOnlyLink() {
    await this.itemsOnlyLink.click();
  }
  
  async clickOncancelledPrescriptionLink() {
    await this.cancelledPrescriptionLink.click();
  }
  
  async clickOnitemNotOnPrescriptionLink() {
    await this.itemNotOnPrescriptionLink.click();
  }


    async clickOnClosePopup()
    {
      await this.closePopup.click()
    }

    async clickOnAssociatedConditionIcon()
    {
      await this.associatedCondition.click()
    }
    async clickOnSideEffectIcon()
    {
      await this.sideEffectIcon.click()
    }
  //Prescription Tab
  async clickBackButton() {
    await this.BackButton.click();
  }

  async clickPrescriptionTab() {
    await this.prescriptionTab.click();
  }

  async clickSearchButton() {
    await this.ptSearchButton.click();
  }

  async enterRxBarcode(barcode) {
    await this.ptRxBarcode.fill(barcode);
  }

  async enterPatientGivenName(name) {
    await this.ptPatientGivenName.fill(name);
  }

  async enterPatientFamilyName(name) {
    await this.ptFamilyName.fill(name);
  }

  async enterServiceName(serviceName) {
    await this.ptServiceName.fill(serviceName);
  }

  async enterPrescriptionStatus(status) {
   // await this.ptPrescriptionStatus.fill(status);
   await this.page.getByTestId('papreStatus').getByPlaceholder('Please Select').click()
    await this.page.getByRole('option', { name: 'Collected', exact: true }).click();

  }

  async enterPharmacySearchLocation(location) {
    await this.ptPharmacySearchLocation.fill(location);
  }
  async ClickOnSearchButton()
  {
     await this.ptSearchButton.click()
  }

  //Links Methods
  async clickOnPayLink()
  {
    await this.payLink.click()
  }
  async clickOnChangeStatus()
  {
    await this.changeStatusLink.click()
  }
  async clickItemsNotOnPrescription() {
    await this.itemsNotOnPrescriptionButton.click();
  }

  async clickItemsWithPrescription() {
    await this.itemsWithPrescriptionButton.click();
  }

  async clickItemsOnly() {
    await this.itemsOnlyButton.click();
  }

  async clickCancelledPrescription() {
    await this.cancelledPrescriptionButton.click();
  }

  //Prescription Details

  async fillPrescriptionType(prescriptionType) {
    await this.prescriptionTypeInput.click();
    await this.page.getByRole('option', { name: prescriptionType }).click();
  }

  async clickOnAwaitingProductionLink()
  {
    await this.awaitingProductionLink.click()
  }

  async clickOnPartiallyProducedLink()
  {
    await this.partiallyProducedLink.click()
  }
  async clickOnProducedLink()
  {
    await this.producedLink.click()
  }


  // async selectReferralType(ref_referral_type_eli_text)
  //   {
  //       await this.dropdownreferraltype.click()
  //       await this.page.getByRole('option', { name: ref_referral_type_eli_text }).click()
  //   }

  async fillPrescribedBy(name) {
    await this.page.type(this.prescribedByInput, name);
    
  }

  async fillPrescriptionCode(code) {
    await this.prescriptionCodeInput.type(code)    
  }

  async fillPdsNomination(nomination) {
    await this.page.type(this.pdsNominationInput, nomination);
  }

  async fillPharmacyLocation(location) {
    await this.page.type(this.pharmacyLocationInput, location);
  }

  async fillForService(service) {
    await this.page.type(this.forServiceInput, service);
  }

  async fillClinicDate(date) {
    await this.page.type(this.clinicDateInput, date);
  }

  async fillNotes(notes) {
    //await this.page.type(this.notesInput, notes);
    await this.notesInput.type(notes)
  }

  async uploadFile(filePath) {
    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click(this.uploadButton),
    ]);
    await fileChooser.setFiles(filePath);
  }

  async clickOncreatePrescription() {
   // await this.page.click(this.createPrescriptionButton);
   await this.createPrescriptionButton.click()
  }

  async clickOnCreateAndAdministerPrescription() {
    await this.page.click(this.createAndAdministerPrescriptionButton);
  }

  
  async clickHistoryIconForMedicine(medicineName) {
    const historyIcon = this.page.locator(`xpath=//h1[normalize-space()='${medicineName}']/following::img[@alt='History Image Avatar'][1]`);
    console.log("historyIcon xpath is :" + historyIcon);    
    await historyIcon.click();
  }
  
  

  //Dispensing Details
  async clickDispensingTab() {
    await this.page.click(this.dispensingTab);
  }
  async clickAwaitingProduction() {
    await this.awaitingProductionIcon.click();
  }

  async clickPartiallyProduced() {
    await this.partiallyProducedIcon.click();
  }

  async clickProduced() {
    await this.producedIcon.click();
  }

  async clickCollected() {
    await this.collectedIcon.click();
  }

  async clickNeverCollected() {
    await this.neverCollectedICon.click();
  }

  async clickOnSaveButton()
  {
    await this.buttonSaveDetails.click()
  }

  async clickOnExpandIconForDispense()
  {
    await this.expandMedicationForDispense.click()
  }

  async enterDispenseQty()
  {
    await this.txtboxDispenseQty.fill('0')
    await this.txtboxDispenseQty.type('2')
  }
  async clickOnDispenseButton()
  {
    await this.butttonDispense.click()
  }

  async clickOnBackToStockButton()
  {
    await this.buttobBackToStock.click()
  }

  async enterBackToStockQty()
  {
   // await this.backtoStockQuantity.fill('0')
    await this.backtoStockQuantity.fill('2')
  }
  async enterReasonForReturn()
  {
    await this.txtareaReasonForReturn.type('For testing')
  }
  async clickOnSaveBackToStock()
  {
    await this.buttonSaveBackToStock.click()
  }
  //
  async clickExpandIcon() {
    await this.expandMedicationIcon.click();
}
async clickDispenseButton() {
    await this.page.click(this.dispenseButton);
}
async selectCheckBoxforPrescription()
{
  await this.selectCheckBox.click()
}

async clickOnCreatePrescriptionButton()
{
  await this.createPrescription.click()
}


async selectSmall() {
    await this.smallLabel.check();
}

async selectMedium() {
    await this.mediumLabel.check();
}

async selectLarge() {
    await this.largeLabel.check();
}
async clickOnPrintMultipleLabel()
{
    await this.PrintLabelButton()
}
}
module.exports = PharmacyHomePage;
