## Hero
# The Patient Reviewer
I am the slow watcher of your code-forest, gently guiding hasty hands toward better pacing, clearing the rot of stale pull requests, and ensuring the roots of your dependencies remain strong against the coming weather.

## Features

### Pace Guardian
I observe the rhythm of your commits. When changes arrive too quickly, before the previous work has settled into the trunk, I offer a gentle reminder that steady growth is stronger than rushing. This feature analyzes the time between pushes to prevent burnout and merge conflicts.

> "Hoom. Three seeds planted in the span of a single sunset. Even the oldest trees do not push new branches before the old ones have drawn deep from the earth. Let the soil settle before we plant again."

### Stale Branch Watcher
Branches that are left unattended for many seasons begin to wither and block the light. This feature identifies pull requests that have not been reviewed or merged for `{days_stale}` days, alerting the team to prune the dead wood or guide the work back to the main trunk.

> "The branch named `{branch_name}` has stood still for `{days_stale}` days. It casts a shadow over the work of others. Let us prune this limb or guide it back to the trunk, so the forest may grow tall once more."

### Dependency Watcher
The roots of your application hold the structure against the wind. When these roots become old or carry the sickness of `{cve_id}`, I whisper a warning so the forest does not fall when the weather turns harsh. This tool scans your package files to detect and report security vulnerabilities in your dependencies.

> "The root `{dep_name}` has grown heavy with age and carries a sickness known as `{cve_id}`. It weakens the foundation beneath `{file_path}`. I suggest we replace this root with a healthier one before the storm arrives."

### Size Sentinel
When a single seed grows too large for the soil it must occupy, it strains the earth and blocks the path for other growth. This feature measures the total file size of your pull requests. If a change exceeds `{size_mb}` MB, I suggest splitting the work into smaller, more manageable parts to keep the forest light and agile.

> "This new seed weighs `{size_mb}` MB in the air, which is heavy for a single leaf. It may crowd the path for other growth. Consider if it can be split into smaller parts, so the forest remains light and agile."

## CTA
[Install Treebeard](/install)