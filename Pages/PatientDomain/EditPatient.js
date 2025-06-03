class EditPatient
{
    constructor(page)
    {
        this.page=page
        this.tab_PatientDetails=page.getByTestId('Patient Details')
        this.tab_PatientAddress=page.getByRole('tab', { name: 'Patient Address' })
        this.tab_PatientPIP=page.getByTestId('Patient PIP')
        this.tab_PatientGP=page.getByRole('tab', { name: 'Patient GP' })
        this.tab_PrintIdCard=page.getByTestId('Print Id Card')
        this.btn_PatientDetailsSave=page.getByTestId('Save')
        this.dropdowninterpreterNeeded=page.getByTestId('Interpreter Needed').getByRole('button', { name: '​' })
         
        // Edit Patient Top links.
        this.link_PatientAddress=page.getByTestId('Patient Address')
        this.link_PatientPIP=page.getByTestId('Patient PIP')
        this.link_PatientGP=page.getByTestId('Patient GP')
        this.link_PrintIdCard=page.getByTestId('Print Id Card')
        this.btn_FindGP=page.getByTestId('Find GP')

        this.btn_PatientPIPExportList=page.getByTestId('Export List')
        //this.link_ViewPIP=page.getByTestId('View')
        this.link_ViewPIP=page.getByLabel('SearchSearch TitleGiven').getByTestId('View')
        this.txtbox_SearchGP=page.getByTestId('Search')
        this.btn_ClosePIPAddPopup=page.getByTestId('CancelIcon')
        this.btn_ClosePIPAddressPopup=page.getByTestId('CancelIcon')
        this.link_ViewInterestedPartyList=page.getByTestId('CommonCellmaPopup').getByTestId('View')
        this.btn_CloseAddressPopup=page.getByRole('dialog', { name: 'Address' }).getByTestId('CancelIcon')

        this.link_ExportToCSV=page.getByTestId('CSV')
        this.link_ExportToExcel=page.getByTestId('Excel')
        this.link_ExportToXML=page.getByTestId('XML')
        this.link_ExportToPDF=page.getByTestId('PDF')
        this.btn_ClosePopup=page.getByTestId('CancelIcon')
        
       //this.linkView
        //All Links under Links on Edit Patient page
        this.link_Links=page.getByTestId('Links')
        this.link_Death=page.getByRole('heading', { name: 'Death' }).first()
        this.link_Appointments=page.getByRole('heading', { name: 'Appointments' })
        this.link_Consent=page.getByRole('heading', { name: 'Consent' })
        this.link_Details=page.getByRole('heading', { name: 'Details' })
        this.link_FinanceSummary=page.getByRole('heading', { name: 'Finance Summary' })
        this.link_Summary=page.getByRole('heading', { name: 'Summary' }).nth(1)
        this.link_Insurance=page.getByRole('heading', { name: 'Insurance' }).first()
        this.link_PatientPossibleDuplicate=page.getByRole('heading', { name: 'Patients Possible Duplicates' })
        this.link_PatientInterestedParties=page.getByRole('heading', { name: 'Patient Interested Parties' }).first()
        this.link_Referral=page.getByRole('heading', { name: 'Referral' })









        //Patient Details

        this.dropdown_CurrentlyPregnant=page.getByTestId('Currently Pregnant').getByRole('button', { name: '​' })
        this.txtbox_CountyOfBirth=page.getByTestId('County Of Birth')
        this.dropdown_Sex=page.getByTestId('Sex').getByRole('button', { name: '​' })
        this.dropdown_Ethnicity=page.locator("xpath=//div[@id='mui-component-select-patEthnicityText']")
        this.dropdown_Religion=page.locator("xpath=//div[@id='mui-component-select-patReligion']")
        this.dropdown_SexualOrientation=page.locator("xpath=//div[@id='mui-component-select-patSexualOrientationEliId']")
        this.dropdown_CurrentlyPregnant=page.getByTestId('Currently Pregnant').getByRole('button', { name: '​' })
        this.dropdown_PrimaryDisablity=page.getByTestId('Primary Disability').getByRole('button', { name: '​' })
        this.dropdown_Prisoner=page.locator("xpath=//div[@aria-labelledby='mui-component-select-patPrisoner']")

        //Edit Patient Add PIP
        this.btn_AddInterestedParties=page.getByTestId('Add Interested Party')

        //GP
        this.btn_SaveGP=page.getByTestId('Save')       

        //Reset Password Link
        this.link_ResetPassword=page.getByTestId('Reset Password')

        //Add Unique Identifier
        this.btn_AddUniqueIdentifier=page.getByTestId('Add Patient Unique Identifier')
        this.dropdown_UniqueIdentification=page.getByTestId('Unique Identification').getByRole('button', { name: '​' })
        //locator("xpath=//div[@id='mui-component-select-uniqueIdentification']")
        //getByTestId('Unique Identification').getByRole('button', { name: '​' })
        this.txtbox_IdentificationNumber=page.getByTestId('Number').first()
        this.dropdown_IssuingCountry=page.locator('#mui-component-select-issuingCountry').first()
        this.btn_AddFirstUniqueIdentifier=page.locator("xpath=//div[@id='mui-component-select-uniqueIdentification']")
        this.btn_Add_First=page.getByTestId('Add').first()
        this.btn_Delete_Identifier=page.getByRole('button', { name: 'Delete identifier' })
        this.btn_CancelDeleteIdentifierPopup=page.getByTestId('Cancel')
        this.btn_OkDeleteIdentifierPopup=page.getByTestId('Ok')

        
    }
    async clickOnOkbtnforDeleteIdentifier()
    {
        await this.btn_OkDeleteIdentifierPopup.click()
    } 
    async clickOnCancelbtnforDeleteIdentifier()
    {
        await this.btn_CancelDeleteIdentifierPopup.click()
    }
    async clickOnDeleteIdentifierbtn()
    {
        await this.btn_Delete_Identifier.click()
    }
    async clickOnAddButtonForUniqueIdentifier()
    {
        await this.btn_Add_First.click()
    }
    async clickOnAddFirstUniqueIdentifierbutton()
    {
        await this.btn_AddFirstUniqueIdentifier.click()
        await this.page.getByRole('option', { name: 'PAN Card' }).click()
    }

    async selectIssuingCountry()
    {
        await this.dropdown_IssuingCountry.click()
        await this.page.getByRole('option', { name: 'India', exact: true }).click()
    }
    async enterUniqueIdentification()
    {
        await this.txtbox_IdentificationNumber.type('MANOJ2719M')
    }
    async selectUniqueIdentification()
    {
        await this.dropdown_UniqueIdentification.click()
        
    }

    async clickOnAddUniqueIdentifierbutton()
    {
        await this.btn_AddUniqueIdentifier.click()
    }
    async clickOnResetPasswordLink()
    {
        await this.link_ResetPassword.click()
    }
    async selectPrisoner(pat_prisoner_yes)
    {
        await this.dropdown_Prisoner.click()
        await this.page.getByRole('option', { name: pat_prisoner_yes }).click()
    }
    async selectPrimaryDisablity()
    {
        await this.dropdown_PrimaryDisablity.click()
        await this.page.getByRole('option', { name: 'Arthritis' }).getByRole('checkbox').click()
    }
    async selectCurrentlyPrgenant(pat_currently_pregnant_yes)
    {
        await this.dropdown_CurrentlyPregnant.click()
        await this.page.getByRole('option', { name: pat_currently_pregnant_yes }).click()
    }
    async selectSexualOrientation(pat_sexual_orientation_eli_text)
    {
        await this.dropdown_SexualOrientation.click()
        await this.page.getByRole('option', { name: pat_sexual_orientation_eli_text }).click()
    }
    async selectReligionDropdown(pat_religion)
    {
        await this.dropdown_Religion.click()
        await this.page.getByRole('option', { name: pat_religion }).click()
    }

    async selectEthnicityDropdown(pat_ethnicity_text)
    {
        await this.dropdown_Ethnicity.click()
        await this.page.getByRole('option', { name: pat_ethnicity_text, exact: true }).click()
    }
    async selectSexDropdown()
    {
        await this.dropdown_Sex.click()
        await this.page.getByRole('option', { name: 'Male' }).click()
    }
    async enterCountyOfBirth()
    {
        await this.txtbox_CountyOfBirth.type("Maharashtra")
    }

    async selectCurrentlyPregnant()
    {
        await this.dropdown_CurrentlyPregnant.click()
        await this.page.getByRole('option', { name: 'No' }).click()
    }
    async clickOnSaveGpbutton()
    {
        await this.btn_SaveGP.click()
    }
    async clickOnPatientGPlink()
    {
        await this.link_PatientGP.click()
    }
    async clickOnFindGPbutton()
    {
        await this.btn_FindGP.click()
    }
    async clickOnAddInteretedPartiesbutton()
    {
        await this.btn_AddInterestedParties.click()
    }
    async clickOnPatientAddressLink()
    {
        await this.link_PatientAddress.click()
    }

    async clickOnPatientPIPLink()
    {
        await this.link_PatientPIP.click()
    }


    async selectInterpreterNeeded()
    {
        await this.dropdowninterpreterNeeded.click()
        await this.page.getByRole('option', { name: 'Yes' }).click()
    }
    async clickOnCloseInterestedPartyPopup()
    {
        await this.btn_ClosePopup.click()
    }

    async clickOnExportToCSVLink()
    {
        await this.link_ExportToCSV.click()
    }
    async clickOnExportToExcelLink()
    {
        await this.link_ExportToExcel.click()
    }
    async clickOnExportToXMLLink()
    {
        await this.link_ExportToXML.click()
    }
    async clickOnExportToPDFLink()
    {
        await this.link_ExportToPDF.click()
    }




    async clickOnAddressPIP()
    {
        await this.btn_CloseAddressPopup.click()
    }

    async clickOnViewforInterestedPartyList()
    {
        await this.link_ViewInterestedPartyList.click()
    }
    async clickOnClosePIPAddressPopup()
    {
        await this.btn_ClosePIPAddressPopup.click()
    }

    async clickOnViewPIPLink()
    {
        await this.link_ViewPIP.click()
    }

    async enterIntoSearchGP(name)
    {
        await this.txtbox_SearchGP.type(name)
    }
    
    async clickOnDeathLink()
    {
        await this.link_Death.click()
    }

    async clickOnAppointmentLink()
    {
        await this.link_Appointments.click()
    }

    async clickOnDetailsLink()
    {
        await this.link_Details.click()
    }

    async clickOnConsentLink()
    {
        await this.link_Consent.click()
    }

    async clickOnPatientSummaryLink()
    {
        await this.link_FinanceSummary.click()
    }
    async clickOnSummaryLink()
    {
        await this.link_Summary.click()
    }
    async clickOnInsuranceLink()
    {
        await this.link_Insurance.click()
    }
    async clickOnPatientPossibleDuplicate()
    {
        await this.link_PatientPossibleDuplicate.click()
    }
    async clickOnPatientInterestedParties()
    {
        await this.link_PatientInterestedParties.click()
    }
    async clickOnReferral()
    {
        await this.link_Referral.click()
    }
    async clickOnLinks()
    {
        await this.link_Links.click()
    }

    async clickOnExportListbtn()
    {
        await this.btn_PatientPIPExportList.click()
    }
    async clickOnSaveForPatientDetails()
    {
        await this.btn_PatientDetailsSave.click()
    }
    async clickOnPrintIdCard()
    {
        await this.tab_PrintIdCard.click()
    }

    async clickOnPatientGP()
    {
        await this.tab_PatientGP.click()
    }

    async clickOnPatientPIP()
    {
        await this.tab_PatientPIP.click()
    }

    async clickOnPatientAddress()
    {
        await this.tab_PatientAddress.click()
    }

    async clickOnPatientDetails()
    {
        await this.tab_PatientDetails.click()
    }

}
module.exports=EditPatient