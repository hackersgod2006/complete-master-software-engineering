import type { Section } from '../types';

export const CH10_SECTIONS: Section[] = [
  {
    id: "10-1",
    number: "10.1",
    title: "The Three Categories of Errors",
    content: `Error handling is not an afterthought. It is not the catch block you add after the code works. It is a first-class architectural concern that determines whether your system is reliable or fragile, debuggable or opaque, recoverable or permanently broken.
The engineers who build robust production systems think about failure before they think about the happy path. They ask: what happens when this database times out? What happens when this API returns 500? What happens when this file does not exist? The answers to these questions are as important as the answers to the happy-path questions.


---`
  },
  {
    id: "10-2",
    number: "10.2",
    title: "Fail-Fast: The Most Important Principle",
    content: `Category
Definition
Examples
Correct Response
Recoverable
Normal part of correct program operation
File not found, network timeout, invalid input, rate limit
Handle gracefully: retry, return error, use fallback
Programming Bug
Caused by incorrect code — should never happen
Null pointer, array out of bounds, invalid state
Fail fast: crash loudly, log everything, alert engineers
Environmental
From environment beyond program control
Out of memory, disk full, hardware failure
Fail safely: save state, clean up resources, exit cleanly


\`\`\`python
import requests, logging, signal, sys
from typing import Optional

logger = logging.getLogger(__name__)

# CATEGORY 1: RECOVERABLE — handle gracefully
def fetch_user_profile(user_id: int) -> Optional[dict]:
try:
response = requests.get(
\`\`\`

f'https://api.example.com/users/{user_id}',

\`\`\`python
timeout=5.0
\`\`\`

)

\`\`\`python
if response.status_code == 404:
return None # not found: recoverable
\`\`\`

response.raise_for_status()

\`\`\`python
return response.json()
except requests.Timeout:
\`\`\`

logger.warning(f'Timeout fetching user {user_id}')

\`\`\`python
return None
except requests.ConnectionError as e:
\`\`\`

logger.error(f'Connection error fetching user {user_id}: {e}')

\`\`\`python
return None
# Do NOT catch Exception broadly — let unexpected errors propagate

# CATEGORY 2: PROGRAMMING ERRORS — fail fast, never swallow
def calculate_average(numbers: list) -> float:
if not numbers:
raise ValueError('Cannot calculate average of empty list')
if not all(isinstance(n, (int, float)) for n in numbers):
raise TypeError(f'All elements must be numeric')
return sum(numbers) / len(numbers)

# WHAT NOT TO DO — the most dangerous pattern in software:
def calculate_average_dangerous(numbers):
try:
return sum(numbers) / len(numbers)
except:
return 0 # TERRIBLE: silently returns wrong answer
# This hides bugs. Caller never knows something went wrong.
# 'Average of empty list = 0' may cause critical downstream errors.

# CATEGORY 3: ENVIRONMENTAL — save state, exit cleanly
def handle_sigterm(signum, frame):
\`\`\`

'''Graceful shutdown — Kubernetes sends SIGTERM before killing pod.'''
logger.info('SIGTERM received. Finishing current requests...')
server.stop_accepting_new_requests()
server.wait_for_active_requests(timeout=30)
db_pool.close_all_connections()
logger.info('Clean shutdown complete.')
sys.exit(0)

signal.signal(signal.SIGTERM, handle_sigterm)`
  },
  {
    id: "10-3",
    number: "10.3",
    title: "Exception Design: When to Throw, What to Throw",
    content: `\`\`\`python
# DESIGN YOUR OWN EXCEPTION HIERARCHY
# Structured exceptions with context make debugging fast

class AppError(Exception):
def __init__(self, message: str, error_code: str = None, context: dict = None):
super().__init__(message)
\`\`\`

self.error_code = error_code or 'APP_ERROR'
self.context = context or {}
self.message = message


\`\`\`python
def to_dict(self) -> dict:
return {'error': self.error_code, 'message': self.message, 'context': self.context}

class ValidationError(AppError):
def __init__(self, field: str, reason: str, value=None):
super().__init__(
message=f"Validation failed for '{field}': {reason}",
error_code='VALIDATION_ERROR',
context={'field': field, 'reason': reason, 'value': str(value)}
\`\`\`

)
self.field = field


\`\`\`python
class NotFoundError(AppError):
def __init__(self, resource_type: str, identifier):
super().__init__(
message=f"{resource_type} '{identifier}' not found",
error_code='NOT_FOUND',
context={'resource_type': resource_type, 'identifier': str(identifier)}
\`\`\`

)


\`\`\`python
class AuthorizationError(AppError):
def __init__(self, user_id: int, action: str, resource: str):
super().__init__(
message=f'User {user_id} cannot {action} {resource}',
error_code='FORBIDDEN',
context={'user_id': user_id, 'action': action, 'resource': resource}
\`\`\`

)


\`\`\`python
# Usage — clean, informative, structured:
def transfer_funds(from_account_id: int, to_account_id: int, amount: float):
if amount <= 0:
raise ValidationError('amount', 'must be positive', amount)
account = db.get_account(from_account_id)
if not account:
raise NotFoundError('Account', from_account_id)
if account.balance < amount:
raise ValidationError('amount', f'exceeds balance {account.balance}', amount)
if not current_user.can_access(from_account_id):
raise AuthorizationError(current_user.id, 'transfer_from', f'account {from_account_id}')

# API layer maps exceptions to HTTP status codes:
def api_transfer(request):
try:
result = transfer_funds(**request.json)
return JsonResponse(result, status=200)
except ValidationError as e: return JsonResponse(e.to_dict(), status=400)
except NotFoundError as e: return JsonResponse(e.to_dict(), status=404)
except AuthorizationError as e: return JsonResponse(e.to_dict(), status=403)
except AppError as e:
\`\`\`

logger.error('Unhandled app error', extra=e.context)

\`\`\`python
return JsonResponse({'error': 'Internal error'}, status=500)
\`\`\``
  },
  {
    id: "10-4",
    number: "10.4",
    title: "Error Propagation: Checked vs Unchecked vs Result Types",
    content: `\`\`\`python
import time, random, functools, threading
from enum import Enum

def retry(max_attempts=3, initial_delay=1.0, backoff_factor=2.0,
jitter=True, exceptions=(Exception,)):
\`\`\`

'''
Exponential backoff retry decorator.
Jitter prevents thundering herd: all retriers hitting
the recovering server at the same instant.
'''

\`\`\`python
def decorator(func):
@functools.wraps(func)
def wrapper(*args, **kwargs):
delay = initial_delay
last_exc = None
for attempt in range(1, max_attempts + 1):
try:
return func(*args, **kwargs)
except exceptions as e:
last_exc = e
if attempt == max_attempts: break
actual = delay * (0.5 + random.random()) if jitter else delay
\`\`\`

logger.warning(f'{func.__name__} attempt {attempt} failed: {e}. Retry in {actual:.1f}s')
time.sleep(actual)
delay *= backoff_factor

\`\`\`python
raise last_exc
return wrapper
return decorator

@retry(max_attempts=3, initial_delay=1.0, backoff_factor=2.0,
exceptions=(requests.Timeout, requests.ConnectionError))
def fetch_payment_status(payment_id: str) -> dict:
response = requests.get(f'/payments/{payment_id}', timeout=5)
\`\`\`

response.raise_for_status()

\`\`\`python
return response.json()
# Retries: immediately, after ~1s, after ~2s. Then raises.

# CIRCUIT BREAKER: prevents cascading failures
# CLOSED: normal operation
# OPEN: failing fast (not calling service)
# HALF_OPEN: testing if service recovered

class CircuitState(Enum):
CLOSED = 'closed'
OPEN = 'open'
HALF_OPEN = 'half_open'

class CircuitBreaker:
def __init__(self, failure_threshold=5, recovery_timeout=60):
\`\`\`

self.failure_threshold = failure_threshold
self.recovery_timeout = recovery_timeout
self.failure_count = 0
self.last_failure_time = None
self.state = CircuitState.CLOSED
self._lock = threading.Lock()


\`\`\`python
def call(self, func, *args, **kwargs):
with self._lock:
if self.state == CircuitState.OPEN:
elapsed = time.time() - self.last_failure_time
if elapsed >= self.recovery_timeout:
\`\`\`

self.state = CircuitState.HALF_OPEN

\`\`\`python
else:
raise Exception(f'Circuit open. Retry in {self.recovery_timeout - elapsed:.0f}s')
try:
result = func(*args, **kwargs)
with self._lock:
\`\`\`

self.failure_count = 0
self.state = CircuitState.CLOSED

\`\`\`python
return result
except Exception as e:
with self._lock:
\`\`\`

self.failure_count += 1
self.last_failure_time = time.time()

\`\`\`python
if self.failure_count >= self.failure_threshold:
\`\`\`

self.state = CircuitState.OPEN
logger.error(f'Circuit opened after {self.failure_count} failures')
raise`
  },
  {
    id: "10-5",
    number: "10.5",
    title: "Error Handling in Python: The Hierarchy and Best Practices",
    content: `\`\`\`python
import logging, json, traceback
from datetime import datetime

class StructuredLogger:
def __init__(self, name: str, service: str):
\`\`\`

self.logger = logging.getLogger(name)
self.service = service


\`\`\`python
def _log(self, level: str, message: str, **context):
entry = {
\`\`\`

'timestamp': datetime.utcnow().isoformat() + 'Z',
'level': level,
'service': self.service,
'message': message,
**context
}

\`\`\`python
getattr(self.logger, level.lower())(json.dumps(entry))

def info(self, message, **ctx): self._log('INFO', message, **ctx)
def warning(self, message, **ctx): self._log('WARNING', message, **ctx)
def error(self, message, **ctx): self._log('ERROR', message, **ctx)

def exception(self, message, exc, **ctx):
\`\`\`

self._log('ERROR', message,

\`\`\`python
exception_type=type(exc).__name__,
exception_message=str(exc),
traceback=traceback.format_exc(),
\`\`\`

**ctx)


\`\`\`python
# LOG LEVELS — use correctly:
# DEBUG: detailed diagnostic (disabled in production)
# INFO: confirmation things work: 'Order 1001 payment confirmed'
# WARNING: unexpected but recoverable: 'Retrying request (attempt 2/3)'
# ERROR: serious problem: 'Payment failed for order 1001: card declined'
# CRITICAL: catastrophic: 'DB connection pool exhausted — all requests failing'

# ALWAYS LOG:
# All external API calls (request_id, duration_ms, status)
# All auth decisions (user_id, action, resource, granted/denied)
# All state transitions (order created, payment processed)
# All errors with full context (user_id, request_id, inputs)

# NEVER LOG:
# Passwords, tokens, credit card numbers (even masked)
# PII unless required and properly protected
# Sensitive query parameters in URLs
\`\`\``
  },
  {
    id: "10-6",
    number: "10.6",
    title: "Error Handling in Java: Exceptions Done Right",
    content: `ERROR TAXONOMY: Find 10 exception handlers in any open-source Python project. Classify each as Category 1 (recoverable), 2 (programming bug), or 3 (environmental). Identify 3 that are misclassified. Write the correct handler for each misclassified one.
EXCEPTION HIERARCHY: Design a complete exception hierarchy for an e-commerce API covering: validation, authentication, authorization, not found, payment, inventory, shipping, external services. Each exception must carry structured context. Write the API layer mapping each to HTTP status codes.
RETRY DECORATOR: Implement the retry decorator. Add: maximum total retry time, specific retry conditions (only retry on HTTP 429 and 503), callback on each retry for metrics. Test with a mock failing 3 times then succeeding.
CIRCUIT BREAKER: Implement CircuitBreaker with metrics (total calls, failures, circuit opens). Add health check endpoint returning circuit state. Test: opens after threshold, stays open during recovery_timeout, closes after successful half-open test.
STRUCTURED LOGGING: Add structured JSON logging to a web application. Every request logs: request_id, path, method, user_id, duration_ms, status_code. Every error logs all request fields plus exception_type, traceback, and business context.
Chapter 10 — Ten Error Handling Truths
Every error is either recoverable, a programming bug, or environmental. Treat each category differently. Never treat all errors the same.
Broad exception catches (except Exception: pass) are the most dangerous pattern in software. They hide bugs and destroy debuggability.
Exception hierarchies with structured context make debugging fast. Always include: what failed, why, what the inputs were.
Never return None to signal error without contract. Either raise an exception or use a Result type. Callers forget to check None.
Retry with exponential backoff and jitter is correct for transient failures. Jitter prevents thundering herd on recovering services.
Circuit Breaker prevents cascading failures. When a service is down, fail fast instead of queuing retries that exhaust your thread pool.
Structured logging (JSON) is mandatory in production. Log enough context to reproduce bugs without adding instrumentation after the fact.
Logs must never contain passwords, tokens, or PII. Even masked versions can sometimes be reversed. Treat log files as potentially public.
Graceful shutdown handling (SIGTERM) is mandatory for production services. Kubernetes sends SIGTERM before killing pods.
The worst error handling pattern: catch exception, log it, return default value, continue. This creates invisible data corruption.

CHAPTER 11
TESTING: THE SCIENCE OF CONFIDENCE
How to Build Software You Can Confidently Change, Deploy, and Extend

"Code without tests is broken code, we just do not know where or when." — Michael Feathers`
  },
  {
    id: "10-7",
    number: "10.7",
    title: "Error Handling in Go: Errors as Values",
    content: `Go took a radically different path. It has no exceptions (though it has \`panic\`, which is for truly unrecoverable states). Instead, functions return multiple values, the last of which is an \`error\` interface.

## The Idiom
\`\`\`go
f, err := os.Open("filename.ext")
if err != nil {
    return fmt.Errorf("failed to open file: %w", err)
}
defer f.Close()
\`\`\`

## Why this approach?
1. **No Hidden Control Flow**: You can see exactly where an error is handled. There are no "invisible" jumps to a catch block 5 levels up.
2. **Explicit Handling**: It is difficult (though not impossible) to ignore an error.
3. **Simplicity**: Errors are just values. You can compare them, wrap them, and pass them around like any other variable.

## Error Wrapping
Since Go 1.13, the standard library supports wrapping errors using \`%w\`. This allows you to add context to an error while still allowing the caller to inspect the original cause using \`errors.Is()\` or \`errors.As()\`.

## The Criticism
The most common complaint about Go is the verbosity. A typical Go file is 30% \`if err != nil\` blocks. However, Go proponents argue that this verbosity is a feature, not a bug: it forces you to think about failure at every single step of your logic. In a world of distributed systems, failure is the norm, not the exception.`
  },
  {
    id: "10-8",
    number: "10.8",
    title: "Error Handling in Rust: Result<T, E> — The Best Model",
    content: `Rust provides arguably the most sophisticated error handling model in modern systems programming. It combines the explicitness of Go with the power of functional programming.

## The Result Enum
In Rust, a function that can fail returns a \`Result\` enum:
\`\`\`rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
\`\`\`

## The Power of the \`?\` Operator
To solve the verbosity problem seen in Go, Rust introduced the \`?\` operator. It says: "If the result is an error, return it from the current function. If it's OK, unwrap the value and continue."

\`\`\`rust
fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?; // Returns early if error
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
\`\`\`

## Recoverable vs. Unrecoverable
- **Recoverable**: Handled via \`Result\`.
- **Unrecoverable**: Handled via \`panic!\`. Use this only for programmer errors (e.g., an array index out of bounds that should never happen).

## Why it wins
Rust's model is **type-safe**. If a function returns a \`Result\`, the compiler **will not let you** access the success value \`T\` until you have handled the error case \`E\`. This eliminates a whole class of "forgot to check error" bugs that plague C and Go. It also provides functional combinators like \`.map()\`, \`.and_then()\`, and \`.unwrap_or()\` for elegant error processing.`
  },
  {
    id: "10-9",
    number: "10.9",
    title: "Null: The Billion Dollar Mistake and How to Fix It",
    content: `Sir Tony Hoare, the inventor of the \`null\` reference, famously called it his "billion-dollar mistake." Null represents the absence of a value, but because it is often a valid "subtype" of every other type, it leads to the ubiquitous \`NullPointerException\`.

## The Problem with Null
Null is a **topological hole** in the type system. If a function returns a \`User\` object, the type system says "You have a User." But if it returns \`null\`, and you try to call \`user.getName()\`, the program crashes. The type system lied to you.

## The Solution 1: Optional/Option Types
Languages like Java (\`Optional\`), Rust (\`Option\`), and Swift use a wrapper type.
- **Rust**: \`Option<T>\` is either \`Some(T)\` or \`None\`.
- You must explicitly "unwrap" or "match" the option to get the value.

## The Solution 2: Null Safety (Kotlin, TypeScript, C#)
Modern languages use **Nullable Types** (\`User?\`).
\`\`\`typescript
function getUsername(user: User | null) {
    // return user.name; // Error: user might be null
    return user?.name ?? "Guest"; // Safe: using optional chaining and nullish coalescing
}
\`\`\`

## The Goal: Null-Free Logic
Excellent code avoids \`null\` entirely where possible.
- Use **Empty Collections** instead of null (\`[]\` vs \`null\`).
- Use the **Null Object Pattern**: Return an object that implements the interface but does nothing (e.g., a \`GuestUser\` object instead of \`null\`).
- Use **Assertions** to ensure values are not null at the boundaries of your system.`
  },
  {
    id: "10-10",
    number: "10.10",
    title: "Defensive Programming vs Fail-Fast: Choosing the Right Approach",
    content: `Engineers often debate two philosophies of error handling: **Defensive Programming** and **Fail-Fast**. The best engineers know when to use each.

## Defensive Programming
Defensive programming is the practice of "protecting" your code from invalid inputs by checking everything and returning "safe" values.
- **Example**: A function that returns \`0\` instead of crashing if passed a negative number.
- **Usage**: Critical for **public APIs**, **user interfaces**, and **security boundaries**. You cannot trust the outside world.

## Fail-Fast (Offensive Programming)
Fail-fast is about crashing as soon as an internal invariant is violated.
- **Example**: Using an \`assert\` to ensure a internal pointer is not null.
- **Usage**: Critical for **internal logic** and **private methods**. If your internal logic is passing a negative number to a function that expects a positive one, that's a bug. Fixing the bug is better than "defending" against it.

## The "Hard Shell, Soft Center" Strategy
A common architectural pattern is to be **Defensive at the perimeter** and **Fail-Fast in the core**.
1. Validate and sanitize all input at the API level (Defensive).
2. Once the data is "inside," assume it is valid.
3. If an internal function receives invalid data, crash (Fail-Fast), because it means your perimeter validation is broken.

| Layer | Strategy | Reasoning |
|-------|----------|-----------|
| External API | Defensive | Users are unpredictable |
| Internal Library | Fail-Fast | Developers need to find bugs |
| UI/Frontend | Defensive | Crashing a UI is a bad user experience |

Mixing these up leads to "Silent Failures" (being defensive when you should have failed fast) or "Brittle Systems" (failing fast on user input errors).`
  },
  {
    id: "10-11",
    number: "10.11",
    title: "Error Messages: Writing For the Reader, Not the Writer",
    content: `An error message is a UI for developers. Too often, we write messages that make sense to us (the writers) but are useless to the person seeing them (the readers).

## The Anatomy of a Bad Message
- \`Error: Something went wrong\` (Zero information)
- \`Invalid argument\` (Which one?)
- \`NullPointerException at line 452\` (Internal leak, no context)

## The Anatomy of an Excellent Message
An excellent error message follows the **PIE** formula:
1. **P - Problem**: What happened?
2. **I - Impact**: What can't happen now?
3. **E - Evidence/Exit**: Why did it happen and how can I fix it?

- **Example**: \`Failed to upload 'avatar.jpg' (Problem). The user profile will not have an image (Impact). Reason: File size 15MB exceeds the 10MB limit (Evidence). Please compress the image or change the server settings (Exit).\`

## Guidelines
- **Include the Value**: If a validation failed, show the value that caused the failure. (\`Expected age > 18, got 12\`).
- **Be Precise**: "File error" is bad. "Permission denied when reading /etc/hosts" is good.
- **No Blame**: Avoid "You entered the wrong date." Use "The date format must be YYYY-MM-DD."
- **Searchable Codes**: Assign unique error codes (\`ERR-4021\`) that developers can search for in the documentation or logs.

Remember: The time it takes a developer to fix a bug is directly proportional to the quality of the error message they receive.`
  },
  {
    id: "10-12",
    number: "10.12",
    title: "Logging Errors: What, When, at What Level",
    content: `Logging is your "black box flight recorder." When a system fails in production, the logs are often all you have to diagnose the cause.

## Log Levels
- **TRACE/DEBUG**: Fine-grained information for development. (e.g., "Entering function X").
- **INFO**: Significant milestones in the app. (e.g., "Server started on port 80", "User 123 logged in").
- **WARN**: Something unexpected happened, but the app is still working. (e.g., "Database connection slow", "Retry 1 of 3").
- **ERROR**: A specific operation failed, but the app is still running. (e.g., "Failed to send email to user 456").
- **FATAL/CRITICAL**: The whole app is crashing.

## What to Log
- **Context**: User ID, Request ID, Correlation ID (to trace a request across multiple microservices).
- **The Error**: The message and the **stack trace**.
- **The State**: Important variables at the time of failure.

## What NOT to Log (Security!)
- **PII**: Emails, names, addresses.
- **Secrets**: Passwords, API keys, session tokens.
- **Large Data**: Don't log the entire 50MB JSON response.

## Structured Logging
Modern systems use **Structured Logging** (JSON). Instead of a raw string, you log an object.
\`\`\`json
{
  "level": "error",
  "timestamp": "2023-10-27T10:00:00Z",
  "message": "Payment failed",
  "user_id": "user_99",
  "order_id": "ord_552",
  "error_code": "PMT_01",
  "stack_trace": "..."
}
\`\`\`
This allows tools like ELK (Elasticsearch, Logstash, Kibana) or Datadog to index your logs, allowing you to run queries like "Show me all users who had a payment failure in the last hour."`
  },
  {
    id: "10-13",
    number: "10.13",
    title: "Case Study: Knight Capital — Silent Failure Costs $440M",
    content: `On August 1, 2012, Knight Capital Group lost **$440 million in 45 minutes**, leading to the company's collapse. The cause? A "broken" deployment and a failure of error handling logic.

## The Incident
Knight Capital deployed new software to their eight servers. However, a configuration error meant the software was only correctly deployed to seven. The eighth server still had an old, repurposed flag that used to trigger a "test" mode but now triggered a high-frequency trading algorithm.

## The Error Handling Failure
When the eighth server started receiving production traffic, it began buying and selling millions of shares in a "feedback loop."
- The system was designed to send "Warning" emails when certain conditions were met.
- On that morning, the system sent **thousands of warning emails** to the engineers.
- However, because these warnings weren't "Fatal," the system didn't stop. It kept trading.
- The engineers, overwhelmed by the volume of emails and without a clear "Fail-Fast" mechanism, spent 45 minutes trying to figure out what was happening while the company's capital bled away.

## The Lessons
1. **Silence is not Golden**: The system should have had a "Kill Switch" that automatically triggered when the trade volume deviated from the norm.
2. **Monitoring vs. Alerting**: Sending an email for every warning is useless. Alerts should be actionable and tiered.
3. **Fail-Fast for Business Invariants**: Error handling isn't just for null pointers; it's for business logic. If the system is losing money at an impossible rate, it must **stop**, not just "log a warning."

Knight Capital is the ultimate cautionary tale: in high-stakes systems, the cost of a "soft" error handler can be the existence of the company itself.`
  },
  {
    id: "10-14",
    number: "10.14",
    title: "Case Study: Therac-25 — Error Handling and Human Safety",
    content: `The **Therac-25** was a radiation therapy machine involved in at least six accidents between 1985 and 1987, in which patients were given massive overdoses of radiation, leading to death or serious injury. It is the most famous example of fatal software error handling.

## The Race Condition
The machine had two modes: "Electron" (low power) and "X-ray" (high power). A race condition occurred when a highly skilled operator typed commands very quickly. If they switched from X-ray to Electron mode within a specific 8-second window, the software would set the hardware to high power but without the necessary X-ray "spreader" shield in place.

## The Error Handling Failure
When this happened, the machine's control software detected a mismatch. However, instead of stopping the treatment, it displayed a cryptic message on the console: **"MALFUNCTION 54"**.
- The manual contained no explanation for Malfunction 54.
- The operator could clear the error by pressing a single key and try again.
- Because the system didn't "Fail-Safe" (by physically disabling the beam), the operator unknowingly delivered lethal doses of radiation multiple times, thinking they were simply "retrying" a minor software glitch.

## The Lessons
1. **Never "Retry" without understanding the failure**: The system allowed the operator to override a safety-critical error without investigation.
2. **Fail-Safe, not just Fail-Fast**: In physical systems, "Failing" must mean moving to the safest possible state (power off).
3. **User-Centric Error Messages**: "Malfunction 54" is a programmer's debug code. In a medical device, the message should have been "DANGER: RADIATION MISMATCH. CONTACT TECHNICIAN."

The Therac-25 disaster changed the field of safety-critical software forever, reminding us that error handling is not just a technical detail—it is an ethical responsibility.`
  },
  {
    id: "10-15",
    number: "10.15",
    title: "Exercises",
    content: `Reinforce your understanding of error handling with these practical exercises.

## Exercises
1. **Classification**: Categorize the following errors as User, Programmer, or Environmental:
   - A user enters "abc" into an "Age" field.
   - An array index is calculated as -1.
   - A remote microservice returns a 500 status code.
   - The server runs out of RAM.

2. **Guard Clauses**: Refactor this "nested" function to use Fail-Fast guard clauses:
   \`\`\`python
   def process_user(user):
       if user is not None:
           if user.is_active:
               if user.has_permission("admin"):
                   do_admin_stuff(user)
               else:
                   raise Error("No permission")
           else:
               raise Error("Inactive")
       else:
           raise Error("No user")
   \`\`\`

3. **Custom Exceptions**: Design an exception hierarchy for a "Library Management System." What are the base classes? What are the specific exceptions?

4. **Rust vs. Go**: Implement a function \`divide(a, b)\` in both Go (returning a tuple) and Rust (returning a Result). Which do you find more intuitive?

5. **Logging Audit**: Look at a recent project. Find three \`print()\` statements used for debugging. Replace them with proper logging levels (INFO, WARN, ERROR).

6. **The PIE Formula**: Rewrite this error message: "Error 404: Object not found." Use the Problem, Impact, Evidence, Exit formula.

7. **Null Safety**: In a language of your choice, write a function that takes a potentially null list of integers and returns the sum. Ensure it never throws a NullPointerException.

8. **Fail-Safe Design**: Imagine you are writing software for a self-driving car. If the "Camera Feed" service fails, what should the "Fail-Safe" action be?

## Answers
1. 
   - User
   - Programmer
   - User (or Environmental, depending on if it's expected)
   - Environmental

2. 
   \`\`\`python
   def process_user(user):
       if user is None: raise Error("No user")
       if not user.is_active: raise Error("Inactive")
       if not user.has_permission("admin"): raise Error("No permission")
       do_admin_stuff(user)
   \`\`\`

6. "The requested user profile (ID: 550) could not be found in the database (Problem). You will not be able to view or edit this profile (Impact). This usually happens if the user was deleted or the ID is incorrect (Evidence). Please check the ID or return to the user list (Exit)."

8. The fail-safe action should be to gradually slow the car down and pull over to the side of the road, while alerting the driver to take over. Simply "crashing" the software (stopping execution) is not a safe option in a moving vehicle.`
  }
];
