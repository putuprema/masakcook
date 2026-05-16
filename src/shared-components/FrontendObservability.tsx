"use client";

import {
  faro,
  getWebInstrumentations,
  initializeFaro,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export function FrontendObservability() {
  if (faro.api) {
    return null;
  }

  try {
    initializeFaro({
      url:
        process.env.NEXT_PUBLIC_FARO_COLLECTOR_URL ||
        "https://faro-collector-prod-ap-southeast-2.grafana.net/collect/b09a72e82908d0ceea45b1e5411bae6a",
      app: {
        name: "MasakCook",
        namespace: "masakcook",
        version: "1.0.0",
        environment: process.env.NEXT_PUBLIC_APP_ENV || "production",
      },

      instrumentations: [
        ...getWebInstrumentations(),
        new TracingInstrumentation(),
      ],
    });
  } catch (_e) {
    return null;
  }

  return null;
}
