// fetchDataAndStoreAsJSON.js
const fs = require('fs');
const { executeQuery } = require('./rdb');

async function fetchDataAndStoreAsJSON() {
  try {
    const query = 'SELECT * FROM patients where pat_firstname="meher"';
    const results = await executeQuery(query);

    // Process data as needed
    const processedData = results.map(result => ({
      id: result.id,
      name: result.name,
      // Add other fields as needed
    }));

    // Write data to JSON file
    fs.writeFileSync('data1.json', JSON.stringify(processedData, null, 2));
    console.log('Data stored in data.json successfully');
  } catch (error) {
    console.error('Error fetching data and storing as JSON:', error);
  }
}

fetchDataAndStoreAsJSON();
