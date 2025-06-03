const mysql = require('mysql2');
const fs = require('fs');

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

module.exports = {
    executeQuery: (query, sqlFilePath) => {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection(dbConfig);

            connection.connect((err) => {
                if (err) {
                    reject(err);
                    return;
                }

                connection.query(query, (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    // Identify date columns dynamically
                    const formattedResults = results.map(row => {
                        const formattedRow = {};
                        for (const [key, value] of Object.entries(row)) {
                            if (value instanceof Date) {
                                formattedRow[key] = formatDate(value);
                            } else {
                                formattedRow[key] = value;
                            }
                        }
                        return formattedRow;
                    });

                    // Write results to JSON file
                    const jsonData = JSON.stringify(formattedResults, null, 2);
                    const fileName = sqlFilePath;

                    fs.writeFile(fileName, jsonData, (err) => {
                        if (err) {
                            console.error('Error writing JSON to file:', err);
                            reject(err);
                        } else {
                            console.log('Successfully stored results into JSON:', fileName);
                            connection.end();
                            console.log('The JSON data is as below', jsonData);
                            resolve(results);
                        }
                    });
                });
            });
        });
    }
};

// Custom date formatting function
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
