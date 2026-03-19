// config.ts
// Note: In production, these values are injected via Cloudflare Workers environment bindings.
// This file serves as a type-safe accessor.

export const getWebhookSecret = (env: { WEBHOOK_SECRET: string }): string => {
  if (!env.WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET environment variable is missing");
  }
  return env.WEBHOOK_SECRET;
};

export const getInstallationToken = (env: { INSTALLATION_TOKEN: string }): string => {
  if (!env.INSTALLATION_TOKEN) {
    throw new Error("INSTALLATION_TOKEN environment variable is missing");
  }
  return env.INSTALLATION_TOKEN;
};

export const STALE_DAYS = 7; // days without activity
export const DEP_SIZE_THRESHOLD = 50_000; // bytes
