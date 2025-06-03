class RejectServiceOnReferral
{
    constructor(page)
    {
        this.page=page
        this.linkPatientName=page.getByTestId('B/O LinuxA Riomedtest')
        this.mainlinks=page.getByTestId('Links')
        this.linkCreateServiceOnReferral=page.getByRole('heading', { name: 'Create On Referral' })
        

    }
    async clickOnMainLinks()
    {
        await this.mainlinks.click()
    }
    async clickOnLinkCreateServiceOnReferral()
    {
        await this.linkCreateServiceOnReferral.click()
    }
    async selectPatientName()
    {
        await this.linkPatientName.click()
    }
}
module.exports=RejectServiceOnReferral