class PatientDeath
{
    constructor(page)
    {
        this.page=page
        this.txt_causeOfDeath=page.getByLabel('Search Immediate cause of Death *')
        this.checkBox_Cryptosporidiosis=page.getByRole('option', { name: 'Cryptosporidiosis' }).getByRole('checkbox')
        this.checkBox_Candidiasis=page.getByRole('option', { name: 'Candidiasis', exact: true }).getByRole('checkbox')
        this.txtbox_CauseOfDeathWithCode=page.getByLabel('Search Immediate Cause of death code')
        this.txtbox_CauseofDeathType=page.getByTestId('otherCauseOfDeathType').getByLabel('Other Cause of Death')
        this.checkbox_Deathtype=page.getByRole('option', { name: 'Cancer' }).getByRole('checkbox')
        this.txtbox_OtherCauseOfDeath=page.getByTestId('searchCauseOfDeath').getByLabel('Search Cancer cause of Death')
        this.checkboxForSearchAntecedentcauseofDeath=page.getByRole('checkbox')
        this.txtbox_Additionalnotes=page.getByLabel('Additional Notes(If any)')
        this.calendar_DateofDeath=page.getByTestId('Date of Death')
        
        //this.dropdown_MarkPatientAsDead=page.getByRole('button', { name: 'No' })
        this.dropdown_MarkPatientAsDead=page.locator("xpath=//div[@data-testid='Discharge and remove pending referrals from all services']")
        this.checkbox_SearchAntecedentcauseofDeath=page.getByTestId('Search Antecedent cause of Death').getByLabel('Search Antecedent cause of Death')

        this.btn_Ok=page.getByTestId('Ok')
        this.btn_SaveDeadPatient=page.getByTestId('Set')
        this.btn_ViewOnlyInReadOnly=page.getByTestId('View in Read Only Mode')

    }
    async checkSearchAntecedentcauseofDeath()
    {
        await this.checkbox_SearchAntecedentcauseofDeath.type('Pulmonary cryptococcosis')
       await this.checkboxForSearchAntecedentcauseofDeath.click()
    }
    async clickOnViewInReadOnly()
    {
        await this.btn_ViewOnlyInReadOnly.click()
    }
    async clickOnSaveButton()
    {
        await this.btn_SaveDeadPatient.click()
    }
    async selectMarkPatientAsDead()
    {
        await this.dropdown_MarkPatientAsDead.click()
        await this.page.getByRole('option', { name: 'Yes' }).click()
        await this.btn_Ok.click()
    }

    async selectDateOfDeath()
    {
        //await this.calendar_DateofDeath.click()
        //await this.calendar_DateofDeath.type(DeathDate)
        //getByTestId('Time of Death')
        await this.page.getByTestId('Time of Death').click()
        await this.page.getByTestId('Time of Death').type("03:10")

    }
    async enterAdditionalNotes(pat_death_notes)
    {
        await this.txtbox_Additionalnotes.type(pat_death_notes)
    }
    async enterCauseOfDeathType()
    {
        await this.page.getByTestId('otherCauseOfDeathType').locator('div').filter({ hasText: 'Other Cause of Death' }).click()
        await this.txtbox_CauseofDeathType.fill('Cancer')        
        await this.page.getByRole('checkbox').click()
        //await this.checkbox_Deathtype.click()
       // await this.checkbox_Deathtype.click()
    }

    async enterOtherCauseeOfDeath()
    {   
        await this.page.getByTestId('searchCauseOfDeath').getByLabel('Search Cancer cause of Death').fill('Pulmonary candidosis')
        await this.page.getByRole('option', { name: 'Pulmonary candidosis', exact: true }).getByRole('checkbox').click()
        // await this.page.enterOtherCauseeOfDeath.click()
        // await this.page.getByRole('option', { name: 'Candidal sepsis', exact: true }).getByRole('checkbox').click()
        // await this.txtbox_OtherCauseOfDeath.click()
        await this.page.getByLabel('Search Cancer cause of Death Code').click()
        // await this.txtbox_OtherCauseOfDeath.fill("Candidiasis")
        // await this.checkBox_Candidiasis.click()

    }
    async enterCauseOfDeathWithCode()
    {
        await this.txtbox_CauseOfDeathWithCode.click()
    }
    async enterCauseOfDeathReason(pod_cause)
    {
        await this.txt_causeOfDeath.type(pod_cause)
    }
    async selectCheckBoxDeathCauseReason()
    {
        await this.checkBox_Cryptosporidiosis.click()

    }

}
module.exports=PatientDeath