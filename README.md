# Divolte Kustomization files

## Pre requisites

- [Kustomize](https://kustomize.io/)
- [Tilt](https://tilt.dev)
- Kafka instance. An example would be the [IBM Event Streams](https://cloud.ibm.com/catalog/services/event-streams)

## Running it locally

Make sure to install tilt

1. Create a new topic `divolte` in kafka
1. Copy the file `k8s/base/secrets/kafka.secret.env.example` to `k8s/base/secrets/kafka.secret.env` and populate the values
1. Run `tilt up`
1. Open `http://localhost:8290` to see the default divolte demo page.
