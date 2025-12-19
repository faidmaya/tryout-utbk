import express from 'express';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.routes';
import questionRoutes from './routes/question.routes';
import submitRoutes from './routes/submit.routes';
import progressRoutes from './routes/progress.routes';

const app = express();

app.use(cors());
app.use(express.json());

/**
 * API ROUTES
 */
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/submit', submitRoutes);
app.use('/api/progress', progressRoutes);

/**
 * SERVE STATIC FRONTEND
 * runtime: backend/dist
 * target : backend/frontend
 */
const frontendPath = path.resolve(__dirname, '../frontend');
app.use(express.static(frontendPath));

/**
 * ROOT → login.html
 */
app.get('/', (_req, res) => {
  res.sendFile(path.join(frontendPath, 'login.html'));
});

export default app;
