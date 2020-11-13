// Biblioteca do Broker MQTT
var aedes = require('aedes')()
var server = require('net').createServer(aedes.handle)
const port = 1883;

// Biblioteca do Banco de Dados NoSQL: MongoDB
var MongoClient = require('mongodb').MongoClient;
const usuario = "nome_do_usuario";     
const senha = "senha_usuario";
const nomebanco = "nome_banco";
const nomecollection = "nome_colecao";
const url = "mongodb+srv://"+ usuario + ":" + senha + "@cluster0.bvczi.mongodb.net";

// Listening
server.listen(port, function() {
    console.log('Servidor escutando na porta: ', port);
    console.log('ID Broker: ' + aedes.id);
    console.log('Hora: ' + new Date().toISOString());

    // Insere registro/documento na collection
    MongoClient.connect(url, { useUnifiedTopology: true },  function(err, db) {
        if (err) throw err;
        var dbo = db.db(nomebanco);

        var myobj = { data_log: new Date().toISOString(), msg_log: 'Servidor MQTT Iniciado na porta: ' + port };

        dbo.collection(nomecollection).insertOne(myobj, function(err, res) {
        if (err){
            console.log(err.message);
        } else {
            console.log("LOG - Servidor MQTT Iniciado na porta: " + port);
            db.close();
        }
        });
    });
});

// Identifica conexões estabelecidas
aedes.on('client', function (client) {
    console.log('\n');
    console.log('START. Modulo Iniciado. ID: ' + client.id + ' Hora: ' + new Date().toISOString() );
})

// Identifica desconexões
aedes.on('clientDisconnect', function (client) {
    console.log('STOP. Modulo Desconectado. ID: ' + client.id);
})

// ================================================================================
// assinatura de topicos
// ================================================================================

// Assina tópico 'temperatura'. Aguarda recebimento de mensagens
aedes.subscribe('temperatura', function(packet, cb) {

    console.log('Mensagem Recebida:', packet.payload.toString());

    // Insere registro/documento na collection
    MongoClient.connect(url, { useUnifiedTopology: true },  function(err, db) {
        if (err) throw err;
        var dbo = db.db(nomebanco);

        var myobj = { data_leitura: new Date().toISOString(), temperatura: packet.payload.toString() };

        dbo.collection(nomecollection).insertOne(myobj, function(err, res) {
        if (err){
            console.log(err.message);
        } else {
            console.log("1 documento inserido");
            db.close();
        }
        });
    });

});

// Assina tópico VaiVolta. Responde as mensagens recebidas
aedes.subscribe('VaiVolta', function(packet, cb) {
    console.log('Mensagem Recebida. Tópico (VaiVolta). Mensagem: ', packet.payload.toString());
    
    // envia mensagem para cliente
    aedes.publish({ topic: 'fromServer', payload: "Aqui quem fala eh o Servidor."})
});

// Identifica assinatura de tópicos.
aedes.on('subscribe', function (subscriptions, client) {
    console.log ('Cliente Assinou Tópico. ID: ' + client.id +  ' Tópico: ' + subscriptions.map(s => s.topic).join('\n'))
})

// Identifica cancelamento de assinaturas de tópicos.
aedes.on('unsubscribe', function (subscriptions, client) {
    console.log ('Cliente cancelou Assinatura de Tópico. ID: ' + client.id +  ' Tópico: ' + subscriptions.map(s => s.topic).join('\n'))
})