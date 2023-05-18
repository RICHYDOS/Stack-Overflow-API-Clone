import express from "express";
import tryCatch from "../middleware/tryCatch";
import {auth} from "../middleware/auth";
import {update, getOne, destroy, getAnswers} from "../controllers/questions";

const router = express.Router();

router.use(auth);

router.get("/:id", tryCatch(getOne));
router.put("/edit/:id", tryCatch(update));
router.delete("/delete/:id", tryCatch(destroy));
router.get("/:id/answers", tryCatch(getAnswers));
export default router;