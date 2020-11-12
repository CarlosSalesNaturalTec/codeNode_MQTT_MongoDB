# Broker MQTT com armazenamento em Banco NoSQL MongoDB. 
# Utilizando Node.JS

## Sobre o MQTT Aedes

Aedes : https://github.com/moscajs/aedes

## Sobre o MongoDB:

Site Oficial : https://www.mongodb.com/

Tutorial : https://www.w3schools.com/nodejs/nodejs_mongodb.asp

Uso local : https://www.mongodb.com/try/download

Uso em nuvem / MongoDB Atlas : https://www.mongodb.com/cloud/atlas

Login in MongoDB Atlas : https://account.mongodb.com/account/login

### Fazendo uma analogia com Bancos de Dados SQL:

Database => Database

Collection => Table. A collection in MongoDB is the same as a table in MySQL.

Document => Record. A document in MongoDB is the same as a record in MySQL.

## Projeto

`$ npm init`

`$ npm install`

`$ npm install aedes`

`$ npm install mongodb`

## Para Publicar / Hospedar na Nuvem (Cloud)

### IBM Cloud - Cloud Foundry

Exemplo : https://github.com/danitrod/cloud-foundry-example

* Configurar arquivo manifest.yml
    * Na primeira publicação (push) não incluir routes / route
    * Após primeira publicação, obter nome do app e adicionar as seguintes linhas :
    
    `routes:`

    `- route: nome_do_app.mybluemix.net`

* Logar na IBM Cloud CLI: `ibmcloud login`
* Destinar a um espaço Cloud Foundry da conta: `ibmcloud target --cf`
* Subir a aplicação para a nuvem: `ibmcloud cf push`
