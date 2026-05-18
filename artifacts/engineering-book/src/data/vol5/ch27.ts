import type { Section } from '../types';

export const CH27_SECTIONS: Section[] = [
  {
    id: "27-1",
    number: "27.1",
    title: "Ward Cunningham's Original Metaphor — Precisely Understood",
    content: `The term "Technical Debt" was coined by Ward Cunningham in 1992. It is one of the most misused terms in software engineering, often used to describe "bad code." However, Ward's original intent was much more nuanced.

## The Financial Analogy
Cunningham's metaphor describes the trade-off between **shipping quickly** and **shipping "perfectly."** 
- **The Principal**: The effort required to refactor the code to the ideal state.
- **The Interest**: The extra effort you have to spend every time you build a new feature on top of the sub-optimal code.

## Why We Take on Debt
We take on debt when we don't yet fully understand the domain. We ship a "rough" implementation to get feedback from users. This feedback is the "earnings" from the debt. If we never shipped, we would never learn.

## The Core Misconception
Technical debt is not "messy code" written by bad developers. It is often **strategic code** written by good developers who decided that shipping now was more valuable than perfect abstraction.

\`\`\`python
# Strategic Debt Example:
# We don't know if users want 'Standard' or 'Premium' yet.
# Instead of building a complex 'Subscription' engine, 
# we'll just use a boolean flag for now.
# THIS IS DEBT. It's fast now, but will cost us later 
# when we add a third tier.
is_premium = True 
\`\`\`

The danger isn't in taking on debt; it's in failing to recognize that you have taken it on and failing to pay it back when the interest becomes too high.`
  },
  {
    id: "27-2",
    number: "27.2",
    title: "The Technical Debt Quadrant",
    content: `Martin Fowler refined the concept of technical debt by introducing the **Technical Debt Quadrant**, which categorizes debt based on **intent** and **competence**.

## 1. Deliberate & Reckless
"We don't have time for design." This is the most dangerous kind of debt. It's usually the result of management pressure and leads to a "Big Ball of Mud."

## 2. Deliberate & Prudent
"We must ship now and deal with the consequences." This is strategic debt. The team knows the "right" way to build it but chooses the "fast" way to meet a critical deadline, with a plan to refactor.

## 3. Inadvertent & Reckless
"What's a layered architecture?" This isn't debt; it's just low quality. The team doesn't know they are making a mistake.

## 4. Inadvertent & Prudent
"Now we know how we should have done it." This is the most common kind of debt in healthy teams. You build the best system you can with the knowledge you have, but as the project evolves, you realize your initial abstractions were wrong.

| | Reckless | Prudent |
| :--- | :--- | :--- |
| **Deliberate** | "No time for tests." | "Ship now, refactor in Q3." |
| **Inadvertent** | "What is a memory leak?" | "The domain is clearer now." |

Understanding which quadrant your debt falls into helps determine how to address it.`
  },
  {
    id: "27-3",
    number: "27.3",
    title: "Types of Technical Debt: Code, Architecture, Test, Documentation",
    content: `Technical debt isn't just about "dirty code." It manifests in several layers of the system.

## 1. Code Debt
This is the most visible type. It includes **code smells**, lack of modularity, and "copy-paste" inheritance. It's the "principal" that makes individual files hard to read.

## 2. Architectural Debt
This is the most expensive type. It involves fundamental flaws in how systems interact. 
- Example: Two services sharing the same database (tight coupling).
- Example: A synchronous API that should have been an asynchronous event-driven system.

## 3. Test Debt
When the test suite is slow, flaky, or missing coverage. This is "debt on your safety net." It increases the risk of paying down other debts because you can't be sure your refactoring didn't break anything.

## 4. Documentation Debt
When the README, API docs, and architecture diagrams are out of date. This increases the "interest" for new team members who have to spend hours asking questions instead of reading the docs.

## 5. Infrastructure Debt
Old versions of libraries, outdated OS images, or "snowflake" servers that were hand-configured and never automated with IaC (Infrastructure as Code).

Identifying the **type** of debt is the first step toward creating a **Technical Debt Register**.`
  },
  {
    id: "27-4",
    number: "27.4",
    title: "The Interest Metaphor: Measuring and Communicating Debt",
    content: `To explain technical debt to non-technical stakeholders, you must use the language of **Interest**.

## What is Technical Interest?
Interest is the **slowdown** in developer velocity. If a feature that should take 2 days takes 5 days because of "spaghetti code," those 3 extra days are the interest payment.

## Calculating the Interest Rate
While hard to measure exactly, you can estimate it:
- **Low Interest**: "It's a bit annoying, but doesn't slow us down much."
- **High Interest**: "We are afraid to touch this file because it might break everything."
- **Default/Bankruptcy**: "We can no longer ship new features because we spend 100% of our time fixing bugs caused by the existing code."

## Communicating to Business
Don't say: "We need to refactor the dependency injection container."
Say: "We are currently paying a 30% 'tax' on every new feature because of our old payment logic. If we spend two weeks 'paying down the principal,' we can increase our speed by 30% for the rest of the year."

| Term | Engineering Meaning | Business Meaning |
| :--- | :--- | :--- |
| **Principal** | Refactoring effort. | Upfront investment. |
| **Interest** | Extra dev time per feature. | Ongoing operational tax. |
| **Bankruptcy** | Unmaintainable code. | Total loss of agility. |`
  },
  {
    id: "27-5",
    number: "27.5",
    title: "The Technical Debt Register",
    content: `You cannot manage what you do not track. A **Technical Debt Register** is a living document (often a Jira board or a spreadsheet) that lists known debt.

## What to Include in the Register:
1. **ID/Title**: Short name (e.g., "Legacy Auth Migration").
2. **Description**: What is the debt?
3. **Interest Level**: High, Medium, Low (How much does it slow us down?).
4. **Principal Estimate**: How long to fix? (e.g., 3 developer-weeks).
5. **Risk**: What happens if we *don't* fix it? (e.g., "Security vulnerability in old library").

## The "Wall of Debt"
Visualizing the debt helps the team and product owners prioritize. A common technique is to use a **2x2 Matrix**:
- **High Interest / Low Principal**: Fix these "Quick Wins" immediately.
- **High Interest / High Principal**: These are major strategic projects.
- **Low Interest / Low Principal**: Ignore for now.
- **Low Interest / High Principal**: Likely never worth fixing.

By tracking debt explicitly, it stops being a "hidden secret" and becomes a part of the **product backlog**.`
  },
  {
    id: "27-6",
    number: "27.6",
    title: "Calculating Break-Even: When to Pay Down Debt",
    content: `Not all debt should be paid back. In fact, paying back debt on a feature that might be deleted next month is a waste of resources.

## The Break-Even Formula
You should pay down debt if the **cost of refactoring** is less than the **cumulative interest** over the remaining life of the feature.

\`\`\`
Principal < (Interest per month * Months of life remaining)
\`\`\`

## Example Scenario:
- **Feature X** takes 2 extra days to update every month due to debt.
- **Refactoring** will take 10 days.
- **Break-even** = 10 / 2 = 5 months.
- If you expect to maintain Feature X for more than 5 months, refactor it. If it's a temporary experiment, keep the debt.

## Diminishing Returns
There is a point of diminishing returns where "perfecting" code costs more than it saves. The goal is not "zero debt"; the goal is **sustainable velocity**. A codebase with zero debt is likely a sign that the team is over-engineering and not shipping enough value.`
  },
  {
    id: "27-7",
    number: "27.7",
    title: "Communicating Technical Debt to Non-Engineers",
    content: `The biggest friction between Engineering and Product often comes from a lack of shared language around debt. Product Managers (PMs) are incentivized by features; Engineers are incentivized by stability.

## Tips for Better Communication:
1. **Stop using the word "Refactor"**: To a PM, "refactor" sounds like "cleaning the house." Use "Investing in Velocity" or "Reducing Risk."
2. **Show the Trend**: Use a chart showing how long similar features took 6 months ago vs. today. If the trend is upward, that's the "Interest" becoming visible.
3. **Use the "Kitchen" Analogy**: You can't keep cooking if you never wash the dishes. Eventually, the kitchen becomes unusable.
4. **Quantify the Risk**: "If we don't upgrade this database, we are at risk of a 4-hour outage because the current version is end-of-life."

## The "Joint Ownership" Model
The PM and the Lead Engineer should "own" the Technical Debt Register together. The PM helps decide *when* to pay it (based on the roadmap), and the Engineer decides *what* to pay (based on technical impact).`
  },
  {
    id: "27-8",
    number: "27.8",
    title: "The Debt-Feature Ratio: Maintaining Sustainable Velocity",
    content: `How much time should a team spend on technical debt? While it varies, high-performing teams typically follow a **Debt-Feature Ratio**.

## Common Allocations:
- **The 80/20 Rule**: 80% on new features, 20% on technical debt and "internal health."
- **The "Tax" Model**: Every feature includes a 20% "refactoring tax" where the engineer cleans up the immediate area around the code they are changing (**The Boy Scout Rule**).

## Signs your Ratio is Wrong:
- **Too much debt work**: The business feels like engineering is a "black hole" where nothing comes out.
- **Too little debt work**: The engineers are frustrated, turnover is high, and the "Change Failure Rate" is increasing.

## Measuring "Debt Impact"
Use your **DORA metrics** (see Chapter 28). If your "Lead Time for Changes" is slowly increasing for similar-sized tasks, your debt is likely growing faster than your capacity to pay it.`
  },
  {
    id: "27-9",
    number: "27.9",
    title: "Architectural Debt: The Most Expensive Kind",
    content: `Code debt can be fixed in a few days. **Architectural debt** can take months or years to resolve because it involves changing the fundamental assumptions of the system.

## Common Sources of Architectural Debt:
1. **Wrong Abstractions**: Choosing a "NoSQL" database when the data is highly relational.
2. **Tight Coupling**: Services that cannot be deployed independently.
3. **Implicit Dependencies**: Systems that rely on "side effects" rather than explicit contracts.
4. **Monolithic Sprawl**: A monolith that has grown so large that builds take an hour and no one understands the whole thing.

## The Cost of Delay
Architectural debt is "compound interest." The longer you wait, the more new code is written on the wrong foundation, making the eventual migration even harder.

## Strategy: The "Strangler Fig" Pattern
Don't try to "re-platform" in one giant leap. Instead, use the **Strangler Fig** pattern:
1. Create a new service for the new architecture.
2. Slowly migrate individual routes or functions from the old system to the new one.
3. Eventually, the old system is "strangled" and can be deleted.

This allows you to pay down architectural debt **incrementally** while still delivering value.`
  },
  {
    id: "27-10",
    number: "27.10",
    title: "Managing Debt in Fast-Growth Startups",
    content: `In a startup, the "Interest Rate" of technical debt is often secondary to the "Risk of Death." If the startup runs out of money before shipping a product, perfect code won't save it.

## The Startup Debt Strategy:
- **High Tolerance**: It is perfectly acceptable to take on massive "reckless" debt to find Product-Market Fit.
- **The "Disposable" Mindset**: Write code with the expectation that if the feature succeeds, you will likely rewrite it.
- **Avoid "Dead-End" Debt**: Don't take on debt that makes it impossible to pivot. (e.g., choosing a proprietary database that locks you in).

## The "Post-Series A" Pivot
Once a startup finds its footing and begins to scale, the focus must shift. The debt that helped you survive will now kill your ability to scale. This is where many startups fail—they try to keep the "move fast and break things" culture for too long, leading to a **technical collapse**.`
  },
  {
    id: "27-11",
    number: "27.11",
    title: "Managing Debt in Established Enterprises",
    content: `In a large enterprise, the problem isn't usually "moving too fast"; it's **institutional inertia**. Debt is often decades old, written in languages no one on the team speaks fluently.

## The Enterprise Debt Strategy:
- **Legacy as a Service**: Wrap old systems in clean APIs (the "Adapter" pattern). Stop the "bleeding" by ensuring no new code touches the legacy mess directly.
- **The "Sustaining" Team**: Dedicated teams for maintaining and slowly modernizing legacy systems, allowing feature teams to move faster.
- **Incentivize Modernization**: Make "decommissioning old systems" a high-status goal, as celebrated as launching new ones.

## The Danger of the "Big Rewrite"
Enterprises love to fund "Version 2.0" projects. These almost always fail or take twice as long as expected. Success in the enterprise comes from **continuous, incremental modernization** (refactoring), not the "Second System Syndrome."`
  },
  {
    id: "27-12",
    number: "27.12",
    title: "The 20% Rule and Other Time Allocation Strategies",
    content: `How do you actually carve out the time? Here are the three most common models:

## 1. The 20% Rule (The "Google" Model)
Engineers spend one day a week (or every 5th sprint) on whatever they think is best for the system's health. 
- **Pros**: Empowers engineers, keeps the codebase clean.
- **Cons**: Hard to track; business may feel "robbed" of 20% of capacity.

## 2. The "Buffer" Model
When estimating a feature, add a 20-30% "buffer" for cleaning and testing.
- **Pros**: Debt work is "baked in" to the feature.
- **Cons**: Can lead to dishonest estimation and lack of transparency.

## 3. The "Product Debt" Backlog
Technical debt items are groomed and prioritized alongside user stories.
- **Pros**: High transparency, business buy-in.
- **Cons**: Technical items often get "pushed" in favor of "one more feature."

## Which to choose?
For most teams, a **hybrid** works best: The Boy Scout Rule (small cleanups) for every PR, plus a dedicated "Tech Debt Sprint" once a quarter for larger architectural items.`
  },
  {
    id: "27-13",
    number: "27.13",
    title: "Case Study: Twitter's Technical Debt Crisis",
    content: `In its early years (2007-2010), Twitter was famous for the "Fail Whale"—the graphic shown when the site crashed. This was the result of massive technical debt.

## The "Ruby on Rails" Monolith
Twitter started as a monolithic Ruby on Rails app. As traffic exploded, the synchronous nature of the Rails architecture couldn't handle the "fan-out" (one celebrity tweet being sent to millions of followers).

## The Interest Payment
The site went down constantly. Engineers couldn't ship new features because they were fighting fires 24/7. This is the definition of **Technical Bankruptcy**.

## The Paydown
Twitter eventually had to undertake a massive, multi-year "re-architecting" effort:
1. They moved the backend from Ruby to **Scala/JVM** for better concurrency.
2. They broke the monolith into **microservices**.
3. They built a custom distributed database (Gizzard/Manhattan).

## The Lesson
Twitter survived because they had enough capital to "buy their way out" of debt. Most companies don't. The "Fail Whale" remains a cautionary tale of what happens when you ignore technical interest for too long.`
  },
  {
    id: "27-14",
    number: "27.14",
    title: "Exercises",
    content: `## Exercise 1: Quadrant Categorization
Categorize the following scenario into one of the four quadrants:
*"The team used a manual CSV export for billing because they didn't have time to integrate the Stripe API before the product launch."*

## Exercise 2: Interest Calculation
A developer spends 10 hours a week fixing bugs in a legacy module. It would take 80 hours to refactor that module and reduce the bug rate to near zero.
1. What is the "Principal"?
2. What is the "Interest" (per week)?
3. What is the "Break-Even" point in weeks?

## Exercise 3: Communicating to Stakeholders
Your team needs to upgrade a framework (e.g., React or Django) to a new version. This will take 2 weeks and deliver no new features. Write a 2-sentence explanation for a Product Manager emphasizing **Value** or **Risk**.

## Exercise 4: The Register
Draft a one-line entry for a Technical Debt Register for a system that lacks automated integration tests for its "Checkout" flow.

## Exercise 5: The Boy Scout Rule
During a PR for a small UI change, you notice a 200-line function that is hard to read. You are not touching that function for your feature. Should you refactor it now? Why or why not?

## Exercise 6: Architectural Debt
Which of these is Architectural Debt (vs Code Debt)?
1. A variable named \`data2\`.
2. A system that can only scale vertically (adding more CPU) instead of horizontally.
3. A missing unit test for a login function.

## Exercise 7: Startup Strategy
You are the first engineer at a startup. You need to build an MVP in 4 weeks. List two "Prudent" debts you might take on.

## Exercise 8: Strangler Fig
Describe how you would use the "Strangler Fig" pattern to replace a legacy "Email Sending" module in a monolith.

---

## Answers

1. **Answer**: Deliberate & Prudent (Strategic debt).
2. **Answer**: 1. Principal = 80 hours. 2. Interest = 10 hours/week. 3. Break-even = 8 weeks.
3. **Answer**: "We need to invest two weeks in a framework upgrade to ensure we remain compatible with modern security patches and avoid the 'obsolescence tax' that currently slows down our UI development. This investment will prevent a major security risk and keep our future development speed sustainable."
4. **Answer**: ID: "CHECKOUT-TEST-DEBT" | Description: "Missing integration tests for Checkout" | Interest: High (Manual QA required) | Principal: 1 week | Risk: Regression in revenue-critical path.
5. **Answer**: Usually no, not as part of the same PR. This is "Scope Creep." Better to create a ticket in the Register or do a separate, tiny PR. However, if you can clean up *one line* without risk, do it.
6. **Answer**: #2. Scaling limits are fundamental architectural constraints.
7. **Answer**: 1. Hard-coded configurations (instead of a complex CMS). 2. Manual deployment scripts (instead of full CI/CD).
8. **Answer**: 1. Build a new 'Email Service'. 2. Add a proxy/router in the monolith. 3. Redirect one email type (e.g., 'Welcome Email') to the new service. 4. Monitor. 5. Repeat for other email types until the old module is unused.`
  }
];
