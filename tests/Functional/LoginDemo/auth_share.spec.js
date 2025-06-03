const { test, expect } = require('@playwright/test')
import Homepage from '../../../Pages/BaseClasses/Homepage';
import Menu from '../../../Pages/BaseClasses/Menu';
import PatientSearch from '../../../Pages/PatientDomain/PatientSearch';




test.describe('Login to cellma', () => {

const patientdetailsdata = JSON.parse(JSON.stringify(require("../../../TestData/PatientDomain/PatientDetails.json")))

    test('User Cellma', async ({browser}) => {
        const context = await browser.newContext({
                storageState: "./auth.json"       })
         const page = await context.newPage()
        const homepage = new Homepage(page)
        const menu = new Menu(page)
        const patientsearch = new PatientSearch(page)

        
        await page.goto('http://10.0.0.64:3000/cellmaUser/home')
       // await menu.clickOnMenubtn()        
        //await menu.clickOnFindPatientlink()  
        await homepage.clickOnPatientIcon()     
        await page.pause()
        await patientsearch.enterGivenName(patientdetailsdata.pat_firstname)
        await patientsearch.enterFamilyName(patientdetailsdata.New_FamilyName)
        await patientsearch.selectSex(patientdetailsdata.SexM)
        await patientsearch.clickOnSearchButton() 
        await page.pause()
        //await menu.clickOnLogout()
    })
})