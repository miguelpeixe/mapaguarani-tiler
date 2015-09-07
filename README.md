# Mapa Guarani Tiler

Gerador de tiles para o projeto Mapa Guarani

## Preparando o ambiente para o [Windshaft](https://github.com/CartoDB/Windshaft)

[Acesse este tutorial para Ubuntu 14.04](https://gist.github.com/miguelpeixe/cf29702c2b19cea55f07)

## Configure o PostgreSQL

Após instalar todas as dependências, altere as permissões do Postgres (/etc/postgresql/9.3/main/pg_hba.conf) para que o mapnik tenha acesso à base.

## Instalação

Instale as dependências do tiler:

```
$ npm install
```

## Executando a aplicação

```
$ node app.js
```

Acesse:

`http://localhost:4000/tiles`

Utilize o token recebido:

`http://localhost:4000/tiles/[token]/{z}/{x}/{y}.png`
