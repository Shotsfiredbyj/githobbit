// rules.ts
export enum Trigger {
  CI_FAILURE = "ci_failure",
  CI_RECOVERY = "ci_recovery",
  MISSING_APPROVAL = "missing_approval",
  FORCE_PUSH = "force_push",
  FIRST_CONTRIBUTOR = "first_contributor",
}

interface PayloadContext {
  event: string;
  payload: GitHubPayload;
}

export function determineTrigger(event: string, payload: GitHubPayload): Trigger {
  if (event === "check_suite") {
    const conclusion = payload.check_suite?.conclusion;
    if (conclusion === "failure") return Trigger.CI_FAILURE;
    if (conclusion === "success") return Trigger.CI_RECOVERY;
  }

  if (event === "pull_request") {
    if (payload.action === "opened") {
      if (payload.pull_request?.author_association === "FIRST_TIME_CONTRIBUTOR") {
        return Trigger.FIRST_CONTRIBUTOR;
      }
    }
    if (payload.action === "synchronize" && payload.forced) {
      return Trigger.FORCE_PUSH;
    }
    // Simplified logic for missing approval: triggered on 'ready_for_review' or 'edited' without reviews
    if (payload.action === "ready_for_review" || payload.action === "edited") {
      const reviewers = payload.pull_request?.requested_reviewers;
      if (!reviewers || reviewers.length === 0) {
        return Trigger.MISSING_APPROVAL;
      }
    }
  }

  return Trigger.CI_FAILURE; // Default fallback
}

export function formatResponse(trigger: string, context: unknown): string {
  const prefix = `🛡️ Gandalf: `;
  
  switch (trigger) {
    case "CI failure":
      return `${prefix}CI check failed. Please review the logs and fix the errors.`;
    case "CI recovered":
      return `${prefix}CI is green again! Great job fixing the issue.`;
    case "Missing approval":
      return `${prefix}This PR requires approval before merging. Please request a review.`;
    case "Force push detected":
      return `${prefix}Force push detected on a protected branch. History has been rewritten.`;
    case "Welcome first-time contributor!":
      return `${prefix}Welcome to the team! We're excited to see your first contribution.`;
    default:
      return `${prefix}Event received: ${trigger}`;
  }
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
}
