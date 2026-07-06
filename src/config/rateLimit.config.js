//Importando as dependencias necessárias
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';

//Configurando as Variaveis de Ambiente
dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Janela de 15 minutos
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: 'Muitas requisições vindas deste IP. Por favor, tente novamente mais tarde.'
  },

});

export default limiter;