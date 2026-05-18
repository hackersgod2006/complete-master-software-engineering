import { ChapterQuizData } from "../quizTypes";

export const CH16_QUIZ: ChapterQuizData = {
  "chapterId": "ch16",
  "sectionQuizzes": {
    "16-1": [
      {
        "id": "q-16-1-1",
        "question": "What is the main difference between a Process and a Thread?",
        "options": [
          "Processes share memory; Threads have private memory",
          "Threads share memory within the same process; Processes have separate memory spaces",
          "Threads are heavier than processes",
          "A process can only have one thread"
        ],
        "correct": 1,
        "explanation": "Threads are lighter-weight units of execution that exist within a process and share its resources.",
        "difficulty": "easy"
      },
      {
        "id": "q-16-1-2",
        "question": "What is 'Concurrency' in software engineering?",
        "options": [
          "Executing multiple tasks at the exact same time on different CPUs",
          "The ability to handle multiple tasks by overlapping their execution",
          "Running a single task as fast as possible",
          "Having multiple users on a system"
        ],
        "correct": 1,
        "explanation": "Concurrency is about structure—managing many tasks at once, which may or may not run in parallel.",
        "difficulty": "medium"
      },
      {
        "id": "q-16-1-3",
        "question": "What is 'Parallelism'?",
        "options": [
          "Handling multiple requests on a single CPU",
          "Executing multiple tasks simultaneously on multiple processors or cores",
          "Writing code that is easy to read",
          "Linking multiple servers together"
        ],
        "correct": 1,
        "explanation": "Parallelism is about execution—physically doing multiple things at the same time.",
        "difficulty": "medium"
      }
    ],
    "16-2": [
      {
        "id": "q-16-2-1",
        "question": "What is a 'Race Condition'?",
        "options": [
          "When two developers try to commit code at the same time",
          "When the outcome of a program depends on the unpredictable timing or sequence of events",
          "A competition between different algorithms to see which is faster",
          "When a program runs too fast for the user"
        ],
        "correct": 1,
        "explanation": "Race conditions occur when multiple threads access shared data and at least one write is involved without proper synchronization.",
        "difficulty": "medium"
      },
      {
        "id": "q-16-2-2",
        "question": "Which of these is a common symptom of a race condition?",
        "options": [
          "Consistent, repeatable errors every time the program runs",
          "Intermittent bugs that are hard to reproduce",
          "The program always crashing on startup",
          "High CPU usage even when the program is idle"
        ],
        "correct": 1,
        "explanation": "Because they depend on timing, race conditions are notoriously difficult to debug and reproduce ('Heisenbugs').",
        "difficulty": "medium"
      },
      {
        "id": "q-16-2-3",
        "question": "How can you prevent a race condition on a shared counter?",
        "options": [
          "By using a global variable",
          "By using Synchronization primitives like Mutexes or Atomic operations",
          "By making the counter a floating-point number",
          "By running the code on a faster computer"
        ],
        "correct": 1,
        "explanation": "Synchronization ensures that only one thread can modify the shared state at a time or that the operation is indivisible.",
        "difficulty": "easy"
      }
    ],
    "16-3": [
      {
        "id": "q-16-3-1",
        "question": "What is a 'Mutex' (Mutual Exclusion)?",
        "options": [
          "A type of data structure for storing strings",
          "A synchronization primitive that allows only one thread to access a resource at a time",
          "A way to run multiple processes in parallel",
          "A debugging tool for threads"
        ],
        "correct": 1,
        "explanation": "A mutex acts as a lock; a thread must 'acquire' it before accessing a shared resource and 'release' it when finished.",
        "difficulty": "easy"
      },
      {
        "id": "q-16-3-2",
        "question": "What is the difference between a Mutex and a Semaphore?",
        "options": [
          "A Mutex is for files; a Semaphore is for memory",
          "A Mutex allows only one thread; a Semaphore can allow a specified number of threads",
          "A Semaphore is a type of Mutex",
          "There is no difference"
        ],
        "correct": 1,
        "explanation": "Semaphores are essentially counters that can allow N threads to access a pool of resources.",
        "difficulty": "medium"
      },
      {
        "id": "q-16-3-3",
        "question": "What is a 'Reentrant' (or Recursive) Lock?",
        "options": [
          "A lock that can be acquired multiple times by the same thread without causing a deadlock",
          "A lock that automatically unlocks after a certain time",
          "A lock that can be held by multiple threads at once",
          "A lock used only in recursive functions"
        ],
        "correct": 0,
        "explanation": "Reentrant locks allow the owner of the lock to enter other synchronized blocks guarded by the same lock.",
        "difficulty": "hard"
      }
    ],
    "16-4": [
      {
        "id": "q-16-4-1",
        "question": "What is a 'Deadlock'?",
        "options": [
          "A thread that has finished its execution",
          "A situation where two or more threads are blocked forever, each waiting for the other to release a resource",
          "A bug that causes the computer to restart",
          "An infinite loop in a single thread"
        ],
        "correct": 1,
        "explanation": "Deadlock is a 'circular wait' condition where progress is impossible.",
        "difficulty": "medium"
      },
      {
        "id": "q-16-4-2",
        "question": "Which of these is one of the four necessary conditions for deadlock (Coffman conditions)?",
        "options": [
          "Preemption",
          "Circular Wait",
          "Shared Memory",
          "High Priority"
        ],
        "correct": 1,
        "explanation": "The four conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
        "difficulty": "hard"
      },
      {
        "id": "q-16-4-3",
        "question": "How can you prevent deadlocks in a system with multiple locks?",
        "options": [
          "Always acquire locks in a consistent, predefined order",
          "Never use more than one lock",
          "Make all threads run at the same priority",
          "Use as many locks as possible to increase granularity"
        ],
        "correct": 0,
        "explanation": "Enforcing a global lock ordering is a primary strategy for avoiding circular wait conditions.",
        "difficulty": "medium"
      }
    ],
    "16-5": [
      {
        "id": "q-16-5-1",
        "question": "What is an 'Atomic Operation'?",
        "options": [
          "An operation that uses a lot of CPU power",
          "An operation that appears to happen instantaneously and cannot be interrupted by other threads",
          "A function that works with subatomic particles",
          "An operation that only works on integers"
        ],
        "correct": 1,
        "explanation": "Atomic operations are indivisible; other threads see the state either before or after the operation, never in between.",
        "difficulty": "medium"
      },
      {
        "id": "q-16-5-2",
        "question": "What is 'Compare-And-Swap' (CAS)?",
        "options": [
          "A sorting algorithm",
          "An atomic instruction used in multithreading to achieve synchronization without locks",
          "A way to swap two variables in memory",
          "A type of deadlock detection"
        ],
        "correct": 1,
        "explanation": "CAS checks if a memory location has a certain value and, if so, updates it to a new value atomically.",
        "difficulty": "hard"
      },
      {
        "id": "q-16-5-3",
        "question": "What is the 'ABA Problem' in concurrent programming?",
        "options": [
          "A simple race condition between two threads",
          "A situation where a value changes from A to B and back to A, potentially tricking a CAS operation",
          "A naming convention for threads",
          "An error caused by using the letters A and B as variable names"
        ],
        "correct": 1,
        "explanation": "The ABA problem can occur in lock-free algorithms where a node is reused, making a CAS succeed when it shouldn't have.",
        "difficulty": "hard"
      }
    ],
    "16-6": [
      {
        "id": "q-16-6-1",
        "question": "What is a 'Lock-Free' data structure?",
        "options": [
          "A data structure that doesn't use any memory",
          "A data structure that guarantees at least one thread will make progress in a finite number of steps",
          "A data structure that is not thread-safe",
          "A data structure that uses global locks instead of local ones"
        ],
        "correct": 1,
        "explanation": "Lock-free structures use atomic operations instead of traditional locks to avoid issues like deadlock and priority inversion.",
        "difficulty": "hard"
      },
      {
        "id": "q-16-6-2",
        "question": "What is 'Wait-Free' synchronization?",
        "options": [
          "When threads never have to wait for I/O",
          "A stronger guarantee than lock-free, where every thread is guaranteed to finish in a finite number of steps",
          "Allowing threads to run without any synchronization",
          "Using a faster CPU to reduce waiting"
        ],
        "correct": 1,
        "explanation": "Wait-free is the strongest progress guarantee, ensuring that no thread is ever starved by others.",
        "difficulty": "hard"
      },
      {
        "id": "q-16-6-3",
        "question": "What is a major challenge of writing lock-free code?",
        "options": [
          "It is too slow",
          "It is extremely difficult to design correctly and prone to subtle bugs",
          "It only works on single-core processors",
          "It requires special hardware that doesn't exist"
        ],
        "correct": 1,
        "explanation": "Lock-free programming requires deep understanding of memory models and atomic primitives.",
        "difficulty": "medium"
      }
    ],
    "16-7": [
      {
        "id": "q-16-7-1",
        "question": "What is the 'Actor Model' of concurrency?",
        "options": [
          "Using famous actors to promote your software",
          "A model where 'actors' are the universal primitives that communicate via asynchronous message passing",
          "A way to structure code using only objects and methods",
          "A design pattern for user interfaces"
        ],
        "correct": 1,
        "explanation": "In the Actor Model, actors have private state and don't share memory, avoiding locks entirely.",
        "difficulty": "medium"
      },
      {
        "id": "q-16-7-2",
        "question": "In the Actor Model, how do two actors interact?",
        "options": [
          "By calling each other's public methods",
          "By sending immutable messages to each other's mailboxes",
          "By sharing a common database",
          "By modifying a global variable"
        ],
        "correct": 1,
        "explanation": "Communication is strictly through asynchronous messaging.",
        "difficulty": "medium"
      },
      {
        "id": "q-16-7-3",
        "question": "Which programming language is famous for its implementation of the Actor Model?",
        "options": [
          "Erlang",
          "C",
          "PHP",
          "JavaScript"
        ],
        "correct": 0,
        "explanation": "Erlang (and Elixir) use the Actor Model to build highly available, distributed systems.",
        "difficulty": "easy"
      }
    ],
    "16-8": [
      {
        "id": "q-16-8-1",
        "question": "What does CSP stand for in the context of concurrency?",
        "options": [
          "Concurrent System Protocol",
          "Communicating Sequential Processes",
          "Centralized Security Policy",
          "Code Structure Pattern"
        ],
        "correct": 1,
        "explanation": "CSP is a formal language for describing patterns of interaction in concurrent systems, popularized by Go's channels.",
        "difficulty": "medium"
      },
      {
        "id": "q-16-8-2",
        "question": "What is a 'Channel' in Go (Golang)?",
        "options": [
          "A way to stream video data",
          "A typed conduit through which concurrent goroutines communicate",
          "A type of network socket",
          "A list of available threads"
        ],
        "correct": 1,
        "explanation": "Channels allow goroutines to synchronize and exchange data without explicit locks.",
        "difficulty": "easy"
      },
      {
        "id": "q-16-8-3",
        "question": "What is the core philosophy of Go's concurrency model?",
        "options": [
          "Share memory to communicate",
          "Do not communicate by sharing memory; instead, share memory by communicating",
          "Use as many locks as possible",
          "Avoid concurrency at all costs"
        ],
        "correct": 1,
        "explanation": "This philosophy encourages using channels to pass ownership of data rather than using locks to guard shared data.",
        "difficulty": "medium"
      }
    ],
    "16-9": [
      {
        "id": "q-16-9-1",
        "question": "What is 'Priority Inversion'?",
        "options": [
          "When a low-priority thread holds a lock needed by a high-priority thread",
          "When a program runs slower than expected",
          "When a thread's priority is changed by the user",
          "When all threads are given the same priority"
        ],
        "correct": 0,
        "explanation": "This can lead to a high-priority task being blocked by a lower-priority one, sometimes indefinitely if a medium-priority task takes over the CPU.",
        "difficulty": "hard"
      },
      {
        "id": "q-16-9-2",
        "question": "What is 'Livelock'?",
        "options": [
          "A deadlock that happens in a live production environment",
          "A situation where threads keep changing their state in response to each other, but none make progress",
          "A thread that is very active but does nothing useful",
          "A type of high-performance lock"
        ],
        "correct": 1,
        "explanation": "Livelock is like two people trying to pass each other in a hallway and both stepping to the same side repeatedly.",
        "difficulty": "medium"
      },
      {
        "id": "q-16-9-3",
        "question": "What is a 'Thread Pool'?",
        "options": [
          "A collection of all threads currently running on a computer",
          "A managed set of worker threads that are reused to perform tasks",
          "A memory area where threads store their data",
          "A debugging tool for visualizing thread activity"
        ],
        "correct": 1,
        "explanation": "Thread pools avoid the overhead of creating and destroying threads for every task.",
        "difficulty": "easy"
      }
    ],
    "16-10": [
      {
        "id": "q-16-10-1",
        "question": "What is a 'Future' or 'Promise' in concurrent programming?",
        "options": [
          "A placeholder for a result that will be available later",
          "A guarantee that a program will never crash",
          "A way to schedule a task to run in the future",
          "A type of documentation for async code"
        ],
        "correct": 0,
        "explanation": "Promises/Futures allow code to continue executing while waiting for an asynchronous operation to complete.",
        "difficulty": "easy"
      },
      {
        "id": "q-16-10-2",
        "question": "What is 'False Sharing' in multi-core systems?",
        "options": [
          "When two users share the same account",
          "When threads on different cores update different variables that happen to be on the same cache line",
          "When a program reports that it is using multiple cores but it isn't",
          "When a lock is shared between too many threads"
        ],
        "correct": 1,
        "explanation": "False sharing causes significant performance degradation as cores fight for ownership of the same cache line.",
        "difficulty": "hard"
      },
      {
        "id": "q-16-10-3",
        "question": "What is 'Thread-Local Storage' (TLS)?",
        "options": [
          "Storing thread data on a local hard drive",
          "Data that is unique and private to each individual thread",
          "A way to share data between threads on the same machine",
          "The memory space used by the main thread"
        ],
        "correct": 1,
        "explanation": "TLS provides a way to have global variables that have a different value for each thread.",
        "difficulty": "medium"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch16-1",
      "question": "Which of these is NOT a necessary condition for a deadlock to occur?",
      "options": ["Mutual Exclusion", "Circular Wait", "Preemption", "Hold and Wait"],
      "correct": 2,
      "explanation": "Deadlock requires 'No Preemption'. If you can preempt (forcefully take away) a resource, you can break the deadlock.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch16-2",
      "question": "What is the primary advantage of the Actor Model over shared-memory concurrency?",
      "options": [
        "It is faster on single-core systems",
        "It eliminates the need for manual locking and prevents many types of race conditions",
        "It uses less memory",
        "It is easier to write in C++"
      ],
      "correct": 1,
      "explanation": "By avoiding shared state, the Actor Model removes the complexity of managing locks and synchronization.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch16-3",
      "question": "What does an 'AtomicInteger' provide in Java or similar languages?",
      "options": [
        "An integer that can only hold positive values",
        "Thread-safe operations (like increment) without using explicit synchronized blocks",
        "An integer that is stored in the CPU's registers",
        "A way to store very large numbers"
      ],
      "correct": 1,
      "explanation": "Atomic types use hardware-level atomic instructions (like CAS) to ensure thread-safety efficiently.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch16-4",
      "question": "What is a 'Spinlock'?",
      "options": [
        "A lock that rotates between different threads",
        "A lock where the thread repeatedly checks if the lock is available in a loop (busy-waiting)",
        "A lock that is only used for high-speed graphics",
        "A lock that automatically releases after one 'spin' of the CPU"
      ],
      "correct": 1,
      "explanation": "Spinlocks are efficient if the wait is very short, but they waste CPU if the lock is held for a long time.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch16-5",
      "question": "In the context of threads, what is a 'Context Switch'?",
      "options": [
        "Changing the programming language of a project",
        "The process of storing and restoring the state of a CPU so that multiple processes can share a single CPU resource",
        "Moving a thread from one CPU core to another",
        "Switching between dark mode and light mode in an IDE"
      ],
      "correct": 1,
      "explanation": "Context switches have overhead; having too many threads can lead to 'thrashing' where the CPU spends more time switching than doing real work.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch16-6",
      "question": "What is a 'Race Condition'?",
      "options": [
        "A bug that only happens on fast computers",
        "When the behavior of a program depends on the relative timing of threads",
        "A situation where two threads are running as fast as they can",
        "When a program finishes earlier than expected"
      ],
      "correct": 1,
      "explanation": "Race conditions are a fundamental source of bugs in concurrent systems.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch16-7",
      "question": "What is the purpose of a 'Read-Write Lock'?",
      "options": [
        "To allow only one reader or one writer at a time",
        "To allow multiple concurrent readers, but exclusive access for writers",
        "To make sure every read is followed by a write",
        "To encrypt data as it is being read or written"
      ],
      "correct": 1,
      "explanation": "Read-Write locks improve performance in scenarios where reads are much more frequent than writes.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch16-8",
      "question": "What is 'Starvation' in concurrency?",
      "options": [
        "When the computer runs out of power",
        "When a thread is perpetually denied the resources it needs to make progress",
        "When the CPU is idle for too long",
        "When a thread consumes too much memory"
      ],
      "correct": 1,
      "explanation": "Starvation often happens due to unfair scheduling or poorly designed priority systems.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch16-9",
      "question": "What is the 'Main Thread' in most GUI applications?",
      "options": [
        "The thread that handles all background network requests",
        "The thread responsible for handling user input and updating the UI",
        "The thread that monitors the health of other threads",
        "The thread that has the highest priority"
      ],
      "correct": 1,
      "explanation": "Blocking the main thread makes the UI unresponsive ('freezing').",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch16-10",
      "question": "What is 'Fork/Join' parallelism?",
      "options": [
        "A way to eat lunch while coding",
        "A strategy where a task is recursively split into smaller subtasks (fork) and then their results are combined (join)",
        "A way to merge two different git branches",
        "Running the same program on two different servers"
      ],
      "correct": 1,
      "explanation": "Fork/Join is a common pattern for parallelizing divide-and-conquer algorithms.",
      "difficulty": "medium"
    }
  ]
};
