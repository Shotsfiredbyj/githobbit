// index.ts
import { Env } from "./config";
import {
  postComment,
  getCheckSuite,
  getPullRequest,
} from "./github";
import {
  determineTrigger,
  Trigger,
  formatResponse,
} from "./rules";

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const signature = request.headers.get("x-hub-signature-256");
    const event = request.headers.get("x-github-event");

    if (!signature || !event) {
      return new Response("Missing required headers", { status: 400 });
    }

    const bodyText = await request.clone().text();
    const verified = await verifySignature(bodyText, signature, env.WEBHOOK_SECRET);

    if (!verified) {
      return new Response("Invalid signature", { status: 401 });
    }

    const payload = JSON.parse(bodyText) as GitHubPayload;

    const trigger = determineTrigger(event, payload);

    switch (trigger) {
      case Trigger.CI_FAILURE:
        return handleCIFailure(payload, env);
      case Trigger.CI_RECOVERY:
        return handleCIRecovery(payload, env);
      case Trigger.MISSING_APPROVAL:
        return handleMissingApproval(payload, env);
      case Trigger.FORCE_PUSH:
        return handleForcePush(payload, env);
      case Trigger.FIRST_CONTRIBUTOR:
        return handleFirstContributor(payload, env);
      default:
        return new Response("No action taken", { status: 200 });
    }
  },
};

async function verifySignature(
  body: string,
  signatureHeader: string,
  secret: string,
): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );

  const signatureBytes = hexToBytes(signatureHeader.replace(/^sha256=/, ""));
  const bodyData = encoder.encode(body);

  return crypto.subtle.verify("HMAC", cryptoKey, signatureBytes, bodyData);
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    const byte = parseInt(hex.substr(i * 2, 2), 16);
    if (Number.isNaN(byte)) {
      throw new Error(`Invalid hex character at index ${i * 2}: ${hex.substr(i * 2, 2)}`);
    }
    bytes[i] = byte;
  }
  return bytes;
}

async function handleCIFailure(payload: GitHubPayload, env: Env): Promise<Response> {
  try {
    const suite = await getCheckSuite(payload, env);
    const comment = formatResponse("CI failure", suite);
    await postComment(payload, comment, env);
    return new Response("CI failure handled", { status: 200 });
  } catch (error) {
    return new Response(`CI failure handler error: ${error}`, { status: 500 });
  }
}

async function handleCIRecovery(payload: GitHubPayload, env: Env): Promise<Response> {
  try {
    const suite = await getCheckSuite(payload, env);
    const comment = formatResponse("CI recovered", suite);
    await postComment(payload, comment, env);
    return new Response("CI recovery handled", { status: 200 });
  } catch (error) {
    return new Response(`CI recovery handler error: ${error}`, { status: 500 });
  }
}

async function handleMissingApproval(payload: GitHubPayload, env: Env): Promise<Response> {
  try {
    const pr = await getPullRequest(payload, env);
    const comment = formatResponse("Missing approval", pr);
    await postComment(payload, comment, env);
    return new Response("Missing approval handled", { status: 200 });
  } catch (error) {
    return new Response(`Missing approval handler error: ${error}`, { status: 500 });
  }
}

async function handleForcePush(payload: GitHubPayload, env: Env): Promise<Response> {
  try {
    const comment = formatResponse("Force push detected", payload);
    await postComment(payload, comment, env);
    return new Response("Force push handled", { status: 200 });
  } catch (error) {
    return new Response(`Force push handler error: ${error}`, { status: 500 });
  }
}

async function handleFirstContributor(payload: GitHubPayload, env: Env): Promise<Response> {
  try {
    const pr = await getPullRequest(payload, env);
    const comment = formatResponse("Welcome first-time contributor!", pr);
    await postComment(payload, comment, env);
    return new Response("First contributor handled", { status: 200 });
  } catch (error) {
    return new Response(`First contributor handler error: ${error}`, { status: 500 });
  }
}
