class AddUserWizard {
    constructor(page) {
        this.page = page
        this.btn_Save = page.getByRole('button', { name: 'Save' })
        this.dropdown_Title = page.getByTestId('title').getByLabel('Title')
        this.txtbox_Username = page.getByTestId('Username')
        this.txtbox_Password = page.getByTestId('Password')
        this.txtbox_ConfirmPassword = page.getByTestId('Confirm Password')
        this.txtbox_Email = page.getByTestId('Email')
        this.txtbox_GivenName = page.getByTestId('Given Name')
        this.txtbox_FamilyName = page.getByTestId('Family Name')
        this.dropdown_Subscribed = page.getByTestId('subscribed').getByLabel('Subscribed')
        this.dropdown_UserServiceGroup = page.getByLabel('User\'s Service Group')
        this.txtbox_Notes = page.getByLabel('Notes')
        this.dropdown_ExtReferralPage = page.getByLabel('Show On External Referral Request Page')
        this.txtbox_Mobile = page.getByTestId('Mobile')
        this.dropdown_ShowExternalRefReqPage=page.getByLabel('Show On External Referral Request Page')
        this.UserExpireDate = page.getByPlaceholder('dd/mm/yyyy')
        this.dropdown_Profession = page.getByLabel('Profession *')
        this.txtbox_MCRNNumber = page.getByTestId('MCRN Number')
        this.dropdown_UserStatus = page.getByLabel('Active')
        this.dropdown_UserResetPassword = page.getByTestId('User Reset Password On Next Login').getByLabel('User Reset Password On Next Login')
        this.link_UserGroupAdd = page.getByTestId('Add')
        this.userRoles=page.locator("xpath=//input[@id='User Roles']")
                                      
        //Toggles
        // this.toggle_ContactHiddenNo = page.locator('div').filter({ hasText: 'Is Contacts HiddenYesNo' }).getByRole('button', { name: 'No' })
        // this.toggle_ContactHiddenYes = page.locator('div').filter({ hasText: 'Is Contacts HiddenYesNo' }).getByRole('button', { name: 'Yes' })
        // this.toggle_HPOnDiaryNo = page.locator('div').filter({ hasText: 'Is User Going On DiaryYesNo' }).getByRole('button', { name: 'No' })
        // this.toggle_HPOnDiaryYes = page.locator('div').filter({ hasText: 'Is User Going On DiaryYesNo' }).getByRole('button', { name: 'Yes' })
        // this.toggle_UserHPNo = page.locator('div').filter({ hasText: 'Is User An HPYesNo' }).getByRole('button', { name: 'No' })
         //this.toggle_UserHPYes = page.locator('div').filter({ hasText: 'Is User An HPYesNo' }).getByRole('button', { name: 'Yes' })
        this.toggle_HPOnDiaryYes = page.getByRole('button', { name: 'Yes' }).nth(2)
        this.toggle_UserHPYes=page.getByRole('button', { name: 'Yes' }).nth(1)
        this.toggle_IsContactHiddenNo=page.locator('div').filter({ hasText: 'Is Contacts HiddenYesNo' }).getByRole('button', { name: 'No' })
        this.toggle_IsContactHiddenYes=page.locator('div').filter({ hasText: 'Is Contacts HiddenYesNo' }).getByRole('button', { name: 'Yes' })


        this.dropdown_Consultant = page.getByTestId('consultant').getByLabel('Consultant')
        this.txtbox_DoctorSurname = page.getByTestId('PROMs Doctor Surname')
        this.dropdown_Specialty = page.getByTestId('specialty').getByLabel('Specialty')
        this.txtbox_FirstConsultationValidity = page.getByTestId('First Consultation Validity')
        this.dropdown_Show = page.getByTestId('show').getByLabel('Show')
        this.txtbox_ConsultantCode = page.getByTestId('Consultant Code')
        this.txtbox_FollowUpConsultationValidity = page.getByTestId('Follow Up Consultation Validity')
        this.dropdown_Teams=page.getByTestId('team').getByLabel('Team')
        this.dropdown_GenericHP = page.getByLabel('Generic HP')
        this.dropdown_Team = page.getByTestId('team').getByLabel('Team')
        this.txtbox_NPINumber = page.getByTestId('NPI Number')
        this.dropdown_SendApptEmail = page.getByLabel('Send Appointment Text/Email')
        this.dropdown_PROMsReason = page.getByLabel('PROMs Reason')
        this.dropdown_Local = page.getByTestId('local').getByLabel('Local')
        this.txtbox_Initial = page.getByTestId('Initials')
        this.dropdown_CommissionLevel = page.getByLabel('Commission Level')
        this.txtbox_PROMsNumber = page.getByTestId('PROMs Number')
        this.dropdown_UserRoles = page.getByRole('button', { name: 'Standard, Default' })
        this.button_backbutton=page.locator("xpath=//button[@aria-label='Back Button']")
        this.btn_Next = page.getByTestId('Next')
        this.btn_Save=page.locator("xpath=//button[@data-testid='Save']")
        this.btn_CustomisableSettingButton=page.getByTestId('Setting Button')
        this.btn_CustomisableView=page.getByRole('menuitem', { name: 'Customizable View' })

    }

    //User Details

    async clickOnCustomisableView()
    {
        await this.btn_CustomisableView.click()
    }
    async clickOnCustomSettingbtn()
    {
        await this.btn_CustomisableSettingButton.click()
    }
    async clickOnBackButton()
    {
        await this.button_backbutton.click()
    }

    async clickOnSave() {
        await this.btn_Save.click()
    }
    async selectTitle(use_title) {
        await this.dropdown_Title.click()
        await this.page.getByRole('option', { name: use_title, exact: true }).click()
    }
    async enterUsername(UserName) {
        await this.txtbox_Username.type(UserName)
    }
    async enterPassword(Password) {
        await this.txtbox_Password.type(Password)
    }
    async enterConfirmPassword(ConfirmPassword) {
        await this.txtbox_ConfirmPassword.type(ConfirmPassword)
    }
    async enterEmail(Email) {
        await this.txtbox_Email.type(Email)
    }
    async enterGivenName(GivenName) {
        await this.txtbox_GivenName.type(GivenName)
    }
    async enterFamilyName(FamilyName) {
        await this.txtbox_FamilyName.type(FamilyName)
    }
    async selectSubscribed() {
        await this.dropdown_Subscribed.click()
        //await this.getByTestId('Subscribed').getByLabel('Subscribed').type("Subscribed")
        await this.page.getByRole('option', { name: 'Subscribed', exact: true }).click()
    }
    async selectUserServiceGroup() {
        await this.dropdown_UserServiceGroup.click()
        await this.page.getByRole('option', { name: 'All' }).click()
    }
    async enterNotes(Notes) {
        await this.txtbox_Notes.type(Notes)
    }
    async selectShowOnExtRefPage() {
        await this.dropdown_ExtReferralPage.click()
        await this.page.getByRole('option', { name: 'Yes' }).click()
    }
    async selectShowExternalRequestPage()
    {
       await this.dropdown_ShowExternalRefReqPage.click()
       await this.page.getByRole('option', { name: 'Yes' }).click()
    }
    async enterMobileNumber(Mobile) {
        await this.txtbox_Mobile.type(Mobile)
    }
    async enterUserExpireDate(UserExpireDate) {
        await this.UserExpireDate.click()
        await this.UserExpireDate.type(UserExpireDate)
    }
    async selectProfession(esp_profession) {
        await this.dropdown_Profession.click()
        await this.page.getByRole('option', { name: esp_profession, exact: true }).click()
    }
    async enterMCRNNumber(MCRN) {
        await this.txtbox_MCRNNumber.type(MCRN)
    }
    async selectUserStatus() {
        await this.dropdown_UserStatus.click()
        await this.page.getByRole('option', { name: 'Active', exact: true }).click();
    }
    async selectResetPassword() {
        await this.dropdown_UserResetPassword.click()
        await this.page.getByRole('option', { name: 'No' }).click();
    }


    //User Group pop up
    async clickOnAddLink() {
        await this.link_UserGroupAdd.click()
    }
    async addUserGroup(page) {
        await this.page.getByRole('combobox').click()
        await this.page.getByRole('option', { name: 'Lab Authorizer', exact: true }).getByRole('checkbox').check()       

        
        // const dropdownIcon = page.locator("//div[@data-testid='Group']//svg[@data-testid='ArrowDropDownIcon']");
        // await dropdownIcon.click(); 
        await page.keyboard.press('Escape');
        //await this.page.locator('#menu- > .MuiBackdrop-root').click();
        await this.page.getByTestId('CommonCellmaPopup').getByTestId('Add').click();

          //await page.locator('#menu- > .MuiBackdrop-root').click();
        //await this.page.getByTestId('CommonCellmaPopup').getByTestId('Add').click()
    }

    async addHpDeaultRole()
    {
        await this.page.getByText('Standard, Default').click();
       // await this.userRoles.click();
       // await this.page.getByText('Standard, Default, HP Default').click();
        await this.page.getByRole('option', { name: 'HP Default Appt' }).getByRole('checkbox').check();
        //await this.page.getByRole('option', { name: 'HP Default Appt' }).getByRole('checkbox').check();
        await this.page.locator('#menu- > .MuiBackdrop-root').click();

    }

    //User HP Section
    async toggleContactHidden() {
        await this.toggle_IsContactHiddenNo.click()
        await this.toggle_IsContactHiddenYes.click()
        // await this.toggle_ContactHiddenNo.click()
        // await this.toggle_ContactHiddenYes.click()
    }
    async toggleHPOnDiary() {
        //await this.toggle_HPOnDiaryNo.click()
        await this.toggle_HPOnDiaryYes.click()
    }
    async toggleUserIsHP() 
    {
        //await this.toggle_UserHPNo.click()
        await this.toggle_UserHPYes.click()
    }

    //User As HP Details
    async selectConsultant() {
        await this.dropdown_Consultant.click()
        await this.page.getByRole('option', { name: 'Yes' }).click()
    }
    async enterPROMsSurname(DoctorSurname) {
        await this.txtbox_DoctorSurname.type(DoctorSurname)
    }
    async selectSpecialty(esp_specialty) {
        await this.dropdown_Specialty.click()
        await this.page.getByRole('option', { name: esp_specialty, exact: true }).click()
    }
    async enterFirstValidity(FirstConstValidity) {
        await this.txtbox_FirstConsultationValidity.type(FirstConstValidity)
    }
    async selectShow() {
        await this.dropdown_Show.click()
        await this.page.getByRole('option', { name: 'Show', exact: true }).click()
    }
    async enterConstCode(ConsultantCode) {
        await this.txtbox_ConsultantCode.type(ConsultantCode)
    }
    async enterFollowupValidity(FollowupConstValidity) {
        await this.txtbox_FollowUpConsultationValidity.type(FollowupConstValidity)
    }
    async selectTeams(esp_region_eli_text)
    {
        await this.dropdown_Teams.click()
        await this.page.getByRole('option', { name: esp_region_eli_text, exact: true }).click()
    }
    async selectGenericHP() {
        await this.dropdown_GenericHP.click()
        await this.page.getByRole('option', { name: 'Yes' }).click()
    }
    // async selctTeam() {
    //     await this.dropdown_Team.click()
    //     await this.page.getByRole('option', { name: 'Team 1' }).click()
    // }
    async enterNPINumber(NPINumber) {
        await this.txtbox_NPINumber.type(NPINumber)
    }
    async selectApptEmail() {
        await this.dropdown_SendApptEmail.click()
        await this.page.getByRole('option', { name: 'Yes' }).click()
    }
    async selectPROMsReason() {
        await this.dropdown_PROMsReason.click()
        await this.page.getByRole('option', { name: 'In patient' }).click()
    }
    async selectLocal() {
        await this.dropdown_Local.click()
        await this.page.getByRole('option', { name: 'Local', exact: true }).click()
    }
    async enterInitial(DocInitial) {
        await this.txtbox_Initial.type(DocInitial)
    }
    async selectCommissionLevel(esp_comission_level) {
        await this.dropdown_CommissionLevel.click()
        await this.page.getByRole('option', { name: esp_comission_level }).click()
    }
    async enterPROMsNumber(PROMsNumber) {
        await this.txtbox_PROMsNumber.type(PROMsNumber)
    }
    async selectUserRoles() {
        await this.dropdown_UserRoles.click()
        await this.page.getByRole('option', { name: 'Registration', exact: true }).getByRole('checkbox').check()
        await this.page.getByRole('option', { name: 'Administrator' }).getByRole('checkbox').check()
        await this.page.locator('#menu- > .MuiBackdrop-root').click()
    }
    async clickOnNext(){
        await this.btn_Next.click()
    }
    async clickOnSaveBtn()
    {
        await this.btn_Save.click()
    }


}
module.exports = AddUserWizard