// github.ts
import { Dependency, PullRequest } from "./types";

export async function postComment(
  owner: string,
  repo: string,
  issueNumber: number,
  body: string,
  token: string
): Promise<void> {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  });

  if (!response.ok) {
    throw new Error(`Failed to post comment: ${response.statusText}`);
  }
}

export async function getPullRequest(
  owner: string,
  repo: string,
  number: number,
  token: string
): Promise<PullRequest> {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${number}`;
  const resp = await fetch(url, {
    headers: { Authorization: `token ${token}` },
  });
  if (!resp.ok) throw new Error("Failed to fetch PR");
  return resp.json();
}

// Mock implementation: In a real scenario, this would parse lockfiles via GitHub API
export async function listDependencies(
  owner: string,
  repo: string,
  sha: string,
  token: string
): Promise<Dependency[]> {
  // Simulate fetching dependencies based on SHA
  // In production, fetch package-lock.json or yarn.lock and parse
  const mockDeps: Dependency[] = [
    {
      name: "lodash",
      version: "4.17.21",
      sizeBytes: 50000,
      cveIds: [],
    },
    {
      name: "axios",
      version: "1.6.0",
      sizeBytes: 120000,
      cveIds: [],
    },
    {
      name: "vulnerable-lib",
      version: "1.0.0",
      sizeBytes: 5000,
      cveIds: ["CVE-2023-12345"],
    },
  ];
  
  // Simulate a large dependency check
  if (repo.includes("large")) {
    mockDeps.push({
      name: "huge-payload",
      version: "0.0.1",
      sizeBytes: 150000, // Exceeds 50k threshold
      cveIds: [],
    });
  }

  return mockDeps;
}
