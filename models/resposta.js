var bookshelf = require('../bookshelf');
var TipoResposta = require('./tipoResposta');
var Opcao = require('./opcao');
var Usuario = require('./usuario');
var Programa = require('./programa');


var Resposta = bookshelf.Model.extend({
    tableName: 'respostas',
    usuario: function () {
        return this.belongsTo(Usuario, 'usuario_id');
    },
    tipoResposta: function () {
        return this.belongsTo(TipoResposta, 'id_tipo_resposta');
    },
    opcao: function () {
        return this.belongsTo(Opcao, 'id_opcao');
    },
    programa: function () {
        return this.belongsTo(Programa, 'id_programa');
    }
});

module.exports = Resposta;
