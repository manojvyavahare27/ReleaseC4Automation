class RecommendationsHomepage
{
    // Manoj Vyavahare
    constructor(page)
    {
        this.page=page
        this.txtboxSearchItem=page.getByLabel('Any Search, Item, Code,')
        //Add Recommendations
        this.btnAddRecommendation=page.locator("xpath=//button[@data-testid='Add']")
    }
    async searchRecommendation()
    {
        await this.txtboxSearchItem.click()
       // await this.txtboxSearchItem.waitForSelector({ state: 'editable', timeout: 5000 }); 
       //await this.txtboxSearchItem.waitForSelector({state:'e'}) 
        await this.txtboxSearchItem.fill('Rectoplasty')
        await this.page.getByRole('option', { name: 'Rectoplasty' }).click()

    }
    async clickonAddRecommendationButton()
    {
        await this.btnAddRecommendation.click()
    }
}
module.exports=RecommendationsHomepage
