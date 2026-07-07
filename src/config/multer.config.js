import multer from 'multer';
import { formatName } from "../utils/formatFilename.js"

// Configuração do armazenamento
const storage = (path) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path ? `src/private/${path}/` : 'src/private/uploads/');
        },
        filename: function (req, file, callback) {
            const filename = file.originalname
            callback(null, Date.now() + '-' + formatName(filename));
        }
    })
}

// Exportando o middleware de upload
const upload = (path) => {
    return multer({ storage: storage(path)})
}

export default upload;