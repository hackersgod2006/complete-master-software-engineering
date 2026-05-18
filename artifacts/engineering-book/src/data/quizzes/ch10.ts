import { ChapterQuizData } from "../quizTypes";

export const CH10_QUIZ: ChapterQuizData = {
  "chapterId": "ch10",
  "sectionQuizzes": {
    "10-1": [
      {
        "id": "q-10-1-1",
        "question": "What is the primary difference between Exceptions and Error Values?",
        "options": [
          "Exceptions are faster to execute",
          "Error values are returned by the function; exceptions interrupt the normal flow of the program",
          "Error values can only be strings",
          "Exceptions are only used in Java"
        ],
        "correct": 1,
        "explanation": "Exceptions trigger an alternative control flow (stack unwinding), while error values are part of the standard return type (e.g., Result/Either in Rust/Go/Haskell).",
        "difficulty": "medium"
      },
      {
        "id": "q-10-1-2",
        "question": "In which language is 'if err != nil' a common pattern for error handling?",
        "options": ["Java", "Python", "Go", "TypeScript"],
        "correct": 2,
        "explanation": "Go uses explicit error return values as a core part of its design philosophy.",
        "difficulty": "easy"
      },
      {
        "id": "q-10-1-3",
        "question": "What is a major criticism of using Exceptions for flow control?",
        "options": [
          "They are too easy to write",
          "They make the control flow non-obvious and can be expensive to throw/catch",
          "They are only compatible with 32-bit systems",
          "They require global variables"
        ],
        "correct": 1,
        "explanation": "Exceptions should be reserved for 'exceptional' cases, not expected logic paths, due to their impact on readability and performance.",
        "difficulty": "hard"
      }
    ],
    "10-2": [
      {
        "id": "q-10-2-1",
        "question": "What does 'Defensive Programming' involve?",
        "options": [
          "Writing as little code as possible",
          "Assuming that external inputs and other components might fail or provide invalid data",
          "Blocking all incoming traffic to the server",
          "Using only private methods"
        ],
        "correct": 1,
        "explanation": "Defensive programming ensures the software continues to function or fails gracefully under unforeseen circumstances.",
        "difficulty": "easy"
      },
      {
        "id": "q-10-2-2",
        "question": "What is an 'Assertion' used for?",
        "options": [
          "To provide a user-friendly error message",
          "To check for conditions that should be 'impossible' during development",
          "To connect to a database",
          "To format strings"
        ],
        "correct": 1,
        "explanation": "Assertions are internal checks that help catch logic errors during development by validating invariants.",
        "difficulty": "medium"
      },
      {
        "id": "q-10-2-3",
        "question": "How does 'Input Validation' differ from 'Error Handling'?",
        "options": [
          "They are the same thing",
          "Validation happens at the boundary to prevent bad data; error handling deals with failures during processing",
          "Validation is only for front-end apps",
          "Error handling is only for databases"
        ],
        "correct": 1,
        "explanation": "Validation is proactive (sanitizing input), whereas error handling is reactive (dealing with unexpected states).",
        "difficulty": "medium"
      }
    ],
    "10-3": [
      {
        "id": "q-10-3-1",
        "question": "What is the 'Fail-Fast' principle?",
        "options": [
          "Crashing the server as quickly as possible on startup",
          "Reporting a failure immediately when a problem is detected rather than trying to continue",
          "Completing tasks quickly to meet deadlines",
          "Automatically deleting failed code"
        ],
        "correct": 1,
        "explanation": "Fail-fast prevents 'silent' failures or data corruption by stopping execution early when an invariant is violated.",
        "difficulty": "medium"
      },
      {
        "id": "q-10-3-2",
        "question": "Which of these is a benefit of Failing Fast?",
        "options": [
          "It makes bugs easier to locate and debug",
          "It keeps the application running no matter what",
          "It reduces the need for backups",
          "It speeds up network latency"
        ],
        "correct": 0,
        "explanation": "Since the system stops at the point of failure, the stack trace and state are directly related to the cause of the problem.",
        "difficulty": "medium"
      },
      {
        "id": "q-10-3-3",
        "question": "What is 'Robustness' in contrast to Fail-Fast?",
        "options": [
          "The ability to continue working even when errors occur (graceful degradation)",
          "Writing code that never has errors",
          "Using a very large server",
          "Encrypting all data"
        ],
        "correct": 0,
        "explanation": "While Fail-Fast is great for debugging and consistency, Robustness (or Fault Tolerance) is critical for high-availability systems.",
        "difficulty": "hard"
      }
    ],
    "10-4": [
      {
        "id": "q-10-4-1",
        "question": "What is the primary purpose of a 'Circuit Breaker' pattern?",
        "options": [
          "To prevent a remote service failure from cascading across the entire system",
          "To speed up database queries",
          "To encrypt network traffic",
          "To manage user authentication"
        ],
        "correct": 0,
        "explanation": "The circuit breaker monitors for failures and 'trips' to stop requests to a failing service, allowing it time to recover and protecting the caller.",
        "difficulty": "medium"
      },
      {
        "id": "q-10-4-2",
        "question": "What are the three states of a Circuit Breaker?",
        "options": [
          "Start, Stop, Pause",
          "Closed, Open, Half-Open",
          "Green, Yellow, Red",
          "Active, Idle, Error"
        ],
        "correct": 1,
        "explanation": "Closed (normal), Open (tripped/failing), and Half-Open (testing if the service has recovered).",
        "difficulty": "hard"
      },
      {
        "id": "q-10-4-3",
        "question": "When in the 'Open' state, what does a Circuit Breaker do?",
        "options": [
          "Forwards all requests to the service",
          "Immediately returns an error or a fallback without calling the service",
          "Retries the request 10 times",
          "Shuts down the calling application"
        ],
        "correct": 1,
        "explanation": "This prevents overloading the failing service and provides immediate feedback to the caller.",
        "difficulty": "medium"
      }
    ],
    "10-5": [
      {
        "id": "q-10-5-1",
        "question": "What is 'Exponential Backoff' in retry logic?",
        "options": [
          "Retrying immediately after a failure",
          "Waiting an increasing amount of time between retries (e.g., 1s, 2s, 4s...)",
          "Stopping retries after 2 attempts",
          "Only retrying on weekends"
        ],
        "correct": 1,
        "explanation": "Exponential backoff prevents 'thundering herd' problems where many clients overwhelm a recovering service.",
        "difficulty": "medium"
      },
      {
        "id": "q-10-5-2",
        "question": "What is 'Jitter' in the context of retries?",
        "options": [
          "Network latency",
          "Adding randomness to the delay intervals to avoid synchronized retries",
          "A type of syntax error",
          "The vibration of a hard drive"
        ],
        "correct": 1,
        "explanation": "Jitter ensures that multiple clients don't all retry at the exact same millisecond, spreading the load.",
        "difficulty": "hard"
      },
      {
        "id": "q-10-5-3",
        "question": "For which type of error should you definitely NOT retry?",
        "options": [
          "Network timeout",
          "404 Not Found or 400 Bad Request",
          "503 Service Unavailable",
          "Temporary database lock"
        ],
        "correct": 1,
        "explanation": "Retrying a 400-level error (client error) is pointless because the request itself is invalid or the resource is missing; retries should focus on transient 500-level errors.",
        "difficulty": "medium"
      }
    ],
    "10-6": [
      {
        "id": "q-10-6-1",
        "question": "What is 'Idempotency' in the context of error recovery?",
        "options": [
          "The ability to run an operation multiple times with the same result as running it once",
          "Ensuring an operation never fails",
          "The speed of an operation",
          "The memory usage of a process"
        ],
        "correct": 0,
        "explanation": "Idempotency is crucial for retries; if a network failure happens after a payment is processed but before the response is received, the retry shouldn't charge the user twice.",
        "difficulty": "hard"
      },
      {
        "id": "q-10-6-2",
        "question": "Which HTTP method is naturally idempotent?",
        "options": ["POST", "PUT", "PATCH (sometimes)", "GET, HEAD, OPTIONS, PUT, DELETE"],
        "correct": 3,
        "explanation": "Standard REST conventions define GET, PUT, and DELETE as idempotent, while POST is generally not.",
        "difficulty": "medium"
      },
      {
        "id": "q-10-6-3",
        "question": "How can you implement idempotency for a POST request?",
        "options": [
          "Using a unique 'Idempotency-Key' in the header",
          "By making the request faster",
          "By using a global lock",
          "It is not possible"
        ],
        "correct": 0,
        "explanation": "A unique key allows the server to identify and ignore duplicate requests caused by retries.",
        "difficulty": "medium"
      }
    ],
    "10-7": [
      {
        "id": "q-10-7-1",
        "question": "What is the 'Try-Catch-Finally' block used for?",
        "options": [
          "To speed up execution",
          "To handle exceptions and ensure cleanup code (like closing files) always runs",
          "To define new variables",
          "To replace all if-statements"
        ],
        "correct": 1,
        "explanation": "The 'finally' block executes regardless of whether an exception was thrown or caught, making it ideal for resource management.",
        "difficulty": "easy"
      },
      {
        "id": "q-10-7-2",
        "question": "What is a 'Checked Exception' (as seen in Java)?",
        "options": [
          "An exception that the compiler forces you to handle or declare",
          "An exception that only happens on Tuesdays",
          "A bug in the JVM",
          "An exception that is automatically fixed by the IDE"
        ],
        "correct": 0,
        "explanation": "Checked exceptions are part of the method signature and must be caught or propagated, though they are controversial and omitted in many newer languages.",
        "difficulty": "hard"
      },
      {
        "id": "q-10-7-3",
        "question": "Why is 'Catch-All' (catching generic Exception/Throwable) often discouraged?",
        "options": [
          "It makes the code too short",
          "It can hide unexpected bugs or system failures (like OutOfMemoryError) that shouldn't be caught",
          "It is not supported in JavaScript",
          "It makes the app run too fast"
        ],
        "correct": 1,
        "explanation": "Generic catch blocks can swallow errors that the code isn't actually prepared to handle, leading to unpredictable behavior.",
        "difficulty": "medium"
      }
    ],
    "10-8": [
      {
        "id": "q-10-8-1",
        "question": "What is 'Graceful Degradation'?",
        "options": [
          "The app crashing with a nice image",
          "The system maintaining limited functionality when some components fail",
          "Uninstalling the software",
          "Slowing down the server purposely"
        ],
        "correct": 1,
        "explanation": "Example: If a recommendation engine is down, the e-commerce site still allows users to search and buy products, just without personalized suggestions.",
        "difficulty": "medium"
      },
      {
        "id": "q-10-8-2",
        "question": "What is a 'Bulkhead' pattern?",
        "options": [
          "Partitioning resources (like thread pools) so that one failing component doesn't exhaust all resources for others",
          "A type of database index",
          "Using only heavy-duty servers",
          "The front part of a ship"
        ],
        "correct": 0,
        "explanation": "Like a ship's hull, bulkheads prevent one leak from sinking the entire vessel.",
        "difficulty": "hard"
      },
      {
        "id": "q-10-8-3",
        "question": "What is the 'Dead Letter Queue' (DLQ)?",
        "options": [
          "A place where deleted emails go",
          "A queue for messages that could not be processed successfully after multiple retries",
          "A list of retired developers",
          "The system trash bin"
        ],
        "correct": 1,
        "explanation": "DLQs allow developers to inspect and debug failed messages without blocking the main processing flow.",
        "difficulty": "medium"
      }
    ],
    "10-9": [
      {
        "id": "q-10-9-1",
        "question": "What should be included in a good error message for a developer?",
        "options": [
          "Just the word 'Error'",
          "Context of what failed, the input that caused it, and a stack trace if possible",
          "The developer's home address",
          "A funny joke to lighten the mood"
        ],
        "correct": 1,
        "explanation": "Detailed context is essential for rapid debugging and resolution.",
        "difficulty": "easy"
      },
      {
        "id": "q-10-9-2",
        "question": "What is 'Error Propagation'?",
        "options": [
          "Creating new errors on purpose",
          "Passing an error up the call stack to a level where it can be properly handled",
          "Automating the reporting of bugs",
          "The spread of viruses"
        ],
        "correct": 1,
        "explanation": "Sometimes a low-level function doesn't know how to recover, so it passes the error to its caller.",
        "difficulty": "medium"
      },
      {
        "id": "q-10-9-3",
        "question": "Why should you avoid returning 'null' to indicate an error?",
        "options": [
          "Null is not supported in modern languages",
          "It often leads to NullPointerExceptions if the caller forgets to check",
          "Null takes up too much memory",
          "Null is a reserved keyword for the OS"
        ],
        "correct": 1,
        "explanation": "Explicit error types or Option/Maybe types force the caller to acknowledge the possibility of failure.",
        "difficulty": "medium"
      }
    ],
    "10-10": [
      {
        "id": "q-10-10-1",
        "question": "What is 'Structured Logging'?",
        "options": [
          "Logging to a physical notebook",
          "Logging data in a machine-readable format like JSON instead of plain text strings",
          "Only logging on Mondays",
          "Logging using a specific font"
        ],
        "correct": 1,
        "explanation": "Structured logs are easily searchable and analyzable by tools like ELK or Splunk.",
        "difficulty": "medium"
      },
      {
        "id": "q-10-10-2",
        "question": "What is the difference between 'Error' and 'Warning' log levels?",
        "options": [
          "They are the same",
          "Errors indicate something broke; Warnings indicate something suspicious that didn't stop the operation",
          "Warnings are for users, Errors are for devs",
          "Errors are red, Warnings are blue"
        ],
        "correct": 1,
        "explanation": "Correct use of log levels helps filter noise and prioritize critical issues.",
        "difficulty": "easy"
      },
      {
        "id": "q-10-10-3",
        "question": "What is a 'Sentry' or 'LogRocket' used for?",
        "options": [
          "Automated error tracking and reporting in production",
          "To speed up the website",
          "To manage project tasks",
          "To write code automatically"
        ],
        "correct": 0,
        "explanation": "These tools capture exceptions in real-time and provide detailed reports for developers.",
        "difficulty": "easy"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch10-1",
      "question": "Which pattern is most effective for preventing a single service failure from bringing down an entire microservices architecture?",
      "options": ["Singleton", "Circuit Breaker", "Factory", "Observer"],
      "correct": 1,
      "explanation": "Circuit breakers isolate failures and provide fallbacks.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch10-2",
      "question": "What is the primary drawback of using 'Checked Exceptions'?",
      "options": [
        "They are too slow",
        "They lead to 'swallowed' exceptions or bloated method signatures (exception tunneling)",
        "They are not type-safe",
        "They only work for integers"
      ],
      "correct": 1,
      "explanation": "Checked exceptions often lead developers to write empty catch blocks just to satisfy the compiler.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch10-3",
      "question": "In the context of distributed systems, what does 'At-least-once' delivery imply?",
      "options": [
        "Messages are never lost, but may be duplicated",
        "Messages are sent exactly once",
        "Messages are sent only if the user is online",
        "Messages are deleted after being read"
      ],
      "correct": 0,
      "explanation": "At-least-once requires the receiver to be idempotent to handle potential duplicates.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch10-4",
      "question": "What is a 'Sentinel Value'?",
      "options": [
        "A special value (like -1 or null) used to indicate an error or special condition",
        "A guard at the data center",
        "A high-priority thread",
        "A type of encryption key"
      ],
      "correct": 0,
      "explanation": "Sentinel values are a common but often fragile way to signal errors (e.g., indexOf returning -1).",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch10-5",
      "question": "Which of these is a core benefit of 'Result' types (as in Rust or Swift)?",
      "options": [
        "They make the code run faster",
        "They force the programmer to explicitly handle the error case",
        "They allow for global error handling",
        "They remove the need for functions"
      ],
      "correct": 1,
      "explanation": "The type system ensures the error case is not ignored, improving reliability.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch10-6",
      "question": "What is the purpose of 'Transaction Outbox' pattern?",
      "options": [
        "To delete emails",
        "To ensure atomic updates to a database and a message queue",
        "To speed up UI rendering",
        "To manage user sessions"
      ],
      "correct": 1,
      "explanation": "It prevents the situation where a DB update succeeds but the notification to other services fails.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch10-7",
      "question": "What is 'Saga' pattern used for?",
      "options": [
        "To tell stories to developers",
        "Managing distributed transactions across multiple services using a sequence of local transactions",
        "To replace Git",
        "To optimize CSS"
      ],
      "correct": 1,
      "explanation": "Sagas provide a way to maintain data consistency in microservices without using slow 2PC (Two-Phase Commit).",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch10-8",
      "question": "What does 'Observability' include beyond just logging?",
      "options": [
        "Metrics, Tracing, and Logging (The Three Pillars)",
        "Only looking at the code",
        "Watching the users through a camera",
        "Checking the server temperature"
      ],
      "correct": 0,
      "explanation": "Observability provides a deep understanding of the system's internal state through external telemetry.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch10-9",
      "question": "What is 'Chaos Engineering'?",
      "options": [
        "Deleting the production database by mistake",
        "Intentionally introducing failures into a system to test its resilience",
        "Coding without a plan",
        "A type of encryption algorithm"
      ],
      "correct": 1,
      "explanation": "Practiced by companies like Netflix (Chaos Monkey), it helps uncover hidden weaknesses in distributed systems.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch10-10",
      "question": "Why is 'Panic' (or fatal crash) sometimes the correct way to handle an error?",
      "options": [
        "To scare the users",
        "When the system reaches an unrecoverable state where continuing would cause data corruption",
        "When the developer is frustrated",
        "To save electricity"
      ],
      "correct": 1,
      "explanation": "Crashing is better than corrupting the database or continuing in an undefined/insecure state.",
      "difficulty": "hard"
    }
  ]
};
