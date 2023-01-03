#!/bin/bash
# -c = cluster name
# -p = want to create new project (Y/y values)

SERVICE_VERSION=1
CREATE_PROJECT="n"
INGRESS_SUBDOMAIN=""
while getopts c:p:r: option
	do
		case "${option}"
		in
			c) INGRESS_SUBDOMAIN=$(ibmcloud ks cluster get ${OPTARG} | grep -i "Ingress Subdomain" | awk '{print $3}');;
            p) CREATE_PROJECT=${OPTARG};;
            r) CREATE_ROUTE=${OPTARG};;
		esac
done

if [ "$CREATE_PROJECT" = "Y" ] || [ "$CREATE_PROJECT" = "y" ]; then
    oc apply -f openshift/oc-project.yaml
    sleep 2s
fi

oc project bee-travels

oc apply -f openshift/destination-v1-deploy.yaml -f openshift/destination-v1-service.yaml
oc apply -f openshift/hotel-v1-deploy.yaml -f openshift/hotel-v1-service.yaml
oc apply -f openshift/carrental-v1-deploy.yaml -f openshift/carrental-v1-service.yaml
oc apply -f openshift/currencyexchange-deploy.yaml -f openshift/currencyexchange-service.yaml
sed "s/\${SERVICE_VERSION}/${SERVICE_VERSION}/" openshift/ui-deploy.yaml > openshift/ui-deploy-temp.yaml
oc apply -f openshift/ui-deploy-temp.yaml -f openshift/ui-service.yaml
rm -rf openshift/ui-deploy-temp.yaml

if [ "$INGRESS_SUBDOMAIN" != "" ]; then
    sed "s/\${INGRESS_SUBDOMAIN}/${INGRESS_SUBDOMAIN}/" openshift/ui-route.yaml > openshift/ui-route-temp.yaml
    oc apply -f openshift/ui-route.yaml
    rm -rf openshift/ui-route-temp.yaml
fi

oc status