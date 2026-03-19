// index.ts
import { handlePullRequest } from "./rules";
import { WEBHOOK_SECRET } from "./config";
import { PRPayload } from "./types";

export default {
  async fetch(
    request: Request,
    env: { WEBHOOK_SECRET: string; INSTALLATION_TOKEN: string }
  ): Promise<Response> {
    const signature = request.headers.get("x-hub-signature-256");
    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    const body = await request.clone().arrayBuffer();
    const isValid = await verifySignature(body, signature, env.WEBHOOK_SECRET);
    if (!isValid) {
      return new Response("Invalid signature", { status: 401 });
    }

    const payload = await request.json();
    if (!isPullRequestEvent(payload)) {
      return new Response("Unsupported event", { status: 400 });
    }

    return handlePullRequest(payload, env);
  },
};

async function verifySignature(
  body: ArrayBuffer,
  signatureHeader: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const signatureBytes = hexToBytes(signatureHeader.replace(/^sha256=/, ""));
  // CRITICAL FIX: crypto.subtle.verify expects ArrayBuffer, not Uint8Array
  return crypto.subtle.verify("HMAC", key, signatureBytes.buffer, body);
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

function isPullRequestEvent(obj: unknown): obj is PRPayload {
  if (typeof obj !== "object" || obj === null) return false;
  const p = obj as Record<string, unknown>;
  return (
    typeof p.action === "string" &&
    typeof p.repository === "object" &&
    p.repository !== null &&
    "full_name" in p.repository &&
    typeof (p.repository as Record<string, unknown>).full_name === "string" &&
    typeof p.pull_request === "object" &&
    p.pull_request !== null &&
    "number" in p.pull_request &&
    typeof (p.pull_request as Record<string, unknown>).number === "number"
  );
}
