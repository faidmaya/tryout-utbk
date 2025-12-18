import { Router } from 'express';
import { getProgress } from '../controllers/progress.controller';

const router = Router();
router.get('/', getProgress);

export default router;
