[LICENSE_BADGE]: https://img.shields.io/badge/license-copyright-red?style=for-the-badge
[DOCKER_BADGE]: https://img.shields.io/badge/docker-blue?style=for-the-badge&logo=docker&logoColor=white
[NODE_BADGE]: https://img.shields.io/badge/node.js-gren?style=for-the-badge&logo=node.js&logoColor=white
[EXPRESS_BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express
[KNEX_BADGE]: https://img.shields.io/badge/knex.js-orange?style=for-the-badge&logo=knex.js&logoColor=white
[MYSQL_BADGE]: https://img.shields.io/badge/mysql-blue?style=for-the-badge&logo=mysql&logoColor=white

<h1 align="center" style="font-weight: bold;">Multer Module</h1>

![license][LICENSE_BADGE]
![docker][DOCKER_BADGE]
![node.js][NODE_BADGE]
![express][EXPRESS_BADGE]
![knex.js][KNEX_BADGE]
![mysql][MYSQL_BADGE]

<details open="open">
<summary>Índice</summary>

- [✨ Funcionalidades](#features)
- [🚀 Preparando para começar](#started)
  - [Pré-Requisitos](#prerequisites)
  - [Clonando o Repositório](#download)
  - [Variaveis de Ambiente](#env)
- [Iniciando o sistema](#starting)
- [📍Documentação da API](#documentation)
  - [Postman](#postman)
- [Licença](#license)

</details>

<p align="center">
  Template de uso do <b>Multer</b> para o upload de arquivos
</p>

<h2 id="features">✨ Funcionalidades</h2>

- Autenticação com JWT
- Upload de Arquivos
- Rotas Privadas e Publicas

<h2 id="started">🚀 Preparando para começar</h2>

Esse projeto foi pensado para rodar 100% na docker sem depender da maquina local.

<h3 id="prerequisites">Pré-Requisitos</h3>

- Docker
- Docker Compose

<h3 id="download">Clonando o Repositório</h3>

```bash
git clone https://github.com/DeividRobertoGA/multer-module.git
cd multer-module
```

<h3 id="env">Variaveis de Ambiente</h2>

Crie o arquivo `.env` apartir do `example.env`

```yaml
#/-------------------- Configurações do Servidor --------------------/#
NODE_ENV=
PORT=
BACKEND_URL=http://localhost
TRUST_PROXY= #Caso não tenha proxy, pode deixar em branco, comentar ou colocar false
#https://www.lastpass.com/pt/features/password-generator
TOKEN_KEY= #Recomendado 32 caracteres, sem caracteres especiais, apenas letras e números. Exemplo: 1234567890qwertyuiopasdfghjklzxcvbnm

#/-------------------- Configurações do Banco de Dados --------------------/#
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

<h2 id="starting">Iniciando o sistema</h2>

Para iniciar o sistema use:

```yaml
docker compose up -d
```

Depois execute o comando abaixo para rodar os migrations e o seeder
```bash
docker compose exec backend npm run knex:init
```

<h2 id="documentation">📍Documentação da API</h2>

<h3 id="postman">Postman</h3>

Para utilizar o Postman use o nosso [Workspace](https://documenter.getpostman.com/view/44364866/2sBY4JwhoE).

<h2 id="license">Licença</h2>

Esse projeto usa a licença de **COPYRIGHT** para mais informações acesse nos arquivo de [licença](https://github.com/DeividRobertoGA/multer-module?tab=License-1-ov-file)
