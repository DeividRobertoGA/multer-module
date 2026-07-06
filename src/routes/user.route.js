//Importando as dependências necessárias
import { Router } from 'express';
import Controller from "../controllers/user.controller.js";
import Validator from "../validators/user.validator.js";

//configurando a rota
const route = Router();

route.post("/login", Validator.login, Controller.login);

route.post("/register", Validator.register, Controller.register);

route.post("/recoverPassword", Validator.recoverPassword, Controller.recoverPassword);

export default route;