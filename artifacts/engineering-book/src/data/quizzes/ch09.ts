import { ChapterQuizData } from "../quizTypes";

export const CH09_QUIZ: ChapterQuizData = {
  "chapterId": "ch9",
  "sectionQuizzes": {
    "9-1": [
      {
        "id": "q-9-1-1",
        "question": "What is the primary goal of meaningful naming in software engineering?",
        "options": [
          "To reduce the number of characters in the source code",
          "To ensure the code can be easily obfuscated",
          "To communicate intent and reduce the cognitive load for future maintainers",
          "To satisfy the compiler's requirements for unique identifiers"
        ],
        "correct": 2,
        "explanation": "Meaningful names reveal intent, making the code self-documenting and easier for others to understand without extensive comments.",
        "difficulty": "easy"
      },
      {
        "id": "q-9-1-2",
        "question": "Which of the following is considered a 'bad smell' in naming?",
        "options": [
          "Using domain-specific terminology",
          "Encoded type information like 'strName' or 'iCount' (Hungarian notation)",
          "Descriptive method names like 'calculateMonthlyTax'",
          "Using nouns for class names and verbs for method names"
        ],
        "correct": 1,
        "explanation": "Hungarian notation and other type-encoding prefixes are generally discouraged in modern, type-safe languages as they add clutter without providing additional value.",
        "difficulty": "medium"
      },
      {
        "id": "q-9-1-3",
        "question": "When naming a boolean variable, which prefix is most commonly recommended for clarity?",
        "options": [
          "get",
          "do",
          "is/has/should",
          "set"
        ],
        "correct": 2,
        "explanation": "Prefixes like 'is', 'has', or 'should' clearly indicate that the variable represents a state or condition, returning a boolean value.",
        "difficulty": "easy"
      }
    ],
    "9-2": [
      {
        "id": "q-9-2-1",
        "question": "According to the Single Responsibility Principle (SRP) applied to functions, what should a function do?",
        "options": [
          "Perform at least three related tasks to improve efficiency",
          "Handle both the business logic and the UI rendering",
          "Do one thing and do it well",
          "Include comprehensive error handling and logging in every block"
        ],
        "correct": 2,
        "explanation": "SRP at the function level means a function should have one reason to change and should focus on a single, well-defined task.",
        "difficulty": "easy"
      },
      {
        "id": "q-9-2-2",
        "question": "What is the recommended maximum number of arguments for a function to maintain readability?",
        "options": [
          "As many as needed to avoid global state",
          "Ideally zero, one, or two; three requires strong justification",
          "Exactly five",
          "There is no limit if the function is well-documented"
        ],
        "correct": 1,
        "explanation": "Fewer arguments make functions easier to understand, test, and call. If more than three are needed, it often indicates the need for an object or data structure.",
        "difficulty": "medium"
      },
      {
        "id": "q-9-2-3",
        "question": "What is 'Flag Argument' in the context of function design?",
        "options": [
          "A boolean passed to a function to change its internal logic flow",
          "A bitwise flag used for performance optimization",
          "A global variable used to signal errors",
          "A naming convention for private functions"
        ],
        "correct": 0,
        "explanation": "Flag arguments are generally considered a code smell because they indicate that the function is doing more than one thing (one path for true, another for false).",
        "difficulty": "medium"
      }
    ],
    "9-3": [
      {
        "id": "q-9-3-1",
        "question": "When are comments most appropriate in 'clean' code?",
        "options": [
          "To explain every line of logic",
          "To apologize for poor naming choices",
          "To explain 'why' a non-obvious decision was made, rather than 'what' the code does",
          "To keep track of version history before Git was used"
        ],
        "correct": 2,
        "explanation": "Comments should provide context or explain technical debt/rationale that the code itself cannot convey.",
        "difficulty": "easy"
      },
      {
        "id": "q-9-3-2",
        "question": "What is a 'TODO' comment used for?",
        "options": [
          "To mark code that should be deleted immediately",
          "To document a permanent feature of the system",
          "To note work that needs to be done in the future but isn't ready yet",
          "To list the authors of the file"
        ],
        "correct": 2,
        "explanation": "TODO comments are placeholders for future improvements or missing functionality, though they should be tracked in a proper backlog.",
        "difficulty": "easy"
      },
      {
        "id": "q-9-3-3",
        "question": "Why is 'Commented-out code' considered a code smell?",
        "options": [
          "It makes the file size significantly larger",
          "It creates confusion about why it's there and if it's still needed",
          "It slows down the compilation process",
          "It is required by some regulatory standards"
        ],
        "correct": 1,
        "explanation": "Version control systems (like Git) handle history. Commented-out code litters the codebase and leaves future readers wondering if they should restore it.",
        "difficulty": "medium"
      }
    ],
    "9-4": [
      {
        "id": "q-9-4-1",
        "question": "What does 'Cognitive Complexity' measure in a codebase?",
        "options": [
          "The number of lines of code",
          "How difficult it is for a human to understand the flow of the code",
          "The memory usage of the application",
          "The number of classes in the project"
        ],
        "correct": 1,
        "explanation": "Cognitive complexity focuses on how hard it is for a developer to follow the logic, considering nesting, branching, and non-linear jumps.",
        "difficulty": "medium"
      },
      {
        "id": "q-9-4-2",
        "question": "Which of the following increases Cyclomatic Complexity?",
        "options": [
          "Adding more comments",
          "Increasing the number of independent paths through the code (e.g., if/else, loops)",
          "Renaming a variable to a longer name",
          "Moving code from one file to another"
        ],
        "correct": 1,
        "explanation": "Cyclomatic complexity is a quantitative measure of the number of linearly independent paths through a program's source code.",
        "difficulty": "medium"
      },
      {
        "id": "q-9-4-3",
        "question": "What is a common technique to reduce nesting levels (and thus cognitive complexity)?",
        "options": [
          "Using more global variables",
          "Using 'Guard Clauses' to return early",
          "Combining multiple conditions into one large 'if' statement",
          "Increasing the indentation size"
        ],
        "correct": 1,
        "explanation": "Guard clauses allow you to handle edge cases or errors early, keeping the 'happy path' at the lowest indentation level.",
        "difficulty": "hard"
      }
    ],
    "9-5": [
      {
        "id": "q-9-5-1",
        "question": "What does the DRY principle stand for?",
        "options": [
          "Document Rarely, Yield often",
          "Don't Repeat Yourself",
          "Data Retrieval Yield",
          "Debug Rapidly Yearly"
        ],
        "correct": 1,
        "explanation": "DRY aims to reduce repetition of software patterns, replacing it with abstractions or using data normalization.",
        "difficulty": "easy"
      },
      {
        "id": "q-9-5-2",
        "question": "Is all code duplication always bad?",
        "options": [
          "Yes, duplication should always be abstracted immediately",
          "No, 'Rule of Three' suggests waiting for the third instance before abstracting",
          "Yes, it's the only rule in software engineering",
          "No, duplicating code is faster for the CPU"
        ],
        "correct": 1,
        "explanation": "Premature abstraction can be worse than duplication. The Rule of Three suggests that abstraction is justified when the same pattern appears for the third time.",
        "difficulty": "medium"
      },
      {
        "id": "q-9-5-3",
        "question": "What is 'WET' code in relation to DRY?",
        "options": [
          "Working Every Time",
          "Write Everything Twice",
          "Web Enhanced Technology",
          "Window Environment Tool"
        ],
        "correct": 1,
        "explanation": "WET is the opposite of DRY, meaning you are repeating yourself instead of abstracting logic.",
        "difficulty": "easy"
      }
    ],
    "9-6": [
      {
        "id": "q-9-6-1",
        "question": "What is the Single Responsibility Principle (SRP) primarily about?",
        "options": [
          "Ensuring a class has only one method",
          "Ensuring a module or class has only one reason to change",
          "Ensuring only one developer works on a file",
          "Ensuring the app only performs one function for the user"
        ],
        "correct": 1,
        "explanation": "SRP states that a class should be responsible for one specific part of functionality, and that responsibility should be entirely encapsulated by the class.",
        "difficulty": "medium"
      },
      {
        "id": "q-9-6-2",
        "question": "Which of the following is a symptom of violating SRP?",
        "options": [
          "Small, focused classes",
          "High cohesion within a class",
          "A 'God Object' that knows and does everything",
          "Frequent use of dependency injection"
        ],
        "correct": 2,
        "explanation": "God Objects are classes that have grown too large and take on too many responsibilities, violating SRP.",
        "difficulty": "medium"
      },
      {
        "id": "q-9-6-3",
        "question": "How does SRP benefit testing?",
        "options": [
          "It makes tests run faster",
          "It makes classes easier to mock and unit test because they have a clear, limited scope",
          "It eliminates the need for integration testing",
          "It allows testing without a compiler"
        ],
        "correct": 1,
        "explanation": "Smaller, focused classes with single responsibilities are significantly easier to isolate and test than large, complex ones.",
        "difficulty": "medium"
      }
    ],
    "9-7": [
      {
        "id": "q-9-7-1",
        "question": "What is a 'Long Method' code smell?",
        "options": [
          "A method that takes a long time to execute",
          "A method name that exceeds 50 characters",
          "A method that contains too many lines of code and likely does too many things",
          "A method that is only called once"
        ],
        "correct": 2,
        "explanation": "Long methods are hard to understand, maintain, and test. They usually violate SRP.",
        "difficulty": "easy"
      },
      {
        "id": "q-9-7-2",
        "question": "What is 'Shotgun Surgery'?",
        "options": [
          "A fast way to fix bugs in production",
          "A smell where one change requires small edits to many different classes",
          "Using automated tools to refactor code",
          "Deleting large chunks of unused code"
        ],
        "correct": 1,
        "explanation": "Shotgun surgery occurs when responsibilities are leaked across many classes, making the system brittle and hard to change.",
        "difficulty": "hard"
      },
      {
        "id": "q-9-7-3",
        "question": "What does 'Feature Envy' describe?",
        "options": [
          "A developer wanting to work on a more interesting project",
          "A method that seems more interested in the data of another class than its own",
          "A product manager requesting too many features",
          "A system that has more features than its competitors"
        ],
        "correct": 1,
        "explanation": "Feature envy is a code smell where a method frequently accesses the data or methods of another object, suggesting it might belong in that other object.",
        "difficulty": "medium"
      }
    ],
    "9-8": [
      {
        "id": "q-9-8-1",
        "question": "Which principle suggests that 'entities should be open for extension but closed for modification'?",
        "options": [
          "Liskov Substitution Principle",
          "Open-Closed Principle (OCP)",
          "Interface Segregation Principle",
          "Dependency Inversion Principle"
        ],
        "correct": 1,
        "explanation": "OCP allows you to add new functionality without changing existing code, usually through polymorphism or inheritance.",
        "difficulty": "medium"
      },
      {
        "id": "q-9-8-2",
        "question": "What is the 'Law of Demeter'?",
        "options": [
          "Only use one variable per line",
          "A principle of least knowledge: an object should only talk to its immediate neighbors",
          "Every class must have an interface",
          "Do not use static methods"
        ],
        "correct": 1,
        "explanation": "The Law of Demeter (or Principle of Least Knowledge) reduces coupling by restricting which objects a method can call.",
        "difficulty": "hard"
      },
      {
        "id": "q-9-8-3",
        "question": "What is 'Primitive Obsession'?",
        "options": [
          "A preference for assembly language",
          "Using basic data types (int, string) to represent complex domain concepts (Email, Money)",
          "Refusing to use modern IDEs",
          "Avoiding the use of objects entirely"
        ],
        "correct": 1,
        "explanation": "Primitive obsession makes code less type-safe and harder to validate. Using Value Objects is the standard solution.",
        "difficulty": "medium"
      }
    ],
    "9-9": [
      {
        "id": "q-9-9-1",
        "question": "What is the 'Boy Scout Rule' in software engineering?",
        "options": [
          "Always wear a uniform while coding",
          "Always leave the code a little cleaner than you found it",
          "Be prepared for every possible error",
          "Help other developers with their tasks"
        ],
        "correct": 1,
        "explanation": "Coined by Uncle Bob, this rule encourages continuous refactoring and maintenance to prevent technical debt accumulation.",
        "difficulty": "easy"
      },
      {
        "id": "q-9-9-2",
        "question": "What is 'Refactoring'?",
        "options": [
          "Rewriting the code from scratch in a new language",
          "Changing the internal structure of code without changing its external behavior",
          "Adding new features to an existing system",
          "Optimizing code for the fastest possible execution"
        ],
        "correct": 1,
        "explanation": "Refactoring improves the design of existing code while preserving its functionality, making it easier to maintain and extend.",
        "difficulty": "easy"
      },
      {
        "id": "q-9-9-3",
        "question": "Why are 'Magic Numbers' or 'Magic Strings' bad?",
        "options": [
          "They are too difficult to type",
          "They lack context and make it hard to understand what the value represents",
          "They cause memory leaks in some environments",
          "They are not supported by compilers"
        ],
        "correct": 1,
        "explanation": "Magic values should be replaced with named constants to provide clarity and a single point of change.",
        "difficulty": "easy"
      }
    ],
    "9-10": [
      {
        "id": "q-9-10-1",
        "question": "What is the relationship between 'Clean Code' and 'Technical Debt'?",
        "options": [
          "They are unrelated concepts",
          "Clean code is the primary way to prevent and pay down technical debt",
          "Technical debt is required to write clean code",
          "Clean code increases technical debt by taking longer to write"
        ],
        "correct": 1,
        "explanation": "Clean code practices ensure the system remains maintainable, reducing the long-term 'interest' paid on messy code (technical debt).",
        "difficulty": "medium"
      },
      {
        "id": "q-9-10-2",
        "question": "Which of these is a key benefit of 'Small Methods'?",
        "options": [
          "They are easier to name effectively",
          "They are easier to reuse",
          "They are easier to test",
          "All of the above"
        ],
        "correct": 3,
        "explanation": "Small methods typically focus on one thing, making them easier to understand, name, test, and reuse.",
        "difficulty": "easy"
      },
      {
        "id": "q-9-10-3",
        "question": "What is the main drawback of over-engineering code for the sake of 'purity'?",
        "options": [
          "It makes the code too easy to read",
          "It can introduce unnecessary complexity and make the system harder to navigate (YAGNI violation)",
          "It reduces the number of files in the project",
          "It prevents the use of design patterns"
        ],
        "correct": 1,
        "explanation": "Over-engineering or 'speculative generality' can lead to complex abstractions that aren't actually needed, making the codebase more difficult than it needs to be.",
        "difficulty": "hard"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch9-1",
      "question": "Which principle states that you should not add functionality until it is actually needed?",
      "options": ["DRY", "YAGNI (You Ain't Gonna Need It)", "SRP", "KISS"],
      "correct": 1,
      "explanation": "YAGNI discourages adding features or abstractions based on future predictions that may never materialize.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch9-2",
      "question": "A class that does both 'logging' and 'database access' violates which principle?",
      "options": ["OCP", "LSP", "SRP", "DIP"],
      "correct": 2,
      "explanation": "These are two distinct responsibilities (cross-cutting concern and data persistence), so they should be in separate classes per SRP.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch9-3",
      "question": "What is the 'Rule of Three' in the context of DRY?",
      "options": [
        "Never have more than 3 arguments in a function",
        "Only refactor after you've seen the same pattern 3 times",
        "Wait for 3 developers to approve a PR",
        "A class should not exceed 300 lines"
      ],
      "correct": 1,
      "explanation": "The Rule of Three is a rule of thumb for refactoring to avoid premature abstraction.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch9-4",
      "question": "Which of the following naming styles is generally preferred for classes in most OO languages?",
      "options": ["camelCase", "PascalCase", "snake_case", "kebab-case"],
      "correct": 1,
      "explanation": "PascalCase (e.g., UserService) is the standard convention for class names in Java, C#, and TypeScript.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch9-5",
      "question": "What is the 'Broken Window Theory' in software engineering?",
      "options": [
        "If you don't fix small issues (messy code), it leads to further degradation of the whole system",
        "Computers should be kept away from windows",
        "A single syntax error will crash the app",
        "Testing should only be done on broken code"
      ],
      "correct": 0,
      "explanation": "Leaving small 'messes' in the code signals that quality is not a priority, encouraging others to also write messy code.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch9-6",
      "question": "What is the primary indicator of a 'God Object'?",
      "options": [
        "It has a very short name",
        "It inherits from many interfaces",
        "It has high complexity and knows too much about other parts of the system",
        "It is only used once in the application"
      ],
      "correct": 2,
      "explanation": "God objects centralize too much logic, violating SRP and creating a bottleneck for maintenance.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch9-7",
      "question": "Which of these is an example of 'Declarative' code?",
      "options": [
        "A for-loop that manually increments a counter and pushes to an array",
        "Using .filter().map() on an array to transform data",
        "Using goto statements for control flow",
        "Setting global state variables directly"
      ],
      "correct": 1,
      "explanation": "Declarative code (like functional array methods) describes 'what' to do rather than 'how' to do it step-by-step.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch9-8",
      "question": "What does 'Separation of Concerns' (SoC) aim to achieve?",
      "options": [
        "Grouping all code into a single file for speed",
        "Dividing a program into distinct sections, each addressing a separate concern",
        "Ensuring the database is on a separate server",
        "Separating the developers from the testers"
      ],
      "correct": 1,
      "explanation": "SoC improves modularity and maintainability by ensuring different aspects of the system don't overlap unnecessarily.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch9-9",
      "question": "When refactoring, what is the most important thing to have in place?",
      "options": [
        "A fast computer",
        "A comprehensive suite of automated tests",
        "A detailed design document",
        "Approval from the CEO"
      ],
      "correct": 1,
      "explanation": "Tests ensure that your refactoring hasn't changed the external behavior or introduced regressions.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch9-10",
      "question": "What is 'Dead Code'?",
      "options": [
        "Code that causes the program to crash",
        "Legacy code that is hard to read",
        "Code that is never executed or used in the application",
        "Encryption logic for sensitive data"
      ],
      "correct": 2,
      "explanation": "Dead code should be removed to reduce maintenance burden and confusion.",
      "difficulty": "easy"
    }
  ]
};
