#!/bin/bash

### JWT ###

# Clé privée RSA de 2048 bits
openssl genpkey -algorithm RSA \
  -pkeyopt rsa_keygen_bits:2048 \
  -out private.pem

# Clé publique correspondante
openssl pkey -in private.pem -pubout -out public.pem
