import { Router } from 'express';
import {
  getQuestions,
  getAnswersByParticipant
} from '../controllers/question.controller';

const router = Router();

router.get('/', getQuestions);
router.get('/answers/:participantId', getAnswersByParticipant);

export default router;
