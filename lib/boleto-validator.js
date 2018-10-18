exports.convenio = convenio;
exports.boleto = boleto;

/**
 * Valida boletos do tipo convênio.
 *
 * @example Exemplo modulo 10: 83640000001-1 33120138000-2 81288462711-6 08013618155-1
 * @example Exemplo modulo 11: 85890000460-9 52460179160-5 60759305086-5 83148300001-0
 *
 * @param string codigoBarras Código de barras com ou sem mascara.
 * @param function callback função de retorno.
 */
function convenio(codigoBarras, callback) {
    codigoBarras = codigoBarras.replace(/( |-)/g, '');

    if (!/^[0-9]{48}$/.test(codigoBarras)) {
        return callback(new Error("Invalid format."), null);
    }

    var blocos = [];

    blocos[0] = codigoBarras.substr(0, 12);
    blocos[1] = codigoBarras.substr(12, 12);
    blocos[2] = codigoBarras.substr(24, 12);
    blocos[3] = codigoBarras.substr(36, 12);

    /**
     * Verifica se é o modulo 10 ou modulo 11.
     * Se o 3º digito for 6 ou 7 é modulo 10, se for 8 ou 9, então modulo 11.
     */
    var isModulo10 = ['6', '7'].indexOf(codigoBarras[2]) != -1;
    var valido = 0;

    blocos.forEach(function(bloco, index) {
        if (isModulo10) {
            modulo10(bloco, function (digitoVerificador) {
                if (digitoVerificador == bloco[bloco.length - 1])
                    valido++;
            });
        } else {
            modulo11(bloco, function (digitoVerificador) {
                if (digitoVerificador == bloco[bloco.length - 1])
                    valido++;
            });
        }
        
        if (blocos.length == index + 1) {
            return callback(null, valido == 4);
        }
    });
}

/**
 * Valida boletos do tipo fatura ou carnê.
 *
 * @example Exemplo: 42297.11504 00001.954411 60020.034520 2 68610000054659
 *
 * @param string linhaDigitavel Linha digitalizável com ou sem mascara.
 * @param function callback função de retorno.
 */
function boleto(linhaDigitavel, callback) {
    linhaDigitavel = linhaDigitavel.replace(/( |\.)/g, '');

    if (!/^[0-9]{47}$/.test(linhaDigitavel)) {
        return callback(new Error("Invalid format."), null);
    }
    var codigoBarras = 
        linhaDigitavel.substr(0, 4) + 
        linhaDigitavel.substr(32, 15) + 
        linhaDigitavel.substr(4, 5) + 
        linhaDigitavel.substr(10, 10) + 
        linhaDigitavel.substr(21, 10);

    var blocos = [];

    blocos[0] = linhaDigitavel.substr(0, 10);
    blocos[1] = linhaDigitavel.substr(10, 11);
    blocos[2] = linhaDigitavel.substr(21, 11);

    var valido = 0;
    blocos.forEach(function(bloco, index) {
        modulo10(bloco, function (digitoVerificador) {
            if (digitoVerificador == bloco[bloco.length - 1])
                valido++;
        });
        
        if (blocos.length == index + 1) {
            if (modulo11_2(codigoBarras.substr(0, 4) + codigoBarras.substr(5, 39)) != codigoBarras.substr(4, 1)) {
                return callback(null, false);
            }

            return callback(null, valido == 3);
        }
    });
}

/**
 * Cacula o módulo 10 do bloco.
 *
 * @param string bloco
 * @param function callback função de retorno.
 */
function modulo10(bloco, callback) {
    var tamanhoBloco = bloco.length - 1;

    var codigo = bloco.substr(0, tamanhoBloco);

    codigo = strrev(codigo);
    codigo = codigo.split('');

    var somatorio = 0;

    codigo.forEach(function(value, index) {
        var soma = value * (index % 2 == 0 ? 2 : 1);

        /**
         * Quando a soma tiver mais de 1 algarismo(ou seja, maior que 9),
         * soma-se os algarismos antes de somar com somatorio
         */
        if (soma > 9) {
            somatorio += soma.toString().split('').reduce(function(sum, current) {
                return parseInt(sum) + parseInt(current);
            });
        } else {
            somatorio += soma;
        }
        
        if (codigo.length == index + 1) {
            /**
             * (Math.ceil(somatorio / 10) * 10) pega a dezena imediatamente superior ao somatorio
             * (dezena superior de 25 é 30, a de 43 é 50...).
             */
            var dezenaSuperiorSomatorioMenosSomatorio = (Math.ceil(somatorio / 10) * 10) - somatorio;
        
            callback(dezenaSuperiorSomatorioMenosSomatorio);
        }
    });
}

/**
 * Cacula o módulo 11 do bloco.
 *
 * @param string bloco
 * @param function callback função de retorno.
 */
function modulo11(bloco, callback) {
    var tamanhoBloco = bloco.length - 1;
    var dezenaSuperiorSomatorioMenosSomatorio;

    var codigo = bloco.substr(0, tamanhoBloco);

    codigo = strrev(codigo);
    codigo = codigo.split('');

    var somatorio = 0;

    codigo.forEach(function(value, index) {
        somatorio += value * (2 + (index >= 8 ? index - 8 : index));
        
        if (codigo.length == index + 1) {
            var restoDivisao = somatorio % 11;

            if (restoDivisao == 0 || restoDivisao == 1) {
                dezenaSuperiorSomatorioMenosSomatorio = 0;
            } else if (restoDivisao == 10) {
                dezenaSuperiorSomatorioMenosSomatorio = 1;
            } else {
                dezenaSuperiorSomatorioMenosSomatorio = (Math.ceil(somatorio / 11) * 11) - somatorio;
            }
        
            callback(dezenaSuperiorSomatorioMenosSomatorio);
        }
    });
}

function modulo11_2(bloco) {
    var numero = bloco;
    //debug('Barra: '+numero);
    var soma  = 0;
    var peso  = 2;
    var base  = 9;
    var resto = 0;
    var contador = numero.length - 1;
    //debug('tamanho:'+contador);
    // var numero = "12345678909";
    for (var i=contador; i >= 0; i--) {
     //alert( peso );
     soma = soma + ( numero.substring(i,i+1) * peso);
     //debug( i+': '+numero.substring(i,i+1) + ' * ' + peso + ' = ' +( numero.substring(i,i+1) * peso)+' soma='+ soma);
     if (peso < base) {
      peso++;
     } else {
      peso = 2;
     }
    }
    var digito = 11 - (soma % 11);
    //debug( '11 - ('+soma +'%11='+(soma % 11)+') = '+digito);
    if (digito >  9) digito = 0;
    /* Utilizar o dígito 1(um) sempre que o resultado do cálculo padrão for igual a 0(zero), 1(um) ou 10(dez). */
    if (digito == 0) digito = 1;
    return digito;
}

function strrev(string) {
    return string.split('').reverse().join('');
}