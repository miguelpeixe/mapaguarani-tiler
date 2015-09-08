# Mapa Guarani Tiler

Gerador de tiles para o projeto Mapa Guarani

## Preparando o ambiente para o [Windshaft](https://github.com/CartoDB/Windshaft) no Ubuntu 14.04

### Instalar o Mapnik

**Verifique se você tem o repositório correto habilitado**

Primeiro, cheque se o repositório `multiverse` habilitado inspecionando `/etc/apt/sources.list` com seu editor favorito.

Você deverá usar `sudo` para garantir que tenha permissões para editar o arquivo.

Se `multiverse` não estiver incluso, então modifique para que esteja.

```
deb http://us.archive.ubuntu.com/ubuntu trusty main multiverse
```

Depois de qualquer alteração você deve executar este comando para atualizar seu sistema.

```
$ sudo apt-get update
```

#### Dependências do Mapnik

```
$ sudo apt-get install libboost-all-dev subversion git-core tar unzip wget bzip2 build-essential autoconf libtool libxml2-dev libgeos-dev libgeos++-dev libpq-dev libbz2-dev libproj-dev munin-node munin libprotobuf-c0-dev protobuf-c-compiler libfreetype6-dev libpng12-dev libtiff4-dev libicu-dev libgdal-dev libcairo-dev libcairomm-1.0-dev apache2 apache2-dev libagg-dev liblua5.2-dev ttf-unifont lua5.1 liblua5.1-dev libgeotiff-epsg node-carto
```

#### Monte Mapnik do source

```
$ cd ~/src
$ git clone git://github.com/mapnik/mapnik
$ cd mapnik
$ git branch 2.2 origin/2.2.x
$ git checkout 2.2

$ python scons/scons.py configure INPUT_PLUGINS=all OPTIMIZATION=3 SYSTEM_FONTS=/usr/share/fonts/truetype/
$ make
$ sudo make install
$ sudo ldconfig
```

### Dependências do Windshaft

Adicione o repositório do node:

```
$ sudo add-apt-repository ppa:chris-lea/node.js 
```

Adicione o repositório do servidor redis:

```
$ sudo add-apt-repository ppa:chris-lea/redis-server
```

Atualize o apt:

```
$ sudo apt-get update
```

Instale as dependências:

```
$ sudo apt-get install nodejs libcairo2-dev libpango1.0-dev libjpeg8-dev libgif-dev redis-server
```

## Configure o PostgreSQL

Após instalar todas as dependências, altere as permissões do Postgres (`/etc/postgresql/9.3/main/pg_hba.conf`) para que o mapnik tenha acesso à base.

## Instalação do tiler

```
$ git clone https://github.com/miguelpeixe/mapaguarani-tiler.git
$ cd mapaguarani-tiler
```

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
