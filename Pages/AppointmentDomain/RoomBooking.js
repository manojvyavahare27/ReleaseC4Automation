class RoomBooking{

    constructor(page)
    {
        this.page=page
        this.openDropdown=page.getByLabel('Open')
        this.btnSelect=page.getByTestId('Select')

    }
    async clickOnOpenDropdown()
    {
        await this.openDropdown.click()
        await this.page.getByRole('option', { name: 'Room A' }).click()
    }
    async clickOnSelectButton()
    {
        await this.btnSelect.click()
    }
}
module.exports=RoomBooking