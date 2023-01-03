# Bee Travels - Config/Deployment

> ***NOTE:*** Bee Travels is a work in progress and this README will update as progress is made

![](readme-images/logo.jpg)

## About

Bee Travels in a polyglot demo microservice travel booking web application with this repo housing the configuration files necessary for deployment of the application.

This application is used to demonstrate key capabilities of Kubernetes, Openshift, Istio, Knative and many other cloud native applications. It also uses best practices in the software development lifecycle and widley used open source technologies.

## Deploy to the Cloud

With Bee Travels being a polyglot web application with microservices, this allows for flexibility and many options when choosing what and where to deploy this application. 

For a simplified deployment experiece, check out the deployment wizard in the `/wizard` directory.

Bee Travels currently supports deploying to the Cloud using the following configurations:

* [Helm](#helm)
* [K8s](#k8s)
* [Knative](#knative)
* [OpenShift](#openshift)

### Helm

TODO

### K8s

#### Prerequisites

* Provisioned Kubernetes Cluster
* [kubectl CLI](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* Set the `KUBECONFIG` environment variable to your cluster's kubeconfig file

#### Deployment

Run the following command:

```sh
git clone https://github.com/bee-travels/config.git
cd config
./deploy-k8s.sh
```

### Knative

TODO

### OpenShift

#### Prerequisites

* Provisioned OpenShift Cluster
* [oc CLI](https://www.okd.io/download.html)

#### Deployment

From your OpenShift dashboard, locate your login command as seen in the below screenshot and run the command in a terminal window. The login command should look like this: `oc login --token=<YOUR_TOKEN> --server=<YOUR_SERVER>`


![](readme-images/openshift-login.jpg)

##### v1

Options:
* -c = cluster name on IBM Cloud (No flag value = no route created by default)
* -p = want to create new project (Y/y values)

```sh
git clone https://github.com/bee-travels/config.git
cd config
./deploy-openshift-v1.sh -c <CLUSTER_NAME> -p y
```

For deploying v1 to OpenShift on IBM Z (LinuxOne Community Cloud) run the following script:

```sh
git clone https://github.com/bee-travels/config.git
cd config
./deploy-openshift-v1-z.sh
```

##### v2

Options:
* -c = cluster name on IBM Cloud (No flag value = no route created by default)
* -p = want to create new project (Y/y values)
* -d = database operator (postgres/mongodb/couchdb values)

```sh
git clone https://github.com/bee-travels/config.git
cd config
./deploy-openshift-v2.sh -c <CLUSTER_NAME> -p y -d <DATABASE>
```

## License

This application is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this application are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
