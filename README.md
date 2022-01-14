# Microservices
This is the basic Post Comment Project that facilaltes the comment moderation feature .
You can find kubernetes config fies in infra folder .
Circle-CI is integrated.
Skaffoled faciliates in immediate updatation to the kubernetes cluster as the source code gets changed .

## Make sure to create docker images for all service if running with kubectl 
 cd <service_folder>
 docker build -t <service_name> .
 
### Make sure you have installed minikube on your machine (Linux)
  you can edit etc/hosts file , incase to make request to post.com on your machine
### Get you minikube ip
  minikube ip
## code /etc/hosts/
### Add the following in hosts file 
  <minikube ip> post.com
  
### Run using Kubectl (Make sure you have started minikube)
  kubectl apply -f /infra/k8s/

### Run using skaffold (this will auto generate docker images)
  skaffold run dev
 
![example workflow](https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/<WORKFLOW_FILE>/badge.svg)

### Code Version: 
 v.0.0.1

