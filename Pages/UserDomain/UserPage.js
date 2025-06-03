class UserPage{
    constructor(page)
    {
        this.page=page
        this.txtbox_Username=page.locator("xpath=//input[@id='Username']")
        this.dropdown_User=page.getByLabel('User Status')
        this.dropdown_User_value=page.getByRole('option', { name: 'Active', exact: true })
    }
    async enterUserName()
    {
        await this.txtbox_Username.type("manoj.tester")
    }
    async selectUserStatus()
    {
        await this.dropdown_User.click()
        await this.dropdown_User_value.click()
    }
}
module.exports=UserPage