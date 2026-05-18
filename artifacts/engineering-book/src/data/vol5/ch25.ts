import type { Section } from '../types';

export const CH25_SECTIONS: Section[] = [
  {
    id: "25-1",
    number: "25.1",
    title: "Culture Is Technical Strategy",
    content: `In software engineering, we often treat "culture" as a soft topic—something for HR or team-building retreats. This is a fundamental misunderstanding of the discipline. **Culture is the operating system of an engineering organization.** It dictates how technical decisions are made, how risk is assessed, and how knowledge is transferred.

## The Technical Impact of Culture
When a culture prioritizes "velocity at all costs" without the supporting infrastructure, the technical result is not just fast features, but **unmanaged technical debt** and **architectural fragility**. Conversely, a culture that values **operational excellence** will manifest in high test coverage, robust CI/CD pipelines, and predictable release cycles.

Consider the choice between a monolithic architecture and microservices. This is rarely a purely technical decision. It is often a cultural one:
- Does the team value autonomy and independent deployment (favoring microservices)?
- Or do they value consistency and ease of cross-cutting changes (favoring a monolith)?

## Conway's Law in Action
**Conway's Law** states that organizations design systems which mirror their own communication structures. If your team culture is siloed, your architecture will be siloed. If your culture is collaborative and open, your systems will likely be more integrated and modular.

\`\`\`python
# A "siloed" culture's API design often looks like this:
class OrderService:
    def process(self, order):
        # I don't trust the Billing team, so I'll reimplement 
        # their logic here to avoid talking to them.
        pass
\`\`\`

Engineering leadership is about realizing that you cannot "fix" a codebase without addressing the culture that produced it. If you want a better system, you must first build a better team.`
  },
  {
    id: "25-2",
    number: "25.2",
    title: "Psychological Safety: Google's Project Aristotle",
    content: `What makes a team "high-performing"? Between 2012 and 2014, Google conducted a massive study code-named **Project Aristotle** to answer this. They analyzed 180 teams across the company, looking at everything from how often they ate lunch together to their educational backgrounds.

## The Surprising Conclusion
The researchers found that the *who* on the team mattered far less than the *how* the team worked together. The single most important factor—by a significant margin—was **Psychological Safety**.

**Psychological safety** is the belief that one will not be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes. On a psychologically safe team, engineers feel comfortable saying:
- "I don't understand how this regex works."
- "I think this deployment strategy is risky."
- "I accidentally deleted the production staging table."

## The Impact on Code Quality
In an environment lacking psychological safety, engineers hide their ignorance and their errors. This leads to **silent failures** and **latent bugs**. If a junior developer is afraid to ask for a code review because they might look "stupid," they will merge untested or poorly understood code.

| Factor | High Psychological Safety | Low Psychological Safety |
| :--- | :--- | :--- |
| **Error Handling** | Discussed openly; systems improved. | Hidden; blame-shifting occurs. |
| **Innovation** | High; people take calculated risks. | Low; people stick to "safe" paths. |
| **Knowledge Sharing** | High; mentoring is natural. | Low; knowledge is hoarded as power. |

Project Aristotle proved that without safety, even the most brilliant individuals fail to form a great team.`
  },
  {
    id: "25-3",
    number: "25.3",
    title: "The Five Team Dynamics That Predict Success",
    content: `While Project Aristotle identified psychological safety as the foundation, it also highlighted four other dynamics that characterize high-performing engineering teams.

## 1. Dependability
Team members get things done on time and meet Google's high bar for excellence. In engineering terms, this means **predictable velocity** and **reliable code**. If you say a feature will be ready for the sprint demo, it is ready.

## 2. Structure & Clarity
Are goals, roles, and execution plans clear? Engineers need to know:
- What are we building?
- Why are we building it?
- Who is responsible for what?

A lack of clarity leads to **duplicated effort** or **coverage gaps** (e.g., "I thought you were writing the integration tests!").

## 3. Meaning of Work
Work is personally important to team members. When engineers find meaning—whether in solving a hard technical problem or helping a specific user group—they are more likely to achieve **flow state** and produce high-quality work.

## 4. Impact of Work
Team members believe their work matters and creates change. In a large enterprise, it's easy to feel like a "cog in a machine." High-performing teams maintain a clear line of sight from a line of code to a business outcome.

## The Hierarchy of Needs
Think of these five dynamics as a pyramid:
1. **Psychological Safety** (The Foundation)
2. **Dependability**
3. **Structure & Clarity**
4. **Meaning**
5. **Impact** (The Peak)

Without the foundation, the peak is unattainable.`
  },
  {
    id: "25-4",
    number: "25.4",
    title: "Building Psychological Safety: Practical Techniques",
    content: `As a lead engineer or manager, psychological safety isn't something you "announce"; it's something you **model**.

## Modeling Vulnerability
The fastest way to build safety is for leaders to admit when they are wrong or when they don't know something. 
- "I'm not sure how this Kafka partitioning works; can someone explain it to me?"
- "I made a mistake in that architecture proposal; thank you for catching it."

## The "Anxiety-to-Learning" Shift
When a mistake happens, shift the conversation immediately from "Who did this?" to "What can we learn?" or "How can our systems prevent this next time?".

## Practical Rituals
- **The "Stupid" Question Rule**: Explicitly encourage questions during design reviews.
- **Checked-at-the-Door Hierarchy**: Ensure that in technical discussions, the best idea wins, regardless of job title.
- **Appreciation Rounds**: Regularly acknowledge the "invisible" work (e.g., fixing CI flakes, updating docs).

## Measuring Safety
You can use a short, anonymous survey with questions like:
- "If you make a mistake on this team, it is often held against you." (Strongly Disagree is good)
- "It is safe to take a risk on this team."

By actively cultivating these behaviors, you create an environment where **innovation** can actually happen because the fear of failure has been mitigated.`
  },
  {
    id: "25-5",
    number: "25.5",
    title: "The Westrum Organizational Culture Model",
    content: `Sociologist Ron Westrum studied safety-critical organizations (like hospitals and aviation) and identified three types of cultures based on how they process information. This model was later adopted by the **DORA** (DevOps Research and Assessment) team as a primary predictor of software delivery performance.

## The Three Levels

1. **Pathological (Power-Oriented)**: Information is hoarded. Messengers of bad news are "shot." Failure is covered up or blamed on individuals.
2. **Bureaucratic (Rule-Oriented)**: Information is processed through rigid channels. Responsibilities are narrowly defined. Failure is handled by creating more rules.
3. **Generative (Performance-Oriented)**: Information is actively sought. Messengers are trained. Failure leads to inquiry and system improvement.

## Why It Matters for Engineering
In a generative culture, the goal is the **mission**, not the ego or the rules. If a system goes down, the generative team asks, "How did our telemetry fail to catch this?" whereas the bureaucratic team asks, "Which process did the engineer violate?"

| Feature | Pathological | Bureaucratic | Generative |
| :--- | :--- | :--- | :--- |
| **Cooperation** | Low | Modest | High |
| **Messengers** | Shot | Ignored | Trained |
| **Responsibilities** | Shirked | Boxed | Shared |
| **Bridging** | Discouraged | Allowed | Encouraged |
| **Failure** | Blame | Justice | Inquiry |
| **Novelty** | Crushed | Problems | Implemented |

High-performing DevOps teams are almost always **Generative**.`
  },
  {
    id: "25-6",
    number: "25.6",
    title: "Generative vs Bureaucratic vs Pathological Cultures",
    content: `Let's dive deeper into how these Westrum types manifest in daily engineering life.

## The Pathological Team
In a pathological team, the "Senior Architect" might refuse to share the database schema because "knowledge is power." If a junior developer breaks the build, they are publicly shamed in Slack. The result is a team that is terrified to change anything, leading to **stagnation** and **bit rot**.

## The Bureaucratic Team
This is common in large, older enterprises. To deploy a single line of CSS, you might need:
1. A Jira ticket.
2. An Architecture Review Board approval.
3. A Change Advisory Board (CAB) meeting.
4. A manual sign-off from three managers.

The intent is safety, but the result is **friction**. People stop trying to innovate because the "paperwork" isn't worth it.

## The Generative Team
In a generative team, the focus is on **enabling flow**. If deployments are risky, the team doesn't add more approvals; they invest in **automated testing** and **canary deployments**. They encourage "bridging"—engineers talking directly to product owners and customers without going through three layers of management.

## Real-World Example: Incident Response
- **Pathological**: "Find out who pushed that commit and revoke their merge rights."
- **Bureaucratic**: "Add a 15-point checklist to the deployment manual."
- **Generative**: "Add an automated rollback if the 5xx error rate exceeds 1% during a deploy."

The Generative approach is the only one that scales with technical complexity.`
  },
  {
    id: "25-7",
    number: "25.7",
    title: "How to Change a Culture",
    content: `Changing culture is significantly harder than changing a database schema. You cannot "refactor" culture overnight. It requires consistent, long-term effort.

## Culture Follows Structure
One of the most effective ways to change culture is to change the **incentives** and **tools**. 
- If you want a culture of quality, make "zero open P0 bugs" a requirement for new feature work.
- If you want a culture of sharing, make "mentorship" a key criteria for promotion to Senior Engineer.

## The Role of Symbols
Symbols matter. When a leader spends their Friday afternoon fixing "papercuts" (small, annoying bugs) in the developer experience, it sends a powerful message that **DevEx** matters.

## The "Shadow of the Leader"
Engineers watch what their leaders *do* more than what they *say*.
- If a manager says "work-life balance is important" but sends emails at 2 AM, the culture will be one of burnout.
- If a lead engineer says "we value tests" but merges a PR with a \`--no-verify\` flag, the culture will be one of cutting corners.

## The Iterative Approach
1. **Identify the Gap**: Where are we (Westrum) vs. where do we want to be?
2. **Small Wins**: Implement one "generative" practice (e.g., blameless postmortems).
3. **Reinforce**: Publicly praise behaviors that align with the target culture.
4. **Prune**: Address individuals who actively undermine the culture (the "Brilliant Jerk" problem).

Culture change is a marathon of small, consistent actions.`
  },
  {
    id: "25-8",
    number: "25.8",
    title: "Remote and Hybrid Engineering Teams",
    content: `The shift to remote and hybrid work isn't just a change in location; it's a change in the **mechanics of collaboration**.

## The Visibility Gap
In an office, you see someone struggling with their IDE and offer help. In remote work, that struggle is invisible. To compensate, teams must become **intentionally visible**. This means over-communicating progress, blockers, and even "idle thoughts" in shared channels.

## Synchronous vs. Asynchronous
The biggest mistake remote teams make is trying to replicate the office via 8 hours of Zoom calls. This leads to "Zoom fatigue" and kills **deep work**. 

| Activity | Remote Best Practice |
| :--- | :--- |
| **Status Updates** | Async (Slack, Standup tool, Jira) |
| **Deep Problem Solving** | Sync (Zoom + Whiteboard tool) |
| **Social Bonding** | Optional Sync (Coffee chats, games) |
| **Decision Making** | Async (RFCs, Design Docs) |

## The "Office as a Tool"
For hybrid teams, the office should be used for high-bandwidth activities:
- Quarterly planning.
- Complex architectural "war-gaming."
- Onboarding new hires.

Forcing people into the office for "heads-down" coding is a misuse of the resource. A successful remote culture is built on **trust** and **results**, not "butts in seats."`
  },
  {
    id: "25-9",
    number: "25.9",
    title: "Async-First Communication",
    content: `**Async-First** is the philosophy that communication should not require the recipient to be present at the exact moment the message is sent. This is the "secret sauce" of high-scale open-source projects (like the Linux kernel) and successful remote companies (like GitLab).

## The Power of the "Default"
In an async-first culture, the default way to share an idea is a **written document**, not a meeting.

## Benefits for Engineering
1. **Preserved Context**: Slack messages disappear, but a Design Doc is a permanent record of *why* a decision was made.
2. **Deep Work**: Engineers can block out 4-hour chunks for coding without being interrupted by "Quick sync?" requests.
3. **Inclusion**: Team members in different time zones (or those who need time to process information) can contribute equally.

## How to Write for Async
- **Include Context**: Instead of "It's broken," write "I'm seeing a 403 on the /auth endpoint in the staging env; here are the logs."
- **State the Goal**: "I'm looking for feedback on the data model by EOD Wednesday."
- **Use Threads**: Keep discussions organized so others can catch up quickly.

\`\`\`markdown
# Example: Effective Async Update
Team, I'm stuck on the Redis migration.
- **Problem**: Keys aren't expiring as expected.
- **Hypothesis**: We're using \`SET\` instead of \`SETEX\`.
- **Ask**: Has anyone seen this behavior in our \`cache_lib\`? 
- **Urgency**: Low. I'm switching to the UI task for now.
\`\`\`

Async-first requires a higher level of **writing literacy**, but the payoff in productivity is immense.`
  },
  {
    id: "25-10",
    number: "25.10",
    title: "Documentation Culture: Writing as Engineering",
    content: `Many engineers view documentation as a "chore" to be done after the "real work" is finished. In a high-maturity culture, **documentation is the work**.

## The "Bus Factor"
Documentation is the primary way to increase your team's **Bus Factor** (how many people need to be hit by a bus before the project stalls). If the knowledge of how to deploy the system exists only in your head, you are a single point of failure.

## Types of Engineering Documentation
1. **READMEs**: The "front door" of the project.
2. **Design Docs / RFCs**: The rationale behind major changes.
3. **Runbooks**: Step-by-step guides for incident response.
4. **ADRs (Architecture Decision Records)**: A log of why we chose X over Y.

## Documentation as Code
The best way to ensure docs are maintained is to treat them like code:
- Keep them in the **same repository** as the code (Markdown files).
- Require doc updates in **Pull Requests**.
- Use tools like \`MkDocs\` or \`Docusaurus\` to generate a searchable site.

## The Culture Shift
To build a documentation culture, leaders must:
- Praise great docs during code reviews.
- Point people to the documentation when they ask a common question (politely!).
- Allocate time in the sprint specifically for documentation debt.

Remember: **Code is for the machine; documentation is for the humans who will maintain that machine for the next five years.**`
  },
  {
    id: "25-11",
    number: "25.11",
    title: "Case Study: Google's Engineering Culture",
    content: `Google is often cited as the gold standard for engineering culture, but it's important to understand the *mechanisms* that sustain it.

## The Peer Review Culture
At Google, almost everything is peer-reviewed. This isn't just about catching bugs; it's about **knowledge normalization**. Whether it's a line of code, a design document, or a promotion packet, the "peer" is the authority.

## The "Readability" Program
Google has a unique system for "Readability" in specific languages (C++, Java, Go, etc.). To merge code without a "Readability" owner's approval, you must earn "Readability" yourself by demonstrating mastery of Google's specific style and idioms. This ensures a **massive codebase feels like it was written by one person**.

## Site Reliability Engineering (SRE)
Google pioneered the SRE model, which treats operations as a software problem. 
- **Error Budgets**: Instead of "100% uptime," they define a budget of allowed failure. If the budget is spent, all new feature work stops to focus on reliability. This aligns incentives between developers and ops.

## 20% Time
Though its usage has varied over the years, the concept of "20% time" (allowing engineers to work on side projects) fostered a culture of **bottom-up innovation**. Gmail and AdSense were born from this.

## Takeaway
Google's culture isn't just "be nice." It's a set of rigorous, automated, and social systems designed to maintain **quality at scale**.`
  },
  {
    id: "25-12",
    number: "25.12",
    title: "Case Study: Amazon's Leadership Principles as Engineering Culture",
    content: `While Google's culture is often described as "academic" and "collaborative," Amazon's is "operational" and "results-oriented." Both are highly successful, but they take different paths.

## The Leadership Principles (LPs)
Amazon's 16 Leadership Principles (e.g., **Customer Obsession**, **Ownership**, **Invent and Simplify**, **Bias for Action**) are not just posters on the wall. They are used daily in:
- Hiring (interviews are structured around LPs).
- Promotion (candidates must provide LP evidence).
- Design Reviews (is this "Customer Obsessed" or just "technically cool"?).

## The 6-Page Narrative
Amazon famously banned PowerPoint. Instead, they use 6-page narrative memos. At the start of a meeting, everyone sits in silence for 20 minutes to read the memo. This ensures **deep thinking** and prevents "the most charismatic person in the room" from winning the argument with flashy slides.

## Two-Pizza Teams
Amazon's structural philosophy is that no team should be larger than what can be fed by two pizzas (roughly 6-10 people). This minimizes communication overhead and maximizes **autonomy**. Each team "owns" their service from "cradle to grave" (build it, run it, on-call for it).

## Working Backwards
Every new project starts with a **Press Release (PR) and FAQ**. You write the PR for the customer first, then you write the code. This ensures the engineering effort is always aligned with a real customer need.

## Takeaway
Amazon's culture is a masterclass in using **written principles and rigorous processes** to drive alignment across a massive, decentralized organization.`
  },
  {
    id: "25-13",
    number: "25.13",
    title: "Exercises",
    content: `## Exercise 1: Culture Diagnosis
Using the Westrum Model, categorize your current (or a past) team. Provide three specific examples of behaviors (how info is handled, how failures are treated) that support your categorization.

## Exercise 2: Conway's Law Audit
Draw your current team's communication structure (who talks to whom most often). Then, draw your system architecture. Identify at least one area where the system design was influenced by a communication silo.

## Exercise 3: Psychological Safety Role-Play
An engineer on your team just accidentally dropped the 'users' table in the development environment. Write the Slack message you would send to the team to model psychological safety while still addressing the issue.

## Exercise 4: Async-First Transformation
Take a standard 30-minute "Weekly Status Meeting" and describe how you would transform it into an async process. What tools would you use, and what would the new workflow look like?

## Exercise 5: The "Brilliant Jerk" Scenario
You have an engineer who is 10x more productive than anyone else but is toxic to the team's psychological safety (insulting others' code, hoarding knowledge). Based on the Project Aristotle findings, what is the long-term risk of keeping this person on the team?

## Exercise 6: Documentation Audit
Pick a repository you maintain. Check the README. Does it tell a new developer:
1. How to install?
2. How to run tests?
3. How to deploy?
4. Who to contact for help?
Score it from 1-10.

## Exercise 7: Leadership Principles
Draft two "Engineering Principles" for a hypothetical team. One should focus on **Quality** and the other on **Speed**. How would you resolve a conflict between the two?

## Exercise 8: Remote Onboarding
List three specific activities you would include in a "Remote Onboarding Week" to ensure a new hire feels socially connected to the team despite never meeting them in person.

---

## Answers

1. **Answer**: Pathological (blame/hoarding), Bureaucratic (rules/channels), Generative (inquiry/mission). Examples should focus on Information Flow.
2. **Answer**: Looking for "Mirroring." E.g., "The frontend and backend are separate repos because the teams never talk, leading to messy API contracts."
3. **Answer**: "Hey team, the dev 'users' table is down. I'm working on the restore now. Once it's back, let's have a quick huddle to see how we can add a 'production-only' guardrail to our DB tools so this can't happen easily again. No harm done, just a good chance to improve our scripts!"
4. **Answer**: Use a shared document or specialized tool (like Geekbot or Status Hero). Everyone posts: Done, Doing, Blocked. Discussions happen in threads. Result: 30 mins returned to everyone's calendar.
5. **Answer**: The 10x output of the jerk is outweighed by the suppressed output of the rest of the team. Without safety, others stop contributing ideas, leading to lower total system performance and high turnover.
6. **Answer**: Self-assessment. 10/10 means a total stranger could contribute a PR within an hour.
7. **Answer**: Example: "We value 'Automated Truth' (Quality)" and "We value 'Incremental Delivery' (Speed)." Conflict resolution: "We never sacrifice 'Automated Truth' for 'Incremental Delivery' because unverified speed is just debt."
8. **Answer**: 1. Buddy system (daily 15m chat). 2. Virtual "Intro Tour" (short meetings with other teams). 3. Documentation "Scavenger Hunt" (to encourage reading the docs).`
  }
];
