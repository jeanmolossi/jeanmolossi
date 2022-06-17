#!/bin/bash
ACTION=$1
GHP_TOKEN=$2
PASSWORD=$3

configPath="../configs"
baseVarFile="base.tfvars"
varFile="vars.tfvars"
services="vpc open-search amplify"

echo "Running terraform $ACTION"
echo "GHP_TOKEN: $GHP_TOKEN"
echo "PASSWORD: $PASSWORD"

if [[ "$GHP_TOKEN" == "" ]]; then
    echo "GHP_TOKEN is empty"
    exit 1
fi

if [[ "$PASSWORD" == "" ]]; then
    echo "PASSWORD is empty"
    exit 1
fi

function init {
    for service in $services; do
        if [ ! -d "$service/.terraform" ]; then
            echo "Initializing $service"
            cd $service
            terraform init -backend-config="$configPath/$baseVarFile"
            cd ..
        fi
    done
}

function plan {
    for service in $services; do
        echo "planning $service"
        cd $service
        terraform plan \
            -var-file="$configPath/$baseVarFile" \
            -var-file="$configPath/$varFile" \
            -var "ghp_token=$GHP_TOKEN" \
            -var "kibana_password=$PASSWORD" \
            -out="$service.plan"
        cd ..
    done
}

function apply {
    for service in $services; do
        echo "applying $service"
        cd $service
        terraform apply \
            -var-file="$configPath/$baseVarFile" \
            -var-file="$configPath/$varFile" \
            -var "ghp_token=$GHP_TOKEN" \
            -var "kibana_password=$PASSWORD" \
            -auto-approve
        cd ..
    done
}

function destroy {
    invertedServices=$(echo $services | sed 's/ /\n/g' | tac | sed 's/\n/ /g')
    echo $invertedServices
    for service in $invertedServices; do
        echo "destroying $service"
        cd $service
        terraform destroy \
            -var-file="$configPath/$baseVarFile" \
            -var-file="$configPath/$varFile" \
            -var "ghp_token=$GHP_TOKEN" \
            -var "kibana_password=$PASSWORD" \
            -auto-approve
        cd ..
    done
}

function clearOut {
    for service in $services; do
        printf "\n"
        echo "clearing out from $service"
        cd $service
        if [ -f "$service.plan" ]; then
            rm "$service.plan"
        fi
        cd ..
    done
}

if [[ $ACTION == "init" ]]; then
    init
    exit 0
fi

if [[ $ACTION == "plan" ]]; then
    plan
    exit 0
fi

if [[ $ACTION == "apply" ]]; then
    apply
    clearOut
    exit 0
fi

if [[ $ACTION == "destroy" ]]; then
    destroy
    clearOut
    exit 0
fi

echo "Usage: ./run.sh <init|plan|apply|destroy>"
