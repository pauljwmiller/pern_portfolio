const express = require("express");
const app = express(); //runs express libraries
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // gives access to req.body to give us json data

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

app.listen(5000, () => {
    console.log("server has started on port 5000")
});

