class ExaminationsHomePage
{
    // Manoj Vyavahare
    constructor(page)
    {
        this.page=page
        this.txtboxSearchItem=page.getByText('More+Any Search, Item, Code,')

        //expand sections
        this.svgexpandSearch=page.locator("xpath=//div[contains(text(),'Search')]")
        this.svgexapndFavourites=page.locator("xpath=//div[contains(text(),'Favourites')]")
        this.svgexpandExamnationHostory=page.locator("xpath=//div[contains(text(),'Examinations History')]")

        //History
        this.svgbuttonHistoryIcon=page.locator("xpath=//img[@alt='Category History']")
        //expand History Record
        this.svgbuttonHistoryofExaminationIcon=page.locator("xpath=(//*[@data-testid='ExpandCircleDownOutlinedIcon'])[5]")
        //close History pop up
        this.buttonClosePopup=page.locator("xpath=//button[@aria-label='cancelIcon']//*[name()='svg']")
        //Examination History links
        this.linkMigrated=page.locator("xpath=//button[@data-testid='migrated']")
        this.linkDeleted=page.locator("xpath=//button[@data-testid='deleted']")
        this.linkArchive=page.locator("xpath=//button[@data-testid='archived']")
        this.linkAll=page.locator("xpath=//button[@data-testid='all']")
        //Review Records
        this.svgbuttonReviewExamination=page.locator("xpath=//img[@alt='Review']")

        //Highlighted Risk
        this.buttonhighlightNone=page.locator("xpath=//img[@alt='Highlight None']")
        this.dropdownRiskLevel=page.locator("xpath=//input[@name='riskLevel']")

        //Level Of Extra Details
        this.buttonLevelOfExtraDetailsTwo=page.getByTestId('levelTwo')
        this.buttonLevelOfExtraDetailsThree=page.getByTestId('levelThree')
        this.buttonLevelOfExtraDetailsOne=page.getByTestId('levelOne')

        //Add examination
        this.btnAddExamination=page.locator("xpath=//button[@data-testid='Add']")

        //Edit Examination
        this.btnEditExamination=page.locator("xpath=//button[@aria-label='editIconButton']")
        
    }
    //expand sections
    async expandAllSections()
    {
        await this.svgexpandSearch.click()
        await this.svgexapndFavourites.click()
        await this.svgexpandExamnationHostory.click()
    }
    async expandExaminationHistory()
    {
        await this.svgexpandExamnationHostory.click()
    }
    async clickonAddExaminationButton()
    {
        await this.btnAddExamination.click()
    }
    async clickOnEditExaminationButton()
    {
        await this.btnEditExamination.click()
    }

    async searchExamination(pacr_que_name)
    { 
        await this.txtboxSearchItem.click()
        await this.txtboxSearchItem.type(pacr_que_name)
        await this.page.getByRole('option', { name: pacr_que_name }).click()
    }
    async clickOnHistoryIcon()
    {
        await this.svgbuttonHistoryIcon.click()
    }
    async expandsHistoryofExaminationIcon()
    {
        await this.svgbuttonHistoryofExaminationIcon.click()
    }
    async closeExaminationHistoryPopup()
    {
        await this.buttonClosePopup.click()
    }
    async clickOnReviewExaminationButton()
    {
        await this.svgbuttonReviewExamination.click()
    }
    async clickOnHighlightedNoneRisk()
    {
        await this.buttonhighlightNone.click()
    }
    async clickOnLowRiskLevel()
    {
        await this.dropdownRiskLevel.click()
        await this.page.getByRole('option', { name: 'Low Risk' }).click()
    }
    async clickOnModerateRiskLevel()
    {
        await this.dropdownRiskLevel.click()
        await this.page.getByRole('option', { name: 'Moderate Risk' }).click()
    }
    async clickOnHighRiskLevel()
    {
        await this.dropdownRiskLevel.click()
        await this.page.getByRole('option', { name: 'High Risk' }).click()
    }
    async clickOnAllLinks()
    {
        await this.linkMigrated.click()
        await this.linkDeleted.click()
        await this.linkArchive.click()
        await this.linkAll.click()
    }
    async clickOnAllRiskLevel()
    {
        await this.dropdownRiskLevel.click()
        await this.page.getByRole('option', { name: 'All' }).click()
    }
    async checkExtradetailsLevel()
    {
        await this.buttonLevelOfExtraDetailsTwo.click()
        await this.buttonLevelOfExtraDetailsThree.click()
        await this.buttonLevelOfExtraDetailsOne.click()
    }

}
module.exports=ExaminationsHomePage