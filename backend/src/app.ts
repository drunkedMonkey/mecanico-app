import express, { Request, Response } from 'express';
import cors from 'cors';

import apiRoutes from './routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', apiRoutes);

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend funcionando correctamente' });
});

export default app;
