const boletoValidator = require('../promise');
const assert = require('assert');

describe('Boleto Validator', function () {
    it ('Convenio valid module 10', function() {
        return boletoValidator.convenio('83640000001-1 33120138000-2 81288462711-6 08013618155-1')
            .then(function (isValid) {
                assert.equal(isValid, true);
            });
    });

    it ('Convenio valid module 11', function() {
        return boletoValidator.convenio('85890000460-9 52460179160-5 60759305086-5 83148300001-0')
            .then(function (isValid) {
                assert.equal(isValid, true);
            });
    });

    /**
     * Teste para cobrir 100% de coverage.
     */
    it ('Convenio valid module 11 if resto divisao 10', function() {
        return boletoValidator.convenio('85890000464-1 52460179160-5 60759305086-5 83148300001-0')
            .then(function (isValid) {
                assert.equal(isValid, true);
            });
    });

    if ('Convenio invalid module 10', function() {
        return boletoValidator.convenio('83640000001-2 33120138000-2 81288462711-6 08013618155-1')
            .then(function (isValid) {
                assert.equal(isValid, false);
            });
    });

    it ('Convenio invalid module11', function() {
        return boletoValidator.convenio('85890000460-8 52460179160-5 60759305086-5 83148300001-0')
            .then(function (isValid) {
                assert.equal(isValid, false);
            });
    });

    /**
     * 1 caracter a mais
     */
    it ('Convenio invalid format 1', function() {
        return boletoValidator.convenio('85890000460-9 52460179160-5 60759305086-5 83148300001-09')
            .catch(function (err) {
                assert.notEqual(err, null);
            });
    });

    /**
     * Passando uma letra
     */
    it ('Convenio invalid format 2', function() {
        return boletoValidator.convenio('85890000460-9 52460179160-5 60759305086-5 83148300001-a')
            .catch(function (err) {
                assert.notEqual(err, null);
            });
    });

    it ('Boleto valid', function() {
        return boletoValidator.boleto('42297.11504 00001.954411 60020.034520 2 68610000054659')
            .then(function (isValid) {
                assert.equal(isValid, true);
            });
    });

    it ('Boleto invalid', function() {
        return boletoValidator.boleto('92297.11504 00001.954411 60020.034520 2 68610000054659')
            .then(function (isValid) {
                assert.equal(isValid, false);
            });
    });

    /**
     * 1 caracter a mais
     */
    it ('Boleto invalid format 1', function() {
        return boletoValidator.boleto('42297.11504 00001.954411 60020.034520 2 686100000546590')
            .catch(function (err) {
                assert.notEqual(err, null);
            });
    });

    /**
     * Passando uma letra
     */
    it ('Boleto invalid format 2', function() {
        return boletoValidator.boleto('42297.11504 00001.954411 60020.034520 2 6861000005465a')
            .catch(function (err) {
                assert.notEqual(err, null);
            });
    });
});