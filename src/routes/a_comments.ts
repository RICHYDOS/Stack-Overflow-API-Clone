import express from "express";
import tryCatch from "../middleware/tryCatch";
import {auth} from "../middleware/auth";
import {update, getOne, destroy} from "../controllers/a_comments";

const router = express.Router();

router.use(auth);

router.get("/:id", tryCatch(getOne));
router.put("/:id", tryCatch(update));
router.delete("/:id", tryCatch(destroy));
export default router;