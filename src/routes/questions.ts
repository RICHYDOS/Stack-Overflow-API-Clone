import express from "express";
import tryCatch from "../middleware/tryCatch";
import {auth} from "../middleware/auth";
import {create, update, getOne, destroy} from "../controllers/questions";

const router = express.Router();

router.use(auth);

router.get("/:id", tryCatch(getOne));

router.post("/ask", tryCatch(create));

router.put("/edit/:id", tryCatch(update));

router.delete("/delete/:id", tryCatch(destroy));


export default router;