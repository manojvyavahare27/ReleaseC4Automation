class AddClinics
{
    constructor(page)
    {
        this.page=page
        this.linkslink=page.getByTestId('Links')
        this.linkSummary=page.getByRole('heading', { name: 'Summary' })
        this.linkService=page.getByRole('heading', { name: 'Service' })
        this.linkTryVoice=page.getByRole('heading', { name: 'Try Voice' })
        this.btnClosePopup=page.getByLabel('cancelIcon')
        this.btnAdd=page.getByTestId('Add')
        this.btnSearch=page.locator("xpath=//div[contains(text(),'Search')]")
        this.dropdownSpeciality=page.getByLabel('specialtyAddInputField').getByLabel('Open')
        
        //this.dropdownService=page.

        this.dropdownSpecialityAddInputField=page.getByLabel('specialtyAddInputField').getByLabel('Open')
        this.dropdownClinicType=page.getByLabel('clinicTypeAddInputField').getByLabel('Open')
        this.dropdownClinicLocation=page.getByLabel('clinicLocationAddInputField').getByLabel('Open')
        this.dropdownPatientWeb=page.getByTestId('patientWeb').getByLabel('Open')
        this.dropdownClinicLocationInputField=page.getByLabel('clinicLocationAddInputField').getByLabel('Open')

        this.dropdownTeam=page.getByLabel('teamAddInputField').getByLabel('Open')
        this.dropdownProtocolLocation=page.getByTestId('protocolLocation').getByLabel('Open')
        this.dropdownGender=page.getByTestId('genderSpecific').getByLabel('Open')
        this.dropdownFrequency=page.getByTestId('frequency').getByLabel('Open')

        this.dropdownClinicLocation=page.getByLabel('clinicLocationSearchInputField').getByLabel('Open')

        //Change Frequency
        this.linkFrequency=page.getByRole('button', { name: 'Frequent' })
        this.dropdownChangeFrequency=page.getByTestId('changeFrequency').getByLabel('Open')
        this.btnSaveFrequency=page.getByTestId('Save')


        //Search Clinic elements
        this.searchdropdownClinicLocation=page.getByLabel('Clinic Location', { exact: true })

        //Delete Records
        this.deleteSetClinics=page.getByLabel('delete')
        this.deleteRecordsYes=page.getByTestId('Yes')
        

    }
    async clickOnYesToDelete()
    {
        await this.deleteRecordsYes.click()
    }
    async clickOnDeleteIcon()
    {
        await this.deleteSetClinics.click()
       
    }
    async clickOnSaveFrequencyBtn()
    {
        await this.btnSaveFrequency.click()
    }

    async selectChangeFrequency()
    {
        await this.dropdownChangeFrequency.click()
        await this.page.getByRole('option', { name: 'Infrequent' }).click()
    }
    async clickOnFrequencyLink()
    {
        await this.linkFrequency.click()
    }

    async selectClinicLocationDropdown()
    {
        await this.dropdownClinicLocation.click()
        await this.page.getByRole('option', { name: 'ENT Location' }).click()
    }
    async selectTeam()
    {
        await this.dropdownTeam.click()
        await this.page.getByRole('option', { name: 'HP Region1' }).click()
    }

    
    async SearchByClinicLocation()
    {
        await this.searchdropdownClinicLocation.click()
        await this.page.getByRole('option', { name: 'ENT Location' }).click()
    }
    async selectFrequency()
    {
        await this.dropdownFrequency.click()
        await this.page.getByRole('option', { name: 'Frequent', exact: true }).click()
    }
    async selectGender()
    {
        await this.dropdownGender.click()
        await this.page.getByRole('option', { name: 'Male', exact: true }).click()
    }


    async selectProtocolLocation()
    {
        await this.dropdownProtocolLocation.click()
        await this.page.getByRole('option', { name: 'No' }).click()
    }

    async selectPatientWeb()
    {
        await this.dropdownPatientWeb.click()
        await this.page.getByRole('option', { name: 'Yes' }).click()
    }
    async selectClinicLocation()
    {
        await this.dropdownClinicLocation.click()
        await this.page.getByRole('option', { name: 'ENT Location' }).click()
    }

    async selectClinicType()
    {
        await this.dropdownClinicType.click()
        await this.page.getByRole('option', { name: 'Cardiology' }).click()
    }
    async selectSpecility()
    {
        await this.dropdownSpecialityAddInputField.click()
        await this.page.getByRole('option', { name: 'Surgeon' }).click()
    }
    async selectClinicLocationInput()
    {
        await this.dropdownClinicLocationInputField.click()
        await this.page.getByRole('option', { name: 'ENT Location' }).click()
    }

    async clickOnSearchButton()
    {
        await this.btnSearch.click()
    }
    async clickOnAddButton()
    {
        await this.btnAdd.click()
    }
    async clicoOnClosePopup(){
        await this.btnClosePopup.click()
    }

    async clickOnTryVoiceLink()
    {
        await this.linkTryVoice.click()
    }
    async clickOnServiceLink()
    {
        await this.linkService.click()
    }

    async clickOnSummaryLink()
    {
        await this.linkSummary.click()
    }
    async clickOnLinksLink()
    {
        await this.linkslink.click()
    }
}
module.exports=AddClinics