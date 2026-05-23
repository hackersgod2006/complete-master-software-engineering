import type { Section } from '../types';

export const CH13_SECTIONS: Section[] = [
  {
    id: "13-1",
    number: "13.1",
    title: "Defining Legacy Code: Any Code Without Tests",
    content: `Legacy code is not old code. It is not badly written code. It is code without tests. This definition is precise and actionable: code without tests is code you cannot safely change, because you have no automated way to know whether your change broke something. Old code with tests is not legacy. New code without tests is legacy from the moment it is written.
Most of the code in the world is legacy code. Most of the code you will encounter in your career is legacy code. The engineers who can work effectively with legacy code — who can add features without breaking things, who can improve the design without a complete rewrite, who can gradually build a test suite around untested systems — are among the most valuable engineers in any organization. This chapter teaches that skill completely.


---`
  },
  {
    id: "13-2",
    number: "13.2",
    title: "The Legacy Code Change Algorithm",
    content: `Reading unfamiliar code is a skill with a method. Engineers who approach it randomly spend hours without building a coherent mental model. Engineers with a systematic approach build accurate models in minutes.

\`\`\`python
# SYSTEMATIC CODE READING: the method

# STEP 1: Start at the entry point
# For a web app: find the URL routing (urls.py, routes.js, main.go)
# For a CLI tool: find main() or __main__
# For a library: find the public API (what users import)
# For a service: find where it receives requests

# STEP 2: Read tests first
# Tests are executable documentation
# They show: what the code is SUPPOSED to do, not what it does
# Read test names: they describe the behavior
# Read test bodies: they show how to use the code
# Missing tests: the system is legacy (proceed to characterization tests)

# STEP 3: Sketch the data flow
# On paper: draw the main data transformations
# Input -> Transform A -> Transform B -> Output
# What is the main data structure? Where is it created? Where consumed?

# STEP 4: Find the seams
# A seam is a place where you can change behavior without editing code
# Seams: function parameters, interface implementations, configuration files
# Seams are where tests can be inserted (more on this below)

# STEP 5: Use git log for historical context
# git log --oneline --follow path/to/file (history of one file)
# git blame path/to/file (who wrote each line, when, in which commit)
# git show COMMIT_HASH (what changed in a specific commit)
# The commit messages explain WHY — more valuable than the code itself

# STEP 6: Run the code with instrumentation
# Add print statements or a debugger to trace actual execution
# Log the inputs and outputs of key functions
# Confirm your mental model against reality

# TOOLS FOR UNDERSTANDING LARGE CODEBASES:
# grep -r 'function_name' . -- find all usages
# grep -rn 'class ClassName' . -- find class definition and all references
# find . -name '*.py' | xargs grep 'import_name' -- find what imports what
# python -m py_compile file.py -- check syntax without running
# pyflakes file.py -- find undefined names
\`\`\``
  },
  {
    id: "13-3",
    number: "13.3",
    title: "Finding Seams: Where to Break Dependencies",
    content: `Before changing legacy code, write characterization tests. A characterization test does not verify what the code SHOULD do — it verifies what the code CURRENTLY does. The purpose: create a safety net that detects any behavioral change, whether intentional or accidental, when you modify the code.

\`\`\`python
# WRITING CHARACTERIZATION TESTS

# You have found this function in a legacy codebase:
def compute_price(quantity, unit_price, customer_type, day_of_week):
price = quantity * unit_price
if customer_type == 'premium':
price = price * 0.85
if customer_type == 'wholesale' and quantity > 100:
price = price * 0.70
if day_of_week in [5, 6]: # weekend
price = price * 1.10
if customer_type == 'premium' and day_of_week in [5, 6]:
price = price * 0.95 # further discount for premium on weekends?
return round(price, 2)

# You do not know if this is correct. But you must change it.
# Write characterization tests: capture what it DOES, not what it SHOULD.

import pytest

class TestComputePriceCharacterization:
# Each test: run the function, observe output, write assertion
# Label as characterization so future engineers know these
# test OBSERVED behavior, not SPECIFIED behavior

def test_standard_customer_weekday(self):
# CHARACTERIZATION: observed 100.0 for these inputs
assert compute_price(10, 10.0, 'standard', 1) == 100.0

def test_premium_customer_weekday(self):
# CHARACTERIZATION: 15% discount applied = 85.0
assert compute_price(10, 10.0, 'premium', 1) == 85.0

def test_standard_customer_weekend(self):
# CHARACTERIZATION: 10% surcharge on weekends
assert compute_price(10, 10.0, 'standard', 6) == 110.0

def test_premium_customer_weekend(self):
# CHARACTERIZATION: 15% discount then 10% surcharge then 5% discount
# observed value: 88.65 (chain of multiplications)
result = compute_price(10, 10.0, 'premium', 6)
assert result == 88.65

def test_wholesale_over_threshold(self):
assert compute_price(101, 10.0, 'wholesale', 1) == 707.0

def test_wholesale_under_threshold(self):
assert compute_price(100, 10.0, 'wholesale', 1) == 1000.0

# NOW you can safely change compute_price.
# Any unintended behavioral change immediately fails a test.
# You can also add SPECIFICATION tests that verify what SHOULD happen.

# IMPORTANT: characterization tests may capture BUGS.
# If you discover the weekend surcharge is wrong:
# 1. Fix the bug
# 2. Update the characterization test to match the correct behavior
# 3. Document in the commit message that this was a bug fix
\`\`\``
  },
  {
    id: "13-4",
    number: "13.4",
    title: "Seam Types: Object, Link, Preprocessing",
    content: `Legacy code is hard to test because it has hidden dependencies — it creates its own collaborators (databases, HTTP clients, file systems) instead of receiving them. The seam technique finds places to break these dependencies without changing production behavior, making testing possible.

\`\`\`python
# BEFORE: untestable — creates its own dependencies
import smtplib, sqlite3, datetime

def send_overdue_reminders():
# Creates its own database connection
conn = sqlite3.connect('/var/lib/app/production.db')
cursor = conn.cursor()

# Creates its own SMTP client
smtp = smtplib.SMTP('smtp.gmail.com', 587)
\`\`\`

smtp.starttls()
smtp.login('app@company.com', 'hardcoded_password_terrible')


\`\`\`python
# Uses system time directly
today = datetime.date.today()
overdue = cursor.execute(
\`\`\`

'SELECT * FROM invoices WHERE due_date < ? AND paid = 0',
(today,)
).fetchall()


\`\`\`python
for invoice in overdue:
\`\`\`

smtp.sendmail('app@company.com', invoice['email'],
f'Invoice {invoice["id"]} is overdue')
smtp.quit()
conn.close()


\`\`\`python
# PROBLEMS: cannot test without hitting production database,
# cannot test without sending real emails, cannot control 'today'

# TECHNIQUE 1: EXTRACT AND OVERRIDE
# Extract dependencies into overridable methods
class OverdueReminderService:
def get_overdue_invoices(self, as_of_date): # seam: overridable
conn = sqlite3.connect('/var/lib/app/production.db')
return conn.execute(
\`\`\`

'SELECT * FROM invoices WHERE due_date < ? AND paid = 0',
(as_of_date,)
).fetchall()


\`\`\`python
def send_reminder(self, invoice): # seam: overridable
smtp = smtplib.SMTP('smtp.gmail.com', 587)
\`\`\`

smtp.sendmail('app@company.com', invoice['email'], f'Invoice overdue')
smtp.quit()


\`\`\`python
def get_today(self): # seam: overridable for testing
return datetime.date.today()

def run(self):
today = self.get_today()
for invoice in self.get_overdue_invoices(today):
\`\`\`

self.send_reminder(invoice)


\`\`\`python
# TEST: subclass and override the seams
class TestableReminderService(OverdueReminderService):
def __init__(self, fake_invoices, fake_date):
\`\`\`

self.fake_invoices = fake_invoices
self.fake_date = fake_date
self.reminders_sent = []


\`\`\`python
def get_overdue_invoices(self, as_of_date):
return self.fake_invoices # no database

def send_reminder(self, invoice):
\`\`\`

self.reminders_sent.append(invoice) # no email


\`\`\`python
def get_today(self):
return self.fake_date # controlled date

def test_sends_reminder_for_overdue_invoice():
fake_invoice = {'id': 1, 'email': 'client@example.com', 'due_date': '2024-01-01'}
service = TestableReminderService(
fake_invoices=[fake_invoice],
fake_date=datetime.date(2024, 1, 15)
\`\`\`

)
service.run()

\`\`\`python
assert len(service.reminders_sent) == 1
assert service.reminders_sent[0]['id'] == 1

# TECHNIQUE 2: DEPENDENCY INJECTION (preferred for new code)
class OverdueReminderServiceV2:
def __init__(self, invoice_repo, email_client, clock):
\`\`\`

self.invoices = invoice_repo # injected
self.email = email_client # injected
self.clock = clock # injected


\`\`\`python
def run(self):
today = self.clock.today()
for invoice in self.invoices.get_overdue(as_of=today):
\`\`\`

self.email.send_reminder(invoice)`
  },
  {
    id: "13-5",
    number: "13.5",
    title: "Characterization Tests: Documenting What Code Does",
    content: `The Strangler Fig pattern (named after the strangler fig tree that grows around a host tree and eventually replaces it) is the most reliable strategy for replacing a legacy system without a risky big-bang rewrite. You build the new system alongside the old one, gradually rerouting functionality until the old system is no longer used and can be removed.

\`\`\`python
# THE STRANGLER FIG PATTERN: replace legacy incrementally

# PHASE 1: Intercept — add a routing layer between callers and legacy
class PaymentRouter:
\`\`\`

'''Routes payment calls to legacy or new system based on configuration.'''

\`\`\`python
def __init__(self, legacy_service, new_service, feature_flags):
\`\`\`

self.legacy = legacy_service
self.new = new_service
self.flags = feature_flags


\`\`\`python
def charge(self, customer_id: int, amount_cents: int) -> dict:
if self.flags.is_enabled('new_payment_service', user_id=customer_id):
return self.new.charge(customer_id, amount_cents)
else:
return self.legacy.charge(customer_id, amount_cents)

# PHASE 2: Build the new service alongside legacy (both active)
# Deploy with feature flag OFF — all traffic goes to legacy
# Gradually increase rollout: 1%, 5%, 20%, 50%, 100%
# Monitor metrics at each step: error rate, latency, business metrics
# Roll back instantly if metrics degrade (change feature flag)

# PHASE 3: When new service handles 100% of traffic and is stable
# Remove legacy code
# Remove the routing layer
# Clean up feature flags

# PARALLEL RUN: run both systems and compare results
class ParallelPaymentService:
\`\`\`

'''Runs both systems, returns new result, logs differences.'''

\`\`\`python
def __init__(self, legacy, new, metrics):
\`\`\`

self.legacy = legacy
self.new = new
self.metrics = metrics


\`\`\`python
def charge(self, customer_id: int, amount_cents: int) -> dict:
legacy_result = self.legacy.charge(customer_id, amount_cents)
try:
new_result = self.new.charge(customer_id, amount_cents)
if legacy_result != new_result:
\`\`\`

self.metrics.log_divergence(
'payment_charge',
{'customer_id': customer_id, 'amount': amount_cents},
legacy_result,
new_result
)

\`\`\`python
except Exception as e:
\`\`\`

self.metrics.log_new_service_error('payment_charge', e)

\`\`\`python
return legacy_result # always return legacy result during parallel run

# Parallel run reveals differences before you trust the new system
# All divergences logged — investigate and fix before cutover
# Zero risk: always returns legacy result until you are confident

# WHEN NOT TO USE STRANGLER FIG:
# When the legacy system cannot be intercepted at a clean boundary
# When the legacy system has no callers you control
# When business requires an immediate cutover (rare, risky)
\`\`\``
  },
  {
    id: "13-6",
    number: "13.6",
    title: "Breaking Dependencies: Dependency Injection Techniques",
    content: `\`\`\`python
# SPROUT METHOD: add new behavior without touching legacy code
# Use when: you need to add behavior to a function you cannot safely change

# LEGACY CODE (do not touch — no tests, too risky):
def generate_invoice(order_id, customer_id):
# ... 200 lines of complex, untested invoice generation ...
# ... we dare not modify this ...
return invoice_data

# REQUIREMENT: add PDF attachment to invoice emails

# BAD: modify the legacy function (risky without tests)
# GOOD: sprout a new function and call it alongside the old one

def generate_invoice_pdf(invoice_data: dict) -> bytes:
\`\`\`

'''
New function — fully tested, clean code.
Takes the output of generate_invoice and creates a PDF.
'''

\`\`\`python
from reportlab.pdfgen import canvas
# ... clean, tested PDF generation ...
return pdf_bytes

# Call both: legacy + sprout
def send_invoice_email(order_id: int, customer_id: int) -> None:
invoice_data = generate_invoice(order_id, customer_id) # legacy: untouched
pdf = generate_invoice_pdf(invoice_data) # sprout: fully tested
\`\`\`

email_service.send_with_attachment(

\`\`\`python
to=invoice_data['customer_email'],
subject=f'Invoice #{invoice_data["id"]}',
body=invoice_data['html_body'],
attachment=pdf
\`\`\`

)


\`\`\`python
# SPROUT CLASS: when sprout method is not enough
# Create an entirely new class for new behavior
# Wire it in at the call site alongside the legacy class

# WRAP METHOD: add behavior before/after legacy without modifying it
def generate_invoice_with_audit(order_id: int, customer_id: int) -> dict:
\`\`\`

'''Wraps legacy generate_invoice with audit logging.'''
audit_logger.log_start('invoice_generation', order_id=order_id)

\`\`\`python
try:
result = generate_invoice(order_id, customer_id) # legacy untouched
\`\`\`

audit_logger.log_success('invoice_generation', invoice_id=result['id'])

\`\`\`python
return result
except Exception as e:
\`\`\`

audit_logger.log_failure('invoice_generation', order_id=order_id, error=str(e))
raise

\`\`\`python
# Replace calls to generate_invoice with generate_invoice_with_audit
# Legacy code: zero changes. New behavior: fully tested.
\`\`\``
  },
  {
    id: "13-7",
    number: "13.7",
    title: "Subclassing and Overriding for Testability",
    content: `CHARACTERIZATION TESTS: Find a function in any open-source legacy project (search GitHub for 'no tests'). Write at least 10 characterization tests covering all execution paths you can find. Use coverage to verify you have covered all branches. Document any behaviors you discovered that surprised you.
SEAM TECHNIQUE: Find a function that creates its own database connection or HTTP client. Apply the Extract and Override technique. Create a testable subclass. Write 5 unit tests using the testable subclass that run without any real database or network.
STRANGLER FIG: Design a migration plan for replacing a hypothetical legacy authentication system with a modern JWT-based one. Describe: the routing layer, the parallel run strategy, the metrics to monitor, the rollback plan, and the criteria for declaring the migration complete.
SPROUT METHOD: Given a 100-line untested function that generates reports, you need to add email delivery of the report. Apply the sprout method. Write the new email delivery function with complete tests. Verify the original function is not modified at all.
DEPENDENCY BREAKING: Take an untestable module that creates its own dependencies. Apply dependency injection to make it fully testable. Before: zero tests possible. After: 10+ unit tests with no real external dependencies.
Chapter 13 — Ten Legacy Code Truths
Legacy code is code without tests — not old code. New code without tests is legacy from the moment it is written.
Read tests first when exploring unfamiliar code. Tests are executable documentation showing what the code is supposed to do.
Write characterization tests before changing legacy code. They capture current behavior — correct or not — and alert you to any change.
Seams are places to change behavior without editing code. Function parameters, interfaces, and configuration files are all seams.
The Strangler Fig Pattern is the safest way to replace legacy systems. Build alongside, route traffic gradually, never rewrite all at once.
Sprout Method adds new behavior without touching risky legacy code. New function fully tested, old function untouched.
Wrap Method adds behavior before/after legacy without modifying it. Audit logging, metrics, caching — all can be wrapped.
Dependency Injection is the long-term solution. Inject collaborators instead of creating them. This makes testing trivial.
Never mix refactoring with the legacy code changes you need for a feature. Characterize first, then refactor, then add the feature.
The goal is not a perfect codebase — it is a progressively improving one. Each ticket you work on: leave it with more tests than you found.

CHAPTER 14
PERFORMANCE ENGINEERING
How to Find Real Bottlenecks, Fix Them Correctly, and Build Systems That Stay Fast Under Load

"Premature optimization is the root of all evil. But that does not mean you should ignore performance — it means you should measure first." — Donald Knuth (with the critical second part often omitted)`
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
