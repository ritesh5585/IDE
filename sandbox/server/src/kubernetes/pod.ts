import k8sCoreV1Api from "./config.js";

export async function createPod(sandboxId: string): Promise<any> {
  const podManifest = {
    metadata: {
      name: `sandbox-${sandboxId}`,
      labels: {
        app: "sandbox",
        sandboxId: sandboxId,
      },
    },
    spec: {
      containers: [
        {
          image: "template",
          imagePullPolicy: "IfNotPresent",
          name: "sandbox-container",
          ports: [
            {
              containerPort: 5173,
              name: "http",
            },
          ],
          resources: {
            limits: {
              cpu: "500m",
              memory: "1Gi",
            },
            requests: {
              cpu: "250m",
              memory: "512Mi",
            },
          },
        },
      ],
    },
  };

  const res = await k8sCoreV1Api.createNamespacedPod({
    namespace: "default",
    body: podManifest,
  });

//   console.log(`Pod created: ${res.body}`);
  return res
}
