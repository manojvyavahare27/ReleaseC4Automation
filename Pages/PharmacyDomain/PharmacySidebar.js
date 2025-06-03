class PharmacySidebars {
    constructor(page) {
        this.page = page;

        // Sidebar
        this.cardioLocation = page.locator("xpath=//h1[normalize-space()='Cardio Location']");
        this.patientsTab = page.locator("xpath=//span[normalize-space()='Patients']");
        this.findPatientSidebarLink = page.locator("xpath=//h1[normalize-space()='Find Patient']");
        this.medicationTab = page.locator("xpath=//h1[normalize-space()='Search Prescriptions']");
        this.searchPrescriptionTab = page.locator("xpath=//h1[normalize-space()='Search Prescriptions']");
        this.prescriptionMedicationSidebarLink = page.locator("xpath=//h1[normalize-space()='Prescription Medications']");
        this.externalPrescriptionTab = page.locator("xpath=//h1[normalize-space()='External Prescriptions']");
        this.orderPrescriptionSidebarLink = page.locator("xpath=//h1[normalize-space()='Ordered Prescriptions']");
        this.receivedPrescriptionSidebarLink = page.locator("xpath=//h1[normalize-space()='Received Prescriptions']");
        this.importedPrescriptionSidebarLink = page.locator("xpath=//h1[normalize-space()='Imported Prescriptions']");
        this.administrationTab = page.locator("xpath=//h1[normalize-space()='Administrations']");
        this.loyaltiSchemeTab = page.locator("xpath=//h1[normalize-space()='Loyalty Scheme']");
        this.financeTab = page.locator("xpath=//span[normalize-space()='Finance']");
        this.pointOfSaleSidebarLink = page.locator("xpath=//h1[normalize-space()='Point of Sale']");
        this.invoiceSidebarLink = page.locator("xpath=//h1[normalize-space()='Invoices']");
        this.minPrescriptionCostSidebarLink = page.locator("xpath=//h1[normalize-space()='Min Prescription Cost']");
        this.pharmacyCommsTab = page.locator("xpath=//span[normalize-space()='Pharmacy Comms']");
        this.stockSidebarLink = page.locator("xpath=//h1[normalize-space()='Stock']");
    }

    async clickOnCardioLocation() {
        await this.cardioLocation.click();
    }

    async clickOnPatientsTab() {
        await this.patientsTab.click();
    }

    async clickOnFindPatientSidebarLink() {
        await this.findPatientSidebarLink.click();
    }

    async clickOnMedicationTab() {
        await this.medicationTab.click();
    }

    async clickOnSearchPrescriptionTab() {
        await this.searchPrescriptionTab.click();
    }

    async clickOnPrescriptionMedicationSidebarLink() {
        await this.prescriptionMedicationSidebarLink.click();
    }

    async clickOnExternalPrescriptionTab() {
        await this.externalPrescriptionTab.click();
    }

    async clickOnOrderPrescriptionSidebarLink() {
        await this.orderPrescriptionSidebarLink.click();
    }

    async clickOnReceivedPrescriptionSidebarLink() {
        await this.receivedPrescriptionSidebarLink.click();
    }

    async clickOnImportedPrescriptionSidebarLink() {
        await this.importedPrescriptionSidebarLink.click();
    }

    async clickOnAdministrationTab() {
        await this.administrationTab.click();
    }

    async clickOnLoyaltiSchemeTab() {
        await this.loyaltiSchemeTab.click();
    }

    async clickOnFinanceTab() {
        await this.financeTab.click();
    }

    async clickOnPointOfSaleSidebarLink() {
        await this.pointOfSaleSidebarLink.click();
    }

    async clickOnInvoiceSidebarLink() {
        await this.invoiceSidebarLink.click();
    }

    async clickOnMinPrescriptionCostSidebarLink() {
        await this.minPrescriptionCostSidebarLink.click();
    }

    async clickOnPharmacyCommsTab() {
        await this.pharmacyCommsTab.click();
    }

    async clickOnStockSidebarLink() {
        await this.stockSidebarLink.click();
    }
}

module.exports = PharmacySidebars;
