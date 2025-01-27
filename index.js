const express = require("express");
const cors = require("cors");
const fs = require("fs");
const conn = require("./database.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing JSON bodies in requests

// Routes
app.get("/login", (req, res) => {
    conn.query("SELECT * FROM login_details", (err, info) => {
        if (err) {
            console.error("Database Query Error:", err.message);
            return res.status(400).send({
                message: "Failed to retrieve login details",
                error: err.message,
                status: 400
            });
        }

        console.log("Query Result:", info);

        // Write the data to a JSON file
        fs.writeFile("./data.json", JSON.stringify(info, null, 2), (err) => {
            if (err) {
                console.error("File Write Error:", err.message);
                return res.status(500).send({
                    message: "Failed to write data to file",
                    error: err.message,
                    status: 500
                });
            }

            res.status(200).send(info); // Respond with the retrieved data
        });
    });
});

// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).send({
        message: "Route not found",
        status: 404
    });
});

// Start the server
const port = process.env.PORT || 3002; // Use environment variable for port, fallback to 3002
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
