const boletoValidator = require('./index');

exports.convenio = convenio;
exports.boleto = boleto;

function convenio(codigoBarras) {
    return new Promise(function (resolve, reject) {
        boletoValidator.convenio(codigoBarras, callback(resolve, reject));
    });
}

function boleto(linhaDigitavel) {
    return new Promise(function (resolve, reject) {
        boletoValidator.boleto(linhaDigitavel, callback(resolve, reject));
    });
}

function callback(resolve, reject) {
    return function (err, isValid) {
        if (err) return reject(err);

        resolve(isValid);
    };
}