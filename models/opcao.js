var bookshelf = require('../bookshelf');


var Opcao = bookshelf.Model.extend({
    tableName: 'opcoes',
});

module.exports = Opcao;
