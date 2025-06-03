// db.js
import { createConnection } from 'mysql';
//require('dotenv').config();


function connectToDatabase() {
  const connection = createConnection({
    host: "10.0.0.64",
    user: "cellma4_api_user",
    password: "C31lm@2023",
    port:3314,
    database: "cellma4_api",
    //connectionLimit: 10
  });

  connection.connect(err => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  return connection;
}

function executeQuery(query) {
  console.log('Added for testing');
  return new Promise((resolve, reject) => {
    const connection = connectToDatabase();
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
}

export default { connectToDatabase, executeQuery };
