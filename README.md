# Boleto Validator

[![NPM Version](https://img.shields.io/npm/v/boleto-validator.svg)](https://npmjs.org/package/boleto-validator)
[![Build Status](https://img.shields.io/travis/Tagliatti/Boleto-Validator-JS/master.svg)](https://travis-ci.org/Tagliatti/Boleto-Validator-JS)
[![Coverage Status](https://img.shields.io/codecov/c/github/Tagliatti/Boleto-Validator-JS.svg)](https://codecov.io/github/Tagliatti/Boleto-Validator-JS)

Lib para validação de código de barras e linha digitalizável presente em boletos bancários. Compatível com Node 4.

Ela valida boletos do tipo convênio (conta de luz, água, IPTU...), que são compostos por 4 blocos de números:

![convénio](http://i.imgur.com/CJApi3T.jpg)

Exemplos:<br/>
**83640000001-1 33120138000-2 81288462711-6 08013618155-1**<br/>
ou<br/>
**85890000460-9 52460179160-5 60759305086-5 83148300001-0**

Também é possível validar boletos do tipo fatura ou carnê, que são compostos por 5 blocos de números (linha digitalizável):

![linha digitalizável](http://i.imgur.com/WImdusq.jpg)

Exemplo:
**42297.11504 00001.954411 60020.034520 2 68610000054659**

# Instalação

    $ npm install boleto-validator

# Exemplos de uso

### Validando convênio
```js
var boletoValidator = require('boleto-validator');

// Com mascara
boletoValidator.convenio("83640000001-1 33120138000-2 81288462711-6 08013618155-1", function(err, isValid) {
	// true
});

// Com outro tipo de mascara
boletoValidator.convenio("83640000001 1 33120138000 2 81288462711 6 08013618155 1", function(err, isValid) {
	// true
});

// Sem mascara
boletoValidator::convenio("836400000011331201380002812884627116080136181551", function(err, isValid) {
	// true
});
```

**Utilizando Promise**
```js
var boletoValidator = require('boleto-validator/promise');

boletoValidator.convenio("83640000001-1 33120138000-2 81288462711-6 08013618155-1")
	.then(function(isValid) {
		// true
	})
	.catch(function(err) {
		// error
	});
```

### Validando fatura ou carnê
```js
var boletoValidator = require('boleto-validator');

// Com mascara
boletoValidator.boleto("42297.11504 00001.954411 60020.034520 2 68610000054659", function(err, isValid) {
	// true
});

// Sem mascara
boletoValidator.boleto("42297115040000195441160020034520268610000054659", function(err, isValid) {
	// true
});
```

**Utilizando Promise**
```js
var boletoValidator = require('boleto-validator/promise');

boletoValidator.boleto("42297.11504 00001.954411 60020.034520 2 68610000054659")
	.then(function(isValid) {
		// true
	})
	.catch(function(err) {
		// error
	});
```

# Licença de uso
Esta biblioteca segue os termos de uso da [The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)