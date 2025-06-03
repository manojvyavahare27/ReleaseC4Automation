const fs = require('fs');
const XLSX = require('xlsx');
const path = 'C:/Riomed/Cellma4Automation'

import { test, expect, Page, chromium } from '@playwright/test';
const { mysqlQueryFunction } = require('../../../db');

const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/ExcelToJSON.json")))


test('Register New Patient @Functional @Regression', async ({ }) => {
const jsonData = JSON.parse(JSON.stringify(require("../../../TestDataWithJSON/ExcelToJSON.json")))

  const mysql = require('mysql');
  const fs = require('fs');
  //jsonData.SearchPatient
  //const MySqlQuery = 'SELECT * FROM patients where pat_firstname="AutomationB" && pat_surname="Riomedtest"';
  const MySqlQuery = "SELECT * FROM patients where ${jsonData.SearchPatient.pat_firstname}";

  const result = mysqlQueryFunction(MySqlQuery);
  console.log(result);  

});