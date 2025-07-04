class SetHPDairy{
    constructor(page)
    {
        this.page=page
        this.btnSaveHp=page.locator("xpath=//div[contains(text(),'Save')]")
        this.btnNextHP=page.getByTestId('Next')
        this.startDate=page.locator('input[name="startDate"]')
        this.endDate=page.locator('input[name="endDate"]')
        this.btnSearch=page.locator("xpath=//button[@aria-label='Search']")
        this.hpStartDate=page.locator('input[name="hpStartDate"]')
        this.hpEndDate=page.locator('input[name="hpEndDate"]')
        this.hpWorkingDays=page.getByTestId('Working Days').getByRole('button', { name: '​' })
        this.hpWorkingStartTime=page.getByTestId('Start Time')
        this.hpWorkingEndTime=page.getByTestId('End Time')
        //this.hpworkinghrsOccuranceType=page.getByTestId('Occurrence Type').getByLabel('Occurrence Type')
        this.hpworkinghrsOccuranceType=page.locator('#hpOccurrenceType')
        this.hpworkinghrsOccurance=page.getByRole('button', { name: 'Open' }).nth(1)
        //Clinic Schedule
        this.clinicscheduleStartDate=page.locator('input[name="hpClinicDiary\\[0\\]\\.clinicStartDate"]')
        this.clinicscheduleEndDate=page.locator('input[name="hpClinicDiary\\[0\\]\\.clinicEndDate"]')
        this.clinicscheduleworkingDays=page.locator('[id="mui-component-select-hpClinicDiary\\[0\\]\\.clinicScheduleWorkingDays"]')
        
        this.clinicshceduleWorkingHrsStartTime=page.locator('input[name="hpClinicDiary\\[0\\]\\.clinicStartTime"]')
        this.clinicshceduleWorkingHrsEndTime=page.locator('input[name="hpClinicDiary\\[0\\]\\.clinicEndTime"]')
        

        this.clinicscheduleOccuranceType=page.getByTestId('hpClinicDiary[0].clinicScheduleOccurrenceType').getByLabel('Occurrence Type')
        this.clinicscheduleOccurance=page.getByTestId('hpClinicDiary[0].clinicScheduleOccurrence').getByLabel('Occurrence')

        this.tab_ClinicSchedule=page.getByRole('tab', { name: 'Clinic Schedule' })
        this.tab_CombinedSchedule=page.getByRole('tab', { name: 'Combined Schedule' })
        this.tab_HpSchedule=page.getByRole('tab', { name: 'HP Schedule' })
        //this.checkbox_RepeatSchedule=page.getByRole('row', { name: 'HP Scheduled 01/07/2023 12/07' }).getByRole('checkbox')
        this.checkbox_RepeatSchedule=page.locator("xpath=//a[@data-testid='Checkbox']")
        //this.checkbox_RepeatSchedule=page.getByRole('cell', { name: 'Checkbox' }).first()
        //this.checkbox_RepeatSchedule=page.getByRole('checkbox')
        this.btnRepeatSchedule=page.locator("xpath=//div[contains(text(),'Repeat Schedule')]")
        this.closeRepeatSchedulePopup=page.getByTestId('CancelIcon').locator('path')
        //this.RepeatScheduleEndDate=page.getByTestId('CommonCellmaPopup').getByPlaceholder('dd/mm/yyyy')
          this.RepeatScheduleEndDate=page.locator("xpath=//div[@class='MuiFormControl-root MuiTextField-root css-qvcbpi']//input[@id='End Date']")
        this.btnSaveRepeatSchedule=page.getByTestId('CommonCellmaPopup').getByTestId('Save')
        this.deleteHPSchedule=page.getByRole('row', { name: '03/07/2023 03/07/2023 Monday Monday Start Time - 01:09 End Time - 10:50 - - delete edit' }).getByRole('button', { name: 'delete' })
                                     //getByRole('row', { name: '09/06/2023 09/06/2023 Friday Friday Start Time - 01:09 End Time - 10:50 - - delete edit' }).getByRole('button', { name: 'delete' })
        this.deleteHPScheduleYes=page.getByTestId('Yes')
        this.btnNext=page.getByTestId('Next')

        //Sidebar
        this.openSidebar=page.getByLabel('Close Menu')
        
        //HP/Non HP Service
        this.tabHPNonHPService=page.getByRole('button', { name: 'HP/Non HP Services' })



    }
       //Sidebar
       async clickOnOpenSidebar()
       {
        await this.openSidebar.click()
       }

    //HP Diary Page
    async clickOnYesToDeleteHpSchedule()
    {
        await this.deleteHPScheduleYes.click()
    }
    async clickOndeleteHPSchedule()
    {
        await this.deleteHPSchedule.click()
    }
    async clickOnNextButton()
    {
        await this.btnNext.click()
    }
    async clickOnSaveForRepeatSchedule()
    {
       await this.btnSaveRepeatSchedule.click()
    }
    async enterRepeatScheduleEndDate()
    {
        await this.RepeatScheduleEndDate.type("28/07/2025")
    }
    async closeRepeatSchedulePopupPage()
    {
        await this.closeRepeatSchedulePopup.click()
    }
    async clickOnRepeatSchedule()
    {
        await this.btnRepeatSchedule.click()
    }
    async selectRepeatSchedule()
    {
        await this.checkbox_RepeatSchedule.click()
    }
    async clickOnClinicSchedule()
    {
        await this.tab_ClinicSchedule.click()
    }
    async clickOnCombinedSchedule()
    {
        await this.tab_CombinedSchedule.click()
    }
    async clickOnHpSchedlue()
    {
        await this.tab_HpSchedule.click()
    }
    async enterHpWorkingStartTime(time)
    {
        await this.hpWorkingStartTime.click()
        await this.hpWorkingStartTime.fill(time)
    }
    async enterHpWorkingEndTime(time)
    {
        await this.hpWorkingEndTime.click()
        await this.hpWorkingEndTime.fill(time)
    }
    async selectHpWorkingHrsOccuranceType()
    {
        await this.hpworkinghrsOccuranceType.click()
        await this.page.getByRole('option', { name: 'Week of The Month' }).click()
    }
    async selectHpworkingHrsOccurance()
    {
        await this.hpworkinghrsOccurance.click()
        await this.page.getByRole('option', { name: 'Week 2' }).click()
    }
    async selectClinicScheduleStartDate(date)
    {
        await this.clinicscheduleStartDate.click()
        await this.clinicscheduleStartDate.fill(date)
    }
    async selectClinicScheduleEndDate(date)
    {
        await this.clinicscheduleEndDate.click()
        await this.clinicscheduleEndDate.fill(date)
    }
    async selectClinicScheduleWrokingDays()
    {
        await this.clinicscheduleworkingDays.click()
        await this.page.getByRole('option', { name: 'All' }).getByRole('checkbox').click()
       // await this.page.locator('input[name="hpClinicDiary\\[0\\]\\.clinicEndTime"]').click()
       await this.page.locator('[id="menu-hpClinicDiary\\[0\\]\\.clinicScheduleWorkingDays"] > .MuiBackdrop-root').click()
        
    }
    async enterClinicScheduleWorkingHrsStartTime(time)
    {
        await this.clinicshceduleWorkingHrsStartTime.click()
        await this.clinicshceduleWorkingHrsStartTime.fill(time)
    }
    async enterClinicScheduleWorkingHrsEndTime(time)
    {
        await this.clinicshceduleWorkingHrsEndTime.click()
        await this.clinicshceduleWorkingHrsEndTime.fill(time)
    }
    async selectClinicScheduleOccuranceType()
    {
        await this.clinicscheduleOccuranceType.click()
        await this.page.getByRole('option', { name: 'Week of The Month' }).click()
    }
    async selectClinicScheduleOccurance()
    {
        await this.clinicscheduleOccurance.click()
        await this.page.getByRole('option', { name: 'Week 2' }).click()
    }
    async clickOnSavebnt()
    {
        await this.btnSaveHp.click()
    }
    async clickOnNextbtn()
    {
        await this.btnNextHP.click()
    }
    async selectWorkingDays()
    {
        await this.page.locator("div[data-testid='Working Days'] div[role='combobox']").click()
        await this.page.getByRole('option', { name: 'All' }).getByRole('checkbox').click()
        await this.page.locator('#menu- > .MuiBackdrop-root').click()
    }
    async clickOnHpStartDate(date)
    {
        await this.hpStartDate.fill(date)
    }
    async clickOnHpEndDate(date)
    {
        await this.hpEndDate.fill(date)
    }
    async clickOnSearchbutton()
    {
        await this.btnSearch.click()
    }
    async enterEndDate(date)
    {
        await this.endDate.click()
        await this.endDate.type(date)
    }
    async enterStartdate(date)
    {
        await this.startDate.click()
        await this.startDate.type(date)
    }
}
module.exports=SetHPDairy