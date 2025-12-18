import { Request, Response } from 'express';
import { pool } from '../db';

export const login = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }

    // 1️⃣ cek participant sudah ada atau belum
    const existing = await pool.query(
      'SELECT * FROM public.participants WHERE name = $1',
      [name]
    );

    // 🟢 JIKA SUDAH ADA
    if (existing.rows.length > 0) {
      const participant = existing.rows[0];

      // pastikan progress ada
      await pool.query(
        `
        INSERT INTO participant_progress (participant_id)
        VALUES ($1)
        ON CONFLICT (participant_id) DO NOTHING
        `,
        [participant.id]
      );

      return res.json(participant);
    }

    // 2️⃣ create participant baru
    const result = await pool.query(
      'INSERT INTO public.participants (name) VALUES ($1) RETURNING *',
      [name]
    );

    const participant = result.rows[0];

    // 3️⃣ init progress tryout
    await pool.query(
      `
      INSERT INTO participant_progress (participant_id)
      VALUES ($1)
      `,
      [participant.id]
    );

    res.json(participant);
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ message: 'login failed' });
  }
};
