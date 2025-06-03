class ContactHistory
{
    // Sathya
    constructor(page)
    {
        this.page=page  

        //sidebar Categories icons
        this.iconMenuIcon=page.locator("xpath=//button[@aria-label='Menu Button']//*[name()='svg']")

        this.iconMedicationcategoryIcon=page.locator("xpath=//img[@alt='Medications Image Avatar']")

        //Add Contact History fields
        // contactDate = page.locator("xpath=//input[@id='Contact Date']")
        // contactReason = page.locator("xpath=//input[@id='contactReason']")
        // contactReasonListItem = page.locator("xpath=//li[text()='Data entry']") //This is updated dynamically in common dropdown function 
        // contactLocation = page.locator("xpath=//input[@id='contactLocation']")
        // contactLocationListItem = page.locator("xpath=//li[text()='Cardio 1']") //This is updated dynamically in common dropdown function 
        // contactWith =  page.locator("xpath=//input[@id='Contact With']")
        // addContact = page.locator("xpath=//div[contains(text(),'Add Contact')]")
        
        //Contact History Filters
        // showContactByService = page.locator("xpath=//input[@id='showContactByService']")
        // contactByServiceListItem = page.locator("xpath=//li[text()='Accounts']") //This is updated dynamically in common dropdown function 
        // showAllContactReason = page.locator("xpath=//input[@id='showAllContactReason']")
        // contactReasonListItem = page.locator("xpath=//li[text()='Data entry']") //This is updated dynamically in common dropdown function 

        //Contact History Links
        // links= page.locator("xpath=//div[contains(text(),'Links')]")
        // addDocuments = page.locator("xpath=//*[text()='Add Documents']")
        // exportDocuments = page.locator("xpath=//*[text()='Export Documents']")
        // externalDocuments = page.locator("xpath=//*[text()='External Documents']")
        // importPatientPerforma = page.locator("xpath=//*[text()='Import Patient Performa']")
        // mergeDocuments = page.locator("xpath=//*[text()='Merge Documents']")
        // refresh = page.locator("xpath=//*[text()='Refresh']")
        // viewGridDocuments = page.locator("xpath=//*[text()='View Grid Documents']")
        // viewHTMLDetails = page.locator("xpath=//*[text()='View HTML Details']")
        // applicantMedicalCertificate = page.locator("xpath=//*[text()='Applicant Medical Certificate']")
 
        //Add Items to Contact
        // allCategory= page.locator("xpath=//input[@id='allCategory']")
        // allCategoryListItem = page.locator("xpath=//li[text()='Medications']") //This is updated dynamically in common dropdown function 
 
    }
    async clickOnMenuIcon()
    {
        await this.iconMenuIcon.click()
    }
    async clickOnMedicationCategoryIcon()
    {
        await this.iconMedicationcategoryIcon.click()
    }

/////////////////////////COMMON METHODS/////////////////////////////////

/* This is a common method to fill the dropdowns */
       // dropdownLocator - locator for your dropdown
       // listItem - locator for your item in the dropdown
       async selectFromDropdown(dropdownLocator, listItem) 
       {
       await dropdownLocator.click();
       const itemLocator = page.locator(`xpath=//li[text()='${listItem}']`);
       await itemLocator.click();
       }


//////////////////////////////////TEXTBOX FILLERS//////////////////////////////////////////


       //Fill Contact Date
       async enterContactDate(date)
       {
           await this.contactDate.type(date)
       }

       //Fill Contact With 
       async enterContactWith(name)
       {
            await this.contactWith.type(name)
       }

/////////////////////////////////BUTTON CLICKS///////////////////////////////////////////////

        
       //Click on Add Contact button
       async clickOnAddContact()
       {
           await this.addContact.click()
       }


       //Click on Links
       async clickOnLinks()
       {
           await this.links.click()
       }
      

       //Click on Add Documents on Links
       async clickOnAddDocuments()
       {
           await this.addDocuments.click()
       }
      
     
       //Click on Export Documents on Links
       async clickOnExportDocuments()
       {
           await this.exportDocuments.click()
       }
      
     
       //Click on External Documents on Links
       async clickOnExternalDocuments()
       {
           await this.externalDocuments.click()
       }
      
     
       //Click on Import Patient Performa on Links
       async clickOnImportPatientPerforma()
       {
           await this.importPatientPerforma.click()
       }
      
     
       //Click on Merge Documents on Links
       async clickOnMergeDocuments()
       {
           await this.mergeDocuments.click()
       }
      
     
       //Click on Refresh on Links
       async clickOnRefresh()
       {
           await this.refresh.click()
       }
      
     
       //Click on View Grid Documents Links
       async clickOnViewGridDocuments()
       {
           await this.viewGridDocuments.click()
       }
      
     
       //Click on View HTML Details on Links
       async clickOnViewHTMLDetails()
       {
           await this.viewHTMLDetails.click()
       }
      
     
       //Click on applicantMedicalCertificate on Links
       async clickOnApplicantMedicalCertificate()
       {
           await this.applicantMedicalCertificate.click()
       }


///////////////////////////////CHOOSE DROPDOWN ITEMS//////////////////////////////////       

        //Choose Contact Reason
       async selectContactReason(reason)
       {
        await this.selectFromDropdown(this.contactReason, reason);
       }
   
        // Choose Contact Location
        async selectContactLocation(location) 
        {
            await this.selectFromDropdown(this.contactLocation, location);
        }

        // Choose Contact By Service Filter
        async selectServiceFilter(service) 
        {
            await this.selectFromDropdown(this.showContactByService, service);
        }
 
        // Choose Contact Reason Filter
        async selectContactReasonFilter(reason) 
        {
            await this.selectFromDropdown(this.showAllContactReason, reason);
        }
 
        // Choose Required Category from Dropdown
        async selectCategoryFromList(category) 
        {
            await this.selectFromDropdown(this.allCategory, category);
        }       

}
module.exports=ContactHistory