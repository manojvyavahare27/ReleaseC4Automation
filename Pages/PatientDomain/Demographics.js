class Demographics{
    constructor(page)
    {
        this.page=page
        this.ConsentForphotographcsNo=page.getByLabel('No')
        this.ConsentForphotographcsYes=page.getByLabel('Yes')
        this.Btn_SaveConsentForphotographcs=page.getByTestId('Save')

        //Links
        this.link_Links=page.getByTestId('Links')
        this.link_Details=page.getByRole('heading', { name: 'Details' })
        this.link_PatientId=page.getByRole('heading', { name: 'Patient Id' })
        this.link_PIP=page.getByRole('heading', { name: 'Patient Interested Parties' })
        this.link_QAndA=page.getByRole('heading', { name: 'Patient Question' })
        this.link_Summary=page.getByTestId('Summary').getByRole('heading', { name: 'Summary' })
        this.link_WorkList=page.getByRole('heading', { name: 'Worklist' })
        this.link_TestPatient=page.getByRole('heading', { name: 'Test' })
        this.dropdown_TestPatient=page.locator("xpath=//div[@data-testid='Test Patient']")

        this.btn_ClosePopups=page.getByTestId('CancelIcon')

        //Expands Patient Details on demographics page
        this.expand_PatientInformation=page.getByTestId('Patient Information')
        this.expand_PatientIdentifier=page.getByTestId('Patient Identifier')
        this.expand_PatientAddress=page.getByTestId('Patient Address')
        this.expand_PatientPIP=page.getByRole('button', { name: 'Patient Interested Parties' })
        this.expand_PatientGP=page.getByTestId('Patient Gp')       
        
    }
    async ClickOnExpandsPatientInformation()
    {
        await this.expand_PatientInformation.click()
    }
    async ClickOnExpandsPatientIdentifier()
    {
        await this.expand_PatientIdentifier.click()
    }
    async ClickOnExpandsPatientAddress()
    {
        await this.expand_PatientAddress.click()
    }
    async ClickOnExpandsPatientPIP()
    {
        await this.expand_PatientPIP.click()
    }
    async ClickOnExpandsPatientGP()
    {
        await this.expand_PatientGP.click()
    }





    async ClickOnCloseAllPopup()
    {
        await this.btn_ClosePopups.click()
    }

    async ClickOnLinkLinks()
    {
        await this.link_Links.click()
    }
    async ClickOnLinkDetails()
    {
        await this.link_Details.click()
    }
    async ClickOnLinkPatientIdentifier()
    {
        await this.link_PatientId.click()
    }
    async ClickOnLinkPIP()
    {
        await this.link_PIP.click()
    }
    async ClickOnLinkQAndA()
    {
        await this.link_QAndA.click()
    }
    async ClickOnLinkSummary()
    {
        await this.link_Summary.click()
    }

    async ClickOnLinkWorkList()
    {
        await this.link_WorkList.click()
    }

    async ClickOnLinkTest()
    {
        await this.link_TestPatient.click()
    }

    async SelectDropdownTestPatient()
    {
        await this.dropdown_TestPatient.click()
        await this.page.getByRole('option', { name: 'No' }).click()
        await this.page.getByTestId('Set').click()
    }

    async SelectRadioButtonForConsentForPhotographcsNo()
    {
        await this.ConsentForphotographcsNo.click()
    }
    async SelectRadioButtonForConsentForPhotographcsYes()
    {
        await this.ConsentForphotographcsYes.click()
    }
    async ClickSaveButtonForConsentForPhotographcs()
    {
        await this.Btn_SaveConsentForphotographcs.click()
    }
}
module.exports=Demographics