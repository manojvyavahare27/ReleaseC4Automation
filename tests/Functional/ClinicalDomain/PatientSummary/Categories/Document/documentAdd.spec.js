import { test, expect } from '@playwright/test';
import path from 'path';

test('File upload test', async ({ page }) => {
  // Navigate to login page and log in
  await page.goto('https://cellma4testing.riomed.com/cellmaUser/login');
  await page.getByTestId('Username').fill('saurabh.auto');
  await page.getByTestId('Password').fill('Dayal@2024');
  await page.getByTestId('Login').click();

  // Navigate to the file upload section (directly if possible)
  await page.getByTestId('homeDashboard').click();
  await page.getByTestId('Patients').nth(1).click();
  await page.getByTestId('Given Name').fill('lata');
  await page.getByTestId('Family Name').fill('more');
  await page.getByTestId('Search').click();
  await page.getByTestId('Select').click();
  await page.getByTestId('Add Contact').click();
  await page.getByTestId('Add Documents').click();
  await page.getByTestId('documentCategory').locator('div').filter({ hasText: 'Document Category *' }).click();
  await page.getByRole('option', { name: 'Investigation' }).click();
  await page.getByTestId('documentSubcategory').locator('div').filter({ hasText: 'Document Subcategory' }).click();
  await page.getByRole('option', { name: 'Blood Report' }).click();
  await page.getByTestId('specialty').locator('div').filter({ hasText: 'Specialty' }).click();
  await page.getByRole('option', { name: 'Cardiology' }).click();
  await page.getByTestId('From').click();
  await page.getByTestId('From').fill('Riomed');
  await page.getByTestId('To').click();
  await page.getByTestId('To').fill('Technologies');
  await page.getByTestId('Sent Date').click();
  await page.getByTestId('Sent Date').fill('01/01/2025');
  await page.getByTestId('Received Date').click();
  await page.getByTestId('Received Date').fill('02/01/2025');
  await page.getByTestId('displayName').locator('div').filter({ hasText: 'Display Name *' }).click();
  await page.getByRole('option', { name: 'Blood Report' }).click();
  await page.getByTestId('Description').click();
  await page.getByTestId('Description').fill('Document uploaded');
  await page.pause()
  const fileInput =  page.getByTestId('Choose File(s)');
  const filePath = '../Daily Playwright execution/AutomationPlaywrite/sampleunsecuredpdf.pdf';        
  await fileInput.setInputFiles(filePath,fileInput);
  await page.getByTestId("Upload").click();

  // Ensure the file input is present before proceeding
//   const fileInput = page.locator('input[type="file"]');
//   const filePath = path.resolve(__dirname, 'sampleunsecuredpdf.pdf'); // Ensure it's an absolute path
//   await fileInput.setInputFiles(filePath);

  // Wait for upload request to be triggered and completed
//   const uploadPromise = page.waitForResponse((response) =>
//     response.url().includes('your-upload-endpoint') && response.status() === 200
//   );

//   console.log('Clicking submit button...');
// await page.pause()
//   await submitButton.click();
//   await uploadPromise;
//   console.log('File upload completed successfully!');

//   // Optionally, check the success message or confirm the upload was completed
//   await page.waitForSelector('text=Upload successful', { timeout: 5000 }).catch(() => {
//     console.log('Upload failed or timed out');
//   });
  // Wait for the upload network response
  // Optionally, you can add further assertions to check the upload was successful
  // For example, check for the uploaded file's appearance in the document list
  // await page.getByText('sampleunsecuredpdf.pdf').toBeVisible();
  //page.on('response', callback)
  // Finish the test
  await page.getByTestId('logout').click();
});