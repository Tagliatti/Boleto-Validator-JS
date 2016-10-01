const boletoValidator = require('../index');
const assert = require('assert');

describe('Boleto Validator', function () {
    it ('Convenio valid module 10', function(done) {
        boletoValidator.convenio('83640000001-1 33120138000-2 81288462711-6 08013618155-1', function (err, isValid) {
            assert.equal(isValid, true);
            done();
        });
    });

    it ('Convenio valid module 11', function(done) {
        boletoValidator.convenio('85890000460-9 52460179160-5 60759305086-5 83148300001-0', function (err, isValid) {
            assert.equal(isValid, true);
            done();
        });
    });

    /**
     * Teste para cobrir 100% de coverage.
     */
    it ('Convenio valid module 11 if resto divisao 10', function(done) {
        boletoValidator.convenio('85890000464-1 52460179160-5 60759305086-5 83148300001-0', function (err, isValid) {
            assert.equal(isValid, true);
            done();
        });
    });

    if ('Convenio invalid module 10', function(done) {
        boletoValidator.convenio('83640000001-2 33120138000-2 81288462711-6 08013618155-1', function (err, isValid) {
            assert.equal(isValid, false);
            done();
        });
    });

    it ('Convenio invalid module11', function(done) {
        boletoValidator.convenio('85890000460-8 52460179160-5 60759305086-5 83148300001-0', function (err, isValid) {
            assert.equal(isValid, false);
            done();
        });
    });

    /**
     * 1 caracter a mais
     */
    it ('Convenio invalid format 1', function(done) {
        boletoValidator.convenio('85890000460-9 52460179160-5 60759305086-5 83148300001-09', function (err, isValid) {
            assert.notEqual(err, null);
            assert.equal(isValid, null);
            done();
        });
    });

    /**
     * Passando uma letra
     */
    it ('Convenio invalid format 2', function(done) {
        boletoValidator.convenio('85890000460-9 52460179160-5 60759305086-5 83148300001-a', function (err, isValid) {
            assert.notEqual(err, null);
            assert.equal(isValid, null);
            done();
        });
    });

    it ('Boleto valid', function(done) {
        boletoValidator.boleto('42297.11504 00001.954411 60020.034520 2 68610000054659', function (err, isValid) {
            assert.equal(isValid, true);
            done();
        });
    });

    it ('Boleto invalid', function(done) {
        boletoValidator.boleto('92297.11504 00001.954411 60020.034520 2 68610000054659', function (err, isValid) {
            assert.equal(isValid, false);
            done();
        });
    });

    /**
     * 1 caracter a mais
     */
    it ('Boleto invalid format 1', function(done) {
        boletoValidator.boleto('42297.11504 00001.954411 60020.034520 2 686100000546590', function (err, isValid) {
            assert.notEqual(err, null);
            assert.equal(isValid, null);
            done();
        });
    });

    /**
     * Passando uma letra
     */
    it ('Boleto invalid format 2', function(done) {
        boletoValidator.boleto('42297.11504 00001.954411 60020.034520 2 6861000005465a', function (err, isValid) {
            assert.notEqual(err, null);
            assert.equal(isValid, null);
            done();
        });
    });
});