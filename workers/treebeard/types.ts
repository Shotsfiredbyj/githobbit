// types.ts
export interface PRPayload {
  action: string;
  repository: {
    full_name: string;
  };
  pull_request: {
    number: number;
    created_at: string;
    updated_at: string;
    head: {
      sha: string;
      ref: string;
    };
    base: {
      ref: string;
    };
    user: {
      login: string;
    };
  };
  sender: {
    login: string;
  };
}

export interface Dependency {
  name: string;
  version: string;
  sizeBytes: number;
  cveIds?: string[];
}

export interface PullRequest {
  number: number;
  head: { sha: string };
  created_at: string;
  updated_at: string;
  user: { login: string };
}

export interface WorkerEnv {
  WEBHOOK_SECRET: string;
  INSTALLATION_TOKEN: string;
}
