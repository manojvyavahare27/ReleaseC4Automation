class MedicationHomePage
{
    // Manoj Vyavahare
    constructor(page)
    {
        this.page=page
        this.btnAddContact=page.locator("xpath=//div[contains(text(),'Add Contact')]")
        this.btnCategories=page.locator("xpath=//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1la2s9q']//*[name()='svg']//*[name()='path' and contains(@d,'M3 18h18v-')]")

        //Exapnds icon for Search, Favourite and Medication History
        this.btnSvgSearchSection=page.getByTestId('search').getByLabel('cellmaAccordionIcon')
        this.btnSvgFavourites=page.getByTestId('favourites').getByLabel('cellmaAccordionIcon')
        this.btnSvgMedicationSearch=page.getByTestId('categoryHistoryAccordion').getByLabel('cellmaAccordionIcon')


        //Search and Add medication on Medication home page
        this.txtboxSearchMedication=page.getByLabel('Any Search, Item, Code,')
        this.btnAdd=page.locator("xpath=//button[@type='submit']")

        //All links under Medication History
        this.linkAllMedication=page.locator("xpath=//button[normalize-space()='All']")
        this.linkStopped=page.locator("xpath=//button[normalize-space()='Stopped']")
        this.linkMigrated=page.locator("xpath=//button[normalize-space()='Migrated']")
        this.linkDeleted=page.locator("xpath=//button[normalize-space()='Deleted']")
        this.linkedDeclined=page.locator("xpath=//button[normalize-space()='Declined']")
        this.linkArchived=page.locator("xpath=//button[normalize-space()='Archived']")

        //Edit Icon
        this.iconEditMedication=page.locator("xpath=//button[@aria-label='editIconButton']")

        //View Menu Button
        this.btnView=page.getByRole('button', { name: 'View () Menu Button' }).getByLabel('Menu Button')
        
        //Icon On page
        this.btnOverViewIcon=page.getByLabel('overviewIconButton')
        this.btnWorkListIcon=page.getByLabel('worklistIconButton')
        this.btnTaskIcon=page.getByLabel('taskIconButton')
        this.btnAlertIcon=page.getByLabel('alertIconButton').first()
        this.btnAddPathway=page.getByLabel('alertIconButton').nth(1)
        this.btnClosePopup=page.getByLabel('cancelIcon')

        //Added medication details  
        this.btnMedicationHistory=page.locator("xpath=//img[@alt='Category History']")
        this.btnSgvExpandMedication=page.locator("xpath=//button[@aria-label='expandRowIconundefined']//*[name()='svg']//*[name()='path' and contains(@d,'M15.08 9.5')]")
        this.btnSvgExpandMedicationHistory=page.locator("xpath=//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1v1x2mb']//*[name()='svg']")
  

    }
    async clickOnBtnCategories()
    {
        await this.btnCategories.click()
    }
    async clickOnAddMedicationButton()
    {
        await this.btnAddContact.click()
    }
    async expandsCategories()
    {
        await this.btnSvgSearchSection.click()
        await this.btnSvgFavourites.click()
        await this.btnSvgMedicationSearch.click()
    }
    async clickOnLinkForMedicationHistory()
    {
        await this.linkStopped.click()
        await this.linkMigrated.click()
        await this.linkDeleted.click()
        await this.linkedDeclined.click()
        await this.linkArchived.click()
        await this.linkAllMedication.click()
    }
    async clickOnViewButton()
    {
        await this.btnView.click()
    }
    async checkAllAppPopUp()
    {
        await this.btnOverViewIcon.click()
        await this.btnClosePopup.click()
        await this.btnWorkListIcon.click()
        await this.btnClosePopup.click()
        await this.btnTaskIcon.click()
        await this.btnClosePopup.click()
        await this.btnAlertIcon.click()
        await this.btnClosePopup.click()
        await this.btnAddPathway.click()
        await this.btnClosePopup.click()
    }
    //Add Medication
    async searchMedication(pacr_que_name)
    {
        await this.txtboxSearchMedication.fill(pacr_que_name)
        await this.page.getByRole('option', { name: pacr_que_name }).click()
    }
    async clickOnAddMedicationButton()
    {
        await this.btnAdd.click()
    }
    async clickOnEditMedicationButton()
    {
        await this.iconEditMedication.click()
    }
    
}
module.exports=MedicationHomePage
