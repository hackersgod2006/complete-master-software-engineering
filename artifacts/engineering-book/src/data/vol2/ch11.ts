import type { Section } from '../types';

export const CH11_SECTIONS: Section[] = [
  {
    id: "11-1",
    number: "11.1",
    title: "The Testing Manifesto: Why Tests Are Not Optional",
    content: `Testing is not about finding bugs. Testing is about enabling change. The purpose of a comprehensive test suite is not to prove your code currently works — it is to give you the confidence to change your code without fear. Without tests, every change is a potential regression. With tests, every change is a guided transformation with immediate feedback.
The engineers who write tests are not being slow or cautious. They are being fast. They are investing time now to avoid the compounding cost of manual verification, production bugs, customer escalations, and emergency rollbacks later. The test suite is what separates a codebase that can evolve quickly from one that calcifies under the weight of its own fragility.


---`
  },
  {
    id: "11-2",
    number: "11.2",
    title: "The Testing Pyramid: Unit, Integration, End-to-End",
    content: `Level
What It Tests
Speed
Quantity
Coverage Goal
Unit Tests
One function in isolation, all dependencies mocked
< 1ms each
Hundreds to thousands
Every function, branch, edge case
Integration Tests
Multiple components: code + real database, real cache
10ms - 1s each
Dozens to hundreds
All component boundaries and data contracts
End-to-End Tests
Complete user flows through the running system
Seconds to minutes
Handful to dozens
Critical user journeys only

⚠️ THE INVERTED PYRAMID ANTI-PATTERN
Many teams build an inverted pyramid: few unit tests, many E2E tests.
This is the worst possible outcome:
E2E tests are slow (minutes per suite run)
E2E tests are flaky (network, timing, environment issues)
E2E failures are hard to diagnose (too much happening at once)
Developers stop running tests because they take too long

The correct shape: 70% unit, 20% integration, 10% E2E.
If your test suite takes more than 2 minutes: you have inverted it.
Fast tests get run. Slow tests get skipped.`
  },
  {
    id: "11-3",
    number: "11.3",
    title: "The Testing Trophy: An Updated Model",
    content: `\`\`\`python
import pytest
from unittest.mock import Mock

# ARRANGE-ACT-ASSERT: every test has exactly three sections
# ARRANGE: set up inputs, mocks, initial state
# ACT: execute exactly one thing (the function under test)
# ASSERT: verify expected outcomes

class PaymentService:
def __init__(self, stripe_client, db, email_service):
\`\`\`

self.stripe = stripe_client
self.db = db
self.email = email_service


\`\`\`python
def charge_customer(self, customer_id: int, amount_cents: int) -> dict:
if amount_cents <= 0:
raise ValueError(f'Amount must be positive, got {amount_cents}')
customer = self.db.get_customer(customer_id)
if not customer: raise CustomerNotFoundError(customer_id)
charge = self.stripe.charge(customer.card_token, amount_cents)
\`\`\`

self.db.record_transaction(customer_id, amount_cents, charge.id)
self.email.send_receipt(customer.email, amount_cents, charge.id)

\`\`\`python
return {'status': 'success', 'charge_id': charge.id}

class TestPaymentService:
def setup_method(self):
\`\`\`

self.stripe = Mock()
self.db = Mock()
self.email = Mock()
self.service = PaymentService(self.stripe, self.db, self.email)


\`\`\`python
def test_successful_charge(self):
# ARRANGE
customer = Mock(card_token='tok_123', email='user@example.com')
\`\`\`

self.db.get_customer.return_value = customer

\`\`\`python
charge = Mock(id='ch_abc456')
\`\`\`

self.stripe.charge.return_value = charge

\`\`\`python
# ACT
result = self.service.charge_customer(customer_id=42, amount_cents=9999)
# ASSERT
assert result == {'status': 'success', 'charge_id': 'ch_abc456'}
\`\`\`

self.stripe.charge.assert_called_once_with('tok_123', 9999)
self.db.record_transaction.assert_called_once_with(42, 9999, 'ch_abc456')
self.email.send_receipt.assert_called_once_with('user@example.com', 9999, 'ch_abc456')


\`\`\`python
def test_rejects_zero_amount(self):
with pytest.raises(ValueError, match='Amount must be positive'):
\`\`\`

self.service.charge_customer(customer_id=42, amount_cents=0)
self.stripe.charge.assert_not_called()
self.db.record_transaction.assert_not_called()


\`\`\`python
def test_raises_when_customer_not_found(self):
\`\`\`

self.db.get_customer.return_value = None

\`\`\`python
with pytest.raises(CustomerNotFoundError):
\`\`\`

self.service.charge_customer(customer_id=99, amount_cents=100)
self.stripe.charge.assert_not_called()


\`\`\`python
# PARAMETRIZE: test many inputs with one test function
@pytest.mark.parametrize('email,is_valid', [
\`\`\`

('user@example.com', True),
('user+tag@example.co.uk', True),
('', False),
('notanemail', False),
('@example.com', False),
('user@', False),
(None, False),
])

\`\`\`python
def test_email_validation(email, is_valid):
assert validate_email(email) == is_valid
# Generates 7 separate tests from one function

# FIXTURES: reusable test setup
@pytest.fixture
def sample_order():
return Order(id=1001, customer_id=42,
items=[OrderItem(sku='WIDGET-A', quantity=2, price_cents=999)],
status='pending')

def test_order_total(sample_order):
assert sample_order.total_cents == 1998 # 2 x 999
\`\`\``
  },
  {
    id: "11-4",
    number: "11.4",
    title: "Unit Testing: The ARRANGE-ACT-ASSERT Pattern",
    content: `\`\`\`python
# TESTCONTAINERS: spin up real databases and services in Docker for tests
# pip install testcontainers

import pytest
from testcontainers.postgres import PostgresContainer
from testcontainers.redis import RedisContainer

@pytest.fixture(scope='session')
def postgres():
with PostgresContainer('postgres:15-alpine') as pg:
yield pg

@pytest.fixture(scope='session')
def redis_cache():
with RedisContainer('redis:7-alpine') as redis:
yield redis

@pytest.fixture
def db_connection(postgres):
conn = psycopg2.connect(postgres.get_connection_url())
cursor = conn.cursor()
\`\`\`

cursor.execute(open('schema.sql').read())
conn.commit()

\`\`\`python
yield conn
\`\`\`

conn.rollback() # test isolation: rollback after each test
conn.close()


\`\`\`python
class TestUserRepositoryIntegration:
def test_create_and_fetch(self, db_connection):
repo = UserRepository(db_connection)
request = CreateUserRequest(
first_name='Alice', last_name='Smith',
email='alice@example.com', password='securepassword123'
\`\`\`

)

\`\`\`python
created = repo.create(request)
fetched = repo.find_by_id(created.id)
assert fetched.email == 'alice@example.com'
assert fetched.first_name == 'Alice'

def test_find_unknown_returns_none(self, db_connection):
repo = UserRepository(db_connection)
assert repo.find_by_email('nobody@example.com') is None

def test_duplicate_email_raises(self, db_connection):
repo = UserRepository(db_connection)
\`\`\`

repo.create(CreateUserRequest(

\`\`\`python
first_name='Bob', last_name='Jones',
email='bob@example.com', password='password123'
\`\`\`

))

\`\`\`python
with pytest.raises(DuplicateEmailError):
\`\`\`

repo.create(CreateUserRequest(

\`\`\`python
first_name='Robert', last_name='Jones',
email='bob@example.com', # same email
password='different123'
\`\`\`

))`
  },
  {
    id: "11-5",
    number: "11.5",
    title: "Test Doubles: Mocks, Stubs, Fakes, Spies, Dummies",
    content: `Test-Driven Development is a discipline where you write the test before you write the code. The cycle: Red (write a failing test), Green (write minimum code to pass), Refactor (clean up while tests stay green). Repeat. TDD forces you to design the API from the caller perspective before implementing it. The result is naturally testable code.

\`\`\`python
# TDD DEMONSTRATION: password strength validator

# STEP 1 (RED): write the test first — it will fail
def test_password_too_short_is_weak():
result = check_password_strength('abc')
assert result.score == 0
assert 'at least 8 characters' in result.feedback

# STEP 2 (GREEN): write MINIMUM code to pass this one test
def check_password_strength(password: str):
if len(password) < 8:
return PasswordStrength(score=0, feedback=['Use at least 8 characters'])
return PasswordStrength(score=1, feedback=[])

# STEP 3 (REFACTOR): clean up. Then write next test.

# STEP 4 (RED): next requirement
def test_lowercase_only_password_is_weak():
result = check_password_strength('abcdefghij')
assert result.score == 1
assert any('uppercase' in f.lower() for f in result.feedback)

# STEP 5 (GREEN): extend implementation minimally
def check_password_strength(password: str):
score = 0; feedback = []
if len(password) < 8:
return PasswordStrength(score=0, feedback=['Use at least 8 characters'])
\`\`\`

score += 1

\`\`\`python
if not any(c.isupper() for c in password):
\`\`\`

feedback.append('Add at least one uppercase letter')

\`\`\`python
else:
\`\`\`

score += 1

\`\`\`python
return PasswordStrength(score=score, feedback=feedback)

# Continue: add tests for digits, special chars, long passwords
# Each test drives a small focused addition to implementation

# WHY TDD WORKS:
# Forces API design from the caller perspective before implementation
# Produces naturally testable code (designed for testing)
# 100% coverage of intentional behavior by construction
# Prevents over-engineering (only write code that makes tests pass)
# Test cases document intended behavior
\`\`\``
  },
  {
    id: "11-6",
    number: "11.6",
    title: "What to Mock and What Not to Mock",
    content: `\`\`\`python
# pip install hypothesis
from hypothesis import given, strategies as st

# PROPERTY-BASED TESTING: specify PROPERTIES that must hold for ALL inputs.
# Hypothesis generates hundreds of random test cases automatically.

@given(st.lists(st.integers()))
def test_sort_produces_sorted_output(lst):
result = my_sort(lst)
assert result == sorted(lst)

@given(st.lists(st.integers()))
def test_sort_preserves_all_elements(lst):
result = my_sort(lst)
assert len(result) == len(lst)
assert sorted(result) == sorted(lst)

@given(st.lists(st.integers()))
def test_sort_is_idempotent(lst):
once = my_sort(lst)
twice = my_sort(once)
assert once == twice

# HYPOTHESIS FINDS EDGE CASES YOU WOULD NEVER WRITE MANUALLY:
# Empty strings, very long strings (> 1MB)
# Unicode edge cases (zero-width spaces, right-to-left marks)
# Integer boundaries (0, -1, sys.maxsize)
# Lists with one element, empty, all duplicates
# NaN and infinity in float inputs

# When Hypothesis finds a failing case, it SHRINKS it automatically:
# If [1000, -999, 0, 42, 7] fails, it tries to find simplest failing case.
# Result: maybe just [-1] or [0, 0] — minimal reproducer automatically.

# STATEFUL TESTING: test sequences of operations
from hypothesis.stateful import RuleBasedStateMachine, rule, invariant

class BankAccountMachine(RuleBasedStateMachine):
def __init__(self):
super().__init__()
\`\`\`

self.account = BankAccount(initial_balance=0)
self.model_balance = 0


\`\`\`python
@rule(amount=st.integers(min_value=1, max_value=10000))
def deposit(self, amount):
\`\`\`

self.account.deposit(amount)
self.model_balance += amount


\`\`\`python
@rule(amount=st.integers(min_value=1, max_value=10000))
def withdraw_if_possible(self, amount):
if amount <= self.model_balance:
\`\`\`

self.account.withdraw(amount)
self.model_balance -= amount


\`\`\`python
@invariant()
def balance_matches_model(self):
assert self.account.balance == self.model_balance

@invariant()
def balance_never_negative(self):
assert self.account.balance >= 0

TestBankAccount = BankAccountMachine.TestCase
\`\`\``
  },
  {
    id: "11-7",
    number: "11.7",
    title: "Test-Driven Development: Red-Green-Refactor",
    content: `\`\`\`python
# MEASURING COVERAGE: pytest-cov
# $ pytest --cov=mypackage --cov-report=html --cov-report=term-missing

# COVERAGE TYPES:
# Line coverage: which lines executed (common, weak)
# Branch coverage: which if/else branches taken (stronger)
# Path coverage: all execution paths (expensive, impractical at scale)

# WHAT 100% COVERAGE DOES NOT MEAN:
def divide(a, b): return a / b # 100% line coverage with one test
def test_divide(): assert divide(10, 2) == 5.0
# Missed: division by zero, negative numbers, very large numbers
# 100% coverage is necessary but NOT sufficient for correctness

# RECOMMENDED COVERAGE TARGETS:
# Critical business logic: 95-100% branch coverage
# General application code: 80% line coverage minimum
# Infrastructure/glue code: 60-70% acceptable
# Generated code: exclude from measurement

# MUTATION TESTING: stronger than coverage
# pip install mutmut
# mutmut systematically changes your code:
# Flips > to >=, changes True to False, removes return statements
# Checks if your tests catch each change (kill the mutant)

# If mutmut changes > to >= and tests still pass:
# Your tests are missing a boundary condition test.
# Mutation score > 80% indicates genuinely effective tests.

# WHAT TO TEST vs NOT TEST:
# TEST: business logic, all error paths, boundary conditions,
# complex algorithms, data transformations
# SKIP: trivial getters/setters, framework internals,
# private implementation details, logging statements,
# third-party library behavior
\`\`\``
  },
  {
    id: "11-8",
    number: "11.8",
    title: "TDD Benefits: Design, Documentation, and Confidence",
    content: `TEST SUITE: Build a complete test suite for a stack (push, pop, peek, is_empty, size). Cover: normal operations, empty stack, single element, large count, pop from empty. Achieve 100% branch coverage. Add Hypothesis property tests verifying LIFO invariant.
TDD EXERCISE: Use TDD to build a Roman numeral converter (integer to Roman, Roman to integer). Write tests first for single digits, subtractive notation (IV=4, IX=9), combinations (MCMXCIX=1999). Each test must fail before implementation.
INTEGRATION TESTS: Using Testcontainers, write integration tests for user authentication: register, login (success and failure), token validation, password reset. Use real PostgreSQL and Redis. Each test must be fully isolated.
PROPERTY-BASED TESTING: Use Hypothesis to test a JSON serializer/deserializer (roundtrip), a URL builder (roundtrip parse), and a sorting algorithm. Find at least one bug in each using Hypothesis.
MUTATION TESTING: Install mutmut. Run on a function with 90%+ line coverage. Report: total mutants, killed, surviving. For each surviving mutant, write a new test that kills it.
Chapter 11 — Ten Testing Truths
Tests enable change, not just catch bugs. A test suite is what lets you refactor, optimize, and extend confidently at any speed.
The testing pyramid: 70% unit, 20% integration, 10% E2E. Inverting it produces slow, flaky suites that developers stop running.
Every unit test follows Arrange-Act-Assert. One setup, one action, one or more assertions. Tests with multiple actions test multiple things.
Parametrize tests to cover many inputs without duplicating logic. pytest.mark.parametrize runs the same test with different data efficiently.
Integration tests need real dependencies. Use Testcontainers to run actual PostgreSQL and Redis in Docker for integration tests.
TDD produces naturally testable code because you design the API from the caller perspective before implementing it. Red-Green-Refactor.
Property-based testing with Hypothesis finds edge cases you would never write manually and shrinks failures to minimal reproducers automatically.
100% line coverage does not mean no bugs. Coverage finds untested code. Mutation testing finds ineffective tests. Use both.
Do not test private implementation details — they must be free to change. Test public API contracts and observable behavior only.
Fast test suites get run. Slow suites get skipped. Keep unit suite under 30 seconds. Keep full suite under 5 minutes.`
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
