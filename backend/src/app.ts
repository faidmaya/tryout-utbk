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
 * SERVE FRONTEND (STATIC)
 */
app.use(
  express.static(
    path.join(__dirname, '../../frontend')
  )
);

/**
 * DEFAULT PAGE
 */
app.get('/', (_req, res) => {
  res.sendFile(
    path.join(__dirname, '../../frontend/login.html')
  );
});

export default app;
