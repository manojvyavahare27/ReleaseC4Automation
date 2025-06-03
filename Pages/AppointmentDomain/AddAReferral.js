class AddAReferral
{
    constructor(page)
    {
        this.page=page
        this.linkLink=page.getByTestId('Links')
        this.linkAddGP=page.getByRole('heading', { name: 'Add GP' })
        this.btnclosepopup=page.getByRole('button', { name: 'cancelIcon' })
        this.linkPathway=page.getByRole('heading', { name: 'Pathway' })
        this.linkPIP=page.getByRole('heading', { name: 'PIP' })
        this.linkVideo=page.getByRole('heading', { name: 'Video' })
        this.linkWorklist=page.getByRole('heading', { name: 'Worklist' })
    }
    async clickOnLinks()
    {
        await this.linkLink.click()
    }
    async clickOnClosepopup()
    {
        await this.btnclosepopup.click()
    }
    async clickOnAddGPLink()
    {
        await this.linkAddGP.click()
    }
    async clickOnPathwayLink()
    {
        await this.linkPathway.click()
    }
    async clickOnPIPLink()
    {
        await this.linkPIP.click()
    }
    async clickOnVideoLink()
    {
        await this.linkVideo.click()
    }
    async clickOnWorkListLink()
    {
        await this.linkWorklist.click()
    }


}