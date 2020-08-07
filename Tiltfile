# -*- mode: Python -*

# `Disables Tilt’s snapshots feature, hiding it from the UI.
disable_snapshots()

# only allow these k8s contexts. This is to ensure we don't accidentally run
# tilt in prod cluster
allow_k8s_contexts(['docker-desktop', 'minikube'])

k8s_yaml(kustomize('./k8s/dev'))

include('./kafka-consumer/Tiltfile')


k8s_resource('divolte-collector-deployment', port_forwards=8290)
