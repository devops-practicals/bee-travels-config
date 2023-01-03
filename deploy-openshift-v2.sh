#!/bin/bash
# -c = cluster name
# -p = want to create new project (Y/y values)
# -d database (postgres/mongodb/couchdb values)

SERVICE_VERSION=2
CREATE_PROJECT="n"
INGRESS_SUBDOMAIN=""
DATABASE=""
while getopts c:p:d: option
	do
		case "${option}"
		in
			c) INGRESS_SUBDOMAIN=$(ibmcloud ks cluster get ${OPTARG} | grep -i "Ingress Subdomain" | awk '{print $3}');;
            p) CREATE_PROJECT=${OPTARG};;
            d) DATABASE=${OPTARG};;
		esac
done

if [ "$CREATE_PROJECT" = "Y" ] || [ "$CREATE_PROJECT" = "y" ]; then
    oc apply -f openshift/oc-project.yaml
    sleep 2s
fi

oc project bee-travels

oc apply -f openshift/destination-v2-deploy.yaml -f openshift/destination-v2-service.yaml
oc apply -f openshift/hotel-v2-deploy.yaml -f openshift/hotel-v2-service.yaml
oc apply -f openshift/carrental-v2-deploy.yaml -f openshift/carrental-v2-service.yaml
oc apply -f openshift/flight-v2-deploy.yaml -f openshift/flight-v2-service.yaml
oc apply -f openshift/currencyexchange-deploy.yaml -f openshift/currencyexchange-service.yaml
sed "s/\${SERVICE_VERSION}/${SERVICE_VERSION}/" openshift/ui-deploy.yaml > openshift/ui-deploy-temp.yaml
oc apply -f openshift/ui-deploy-temp.yaml -f openshift/ui-service.yaml
rm -rf openshift/ui-deploy-temp.yaml

if [ "$DATABASE" = "postgres" ]; then
    oc apply -f openshift/postgres/pg-csv.yaml -f openshift/postgres/pg-sub.yaml -f openshift/postgres/pg-og.yaml -f openshift/postgres/pg-deploy.yaml -f openshift/postgres/pg-db.yaml 
fi

if [ "$INGRESS_SUBDOMAIN" != "" ]; then
    sed "s/\${INGRESS_SUBDOMAIN}/${INGRESS_SUBDOMAIN}/" openshift/ui-route.yaml > openshift/ui-route-temp.yaml
    oc apply -f openshift/ui-route.yaml
    rm -rf openshift/ui-route-temp.yaml
fi

oc status