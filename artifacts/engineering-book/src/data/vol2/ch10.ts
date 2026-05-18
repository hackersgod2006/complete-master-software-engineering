import type { Section } from '../types';

export const CH10_SECTIONS: Section[] = [
  {
    id: "10-1",
    number: "10.1",
    title: "The Three Categories of Errors",
    content: `Not all errors are created equal. To build resilient systems, we must first classify the "failure modes" we encounter. In software engineering, errors generally fall into three distinct categories, each requiring a different strategic response.

## 1. User Errors (Expected Failures)
These are failures caused by invalid input or environment states that are outside the program's control but within its "prediction horizon."
- **Examples**: Invalid password, file not found, network timeout.
- **Handling**: These should be handled gracefully. They are not "bugs"; they are expected branches of logic. The user should be informed with a clear message, and the system should continue running.

## 2. Programmer Errors (Bugs)
These are failures caused by incorrect logic or broken assumptions in the code itself.
- **Examples**: Null pointer dereference, array index out of bounds, dividing by zero (where the divisor is calculated by the program).
- **Handling**: These should **not** be handled gracefully in the traditional sense. You cannot "recover" from a logic error because the program's state is now undefined. The correct response is often to crash (Fail-Fast) so the developer can fix the underlying cause.

## 3. Environmental/Resource Errors (Catastrophic Failures)
These are failures where the underlying infrastructure fails.
- **Examples**: Out of memory (OOM), disk full, hardware failure.
- **Handling**: These are often unrecoverable. The best strategy is to ensure the system fails safely (e.g., closing database connections, flushing logs) and triggers an alert for human intervention.

| Category | Cause | Strategy |
|----------|-------|----------|
| User | Input | Validation & Reporting |
| Programmer | Logic | Fail-Fast & Debug |
| Environmental | Infrastructure | Alerting & Safe Shutdown |

Understanding which category an error belongs to prevents the common mistake of trying to "catch" programmer errors with try-catch blocks, which only hides the bug and allows the system to continue in a corrupted state.`
  },
  {
    id: "10-2",
    number: "10.2",
    title: "Fail-Fast: The Most Important Principle",
    content: `The **Fail-Fast** principle states that a system should stop operation immediately when an error is detected. While it sounds counter-intuitive (shouldn't we keep the app running for the user?), it is the most effective way to prevent data corruption and reduce debugging time.

## The Danger of "Fail-Silent"
When a program encounters an error but continues to run, it enters an **undefined state**. 
- A calculation might use a \`null\` value that was cast to \`0\`.
- A database write might be skipped, but the system proceeds as if it succeeded.
- This creates a "time bomb" where the actual crash happens much later—and far away from the original cause—making it nearly impossible to debug.

## Implementation: Assertions and Guards
Fail-Fast is implemented using **Guard Clauses** and **Assertions**.

\`\`\`python
def process_payment(amount, currency):
    # Fail-Fast: Guard Clause
    if amount <= 0:
        raise ValueError("Amount must be positive")
    
    # Intrinsic Logic
    # ...
\`\`\`

## The Benefits
1. **Immediate Feedback**: The developer sees the error the moment it happens.
2. **Clear Stack Traces**: The error is reported at the source, not 10 layers deep.
3. **Data Integrity**: You stop the system before it can write corrupted data to a permanent store.

Fail-Fast is about **honesty** in engineering. It is better to have a system that crashes than a system that lies to you.`
  },
  {
    id: "10-3",
    number: "10.3",
    title: "Exception Design: When to Throw, What to Throw",
    content: `Exceptions are a powerful mechanism for non-local error handling, but they are often abused as a form of "hidden GOTO." 

## When to Throw
Exceptions should be reserved for **exceptional** circumstances. If a function is called \`findUserByEmail(email)\`, and the user is not found, is that an exception? Usually, no. It's a valid result. However, if \`findUserByEmail\` cannot connect to the database, *that* is an exception.

## What to Throw
Never throw generic types like \`Exception\`, \`Error\`, or \`RuntimeException\`. Always create or use **specific** exception types.
- **Bad**: \`throw new Exception("Error!");\`
- **Good**: \`throw new UserAuthenticationException("Invalid credentials");\`

Specific exceptions allow calling code to catch only the errors they know how to handle, while letting others bubble up to a global handler.

## Hierarchy and Metadata
Good exceptions carry **context**.
- **Message**: A human-readable description (for developers, not necessarily users).
- **Code**: A unique identifier for the error type.
- **Data**: Contextual information (e.g., the ID of the resource that wasn't found).

\`\`\`javascript
class DatabaseError extends Error {
  constructor(message, query, params) {
    super(message);
    this.name = "DatabaseError";
    this.query = query;
    this.params = params;
  }
}
\`\`\`

## The Cost of Exceptions
In many languages (like Java or C#), creating an exception is expensive because the runtime must capture the entire **stack trace**. If you use exceptions for normal control flow, you will severely degrade the performance of your application.`
  },
  {
    id: "10-4",
    number: "10.4",
    title: "Error Propagation: Checked vs Unchecked vs Result Types",
    content: `How does an error travel from the point of origin to the point of handling? This is the problem of **propagation**.

## 1. Checked Exceptions (Java)
Checked exceptions force the caller to either catch the exception or declare it in their own method signature. 
- **Pro**: The compiler ensures errors aren't ignored.
- **Con**: Leads to "Exception Swallowing" (empty catch blocks) and "Signature Pollution" where every function ends with \`throws IOException, SQLException, etc.\`.

## 2. Unchecked Exceptions (C#, Python, JS)
Unchecked exceptions don't need to be declared.
- **Pro**: Cleaner code, less boilerplate.
- **Con**: It's easy to forget that a function might throw, leading to unexpected crashes in production.

## 3. Result Types (Rust, Go)
Instead of jumping control flow, the error is returned as a **value**.
- **Go**: \`val, err := doSomething()\`
- **Rust**: \`let result: Result<T, E> = do_something();\`

## The Modern Consensus
The industry is moving away from Checked Exceptions and toward **Result Types** or **Unchecked Exceptions with explicit documentation**. Result types are increasingly favored because they make the failure path a "first-class citizen" of the function signature. You can't get the value without acknowledging the error.

| Model | Visibility | Enforcement |
|-------|------------|-------------|
| Checked | High | Compile-time |
| Unchecked | Low | None |
| Result Type | High | Compile-time (Pattern Matching) |

The key is **consistency**. Choose a propagation model and stick to it across your entire architecture.`
  },
  {
    id: "10-5",
    number: "10.5",
    title: "Error Handling in Python: The Hierarchy and Best Practices",
    content: `Python uses a "Try-Except" model and follows the philosophy of **EAFP** (Easier to Ask for Forgiveness than Permission).

## EAFP vs LBYL
- **LBYL (Look Before You Leap)**: \`if os.path.exists(f): open(f)\`
- **EAFP**: \`try: open(f) except FileNotFoundError: ...\`
Python prefers EAFP because it avoids race conditions (the file could be deleted between the check and the open) and is generally more idiomatic.

## The Exception Hierarchy
All exceptions in Python inherit from \`BaseException\`, but you should always inherit from \`Exception\`.
- \`SystemExit\`, \`KeyboardInterrupt\`: High-level system events.
- \`Exception\`: The base for almost all application-level errors.

## Best Practices
1. **Narrow Scopes**: Keep the \`try\` block as small as possible.
2. **Specific Exceptions**: Never use \`except:\` (naked except) or \`except Exception:\`. It will catch things you didn't intend to, like \`KeyboardInterrupt\`.
3. **The \`finally\` and \`else\` clauses**: 
   - \`else\`: Runs if the try block succeeded. Use it for logic that should only happen if no exception occurred.
   - \`finally\`: Always runs. Use it for cleanup (closing files, DB connections).

\`\`\`python
try:
    data = fetch_from_api()
except ConnectionError:
    log.error("Network down")
else:
    process(data)
finally:
    api.close_connection()
\`\`\`

Python's error handling is elegant but requires discipline. Without specific exception types, \`try-except\` blocks quickly become a source of hidden bugs.`
  },
  {
    id: "10-6",
    number: "10.6",
    title: "Error Handling in Java: Exceptions Done Right",
    content: `Java's exception system is the most rigorous in the industry, distinguishing between **Checked Exceptions**, **Unchecked Exceptions (RuntimeExceptions)**, and **Errors**.

## The Java Trinity
1. **Checked Exceptions (\`Exception\`)**: Represent conditions that a reasonable application might want to catch. (e.g., \`IOException\`).
2. **Unchecked Exceptions (\`RuntimeException\`)**: Represent programmer errors. (e.g., \`NullPointerException\`, \`IndexOutOfBoundsException\`).
3. **Errors (\`Error\`)**: Serious problems that a reasonable application should not try to catch (e.g., \`OutOfMemoryError\`).

## The "Anti-Patterns" to Avoid
- **Swallowing Exceptions**: \`catch (Exception e) {}\`. This is a crime in software engineering. If you can't handle it, don't catch it.
- **Throwing Generic \`Exception\`**: This forces the caller to catch *everything*, including runtime bugs.
- **Using Exceptions for Control Flow**: Using a \`NoSuchElementException\` to end a loop is roughly 100x slower than a simple \`if\` check.

## Try-With-Resources
Introduced in Java 7, this is the gold standard for resource management. It ensures that any object implementing \`AutoCloseable\` is closed automatically, even if an exception occurs.

\`\`\`java
try (BufferedReader br = new BufferedReader(new FileReader(path))) {
    return br.readLine();
} catch (IOException e) {
    logger.error("Failed to read file", e);
    throw new ApplicationException("Configuration missing", e);
}
\`\`\`

## Exception Chaining
When catching an exception and re-throwing a new one, **always** include the original exception as the "cause." This preserves the stack trace and makes debugging possible. (\`new ApplicationException("msg", originalException)\`).`
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
