//Importando as dependências necessárias
import Model from "../models/user.model.js"
import { createJWT } from "../config/token.config.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
    try {
        const user = await Model.login(req.body.email);
        if (!user) {
            return res.status(401).json({errors: "E-mail e/ou senha incorretos"});
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (isValidPassword) {
            const response={ ...user };
            delete response.password;
            response.token = createJWT(response.id);
            return res.status(200).send(response);
        } else {
            return res.status(401).json({errors: "E-mail e/ou senha incorretos"});
        }
    
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        return res.status(500).json({errors: error.message});
    }
};

const register = async (req, res) => {
    try {
        const dados = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        const register = await Model.register(dados);
        return res.status(201).json({message: "Usuário cadastrado com sucesso"});
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return res.status(500).json({errors: error.message});
    }
};

const recoverPassword = async (req, res) => {
    try {
        const dados = {
            email: req.body.email,
            password: req.body.password,
        };

        const result = await Model.recoverPassword(dados);
        return res.status(200).json({message: "Senha alterada com sucesso"});
    } catch (error) {
        console.error("Erro ao recuperar senha:", error);
        return res.status(500).json({errors: error.message});
    }
};

export default {login, register, recoverPassword}