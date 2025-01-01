# Kubernetes Configuration for `evohealth-backend`

This repository contains the necessary configuration files to deploy the `evohealth-backend` application on a Kubernetes cluster using **Kind** (Kubernetes in Docker). Below are the instructions to set up and run the cluster, apply the Kubernetes manifests, and access the application.

## Prerequisites

Before you begin, ensure that you have the following installed:

- **Docker**: Used to create containers and run the local Kubernetes cluster.
- **Kind**: Kubernetes IN Docker, used to create a local Kubernetes cluster.
- **kubectl**: Kubernetes command-line tool for interacting with your cluster.

## Setup Instructions

### 1. Create the Kubernetes Cluster

Run the following command to create a local Kubernetes cluster using **Kind** and the provided `kind.yml` configuration:

```bash
kind create cluster --name local --config kind.yml
```

This will create a cluster with the following components:

- **Control-plane** node (the main node of the cluster)
- **Worker** nodes (where your Pods will run)
- A port mapping for **NodePort** service on port `30007`

### 2. Deploy the Application

After the cluster is created, apply the Kubernetes deployment and service manifests to deploy your application.

1. **Apply the Deployment Manifest**:
   The `deployment.yml` file describes the `evohealth-backend` deployment with 3 replicas.

   Run the following command to deploy your backend application:

   ```bash
   kubectl apply -f deployment.yml
   ```

   This will create a deployment with the following configuration:

   - **3 replicas** of the `evohealth-backend` Pod.
   - Pods running the image `rashid023/evohealth-backend:latest`.
   - The application is exposed on **container port 80**.

2. **Apply the Service Manifest**:
   The `service.yml` file defines a **NodePort** service that exposes your application to external traffic on port `30007`.

   Run the following command to expose the backend service:

   ```bash
   kubectl apply -f service.yml
   ```

   This will create the following:

   - A **Service** named `evohealth-backend-service`.
   - The service is accessible externally via **port 30007** on the node's IP.

### 3. Access the Application

Once the cluster is up and the application is deployed, you can access the application using the **Node IP** and the **NodePort**.

1. **Access the Application**:

   The application will be accessible via the following URL:

   ```bash
   http://localhost:30007
   ```

## Cleanup

To delete the Kubernetes cluster and remove the resources:

```bash
kind delete cluster --name local
```

This will clean up the resources and delete the cluster.

---
