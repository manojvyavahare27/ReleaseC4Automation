class PatientSearch
{
    constructor(page)
    {
        this.page=page
        this.btn_BackButton=page.getByRole('button', { name: 'Back Button' })
       // this.txtbox_GivenName = page.locator("xpath=//input[@id='Given Name']")
        this.txtbox_GivenName=page.getByRole('textbox', { name: 'Given Name' })  
        this.txtbox_FamilyName=page.getByRole('textbox', { name: 'Family Name' })
        this.dropdown_PatientSex=page.locator("xpath=//input[@name='sex']")
        this.txtbox_PatNameInOtherLang=page.getByRole('textbox', { name: 'Patient name in other language' })
        this.txtbox_HospitalRef=page.getByRole('textbox', { name: 'Hospital Ref' })
        this.txtbox_MobileNumber=page.getByTestId('Mobile')
        this.txtbox_Postcode=page.getByTestId('Postcode')
        this.txtbox_MRNNumber=page.getByTestId('MRN Number')
        this.txtbox_IdentificationId=page.getByTestId('Identification Id')
        this.txtbox_Card=page.getByRole('textbox', { name: 'Card' })
        //this.txtbox_Barcode=page.getByRole('spinbutton', { name: 'Barcode' })
        this.txtbox_Barcode=page.getByTestId('Barcode')
        this.txtbox_NHSNo =page.getByRole('textbox', { name: 'NHS No' })
        this.txtbox_BornDate=page.getByPlaceholder('dd/mm/yyyy')
        this.dropdown_PatientSeenInLastDays=page.locator("xpath=//div[@id='mui-component-select-patientSeenInLastDays']")
        this.txtbox_MPINumber=page.getByRole('textbox', { name: 'MPI Number' })
        this.checkbox_IncludeDeceasedPatient=page.getByRole('checkbox', { name: 'Include deceased patients' })
        this.checkbox_IncludeServicePatient=page.getByRole('checkbox', { name: 'Include service patients' })
        this.checkbox_Soundex=page.getByRole('checkbox', { name: 'Soundex' })
               
        this.btnExportList=page.locator("xpath=//div[contains(text(),'Export List')]")

        this.btnSearchPatientOnPopup=page.getByTestId('CommonCellmaPopup').getByTestId('Search')
        this.btn_Search=page.locator("xpath=//button[@data-testid='Search']")
        //this.btn_Search=page.locator("xpath=//div[contains(text(),'Search')]")
        //this.btn_SearchAppPat=page.
        this.txtbox_SearchPatient = page.locator("xpath=//div[@class='MuiGrid-root MuiGrid-container css-1d3bbye']//button[@aria-label='Search']")
        //this.txtbox_SearchPatient=page.getByRole('textbox', { name: 'Search' })
        //this.btn_AddPatient=page.locator("xpath=//button[contains(text(),'Add Patient')]")
        this.btn_AddPatient=page.locator("xpath=//div[contains(text(),'Add Patient')]")//17Feb2025
        this.dropdown_sex=page.locator("xpath=//input[@id='sex']")
        this.dropdown_sex_male=page.getByRole('option', { name: 'Male', exact: true })  
        this.txtbox_Identifier=page.getByTestId('Identifier')
        this.txtbox_IdentificationId=page.getByTestId('Identification Id')
               
        this.link_SelectPatient=page.getByTestId('Select')
        this.btn_ClosePatientSelectPopup=page.getByTestId('CancelIcon')//.locator('path')
        this.btn_SelectPatientYes=page.getByTestId('Yes')
        this.btn_SelectPatientNo=page.getByTestId('No') 

        this.btn_BackbtnOnPatientSearchPage=page.getByRole('button', { name: 'Back Button' })
        //Links
        this.link_Links=page.getByRole('button', { name: 'Links' })
        this.link_AppointmentLink=page.getByRole('heading', { name: 'Appointments' })
        this.link_HelpVideos=page.getByRole('heading', { name: 'Help Video' })
        this.link_PatientPossibleDuplicate=page.getByRole('heading', { name: 'Patients Possible Duplicates' })
        
        //Custom setting button
        this.btn_settingButton=page.getByTestId('Setting Button')
        this.link_CustomizableView=page.getByTestId('Customizable View')

        //Custom setting for Appointment Module Patient search
        this.link_CustomizableViewAppPatSearch=page.locator("xpath=//li[normalize-space(text())='Customisable View']")
        this.btn_ResetToDefaultView=page.locator("xpath=//button[@data-testid='Reset to Default View']")


        //Pageing
        this.select_2ndPage=page.getByRole('button', { name: 'Go to page 2' })

        //Export Patient List
        this.btn_ExportList=page.getByTestId('Export List')
        this.linkExportToCSV=page.getByTestId('CSV')
        this.linkExportToExcel=page.getByTestId('Excel')
        this.linkExportToXML=page.getByTestId('XML')
        this.linkExportToPDF=page.getByTestId('PDF')

        //Expand Patient Details
        this.expands_CurrentServiceDetails=page.getByTestId('Current Service Details')
        this.expands_AwaitingAcceptanceDetails=page.getByTestId('Awaiting Acceptance Details')
        this.expands_CurrentServiceDetails=page.getByTestId('Current Service Details')
        this.expands_AppointmentDetails=page.getByTestId('Appointment Details')
        this.expands_DischargedFromServiceDetails=page.getByTestId('Discharged From Service Details')
        this.expands_ContactTypeDetails=page.getByTestId('Contact Type Details')
        this.expands_PatientProcedures=page.getByTestId('Patient Procedures')
        this.expands_PatientDevices=page.getByTestId('Patient Devices')

        //Add Unknown Patient

        this.btn_AddUnknownPatient=page.getByTestId('Add Unknown Patient')
        this.txtbox_AddAge=page.getByTestId('Age')
        this.dropdownUnknownPatientBirthMonth=page.getByRole('button', { name: '1' })
        this.dropdownUnknownPatientSex=page.getByRole('button', { name: 'Male' })
        this.bnt_SaveUnknownPatient=page.getByTestId('Save')

        //Appointment module patient

   }
   async clickonBackButton()
   {
    await this.btn_BackButton.click()
   }
   async ClickOnSaveButtonForUnknownPatient()
   {
    await this.bnt_SaveUnknownPatient.click()
   }
    async selectUnknownPatientSex()
    {
     await this.dropdownUnknownPatientSex.click()
     await this.page.getByRole('option', { name: 'Female' }).click()
    }
    async selectUnknownPatientBirthMonth()
    {
        await this.dropdownUnknownPatientBirthMonth.click()
        await this.page.getByRole('option', { name: '3' }).click()
    }
    async enterUnknownPatientAge()
    {
        await this.txtbox_AddAge.type('5')
    }
    async ClickOnAddUnknownPatient()
    {
        await this.btn_AddUnknownPatient.click()
    }
    async expandsPatientDetails()
    {
        //await this.expands_CurrentServiceDetails.click()
        // await this.expands_AwaitingAcceptanceDetails.click()
        // await this.expands_CurrentServiceDetails.click()
        // await this.expands_AppointmentDetails.click()
        // await this.expands_DischargedFromServiceDetails.click()
        await this.expands_ContactTypeDetails.click()
        // await this.expands_PatientProcedures.click()
        // await this.expands_PatientDevices.click()
    }

    async CloseConfirmLegitimateRelationship()
    {
        await this.btn_ClosePatientSelectPopup.click()
    }
    async ClickOnYesConfirmLegitimateRelationship()
    {
        await this.btn_SelectPatientYes.click()
    }
    async ClickOnNoConfirmLegitimateRelationship()
    {
        await this.btn_SelectPatientNo.click()
    }
    async clickOnExportPatientData()
    {
        await this.linkExportToCSV.click()
        await this.linkExportToExcel.click()
        await this.linkExportToXML.click()
        await this.linkExportToPDF.click()
    }
    async SearchPatientFromList()
    {
        await this.txtbox_SearchPatient.fill('Victor')
    }
    async ClearSearchPatientFromList()
    {
        await this.txtbox_SearchPatient.fill(' ')
    }

    async selectSecondPage()
    {
        await this.select_2ndPage.click()
    }
    async clickOncustomizableView()
    {
        await this.link_CustomizableView.click()
    }

    async clickOncustomizableViewforPatientSearchOnAppointment()
    {
        await this.link_CustomizableViewAppPatSearch.click()
    }

    async clickOnResetToDefaultViewButton()
    {
        await this.btn_ResetToDefaultView.click()
        await this.page.getByTestId('Ok').click()
    }
    async clickOnsettingbutton()
    {
        await this.btn_settingButton.click()
    }
    async clickOnPatientPossibleDuplicaateLink()
    {
        await this.link_PatientPossibleDuplicate.click()
    }
    async clickOnHelpVideosLink()
    {
        await this.link_HelpVideos.click()
    }
    async clickOnAppointmentLink()
    {
        await this.link_AppointmentLink.click()
    }
    async clickOnBackbuttonOnPatientSearch()
    {
        await this.btn_BackbtnOnPatientSearchPage.click()
    }

    //MPI Number
    async enterMPINumber(name)
    {
        await this.txtbox_MPINumber.type(name)
        
    }

    //Given Name
    // async enterGivenName(pat_firstname)
    // {
    //    await this.txtbox_GivenName.fill(pat_firstname)        
    // }
    async enterGivenName(pat_firstname) {
    await this.txtbox_GivenName.fill(pat_firstname);
    
    const value = await this.txtbox_GivenName.inputValue();
    if (value !== pat_firstname) {
        throw new Error(`❌ Given Name not filled correctly. Expected: "${pat_firstname}", Found: "${value}"`);
    } else {
        console.log(`✅ Given Name filled correctly: "${value}"`);
    }
    }


    //Barcode
    async enterBarcode(name)
    {
        await this.txtbox_Barcode.fill(name)
        
    }
     
    //Family Name
    // async enterFamilyName(pat_surname)
    // {
    //    await this.txtbox_FamilyName.type(pat_surname)        
    // }
    async enterFamilyName(pat_surname) {
    await this.txtbox_FamilyName.type(pat_surname);
    
    const value = await this.txtbox_FamilyName.inputValue();
    if (value !== pat_surname) {
        throw new Error(`❌ Family Name not filled correctly. Expected: "${pat_surname}", Found: "${value}"`);
    } else {
        console.log(`✅ Family Name filled correctly: "${value}"`);
    }
}
    
    //Hospital Ref
    async enterHospitalRef(name)
    {
        await this.txtbox_HospitalRef.type(name)        
    }
     
    //Mobile Number
    async enterMobileNumber(name)
    {
        await this.txtbox_MobileNumber.type(name)        
    }

    ////Postcode
    async enterPostcode(name)
    {
        await this.txtbox_Postcode.type(name)       
    }

    //Identification ID
    async enterIdentificationId(name)
    {
       await this.txtbox_IdentificationId.type(name)       
    }
    //MRN Number
    async enterMRNNumber(name)
    {
      await this.txtbox_MRNNumber.type(name)        
    }
    
    //Name in other language
    async enterNameInOtherLanguage(name)
    {
        await this.txtbox_PatNameInOtherLang.type(name)       
    }

    async assertDropdownValue(selector, expectedValue) {
        const dropdown = await this.page.$(selector);
        const selectedOption = await dropdown_sex.$('Male');
        const selectedValue = await selectedOption.getAttribute('value');
        expect(selectedValue).toEqual(expectedValue);
      }


    //Select Sex
    // async selectSex(pat_sex)
    // {       
    //     await this.dropdown_PatientSex.click()
    //     await this.page
    // }

    //Patient seen in last days
    async selectPatientSeenInLastDays()
    {
        const elem=await this.dropdown_PatientSeenInLastDays.click()
        await this.page.getByRole('option', { name: '7 Day' }).click()
        if(elem!=null)
        {
            return elem;
        }
        else{
           console.log("Element not found");
        }
    }

    //check Future date
    async selectFutureDate()
    {
        const elem=await this.txtbox_BornDate.type('07/08/2024',{delay:10})

        if(elem!=null)
        {
            return elem;
        }
        else{
           console.log("Element not found");
        }
    }

    async clearBornDate()
    {
        await this.txtbox_BornDate.fill('')
    }
    //Born Date
    // async selectBornDate(pat_dob)
    // {   //await this.txtbox_BornDate.fill('')
    //     await this.txtbox_BornDate.fill(pat_dob)
    // }
    async selectBornDate(pat_dob)
    {   //await this.txtbox_BornDate.fill('')
        //await this.txtbox_BornDate.fill(pat_dob)
        //await this.page.getByPlaceholder('dd/mm/yyyy').fill("22/09/2024")
        await this.page.locator('[data-testid="Born"]').fill("22/09/2023");
        await this.page.keyboard.press("Tab");

    }
    async clickOnSearchbtnOnPopup()
    {
        await this.btnSearchPatientOnPopup.click()
    }

    async clickOnLoginbtn()
    {
        await this.btn_Search.click()
    }
    async clickOnAddPatientbnt()
    {
        await this.btn_AddPatient.click()
    }
    async selectSex()
    {
            await this.dropdown_sex.click()
            await this.dropdown_sex_male.click()
    }
    async enterPatientIdentifier()
    {
        await this.txtbox_Identifier.type('Idf007')
    }
    async enterPatientIdentificationId()
    {
        await this.txtbox_IdentificationId.type('IdfId001')
    }

    async clickOnLinks()
    {
        await this.link_Links.click()
    }
    
    //Search button
    async clickOnSearchButton()
    {
        await this.btn_Search.click()
    }
    async clickOnSearchPatButton()
    {
        await this.btn_Search.click()
    }


    //Export List button
    async clickOnExportListButton()
    {
        await this.btnExportList.click()
    }
    
    //Add Patient button
    async clickOnAddPatientbutton()
    {
        await this.btn_AddPatient.click()
    }

    async clickOnSearchPatientLink()
    {
        await this.link_SelectPatient.click()
    }


    
    

}
module.exports=PatientSearch