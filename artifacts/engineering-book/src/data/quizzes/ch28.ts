import { ChapterQuizData } from "../quizTypes";

export const CH28_QUIZ: ChapterQuizData = {
  chapterId: "ch28",
  sectionQuizzes: {
    "28-1": [
      {
        id: "q28-1-1",
        question: "What is the most common definition of 'Legacy Code' in the engineering community?",
        options: [
          "Code written by someone who has left the company",
          "Code without tests",
          "Code written in an obsolete language",
          "Code that is more than 5 years old"
        ],
        correct: 1,
        explanation: "Michael Feathers defines legacy code as 'code without tests' because it is difficult to change without the safety net of automated validation.",
        difficulty: "easy"
      },
      {
        id: "q28-1-2",
        question: "Why is legacy code difficult to change?",
        options: [
          "It's usually written in binary",
          "Lack of understanding and fear of breaking undocumented dependencies",
          "Modern compilers can't read it",
          "It's protected by copyright"
        ],
        correct: 1,
        explanation: "The combination of high complexity, lack of tests, and tribal knowledge loss makes changing legacy code risky and slow.",
        difficulty: "easy"
      },
      {
        id: "q28-1-3",
        question: "What is the 'Golden Rule' of working with legacy code?",
        options: [
          "Rewrite it immediately",
          "Don't touch it if it's working",
          "Before changing code, make sure it is covered by tests",
          "Delete the comments"
        ],
        correct: 2,
        explanation: "To change legacy code safely, you must first establish a baseline of tests to ensure you don't break existing functionality.",
        difficulty: "medium"
      }
    ],
    "28-2": [
      {
        id: "q28-2-1",
        question: "What is a 'Characterization Test'?",
        options: [
          "A test for the user's personality",
          "A test that describes the actual behavior of the existing system",
          "A test for the performance of the CPU",
          "A test written before the code is built"
        ],
        correct: 1,
        explanation: "Characterization tests (or 'Golden Master' tests) document what the code *actually* does, not what it's *supposed* to do.",
        difficulty: "medium"
      },
      {
        id: "q28-2-2",
        question: "How do you write a characterization test?",
        options: [
          "Read the requirements document",
          "Use a debugger to see what's happening",
          "Call the code with various inputs and assert the current (even buggy) outputs",
          "Ask the original author"
        ],
        correct: 2,
        explanation: "You feed the code inputs and record the results. These results become your assertions for future changes.",
        difficulty: "medium"
      },
      {
        id: "q28-2-3",
        question: "What is the primary benefit of characterization tests?",
        options: [
          "They find all the bugs in the code",
          "They act as a safety net during refactoring",
          "They improve the code's performance",
          "They replace the need for documentation"
        ],
        correct: 1,
        explanation: "They allow you to refactor or change the code with confidence that you haven't altered the observable behavior.",
        difficulty: "medium"
      }
    ],
    "28-3": [
      {
        id: "q28-3-1",
        question: "What is a 'Seam' in a codebase?",
        options: [
          "A place where you can change behavior without editing the code itself",
          "A line where two files are joined",
          "A bug in the UI",
          "A database connection string"
        ],
        correct: 0,
        explanation: "Michael Feathers defines a seam as a place where you can alter behavior without editing in that place, which is crucial for breaking dependencies during testing.",
        difficulty: "hard"
      },
      {
        id: "q28-3-2",
        question: "What is a 'Link Seam'?",
        options: [
          "Using a hyperlink",
          "Using the linker to substitute a mock implementation of a dependency",
          "Changing a URL in a config file",
          "Connecting two classes with an interface"
        ],
        correct: 1,
        explanation: "Link seams involve changing the build or environment to point to a different implementation of a library or module.",
        difficulty: "hard"
      },
      {
        id: "q28-3-3",
        question: "Why is 'Finding Seams' important for testing legacy code?",
        options: [
          "It makes the code run faster",
          "It allows for isolating the code under test by injecting mocks or stubs",
          "It helps in identifying the original author",
          "It's a requirement for functional programming"
        ],
        correct: 1,
        explanation: "Seams allow you to break hard-coded dependencies so you can unit test components in isolation.",
        difficulty: "medium"
      }
    ],
    "28-4": [
      {
        id: "q28-4-1",
        question: "What is the 'Mikado Method' used for?",
        options: [
          "Writing documentation",
          "Managing large-scale refactorings in complex systems",
          "Interviewing developers",
          "Optimizing SQL queries"
        ],
        correct: 1,
        explanation: "The Mikado Method is a structured technique for exploring and performing complex refactorings without breaking the system for long periods.",
        difficulty: "medium"
      },
      {
        id: "q28-4-2",
        question: "What is the first step in the Mikado Method?",
        options: [
          "Delete the old code",
          "Define a goal and try to implement it immediately",
          "Write a 50-page plan",
          "Hire a consultant"
        ],
        correct: 1,
        explanation: "You start by trying to achieve your goal. When it breaks (as it likely will in legacy code), you note the prerequisites.",
        difficulty: "medium"
      },
      {
        id: "q28-4-3",
        question: "What do you do when a change in the Mikado Method causes errors?",
        options: [
          "Keep fixing errors until it works",
          "Revert the change and address the prerequisite errors first",
          "Commit the broken code and fix it later",
          "Start the project over"
        ],
        correct: 1,
        explanation: "The Mikado Method involves 'reverting' when you hit a blocker, then tackling the blocker as a sub-goal, ensuring the master branch stays green.",
        difficulty: "hard"
      }
    ],
    "28-5": [
      {
        id: "q28-5-1",
        question: "What is the 'Sensing and Separation' technique?",
        options: [
          "A way to fix hardware bugs",
          "Breaking a dependency to 'sense' what a method is doing or 'separate' it from its environment",
          "Using AI to read code",
          "Splitting a team into two"
        ],
        correct: 1,
        explanation: "Sensing involves getting information about the state of an object, while separation involves isolating the object so it can be tested.",
        difficulty: "hard"
      },
      {
        id: "q28-5-2",
        question: "What is 'Dependency Injection' (DI) in the context of legacy code?",
        options: [
          "A way to add more dependencies",
          "A technique to pass dependencies into a class rather than hard-coding them",
          "A type of security attack",
          "A database optimization"
        ],
        correct: 1,
        explanation: "DI is a primary tool for creating seams in legacy code, allowing you to inject mocks during testing.",
        difficulty: "medium"
      },
      {
        id: "q28-5-3",
        question: "What is an 'Extract Interface' refactoring?",
        options: [
          "Deleting an interface",
          "Creating a new interface based on the public methods of an existing class",
          "Moving code to a different language",
          "Combining two classes"
        ],
        correct: 1,
        explanation: "Extracting an interface allows you to refer to a dependency by its interface rather than its concrete class, enabling easier mocking.",
        difficulty: "medium"
      }
    ],
    "28-6": [
      {
        id: "q28-6-1",
        question: "What is 'Sprout Method'?",
        options: [
          "Deleting a method",
          "Adding new functionality by creating a new method and calling it from the legacy code",
          "Renaming all methods",
          "A gardening technique"
        ],
        correct: 1,
        explanation: "The Sprout Method allows you to add new features that are fully tested and clean, even if the surrounding legacy code is not.",
        difficulty: "medium"
      },
      {
        id: "q28-6-2",
        question: "What is 'Sprout Class'?",
        options: [
          "A class that grows automatically",
          "Creating a new, tested class to handle new responsibilities instead of bloating a legacy class",
          "The parent of all legacy classes",
          "A class used for testing only"
        ],
        correct: 1,
        explanation: "Like Sprout Method, Sprout Class helps you keep new code clean and decoupled from the legacy mess.",
        difficulty: "medium"
      },
      {
        id: "q28-6-3",
        question: "When should you use 'Sprout' techniques?",
        options: [
          "When you want to rewrite the whole system",
          "When you need to add a feature to a legacy component that is hard to test",
          "When you have too many tests",
          "When the code is already clean"
        ],
        correct: 1,
        explanation: "Sprout techniques are great for making incremental, safe changes without getting stuck in a massive refactoring of the entire legacy module.",
        difficulty: "medium"
      }
    ],
    "28-7": [
      {
        id: "q28-7-1",
        question: "What is 'Wrap Method'?",
        options: [
          "Adding a decorator to a method",
          "Creating a new method with the same name as the old one, but calling the old one inside it along with new logic",
          "Putting code in a try-catch block",
          "Deleting a method's body"
        ],
        correct: 1,
        explanation: "Wrap Method (and Wrap Class) allows you to add behavior before or after an existing call without modifying the existing method's body.",
        difficulty: "medium"
      },
      {
        id: "q28-7-2",
        question: "What is a 'Lush Interface'?",
        options: [
          "An interface with too many methods",
          "A very beautiful UI",
          "An interface that is easy to use",
          "An interface with no methods"
        ],
        correct: 0,
        explanation: "A lush interface (or 'Fat Interface') is a sign of poor cohesion and makes mocking difficult because you have to implement many unnecessary methods.",
        difficulty: "hard"
      },
      {
        id: "q28-7-3",
        question: "What is 'Legacy Code Entrapment'?",
        options: [
          "Being forced to work on old code",
          "The tendency for legacy code to force new code to be written in the same poor style",
          "A legal contract for maintaining old systems",
          "A security vulnerability"
        ],
        correct: 1,
        explanation: "It takes discipline to write high-quality new code when it's surrounded by low-quality legacy code.",
        difficulty: "medium"
      }
    ],
    "28-8": [
      {
        id: "q28-8-1",
        question: "What is the 'Strangler Fig' pattern's role in legacy migration?",
        options: [
          "It helps in deleting the legacy code immediately",
          "It allows for gradual replacement of legacy features with new services",
          "It secures the legacy database",
          "It's only for frontend code"
        ],
        correct: 1,
        explanation: "Strangler Fig is the go-to pattern for migrating away from a legacy monolith to a new architecture incrementally.",
        difficulty: "easy"
      },
      {
        id: "q28-8-2",
        question: "What is an 'Anti-Corruption Layer' (ACL)?",
        options: [
          "A legal department",
          "A layer that translates between a new system's model and a legacy system's messy model",
          "A firewall",
          "A data validation tool"
        ],
        correct: 1,
        explanation: "An ACL prevents the 'messiness' of the legacy system's data and domain model from leaking into and corrupting your new, clean system.",
        difficulty: "hard"
      },
      {
        id: "q28-8-3",
        question: "Why use an ACL when talking to a legacy system?",
        options: [
          "To make the connection slower",
          "To keep the new system's domain model clean and decoupled",
          "Because the legacy system is encrypted",
          "To avoid paying for licenses"
        ],
        correct: 1,
        explanation: "It ensures that the new system can evolve independently of the legacy system's quirks.",
        difficulty: "medium"
      }
    ],
    "28-9": [
      {
        id: "q28-9-1",
        question: "What is 'Scratch Refactoring'?",
        options: [
          "Refactoring code and then throwing it away just to understand it",
          "Refactoring with a cat-themed language",
          "Refactoring from the very beginning of a project",
          "A very fast refactoring"
        ],
        correct: 0,
        explanation: "Scratch refactoring is a learning tool. You aggressively refactor code to see how it works, but you don't commit those changes.",
        difficulty: "medium"
      },
      {
        id: "q28-9-2",
        question: "What is 'Read by Refactoring'?",
        options: [
          "Reading the documentation",
          "The process of understanding code by cleaning it up",
          "Using an AI to explain code",
          "Asking a senior to explain code"
        ],
        correct: 1,
        explanation: "Often, the best way to understand a confusing block of code is to rename variables and extract methods until it becomes clear.",
        difficulty: "easy"
      },
      {
        id: "q28-9-3",
        question: "What is 'Tribal Knowledge'?",
        options: [
          "Knowledge shared by everyone in the company",
          "Undocumented information known only by a few long-tenured employees",
          "A new type of database",
          "Information about competitors"
        ],
        correct: 1,
        explanation: "Legacy systems often rely on tribal knowledge, making them dangerous for new engineers who don't have access to that unwritten history.",
        difficulty: "easy"
      }
    ],
    "28-10": [
      {
        id: "q28-10-1",
        question: "What is the 'Big Rewrite' trap?",
        options: [
          "Believing that starting from scratch will solve all problems faster than fixing the old system",
          "Writing too much code",
          "Using a new language for a small project",
          "Updating all dependencies at once"
        ],
        correct: 0,
        explanation: "Rewrites often take much longer than expected, miss critical legacy edge cases, and can kill projects or companies.",
        difficulty: "medium"
      },
      {
        id: "q28-10-2",
        question: "When is a 'Big Rewrite' actually justified?",
        options: [
          "Whenever the developers are bored",
          "When the underlying platform is obsolete or the technical debt is truly unpayable",
          "When a new version of a framework is released",
          "When the CEO wants a new UI"
        ],
        correct: 1,
        explanation: "A rewrite is a last resort, usually reserved for when incremental change is physically or economically impossible.",
        difficulty: "medium"
      },
      {
        id: "q28-10-3",
        question: "How do you maintain 'Legacy Code' in production safely?",
        options: [
          "Never touch it",
          "Aggressive monitoring, regression testing, and gradual modernization",
          "Rebooting the server daily",
          "Hiring more manual testers"
        ],
        correct: 1,
        explanation: "Safety comes from observability and a slow, tested approach to making changes.",
        difficulty: "medium"
      }
    ]
  },
  examQuestions: [
    {
      id: "q28-exam-1",
      question: "According to Michael Feathers, legacy code is primarily defined as code that:",
      options: ["Is written in COBOL", "Has no tests", "Is poorly documented", "Was written by a former employee"],
      correct: 1,
      explanation: "Without tests, you cannot safely change code, which is the defining struggle of legacy systems.",
      difficulty: "easy"
    },
    {
      id: "q28-exam-2",
      question: "A 'Characterization Test' is used to:",
      options: ["Find bugs", "Document existing behavior", "Test performance", "Verify requirements"],
      correct: 1,
      explanation: "It captures what the system currently does so you can preserve that behavior during refactoring.",
      difficulty: "medium"
    },
    {
      id: "q28-exam-3",
      question: "The 'Mikado Method' is a technique for:",
      options: ["Large-scale refactoring", "Database design", "Project management", "UI development"],
      correct: 0,
      explanation: "It provides a structured way to handle complex dependencies during refactoring without breaking the build.",
      difficulty: "medium"
    },
    {
      id: "q28-exam-4",
      question: "What is a 'Seam' in code?",
      options: ["A bug", "A place to alter behavior without editing code in that place", "A comment block", "A merge conflict"],
      correct: 1,
      explanation: "Seams are essential for isolating code for testing by injecting alternative behaviors (like mocks).",
      difficulty: "hard"
    },
    {
      id: "q28-exam-5",
      question: "The 'Sprout Method' technique involves:",
      options: ["Deleting an old method", "Adding new code in a new, tested method", "Rewriting a whole class", "Removing all comments"],
      correct: 1,
      explanation: "It's a way to add new, clean functionality to a legacy class safely.",
      difficulty: "medium"
    },
    {
      id: "q28-exam-6",
      question: "An 'Anti-Corruption Layer' (ACL) is used to:",
      options: ["Prevent hacking", "Keep a new system's model clean from legacy influence", "Speed up database queries", "Stop code duplication"],
      correct: 1,
      explanation: "It translates between the new and old systems, protecting the integrity of the new design.",
      difficulty: "hard"
    },
    {
      id: "q28-exam-7",
      question: "What is 'Scratch Refactoring'?",
      options: ["A fast rewrite", "Refactoring for learning and then discarding the changes", "Refactoring with a new team", "Refactoring only the UI"],
      correct: 1,
      explanation: "It is an exploration technique to understand how a complex piece of code works.",
      difficulty: "medium"
    },
    {
      id: "q28-exam-8",
      question: "Which pattern is best for migrating a monolith to microservices?",
      options: ["Singleton", "Strangler Fig", "Observer", "Decorator"],
      correct: 1,
      explanation: "The Strangler Fig pattern allows for the incremental migration of features.",
      difficulty: "easy"
    },
    {
      id: "q28-exam-9",
      question: "Why is 'Dependency Injection' helpful with legacy code?",
      options: ["It makes the code more complex", "It allows replacing hard-coded dependencies with mocks for testing", "It removes the need for interfaces", "It speeds up execution"],
      correct: 1,
      explanation: "DI creates seams that allow for unit testing in isolation.",
      difficulty: "medium"
    },
    {
      id: "q28-exam-10",
      question: "What should you do before making a change to legacy code?",
      options: ["Delete it", "Write tests for the existing behavior", "Rewrite it in a new language", "Wait for a bug report"],
      correct: 1,
      explanation: "Establishing a baseline of tests (characterization tests) is the first step to safe modification.",
      difficulty: "easy"
    }
  ]
};
