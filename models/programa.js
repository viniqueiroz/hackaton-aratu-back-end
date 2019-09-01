var bookshelf = require('../bookshelf');


var Programa = bookshelf.Model.extend({
    tableName: 'programas',
});

module.exports = Programa;
