// rules.ts
import {
  postComment,
  listDependencies,
  Dependency,
} from "./github";
import { STALE_DAYS, DEP_SIZE_THRESHOLD } from "./config";
import { PRPayload, WorkerEnv } from "./types";

// Simulated cache for rapid-fire detection
const recentPrTimestamps = new Map<string, number[]>();

export async function handlePullRequest(
  event: PRPayload,
  env: WorkerEnv
): Promise<Response> {
  const { repository, pull_request } = event;
  const [owner, repo] = repository.full_name.split("/");
  const token = env.INSTALLATION_TOKEN;

  // 1. Rapid-fire detection
  if (await isRapidFire(owner, repo, pull_request.user.login, pull_request.created_at)) {
    await handleRapidFirePR(owner, repo, pull_request, token);
    return new Response("Rapid-fire handled", { status: 200 });
  }

  // 2. Stale detection
  if (isStale(pull_request.updated_at)) {
    await handleStalePR(owner, repo, pull_request, token);
    return new Response("Stale PR handled", { status: 200 });
  }

  // 3. Dependency checks
  const deps = await listDependencies(owner, repo, pull_request.head.sha, token);

  const large = deps.find((d) => d.sizeBytes > DEP_SIZE_THRESHOLD);
  if (large) {
    await handleLargeDependency(owner, repo, pull_request, large, token);
    return new Response("Large dependency handled", { status: 200 });
  }

  const vulnerable = deps.find((d) => d.cveIds && d.cveIds.length > 0);
  if (vulnerable) {
    await handleVulnerableDependency(
      owner,
      repo,
      pull_request,
      vulnerable,
      token
    );
    return new Response("Vulnerable dependency handled", { status: 200 });
  }

  return new Response("No action needed", { status: 200 });
}

export async function handleRapidFirePR(
  owner: string,
  repo: string,
  pr: PRPayload["pull_request"],
  token: string
): Promise<void> {
  const comment = `🌳 Hey @${pr.user.login}, I see you're on a roll! Remember, quality beats quantity—let's give each PR its moment to shine.`;
  await postComment(owner, repo, pr.number, comment, token);
}

export async function handleStalePR(
  owner: string,
  repo: string,
  pr: PRPayload["pull_request"],
  token: string
): Promise<void> {
  const comment = `🪵 This branch has been quiet for a while. A friendly nudge to get some eyes on it before it gathers moss.`;
  await postComment(owner, repo, pr.number, comment, token);
}

export async function handleLargeDependency(
  owner: string,
  repo: string,
  pr: PRPayload["pull_request"],
  dep: Dependency,
  token: string
): Promise<void> {
  const sizeKB = (dep.sizeBytes / 1024).toFixed(1);
  const comment = `📦 The dependency **${dep.name}@${dep.version}** is quite hefty (${sizeKB} KB). Consider trimming it to keep the tree lean.`;
  await postComment(owner, repo, pr.number, comment, token);
}

export async function handleVulnerableDependency(
  owner: string,
  repo: string,
  pr: PRPayload["pull_request"],
  dep: Dependency,
  token: string
): Promise<void> {
  const cves = dep.cveIds?.join(", ") || "unknown";
  const comment = `⚠️ **${dep.name}@${dep.version}** has known vulnerabilities (${cves}). Let's patch before we grow any rot.`;
  await postComment(owner, repo, pr.number, comment, token);
}

/* Business logic helpers */

async function isRapidFire(
  owner: string,
  repo: string,
  user: string,
  createdAt: string
): Promise<boolean> {
  const key = `${owner}:${repo}:${user}`;
  const now = new Date(createdAt).getTime();
  const oneHourAgo = now - 60 * 60 * 1000;

  // Initialize cache if missing
  if (!recentPrTimestamps.has(key)) {
    recentPrTimestamps.set(key, []);
  }

  const timestamps = recentPrTimestamps.get(key)!;
  
  // Filter out old timestamps
  const recent = timestamps.filter((t) => t > oneHourAgo);
  
  // If we already have 2+ PRs in the last hour, this is rapid fire
  if (recent.length >= 2) {
    recent.push(now);
    return true;
  }

  recent.push(now);
  return false;
}

function isStale(updatedAt: string): boolean {
  const updated = new Date(updatedAt).getTime();
  const now = new Date().getTime();
  const diffDays = (now - updated) / (1000 * 60 * 60 * 24);
  return diffDays >= STALE_DAYS;
}
