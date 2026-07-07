//Importando as dependências necessárias
import { DB } from '../config/database.config.js';
import crypto from 'crypto'

const uploadFile = async (filename, originFilename) => {
    return await DB('files').insert({
        name: filename,
        originName: originFilename,
        status: "activate",
        created_at: DB.fn.now(),
        updated_at: DB.fn.now()
    })
};

const deleteFile = async (id) => {
    return await DB('files')
        .where('id', id)
        .update({
            status: "deactivate",
            updated_at: DB.fn.now()
        })
};

const listFile = async () => {
    return await DB('files')
        .select('*')
        .where('status', 'activate')
}

const shareFile = async (id, expires) => {
    const file = await DB('files')
        .select('name')
        .where('id', id)
        .first();

    const hash = await crypto.randomBytes(10).toString('hex')

    return await DB('share_files').insert({
        file_id: id,
        hash: hash,
        name: file.name,
        expires_in: expires,
        created_at: DB.fn.now(),
        updated_at: DB.fn.now()
    })
}

const unshareFile = async (id) => {
    return await DB('share_files')
        .where('file_id', id)
        .del()
}

const listShareFile = async () => {
    let nowDate = DB.fn.now();
    return await DB('share_files')
        .select('*')
        .whereNull('expires_in')
        .orWhere('expires_in', '>', nowDate)
}

const getFilename = async (hash) => {
    return await DB('share_files')
        .select('name')
        .where('hash', hash)
        .first()
}

export default {uploadFile, deleteFile, listFile, shareFile, unshareFile, listShareFile, getFilename}