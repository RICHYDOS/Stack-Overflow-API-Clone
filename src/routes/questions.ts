import express from 'express';
import { tryCatch } from '../middleware/tryCatch';
import { auth } from '../middleware/auth';
import {
	create,
	update,
	getOne,
	destroy,
	createAnswer,
	getAnswers,
	upVote,
	downVote,
	createComment,
	getComments
} from '../controllers/questions';

const router = express.Router();

router.get('/:id', auth, tryCatch(getOne));
router.get('/:id/answers', tryCatch(getAnswers));
router.get('/:id/comments', tryCatch(getComments));
router.post('/ask', auth, tryCatch(create));
router.post('/:id/answers', auth, tryCatch(createAnswer));
router.post('/:id/comments', auth, tryCatch(createComment));
router.put('/:id/upvote', auth, tryCatch(upVote));
router.put('/:id/downvote', auth, tryCatch(downVote));
router.put('/:id', auth, tryCatch(update));
router.delete('/:id', auth, tryCatch(destroy));
export default router;
