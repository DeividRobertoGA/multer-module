//Importando as dependências necessárias
import { DB } from '../config/database.config.js';
import bcrypt from "bcrypt";

const login = async (email) => {
    return await DB('users')
        .select('id', 'name', 'email', 'password')
        .where('email', email)
        .first();
};

const register = async (dados) => {
    const cryptPassword = await bcrypt.hash(dados.password, 10);
    
    return await DB('users').insert({
        name: dados.name,
        email: dados.email,
        password: cryptPassword,
        created_at: DB.fn.now(),
        updated_at: DB.fn.now()
    })
};

const recoverPassword = async (dados) => {
    const cryptPassword = await bcrypt.hash(dados.password, 10);

    return await DB('users')
        .where('email', dados.email)
        .update({
            password: cryptPassword,
            updated_at: DB.fn.now()
        });
};

export default {login, register, recoverPassword};