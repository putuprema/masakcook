"use client";

import { faro, getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

export function FrontendObservability() {
  if (faro.api) {
    return null;
  }

  try {
    initializeFaro({
      url: 'https://faro-collector-prod-ap-southeast-2.grafana.net/collect/b09a72e82908d0ceea45b1e5411bae6a',
      app: {
        name: 'MasakCook',
        namespace: "masakcook",
        version: '1.0.0',
        environment: 'production'
      },

      instrumentations: [
        // Mandatory, omits default instrumentations otherwise.
        ...getWebInstrumentations(),

        // Tracing package to get end-to-end visibility for HTTP requests.
        new TracingInstrumentation(),
      ],
    });
  } catch (e) {
    return null;
  }

  return null;
}
