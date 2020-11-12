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

## Ao iniciar projeto:

`$ npm init`

`$ npm install`

`$ npm install aedes`

`$ npm install mongodb`

## Passo a passo para publicar/hospedar na nuvem:

### IBM Cloud - Cloud Foundry

* Instalar a IBM Cloud CLI. Verifique se está configurada corretamente executando `ibmcloud -v`
* Instalar o plugin do Cloud Foundry executando `ibmcloud cf install`
* Adcionar arquivo manifest.yml
    * Na primeira publicação (push) não incluir routes / route
    * Após primeira publicação, obter nome do app e adicionar as seguintes linhas :
    
    `routes:`

    `- route: nome_do_app.mybluemix.net`

    * Adicionar linha : `health-check-type: process`
    (You should change your health check type. if the application does not expose a Web interface you need to change the healthcheck type to process. Valid values are `port`, `process`, and `http` ).
* Logar na IBM Cloud CLI: `ibmcloud login`
* Destinar a um espaço Cloud Foundry da conta: `ibmcloud target --cf`
* Subir a aplicação para a nuvem: `ibmcloud cf push`
* Para subir atualizações no app, basta executar novamente `ibmcloud cf push`