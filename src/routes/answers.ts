import express from 'express';
import { tryCatch } from '../middleware/tryCatch';
import { auth } from '../middleware/auth';
import {
	update,
	getOne,
	destroy,
	createComment,
	getComments
} from '../controllers/answers';

const router = express.Router();

router.get('/:id', auth, tryCatch(getOne));
router.get('/:id/comments', tryCatch(getComments));
router.post('/:id/comments', auth, tryCatch(createComment));
router.put('/:id', auth, tryCatch(update));
router.delete('/:id', auth, tryCatch(destroy));
export default router;
