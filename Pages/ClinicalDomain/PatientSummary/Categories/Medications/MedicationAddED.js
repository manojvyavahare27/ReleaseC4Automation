class MedicationAddED
{
    constructor(page)
    {
        this.page=page
        //Expand extra details
        this.btnexpands=page.locator("xpath=//div[@class='MuiGrid-root MuiGrid-container css-1bsa7z6']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg']//*[name()='path' and contains(@d,'M15.08 9.5')]")
        this.btnexpandsAddedMedication=page.locator("xpath=//tbody[1]/tr[2]/td[1]/button[1]//*[name()='svg']//*[name()='path' and contains(@d,'M15.08 9.5')]")
        
        //Add Extra Details pop up locators
        this.dropdownSubCategory=page.locator("xpath=//input[@id='Sub Category']")
        this.txtboxDose=page.locator("xpath=//input[@aria-label='Dose']")
        this.dropdownFrequency=page.locator("xpath=//input[@id='Frequency']")
        this.dropdownRuote=page.locator("xpath=//input[@id='Route']")
        this.txtboxDays=page.locator("xpath=//input[@aria-label='Days']")
        this.dropdownSite=page.locator("xpath=//input[@id='Site']")
        this.dropdownPrescribeBy=page.locator("xpath=//input[@id='PrescribedBy']")
        this.txtboxMethod=page.locator("xpath=//input[@aria-label='Method']")
        this.calendarStartDate=page.locator("xpath=//input[@name='startDate']")

        this.calendarStopDate=page.locator("xpath=//input[@name='stopDate']")
        
        this.dropdownSideEffect=page.locator("xpath=//input[@name='sideEffect']")
        this.dropdownStatus=page.locator("xpath=//input[@id='Status']")
        this.dropdownIndication=page.locator("xpath=//input[@id='Indication']")
        this.dropdownStopReason=page.locator("xpath=//input[@id='StoppedReason']")
        this.dropdownPGDPSD=page.locator("xpath=//input[@id='PGD/PSD']")
        this.dropdownMedicationGradeForAdministrator=page.locator("xpath=//label[@id='User grades that can administator medication-MAED-label']")
        this.dropdownMaxReffills=page.locator("xpath=//input[@id='Max Reffills']")
        this.txtboxQuantity=page.locator("xpath=//input[@aria-label='Quantity']")
        this.txtboxUnit=page.locator("xpath=//input[@aria-label='Unit']")
        this.dropdownCurrentLocation=page.locator("xpath=//input[@id='Current Location']")
        this.txtboxLinkToDiagnosis=page.locator("xpath=//input[@id='Link to Diagnosis']")
        this.dropdownAdherent=page.locator("xpath=//input[@id='Adherent']")
        this.dropdownEndoserment=page.locator("xpath=//input[@id='Endoserment']")
        this.dropdownForCondition=page.locator("xpath=//input[@id='For Condition']")
        this.txtboxPriceCheckQuantity=page.locator("xpath=//input[@id='Price check quantity']")
        this.txtboxTotalCost=page.locator("xpath=//input[@id='Total Cost']")
        this.textareaNotes=page.locator("xpath=//textarea[@aria-label='Notes']")
        //Checkboxes
        this.checkboxPrescriptionandSupply=page.locator("xpath=//span[@data-testid='Prescription and supply']")
        this.checkboxSupply=page.locator("xpath=//span[@data-testid='Supply']")
        this.checkboxRepeatable=page.locator("xpath=//span[@data-testid='Repeatable']")
        this.checkboxPrivateRecord=page.locator("xpath=//span[@data-testid='Private Record']")
        this.checkboxSuitableforHomeDelivery=page.locator("xpath=//span[@data-testid='Suitable for Home Delivery']")
        this.checkboxSetasDefault=page.locator("xpath=//span[@data-testid='Set as Default']")
        this.checkboxAddtoFavourites=page.locator("xpath=//span[@data-testid='Add to favourites']")
        this.checkboxAddtoOrderSet=page.locator("xpath=//span[@data-testid='Add to order set']")
        this.checkboxAddtoPrescription=page.locator("xpath=//span[@data-testid='Add to Prescription']")

        this.btnSave=page.locator("xpath=//button[@data-testid='Save']")
        this.btnSaveandCreatePrescription=page.locator("xpath=//div[contains(text(),'Save and Create Prescription')]")

        //Setting Button
       this.btnSetting=page.locator("xpath=//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-d5btle']//*[name()='svg']//*[name()='path' and contains(@d,'M19.43 12.')]")
        this.linkCustomisableView=page.locator("xpath=//li[@data-testid='customizableView']")
        this.linkdefaultView=page.locator("xpath=//li[@data-testid='defaultView']")

        //Variable Dose Regime
        this.linkVariableDoseRegime=page.locator("xpath=//a[normalize-space()='Variable dose regime']")
        this.txtboxDose=page.locator("xpath=//input[@aria-label='Dose']")
        this.dropdownFrequency=page.getByTestId('frequency').getByLabel('Frequency')

        //Top icons on Pop up
        this.iconAddDiagnosis=page.locator("xpath=//img[@alt='addDiagnosis']")
        this.iconStandardDosing=page.locator("xpath=//img[@alt='standardDosing']")
        this.iconUploadFile=page.locator("xpath=//img[@alt='uploadFile']")
        this.iconFolder=page.locator("xpath=//img[@alt='folder']")
        this.iconAddTask=page.locator("xpath=//img[@alt='addTask']")
        this.iconAddToWorkList=page.locator("xpath=//img[@alt='addToWorklist']")
        this.iconAddPathway=page.locator("xpath=//img[@alt='AddPathway']")
        this.iconAddLink=page.locator("xpath=//img[@alt='LinkAdd']")
        this.buttonClosePopup=page.locator("xpath=//button[@aria-label='cancelIcon'][1]")

        //Delete Medication
        this.btnDeleteMedication=page.locator("xpath=//button[@data-testid='Delete']")
        this.btnCancelDeleteMedication=page.locator("xpath=//button[@data-testid='Cancel']")
        this.btnOkDeleteMedication=page.locator("xpath=//button[@data-testid='Ok']")
        this.textareaDeleteMedicationReason=page.locator("xpath=//textarea[@data-testid='Reason']")
        this.buttonSaveDeleteMedicationReason=page.locator("xpath=//div[@class='MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-grid-xs-12 css-6td7do']//div[@class='MuiGrid-root MuiGrid-item css-1wxaqej'][normalize-space()='Save']")

        //Medication History
        this.iconMedicationHistory=page.locator("xpath=//img[@alt='Category History']")
        this.iconMedicationReview=page.locator("xpath=//button[@aria-label='reviewIconButton']")
        this.iconMedicationHighlight=page.locator("xpath=//button[@aria-label='highlightNone']")

        //History Of Medication pop up
        this.svgExpandMedicatioIcon=page.locator("xpath=//tr[@class='MuiTableRow-root css-1gqug66']//button[@aria-label='expandRowIconundefined']//*[name()='svg']")
        this.buttonClosePopup=page.locator("xpath=//button[@aria-label='cancelIcon']//*[name()='svg']")

    }   

    async expandMedicationSection()
    {
        await this.btnexpands.click()
    }
    async expandAddedMedication()
    {
        await this.btnexpandsAddedMedication.click()
    }
    async selectSubcategory()
    {
        await this.dropdownSubCategory.click()
        await this.page.getByRole('option', { name: 'Antibacterial' }).click()
    }
    async enterDose(medi_dose)
    {
        await this.txtboxDose.fill("")
        await this.txtboxDose.type(medi_dose)
    }
    async selectFrequency(medi_frequency)
    {
        await this.dropdownFrequency.click()
        await this.page.getByRole('option', { name: medi_frequency }).click()
        
    }
    async selectRoute(medi_route)
    {
        await this.dropdownRuote.click()
        await this.page.getByRole('option', { name: medi_route }).click()
    }
    async enterDays(medi_duration)
    {
        await this.txtboxDays.fill(medi_duration)
    }
    async selectSite(meded_value)
    {
        await this.dropdownSite.click()
        await this.page.getByRole('option', { name: meded_value }).click()
    }
    async selectPrescribeBy(medi_prescribed_by)
    {
        await this.dropdownPrescribeBy.click()
        await this.page.getByRole('option', { name: medi_prescribed_by }).click()
    }
    async enterMethod(medi_method)
    {
        await this.txtboxMethod.fill(medi_method)
    }
    async selectStartEndDate(medi_start_date,medi_stop_date)
    {
        // await this.calendarStartDate.clear()
        // await this.calendarStopDate.clear()
       
        await this.calendarStartDate.fill(medi_start_date)
        await this.calendarStopDate.fill(medi_stop_date)
    }
    async selectSideEffect(mse_text)
    {
        await this.dropdownSideEffect.click()
        await this.page.getByRole('option', { name: mse_text }).click()
    }
    async selectStatus(pacr_status)
    {
       await this.dropdownStatus.click()
       await this.page.getByRole('option', { name: pacr_status }).click()

    }
    async selectIndication(meded_value)
    {
        await this.dropdownIndication.click()
        await this.page.getByRole('option', { name: meded_value }).click()
    }
    async selectStopReason()
    {
        await this.dropdownStopReason.click()
    }
    async selectPGDPSD(meded_value_PGD)
    {
        await this.dropdownPGDPSD.click()
        await this.page.getByRole('option', { name: meded_value_PGD }).click()
    }
    async selectMedicationGradeForAdministrator(meded_value_Administrator)
    {
        await this.dropdownMedicationGradeForAdministrator.click()
        await this.page.getByRole('option', { name: meded_value_Administrator }).click()
    }
    async selectMaxReffills(meded_value_MaxReffills)
    {
        await this.dropdownMaxReffills.click()
        await this.page.getByRole('option', { name: meded_value_MaxReffills }).click()
    }
    async enterQuantity(meded_value_Quantity)
    {
        await this.txtboxQuantity.fill("")
        await this.txtboxQuantity.fill(meded_value_Quantity)        
    }
    async enterUnit(meded_value_Unit)
    {
        await this.txtboxUnit.fill("")
        await this.txtboxUnit.fill(meded_value_Unit)
    }
    async selectCurrentLocation(pcl_location_name)
    {
        await this.dropdownCurrentLocation.click()
        await this.page.getByRole('option', { name: pcl_location_name }).click()
    }
    async selectLinkToDiagnosis()
    {
        //await this.txtboxLinkToDiagnosis.click()
        await this.txtboxLinkToDiagnosis.fill("")
    }
    async selectAdherent(meded_value_Adherent)
    {
        await this.dropdownAdherent.click()
        await this.page.getByRole('option', { name: meded_value_Adherent, exact: true }).click()
    }
    async selectendoserment(paprd_endorsement)
    {
        await this.dropdownEndoserment.click()
        await this.page.getByRole('option', { name: paprd_endorsement }).click()
    }
    async selectForCondition()
    {
        await this.dropdownForCondition.click()
    }
    async selectPriceCheckQuantity(meded_value_Price_check_quantity)
    {
        await this.txtboxPriceCheckQuantity.fill(meded_value_Price_check_quantity)
    }
    async enterTotalCost(paprd_cost)
    {
        await this.txtboxTotalCost.fill("")
        await this.txtboxTotalCost.fill(paprd_cost)
    }
    async enterNotes(medi_notes)
    {
        await this.textareaNotes.fill(medi_notes)
    }

    //Checkboxes
    async checkAllCheckboxes()
    {
        await this.checkboxPrescriptionandSupply.click()
        await this.checkboxSupply.click()
        await this.checkboxRepeatable.click()
        await this.checkboxPrivateRecord.click()
        await this.checkboxSuitableforHomeDelivery.click()
        await this.checkboxSetasDefault.click()
        await this.checkboxAddtoPrescription.click()

    }

    //Save Medication button //Save and Create Prescription
    async clickOnSaveMedicationButton()
    {
        await this.btnSave.click()
    }

    //Delete Medication
    async clickOnDeleteMedicationButton()
    {
        await this.btnDeleteMedication.click()
    }
    async clickOnCancelDeleteMedicationButton()
    {
        await this.btnCancelDeleteMedication.click()
    }
    async clickOnOkDeleteMedication()
    {
        await this.btnOkDeleteMedication.click()
    }
    async enterDeleteMedicaionReason()
    {
        await this.textareaDeleteMedicationReason.fill("Delete for testing")
        await this.buttonSaveDeleteMedicationReason.click()
    }

    //Medication History
    async clickOnMedicationHistoryIcon()
    {
        await this.iconMedicationHistory.click()
    }
    async clickOnMedicationReviewIcon()
    {
        await this.iconMedicationReview.click()
    }
    async clickOnMedicationHighlisghtIcon()
    {
        await this.iconMedicationHighlight.click()
    }
    //History of Medication pop up
    async clickOnExpandMedicationButton()
    {
        await this.svgExpandMedicatioIcon.click()
    }
    async closeMedicationHistoryPopup()
    {
        await this.buttonClosePopup.click()
    }



}

module.exports=MedicationAddED