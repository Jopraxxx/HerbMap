const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./database");
require("dotenv").config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// Sign Up
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Database error.", error: err.message });
        }
        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        db.run(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            [name, email, hashedPassword],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: "Database insert error.", error: err.message });
                }
                res.json({ message: "User registered successfully!" });
            }
        );
    });
});

// Log In
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error." });
        }

        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: "Login successful!", token, user: { id: user.id, name: user.name, email: user.email } });
    });
});

module.exports = router;
