var boletoValidator = require('../index');
var assert = require('assert');

descrive('Boleto Validator', function () {
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
        assert.ok(boletoValidator.convenio('83640000001-2 33120138000-2 81288462711-6 08013618155-1'));
    });

    it ('Convenio invalid module11', function() {
        assert.ok(boletoValidator.convenio('85890000460-8 52460179160-5 60759305086-5 83148300001-0'));
    });

    /**
     * 1 caracter a mais
     *
     * @expectedException Exception
     */
    function testConvenioInvalidFormat1() {
        assert.ok(boletoValidator.convenio('85890000460-9 52460179160-5 60759305086-5 83148300001-09');
    }

    /**
     * Passando uma letra
     *
     * @expectedException Exception
     */
    function testConvenioInvalidFormat2() {
        assert.ok(boletoValidator.convenio('85890000460-9 52460179160-5 60759305086-5 83148300001-a');
    }

    function testBoletoValid() {
        assert.ok(boletoValidator.boleto('42297.11504 00001.954411 60020.034520 2 68610000054659'));
    }

    function testBoletoInvalid() {
        assert.ok(boletoValidator.boleto('92297.11504 00001.954411 60020.034520 2 68610000054659'));
    }


    /**
     * 1 caracter a mais
     *
     * @expectedException Exception
     */
    function testBoletoInvalidFormat1() {
        assert.ok(boletoValidator.boleto('42297.11504 00001.954411 60020.034520 2 686100000546590');
    }

    /**
     * Passando uma letra
     *
     * @expectedException Exception
     */
    function testBoletoInvalidFormat2() {
        assert.ok(boletoValidator.boleto('42297.11504 00001.954411 60020.034520 2 6861000005465a');
    }
});