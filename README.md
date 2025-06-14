# Backend

## About

This repository contains the backend code for the Candago-4 project. It is implemented in TypeScript and structured to support the project's server-side functionalities.

## Getting Started

To set up and run this backend project locally, follow the steps below.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.19.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/candago-4/backend.git

2. **Navigate to the project directory:**

   ```bash
   cd backend

3. **Install dependences:**

   ```bash
   npm install

4. **Config the .env:**

   ```bash
    PORT=your_available_port_number
    JWT_SECRET=your_jwt_secret

5. **Config the database:**

   If u installed postgreesql with postgres as default superuser
   ```bash
    sudo -u postgres psql
    \i path/to/your/project/src/db/create_db.sql
  
  **Running the application:**

   ```bash
   npm run dev
   
## Rollback Manual
```bash
# Acesse o servidor
ssh user@server

# Execute:
cd /var/www/lynch-area
git log --oneline  # Encontre o hash do commit anterior
git reset --hard <commit-hash>
npm ci
npm run build
pm2 restart lynch-area-api

## Monitoramento

### Endpoints
- `GET /health`: Health check da aplicação
- `GET /metrics`: Métricas no formato Prometheus

### Configuração do Dashboard
1. Instale o Prometheus e Grafana
2. Configure o Prometheus para coletar métricas de `/metrics`
3. Importe o dashboard [Node.js Exporter Full](https://grafana.com/grafana/dashboards/1860) no Grafana

### Logs
Os logs estão disponíveis em:
- `logs/error.log`: Erros da aplicação
- `logs/combined.log`: Todos os logs

## CI/CD Pipeline
1. Testes executados em cada push/PR
2. Deploy automático após merge no main
3. Rollback manual via Git reset

## Como Executar
```bash
# Instalação
npm install

# Configuração
Crie um arquivo .env com:
DATABASE_URL="postgresql://postgres:123@localhost:5432/LynchAreaDB"
JWT_SECRET="seu_segredo"

# Execução
npm run build
npm start

# Testes
npm test