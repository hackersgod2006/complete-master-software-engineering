import type { Section } from '../types';

export const CH18_SECTIONS: Section[] = [
  {
    id: "18-1",
    number: "18.1",
    title: "The Strategic Value of DDD",
    content: `**Domain-Driven Design (DDD)**, introduced by Eric Evans in 2003, is an approach to software development for complex needs by connecting the implementation to an evolving model. DDD is not about technology—it's about **Modeling**.

## The Core Premise
Most software projects fail not because of "bad code" or "slow databases," but because of a **misalignment** between the software and the business domain it is meant to serve. If the developers think in terms of "tables" and "rows" while the business experts think in terms of "underwriting" and "exposure," the project is doomed to become a "Big Ball of Mud."

## Strategic vs. Tactical DDD
DDD is split into two halves:
1. **Strategic DDD:** Focuses on the "Big Picture"—how to divide a large system into manageable pieces (Bounded Contexts) and how those pieces relate to each other.
2. **Tactical DDD:** Focuses on the "Internal Patterns"—how to model the logic inside a single context (Entities, Value Objects, Aggregates).

## The Strategic Value
The real value of DDD is that it provides a way to manage **Domain Complexity**. It encourages engineers to become "domain experts" who speak the same language as the business. When the code reflects the mental model of the business, the system becomes more resilient to change, easier to test, and significantly more valuable to the organization.`
  },
  {
    id: "18-2",
    number: "18.2",
    title: "The Ubiquitous Language: Building It and Using It",
    content: `The most important concept in DDD is the **Ubiquitous Language (UL)**. It is a language shared by everyone on the team—developers, domain experts, and stakeholders.

## The Problem of Translation
In traditional projects, there is a "translation" step:
- Business expert: "We need to *onboard* a new *vendor*."
- Developer (thinking): "Okay, so I need to \`INSERT\` into the \`Providers\` table and set \`status=1\`."
This translation is where bugs are born. If the business changes what "onboard" means, the developer might not update the code correctly because they don't see the word "onboard" in their files.

## Building the Language
In DDD, the code **must** use the same terms as the business.
\`\`\`typescript
// Bad: Lacks Ubiquitous Language
user.setStatus(1);

// Good: Uses Ubiquitous Language
user.onboard();
\`\`\`
The UL is not just for names; it's for **behaviors**. If the business says, "A customer *accrues* interest," then you should have a method called \`accrueInterest()\`, not \`calculateAndAddInterest()\`.

## Where the UL Lives
- In the code (class names, methods, variables).
- In the tests (the descriptions of the test cases).
- In the meetings and Slack channels.
- In the Architecture Decision Records (ADRs).

If a term is ambiguous, the team must meet and decide on a single definition. The UL is the "glue" that holds the entire DDD process together.`
  },
  {
    id: "18-3",
    number: "18.3",
    title: "Bounded Contexts: The Map of Your Domain",
    content: `A **Bounded Context** is a linguistic and logical boundary within which a specific model is defined and applicable. It is the solution to the "Global Model" problem.

## The Myth of the "Enterprise Model"
Many organizations try to create one giant "User" or "Product" model that covers every department. This is a mistake.
- To the **Sales** department, a "Product" has a price, a description, and a lead time.
- To the **Warehouse**, a "Product" has a weight, dimensions, and a shelf location.
- To the **Shipping** department, a "Product" has a customs code and a tracking number.

Trying to force all these into one \`Product\` class leads to a massive, bloated object with hundreds of fields that no single team understands.

## Defining the Boundary
A Bounded Context allows each department to have its own model of the "Product." Inside the **Warehouse Context**, a Product is simple and focused. It doesn't know about prices or marketing slogans.

## Bounded Context vs. Subdomain
- **Subdomain:** A part of the business (e.g., "The Inventory Subdomain"). It exists whether we write software for it or not.
- **Bounded Context:** A part of our *software* (e.g., "The Inventory Service"). It is where we implement our model.

Ideally, each Bounded Context should align 1:1 with a Subdomain and be owned by a single team. This is the "Strategic" heart of DDD and the primary way we determine where to draw microservice boundaries.`
  },
  {
    id: "18-4",
    number: "18.4",
    title: "Context Mapping: Relationships Between Contexts",
    content: `Once you have identified your Bounded Contexts, you must define how they interact. **Context Mapping** describes the patterns of integration between these boundaries.

## Common Mapping Patterns
1. **Shared Kernel:** Two contexts share a small part of the model (e.g., a shared library of common types). This creates coupling and should be used sparingly.
2. **Customer/Supplier:** The "Supplier" (Upstream) provides a service that the "Customer" (Downstream) uses. The supplier takes the customer's needs into account.
3. **Conformist:** The Downstream context simply accepts the model of the Upstream context as-is (common when using 3rd-party APIs like Stripe).
4. **Anticorruption Layer (ACL):** The Downstream context creates a "translation layer" to protect its internal model from the messy or different model of the Upstream context. **This is the most powerful tool for integration.**
5. **Open Host Service:** The Upstream context provides a public API (like a REST API) that anyone can use.
6. **Separate Ways:** The contexts have no relationship at all.

## Upstream and Downstream
- **Upstream (U):** The context that provides the data/service. If it changes, the downstream might break.
- **Downstream (D):** The context that consumes the data/service.

Understanding the "power dynamic" between contexts is essential for managing architectural risk. If you are "Downstream" from a team that doesn't care about your requirements, you MUST implement an **Anticorruption Layer** to prevent their changes from breaking your domain model.`
  },
  {
    id: "18-5",
    number: "18.5",
    title: "Entities vs Value Objects",
    content: `In Tactical DDD, we distinguish between two primary types of domain objects: **Entities** and **Value Objects**. Understanding the difference is critical for data integrity and system performance.

## Entities: Identity Matters
An **Entity** is an object that is defined by its **Identity** rather than its attributes.
- **Example:** A \`User\`. If a user changes their name, email, and password, they are still the same "Person" because they have the same \`user_id\`.
- **Properties:** They are mutable, they have a unique ID, and they have a lifecycle (created, modified, deleted).

## Value Objects: Attributes Matter
A **Value Object** is an object that is defined solely by its **Attributes**. It has no identity.
- **Example:** \`Money(amount: 10, currency: 'USD')\`. If you swap one $10 bill for another, you still have the same "value." If you change the amount to 20, it is now a *different* Value Object.
- **Properties:** They are **Immutable**. To "change" a value object, you replace the entire instance with a new one. They have no ID.

## Why Value Objects are Better
Value Objects are safer and easier to work with.
1. **No Side Effects:** Since they are immutable, you can pass them around without worrying that another part of the code will change them.
2. **Self-Validation:** The constructor of a \`EmailAddress\` Value Object can ensure the email is valid. Once created, you know it's correct.
3. **Implicit Equality:** Two Value Objects are equal if all their fields are equal (\`5 USD === 5 USD\`).

**Professor's Tip:** When modeling, try to use as many Value Objects as possible. Only make something an Entity if you truly need to track its identity over time. A common mistake is making \`Address\` an entity; unless you are a postal service tracking specific buildings, an address is just a value.`
  },
  {
    id: "18-6",
    number: "18.6",
    title: "Aggregates: Transactional Boundaries",
    content: `An **Aggregate** is a cluster of domain objects (Entities and Value Objects) that can be treated as a single unit. It is the most misunderstood and most powerful tactical pattern in DDD.

## The Root Problem: Consistency
In a complex system, how do you ensure that all the related objects are in a valid state? If you have an \`Order\` with 10 \`OrderItems\`, and you delete an item, you might need to update the \`TotalAmount\` and check if the \`Discount\` is still valid.

## The Aggregate Solution
Every Aggregate has a **Root Entity** (the "Aggregate Root").
1. **The Gatekeeper:** All external access to the aggregate must go through the Root. You cannot "reach in" and modify an \`OrderItem\` directly.
2. **Transactional Boundary:** When you save an Aggregate to the database, the *entire cluster* must be saved as a single transaction.
3. **Invariants:** The Aggregate Root is responsible for enforcing all business rules (invariants) within the cluster.

## Example: The "Car" Aggregate
- **Root:** \`Car\`
- **Internals:** \`Engine\`, \`Wheel\`, \`Piston\`.
You don't tell a \`Piston\` to fire. You tell the \`Car\` to \`start()\`. The Car then manages its internal components to ensure they are all in the correct state.

Aggregates prevent the "Anemic Domain Model" (where objects are just data bags) by encapsulating logic and enforcing consistency boundaries.`
  },
  {
    id: "18-7",
    number: "18.7",
    title: "Aggregate Design Rules",
    content: `Designing Aggregates is a delicate art. Eric Evans and Vaughn Vernon suggest four fundamental rules to keep your aggregates clean and performant.

## 1. Protect Business Invariants
An aggregate must be a "Consistency Boundary." If a rule says "The sum of items cannot exceed the credit limit," both the Items and the Credit Limit must be in the **same** aggregate.

## 2. Model Small Aggregates
A common mistake is creating "God Aggregates" (e.g., a \`User\` that contains every \`Post\`, \`Comment\`, and \`Friend\` they ever had).
- **Small is fast:** Smaller aggregates load faster from the database.
- **Small is scalable:** Smaller aggregates reduce "Lock Contention" in the database. If two users update their profiles, they shouldn't be locked out by a giant aggregate.

## 3. Reference Other Aggregates by Identity Only
An aggregate should never hold a direct object reference to another aggregate.
- **Bad:** \`Order\` contains a \`Customer\` object.
- **Good:** \`Order\` contains a \`customerId\` (a Value Object).
This keeps the boundaries clean and prevents the "Object Graph" from becoming a giant, interconnected mess.

## 4. Update Other Aggregates Using Eventual Consistency
If a change in one aggregate (Order) must trigger a change in another (Inventory), don't do it in the same transaction. Use **Domain Events** to notify the other aggregate. This allows for a more resilient and scalable system.`
  },
  {
    id: "18-8",
    number: "18.8",
    title: "Domain Events: Capturing What Happened",
    content: `A **Domain Event** is a record of something significant that happened in the business domain. It is always named in the **past tense** (e.g., \`OrderPlaced\`, \`PaymentRejected\`, \`UserSignedUp\`).

## Why Use Domain Events?
1. **Decoupling:** The \`Order\` aggregate doesn't need to know about the \`EmailService\` or the \`ShippingService\`. It just publishes an \`OrderPlaced\` event.
2. **Auditability:** Events provide a natural history of everything that happened in the system.
3. **Asynchronous Processing:** Long-running tasks (like generating a PDF invoice) can be handled in the background by listening for an event.

## What's in an Event?
An event should contain the "bare minimum" data needed for others to react:
- **Identifier:** The ID of the aggregate that triggered the event.
- **Timestamp:** When it happened.
- **Payload:** Any specific data relevant to the change (e.g., the total price of the order).

## Event Storming
Domain Events are the primary tool used in **Event Storming**, a collaborative workshop where business experts and developers map out the entire system's flow by placing orange sticky notes (representing events) on a wall. It is often the fastest way to discover Bounded Contexts and Aggregates.`
  },
  {
    id: "18-9",
    number: "18.9",
    title: "Domain Services: When Logic Belongs Nowhere",
    content: `Sometimes, a piece of business logic doesn't naturally fit inside an Entity or a Value Object. In these cases, we use a **Domain Service**.

## Identifying a Domain Service
Use a Domain Service when an operation:
- Involves multiple aggregates.
- Is essentially a process or a transformation, rather than a state change of an object.
- Needs access to external resources (like a 3rd-party API) that shouldn't be inside the domain entities.

## Example: A "Funds Transfer"
If you want to transfer money from Account A to Account B:
- Should it be in \`AccountA.transferTo(AccountB)\`? This makes Account A responsible for B's logic.
- A better approach is a \`TransferService\`:
\`\`\`typescript
class TransferService {
  execute(fromAccountId: string, toAccountId: string, amount: Money) {
    const from = repo.find(fromAccountId);
    const to = repo.find(toAccountId);
    
    from.withdraw(amount);
    to.deposit(amount);
    
    repo.save(from);
    repo.save(to);
  }
}
\`\`\`

## Warning: The "Service" Trap
Do not turn everything into a service. If the logic *can* fit inside an Entity (like \`account.withdraw()\`), it *should* stay there. Overusing Domain Services leads to an **Anemic Domain Model**, where entities are just data bags and all the "real" logic is in services. **Domain Services should be the exception, not the rule.**`
  },
  {
    id: "18-10",
    number: "18.10",
    title: "Repositories: Decoupling Domain from Persistence",
    content: `A **Repository** is an interface that acts as an in-memory collection of Aggregates. It provides a way to "Find," "Add," and "Remove" aggregates without the domain logic knowing anything about SQL, MongoDB, or files.

## The Repository Contract
The repository is defined in the **Domain Layer** (as an interface), but its implementation lives in the **Infrastructure Layer**.
- **Domain Layer:** \`interface UserRepository { findById(id: string): User; }\`
- **Infrastructure Layer:** \`class SqlUserRepository implements UserRepository { ... SQL query here ... }\`

## Key Differences from a DAO (Data Access Object)
- **Aggregates only:** You only ever have a Repository for an **Aggregate Root**. You never have an \`OrderItemRepository\`. You get items through the \`Order\` aggregate.
- **Domain Language:** Methods should use domain terms: \`findActiveUsers()\` rather than \`getUsersByStatus(1)\`.
- **Hides Mapping:** The repository is responsible for converting "Database Rows" into "Domain Entities" and back.

## Why it Matters
Repositories allow you to test your domain logic without a database. You can create a \`MockUserRepository\` that just uses a simple JavaScript Map in memory, making your tests sub-millisecond and incredibly reliable.`
  },
  {
    id: "18-11",
    number: "18.11",
    title: "Factories: Encapsulating Complex Creation",
    content: `In DDD, a **Factory** is used when creating an Aggregate or Value Object is so complex that it would clutter the constructor or the calling code.

## Why use a Factory?
1. **Invariant Enforcement:** A factory ensures that an object is created in a valid state from the very first millisecond.
2. **Abstraction of Concrete Classes:** If an aggregate has different "Types" (e.g., \`SavingAccount\` vs. \`CheckingAccount\`), the factory can decide which one to instantiate based on the inputs.
3. **Information Hiding:** The caller doesn't need to know the complex internal structure of the aggregate to create it.

## Factory vs. Constructor
- Use a **Constructor** for simple objects where you just pass in values.
- Use a **Factory** when:
  - You need to generate a complex ID.
  - You need to create child entities or value objects inside the aggregate.
  - You need to ensure a "Global" rule (e.g., "A user cannot be created if the username is already taken").

**Note:** A Factory can be a standalone class, or it can be a static method on the Aggregate Root itself (e.g., \`Order.createWithItems(items)\`).`
  },
  {
    id: "18-12",
    number: "18.12",
    title: "Application Services vs Domain Services",
    content: `One of the most frequent points of confusion in DDD is the distinction between **Application Services** and **Domain Services**. Both are "Services," but they live in different layers and have different responsibilities.

## Application Services (The "Orchestrator")
- **Layer:** Application Layer.
- **Role:** It is the "Thin" layer that handles the "Workflow" of a use case. It doesn't contain business logic.
- **Tasks:**
  - Authenticate the user.
  - Fetch an aggregate from a repository.
  - Call a method on the aggregate.
  - Save the aggregate back.
  - Send notifications or trigger external events.

## Domain Services (The "Expert")
- **Layer:** Domain Layer.
- **Role:** Contains actual **Business Logic** that doesn't fit in an entity.
- **Tasks:**
  - Perform complex calculations (e.g., Tax calculation).
  - Enforce rules involving multiple aggregates.

| Feature | Application Service | Domain Service |
| :--- | :--- | :--- |
| **Logic** | Procedural / Workflow | Business Rules |
| **Returns** | DTOs (Data Transfer Objects) | Domain Objects |
| **Security/Auth** | Yes | No |
| **State** | Stateless | Stateless |

**Professor's Rule:** If you can explain it to a business person, it's a **Domain Service**. If you can only explain it to a programmer (e.g., "We need to parse the JSON and check the session"), it's an **Application Service**.`
  },
  {
    id: "18-13",
    number: "18.13",
    title: "The Layered Architecture: Presentation, Application, Domain, Infrastructure",
    content: `DDD is traditionally implemented using a **Layered Architecture**. This ensures that the core business logic is isolated from the messy details of the outside world.

## The Four Layers
1. **Presentation (UI) Layer:** Responsible for showing information to the user and interpreting user commands. (Web controllers, CLI, API endpoints).
2. **Application Layer:** Orchestrates the use cases. It coordinates the domain objects to perform tasks. It should be "thin"—no business rules here.
3. **Domain Layer:** The "Heart" of the system. Contains Entities, Value Objects, Aggregates, and Domain Services. It is **pure** and should have no dependencies on frameworks or databases.
4. **Infrastructure Layer:** Provides technical capabilities: persistence (DB), messaging (Kafka), and external API clients.

## The Dependency Rule
Dependencies must always point **downwards** or **inwards**.
- The Application layer depends on the Domain layer.
- The Domain layer depends on **nothing**.

Wait—how can the Domain layer use a Repository if the Repository implementation is in the Infrastructure layer? The answer is **Dependency Inversion**. The Domain defines the interface, and the Infrastructure implements it. This keeps the business logic as the most stable part of the codebase.`
  },
  {
    id: "18-14",
    number: "18.14",
    title: "Hexagonal Architecture (Ports and Adapters)",
    content: `**Hexagonal Architecture**, also known as **Ports and Adapters**, is a more modern evolution of the layered architecture, popularized by Alistair Cockburn. It treats the "Application" as the center of the universe.

## The Core Idea
The application (Domain + Application Services) is inside a "hexagon." It communicates with the outside world through **Ports**.
- **Driver Ports (Primary):** How the world talks to the app (e.g., an HTTP API, a Test suite).
- **Driven Ports (Secondary):** How the app talks to the world (e.g., a Database, an Email service).

## Adapters
An **Adapter** is the implementation that plugs into a port.
- **Web Adapter:** Converts an HTTP request into a call to an application service.
- **SQL Adapter:** Implements the \`Repository\` interface to talk to PostgreSQL.

## Why "Hexagonal"?
The shape is just a metaphor. It represents that the application can have *many* sides (ports). You can swap a "REST Adapter" for a "GraphQL Adapter" or a "Mock DB Adapter" without changing a single line of your core business logic.

**Key Benefit:** It makes the application **highly testable**. You can run the entire system in a "test harness" by plugging in mock adapters for all the external dependencies.`
  },
  {
    id: "18-15",
    number: "18.15",
    title: "Event Storming: Discovering the Domain",
    content: `**Event Storming** is a collaborative modeling technique created by Alberto Brandolini. It is designed to break down the "walls" between business experts and developers.

## The Workshop
A group of stakeholders gathers in a room with a "massive" empty wall (usually 10+ meters of butcher paper).

### Step 1: Big Picture (Events)
Everyone writes "Domain Events" on **orange sticky notes** and places them on the wall in chronological order. "What is the first thing that happens? What happens next?"

### Step 2: Chaos and Constraints
The team identifies "hot spots" (conflicting definitions) and "external systems" (pink stickies) that trigger events.

### Step 3: Commands and Actors
For each event, we identify the **Command** (blue sticky) that triggered it and the **Actor** (yellow sticky) who performed the action.

### Step 4: Aggregates and Contexts
Finally, we group related commands and events into **Aggregates** (large yellow stickies) and draw lines around related groups to define **Bounded Contexts**.

## Why it Works
Traditional requirements gathering is slow and boring. Event Storming is fast, energetic, and highly visual. In a single day, a team can discover the entire architecture of a complex system, uncovering hidden assumptions and miscommunications that would normally take months to find.`
  },
  {
    id: "18-16",
    number: "18.16",
    title: "Strategic DDD: Core, Supporting, and Generic Subdomains",
    content: `Not all parts of a software system are equally valuable. Strategic DDD helps us categorize our subdomains so we can invest our engineering effort where it matters most.

## 1. Core Domain
This is the "Secret Sauce." It is why the business exists and why customers choose them over competitors.
- **Strategy:** Build this in-house with your best developers. Avoid outsourcing at all costs. Use pure DDD and high-quality code.
- **Example:** The recommendation algorithm for Netflix or the trading engine for a hedge fund.

## 2. Supporting Subdomain
Something the business needs to function, but it's not a competitive advantage. It's related to the business but not "Core."
- **Strategy:** Build it simply. Don't over-engineer. Use junior developers or outsource if necessary.
- **Example:** The inventory management system for an e-commerce site.

## 3. Generic Subdomain
Common problems that every business has. There is no reason to build this from scratch.
- **Strategy:** Buy a "Off-the-shelf" solution or use an open-source library.
- **Example:** Identity Management (Auth0), Email sending (SendGrid), or Payment processing (Stripe).

**The Architect's Failure:** Many teams spend 80% of their time building a custom "Generic" auth system and only 20% on their "Core" domain. DDD flips this, ensuring that the best minds are working on the most valuable problems.`
  },
  {
    id: "18-17",
    number: "18.17",
    title: "DDD and Microservices: Natural Alignment",
    content: `Microservices and DDD are a "perfect match." In fact, it is very difficult to build successful microservices without the strategic tools of DDD.

## Bounded Context as a Service Boundary
The "Golden Rule" of microservices is that each service should own its own data and be independently deployable. This is exactly what a **Bounded Context** provides.
- If you align your microservices with Bounded Contexts, you ensure that the "reason to change" for a service is localized.
- You avoid the "Distributed Monolith" because you've already defined the linguistic and logical boundaries.

## Aggregates as the Smallest Service
While a Bounded Context is usually one microservice, some architects argue that an **Aggregate** is the smallest possible unit of a service. However, this often leads to "Nano-services" which are too small to manage.

## Context Mapping as API Design
The patterns of Context Mapping (ACL, Open Host Service, Customer/Supplier) become the blueprints for how your microservices communicate.
- If Service A is "Conformist" to Service B, it uses B's DTOs directly.
- If Service A has an "ACL," it has a translation layer that converts B's events into its own internal domain model.

**Summary:** DDD provides the **Strategy** (Where to draw the lines) and Microservices provides the **Tactical Deployment** (How to run the pieces).`
  },
  {
    id: "18-18",
    number: "18.18",
    title: "When Not to Use DDD",
    content: `DDD is a powerful tool, but it is also an expensive one. It requires significant time, collaboration, and high-level engineering skill. 

## Avoid DDD when:
1. **The Project is Simple:** If you are building a simple CRUD app (e.g., a "To-Do" list or a basic blog), DDD is overkill. It will just add layers of boilerplate for no gain.
2. **The Domain is Not Complex:** If there are no complex business rules or "invariants," you don't need Aggregates or Domain Services.
3. **No Access to Domain Experts:** DDD relies on the Ubiquitous Language. If you can't talk to the people who understand the business, you can't build a domain model.
4. **Short-lived Projects:** If you are building a "throwaway" prototype or a marketing landing page, just use a rapid framework like Django or Rails in "CRUD mode."
5. **Data-Centric Systems:** If your app is mostly about moving data from A to B (ETL pipelines) or doing heavy data analysis (Data Science), a "Domain Model" is often the wrong abstraction.

**The "DDD Tax":** Always remember that DDD introduces a "tax" on development speed in the beginning. You pay this tax to ensure that the system doesn't slow down as it grows. If the system is never going to grow, don't pay the tax.`
  },
  {
    id: "18-19",
    number: "18.19",
    title: "Case Study: DDD at a Financial Trading System",
    content: `Consider a global investment bank building a new "Order Management System" (OMS).

## The Complexity
- **Regulatory Rules:** Different rules for the US (SEC), EU (ESMA), and Asia.
- **High Throughput:** Thousands of orders per second.
- **Consistency:** If an order is "Filled," the client's balance must be updated exactly once.

## The DDD Approach
1. **Bounded Contexts:** They split the system into \`Trading\`, \`Compliance\`, \`Accounting\`, and \`Risk Management\`.
2. **Ubiquitous Language:** They stopped using the word "Transaction" because it was too vague. Instead, they used "Order," "Execution," and "Settlement," matching the terminology of the traders.
3. **Aggregates:** The \`Order\` was the aggregate root. It contained \`Executions\`. You couldn't update an execution without going through the \`Order\`, ensuring that an order could never be "Over-filled" (filling more shares than were ordered).
4. **Anticorruption Layer:** The \`Trading\` context used an ACL to talk to the legacy "Mainframe Ledger" system. This allowed the new system to use a modern, clean model while the old system still saw the data in its 1980s format.

## The Result
By using DDD, the bank was able to replace a 20-year-old "Big Ball of Mud" with a modular, testable system. When new regulations (like MiFID II) were introduced, they only had to modify the \`Compliance\` context, leaving the \`Trading\` engine untouched.`
  },
  {
    id: "18-20",
    number: "18.20",
    title: "Exercises",
    content: `Test your mastery of Domain-Driven Design.

1. **UL Identification:** A developer names a variable \`usr_status_cd\`. The business expert calls it "The Member's Subscription Level." What is the Ubiquitous Language term, and why?
   *Answer: \`memberSubscriptionLevel\`. The code must reflect the business's mental model to reduce the cognitive load of translation.*

2. **Entity vs Value Object:** Is a "Seat Number" in a stadium an Entity or a Value Object?
   *Answer: A Value Object. If you move from Seat A1 to Seat A2, you have a different "value." The seat itself has no identity independent of its coordinates (Row/Number).*

3. **Aggregate Boundaries:** You have \`Post\` and \`Comment\`. Should \`Comment\` be its own aggregate, or part of the \`Post\` aggregate?
   *Answer: Usually part of the \`Post\` aggregate. A comment doesn't exist without a post, and you often need to enforce rules like "No more comments after a post is locked."*

4. **Strategic Mapping:** Your team is using a 3rd-party Shipping API that has very confusing field names and a buggy data model. Which Context Mapping pattern should you use?
   *Answer: An Anticorruption Layer (ACL) to translate their "messy" model into your "clean" internal model.*

5. **Layered Architecture:** If a method in your \`User\` entity needs to send an email, should it call the \`EmailProvider\` directly?
   *Answer: No. Entities should have no dependencies on infrastructure. The entity should either emit a \`Domain Event\` (which an application service listens to) or be passed a \`Domain Service\` interface.*

6. **Subdomain Types:** A company builds a custom "Employee Vacation Request" system. Which subdomain category does this likely fall into?
   *Answer: Supporting Subdomain. It's necessary for the business but doesn't provide a competitive advantage (unless you are a HR software company).*

7. **Factory Usage:** When should you use a Factory instead of a simple constructor?
   *Answer: When the creation logic is complex, requires validation against other data, or involves creating a cluster of objects within an aggregate.*

8. **Application vs Domain Service:** You have logic that checks "If a user is from New York, add 8% sales tax." Where does this go?
   *Answer: Domain Service. This is a business rule that would be understood by a business person.*`
  }
];
