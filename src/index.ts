import express from "express";
import dotenv from "dotenv";
import db from "./models/index";
import users from "./routes/users";
import {errorHandler} from "./utils/errorHandler";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

db.sequelize.sync({}).then(() => {
    console.log("Connected to the Database");
});

app.use(express.json());
app.use("/api/users", users);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});