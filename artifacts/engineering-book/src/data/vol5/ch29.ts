import type { Section } from '../types';

export const CH29_SECTIONS: Section[] = [
  {
    id: "29-1",
    number: "29.1",
    title: "Why Requirements Failure Is the Most Expensive Failure",
    content: `In software engineering, there is no error more costly than building the wrong thing. According to the "Cost of Quality" model, a requirement error caught during the requirements phase might cost $100 to fix. That same error caught in production can cost $10,000 or more—a 100x increase.

## The Waterfall vs. Agile Context
In the old "Waterfall" model, requirements were set in stone years before code was written. If they were wrong, the project was doomed from Day 1. In "Agile," we try to mitigate this by iterating, but if the *core* understanding of the user's need is flawed, you are simply "iterating toward a cliff."

## Why Requirements Fail
1. **Implicit Assumptions**: "I thought it was obvious that the system needed to handle leap years."
2. **Ambiguity**: Using words like "fast," "scalable," or "user-friendly" without defining them.
3. **The Communication Gap**: The "Game of Telephone" between the customer, the product manager, and the engineer.

## The Engineering Responsibility
Engineers often think requirements are "someone else's job." This is a mistake. An engineer's job is not to write code; it is to **solve a problem**. You cannot solve a problem you do not understand. An engineer who blindly follows a flawed specification is as responsible for the failure as the person who wrote it.`
  },
  {
    id: "29-2",
    number: "29.2",
    title: "Types of Requirements: Functional, Non-Functional, Constraints",
    content: `A complete specification must address three distinct categories of requirements.

## 1. Functional Requirements
These describe **what** the system should do. 
- "The system shall allow users to reset their password via email."
- "The system shall calculate the tax based on the user's zip code."
These are usually captured as User Stories or Use Cases.

## 2. Non-Functional Requirements (NFRs)
These describe **how** the system should perform. They are the "ilities"—Reliability, Scalability, Maintainability, Usability.
- **Performance**: "The checkout API must respond within 200ms for 99% of requests."
- **Availability**: "The system must have 99.99% uptime."
- **Security**: "All data at rest must be encrypted using AES-256."

## 3. Constraints
These are non-negotiable "facts of life" that limit your design choices.
- **Technical**: "The solution must run on our existing Kubernetes cluster."
- **Legal**: "The system must be GDPR compliant."
- **Business**: "The project must launch before Black Friday."

| Type | Question It Answers | Example |
| :--- | :--- | :--- |
| **Functional** | What does it do? | "Add to Cart" button. |
| **Non-Functional**| How well does it do it?| "Responds in < 1s." |
| **Constraint** | What are the boundaries? | "Must use Python 3.11." |

Ignoring NFRs is the #1 cause of "successful" launches that crash under load.`
  },
  {
    id: "29-3",
    number: "29.3",
    title: "Requirements Elicitation: Interviews, Observation, Prototyping",
    content: `Elicitation is the process of "extracting" requirements from stakeholders. It's more of an art than a science because stakeholders often don't know what they want until they see it.

## 1. Stakeholder Interviews
The goal is to find the "Why" behind the "What." 
- **Ask**: "What problem are you trying to solve?" rather than "What feature do you want?"
- **Watch out for**: "The XY Problem"—where a user asks for a solution (X) to a problem (Y) that they haven't actually told you about.

## 2. Contextual Inquiry (Observation)
Watch the users do their actual work. You will find "shadow requirements"—manual workarounds they've developed because the current system is insufficient.

## 3. Prototyping (The "I'll Know It When I See It" Method)
Build a low-fidelity mockup (using Figma or even paper). It is much cheaper to move a button in a mockup than to refactor a backend API.
- **Throwaway Prototypes**: Designed solely to clarify requirements.
- **Evolutionary Prototypes**: Designed to eventually become the product.

## 4. Document Analysis
Read the existing manuals, spreadsheets, and legacy code. The legacy code is the only "perfect" documentation of the *current* requirements, even if it's messy.`
  },
  {
    id: "29-4",
    number: "29.4",
    title: "User Stories: The Right Format and the Wrong Use",
    content: `User Stories are the standard "unit of work" in Agile. They are intended to be a **placeholder for a conversation**, not a formal specification.

## The Standard Format:
> **As a** [type of user],  
> **I want** [to perform some action],  
> **So that** [I can achieve some goal].

## The "So That" is the Most Important Part
Without the "So That," the engineer doesn't understand the motivation. 
- **Bad**: "As a user, I want a search bar." (Why?)
- **Good**: "As a frequent shopper, I want a search bar **so that** I can find specific items without scrolling through the whole catalog."

## The INVEST Criteria
A good User Story must be:
- **I**ndependent: Can be developed on its own.
- **N**egotiable: Not a rigid contract; open to discussion.
- **V**aluable: Delivers value to the end user.
- **E**stimable: The team can guess how long it will take.
- **S**mall: Fits within a single sprint.
- **T**estable: We can prove it works.

## Common Pitfalls
- **Technical Stories**: "As a developer, I want to upgrade the DB." (This is not a user story; it's a task).
- **Stories as Specifications**: When stories become 5-page documents, they lose their agility. Use **Acceptance Criteria** for the details instead.`
  },
  {
    id: "29-5",
    number: "29.5",
    title: "Jobs-To-Be-Done: The Better Framework",
    content: `While User Stories focus on *who* and *what*, the **Jobs-To-Be-Done (JTBD)** framework focuses on the **underlying situation and motivation**.

## The Theory
"People don't want to buy a quarter-inch drill. They want a quarter-inch hole." — Theodore Levitt.

## The Job Story Format:
> **When** [situation],  
> **I want to** [motivation],  
> **So I can** [expected outcome].

## Comparison:
- **User Story**: "As a commuter, I want to buy a milkshake so I have something to drink."
- **Job Story**: "When I'm driving to work and bored, I want something that lasts a long time and keeps me occupied so I don't get hungry before lunch."

## Why Engineers Love JTBD
JTBD allows for more **architectural creativity**. If the "job" is to be "occupied during a commute," a milkshake is one solution, but a podcast or an audiobook might be another. It focuses the engineer on the **functional outcome** rather than the UI implementation.

When you understand the "job," you can build features that are more resilient to changing user preferences.`
  },
  {
    id: "29-6",
    number: "29.6",
    title: "Use Cases: Complete Specification of Behavior",
    content: `For complex systems, User Stories are often insufficient. You need **Use Cases** to describe the full interaction between an "Actor" and the system.

## The Components of a Use Case:
1. **Actor**: Who is interacting? (e.g., "Customer," "Admin," "Timer").
2. **Pre-conditions**: What must be true before the use case starts? (e.g., "User is logged in").
3. **Main Success Scenario (Happy Path)**: The step-by-step ideal flow.
4. **Extensions (Edge Cases)**: What happens if things go wrong? (e.g., "Credit card declined," "Connection timed out").
5. **Post-conditions**: What is the state of the system after? (e.g., "Order is saved to DB").

## Example: Withdraw Cash
- **Happy Path**: User inserts card -> Enters PIN -> Enters amount -> System verifies funds -> Dispenses cash.
- **Extension (Incorrect PIN)**: System allows 2 more tries, then eats the card.

## Why Use Cases Matter
They force you to think about **error handling** early. Most software doesn't fail on the happy path; it fails in the "Extensions" that the developer forgot to implement. Writing Use Cases is essentially **pre-writing your integration tests**.`
  },
  {
    id: "29-7",
    number: "29.7",
    title: "Acceptance Criteria: The Bridge Between Requirements and Tests",
    content: `**Acceptance Criteria (AC)** are the conditions that a software product must satisfy to be accepted by a user or customer. They turn a vague "Story" into a verifiable "Requirement."

## The Gherkin Format (Given/When/Then)
ACs are often written in a structured format that can be easily translated into automated tests (like Cucumber or Pytest-BDD).

\`\`\`gherkin
Feature: User Login
  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When they enter "admin@example.com" and "password123"
    And click "Submit"
    Then they should be redirected to the dashboard
    And see a "Welcome Back" message
\`\`\`

## Rules for Good ACs:
- **Unambiguous**: Avoid "The UI should look nice."
- **Testable**: "The page must load in < 2 seconds."
- **Focus on the 'What', not the 'How'**: Don't mention specific CSS selectors or DB table names in the AC.

ACs are the "contract" between the Product Owner and the Development Team. If the code meets the ACs, the story is "Done."`
  },
  {
    id: "29-8",
    number: "29.8",
    title: "Non-Functional Requirements: Performance, Security, Usability",
    content: `NFRs are often ignored because they don't have a visible "UI" presence. However, they are the foundation of system quality.

## 1. Performance and Scalability
Define them using specific percentiles.
- **Bad**: "The site must be fast."
- **Good**: "The search API p95 latency must be under 500ms at 1,000 requests per second."

## 2. Security
Define specific protocols and threat models.
- "Password hashes must use Argon2 with a work factor of 10."
- "The system must prevent CSRF and XSS as per OWASP guidelines."

## 3. Reliability and Availability
Define the "nines."
- "99.9% availability" = ~9 hours of downtime per year.
- "99.999% availability" = ~5 minutes of downtime per year. (This is significantly more expensive to build).

## 4. Maintainability
- "Code must be documented such that a new engineer can be productive within 3 days."
- "The system must have > 80% unit test coverage for core business logic."

**Pro-tip**: Treat NFRs as **Architectural Fitness Functions**. Write automated tests that fail if the system's performance or security drops below the required threshold.`
  },
  {
    id: "29-9",
    number: "29.9",
    title: "Requirements Traceability",
    content: `**Traceability** is the ability to track a requirement from its origin, through its implementation in code, to its verification in a test.

## The Traceability Matrix
In highly regulated industries (like medical or aerospace), a **Traceability Matrix** is required.
- **Forward Traceability**: Can you show which lines of code fulfill Requirement #42?
- **Backward Traceability**: Why does this function exist? Which requirement does it serve? (If you can't answer, you might be over-engineering or building "Gold Plating").

## Modern Traceability
In a modern Agile environment, we use tools rather than spreadsheets:
- **Jira ticket ID** in the Git commit message.
- **Requirement tags** in the test suite.
- **Architecture Decision Records (ADRs)** linked to the requirements they support.

Traceability prevents "Requirement Creep" and ensures that if a requirement changes, you know exactly which tests and code modules need to be updated.`
  },
  {
    id: "29-10",
    number: "29.10",
    title: "Requirements in Agile: Backlog Refinement Done Right",
    content: `In Agile, requirements are managed in a **Product Backlog**. But a backlog is not a static list; it's a living organism that needs "grooming" or **refinement**.

## The Refinement Meeting
The goal of refinement is to ensure that the stories at the top of the backlog are **"Ready"** for development.
- **Definition of Ready (DoR)**: A checklist a story must pass before it's allowed into a sprint.
  - Does it have clear Acceptance Criteria?
  - Are the dependencies identified?
  - Has the team estimated it?

## The Role of the Engineer
During refinement, the engineer's job is to be the **"Voice of Feasibility."** 
- "This story looks simple, but it requires a change to our core data model that will take 3 weeks."
- "We can achieve 90% of this value with 10% of the effort if we use the existing API."

Good refinement sessions are loud, collaborative, and involve a lot of whiteboarding. If you are just "receiving" tasks, you aren't doing refinement.`
  },
  {
    id: "29-11",
    number: "29.11",
    title: "Ambiguity Detection and Resolution",
    content: `Ambiguity is the "silent killer" of software projects. It occurs when two people read the same sentence and imagine two different systems.

## Common Ambiguity "Tells":
- **Adverbs**: "The system should handle errors *gracefully*." (What does graceful mean? A 404 page? A retry? A notification?)
- **Passive Voice**: "The data should be processed." (By whom? When? What happens if it's not?)
- **Lists ending in 'etc.'**: "We need to support PDF, JPG, etc." (Does 'etc.' include TIFF? Video?)

## How to Resolve Ambiguity:
1. **The "Concrete Example" Method**: Instead of discussing the rule, discuss a specific user scenario. "If a user has an expired card, what *exactly* do they see on the screen?"
2. **Quantify**: Turn adverbs into numbers. "Gracefully" becomes "The system shall log the error to Sentry and show a friendly 500 page with a support ID."
3. **The "Pre-Mortem"**: Ask the team, "Imagine it's 6 months from now and this feature has failed. What ambiguous requirement was to blame?"`
  },
  {
    id: "29-12",
    number: "29.12",
    title: "Requirements Review Techniques",
    content: `Before you write a single line of code, the requirements themselves should be "reviewed," just like code.

## 1. Formal Inspection
A group of reviewers (Dev, QA, PM) goes through the document line-by-line using a checklist.
- Is it consistent? (Does Section 2 contradict Section 5?)
- Is it complete? (Are the error cases covered?)
- Is it feasible?

## 2. Walkthroughs
The author of the requirements "walks" the team through the logic. This is less formal and focuses on shared understanding.

## 3. "The Rubber Duck" for Requirements
Try to explain the requirement to someone who knows nothing about the project. If you find yourself saying "It's complicated," the requirement is likely poorly understood or overly complex.

## 4. Requirement-to-Test Mapping
Ask the QA engineer to draft the test cases based solely on the requirements. If they can't do it without asking 20 questions, the requirements are insufficient.`
  },
  {
    id: "29-13",
    number: "29.13",
    title: "The Cost of Getting Requirements Wrong",
    content: `Let's look at the numbers.

## The 1-10-100 Rule
- **$1 (Prevention)**: Spent on clear requirements and review.
- **$10 (Correction)**: Spent on fixing the bug during development/QA.
- **$100 (Failure)**: Spent on fixing the bug in production, plus lost customer trust, support costs, and potential legal fees.

## Opportunity Cost
When you build the wrong feature, you aren't just wasting the money spent on that feature. You are also losing the money you **could have made** if you had built the *right* feature. This is the "Double Hit" of requirements failure.

## The Psychological Cost
Nothing kills developer morale faster than working 80 hours a week on a "death march" for a feature that is deleted a week after launch because "it's not what the customers wanted." Requirements quality is a **retention strategy**.`
  },
  {
    id: "29-14",
    number: "29.14",
    title: "Case Study: The Healthcare.gov Launch Failure",
    content: `The 2013 launch of Healthcare.gov is perhaps the most famous requirements failure in history. On Day 1, only 6 people successfully signed up.

## What Went Wrong (Requirements-wise):
1. **Late Requirements**: Major policy changes were being made just weeks before launch.
2. **No Performance Requirements**: The system was designed for 10,000 concurrent users but was hit by 250,000.
3. **Complexity**: The system had to integrate with dozens of legacy federal and state databases, many of which had undocumented or changing APIs.
4. **Lack of a "Single Source of Truth"**: Dozens of contractors were working on different parts of the system with no centralized requirements management.

## The Recovery
A "Tech Surge" of engineers from Google, Facebook, and Oracle was brought in. They didn't fix it by writing "better" code; they fixed it by **stripping away unnecessary requirements**, stabilizing the "happy path," and finally defining the performance NFRs they needed to meet.

## The Lesson
Even with hundreds of millions of dollars, you cannot "code your way out" of a fundamental requirements mess.`
  },
  {
    id: "29-15",
    number: "29.15",
    title: "Exercises",
    content: `## Exercise 1: NFR Identification
Label each requirement as **Functional**, **Non-Functional**, or **Constraint**:
1. "The system must use the OAuth 2.0 protocol."
2. "The system must support 5,000 concurrent users."
3. "Users can export their data to a PDF."
4. "The app must be written in Rust."

## Exercise 2: User Story Critique
Rewrite this "Bad" User Story using the INVEST criteria:
*"As a user, I want the system to be faster so I'm not annoyed."*

## Exercise 3: Ambiguity Hunt
Identify the ambiguous words in this requirement:
*"The dashboard should load promptly and display the relevant user statistics in a clear format."*

## Exercise 4: Use Case Extension
For a "Login" Use Case, list three "Extensions" (Edge Cases/Error Paths) that should be specified.

## Exercise 5: Gherkin Writing
Write a Gherkin scenario (Given/When/Then) for a "Forgot Password" feature.

## Exercise 6: The "So That"
For the requirement "Add a Dark Mode to the app," provide two *different* "So That" clauses that would lead to two different implementation priorities.

## Exercise 7: JTBD vs. User Story
Write a "Job Story" (When/I want to/So I can) for a person using a Ride-Sharing app (like Uber) on a rainy night.

## Exercise 8: Traceability Link
You are merging a PR that fixes a bug in the "Refund" logic. What two pieces of information should be in your commit message to ensure traceability?

---

## Answers

1. **Answer**: 1. Constraint (or NFR Security). 2. Non-Functional (Performance). 3. Functional. 4. Constraint.
2. **Answer**: "As a Premium Subscriber, I want the Search Results to load in under 500ms so that I can quickly find products during a flash sale." (Specific, testable, valuable).
3. **Answer**: "Promptly" (How many ms?), "Relevant" (Which ones exactly?), "Clear format" (Table? Chart? Mobile-responsive?).
4. **Answer**: 1. Incorrect password. 2. Account is locked due to too many tries. 3. User has 2FA enabled but lost their device.
5. **Answer**: "Given I am on the login page; When I click 'Forgot Password' and enter my email; Then I should receive an email with a unique reset link."
6. **Answer**: 1. "...so that I can save battery life on my OLED screen." (Priority: Power efficiency). 2. "...so that I can use the app at night without eye strain." (Priority: Visual contrast and accessibility).
7. **Answer**: "When I am stuck outside in the rain and tired, I want to get a car as fast as possible regardless of price, so I can get home dry and warm."
8. **Answer**: 1. The Jira/Ticket ID (e.g., "PROJ-123"). 2. A reference to the specific test case or requirement being satisfied.`
  }
];
