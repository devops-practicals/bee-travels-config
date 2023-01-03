#!/bin/bash
SERVICE_VERSION=1
oc apply -f openshift/ibm-z/destination-v1-deploy.yaml
oc apply -f openshift/ibm-z/destination-v1-service.yaml
sleep 5s
oc apply -f openshift/ibm-z/hotel-v1-deploy.yaml
oc apply -f openshift/ibm-z/hotel-v1-service.yaml
sleep 5s
oc apply -f openshift/ibm-z/carrental-v1-deploy.yaml
oc apply -f openshift/ibm-z/carrental-v1-service.yaml
sleep 5s
oc apply -f openshift/ibm-z/currencyexchange-deploy.yaml
oc apply -f openshift/ibm-z/currencyexchange-service.yaml
sleep 5s
sed "s/\${SERVICE_VERSION}/${SERVICE_VERSION}/" openshift/ibm-z/ui-deploy.yaml > openshift/ibm-z/ui-deploy-temp.yaml
oc apply -f openshift/ibm-z/ui-deploy-temp.yaml
rm -rf openshift/ibm-z/ui-deploy-temp.yaml
oc apply -f openshift/ibm-z/ui-service.yaml
oc status