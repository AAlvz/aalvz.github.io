---
resource: true
categories: [DevOps-Cases]
title: One Engineer, Twelve Agents, Ninety-One Merge Requests
description: How I moved about a hundred repositories onto a new security-scanning pipeline with a crew of AI agents and a human review gate.
---

The security team turned on a centrally enforced scanning pipeline for every repository. About a hundred repos needed a CI change before it could scan them properly, spread across fourteen teams.

Instead of fixing them one by one, I ran the migration with one orchestrator session, twelve AI agents and fifty-one small background scripts. The rule that kept it safe: nothing reached a team without my review.

**[Open the case study →](/case-studies/security-migration/)**

It has a one-minute film and three interactive pages:

- **[The agents](/case-studies/security-migration/roster.html):** one card per agent, with its instructions, what it got, what it did and what it handed on.
- **[The hand-offs](/case-studies/security-migration/handoffs.html):** every output landing as someone else's input, in order.
- **[The flow map](/case-studies/security-migration/flow-map.html):** the whole system, how each repo's fix was chosen, and the problems we hit along the way.

What made it work:

1. **Map before fixing.** Read-only agents worked out who owns each repo from commits and tickets, not folder paths.
2. **One agent per team group,** not one per repo, all sharing one playbook.
3. **Rules that learn.** Every repo that surprised us became a new rule for the agents that came after.
4. **Prove it on real pipelines.** Scripts checked that the image the scanner was told about was the image the build pushed.
5. **A human gate.** I reviewed every team's changes and approved every message before it went out.

Company, team, repository and people names in the case study are changed. The structure, the numbers and the lessons are real.
