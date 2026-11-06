import k8sCoreV1Api from "./config.js";

export const createServcie = async (sandboxId: string): Promise<any> => {
  const serviceManifest = {
    metadata: {
      name: `sandbox-${sandboxId}`,
      labels: {
        app: "sandbox",
        sanboxId: sandboxId,
      },
    },
    spec: {
      selector: {
        app: "sandbox",
        sandboxId: sandboxId,
      },
      ports: [
        {
          name: "http",
          protocol: "TCP",
          port: 80,
          targetPort: 5173,
        },
      ],
        type: "ClusterIP",
    },
  }

  const res = await k8sCoreV1Api.createNamespacedService({
    namespace: "default",
    body: serviceManifest,
  });

};
