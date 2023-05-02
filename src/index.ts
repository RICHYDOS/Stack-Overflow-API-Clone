import express from "express";
import dotenv from "dotenv";
import db from "./models/index";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on Port ${port}`);
    })
    console.log("Connected to the Database");
})


