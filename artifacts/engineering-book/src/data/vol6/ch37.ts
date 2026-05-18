import type { Section } from '../types';

export const CH37_SECTIONS: Section[] = [
  {
    id: "37-1",
    number: "37.1",
    title: "What Mastery Looks Like in Software Engineering",
    content: `Mastery in software engineering is not about knowing every API or being the fastest coder. It is a shift from **tactical execution** to **strategic orchestration**.

## The Signs of a Master
1. **Simplicity over Sophistication**: A junior engineer writes complex code to prove they can. A master engineer writes code that looks "boring" because it is so easy to understand.
2. **Systemic Thinking**: Seeing how a change in the frontend affects the database, the cloud bill, and the on-call engineer's sleep.
3. **Problem Dissolution**: Instead of fixing a recurring bug, the master changes the architecture so the bug *cannot* exist.
4. **Compassion**: Understanding that software is built by people, for people. Technical mastery is useless without the ability to mentor and collaborate.

## The Dreyfus Model
In the **Dreyfus model of skill acquisition**, the expert (Master) moves beyond rules. They no longer rely on "Best Practices" blindly. Instead, they have an intuitive grasp of the situation based on deep experience, applying the right tool for the specific context.`
  },
  {
    id: "37-2",
    number: "37.2",
    title: "The Principal Engineer's Mode of Thinking",
    content: `The **Principal Engineer** (PE) operates at a level above the individual team. Their "customer" is the organization's technical health.

## The Three Lenses of the PE
1. **The Broad Lens**: Identifying patterns across different teams. If three teams are all struggling with the same database bottleneck, the PE builds a shared solution.
2. **The Deep Lens**: Diving into a critical, high-risk problem that no one else can solve. This might mean debugging a kernel panic or refactoring a core billing loop.
3. **The Long Lens**: Thinking 12-24 months ahead. What technologies will we need? What technical debt will kill us next year?

A Principal Engineer is a **Force Multiplier**. Their value is not measured by their own code, but by how much more effective they make every other engineer in the company.`
  },
  {
    id: "37-3",
    number: "37.3",
    title: "Technical Strategy: Aligning Engineering to Business",
    content: `Software does not exist in a vacuum. It exists to solve a business problem. Technical strategy is the bridge between the **"How"** and the **"Why."**

## Strategy vs. Tactics
- **Tactics**: "We should use Kafka for this service."
- **Strategy**: "To achieve our goal of real-time global inventory, we will adopt an Event-Driven Architecture across the supply chain."

## The Strategy Document
A good technical strategy identifies a **Challenge**, sets a **Guiding Policy**, and outlines a set of **Coherent Actions**.
- **Challenge**: Our deployment cycle is 4 weeks, slowing our ability to react to the market.
- **Policy**: We will move to a decentralized, microservices-based delivery model.
- **Actions**: 1. Invest in automated testing. 2. Migrate the monolith to K8s. 3. Train teams on DevOps.

If your engineering efforts aren't moving a business metric (Revenue, Cost, Risk, or Speed), you aren't doing strategy; you're doing a hobby.`
  },
  {
    id: "37-4",
    number: "37.4",
    title: "The 10-Year Horizon: Decisions That Age Well",
    content: `Most software is rewritten every few years. However, certain decisions—the **Architectural DNA**—last for decades.

## What Ages Well?
1. **Standard Protocols**: HTTP, SQL, JSON, and POSIX are the "lindy" technologies of our industry. They have stood the test of time.
2. **Clean Interfaces**: Hiding implementation details behind an interface allows the implementation to change without breaking the world.
3. **Data Ownership**: Clearly defined schemas and data owners prevent "data swamps."

## What Ages Poorly?
1. **The "Hype" Framework**: Choosing a framework because it's \#1 on Hacker News today.
2. **Tight Coupling**: Hard-coding your logic to a specific vendor's proprietary API.
3. **Implicit Knowledge**: Relying on "hero" engineers to know how the system works instead of documenting the architecture.

A master engineer asks: "If I leave this company tomorrow, will this decision still be helping the team in 2034?"`
  },
  {
    id: "37-5",
    number: "37.5",
    title: "Influence Without Authority",
    content: `As you grow in seniority, you will find that your biggest challenges are not technical, but social. You must lead people who don't report to you.

## Techniques of Influence
1. **Build Trust through Competence**: People follow those they respect. Be the engineer who consistently delivers and helps others.
2. **The Power of "Why"**: Don't tell a team to "Use TypeScript." Explain how TypeScript will reduce their production bugs and make their refactors safer.
3. **Seek First to Understand**: Before proposing a change, listen to the team's pain points. A solution that solves *their* problem will be adopted much faster.
4. **Social Proof**: Instead of a massive company-wide change, run a successful pilot with one team. Use their success to convince the others.

Influence is a **currency**. You earn it by being helpful and spend it when you need to drive a difficult architectural change.`
  },
  {
    id: "37-6",
    number: "37.6",
    title: "The Engineering Vision Document",
    content: `An **Engineering Vision** describes what "Good" looks like for your organization in 2-3 years. It is a north star that guides individual team decisions.

## Components of a Vision
- **Current State**: A brutally honest assessment of where you are.
- **Future State**: A vivid description of the destination. "Every engineer can deploy to production in under 10 minutes with zero manual approval."
- **Principles**: The values that will get you there. "Automation over Manual Effort," "Security is Everyone's Job."

## The "So What?"
A vision is useless if it's just a PDF on a wiki. It must be used to **vet projects**. When a new project is proposed, you ask: "Does this move us closer to our 2026 Vision, or further away?"`
  },
  {
    id: "37-7",
    number: "37.7",
    title: "Building the Technical Roadmap",
    content: `The roadmap is the bridge between the **Vision** and the **Sprint**. It is a sequence of milestones.

## How to Build a Roadmap
1. **Inventory of Debt**: List all the things that are slowing you down (old versions, manual steps, scaling limits).
2. **Business Requirements**: What features does the business need to ship?
3. **The "Enabler" Projects**: Identify the technical work that *must* happen before a feature can be built. (e.g., "We need to migrate to a new Auth provider before we can launch the Mobile App").
4. **Prioritization**: Use a framework like **RICE** (Reach, Impact, Confidence, Effort) to rank projects.

A master's roadmap is not a set of deadlines; it is a **sequence of capabilities**. "By Q3, we will have the capability to support 1 million concurrent users."`
  },
  {
    id: "37-8",
    number: "37.8",
    title: "Managing Technical Risk at the Organizational Level",
    content: `Risk management is about identifying the "bombs" hidden in your architecture and defusing them before they explode.

## Types of Technical Risk
- **Scaling Risk**: Will the DB crash at 2x current load?
- **Security Risk**: Are we one phishing email away from a total breach?
- **Compliance Risk**: Are we storing PII in our logs?
- **Delivery Risk**: Is the codebase so messy that we can't ship a simple feature?

## The Risk Register
Maintain a list of risks, categorized by **Probability** and **Impact**. 
- **High Probability / High Impact**: This is where your best engineers should be working. 
- **Low Probability / Low Impact**: This is technical debt you can probably live with.

Mastery is knowing that you can't eliminate all risk; you can only choose which risks are worth taking.`
  },
  {
    id: "37-9",
    number: "37.9",
    title: "The Art of the Trade-off",
    content: `Engineering is the art of making trade-offs. There are no "perfect" solutions, only solutions with different sets of problems.

## Common Trade-offs
- **Consistency vs. Availability** (CAP Theorem).
- **Latency vs. Throughput**.
- **Security vs. Developer Velocity**.
- **Cost vs. Performance**.

## The "Trade-off Matrix"
When presenting a solution, always present the alternatives and why you rejected them.
\`\`\`text
Option A: Serverless. 
  - Pro: Fast time-to-market, low cost. 
  - Con: Cold starts, vendor lock-in.
Option B: Kubernetes. 
  - Pro: High control, multi-cloud. 
  - Con: High operational cost, slow setup.
\`\`\`

A master engineer doesn't just say "We should do X." They say "We are choosing X and accepting its specific flaws (Y and Z) because X's strengths (A and B) are most important for our current goals."`
  },
  {
    id: "37-10",
    number: "37.10",
    title: "Knowing When to Rebuild vs Refactor vs Replace",
    content: `One of the most expensive mistakes an engineer can make is starting a "v2" rewrite that never finishes.

## The Framework
1. **Refactor**: When the system works but the code is hard to read or test. Low risk, high ROI.
2. **Replace**: When a specific component (e.g., a custom search engine) can be replaced by a standard tool (e.g., Elasticsearch). Medium risk.
3. **Rebuild (Rewrite)**: When the fundamental architecture is incompatible with future requirements (e.g., moving from a monolith to microservices). High risk.

## The "Strangler Fig" Pattern
Instead of a "Big Bang" rewrite, build the new system piece-by-piece around the edges of the old one. Gradually migrate traffic to the new parts until the old system is just an empty shell you can delete. This is the only way to successfully rebuild a high-scale system without dying in "Rewrite Hell."`
  },
  {
    id: "37-11",
    number: "37.11",
    title: "Open Source Strategy",
    content: `As an organization grows, your relationship with Open Source (OSS) becomes strategic.

## Using OSS
Don't just use it; vet it. Is the project maintained? Is the license (MIT, Apache, GPL) compatible with your business?

## Contributing to OSS
Why should your company pay you to work on someone else's code?
1. **Influence**: If you contribute to the tools you use (e.g., Kubernetes, React), you can influence their roadmap.
2. **Recruitment**: Open-sourcing your internal tools is the best way to attract top-tier talent.
3. **Reduced Maintenance**: If you maintain a private fork of an OSS tool, you have to merge upstream changes forever. If you get your changes merged into the main project, the community helps maintain them.

A master engineer identifies which internal tools are "commodities" (better to open source) and which are "differentiators" (keep secret).`
  },
  {
    id: "37-12",
    number: "37.12",
    title: "Patent Strategy for Engineers",
    content: `Patents are often seen as "legal stuff," but they are an engineering output.

## Defensive vs. Offensive
- **Offensive**: Suing others for using your tech (rare in software).
- **Defensive**: Building a "war chest" of patents so that if a competitor sues you, you can counter-sue them, forcing a settlement.

## What is Patentable?
Not "an idea," but a specific, non-obvious technical implementation of an idea.
- **Example**: "A way to shop online" (Not patentable). "A specific algorithm for distributed caching that uses 50% less memory by using Bloom filters in X way" (Patentable).

A master engineer keeps a "Lab Notebook" and documents their unique architectural breakthroughs. These are the company's intellectual property.`
  },
  {
    id: "37-13",
    number: "37.13",
    title: "The Research-Practice Gap: Bridging Theory and Production",
    content: `There is a massive amount of knowledge in academic CS papers (OSDI, SOSP, SIGMOD) that never makes it into standard industry practice.

## How to Bridge the Gap
1. **Read the Papers**: Don't wait for a blog post. Read the original papers on Paxos, Spanner, or Kafka.
2. **Translate to Reality**: Academic papers often assume "ideal" conditions. Your job is to adapt the theory to the messy reality of production (unreliable networks, buggy kernels).
3. **Experiment**: Use "Hackathons" to build prototypes of academic ideas.

The most successful companies (Google, Amazon, Meta) are those that have successfully closed this gap, turning "CS Research" into "Software Engineering Scale."`
  },
  {
    id: "37-14",
    number: "37.14",
    title: "Teaching as Mastery: Talks, Blogs, Mentoring",
    content: `You don't truly understand a concept until you can explain it to someone else. Teaching is the final stage of mastery.

## Mentoring
The goal of a mentor is to make themselves obsolete. You aren't giving them the answers; you are teaching them **how to think**.

## Writing and Speaking
Writing a blog post or giving a talk forces you to organize your thoughts and fill the gaps in your knowledge. 
- **The "Rubber Duck" Effect**: Often, in the process of explaining a bug to a junior engineer, you will realize the solution yourself.

A Master Engineer is, at heart, a **Perpetual Teacher**. They grow the organization's "Technical IQ" by sharing what they know.`
  },
  {
    id: "37-15",
    number: "37.15",
    title: "The Daily Practice of the Master Engineer",
    content: `Mastery is a habit, not a destination.

## The Routine
- **Continuous Learning**: Spend 1 hour every day reading code, a book, or a paper.
- **Hands-on Work**: No matter how senior you are, stay "in the code." If you stop coding, you lose your "engineering intuition."
- **Reviewing**: Spend time reviewing not just PRs, but RFCs and Design Docs. This is where the big decisions are made.
- **Reflecting**: At the end of every project, do a "Personal Post-mortem." What did I learn? What would I do differently?

## The Mental Model
The master engineer approaches every problem with a **Beginner's Mind**. They don't assume they have the answer. They ask questions, gather data, and let the problem reveal its own solution.`
  },
  {
    id: "37-16",
    number: "37.16",
    title: "The Final Word: This Book Is Your Map. You Must Walk the Territory.",
    content: `You have reached the end of this journey, but your path as a Master Engineer is only beginning.

## The Map vs. The Territory
This book has provided you with a **Map**—the mental models, the algorithms, the architectural patterns, and the hard-won wisdom of the industry. But as the saying goes: "The map is not the territory."

## Your Mission
- **Apply the Knowledge**: Reading about distributed systems won't make you a master. Building one that survives a network partition will.
- **Fail Gracefully**: You will make mistakes. You will cause outages. You will write technical debt. The master is simply the one who has failed more times than the beginner has even tried.
- **Be the Leader You Needed**: Use your mastery to build a better, more ethical, and more inclusive industry.

The world needs engineers who don't just "make it work," but who build systems that are robust, secure, and humane.

**Now, go build.**`
  }
];
