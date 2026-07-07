//Importando as dependencias necessárias
import express from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import corsOptions from './src/config/cors.config.js';
import limiter from './src/config/rateLimit.config.js';

//Importando as rotas
import healthRoute from './src/routes/healt.route.js';
import userRoute from './src/routes/user.route.js';
import fileRoute from './src/routes/file.route.js';

//Importando as verificações
import { DB } from './src/config/database.config.js';

//Configurando as Variaveis de Ambiente
dotenv.config();
const app = express();
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost';
const PORT = process.env.PORT || 3000;

//Configurando os middlewares
app.use(express.json());
app.use(cors(corsOptions));
if (process.env.TRUST_PROXY) {
  const trustValue = isNaN(process.env.TRUST_PROXY) 
    ? process.env.TRUST_PROXY === 'true' 
    : parseInt(process.env.TRUST_PROXY, 10);

  app.set('trust proxy', trustValue); 
}
app.use(limiter);

//Configurando as rotas locais

//Configurando as rotas Externas
app.use(healthRoute);
app.use(userRoute);
app.use(fileRoute);

//Preparando para inicializar o servidor
try {
    console.log("API desenvolvida por Deivid Roberto".cyan);
    //Verificações
    console.log("🔍 Iniciando as verificações do servidor")

    console.log("🔄 Verificando a conexão com o banco de dados");
    await DB.raw('SELECT 1');
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso\n".green)

    console.log("✅ Todas as verificações foram concluídas com sucesso\n".green)
        //Inicializando o servidor
    app.listen(PORT, () => {
        if (process.env.NODE_ENV === 'development') {
            console.log("🚀 Servidor rodando em modo de desenvolvimento".green);
            console.log(`Servidor rodando em ${BACKEND_URL}:${PORT}`.cyan);
        } else if (process.env.NODE_ENV === 'production') {
            console.log("🚀 Servidor rodando em modo de produção".green);
            console.log(`Servidor rodando em ${BACKEND_URL}`.cyan);
        }
    });
} catch (error) {
    console.error((`❌ Erro ao iniciar o servidor: ${error.message}`.red));
    process.exit(1);
}