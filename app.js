//Servidor web


//Express é a framework utilizado para o Back-End.
require('dotenv').config()
const cors = require('cors');
const express = require('express');
const app = express();
var session = require('cookie-session');
//Usado para manipulação do Body.
const bodyParser = require('body-parser')
const routes = require('./routes');
//Usado para manipulação do Json.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.options('*', cors());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//Ferramenta para proteger aplicação.
const helmet = require('helmet');
app.use(helmet());

//Variavel para saída do log
const l = require('./Log.js');

var Usuario = require('./Usuario');
app.use('/api/usuario', Usuario);

//Permite Acesso externo na aplicação
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-access-token,Content-Type, Accept");
  next();
});

//Pasta utilizada para o frontEnd vai ser a pasta public
app.use('/', express.static(__dirname + '/public'));

routes(app);
// Quando quiser rodar a aplicação sem especificar a porta use esse comando
// app.listen(process.env.PORT_APP, function() {
//     console.log('Rodando porta' + process.env.PORT_APP);
// });

app.listen(process.env.PORT, "10.0.0.185", function () {
  console.log("Servidor rodando na porta %d em modo %s", this.address().port, app.settings.env);
});
