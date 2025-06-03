const { expect } = require("@playwright/test")

class ServiceAppointment
{
    //const AllLink;
    constructor(page)
    {
        this.page=page
        this.btnBack=page.getByLabel('Back Button')

        //AllLinks        
        this.allLinks=page.getByTestId('Links')
        this.linkAppReminder=page.getByRole('heading', { name: 'Appointment Reminders' })
        this.linkBookAppointment=page.getByRole('heading', { name: 'Book Appointment' })
        this.linkDeitetics=page.getByRole('heading', { name: 'Dietetics' })
        this.linkFinance=page.getByRole('heading', { name: 'Finance' })
        this.linkInfusion=page.getByRole('heading', { name: 'Infusions' })
        this.linkPatientAdd=page.getByRole('heading', { name: 'Patient Add' })
        this.linkRefresh=page.getByRole('heading', { name: 'Refresh' })
        this.linkRoomManagement=page.getByRole('heading', { name: 'Room Management' })
        this.linkRooms=page.getByRole('heading', { name: 'Rooms' })
        this.linkService=page.getByTestId('service').getByRole('heading', { name: 'Service' })
        this.linkServiceAppointment=page.getByTestId('serviceAppointments').getByRole('heading', { name: 'Service Appointments' })
        this.linkServiceAppointmentAvailability=page.getByRole('heading', { name: 'Service Appointments Availability' })
        this.linkSummary=page.getByRole('heading', { name: 'Summary' })
        this.linkWorkList=page.getByRole('heading', { name: 'Worklists' })

        this.linkRoomBooking=page.locator("xpath=//h1[normalize-space()='Room Bookings']")
        this.linkProvisionalAppointment=page.getByRole('button', { name: 'Provisional Appointments' })
        this.btnSearch=page.getByTestId('Search')
        this.txtStartDate=page.getByTestId('Start Date').getByPlaceholder('dd/mm/yyyy')
        this.txtEndDate=page.getByTestId('End Date').getByPlaceholder('dd/mm/yyyy')
        this.linkAppType=page.getByRole('cell', { name: 'Type' }).getByTestId('Type')
        //this.linkAppType=page.getByRole('button', { name: 'New' })  
        this.dropdownAppTypePopup=page.getByTestId('appointmentType').getByLabel('Open')
        this.btnChangeAppTypePopup=page.getByTestId('Change')
        this.linkLocation=page.getByRole('button', { name: 'Cath Lab Location' })

        
    }
    async clickOnChangeButton()
    {
        await this.btnChangeAppTypePopup.click(0)
    }

    async clickOnNewAppTypeLink()
    {
        await this.dropdownAppTypePopup.click()
        await this.page.getByRole('option', { name: 'Emergency' }).click()

    }
    async clickOnEmergencyAppTypeLink()
    {
        await this.dropdownAppTypePopup.click()
        await this.page.getByRole('option', { name: 'New', exact: true }).click()

    }
    async clickOnAppTypeLink()
    {
        await this.linkAppType.click()
    }
    async enterStartDate(startdate)
    {
        await this.txtStartDate.type(startdate)
    }
    async enterEndDate(enddate)
    {
        await this.txtEndDate.type(enddate)
    }
    

    async clickOnSeachButton()
    {
        await this.btnSearch.click()
    }

    async clickOnProvisionalAppLink()
    {
        await this.linkProvisionalAppointment.click()
    }

    async clickOnRoomBookingLink()
    {
        await this.linkRoomBooking.click()
    }
async clicOnBackButton()
{
    await this.btnBack.click()
}
}
module.exports=ServiceAppointment