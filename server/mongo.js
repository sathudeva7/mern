const mongoose = require('mongoose');
const env = require('./environment/env')
mongoose.Promise = global.Promise;



const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@azure-mern@`

function connect(){
    return mongoose.connect(mongoUri ,{useNewUrlParser: true})
}

module.exports = {
    connect,
    mongoose
}