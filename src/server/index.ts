import express from 'express';
import { httpMetrics, httpRequestDuration } from '../utils/monitoring';
import * as promClient from 'prom-client';

const app = express();

// Middlewares
app.use(express.json());
app.use(httpMetrics);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// ... outras rotas ...

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});