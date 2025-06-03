class PatientSummary
{
    // Manoj Vyavahare
    constructor(page)
    {
        this.page=page
        //All Categories icon from left hand side on patient Summary page
        this.buttonMenuCategory=page.locator("xpath=//button[@aria-label='Menu Button']//*[name()='svg']")
        this.iconDiagnosisCategory=page.locator("xpath=//img[@alt='Diagnosis Image Avatar']")
        this.iconDocumentCategory=page.locator("xpath=//img[@alt='Documents Image Avatar']")
        this.iconPatientDetailsCategory=page.locator("xpath=//img[@alt='Patient Details Image Avatar']")
        this.iconAllergyCategory=page.locator("xpath=//img[@alt='Allergies Image Avatar']")
        this.iconConditionCategory=page.locator("xpath=//img[@alt='Conditions Image Avatar']")
        this.iconMedicationCategory=page.locator("xpath=//img[@alt='Medications Image Avatar']")
        this.iconInvestigationCategory=page.locator("xpath=//img[@alt='Investigations Image Avatar']")
        this.iconDeviceCategory=page.locator("xpath=//img[@alt='Devices Image Avatar']")
        this.iconExaminationsCategory=page.locator("xpath=//img[@alt='Examinations Image Avatar']")
        this.iconPhysicalSignCategory=page.locator("xpath=//img[@alt='Physical Signs Image Avatar']")
        this.iconLifestyleCategory=page.locator("xpath=//img[@alt='Lifestyle Image Avatar']")
        this.iconSocialCircumstancesCategory=page.locator("xpath=//img[@alt='Social Circumstances Image Avatar']")
        this.iconRiskFactorCategory=page.locator("xpath=//img[@alt='Risk Factor Image Avatar']")
        this.iconTestToolCategory=page.locator("xpath=//img[@alt='Test Tools Image Avatar']")
        this.iconPromsCategory=page.locator("xpath=//img[@alt='PROMs Image Avatar']")
        this.iconPatientScanCategory=page.locator("xpath=//img[@alt='Patient Scans Image Avatar']")
        this.iconPregnanciesCategory=page.locator("xpath=//img[@alt='Pregnancies Image Avatar']")
        this.iconOutcomeCategory=page.locator("xpath=//img[@alt='Outcomes Image Avatar']")
        this.iconInterpretationsCategory=page.locator("xpath=//img[@alt='Interpretations Image Avatar']")
        this.iconRecommendationsCategory=page.locator("xpath=//img[@alt='Recommendations Image Avatar']")
        this.iconCommunicationCategory=page.locator("xpath=//img[@alt='Communication Image Avatar']")
        this.iconOverviewCategory=page.locator("xpath=//img[@alt='Overview Image Avatar']")

        //Top Icons on Patient Summary page
        this.topIconHome=page.locator("xpath=//div[contains(text(),'Home')]")
        this.topIconMyArea=page.locator("xpath=//div[contains(text(),'My Area')]")
        this.topIconCategories=page.locator("xpath=//div[contains(text(),'Categories')]")
        this.topIconModules=page.locator("xpath=//div[contains(text(),'Modules')]")
        this.topIconView=page.locator("xpath=//div[contains(text(),'View')]")
        this.topIconAddTo=page.locator("xpath=//div[contains(text(),'Add To')]")
        this.topIconPrint=page.locator("xpath=//div[contains(text(),'Print')]")

        //Setting Button for customizable view
        this.buttonSetting=page.locator("xpath=//button[@aria-label='settingButton']//*[name()='svg']")
        this.buttonCustomisableView=page.locator("xpath=//li[normalize-space()='Customizable View']")
        
        

    }
    async clickOniconExaminationsCategory()
    {
        await this.iconExaminationsCategory.click()
    }
    async clickOniconRecommendation()
    {
        await this.iconRecommendationsCategory.click()
    }
}
module.exports=PatientSummary