//importar o pacote mongoose
const mongoose = require('mongoose')

const conn = async()=>{
    //mongoAtlas
    const atlas = await mongoose.connect('mongodb+srv://userAdmin:eugostodasenhaumarizal9@fiaptecnico.hatvo.mongodb.net/AT2?retryWrites=true&w=majority') 
} 

module.exports = conn
