class TrackReferral 
{
    constructor(page)
    {
        this.page=page
        this.txtboxStartDate=page.getByLabel('Start Date')
        this.txtboxEndDate=page.getByLabel('End Date')
        this.dropdownStatus=page.getByLabel('Open')
        this.btnSearch=page.getByTestId('Search')
        this.txtSearchBox=page.getByLabel('Search')
        this.btnViewHistoryIcon=page.getByLabel('expandRowIconPortal')
        this.btnAddDocumentIcon=page.getByLabel('addDocumentPortal')
        this.btnViewDocument=page.getByLabel('documentPortal', { exact: true })


        //Referral Document Popup
        this.dropdownDocumentCategory=page.getByTestId('referralLetter[0].documentCategory').getByLabel('Open')
        this.txtboxAddNotes=page.getByTestId('Notes')
        this.btnUpload=page.getByTestId('Upload')
        
        //Logout
        this.btnLogout=page.getByTestId('Logout')


        
    }
    //Logout
    async clickOnLogoutButton()
    {
        await this.btnLogout.click()
    }
     //Referral Document Popup
     async clickOnUploadButton()
     {
        await this.btnUpload.click()
     }
     async enteraddNotes()
     {
        await this.txtboxAddNotes.type('Added for testing')
     }
     async selectDocumentCategory()
     {
        await this.dropdownDocumentCategory.click()
        await this.page.getByRole('option', { name: 'Investigation' }).click()
     }
    
     async clickOnViewDocumentIcon()
     {
        await this.btnViewDocument.click()
        await this.page.locator('button').filter({ hasText: 'Document' }).click()
     }
    async clickOnAddDocumentIcon()
    {
        await this.btnAddDocumentIcon.click()
    }
    async clickOnViewHistoryIcon()
    {
        await this.btnViewHistoryIcon.click()
    }
    async enterStartDate(StartDate)
    {
        await this.txtboxStartDate.fill(StartDate)
    }
    async enterEndDate(EndDate)
    {
        await this.txtboxEndDate.fill(EndDate)
    }
    async selectStatus()
    {
        await this.dropdownStatus.click()
        await this.page.getByRole('option', { name: 'Awaiting Acceptance' }).click()
    }
    async clickOnSearchButton()
    {
        await this.btnSearch.click()
    }
    async enterNameinSearchBox(GivenName)
    {
        await this.txtSearchBox.type(GivenName)
    }

}
module.exports=TrackReferral