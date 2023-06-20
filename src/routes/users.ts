import express from 'express';
import tryCatch from '../middleware/tryCatch';
import { auth } from '../middleware/auth';
import { register, login, getOne, update, destroy } from '../controllers/users';

const router = express.Router();

router.post('/register', tryCatch(register));
router.post('/login', tryCatch(login));
router.get('/:id', auth, tryCatch(getOne));
router.put('/:id', auth, tryCatch(update));
router.delete('/:id', auth, tryCatch(destroy));

export default router;
