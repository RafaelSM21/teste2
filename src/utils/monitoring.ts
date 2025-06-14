// Adicionar ao arquivo existente
import promClient from 'prom-client';

// Coletar métricas padrão
promClient.collectDefaultMetrics();

// Middleware de métricas HTTP
export const httpMetrics = (req: any, res: any, next: any) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({ 
      method: req.method, 
      route: req.route?.path || req.path, 
      status: res.statusCode 
    });
  });
  next();
};

// Histograma para duração de requests
export const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 3, 5]
});