import type { Section } from '../types';

export const CH31_SECTIONS: Section[] = [
  {
    id: "31-1",
    number: "31.1",
    title: "The Career Ladder: A Complete Framework",
    content: `A **Career Ladder** (or Dual Track) is a formal document that defines the expectations, responsibilities, and competencies for every engineering role in an organization. 

## The Dual Track Model
Historically, the only way to "move up" in engineering was to become a manager. Modern engineering cultures use the **Dual Track** model, allowing engineers to grow in seniority while remaining "Individual Contributors" (ICs).

- **Management Track**: Focused on people, delivery, and organizational strategy.
- **IC Track**: Focused on technical architecture, system design, and technical mentorship.

## Common Competency Dimensions:
1. **Technical Complexity**: The difficulty of the problems solved.
2. **Impact / Scope**: Whether the engineer affects a single feature, a team, a department, or the whole company.
3. **Influence / Leadership**: How much the engineer improves the people around them.
4. **Communication**: The ability to articulate complex ideas to diverse audiences.

Understanding where you are on this ladder—and what the next rung requires—is the foundation of career growth.`
  },
  {
    id: "31-2",
    number: "31.2",
    title: "Junior Engineer: Learning to Execute",
    content: `The **Junior Engineer** (often "Level 1" or "Associate") is primarily focused on **learning how to ship production-ready code** within a well-defined scope.

## Key Expectations:
- **Task Execution**: Given a Jira ticket with clear requirements and a proposed solution, can they implement it?
- **Code Quality**: Learning to follow the team's style guide and write unit tests.
- **Curiosity**: Asking "Why?" and "How?" to build a foundational understanding of the system.

## The Biggest Hurdle: "Unblocking Yourself"
A Junior Engineer's greatest skill to learn is knowing *when* to ask for help. 
- **The 15-Minute Rule**: If you've been stuck on a problem for 15 minutes, spend 15 more minutes trying to solve it yourself and documenting what you tried. If still stuck, ask. 

## Success Criteria:
You are ready for the next level when you no longer need "hand-holding" for standard tasks and start identifying small technical improvements on your own.`
  },
  {
    id: "31-3",
    number: "31.3",
    title: "Engineer: Owning the Feature",
    content: `The **Engineer** (Level 2 or "Mid-level") is the "engine" of the team. They are expected to **own a feature from design to deployment**.

## Key Expectations:
- **Autonomy**: They can take a vague requirement and turn it into a technical plan without constant supervision.
- **Operational Ownership**: They understand how their code runs in production, how to monitor it, and how to debug it when it breaks.
- **Code Review**: They provide meaningful feedback to peers, looking for logical flaws, not just typos.

## The Shift from "How" to "What"
While the Junior asks "How do I write this loop?", the Engineer asks "What is the most robust way to handle this API failure?". 

## Success Criteria:
You are ready for the Senior level when you start thinking about the **system** rather than just your **code**, and when you begin mentoring Junior engineers effectively.`
  },
  {
    id: "31-4",
    number: "31.4",
    title: "Senior Engineer: Multiplying the Team",
    content: `The **Senior Engineer** is defined not just by their technical mastery, but by their **multiplier effect** on the team.

## The Multiplier Effect
A Senior Engineer is someone who makes the five people around them better. If they leave, the team's total productivity should drop by more than "one person's worth."

## Key Expectations:
- **Architectural Thinking**: Designing for the "Long Term." Recognizing technical debt before it's written.
- **Sponsorship/Mentorship**: Actively growing the skills of Junior and Mid-level engineers.
- **Problem Reframing**: Often, the best contribution a Senior makes is suggesting we *don't* build a feature because there is a simpler technical solution.

## The Senior "Floor"
In many companies, "Senior" is a "terminal level." You can stay a Senior for your whole career and be highly valued. To move beyond this, the nature of your work must change from **execution** to **strategy**.`
  },
  {
    id: "31-5",
    number: "31.5",
    title: "Senior to Staff Transition: The Hardest Step",
    content: `The transition from Senior to **Staff Engineer** is often the most difficult in an engineer's career. It's not just "Senior+"—it's a change in the **nature of the role**.

## The "Staff" Shift
- **Senior**: "I solve the hardest problems on my team."
- **Staff**: "I solve problems that span multiple teams or the entire organization."

## Why It's Hard
1. **Feedback Loops**: As a Senior, you get the "hit" of dopamine from merging a PR daily. As a Staff, your projects might take 6 months to show results.
2. **Ambiguity**: You aren't given "tickets." You are given "business problems" (e.g., "Our cloud costs are too high" or "Our builds are too slow").
3. **Influence without Authority**: You must convince other teams to adopt your architectural vision without being their manager.

To become Staff, you must stop being the "best coder" and start being the "best technical strategist."`
  },
  {
    id: "31-6",
    number: "31.6",
    title: "Staff Engineer: The Four Archetypes",
    content: `Will Larson's research identified four common "archetypes" of Staff-level engineers. Most Staff engineers embody one of these based on their strengths and the company's needs.

## 1. The Tech Lead
Guided by a single team, they handle the most complex technical challenges and ensure the team's architecture is sound.

## 2. The Architect
Responsible for the direction of a specific technical area (e.g., "Frontend Architecture" or "Data Infrastructure") across multiple teams.

## 3. The Solver
The "firefighter" who is dropped into the organization's most critical, broken, or high-risk projects to fix them.

## 4. The Right Hand
A technical partner to a senior leader (like a VP or CTO), helping them make strategic decisions and communicating technical reality to the "top."

| Archetype | Focus | Primary Tool |
| :--- | :--- | :--- |
| **Tech Lead** | Team Delivery | Design Docs |
| **Architect** | Cross-team Standards | RFCs / ADRs |
| **Solver** | Crisis / Complexity | Deep Debugging |
| **Right Hand** | Org Strategy | Narratives / Memos |`
  },
  {
    id: "31-7",
    number: "31.7",
    title: "Principal Engineer: Organizational Impact",
    content: `**Principal Engineers** (Level 6+) operate at the level of the entire company. Their work is often indistinguishable from that of a Director or VP, but focused on the technical axis.

## Key Expectations:
- **Multi-Year Vision**: Defining where the technology stack needs to be in 2-3 years.
- **External Representation**: Representing the company in industry standards bodies or at major conferences.
- **Cultural Stewardship**: Setting the "tone" for how engineering is done across the whole company.

## The "Principal" Scope
A Principal Engineer might identify that the company's choice of a specific database is going to be a multi-million dollar mistake in three years and lead the multi-quarter effort to migrate. They don't just "fix bugs"; they **prevent future classes of bugs**.`
  },
  {
    id: "31-8",
    number: "31.8",
    title: "Distinguished Engineer and Fellow: Changing the Field",
    content: `At the very top of the IC ladder are **Distinguished Engineers** and **Fellows**. These roles are rare, often found only in massive tech companies (Google, Microsoft, Amazon).

## The Field-Level Impact
A Fellow's impact is not just on their company, but on the **entire field of Computer Science**. 
- They might have invented a language (like Java or C++).
- They might have written the foundational papers on distributed systems.
- They are often the "technical conscience" of the industry.

## Roles at this Level:
- **Sanjay Ghemawat / Jeff Dean (Google)**: Pioneered MapReduce, BigTable, and Spanner.
- **Anders Hejlsberg (Microsoft)**: Creator of Turbo Pascal, C#, and TypeScript.

At this level, "Career" has evolved into "Legacy."`
  },
  {
    id: "31-9",
    number: "31.9",
    title: "Individual Contributor vs Engineering Management",
    content: `At the Senior level, you face a fork in the road: stay on the **IC Track** or move to the **Management Track**.

## The Manager Role
Engineering Management is a **change in profession**, not a promotion. You stop being a "builder" and start being a "multiplier."
- **Focus**: People development, team health, resource allocation, and stakeholder management.
- **Feedback**: Very slow. You might not know if you're a "good manager" for years.

## The IC Role
- **Focus**: Technical depth, system design, and execution.
- **Feedback**: Faster. The code works or it doesn't.

## Which to Choose?
Ask yourself: "When I have a free hour, do I want to read a technical RFC or a book on psychology?". If you love the "puzzle" of code, stay IC. If you love the "puzzle" of people and systems, try management.`
  },
  {
    id: "31-10",
    number: "31.10",
    title: "The Engineer-Manager Pendulum",
    content: `Charity Majors (CTO of Honeycomb) proposed the idea of the **Engineer-Manager Pendulum**: the best technical leaders are those who rotate between IC and Management roles throughout their careers.

## The Theory
- If you stay a manager too long, your technical skills atrophy, and you lose "reality-based" empathy for your team.
- If you stay an IC too long, you might lose sight of the business goals and human dynamics that make projects succeed.

## The Benefits of Swinging:
1. **Fresh Perspective**: A manager returning to IC work often fixes "broken" processes they never noticed from above.
2. **Technical Credibility**: An IC who has been a manager understands *why* certain business decisions are made and can communicate them better to the team.

Don't see management as a "one-way door." The most resilient careers often involve moving back and forth.`
  },
  {
    id: "31-11",
    number: "31.11",
    title: "Sponsorship vs Mentorship",
    content: `While often used interchangeably, **Mentorship** and **Sponsorship** are distinct and critical for career advancement.

## Mentorship (The "Coach")
Mentorship is when someone gives you advice, helps you develop skills, or acts as a "sounding board." It happens "in the room" with you.
- "Here is how you should structure that design doc."
- "Here is how I handled a similar conflict with a PM."

## Sponsorship (The "Champion")
Sponsorship is when someone uses their **social capital** to get you opportunities. It happens "outside the room" when you are not there.
- "We need a lead for the new Kafka project; I think Sarah is ready for it."
- "I've seen Alex's work; they should be promoted to Senior this cycle."

**Mentors help you grow; Sponsors help you move.** To reach the highest levels, you need both, but sponsorship is often the "missing ingredient" for underrepresented groups in tech.`
  },
  {
    id: "31-12",
    number: "31.12",
    title: "Building Your Technical Reputation",
    content: `In the modern world, your career is not just your job title—it's your **Technical Reputation**. 

## Why Reputation Matters
A strong reputation (within your company and the broader industry) leads to **Inbound Opportunity**. You stop "applying" for jobs and start being "recruited" for them.

## Ways to Build Reputation:
1. **Writing**: Start a technical blog. Explain *how* you solved a hard problem.
2. **Open Source**: Contribute to the tools you use. Even documentation fixes count.
3. **Public Speaking**: Present at local meetups or regional conferences.
4. **Internal "Artifacts"**: Write high-quality design docs that become the "standard" for your company.

## The "Brag Document"
Keep a running list of everything you've accomplished: PRs merged, people mentored, docs written, outages resolved. This is your "evidence" for promotion cycles and the foundation for your resume. Reputation is simply **the compounding interest of your documented impact**.`
  },
  {
    id: "31-13",
    number: "31.13",
    title: "The Design Document: How to Influence Through Writing",
    content: `For Staff+ engineers, the primary tool of influence is the **Design Document** (or RFC).

## The Goal of a Design Doc
It is not to "show off" how smart you are. It is to:
1. **Forced Thinking**: Writing identifies flaws that "whiteboarding" misses.
2. **Generate Consensus**: Get feedback from other teams before you build.
3. **Create a Record**: Why did we choose Postgres over Mongo in 2023?

## The Structure:
- **Context/Background**: Why are we doing this?
- **Goals/Non-Goals**: What is *out* of scope?
- **Proposed Solution**: High-level architecture and low-level details.
- **Alternatives Considered**: Crucial! Show that you didn't just pick the first idea.
- **Operational Considerations**: How will we monitor/deploy this?

**Pro-tip**: The best design docs focus heavily on the **Trade-offs**. There are no "perfect" solutions, only different sets of compromises.`
  },
  {
    id: "31-14",
    number: "31.14",
    title: "Technical Interviews: What They Actually Test",
    content: `Engineering interviews are often criticized for being "disconnected from daily work" (e.g., LeetCode). To succeed, you must understand what is actually being tested.

## 1. Coding (Algorithms/DS)
Tests **basic fluency** and **problem-solving under pressure**. They are looking for your ability to communicate your thought process while writing code.

## 2. System Design
Tests **architectural maturity**. Can you handle scale? Do you understand the trade-offs of CAP theorem? 

## 3. Behavioral (STAR Method)
Tests **Emotional Intelligence (EQ)** and **Cultural Fit**.
- **S**ituation: Context.
- **T**ask: What was the challenge?
- **A**ction: What did *you* specifically do?
- **R**esult: What was the outcome?

## The "Reverse Interview"
The questions you ask the interviewer are as important as your answers.
- "How do you handle technical debt?"
- "Tell me about the last postmortem you had."
- "What is the career growth path for ICs here?"

An interview is a **two-way assessment of fit**.`
  },
  {
    id: "31-15",
    number: "31.15",
    title: "Compensation: Equity, Salary, and Negotiation",
    content: `Engineering compensation is more complex than a simple "paycheck."

## The Components:
1. **Base Salary**: The "cash" you get every two weeks.
2. **Equity (RSUs / Options)**: A stake in the company's future value.
   - **RSUs (Restricted Stock Units)**: Common in public companies. Effectively cash once they vest.
   - **Options**: Common in startups. The "right to buy" stock at a fixed price. High risk, high reward.
3. **Bonus**: Often tied to individual or company performance.

## The "Vesting Schedule"
Usually 4 years with a "1-year cliff." You get 0% if you leave before 1 year, and 25% at the 1-year mark.

## Negotiation Rules:
- **Never give a number first**: Ask for the range for the role.
- **Always have a "Counter-offer"**: The strongest leverage you have is another company that wants to hire you.
- **Focus on the "Total Compensation" (TC)**: Don't get hung up on salary alone; look at the 4-year value of the equity.`
  },
  {
    id: "31-16",
    number: "31.16",
    title: "Burnout: Causes, Prevention, and Recovery",
    content: `Burnout is not just "working too hard." It is a state of emotional, physical, and mental exhaustion caused by **prolonged stress and a lack of agency**.

## The Six Mismatches (by Christina Maslach):
1. **Workload**: Too much to do, too little time.
2. **Control**: Responsibility without the authority to make decisions.
3. **Reward**: Lack of recognition or fair pay.
4. **Community**: Toxic team culture or isolation.
5. **Fairness**: Favoritism or lack of transparency.
6. **Values**: Working on something you find unethical or meaningless.

## Prevention for Engineers:
- **Set Boundaries**: No Slack/Email after 7 PM.
- **Take Your PTO**: The company will not collapse if you go to the beach for a week.
- **Focus on Agency**: If you feel like a "cog," try to take on a project where you have more creative control.

## Recovery:
Burnout cannot be fixed with a "long weekend." It often requires **months** of reduced load or a complete change of environment. Recognize the signs early (cynicism, irritability, low productivity) before you hit the "wall."`
  },
  {
    id: "31-17",
    number: "31.17",
    title: "Case Study: Will Larson's Staff Engineer Research",
    content: `Will Larson's book *Staff Engineer: Leadership beyond the management track* is the definitive study on this career transition.

## Key Insights:
- **The "Work on What Matters" Rule**: To reach Staff+, you must spend your time on things that are important to the *business*, not just things that are technically interesting.
- **Visibility is not optional**: If no one knows about your work, you are not having organizational impact.
- **Operating at "Org Scale"**: This means writing more than coding, and speaking more than writing. 

## The "Project as Proxy"
Many people are promoted to Staff based on a single "career-defining" project (e.g., a massive migration or a new product launch). Larson argues that you should choose projects that have **high visibility** and **high strategic value** if you want to move up.

## Takeaway:
The higher you go, the more your success depends on your **soft skills**—empathy, communication, and strategic thinking—rather than just your ability to write a fast hash map.`
  },
  {
    id: "31-18",
    number: "31.18",
    title: "Exercises",
    content: `## Exercise 1: Role Identification
Identify the likely Career Level (Junior, Senior, or Staff) for these activities:
1. "Writes a 5-page RFC to move the company from REST to GraphQL."
2. "Mentors a new hire on the team's code style and testing patterns."
3. "Completes a ticket to add a 'Clear' button to the search input."

## Exercise 2: The "15-Minute Rule"
You've been struggling to fix a CSS centering issue for 20 minutes. You've tried \`flex\`, \`grid\`, and \`margin: auto\`. Describe your next 15 minutes of action before you ask a senior for help.

## Exercise 3: Staff Archetypes
Which archetype (Tech Lead, Architect, Solver, Right Hand) would be best for:
*"A company has a massive security breach and needs their most senior engineer to lead the remediation."*

## Exercise 4: Sponsorship vs Mentorship
You want to be promoted to Senior. 
1. How could a **Mentor** help? 
2. How could a **Sponsor** help?

## Exercise 5: The "Brag Document"
List three technical and two "soft skill" accomplishments you've had in the last 6 months (mock data is fine).

## Exercise 6: STAR Method
Prepare a STAR response for the interview question: *"Tell me about a time you had a technical disagreement with a peer."*

## Exercise 7: The Pendulum
Give one reason why a Senior Manager might choose to return to an Individual Contributor (IC) role.

## Exercise 8: Burnout Audit
Look at the "Six Mismatches" of burnout. Which one do you think is the most common cause of burnout for engineers in a fast-paced startup? Why?

---

## Answers

1. **Answer**: 1. Staff. 2. Senior. 3. Junior.
2. **Answer**: 1. Search StackOverflow/MDN for that specific edge case. 2. Create a minimal 'CodePen' to isolate the issue. 3. Write a brief summary: "I'm trying to center X, I tried Y and Z, here is the CodePen showing the failure."
3. **Answer**: The **Solver**.
4. **Answer**: 1. Mentor: Reviews your design docs and points out where you can improve your architectural thinking. 2. Sponsor: Tells the Engineering Director that you should lead the next high-priority project.
5. **Answer**: (Self-assessment).
6. **Answer**: S: "We were choosing between Postgres and Dynamo." T: "I believed Postgres was better for relational integrity; peer wanted Dynamo for scale." A: "I built a small benchmark showing that Postgres met our scale needs while reducing code complexity." R: "Team chose Postgres, and we avoided the 'eventual consistency' bugs we would have had with Dynamo."
7. **Answer**: To "sharpen the saw"—to regain deep technical fluency with modern tools and avoid becoming "disconnected" from the reality of development.
8. **Answer**: Often **Workload** (due to the 'hustle' culture) or **Control** (due to changing priorities from founders).`
  }
];
