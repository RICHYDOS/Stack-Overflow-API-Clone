import express from "express";
import tryCatch from "../middleware/tryCatch";
import {auth} from "../middleware/auth";
import {update, getOne, destroy, createComment, getComments} from "../controllers/answers";

const router = express.Router();

router.use(auth);

router.get("/:id", tryCatch(getOne));
router.get("/:id/comments", tryCatch(getComments));
router.post("/:id/comments", tryCatch(createComment));
router.put("/edit/:id", tryCatch(update));
router.delete("/delete/:id", tryCatch(destroy));
export default router;