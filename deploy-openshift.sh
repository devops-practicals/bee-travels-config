#!/bin/bash
dockerTag=node-540d5182fe943a3ad87c559dd7fcce025cec9833
oc new-project bee-travels
oc project bee-travels
oc new-app --docker-image beetravels/destination-v1:$dockerTag -e HOST_IP=destination-v1 -e LOG_LEVEL=info -e PORT=9001 -e SCHEME=http
oc new-app --docker-image beetravels/hotel-v1:$dockerTag -e HOST_IP=hotel-v1 -e LOG_LEVEL=info -e PORT=9101 -e SCHEME=http
oc new-app --docker-image beetravels/carrental-v1:$dockerTag -e HOST_IP=carrental-v1 -e LOG_LEVEL=info -e PORT=9102 -e SCHEME=http
oc new-app --docker-image beetravels/currencyexchange:$dockerTag -e HOST_IP=carrental-v1 -e PORT=9201 -e SCHEME=http
oc new-app --docker-image beetravels/ui:$dockerTag -e PORT=9000 -e NODE_ENV=production -e DESTINATION_URL=http://destination-v1:9001 -e HOTEL_URL=http://hotel-v1:9101 -e CAR_URL=http://carrental-v1:9102 -e CURRENCY_EXCHANGE_URL=http://currencyexchange:9201
oc expose svc ui
oc status