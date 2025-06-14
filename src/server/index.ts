import app from '../routes';
import { httpLogger, httpRequestDuration, errorCounter } from '../utils/monitoring';
import promClient from 'prom-client';

app.use(httpLogger);

// Middleware de métricas
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  
  res.on('finish', () => {
    end({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    });
    
    if (res.statusCode >= 400) {
      errorCounter.inc({
        status: res.statusCode,
        route: req.route?.path || req.path
      });
    }
  });
  
  next();
});

// Endpoint de métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});