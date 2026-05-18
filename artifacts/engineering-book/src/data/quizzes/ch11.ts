import { ChapterQuizData } from "../quizTypes";

export const CH11_QUIZ: ChapterQuizData = {
  "chapterId": "ch11",
  "sectionQuizzes": {
    "11-1": [
      {
        "id": "q-11-1-1",
        "question": "What is the primary focus of Unit Testing?",
        "options": [
          "Testing the entire system from the user's perspective",
          "Testing individual functions or classes in isolation",
          "Testing the performance of the database",
          "Testing the network latency between services"
        ],
        "correct": 1,
        "explanation": "Unit tests focus on the smallest testable parts of an application, typically using mocks for dependencies.",
        "difficulty": "easy"
      },
      {
        "id": "q-11-1-2",
        "question": "What is 'Integration Testing'?",
        "options": [
          "Testing how different modules or services work together",
          "Testing the integration of new developers into the team",
          "Testing the code on a new operating system",
          "Checking the syntax of the code"
        ],
        "correct": 0,
        "explanation": "Integration tests verify that components interact correctly, including databases or external APIs.",
        "difficulty": "medium"
      },
      {
        "id": "q-11-1-3",
        "question": "What is 'End-to-End (E2E) Testing'?",
        "options": [
          "Testing only the last line of a function",
          "Testing the entire application flow from start to finish, mimicking real user behavior",
          "Testing the power cable of the server",
          "Testing the end of the project lifecycle"
        ],
        "correct": 1,
        "explanation": "E2E tests (using tools like Cypress or Selenium) validate the system as a whole, including the UI and all backend integrations.",
        "difficulty": "medium"
      }
    ],
    "11-2": [
      {
        "id": "q-11-2-1",
        "question": "What are the three steps of the Test-Driven Development (TDD) cycle?",
        "options": [
          "Plan, Code, Test",
          "Red, Green, Refactor",
          "Design, Implement, Debug",
          "Write, Run, Delete"
        ],
        "correct": 1,
        "explanation": "Write a failing test (Red), make it pass (Green), and then clean up the code (Refactor).",
        "difficulty": "easy"
      },
      {
        "id": "q-11-2-2",
        "question": "What is a major benefit of TDD?",
        "options": [
          "It results in 100% bug-free code",
          "It forces you to think about the interface and requirements before implementation",
          "It makes the code run faster",
          "It eliminates the need for a QA team"
        ],
        "correct": 1,
        "explanation": "TDD acts as a design tool, leading to more modular and testable code.",
        "difficulty": "medium"
      },
      {
        "id": "q-11-2-3",
        "question": "In TDD, why is the 'Refactor' step crucial?",
        "options": [
          "To add new features",
          "To ensure the code is clean and maintainable without changing its behavior",
          "To make the tests pass",
          "To change the requirements"
        ],
        "correct": 1,
        "explanation": "Refactoring prevents technical debt from accumulating as the project grows.",
        "difficulty": "medium"
      }
    ],
    "11-3": [
      {
        "id": "q-11-3-1",
        "question": "What is a 'Mock' in testing?",
        "options": [
          "A person who makes fun of the code",
          "A fake object that simulates the behavior of a real component and records how it was used",
          "A copy of the production database",
          "A type of compiler error"
        ],
        "correct": 1,
        "explanation": "Mocks allow you to isolate the unit under test by controlling and inspecting its interactions with dependencies.",
        "difficulty": "medium"
      },
      {
        "id": "q-11-3-2",
        "question": "What is the difference between a 'Stub' and a 'Mock'?",
        "options": [
          "They are identical",
          "Stubs provide canned answers; Mocks also verify expectations (how they were called)",
          "Stubs are for databases; Mocks are for APIs",
          "Stubs are faster"
        ],
        "correct": 1,
        "explanation": "Stubs are passive (returning data), while Mocks are active (verifying behavior).",
        "difficulty": "hard"
      },
      {
        "id": "q-11-3-3",
        "question": "What is 'Dependency Injection' and why is it important for testing?",
        "options": [
          "A way to add new features to a class",
          "Passing dependencies into a class/function, making it easy to swap them for mocks during tests",
          "A method for injecting SQL into a database",
          "A way to automatically update libraries"
        ],
        "correct": 1,
        "explanation": "Without DI, components are 'hard-wired' to their dependencies, making them nearly impossible to unit test.",
        "difficulty": "medium"
      }
    ],
    "11-4": [
      {
        "id": "q-11-4-1",
        "question": "What does 'Test Coverage' measure?",
        "options": [
          "How much of the codebase is executed by tests",
          "The number of tests in the project",
          "How many bugs are left in the code",
          "The physical area of the server room"
        ],
        "correct": 0,
        "explanation": "Coverage (Line, Branch, Function) indicates which parts of the code have been exercised by the test suite.",
        "difficulty": "easy"
      },
      {
        "id": "q-11-4-2",
        "question": "Is 100% test coverage a guarantee of high quality?",
        "options": [
          "Yes, it means there are no bugs",
          "No, it only means the code was executed, not that it was tested correctly for all logic paths",
          "Yes, it is the industry standard for all projects",
          "No, it makes the code too slow to run"
        ],
        "correct": 1,
        "explanation": "High coverage is a useful metric but can be misleading if the assertions are weak or edge cases are ignored.",
        "difficulty": "medium"
      },
      {
        "id": "q-11-4-3",
        "question": "What is 'Mutation Testing'?",
        "options": [
          "Testing the code on different hardware",
          "Changing the source code in small ways (mutants) to see if existing tests fail",
          "Testing code that uses AI",
          "Testing how code changes over time"
        ],
        "correct": 1,
        "explanation": "Mutation testing evaluates the *quality* of your tests. If you change `>` to `<` and no test fails, your tests are weak.",
        "difficulty": "hard"
      }
    ],
    "11-5": [
      {
        "id": "q-11-5-1",
        "question": "What is 'Property-Based Testing'?",
        "options": [
          "Testing the CSS properties of a website",
          "Defining properties that should always be true and letting a tool generate thousands of random inputs to find violations",
          "Testing the real estate value of the company",
          "Only testing the properties of an object"
        ],
        "correct": 1,
        "explanation": "Tools like QuickCheck or FastCheck help find obscure edge cases that a developer might not think to test manually.",
        "difficulty": "hard"
      },
      {
        "id": "q-11-5-2",
        "question": "What is 'Fuzzing'?",
        "options": [
          "Cleaning the server",
          "Providing semi-random, malformed data to an application to find security vulnerabilities and crashes",
          "Blurring images in the UI",
          "A type of compression"
        ],
        "correct": 1,
        "explanation": "Fuzz testing is a powerful technique for finding buffer overflows, memory leaks, and other robustness issues.",
        "difficulty": "medium"
      },
      {
        "id": "q-11-5-3",
        "question": "What is the 'Testing Pyramid'?",
        "options": [
          "A scheme for selling testing tools",
          "A model suggesting a large base of unit tests, fewer integration tests, and even fewer E2E tests",
          "A way to organize the QA team",
          "A testing strategy for ancient software"
        ],
        "correct": 1,
        "explanation": "The pyramid emphasizes that unit tests are faster, cheaper, and more reliable than high-level E2E tests.",
        "difficulty": "medium"
      }
    ],
    "11-6": [
      {
        "id": "q-11-6-1",
        "question": "What is 'Regression Testing'?",
        "options": [
          "Testing the code in reverse order",
          "Running tests to ensure that new changes haven't broken existing functionality",
          "Testing the code on old browsers",
          "Deleting old tests"
        ],
        "correct": 1,
        "explanation": "Regressions are bugs that reappear after a change; regression testing prevents them from reaching production.",
        "difficulty": "easy"
      },
      {
        "id": "q-11-6-2",
        "question": "What is 'Smoke Testing'?",
        "options": [
          "Testing if the server room is on fire",
          "A quick set of tests to verify the most critical functions of the system work after a build",
          "Testing the cooling system",
          "Testing if the code emits 'smoke' during execution"
        ],
        "correct": 1,
        "explanation": "Smoke tests are a 'first line of defense' to see if the application is fundamentally stable enough for further testing.",
        "difficulty": "easy"
      },
      {
        "id": "q-11-6-3",
        "question": "What is 'Alpha' vs 'Beta' testing?",
        "options": [
          "They are the same",
          "Alpha is internal (by developers); Beta is external (by real users)",
          "Alpha is for the UI; Beta is for the backend",
          "Alpha is automated; Beta is manual"
        ],
        "correct": 1,
        "explanation": "Alpha testing happens early in the lifecycle, while Beta testing gathers feedback from real-world usage before final release.",
        "difficulty": "medium"
      }
    ],
    "11-7": [
      {
        "id": "q-11-7-1",
        "question": "What is 'Behavior-Driven Development' (BDD)?",
        "options": [
          "Testing the behavior of developers",
          "An extension of TDD that uses natural language (Given/When/Then) to define system behavior",
          "A way to track user behavior",
          "Testing only the UI"
        ],
        "correct": 1,
        "explanation": "BDD (e.g., Cucumber/Gherkin) bridges the gap between technical and non-technical stakeholders.",
        "difficulty": "medium"
      },
      {
        "id": "q-11-7-2",
        "question": "What is the 'Given-When-Then' structure in BDD?",
        "options": [
          "A way to write CSS",
          "Context (Given), Action (When), Result (Then)",
          "A loop structure in Python",
          "The order of deployment"
        ],
        "correct": 1,
        "explanation": "This structure makes requirements explicit and easily translatable into automated tests.",
        "difficulty": "easy"
      },
      {
        "id": "q-11-7-3",
        "question": "What is 'Snapshot Testing'?",
        "options": [
          "Taking a picture of the screen",
          "Comparing a serialized version of a component (like UI output) against a 'golden' version to detect changes",
          "Testing the performance at a specific time",
          "Backing up the database"
        ],
        "correct": 1,
        "explanation": "Popular in React/Frontend testing, snapshots quickly detect unexpected UI changes.",
        "difficulty": "medium"
      }
    ],
    "11-8": [
      {
        "id": "q-11-8-1",
        "question": "What is 'Continuous Integration' (CI)?",
        "options": [
          "Working on the same file constantly",
          "The practice of frequently merging code changes into a central repository and running automated tests",
          "Connecting the server to the internet",
          "A type of project management"
        ],
        "correct": 1,
        "explanation": "CI ensures that the main branch is always in a working state.",
        "difficulty": "easy"
      },
      {
        "id": "q-11-8-2",
        "question": "What is a 'Flaky Test'?",
        "options": [
          "A test that is very fast",
          "A test that fails or passes inconsistently without any code changes",
          "A test that only runs on Fridays",
          "A test that is hard to read"
        ],
        "correct": 1,
        "explanation": "Flaky tests undermine trust in the test suite and are often caused by race conditions or external dependencies.",
        "difficulty": "medium"
      },
      {
        "id": "q-11-8-3",
        "question": "How should you deal with a flaky test?",
        "options": [
          "Delete it immediately",
          "Ignore it until it passes",
          "Quarantine it, identify the root cause (often timing/concurrency), and fix it",
          "Run it in a loop until it passes once"
        ],
        "correct": 2,
        "explanation": "Ignoring flakiness leads to a 'broken window' where developers start ignoring real failures.",
        "difficulty": "medium"
      }
    ],
    "11-9": [
      {
        "id": "q-11-9-1",
        "question": "What is 'Acceptance Testing'?",
        "options": [
          "Accepting that the code has bugs",
          "Testing if the system meets the business requirements and is ready for release",
          "Testing the server's acceptance of connections",
          "A personality test for developers"
        ],
        "correct": 1,
        "explanation": "User Acceptance Testing (UAT) is often the final step before production.",
        "difficulty": "easy"
      },
      {
        "id": "q-11-9-2",
        "question": "What is 'Contract Testing'?",
        "options": [
          "Testing the legal documents of the company",
          "Ensuring that two services (e.g., consumer and provider) agree on the format of their communication",
          "Testing the employment contracts",
          "A type of performance testing"
        ],
        "correct": 1,
        "explanation": "Contract tests (like Pact) prevent breaking changes in microservices by validating the API interface.",
        "difficulty": "hard"
      },
      {
        "id": "q-11-9-3",
        "question": "What is 'Performance Testing' vs 'Load Testing'?",
        "options": [
          "They are the same",
          "Performance tests measure speed; Load tests measure behavior under heavy volume",
          "Performance is for UI; Load is for DB",
          "Load is manual; Performance is automated"
        ],
        "correct": 1,
        "explanation": "Performance covers responsiveness, while load/stress testing pushes the system to its limits.",
        "difficulty": "medium"
      }
    ],
    "11-10": [
      {
        "id": "q-11-10-1",
        "question": "What is 'A/B Testing'?",
        "options": [
          "Testing two versions of a feature with different users to see which performs better",
          "Testing only the first two modules of the app",
          "A test that uses two databases",
          "Testing the alphabet"
        ],
        "correct": 0,
        "explanation": "A/B testing is a data-driven way to make product decisions.",
        "difficulty": "easy"
      },
      {
        "id": "q-11-10-2",
        "question": "What is 'Blue-Green Deployment'?",
        "options": [
          "Painting the server room",
          "Maintaining two identical production environments (Blue and Green) to allow zero-downtime updates and easy rollbacks",
          "Deploying only on sunny days",
          "A type of color-blind testing"
        ],
        "correct": 1,
        "explanation": "You deploy to the idle environment (e.g., Green), test it, and then switch traffic from Blue to Green.",
        "difficulty": "hard"
      },
      {
        "id": "q-11-10-3",
        "question": "What is a 'Canary Release'?",
        "options": [
          "Releasing a bird in the office",
          "Rolling out a new version to a small subset of users before deploying it to everyone",
          "A version of the app that is yellow",
          "Testing the app's audio output"
        ],
        "correct": 1,
        "explanation": "Like a canary in a coal mine, this small group helps detect issues before they affect all users.",
        "difficulty": "medium"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch11-1",
      "question": "Which of these is the most 'expensive' type of test in terms of execution time and maintenance?",
      "options": ["Unit Tests", "Integration Tests", "End-to-End Tests", "Static Analysis"],
      "correct": 2,
      "explanation": "E2E tests require the full system to be running and are prone to flakiness due to network/UI timing.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch11-2",
      "question": "What is the primary goal of the 'Green' phase in the TDD cycle?",
      "options": [
        "Write the most elegant code possible",
        "Make the test pass as quickly as possible, even with 'ugly' code",
        "Document the requirements",
        "Optimize performance"
      ],
      "correct": 1,
      "explanation": "The Green phase is about functionality; beauty and structure come in the Refactor phase.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch11-3",
      "question": "A test that fails when you change the internal implementation of a function, even if the output remains correct, is called:",
      "options": ["Brittle Test", "Robust Test", "Legacy Test", "Black-box Test"],
      "correct": 0,
      "explanation": "Brittle tests are over-coupled to implementation details rather than behavior.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch11-4",
      "question": "What is 'Equivalence Partitioning'?",
      "options": [
        "Dividing input data into ranges that are expected to behave the same way, then testing one value from each",
        "Ensuring all developers have equal work",
        "Splitting the database into equal parts",
        "A way to calculate test coverage"
      ],
      "correct": 0,
      "explanation": "It's a strategy to reduce the number of tests while still covering all logic paths (e.g., testing one negative number, zero, and one positive number).",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch11-5",
      "question": "What is 'Boundary Value Analysis'?",
      "options": [
        "Testing the physical limits of the server",
        "Testing values at the edges of input ranges (e.g., 0, 1, 99, 100 for a range of 1-100)",
        "Checking the firewall rules",
        "Testing the end of a file"
      ],
      "correct": 1,
      "explanation": "Errors frequently occur at the boundaries of logic (off-by-one errors).",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch11-6",
      "question": "Which tool is commonly used for Unit Testing in the JavaScript/TypeScript ecosystem?",
      "options": ["Jest", "Cypress", "Postman", "Jenkins"],
      "correct": 0,
      "explanation": "Jest is a popular testing framework for JS/TS; Cypress is primarily for E2E; Postman for API; Jenkins for CI.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch11-7",
      "question": "What does the 'AAA' pattern stand for in test writing?",
      "options": ["Always Add Assertions", "Arrange, Act, Assert", "Apply, Analyze, Archive", "Access, Alter, Audit"],
      "correct": 1,
      "explanation": "Arrange (set up), Act (call the function), Assert (verify the result).",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch11-8",
      "question": "What is 'White-box Testing'?",
      "options": [
        "Testing the software with full knowledge of its internal structure and code",
        "Testing the software without seeing the code",
        "Testing the white theme of the UI",
        "Testing on a new computer"
      ],
      "correct": 0,
      "explanation": "Unit testing is typically white-box, while E2E is often black-box.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch11-9",
      "question": "Why is 'Static Analysis' (like Linting or Type Checking) considered a form of testing?",
      "options": [
        "It isn't",
        "It finds errors in the code without actually executing it",
        "It requires a QA team",
        "It only works for C++"
      ],
      "correct": 1,
      "explanation": "Tools like ESLint or the TypeScript compiler catch many common bugs (typos, type mismatches) instantly.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch11-10",
      "question": "What is 'Test Debt'?",
      "options": [
        "Money owed to the testing department",
        "The accumulated cost of missing, outdated, or slow tests that hinder development",
        "The number of failed tests",
        "A loan taken for testing equipment"
      ],
      "correct": 1,
      "explanation": "Like technical debt, test debt makes it increasingly difficult and risky to change the codebase.",
      "difficulty": "medium"
    }
  ]
};
