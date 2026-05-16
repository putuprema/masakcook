import { trace } from "@opentelemetry/api";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  const current = trace.getActiveSpan();

  // set server-timing header with traceparent
  if (current) {
    response.headers.set(
      "server-timing",
      `traceparent;desc="00-${current.spanContext().traceId}-${current.spanContext().spanId}-01"`,
    );
  }
  return response;
}
