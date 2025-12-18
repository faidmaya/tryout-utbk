import { Router } from 'express';
import { saveAnswer, submitTryout } from '../controllers/submit.controller';

const router = Router();

// simpan jawaban
router.post('/answer', saveAnswer);

// submit tryout & hitung skor
router.post('/', submitTryout);

export default router;
