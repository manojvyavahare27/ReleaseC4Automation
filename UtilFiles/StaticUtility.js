
 // Sathyanarayan

 
// Click on an element
// async function clickElement(page, elementLocator) {
//   await elementLocator.click();
// }

async function clickElement(page, elementLocator) {
  let element;
  if (typeof elementLocator === 'string') {
      // If elementLocator is a string, assume it's a locator and use page to locate the element
      element = await page.$(elementLocator);
  } else {
      // If elementLocator is already an element, use it directly
      element = elementLocator;
  }
  if (!element) {
      console.error('Element not found with locator:', elementLocator);
      return;
  }
  console.log("Element is : " + element);
  
  await element.click();
}

// Type text into an input field
async function typeText(page, elementLocator, text) {
  await elementLocator.waitFor();
 // const elementText = await elementLocator.textContent();
  // If the element has text content, clear it before typing

    await elementLocator.clear();

  await elementLocator.type(text);
}

// Select item from a dropdown containing a static list
// async function selectFromDropdown(page, dropdownLocator, listItem) {
//   await dropdownLocator.waitFor();
//   await dropdownLocator.click();
//   // Construct the locator for the item based on its name
//   const itemLocator = typeof listItem === 'string' ? `xpath=//li[text()='${listItem}']` : listItem.toString();
//   // Wait for the item locator to appear
//   await page.waitForSelector(itemLocator);
//   await page.click(itemLocator);
// }
// Select item from a dropdown containing a static list
async function selectFromDropdown(page, dropdownLocator, listItem) {
  await dropdownLocator.waitFor();
  await dropdownLocator.click();
 
  // Construct the locator for the item based on its name
  //const itemLocator = typeof listItem === 'string' ? `xpath=//li[text()='${listItem}']` : listItem.toString();
  var itemLocator;
  if(typeof listItem === 'string'){
    if(listItem.includes ("'")){
      itemLocator = `xpath=//li[text()="${listItem}"]`
    }
    else{
      itemLocator =`xpath=//li[text()='${listItem}']`
    }
  }
  else{
    itemLocator=listItem.toString()
  }
 
 
  // Wait for the item locator to appear
  await page.waitForSelector(itemLocator);
  await page.click(itemLocator);
}



module.exports = { clickElement, typeText, selectFromDropdown};
