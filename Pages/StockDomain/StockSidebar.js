class StockSidebar
{
    constructor(page)
    {
        this.page=page

        this.stockControlButton = page.locator("xpath=//button[@data-testid='tasks']");
        this.stockLocationsTab = page.locator("xpath=//span[normalize-space()='Stock Locations']");
        ////
        this.allLocationsLink=page.locator("xpath=//div[@data-testid='allLocations']")
        this.kitchensLink=page.locator("xpath=//div[@data-testid='kitchens']")
        this.labLinks=page.locator("xpath=//div[@data-testid='labs']")
        this.pharmaciesLink=page.locator("xpath=//div[@data-testid='pharmacies']")
        this.stockLocationsLink=page.locator("xpath=//div[@data-testid='stockLocations']")

        //Manage Stock Tab
        this.manageStockTab = page.locator("xpath=//span[normalize-space()='Manage Stock']");
        this.searchAndAddStockLink=page.locator("xpath=//div[@data-testid='searchAddStock']")
        this.addStockRequisitionLink=page.locator("xpath=//div[@data-testid='addStockRequisitions']")
        this.batchedLink=page.locator("xpath=//div[@data-testid='batches']")

        //External Requisition
        this.externalRequisitionTab=page.locator("xpath=//div[@data-testid='externalRequisitions']")
        this.orderReceived=page.locator("xpath=//div[@data-testid='orderReceived']")
        this.orderApproved=page.locator("xpath=//div[@data-testid='orderApproved']")
        this.orderPicked=page.locator("xpath=//div[@data-testid='orderPicked']")
        this.orderDispatch=page.locator("xpath=//div[@data-testid='orderDispatched']")
        this.importedStock=page.locator("xpath=//div[@data-testid='importedStock']")

        //Internal Requisition
        this.internalRequisitionTab=page.locator("xpath=//div[@data-testid='internalRequisitions']")
        this.draftLink=page.locator("xpath=//div[@data-testid='draft']")
        this.awaitingApprovalLink=page.locator("xpath=//div[@data-testid='awaitingApproval']")
        this.requestedLink=page.locator("xpath=//div[@data-testid='requested']")
        this.completedLink=page.locator("xpath=//div[@data-testid='completed']")
        this.incompleteLink=page.locator("xpath=//div[@data-testid='incomplete']")
        this.rejectedLink=page.locator("xpath=//div[@data-testid='rejected']")   
        this.receivingLink=page.locator("xpath=//div[@data-testid='receiving']")
        this.returnsLink=page.locator("xpath=//div[@data-testid='returns']")
        this.stockConsumptionLink=page.locator("xpath=//div[@data-testid='stockConsumption']")
        this.transferLink=page.locator("xpath=//div[@data-testid='transfers']")
        this.viewStockFormularyLink=page.locator("xpath=//div[@data-testid='viewStockFormulary']")
        this.viewStockRequisitionsLink=page.locator("xpath=//div[@data-testid='viewStockRequisitions']")
        this.viewPrintDispatchLink=page.locator("xpath=//div[@data-testid='viewPrintDispatches']")
        this.viewPrintPickListLink=page.locator("xpath=//div[@data-testid='viewPrintPicklists']")

        //Cold Storage tab
        this.coldStorageTab=page.locator("xpath=//span[normalize-space()='Cold Storage']")
        this.changeLocationLink=page.locator("xpath=//div[@data-testid='changeLocation']")
        this.freezerStatusLink=page.locator("xpath=//div[@data-testid='freezerStatus']")
        this.freezersLink=page.locator("xpath=//div[@data-testid='freezers']")

        //Stock Reports tab
        this.stockReportsTab=page.locator("xpath=//span[normalize-space()='Stock Reports']")
        this.todaysStockExpiryLink=page.locator("xpath=//div[@data-testid='todaysStockExpiry']")
        this.stockReportLink=page.locator("xpath=//div[@data-testid='stockReports']")        

    }
    async clickOnStockControlButton() {
        await this.stockControlButton.click();
    }
    
    async clickOnStockLocationsTab() {
        await this.stockLocationsTab.click();
    }
    
    async clickOnAllLocationsLink() {
        await this.allLocationsLink.click();
    }
    
    async clickOnKitchensLink() {
        await this.kitchensLink.click();
    }
    
    async clickOnLabLinks() {
        await this.labLinks.click();
    }
    
    async clickOnPharmaciesLink() {
        await this.pharmaciesLink.click();
    }
    
    async clickOnStockLocationsLink() {
        await this.stockLocationsLink.click();
    }
    
    async clickOnManageStockTab() {
        await this.manageStockTab.click();
    }
    
    async clickOnSearchAndAddStockLink() {
        await this.searchAndAddStockLink.click();
    }
    
    async clickOnAddStockRequisitionLink() {
        await this.addStockRequisitionLink.click();
    }
    
    async clickOnBatchedLink() {
        await this.batchedLink.click();
    }
    
    async clickOnExternalRequisitionTab() {
        await this.externalRequisitionTab.click();
    }
    
    async clickOnOrderReceived() {
        await this.orderReceived.click();
    }
    
    async clickOnOrderApproved() {
        await this.orderApproved.click();
    }
    
    async clickOnOrderPicked() {
        await this.orderPicked.click();
    }
    
    async clickOnOrderDispatch() {
        await this.orderDispatch.click();
    }
    
    async clickOnImportedStock() {
        await this.importedStock.click();
    }
    
    async clickOnInternalRequisitionTab() {
        await this.internalRequisitionTab.click();
    }
    
    async clickOnDraftLink() {
        await this.draftLink.click();
    }
    
    async clickOnAwaitingApprovalLink() {
        await this.awaitingApprovalLink.click();
    }
    
    async clickOnRequestedLink() {
        await this.requestedLink.click();
    }
    
    async clickOnCompletedLink() {
        await this.completedLink.click();
    }
    
    async clickOnIncompleteLink() {
        await this.incompleteLink.click();
    }
    
    async clickOnRejectedLink() {
        await this.rejectedLink.click();
    }
    
    async clickOnReceivingLink() {
        await this.receivingLink.click();
    }
    
    async clickOnReturnsLink() {
        await this.returnsLink.click();
    }
    
    async clickOnStockConsumptionLink() {
        await this.stockConsumptionLink.click();
    }
    
    async clickOnTransferLink() {
        await this.transferLink.click();
    }
    
    async clickOnViewStockFormularyLink() {
        await this.viewStockFormularyLink.click();
    }
    
    async clickOnViewStockRequisitionsLink() {
        await this.viewStockRequisitionsLink.click();
    }
    
    async clickOnViewPrintDispatchLink() {
        await this.viewPrintDispatchLink.click();
    }
    
    async clickOnViewPrintPickListLink() {
        await this.viewPrintPickListLink.click();
    }
    
    async clickOnColdStorageTab() {
        await this.coldStorageTab.click();
    }
    
    async clickOnChangeLocationLink() {
        await this.changeLocationLink.click();
    }
    
    async clickOnFreezerStatusLink() {
        await this.freezerStatusLink.click();
    }
    
    async clickOnFreezersLink() {
        await this.freezersLink.click();
    }
    
    async clickOnStockReportsTab() {
        await this.stockReportsTab.click();
    }
    
    async clickOnTodaysStockExpiryLink() {
        await this.todaysStockExpiryLink.click();
    }
    
    async clickOnStockReportLink() {
        await this.stockReportLink.click();
    }
    
}
module.exports=StockSidebar