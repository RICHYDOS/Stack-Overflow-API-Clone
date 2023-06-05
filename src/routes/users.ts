import express from "express";
import tryCatch from "../middleware/tryCatch";
import { register, login, getOne, update, destroy } from "../controllers/users";

const router = express.Router();

router.post("/register", tryCatch(register));
router.post("/login", tryCatch(login));
router.get("/:id", tryCatch(getOne));
router.put("/:id", tryCatch(update));
router.delete("/:id", tryCatch(destroy));

export default router;