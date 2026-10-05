Create PHP
===

-------------
## GENERAL ##
-------------

**https://getcomposer.org**
```shell
composer init
composer create-project vendor/package my-app
```

--------------
## SPECIFIC ##
--------------

**https://cakephp.org**
```shell
composer create-project --prefer-dist cakephp/app:~5.0 my-app
```

**https://codeigniter.com**
```shell
composer create-project codeigniter4/appstarter my-app
```

**https://laminas.dev** (Zend)
```shell
composer create-project laminas/laminas-mvc-skeleton my-app
```

**https://laravel.com**
```shell
composer create-project laravel/laravel my-app
composer global require laravel/installer && laravel new my-app
```

**https://symfony.com**
```shell
composer create-project symfony/skeleton my-app
symfony new my-app --webapp
```

**https://yiiframework.com**
```shell
composer create-project yiisoft/app my-app
```

------------
## API / MICRO ##
------------

**https://api-platform.com** REST/GraphQL API
```shell
composer create-project symfony/skeleton my-api
cd my-api && composer require api
```

**https://slimframework.com**
```shell
composer create-project slim/slim-skeleton my-app
```
