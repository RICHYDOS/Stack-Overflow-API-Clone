import express from "express";
import dotenv from "dotenv";
import tryCatch from "../middleware/tryCatch";
import { register, login, getOne, update, destroy } from "../controllers/users";


dotenv.config();
const router = express.Router();

router.post("/register", tryCatch(register));
router.post("/login", tryCatch(login));
router.get("/:id", tryCatch(getOne));
router.put("/:id", tryCatch(update));
router.delete("/:id", tryCatch(destroy));

export default router;