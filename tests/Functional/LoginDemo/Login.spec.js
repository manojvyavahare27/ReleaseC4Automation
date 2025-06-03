import { test, expect } from '@playwright/test';

import Menu from '../../../Pages/BaseClasses/Menu';


let user_Data = require('../../../ExcelToJSON.json')

test('Register New Patient @Functional @Regression', async ({page}) => {

   // user_Data.forEach(async data => {
      await page.goto('http://10.0.0.64:3000/cellmaUser/login')
            // const menu = new Menu(page)         
            // await menu.clickOnMenubtn()
            // await menu.clickOnLogout()
            // ...
        });

     //});
// })
//});