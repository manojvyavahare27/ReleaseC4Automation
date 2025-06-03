class ViewPIP
{
    constructor(page)
    {
        this.page=page
        //this.linkViewPIP=page.getByTestId('View')
       // this.linkViewPIP=page.getByRole('cell', { name: 'View' }).getByTestId('View')
        this.linkViewPIP=page.getByRole('gridcell', { name: 'View' }).getByTestId('View')
        this.btnCloseViewPopup=page.getByTestId('CancelIcon')
        this.btnNextOnViewPIP=page.getByTestId('Next')
        this.txtboxSearchPIP=page.getByTestId('Search')
    }
    async EnterPIPInSearch(name)
    {
        await this.txtboxSearchPIP.type(name)
    }
    async clickOnNextbntViewPIP()
    {
        await this.btnNextOnViewPIP.click()
    }
    async clickOnCloseViewPopup()
    {
        await this.btnCloseViewPopup.click()
    }
    async clickOnViewPIPLink()
    {
        await this.linkViewPIP.click()
    }
}
module.exports=ViewPIP