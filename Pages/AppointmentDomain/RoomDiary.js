class RoomDiary
{
    constructor(page)
    {
        this.page=page
        this.bookSlot=page.locator('div:nth-child(25) > div:nth-child(2)')
        this.txtboxDuration=page.getByTestId('Duration (Min)')
        this.txtmeetingreason=page.getByTestId('Reason')
        this.btnSave=page.getByTestId('Save')
        this.linkRoomIsBook=page.getByTestId('roomIsBooked')
        this.btnCancelMeeting=page.getByTestId('Cancel Meeting')

    }
    async clickOnCanceMeeting()
    {
        await this.btnCancelMeeting.click()
    }
    async checkBookingConfirmationLinkClick()
    {
        await this.linkRoomIsBook.click()
    }
    async clickOnSlot()
    {
        await this.bookSlot.click()
    }
    async enterRoomMeetingDuration()
    {
        await this.txtboxDuration.type('15')
    }
    async enterRoomMeetingReason()
    {
        await this.txtmeetingreason.type('For Testing')
    }
    async clicOnSaveButton()
    {
        await this.btnSave.click()
    }

}
module.exports=RoomDiary