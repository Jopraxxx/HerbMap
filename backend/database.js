const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Define the database path
const dbPath = path.join(__dirname, "data", "users.db");

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log(`Connected to SQLite database at ${dbPath}`);
    }
});

// Create users table with correct schema
db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )`,
    (err) => {
        if (err) {
            console.error("Table creation error:", err.message);
        } else {
            console.log("Users table is ready.");
        }
    }
);

module.exports = db;
