const express = require("express");
const cors = require("cors");
const authRoutes = require("./authRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // ✅ This MUST be before routes

app.use("/auth", authRoutes); // ✅ This must match the frontend request

const PORT = process.env.PORT || 10000  ;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
