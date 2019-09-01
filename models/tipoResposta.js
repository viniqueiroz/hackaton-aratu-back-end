var bookshelf = require('../bookshelf');
var Opcao = require('./opcao');


var TipoResposta = bookshelf.Model.extend({
    tableName: 'tipos_respostas',

    opcoes: function () {
        return this.belongsToMany(Opcao, 'tipos_respostas_opcoes', 'id_tipos_respostas', 'id_opcoes');
    }
});

module.exports = TipoResposta;
