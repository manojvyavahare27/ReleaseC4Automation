// pageObjects/LettersPage.js
class lettersOrSummaries {
    constructor(page) {
        this.page = page;
        this.input_StartDate = page.locator('xpath=//div[@class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-spacing-xs-2 mui-1h7lr4v"]//input[@name="startDate"]');
        this.input_EndDate = page.locator('xpath=//div[@class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-spacing-xs-2 mui-1h7lr4v"]//input[@name="endDate"]');
        this.input_LetterName = page.locator('xpath=//input[@name="letterType"]');
        this.letter_Location=page.locator("xpath=//input[@id='letterLocation']")
        this.letter_Name=page.locator("xpath=//div[@class='MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-spacing-xs-2 mui-1h7lr4v']//input[@name='letterName']")
        this.Draft_button=page.locator("xpath=//div[contains(text(),'Draft')]")

        this.closePopupIcon=page.locator("xpath=//button[@aria-label='cancelIcon']")

        //filterpage
        this.startDate=page.locator("xpath=//input[@id='startDate']")
        this.endDate=page.locator("xpath=//input[@id='endDate']")
        this.input_Status = page.locator('xpath=//input[@name="status"]');
        this.btn_Search = page.locator("xpath=//div[contains(text(),'Search')]");

        //Buttons
        this.createDraftButton=page.locator("xpath=//button[@data-testid='Create Draft']")
        this.exportToWord=page.locator("xpath=//button[@data-testid='Export to Word']")
        this.sendforApprovalbutton=page.locator("xpath=//button[@data-testid='Send for Approval']")
        this.sendForApprovalTextbox=page.locator("xpath=//input[@name='sendForApproval']")
        this.OkButton=page.locator("xpath=//button[@data-testid='Ok']")

        this.expandDraftLetter=page.locator("xpath=//button[@id=':r4nl:']//*[name()='svg']")
        this.wordFormatIcon=page.locator("xpath=//button[@aria-label='wordFormat']")
        this.pdfIcon=page.locator("xpath=//button[@aria-label='pdf']")
        this.htmlIcon=page.locator("xpath=//button[@aria-label='html']")
        this.deleteRecordLink=page.locator("xpath=//a[@data-testid='Delete']")
        this.approveRecordLink=page.locator("xpath=//a[@data-testid='Approve']")
        this.editHistoryIcon=page.locator("xpath=//button[@aria-label='editHistory']")
        this.sendEmailButton=page.locator("xpath=//button[@aria-label='sentEmail']")

    }

    async clickOnSendEmailButton()
    {
        await this.sendEmailButton.click()
    }
    async clickOnEditHistoryIcon()
    {
        await this.editHistoryIcon.click()
    }
    async clickOnDeleteRecordLink()
    {
        await this.deleteRecordLink.click()
    }
    async clickOnApproveRecordLink()
    {
        await this.approveRecordLink.click()
    }
    async clickOnHtmlIcon()
    {
        await this.htmlIcon.click()
    }

    async clickOnPdfIcon()
    {
        await this.pdfIcon.click()
    }
    async clickOnWordFormatIcon()
    {
        await this.wordFormatIcon.click()
    }
    async expandsLetter()
    {
        await this.expandDraftLetter.click()
    }

    async clickOnCreateDraftButton()
    {
        await this.createDraftButton.click()
    }
    async clickOnexporttoWordButton()
    {
        await this.exportToWord.click()
    }
    async clickOnSendforApprovalButton()
    {
        await this.sendforApprovalbutton.click()
    }
    async selectSendforApproval()
    {
        await this.sendForApprovalTextbox.click()
        await this.page.getByRole('option', { name: 'Letter Auth ,Doctor' }).click()
    }
    async clickOnOkButton()
    {
        await this.OkButton.click()
    }

    async clickOnclosePopup()
    {
        await this.closePopupIcon.click()
    }
    async clickOnDraftbutton()
    {
        await this.Draft_button.click()
    }
    async selectLetterLocation(patletd_patient_location)
    {
        await this.letter_Location.click()
        await this.page.getByRole('option', { name: patletd_patient_location }).click()
    }

    async selectLetterName(patlet_name)
    {
        await this.letter_Name.click()
        await this.page.getByRole('option', { name: patlet_name }).click()
    }

    async enterinputStartDate(patletd_start_date) {
        await this.input_StartDate.fill(patletd_start_date)
       // await this.page.fill(this.input_StartDate, date);
    }

    async enterinputEndDate(patletd_end_date) {
         await this.input_EndDate.fill(patletd_end_date)
        //await this.page.fill(this.input_EndDate, date);
    }

    async enterStartDate(patletd_start_date) {
        await this.startDate.fill(patletd_start_date)
       // await this.page.fill(this.input_StartDate, date);
    }

    async enterEndDate(patletd_end_date) {
         await this.endDate.fill(patletd_end_date)
        //await this.page.fill(this.input_EndDate, date);
    }

    async enterLetterName(name) {
        await this.page.fill(this.input_LetterName, name);
    }
    async clearStatus()
    {
         await this.input_Status.fill('')
    }

    async enterStatus(status) {
         await this.input_Status.click()
         await this.page.getByRole('option', { name: status }).click()
        //await this.page.fill(this.input_Status, status);
    }

    async clickSearchButton() {
       // await this.page.click(this.btn_Search);
       await this.btn_Search.click()
    }
}
module.exports = lettersOrSummaries

