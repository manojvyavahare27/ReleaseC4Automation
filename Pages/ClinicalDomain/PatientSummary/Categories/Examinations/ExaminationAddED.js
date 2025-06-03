class ExaminationAddED
{
    constructor(page)
    {
        this.page=page
        
        this.svgexpandExamination=page.locator("xpath=//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-14x3gsq']//*[name()='svg']")
        this.dropdownSubCategory=page.locator("xpath=//input[@name='subCategory']")
        this.txtboxClinicDate=page.locator("xpath=//input[@name='clinicDate']")
        this.dropdownOutcome=page.locator("xpath=//input[@name='outcome']")
        this.dropdownSelectRecommendation=page.locator("xpath=//input[@name='selectRecommendation']")
        this.textareaNotes=page.locator("xpath=//textarea[@aria-label='Notes']")
        this.btnSave=page.locator("xpath=//button[@data-testid='Save']")

        this.btnDeleteExamination=page.locator("xpath=//button[@data-testid='Delete']")
        this.btnCancelDeleteExamination=page.getByTestId('Cancel')
        this.btnOkDeleteExamination=page.getByTestId('Ok')
        this.txtboxDeleteExaminationReason=page.getByTestId('Reason')
        this.btnSaveDeleteReason=page.getByRole('button', { name: 'Save' })

        //Checkboxes
        //this.checkboxShareDocumentOnPortal=page.locator("xpath=//span[@data-testid='Share Document On Portal']")
        this.checkboxPrivateRecord=page.locator("xpath=//span[@data-testid='Private Record']")
        this.checkboxSetasDefault=page.locator("xpath=//span[@data-testid='Set as Default']")
        this.checkboxAddtoFavourites=page.locator("xpath=//span[@data-testid='Add to Favourites']")
        this.checkboxAddToOrderSet=page.locator("xpath=//span[@data-testid='Add to Order Set']")
    }
    async selectCheckboxes()
    {
        //await this.checkboxShareDocumentOnPortal.click()
        await this.checkboxPrivateRecord.click()
        await this.checkboxSetasDefault.click()
    }
    async clickOnExpandExamination()
    {
        await this.svgexpandExamination.click()
    }
    async selectSubCategory(pacr_category)
    {
        await this.dropdownSubCategory.click()
       // await this.page.getByRole('option', { name: pacr_category }).click()
       await this.page.getByRole('option', { name: 'Exm subsection' }).click()
    }
    async EnterClinicalDate()
    {
        await this.txtboxClinicDate.fill("24/04/2024")
    }
    async SelectOutcome(exam_outcome)
    {
        await this.dropdownOutcome.click()
        await this.page.getByRole('option', { name: exam_outcome, exact: true }).click()
    }
    async SelectRecommendation(pacr_que_name_recommendation)
    {
        await this.dropdownSelectRecommendation.click()
        await  this.page.getByRole('option', { name: pacr_que_name_recommendation }).click()
    }
    async EnterNotes(exam_notes)
    {
        await this.textareaNotes.fill(exam_notes)
    }
    async clickOnSaveButton()
    {
        await this.btnSave.click()
    }
    async clickOnDeleteButton()
    {
        await this.btnDeleteExamination.click()
    }
    async clickOnCancelExamination()
    {
        await this.btnCancelDeleteExamination.click()
    }
    async clickOnOkDeleteExamination()
    {
        await this.btnOkDeleteExamination.click()
    }
    async enterDeleteExaminationReason(pacr_delete_reason)
    {
        await this.txtboxDeleteExaminationReason.fill(pacr_delete_reason)
    }
    async clickOnSaveForReason()
    {
        await this.btnSaveDeleteReason.click()
    }

}
module.exports=ExaminationAddED