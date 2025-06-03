// Create By: Manoj V
// Date: 22/05/2023


class UserSearch
{
    constructor(page)
    {
        this.page=page
        this.txtbox_userSearch=page.getByTestId('Username')
        this.txtbox_givenName=page.getByTestId('Given Name')
        this.txtbox_familyName=page.getByTestId('Family Name')
        this.dropdown_userStatus=page.getByLabel('User Status')
        this.dropdown_userService=page.getByTestId('useCliId').getByLabel('User\'s Service')
        //getByTestId('useCliId').getByLabel('User\'s Service')
       // this.btn_Search=page.getByTestId('Search')
        this.btn_Search=page.locator("xpath=//button[@aria-label='Search']")
       
        this.btn_AddUser=page.getByTestId('Add User')
        this.linkLink=page.getByTestId('Links')
        this.link_AddMPIUser=page.getByRole('heading', { name: 'Add MPI Users' })
        this.link_Refresh=page.getByRole('heading', { name: 'Refresh' })
        this.link_ServiceDetails=page.getByRole('heading', { name: 'Service Details' })
        this.linkServiceHPDefaultApp=page.getByRole('heading', { name: 'Service HP Default Appointment' })
        this.link_MedicalCategoryDisplayedname=page.getByRole('heading', { name: 'Medical Category Display Names Linking' })
        this.btnCancel=page.getByTestId('CancelIcon')
        //this.btnEditUser=page.getByRole('row', { name: 'Test1.user Auto Riomedtest Cardiology Consultant No Reset edit', exact: true }).getByRole('button', { name: 'edit' })
        this.btnEditUser=page.getByRole('button', { name: 'edit' })

        //User List records
        //this.linkView=page.locator("xpath=//button[normalize-space()='View']")
        this.linkView=page.getByTestId('View')
      //  this.linkResetPassword=page.locator("xpath=//button[normalize-space()='Reset']")
      this.linkResetPassword=page.getByTestId('Reset')
        this.txtboxConfirmNewPassword=page.locator("xpath=//input[@id='New Password']")
        this.txtboxConfirmPassword=page.locator("xpath=//input[@id='Confirm Password']")  
        this.btnSavePassword=page.getByTestId('Save')  


        //Sidebar Locators
        //User Management
        this.sidebarlinkSearchUser=page.getByRole('button', { name: 'Search User' })
        this.sidebarlinkUserGroups=page.getByRole('button', { name: 'User Groups', exact: true })
        this.sidebarlinkUserGroupGrouping=page.getByRole('button', { name: 'User Groups Groupings' })
        this.sidebarlinkServiceGroup=page.getByRole('button', { name: 'Service Groups' })
        this.sidebarUserMonitoring=page.getByRole('button', { name: 'User Monitoring' })
        this.sidebarTrainingPortal=page.getByRole('button', { name: 'Training Portal User' })

        //setUp
        this.sidebarSetUpLink=page.getByRole('button', { name: 'Setup Image Avatar Set-up' })
        this.sidebarListLink=page.getByRole('button', { name: 'List' })
        this.btncancelPopup=page.getByTestId('CancelIcon')




    }
    //View link
    async clickOnViewLink()
    {
        await this.linkView.click()
    }
    async clickOnResetLink()
    {
        await this.linkResetPassword.click()
    }
    async enterInvConfirmNewPassword(InvNewPassword)
    {
        await this.txtboxConfirmNewPassword.type(InvNewPassword)
    }
    async enterInvConfirmPassword(InvConfirmPassword)
    {
        await this.txtboxConfirmPassword.type(InvConfirmPassword)
    }

    async enterConfirmNewPassword(ConfirmNewPassword)
    {
        await this.txtboxConfirmNewPassword.fill('')
        await this.txtboxConfirmNewPassword.type(ConfirmNewPassword)
    }
    async enterConfirmPassword(ConfirmConfirmPassword)
    {
        await this.txtboxConfirmPassword.fill('')
        await this.txtboxConfirmPassword.type(ConfirmConfirmPassword)
    }

    async clickOnSavePasswordBtn()
    {
        await this.btnSavePassword.click()
    }
    //Sidebar Functions
    async clickOnListLink()
    {
        await this.sidebarListLink.click()
    }
    async clickOnSetUpTab()
    {
        await this.sidebarSetUpLink.click()
    }
    async clickOnTrainingPortal()
    {
        await this.sidebarTrainingPortal.click()
    }
    async clickOnUserMonitoring()
    {
        await this.sidebarUserMonitoring.click()
    }
    async clickOnServiceGroup()
    {
        await this.sidebarlinkServiceGroup.click()
    }
    async clickOnCancelPopup()
    {
        await this.btnCancel.click()
    }
    async clickOnUserGroupGroupinglink()
    {
        await this.sidebarlinkUserGroupGrouping.click()
    }
    async clickOnUserGroupLink()
    {
        await this.sidebarlinkUserGroups.click()
    }
    async clickOnSearchUserLink()
    {
        await this.sidebarlinkSearchUser.click()
    }


    //User Functionality
    async clickOnEditUser()
    {
        await this.btnEditUser.click()
    }
    async clickOnCancelbutton()
    {
        await this.btnCancel.click()
    }
    async clickOnServiceDetailsLink()
    {
        await this.link_ServiceDetails.click()
    }
    async clickOnServiceHpDefaultApp()
    {
        await this.linkServiceHPDefaultApp.click()
    }
    async clickOnMedicalcategoryDisplayedNameLinking()
    {
        await this.link_MedicalCategoryDisplayedname.click()
    }
    async clickOnRefreshlink()
    {
        await this.link_Refresh.click()
    }
    async clickOnAddMPIUserLink()
    {
        await this.link_AddMPIUser.click()
    }

    async clickOnLinkLinks()
    {
        await this.linkLink.click()
    }
    async clickOnAddUser()
    {
        await this.btn_AddUser.click()
    }
    async clickOnSearchButton()
    {
        await this.btn_Search.click()
    }
    async selectUserService()
    {
        await this.dropdown_userService.click()
        await this.page.getByRole('option', { name: 'General Medicine Automation' }).click()
    }

    async enterUserSearch(name)
    {
        await this.txtbox_userSearch.fill('')
        await this.txtbox_userSearch.type(name)
    }
    async enterFamilyName(name)
    {
        await this.txtbox_familyName.type(name)
    }
    async enterGivenName(name)
    {
        await this.txtbox_givenName.type(name)
    }
    async selectUserStatus()
    {
       //const dropdownSelector = 'getByLabel("User Status")'; // Replace with your own selector
       await this.dropdown_userStatus.click()
       await this.page.getByRole('option', { name: 'Active', exact: true }).click()
        //const optionValue = 'Inactive';

       // await this.dropdown_userStatus.click()
    //   await page.click(dropdownSelector);
    //     await page.selectOption(dropdownSelector,optionValue);
        //await this.dropdown_userStatus.selectOption('option', {aria-activedescendant:'User Status-option-2'})
       
    }

}

module.exports=UserSearch