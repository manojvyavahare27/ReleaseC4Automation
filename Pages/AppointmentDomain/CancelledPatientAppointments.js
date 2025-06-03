const { expect } = require("@playwright/test")

class CancelledPatientAppointments
{
    //const AllLink;
    constructor(page)
    {
        this.page=page
        //Close Pop up
        this.closePopup=page.getByLabel('cancelIcon')
        this.btnback=page.getByLabel('Back Button')
    }
    async clickOnBackButton()
    {
        await this.btnback.click()
    }
}
module.exports=CancelledPatientAppointments
