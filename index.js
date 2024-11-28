const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { clientDatabase } = require("./config/database");

const app = express();
const port = process.env.PORT || 5000;

clientDatabase()

app.use(cors());
app.use(express.json());

// Import route files
const userRoutes = require("./routes/users");


// =====================================================================
// Users
app.use("/users", userRoutes);


// Default route for server status
app.get("/", (req, res) => {
    res.send("Hekto Com Server Is Running!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port is ${port}`);
});
