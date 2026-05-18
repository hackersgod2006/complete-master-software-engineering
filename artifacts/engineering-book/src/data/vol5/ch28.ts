import type { Section } from '../types';

export const CH28_SECTIONS: Section[] = [
  {
    id: "28-1",
    number: "28.1",
    title: "Why Most Engineering Metrics Are Wrong",
    content: `In the pursuit of efficiency, management often turns to metrics. However, in software engineering, the wrong metrics don't just provide useless data—they actively damage the organization by creating perverse incentives.

## The Pitfalls of "Activity" Metrics
The most common mistake is measuring **activity** instead of **outcome**.
- **Lines of Code (LOC)**: Encourages "bloated" solutions and punishes elegant, concise code.
- **Commit Count**: Encourages developers to make tiny, meaningless commits rather than cohesive, logical units of work.
- **Bug Counts**: If you measure bugs per developer, developers will simply stop reporting bugs or will fight with QA to label them as "enhancements."

## Goodhart's Law
"When a measure becomes a target, it ceases to be a good measure." If you tell a team they will be judged on "velocity" (story points), the team will simply inflate the points of every task. The number goes up, but the actual work delivered remains the same.

## The Principle of Holistic Measurement
Engineering is a complex system of trade-offs. You cannot measure quality without also measuring speed, and you cannot measure speed without measuring reliability. To understand performance, you need a **balanced scorecard** that captures the tension between these competing goals.`
  },
  {
    id: "28-2",
    number: "28.2",
    title: "DORA Metrics: The Research Foundation",
    content: `The **DevOps Research and Assessment (DORA)** team spent seven years surveying over 30,000 professionals to identify what actually drives software delivery performance. They identified four key metrics—now known as the "DORA Four"—that separate high-performing teams from low-performing ones.

## The Four Metrics
1. **Deployment Frequency**: How often does the organization successfully release to production?
2. **Lead Time for Changes**: How long does it take from code committed to code running in production?
3. **Change Failure Rate**: What percentage of changes to production result in degraded service?
4. **Time to Restore Service**: How long does it take to recover from a failure in production?

## Throughput vs. Stability
The genius of the DORA metrics is that they measure both **Throughput** (Deployment Frequency and Lead Time) and **Stability** (Change Failure Rate and Time to Restore). 

| Performance Level | Deployment Freq | Lead Time | Change Failure Rate | Time to Restore |
| :--- | :--- | :--- | :--- | :--- |
| **Elite** | Multiple times per day | < 1 hour | 0-15% | < 1 hour |
| **High** | Between once per day/week | 1 day - 1 week | 16-30% | < 1 day |
| **Medium** | Once per week/month | 1 week - 1 month | 16-30% | < 1 day |
| **Low** | Once per month/6 months | 1-6 months | 46-60% | 1 week - 1 month |

Elite performers don't trade speed for quality; they use quality (automated testing, CI/CD) to achieve speed.`
  },
  {
    id: "28-3",
    number: "28.3",
    title: "Deployment Frequency: The Leading Indicator",
    content: `**Deployment Frequency (DF)** is the heartbeat of an engineering team. It measures how often you provide value to your customers.

## Why High Frequency Matters
Frequent deployments force you to automate. If you deploy once a month, you can tolerate a manual 4-hour checklist. If you deploy ten times a day, you **must** automate everything. 
- **Smaller Batch Sizes**: Deploying more often means each deployment is smaller. Small changes are easier to test, easier to review, and—crucially—easier to roll back if they fail.
- **Reduced Risk**: The risk of a deployment is not a linear function of its size; it's often exponential. A massive "big bang" release is significantly more dangerous than 100 small ones.

## How to Improve DF
1. **Automate the Pipeline**: Remove manual sign-offs and "Change Advisory Boards."
2. **Decouple Deployment from Release**: Use **Feature Flags**. You can deploy the code to production but keep it hidden from users until it's ready.
3. **Invest in Trunk-Based Development**: Long-lived feature branches are the enemy of frequent deployments.`
  },
  {
    id: "28-4",
    number: "28.4",
    title: "Lead Time for Changes: The Velocity Measure",
    content: `**Lead Time for Changes (LTFC)** is the time it takes for a commit to reach production. It is the ultimate measure of the "friction" in your engineering process.

## The Components of Lead Time
LTFC is usually made up of:
1. **Coding Time**: Actually writing the logic.
2. **Review Time**: Waiting for a peer to look at the PR.
3. **CI/CD Time**: Running tests and building artifacts.
4. **Wait Time**: Waiting for a deployment window or manual approval.

## The "Wait Time" Trap
In many organizations, the actual "coding" takes 2 days, but the "waiting" takes 10 days. Improving LTFC often has nothing to do with making engineers code faster; it's about removing the **bottlenecks** in the review and deployment process.

## Real-World Benchmark
In an Elite team, LTFC is often measured in **minutes**. An engineer pushes a PR, it's reviewed within the hour, and the automated pipeline takes it to production in 15 minutes. In a Low-performing team, LTFC is measured in **weeks**.`
  },
  {
    id: "28-5",
    number: "28.5",
    title: "Change Failure Rate: The Quality Measure",
    content: `**Change Failure Rate (CFR)** is the percentage of deployments that cause a "failure" (an outage, a service degradation, or a required rollback).

## The Balance
If your Deployment Frequency is high but your CFR is also high, you aren't "fast"; you're "reckless." CFR acts as the **governor** on your speed. 

## What Counts as a Failure?
- A rollback.
- A "hotfix" patch pushed immediately after a release.
- A SEV1/SEV2 incident triggered by a change.

## Improving CFR
1. **Comprehensive Automated Testing**: Unit, integration, and end-to-end tests.
2. **Canary Deployments**: Releasing to 1% of users first to "test the waters."
3. **Observability**: Being able to detect a failure immediately after a deploy.

A healthy CFR is typically below 15%. If it's 0%, you might be moving too slowly or not taking enough calculated risks.`
  },
  {
    id: "28-6",
    number: "28.6",
    title: "Time to Restore Service: The Reliability Measure",
    content: `**Time to Restore Service (TTRS)** measures how long it takes the team to recover from a production failure. This is often called MTTR (Mean Time To Recovery).

## Why This Metric is Vital
In modern, complex systems, failures are inevitable. The goal isn't just to *prevent* failure (which is impossible) but to be able to *recover* from it quickly.

## The TTRS Lifecycle:
1. **Detection**: How long before we knew it was broken?
2. **Diagnosis**: How long to find the cause?
3. **Mitigation**: How long to stop the impact (e.g., rolling back)?
4. **Resolution**: How long to fix the underlying cause?

## How to Lower TTRS
- **Automated Rollbacks**: If health checks fail during a deploy, the system should automatically revert.
- **Runbooks**: Clear documentation for on-call engineers.
- **Observability**: High-fidelity logging and tracing that points directly to the error.

Elite teams can restore service in **under an hour**. Low performers might take days or even weeks.`
  },
  {
    id: "28-7",
    number: "28.7",
    title: "Measuring DORA: Tools and Techniques",
    content: `Measuring DORA metrics requires aggregating data from multiple sources: your Version Control System (GitHub/GitLab), your CI/CD tool (Jenkins/CircleCI/GitHub Actions), and your Incident Management tool (PagerDuty/Opsgenie).

## The Data Pipeline
1. **Deployment Frequency**: Count "Successful Deploy" events from your CI/CD tool.
2. **Lead Time**: (Deployment Timestamp) minus (First Commit Timestamp for that change).
3. **Change Failure Rate**: (Number of incidents linked to a deploy) / (Total number of deploys).
4. **Time to Restore**: (Incident Resolution Timestamp) minus (Incident Start Timestamp).

## Tools
- **Four Keys (by Google)**: An open-source project that sets up a dashboard for DORA.
- **Sleuth / Faros / LinearB**: Commercial platforms that integrate with your stack to provide these metrics automatically.
- **Custom SQL**: Many teams simply pipe their GitHub and PagerDuty data into a BigQuery or Snowflake instance and build Looker/Tableau dashboards.

The key is **consistency**. Don't worry about perfect accuracy at first; focus on the **trends** over time.`
  },
  {
    id: "28-8",
    number: "28.8",
    title: "The SPACE Framework: Beyond DORA",
    content: `While DORA is excellent for delivery performance, it doesn't capture the **human** element of engineering. Researchers from GitHub, Microsoft, and UVic proposed the **SPACE framework** to provide a more holistic view of developer productivity.

## The Five Dimensions:
1. **S**atisfaction and Well-being: How happy and healthy are the developers?
2. **P**erformance: Outcomes of the work (e.g., impact, cost-effectiveness).
3. **A**ctivity: Output of work (e.g., PRs completed, docs written).
4. **C**ommunication and Collaboration: How well do teams work together?
5. **E**fficiency and Flow: Ability to stay in the "zone" and move through the process with minimal friction.

## Why SPACE Matters
If you only measure DORA, you might ignore that your team is burning out (Satisfaction) or that knowledge is siloed in one person's head (Communication). 

| Dimension | Example Metric |
| :--- | :--- |
| **Satisfaction** | Employee NPS or Burnout surveys. |
| **Performance** | Customer satisfaction with new features. |
| **Activity** | Number of code reviews performed. |
| **Collaboration** | Onboarding time for new hires. |
| **Efficiency** | Number of interruptions per day. |

The most important takeaway from SPACE is that **productivity cannot be reduced to a single number.**`
  },
  {
    id: "28-9",
    number: "28.9",
    title: "Velocity: Why Story Points Fail and What to Do Instead",
    content: `**Velocity** is the measure of how much work a team can complete in a single sprint, usually measured in "Story Points." While ubiquitous in Agile, it is often fundamentally flawed.

## The Problem with Story Points
- **Inflation**: As mentioned, teams often inflate points to look more productive.
- **Incomparability**: A "3" for Team A is not the same as a "3" for Team B. 
- **Focus on Effort, Not Value**: A 13-point task might be worthless to the customer, while a 1-point task might double revenue.

## What to Do Instead: Cycle Time
A better alternative to Velocity is **Cycle Time**: the time from when work *starts* (e.g., moving a Jira ticket to "In Progress") to when it *finishes* (e.g., "Done"). 

## The Benefit of Throughput
Instead of counting points, count the **number of items** delivered (Throughput). If you break your work into roughly equal, small sizes, Throughput is a more reliable and harder-to-game predictor of future capacity than Story Points.

\`\`\`python
# Simple Throughput Calculation
completed_tasks = [task for task in sprint if task.status == "Done"]
throughput = len(completed_tasks)
# Use the average of the last 3 sprints for planning.
\`\`\`

Stop debating if a ticket is a "3" or a "5." Just make it "Small" and ship it.`
  },
  {
    id: "28-10",
    number: "28.10",
    title: "Code Quality Metrics: Cyclomatic Complexity, Coupling, Cohesion",
    content: `How do you measure "good code" objectively? We use structural metrics that analyze the code's graph and control flow.

## 1. Cyclomatic Complexity
Measures the number of linearly independent paths through a program's source code. 
- **Rule of thumb**: A function with a score > 10 is considered "too complex" and should be refactored. 

\`\`\`javascript
// Cyclomatic Complexity = 3
function check(age, hasLicense) {
  if (age > 18) { // Path 1
    if (hasLicense) { // Path 2
      return "Drive";
    }
  }
  return "Walk"; // Path 3
}
\`\`\`

## 2. Coupling
Measures how much one module depends on others. **Tight coupling** makes the system fragile (changing A breaks B).

## 3. Cohesion
Measures how closely related the functions within a module are. **High cohesion** is good; it means a module does "one thing well."

## The "Maintainability Index"
Tools like SonarQube or ESLint plugins can combine these into a single "Maintainability Index." While useful for spotting "hotspots," remember that these metrics are **proxies**—they don't understand the *intent* of the code.`
  },
  {
    id: "28-11",
    number: "28.11",
    title: "Test Coverage: What It Measures and What It Doesn't",
    content: `**Test Coverage** (usually Line Coverage) is the percentage of your code executed by your test suite. It is one of the most common—and most misunderstood—metrics.

## The Value of Coverage
Coverage is excellent at finding **untested code**. If your coverage is 20%, you know for a fact that 80% of your logic is a "black box" that could fail at any time.

## The Danger of Coverage
100% coverage does **not** mean 0% bugs. 
- **Logical Errors**: Your tests might cover the line \`x = a + b\` but fail to check if it should have been \`x = a * b\`.
- **Bad Assertions**: You can have 100% coverage with tests that don't actually assert anything (\`expect(true).toBe(true)\`).

## Better Metrics: Mutation Testing
A more advanced metric is **Mutation Testing**. A tool systematically introduces small bugs (mutations) into your code (e.g., changing \`>\` to \`<\`). If your tests still pass, your tests are weak, regardless of your "Line Coverage" score.

**Key Insight**: Treat coverage as a **floor**, not a **ceiling**. Use it to find gaps, but don't obsess over reaching 100% at the expense of meaningful test cases.`
  },
  {
    id: "28-12",
    number: "28.12",
    title: "On-Call Burden Metrics",
    content: `If you want to keep your engineers, you must measure the "health" of their on-call experience.

## Essential On-Call Metrics:
1. **Alert Volume**: How many times did the pager go off in a week?
2. **Actionable vs. Non-Actionable**: What percentage of alerts required an actual fix vs. just "acknowledging" a flaky alert?
3. **Out-of-Hours Alerts**: How many alerts happened between 10 PM and 8 AM?
4. **Inter-arrival Time**: How much time did the engineer have between alerts to actually sleep or focus?

## The "Burnout" Threshold
If an engineer is paged more than twice a night, they cannot achieve REM sleep. If this happens for a week, their cognitive performance drops to the level of someone who is legally intoxicated.

## High-Maturity Response
If "On-Call Burden" exceeds a certain threshold, the team should **stop all feature work** and focus 100% on "Alert Fatigue" and system stability. This is the only way to sustain a healthy engineering culture.`
  },
  {
    id: "28-13",
    number: "28.13",
    title: "Developer Experience (DevEx) Metrics",
    content: `**Developer Experience** is about how easy it is to get work done. Poor DevEx is the "death by a thousand papercuts" that leads to low productivity.

## Measuring the "Inner Loop"
The "Inner Loop" is the cycle of: Write code -> Build -> Test -> Debug.
- **Local Build Time**: How long to compile on a laptop? (Target: < 30s)
- **Test Execution Time**: How long for the unit test suite? (Target: < 2m)
- **Onboarding Time**: How many days from "Day 1" until a new engineer pushes their first PR to production?

## Qualitative Metrics: Surveys
Quantitative data doesn't tell the whole story. Use quarterly "DevEx Surveys" to ask:
- "How much time do you spend on manual, repetitive tasks?"
- "How satisfied are you with our internal tooling?"
- "What is the single biggest thing slowing you down?"

Investing in DevEx is often the highest-ROI activity an engineering leader can undertake, as it **multiplies** the productivity of every engineer on the team.`
  },
  {
    id: "28-14",
    number: "28.14",
    title: "Anti-Metrics: Lines of Code, Bug Count, Hours Worked",
    content: `To protect your culture, you must explicitly forbid certain metrics from being used in performance reviews. These are "Anti-Metrics."

## 1. Lines of Code (LOC)
Bill Gates famously said: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight." 
- **Better**: Focus on the **simplification** of the codebase. A great day for an engineer might be deleting 500 lines of redundant code.

## 2. Bug Counts
If you reward "finding bugs," QA will file trivial reports. If you punish "creating bugs," developers will hide mistakes.
- **Better**: Focus on **Mean Time to Detect** and **Systemic Fixes**.

## 3. Hours Worked / "Green Squares"
Presence is not productivity. An engineer who works 40 focused hours and writes robust code is more valuable than one who works 80 hours and creates "spaghetti" that others have to fix later.
- **Better**: Focus on **DORA metrics** and **Peer Peer Feedback**.

The use of anti-metrics is a signal of low-trust, low-maturity management.`
  },
  {
    id: "28-15",
    number: "28.15",
    title: "Building an Engineering Dashboard",
    content: `A dashboard is only useful if it drives action. A "wall of numbers" will be ignored.

## The "Executive" View (Monthly)
- DORA Four Trends (Improving or Worsening?)
- High-level cost of infrastructure vs. Revenue.
- Headcount and Hiring targets.

## The "Team" View (Weekly/Daily)
- Pager load from the last 7 days.
- Number of PRs waiting for review for > 24 hours.
- Build success rate.
- Cycle Time for the current sprint.

## Dashboard Design Rules:
1. **Less is More**: Max 5-7 charts.
2. **Context is King**: Always show a "Target" or "Last Month's Average." A single number is meaningless without comparison.
3. **Actionable**: If a chart goes red, the team should know exactly what meeting to call or what task to prioritize.

**Remember**: The goal of a dashboard is to start a conversation, not to replace one.`
  },
  {
    id: "28-16",
    number: "28.16",
    title: "Case Study: Accelerate Research — The Science Behind DORA",
    content: `The book *Accelerate* by Nicole Forsgren, Jez Humble, and Gene Kim is the definitive text on engineering metrics. It proved that **software delivery performance is a competitive advantage.**

## Key Findings:
- **Quality is not a trade-off**: High-performing teams were better at *both* speed and stability.
- **Lean Management**: Practices like "Limiting Work in Progress (WIP)" and "Visualizing Work" had a direct impact on DORA metrics.
- **Culture Matters**: A "Generative" (Westrum) culture was a strong predictor of technical performance.
- **Continuous Delivery**: This was the single most impactful technical practice, influencing every other metric.

## The Impact on the Industry
Before *Accelerate*, engineering was often seen as a "dark art" that couldn't be measured. DORA provided a **scientific framework** for improvement. It moved the conversation away from "I think we're slow" to "Our Lead Time for Changes has increased by 40% in the last quarter; we need to investigate our CI pipeline."

If you read only one book on engineering management, make it *Accelerate*.`
  },
  {
    id: "28-17",
    number: "28.17",
    title: "Exercises",
    content: `## Exercise 1: Metric Identification
Identify which DORA metric each scenario describes:
1. "It takes 45 minutes for a merged commit to reach the production environment."
2. "We had to roll back 3 out of the 10 releases we made last week."
3. "The site was down for 2 hours before we were able to bring it back online."
4. "We deploy new code to production twice every day."

## Exercise 2: Goodhart's Law
A manager decides to reward the developer who closes the most Jira tickets each month with a $500 bonus. Predict two ways developers might "game" this metric that would be harmful to the codebase.

## Exercise 3: Cycle Time vs. Velocity
A team completes 50 story points in Sprint A and 40 story points in Sprint B. 
1. Did their productivity decrease? 
2. What other information would you need to be sure?

## Exercise 4: Cyclomatic Complexity
Calculate the Cyclomatic Complexity of this pseudo-code:
\`\`\`python
if a > 10:
    if b < 5:
        print("X")
    else:
        print("Y")
else:
    print("Z")
\`\`\`

## Exercise 5: Test Coverage Debate
Engineer A says: "We should have a hard rule that no PR can be merged if it drops our line coverage below 80%."
Engineer B says: "That will just encourage people to write useless tests."
Who do you agree with, and what is your "middle ground" proposal?

## Exercise 6: On-Call Health
During a 7-day shift, an engineer receives 50 alerts. 45 of them were "CPU spike" alerts that resolved themselves within 2 minutes without any action. 
1. What is the "Actionable Alert Rate"? 
2. What should the team do next?

## Exercise 7: Inner Loop Optimization
A team's local build takes 8 minutes. An engineer discovers that by upgrading the build tool and using a cache, they can reduce it to 1 minute. If there are 10 engineers who each build 10 times a day, how many "developer hours" are saved per week?

## Exercise 8: SPACE Framework Application
Your DORA metrics are "Elite," but your "Developer Satisfaction" (from SPACE) is at an all-time low. What might be happening in the team?

---

## Answers

1. **Answer**: 1. Lead Time for Changes. 2. Change Failure Rate. 3. Time to Restore Service. 4. Deployment Frequency.
2. **Answer**: 1. Breaking one large, meaningful task into ten tiny, meaningless tickets. 2. Ignoring hard, high-value tickets in favor of "easy" bugs to keep their count high.
3. **Answer**: 1. Not necessarily. 2. You would need to know if the "value" delivered was different, or if the "Cycle Time" (how long each ticket took) stayed the same. Points are subjective.
4. **Answer**: Complexity = 3 (Path 1: a>10 and b<5; Path 2: a>10 and b>=5; Path 3: a<=10).
5. **Answer**: Middle ground: Use coverage as a **warning**, not a blocker. If coverage drops, require the developer to explain why in the PR description. Focus on **Review Quality** rather than a raw percentage.
6. **Answer**: 1. 10% (5/50). 2. Immediately tune or delete the "CPU spike" alert. It's "noise" that is causing alert fatigue.
7. **Answer**: 8 - 1 = 7 minutes saved per build. 10 engineers * 10 builds/day * 5 days/week = 500 builds. 500 * 7 = 3,500 minutes = **58.3 hours per week**.
8. **Answer**: The team is likely "burning the candle at both ends." They are achieving elite speed and stability through heroics and excessive overtime, which is unsustainable and will lead to turnover.`
  }
];
