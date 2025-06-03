import { default as test } from '@playwright/test';
import { chromium } from 'playwright';
 

test('Added for testing', async ({page}) => {
	const browser = await chromium.launch(); 
	page.on('response', async (response) => {
		if (response.url().includes('http://10.0.0.64:8080/cellmaUserAPI/login/display')) {
			const responseBody = await response.text();
			console.log(responseBody);
		}
	}); 	
    try{
	await page.goto('http://10.0.0.64:3000/cellmaUser/login'); 
	const targetUrl = 'http://10.0.0.64:8080/cellmaUserAPI/login/display';
	const response = await page.waitForResponse(response => response.url().includes(targetUrl)); 
	const responseBody = await response.text();
	const jsondata=responseBody.json()
	console.log('Response Body',jsondata); 
	await browser.close();
    }
    catch (err) {
        console.error(err);
    }
})