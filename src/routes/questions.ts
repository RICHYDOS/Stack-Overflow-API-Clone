// import express from "express";
// import tryCatch from "../middleware/tryCatch";
// import {auth} from "../middleware/auth";
// import {create, update, getOne, destroy, createAnswer, getAnswers, upVote, downVote, createComment, getComments} from "../controllers/questions";

// const router = express.Router();

// router.use(auth);

// router.get("/:id", tryCatch(getOne));
// router.get("/:id/answers", tryCatch(getAnswers));
// router.get("/:id/comments", tryCatch(getComments));
// router.post("/ask", tryCatch(create));
// router.post("/:id/answers", tryCatch(createAnswer));
// router.post("/:id/comments", tryCatch(createComment));
// router.put("/:id/upvote", tryCatch(upVote));
// router.put("/:id/downvote", tryCatch(downVote));
// router.put("/:id", tryCatch(update));
// router.delete("/:id", tryCatch(destroy));
// export default router;
