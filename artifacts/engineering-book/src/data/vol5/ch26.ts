import type { Section } from '../types';

export const CH26_SECTIONS: Section[] = [
  {
    id: "26-1",
    number: "26.1",
    title: "Blame vs Learning: The Two Responses to Failure",
    content: `When a system fails—whether it's a minor bug or a catastrophic multi-region outage—the organization faces a choice. It can either look for a **culprit** to blame or look for a **flaw** to fix.

## The Blame Response
In a blame-oriented culture, the focus is on "Who did this?". The implicit assumption is that the system was perfect, and a "human error" corrupted it. 
- **Consequence**: Engineers become afraid to take risks or admit mistakes.
- **Outcome**: Failures are hidden, and the underlying systemic issues remain, destined to cause another outage.

## The Learning Response
In a learning-oriented (or **blameless**) culture, the focus is on "How did the system allow this to happen?". This approach acknowledges that humans are fallible and that a robust system should be resilient to individual errors.
- **Consequence**: Engineers feel safe to share full details of their actions.
- **Outcome**: The organization gains a deep understanding of the system's edge cases and can implement technical safeguards.

## The "Human Error" Fallacy
Labeling the cause of an incident as "human error" is the start of an investigation, not the end. If an engineer runs \`rm -rf /\` on a production server, the "human error" is the command. The **systemic failure** is that the engineer had the permissions to do so, that the command didn't require a second signature, and that the prompt didn't distinguish between dev and prod environments.`
  },
  {
    id: "26-2",
    number: "26.2",
    title: "The History of Blameless Culture: Lessons from Aviation",
    content: `The concept of "blamelessness" didn't start in software; it was perfected in high-stakes industries like aviation and nuclear power.

## The Aviation Precedent
In the early days of flight, crashes were often attributed to "pilot error," and pilots were fired or prosecuted. This didn't make flying safer. It wasn't until the industry created a **non-punitive reporting system** (like the ASRS in the US) that safety plummeted. Pilots began reporting "near misses" without fear of losing their licenses.

## Software Adoption
Companies like **Etsy** and **Google** adapted these principles to software engineering. They realized that complex distributed systems are like cockpits—they have thousands of moving parts, and "perfect" operation is impossible.

## Key Principles Borrowed:
1. **The Retrospective Focus**: Look at the sequence of events, not the intent of the actor.
2. **Systemic Resilience**: Design systems that expect human failure.
3. **Information Flow**: The person closest to the failure has the most valuable information; we must make it safe for them to share it.

If we punish people for honest mistakes, we are essentially paying for a very expensive lesson and then throwing away the person who learned it.`
  },
  {
    id: "26-3",
    number: "26.3",
    title: "The Blameless Postmortem Template: Complete Guide",
    content: `A postmortem (or "Incident Review") is a document that analyzes a failure. A good template ensures consistency and prevents the discussion from devolving into finger-pointing.

## Standard Postmortem Structure:
1. **Title**: Clear and descriptive (e.g., "Incident #402: 15-minute outage of Checkout API").
2. **Authors/Owners**: Who is leading the investigation.
3. **Status**: Draft, Reviewing, or Completed.
4. **Summary**: A 2-3 sentence overview for executives.
5. **Impact**: How many users were affected? What was the financial cost?
6. **Timeline**: The "heart" of the document. Every significant event from the first alert to the final resolution.
7. **Root Causes**: The underlying systemic reasons for the failure.
8. **Action Items**: What are we going to do to prevent this?

## Writing Style
The tone must be **neutral** and **objective**. Use "The system exhibited..." rather than "John forgot to...".

\`\`\`markdown
# Bad Style:
"John deployed the wrong version because he was rushed."

# Good Style:
"The deployment pipeline allowed a version mismatch to proceed without validation, leading to a 500 error."
\`\`\`

The goal is to produce a document that anyone in the company can read and understand exactly what happened and why it won't happen again.`
  },
  {
    id: "26-4",
    number: "26.4",
    title: "Writing the Timeline: Every Minute Matters",
    content: `The timeline is the factual backbone of a postmortem. It must be precise, often down to the minute or second, depending on the system's scale.

## What to Include:
- **T-Minus**: Events leading up to the incident (e.g., a configuration change 2 hours prior).
- **Detection**: When did the first alert fire? How was it detected (monitoring vs. customer report)?
- **Escalation**: When was the on-call engineer paged?
- **Investigation**: Key milestones in the debugging process ("Hypothesis X tested and rejected").
- **Mitigation**: When was the first action taken to stop the bleeding?
- **Resolution**: When did the system return to normal?

## Example Timeline Snippet:
- **10:02 UTC**: Deploy of \`billing-v2.1\` initiated.
- **10:05 UTC**: Datadog alert: \`5xx error rate > 5%\` in \`us-east-1\`.
- **10:07 UTC**: On-call engineer (Jane) paged.
- **10:12 UTC**: Jane identifies correlation between deploy and errors.
- **10:15 UTC**: Rollback initiated.
- **10:18 UTC**: Rollback complete; error rate returns to baseline.

## Why Accuracy Matters
Precision helps identify **Time to Detect (TTD)** and **Time to Resolve (TTR)**. If detection took 10 minutes, maybe our alerting thresholds are too high. If resolution took 20 minutes, maybe our rollback scripts are too slow.`
  },
  {
    id: "26-5",
    number: "26.5",
    title: "Root Cause Analysis: The Five Whys and Its Limits",
    content: `The **Five Whys** is a technique originally developed at Toyota to find the source of a problem by repeating the question "Why?" five times.

## Example:
1. **Why did the server crash?** The disk was full.
2. **Why was the disk full?** The log files weren't being rotated.
3. **Why weren't they being rotated?** The logrotate service failed.
4. **Why did it fail?** A recent config change had a syntax error.
5. **Why was there a syntax error?** There was no automated validation of config files. (**Root Cause**)

## The Limits of the Five Whys
While useful for simple failures, the Five Whys can be dangerous in complex systems because:
1. **It assumes a single cause**: In software, outages are usually the result of multiple factors aligning.
2. **It's linear**: It doesn't capture branching paths of failure.
3. **It can lead to "Human Error"**: It's easy to stop at "Because the engineer made a mistake."

## Modern Alternative: Systems Thinking
Instead of a single "Root Cause," we should look for **Contributing Factors**. A system failure is often like a "Swiss Cheese" model: the holes in different layers of defense all lined up to allow an incident to pass through.`
  },
  {
    id: "26-6",
    number: "26.6",
    title: "Fishbone (Ishikawa) Diagrams for System Failures",
    content: `When a failure has multiple complex causes, a **Fishbone Diagram** (also called an Ishikawa diagram) is more effective than the Five Whys. It categorizes potential causes to ensure you aren't overlooking any "bones."

## The Typical "Bones" for Software:
- **People**: Lack of training, fatigue, communication breakdown.
- **Process**: Missing code reviews, manual deployment steps, poor on-call handoff.
- **Technology**: Bugs, hardware failure, network latency, resource exhaustion.
- **Environment**: Cloud provider outage, noisy neighbors, unexpected traffic spike.
- **Management**: Unrealistic deadlines, lack of investment in reliability.

## How to Build One:
1. Place the **Effect** (the incident) at the "head" of the fish.
2. Draw the main bones representing categories.
3. Brainstorm contributing factors and attach them as "sub-bones."

| Category | Example Factor |
| :--- | :--- |
| **Technology** | Redis connection pool exhausted. |
| **Process** | No staging environment for the billing service. |
| **People** | On-call engineer was unfamiliar with the new auth service. |

This visual representation helps the team see the **holistic health** of the system, rather than fixating on a single line of code.`
  },
  {
    id: "26-7",
    number: "26.7",
    title: "Contributing Factors: System Thinking Not Person Blaming",
    content: `In a complex system, there is rarely one "root" cause. Instead, there are dozens of **contributing factors**—small weaknesses that, on their own, are harmless, but together create a disaster.

## The "Swiss Cheese" Model
Imagine slices of Swiss cheese. Each slice is a safeguard (e.g., Code Review, Unit Tests, Staging, Monitoring). Usually, the holes don't line up. But once in a while, they do, and a bug reaches production.

## Identifying Systemic Factors
When analyzing an incident, ask:
- **Visibility**: Did we have the right dashboards?
- **Tooling**: Did the tools provide misleading information?
- **Incentives**: Was the engineer under pressure to "just ship it"?
- **Complexity**: Is the system so complex that no one person can understand its state?

## Stop Asking "Who"
Instead of "Who broke the build?", ask "How did our CI/CD pipeline allow a broken build to be merged?". This shift from **Individual Responsibility** to **Systemic Responsibility** is the hallmark of a high-maturity engineering organization. It moves the focus from "fixing the person" to "fixing the machine."`
  },
  {
    id: "26-8",
    number: "26.8",
    title: "Action Items: SMART, Owned, Tracked",
    content: `The most important part of a postmortem is the **Action Items**. If you don't change the system, the postmortem was just a storytelling exercise.

## The SMART Framework
Action items must be:
- **Specific**: "Add a timeout to the Redis client" (not "Fix Redis").
- **Measurable**: "Ensure 99.9% of requests complete within 200ms."
- **Assignable**: Every item must have one person's name on it.
- **Realistic**: Don't promise to "rewrite the whole architecture" as a fix for a small bug.
- **Time-bound**: "Complete by end of Sprint 24."

## Three Categories of Action Items:
1. **Mitigation**: How do we stop this specific thing from happening again?
2. **Prevention**: How do we detect this earlier next time?
3. **Process**: How do we improve our response if it *does* happen again?

## The "Postmortem Tax"
High-performing teams treat action items with the same priority as "P0" bugs. If you have a long list of uncompleted action items from past incidents, you are carrying **operational debt** that will eventually lead to a catastrophic failure.`
  },
  {
    id: "26-9",
    number: "26.9",
    title: "Near-Miss Reporting: The Most Valuable Signal",
    content: `A **near-miss** is an incident that *almost* happened but was caught by luck or a last-minute manual intervention.

## The Value of Near-Misses
Near-misses are "free lessons." They provide all the data of a failure without the actual cost of an outage. 
- If an engineer realizes they almost ran a destructive command on the wrong database, that is a signal that the UI for those tools is dangerous.
- If a bug is caught in staging that would have wiped out user data, that is a signal that our unit tests are missing a critical edge case.

## Encouraging Reporting
People only report near-misses if there is high **Psychological Safety**. If reporting a near-miss results in a "talking to" from a manager, people will stay silent.

## How to Institutionalize Near-Misses:
- **"Close Call" Slack Channel**: A place to share "I almost broke X today."
- **Monthly "Risk Review"**: A meeting to discuss these signals and prioritize preemptive fixes.

By treating near-misses as seriously as actual outages, you move from a **reactive** to a **proactive** reliability posture.`
  },
  {
    id: "26-10",
    number: "26.10",
    title: "Incident Response: On-Call, Escalation, Communication",
    content: `When the pager goes off at 3 AM, you don't want your engineers "winging it." You need a structured **Incident Response** process.

## The Roles
1. **Incident Commander (IC)**: The "boss" of the incident. They don't write code; they manage the flow, assign tasks, and make decisions.
2. **Operations Lead**: The person actually doing the technical work (checking logs, rolling back).
3. **Communications Lead**: The person updating the status page and talking to stakeholders.

## The Flow
1. **Detection**: Monitoring triggers an alert.
2. **Triaging**: On-call engineer confirms it's a real incident and determines severity (Sev1, Sev2, etc.).
3. **Mobilization**: If needed, the IC is called in, and a "War Room" (Slack channel or Zoom) is opened.
4. **Stabilization**: Focus on **mitigation** (stopping the bleeding) before **investigation** (finding the cause).
5. **Resolution**: The system is healthy again.

## Escalation Policies
Clearly define when an engineer should "page up." 
- "If you haven't identified the cause in 15 minutes, page the team lead."
- "If the incident is Sev1, page the VP of Engineering immediately."

A clear structure reduces the **cognitive load** on the responding engineer, allowing them to focus on the technical problem.`
  },
  {
    id: "26-11",
    number: "26.11",
    title: "On-Call Health: Preventing Burnout",
    content: `On-call is often the most stressful part of being a software engineer. If managed poorly, it leads to high turnover and "on-call dread."

## Measuring On-Call Load
- **Pager Volume**: How many alerts per shift? (Target: < 2 per night).
- **False Alarm Rate**: How many alerts were "flaky" or didn't require action?
- **Mean Time to Repair (MTTR)**: Is the burden getting heavier or lighter?

## Healthy On-Call Practices
1. **Follow-the-Sun**: Use global teams to ensure no one is on-call during their local night.
2. **Primary/Secondary Rotation**: Always have a backup.
3. **Compensation**: Acknowledge the burden with extra pay or "comp time" (e.g., if you're up all night, take the next day off).
4. **The "Silent" Night**: If a service pages too often, it should be "quarantined"—no new features until the pager volume is reduced.

## The Goal: "Quiet" On-Call
The ideal on-call shift is one where the pager never goes off because the system is robust and the alerts are tuned to only fire for meaningful, actionable events.`
  },
  {
    id: "26-12",
    number: "26.12",
    title: "Incident Severity Levels: Defining and Applying Them",
    content: `Not all incidents are equal. A typo on a blog post is not the same as a database leak. You must have clearly defined **Severity Levels**.

| Level | Definition | Response Expectation |
| :--- | :--- | :--- |
| **SEV0 / SEV1** | **Critical**: Total outage, data loss, or security breach. | Immediate, 24/7, all-hands. |
| **SEV2** | **Major**: Core functionality broken for many users. | Immediate during business hours; pager during off-hours. |
| **SEV3** | **Minor**: Partial functionality broken; workaround exists. | Address during next business day. |
| **SEV4** | **Negligible**: UI glitches, minor bugs. | Add to backlog. |

## Why Definitions Matter
Without these, you get **"Severity Creep,"** where everything is labeled "Emergency" to get attention. This leads to alert fatigue.

## Who Sets the Level?
The responding engineer initially sets the level, but the **Incident Commander** or a Product Manager can adjust it based on business impact. If a SEV1 is declared, it usually triggers an automatic notification to leadership and perhaps the legal team.`
  },
  {
    id: "26-13",
    number: "26.13",
    title: "The War Room: Managing Major Incidents",
    content: `For SEV1/SEV0 incidents, you need a "War Room"—a dedicated space (physical or virtual) where the response is coordinated.

## Virtual War Room Best Practices
1. **Single Slack Channel**: Create a dedicated channel (e.g., \`#inc-2023-oct-12\`). This serves as the "record of truth" for the postmortem later.
2. **Silent Zoom/Meet**: Keep a video call open. People can stay on mute and only speak when they have an update.
3. **The "Scribe"**: Someone (often the IC) should record key decisions and findings in the Slack channel as they happen.

## Rules of Engagement
- **Keep it professional**: No joking about the failure while it's ongoing.
- **Control the noise**: Only people actively helping should be in the room. Executives should listen but not interrupt the engineers.
- **Decision Authority**: The IC has the final say. If two engineers disagree on a mitigation strategy, the IC decides and moves on.

The War Room's purpose is to **maximize bandwidth and minimize latency** in communication during a crisis.`
  },
  {
    id: "26-14",
    number: "26.14",
    title: "Customer Communication During Incidents",
    content: `How you talk to your customers during an outage is just as important as how you fix the code. Trust is built in the "low" moments.

## The Status Page
Every modern engineering team should maintain a public status page (e.g., using Statuspage.io or a custom tool).
- **Be Honest**: "We are investigating" is better than silence.
- **Be Specific (but not too technical)**: "We are seeing elevated latency in the US-East region" vs "Our Kubernetes pods are OOMing."
- **Provide Updates**: Even if there's no news, post "We are still working on the issue; next update in 30 minutes."

## The "Public Postmortem"
For major outages, a public version of the postmortem is often published. This should:
1. Apologize sincerely.
2. Explain what happened (in plain language).
3. Explain what was done to fix it.
4. Explain why it won't happen again.

**Transparency is a competitive advantage.** Customers are surprisingly forgiving of technical failure if you are honest and professional about it.`
  },
  {
    id: "26-15",
    number: "26.15",
    title: "Case Study: GitLab's Database Deletion — The Best Postmortem Ever Written",
    content: `In 2017, GitLab suffered a major incident where a tired engineer accidentally deleted 300GB of live production data. It is considered a landmark case in **engineering transparency**.

## What Happened
An engineer was trying to fix a replication lag. They ran \`rm -rf\` on the wrong directory on the primary database server. To make matters worse, five different backup mechanisms were found to be failing or misconfigured.

## Why it's a "Masterclass"
Instead of hiding, GitLab:
1. **Live-streamed** the recovery process on YouTube.
2. Created a **public Google Doc** where anyone could watch them write the postmortem in real-time.
3. Admitted that their backup system was a "comedy of errors."

## The Cultural Impact
GitLab didn't fire the engineer. Instead, they used the incident to completely overhaul their database infrastructure and backup testing. They proved that a company could survive a "nightmare" technical failure by being **radically transparent and blameless**. 

The engineer involved eventually wrote: "I felt supported by the entire company. I knew they weren't looking for a scapegoat; they were looking for a fix."`
  },
  {
    id: "26-16",
    number: "26.16",
    title: "Case Study: The AWS us-east-1 Outages",
    content: `Amazon Web Services (AWS) \`us-east-1\` is the oldest and most complex region in the cloud. Its outages are "internet-breaking" events.

## The 2017 S3 Outage
A member of the S3 team was using an internal tool to remove a small number of servers from one of the S3 subsystems. A typo in the command caused a much larger set of servers to be removed, including those that handled the index for S3.
- **The Systemic Lesson**: The internal tool allowed a single command to take down a critical mass of servers. AWS subsequently modified the tool to have a "minimum capacity" floor that it cannot drop below.

## The 2021 Kinesis Outage
A small increase in capacity caused the Kinesis servers to exceed the maximum number of threads allowed by the OS configuration. 
- **The Systemic Lesson**: As systems grow, "invisible" limits (like OS file descriptors or thread counts) become the new failure points.

## Takeaway
Even with the world's best SREs and infinite resources, **scale creates its own failure modes**. The AWS postmortems (published on their "Summary of Service Interruptions" page) are essential reading for any distributed systems engineer.`
  },
  {
    id: "26-17",
    number: "26.17",
    title: "Exercises",
    content: `## Exercise 1: Blameless Rewriting
Rewrite the following "blame" statement into a "blameless" systemic statement:
*"The outage occurred because Sarah forgot to renew the SSL certificate, even though she was told to do it last week."*

## Exercise 2: The Five Whys
Perform a "Five Whys" analysis on the following scenario:
*The mobile app crashed for all users because the API returned an empty JSON array \`[]\` instead of an object \`{}\`.*

## Exercise 3: Timeline Construction
A developer pushed code at 2:00 PM. The site went down at 2:05 PM. The developer was paged at 2:10 PM. They rolled back at 2:15 PM. The site was back at 2:17 PM.
1. What was the **Time to Detect**?
2. What was the **Time to Resolve**?

## Exercise 4: Action Item Audit
Identify which of these action items is **SMART**:
1. "Make the system more robust."
2. "Dave to add unit tests for the Billing module by Friday."
3. "Investigate why the database was slow."
4. "Reduce latency by 50%."

## Exercise 5: Near-Miss Identification
Give an example of a "Near-Miss" in a software deployment and explain why it is valuable to document it.

## Exercise 6: Severity Classification
Categorize the following as SEV1, SEV2, or SEV3:
1. The "Forgot Password" email is taking 10 minutes to arrive.
2. The "Buy Now" button does nothing on the mobile app.
3. The company logo is slightly pixelated on the homepage.

## Exercise 7: The "Scribe" Role
During a mock incident, you are the Scribe. What are the three most important pieces of information you should record in the incident channel?

## Exercise 8: Public Postmortem
Draft a one-paragraph public statement for a 2-hour outage of a social media app caused by a bad configuration change. Focus on transparency and future prevention.

---

## Answers

1. **Answer**: "The certificate management process relies on manual renewal and lacks automated monitoring/alerting for upcoming expirations, allowing a critical certificate to expire without detection."
2. **Answer**: 1. Why crash? API returned \`[]\`. 2. Why \`[]\`? Backend query returned no results. 3. Why no results? Database index was corrupted. 4. Why corrupted? Disk failure on the DB node. 5. Why did disk failure cause a crash? The app lacks "graceful degradation" for empty API responses and the DB lacks automated index health checks.
3. **Answer**: 1. TTD = 10 minutes (from 2:00 to 2:10). 2. TTR = 7 minutes (from 2:10 to 2:17).
4. **Answer**: #2 is SMART. It has an owner (Dave), a specific task (unit tests), a specific scope (Billing), and a deadline (Friday).
5. **Answer**: Example: A script designed to delete old logs almost points to the root directory due to a variable being null. Valuable because it reveals a lack of "sanity checks" in automation scripts.
6. **Answer**: 1. SEV2 (Major impact on a core flow, but not "down"). 2. SEV1 (Critical business flow is broken). 3. SEV3 (Minor UI issue).
7. **Answer**: 1. Decision points (e.g., "IC decided to roll back"). 2. Evidence (e.g., "Error logs show 503s in us-west-2"). 3. Time of impact changes (e.g., "10:15: Mitigation started").
8. **Answer**: "Earlier today, our service was unavailable for 2 hours due to an error in a routine configuration update. We have reverted the change and service is fully restored. To prevent this in the future, we are implementing automated configuration validation in our deployment pipeline and enhancing our 'canary' testing process. We sincerely apologize for the disruption."`
  }
];
