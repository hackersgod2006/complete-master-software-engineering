import type { Section } from '../types';

export const CH11_SECTIONS: Section[] = [
  {
    id: "11-1",
    number: "11.1",
    title: "The Testing Manifesto: Why Tests Are Not Optional",
    content: `In the early days of software, testing was often seen as a separate "phase" that happened after the real engineering was done. Today, we understand that **testing is the engineering**. Without tests, you aren't building a system; you're building a collection of hopeful guesses.

## Testing as Documentation
A well-written test suite is the most honest documentation in a codebase. Unlike a README file, which can drift out of date, a test must be accurate, or the build fails. A test tells you:
- What the input should be.
- What the output must be.
- How the system should handle failure.

## Testing as Design Tool
When you find a piece of code is "hard to test," it is almost always because the code is **poorly designed**. Testing acts as a "pressure gauge" for your architecture. If you need 200 lines of setup to test a 5-line function, your function is too tightly coupled.

## Testing as Safety Net
The primary value of tests is not finding bugs today; it's preventing **regressions** tomorrow. As a system grows, no single human can hold the entire mental model in their head. Tests allow you to refactor and add features with the "Confidence of a Master," knowing that if you break an existing invariant, the computer will tell you in seconds.

## The Cost of Not Testing
| Phase | Cost to Fix Bug |
|-------|-----------------|
| Development | $1 (Minutes) |
| CI/Build | $10 (Hours) |
| Production | $1,000+ (Days + Reputation) |

In modern engineering, automated tests are the "barrier to entry." If a feature isn't tested, it doesn't exist.`
  },
  {
    id: "11-2",
    number: "11.2",
    title: "The Testing Pyramid: Unit, Integration, End-to-End",
    content: `Mike Cohn's **Testing Pyramid** is the classic model for balancing different types of tests. It emphasizes having a large base of fast, isolated tests and a small peak of slow, integrated tests.

## 1. Unit Tests (The Base)
- **Scope**: A single function, class, or module in isolation.
- **Speed**: Milliseconds.
- **Goal**: Verify logic and edge cases.
- **Quantity**: Hundreds or thousands.

## 2. Integration Tests (The Middle)
- **Scope**: How two or more modules (or a module and a database) work together.
- **Speed**: Seconds.
- **Goal**: Verify communication and "plumbing."
- **Quantity**: Dozens or hundreds.

## 3. End-to-End (E2E) Tests (The Peak)
- **Scope**: The entire system from the user's perspective (e.g., clicking a button in a browser).
- **Speed**: Minutes.
- **Goal**: Verify "User Journeys."
- **Quantity**: A few critical paths.

## Why the Pyramid Shape?
The pyramid is shaped by two factors: **Cost** and **Speed**. E2E tests are "brittle" (they break easily when the UI changes) and slow. If you have 1,000 E2E tests, your build will take 5 hours, and no one will run it. If you have 1,000 unit tests, they run in 10 seconds.

The "Pyramid" ensures that most bugs are caught early and cheaply by the fastest tests, leaving only the complex integration issues for the slower layers.`
  },
  {
    id: "11-3",
    number: "11.3",
    title: "The Testing Trophy: An Updated Model",
    content: `While the Pyramid is the classic model, Kent C. Dodds popularized the **Testing Trophy**, which argues that for modern web applications, the "middle" (Integration) is actually the most valuable layer.

## The Trophy Shape
1. **Static** (The Base): Linters and Type Checkers (TypeScript, Flow). Catches typos and basic logic errors instantly.
2. **Unit**: Small, isolated tests for pure logic.
3. **Integration** (The Wide Body): Tests that span several units but don't require the full system.
4. **E2E** (The Top): A thin layer of critical path tests.

## Why focus on Integration?
The argument for the Trophy is that unit tests often "over-mock." If you mock the database, the network, and every other function, your test might pass even if the real system is broken because the "glue" between the parts is where the bugs hide. 

Integration tests provide a higher **Return on Investment (ROI)** because they prove that the system actually works, not just that individual functions work in a vacuum.

## Which to choose?
- Use the **Pyramid** for backend systems, libraries, and complex algorithmic code.
- Use the **Trophy** for frontend applications and microservices where the primary logic is "orchestration" and "data flow" rather than heavy computation.`
  },
  {
    id: "11-4",
    number: "11.4",
    title: "Unit Testing: The ARRANGE-ACT-ASSERT Pattern",
    content: `To write clean, maintainable tests, we use the **AAA Pattern (Arrange, Act, Assert)**. This provides a consistent structure that makes tests readable.

## The Three A's
1. **Arrange**: Set up the state for the test. Create objects, mock dependencies, and prepare the input data.
2. **Act**: Call the specific function or method being tested. This should usually be a single line.
3. **Assert**: Verify that the outcome matches expectations.

\`\`\`javascript
test('calculateDiscount should apply 10% for premium users', () => {
  // 1. ARRANGE
  const user = { type: 'premium', id: 1 };
  const cartTotal = 100;

  // 2. ACT
  const result = calculateDiscount(user, cartTotal);

  // 3. ASSERT
  expect(result).toBe(10);
});
\`\`\`

## Common Mistakes
- **Multiple Acts**: If you are acting more than once, you are likely testing multiple things. Break it into two tests.
- **Logic in Assertions**: Your assertion should be simple. If you need a \`for\` loop in your \`expect\` block, your test is too complex.
- **Fragile Setup**: If you "Arrange" too much global state, your test will break when unrelated parts of the system change.

By following AAA, someone reading your test can immediately see the **scenario** (Arrange), the **action** (Act), and the **expectation** (Assert).`
  },
  {
    id: "11-5",
    number: "11.5",
    title: "Test Doubles: Mocks, Stubs, Fakes, Spies, Dummies",
    content: `In unit testing, we often need to replace a "real" dependency with a "double" to ensure isolation and speed. Gerard Meszaros defined five types of **Test Doubles**.

## 1. Dummy
Objects that are passed around but never actually used. Usually just to fill parameter lists.

## 2. Stub
Provides "canned" answers to calls made during the test. It doesn't track how many times it was called.
- \`stub.onCall('getUser').returns({ id: 1 })\`

## 3. Spy
A stub that also records information about how it was called (e.g., arguments passed, number of calls).
- \`expect(emailSpy).toHaveBeenCalledWith('admin@example.com')\`

## 4. Mock
A pre-programmed object with expectations of how it should be used. It will fail the test itself if it doesn't receive the expected calls.

## 5. Fake
A working implementation, but usually with a shortcut that makes it unsuitable for production (e.g., an In-Memory Database).

| Double | Primary Use |
|--------|-------------|
| Stub | Providing Input |
| Spy | Verifying Output/Behavior |
| Fake | Replacing Infrastructure |

Using the right double is critical. Over-using **Mocks** leads to "Brittle Tests" that break every time you refactor internal code, while **Fakes** are often the best for integration testing.`
  },
  {
    id: "11-6",
    number: "11.6",
    title: "What to Mock and What Not to Mock",
    content: `The most common debate in testing is the "Mocking vs. No-Mocking" strategy. 

## The "London School" (Mockist)
Mockists believe in mocking almost every dependency of the unit under test. This ensures perfect isolation. If Test A fails, you know for a fact the bug is in Unit A.

## The "Detroit School" (Classicist)
Classicists prefer to use the "real" versions of other classes where possible, only mocking things that are slow or out of their control (like APIs or Databases).

## The Gold Standard: Mock the Boundaries
A good heuristic is to **Mock what you don't own**.
- **Mock**: Third-party APIs (Stripe, Twilio), Hardware (Printers, Sensors), and Non-deterministic things (Current Time, Random Numbers).
- **Don't Mock**: Internal logic, data objects (DTOs), and utility functions.

## The Dangers of "Mocking the Internals"
If you mock internal helper functions of a class, your tests become a mirror of the implementation. When you refactor the class to rename a private method, the test fails even if the logic is still correct. This makes tests a **burden** rather than a **benefit**.

**Rule of Thumb**: Test the **behavior**, not the **implementation**. If you can't test a behavior without mocking five internal calls, your unit is likely too large and needs to be decomposed.`
  },
  {
    id: "11-7",
    number: "11.7",
    title: "Test-Driven Development: Red-Green-Refactor",
    content: `**Test-Driven Development (TDD)** is a workflow where you write the test *before* the implementation code. It follows a strict three-step cycle:

## 1. Red (Fail)
Write a small test for a piece of functionality that doesn't exist yet. Run the test and watch it fail. This confirms that the test is actually checking something and that the system isn't "falsely passing."

## 2. Green (Pass)
Write the **minimum amount of code** necessary to make the test pass. Don't worry about elegance or performance at this stage. Just make it green.

## 3. Refactor (Clean)
Now that you have a passing test (your safety net), clean up the code. Apply the principles from Chapter 9: improve naming, remove duplication, and ensure single responsibility. Run the test again to ensure it stays green.

## The Psychology of TDD
TDD shifts your focus from "how to build it" to "how it should be used." This leads to better APIs and simpler designs. It also provides a constant stream of "small wins" (seeing the test turn green), which keeps developer motivation high.

TDD is not about testing; it is a **design process**. By writing the test first, you are forced to define the interface and the requirements clearly before you get bogged down in implementation details.`
  },
  {
    id: "11-8",
    number: "11.8",
    title: "TDD Benefits: Design, Documentation, and Confidence",
    content: `Many developers see TDD as "slower" because you write more code upfront. However, over the lifecycle of a project, TDD is almost always faster.

## 1. Better Design
Because you write the calling code first, you naturally design for **low coupling** and **high cohesion**. You can't write a test for a "spaghetti" function, so TDD forces you to avoid writing spaghetti in the first place.

## 2. Zero-Drift Documentation
The tests serve as a specification that never lies. New developers can read the tests to understand exactly what the system is supposed to do.

## 3. The "Friday Night" Confidence
With a comprehensive TDD-backed test suite, you can deploy a major refactor on a Friday afternoon and go home without worry. You have a mathematical proof (within the limits of your tests) that the system still works.

## 4. Reduced Debugging
In TDD, when a test fails, you know the bug is in the last 5 lines of code you wrote. You rarely need to use a debugger because the "search space" for bugs is tiny.

| Metric | Without TDD | With TDD |
|--------|-------------|----------|
| Development Speed (Initial) | High | Medium |
| Development Speed (Maintenance) | Low (Technical Debt) | High |
| Bug Density | Higher | Lower |
| Design Quality | Variable | High |`
  },
  {
    id: "11-9",
    number: "11.9",
    title: "Behavior-Driven Development: Given-When-Then",
    content: `**Behavior-Driven Development (BDD)** extends TDD by using a natural language format that can be understood by non-technical stakeholders (Product Managers, QAs).

## The Gherkin Syntax
BDD tests are often written in a format called "Gherkin" using the **Given-When-Then** structure:
- **Given**: The context/preconditions (\`Given a user with a balance of $100\`).
- **When**: The action being tested (\`When they withdraw $20\`).
- **Then**: The expected outcome (\`Then their balance should be $80\`).

## The Collaboration Cycle
BDD is about "The Three Amigos": Developer, Tester, and Product Owner. They meet before coding begins to define the "Acceptance Criteria" in this format. This ensures that the developer doesn't build a "perfectly tested" feature that the business didn't actually want.

## Technical Implementation
Tools like **Cucumber** (Java/JS), **Behave** (Python), or **SpecFlow** (.NET) map these natural language sentences to actual test code using "Step Definitions."

\`\`\`gherkin
Feature: User Login
  Scenario: Successful login with valid credentials
    Given the login page is open
    When the user enters "admin" and "password123"
    And clicks the login button
    Then they should be redirected to the dashboard
\`\`\`

BDD bridges the gap between **business requirements** and **automated tests**, ensuring that everyone is building the same thing.`
  },
  {
    id: "11-10",
    number: "11.10",
    title: "Integration Testing: Real Databases, Real Services",
    content: `While unit tests focus on logic, **Integration Tests** focus on the "joints" of the system. This is where most real-world bugs live: a SQL query with a syntax error, a mismatched API schema, or a race condition in the file system.

## The Strategy
Integration tests should use as much of the "real" infrastructure as possible. 
- Use a real (but local) database instead of a mock.
- Use a real (but local) cache like Redis.
- Use a real filesystem.

## Managing State
The hardest part of integration testing is **idempotency**. Every test must leave the environment exactly as it found it.
1. **Clean Slate**: Wipe the database before each test.
2. **Transactions**: Run the test inside a DB transaction and roll it back at the end.
3. **Unique IDs**: Use random or UUIDs for test data to avoid "Primary Key" collisions between parallel tests.

## Why not use Mocks?
If you mock the database (\`mockDb.saveUser(user).returns(true)\`), you aren't testing that your SQL is correct. You are only testing that your code *calls* the save function. If your SQL uses a column that doesn't exist, the unit test passes, but the app crashes in production. Integration tests catch these "interaction failures."`
  },
  {
    id: "11-11",
    number: "11.11",
    title: "Testcontainers: Real Infrastructure in Every Test",
    content: `For a long time, integration testing was difficult because you had to manually set up databases on your machine or share a "dev database" with other developers (which led to flaky tests). **Testcontainers** revolutionized this.

## What is Testcontainers?
Testcontainers is a library (available for Java, Go, Python, Node.js) that uses **Docker** to spin up real instances of databases, message brokers, or any other service during the test execution.

## The Workflow
1. The test starts.
2. Testcontainers pulls the official \`postgres:latest\` image.
3. It starts a container on a random port.
4. Your application connects to this "ephemeral" database.
5. The test runs.
6. The container is destroyed.

\`\`\`javascript
// Node.js example
const postgres = await new PostgreSqlContainer().start();
const client = new Client({ connectionString: postgres.getConnectionString() });
await client.connect();
// ... run tests ...
await postgres.stop();
\`\`\`

## Benefits
- **Isolation**: Each test (or test suite) gets its own fresh database.
- **Parity**: You are testing against the exact same version of the database used in production.
- **Portability**: Any developer can run the tests by just having Docker installed—no manual DB setup required.`
  },
  {
    id: "11-12",
    number: "11.12",
    title: "Contract Testing: Preventing Integration Failures",
    content: `In a microservices architecture, Service A calls Service B. If Service B changes its API response format, Service A breaks. This is a classic "integration nightmare." **Contract Testing** solves this without needing to run the entire system.

## The Consumer-Driven Contract (CDC)
1. **Consumer (Service A)** defines a "Contract" (e.g., in a JSON file) specifying exactly what fields it needs from Service B.
2. **Pact** (the most popular tool) generates a "mock" for Service A based on this contract.
3. The contract is sent to the **Provider (Service B)**.
4. Service B runs a test to ensure its current implementation satisfies the contract.

## Why it's better than E2E
E2E tests that span 10 services are slow and "flaky." Contract tests are **decoupled**. You can test Service A and Service B independently. If Service B makes a change that breaks the contract, the build for Service B fails *before* the code is even merged.

## Tools
- **Pact**: The industry standard for CDC.
- **Spring Cloud Contract**: Popular in the Java/Spring ecosystem.

Contract testing is the "Unit Testing of Distributed Systems." It ensures that independent teams can move fast without breaking each other's services.`
  },
  {
    id: "11-13",
    number: "11.13",
    title: "End-to-End Testing: Playwright, Selenium, Cypress",
    content: `**End-to-End (E2E) Testing** verifies the whole system from the user's perspective. It launches a browser, navigates to your site, clicks buttons, and checks if the correct text appears.

## The Evolution of Tools
1. **Selenium**: The granddaddy. Powerful but slow and notoriously difficult to set up.
2. **Cypress**: Improved the developer experience significantly with better debugging and automatic waiting.
3. **Playwright**: The modern leader (from Microsoft). It is incredibly fast, supports multiple browsers (Chromium, Firefox, WebKit), and handles modern web features like shadow DOM and iframes perfectly.

## Best Practices for E2E
- **Don't test everything**: Only test "Critical Paths" (Login, Checkout, Onboarding).
- **Use Data-Attributes**: Instead of selecting by CSS classes (which change frequently), use \`data-testid="submit-button"\`.
- **Avoid "Sleep"**: Never use \`sleep(5000)\`. Modern tools have "Auto-Wait" which waits for the element to be ready before interacting.
- **Independent Tests**: Every test should be able to run in any order. Don't make "Test B" depend on "Test A" having created a user.

## The Flakiness Problem
E2E tests are prone to **Flakiness**—tests that pass sometimes and fail others for no apparent reason (usually network latency or timing). Reducing flakiness is the primary job of an E2E engineer. If your E2E suite is flaky, developers will ignore it, and its value drops to zero.`
  },
  {
    id: "11-14",
    number: "11.14",
    title: "Property-Based Testing: Hypothesis and QuickCheck",
    content: `Most tests use "Example-Based Testing": you provide one input and check one output. **Property-Based Testing (PBT)** takes a different approach: you define the **properties** that must always be true, and the computer generates thousands of random inputs to try and break them.

## The Concept
Instead of: \`expect(add(1, 2)).toBe(3)\`
PBT says: \`for any two integers a and b, add(a, b) must equal add(b, a)\` (Commutativity).

## Shrinking
The most powerful feature of PBT is **Shrinking**. If the tool finds a 1,000-character string that breaks your code, it will automatically try smaller and simpler versions of that string until it finds the **minimum failing input**. This makes debugging trivial.

## Popular Libraries
- **QuickCheck**: The original (Haskell).
- **Hypothesis**: The gold standard for Python.
- **fast-check**: For JavaScript/TypeScript.

## When to use it?
PBT is incredible for:
- Parsers and Encoders.
- Financial calculations.
- Data structures.
- Compilers.

It finds the "Edge Cases" you never thought of: empty strings, negative zero, emoji in names, or integers larger than $2^{31}-1$.`
  },
  {
    id: "11-15",
    number: "11.15",
    title: "Mutation Testing: The True Measure of Test Quality",
    content: `You have 100% test coverage. Does that mean your tests are good? **No.** You could have 100% coverage with zero assertions. **Mutation Testing** tests your tests.

## How it works
1. The Mutation tool takes your source code and makes a tiny, intentional change (a **Mutant**).
   - Change \`a > b\` to \`a >= b\`.
   - Change \`+\` to \`-\`.
   - Delete a function call.
2. It runs your test suite against the Mutant.
3. If your tests **fail**, the mutant is **killed** (This is good!).
4. If your tests **pass**, the mutant **survived** (This is bad—it means your tests didn't notice a logic change).

## The Mutation Score
Your "Mutation Score" is the percentage of mutants killed. A high score means your tests are actually sensitive to logic changes.

## Tools
- **Stryker**: (JS, C#, Scala).
- **Pitest**: (Java).
- **Mutmut**: (Python).

Mutation testing is computationally expensive because it runs your tests hundreds of times. However, for critical logic, it is the only way to be sure that your tests are actually providing the protection you think they are.`
  },
  {
    id: "11-16",
    number: "11.16",
    title: "Fuzz Testing: Finding the Inputs You Never Thought Of",
    content: `**Fuzzing** is a security-focused testing technique that feeds a program a massive stream of "semi-valid" or "malformed" data to find crashes, memory leaks, or security vulnerabilities.

## How it differs from Property-Based Testing
While PBT focuses on logical properties, Fuzzing focuses on **breaking the execution**. It's often "Coverage-Guided": the fuzzer monitors which paths in the code are hit and tries to mutate the inputs to reach new, unvisited paths.

## Famous Fuzzers
- **AFL (American Fuzzy Lop)**: The most famous fuzzer, responsible for finding thousands of bugs in Linux, OpenSSL, and browsers.
- **libFuzzer**: Integrated into the LLVM compiler.

## The Google "OSS-Fuzz" Project
Google runs a massive cluster of machines that continuously fuzzes critical open-source projects. To date, it has found over 30,000 bugs in 500+ projects.

## When to use Fuzzing?
If you are writing code that handles **untrusted input** (parsers, network protocols, image decoders), fuzzing is not optional. It is the only way to find the "Buffer Overflows" and "Out of Bounds" errors that hackers exploit.`
  },
  {
    id: "11-17",
    number: "11.17",
    title: "Load Testing: Locust, k6, Gatling",
    content: `A system might work perfectly for one user but collapse under ten thousand. **Load Testing** measures how a system performs under stress.

## Key Metrics
- **Throughput**: How many requests per second (RPS) can the system handle?
- **Latency**: How long does a request take (p95, p99)?
- **Error Rate**: At what point does the system start returning 500 errors?

## Tools
1. **k6**: Modern, developer-centric tool (from Grafana). Tests are written in JavaScript.
2. **Locust**: Python-based, very easy to scale across multiple machines.
3. **Gatling**: Scala-based, known for extremely high performance.

## Types of Performance Tests
- **Load Test**: Normal expected traffic.
- **Stress Test**: Pushing the system until it breaks to find the "tipping point."
- **Soak Test**: Running at high load for a long time to find memory leaks.
- **Spike Test**: Sudden burst of traffic (the "Black Friday" scenario).

Load testing should be done in an environment that is as close to production as possible. Testing on your laptop tells you very little about how the system will behave on an AWS cluster with real network latency.`
  },
  {
    id: "11-18",
    number: "11.18",
    title: "Chaos Engineering: Testing at the System Level",
    content: `Popularized by Netflix with their **Chaos Monkey**, Chaos Engineering is the practice of intentionally introducing failures into a **production** environment to ensure the system is resilient.

## Why in Production?
Testing in staging is never the same as testing in production. Production has real traffic, real data, and real network "weirdness." Chaos Engineering assumes that "failure is inevitable," so we should practice it.

## The Principles of Chaos
1. **Define a "Steady State"**: Use metrics (e.g., "Successful orders per minute").
2. **Hypothesize**: "If we kill the 'Recommendation Service', the 'Checkout Service' should still work."
3. **Introduce a Variable**: Kill a server, inject network latency, or terminate a database instance.
4. **Observe**: Did the steady state stay steady?

## Tools
- **Chaos Mesh**: For Kubernetes.
- **AWS Fault Injection Simulator (FIS)**.
- **Gremlin**: A "Chaos-as-a-Service" platform.

Chaos Engineering moves the focus from "Mean Time Between Failures" (MTBF) to **"Mean Time To Recovery" (MTTR)**. It builds a "Culture of Resilience" where engineers design every service to handle the death of its neighbors.`
  },
  {
    id: "11-19",
    number: "11.19",
    title: "Test Coverage: What It Measures and What It Doesn't",
    content: `**Test Coverage** is a metric that measures the percentage of your source code executed by your tests.

## Types of Coverage
- **Line Coverage**: Did the test execute this line?
- **Branch Coverage**: Did the test execute both the \`true\` and \`false\` paths of an \`if\` statement?
- **Condition Coverage**: In \`if (A || B)\`, did we test cases where A is true and B is false?

## The Coverage Trap
A common management mistake is to mandate "100% Coverage." This leads to:
1. **Assertion-less Tests**: Developers write tests that "run" the code but don't actually check the result, just to hit the number.
2. **Testing Trivial Code**: Spending hours testing basic getters and setters while ignoring complex race conditions.
3. **Diminishing Returns**: The effort to go from 80% to 100% coverage often costs more than the value of the bugs it finds.

## A Better Target
80% coverage is often the "sweet spot." It means your core logic and main paths are tested. Instead of chasing 100%, use **Mutation Testing** (see 11.15) to see if your 80% is actually effective. Coverage is a great tool for finding **untested areas**, but it is a terrible tool for measuring **test quality**.`
  },
  {
    id: "11-20",
    number: "11.20",
    title: "Test Flakiness: The Silent Killer of Trust",
    content: `A **Flaky Test** is a test that fails and passes on the same code without any changes. Flakiness is the single most destructive force in a testing culture.

## The Damage of Flakiness
When a test is flaky, developers stop trusting the test suite. 
- "Oh, that test always fails, just click 'Restart Build'."
- Once developers start ignoring one test, they will soon ignore the whole suite. 
- Eventually, a **real bug** will be ignored because it was disguised as a flaky failure.

## Common Causes
- **Race Conditions**: Two threads competing for the same resource.
- **Shared State**: Test A leaves data in the DB that causes Test B to fail.
- **Non-determinism**: Using the current system time or a random number.
- **Network Dependency**: Calling a real API that occasionally times out.

## How to Fix It
1. **Quarantine**: Remove flaky tests from the main "blocking" build immediately.
2. **Fix or Delete**: A flaky test is worse than no test at all. If it can't be fixed, delete it.
3. **Retry (The Last Resort)**: Some teams use "Auto-Retry" (run it 3 times, if it passes once, it's green). This is a band-aid that hides the underlying instability.`
  },
  {
    id: "11-21",
    number: "11.21",
    title: "Testing Strategies for Legacy Code",
    content: `Michael Feathers defines **Legacy Code** as "code without tests." Testing legacy code is difficult because it wasn't designed to be tested (high coupling, global state).

## The Legacy Loop
1. You can't change the code safely without tests.
2. You can't add tests without changing the code (to make it testable).

## Strategy: The Characterization Test
Instead of testing what the code *should* do, you write a test that records what it *actually does* right now.
- Call the function with various inputs.
- Capture the outputs.
- Create assertions that match those outputs (even if they are wrong!).
- Now you have a "Safety Net." You can refactor the code and ensure you haven't changed the current behavior.

## Strategy: The Seam Model
Find a "Seam"—a place where you can alter behavior without editing in place. 
- **Object Seam**: Change a dependency to a mock.
- **Link Seam**: Use the linker or classpath to substitute a library.

## The Golden Rule of Legacy Code
Don't try to test the whole thing at once. Every time you have to fix a bug in a legacy module, add a test for just that small area. Over time, you will build a "Coral Reef" of tests that eventually covers the most important parts of the system.`
  },
  {
    id: "11-22",
    number: "11.22",
    title: "Case Study: TDD at NASA JPL — Zero Defects in Space",
    content: `The **Mars Curiosity Rover** has over 2 million lines of C code. When you are 140 million miles away, you cannot "just push a hotfix." NASA's Jet Propulsion Laboratory (JPL) uses some of the most rigorous testing standards in the world.

## The JPL Power of Ten Rules
NASA uses strict coding rules to ensure testability and safety:
1. No complex flow constructs (GOTO, recursion).
2. All loops must have a fixed upper bound.
3. No dynamic memory allocation (no \`malloc\`).
4. Functions must be short (fit on one sheet of paper).

## The Testing Process
For the Mars rovers, testing isn't just a phase; it's the majority of the project.
- **Unit Testing**: Every single function is tested for every possible input.
- **Simulation**: NASA maintains a "Digital Twin" of the rover and the Martian environment. They run thousands of hours of tests on this twin before sending a single command to the real rover.
- **Static Analysis**: They use multiple static analysis tools to prove the absence of certain types of bugs (like stack overflows).

## The Result
Curiosity landed in 2012 and is still operational today, years past its original mission end. Its success is a testament to the fact that when the "Cost of Failure" is infinite, the "Value of Testing" is also infinite. While we don't all build Mars rovers, we can adopt their **mindset of excellence**.`
  },
  {
    id: "11-23",
    number: "11.23",
    title: "Exercises",
    content: `Master the science of confidence with these testing exercises.

## Exercises
1. **AAA Pattern**: Take a function from a previous chapter (e.g., the \`processOrder\` function) and write a complete unit test for it using the Arrange-Act-Assert structure.

2. **Pyramid vs Trophy**: You are building a new React-based e-commerce site using a Serverless backend (AWS Lambda). Draw your "Testing Shape." Where will you focus your effort?

3. **Mocks and Spies**: Write a test for a \`NotificationService\` that uses a \`MailGunAPI\`. Use a **Spy** to ensure the \`send()\` method is called with the correct email address.

4. **TDD Cycle**: Using the Red-Green-Refactor cycle, implement a \`StringCalculator\` that takes a string of numbers (e.g., "1,2,3") and returns their sum. 
   - Step 1: Write a test for an empty string returning 0.
   - Step 2: Write a test for a single number.
   - Step 3: Write a test for multiple numbers.

5. **Identifying Flakiness**: Look at this test:
   \`\`\`javascript
   test('should show latest news', async () => {
     await page.goto('/news');
     const news = await page.innerText('.news-item');
     expect(news).toContain('Today');
   });
   \`\`\`
   Identify three reasons why this test might be flaky.

6. **Mutation Thinking**: In the logic \`if (age >= 18) allow() else deny()\`, what mutants would a mutation testing tool create? Which one is the most dangerous?

7. **Property-Based Testing**: Define three "Properties" for a \`ListSort()\` function that must be true for any input list.

8. **Legacy Challenge**: You have a 2,000-line "God Class" with no tests. You need to fix a bug in the \`calculateTax()\` method. What is your first step?

## Answers
2. For a React/Serverless app, a **Testing Trophy** is best. Focus on **Integration Tests** that verify the flow from the UI through the Lambda functions to the database.

5. 
   - **Timing**: The page might not have finished loading \`.news-item\`.
   - **Dynamic Data**: The "Today" news might change between when the test is written and when it's run.
   - **Network**: The API call to fetch news might fail.

6. Mutants: \`age > 18\`, \`age < 18\`, \`age == 18\`. The \`age > 18\` is the most dangerous (Off-by-one error) because it might pass most tests but fail for users exactly 18 years old.

7. Properties of Sort:
   - The output list must have the same length as the input.
   - Every element in the output must exist in the input.
   - For every element $i$, $output[i] \leq output[i+1]$.

8. First step: Write a **Characterization Test**. Call \`calculateTax()\` with current data and assert that it returns what it currently returns. This locks in the current behavior so you can safely refactor.`
  }
];
