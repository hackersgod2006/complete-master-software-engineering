import type { Section } from '../types';

export const CH16_SECTIONS: Section[] = [
  {
    id: "16-1",
    number: "16.1",
    title: "What Patterns Are and Are Not",
    content: `A **Design Pattern** is a general, reusable solution to a commonly occurring problem within a given context in software design. It is not a finished design that can be transformed directly into code. Instead, it is a description or template for how to solve a problem that can be used in many different situations.

The concept was popularized by the "Gang of Four" (GoF) in their 1994 book, borrowing the idea from architect Christopher Alexander. Alexander observed that in architecture, certain problems (like "how to design a porch") were solved repeatedly with similar structural solutions.

## What Patterns Are Not
1. **Not a Framework:** A framework is code you use. A pattern is an idea you implement.
2. **Not a Silver Bullet:** Using a pattern where it isn't needed (e.g., a Factory for a simple object) is "Over-engineering."
3. **Not Language Specific:** While some patterns are easier in certain languages (like Strategy in JS), the underlying logic is universal.

## The Three Categories
The GoF categorized patterns into three main groups based on their purpose:
- **Creational:** Concerned with the process of object creation.
- **Structural:** Concerned with the composition of classes or objects.
- **Behavioral:** Concerned with the interaction and responsibility of objects.

## The Vocabulary of Design
The greatest value of patterns is not the code—it is the **shared vocabulary**. When an architect says, "Let's use a Decorator here," everyone immediately understands that we are adding behavior dynamically without changing the original class. This level of abstraction allows for much faster and more precise communication.`
  },
  {
    id: "16-2",
    number: "16.2",
    title: "Creational Patterns: Factory Method",
    content: `The **Factory Method** pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate. It "defers" instantiation to subclasses.

## The Problem
Imagine a logistics application. Initially, it only handles trucks. When you want to add ships, you find that most of your code is coupled to the \`Truck\` class. Adding \`Ship\` requires changing the entire codebase.

## The Solution
Instead of calling \`new Truck()\` directly, you call a \`createTransport()\` factory method.
\`\`\`typescript
abstract class Logistics {
  abstract createTransport(): Transport;

  planDelivery() {
    const transport = this.createTransport();
    transport.deliver();
  }
}

class RoadLogistics extends Logistics {
  createTransport() { return new Truck(); }
}

class SeaLogistics extends Logistics {
  createTransport() { return new Ship(); }
}
\`\`\`

## When to Use It
- When a class can't anticipate the class of objects it must create.
- When a class wants its subclasses to specify the objects it creates.
- When you want to localize the knowledge of which helper class is the best to create.`
  },
  {
    id: "16-3",
    number: "16.3",
    title: "Creational Patterns: Abstract Factory",
    content: `The **Abstract Factory** pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.

## Factory Method vs. Abstract Factory
- **Factory Method** creates *one* product.
- **Abstract Factory** creates a *family* of products.

## The Scenario
Suppose you are building a UI toolkit that needs to support Windows and Mac. You have buttons, checkboxes, and sliders. A Windows button should never be used with a Mac checkbox.

\`\`\`typescript
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WinFactory implements GUIFactory {
  createButton() { return new WinButton(); }
  createCheckbox() { return new WinCheckbox(); }
}

class MacFactory implements GUIFactory {
  createButton() { return new MacButton(); }
  createCheckbox() { return new MacCheckbox(); }
}
\`\`\`

## Benefits
- **Consistency:** Ensures that products from the same factory are used together.
- **Decoupling:** The client code only knows about the interfaces (\`GUIFactory\`, \`Button\`), not the concrete implementations (\`WinButton\`).`
  },
  {
    id: "16-4",
    number: "16.4",
    title: "Creational Patterns: Builder",
    content: `The **Builder** pattern is used to construct complex objects step by step. It is particularly useful when an object has many configuration options or optional parameters.

## The "Telescoping Constructor" Problem
When a class has 10 optional parameters, the constructor becomes a nightmare:
\`\`\`typescript
// Bad
new User("John", "Doe", null, null, "Street 1", true, false, 42);
\`\`\`

## The Builder Solution
The Builder allows you to produce different types and representations of an object using the same construction code.
\`\`\`typescript
const user = new UserBuilder("John", "Doe")
  .setAge(42)
  .setAddress("Street 1")
  .setIsActive(true)
  .build();
\`\`\`

## Key Components
- **Builder Interface:** Defines the steps.
- **Concrete Builder:** Implements the steps and tracks the product.
- **Director (Optional):** Defines the order in which to call construction steps for common configurations (e.g., \`buildAdminUser\`).

## Real-world Example
The SQL query builders found in many ORMs (like Knex.js or SQLAlchemy) are classic implementations of this pattern. They allow you to chain methods like \`.select()\`, \`.where()\`, and \`.limit()\` before finally calling \`.execute()\`.`
  },
  {
    id: "16-5",
    number: "16.5",
    title: "Creational Patterns: Prototype",
    content: `The **Prototype** pattern allows you to create new objects by copying an existing object (the "prototype") rather than creating them from scratch.

## Why use it?
1. **Creation Cost:** Creating a new object from a database query or complex calculation might be expensive. Copying an existing one is fast.
2. **Hidden Classes:** When you have a reference to an object but don't know its concrete class, you can still clone it if it implements a \`clone()\` method.

## Implementation (Python Example)
\`\`\`python
import copy

class Shape:
    def __init__(self):
        self.id = None
        self.type = None

    def clone(self):
        return copy.deepcopy(self)

circle = Circle() # Assume Circle inherits Shape
circle.id = "1"
new_circle = circle.clone()
\`\`\`

## The "Deep vs. Shallow" Caveat
When cloning, you must decide whether to do a **Shallow Copy** (copy references only) or a **Deep Copy** (recursively copy all child objects). In Prototype, you almost always want a Deep Copy to ensure the clone is truly independent.`
  },
  {
    id: "16-6",
    number: "16.6",
    title: "Creational Patterns: Singleton — and Why to Avoid It",
    content: `The **Singleton** pattern ensures that a class has only one instance and provides a global point of access to it.

## The Implementation
\`\`\`typescript
class Database {
  private static instance: Database;
  private constructor() {} // Private prevents 'new'

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
\`\`\`

## Why it is often an Anti-Pattern
While it seems useful for things like loggers or database connections, the Singleton is often "Global State" in disguise.
1. **Hidden Dependencies:** When a class uses a Singleton, you can't tell by looking at its constructor. It "reaches out" and grabs the instance.
2. **Testing Nightmare:** Since the state persists across tests, one test can "pollute" the next one, leading to flaky suites.
3. **Violates SRP:** The class is responsible for its business logic *and* for managing its own lifecycle.
4. **Concurrency Issues:** In multi-threaded environments, creating the singleton safely (using double-checked locking) is surprisingly difficult.

**Professor's Recommendation:** Use **Dependency Injection** instead. Create one instance of the database at the start of your application and pass it into the classes that need it. This gives you all the benefits of a single instance without the architectural debt.`
  },
  {
    id: "16-7",
    number: "16.7",
    title: "Structural Patterns: Adapter",
    content: `The **Adapter** pattern (also known as a Wrapper) allows objects with incompatible interfaces to work together. It acts as a bridge between two systems.

## The Scenario
Your app expects data in JSON from a \`StockProvider\`, but you need to use a legacy 3rd-party library that only provides XML.

## The Solution
You create an Adapter that wraps the legacy service. The Adapter implements the interface your app expects and translates the calls to the legacy service.

\`\`\`typescript
// The expected interface
interface StockService {
  getQuote(symbol: string): JSON;
}

class XMLToJSONAdapter implements StockService {
  private legacyService: LegacyXMLService;

  getQuote(symbol: string) {
    const xml = this.legacyService.fetchXML(symbol);
    return this.convertToJSON(xml);
  }
}
\`\`\`

## Real-world usage
- Adapting old API responses to new UI models.
- "Shims" in JavaScript that allow modern code to run in older browsers by adapting the browser's APIs.`
  },
  {
    id: "16-8",
    number: "16.8",
    title: "Structural Patterns: Bridge",
    content: `The **Bridge** pattern decouples an abstraction from its implementation so that the two can vary independently. It is the "compositional" alternative to inheritance.

## The Problem
You have a \`RemoteControl\` class and subclasses like \`AdvancedRemoteControl\`. You also have \`TV\` and \`Radio\`. If you use inheritance, you end up with a "Cartesian product" of classes: \`TVRemote\`, \`RadioRemote\`, \`AdvancedTVRemote\`, \`AdvancedRadioRemote\`. This is a "Class Explosion."

## The Bridge Solution
Instead of inheriting, the \`RemoteControl\` **has a** reference to a \`Device\`.
\`\`\`typescript
class RemoteControl {
  protected device: Device;
  constructor(device: Device) { this.device = device; }
  togglePower() { this.device.on(); }
}

class AdvancedRemote extends RemoteControl {
  mute() { this.device.setVolume(0); }
}
\`\`\`

## Why it matters
The Bridge pattern allows you to add new types of remotes without touching the device code, and new types of devices without touching the remote code. It turns an $N \times M$ problem into an $N + M$ problem.`
  },
  {
    id: "16-9",
    number: "16.9",
    title: "Structural Patterns: Composite",
    content: `The **Composite** pattern allows you to treat individual objects and compositions of objects uniformly. It is used to represent part-whole hierarchies.

## The Classic Example: File Systems
A file system consists of **Files** and **Directories**. A Directory can contain both Files and other Directories.
- **Leaf:** File
- **Composite:** Directory

## Implementation
Both File and Directory implement the same interface (e.g., \`FileSystemItem\`).
\`\`\`typescript
interface FileSystemItem {
  getSize(): number;
}

class File implements FileSystemItem {
  constructor(private size: number) {}
  getSize() { return this.size; }
}

class Directory implements FileSystemItem {
  private items: FileSystemItem[] = [];
  getSize() {
    return this.items.reduce((sum, item) => sum + item.getSize(), 0);
  }
}
\`\`\`

## Why it's powerful
The client doesn't need to know if it's dealing with a single file or a massive directory tree. It just calls \`.getSize()\`. This recursion is the essence of the pattern.`
  },
  {
    id: "16-10",
    number: "16.10",
    title: "Structural Patterns: Decorator",
    content: `The **Decorator** pattern allows behavior to be added to an individual object, dynamically, without affecting the behavior of other objects from the same class.

## Decorator vs. Inheritance
Inheritance is static (at compile time). Decorator is dynamic (at runtime).

## The Coffee Example
You have a \`SimpleCoffee\`. You want to add \`Milk\` and \`Sugar\`.
\`\`\`typescript
interface Coffee { getCost(): number; }

class SimpleCoffee implements Coffee { getCost() { return 10; } }

class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  getCost() { return this.coffee.getCost() + 2; }
}

// Usage
let myCoffee = new SimpleCoffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.getCost()); // 13ish
\`\`\`

## Java I/O: The Famous Implementation
Java's I/O library is a giant set of decorators:
\`\`\`java
InputStream is = new BufferedInputStream(new FileInputStream("file.txt"));
\`\`\`
The \`BufferedInputStream\` "decorates" the \`FileInputStream\` with buffering capabilities.`
  },
  {
    id: "16-11",
    number: "16.11",
    title: "Structural Patterns: Facade",
    content: `The **Facade** pattern provides a simplified interface to a library, a framework, or any other complex set of classes.

## The Problem
A complex subsystem might have 50 classes and hundreds of methods. A client who only wants to do one simple thing (e.g., "Place Order") shouldn't have to understand the inventory system, the payment gateway, the shipping logic, and the notification service.

## The Facade Solution
Create a \`StoreFacade\` that exposes a single \`placeOrder()\` method. Internally, it orchestrates all the complex subsystems.

\`\`\`typescript
class StoreFacade {
  placeOrder(itemId: string) {
    inventory.check(itemId);
    payment.charge();
    shipping.book();
    notifier.send();
  }
}
\`\`\`

## Benefits
- **Reduces Coupling:** Clients depend on one facade rather than ten subsystems.
- **Information Hiding:** The facade hides the "messy" parts of the system.`
  },
  {
    id: "16-12",
    number: "16.12",
    title: "Structural Patterns: Flyweight",
    content: `The **Flyweight** pattern is used to reduce memory usage by sharing as much data as possible with other similar objects. It is a "Space Optimization" pattern.

## Intrinsic vs. Extrinsic State
- **Intrinsic State:** Data that is constant across many objects (e.g., the image of a "Tree" in a forest simulation).
- **Extrinsic State:** Data that is unique to each instance (e.g., the X, Y coordinates of that specific tree).

## Implementation
Instead of storing the tree image 1,000,000 times, you store it once in a \`TreeType\` object. Each \`Tree\` instance merely holds a reference to the \`TreeType\` and its own coordinates.

## Real-world Example
In a text editor, storing the font, size, and color for every single character would be wasteful. Instead, characters share a flyweight object representing their formatting.`
  },
  {
    id: "16-13",
    number: "16.13",
    title: "Structural Patterns: Proxy",
    content: `The **Proxy** pattern provides a surrogate or placeholder for another object to control access to it.

## Types of Proxies
1. **Virtual Proxy:** Delays the creation of a heavy object until it's actually needed (Lazy Loading).
2. **Protection Proxy:** Controls access based on permissions (Security).
3. **Remote Proxy:** Represents an object that exists in a different address space (like a REST API client that looks like a local object).
4. **Logging Proxy:** Logs every call to the target object.

## Implementation (Lazy Loading)
\`\`\`typescript
class ImageProxy implements Graphic {
  private realImage: RealImage | null = null;
  draw() {
    if (!this.realImage) this.realImage = new RealImage();
    this.realImage.draw();
  }
}
\`\`\`
The client thinks it's talking to the image, but the image is only loaded when \`draw()\` is called.`
  },
  {
    id: "16-14",
    number: "16.14",
    title: "Behavioral Patterns: Chain of Responsibility",
    content: `The **Chain of Responsibility** allows you to pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

## The Scenario: Support Ticket System
- **Level 1:** Can handle basic resets.
- **Level 2:** Can handle technical bugs.
- **Level 3:** Can handle billing issues.

## Why use it?
It decouples the sender of a request from its receivers. The sender doesn't know which object will eventually handle the request.

## Middleware: The Modern Implementation
Express.js or ASP.NET Core middleware are chains of responsibility. Each middleware can end the request (send a response) or call \`next()\` to pass it to the next function.`
  },
  {
    id: "16-15",
    number: "16.15",
    title: "Behavioral Patterns: Command",
    content: `The **Command** pattern turns a request into a stand-alone object that contains all information about the request.

## Why?
Turning an action into an object allows you to:
- **Queue actions:** Store commands in a list to execute later.
- **Log actions:** Keep a history of what was done.
- **Undo/Redo:** Commands can implement an \`unexecute()\` method.

## Implementation
\`\`\`typescript
interface Command { execute(): void; undo(): void; }

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute() { this.light.turnOn(); }
  undo() { this.light.turnOff(); }
}
\`\`\`

## Redux/Action Pattern
The modern "Action" in Redux or Vuex is a lightweight Command pattern. It describes "what happened" as an object, which is then "dispatched" (invoked) by a centralized system.`
  },
  {
    id: "16-16",
    number: "16.16",
    title: "Behavioral Patterns: Iterator",
    content: `The **Iterator** pattern allows you to traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).

## The Abstract Interface
The Iterator provides methods like \`next()\`, \`hasNext()\`, and \`current()\`.

## Why it's essential
It allows you to use the same loop logic for a linked list and a complex binary tree. Most modern languages (Python's \`__iter__\`, JS's \`Symbol.iterator\`, Java's \`Iterable\`) have this pattern built into the core syntax.

\`\`\`javascript
// The for..of loop in JS uses the Iterator pattern internally
for (const item of myCollection) {
  console.log(item);
}
\`\`\`
The \`myCollection\` doesn't have to be an array; as long as it implements the Iterator interface, the loop works.`
  },
  {
    id: "16-17",
    number: "16.17",
    title: "Behavioral Patterns: Mediator",
    content: `The **Mediator** pattern reduces chaotic dependencies between objects by forcing them to communicate through a single mediator object.

## The Problem
Objects in a complex system start talking to everyone else. Soon, every object knows about every other object, creating a "spaghetti" of dependencies.

## The Solution: Air Traffic Control
Airplanes don't talk to each other to avoid collisions. They all talk to the Tower (The Mediator). The Tower tells them when to land.

## Benefits
- **Decoupling:** Objects don't need to know who else is in the system.
- **Centralization:** Interaction logic is in one place, making it easier to change.`
  },
  {
    id: "16-18",
    number: "16.18",
    title: "Behavioral Patterns: Memento",
    content: `The **Memento** pattern allows you to capture and restore the internal state of an object without violating encapsulation.

## The Components
1. **Originator:** The object whose state we want to save.
2. **Memento:** A "snapshot" of the state (usually an immutable object).
3. **Caretaker:** Holds the mementos but never modifies them.

## Use Case: Undo in a Text Editor
When the user types, the \`Editor\` (Originator) creates a \`Snapshot\` (Memento). The \`UndoManager\` (Caretaker) pushes it onto a stack. When "Undo" is pressed, the \`Editor\` restores its state from the top snapshot.`
  },
  {
    id: "16-19",
    number: "16.19",
    title: "Behavioral Patterns: Observer",
    content: `The **Observer** pattern (also known as Pub/Sub) defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.

## The Mechanism
- **Subject:** Maintains a list of observers and notifies them of changes.
- **Observer:** Implements an \`update()\` method.

## Modern Examples
- **Frontend Frameworks:** React and Vue use a form of the Observer pattern to re-render components when data changes.
- **Event Listeners:** \`button.addEventListener('click', ...)\` is the Observer pattern. The button is the Subject, and your callback is the Observer.`
  },
  {
    id: "16-20",
    number: "16.20",
    title: "Behavioral Patterns: State",
    content: `The **State** pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class.

## State vs. if/else
If you have a \`Document\` class with a \`publish()\` method:
- If state is "Draft", it moves to "Review".
- If state is "Review", it moves to "Published".
- If state is "Published", it does nothing.

Instead of a giant \`switch\` statement, each state is its own class.

\`\`\`typescript
interface State { publish(): void; }

class DraftState implements State {
  publish() { this.doc.setState(new ReviewState()); }
}
\`\`\`

## When to use it
When your object's behavior depends on its state, and the number of states is large or the logic is complex. It eliminates massive conditional blocks and makes states "first-class citizens" in your code.`
  },
  {
    id: "16-21",
    number: "16.21",
    title: "Behavioral Patterns: Strategy",
    content: `The **Strategy** pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from the clients that use it.

## The Example: Sorting
You have a \`List\` that needs sorting. Depending on the size of the list, you might want \`QuickSort\`, \`MergeSort\`, or \`BubbleSort\`.

## Implementation
\`\`\`typescript
interface SortStrategy { sort(data: any[]): void; }

class Context {
  private strategy: SortStrategy;
  setStrategy(s: SortStrategy) { this.strategy = s; }
  executeSort(data: any[]) { this.strategy.sort(data); }
}
\`\`\`

## Strategy vs. State
- **Strategy** is usually chosen by the client (e.g., "I want to pay by Credit Card").
- **State** is usually managed by the object itself (e.g., "I am now in the 'Review' state").`
  },
  {
    id: "16-22",
    number: "16.22",
    title: "Behavioral Patterns: Template Method",
    content: `The **Template Method** defines the skeleton of an algorithm in an operation, deferring some steps to subclasses.

## The Logic
The base class defines the "algorithm structure" as a \`final\` (non-overridable) method that calls several "hook" methods. Subclasses override the hooks to provide specific behavior.

\`\`\`typescript
abstract class DataMiner {
  // The Template Method
  process() {
    this.openFile();
    this.extractData();
    this.closeFile();
  }
  abstract extractData(): void; // Hook
}
\`\`\`

## Template Method vs. Strategy
- **Template Method** uses Inheritance (fixed structure, variable steps).
- **Strategy** uses Composition (variable whole algorithm).`
  },
  {
    id: "16-23",
    number: "16.23",
    title: "Behavioral Patterns: Visitor",
    content: `The **Visitor** pattern allows you to add new operations to existing object structures without modifying them. It is the OO solution to the **Expression Problem**.

## The Mechanism: Double Dispatch
The visitor pattern uses a trick: the element "accepts" the visitor, and then calls the visitor's method back, passing itself as an argument.

\`\`\`typescript
interface Visitor {
  visitCircle(c: Circle): void;
  visitSquare(s: Square): void;
}

class Circle {
  accept(v: Visitor) { v.visitCircle(this); }
}
\`\`\`

## Use Case: Compilers
In a compiler, the source code is represented as an Abstract Syntax Tree (AST). You might have many visitors: one for type-checking, one for optimization, and one for code generation. None of these operations need to be inside the AST node classes themselves.`
  },
  {
    id: "16-24",
    number: "16.24",
    title: "Concurrency Patterns: Active Object, Monitor, Half-Sync/Half-Async",
    content: `As systems become increasingly parallel, a specific set of patterns has emerged to handle concurrency safely.

## Active Object
The **Active Object** pattern decouples method execution from method invocation. It consists of a proxy, a scheduler, and a queue. When you call a method, it is turned into a request object, put in a queue, and executed on a separate thread. This allows for asynchronous execution without blocking the main thread.

## Monitor Object
A **Monitor** synchronizes method execution to ensure that only one thread at a time executes a method within an object. Languages like Java have this built-in via the \`synchronized\` keyword. It prevents "Race Conditions" by locking the object's state during operation.

## Half-Sync/Half-Async
This pattern is used in high-performance servers (like Node.js or Nginx).
- **Async Layer:** Handles concurrent I/O (like network packets) efficiently using an event loop.
- **Sync Layer:** Handles complex processing that might block (like heavy computation).
- **Queue:** Sits between them to pass work.

This allows the system to remain responsive to new requests even while doing heavy work.`
  },
  {
    id: "16-25",
    number: "16.25",
    title: "Architectural Patterns: Repository, Unit of Work, Specification",
    content: `These patterns focus on the boundary between the Domain Logic and the Data Persistence layer.

## Repository
A **Repository** mediates between the domain and data mapping layers, acting like an in-memory collection of domain objects. It hides the SQL or API calls, allowing the business logic to work with "Objects" instead of "Rows."

## Unit of Work
A **Unit of Work** tracks everything you do during a business transaction that can affect the database. When you're done, it figures out everything that needs to be done to alter the database as a result of your work in a single transaction. It prevents partial saves and optimizes database hits.

## Specification
The **Specification** pattern allows you to encapsulate business rules into small, reusable objects.
\`\`\`typescript
const isPremium = new PremiumUserSpecification();
const hasOrders = new HasRecentOrdersSpecification();

if (isPremium.and(hasOrders).isSatisfiedBy(user)) { ... }
\`\`\`
This keeps complex conditional logic out of the domain entities and the repository queries.`
  },
  {
    id: "16-26",
    number: "16.26",
    title: "Enterprise Patterns: CQRS, Event Sourcing, Saga",
    content: `Enterprise systems often require more robust patterns than a simple CRUD (Create, Read, Update, Delete) approach.

## CQRS (Command Query Responsibility Segregation)
**CQRS** suggests using a different model to update information than the model you use to read information.
- **Commands:** Change state (don't return data).
- **Queries:** Return data (don't change state).
In high-scale systems, the "Read" database might even be a different technology (e.g., Elasticsearch) than the "Write" database (e.g., PostgreSQL).

## Event Sourcing
Instead of storing the *current state* of an object, you store a *sequence of events* that led to that state.
- **Current State:** Balance = $100.
- **Event Source:** +$50, -$20, +$70.
This provides a perfect audit log and the ability to "time travel" to any point in the past.

## Saga Pattern
A **Saga** is a sequence of local transactions. Each local transaction updates the database and publishes a message or event to trigger the next local transaction. If a local transaction fails, the saga executes a series of **compensating transactions** to undo the changes made by the preceding local transactions. This is the standard way to handle distributed transactions in microservices.`
  },
  {
    id: "16-27",
    number: "16.27",
    title: "Anti-Patterns: What They Are and How to Escape Them",
    content: `An **Anti-Pattern** is a common response to a recurring problem that is usually ineffective and risks being highly counterproductive.

## Common Anti-Patterns
1. **The God Object:** A single class that does everything.
   - *Escape:* Use SRP to break it into focused modules.
2. **Golden Hammer:** Using the same tool (e.g., NoSQL) for every problem, regardless of fit.
   - *Escape:* Learn multiple paradigms and evaluate based on requirements.
3. **Spaghetti Code:** Code with no clear structure or flow.
   - *Escape:* Apply layering and design patterns like Facade or Mediator.
4. **Premature Optimization:** Sacrificing clarity for performance that doesn't matter yet.
   - *Escape:* Profile first. Only optimize bottlenecks.
5. **Cargo Cult Programming:** Copying code or patterns without understanding why.
   - *Escape:* Read the docs. Ask "why" before "how."

## The "Pattern Happy" Developer
The most common anti-pattern for senior-level beginners is **Patternitis**—the urge to use as many design patterns as possible in a single project.
- *Symptom:* A "Hello World" app with a \`GreetingFactory\`, \`AbstractLanguageDecorator\`, and a \`StdoutObserver\`.
- *Solution:* Follow YAGNI. Only add a pattern when you can clearly articulate the problem it is solving.`
  },
  {
    id: "16-28",
    number: "16.28",
    title: "Case Study: Patterns in the Django ORM",
    content: `The Django web framework (Python) is a treasure trove of design patterns. Its ORM (Object-Relational Mapper) is a particularly sophisticated example.

## Active Record vs. Data Mapper
Django uses the **Active Record** pattern. Each model class represents a table, and each instance represents a row. The instance has methods like \`.save()\` and \`.delete()\`.

## The Manager (Bridge/Facade)
The \`objects\` attribute on Django models (e.g., \`User.objects.filter(...)\`) is a **Manager**. It acts as a **Facade** for the complex query construction logic. It also uses the **Proxy** pattern—the query isn't actually executed until you try to access the data (Lazy Loading).

## Meta-programming (Prototype/Builder)
Django uses Python's "metaclasses" to implement a variant of the **Prototype** pattern. When you define a class, Django intercepts the creation to build the internal mapping of fields to database columns.

## The Middleware (Chain of Responsibility)
Django's request/response cycle is handled by a chain of middleware. Each piece of middleware (Authentication, CSRF, Session) has a chance to process the request or return a response immediately.

## The Lesson
Django's success isn't just because it's in Python; it's because it uses patterns to provide a **Fluent Interface** that hides immense complexity. It proves that patterns, when used correctly, create a "pit of success" where doing the right thing is the easiest thing.`
  },
  {
    id: "16-29",
    number: "16.29",
    title: "Exercises",
    content: `Test your knowledge of design patterns and their application.

1. **Pattern Identification:** You have a system where multiple objects need to be notified when a configuration file changes. Which pattern should you use?
   *Answer: The Observer pattern.*

2. **Refactoring:** You have a class with a 20-line constructor and 15 optional parameters. Which pattern would make this cleaner?
   *Answer: The Builder pattern.*

3. **Structural Design:** You need to integrate a 3rd-party library that uses different method names than your existing interface. Which pattern applies?
   *Answer: The Adapter pattern.*

4. **Behavioral Logic:** You are building a game where an Orc's behavior changes from "Patrolling" to "Attacking" to "Fleeing" based on its health and the player's distance. Which pattern is best?
   *Answer: The State pattern.*

5. **Resource Management:** You want to ensure that your application only ever creates one connection to a legacy mainframe. Which pattern ensures this?
   *Answer: The Singleton pattern (though use with caution!).*

6. **Optimization:** You are building a map with 10,000 "Grass" tiles. Each tile is an object. How do you prevent your memory usage from exploding?
   *Answer: Use the Flyweight pattern to share the common "Grass" data (color, texture) across all 10,000 instances.*

7. **Undo Support:** How does the Command pattern facilitate "Undo" functionality?
   *Answer: By storing the state changes inside the command object and providing an \`unexecute()\` or \`undo()\` method that reverses the \`execute()\` action.*

8. **Architecture:** What is the difference between a Factory Method and an Abstract Factory?
   *Answer: A Factory Method creates a single product through inheritance (subclasses override a method). An Abstract Factory creates a family of related products through composition (a factory object is passed in).*`
  }
];
