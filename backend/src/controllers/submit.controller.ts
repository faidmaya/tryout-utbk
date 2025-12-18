import { Request, Response } from 'express';
import { pool } from '../db';

/**
 * Simpan / update jawaban
 */
export const saveAnswer = async (req: Request, res: Response) => {
  try {
    const { participant_id, question_id, answer } = req.body;

    if (!participant_id || !question_id || !answer) {
      return res.status(400).json({ message: 'Incomplete data' });
    }

    await pool.query(
      `
      INSERT INTO public.answers (participant_id, question_id, answer)
      VALUES ($1, $2, $3)
      ON CONFLICT (participant_id, question_id)
      DO UPDATE SET answer = EXCLUDED.answer
      `,
      [participant_id, question_id, answer]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save answer' });
  }
};

/**
 * Submit tryout & hitung skor
 */
export const submitTryout = async (req: Request, res: Response) => {
  try {
    const { participant_id } = req.body;

    if (!participant_id) {
      return res.status(400).json({ message: 'participant_id required' });
    }

    // hitung skor
    const scoreResult = await pool.query(
      `
      SELECT
        COUNT(*) FILTER (WHERE a.answer = q.correct) AS correct,
        COUNT(*) AS answered
      FROM public.answers a
      JOIN public.questions q ON q.id = a.question_id
      WHERE a.participant_id = $1
      `,
      [participant_id]
    );

    const correct = Number(scoreResult.rows[0].correct);
    const answered = Number(scoreResult.rows[0].answered);

    const totalResult = await pool.query(
      'SELECT COUNT(*) FROM public.questions'
    );

    const totalQuestions = Number(totalResult.rows[0].count);

    res.json({
      participant_id,
      total_questions: totalQuestions,
      answered,
      correct,
      score: correct
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit tryout' });
  }
};
