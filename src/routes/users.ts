import express from "express";
import dotenv from "dotenv";
import tryCatch from "../utils/tryCatch";
import {register, login, update, destroy} from "../controllers/users";


dotenv.config();
const router = express.Router();

router.post("/register", tryCatch(register));

router.post("/login", tryCatch(login));

router.put("/update/:id", tryCatch(update));

router.delete("/delete/:id", tryCatch(destroy));

export default router;