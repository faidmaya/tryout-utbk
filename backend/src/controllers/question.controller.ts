import { Request, Response } from 'express';
import { pool } from '../db';

export const getQuestions = async (req: Request, res: Response) => {
    const { participant_id } = req.query;
  
    const progress = await pool.query(
      `SELECT current_subtest FROM participant_progress WHERE participant_id = $1`,
      [participant_id]
    );
  
    const subtestId = progress.rows[0].current_subtest;
  
    const result = await pool.query(
      `SELECT * FROM questions WHERE subtest_id = $1 ORDER BY id`,
      [subtestId]
    );
  
    res.json(result.rows);
  };
  

export const getAnswersByParticipant = async (req: Request, res: Response) => {
    const participantId = req.params.participantId;
  
    const result = await pool.query(
      `
      SELECT question_id, answer
      FROM public.answers
      WHERE participant_id = $1
      `,
      [participantId]
    );
  
    res.json(result.rows);
  };
  
