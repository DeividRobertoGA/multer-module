//Importando as dependencias necessárias
import dotenv from 'dotenv';

//Configurando as Variaveis de Ambiente
dotenv.config();

const allowedOrigins = [
  'http://localhost', 
  process.env.BACKEND_URL      
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    
    const isAllowed = allowedOrigins.includes(origin);
    //const isSubdomain = origin.endsWith('.seuapp.com');

    if (isAllowed /*|| isSubdomain*/) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

export default corsOptions;