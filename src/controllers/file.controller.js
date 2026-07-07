//Importando as dependências necessárias
import Model from '../models/file.model.js'
import { textEncoding } from '../utils/formatFilename.js'
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "Nenhum arquivo enviado"});
        }

        const originFilename = textEncoding(req.file.originalname);

        const file = await Model.uploadFile(req.file.filename, originFilename);
        return res.status(201).send({ message: "Upload concluido com sucesso" })
    } catch (error) {
        console.error("Erro ao fazer o upload do arquivo:", error);
        return res.status(500).json({ error: error.message });
    }
}

const deleteFile = async (req, res) => {
    try {
        const file = await Model.deleteFile(req.params.id)
        return res.status(200).send({ message: "Arquivo deletado com sucesso"})
    } catch (error) {
        console.error("Erro ao deletar o arquivo:", error);
        return res.status(500).json({ error: error.message })
    }
}

const listFile = async (req, res) => {
    try {
        const file = await Model.listFile();
        return res.status(200).send(file);
    } catch (error) {
        console.error("Erro ao listar os arquivos:", error);
        return res.status(500).json({ error: error.message });
    }
}

const shareFile = async (req, res) => {
    try {
        let expires = null
        if (req.body.expires) {
            const parsedDate = new Date(req.body.expires);

            // Verifica se a conversão falhou (se o getTime() for NaN, a data é inválida)
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).send({ error: "Data de expiração inválida. Envie um timestamp numérico ou uma data em formato ISO (ex: YYYY-MM-DD)." });
            }

            // Atribui o objeto de data validado. 
            // O Knex lidará com a conversão final para o banco de dados.
            expires = parsedDate;
        }
        const file = await Model.shareFile(req.params.id, expires)
        return res.status(201).send({ message: "Arquivo compartilhado"})
    } catch (error) {
        console.error("Erro ao compartilhar o arquivo:", error);
        return res.status(500).json({ error: error.message});
    }
}

const unshareFile = async (req, res) => {
    try {
        const file = await Model.unshareFile(req.params.id);
        return res.status(200).send({ message: "Compartilhamento cancelado"})
    } catch (error) {
        console.error("Erro ao privar o arquivo:", error);
        return res.status(500).json({ error: error.message});
    }
}

const listShareFile = async (req, res) => {
    try {
        const file = await Model.listShareFile();
        return res.status(200).send(file);
    } catch (error) {
        console.error("Erro ao listar os arquivos:", error);
        return res.status(500).json({ error: error.message });
    }
}

const getFilename = async (req, res) => {
    try {
        const file = await Model.getFilename(req.params.hash);
        return file;
    } catch (error) {
        console.error("Erro ao buscar arquivo:", error);
        return res.status(500).json({ error: error.message});
    }
}

export default {uploadFile, deleteFile, listFile, shareFile, unshareFile, listShareFile, getFilename}