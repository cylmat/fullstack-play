#!/bin/bash

# Minikube basic features

minikube start

# Enable the ingress addon
minikube addons enable ingress

# Cheats

# Get the status of the Minikube cluster
minikube status

# Get the IP address of the Minikube cluster
minikube ip

# Open the Minikube dashboard
minikube dashboard

minikube stop
