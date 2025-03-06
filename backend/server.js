const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes"); // Ensure correct path

dotenv.config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.json()); // ✅ Middleware order matters!

// Routes
app.use("/auth", authRoutes); // ✅ Must match frontend request

// Default Route
app.get("/", (req, res) => {
    res.send("HerbMap API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
