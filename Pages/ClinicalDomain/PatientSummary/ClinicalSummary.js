//Sathyanarayan


const { clickElement, typeText, selectFromDropdown} = require('../../../UtilFiles/StaticUtility.js');
const { selectFromSearchResults, selectRadioButton, locateFieldById,clickMCHistoryTableIconsUsingItemName, toggleDivVisibility, clickOnRemoveCustomizableQuestion, clickOnRestoreCustomizableQuestion, showClinicalItemByStatus, showExtraDetailLevel, clickHistoryTableIconsBeforeItemName, clickHistoryTableIconsUsingItemName, replaceLocator, assertElementExists,clickOnFitnessRadioButton,getDropdownLocator } = require('../../../UtilFiles/DynamicUtility.js');

class ClinicalSummary {
    constructor(page) {

        //Search and Add Items to Contact 
       // this.allCategory= page.locator("xpath=//input[@id='allCategory']") 
       this.allCategory= page.locator("xpath=//input[@id='allCategory']") 
        this.allCategorySearchItem = page.locator("xpath=//label[text()='Any Search, Item, Code, Category']")

        //View Menu to View Contact Items
        this.viewContactItemsMenu = page.locator("xpath=//h1[contains(text(), 'View')]/../..//button[@aria-label='Menu Button']")
        this.closeContactItemMenu = page.locator("xpath=//h1[contains(text(), 'Items added to current contact')]/../..//button[@aria-label='Menu Button']")
        this.flag = true
        this.pinContactItemsMenu = page.locator("xpath=//button[@aria-label='pin']")
        this.page = page;
        
        //Item Name to be added/updated/deleted
        this.itemName= "";
        this.closeWindowLocator= page.locator("//button[@aria-label='cancelIcon']");

        // Search Clinical Items fields
        this.searchClinicalItem = page.locator("xpath=//label[text()='Any Search, Item, Code, Category']");
        this.addClinicalItem = page.locator("xpath=//button[@aria-label='Add']")
       
        // Clinical Section Divs - These locators should be declared as string as we will use the toggle function
        this.expandSearchButton = "xpath=//button[@data-testid='search']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Expand']";
        this.hideSearchButton = "xpath=//button[@data-testid='search']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Hide']";
        this.expandFavouritesButton = "xpath=//button[@data-testid='favourites']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Expand']";
        this.hideFavouritesButton = "xpath=//button[@data-testid='favourites']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Hide']";
        this.expandHistoryButton = "xpath=//button[@data-testid='categoryHistoryAccordion']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Expand']";
        this.hideHistoryButton = "xpath=//button[@data-testid='categoryHistoryAccordion']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Hide']";
        
        // Favourites & Order sets
        // this.orderSetName = "xpath=//h1[text()='Conditions Order Sets']//..//..//button[@aria-label='Condyloma latum']"
        this.orderSetName = "xpath=//h1[text()='placeholder1']//..//..//button[@aria-label='placeholder2']"
        // this.favouriteName = "xpath=//h1[text()='Conditions Favourites']//..//..//button[@aria-label='Condyloma latum']"
        this.favouriteName = "xpath=//h1[text()='placeholder1']//..//..//button[@aria-label='placeholder2']"
        // this.orderSetItem = "xpath=//a[text()='Metformin 500mg tablets     ']//..//..//input[@class='PrivateSwitchBase-input css-1m9pwf3']"
        this.orderSetItem = "xpath=//a[text()='placeholder1']//..//..//input[@class='placeholder2']"       
        // this.favouriteItem = "xpath=//a[text()='Metformin 500mg tablets']//..//..//input[@class='PrivateSwitchBase-input css-1m9pwf3']"
        this.favouriteItem = "xpath=//a[text()='placeholder1']//..//..//input[@class='placeholder2']"

        //RiskLevel dropdown
        this.riskLevel = page.locator("xpath=//input[@id='riskLevel']");

        //Patient Scan
        

        //Overview
        this.addClinicalItem = page.locator("xpath=//button[@aria-label='Add']")


        //Medical Certificates
        //this.AddMedicalCertificateButton=page.locator("xpath=//div[contains(text(),'Add Applicant Medical Certificate')]")
        this.AddMedicalCertificateButton=page.getByTestId('Add Applicant Medical Certificate')
        this.showLink=page.locator("xpath=//a[@aria-label='Show']")
        this.buttonPrint=page.locator("xpath=//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation css-1hx9jce']//div[@class='MuiGrid-root MuiGrid-item css-1wxaqej'][normalize-space()='Print']")
        

        //Locators for Assertions 
        //this.historyTableItem = "xpath=//div[@id='historyTable']//*[text()='Sleep walking disorder']";          

        //Diagnosis Customizable question
       // this.customizableQuestion="xpath=//div[@class='MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-grid-xs-3 css-1jjp2xs']//label[text()='placeholder1']/parent::div/..//preceding-sibling::div/preceding-sibling::div//button";
        


       //Master Price List
        this.financeIcon= page.locator("xpath=//div[@data-testid='moduleDrawerFinance' and @aria-label='moduleDrawerFinance']")
        this.allCategoryDropdown= page.locator("xpath=//input[@id='allCategory']")
        this.searchMasterPriceBtn=page.locator("xpath=//div[contains(text(),'Search')]")
        this.addMasterPriceBtn= page.locator('//button[@aria-label="Add" and .//div[normalize-space(.)="Add"]]')
        this.editBedPriceIcon= page.locator('//tr[td[normalize-space(text())="Special Bed"]]//button[@aria-label="editIcon"]')
        this.itemNameMasterPrice= page.locator('//input[@id="itemName"]')
        this.masterPrice= page.locator("//input[@id='Master Price (₹)']")
        this.addBtnForMasterPrice= page.locator("//div[contains(text(),'Add')]")
        this.backButton = page.locator('//button[@aria-label="Back Button"]')
        this.deleteButton = page.locator("//div[contains(text(),'Delete')]")
        this.deleteOk = page.locator("//div[contains(text(),'Ok')]")
        this.deleteCancel = page.locator("//div[contains(text(),'Cancel')]")
        this.item2Typecode= page.locator("//input[@id='itemCode2Type']")
        this.itemCode2= page.locator("//input[@data-testid='Item Code 2']")
        this.saveMasterPrice= page.locator("//div[contains(text(),'Save')]")
        this.variablePriceLink= page.locator("//a[text()='Variable Price' and @data-testid='Variable Price']")
        this.masterPriceDrawer= page.locator("//span[normalize-space()='Master Price List']")
        this.masterPriceLink= page.locator("//div[@data-testid='masterPriceList']//h1[text()='Master Price List']")   
        //this.variableType= page.locator("//label[normalize-space(text())='Variable Type']")
        this.variableType= page.locator("//input[@id='Variable Type']")
        this.customerTypeCheckbox= page.locator ("//li[@role='option' and @data-value='Customer type']")
       // this.customerTypeCheckbox= page.locator("//li[@role='option' and @data-value='Customer type']//input[@type='checkbox']")
        this.customerTypeDrp1= page.locator("input#customerType0[name='customerType[0].type']")
        this.customerTypeDrp2= page.locator("input#customerType1[name='customerType[1].type']")
        this.addCustomerType= page.locator("//button[@aria-label='addcustomerType0']")
        this.deleteCustomerType2= page.locator("//button[@aria-label='deletecustomerType1']")
        this.rateForCustomerType1= page.locator("//input[@id='ratecustomerType0']")
        this.saveVariablePrice= page.locator("//button[@aria-label='saveVariablePrice' and @data-testid='Save']")
        this.expandSpecialBed= page.locator("//td[normalize-space(text())='Special Bed']/ancestor::tr//button[contains(@aria-label, 'expandRowIcon')]")
        this.expandCustomerType= page.locator("//td[normalize-space()='Special Bed']/ancestor::tr/following-sibling::tr//button[@data-testid='customerType']")
        this.searchFieldMasterPrice= page.locator("//input[@id='searchItem']")

     }

     //Master price list
    
  async clickFinanceIcon() {
    await this.financeIcon.click();
  }
  async clickmasterPriceDrawer() {
    await this.masterPriceDrawer.click();
  }

  async clickmasterPriceLink() {
    await this.masterPriceLink.click();
  }

  async clickSaveMasterPrice() {
    await this.saveMasterPrice.click();
  }


  async selectAllCategory(category) {
    // await this.allCategoryDropdown.click();
    // await this.page.keyboard.type(category);
    // await this.page.keyboard.press('Enter');
    await selectFromDropdown(this.page, this.allCategoryDropdown,'Bed Type')
  }

  async clickSearchMasterPrice() {
    await this.searchMasterPriceBtn.click();
  }

  async clickAddMasterPrice() {
    await this.addMasterPriceBtn.click();
  }

  async clickEditBedPrice() {
    await this.editBedPriceIcon.click();
  }

  async enterItemName(name) {
    await this.itemNameMasterPrice.fill(name);
  }

  async enterSearchFieldMasterPrice(name) {
    await this.searchFieldMasterPrice.fill(name);
  }
  

  async enterMasterPrice(price) {
    await this.masterPrice.fill(price);
  }

  async enterItemCode2(code2) {
    await this.itemCode2.fill(code2);
  }

  async clickAddButton() {
    await this.addBtnForMasterPrice.click();
  }

  async clickBackButton() {
    await this.backButton.click();
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async confirmDelete() {
    await this.deleteOk.click();
  }

  async cancelDelete() {
    await this.deleteCancel.click();
  }

  async selectandMasterPriceItem(MasterPriceItem) {
        
        this.itemName=MasterPriceItem;
        console.log("Item Name is:"+this.itemName);
        
        //await page.pause()
        await selectFromSearchResults(this.page, this.itemNameMasterPrice, MasterPriceItem);  
   
    }

    async selectCode2Type(codeType) {
   
    await selectFromDropdown(this.page, this.item2Typecode,codeType)
  }


  //Variable price- Mater price


async clickVariablePriceLink() {
  await this.variablePriceLink.click();
}

async clickVariableType() {
       await this.variableType.click();

}


//   async selectCustomerTypeCheckbox() {
//    await this.customerTypeCheckbox.check()
  
// }
async selectCustomerTypeCheckbox() {
  const isChecked = await this.customerTypeCheckbox.isChecked();

  if (!isChecked) {
    await this.customerTypeCheckbox.click(); // Click wrapper/label instead
  }
}

async selectCustomerType(category) {

    await selectFromDropdown(this.page, this.customerTypeDrp1,'Regular')
  }

  
async enterRateForCustomerType1(rate) {
    await this.rateForCustomerType1.fill(rate);
  }
async clickAddCustomerType() {
  await this.addCustomerType.click();
}

async clickDeleteCustomerType2() {
  await this.deleteCustomerType2.click();
}


async clickSaveVariablePrice() {
  await this.saveVariablePrice.click();
}

async clickExpandSpecialBed() {
  await this.expandSpecialBed.click();
}

async clickExpandCustomerType() {
  await this.expandCustomerType.click();
}

    ///////////////////////////////BUTTON CLICKS///////////////////////////////////////////////
    /*This method is no longer used as we are clicking it in selectandaddClinicalItem*/
    // // Click on Add Medication button
    // async clickOnAddClinicalItem() {
    //     await this.page.waitForSelector(this.addClinicalItem);
    //     await clickElement(this.page, this.addClinicalItem);
    // }

    async clickOnCertificateFitnessforFit(item = null,status){
        if(item){
            this.itemName=item;
        }
        await clickOnFitnessRadioButton(this.page,this.itemName, status)
    }

    async clickOnMCItemHistory(item = null){
        if(item){
            this.itemName=item;
        }
        await clickMCHistoryTableIconsUsingItemName(this.page,this.itemName, 'historyIconButton')
    }

    async clickOnMCItemDelete(item = null){
        if(item){
            this.itemName=item;
            console.log("Itemname is:"+ this.itemName);            
        }
        await clickMCHistoryTableIconsUsingItemName(this.page,this.itemName, 'Delete')
    }
    async ClickOnAddMedicalCertificateButton()
    {
        await clickElement(this.page, this.AddMedicalCertificateButton)
    }

    async clickOnPrintButton()
     {
        await this.buttonPrint.click()
     }

    async clickOnShowLink()
     {
        await this.showLink.click()
     }

    async clickOnMCItemDiv(item = null){
        try {
            if (item) {
                this.itemName = item;
            }
                 // clickMCHistoryTableIconsUsingItemName
            await clickMCHistoryTableIconsUsingItemName(this.page, this.itemName, 'expandRowIconundefined') // Open Div
            await this.page.waitForTimeout(1000); // Wait for some time
            await clickMCHistoryTableIconsUsingItemName(this.page, this.itemName, 'expandRowIconundefined') // Close Div
        } catch (error) {
            console.error(`Error clicking on item div: ${error.message}`);
        }
    }
    
    async clickOnMCItemEdit(item = null){
        if(item){
            this.itemName=item;
            console.log("Itemname is:"+ this.itemName);            
        }
        await clickMCHistoryTableIconsUsingItemName(this.page,this.itemName, 'edit')
    }
    //
    async toggleSearchSection() {
        await toggleDivVisibility(this.page, this.expandSearchButton, this.hideSearchButton);
    }

    async toggleFavouritesSection() {
        await toggleDivVisibility(this.page, this.expandFavouritesButton, this.hideFavouritesButton);
    }

    async toggleHistorySection() {
        await toggleDivVisibility(this.page, this.expandHistoryButton, this.hideHistoryButton);
    }

    ////////////////////////////CHOOSE DYNAMIC QUESTION FOR CUSTOMIZABLE VIEW////////////////////////

    async clickOnDeleteQuestion(questionName)
    {
        this.itemName.questionName;
        await clickOnRemoveCustomizableQuestion(this.page, questionName)
    }

    async clickOnRestoreQuestion(questionName)
    {
        this.itemName.questionName;
        await clickOnRestoreCustomizableQuestion(this.page,questionName)
    }


    //Overview
    async selectandAddOverview() {
        //this.itemName=clinicalItemName;
        await clickElement(this.page, this.addClinicalItem)
       // await this.addClinicalItem.click() 
    }
    ///////////////////////////////CHOOSE DYNAMIC DROPDOWN ITEMS//////////////////////////////////

    async selectandAddClinicalItem(clinicalItemName) {
        this.itemName=clinicalItemName;
        await selectFromSearchResults(this.page, this.searchClinicalItem, clinicalItemName, this.addClinicalItem);  
    }

    async selectClass(className)
    {
        await selectRadioButton(this.page, className);
    }

    async selectLicCategory(licCategory)
    {
        await selectRadioButton(this.page, licCategory);
    }

    async selectModeCategory(mode)
    {
        await selectRadioButton(this.page, mode);
    }

    async selectValidityCategory(Validity)
    {
        await selectRadioButton(this.page, Validity);
    }      
    async selectAllRiskLevel(){
        await selectFromDropdown(this.page, this.riskLevel, 'All')
    }

    async selectLowRiskLevel(){
        await selectFromDropdown(this.page, this.riskLevel,'Low Risk')
    }

    async selectModerateRiskLevel(){
        await selectFromDropdown(this.page, this.riskLevel, 'Moderate Risk')
    }

    async selectHighRiskLevel(){
        await selectFromDropdown(this.page, this.riskLevel, 'High Risk')
    }


//////////////////////// STATIC METHODS USED TO CLICK ON DYNAMICALLY CREATED LOCATORS /////////////////

    async clickOnAllItemsSection(){
        await showClinicalItemByStatus(this.page, 'All');
    }

    async clickOnCurrentItemsSection(){
        await showClinicalItemByStatus(this.page, 'Current');
    }

    async clickOnNormalItemsSection(){
        await showClinicalItemByStatus(this.page, 'Normal');
    }

    async clickOnMigratedItemsSection(){
        await showClinicalItemByStatus(this.page, 'Migrated');
    }

    async clickOnDeletedItemsSection(){
        await showClinicalItemByStatus(this.page, 'Deleted');
    }

    async clickOnArchivedItemsSection(){
        await showClinicalItemByStatus(this.page, 'Archived');
    }

    async clickOnStoppedSection(){
        await showClinicalItemByStatus(this.page, 'Stopped');
    }



    async clickOnLevelOneExtraDetails(){
        await showExtraDetailLevel(this.page, 'levelOne');
    }

    async clickOnLevelTwoExtraDetails(){
        await showExtraDetailLevel(this.page, 'levelTwo');
    }

    async clickOnLevelThreeExtraDetails(){
        await showExtraDetailLevel(this.page, 'levelThree');
    }

    async clickOnItemDiv(item = null){
        try {
            if (item) {
                this.itemName = item;
            }
            await clickHistoryTableIconsUsingItemName(this.page, this.itemName, 'expandRowIconundefined') // Open Div
            await this.page.waitForTimeout(1000); // Wait for some time
            await clickHistoryTableIconsUsingItemName(this.page, this.itemName, 'expandRowIconundefined') // Close Div
        } catch (error) {
            console.error(`Error clicking on item div: ${error.message}`);
        }
    }

    async clickOnHistoryItemDiv(){
            await clickHistoryTableIconsUsingItemName(this.page,this.itemName, 'expandRowIconundefined', true) 
    }

    async clickOnItemHistory(item = null){
        if(item){
            this.itemName=item;
        }
        await clickHistoryTableIconsUsingItemName(this.page,this.itemName, 'patientHistoryIconButton')
    }

    async clickOnItemReview(item = null){
        if(item){
            this.itemName=item;
        }
        await clickHistoryTableIconsUsingItemName(this.page,this.itemName, 'reviewIconButton')
    }

    // async clickOnCancelFavouritesQuestion(item = null){
    //     if(item){
    //         this.itemName=item;
    //     }
    //     await clickHistoryTableIconsUsingItemName(this.page,this.itemName, 'cancelFavouritesQuestion')
    // }

    async clickOnItemHighlightNone(item = null){
        if(item){
            this.itemName=item;
        }
        await clickHistoryTableIconsUsingItemName(this.page,this.itemName, 'highlightNone')

    }

    async clickOnItemHighlightModerate(item = null){
        if(item){
            this.itemName=item;
        }
        await clickHistoryTableIconsUsingItemName(this.page,this.itemName, 'highlightModerate')
    }

    async clickOnItemHighlightHigh(item = null){
        if(item){
            this.itemName=item;
        }
        await clickHistoryTableIconsUsingItemName(this.page,this.itemName, 'highlightHigh')
    }

    async clickOnItemEdit(item = null){
        if(item){
            this.itemName=item;
        }
        await clickHistoryTableIconsUsingItemName(this.page,this.itemName, 'editIconButton')
    }

    async closeWindow(){
        await clickElement(this.page, this.closeWindowLocator)
    }

    async clickOnOrderSets(category, ordersets){
        const favouriteLocator = this.orderSetName
    //        xpath=//h1[text()='placeholder1']//..//..//button[@aria-label='placeholder2']
        const placeholderValues = {
            "placeholder1": `${category} Order Sets`,
            "placeholder2": ordersets
        }
        const updatedLocator = replaceLocator(favouriteLocator, placeholderValues);
        await clickElement(updatedLocator)
    }

    async clickOnFavourites(category, favourite){
        const favouriteLocator = this.favouriteName
        const placeholderValues = {
            "placeholder1": `${category} Favourites`,
            "placeholder2": favourite
        }
        const updatedLocator = replaceLocator(favouriteLocator, placeholderValues);
        await clickElement(updatedLocator)
    }

    async clickOnOrderSetItem(category, orderSetItem){
        const favouriteLocator = this.orderSetItem
        const placeholderValues = {
            "placeholder1": orderSetItem,
            "placeholder2": ordersets
        }
        const updatedLocator = replaceLocator(favouriteLocator, placeholderValues);
        await clickElement(updatedLocator)
    }

    async clickOnFavouriteItem(category, favourite){
        const favouriteLocator = this.favouriteName
        const placeholderValues = {
            "placeholder1": `${category} Favourites`,
            "placeholder2": favourite
        }
        const updatedLocator = replaceLocator(favouriteLocator, placeholderValues);
        await clickElement(updatedLocator)
    }

    /////////////////////////////// METHOD TO CREATE LOCATORS DYNAMICALLY ////////////////////////////

    //Status wise items click
    /* Methods to be called as below for required category
    await showClinicalItemByStatus(page, 'All');
    await showClinicalItemByStatus(page, 'Normal');
    await showClinicalItemByStatus(page, 'Migrated');
    await showClinicalItemByStatus(page, 'Deleted');
    await showClinicalItemByStatus(page, 'Archived');
    */
    // async showClinicalItemByStatus(page, tabText) {
    //     const locator = `xpath=//div[@class='MuiTabs-flexContainer css-k008qs']//button[contains(text(), '${tabText}')]`;
    //     await clickElement(page, locator);
    // }

        //View Level of extra details
    /* Methods to be called as below for required category
    await showExtraDetailLevel(page, 'levelOne');
    await showExtraDetailLevel(page, 'levelTwo');
    await showExtraDetailLevel(page, 'levelThree');
    */
    // async showExtraDetailLevel(page, levelText) {
    //     const locator = `xpath=//div[@aria-label='levelExtraDetails']//button[@data-testid='${levelText}']`;
    //     await clickElement(page, locator);
    // }

    // async clickHistoryTableIconsBeforeItemName(page, itemName, ariaLabel){
    //     const locator= `xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='${itemName}']//parent::td//preceding-sibling::td//button[@aria-label='${ariaLabel}']`;
    //     await clickElement(page, locator);
    // }

    // async clickHistoryTableIconsAfterItemName(page, itemName){
    //     const locator= `xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='${itemName}']//parent::td//following-sibling::td//button[@aria-label='${ariaLabel}']`;
    //     await clickElement(page, locator);
    // }

    
    async clickOnViewContactItemsMenu(){
        if(this.flag==true)
            {
                await clickElement(this.page, this.viewContactItemsMenu)
                this.flag=false;
            }   
    }

    async clickOnCloseContactItemMenu(){
        if(this.flag==false)
            {
                await clickElement(this.page, this.closeContactItemMenu)
                this.flag=true;
            }
    }

    async clickOnPinContactItemsMenu(){
        if(this.flag==false)
            {
                await clickElement(this.page, this.pinContactItemsMenu)
            }
    }

            // Choose Required Category from Dropdown
            async selectCategoryFromList(category) {
                await selectFromDropdown(this.page, this.allCategory, category);
            }
    
            async selectClinicalItem(item) {
                await selectFromSearchResults(this.page, this.allCategorySearchItem, item);  
            }

            async clickOnViewOrCloseContactItemsMenu(){
                if(this.flag){
                    await clickElement(this.page, this.viewMenu);   
                }
                else{
                    await clickElement(this.page, this.closeMenu);
                }
                this.flag = !this.flag;
            }
    
            async clickOnPinContactItemsMenu(){
                await clickElement(this.page, this.pinContactItemsMenu)
            }

            // async clickOnFavouritequestion()
            // {
            //     (item = null){
            //         if(item){
            //             this.itemName=item;
            //         }
            //         await clickHistoryTableIconsUsingItemName(this.page,this.itemName, 'reviewIconButton')
            //     }
            // }

            // async clickOnFavouritesCustView(locatorText=null)
            // {
            //     let locatorElement;
            //     try{
                   
            //         console.log("clicking on Favourites Customizable View")
            //         locatorElement = locatorText ?
            //         `xpath=//div[@id="favourite"]//button[@aria-label='${locatorText}']`:
            //         `xpath=//div[@id='favourite']//button[@aria-label='${this.itemName}']`;
                                  
            //         const cancelFavourites=await assertElementExists(this.page, locatorElement ,locatorText)
            //         return cancelFavourites;
            //     }
            //     catch (error) {
            //         console.error("Error occurred during checkItemOnHistoryTable:", error);
            //         throw error;
            //     }
            // }

    ////////////////////////////////// ASSERTION //////////////////////////////
    async checkItemOnHistoryTable(locatorText = null, review = null) {
        let locatorElement;
        try {
            console.log("Executing checkItemOnHistoryTable method...");
            
            // Construct the locator based on the review parameter
            if (review === null) {
                locatorElement = locatorText ?
                    `xpath=//div[@id='historyTable']//*[text()='${locatorText}']` :
                    `xpath=//div[@id='historyTable']//*[text()='${this.itemName}']` ;
                   
            } else {
                locatorElement = locatorText ?
                    `xpath=//div[@data-testid='CommonCellmaPopup']//*[text()='${locatorText}']//../..//button[@aria-label='reviewIconButton']` :
                    `xpath=//div[@data-testid='CommonCellmaPopup']//*[text()='${this.itemName}']//../..//button[@aria-label='reviewIconButton']`;
            }
            
            // Log the constructed locator
            console.log("Constructed Locator:", locatorElement);
    
            // Check if the element exists
            const elementExists = await assertElementExists(this.page, locatorElement, locatorText || this.itemName);
    
            console.log("checkItemOnHistoryTable method executed successfully.");
            return elementExists;
        } catch (error) {
            console.error("Error occurred during checkItemOnHistoryTable:", error);
            throw error;
        }
    }


    async checkItemOnMedicationCertificateHistoryTable(locatorText = null) {
        let locatorElement;
        try {
            console.log("Executing checkItemOnMedicationHistoryTable method...");
                     
                locatorElement = locatorText ?
                    `xpath=//table[@aria-label="medicalCertificateHistoryTable"]//*[text()='${locatorText}']` :
                    `xpath=//table[@aria-label="medicalCertificateHistoryTable"]//*[text()='${this.itemName}']` ;

                    // `xpath=//table[@aria-label="medicalCertificateHistoryTable"]//*[text()='${locatorText}']` :
                    // `xpath=//table[@aria-label="medicalCertificateHistoryTable"]//*[text()='${this.itemName}']` ;
                   
                      
            // Log the constructed locator
            console.log("Constructed Locator:", locatorElement);
    
            // Check if the element exists
            const elementExists = await assertElementExists(this.page, locatorElement, locatorText || this.itemName);
    
            console.log("checkItemOnMedicationHistoryTable method executed successfully.");
            return elementExists;
        } catch (error) {
            console.error("Error occurred during checkItemOnMedicationHistoryTable:", error);
            throw error;
        }
    }

    

}
module.exports = ClinicalSummary;
