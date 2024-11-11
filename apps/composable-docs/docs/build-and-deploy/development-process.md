---
sidebar_position: 1
---

# Development Process

## Branch & Commit Strategy

The following branch prefixes are recommended:

* **`feat`** - Any new feature
* **`fix`** - Any bug fix
* **`chore`** - Any other type of task that is not a new feature or bug fix, for example, updating the README

The branch must contain the jira ticket key and a description of the task. Use a verb when defining the name of the task with the following format:

`<prefix>/<JIRA-ticket>_<verb>_<short-description-hyphenated>`

For examples:

* `feat/XYX-1000_implement_reset_password_flow`
* `fix/XYZ-2000_fix_broken_contentful_link`
* `chore/XYZ-3333_update_readme`

For best-practices for commit messages, see [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) section.
