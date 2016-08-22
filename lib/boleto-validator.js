exports.convenio = convenio;
exports.boleto = boleto;

/**
 * Valida boletos do tipo convênio.
 *
 * @example Exemplo modulo 10: 83640000001-1 33120138000-2 81288462711-6 08013618155-1
 * @example Exemplo modulo 11: 85890000460-9 52460179160-5 60759305086-5 83148300001-0
 *
 * @param string codigoBarras Código de barras com ou sem mascara.
 * @throws Error Caso o formato do boleto não atender as especificações.
 * @return boolean Retorna se é válido ou não.
 */
function convenio(codigoBarras) {
    codigoBarras = codigoBarras.replace(/( |-)/g, '');

    if (!/^[0-9]{48}/.test(codigoBarras)) {
        throw new Error("Invalid format.");
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
    var isModulo10 = in_array(codigoBarras[2], [6, 7]);
    var valido = 0;

    blocos.forEach(function(bloco) {
        if (isModulo10 && modulo10(bloco)) {
            valido++;
        } else if (modulo11(bloco)) {
            valido++;
        }
    });

    return valido == 4;
}

/**
 * Valida boletos do tipo fatura ou carnê.
 *
 * @example Exemplo: 42297.11504 00001.954411 60020.034520 2 68610000054659
 *
 * @param string linhaDigitavel Linha digitalizável com ou sem mascara.
 * @throws Error Caso o formato do boleto não atender as especificações.
 * @return boolean Retorna se é válido ou não.
 */
function boleto(linhaDigitavel) {
    linhaDigitavel = linhaDigitavel.str_replace(/( |\.)/g, '');

    if (!/^[0-9]{47}/.test(linhaDigitavel)) {
        throw new Error("Invalid format.");
    }

    var blocos = [];

    blocos[0] = linhaDigitavel.substr(0, 10);
    blocos[1] = linhaDigitavel.substr(10, 11);
    blocos[2] = linhaDigitavel.substr(21, 11);

    var valido = 0;
    blocos.forEach(function(bloco) {
        if (modulo10(bloco)) {
            valido++;
        }
    });

    return valido == 3;
}

/**
 * Cacula o módulo 10 do bloco.
 *
 * @param string bloco
 * @return boolean Retorna se é válido ou não.
 */
function modulo10(bloco) {
    var tamanhoBloco = bloco.length - 1;
    var digitoVerificador = bloco[tamanhoBloco];

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
            somatorio += array_sum(str_split(soma));
        } else {
            somatorio += soma;
        }
    });

    /**
     * (Math.ceil(somatorio / 10) * 10) pega a dezena imediatamente superior ao somatorio
     * (dezena superior de 25 é 30, a de 43 é 50...).
     */
    var dezenaSuperiorSomatorioMenosSomatorio = (Math.ceil(somatorio / 10) * 10) - somatorio;

    return dezenaSuperiorSomatorioMenosSomatorio == digitoVerificador;
}

/**
 * Cacula o módulo 11 do bloco.
 *
 * @param string bloco
 * @return boolean Retorna se é válido ou não.
 */
function modulo11(bloco) {
    var tamanhoBloco = bloco.length - 1;
    var digitoVerificador = bloco[tamanhoBloco];
    var dezenaSuperiorSomatorioMenosSomatorio;

    var codigo = bloco.substr(0, tamanhoBloco);

    codigo = strrev(codigo);
    codigo = codigo.split('');

    var somatorio = 0;

    codigo.forEach(function(value, index) {
        somatorio += value * (2 + (index >= 8 ? index - 8 : index));
    });

    var restoDivisao = somatorio % 11;

    if (restoDivisao == 0 || restoDivisao == 1) {
        dezenaSuperiorSomatorioMenosSomatorio = 0;
    } else if (restoDivisao == 10) {
        dezenaSuperiorSomatorioMenosSomatorio = 1;
    } else {
        dezenaSuperiorSomatorioMenosSomatorio = (Math.ceil(somatorio / 11) * 11) - somatorio;
    }

    return dezenaSuperiorSomatorioMenosSomatorio == digitoVerificador;
}

function strrev(string) {
    return string.split('').reverse().join('');
}