class HPDiary{
    constructor(page)
    {
        this.page=page
        this.btnBackBtn=page.locator("xpath=//button[@aria-label='Back Button']")
        this.nextButton=page.locator("xpath=//button[@data-testid='Next']")
        this.btnClinicDiary=page.getByTestId('Clinic Diary')
        this.btnHPDiary=page.getByTestId('HP Diary')
        this.btnByDaywise=page.getByTestId('day')
        this.btnByWeekwise=page.getByTestId('week')
        this.btnByMonthwise=page.getByTestId('month')
        this.DateForLeave=page.getByTestId('hpScheduled').nth(2)
        //this.DateForLeave=page.locator('div:nth-child(19) > .MuiBox-root > div:nth-child(2) > div:nth-child(5) > a:nth-child(2)')
        //this.DateForLeave=page.getByRole('button', { name: 'Working Hrs : 9 Start Time : 01:20 End Time : 10:20' }).nth(2)
        //getByRole('button', { name: 'Working Hrs : 9 Start Time : 01:20 End Time : 10:20' }).nth(2)
        this.dropdownLeaveType=page.getByRole('button', { name: 'Open' })
        this.checkboxDays=page.getByLabel('Day(s)', { exact: true })
        this.dayleavesStartDate=page.getByTestId('Start Date')
        this.dayleavesEndDate=page.getByTestId('End Date')
        this.btnSaveLeave=page.getByTestId('Save')

    }
    async clickOnBackButton()
    {
        await this.btnBackBtn.click()
    }
    async clickOnSaveLeaveButton()
    {
        await this.btnSaveLeave.click()
    }
    async enterLeavesStartDate(date)
    {
        await this.dayleavesStartDate.click()
        await this.dayleavesStartDate.type(date)
    }

    async enterLeavesEndDate(date)
    {
        await this.dayleavesEndDate.click()
        await this.dayleavesEndDate.type(date)
    }

    async checkCheckboxDays()
    {
        await this.checkboxDays.click()
    }
    async selectLeaveType(type)
    {
        await this.dropdownLeaveType.click()
        await this.page.getByRole('option', { name: type }).click()
    }

    async changeDate()
    {
        await this.page.getByRole('button', { name: 'calendar view is open, switch to year view' }).click()
        await this.page.waitForTimeout(3000)
        //await this.page.getByRole('button', { name: '2023' }).click()
        await this.page.getByRole('radio', { name: '2025' }).click()
        await this.page.getByLabel('June', { exact: true }).click();
        await this.page.waitForTimeout(3000)
        //await this.page.getByRole('button', { name: 'Jul' }).click()
        //await this.page.getByLabel('May').click()
        //await this.page.waitForTimeout(3000)
    }
    async clickOnDate()
    {
        await this.DateForLeave.click()
    }
    async selectDaywiseView()
    {
        await this.btnByDaywise.click()
    }
    async selectWeekwiseView()
    {
       await this.btnByWeekwise.click()
    }
    async selectmonthwiseView()
    {
        await this.btnByMonthwise.click()
    }
    async clickOnClinicDiarybutton()
    {
        await this.btnClinicDiary.click()
    }
    async clickOnHpDiaryButton()
    {
        await this.btnHPDiary.click()
    }
    async clickOnNextButton()
    {
        await this.nextButton.click()
    }
}
module.exports=HPDiary