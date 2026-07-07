//Importando as dependencias necessárias
import { Router } from 'express';
import Controller from '../controllers/file.controller.js';
import Validator from '../validators/file.validator.js';
import Multer from '../config/multer.config.js';
import { verifyJWT } from '../config/token.config.js';
import path from 'path';
import { fileURLToPath } from 'url';

//configurando a rota
const route = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

route.post('/files/share/:id', [verifyJWT, Validator.getFileID], Controller.shareFile);
route.delete('/files/share/:id', [verifyJWT, Validator.unshareFile], Controller.unshareFile);
route.get('/files/share', verifyJWT, Controller.listShareFile);
route.get('/files/share/:hash', Validator.getShareHash, async (req, res) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const file = await Controller.getFilename(req, res);
    res.sendFile(file.name, { root: uploadsDir }, (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err.message);
            res.status(404).send({ error: "Arquivo não encontrado"})
        }
    })
});

route.post('/files', [verifyJWT, Multer('uploads').single('file')], Controller.uploadFile);
route.delete('/files/:id', [verifyJWT, Validator.getFileID], Controller.deleteFile);
route.get('/files', verifyJWT, Controller.listFile);
route.get('/files/:name', [verifyJWT, Validator.getFileName], (req, res) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    res.sendFile(req.params.name, { root: uploadsDir }, (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err.message);
            res.status(404).send({ error: "Arquivo não encontrado"});
        }
    })
});

export default route;