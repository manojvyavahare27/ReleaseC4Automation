class Menu{
    constructor(page)
    {
        this.page=page
        this.menubtn=page.getByTestId('Menu')
        this.linkaddReferral=page.getByText('Add Referral')
        this.linkfindpatient=page.getByText('Find Patient')
        //this.menulogoutbtn=page.getByText('Logout')
        this.logoutButton=page.locator("xpath=//button[@data-testid='logout']")

        
    }
    async clickOnFindPatientlink()
    {
        await this.linkfindpatient.click()
    }
    async clickOnAddReferrallink()
    {
        await this.linkaddReferral.click()
    }
    async clickOnMenubtn()
    {
        await this.menubtn.click()
    }
    // async clickOnLogout()
    // {
    //     await this.logoutButton.click()
    // }

    async  clickOnLogout(page) {
  if (!page) throw new Error('Page is undefined');

  await page.waitForSelector("//button[@aria-label='profileIcon']", { state: 'visible' });
  await page.hover("//button[@aria-label='profileIcon']");
  await page.click('//div[@aria-label="Logout"]'); // Update this if your logout button has a different selector
}

}

module.exports=Menu