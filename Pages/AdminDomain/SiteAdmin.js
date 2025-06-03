class SiteAdmin
{
    constructor(page)
    {
        this.page=page
        this.sideBarTabConfiguration=page.getByTestId('Configuration')
        this.sideBarLinkRooms=page.getByTestId('Rooms')
        this.sideBarClinicRooms=page.getByTestId('Clinics')
        this.sidebarLinkList=page.getByTestId('List')
        

    }
    async clickOnList()
    {
        await this.sidebarLinkList.click()
    }
    
    async clickOnSidebarLinkClinics()
    {
        await this.sideBarClinicRooms.click()
    } 
    async clickOnConfigurationTab()
    {
        await this.sideBarTabConfiguration.click()
    }
    async clickOnSidebarLinkRooms()
    {
        await this.sideBarLinkRooms.click()
    }
}
module.exports=SiteAdmin