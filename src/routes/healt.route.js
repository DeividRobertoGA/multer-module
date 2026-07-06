//Importando as dependencias necessárias
import { Router } from 'express';

//Configurando as rotas
const route = Router();

route.get('/health', async (req, res) => {
  const healthStatus = {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)}s`,
    services: {
      server: 'OK',
      db: 'DOWN' // Padrão inicial
    }
  };

  /*try {
    // 1. Testar a conexão com o banco 
    await DB.raw('SELECT 1');
    healthStatus.services.db = 'OK';

    // Se tudo estiver certo, responde com Status 200 (OK)
    res.status(200).json(healthStatus);
  } catch (error) {
    // Se o banco falhar, altera o status geral para DOWN
    healthStatus.status = 'DOWN';
    healthStatus.services.db = `ERROR: ${error.message}`;
    
    // Retorna Status 503 (Service Unavailable) para avisar os sistemas de monitoramento
    res.status(503).json(healthStatus);
  }*/
  res.status(200).json(healthStatus);
});

export default route;