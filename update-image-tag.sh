#!/bin/bash
TAG=""
INGRESS=""
SECRET=""

#delete this

while getopts t:i:s: option
do
  case "${option}"
  in
    t) TAG=${OPTARG};;
    i) INGRESS=${OPTARG};;
    s) SECRET=${OPTARG};;
  esac
done

[ -z "$TAG" ] && echo "Missing required -t flag for updating tags"  && exit 1

echo "Updating k8s yaml"
for filename in $(ls -1 k8s/ | grep deploy)
do
  echo "Replacing tag for ${filename}"
  image=$(cut -d "-" -f 1 <<< $filename)
  PREV=$(cat k8s/$filename | grep image: | awk '{print $3}' | cut -d ":" -f 2)
#  echo "Image : ${image}"
  echo "Version Upgraded : ${PREV} -> ${TAG}"
  sed -i "" "s#beetravels/${image}:${PREV}#beetravels/${image}:${TAG}#g" k8s/$filename
done

echo "Update helm yaml"
filename="values.yaml"
tag=$(cat helm/bee-travels/${filename} | grep tag | awk '{print $2}')
sed -i "" "s#${tag}#${TAG}#g" helm/bee-travels/$filename

echo "Update helm version"
filename="Chart.yaml"
version=$(cat helm/bee-travels/${filename} | grep version | awk '{print $2}')
a=( ${version//./ } )
((a[2]++))
VERSION=${a[0]}.${a[1]}.${a[2]}
sed -i "" "s#version: ${version}#version: ${VERSION}#g" helm/bee-travels/$filename

if [ ! -z $INGRESS ]; then
  echo "Updating k8s ingress and secret"
  filename=$(ls -1 k8s/ | grep ingress)
  echo "Replacing ingress and secret for ${filename}"
  cat k8s/$filename | grep hosts: -A 1 | while read line
  do
    if [[ $line != *"host"* ]] ;then
      ingress=$(cut -d " " -f 2 <<< $line)
      sed -i "" "s#${ingress}#${INGRESS}#g" k8s/$filename
    fi
  done

  echo "Updating helm ingress and secret"
  filename="values.yaml"
  ingress=$(cat helm/bee-travels/${filename} | grep host | awk '{print $2}')
  sed -i "" "s#${ingress}#${INGRESS}#g" helm/bee-travels/$filename
fi

if [ ! -z $SECRET ]; then
  filename=$(ls -1 k8s/ | grep ingress)
  secret=$(cat k8s/$filename | grep secretName | cut -d ":" -f 2)
  sed -i "" "s#${secret}# ${SECRET}#g" k8s/$filename

  filename="values.yaml"
  secret=$(cat helm/bee-travels/${filename} | grep secret | awk '{print $2}')
  sed -i "" "s#${secret}#${SECRET}#g" helm/bee-travels/$filename
fi

