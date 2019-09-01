exports.count_fluxo = function(fluxo) {
    var moment = require('moment');
    moment.locale('pt-BR'); // 'fr'

    fluxo_array = fluxo.toArray()
    
    length = fluxo_array.length;
    results = [];

    for (var i = 0; i < length; i++) {
        classeId = fluxo_array[i]['attributes'].idClasse;
        
        mes = moment(fluxo_array[i]['attributes'].data).format('M');
        nomeMes = moment(fluxo_array[i]['attributes'].data).format('MMM');
        
        var fluxoCaixa= {
            name : fluxo_array[i]['relations']['classe']['attributes']['classe'] ,
            idClasse : classeId,
            total: 0,
            meses:[]}
            for(var j =1 ; j<13;j++){
                nomeDoMes = moment.monthsShort(j-1);
                fluxoCaixa.meses[j]={id: j , nome:nomeDoMes, valorTotal: 0 , qtd : 0};
            }
        if(results[classeId]){
        fluxoCaixa = results[classeId];
        fluxoCaixa.total += fluxo_array[i]['attributes'].valor;
         if(results[classeId].meses[mes]){
             fluxoCaixa.meses[mes] = {id: parseInt(mes) , nome:nomeMes, valorTotal: results[classeId].meses[mes].valorTotal + fluxo_array[i]['attributes'].valor , qtd : results[classeId].meses[mes].qtd + 1};

         }else{

            fluxoCaixa.meses[mes] = {id: parseInt(mes) , nome:nomeMes, valorTotal: fluxo_array[i]['attributes'].valor , qtd : 1}; 
         }
        }else{

            fluxoCaixa.meses[mes] = {id: parseInt(mes) , nome:nomeMes, valorTotal: fluxo_array[i]['attributes'].valor , qtd : 1};
            fluxoCaixa.total = fluxo_array[i]['attributes'].valor;
        } 
            
       results[classeId] = fluxoCaixa;
    }
    resultado = new Array();
    // for(var i= 0; i< results.length ; i++){
    //     if(results[i] == null){
    //         console.log(i);
    //         results.splice(i,1);
    //     }
    // }
    results.forEach(element => {
        resultado.push(element);
    });
    return  resultado;
};