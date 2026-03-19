// github.ts
import { Env } from "./config";

interface RepoInfo {
  owner: string;
  repo: string;
}

interface GitHubPayload {
  action: string;
  repository: {
    full_name: string;
  };
  pull_request?: {
    number: number;
    author_association?: string;
    requested_reviewers?: unknown[];
  };
  check_suite?: {
    id: number;
    conclusion?: string;
  };
  forced?: boolean;
  issue?: {
    number: number;
  };
  head_commit?: {
    id: string;
    message: string;
    author: {
      name: string;
      email: string;
    };
  };
}

export async function postComment(
  payload: GitHubPayload,
  body: string,
  env: Env,
): Promise<void> {
  const { owner, repo, issue_number } = extractRepoInfo(payload);
  
  if (!issue_number) {
    throw new Error("Could not determine issue/PR number from payload");
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}/comments`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.INSTALLATION_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }
}

export async function getCheckSuite(
  payload: GitHubPayload,
  env: Env,
): Promise<Record<string, unknown>> {
  const { owner, repo, check_suite_id } = extractCheckSuiteInfo(payload);
  
  if (!check_suite_id) {
    throw new Error("Check suite ID not found in payload");
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/check-suites/${check_suite_id}`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.INSTALLATION_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function getPullRequest(
  payload: GitHubPayload,
  env: Env,
): Promise<Record<string, unknown>> {
  const { owner, repo, pull_number } = extractPullRequestInfo(payload);
  
  if (!pull_number) {
    throw new Error("Pull request number not found in payload");
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.INSTALLATION_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

function extractRepoInfo(payload: GitHubPayload): RepoInfo & { issue_number: number } {
  const repo = payload.repository;
  const [owner, name] = repo.full_name.split("/");
  
  const issue_number = payload.issue?.number ?? payload.pull_request?.number;
  
  if (!issue_number) {
    throw new Error("Missing issue or pull request number in payload");
  }
  
  return { owner, repo: name, issue_number };
}

function extractCheckSuiteInfo(payload: GitHubPayload): RepoInfo & { check_suite_id: number } {
  const repo = payload.repository;
  const [owner, name] = repo.full_name.split("/");
  
  const check_suite = payload.check_suite;
  const check_suite_id = check_suite?.id;
  
  if (!check_suite_id) {
    throw new Error("Missing check suite ID in payload");
  }
  
  return { owner, repo: name, check_suite_id };
}

function extractPullRequestInfo(payload: GitHubPayload): RepoInfo & { pull_number: number } {
  const repo = payload.repository;
  const [owner, name] = repo.full_name.split("/");
  
  const pull_number = payload.pull_request?.number;
  
  if (!pull_number) {
    throw new Error("Missing pull request number in payload");
  }
  
  return { owner, repo: name, pull_number };
}
