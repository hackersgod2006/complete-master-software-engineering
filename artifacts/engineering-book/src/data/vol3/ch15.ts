import type { Section } from '../types';

export const CH15_SECTIONS: Section[] = [
  {
    id: "15-1",
    number: "15.1",
    title: "What Software Design Actually Is",
    content: `Software design is not a phase; it is a continuous activity of managing complexity. Many junior engineers mistake design for "drawing diagrams" or "choosing a framework." In reality, **Software Design** is the process of deciding how to decompose a complex problem into a set of simpler, manageable pieces and defining the interfaces between those pieces.

Design happens every time you name a variable, extract a method, or define a class. It is the art of trade-offs. As John Ousterhout famously argued, the most important goal of software design is to reduce the **complexity** of the system. If a design makes the system harder to understand or more difficult to change, it has failed, regardless of how many "patterns" it uses.

## The Nature of the Problem
Unlike physical engineering, where the cost of materials often dominates, in software engineering, the dominant cost is **human cognition**. We are limited by our short-term memory (Miller's Law suggests we can hold about 7 items). A well-designed system allows a developer to work on one part of the system without needing to hold the entire codebase in their head.

## Design vs. Implementation
Design is the *intentional* structure. Implementation is the *execution*.
- **Design:** "We will use a plugin architecture where data sources are abstracted through a common interface."
- **Implementation:** Writing the specific \`PostgreSQLConnector\` class.

A system with a good implementation but a bad design is a "big ball of mud" that is fast to build initially but eventually becomes impossible to maintain. A system with a good design but a poor implementation is a "diamond in the rough"—it can be polished and optimized without breaking the rest of the world.

The ultimate measure of design quality is **changeability**. How much work is required to add a new feature? How many files do you have to touch? If the answer is "too many," your design is the bottleneck.`
  },
  {
    id: "15-2",
    number: "15.2",
    title: "Complexity: The Root of All Software Evil",
    content: `If you want to be a master architect, you must become a student of complexity. **Complexity** is anything that makes it hard to understand or modify a system. It is cumulative. Small "shortcuts" in a codebase aren't dangerous in isolation, but over thousands of lines, they create a "death by a thousand cuts."

Complexity manifests in three primary ways:
1. **Change Amplification:** A simple change requires modifications in many different places.
2. **Cognitive Load:** A developer must know a vast amount of information to complete a task.
3. **Unknown Unknowns:** It is not obvious which parts of the code must be modified to achieve a goal, or what the side effects will be.

## The Equation of Complexity
We can think of complexity ($C$) as:
$C = \sum_{p} (c_p \times t_p)$
Where $c_p$ is the complexity of a part $p$, and $t_p$ is the time developers spend working on that part. This reveals a critical insight: **complexity in a rarely touched corner of the system is less damaging than complexity in the core engine.**

## Symptoms of Complexity
- **Dependencies:** One piece of code cannot be understood without understanding another.
- **Obscurity:** Important information is hidden or non-obvious (e.g., a generic variable name like \`data\` or a side effect in a getter).
- **Repetition:** When logic is duplicated, it doubles the surface area for bugs and changes.

## Fighting Back
The goal is not to eliminate complexity (which is impossible for non-trivial problems) but to **manage** it. We do this through **abstraction**—the process of providing a simplified view of a complex entity. A good abstraction hides details that aren't important for the current task, allowing the mind to focus on the problem at hand.`
  },
  {
    id: "15-3",
    number: "15.3",
    title: "Deep Modules vs Shallow Modules",
    content: `One of the most powerful concepts in software design is the distinction between **Deep** and **Shallow** modules. This concept, popularized by John Ousterhout, provides a clear metric for evaluating the quality of an abstraction.

A module (class, function, or microservice) is best described by its **interface** (what it does) and its **implementation** (how it does it).

## Deep Modules
A **Deep Module** is one that provides a powerful functionality through a simple, narrow interface. It hides a great deal of internal complexity.
- **Example:** The Unix \`open()\` system call. It takes a filename and some flags. Internally, it handles file systems, permissions, disk drivers, caching, and concurrent access. This is the gold standard of design.
- **Example:** A garbage collector. The interface is invisible (it just runs), but the implementation is incredibly complex.

## Shallow Modules
A **Shallow Module** is one that has a complex interface relative to the small amount of functionality it provides.
- **Example:** A class that is just a wrapper around another class, adding no new logic but requiring the developer to learn its specific method signatures.
- **Example:** A "Link List" class that requires the user to manually manage head and tail pointers.

## The "Cost of Interface"
Every interface you define adds to the cognitive load of the system. If an interface doesn't hide significantly more complexity than it introduces, it is not earning its keep.

| Feature | Deep Module | Shallow Module |
| :--- | :--- | :--- |
| **Interface** | Simple / Small | Complex / Large |
| **Functionality** | Large / Complex | Small / Simple |
| **Value** | High (High leverage) | Low (Overhead) |

**Professor's Tip:** When designing a class, ask yourself: "Am I hiding details, or am I just exposing them in a different way?" If you find yourself writing "pass-through" methods that just call another object, you are likely creating a shallow module. Merge it or refactor.`
  },
  {
    id: "15-4",
    number: "15.4",
    title: "Information Hiding: The Most Important Design Principle",
    content: `If there is one principle that stands above all others in software design, it is **Information Hiding**. First articulated by David Parnas in 1972, it states that each module should hide a specific design decision from the rest of the system.

Information hiding is the "how" of creating deep modules. By hiding a secret (like the data structure used or the specific algorithm implemented), you ensure that if that secret changes, nothing else in the system needs to change.

## What Should We Hide?
We should hide things that are **likely to change**:
- **Hardware dependencies:** Disk I/O, network protocols.
- **Data formats:** JSON vs. XML, internal database schemas.
- **Complex algorithms:** Optimization logic, search heuristics.
- **Policy vs. Mechanism:** *How* to calculate a tax vs. *what* the current tax rate is.

## Information Leakage
The opposite of information hiding is **Information Leakage**. This happens when a design decision is reflected in multiple modules.
- **Temporal Leakage:** When a module requires you to call \`init()\` before \`doWork()\`. The caller "knows" about the internal state requirements.
- **Back-door Leakage:** When two modules share a global variable or a specific file format that isn't abstracted.

## Example: The "Configuration" Leak
Consider a module that needs to connect to a database.
- **Bad Design:** The module asks for a \`ConfigObject\`, extracts the \`db_user\`, \`db_pass\`, and \`db_url\`. The module now "knows" about the structure of your configuration file.
- **Good Design:** The module asks for a \`ConnectionPool\` object. It doesn't know where the credentials came from or what database type it is.

By hiding the "how" of the connection, you make it possible to switch from a local config file to an AWS Secret Manager without touching the business logic. **The secret is the boundary.**`
  },
  {
    id: "15-5",
    number: "15.5",
    title: "The SOLID Principles — Complete Treatment",
    content: `The **SOLID** principles, popularized by Robert C. Martin ("Uncle Bob") in the early 2000s, are five design principles intended to make software designs more understandable, flexible, and maintainable. While they originated in Object-Oriented Programming, their core wisdom applies to functional programming and microservices as well.

SOLID is an acronym for:
1. **S**ingle Responsibility Principle
2. **O**pen-Closed Principle
3. **L**iskov Substitution Principle
4. **I**nterface Segregation Principle
5. **D**ependency Inversion Principle

## Why SOLID?
Before SOLID, software often suffered from "Rigidity" (hard to change), "Fragility" (breaks in unexpected places), and "Immobility" (hard to reuse). These principles act as a guide to prevent these "smells."

## The "Complete Treatment"
In the following sections, we will dive deep into each. However, it is vital to remember that SOLID is not a set of laws. They are **heuristics**. Over-applying them can lead to "over-engineering"—a system so fragmented into tiny pieces that the logic is impossible to follow.

The master engineer uses SOLID to resolve specific tensions in the code. If you find a class is getting too large, apply **SRP**. If you find yourself writing long \`if/else\` chains based on object types, apply **OCP**.

---
**The SOLID Roadmap:**
- **SRP** handles the internal structure of a module.
- **OCP** and **LSP** handle the relationships between classes and inheritance.
- **ISP** handles how we expose our modules to the world.
- **DIP** handles the high-level architecture and dependencies.

Applied correctly, these principles transform a "Big Ball of Mud" into a set of independent, composable components.`
  },
  {
    id: "15-6",
    number: "15.6",
    title: "Single Responsibility: More Than One Reason to Change",
    content: `The **Single Responsibility Principle (SRP)** is often misunderstood as "a class should do only one thing." If that were true, we would have thousands of one-method classes. Uncle Bob's more precise definition is: **"A module should have one, and only one, reason to change."**

A "reason to change" is usually a **person** or a **business stakeholder**.

## Identifying Violations
Imagine an \`Employee\` class that has three methods:
1. \`calculatePay()\` (defined by the Accounting Dept)
2. \`reportHours()\` (defined by Human Resources)
3. \`save()\` (defined by the Database Admins)

This class violates SRP because it brings together three different stakeholders. If the Accounting department changes how overtime is calculated, you have to recompile and redeploy the code that HR uses to track attendance. If the database schema changes, you risk breaking the pay calculation logic.

## The Solution: Split the Actors
Instead of one giant class, we split the logic into separate classes that serve different actors:
- \`PayCalculator\`: Pure business logic for accounting.
- \`HourReporter\`: Logic for reporting.
- \`EmployeeRepository\`: Persistence logic.

## Why it Matters
SRP reduces **coupling**. When classes are tightly packed with unrelated responsibilities, they become "magnets" for change. Every new feature request touches the same three files, leading to merge conflicts and regression bugs.

**Key Insight:** SRP is about **Cohesion**. If the methods in your class don't use the same instance variables, they probably don't belong together. They are separate responsibilities living in the same house.`
  },
  {
    id: "15-7",
    number: "15.7",
    title: "Open-Closed: Extension Without Modification",
    content: `The **Open-Closed Principle (OCP)** states: **"Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification."**

This sounds like a paradox. How can you change the behavior of a module without changing its source code? The answer is **Polymorphism**.

## The Anti-Pattern: Switch Statements
If you have a function that draws different shapes:
\`\`\`typescript
function draw(shape: any) {
  if (shape.type === 'circle') {
    // draw circle logic
  } else if (shape.type === 'square') {
    // draw square logic
  }
}
\`\`\`
Every time you add a new shape (e.g., 'Triangle'), you must **modify** the \`draw\` function. This violates OCP.

## The OCP Way: Abstraction
We define an interface and let the shapes implement their own logic:
\`\`\`typescript
interface Shape {
  draw(): void;
}

class Circle implements Shape {
  draw() { /* ... */ }
}

function draw(shape: Shape) {
  shape.draw();
}
\`\`\`
Now, to add a \`Triangle\`, we simply create a new class. We don't touch the \`draw\` function. The system is **open for extension** (we added a triangle) but **closed for modification** (we didn't change the existing \`draw\` logic).

## Why OCP?
Modification is dangerous. When you change existing code, you risk breaking everything that relies on it. Extension is safe. You are adding new code that nothing else uses yet. 

OCP is the heart of **Plugin Architectures**. Systems like VS Code or the Linux Kernel are massive examples of OCP; you can add immense functionality via extensions without changing a single line of the core engine.`
  },
  {
    id: "15-8",
    number: "15.8",
    title: "Liskov Substitution: Behavioral Subtyping",
    content: `The **Liskov Substitution Principle (LSP)**, named after Barbara Liskov, is the most mathematically rigorous of the SOLID principles. It states: **"Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it."**

In simpler terms: A subclass should not just *look* like its parent; it must *behave* like it.

## The Classic Violation: Square vs. Rectangle
In geometry, a Square is a Rectangle. But in software:
\`\`\`python
class Rectangle:
    def set_width(self, w): self.width = w
    def set_height(self, h): self.height = h

class Square(Rectangle):
    def set_width(self, w):
        self.width = w
        self.height = w  # Violation!
    def set_height(self, h):
        self.width = h
        self.height = h
\`\`\`
If a function expects a \`Rectangle\` and sets the width to 10 and height to 5, it expects an area of 50. If you pass a \`Square\`, the width change also changes the height, and the area becomes 25. The code "breaks" because the subclass violated the **behavioral expectations** of the base class.

## How to Follow LSP
1. **Preconditions cannot be strengthened:** A subclass shouldn't require more than its parent (e.g., "I only accept positive numbers" when the parent accepts all).
2. **Postconditions cannot be weakened:** A subclass must do at least as much as the parent (e.g., "I might not actually save the data" when the parent promised to save).
3. **Invariants must be preserved:** If the parent promises "The ID will never be null," the subclass must keep that promise.

LSP is about **Contracts**. Inheritance is not just about sharing code; it's about promising that the new thing is a valid substitute for the old thing.`
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
