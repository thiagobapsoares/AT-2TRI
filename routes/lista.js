const database = require("../config/database")()
const atividades = require("../models/atividades")
    var usuarios = require('../models/usuarios')

module.exports = (app)=>{

var hoje = new Date()
var diasete = new Date()
var diasete = new Date(diasete.setDate(diasete.getDate()+7))
var diatrinta = new Date()
var diatrinta = new Date(diatrinta.setDate(diatrinta.getDate()+30))

console.log(hoje)
console.log(diasete)
console.log(diatrinta)

app.get("/setedias",async(req,res)=>{
    var user = req.query.id
    var filtro = req.query.filtro
    var dadosUser = await usuarios.findOne({_id:user})
    var dadosAberto = await atividades.find({usuario:user,status:"0",data:{$lt:diasete}}).sort({data:1})
    var dadosEntregue = await atividades.find({usuario:user,status:"1",data:{$lt:diasete}}).sort({data:1})
    var dadosDescartar = await atividades.find({usuario:user,status:"2",data:{$lt:diasete}}).sort({data:1})

    res.render('atividades.ejs',{nome:dadosUser.name,id:dadosUser._id,dadosAberto,dadosEntregue,dadosDescartar,filtro})
})

app.get("/trintadias",async(req,res)=>{
    var user = req.query.id
    var filtro = req.query.filtro

    var dadosUser = await usuarios.findOne({_id:user})
    var dadosAberto = await atividades.find({usuario:user,status:"0",data:{$lt:diatrinta}}).sort({data:1})
    var dadosEntregue = await atividades.find({usuario:user,status:"1",data:{$lt:diatrinta}}).sort({data:1})
    var dadosDescartar = await atividades.find({usuario:user,status:"2",data:{$lt:diatrinta}}).sort({data:1})

    res.render('atividades.ejs',{nome:dadosUser.name,id:dadosUser._id,dadosAberto,dadosEntregue,dadosDescartar,filtro})
})

app.get("/todos",(req,res)=>{
    var user = req.query.id
    var filtro = req.query.filtro

    res.redirect('/atividades?id='+user+'&filtro='+filtro)
})

}
