#!/bin/bash
cd client
yarn build
cd ..
ibmcloud cf push bee-travels-wizard
