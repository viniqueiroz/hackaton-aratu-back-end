module.exports = function (app) {

  var Usuario = require('./models/usuario');
  var Status = require('./models/status');
  var Privilegio = require('./models/privilegio');
  var Opcao = require('./models/opcao');
  var TipoResposta = require('./models/tipoResposta');
  var Resposta = require('./models/resposta');
  var Programa = require('./models/programa');
  var Produto = require('./models/produto');
  var auth = require('./auth');
  var config = require('./config/config');
  var jwt = require('jsonwebtoken');

  var moment = require('moment');
  //Criptografia da senha
  var sha1 = require('sha1');
  // app.use(auth);

  app.get('/api/usuario/:user_id', function (req, res) {
    Usuario.where({ id: req.params.user_id }).fetch().then(function (usuario) {
      res.json(usuario);
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      res.json({
        status: false,
        message: 'Nenhum Usuario encontrado'
      });
    });
  });

  app.get('/api/user/:user_id', function (req, res) {
    Usuario.where({ id: req.params.user_id }).fetch().then(function (usuario) {
      res.json(usuario);
    }).catch(function (err) {
      res.json({
        status: false,
        message: 'Nenhum Usuario encontrado'
      });
    });
  });

  app.get('/api/getCurrentUser', function (req, res) {
    var token = req.headers['x-access-token'];
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        res.json(err);
      } else {
        res.json(decoded);
      }
    });
  });

  app.get('/api/checkPermission', function (req, res) {
    var token = req.headers['x-access-token'];
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        res.send({ status: false, message: err });
      } else {
        res.send({ status: true });
      }
    });
  });


  //  =================   USUÁRIO CRUD - INÍCIO ===================

  app.post('/api/cadastrarUsuario', function (req, res) {   /// Cadastra um novo usuario

    var user = { /// Recebe os dados da view para serem cadastrados
      email: req.body.email,
      senha: (req.body.senha != undefined) || (req.body.senha != null) ? sha1(req.body.senha) : undefined,
      nome: req.body.nome,
      idPrivilegio: req.body.idPrivilegio,
      idStatus: 1
    }
    new Usuario(user).save().then(function (model) {
      res.json({
        status: true,
        message: 'Novo Usuario cadastrado'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Novo Usuario '
      });
    });
  });

  //Essa função remove o(s) usuário(s) selecionado(s)
  app.delete('/api/removerUsuario/:usuario_id', function (req, res) {
    Usuario.where({ id: req.params.usuario_id }).fetch().then((usuario) => {
      usuario.destroy().then(function () {
        res.json({
          status: true,
          message: 'Usuario Deletado'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Deletar Usuário'
        });
      });
    });
  });

  // Essa função edita o usuário no banco
  app.put('/api/editarUsuario/:usuario_id', function (req, res) {
    Usuario.where({ id: req.params.usuario_id }).fetch().then((usuario) => {
      usuario.save(req.body, { method: 'update', patch: true }).then(function () {
        res.json({
          status: true,
          message: 'Usuário Atualizado'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Atualizar Usuário '
        });
      });
    });
  });

  // Essa função pega um usuário no banco que vai ser editado na subtela
  app.get('/api/getUsuario/:usuario_id', function (req, res) {
    Usuario.where({ id: req.params.usuario_id }).fetch().then(function (usuario) {
      res.json(usuario);
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      res.json({
        status: false,
        message: 'Nenhum Usuario encontrado'
      });
    });
  });

  // Essa função pega um usuário no banco que vai ser editado na subtela
  app.get('/api/getUser/:usuario_id', function (req, res) {
    Usuario.where({ id: req.params.usuario_id }).fetch().then(function (usuario) {
      res.json(usuario);
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      res.json({
        status: false,
        message: 'Nenhum Usuario encontrado'
      });
    });
  });

  //Essa funçao retorna os usuários cadastrados no banco de dados com os devidos campos listados
  app.get('/api/users', function (req, res) {
    Usuario.fetchAll({ withRelated: ['privilegio'] }).then(function (usuarios) {
      res.json(usuarios);
    }).catch(function (err) {
      res.json(err);
    });
  });

  //  =================   USUÁRIO CRUD - FIM ===================

  //  =================   PRIVILEGIO CRUD - INÍCIO ===================



  //Essa funçao retorna os usuários cadastrados no banco de dados com os devidos campos listados
  app.get('/api/privilegio', function (req, res) {
    Privilegio.fetchAll().then(function (privilegios) {
      res.json(privilegios);
    }).catch(function (err) {
      res.json(err);
    });
  });

  //  =================   PRIVILEGIO CRUD - FIM ===================






  //  =================   STATUS CRUD - INÍCIO ===================

  app.get('/api/getStatus', function (req, res) { /// Retorna do banco todos os status cadastrados
    Status.fetchAll().then(function (status) {
      //console.log(  JSON.stringify(status));
      res.json(status);
    }).catch(function (err) {
      res.json(err);
    });
  });

  app.get('/api/getStat/:status_id', function (req, res) { /// Retorna do banco o status que vai ser editado na subtela de edição
    Status.where({ id: req.params.status_id }).fetch().then(function (status) {
      res.json(status);
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      res.json({
        status: false,
        message: 'Nenhum Status encontrado'
      });
    });
  });

  app.post('/api/cadastrarStatus', function (req, res) {  /// Cadastra um novo status
    new Status(req.body).save().then(function (model) {
      res.json({
        status: true,
        message: 'Novo Status cadastrado'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Novo Status '
      });
    });
  });


  app.put('/api/editarStatus/:status_id', function (req, res) { /// Edita um status a partir de seus dados

    Status.where({ id: req.params.status_id }).fetch().then((status) => {
      status.save(req.body, { method: 'update', patch: true }).then(function () {
        res.json({
          status: true,
          message: 'Status Atualizado'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Atualizar Status '
        });
      });
    });

  });


  app.delete('/api/removerStatus/:status_id', function (req, res) {   /// Deleta um determinado status a partir de seus dados

    Status.where({ id: req.params.status_id }).fetch().then((status) => {
      status.destroy().then(function () {
        res.json({
          status: true,
          message: 'Status Deletado'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Deletar Status '
        });
      });
    });
  });


  //  =================   STATUS CRUD - FIM ===================

  //  =================   OPÇAO CRUD - INÍCIO ===================

  app.get('/api/opcoes', function (req, res) { /// Retorna do banco todos os status cadastrados
    Opcao.fetchAll().then(function (opcao) {
      res.json(opcao);
    }).catch(function (err) {
      res.json(err);
    });
  });

  app.get('/api/opcoes/:opcao_id', function (req, res) { /// Retorna do banco o status que vai ser editado na subtela de edição
    Opcao.where({ id: req.params.opcao_id }).fetch().then(function (opcao) {
      res.json(opcao);
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      res.json({
        status: false,
        message: 'Nenhuma Opção encontrada'
      });
    });
  });

  app.post('/api/opcoes', function (req, res) {  /// Cadastra um novo status
    new Opcao(req.body).save().then(function (model) {
      res.json({
        status: true,
        message: 'Nova opcao cadastrada'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Nova opcao '
      });
    });
  });


  app.put('/api/opcoes/:opcao_id', function (req, res) { /// Edita um status a partir de seus dados

    Opcao.where({ id: req.params.opcao_id }).fetch().then((opcao) => {
      opcao.save(req.body, { method: 'update', patch: true }).then(function () {
        res.json({
          status: true,
          message: 'Opção Atualizada'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Atualizar Opção '
        });
      });
    });

  });


  app.delete('/api/opcoes/:opcao_id', function (req, res) {   /// Deleta um determinado status a partir de seus dados

    Opcao.where({ id: req.params.opcao_id }).fetch().then((opcao) => {
      opcao.destroy().then(function () {
        res.json({
          status: true,
          message: 'Opção Deletada'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Deletar Opção '
        });
      });
    });
  });


  //  =================   OPÇÃO CRUD - FIM ===================


  //  =================   TIPO RESPOSTA CRUD - INÍCIO ===================

  app.get('/api/tiposRespostas', function (req, res) { /// Retorna do banco todos os status cadastrados
    TipoResposta.fetchAll({ withRelated: ['opcoes'] }).then(function (tipoResposta) {
      res.json(tipoResposta);
    }).catch(function (err) {
      res.json(err);
    });
  });

  app.get('/api/tiposRespostas/:tipo_resposta_id', function (req, res) { /// Retorna do banco o status que vai ser editado na subtela de edição
    TipoResposta.where({ id: req.params.tipo_resposta_id }).fetch({ withRelated: ['opcoes'] }).then(function (tipoResposta) {
      res.json(tipoResposta);
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      res.json({
        status: false,
        message: 'Nenhum Tipo de Resposta encontrada'
      });
    });
  });

  app.post('/api/tiposRespostas', function (req, res) {  /// Cadastra um novo status
    console.log(req.body);
    var id_opcoes = req.body.id_opcoes;
    delete req.body.id_opcoes;
    new TipoResposta(req.body).save().then(function (tipoResposta) {
      tipoResposta.opcoes().attach(id_opcoes.split(','));
      res.json({
        status: true,
        message: 'Novo Tipo de Resposta cadastrada'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Novo Tipo de Resposta '
      });
    });
  });


  app.put('/api/tiposRespostas/:tipo_resposta_id', function (req, res) { /// Edita um status a partir de seus dados
    var id_opcoes = req.body.id_opcoes;
    delete req.body.id_opcoes;
    TipoResposta.where({ id: req.params.tipo_resposta_id }).fetch().then((tipoResposta) => {
      tipoResposta.opcoes().detach();
      tipoResposta.save(req.body, { method: 'update', patch: true }).then(function (tipoResposta) {
        tipoResposta.opcoes().attach(id_opcoes.split(','));
        res.json({
          status: true,
          message: 'Tipo de Resposta Atualizada'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Atualizar Tipo de Resposta '
        });
      });
    });

  });


  app.delete('/api/tiposRespostas/:tipo_resposta_id', function (req, res) {   /// Deleta um determinado status a partir de seus dados

    TipoResposta.where({ id: req.params.tipo_resposta_id }).fetch().then((tipoResposta) => {
      tipoResposta.opcoes().detach();
      tipoResposta.destroy().then(function () {
        res.json({
          status: true,
          message: 'Tipo de Resposta Deletada'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Deletar Tipo de Resposta '
        });
      });
    });
  });


  //  =================   TIPO RESPOSTA CRUD - FIM ===================

  //  =================   RESPOSTA CRUD - INÍCIO ===================

  app.get('/api/respostas', function (req, res) { /// Retorna do banco todos os status cadastrados
    Resposta.fetchAll({ withRelated: ['usuario', 'tipoResposta', 'opcao', 'programa'] }).then(function (resposta) {
      res.json(resposta);
    }).catch(function (err) {
      res.json(err);
    });
  });

  app.get('/api/respostas/:resposta_id', function (req, res) { /// Retorna do banco o status que vai ser editado na subtela de edição
    Resposta.where({ id: req.params.resposta_id }).fetch({ withRelated: ['usuario', 'tipoResposta', 'opcao', 'programa'] }).then(function (resposta) {
      res.json(resposta);
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      res.json({
        status: false,
        message: 'Nenhuma Resposta encontrada'
      });
    });
  });

  app.post('/api/respostas', function (req, res) {  /// Cadastra um novo status
    new Resposta(req.body).save().then(function (resposta) {
      res.json({
        status: true,
        message: 'Nova Resposta cadastrada'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Nova Resposta '
      });
    });
  });


  app.put('/api/respostas/:resposta_id', function (req, res) { /// Edita um status a partir de seus dados
    Resposta.where({ id: req.params.resposta_id }).fetch().then((resposta) => {
      resposta.save(req.body, { method: 'update', patch: true }).then(function (resposta) {
        res.json({
          status: true,
          message: 'Resposta Atualizada'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Atualizar Resposta '
        });
      });
    });

  });


  app.delete('/api/respostas/:resposta_id', function (req, res) {   /// Deleta um determinado status a partir de seus dados

    Resposta.where({ id: req.params.resposta_id }).fetch().then((resposta) => {
      resposta.destroy().then(function () {
        res.json({
          status: true,
          message: 'Resposta Deletada'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Deletar Tipo de Resposta '
        });
      });
    });
  });


  //  =================   RESPOSTA CRUD - FIM ===================

  //  =================   PROGRAMA CRUD - INÍCIO ===================

  app.get('/api/programas', function (req, res) { /// Retorna do banco todos os status cadastrados
    Programa.fetchAll().then(function (programa) {
      res.json(programa);
    }).catch(function (err) {
      res.json(err);
    });
  });

  app.get('/api/programas/:programa_id', function (req, res) { /// Retorna do banco o status que vai ser editado na subtela de edição
    Programa.where({ id: req.params.programa_id }).fetch().then(function (programa) {
      res.json(programa);
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      res.json({
        status: false,
        message: 'Nenhum Programa encontrada'
      });
    });
  });

  app.post('/api/programas', function (req, res) {  /// Cadastra um novo status
    new Programa(req.body).save().then(function (programa) {
      res.json({
        status: true,
        message: 'Novo Programa cadastrada'
      });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Novo Programa '
      });
    });
  });


  app.put('/api/programas/:programa_id', function (req, res) { /// Edita um status a partir de seus dados
    Programa.where({ id: req.params.programa_id }).fetch().then((programa) => {
      programa.save(req.body, { method: 'update', patch: true }).then(function (programa) {
        res.json({
          status: true,
          message: 'Programa Atualizado'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Atualizar Programa'
        });
      });
    });

  });


  app.delete('/api/programas/:programa_id', function (req, res) {   /// Deleta um determinado status a partir de seus dados

    Programa.where({ id: req.params.programa_id }).fetch().then((programa) => {
      programa.destroy().then(function () {
        res.json({
          status: true,
          message: 'Programa Deletada'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Deletar Programa'
        });
      });
    });
  });


  //  =================   PROGRAMA CRUD - FIM ===================

  //  =================   PRODUTOS CRUD - INÍCIO ===================

  app.get('/api/produtos', function (req, res) { /// Retorna do banco todos os status cadastrados
    Produto.fetchAll().then(function (produtos) {
      res.json(produtos);
    }).catch(function (err) {
      res.json(err);
    });
  });

  app.get('/api/produtos/:produto_id', function (req, res) { /// Retorna do banco o status que vai ser editado na subtela de edição
    Produto.where({ id: req.params.produto_id }).fetch().then(function (produto) {
      res.json(produto);
    }).catch(function (err) {
      console.log(JSON.stringify(err));
      res.json({
        status: false,
        message: 'Nenhum Produto encontrado'
      });
    });
  });

  app.put('/api/produtos/:produto_id', function (req, res) { /// Edita um status a partir de seus dados
    Produto.where({ id: req.params.produto_id }).fetch().then((produto) => {
      produto.save(req.body, { method: 'update', patch: true }).then(function (produto) {
        res.json({
          status: true,
          message: 'Produto Atualizado'
        });
      }).catch(function (err) {
        console.log(err);
        res.json({
          status: false,
          message: 'Erro ao Atualizar Produto'
        });
      });
    });

  });

  //  =================   PRODUTOS CRUD - FIM ===================

  // ECOMMERCE
  app.post('/api/comprar', function (req, res) {  /// Cadastra um novo status
    let valorProduto = 0;
    Produto.where({ id: req.body.id_produto }).fetch().then((produto) => {
      produto.attributes.quantidade -= 1;
      valorProduto = produto.attributes.valor;
      produto.save();
      // res.json({
      //   status: true,
      //   message: 'Quantid Compra realizada'
      // });
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Comprar Produto '
      });
    });
    Usuario.where({ id: req.body.id_usuario }).fetch().then(function (usuario) {
      usuario.attributes.saldo -= valorProduto;
      usuario.save();
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Debitar Cliente '
      });
    });
    //CRIAR TRANSAÇÃO
    res.json({
      status: true,
      message: 'Compra realizada'
    });

  });

  app.post('/api/responder', function (req, res) {  /// Cadastra um novo status
    var valorResposta = req.body.transac.valor;
    resposta = {
      usuario_id: req.body.transac.id_usuario,
      id_opcao: req.body.transac.id_opcao,
      id_tipo_resposta: req.body.transac.id_tipoResposta,
      id_programa: req.body.transac.id_programa
    };
    new Resposta(resposta).save().then(function (resposta) {
      console.log("Nova Resposta Cadastrada");
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Cadastrar Nova Resposta '
      });
    });
    Usuario.where({ id: req.body.transac.id_usuario }).fetch().then(function (usuario) {
      usuario.attributes.saldo += valorResposta;
      usuario.save();
    }).catch(function (err) {
      console.log(err);
      res.json({
        status: false,
        message: 'Erro ao Debitar Cliente '
      });
    });
    //CRIAR TRANSAÇÃO
    res.json({
      status: true,
      message: 'Valor Creditado com sucesso'
    });

  });
  //

  app.post('/api/logout', function (req, res) {   /// Deleta um determinado grupo

    req.session.user = null;
  });




  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};
