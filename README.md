# Boleto Validator

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

A instalação desta biblioteca pode ser feita utilizando o Composer.

    $ composer require tagliatti/boleto-validator

# Exemplos de uso

### Validando convênio
```php
<?php
require_once('./vendor/autoload.php');

use Tagliatti\BoletoValidator\BoletoValidator;

// Com mascara
BoletoValidator::convenio("83640000001-1 33120138000-2 81288462711-6 08013618155-1");

// Com outro tipo de mascara
BoletoValidator::convenio("83640000001 1 33120138000 2 81288462711 6 08013618155 1");

// Sem mascara
BoletoValidator::convenio("836400000011331201380002812884627116080136181551");
```
### Validando fatura ou carnê
```php
<?php
require_once('./vendor/autoload.php');

use Tagliatti\BoletoValidator\BoletoValidator;

// Com mascara
BoletoValidator::boleto("42297.11504 00001.954411 60020.034520 2 68610000054659");

// Sem mascara
BoletoValidator::boleto("42297115040000195441160020034520268610000054659");
```
# Licença de uso
Esta biblioteca segue os termos de uso da [The MIT License (MIT)](https://opensource.org/licenses/mit-license.php)