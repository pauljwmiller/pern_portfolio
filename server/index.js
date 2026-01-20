const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path"); // needed for file paths

//middleware
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, "../client/dist"))); // serves static frontend

//ROUTES
app.post("/items", async(req, res) => {
    try {
        const { description } = req.body;
        const newItem = await pool.query(
            "INSERT INTO project (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newItem.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

// handles client-side routing
app.get("/(.*)", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// dynamic port for deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
});