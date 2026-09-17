#!/bin/bash

# https://minikube.sigs.k8s.io/docs/tutorials/

echo "https://minikube.sigs.k8s.io/docs/tutorials"
echo

# install
# curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
# sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64

minikube config set driver docker
minikube profile list
kubectl cluster-info

######################
### KUBERNETES 101 ###
#######################

minikube start --cpus=2 --memory=3900
minikube status
minikube stop
minikube delete --all --purge
