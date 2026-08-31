##############
# DOCKER PHP #
# @see https://hub.docker.com/_/php
#
# Use this Dockerfile as a base template,
# (Un)comment extensions for own application.
#
# docker buildx -f ".docker/symfony/php.Dockerfile" --pull -t fs-php:latest ".docker"
##############

### Debian GNU/Linux 11 (bullseye) ###

FROM php:8.4 AS core

# root:root is 0

ENV UID=1000
ENV GID=1000
ENV NODE_VERSION=20
ARG DEBIAN_FRONTEND=noninteractive

# procps for use pkill
RUN apt update && apt install -y ca-certificates curl git procps vim zip

### Common and build (https://packages.debian.org) ###

RUN apt install -y \
    apt-utils \
    bzip2 \
    gnupg \
    sqlite3 \
    wget

# install dependencies for phpize and pecl ($PHPIZE_DEPS: autoconf, dpkg-dev, file, g++, gcc, libc-dev, make, pkg-config, re2c)
RUN echo $PHPIZE_DEPS
RUN apt-get install -y $PHPIZE_DEPS



###############
### SYM-CLI ###
###############

# curl -sS https://get.symfony.com/cli/installer | bash

RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN wget https://get.symfony.com/cli/installer -O - | bash \
    && mv /root/.symfony5/bin/symfony /usr/local/bin/symfony \
    && rm -rf /root/.symfony5

RUN symfony completion bash | tee /etc/bash_completion.d/symfony



################
### composer ###
################

# Composer install
COPY ./symfony/composer.sh /tmp/composer.sh
RUN chmod +x /tmp/composer.sh && /tmp/composer.sh



###########
### NVM ###
###########

SHELL ["/bin/bash", "-c"]
ENV NVM_DIR="/usr/local/nvm"
ENV NODE_VERSION=lts/*
RUN mkdir -p "$NVM_DIR"
RUN curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Install NVM and Node in one layer
# RUN curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash && \
RUN . "$NVM_DIR/nvm.sh" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm install --lts && \
    nvm use --lts && \
    nvm alias default 'lts/*' && \
    nvm use default && \
    # Make node/npm accessible to all users
    ln -sf "$NVM_DIR/versions/node/$(nvm version)/bin/node" /usr/local/bin/node && \
    ln -sf "$NVM_DIR/versions/node/$(nvm version)/bin/npm" /usr/local/bin/npm && \
    ln -sf "$NVM_DIR/versions/node/$(nvm version)/bin/npx" /usr/local/bin/npx && \
    chmod a+x /usr/local/bin/node /usr/local/bin/npm /usr/local/bin/npx

# Add NVM sourcing for all interactive shells
RUN echo 'export NVM_DIR="/usr/local/nvm"' >> /etc/bash.bashrc && \
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /etc/bash.bashrc

# Verify acces from another shell instance
# RUN nvm --version && node -v && npm -v
RUN bash -ic "nvm --version && node -v && npm -v"



#####################
### DB extensions ###
#####################

# zlib1g-dev    # Required for memcached
# libmemcached-dev   # Required for memcached PECL

RUN apt install -y \
    libsqlite3-dev \
    libpq-dev


# dba: Database (DBA) functions provide a uniform way to access various database formats
RUN docker-php-ext-install -j$(nproc) dba
RUN docker-php-ext-install -j$(nproc) pdo_mysql
RUN docker-php-ext-install -j$(nproc) pdo_pgsql
RUN docker-php-ext-install -j$(nproc) pdo_sqlite

# ODBC (https://www.php.net/manual/en/odbc.installation.php)
# install unixodbc-dev for ODBC support and tell on config
# (exists: unixODBC, iODBC, ibm-db2, or generic)
# RUN apt-get install -y unixodbc unixodbc-dev
# RUN docker-php-ext-configure odbc --with-unixODBC && docker-php-ext-install -j$(nproc) pdo_odbc

RUN yes '' | pecl install redis


# RUN docker-php-ext-install -j$(nproc) pdo



##################
# PHP extensions #
##################


##################
# Already installed extensions "php -m" :
# ctype curl date dom fileinfo filter ftp hash iconv json libxml mbstring mysqlnd openssl pcre pdo pdo_sqlite Phar
# posix readline Reflection session SimpleXML sodium spl sqlite3 standard tokenizer xml xmlreader xmlwriter zlib
#
# Available extensions with "docker-php-ext-install" :
# bcmath bz2 calendar ctype curl dba dl_test dom enchant exif ffi fileinfo filter ftp gd gettext gmp hash iconv
# imap intl json ldap mbstring mysqli oci8 odbc opcache pcntl pdo pdo_dblib pdo_firebird pdo_mysql pdo_oci pdo_odbc
# pdo_pgsql pdo_sqlite pgsql phar posix pspell readline reflection session shmop simplexml snmp soap sockets sodium
# spl standard sysvmsg sysvsem sysvshm tidy tokenizer xml xmlreader xmlwriter xsl zend_test zip
#
# Extensions installed with docker-php-ext automatically created
# /usr/local/etc/php/conf.d/docker-php-ext-***.ini
#
# Configuration, ex: docker-php-ext-configure gd --with-jpeg
##################

# @see https://www.php.net/manual/en/refs.basic.other.php

RUN apt install -y \
    libicu-dev \
    libsodium-dev \
    libxslt1-dev \
    libzip-dev

# bcmath: Binary Calculator extension (BCMath) provides support for arbitrary precision mathematics
# ctype: allow to check for character classes in strings (https://www.php.net/manual/en/book.ctype.php)
# intl: Internationalization extension (Intl) provides capabilities for software internationalization
# odbc: Open Database Connectivity (ODBC) extension for PHP, allows you to connect to databases using the ODBC interface
# pcntl: Process Control support for PHP, allows you to spawn and manage processes (for Ratchet)
# session: Session support for PHP, allows you to manage user sessions (https://www.php.net/manual/en/book.session.php)
# sockets: Sockets support for PHP, allows you to create and manage network sockets (https://www.php.net/manual/en/book.sockets.php)
# sodium: Sodium is a modern, easy-to-use software library for encryption, decryption, signatures, password hashing and more
# spl: Standard PHP Library (SPL) is a collection of interfaces and classes that are meant to solve standard problems
RUN docker-php-ext-install -j$(nproc) bcmath
RUN docker-php-ext-install -j$(nproc) ctype
RUN docker-php-ext-install -j$(nproc) fileinfo
RUN docker-php-ext-install -j$(nproc) gettext
RUN docker-php-ext-install -j$(nproc) intl
RUN docker-php-ext-install -j$(nproc) pcntl
RUN docker-php-ext-install -j$(nproc) posix
RUN docker-php-ext-install -j$(nproc) session
RUN docker-php-ext-install -j$(nproc) sockets
RUN docker-php-ext-install -j$(nproc) sodium
RUN docker-php-ext-install -j$(nproc) xml
RUN docker-php-ext-install -j$(nproc) xsl
RUN docker-php-ext-install -j$(nproc) zip

# RUN docker-php-ext-install -j$(nproc) ldap
# RUN docker-php-ext-configure odbc && docker-php-ext-install -j$(nproc) odbc
# RUN docker-php-ext-install -j$(nproc) phar
# RUN docker-php-ext-install -j$(nproc) soap
# RUN docker-php-ext-configure standard && docker-php-ext-install -j$(nproc) standard
# RUN docker-php-ext-install -j$(nproc) tokenizer

# RUN docker-php-ext-install -j$(nproc) opcache (integrated in php 8.5, no need to install)
# RUN docker-php-ext-install -j$(nproc) spl (integrated, no need to install)



### PECL extensions ###

### CAUTION : Use PIE (PHP Installer for Extensions) ###
### https://github.com/php/pie                       ###
### AS PECL is DEPRECATED !!!                        ###

RUN pecl channel-update pecl.php.net

### IF PECL DOESN'T INSTALL JUST LOG IN CONTAINER AS ROOT AND MANUALLY INSTALL IT ###




### (http://pecl.php.net/packages.php)
### Use "pecl list-all" for all supported modules.
### -of : --override --force 
### Add extension=*** in php.ini for each pecl's extensions
# RUN apt install -y libmcrypt-dev libpcre3-dev
# Brotli est une bibliothèque de compression libre à source ouverte
# Libpcre est une bibliothèque de fonctions pour les expressions régulières Perl

# Pre-install pear dependencies for pecl extensions
RUN apt install -y \
    libmcrypt-dev 

### starred: redis, memcached, mongodb, imagick, xdebug, pcov, xhprof, ast, ds, psr, phalcon, mcrypt, oauth
#crypto #env #http_message #imagick #imap #ingres #lua #v8js

# ast: Abstract Syntax Tree (AST) extension for PHP
# doc: https://phalcon.io/en-us
# doc: https://wiki.swoole.com/en (https://www.php.net/manual/fr/book.swoole.php)

RUN echo "\n" | pecl install -of apcu
RUN echo "\n" | pecl install -of ast
RUN echo "\n" | pecl install -of ds
RUN echo "\n" | pecl install -of mcrypt
RUN echo "\n" | pecl install -of psr


############################
### Coverage & Profiling ###
############################


### @see https://xdebug.org ###

RUN pecl install -of \
    # pcov
    xdebug
    # xhprof


# Clean up pear cache
RUN pear clear-cache


##############
### APACHE ###
##############

# RUN a2enmod rewrite



### USER ###

RUN echo 'root:root' | chgpasswd
RUN addgroup user -gid ${GID}
RUN adduser user --uid ${UID} --gid ${GID} --gecos GECOS --disabled-password
USER user:user


WORKDIR /var/www/application




##########
# SWOOLE #
##########

FROM core AS swoole

USER root:root

WORKDIR /tmp
RUN apt install -y libbrotli-dev libssl-dev
RUN echo 'y' | pecl install -of swoole
RUN echo "extension=swoole.so" > /usr/local/etc/php/conf.d/swoole.ini

USER user:user
WORKDIR /var/www/application




# HEAVY install ! #

# Can take a LOOOONG time (~~10min each) to build and install !

# Use sudo apt-get install -y php-swoole instead
# Use pecl install swoole 2>&1 | tee swoole-build.log to debug
# RUN apt install -y libbrotli-dev libssl-dev
# RUN echo "\n" | pecl install -of phalcon -j$(nproc)
# RUN echo "\n" | pecl install -of swoole -j$(nproc)
# RUN apt install -y php-phalcon
# RUN docker-php-ext-install -j$(nproc) swoole
# RUN apt install -y php-swoole


# RUN apt install -y libmemcached-dev zlib1g-dev
# RUN echo 'yes' | pecl install -of memcached
# RUN echo 'yes' | pecl install mongodb






### Ssh ###

# Use following to send an ssh key on remote host
# ssh-copy-id -i ~/.ssh/id_ed25519.pub user@remote-host.com
# RUN rm -f ~/.ssh/id_ed25519*
# RUN apt install -y ssh && \
#     ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/id_ed25519 -N "" && \
#     eval "$(ssh-agent -s)" && \
#     ssh-add ~/.ssh/id_ed25519

#############
### Clean ###
#############
# RUN apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*





### NODE ###

# SHELL ["/bin/bash", "-c"]
# # tell bash to load .bashrc manually
# ENV BASH_ENV ~/.bashrc
# # needed by volta() function
# ENV VOLTA_HOME /home/user/.volta
# # make sure packages managed by volta will be in PATH
# ENV PATH /home/user/.volta/bin:$PATH

# RUN curl https://get.volta.sh | bash

# RUN volta install node@${NODE_VERSION}



### GD ###

# RUN apt install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
#     && docker-php-ext-configure gd --with-freetype --with-jpeg \
#     && docker-php-ext-install -j$(nproc) gd \
#     && php -r "var_dump(gd_info());"

