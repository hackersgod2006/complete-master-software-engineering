import type { Section } from '../types';

export const CH13_SECTIONS: Section[] = [
  {
    id: "13-1",
    number: "13.1",
    title: "Defining Legacy Code: Any Code Without Tests",
    content: `Most developers think of **Legacy Code** as "old code" or "code written by someone who has since left the company." However, Michael Feathers, in his classic *Working Effectively with Legacy Code*, provides a much more functional and chilling definition: **Legacy Code is code without tests.**

## The Vicious Cycle of Legacy Code
Code without tests is difficult to change. Because it's difficult to change, developers are afraid to touch it. Because they are afraid, they only add the bare minimum of code required to fix a bug or add a feature, usually by "tacking on" logic rather than integrating it. This makes the code even more complex and harder to test, and the cycle continues.

## Why Tests Define Legacy
Tests are the **safety net** that allows you to change code with confidence. Without them, you can never be certain that a change in one part of the system didn't break a seemingly unrelated part. In a large system, the dependencies are so complex that manual regression testing is impossible.
- **With Tests**: You can refactor, clean, and evolve the design. The code remains "living."
- **Without Tests**: The code is "frozen." Any change is a risk. You are essentially gambling with the system's stability.

## The Reality of Industry
You will spend 80% of your career working with legacy code. Green-field projects (starting from scratch) are rare. Your value as a Master of Software Engineering is not measured by how well you write new code, but by how well you can **tame and transform** existing, messy, untested code into a maintainable system.

---
**Key Insight**: Legacy code isn't a status based on age; it's a status based on **testability**. A project started yesterday that has no tests is already legacy code.`
  },
  {
    id: "13-2",
    number: "13.2",
    title: "The Legacy Code Change Algorithm",
    content: `When you are assigned to change legacy code, the instinct is often to "just dive in." This is a recipe for disaster. Feathers outlines a disciplined algorithm for changing legacy code that minimizes risk:

1. **Identify Change Points**: Find where in the code you need to make your change.
2. **Find Test Points**: Find where you can place tests to verify the behavior of those change points.
3. **Break Dependencies**: Often, you can't get the code under test because it depends on something else (a database, a complex object, a global variable). You must break these dependencies.
4. **Write Tests**: Write **Characterization Tests** (see 13.5) to capture the current behavior.
5. **Make Changes and Refactor**: Now that you have a safety net, you can make your intended change and then refactor the code to improve its design.

## The "Surgical" Mentality
Working with legacy code is like surgery. You want to make the smallest possible incision to achieve the goal. You don't perform a heart transplant when a simple stent will do. However, unlike a surgeon, your goal is to leave the "patient" (the codebase) healthier and more resilient than you found it.

## The Compromise
In the legacy world, you often have to write "ugly" code (like subclassing and overriding) just to get the code under test. This is an acceptable trade-off. Once the tests are in place, you can use refactoring to clean up the mess. The tests are your ticket to freedom.`
  },
  {
    id: "13-3",
    number: "13.3",
    title: "Finding Seams: Where to Break Dependencies",
    content: `The biggest obstacle to testing legacy code is **Dependency**. If a function directly creates a database connection or calls a global singleton, you cannot test it in isolation. To break these dependencies, you must find a **Seam**.

## What is a Seam?
A **Seam** is a place where you can alter behavior in your program without editing in that place. It's a point of flexibility that you can exploit to insert a "test double" (a mock or stub) instead of the real dependency.

## Identifying Seams
Look for where different modules or layers meet.
- **Function Calls**: Can you intercept the call?
- **Object Creation**: Can you change which object is created?
- **Global Variables**: Can you replace the global instance?

## The Goal: Isolation
By exploiting a seam, you isolate the code you want to test from its "noisy" neighbors.
- **Neighbor**: A database that takes 2 seconds to respond.
- **Seam**: An interface for the data access layer.
- **Test Double**: A mock that returns a hardcoded list of users in 1 millisecond.

The art of legacy code is the art of finding and creating seams where none were intended by the original author.`
  },
  {
    id: "13-4",
    number: "13.4",
    title: "Seam Types: Object, Link, Preprocessing",
    content: `There are three primary types of seams, depending on how the language and build system handle code.

## 1. Object Seams
This is the most common seam in Object-Oriented languages (Java, C#, Python, TS). It relies on **Polymorphism**. If a method calls another method on an object, you can replace that object with a subclass or an implementation of the same interface that behaves differently for tests.

\`\`\`typescript
// The code we want to test
class OrderProcessor {
  process(order) {
    const validator = new CreditValidator(); // Hard dependency!
    if (validator.isValid(order)) { /* ... */ }
  }
}
\`\`\`
To create an object seam, we might use Dependency Injection (passing the validator in) or the "Extract and Override" technique (see 13.8).

## 2. Link Seams
Link seams occur at the boundary of the build system. You replace a whole library or file with a different version during the linking/importing phase.
- **Example**: In C/C++, you might link against a "mock_network.o" instead of the real "network.o" during test compilation.
- **Example**: In JavaScript, using a tool like \`proxyquire\` or Vitest's \`vi.mock()\` to redirect an \`import\` to a mock file.

## 3. Preprocessing Seams
These are common in languages with preprocessors like C/C++. You use macros to swap out code.
\`\`\`c
#ifdef TESTING
  #define DB_CONNECT mock_db_connect
#else
  #define DB_CONNECT real_db_connect
#endif
\`\`\`

---
**Choosing a Seam**: Always prefer **Object Seams** if possible, as they are the most explicit and easiest to maintain within the code. Link and Preprocessing seams are "magic" and can make the build process opaque and confusing.`
  },
  {
    id: "13-5",
    number: "13.5",
    title: "Characterization Tests: Documenting What Code Does",
    content: `When you first encounter a piece of legacy code, you often don't know what it's *supposed* to do. You only know what it *actually* does. **Characterization Tests** (also called "Golden Master" tests) are written to capture that actual behavior.

## How to Write Characterization Tests
1. Call the piece of code with a set of inputs.
2. Observe the output (or the side effects in the DB/File system).
3. Write a test assertion that expects exactly that output, even if it looks wrong!
4. Repeat with different inputs until you have covered the major logic paths.

## Why capture "wrong" behavior?
The goal of a characterization test is to ensure that your changes don't **accidentally** change behavior. If the code has a bug where it calculates tax at 5.01% instead of 5%, you must capture that 5.01%. If you "fix" it to 5% while refactoring, you might break a downstream system that expects (and has compensated for) that extra 0.01%.

## The Workflow
- **Step 1**: Write 10 characterization tests. All pass.
- **Step 2**: Perform your refactoring.
- **Step 3**: Run the tests. If they fail, you broke something.
- **Step 4**: Once refactoring is done and tests still pass, you can then decide to fix the 5.01% bug. Change the test to expect 5%, watch it fail, then change the code to make it pass.

Characterization tests turn "the way the code works today" into a formal contract that protects you from regressions.`
  },
  {
    id: "13-6",
    number: "13.6",
    title: "Breaking Dependencies: Dependency Injection Techniques",
    content: `Dependency Injection (DI) is the primary tool for creating seams. In legacy code, you often find "Hard-Coded Dependencies" where a class creates its own helpers.

## Hard-Coded Dependency (The Problem)
\`\`\`python
class UserService:
    def __init__(self):
        self.db = Database("prod-url") # Impossible to test without a real DB
\`\`\`

## 1. Constructor Injection
The most robust method. Pass the dependency as an argument to the constructor.
\`\`\`python
class UserService:
    def __init__(self, db):
        self.db = db
\`\`\`

## 2. Setter Injection
Useful if you cannot change the constructor (e.g., due to a framework or many existing callers).
\`\`\`python
class UserService:
    def set_db(self, db):
        self.db = db
\`\`\`

## 3. Parameter Injection
Instead of keeping the dependency as a field, pass it only to the method that needs it.
\`\`\`python
class UserService:
    def update_user(self, user_id, db):
        db.save(user_id)
\`\`\`

## The "Dependency Inversion Principle"
By using DI, you are following the "D" in SOLID. High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces). This makes the code inherently more testable and modular.`
  },
  {
    id: "13-7",
    number: "13.7",
    title: "Subclassing and Overriding for Testability",
    content: `Sometimes, a class is so difficult to instantiate or has so many dependencies that you cannot even use Dependency Injection without a massive refactor. In these cases, we use **Subclassing and Overriding**.

## The Technique
1. Identify the specific method that makes testing hard (e.g., it calls a 3rd party API).
2. Make that method \`protected\` (if the language requires it) or simply ensure it's overridable.
3. In your test code, create a "Testing Subclass" that inherits from the class and overrides only that one method.

### Production Code:
\`\`\`java
public class PaymentProcessor {
    public void process() {
        // ... some logic ...
        sendToStripe(); // This is the hard part
    }
    
    protected void sendToStripe() {
        // Real network call here
    }
}
\`\`\`

### Test Code:
\`\`\`java
class TestingPaymentProcessor extends PaymentProcessor {
    public boolean stripeCalled = false;
    @Override
    protected void sendToStripe() {
        this.stripeCalled = true; // No network call!
    }
}
\`\`\`

## Warning
This is a **temporary** measure. It's a "hack" to get the code under test. Once you have coverage, you should refactor to use proper interfaces and composition. Subclassing for tests can lead to "fragile tests" if the internal structure of the parent class changes significantly.`
  },
  {
    id: "13-8",
    number: "13.8",
    title: "Extract and Override: The Most Powerful Legacy Technique",
    content: `**Extract and Override** is the "Swiss Army Knife" of legacy code. It combines the ideas of Seams and Subclassing to isolate logic without requiring a massive architectural change.

## The Problem
You want to test a method, but that method contains logic mixed with a side effect (like a DB query or a global state access).

## The Steps
1. **Extract** the side effect into its own method.
2. **Override** that method in a test subclass.

### Example:
\`\`\`javascript
class UserStats {
    calculateTotal(userId) {
        const user = GlobalDB.find(userId); // Problem: Global dependency
        return user.score * 1.5;
    }
}
\`\`\`

**Refactor (Extract):**
\`\`\`javascript
class UserStats {
    calculateTotal(userId) {
        const user = this.findUser(userId); // Extracted!
        return user.score * 1.5;
    }
    findUser(userId) {
        return GlobalDB.find(userId);
    }
}
\`\`\`

**Test (Override):**
\`\`\`javascript
class FakeUserStats extends UserStats {
    findUser(userId) {
        return { score: 100 }; // Fake data for test
    }
}
\`\`\`

## Why is it so powerful?
It allows you to test the logic of \`calculateTotal\` (the \`* 1.5\` part) without ever having to touch the \`GlobalDB\`. It requires zero changes to the callers of \`UserStats\`, making it a zero-risk refactoring.`
  },
  {
    id: "13-9",
    number: "13.9",
    title: "Working With Large Functions: Sprout and Wrap",
    content: `When you need to add functionality to a 500-line "Monster Function," don't just add more lines. Use the **Sprout** or **Wrap** techniques.

## Sprout Method
If you need to add a new piece of logic, write it as a new, standalone function. Then, call that function from the monster function.
- **Benefit**: The new logic is clean, isolated, and 100% testable.
- **Trade-off**: The monster function gets one line longer, but its internal complexity doesn't increase as much.

## Sprout Class
If the new logic is complex and requires its own state, create a new class ("Sprout Class") and use it from the monster function.

## Wrap Method
If you want to add behavior that should happen before or after the existing function, create a new function with the same name as the old one, rename the old one, and call it from the new one.

### Before:
\`\`\`python
def post_item(item):
    # 50 lines of complex legacy logic
    pass
\`\`\`

### After:
\`\`\`python
def post_item(item):
    validate_item(item) # New logic "wrapped" around old
    _old_post_item(item)

def _old_post_item(item):
    # 50 lines of legacy
    pass
\`\`\`

## Wrap Class (Decorator Pattern)
Similarly, you can wrap a legacy class in a new class that adds behavior before delegating to the legacy instance. This is effectively the **Decorator Pattern** applied to legacy maintenance.`
  },
  {
    id: "13-10",
    number: "13.10",
    title: "Working With Untestable Classes",
    content: `Sometimes you can't even instantiate a class in a test because its constructor does something terrible (like starting a web server or connecting to a mainframe).

## The "Interface Extraction" Strategy
If you can't test a class, test the *users* of that class by extracting an interface.
1. Create an interface (or abstract base class) that mirrors the methods of the untestable class.
2. Make the untestable class implement that interface.
3. Update the code you want to test to accept the interface instead of the concrete class.
4. In your tests, pass a mock implementation of the interface.

## The "Null Object" Strategy
If a class has many optional dependencies that are hard to set up, create "Null Object" versions of those dependencies. A Null Object implements the interface but does nothing (no-ops). This is cleaner than passing \`null\` and having to add \`if (obj != null)\` checks everywhere.

## Dealing with Static Methods
Static methods (and \`final\` methods in Java) are the enemies of testability because they cannot be overridden. If you encounter a problematic static method, your first step should be to wrap it in an object that *can* be mocked (the "Wrapper" or "Adapter" pattern).`
  },
  {
    id: "13-11",
    number: "13.11",
    title: "Working With Global State and Singletons",
    content: `Global state is the "Original Sin" of software architecture. It makes code unpredictable because any part of the system can change the state at any time. Singletons are just globals in a fancy suit.

## The Problem with Singletons
\`\`\`java
UserPreferences.getInstance().getTheme(); // Hard to mock!
\`\`\`

## Step 1: Hide the Singleton
Don't call the singleton directly in your business logic. Pass the value it provides as a parameter.
\`\`\`java
// Instead of:
public void applySettings() {
    String theme = UserPreferences.getInstance().getTheme();
}

// Do this:
public void applySettings(String theme) {
    // Logic depends only on the string, not the singleton
}
\`\`\`

## Step 2: Extract an Interface
If you must interact with the singleton's methods, extract an interface for it and use Dependency Injection to pass the instance (or a mock) into your class.

## Step 3: The "Singleton Setter" (The Last Resort)
If you can't change how the singleton is accessed, add a static method to the singleton that allows you to replace the internal instance with a mock for tests.
\`\`\`java
public class UserPreferences {
    private static UserPreferences instance;
    public static void setInstanceForTesting(UserPreferences mock) {
        instance = mock;
    }
}
\`\`\`
**Warning**: This can cause "test pollution" where one test's mock leaks into another test. Always clear the mock in your test's \`tearDown\` method.`
  },
  {
    id: "13-12",
    number: "13.12",
    title: "Working With Databases in Legacy Code",
    content: `Legacy systems often treat the database as "The Truth" and put business logic inside Stored Procedures or raw SQL strings scattered throughout the code.

## Strategy 1: The Repository Pattern
Wrap all database access in a **Repository** interface. Your business logic should only talk to the repository. This allows you to swap the real SQL-backed repository for an in-memory repository (like an array or a hash map) for testing.

## Strategy 2: Database Sandbox
If you *must* test against a real database (e.g., to test complex SQL), use a "Sandbox" approach:
- Each test run starts with a clean database.
- Use **Migrations** to set up the schema.
- Use **Factories** (not "seed files") to create exactly the data needed for that specific test.
- Use **Transactions**: Start a transaction at the beginning of each test and roll it back at the end. This is the fastest way to "clean" the DB because no data is ever actually committed.

## Strategy 3: The "Schema-First" Test
If the schema is a mess, write tests that verify the *schema* itself (e.g., "table X must have an index on column Y"). This prevents other developers from making the mess worse while you're trying to clean it up.`
  },
  {
    id: "13-13",
    number: "13.13",
    title: "Incremental Rewriting: Never the Big Bang",
    content: `The most dangerous words in software engineering are: "We should just rewrite this from scratch."

## Why the "Big Bang" Fails
1. **The Second System Effect**: You'll try to add all the features the old system didn't have, making the new system even more complex.
2. **Feature Parity is Hard**: The old system contains 10 years of bug fixes and edge-case handling that isn't documented anywhere but the code.
3. **The Target Moves**: While you rewrite, the old system is still being updated to meet business needs. You are chasing a moving target.

## The "Iterative" Alternative
Instead of a separate "Rewrite Team," improve the existing system incrementally.
- **Refactor while you work**: As you add features, clean the areas you touch.
- **Micro-Services**: If a part of the monolith is particularly painful, extract it into a small, clean service.
- **Module-by-Module**: Rewrite one package or directory at a time, keeping it integrated with the rest of the system via interfaces.

---
**The Goal**: You want the transition from "Old" to "New" to be so gradual that no one can point to the exact day the system became "New."`
  },
  {
    id: "13-14",
    number: "13.14",
    title: "The Strangler Fig Pattern in Practice",
    content: `As discussed in the Refactoring chapter, the **Strangler Fig Pattern** is the premier way to replace legacy systems. Let's look at the technical implementation details.

## Step 1: The Routing Layer
You need a way to redirect traffic. This can be:
- **API Gateway**: (e.g., Kong, AWS Gateway)
- **Reverse Proxy**: (e.g., Nginx, HAProxy)
- **Code-Level Router**: (e.g., a middleware in your Express or Django app)

## Step 2: The "Contract"
Before you replace a service, you must define its contract exactly. Use tools like **OpenAPI (Swagger)** or **Protocol Buffers** to document the inputs and outputs of the legacy endpoint.

## Step 3: The Shadow Launch (Dark Launch)
For high-risk changes, use a "Shadow" strategy:
1. Send the request to both the Legacy and the New system.
2. Return the Legacy result to the user.
3. Compare the results in the background.
4. Log any discrepancies.
5. Once the discrepancy rate is zero for a week, switch the "official" result to the New system.

## Step 4: Data Migration
The hardest part is the database. If the new system needs a different schema, you must use the "Dual Write" pattern (see 12.22) to keep both databases in sync during the transition.

The Strangler Fig pattern turns a terrifying "Cut-Over Day" into a boring series of minor configuration changes.`
  },
  {
    id: "13-15",
    number: "13.15",
    title: "Managing Technical Debt in Legacy Systems",
    content: `Technical Debt isn't necessarily bad; it's a tool for speed. However, like financial debt, it must be managed. In legacy systems, you are often "bankrupt"—the interest (the time spent dealing with bugs and complexity) is higher than your income (the time available for new features).

## The Debt Portfolio
Categorize your technical debt:
- **Deliberate Debt**: "We skipped tests to hit the trade show deadline."
- **Inadvertent Debt**: "We didn't know about the Strangler Fig pattern when we started."
- **Bit Rot**: The system was fine, but the world (libraries, OS, scale) changed.

## The "Tax" Strategy
Don't ask for permission to fix technical debt. Build it into your estimates. If a feature takes 3 days, and cleaning the relevant legacy code takes 1 day, the estimate is 4 days. This is the **Refactoring Tax**.

## The Debt Radar
Keep a "Technical Debt Backlog." Visualize it. When developers are frustrated, have them add to the list. Use "Hotspot Analysis" (tools like CodeScene or simple Git logs) to find which files change most often and have the highest complexity. Those are your highest-interest debts. Fix them first.`
  },
  {
    id: "13-16",
    number: "13.16",
    title: "Case Study: Stripe's API Versioning Strategy",
    content: `Stripe is world-famous for its API stability. They still support API versions from 2011. How do they manage this massive legacy burden?

## The Transformation Layer
Stripe doesn't maintain 50 different versions of their backend code. Instead:
1. They have a single "Current" version of the code.
2. They have a series of **Version Gates** (transformation functions).
3. When a request comes in for version \`2014-01-01\`, it is passed through a chain of "Down-Migrations" that transform the 2014 request into a 2023 request.
4. The backend processes the modern request.
5. The response is passed through "Up-Migrations" to transform it back into the 2014 format.

## Why this works
This keeps the core business logic "Clean" and "Modern." The "Legacy" logic is isolated in the transformation layer. This is a specialized form of the **Adapter Pattern**.

## The Lesson
You can support legacy clients without having a legacy backend. By investing in a robust transformation layer, you gain the freedom to innovate on the core system while maintaining a "Stable" facade for the outside world.`
  },
  {
    id: "13-17",
    number: "13.17",
    title: "Case Study: GitHub's Migration from Rails Monolith",
    content: `GitHub started as a single monolithic Ruby on Rails app. As they grew, this became a bottleneck for both performance and developer productivity.

## The Extraction
They didn't rewrite GitHub. They identified high-traffic "Hotspots" (like the code that renders the file tree or handles Git authentication) and extracted them into separate services (often written in Go or Rust).

## The "Glue"
They used a shared internal library to ensure that the new Go services and the old Rails app could share the same authentication and logging logic. This prevented the "fragmentation" of the user experience.

## Scientific Method
GitHub developed a library called \`Scientist\` to help with these migrations. It allowed them to run "Experiments" where the old and new code ran side-by-side, comparing results and performance before making the switch.

\`\`\`ruby
experiment = Scientist::Default.new "widget-migration"
experiment.use { legacy_code }    # The old way
experiment.try { modern_code }    # The new way
experiment.run
\`\`\`

This "Scientific" approach allowed them to migrate critical infrastructure (like the code that stores your code) with zero downtime and zero data loss.`
  },
  {
    id: "13-18",
    number: "13.18",
    title: "Exercises",
    content: `Test your mastery of Legacy Code techniques.

## 1. Defining Legacy
**Question**: According to Michael Feathers, what is the defining characteristic of Legacy Code?
**Answer**: Legacy code is code without tests.

## 2. Seam Identification
**Question**: You have a function that calls \`DateTime.now()\` to calculate an expiration date. This makes testing hard because "now" is always changing. What kind of seam can you create here?
**Answer**: You can create an **Object Seam** by extracting a \`Clock\` interface with a \`now()\` method. In production, use the real clock; in tests, use a \`FixedClock\` that always returns the same date.

## 3. Characterization Tests
**Question**: You find a function that returns \`undefined\` when it should probably return an empty array. Should you fix this before or after writing characterization tests?
**Answer**: After. Write the test to expect \`undefined\` first to "lock in" the current behavior. Once you have a suite of tests and have finished any refactoring, then change the code and the test to use an empty array.

## 4. Sprout Method
**Question**: When would you choose "Sprout Method" over just adding code to an existing function?
**Answer**: When the existing function is already large/complex, and the new logic is distinct and can be tested in isolation.

## 5. Dependency Injection
**Question**: Refactor this to use Constructor Injection:
\`\`\`javascript
class Logger {
  log(msg) {
    const fs = require('fs');
    fs.appendFileSync('log.txt', msg);
  }
}
\`\`\`
**Answer**:
\`\`\`javascript
class Logger {
  constructor(filesystem) {
    this.fs = filesystem;
  }
  log(msg) {
    this.fs.appendFileSync('log.txt', msg);
  }
}
\`\`\`

## 6. The Strangler Fig
**Question**: What is the primary benefit of the Strangler Fig pattern over a Big Bang rewrite?
**Answer**: Incremental value and reduced risk. You can deploy parts of the new system immediately and revert easily if issues arise, rather than waiting months for a single, high-risk "Go Live" date.

## 7. Extract and Override
**Question**: What is the main danger of using "Subclassing and Overriding" (Extract and Override) for tests?
**Answer**: It couples your tests to the internal implementation details of the class. If you rename the extracted method, the test will still "pass" (calling the parent method) but won't be testing what you think it's testing. Use it as a temporary bridge.

## 8. Technical Debt
**Question**: How do you explain the "Refactoring Tax" to a non-technical manager?
**Answer**: Explain it like maintenance on a factory machine. If you don't stop to oil the gears (refactor) while making products (features), the machine will eventually break down, and production will stop entirely. Refactoring is the cost of keeping the "Software Factory" running at top speed.`
  }
];
