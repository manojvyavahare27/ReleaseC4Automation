//Sathyanarayan


const { log } = require('console');
const { clickElement, typeText, selectFromDropdown} = require('./StaticUtility');

async function locateField(page, selector) {
    try {      
      await page.waitForSelector(selector);        
      const field = await page.$(selector);  
      return field;
    } catch (error) {
      console.error(`Error locating field with selector "${selector}": ${error.message}`);
      throw error;
    }
  }  
  
  async function locateFieldById(page, id) {
      const selector = `#${id}`;      
      try {
       await page.waitForSelector(selector);         
        const field = await page.$(selector);           
        return field;
      } catch (error) {
        console.error(`Error locating field with ID "${id}": ${error.message}`);
        throw error;
      }
    }  
  
    async function locateFieldByLabel(page, label) {
      try {        
        const labelElement = await page.$(`text=${label}`);    
        if (!labelElement) {
          throw new Error(`Label "${label}" not found.`);
        }
        const forAttribute = await labelElement.getAttribute('for');    
        if (!forAttribute) {
          throw new Error(`No "for" attribute found on label "${label}".`);
        }
        const field = await page.$(`#${forAttribute}`);    
        if (!field) {
          throw new Error(`Input field associated with label "${label}" not found.`);
        }    
        return field;
      } catch (error) {
        console.error(`Error locating field by label "${label}": ${error.message}`);
        throw error;
      }
    }  

    // Select item from a dropdown containing a dynamic list
  // async function selectFromSearchResults(page, searchLocator, listItem, addItemLocator=null) {
  //   await searchLocator.waitFor();
  //   await searchLocator.fill(listItem);
  
  //   // Construct the locator for the item based on its role and name
  //   const itemLocator = await page.getByRole('option', { name: `${listItem}` });
  
  //   //const itemLocator = await page.getByRole('option', { name: 'Sleep walking disorder' })
      
  //   // Wait for the item locator to appear
  //   await itemLocator.waitFor({ state: 'visible' });
  //   await itemLocator.click();
  
  //   if (addItemLocator) {
  //     if(typeof addItemLocator === 'string'){
  //       console.log("Waiting for addItemLocator...");
  //       await page.waitForSelector(addItemLocator, { state: 'visible', timeout: 5000 });
  //       console.log("addItemLocator found, clicking...");
  //       await page.click(addItemLocator);
  //     }
  //     else {
  //       await page.waitForTimeout(1000);
  //       addItemLocator.click();
  //     }
  //   } else {
  //       console.log("addItemLocator is not provided.");
  //   }
  // }
  
  async function selectFromSearchResults(page, searchLocator, listItem, addItemLocator=null) {
    try {
        console.log("Waiting for searchLocator...");
        await searchLocator.waitFor();
        console.log("Filling searchLocator with:", listItem);
        await searchLocator.fill(listItem);
      
        // Construct the locator for the item based on its role and name
        console.log("Waiting for itemLocator...");
        const itemLocator = await page.getByRole('option', { name: `${listItem}` });
        console.log("Found itemLocator:", itemLocator);
        
        // Wait for the item locator to appear
        console.log("Waiting for itemLocator to be visible...");
        await itemLocator.waitFor({ state: 'visible' });
        console.log("itemLocator is visible, clicking...");
        await itemLocator.click();
      
        if (addItemLocator) {
          if(typeof addItemLocator === 'string'){
            console.log("Waiting for addItemLocator...");
            await page.waitForSelector(addItemLocator, { state: 'visible', timeout: 5000 });
            console.log("addItemLocator found, clicking...");
            await page.click(addItemLocator);
          }
          else {
            await page.waitForTimeout(1000);
            addItemLocator.click();
          }
        } else {
            console.log("addItemLocator is not provided.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

  async function toggleDivVisibility(page, expandButtonLocator, hideButtonLocator) {
    const isDivVisible = await page.isVisible(expandButtonLocator);
    if (isDivVisible) {
        await clickElement(page, page.locator(expandButtonLocator)); // Click to expand the div
    } else {
        await clickElement(page, page.locator(hideButtonLocator)); // Click to hide the div
    }
  }


  


  async function selectRadioButton(page, radioGroupName) {
    //var radioButtonSelector;
   // const elementHandles = await page.$$(`//div[@class="MuiGrid-root MuiGrid-container css-1d3bbye"]//input[@value="${radioGroupName}"]`);
   const elementHandles = await page.$$(`//input[@value="${radioGroupName}"]`);
    await page.waitForTimeout(1000)
    // for(var i=0; i<elementHandles.length; i++){
    //   console.log(elementHandles[i]);
    // }
    await elementHandles[0].click();
    // else
    // {
    //   const handle = page.locator(xpath=`//div[@class="MuiGrid-root MuiGrid-container css-1d3bbye"]//input[@value="${radioGroupName}"]`);
    //   await clickElement(page, handle);
    // }
        
  //   if(identifier.toLowerCase()==='class'){
  //     await page.waitForTimeout(1000)
  //     //const elementHandles = await page.$$(`//div[@class="MuiGrid-root MuiGrid-container css-1d3bbye"]//span[text()="${radioGroupName}"]/preceding-sibling::span`);
  //   await elementHandles[0].click();
  // }
  // else if(identifier.toLowerCase()=== 'licencecategory'){
  //   await page.waitForTimeout(1000)
  //   await elementHandles[0].click();
  // }


    // Check if the radio button exists
    //const radioButtonExists = await page.$(radioButtonSelector);
    if (!elementHandles) {
        throw new Error(`Radio button with value "${value}" not found in the group "${radioGroupName}"`);
    }
    // Click the radio button
    //await clickElement(page, page.locator(elementHandles))
    
}



  // Dynamic methods 
  async function showClinicalItemByStatus(page, tabText) {
   // const locator = `xpath=//button[@class='MuiTabs-flexContainer css-k008qs']//button[contains(text(), '${tabText}')]`;
   const locator = `xpath=//button[contains(text(), '${tabText}')]`;
    try {
      await page.waitForSelector(locator);
      const elementHandle = await page.$(locator);
      if (elementHandle) {
          await elementHandle.click();
      } else {
          console.error(`Element with locator "${locator}" not found.`);
      }
  } catch (error) {
      console.error(`Error clicking on element with locator "${locator}": ${error.message}`);
  }
  }
  
  async function showExtraDetailLevel(page, levelText) {
    const locator = `xpath=//div[@aria-label='levelExtraDetails']//button[@data-testid='${levelText}']`;
    try {
      await page.waitForSelector(locator);
      const elementHandle = await page.$(locator);
      if (elementHandle) {
          await elementHandle.click();
      } else {
          console.error(`Element with locator "${locator}" not found.`);
      }
  } catch (error) {
      console.error(`Error clicking on element with locator "${locator}": ${error.message}`);
  }
  }
  
  //This function can be used to create dynamic locators
  // async function replaceLocatorElements(locator, elements) {
  //   let modifiedLocator = locator;
  //   elements.forEach(element => {
  //       const [key, value] = element.split('=');
  //       modifiedLocator = modifiedLocator.replace(new RegExp(`\\b${key}\\b`, 'g'), `'${value}'`);
  //   });
  //   return modifiedLocator;
// }


//Select from dropdown
async function getDropdownLocator(Question) {
  // Construct dynamic XPath using the provided subCategory
  const xpath = `//input[@id='${Question}']`;

  // Return the locator for the dropdown input
  return page.locator(xpath);
}


async function replaceLocator(locatorString, placeholderValues) {
  let updatedLocator = locatorString;
  for (const [placeholder, value] of Object.entries(placeholderValues)) {
      updatedLocator = updatedLocator.replace(new RegExp(`\\b${placeholder}\\b`, 'g'), value);
  }
  return updatedLocator;
}

async function assertElementExists(page, elementLocator, elementLabel) {
  try {
    console.log("Executing assertElementExists function...");

    // Check if the element exists
    const elementExists = await page.isVisible(elementLocator);

    // Log the result
    if (elementExists) {
        console.log(`${elementLabel} is present.`);
    } else {
        console.log(`${elementLabel} is not present.`);
    }

    console.log("assertElementExists function executed successfully.");
    return elementExists;
} catch (error) {
    console.error("Error occurred during assertElementExists:", error);
    throw error;
}
}


async function assertElementHasLabel(page, elementLocator, elementLabel=null) {
  const element = await page.$(elementLocator);
  if (!element) {
    throw new Error(`Element with locator ${elementLocator} not found.`);
  }
  const labelText = await page.textContent(elementLocator);
  if (!labelText) {
    throw new Error(`No text found for element with locator ${elementLocator}.`);
  }
  if (labelText.trim() !== elementLabel.trim()) {
    throw new Error(`Expected label '${elementLabel}', but found '${labelText}'.`);
  }
  console.log(`Element with label '${elementLabel}' found.`);
}


  // async function clickHistoryTableIconsUsingItemName(page, itemName, ariaLabel, historyPage = null) {
  //   const locator = `//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='${itemName}']//../..//button[@aria-label='${ariaLabel}']`;
  //   try {
  //     await page.waitForSelector(locator);
  //     const elementHandles = await page.$$(locator);
  //     if (elementHandles.length > 0) {
  //       for (let i = historyPage ? 1 : 0; i < elementHandles.length; i++) {
          
  //         await elementHandles[i].click();
  //         await page.waitForTimeout(200);
  //       }
  //     } else {
  //       console.error(`No elements found with locator "${locator}"`);
  //     }
  //   } catch (error) {
  //     console.error(`Error clicking on elements with locator "${locator}": ${error.message}`);
  //   }
  // }

  async function clickHistoryTableIconsUsingItemName(page, itemName, ariaLabel, historyPage = null) {
    let locator = "";
    if(historyPage === null){
      locator = `//div[@id='historyTable']//*[text()='${itemName}']//../..//button[@aria-label='${ariaLabel}']`; //History Table
      console.log("If loop");
      
    }
    else{
      locator = `//div[@data-testid='CommonCellmaPopup']//*[text()='${itemName}']//../..//button[@aria-label='${ariaLabel}']`; ////History Popup
      console.log("Else loop");
      
    }
    console.log("Locator is: "+ locator);
    

    try {
      await page.waitForTimeout(1000)
        await page.waitForSelector(locator);
	      if(historyPage === null)
        {	
          const elementHandle = await page.$(locator);
          await elementHandle.click()	
        }
        else
        {
              let pageNumber = 1;
              let flag = true
              while (flag) {
                  // Wait for elements to load
                  await page.waitForTimeout(1000);
                  const elementHandles = await page.$$(locator);
                  if (elementHandles.length > 0) 
                   {
                    // If not on history page, loop through elements and click each one
                          for (let i = 0; i < Math.min(elementHandles.length, 10); i++) {
                              await elementHandles[i].click();
                              await page.waitForTimeout(200);
                          }
                      const nextPageButtonLocator = `//button[@aria-label='Go to page ${pageNumber + 1}']`;
                      const nextPageButton = await page.$(nextPageButtonLocator);
                      if (nextPageButton) {
                          await nextPageButton.click();
                          pageNumber++;
                      } 
                      else {
                        flag = false;
                          break;
                      }
                  } 
                  else {
                    console.error(`No elements found with locator "${locator}"`);
                     break;
                  }
          }
        }
    } catch (error) {
        console.error(`Error clicking on elements with locator "${locator}": ${error.message}`);
    }
}

async function clickOnRemoveQuestion(page, itemName) {
  let locator = "";
  
    locator = `//div[@id="favourite"]//button[@aria-label='${itemName}']`; ////History Popup

  try {
      await page.waitForSelector(locator);
      if(historyPage === null)
      {	
        const elementHandle = await page.$(locator);
        await elementHandle.click()	
      }      
  } catch (error) {
      console.error(`Error clicking on elements with locator "${locator}": ${error.message}`);
  }
}


async function clickOnRemoveCustomizableQuestion(page, itemName) {
  let locator = "";
  
    //locator = `//div[@id="favourite"]//button[@aria-label='${itemName}']`; ////History Popup
    locator = `//div[@class="MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-grid-xs-3 css-1jjp2xs"]//label[text()='${itemName}']/parent::div/..//preceding-sibling::div/preceding-sibling::div//button`; ////History Popup

  try {
      await page.waitForSelector(locator);
      // if(historyPage === null)
      // {	
        const elementHandle = await page.$(locator);
        await elementHandle.click()	
     // }      
  } catch (error) {
      console.error(`Error clicking on elements with locator "${locator}": ${error.message}`);
  }
}

async function clickOnFitnessRadioButton(page, itemName, mcstatus) {
  let locator = "";
  
    //locator = `//div[@id="favourite"]//button[@aria-label='${itemName}']`; ////History Popup
    locator = `//h1[contains(text(),'${itemName}')]/../..//input[@name='${mcstatus}']`; 

  try {
      await page.waitForSelector(locator);
      // if(historyPage === null)
      // {	
        const elementHandle = await page.$(locator);
       // console.log("Element is:"elementHandle);        
        //console.log("Clicking now");
        
        await elementHandle.click()	
      //}      
  } catch (error) {
      console.error(`Error clicking on elements with locator "${locator}": ${error.message}`);
  }
}


async function clickOnRestoreCustomizableQuestion(page, itemName) {
  let locator = "";
  
    //locator = `//div[@id="favourite"]//button[@aria-label='${itemName}']`; ////History Popup
    locator = `//div[@class="MuiFormControl-root css-1cq7mj3"]//label[text()='${itemName}']/../..//*[name()='svg']`

  try {
      await page.waitForSelector(locator);
      // if(historyPage === null)
      // {	
        const elementHandle = await page.$(locator);
        await elementHandle.click()	
     // }      
  } catch (error) {
      console.error(`Error clicking on elements with locator "${locator}": ${error.message}`);
  }
}

async function clickMCHistoryTableIconsUsingItemName(page, itemName, ariaLabel, historyPage = null) {
  let locator = "";  
 // await page.pause()
  console.log("Going correct.........");
  
  if(historyPage === null){

    locator = `//div[@id='HistoryFilterTabpanel-0']//*[contains(text(),'${itemName}')]//../..//button[@aria-label='${ariaLabel}']`;
               //div[@id="HistoryFilterTabpanel-0"]//*[contains(text(),'Class 1 Pilots')]//../..//button[@aria-label='edit']       
               console.log("My If Locator is: "+ locator);               
  }
  else{
    locator = `//div[@id='HistoryFilterTabpanel-0']//*[contains(text(),'${itemName}')]//../..//button[@aria-label='${ariaLabel}']`; ////History Popup
    console.log("My else Locator is: "+ locator);
  }

  try {
      await page.waitForSelector(locator);
      if(historyPage === null)
      {	
        const elementHandle = await page.$(locator);
        await page.waitForTimeout(1000)       
        await elementHandle.click()	
      }
      else
      {
            let pageNumber = 1;
            let flag = true
            while (flag) {
                // Wait for elements to load
                await page.waitForTimeout(1000);
                const elementHandles = await page.$$(locator);
                console.log("Element Handles are: "+  elementHandles);
                if (elementHandles.length > 0) 
                 {
                  // If not on history page, loop through elements and click each one
                        for (let i = 0; i < Math.min(elementHandles.length, 10); i++) {
                            await elementHandles[i].click();                         
                            
                            await page.waitForTimeout(200);
                        }
                    const nextPageButtonLocator = `//button[@aria-label='Go to page ${pageNumber + 1}']`;
                    const nextPageButton = await page.$(nextPageButtonLocator);
                    if (nextPageButton) {
                        await nextPageButton.click();
                        pageNumber++;
                    } 
                    else {
                      flag = false;
                        break;
                    }
                } 
                else {
                  console.error(`No elements found with locator "${locator}"`);
                   break;
                }
        }
      }
  } catch (error) {
      console.error(`Error clicking on elements with locator "${locator}": ${error.message}`);
  }
}




  
  
  module.exports = { 
    locateField, 
    locateFieldById, 
    locateFieldByLabel, 
    selectFromSearchResults, 
    toggleDivVisibility, 
    clickOnRemoveCustomizableQuestion,
    clickMCHistoryTableIconsUsingItemName,
    clickOnRestoreCustomizableQuestion,
    showClinicalItemByStatus, 
    showExtraDetailLevel, 
    clickHistoryTableIconsUsingItemName, 
    replaceLocator,
    assertElementHasLabel,
    assertElementExists,
    selectRadioButton,
    clickOnFitnessRadioButton,
    getDropdownLocator
};