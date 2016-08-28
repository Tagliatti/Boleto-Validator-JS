var boletoValidator = require('../index');
var assert = require('assert');

describe('Boleto Validator', function () {
    it ('Convenio valid module 10', function() {
        assert.ok(boletoValidator.convenio('83640000001-1 33120138000-2 81288462711-6 08013618155-1'));
    });

    it ('Convenio valid module 11', function() {
        assert.ok(boletoValidator.convenio('85890000460-9 52460179160-5 60759305086-5 83148300001-0'));
    });

    /**
     * Teste para cobrir 100% de coverage.
     */
    it ('Convenio valid module 11 if resto divisao 10', function() {
        assert.ok(boletoValidator.convenio('85890000464-1 52460179160-5 60759305086-5 83148300001-0'));
    });

    if ('Convenio invalid module 10', function() {
        assert.equal(boletoValidator.convenio('83640000001-2 33120138000-2 81288462711-6 08013618155-1'), false);
    });

    it ('Convenio invalid module11', function() {
        assert.equal(boletoValidator.convenio('85890000460-8 52460179160-5 60759305086-5 83148300001-0'), false);
    });

    /**
     * 1 caracter a mais
     */
    it ('Convenio invalid format 1', function() {
        assert.throws(boletoValidator.convenio.bind(null, '85890000460-9 52460179160-5 60759305086-5 83148300001-09'));
    });

    /**
     * Passando uma letra
     */
    it ('Convenio invalid format 2', function() {
        assert.throws(boletoValidator.convenio.bind(null, '85890000460-9 52460179160-5 60759305086-5 83148300001-a'));
    });

    it ('Boleto valid', function() {
        assert.ok(boletoValidator.boleto('42297.11504 00001.954411 60020.034520 2 68610000054659'));
    });

    it ('Boleto invalid', function() {
        assert.equal(boletoValidator.boleto('92297.11504 00001.954411 60020.034520 2 68610000054659'), false);
    });


    /**
     * 1 caracter a mais
     */
    it ('Boleto invalid format 1', function() {
        assert.throws(boletoValidator.boleto.bind(null, '42297.11504 00001.954411 60020.034520 2 686100000546590'));
    });

    /**
     * Passando uma letra
     */
    it ('Boleto invalid format 2', function() {
        assert.throws(boletoValidator.boleto.bind(null, '42297.11504 00001.954411 60020.034520 2 6861000005465a'));
    });
});