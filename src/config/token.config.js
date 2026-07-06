//Importando as dependencias da comunidade
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

//Configurações
dotenv.config();
const SECRET_KEY = process.env.TOKEN_KEY;

//Criando um Token
const createJWT = (user_id) => {
    const token = jwt.sign({user_id}, SECRET_KEY, {
        expiresIn: '1d'
    });

    return token;
}

//Validando o Token
const verifyJWT = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) { return res.status(401).send({message: "Token não Informado"}); };

    const [str, token] = authToken.split(" ");

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).send({message: "Token Inválido"});
        } else {
            req.user_id = decoded.user_id;

            next();
        }
    })
}

export {createJWT, verifyJWT};