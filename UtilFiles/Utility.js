
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
  module.exports = { locateField };
  
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
 module.exports = { locateFieldById };
  
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
    module.exports = { locateFieldByLabel };