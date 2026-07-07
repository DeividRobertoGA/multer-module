//Importando o banco de dados
import { DB } from "../config/database.config.js";

const getFileID = async (req, res, next) => {
    let fileExists = await DB('files').select('name').where('id', req.params.id);
    if (fileExists < 1) {
        res.status(404).send({ error: "Arquivo não encontrado"})
    } else {
        next();
    }
};

const getFileName = async (req, res, next) => {
    let fileExists = await DB('files').select('id').where('name', req.params.name);
    if (fileExists < 1) {
        res.status(404).send({ error: "Arquivo não encontrado" });
    } else {
        next();
    }
}

const unshareFile = async (req, res, next) => {
    let shareExists = await DB('share_files').select('hash').where('file_id', req.params.id);
    if (shareExists < 1) {
        res.status(404).send({ error: "Arquivo não compartilhado" });
    } else {
        next();
    }
}


const getShareHash = async (req, res, next) => {
    try {
        // Usamos .first() para garantir que retorne um único objeto em vez de um array
        const share = await DB('share_files')
            .select('expires_in')
            .where('hash', req.params.hash)
            .first();

        // 1. Verifica se o registro existe no banco de dados
        if (!share) {
            // O 'return' é obrigatório aqui para parar a execução da função
            return res.status(404).send({ error: "Arquivo não encontrado" });
        }

        // 2. Verifica se a coluna expires_in tem algum valor (se for null, não expira)
        if (share.expires_in) {
            const dataAtual = new Date();
            const dataExpiracao = new Date(share.expires_in);

            // Compara as datas. Se a data atual for maior, o link expirou
            if (dataAtual > dataExpiracao) {
                // Status 410 (Gone) é ideal para recursos que existiam, mas não estão mais disponíveis
                return res.status(410).send({ error: "Este link de compartilhamento expirou" });
            }
        }

        // Se o arquivo existe e não expirou, passa para a próxima função da rota
        next();
        
    } catch (error) {
        console.error("Erro ao verificar hash:", error);
        return res.status(500).send({ error: "Erro interno no servidor" });
    }
}

export default {getFileID, getFileName, unshareFile, getShareHash}