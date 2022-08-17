const mongoose = require('mongoose')

const modelo = mongoose.Schema({
    usuario:String,
    titulo:String,
    data:Date,
    status:{type: String, default:"0"}
})

const atividades = mongoose.model('atividades', modelo)

module.exports = atividades