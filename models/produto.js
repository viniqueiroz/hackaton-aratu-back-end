var bookshelf = require('../bookshelf');

var Produto = bookshelf.Model.extend({
    tableName: 'produtos',
});

module.exports = Produto;
