//Sathyanarayan


const { clickElement, typeText, selectFromDropdown } = require('../../../UtilFiles/StaticUtility.js');
const {selectFromSearchResults} = require('../../../UtilFiles/DynamicUtility.js')

class ContactHistory
{

    constructor(page)
    {
        this.page=page  
        //Add Contact History fields
        this.contactDate = page.locator("xpath=//input[@id='Contact Date']")
        this.contactReason = page.locator("xpath=//input[@id='contactReason']")
       // this.contactReasonListItem = page.locator("xpath=//li[text()='Data entry']") //This is updated dynamically in common dropdown function 
        this.contactLocation = page.locator("xpath=//input[@id='contactLocation']")
       // this.contactLocationListItem = page.locator("xpath=//li[text()='Cardio 1']") //This is updated dynamically in common dropdown function 
        this.contactWith =  page.locator("xpath=//input[@id='Contact With']")
        this.addContact = page.locator("xpath=//div[contains(text(),'Add Contact')]")
        this.showFilter=page.locator("xpath=//a[text()='Show Filters']")
        
        //Customizable view
        //this.settingButton=page.locator("xpath=//button[@aria-label='settingButton']")
        this.settingButton=page.getByTestId('CommonCellmaPopup').getByTestId('settingButton')
        this.customizableViewButton=page.locator("xpath=//li[text()='Customizable View']")

        //Contact History Filters
        this.showContactByService = page.locator("xpath=//input[@id='showContactByService']")
       // this.contactByServiceListItem = page.locator("xpath=//li[text()='Accounts']") //This is updated dynamically in common dropdown function 
        this.showAllContactReason = page.locator("xpath=//input[@id='showAllContactReason']")
       // this.contactReasonListItem = page.locator("xpath=//li[text()='Data entry']") //This is updated dynamically in common dropdown function 

        //Contact History - Links
        this.links= page.locator("xpath=//div[contains(text(),'Links')]")
        this.addDocuments = page.locator("xpath=//*[text()='Add Documents']")
        this.exportDocuments = page.locator("xpath=//*[text()='Export Documents']")
        this.externalDocuments = page.locator("xpath=//*[text()='External Documents']")
        this.importPatientPerforma = page.locator("xpath=//*[text()='Import Patient Performa']")
        this.mergeDocuments = page.locator("xpath=//*[text()='Merge Documents']")
        this.refresh = page.locator("xpath=//*[text()='Refresh']")
        this.viewGridDocuments = page.locator("xpath=//*[text()='View Grid Documents']")
        this.viewHTMLDetails = page.locator("xpath=//*[text()='View HTML Details']")
        this.applicantMedicalCertificate = page.locator("xpath=//*[text()='Applicant Medical Certificate']")
 

    }
    

/////////////////////////COMMON METHODS/////////////////////////////////

// /* This is a common method to fill the dropdowns */
//        // dropdownLocator - locator for your dropdown
//        // listItem - locator for your item in the dropdown
//        async selectFromDropdown(dropdownLocator, listItem) 
//        {
//        await dropdownLocator.click();
//        const itemLocator = page.locator(`xpath=//li[text()='${listItem}']`);
//        await itemLocator.click();
//        }


//////////////////////////////////TEXTBOX FILLERS//////////////////////////////////////////


        //Fill Contact Date
        async enterContactDate(date) {
            await typeText(this.page, this.contactDate, date);
        }

        //Fill Contact With 
        async enterContactWith(name) {
            await typeText(this.page, this.contactWith, name);
        }


/////////////////////////////////BUTTON CLICKS///////////////////////////////////////////////

        
       //Click on Add Contact button
       async clickOnAddContact() {
           await clickElement(this.page, this.addContact)
       }

       //Click on show filter link
       async clickOnShowFilter()
       {
        await clickElement(this.page, this.showFilter)
       }


       async clickOnSettingButton()
       {
        await clickElement(this.page,this.settingButton)
       }
       async clickOnCustomizableView()
       {
        await clickElement(this.page,this.customizableViewButton)
       }

       //Click on Links
       async clickOnLinks() {
           await clickElement(this.page, this.links)
       }
      

       //Click on Add Documents on Links
       async clickOnAddDocuments() {
        await clickElement(this.page, this.addDocuments)
       }
      
     
            //Click on Export Documents on Links
        async clickOnExportDocuments() {
            await clickElement(this.page, this.exportDocuments);
        }
        

        //Click on External Documents on Links
        async clickOnExternalDocuments() {
            await clickElement(this.page, this.externalDocuments);
        }
        

        //Click on Import Patient Performa on Links
        async clickOnImportPatientPerforma() {
            await clickElement(this.page, this.importPatientPerforma);
        }
        

        //Click on Merge Documents on Links
        async clickOnMergeDocuments() {
            await clickElement(this.page, this.mergeDocuments);
        }
        

        //Click on Refresh on Links
        async clickOnRefresh() {
            await clickElement(this.page, this.refresh);
        }
        

        //Click on View Grid Documents Links
        async clickOnViewGridDocuments() {
            await clickElement(this.page, this.viewGridDocuments);
        }
        

        //Click on View HTML Details on Links
        async clickOnViewHTMLDetails() {
            await clickElement(this.page, this.viewHTMLDetails);
        }
        

        //Click on applicantMedicalCertificate on Links
        async clickOnApplicantMedicalCertificate() {
            await clickElement(this.page, this.applicantMedicalCertificate);
        }




        ///////////////////////////////CHOOSE DROPDOWN ITEMS//////////////////////////////////       

        //Choose Contact Reason
        async selectContactReason(reason) {
            await selectFromDropdown(this.page, this.contactReason, reason);
        }

        // Choose Contact Location
        async selectContactLocation(location) {
            await selectFromDropdown(this.page, this.contactLocation, location);
        }

        // Choose Contact By Service Filter
        async selectServiceFilter(service) {
            await selectFromDropdown(this.page, this.showContactByService, service);
        }

        // Choose Contact Reason Filter
        async selectContactReasonFilter(reason) {
            await selectFromDropdown(this.page, this.showAllContactReason, reason);
        }

    


}

module.exports = ContactHistory