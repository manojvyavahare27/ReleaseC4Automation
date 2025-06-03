const { chromium } = require('playwright');
const { test, expect, Page }=require('@playwright/test');
const mysql = require('mysql');
const fs = require('fs');


function mysqlQueryFunction(MySqlQuery) {
// MySQL database configuration
const dbConfig = {
   host: "10.0.0.16",
    user: "cellma4_api_user",
    password: "Welcome@123",
    port:3314,
    //database: "cellma4_api",
    database: "cellma4_pre_release",
    connectionLimit: 10
};
//const MySqlQuery = 'SELECT * FROM patients where pat_firstname="Copy" && pat_surname="Riomedtest"';
const sqlQuery = MySqlQuery;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const connection = mysql.createConnection(dbConfig);
  connection.connect();
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      connection.end(); 
      return;
    }
    const jsonData = JSON.stringify(results);
        fs.writeFile('../../Riomed/FebAutomation/TestData/AppointmentDomain/SearchPatientDetailsQueryResult1.json', jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing JSON data to file:', err);
        return;
      }
      console.log('Query results written to query_results.json');
    });
    connection.end();
    browser.close();
  });
});
}
module.exports = { mysqlQueryFunction };
