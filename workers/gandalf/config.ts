// config.ts
export interface Env {
  WEBHOOK_SECRET: string;
  INSTALLATION_TOKEN: string;
}

export const DEFAULTS = {
  RETRY_COUNT: 3,
  TIMEOUT_MS: 5000,
};
