import type { Section } from '../types';

export const CH15_SECTIONS: Section[] = [
  {
    id: "15-1",
    number: "15.1",
    title: "What Software Design Actually Is",
    content: `Software design principles are not rules invented by academics. They are distilled observations from thousands of production systems about what kinds of structures survive change and what kinds collapse under it. A codebase that violates these principles is not just aesthetically unpleasant — it is expensive. Features take longer to add. Bugs are harder to fix. New engineers take months to become productive. The principles in this chapter are the engineering equivalent of load-bearing walls: violate them and the structure eventually collapses under its own weight.


---`
  },
  {
    id: "15-2",
    number: "15.2",
    title: "Complexity: The Root of All Software Evil",
    content: `A module, class, or function should have one and only one reason to change. A reason to change is a source of change: the business rules team, the database team, the UI team, the reporting team. If a class changes when the business rules change AND when the database schema changes AND when the reporting format changes, it has three reasons to change — and any one of those changes can break the other two concerns.

\`\`\`python
# VIOLATION: UserManager has reasons to change from 3 different sources
class UserManager:
# Reason 1: business rules change (authentication logic)
def authenticate(self, email, password): ...
def change_password(self, user_id, new_password): ...

# Reason 2: database schema changes (persistence)
def save_to_db(self, user): ...
def load_from_db(self, user_id): ...
def update_in_db(self, user): ...

# Reason 3: report format changes (reporting)
def generate_user_report(self): ...
def export_to_csv(self): ...

# CORRECT: one class per reason to change
class AuthenticationService:
def authenticate(self, email: str, password: str) -> 'User': ...
def change_password(self, user_id: int, new_password: str) -> None: ...

class UserRepository:
def save(self, user: 'User') -> 'User': ...
def find_by_id(self, user_id: int) -> 'User': ...
def update(self, user: 'User') -> 'User': ...

class UserReportGenerator:
def generate_activity_report(self, date_range) -> str: ...
def export_user_list_csv(self) -> bytes: ...

# NOW: changing the database schema touches ONLY UserRepository
# Changing authentication algorithm touches ONLY AuthenticationService
# Changing report format touches ONLY UserReportGenerator
# Zero cross-contamination between concerns
\`\`\``
  },
  {
    id: "15-3",
    number: "15.3",
    title: "Deep Modules vs Shallow Modules",
    content: `Software entities should be open for extension but closed for modification. When new requirements arrive, you should be able to add new behavior by adding new code — not by changing existing, tested, deployed code. Changing existing code risks breaking things that were already working. Adding new code is safe.

\`\`\`python
# VIOLATION: adding new discount type requires modifying existing code
def calculate_discount(order, discount_type):
if discount_type == 'percentage':
return order.total * 0.10
elif discount_type == 'fixed':
return 10.00
elif discount_type == 'buy_two_get_one': # NEW: had to modify function
return order.items[0].price if len(order.items) >= 3 else 0
# Every new discount type: modify this function, risk breaking others

# CORRECT: open for extension via new classes, closed for modification
from abc import ABC, abstractmethod

class DiscountStrategy(ABC):
@abstractmethod
def calculate(self, order) -> float:
\`\`\`

pass


\`\`\`python
class PercentageDiscount(DiscountStrategy):
def __init__(self, percentage: float):
\`\`\`

self.percentage = percentage

\`\`\`python
def calculate(self, order) -> float:
return order.total * self.percentage

class FixedDiscount(DiscountStrategy):
def __init__(self, amount: float):
\`\`\`

self.amount = amount

\`\`\`python
def calculate(self, order) -> float:
return min(self.amount, order.total)

class BuyTwoGetOneDiscount(DiscountStrategy):
def calculate(self, order) -> float:
if len(order.items) >= 3:
cheapest = min(order.items, key=lambda i: i.price)
return cheapest.price
return 0.0

# Adding new discount type: add new class, ZERO changes to existing code
class LoyaltyPointsDiscount(DiscountStrategy):
def calculate(self, order) -> float:
return order.customer.loyalty_points * 0.01

def apply_discount(order, strategy: DiscountStrategy) -> float:
return strategy.calculate(order)

# Existing tests still pass. New class gets its own tests.
\`\`\``
  },
  {
    id: "15-4",
    number: "15.4",
    title: "Information Hiding: The Most Important Design Principle",
    content: `If S is a subtype of T, then objects of type T may be replaced with objects of type S without altering the correctness of the program. In plain language: subclasses must be fully substitutable for their parent classes. A subclass that overrides a method and makes it do something unexpected, raises exceptions the parent does not, or has different preconditions violates LSP and creates hidden bugs.

\`\`\`python
# VIOLATION: Square is NOT substitutable for Rectangle
class Rectangle:
def __init__(self, width: float, height: float):
\`\`\`

self.width = width
self.height = height


\`\`\`python
def set_width(self, w: float): self.width = w
def set_height(self, h: float): self.height = h
def area(self) -> float: return self.width * self.height

class Square(Rectangle): # Seems logical: square IS a rectangle
def set_width(self, w: float):
\`\`\`

self.width = w
self.height = w # VIOLATION: unexpected side effect

\`\`\`python
def set_height(self, h: float):
\`\`\`

self.height = h
self.width = h # VIOLATION: unexpected side effect


\`\`\`python
# This function works correctly with Rectangle:
def test_rectangle(r: Rectangle):
\`\`\`

r.set_width(5)
r.set_height(4)

\`\`\`python
assert r.area() == 20 # works for Rectangle
# FAILS for Square: set_height(4) also sets width=4, so area()=16

# CORRECT: do not force an inheritance hierarchy that violates behavior
class Shape(ABC):
@abstractmethod
def area(self) -> float: pass

class Rectangle(Shape):
def __init__(self, width: float, height: float):
\`\`\`

self.width = width; self.height = height

\`\`\`python
def area(self) -> float: return self.width * self.height

class Square(Shape):
def __init__(self, side: float): self.side = side
def area(self) -> float: return self.side ** 2

# Both are Shapes. Neither is a subtype of the other.
# LSP holds: any Shape can be used where Shape is expected.

# LSP RULES:
# Preconditions cannot be strengthened in a subclass
# Postconditions cannot be weakened in a subclass
# Invariants of the superclass must be preserved
# History constraint: subclass methods cannot produce states
# that would be invalid from the superclass perspective
\`\`\``
  },
  {
    id: "15-5",
    number: "15.5",
    title: "The SOLID Principles — Complete Treatment",
    content: `\`\`\`python
# VIOLATION: fat interface forces clients to depend on methods they do not use
from abc import ABC, abstractmethod

class Worker(ABC): # Too broad — not all workers do all things
@abstractmethod
def work(self): pass
@abstractmethod
def eat(self): pass
@abstractmethod
def sleep(self): pass
@abstractmethod
def take_vacation(self): pass

class Robot(Worker): # Robot cannot eat/sleep/take_vacation!
def work(self): print('robot working')
def eat(self): raise NotImplementedError('Robots do not eat')
def sleep(self): raise NotImplementedError('Robots do not sleep')
def take_vacation(self): raise NotImplementedError('Robots do not vacation')

# CORRECT: segregate into focused interfaces
class Workable(ABC):
@abstractmethod
def work(self): pass

class Feedable(ABC):
@abstractmethod
def eat(self): pass

class Restable(ABC):
@abstractmethod
def sleep(self): pass
@abstractmethod
def take_vacation(self): pass

class HumanWorker(Workable, Feedable, Restable):
def work(self): print('human working')
def eat(self): print('human eating')
def sleep(self): print('human sleeping')
def take_vacation(self): print('human on vacation')

class RobotWorker(Workable):
def work(self): print('robot working')
# Robot only implements what it actually supports — no NotImplementedError

# PYTHON NOTE: Python uses duck typing — formal interfaces (ABC) are optional.
# But the principle still applies: design functions to accept narrow protocols.
# Instead of def process(worker: Worker), use def process(worker: Workable)
# This means process() works with both HumanWorker and RobotWorker
# and any future class that has a work() method.

# PRACTICAL APPLICATION: keep interfaces focused
# BAD: def save(storage: DatabaseAndFileAndCacheStorage): ...
# GOOD: def save(storage: Saveable): ...
# BAD: def report(generator: HTMLAndPDFAndExcelGenerator): ...
# GOOD: def report(generator: ReportGenerator): ...
\`\`\``
  },
  {
    id: "15-6",
    number: "15.6",
    title: "Single Responsibility: More Than One Reason to Change",
    content: `\`\`\`python
# DEPENDENCY INVERSION PRINCIPLE:
# High-level modules should not depend on low-level modules.
# Both should depend on abstractions.
# Abstractions should not depend on details.
# Details should depend on abstractions.

# VIOLATION: high-level OrderService depends directly on low-level MySQLDatabase
import mysql.connector

class OrderService: # HIGH-LEVEL: business logic
def __init__(self):
# Directly creates low-level dependency
\`\`\`

self.db = mysql.connector.connect(

\`\`\`python
host='localhost', user='root', password='secret', database='orders'
\`\`\`

)


\`\`\`python
def get_pending_orders(self) -> list:
cursor = self.db.cursor()
\`\`\`

cursor.execute('SELECT * FROM orders WHERE status = "pending"')

\`\`\`python
return cursor.fetchall()

# Problems:
# Cannot test without a real MySQL database
# Cannot switch to PostgreSQL without modifying OrderService
# Cannot use a test double (mock)

# CORRECT: depend on abstraction, inject the detail
from abc import ABC, abstractmethod
from typing import List
from dataclasses import dataclass

@dataclass
class Order:
\`\`\`

id: int; customer_id: int; status: str; total_cents: int


\`\`\`python
class OrderRepository(ABC): # ABSTRACTION
@abstractmethod
def get_pending(self) -> List[Order]: pass

@abstractmethod
def save(self, order: Order) -> Order: pass

class MySQLOrderRepository(OrderRepository): # LOW-LEVEL detail
def __init__(self, connection):
\`\`\`

self.conn = connection

\`\`\`python
def get_pending(self) -> List[Order]:
cursor = self.conn.cursor()
\`\`\`

cursor.execute('SELECT * FROM orders WHERE status = "pending"')

\`\`\`python
return [Order(*row) for row in cursor.fetchall()]
def save(self, order: Order) -> Order: ...

class InMemoryOrderRepository(OrderRepository): # For testing
def __init__(self):
\`\`\`

self.orders: List[Order] = []

\`\`\`python
def get_pending(self) -> List[Order]:
return [o for o in self.orders if o.status == 'pending']
def save(self, order: Order) -> Order:
\`\`\`

self.orders.append(order); return order


\`\`\`python
class OrderService: # HIGH-LEVEL: depends on abstraction
def __init__(self, order_repo: OrderRepository): # INJECTED
\`\`\`

self.orders = order_repo


\`\`\`python
def process_pending_orders(self) -> int:
pending = self.orders.get_pending()
for order in pending:
\`\`\`

self._process(order)

\`\`\`python
return len(pending)

def _process(self, order: Order) -> None: ...

# Testing: inject InMemoryOrderRepository — zero real database
# Production: inject MySQLOrderRepository or PostgreSQLOrderRepository
# Adding DynamoDB: add DynamoDBOrderRepository, zero changes to OrderService
\`\`\``
  },
  {
    id: "15-7",
    number: "15.7",
    title: "Open-Closed: Extension Without Modification",
    content: `\`\`\`python
# DRY: Don't Repeat Yourself
# Every piece of knowledge must have a single, authoritative representation.
# Violation: duplicated logic creates multiple update points and divergence.

# VIOLATION: discount logic in 3 places
# In OrderController:
discount = order.total * 0.10 if order.customer.is_premium else 0
# In InvoiceGenerator:
discount = invoice.subtotal * 0.10 if customer.tier == 'premium' else 0
# In ReportBuilder:
discount = row['total'] * 0.1 if row['customer_premium'] else 0

# Three places. Three places to update when the discount changes to 15%.
# Three places where the logic can drift apart and become inconsistent.

# CORRECT: single authoritative source
PREMIUM_DISCOUNT_RATE = 0.10

def calculate_premium_discount(subtotal: float, is_premium: bool) -> float:
return subtotal * PREMIUM_DISCOUNT_RATE if is_premium else 0.0

# All three callers use calculate_premium_discount()
# Changing the rate: one place. Testing: one function.

# DRY WARNING: DRY is about KNOWLEDGE, not code
# Two functions can look similar but represent different knowledge.
# Do NOT extract just because code looks similar.
# Extract when they mean the same thing and would change together.

# YAGNI: You Aren't Gonna Need It
# Do not build features until they are actually needed.
# Every piece of code you write must be maintained forever.
# 'Just in case' code becomes dead weight.

# VIOLATION: building for imagined future requirements
class UserService:
def create_user(self, data): ...
def delete_user(self, user_id): ...
def export_to_xml(self): ... # nobody asked for this
def sync_with_ldap(self): ... # 'we might need it someday'
def generate_audit_trail(self): ... # 'just in case compliance asks'
def batch_import_from_csv(self): ...

# CORRECT: build exactly what is needed today
class UserService:
def create_user(self, data): ...
def delete_user(self, user_id): ...
# Add export_to_xml when a real requirement exists

# KISS: Keep It Simple, Stupid
# Prefer the simpler solution. Complexity is a cost.

# VIOLATION: over-engineered for a simple need
class DataProcessingPipelineOrchestrationFrameworkFactory:
def create_pipeline(self, config): ...
def register_stage(self, stage_factory): ...
def build_dag(self): ...
# Needed for: transform a list of user records to CSV

# CORRECT: simple solution for simple need
def users_to_csv(users: list) -> str:
import csv, io
output = io.StringIO()
writer = csv.DictWriter(output, fieldnames=['id', 'name', 'email'])
\`\`\`

writer.writeheader()
writer.writerows(users)

\`\`\`python
return output.getvalue()
\`\`\``
  },
  {
    id: "15-8",
    number: "15.8",
    title: "Liskov Substitution: Behavioral Subtyping",
    content: `SOLID AUDIT: Take any class in a codebase you own. Audit it against all 5 SOLID principles. For each principle: does it comply? If not, how does violating it increase the cost of change? Refactor the most egregious violation.
OCP IN PRACTICE: Find a function with 3+ if/elif branches switching on a type. Refactor using the Strategy pattern (abstract base class + subclass per type). Add a new type without touching existing code.
DIP EXERCISE: Take a class that creates its own database connection. Apply dependency injection. Create an in-memory test double. Write 5 tests that run with zero real database.
DRY AUDIT: Find 3 pieces of duplicated logic in any codebase. For each: extract to a single authoritative function. Count how many callers now use the shared version. Write tests for the shared function.
DESIGN PRINCIPLES REVIEW: Read the SOLID principles paper by Robert C. Martin. Find one real production bug from your experience or from a public post-mortem that was caused by violating one of these principles. Explain which principle was violated, how it led to the bug, and how proper application would have prevented it.
Chapter 15 — Ten Design Principle Truths
SRP: a class has one reason to change. Multiple sources of change in one class means changes to one concern risk breaking others.
OCP: add behavior by adding new code, not changing existing code. New classes extend functionality without touching tested, deployed code.
LSP: subclasses must be fully substitutable for their parent. If substitution breaks behavior, the inheritance hierarchy is wrong.
ISP: clients should not depend on methods they do not use. Split fat interfaces into focused ones. Depend on the narrowest interface needed.
DIP: high-level modules depend on abstractions, not concrete implementations. Inject dependencies — do not create them.
DRY: every piece of knowledge has one authoritative representation. Duplication creates multiple update points and guarantees eventual inconsistency.
DRY is about knowledge, not code similarity. Two similar-looking functions representing different knowledge should NOT be merged.
YAGNI: build what is needed today. Every line of code you write must be maintained forever. Speculative features are technical debt from day one.
KISS: prefer the simpler solution. Complexity is a cost paid on every read, every debug, every modification. Add complexity only when necessary.
Principles are tools for managing change cost, not rules to follow religiously. Apply them where they reduce the cost of the most likely changes.

CHAPTER 16
DESIGN PATTERNS: THE COMPLETE CATALOG
The 23 Gang of Four Patterns Plus Modern Additions — Every Pattern You Will Ever Need

"Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem." — Christopher Alexander — the architect whose work inspired the Gang of Four`
  },
  {
    id: "15-9",
    number: "15.9",
    title: "Interface Segregation: The Role Interface Pattern",
    content: `The **Interface Segregation Principle (ISP)** states: **"Clients should not be forced to depend on methods they do not use."**

This principle targets "Fat Interfaces"—large interfaces that try to do everything for everyone.

## The Problem with Fat Interfaces
Imagine a \`SmartDevice\` interface:
\`\`\`typescript
interface SmartDevice {
  print(): void;
  scan(): void;
  fax(): void;
}
\`\`\`
If you have a \`BasicPrinter\` class, it must implement \`fax()\` and \`scan()\`, perhaps by throwing an \`NotImplementedError\`. This creates **Fragile Code**. If the \`fax()\` method signature changes, the \`BasicPrinter\` (which doesn't even fax!) must be updated and re-deployed.

## The Solution: Role Interfaces
Split the fat interface into smaller, focused interfaces based on the "Roles" that clients play.
\`\`\`typescript
interface Printer { print(): void; }
interface Scanner { scan(): void; }
interface Fax { fax(): void; }

class AllInOne implements Printer, Scanner, Fax { /* ... */ }
class BasicPrinter implements Printer { /* ... */ }
\`\`\`
Now, a client that only needs to print can depend on the \`Printer\` interface. It is completely isolated from changes in the \`Fax\` or \`Scanner\` logic.

## ISP in the Real World
Go (Golang) is the poster child for ISP. The standard library is built on tiny interfaces like \`io.Reader\` (one method: \`Read\`) and \`io.Writer\` (one method: \`Write\`). Because these interfaces are so small, they are incredibly easy to implement and compose.

**Professor's Tip:** ISP is the interface equivalent of SRP. If an interface has too many methods, it's probably representing multiple roles. Break it up.`
  },
  {
    id: "15-10",
    number: "15.10",
    title: "Dependency Inversion: The Stable-Abstractions Principle",
    content: `The **Dependency Inversion Principle (DIP)** is the "D" in SOLID and the key to building decoupled architectures. It states:
1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
2. Abstractions should not depend on details. Details should depend on abstractions.

## What is "High-Level"?
High-level modules contain the **Business Logic** (the "Why"). Low-level modules contain the **Plumbing** (the "How"—databases, API calls, file systems).

## The Traditional Approach (Bad)
Usually, a \`OrderService\` (high-level) creates a \`PostgresDatabase\` (low-level) to save an order. This makes the business logic dependent on the specific database choice. You can't test the business logic without a database.

## The Inverted Approach (Good)
We "invert" the dependency.
1. The High-Level module defines an **Interface** (\`OrderRepository\`).
2. The High-Level module depends *only* on that interface.
3. The Low-Level module (\`PostgresRepository\`) **implements** that interface.

Now, the dependency points "up" toward the abstraction. The business logic is the center of the universe, and the database is just a "detail" that implements the business's requirements.

## Stable Abstractions
DIP works because abstractions are **stable**. The interface for "saving a user" rarely changes, while the implementation (SQL vs. NoSQL vs. In-memory) might change multiple times. By depending on the stable thing, the rest of your system stays stable.

This is the foundation of **Hexagonal Architecture** and **Clean Architecture**. It ensures your domain logic remains pure and untouched by the chaotic world of external frameworks.`
  },
  {
    id: "15-11",
    number: "15.11",
    title: "DRY: Don't Repeat Yourself — and When To",
    content: `**DRY (Don't Repeat Yourself)** is perhaps the most famous acronym in software development, first coined in *The Pragmatic Programmer*. It states: "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."

Many developers misunderstand DRY as "don't type the same code twice." This is a dangerous simplification.

## Knowledge vs. Syntax
DRY is about **Knowledge**. If you have two different pieces of code that happen to look the same but represent different business concepts, they are NOT a violation of DRY.
- **Example:** A \`User\` validation rule and a \`Product\` validation rule both happen to check if a string is length > 5. They are identical *today*, but they might change for different reasons tomorrow. Forcing them into a shared \`StringValidator\` creates a **False Abstraction**.

## The Cost of Duplication
- **Maintenance Nightmare:** If you fix a bug in one copy, you must remember to fix it in the other three.
- **Inconsistency:** Over time, the copies drift, leading to "Heisenbugs" where the system behaves differently in seemingly identical scenarios.

## When to Duplicate (WET - Write Everything Twice)
Sandi Metz and other design leaders argue that **"Duplication is far cheaper than the wrong abstraction."**
If you aren't sure if two things are the same, wait. Follow the **Rule of Three**:
1. When you do it for the first time, just write it.
2. When you do it for the second time, you wince at the duplication, but you copy-paste it anyway.
3. When you do it for the third time, *then* you refactor it into an abstraction.

By waiting until the third time, you have enough data points to see what the *actual* commonality is, preventing the creation of a "Swiss Army Knife" function that is impossible to maintain.`
  },
  {
    id: "15-12",
    number: "15.12",
    title: "YAGNI: The Discipline of Not Building What You Don't Need",
    content: `**YAGNI (You Ain't Gonna Need It)** is a principle from Extreme Programming (XP) that states: **"Always implement things when you actually need them, never when you just foresee that you need them."**

It is the antidote to "Speculative Generality"—the tendency for engineers to build "flexible" systems for future requirements that never actually arrive.

## The Cost of "Future-Proofing"
Every line of code has a carrying cost:
- It must be read.
- It must be tested.
- It must be updated during refactors.
- It can hide bugs.

If you build a complex plugin system because you "might" need to support different payment providers, but you only ever use Stripe, you have wasted weeks of development time and added permanent complexity to your codebase.

## Design for Deletability, Not Flexibility
Instead of building complex abstractions for future use cases, build **simple, clean code** that is easy to delete or replace. If you write a simple Stripe integration today, and next year you need PayPal, you can refactor *then*, with the full knowledge of how PayPal actually works.

## YAGNI vs. Good Design
YAGNI is not an excuse for sloppy coding. You should still follow SOLID and information hiding. The difference is:
- **Good Design:** Making the \`Database\` call an interface so you can test it easily (Value provided *today*).
- **YAGNI Violation:** Building a custom ORM because you might switch from SQL to a Graph Database next year (Value provided *never*).

**Professor's Tip:** In 90% of cases, the "future requirement" you are worried about will either never happen, or it will happen in a way you didn't expect, making your "flexible" solution useless anyway.`
  },
  {
    id: "15-13",
    number: "15.13",
    title: "Coupling and Cohesion: The Two Fundamental Forces",
    content: `Every design decision in software engineering can be evaluated through the lens of two fundamental forces: **Coupling** and **Cohesion**.

## Coupling: The Strength of Connections
Coupling measures how much one module knows about or depends on another.
- **Tight Coupling:** Module A knows the internal implementation details of Module B. If B changes, A breaks. This is bad.
- **Loose Coupling:** Module A interacts with Module B through a stable, narrow interface. This is good.

High coupling creates a "fragile" system where a change in a low-level utility can ripple through the entire codebase, causing dozens of unrelated failures.

## Cohesion: The Singleness of Purpose
Cohesion measures how closely the responsibilities inside a single module are related to each other.
- **Low Cohesion:** A "Utils" class that contains methods for string formatting, database connection, and email sending. The code is only together because it "doesn't fit anywhere else."
- **High Cohesion:** A \`PasswordHasher\` class that only contains methods for salting, hashing, and verifying passwords. Every method is focused on one goal.

## The Ideal: High Cohesion, Low Coupling
We want our modules to be tightly focused (High Cohesion) but loosely connected to each other (Low Coupling).

| Scenario | Result |
| :--- | :--- |
| **Low Cohesion, Tight Coupling** | The worst case. A "Big Ball of Mud." |
| **High Cohesion, Tight Coupling** | Hard to reuse; changes in one highly focused area break others. |
| **Low Cohesion, Loose Coupling** | Messy internal logic, but doesn't break the whole system. |
| **High Cohesion, Loose Coupling** | **The Holy Grail.** Clean, modular, and resilient. |

**Professor's Tip:** If you find it hard to name a class, it's usually because it has low cohesion. If you find it hard to test a class without mocking ten other things, it has tight coupling.`
  },
  {
    id: "15-14",
    number: "15.14",
    title: "Law of Demeter: The Principle of Least Knowledge",
    content: `The **Law of Demeter (LoD)**, also known as the **Principle of Least Knowledge**, is a guideline for reducing coupling. It states that an object should only talk to its "immediate friends" and never to "strangers."

In technical terms, a method \`m\` of class \`C\` should only invoke methods of:
1. \`C\` itself.
2. Objects passed as arguments to \`m\`.
3. Objects created within \`m\`.
4. Instance variables of \`C\`.

## The Violation: "Train Wrecks"
A classic violation of LoD looks like a "train wreck" of method calls:
\`\`\`typescript
// Violation!
const discount = user.getAccount().getSubscription().getPlan().getDiscount();
\`\`\`
In this example, the caller must know the internal structure of \`User\`, \`Account\`, \`Subscription\`, and \`Plan\`. If the \`Subscription\` class is renamed or the relationship changes, this line breaks. This is tight coupling.

## The Solution: "Tell, Don't Ask"
Instead of digging into the object's internals, we ask the object to do the work for us:
\`\`\`typescript
// Better
const discount = user.getDiscount();
\`\`\`
The \`User\` class becomes responsible for delegating the request to its internal components. The caller only knows about \`User\`. This is **Information Hiding** in action.

## When to Ignore LoD
LoD is primarily about **Behavior**. It doesn't necessarily apply to "Data Objects" or "DTOs" (Data Transfer Objects). If you are working with a simple JSON-like structure that has no logic, "train wrecks" are often acceptable and even clearer than creating dozens of wrapper methods.

**Key Insight:** LoD is a tool to prevent "structural coupling"—where your code becomes dependent on the specific path through an object graph.`
  },
  {
    id: "15-15",
    number: "15.15",
    title: "Composition Over Inheritance: Why and How",
    content: `One of the most important shifts in design philosophy over the last 30 years is the move from **Inheritance** ("is-a") to **Composition** ("has-a").

## The Flaws of Inheritance
While inheritance is taught in every intro CS class, it is often a trap.
1. **The Fragile Base Class Problem:** If you change a method in the parent class, you might accidentally break dozens of subclasses that you didn't even know existed.
2. **Deep Hierarchies:** After 3 or 4 levels, it becomes impossible to track where a behavior is defined.
3. **Rigidity:** A class can usually only inherit from one parent. You can't be both a \`Bird\` and a \`Plane\`.

## The Power of Composition
In composition, you build complex behavior by combining small, independent objects.
\`\`\`typescript
// Inheritance (Rigid)
class FlyingBird extends Bird {
  fly() { /* ... */ }
}

// Composition (Flexible)
class Bird {
  private flyer: Flyer;
  constructor(flyer: Flyer) {
    this.flyer = flyer;
  }
  performFly() {
    this.flyer.fly();
  }
}
\`\`\`
By using composition, you can change the behavior at **runtime**. You can turn a \`Bird\` into a \`NonFlyingBird\` just by swapping the \`Flyer\` strategy.

## When to Use Inheritance
Inheritance is still useful when:
- You are implementing a true "is-a" relationship (e.g., \`Square\` is a \`Shape\`).
- You want to share a stable, fixed interface.
- You are using a framework that requires it (like UI components).

**Professor's Tip:** Inheritance is the strongest possible coupling in software. Only use it when you are certain the relationship will never change. When in doubt, compose.`
  },
  {
    id: "15-16",
    number: "15.16",
    title: "Design by Contract: Preconditions, Postconditions, Invariants",
    content: `**Design by Contract (DbC)**, pioneered by Bertrand Meyer, is a methodology where software components collaborate based on formal "contracts." It's like a legal agreement between a caller and a function.

## The Three Pillars
1. **Preconditions:** What the caller *must* guarantee before calling the function (e.g., "the input \`age\` must be non-negative"). If the caller fails this, the function is not responsible for the outcome.
2. **Postconditions:** What the function *guarantees* will be true after execution (e.g., "the user's balance will be increased by the deposit amount").
3. **Invariants:** What must *always* be true about an object (e.g., "the balance of an account can never be less than zero").

## DbC in Code
While some languages (like Eiffel) have native support, we usually implement DbC using **Assertions**:
\`\`\`python
def withdraw(self, amount):
    # Precondition
    assert amount > 0, "Amount must be positive"
    assert self.balance >= amount, "Insufficient funds"
    
    self.balance -= amount
    
    # Postcondition
    assert self.balance >= 0, "Invariant violation: negative balance"
\`\`\`

## Why Use Contracts?
- **Bug Detection:** Contracts catch errors at the exact moment they happen, rather than letting a "null" value propagate through 100 files.
- **Documentation:** A contract is a machine-verifiable form of documentation. It tells the next developer exactly what they can and cannot do.
- **Fail-Fast:** By checking preconditions, you prevent the system from entering an "illegal state" that might lead to data corruption.

DbC is the ultimate form of **defensive programming**, but instead of silently handling errors, it explicitly defines the boundaries of correct behavior.`
  },
  {
    id: "15-17",
    number: "15.17",
    title: "The Expression Problem",
    content: `The **Expression Problem** is a classic challenge in programming language design and software architecture. It describes the difficulty of extending a system in two dimensions: adding new **types** of data and adding new **operations** on that data.

Imagine you have a simple math evaluator with two types (\`Constant\`, \`Add\`) and one operation (\`evaluate\`).

## The Functional Approach
In functional languages (like Haskell), adding a new **operation** (e.g., \`prettyPrint\`) is easy: you just write a new function. But adding a new **type** (e.g., \`Multiply\`) is hard: you have to modify every existing function to handle the new type.

## The Object-Oriented Approach
In OO languages (like Java/Python), adding a new **type** is easy: you just create a new class. But adding a new **operation** is hard: you have to modify every existing class (or the base interface) to include the new method.

| Approach | Adding New Type | Adding New Operation |
| :--- | :--- | :--- |
| **Functional** | Hard (Modify functions) | Easy (New function) |
| **Object-Oriented** | Easy (New class) | Hard (Modify classes) |

## Why It Matters for Design
Your choice of architecture often depends on which dimension of change you expect more of.
- If you expect to add many new behaviors to a fixed set of data, the **Visitor Pattern** (an OO way to simulate functional extensibility) might be right.
- If you expect to add many new data types to a fixed set of behaviors, standard **Polymorphism** is your friend.

Solving the expression problem completely (allowing both extensions without modifying existing code) is a "holy grail" that usually requires advanced language features like Typeclasses (Haskell) or Protocols (Clojure/Elixir).`
  },
  {
    id: "15-18",
    number: "15.18",
    title: "Case Study: The Design of Python's Requests Library",
    content: `The Python library \`requests\` is often cited as a masterclass in software design. Before \`requests\`, Python developers had to use \`urllib2\`, which was widely considered confusing and "shallow."

## The "Requests" Philosophy
Kenneth Reitz, the creator, focused on one thing: **The Developer Experience (DX)**. He designed the library to be "HTTP for Humans."

## Key Design Wins:
1. **Deep Abstraction:** The library hides the complexity of cookies, sessions, authentication, and connection pooling. A simple \`requests.get(url)\` handles dozens of edge cases internally.
2. **Sensible Defaults:** Most developers don't need to configure every detail of an HTTP request. \`requests\` provides a "zero-config" experience while still allowing deep customization via a \`Session\` object.
3. **Fluent Interface:** The API feels like a sentence.
   \`\`\`python
   r = requests.get('https://api.github.com/user', auth=('user', 'pass'))
   print(r.status_code)
   print(r.json())
   \`\`\`
4. **Information Hiding:** The library abstracts the underlying \`urllib3\` library completely. If \`urllib3\` has a breaking change, the \`requests\` API remains stable.

## The Lesson
\`requests\` succeeded because it was a **Deep Module** with a **High-Cohesion** interface. It didn't try to solve every networking problem; it solved *HTTP* perfectly. It prioritized the mental model of the human caller over the internal needs of the machine.

**Professor's Tip:** When you design an API, don't ask "How can I expose this functionality?" Ask "What is the simplest possible way someone could use this?"`
  },
  {
    id: "15-19",
    number: "15.19",
    title: "Exercises",
    content: `Apply the principles of software design to these real-world scenarios.

1. **SRP Analysis:** A class \`UserManager\` has methods: \`updateProfile()\`, \`sendPasswordResetEmail()\`, and \`generateUserReportPDF()\`. Does this violate SRP? Why?
   *Answer: Yes. It serves three different actors: the User (profile), the Security System (email), and the Admin/Reporting system (PDF). It should be split.*

2. **OCP Implementation:** You have an \`OrderProcessor\` that currently only handles Credit Card payments. How would you refactor it using OCP to support PayPal and Crypto in the future without modifying the processor?
   *Answer: Create a \`PaymentStrategy\` interface. The \`OrderProcessor\` should take a \`PaymentStrategy\` as a constructor argument and call \`strategy.pay(amount)\`.*

3. **LSP Violation:** You have a base class \`Bird\` with a method \`fly()\`. You create a subclass \`Ostrich\`. If \`Ostrich.fly()\` throws an exception, is this an LSP violation?
   *Answer: Yes. Code that expects a \`Bird\` expects to be able to call \`fly()\` without it crashing the program. \`Ostrich\` should not inherit from a class that defines flight.*

4. **ISP Refactoring:** An interface \`Machine\` has \`print()\`, \`staple()\`, and \`bind()\`. A simple \`DeskPrinter\` only prints. Refactor this using ISP.
   *Answer: Split \`Machine\` into \`Printer\`, \`Stapler\`, and \`Binder\` interfaces. \`DeskPrinter\` only implements \`Printer\`.*

5. **DIP Concept:** Why is "Dependency Injection" (passing dependencies in) related to "Dependency Inversion"?
   *Answer: Dependency Injection is a *mechanism* to achieve Dependency Inversion. By injecting an interface, you ensure the high-level module doesn't control (and thus depend on) the creation of the low-level implementation.*

6. **DRY vs. WET:** You have identical code for calculating VAT in the UK and VAT in Germany. Should you DRY it up?
   *Answer: Probably not yet. Tax laws for different countries change for different reasons (reasons to change). Keeping them separate (WET) prevents a change in German law from accidentally breaking UK calculations.*

7. **Law of Demeter:** Fix this train wreck: \`order.getCustomer().getAddress().getZipCode()\`.
   *Answer: Add \`order.getDeliveryZipCode()\` which delegates the call down the chain. The caller only knows about the \`order\`.*

8. **Complexity Metric:** Which is more dangerous: a 500-line function with no dependencies, or a 50-line function that relies on 5 global variables?
   *Answer: The 50-line function. Global variables create "Unknown Unknowns" and high coupling, making the system's behavior unpredictable and hard to test. The 500-line function is just hard to read (Cognitive Load).*`
  }
];
