import type { Section } from '../types';

export const CH30_SECTIONS: Section[] = [
  {
    id: "30-1",
    number: "30.1",
    title: "Why Engineers Must Understand Project Management",
    content: `Many engineers see "Project Management" as a bureaucratic distraction from "real" technical work. This is a dangerous misconception. In high-scale engineering, **the project is the product**. A brilliant algorithm that is delivered six months after the company goes bankrupt is a failure.

## The Engineer's Perspective
Project management is about managing **constraints**: Scope, Time, and Resources. As an engineer, you are the only one who truly understands the "Resources" (the codebase) and the "Scope" (the technical complexity). If you don't participate in project management, you are letting people who don't understand the constraints make promises on your behalf.

## Managing the "How" and the "When"
While a Product Manager (PM) owns the "What" and the "Why," the engineering team owns the "How" and the "When." 
- **Risk Management**: Identifying that a specific library choice might lead to a 2-week delay later.
- **Dependency Management**: Knowing that the Mobile team can't start until the Backend team finishes the Auth API.
- **Visibility**: Providing enough data so that stakeholders can make informed decisions.

Project management is simply **Engineering at a higher level of abstraction**.`
  },
  {
    id: "30-2",
    number: "30.2",
    title: "Estimation: The Hardest Problem in Engineering Management",
    content: `Estimation is the process of predicting the future in a domain where every task is, by definition, something that has never been done before (otherwise, you would have just automated it).

## Why Estimation Fails
1. **Optimism Bias**: Engineers estimate based on "everything going right." It rarely does.
2. **Hidden Complexity**: "Just adding a button" might reveal a fundamental flaw in the database schema.
3. **The Interruption Tax**: We estimate based on 8 hours of coding, but we only get 3.

## Estimation Techniques
- **T-Shirt Sizing**: (S, M, L, XL) Useful for high-level, early-stage planning. It avoids the false precision of days or hours.
- **Planning Poker**: A consensus-based technique where the team votes on "Story Points" (usually using the Fibonacci sequence: 1, 2, 3, 5, 8...). 
- **The "Wisdom of the Crowd"**: The best estimate is often the average of the team's estimates, not the estimate of the "smartest" person in the room.

## The Golden Rule of Estimation
**Estimates are not deadlines.** An estimate is a probability distribution. When you say "this will take 3 days," you are really saying "there is a 50% chance this will be done in 3 days, and a 90% chance it will be done in 6."`
  },
  {
    id: "30-3",
    number: "30.3",
    title: "The Cone of Uncertainty",
    content: `The **Cone of Uncertainty** describes the fact that project estimates are wildly inaccurate at the beginning and become more accurate as the project progresses.

## The Numbers
At the "Initial Concept" phase, an estimate can be off by a factor of **4x** in either direction. A task estimated at 1 week could take 4 weeks or 1 day. 

## The Four Phases of the Cone:
1. **Initial Concept**: 4x variance.
2. **Requirements Definition**: 2x variance.
3. **Design/Architecture**: 1.5x variance.
4. **Implementation**: 1.1x variance.

## The Strategic Lesson
Never commit to a hard deadline during the "Initial Concept" phase. Instead, use the first few weeks of a project to "narrow the cone" by building prototypes and refining requirements. If a stakeholder demands a date on Day 1, give them a **range**, not a single day.

| Phase | Estimated Range |
| :--- | :--- |
| **Day 1** | 3-12 months |
| **Day 30** | 5-7 months |
| **Day 90** | 5.5-6 months |

The goal of project management is to "drive through the cone" as quickly as possible.`
  },
  {
    id: "30-4",
    number: "30.4",
    title: "Evidence-Based Scheduling",
    content: `**Evidence-Based Scheduling (EBS)**, a term coined by Joel Spolsky, is a method of estimation that uses a developer's **historical accuracy** to predict future dates.

## How It Works
Instead of just asking for an estimate, you track the "Velocity" of each engineer.
1. **Estimate**: The engineer says a task takes 4 hours.
2. **Actual**: The task takes 8 hours.
3. **Velocity**: 0.5 (Estimate / Actual).

## The Monte Carlo Simulation
EBS doesn't just give you one date. It runs thousands of simulations using the developer's past velocity to provide a **probability curve**. 
- "There is a 5% chance we ship by Oct 1."
- "There is an 85% chance we ship by Oct 15."
- "There is a 99% chance we ship by Nov 1."

## The Benefit
EBS removes the emotion from scheduling. If the math says there's only a 10% chance of hitting a deadline, you don't "try harder"—you **cut scope** or **move the date**. It treats scheduling as a data science problem rather than a negotiation.`
  },
  {
    id: "30-5",
    number: "30.5",
    title: "Why Software Projects Are Always Late: Brooks' Law Revisited",
    content: `In 1975, Fred Brooks wrote *The Mythical Man-Month*, based on his experience managing the development of OS/360 at IBM. His core insight is now known as **Brooks' Law**.

## The Law:
> "Adding manpower to a late software project makes it later."

## Why This Is True
1. **The Ramp-up Time**: New engineers aren't productive on Day 1. They require time from the existing engineers (the ones who were already busy) to train them.
2. **Communication Overhead**: The number of communication paths in a team grows at a rate of \`n(n-1)/2\`. A team of 2 has 1 path. A team of 10 has 45 paths.
3. **Divisibility of Work**: Not all tasks can be split. "The bearing of a child takes nine months, no matter how many women are assigned."

## Modern Application
When a project is behind, the instinct of management is to "throw more people at it." As an engineer, you must be prepared to explain why this might be counterproductive and suggest alternatives, like **reducing the scope** of the MVP.`
  },
  {
    id: "30-6",
    number: "30.6",
    title: "The Mythical Man-Month: The Core Insights Updated",
    content: `Beyond Brooks' Law, the book contains several other foundational "truths" of software engineering.

## 1. The "Second-System Effect"
The most dangerous system an engineer ever designs is their second one. After a successful first project, the engineer feels confident and tries to include all the "cool" features they had to cut from the first one. This leads to **over-engineered, bloated** systems.

## 2. 10x Developer Productivity
Brooks noted that the difference between the best and worst programmers is not 20% or 50%, but an **order of magnitude**. However, this "10x" isn't about typing speed; it's about the ability to avoid building things that aren't necessary.

## 3. The "Surgical Team"
Brooks argued that a team should be structured like a surgical unit: one "star" surgeon (the Lead) who writes the core logic, supported by "assistants" who handle documentation, testing, and tooling. 

## 4. Documentation is the Design
If you can't describe the system in a clear, written manual, you haven't finished the design. The act of writing reveals the "fuzzy" parts of the architecture.`
  },
  {
    id: "30-7",
    number: "30.7",
    title: "Critical Path Analysis",
    content: `In project management, the **Critical Path** is the longest sequence of dependent tasks that determines the shortest possible duration of the project.

## Identifying the Path
1. List all tasks.
2. Identify dependencies (Task B cannot start until Task A is done).
3. Draw a network diagram.

## Why Engineers Must Care
If a task is on the Critical Path, any delay in that task **delays the entire project**. If a task is *not* on the Critical Path, it has "slack" (or "float")—you can delay it without affecting the launch date.

## Managing the Path
- **Crashing the Path**: Adding resources specifically to critical tasks (ignoring non-critical ones).
- **Fast Tracking**: Performing critical tasks in parallel that would normally be done in sequence (risky, as it often leads to rework).

\`\`\`mermaid
graph LR
    A[Database Schema] --> B[API Dev]
    A --> C[UI Design]
    B --> D[Frontend Integration]
    C --> D
    D --> E[QA]
\`\`\`
In this example, if API Dev (B) takes longer than UI Design (C), the path A-B-D-E is the Critical Path.`
  },
  {
    id: "30-8",
    number: "30.8",
    title: "Agile Methodologies: Scrum, Kanban, Shape Up Compared",
    content: `Methodologies are just tools. Choosing the right one depends on your project's nature.

## 1. Scrum (The "Boxed" Model)
Work is organized into 2-week "Sprints." It's great for teams that need high predictability and have a clear, prioritized backlog.
- **Strength**: High discipline, regular reflection (Retrospectives).
- **Weakness**: Can feel like a "hamster wheel"; rigid for fast-changing environments.

## 2. Kanban (The "Flow" Model)
Work is continuous. There are no sprints, just a "Work in Progress (WIP)" limit.
- **Strength**: Great for maintenance or operational teams where priorities change daily.
- **Weakness**: Hard to give long-term dates to stakeholders.

## 3. Shape Up (The "Basecamp" Model)
Work is "shaped" (specified) for 6 weeks, followed by 2 weeks of "cool-down." 
- **Strength**: High autonomy for engineers; prevents "Sprint fatigue."
- **Weakness**: Requires very senior, disciplined engineers who can "self-manage" the 6-week block.

| Feature | Scrum | Kanban | Shape Up |
| :--- | :--- | :--- | :--- |
| **Time Unit** | Sprints (2w) | Continuous | Cycles (6w) |
| **Planning** | Every 2w | Ongoing | Every 8w |
| **Change** | Not during sprint | Anytime | Only between cycles |`
  },
  {
    id: "30-9",
    number: "30.9",
    title: "Sprint Planning That Actually Works",
    content: `Most Sprint Planning meetings are a waste of time because they focus on "What" instead of "How much can we actually do?".

## The Prerequisites
1. **Groomed Backlog**: Don't plan stories that aren't "Ready."
2. **Capacity Calculation**: (Number of Engineers * Days in Sprint) - (Meetings + Holidays + Pager Duty). If you have 5 engineers for 10 days, you don't have 50 days of work. You likely have ~30.

## The Planning Process
1. **Set a Sprint Goal**: A one-sentence mission (e.g., "Complete the Stripe integration").
2. **Pull from Top**: Move stories into the sprint until capacity is reached.
3. **Commitment**: The team (not the manager) agrees that the workload is realistic.

## The "Over-Commitment" Cycle
If a team consistently fails to finish 30% of their sprint, the planning has failed. The solution isn't "working harder"; it's **pulling fewer tickets**. A sprint should end with a feeling of accomplishment, not a feeling of being "behind."`
  },
  {
    id: "30-10",
    number: "30.10",
    title: "The Retrospective: Continuous Team Improvement",
    content: `The Retrospective is the most important meeting in Agile. It's the "meta-loop" where the team debugs its own process.

## The "Prime Directive"
> "Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand." — Norman Kerth.

## The Format (Mad/Sad/Glad)
- **Glad**: What went well? (e.g., "The new testing library is great").
- **Sad**: What didn't go well? (e.g., "Wait time for code reviews is too long").
- **Mad**: What is frustrating us? (e.g., "Too many random Zoom calls").

## The Outcome: Action Items
A retrospective without action items is just "venting." 
- **Bad Action Item**: "Communicate better."
- **Good Action Item**: "Set up a Slack bot to remind us of pending PRs at 10 AM every day."

Pick only **one or two** items to fix per sprint. Trying to fix everything at once leads to fixing nothing.`
  },
  {
    id: "30-11",
    number: "30.11",
    title: "Managing Technical Risk",
    content: `Risk is any uncertain event that could negatively impact your project. In engineering, risk usually comes from **Novelty** or **Complexity**.

## The Risk Matrix
Categorize risks by **Probability** and **Impact**.

| | Low Impact | High Impact |
| :--- | :--- | :--- |
| **High Probability** | "Annoyances" (e.g., minor UI bugs) | **PROJECT KILLERS** (e.g., core API failure) |
| **Low Probability** | Ignore | "Black Swans" (e.g., cloud provider going bust) |

## Risk Mitigation Strategies:
1. **Avoidance**: Change the design to remove the risk (e.g., use a managed DB instead of self-hosting).
2. **Transference**: Make it someone else's problem (e.g., buy insurance or use a 3rd-party vendor).
3. **Mitigation**: Reduce the probability or impact (e.g., write unit tests).
4. **Acceptance**: Decide that the risk is worth taking and have a contingency plan.

## The "Technical Spike"
A **Spike** is a time-boxed research task (e.g., 2 days) to investigate a risky technology. You don't write "production" code; you write just enough to prove the technology works. **Spikes are how you buy down risk.**`
  },
  {
    id: "30-12",
    number: "30.12",
    title: "Scope Creep: Prevention and Management",
    content: `**Scope Creep** is the gradual expansion of project requirements without a corresponding increase in time or resources. It is the #1 reason projects fail.

## How it Happens
- **"Gold Plating"**: Engineers adding "cool" features that weren't asked for.
- **"While you're at it..."**: Stakeholders asking for "one small change" that isn't small.
- **Vague Requirements**: If the requirement is "Make the UI better," the scope is infinite.

## How to Prevent It:
1. **The "Change Request" Process**: If a new feature is requested, ask: "What existing feature should we remove to make room for this?"
2. **Strict Definition of Done (DoD)**: A story is finished when it meets the ACs, not when it "feels" perfect.
3. **Visualizing the Backlog**: Show stakeholders the physical "pile" of work. If they want to add to the top, they must see what falls off the bottom.

Scope creep is often a symptom of **low trust**. Stakeholders feel they won't get another chance to ask for features, so they try to cram everything into the current project. Building a culture of **regular, incremental delivery** is the best cure.`
  },
  {
    id: "30-13",
    number: "30.13",
    title: "The Deadline: When It Cannot Move",
    content: `Some deadlines are "hard" (e.g., the Olympics, Black Friday, a legal compliance date). In these cases, the standard Agile "move the date" response isn't an option.

## The "Iron Triangle"
You have three levers: **Scope, Resources, and Quality**. If the Time is fixed:
1. **Cut Scope**: The most effective lever. Deliver the "Must-Haves" and defer the "Should-Haves."
2. **Add Resources**: Risky (Brooks' Law), but can work if done very early.
3. **Reduce Quality**: **NEVER do this.** "Skipping tests" to meet a deadline creates bugs that will make you miss the deadline anyway.

## The "Must/Should/Could/Won't" (MoSCoW) Method:
- **Must**: Project fails without these (e.g., Payment processing).
- **Should**: High value, but can be manual for a few weeks (e.g., Auto-refunds).
- **Could**: Nice to have (e.g., Dark mode).
- **Won't**: Definitely not this time.

Managing a hard deadline is about being a **ruthless prioritizer**. You must be the one to tell the stakeholders "No" so that the "Yes" items can actually be finished.`
  },
  {
    id: "30-14",
    number: "30.14",
    title: "Project Rescue: Recovering a Failing Project",
    content: `You've been assigned to a "Death March"—a project that is months late, over budget, and has low morale. How do you save it?

## Step 1: Stop the Bleeding
- **Freeze Scope**: No new features. Period.
- **Kill the "Zombie" Features**: Identify 50% of the features that are half-finished and stop working on them. Focus only on the core value.

## Step 2: Restore Visibility
- Use **Evidence-Based Scheduling** to find the *real* ship date.
- Be honest with stakeholders. "We won't ship in Oct. We will ship a reduced version in Dec."

## Step 3: Improve the "Cycle Time"
- Fix the CI/CD pipeline.
- Reduce meeting time.
- Move to daily "micro-standups."

## Step 4: The Cultural Reset
A failing project is a psychological burden. Celebrate small wins. "We closed the first P0 bug today!" Success breeds success.

Rescue is not about working 100 hours a week; it's about **radically simplifying the problem** until it fits the remaining time.`
  },
  {
    id: "30-15",
    number: "30.15",
    title: "The Goal and Theory of Constraints Applied to Software",
    content: `Eliyahu Goldratt's *The Goal* introduces the **Theory of Constraints (ToC)**: a system is only as fast as its slowest part (the bottleneck).

## The Five Steps of ToC in Software:
1. **Identify the Constraint**: Is it the PM (slow requirements)? The Dev (slow coding)? The QA (slow testing)? The Ops (slow deployment)?
2. **Exploit the Constraint**: Ensure the constraint is never "idle." If QA is the bottleneck, don't let them go to useless meetings; keep them testing 100% of the time.
3. **Subordinate Everything Else**: Stop the Devs from writing more code if QA can't keep up. More code just creates a "pile" (WIP) that slows everyone down.
4. **Elevate the Constraint**: Invest in the bottleneck (e.g., buy automated testing tools or hire another QA engineer).
5. **Repeat**: Once QA is fast, the bottleneck will move (perhaps to Dev).

## WIP is "Inventory"
In a factory, inventory is "dead money" sitting on the floor. In software, **Work in Progress (WIP)** is "dead code" sitting in branches. It is a liability, not an asset. High-performing teams minimize WIP to maximize "Flow."`
  },
  {
    id: "30-16",
    number: "30.16",
    title: "Case Study: The Denver Airport Baggage System — $2B Lesson",
    content: `In 1995, the Denver International Airport was delayed by 16 months, costing $1.1 million per day, because of a failed automated baggage system.

## The Failures:
1. **Underestimated Complexity**: The system had 20 miles of track, 4,000 "telecars," and 100 computers. It was the most complex distributed system of its time.
2. **Fixed Deadline / Infinite Scope**: The airport had a hard opening date, but the requirements kept changing.
3. **No Incremental Testing**: They tried to "turn it on" all at once. The cars crashed, the bags were chewed up, and the software hung.

## The Result
They eventually had to build a manual, "old-fashioned" baggage system just to open the airport. The automated system was eventually abandoned entirely.

## The Lesson
When building a "Physical + Software" system, you cannot ignore the **laws of physics**. The software was "ready," but the latency of the mechanical sensors made the software logic fail. Always build a **degraded mode** (a manual backup) for any critical system.`
  },
  {
    id: "30-17",
    number: "30.17",
    title: "Case Study: Healthcare.gov Rescue",
    content: `As discussed in Chapter 29, Healthcare.gov was a failure at launch. But its rescue is a masterclass in **Crisis Project Management**.

## How they did it:
1. **The "War Room"**: They brought all key contractors into one room. No more "it's their fault" emails.
2. **Focus on "Top 10"**: They identified the 10 most critical bugs and ignored everything else.
3. **Measurement**: They stopped looking at "Story Points" and started looking at **real-time system telemetry** (latency, error rates, successful sign-ups).
4. **Simplification**: They removed the "requirement" that users must create an account *before* browsing plans—this one change reduced the database load by 50%.

## Takeaway
Rescue is about **prioritization and telemetry**. You can't fix what you can't see, and you can't fix everything at once.`
  },
  {
    id: "30-18",
    number: "30.18",
    title: "Exercises",
    content: `## Exercise 1: Brooks' Law Scenario
You are 2 weeks behind on a 4-week project. Your manager offers to move 2 senior engineers from another team to help you "finish on time." How do you respond, and what do you suggest instead?

## Exercise 2: Critical Path Identification
A project has 4 tasks:
- A: Setup Server (2 days)
- B: Write API (5 days, depends on A)
- C: Write Frontend (3 days, depends on A)
- D: Integration (2 days, depends on B and C)
What is the Critical Path and the total duration?

## Exercise 3: Estimation Variance
You are in the "Initial Concept" phase of the Cone of Uncertainty. Your "best guess" is 3 months. What is the realistic range you should tell your stakeholders?

## Exercise 4: Retrospective Action Item
Rewrite this vague feedback into a SMART action item:
*"We spend too much time waiting for code reviews."*

## Exercise 5: Risk Matrix
Place "The lead developer getting the flu during launch week" on a 2x2 Risk Matrix (Probability vs. Impact). What is the mitigation strategy?

## Exercise 6: MoSCoW Prioritization
A banking app must launch in 1 month. Categorize:
1. "View Balance"
2. "Fingerprint Login"
3. "Transfer between accounts"
4. "Custom Profile Pictures"

## Exercise 7: Theory of Constraints
Your devs are pushing 20 PRs a day, but your one QA engineer can only test 5. Where is the bottleneck, and what should the devs do today?

## Exercise 8: EBS Calculation
A developer's last 3 tasks:
- Est: 1h, Actual: 2h
- Est: 4h, Actual: 4h
- Est: 10h, Actual: 20h
1. What is their average Velocity?
2. If they estimate a new task at 5h, what is the "Evidence-Based" duration?

---

## Answers

1. **Answer**: Politely decline. Explain that the ramp-up time will distract your team and likely make you *more* than 2 weeks late. Suggest **cutting the scope** (e.g., "Feature X becomes a manual process for launch") instead.
2. **Answer**: Path A-B-D (2 + 5 + 2 = 9 days). Task C is not on the critical path because it only takes 3 days.
3. **Answer**: 45 days (0.5x) to 360 days (4x). Or more simply: "Between 1 and 10 months."
4. **Answer**: "Every PR must have a reviewer assigned within 2 hours of submission, and the first round of feedback must be provided within 24 hours. We will track this in our weekly dashboard."
5. **Answer**: High Probability (everyone gets sick) / High Impact. Mitigation: **Cross-training**. Ensure at least one other person knows the deployment process.
6. **Answer**: 1. MUST. 2. SHOULD (or COULD). 3. MUST. 4. WON'T.
7. **Answer**: The bottleneck is QA. The devs should **stop writing new code** and spend the day helping the QA engineer (e.g., writing automated tests or performing manual QA) to clear the backlog.
8. **Answer**: 1. Velocities: 0.5, 1.0, 0.5. Average = 0.66. 2. 5h / 0.66 = **7.5 hours**.`
  }
];
