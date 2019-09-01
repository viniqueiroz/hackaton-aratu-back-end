var express = require('express');
var config = require('./config/config');
var jwt = require('jsonwebtoken');
var Usuario = require('./models/usuario');

var RoutUsuario = express.Router();

var sha1 = require('sha1');


RoutUsuario.post('/auth', function(req, res) {
  var r = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;
  var email = req.body.email.match(r);
  var senha = sha1(req.body.senha);
  if(email != null) {
    email = email[0];
      Usuario.where({ email: email }).fetch({withRelated: ['privilegio']}).then(function(usuario) {
      var user = null;
      if(usuario) {
        user = {
          id: usuario.get('id'),
          nome: usuario.get('nome'),
          idPrivilegio: usuario.attributes.idPrivilegio,
          role: usuario.related('privilegio').get('nomePrivilegio')
        };
      }
      if(!user) {
        res.json({
          status: false,
          message: 'Usuário Não Encontrado'
        });
      } else if(user) {

        //verifica se a senha esta correta
        if(usuario.get('senha') != senha) {

          res.json({
            status: false,
            message: 'Senha Incorreta'
          });
        } else {
          // Se a conta for encontrada e a senha bater com a verdadeira
          // Cria uma token
          var token = jwt.sign(user, config.secret, {
            expiresIn: 60 * 60 * 7  // Expira em 7 horas
          });
          res.json({
            status: true,
            message: 'Token Gerada',
            token: token,
            user
          });
        }
      }
    })
  } else {
    res.json({
      status: false,
      message: 'Usuário Não Encontrado'
    });
  }
});

RoutUsuario.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

RoutUsuario.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {
    // Faz verificação da Token
    jwt.verify(token, config.secret, function(err, token_decoded) {
      if(err) {
        // Se a verificação falhar
        //console.log(req.headers['x-access-token']);
        return res.json({
          status: false,
          message: "Falha para autentificar a Token."
        });
      } else {
        //console.log("token Ok")
        // Token é verificada, Salva as informações
        req.token = token_decoded;
        req.user = token_decoded.user;
        req.authenticated = true;
        next();
      }

    });
  }
});

module.exports = RoutUsuario;
