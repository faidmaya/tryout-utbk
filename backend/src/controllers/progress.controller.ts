import { Request, Response } from 'express';
import { pool } from '../db';

export const getProgress = async (req: Request, res: Response) => {
  try {
    const { participant_id } = req.query;

    if (!participant_id) {
      return res.status(400).json({ message: 'participant_id required' });
    }

    const result = await pool.query(
      `
      SELECT
        p.current_subtest,
        s.name,
        s.duration_minutes,
        p.subtest_start_time
      FROM participant_progress p
      JOIN subtests s ON s.id = p.current_subtest
      WHERE p.participant_id = $1
      `,
      [participant_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'progress not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('GET PROGRESS ERROR:', err);
    res.status(500).json({ message: 'failed to get progress' });
  }
};
