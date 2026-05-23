import type { Section } from '../types';

export const CH09_SECTIONS: Section[] = [
  {
    id: "9-1",
    number: "9.1",
    title: "Code Is Communication: The Cognitive Science Basis",
    content: `Excellent code is not clever code. It is not the shortest code. It is not the fastest code. It is code that communicates its intent so clearly that any engineer on your team can read it, understand it, modify it safely, and extend it confidently — including yourself six months from now when you have forgotten everything you knew when you wrote it.
This definition has a precise engineering consequence: excellent code minimizes the total cost of ownership over its lifetime. Writing code takes hours. Maintaining code takes years. Code that takes twice as long to write but half as long to understand on every subsequent reading pays back that investment within the first month of production. The principles in this chapter are the distilled wisdom of thousands of engineers across decades of production systems.


---`
  },
  {
    id: "9-2",
    number: "9.2",
    title: "The Cognitive Load Framework: Working Memory and Code",
    content: `Naming is the act of giving variables, functions, classes, and modules names that reveal intent, purpose, and behavior. Good names make code almost self-documenting. Bad names make code impossible to understand without tracing every value at runtime. The cognitive cost of bad names across a large codebase is enormous — engineers spend more time decoding names than reading logic.

\`\`\`python
# RULE 1: Names must reveal intent
# BAD: reveals nothing
d = 86400
def calc(x, y): return x * y / d
data = get_stuff()

# GOOD: reveals everything
SECONDS_PER_DAY = 86400
def calculate_daily_rate(total_amount, num_days):
return total_amount * num_days / SECONDS_PER_DAY
active_users = fetch_users_with_active_subscriptions()

# RULE 2: Booleans must be predicates
# BAD: active, check, flag, enabled_status
# GOOD: is_active, has_valid_email, can_write, should_retry

# RULE 3: Functions must be verb phrases
# BAD: user_data(), email(), cleanup()
# GOOD: fetch_user_by_id(), send_confirmation_email(), purge_expired_tokens()

# RULE 4: Avoid noise words that add nothing
# BAD: user_info_data, account_object, the_list, process_manager
# GOOD: user_profile, account, items, processor

# RULE 5: Magic numbers must be named constants
# BAD:
if retries > 3:
\`\`\`

time.sleep(0.5)


\`\`\`python
# GOOD:
MAX_RETRY_ATTEMPTS = 3
RETRY_BACKOFF_SECONDS = 0.5
if retries > MAX_RETRY_ATTEMPTS:
\`\`\`

time.sleep(RETRY_BACKOFF_SECONDS)


\`\`\`python
# RULE 6: Name length proportional to scope
# Short scope (loop body): i, emp, doc — fine
# Module scope: full_time_employee_monthly_report — necessary

# RULE 7: Use domain language consistently
# If business calls them 'customers' use customer everywhere.
# Mixing customer/user/client/account for same concept creates
# a translation layer in every reader's brain.
\`\`\`


Anti-Pattern
Bad Example
Problem
Fix
Generic names
data, info, stuff, temp
Reveals nothing about contents
Name what it contains: invoice_total, retry_count
Misleading names

\`\`\`python
account_list = {}
\`\`\`

Dict named list causes wrong mental model
accounts_by_id — shows structure and access pattern
Negated booleans

\`\`\`python
if not is_not_disabled
\`\`\`

Double negation requires conscious parsing

\`\`\`python
if is_enabled — always prefer positive form
\`\`\`

Abbreviations
usr, evt, cfg, prc
Save keystrokes, cost hours reading
user, event, config, process — IDEs autocomplete
Overloaded verbs

\`\`\`python
process(), handle(), manage()
\`\`\`

Used for too many different things

\`\`\`python
process_payment(), handle_auth_failure()
\`\`\`

Implementation in name
user_linked_list
Couples name to implementation detail
users — change impl without renaming callers


---`
  },
  {
    id: "9-3",
    number: "9.3",
    title: "Naming: The Most Underrated Engineering Skill",
    content: `A function is the fundamental unit of abstraction. A well-designed function does exactly one thing, does it completely, and does it well. This sounds simple. It requires constant discipline to achieve and maintain as code evolves under pressure.

### 9.3.1 Single Responsibility


\`\`\`python
# VIOLATION: one function with six responsibilities
def process_order(order_id, user_id):
order = db.get_order(order_id) # 1. fetch
if not order: raise ValueError() # 2. validate
payment = stripe.charge(order.total) # 3. charge
\`\`\`

db.update(order_id, status='paid') # 4. record

\`\`\`python
send_email(user_id, order) # 5. notify
update_inventory(order.items) # 6. inventory

# Problems: cannot test payment without real database,
# cannot test email without charging a card,
# email failure prevents inventory update,
# cannot reuse any individual step elsewhere.

# REFACTORED: each function does exactly one thing
def fetch_pending_order(order_id: int):
order = db.get_order(order_id)
if not order: raise OrderNotFoundError(order_id)
if order.status != 'pending':
raise InvalidOrderStateError(order_id, order.status)
return order

def charge_order(order, user):
return stripe.charge(user.card_token, order.total_cents)

def record_payment(order, payment):
with db.transaction():
\`\`\`

db.update_order_status(order.id, 'paid')
db.insert_transaction(order.id, payment)


\`\`\`python
def process_order(order_id: int, user_id: int) -> dict:
# Orchestrates — reads like a business process
order = fetch_pending_order(order_id)
user = fetch_user(user_id)
payment = charge_order(order, user)
if not payment.success:
raise PaymentError(payment.error_message)
record_payment(order, payment)
decrement_inventory(order.items)
send_order_confirmation(user, order)
return {'status': 'success', 'order_id': order_id}

# NOW: each function independently testable, reusable, readable
\`\`\`

### 9.3.2 Function Arguments and Command-Query Separation


\`\`\`python
# MINIMIZE ARGUMENTS: 0=ideal, 1=good, 2=acceptable, 3=questionable, 4+=wrong

# BAD: 7 arguments
def create_user(first_name, last_name, email, password, role, dept, is_active): ...

# GOOD: parameter object groups related data with built-in validation
from dataclasses import dataclass

@dataclass
class CreateUserRequest:
\`\`\`

first_name: str
last_name: str
email: str
password: str
role: str = 'viewer'
department: str = 'general'
is_active: bool = True


\`\`\`python
def __post_init__(self):
if '@' not in self.email:
raise ValueError(f'Invalid email: {self.email}')
if len(self.password) < 8:
raise ValueError('Password must be at least 8 characters')

def create_user(request: CreateUserRequest) -> 'User': ...

# AVOID FLAG ARGUMENTS (boolean controlling behavior):
# BAD: render_page(42, False) — what does False mean?
def render_page(page_id, use_cache=True): ...

# GOOD: two named functions
def render_page(page_id: int) -> str: ...
def render_page_bypass_cache(page_id: int) -> str: ...

# COMMAND-QUERY SEPARATION:
# Functions either modify state (commands) OR return data (queries).
# Never both. This eliminates a huge class of subtle bugs.

# VIOLATION: query with side effect
def get_next_id(counter_name: str) -> int:
value = db.get(counter_name)
\`\`\`

db.set(counter_name, value + 1) # SIDE EFFECT in a query!

\`\`\`python
return value

# CORRECT: separate command and query
def get_current_id(counter_name: str) -> int:
return db.get(counter_name) # pure query

def allocate_next_id(counter_name: str) -> int:
# Explicitly named as an allocation (command that returns result)
return db.atomic_increment(counter_name)
\`\`\``
  },
  {
    id: "9-4",
    number: "9.4",
    title: "Naming Rules: Variables, Functions, Classes, Booleans, Collections",
    content: `\`\`\`python
# THE RULE: comments explain WHY, code explains WHAT and HOW

# BAD: restates the code (zero information added)
\`\`\`

i += 1 # increment i

\`\`\`python
users = [] # create empty list

# BAD: lies or goes stale
# Get the user by email
user = db.get_user_by_id(user_id) # comment says email, code says id

# GOOD: explains WHY that code cannot express

# We use 37-second timeout because upstream payment processor
# guarantees response within 30 seconds. Extra 7 seconds accounts
# for network jitter observed in production (P99 = 34s).
PAYMENT_TIMEOUT_SECONDS = 37

# bcrypt intentionally runs slowly to resist brute-force attacks.
# Do NOT replace with a faster hash — that is a security vulnerability.
hashed_password = bcrypt.hashpw(password, bcrypt.gensalt(rounds=12))

# DOCSTRINGS: always for public APIs
def calculate_compound_interest(
\`\`\`

principal: float,
annual_rate: float,
years: int,
compounds_per_year: int = 12
) -> float:
'''
Calculate compound interest using standard formula.

Args:
principal: Initial amount in dollars.
annual_rate: Annual rate as decimal (0.05 = 5%).
years: Number of years to compound.
compounds_per_year: Frequency (default: monthly).

Returns:
Final amount after compound interest.

Raises:
ValueError: If principal or rate is negative.

Example:
>>> calculate_compound_interest(1000, 0.05, 10)
1647.009...
'''

\`\`\`python
if principal < 0: raise ValueError('Principal must be non-negative')
if annual_rate < 0: raise ValueError('Rate must be non-negative')
return principal * (1 + annual_rate/compounds_per_year) ** (compounds_per_year * years)
\`\`\``
  },
  {
    id: "9-5",
    number: "9.5",
    title: "The Vocabulary of Your Domain: Ubiquitous Language in Code",
    content: `\`\`\`python
# HIGH COHESION: every method belongs together logically
# LOW COUPLING: minimal dependencies on other classes

# BAD: low cohesion (unrelated responsibilities in one class)
class UserManager:
def create_user(self): ...
def send_email(self): ... # email is not a user concern
def generate_report(self): ... # reporting is not user management
def format_csv(self): ... # CSV is not user management

# GOOD: high cohesion, single responsibility per class
class UserRepository:
\`\`\`

'''Handles persistence of User entities only.'''

\`\`\`python
def create(self, user): ...
def find_by_id(self, user_id): ...
def find_by_email(self, email): ...
def update(self, user): ...
def delete(self, user_id): ...

class EmailService:
\`\`\`

'''Handles sending transactional emails only.'''

\`\`\`python
def send_welcome(self, user): ...
def send_password_reset(self, user, token): ...
def send_order_confirmation(self, user, order): ...

# LAW OF DEMETER: talk to friends, not strangers
# Call methods only on: self, arguments, objects you create, your fields

# BAD: chaining through unowned objects
def get_city(order):
return order.customer.address.city.name # knows too much

# GOOD: ask the object for what you need
def get_city(order):
return order.get_customer_city() # order exposes what callers need

# OPEN-CLOSED PRINCIPLE:
# Open for extension, closed for modification.
# Add behavior by adding new code, not changing existing code.

# BAD: adding new payment method requires modifying existing function
def process_payment(order, method):
if method == 'stripe': ...
elif method == 'paypal': ...
elif method == 'crypto': ... # had to modify existing function

# GOOD: each payment method is a separate class
class PaymentProcessor: # abstract interface
def charge(self, amount_cents: int) -> PaymentResult: ...

class StripeProcessor(PaymentProcessor):
def charge(self, amount_cents): return stripe.charge(amount_cents)

class PayPalProcessor(PaymentProcessor):
def charge(self, amount_cents): return paypal.charge(amount_cents)

# Adding new method: just add new class, zero changes to existing code
class CryptoProcessor(PaymentProcessor):
def charge(self, amount_cents): return crypto.charge(amount_cents)
\`\`\``
  },
  {
    id: "9-6",
    number: "9.6",
    title: "Functions: The Atomic Unit of Design",
    content: `CODE REVIEW: Find an open-source Python project with 500+ stars. Read 500 lines of its source code. Find: 3 naming violations, 2 functions doing more than one thing, 1 comment that could be eliminated by renaming. Write a detailed code review with specific suggestions for each.
REFACTORING: Take a 50-line function that reads a CSV, validates each row, converts currency, calculates totals, formats as a report string, and prints it. Refactor into at least 6 separate functions. Apply all 7 naming rules. Apply single responsibility to every function.
NAMING AUDIT: Take any 200-line Python program you have written. Apply the 7 naming rules to every variable, function, and class. Count how many names you rename. Measure before-and-after reading time with a colleague.
PARAMETER OBJECTS: Find 3 functions with 4+ arguments in any codebase. For each, design a dataclass with appropriate validation in __post_init__. Show how call sites become cleaner.
OPEN-CLOSED EXERCISE: Refactor a function using if/elif chains for type dispatch into the strategy pattern using a class hierarchy. Add a new type without touching the existing classes.
Chapter 9 — Ten Truths About Excellent Code
Names must reveal intent. If a name requires a comment to explain it, the name is wrong. Rename until the comment becomes unnecessary.
Boolean names must be predicates: is_active, has_permission, can_retry. Negated booleans force double parsing — always prefer positive form.
Functions do one thing. If you describe a function with 'and' (validates and saves), it does too many things. Split it.
Minimize function arguments. Four or more almost always indicate a missing parameter object or a function doing too much.
Flag arguments (boolean parameters) are a design smell. They signal the function has two behaviors. Split into two named functions.
Command-Query Separation: functions either modify state or return data. Functions that do both are a source of subtle bugs.
Comments explain WHY, not WHAT. Code that needs a comment to explain what it does should be rewritten until the code explains itself.
High cohesion: every method in a class belongs together logically. Low coupling: minimal dependencies on other classes.
The Law of Demeter: only call methods on objects you own, receive as arguments, or create. Deep chaining couples you to internal structure.
The Boy Scout Rule: leave every function cleaner than you found it. Excellent code is not written once — it is continuously improved.

CHAPTER 10
ERROR HANDLING: THE ARCHITECTURE OF FAILURE
How to Design Systems That Fail Gracefully, Recover Automatically, and Never Silently Corrupt Data

"There are two ways to write error-free programs; only the third one works." — Alan Perlis`
  },
  {
    id: "9-7",
    number: "9.7",
    title: "Single Responsibility at the Function Level",
    content: `The **Single Responsibility Principle (SRP)** is often applied to classes, but it is just as vital for functions. A function should do **one thing**, do it well, and do it only.

## Defining "One Thing"
How do you know if a function does one thing? 
- **The "And" Test**: Can you describe what the function does without using the word "and"? 
  - "It validates the input **and** saves it to the database." -> Two things.
- **Sectioning**: Does the function have internal sections separated by comments or whitespace? Those sections are often "hidden" functions.

## The Cost of Multi-Purpose Functions
Functions that do multiple things are "brittle." If you need to change how data is saved but not how it is validated, you risk breaking the validation logic because they are coupled in the same block of code.

## Refactoring for SRP
The most common refactoring is **Extract Function**. Take a block of code within a large function, give it a name that describes its purpose, and replace the block with a call to the new function.

\`\`\`python
# Before
def handle_request(request):
    # Validate
    if not request.token:
        return 403
    # Log
    print(f"Request from {request.ip}")
    # Process
    return 200

# After (SRP)
def handle_request(request):
    if not is_authorized(request):
        return 403
    log_access(request)
    return process(request)
\`\`\`

The SRP version is not just cleaner; it's **declarative**. It tells you *what* is happening, while the details of *how* are tucked away. This is the essence of managing complexity.`
  },
  {
    id: "9-8",
    number: "9.8",
    title: "Function Arguments: The Fewer The Better",
    content: `Arguments are the **interface** of your function. Each argument increases the cognitive load for the developer who has to call that function.

## The Ideal Number
- **Niladic (0 args)**: Ideal. Extremely easy to understand.
- **Monadic (1 arg)**: Very common and easy to use.
- **Dyadic (2 args)**: Acceptable, but the order starts to matter (is it \`point(x, y)\` or \`point(y, x)\`?).
- **Triadic (3 args)**: Significant effort. Developers will often mix up the order.
- **Polyadic (4+ args)**: Should be avoided. These functions are usually doing too much or need a better data structure.

## The Problem with Boolean Arguments
Flag arguments (passing \`true\` or \`false\` to a function) are a clear sign that a function does more than one thing. 
- \`render(data, true)\` // What does 'true' mean?
- Instead, use two functions: \`renderWithHeader(data)\` and \`renderWithoutHeader(data)\`.

## Order and Type Consistency
When you have multiple arguments of the same type, bugs are inevitable.
\`\`\`c
void copy(char *dest, char *src, int len); 
// Was it src first or dest? C's 'memcpy' uses (dest, src), but many others use (src, dest).
\`\`\`
In languages like TypeScript or Python, **named arguments** (keyword arguments) are a powerful tool to mitigate this, as they make the mapping explicit at the call site: \`copy(dest=d, src=s, length=10)\`.

Reducing arguments doesn't just make functions easier to call; it forces you to group related data into objects or classes, leading to a more coherent system design.`
  },
  {
    id: "9-9",
    number: "9.9",
    title: "Parameter Objects and the Builder Pattern",
    content: `When a function naturally requires many pieces of information, we don't just keep adding arguments. Instead, we use patterns to group that information.

## Parameter Objects
If a group of variables are always passed together, they likely represent a single concept. Group them into a **Parameter Object** (or a Data Transfer Object - DTO).

\`\`\`typescript
// Bad: Long argument list
function createUser(firstName: string, lastName: string, email: string, age: number, role: string) {}

// Good: Parameter Object
interface UserRequest {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    role: string;
}
function createUser(request: UserRequest) {}
\`\`\`

## The Builder Pattern
For complex objects with many optional configurations, the **Builder Pattern** provides a fluent, readable API. This is common in Java and C#.

\`\`\`java
// The Builder avoids a constructor with 10 arguments
HttpClient client = new HttpClientBuilder()
    .withTimeout(5000)
    .withRetryPolicy(new ExponentialBackoff())
    .useProxy("proxy.example.com")
    .build();
\`\`\`

## Benefits
1. **Extensibility**: You can add a new field to the Parameter Object without breaking every call site of the function.
2. **Readability**: The name of the object (\`UserRequest\`) provides context that the raw strings don't.
3. **Validation**: You can add validation logic to the object's constructor or the builder's \`build()\` method, ensuring the function only receives "clean" data.

These patterns transform a messy interface into a structured, type-safe contract.`
  },
  {
    id: "9-10",
    number: "9.10",
    title: "Side Effects and Command-Query Separation",
    content: `One of the most dangerous things in code is a function that does something other than what its name implies. This is a **Side Effect**.

## What is a Side Effect?
A side effect occurs when a function modifies state outside of its local scope. This includes:
- Modifying a global variable.
- Changing a property of an object passed as an argument.
- Writing to a file or database.
- Printing to the console.

## Command-Query Separation (CQS)
Bertrand Meyer, creator of the Eiffel language, proposed **CQS**: a method should either be a **Command** (performs an action/changes state) or a **Query** (returns data), but never both.

- **Query**: \`getTotal()\` should return a value and change nothing.
- **Command**: \`setTotal(val)\` should change a value and return nothing (or a success/fail status).

## Why CQS?
When you see \`if (user.isValid())\`, you assume it's a query. If \`isValid()\` also happens to update the \`last_checked_at\` timestamp in the database, it's a side effect. Now, every time you "check" validity, you are "changing" the system. This makes debugging a nightmare because the act of observing the system changes its state (the Heisenbug).

## Pure Functions
In functional programming, we strive for **Pure Functions**—functions where the output is determined solely by the inputs, with zero side effects. Pure functions are easy to test, easy to cache (memoization), and easy to reason about. While 100% purity is impossible in real-world software, isolating side effects to specific "impure" layers is a hallmark of excellent architecture.`
  },
  {
    id: "9-11",
    number: "9.11",
    title: "Return Values: Exceptions vs Error Values vs Option Types",
    content: `How a function communicates its result—especially its failure—is a critical design choice. Different languages offer different paradigms.

## The Return Types
| Method | Description | Example Language |
|--------|-------------|------------------|
| **Exceptions** | Jump to a handler when something goes wrong. | Java, Python, C# |
| **Error Values** | Return a tuple of (result, error). | Go |
| **Option/Result Types** | A wrapper type that is either "Something" or "Nothing/Error". | Rust, Swift, Haskell |

## When to use what?
- **Exceptions**: Best for truly **exceptional** circumstances (out of memory, database connection lost). They should not be used for control flow (e.g., \`UserNotFoundException\`).
- **Error Values**: Forces the caller to handle the error immediately. It's verbose but very clear.
- **Option/Result**: The most modern and "safe" approach. The type system prevents you from accessing the result unless you have handled the possibility of an error.

## The "Null" Problem
Returning \`null\` is often the worst choice. It provides no information about *why* something failed and leads to the infamous \`NullPointerException\`. 

\`\`\`rust
// Rust Result Type (Safe)
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}
\`\`\`

## The Principle of Least Surprise
Excellent code returns what the reader expects. If a function is called \`findUsers()\`, it should return an empty list \`[]\` if no users are found, not \`null\` or an exception. An empty list is a valid "collection of users," just with zero items. This allows the caller to iterate over the result without special-casing the "not found" scenario.`
  },
  {
    id: "9-12",
    number: "9.12",
    title: "Comments: What To Write and What To Delete",
    content: `There is a common saying: "Good code is self-documenting." While this is a noble goal, it is often misunderstood. Some comments are vital; most are "noise."

## Comments as Failures
Every time you write a comment to explain **what** a piece of code does, it's often a sign that the code itself isn't clear enough.
- **Bad**: \`// Check if the user is over 18\` -> \`if (u.age > 18)\`
- **Better**: \`if (user.isAdult())\`

## Good Comments: The "Why," Not the "What"
The code tells you **how** and **what**. A comment should tell you **why**.
1. **Legal/Copyright**: Standard headers.
2. **Intent**: Explaining a business decision that isn't obvious (\`// We use a 31-day window here to match the regulatory reporting cycle\`).
3. **Warning**: \`// Don't run this without a database index on 'email'\`.
4. **TODOs**: Temporary markers for future work (though these should be tracked in a task manager).
5. **Public API Documentation**: Using tools like JSDoc or Doxygen to generate help files for other developers.

## Bad Comments: The Noise
- **Mumbled/Obvious**: \`i++; // Increment i\`
- **Redundant**: Explaining a function that has a clear name.
- **Commented-out Code**: This is what Git is for. Delete it. If you need it later, look in the history.
- **Journal/Log**: \`// Added on 2023-10-12 by Bob\`. Use Git blame.

## The Rule of Proximity
If you must write a comment, keep it as close to the relevant code as possible. Comments that are separated from the code they describe quickly become **lies** as the code is updated but the comment is not.`
  },
  {
    id: "9-13",
    number: "9.13",
    title: "Code Formatting: Consistency as Professionalism",
    content: `Formatting is the "clothing" of your code. While the compiler doesn't care about spaces or tabs, the human brain is highly sensitive to visual patterns.

## The Cognitive Load of Messy Code
When indentation is inconsistent, the reader's brain has to work harder to identify the structure of loops and conditionals. This is extraneous cognitive load. Consistent formatting allows the eye to "skim" the code and immediately identify scope and hierarchy.

## The Tab vs. Space War
It doesn't matter which you choose. What matters is that the **whole project** uses the same choice.

## Automated Enforcement
In a professional engineering team, formatting should **never** be a topic of discussion in code reviews. It should be handled by automated tools.
- **Linters**: Check for potential errors and style violations (e.g., ESLint, Pylint).
- **Formatters**: Automatically rewrite code to a specific style (e.g., Prettier, Black, Gofmt).

## The "Save on Format" Workflow
Modern IDEs can be configured to run a formatter every time you save a file. This eliminates "style drift" and ensures that the Git diff only contains meaningful logic changes, not hundreds of lines of moved braces or changed indentation.

## Why it Matters
Consistency is a form of professionalism. If a surgeon has a messy operating room, you might doubt their attention to detail during the surgery. Similarly, if a developer can't be bothered to align their braces, a reviewer might wonder if they were also careless with their error handling or security logic.`
  },
  {
    id: "9-14",
    number: "9.14",
    title: "The Boy Scout Rule: Leave It Better Than You Found It",
    content: `Software systems tend toward **entropy**. As new features are added and requirements change, the original clean design often degrades. The **Boy Scout Rule** is the primary defense against this decay.

## The Principle
"Always leave the campground cleaner than you found it." In code, this means if you are touching a file to fix a bug or add a feature, take five minutes to improve one small thing:
- Rename a vague variable.
- Break a large function into two.
- Remove a redundant comment.
- Fix a typo.

## Why Not a "Big Refactor"?
Small, continuous improvements are much safer than "The Big Rewrite." Big rewrites often fail because they try to change too much at once, losing the nuanced bug fixes that were baked into the original (albeit messy) code.

## The Compound Interest of Clean Code
If every developer on a team makes a 1% improvement to every file they touch, the codebase actually gets **better** over time instead of worse. This creates a culture of ownership and excellence.

## Boundaries
The Boy Scout Rule doesn't mean you should spend three days refactoring a whole module when you were supposed to fix a typo. The improvement should be **local** and **focused**. A good rule of thumb: the refactoring should not take longer than the original task.

By applying the Boy Scout Rule, you combat technical debt before it becomes overwhelming, ensuring the system remains a "pleasant place to live" for years to come.`
  },
  {
    id: "9-15",
    number: "9.15",
    title: "Code Smells: The Complete Catalog",
    content: `A **Code Smell** is a surface indication that usually corresponds to a deeper problem in the system. Like a strange smell in a kitchen, it doesn't always mean the food is rotten, but it warrants an investigation.

## The Classic Smells
- **Rigidity**: A change in one place requires a cascade of changes in other places.
- **Fragility**: A change in one place breaks unrelated parts of the system.
- **Immobility**: Parts of the system are hard to reuse in other projects because they are too tightly coupled.
- **Viscosity**: It's easier to do the "wrong thing" (a hack) than the "right thing" (proper design).

## Specific Implementation Smells
1. **Long Function**: The most common smell. Usually indicates multiple responsibilities.
2. **Large Class**: A class trying to be too many things (The God Object).
3. **Primitive Obsession**: Using basic types (strings, ints) to represent complex concepts (e.g., using a string for a \`PhoneNumber\` instead of a specific class).
4. **Data Clumps**: Groups of data that always travel together (e.g., \`start_date\`, \`end_date\`). These should be a \`DateRange\` object.
5. **Shotgun Surgery**: Every time you make a change, you have to touch 10 different files.
6. **Feature Envy**: A function in Class A seems more interested in the data of Class B. It should probably be moved to Class B.

## Detecting Smells
Learning to identify code smells is a key milestone in moving from "junior" to "senior" engineer. You develop an intuition. When you see a 500-line \`switch\` statement, your "smell sensor" should tingle. It’s an invitation to refactor—perhaps using the Strategy Pattern or Polymorphism.`
  },
  {
    id: "9-16",
    number: "9.16",
    title: "The Broken Windows Theory Applied to Code",
    content: `In urban sociology, the **Broken Windows Theory** suggests that if a window in a building is broken and left unrepaired, it sends a signal that no one cares. This leads to more windows being broken, graffiti, and eventually serious crime.

## The Code Equivalent
In software, a "broken window" is:
- A build that occasionally fails but is ignored.
- A codebase full of compiler warnings.
- A "temporary hack" that has been there for two years.
- Messy formatting in a shared file.

## The Psychological Effect
When a developer enters a codebase that is already "broken," they feel less psychological pressure to write high-quality code. "The rest of the file is a mess," they think, "so it doesn't matter if my new function is a mess too." Conversely, in a pristine, well-tested codebase, there is a strong social and psychological pressure to maintain that standard.

## Maintaining the Neighborhood
1. **Zero Tolerance for Warnings**: Treat compiler/linter warnings as errors.
2. **Fix Hacks Early**: If you must use a hack, document it clearly and create a ticket to fix it properly.
3. **Peer Review**: Use code reviews not just to find bugs, but to maintain the "aesthetic" and structural integrity of the codebase.

Excellent code is not just about the lines of text; it's about the **culture of care** that surrounds it. Once you let the first window stay broken, the decline of the entire system is inevitable.`
  },
  {
    id: "9-17",
    number: "9.17",
    title: "Reading Code: The Skill Nobody Teaches",
    content: `We spend most of our time reading code, yet most CS curricula focus almost entirely on writing. Reading code is a distinct skill that involves **reverse-engineering a mental model**.

## The Layers of Reading
1. **Scanning**: Looking for keywords, structure, and familiar patterns.
2. **Tracing**: Following the execution flow with specific inputs (playing computer).
3. **Mapping**: Understanding how this piece of code fits into the larger architecture.

## Techniques for Better Reading
- **Read the Tests First**: Tests are the best documentation of how code is supposed to behave. They show you the inputs, the expected outputs, and the edge cases.
- **Top-Down vs. Bottom-Up**:
  - **Top-Down**: Start at the entry point (e.g., \`main()\` or a route handler) to see the "big picture."
  - **Bottom-Up**: Start at the utility functions or database layers to see the "building blocks."
- **Use the "Breadcrumb" Method**: When deep in a call stack, keep notes on how you got there. Modern IDEs have "Call Hierarchies" and "Navigation History" to help with this.

## Reading as Learning
The best way to become a better writer is to read the work of masters. Read the source code of successful open-source projects like the **Linux Kernel**, **Redis**, or **React**. Observe how they handle errors, how they name variables, and how they structure their modules.

Reading code is an act of **empathy**. You are trying to see the world through the eyes of the person who wrote it. When you struggle to read a piece of code, don't just get frustrated—analyze *why* it's hard to read. That analysis will make you a much better writer.`
  },
  {
    id: "9-18",
    number: "9.18",
    title: "Case Study: Linux Kernel Coding Standards",
    content: `The Linux Kernel is one of the most successful and longest-running software projects in history. With over 30 million lines of code and thousands of contributors, it should be a chaotic mess. Instead, it is remarkably consistent, thanks to the **Linux Kernel Coding Style**.

## Key Philosophy: Clarity and Simplicity
The Linux style (written largely by Linus Torvalds) is famously opinionated. 

1. **Indentation**: They use 8-character tabs. The reasoning? If your code is so deeply nested that 8-character tabs make it go off the screen, your code is too complex and needs to be broken up. It's a "forcing function" for better design.
2. **Function Length**: Functions should be short and do one thing. If you need a local variable named \`i1\`, \`i2\`, and \`i3\`, your function is too long.
3. **Naming**: Linux favors short, descriptive names for local variables (e.g., \`tmp\`, \`p\`) but very descriptive names for global functions and structures.
4. **GOTO is not Evil**: Unlike many academic "best practices," the Linux kernel uses \`goto\` extensively for **centralized error handling**.

\`\`\`c
int some_function(void) {
    if (allocate_resource_1() < 0) return -ENOMEM;
    if (allocate_resource_2() < 0) goto low_res1;
    if (allocate_resource_3() < 0) goto low_res2;

    // ... logic ...

    return 0;

low_res2:
    release_resource_2();
low_res1:
    release_resource_1();
    return -EFAULT;
}
\`\`\`

## The Lesson
The Linux Kernel proves that **standards enable scale**. Without a strict, enforced coding style, the kernel would have collapsed under its own weight decades ago. It also shows that "best practices" should be pragmatic, not dogmatic. The use of \`goto\` for cleanup is a perfect example of a pragmatic solution to a common C problem.`
  },
  {
    id: "9-19",
    number: "9.19",
    title: "Exercises",
    content: `Test your understanding of the principles of excellent code with these exercises.

## Exercises
1. **The Naming Game**: Rename the following variables and functions for better clarity:
   - \`let d; // elapsed time in days\`
   - \`function p(u, l) { ... } // login user\`
   - \`let x = 86400; // seconds in day\`
   - \`let flag = true; // user is allowed to edit\`

2. **Abstration Levels**: Identify the "mixed abstraction" in this function and refactor it:
   \`\`\`javascript
   function processOrder(order) {
     if (order.total > 100) {
       console.log("Processing high value order");
       const db = connect("mongodb://localhost:27017");
       db.collection("orders").insertOne(order);
       sendEmail(order.userEmail, "Your order is confirmed");
     }
   }
   \`\`\`

3. **Function Extraction**: Take a 50-line function from one of your own projects and refactor it into 3-4 smaller functions. What names did you choose?

4. **SRP Check**: Apply the "And" test to your last three functions. Do any of them fail?

5. **Boolean Arguments**: Refactor this call: \`saveUser(userData, true, false);\` (where true = notify, false = useTransaction).

6. **The Boy Scout Rule**: Go to a file you haven't touched in a month. Find and fix three "broken windows" (formatting, naming, or dead code).

7. **Reading Challenge**: Go to the GitHub repository for **Redis** and read the \`object.c\` file. How does it handle object creation? Is the naming clear?

8. **CQS Enforcement**: Identify if this function violates CQS:
   \`\`\`python
   def get_and_increment_counter():
       global counter
       val = counter
       counter += 1
       return val
   \`\`\`

## Answers
1. 
   - \`daysSinceCreation\`
   - \`loginUser(username, password)\`
   - \`SECONDS_PER_DAY\`
   - \`canEdit\` or \`hasEditPermission\`

2. The database connection string and MongoDB call are low-level details. Refactor into \`db.saveOrder(order)\`.

5. Use named arguments: \`saveUser(userData, { notify: true, useTransaction: false })\` or separate functions like \`saveUserAndNotify(userData)\`.

8. Yes, it violates CQS because it returns a value (Query) AND changes state (Command). Use two functions or rename it to \`incrementAndGetCounter()\` to make the side effect explicit.`
  }
];
