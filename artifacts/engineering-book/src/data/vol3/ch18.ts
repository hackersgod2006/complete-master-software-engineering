import type { Section } from '../types';

export const CH18_SECTIONS: Section[] = [
  {
    id: "18-1",
    number: "18.1",
    title: "The Strategic Value of DDD",
    content: `Domain-Driven Design (DDD) is an approach to software development that focuses the design on the core domain and domain logic, and bases complex design decisions on a model of the domain. It was introduced by Eric Evans in his 2003 book of the same name and has profoundly influenced how serious engineers think about complex business software.
DDD is most valuable when the domain is genuinely complex — insurance underwriting, financial derivatives pricing, supply chain optimization, healthcare workflows. For simple CRUD applications, DDD's full weight is overkill. For complex domains with deep business rules, it is the difference between software that remains maintainable for a decade and software that collapses under its own complexity.


---`
  },
  {
    id: "18-2",
    number: "18.2",
    title: "The Ubiquitous Language: Building It and Using It",
    content: `Ubiquitous Language is the single most important concept in DDD. It is a common, shared language between developers and domain experts — not a developer language that domain experts need to translate, and not a business language that developers need to interpret. The same terms appear in conversations, requirements, diagrams, tests, and code. When the language changes in conversation, the code changes too.

\`\`\`python
# UBIQUITOUS LANGUAGE IN CODE

# WITHOUT UBIQUITOUS LANGUAGE: developer-centric terminology
class PolicyRecord:
def process_claim_entry(self, claim_id: int, amt: float) -> bool:
if self.status_code == 1 and self.balance_remaining >= amt:
\`\`\`

self.balance_remaining -= amt
self.claim_records.append({'id': claim_id, 'amount': amt})

\`\`\`python
return True
return False

# Business team says: 'When a claim is submitted on an active policy,
# and the claim amount is within the remaining coverage limit,
# the claim should be approved and the coverage used should be deducted.'
# Code and business speak different languages — translation needed constantly.

# WITH UBIQUITOUS LANGUAGE: code reads like the business speaks
class InsurancePolicy:
def submit_claim(self, claim: 'Claim') -> 'ClaimDecision':
if not self.is_active():
return ClaimDecision.denied(reason='Policy is not active')
if not self.has_sufficient_coverage(claim.amount):
return ClaimDecision.denied(reason='Claim exceeds remaining coverage')
\`\`\`

self.deduct_coverage(claim.amount)
self.record_claim(claim)

\`\`\`python
return ClaimDecision.approved(claim)

def is_active(self) -> bool:
from datetime import date
return (self.status == PolicyStatus.ACTIVE and
\`\`\`

self.effective_date <= date.today() <= self.expiry_date)


\`\`\`python
def has_sufficient_coverage(self, amount: float) -> bool:
return self.remaining_coverage_limit >= amount

def deduct_coverage(self, amount: float) -> None:
\`\`\`

self.remaining_coverage_limit -= amount


\`\`\`python
# SAME language in:
# Business meeting: 'The policy must be active to approve a claim'
# Test: assert policy.is_active() == True
# Code: if not self.is_active(): return ClaimDecision.denied()
# Database: policies.status = 'ACTIVE'
# API docs: POST /policies/{id}/claims requires policy to be active

# When business changes language: change the code immediately.
# 'We now call it a claim filing, not a claim submission'
# -> rename submit_claim to file_claim everywhere at once
\`\`\``
  },
  {
    id: "18-3",
    number: "18.3",
    title: "Bounded Contexts: The Map of Your Domain",
    content: `A Bounded Context is an explicit boundary within which a particular domain model applies. The same concept can mean different things in different contexts — and that is correct. A 'Customer' in the sales context (prospect, opportunity, contract value) is different from a 'Customer' in the delivery context (address, delivery instructions, preferences) and different from a 'Customer' in the billing context (payment method, invoice history, credit limit). Forcing one unified Customer model to serve all three contexts creates a monster.

\`\`\`python
# BOUNDED CONTEXTS: same concept, different models

# SALES CONTEXT: Customer is a prospect/account
class SalesCustomer:
\`\`\`

customer_id: int
company_name: str
annual_revenue: float
assigned_sales_rep: str
deal_stage: str # prospect, qualified, proposal, closed
contract_value: float
preferred_contact: str


\`\`\`python
# DELIVERY CONTEXT: Customer is a delivery recipient
class DeliveryCustomer:
\`\`\`

customer_id: int # same ID, different model
delivery_name: str
delivery_address: 'Address'
access_instructions: str
preferred_time_slot: str
delivery_notes: str


\`\`\`python
# BILLING CONTEXT: Customer is a payment entity
class BillingCustomer:
\`\`\`

customer_id: int # same ID, different model
legal_entity_name: str
billing_address: 'Address'
payment_method: 'PaymentMethod'
credit_limit: float
payment_terms: str # NET30, NET60, COD
invoice_history: list


\`\`\`python
# These three models SHARE a customer_id (the integration point)
# but each has DIFFERENT attributes relevant to its context.
# No single Customer class could serve all three without becoming
# a god object with 30+ fields, most irrelevant to any single context.

# CONTEXT MAP: how contexts relate
# Sales → Billing: when deal closes, Sales sends CustomerCreated event
# Billing creates BillingCustomer from the event data
# Sales → Delivery: when order placed, Sales sends OrderPlaced event
# Delivery creates DeliveryCustomer if not exists
# Translation happens at context boundaries: event contains shared ID

# ANTI-CORRUPTION LAYER: protect your model from another context's model
class DeliveryContextTranslator:
def from_sales_event(self, event: dict) -> 'DeliveryCustomer':
return DeliveryCustomer(
customer_id=event['customer_id'],
delivery_name=event['contact_name'], # different naming
delivery_address=self._translate_address(event['address']),
access_instructions='',
preferred_time_slot='any',
delivery_notes=''
\`\`\`

)


\`\`\`python
def _translate_address(self, sales_address: dict) -> 'Address':
return Address(
street=sales_address['street_line_1'],
city=sales_address['city_name'], # sales uses 'city_name'
postal_code=sales_address['zip'] # sales uses 'zip'
\`\`\`

)

\`\`\`python
# Anti-corruption layer: Delivery context never imports Sales context types
# It translates at the boundary, keeping its model clean
\`\`\`

---`
  },
  {
    id: "18-4",
    number: "18.4",
    title: "Context Mapping: Relationships Between Contexts",
    content: `\`\`\`python
# ENTITY: defined by identity, not attributes
# Same entity even if all attributes change. Two entities with same attributes are NOT the same.
from dataclasses import dataclass, field
from typing import List
import uuid

@dataclass
class OrderItem:
\`\`\`

sku: str
quantity: int
unit_price_cents: int


\`\`\`python
@property
def total_price_cents(self) -> int:
return self.unit_price_cents * self.quantity

@dataclass
class Order: # ENTITY: has a unique identity (id)
\`\`\`

id: str = field(default_factory=lambda: str(uuid.uuid4()))
customer_id: str = ''
items: List[OrderItem] = field(default_factory=list)
status: str = 'pending'


\`\`\`python
def __eq__(self, other) -> bool:
if not isinstance(other, Order): return False
return self.id == other.id # equality by IDENTITY, not attributes

def __hash__(self): return hash(self.id)

# Two Order objects with the same id are the SAME order
# even if their status differs (one is fetched from cache, one from db)

# VALUE OBJECT: defined by its attributes, no identity
# Two value objects with same attributes ARE the same.
@dataclass(frozen=True) # frozen: immutable (value objects should never change)
class Money:
\`\`\`

amount: int # in cents to avoid float issues
currency: str # 'USD', 'EUR', 'NGN'


\`\`\`python
def __add__(self, other: 'Money') -> 'Money':
if self.currency != other.currency:
raise ValueError(f'Cannot add {self.currency} and {other.currency}')
return Money(self.amount + other.amount, self.currency)

def __mul__(self, factor: int) -> 'Money':
return Money(self.amount * factor, self.currency)

def __str__(self) -> str:
return f'{self.currency} {self.amount / 100:.2f}'

@dataclass(frozen=True)
class Address:
\`\`\`

street: str
city: str
postal_code: str
country: str


\`\`\`python
def is_domestic(self, home_country: str) -> bool:
return self.country == home_country

# Two Address objects with the same fields ARE the same address
a1 = Address('123 Main St', 'Lagos', '100001', 'NG')
a2 = Address('123 Main St', 'Lagos', '100001', 'NG')
assert a1 == a2 # True: value equality

# AGGREGATE: cluster of objects treated as a unit for data changes
# Has one AGGREGATE ROOT: the entry point for all operations
# Invariants are enforced at the aggregate level
@dataclass
class Order: # ORDER is the aggregate root
\`\`\`

id: str = field(default_factory=lambda: str(uuid.uuid4()))
customer_id: str = ''
items: List[OrderItem] = field(default_factory=list)
status: str = 'pending'
shipping_address: 'Address' = None


\`\`\`python
def add_item(self, item: OrderItem) -> None:
if self.status != 'pending':
raise DomainError('Can only add items to pending orders')
existing = next((i for i in self.items if i.sku == item.sku), None)
if existing:
\`\`\`

self.items.remove(existing)
self.items.append(OrderItem(

\`\`\`python
sku=item.sku,
quantity=existing.quantity + item.quantity,
unit_price_cents=item.unit_price_cents
\`\`\`

))

\`\`\`python
else:
\`\`\`

self.items.append(item)


\`\`\`python
def remove_item(self, sku: str) -> None:
if self.status != 'pending':
raise DomainError('Can only remove items from pending orders')
\`\`\`

self.items = [i for i in self.items if i.sku != sku]


\`\`\`python
def confirm(self, shipping_address: Address) -> None:
if not self.items:
raise DomainError('Cannot confirm empty order')
if self.status != 'pending':
raise DomainError(f'Cannot confirm order in {self.status} status')
\`\`\`

self.shipping_address = shipping_address
self.status = 'confirmed'


\`\`\`python
def calculate_total(self) -> Money:
total = sum(i.total_price_cents for i in self.items)
return Money(total, 'NGN')

# AGGREGATE RULE: only modify OrderItem through the Order aggregate root
# NEVER: db.session.query(OrderItem).filter_by(order_id=oid).update(...)
# ALWAYS: order.add_item() or order.remove_item()
# This ensures invariants (no items in confirmed order) are always enforced
\`\`\``
  },
  {
    id: "18-5",
    number: "18.5",
    title: "Entities vs Value Objects",
    content: `\`\`\`python
# DOMAIN EVENTS: things that happened in the domain
# Named in past tense, immutable, carry all relevant context
from dataclasses import dataclass
from datetime import datetime
import uuid

@dataclass(frozen=True)
class DomainEvent:
\`\`\`

event_id: str = None
occurred_at: datetime = None


\`\`\`python
def __post_init__(self):
\`\`\`

object.__setattr__(self, 'event_id', str(uuid.uuid4()))
object.__setattr__(self, 'occurred_at', datetime.utcnow())


\`\`\`python
@dataclass(frozen=True)
class OrderPlaced(DomainEvent):
\`\`\`

order_id: str = ''
customer_id: str = ''
items: tuple = () # tuple for immutability
total_amount: 'Money' = None


\`\`\`python
@dataclass(frozen=True)
class OrderCancelled(DomainEvent):
\`\`\`

order_id: str = ''
customer_id: str = ''
reason: str = ''


\`\`\`python
@dataclass(frozen=True)
class PaymentReceived(DomainEvent):
\`\`\`

order_id: str = ''
amount: 'Money' = None
payment_method: str = ''


\`\`\`python
# Aggregates collect domain events during operation:
class Order:
def __init__(self, ...):
\`\`\`

self._events = [] # events raised this session


\`\`\`python
def place(self, customer_id: str, items: list) -> None:
# ... validation ...
\`\`\`

self.status = 'placed'
self._events.append(OrderPlaced(

\`\`\`python
order_id=self.id,
customer_id=customer_id,
items=tuple(items),
total_amount=self.calculate_total()
\`\`\`

))


\`\`\`python
def collect_events(self) -> list:
events = list(self._events)
\`\`\`

self._events.clear()

\`\`\`python
return events

# Repository saves aggregate AND publishes its events:
class OrderRepository:
def __init__(self, db, event_bus):
\`\`\`

self.db = db
self.event_bus = event_bus


\`\`\`python
def save(self, order: Order) -> Order:
with self.db.transaction():
\`\`\`

self.db.persist(order) # save state

\`\`\`python
events = order.collect_events() # collect events
for event in events: # publish AFTER transaction commits
\`\`\`

self.event_bus.publish(event)

\`\`\`python
return order

# WHY PUBLISH AFTER COMMIT:
# If we publish before commit and the commit fails:
# Other services received the event but the state was not saved
# This creates inconsistency between what happened and what was communicated
# Publishing after commit: if publish fails, at least the state is correct
# Use outbox pattern for guaranteed delivery (save events to DB table,
# separate process publishes them with at-least-once delivery guarantee)
\`\`\``
  },
  {
    id: "18-6",
    number: "18.6",
    title: "Aggregates: Transactional Boundaries",
    content: `UBIQUITOUS LANGUAGE: Interview a domain expert (or use a business domain you understand well: e-commerce, banking, healthcare). Extract 20 domain terms. For each: write the definition in domain language, create the Python class or function using that exact term. Run a 'language test': can a business expert read your class names and method names and understand what they do?
BOUNDED CONTEXTS: Design bounded contexts for an online marketplace (seller, buyer, payment, shipping, catalog, review). Draw the context map showing relationships. For the 'Product' concept: show how it is modeled differently in the Catalog context (description, images, SEO) vs the Inventory context (stock level, warehouse location) vs the Order context (price at time of purchase, quantity).
AGGREGATE DESIGN: Design the BankAccount aggregate. Operations: open, deposit, withdraw, close, freeze. Invariants: balance never negative, closed accounts cannot be operated, frozen accounts cannot withdraw. Implement with domain events for every state change. Write tests verifying all invariants are enforced.
VALUE OBJECTS: Implement Money, EmailAddress, PhoneNumber, PostalCode, and Percentage as value objects. Each must: be immutable, validate on construction, implement equality by value, and have relevant operations. Show that invalid values (negative money, invalid email format) are rejected at construction time.
DOMAIN EVENTS + OUTBOX: Implement the outbox pattern for guaranteed domain event delivery. When an aggregate is saved, events are written to an outbox table in the same transaction. A separate background process reads the outbox and publishes events to a message broker, marking them as published. Show that this survives: process crash after DB commit but before publish, and duplicate publish (idempotent consumers).
Chapter 18 — Ten DDD Truths
Ubiquitous Language is the most important DDD concept. Code must use the same terms as business conversations. When language changes, code changes.
Bounded Contexts prevent the god model. The same concept (Customer, Product) means different things in different contexts. Model them differently.
The Anti-Corruption Layer protects your model from other contexts' models. Translate at the boundary — never let foreign models pollute your domain.
Entities have identity — they are the same entity even if attributes change. Value objects have no identity — equal attributes mean equal objects.
Value objects must be immutable. Instead of modifying a value object, replace it with a new one. This prevents aliasing bugs.
Aggregates enforce invariants. All operations that could violate an invariant go through the aggregate root — never directly to child objects.
Aggregate boundaries should be transaction boundaries. If two objects must change together atomically, they belong in the same aggregate.
Domain Events capture what happened in the business domain. Named in past tense, immutable, containing all relevant context.
Publish domain events AFTER the transaction commits. Publishing before creates inconsistency if the transaction rolls back.
DDD is most valuable for complex domains. For simple CRUD applications, the full DDD weight is over-engineering. Apply tactical patterns selectively.`
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
