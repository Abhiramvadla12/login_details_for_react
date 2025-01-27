const mysql2 = require("mysql2");

require('dotenv').config();

const conn = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
conn.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connection to the database established successfully!");
        connection.release(); // Release the connection back to the pool
    }
});

// Export the pool for reuse in other files
module.exports = conn;
