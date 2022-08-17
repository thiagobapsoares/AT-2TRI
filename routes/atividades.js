const atividades = require("../models/atividades")
const usuarios = require("../models/usuarios")

module.exports = (app) =>{
    app.post('/atividades',async(req,res)=>{
        var dados = req.body
        //return console.log(dados)
        //conectar com o database
        const database = require("../config/database")()
        //importar o model atividades
        const atividades = require("../models/atividades")
        //gravar as informações do formulário no database
        var gravar = await new atividades({
            //primeira parte:models; segunda parte:formulário
            usuario:dados.id,
            titulo:dados.titulo,
            data:dados.data
        }).save()
        //recarregar a página atividades
        res.redirect('/atividades?id='+dados.id)
    })
    app.get('/atividades',async(req,res)=>{
        //listar todas as atividades do usuário logado
        var user = req.query.id
        if(!user){
            res.redirect("/login")
        }
        var usuarios = require('../models/usuarios')
        var atividades = require('../models/atividades')
        
        var dadosUser = await usuarios.findOne({_id:user})
        var dadosAberto = await atividades.find({usuario:user,status:"0"}).sort({data:1})
        var dadosEntregue = await atividades.find({usuario:user,status:"1"}).sort({data:1})
        var dadosDescartar = await atividades.find({usuario:user,status:"2"}).sort({data:1})

        res.render('atividades.ejs',{nome:dadosUser.nome,id:dadosUser._id,dadosAberto,dadosEntregue,dadosDescartar})

        //res.render('atividades.ejs',{nome:dadosUser.nome,id:dadosUser._id,lista:dadosAtividades})
    })

    app.get('/descartar',async(req,res)=>{
        //qual documento será excluído da collection atividades?
        var doc = req.query.id
        //descartar o documento 
        var descartar = await atividades.findOneAndUpdate(
            {_id:doc},
            {status:"2"}
        )
        //voltar para a lista de atividades
        res.redirect('/atividades?id='+descartar.usuario)
        
    })

    //rota entregue
    app.get('/entregue',async(req,res)=>{
        //qual documento será excluído da collection atividades?
        var doc = req.query.id
        //descartar o documento 
        var entregue = await atividades.findOneAndUpdate(
            {_id:doc},
            {status:"1"}
        )
        //voltar para a lista de atividades
        res.redirect('/atividades?id='+entregue.usuario)
        
    })

    //rota desfazer
    app.get('/desfazer',async(req,res)=>{
        //qual documento será devolvida da collection atividades?
        var doc = req.query.id
        //descartar o documento 
        var desfazer = await atividades.findOneAndUpdate(
            {_id:doc},
            {status:"0"}
        )
        //voltar para a lista de atividades
        res.redirect('/atividades?id='+desfazer.usuario)
        
    })

    //renderizar a view alterar.ejs
    app.get("/alterar",async(req,res)=>{
        //recuperar o id da atividade na barra de endereço
        var id = req.query.id
        //procurar o id na collection atividades
        var alterar = await atividades.findOne({_id:id})
        //localizar o usuário proprietário da atividade
        var user = await usuarios.findOne({_id:alterar.usuario})
        //renderizAR a view alterar e enviar o nome e id do usuario e todos os dados da atividade
        res.render("alterar.ejs",{nome:user.nome,id:user._id,alterar})
    })

    //gravar as alterações na atividade selecionada
    app.post("/alterar",async(req,res)=>{
        //armazenar as informações recebidas do formulário
        var dados = req.body
        //visualizar os dados
        //atualizar o documento selecionado
        var atualizar = await atividades.findOneAndUpdate(
            {_id:dados.id_a},
            {
                data:dados.data,
                titulo:dados.titulo,
                tipo:dados.tipo
            }
        )
        //voltar para atividades
        res.redirect('/atividades?id='+dados.id_u)
    })

    //renderizar a view excluir.ejs
     app.get("/excluir",async(req,res)=>{
        //recuperar o id da atividade na barra de endereço
        var id = req.query.id
        //procurar o id na collection atividades
        var excluir = await atividades.findOne({_id:id})
        //localizar o usuário proprietário da atividade
        var user = await usuarios.findOne({_id:excluir.usuario})
        //renderizAR a view excluir e enviar o nome e id do usuario e todos os dados da atividade
        res.render("excluir.ejs",{nome:user.nome,id:user._id,excluir})
    })

    //excluir o documento clicado
    app.post("/excluir",async(req,res)=>{
        //recuperar o id na barra de endereço
        var dados = req.body
        //localizar e excluir o documento
        var excluir = await atividades.findOneAndDelete(
            {_id:dados.id_a},
            {
                usuario:dados.id,
                titulo:dados.titulo,
                data:dados.data
            }
        )
        //voltar para a página atividades
        res.redirect('/atividades?id='+dados.id_u)
    })

}
