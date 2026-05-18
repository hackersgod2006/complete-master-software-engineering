import { ChapterQuizData } from "../quizTypes";

export const CH27_QUIZ: ChapterQuizData = {
  chapterId: "ch27",
  sectionQuizzes: {
    "27-1": [
      {
        id: "q27-1-1",
        question: "What is the core metaphor of 'Technical Debt'?",
        options: [
          "Code is like a physical building that needs repair",
          "Taking a shortcut now results in 'interest' payments in the form of future effort",
          "Software is like a bank account that grows with every commit",
          "Developers are like debt collectors"
        ],
        correct: 1,
        explanation: "Ward Cunningham coined the term to describe how quick, sub-optimal technical decisions require future 'interest' payments through extra work to maintain and evolve the code.",
        difficulty: "easy"
      },
      {
        id: "q27-1-2",
        question: "What is 'Technical Interest'?",
        options: [
          "The profit made from software",
          "The extra time and effort required to work with poorly designed code",
          "The bonus paid to developers for fixing bugs",
          "The cost of cloud infrastructure"
        ],
        correct: 1,
        explanation: "Interest is the ongoing tax on productivity caused by debt; every new feature takes longer because of existing poor quality.",
        difficulty: "medium"
      },
      {
        id: "q27-1-3",
        question: "Is all technical debt inherently bad?",
        options: [
          "Yes, all debt should be avoided at all costs",
          "No, it can be a strategic tool to meet a deadline",
          "Only if it's written in JavaScript",
          "Only if the client knows about it"
        ],
        correct: 1,
        explanation: "Just like financial debt, technical debt can be used strategically to achieve a business goal faster, provided it is managed and paid back.",
        difficulty: "medium"
      }
    ],
    "27-2": [
      {
        id: "q27-2-1",
        question: "What are the four quadrants of Martin Fowler's Technical Debt Quadrant?",
        options: [
          "Fast, Slow, Good, Bad",
          "Reckless/Deliberate, Reckless/Inadvertent, Prudent/Deliberate, Prudent/Inadvertent",
          "Small, Medium, Large, Critical",
          "Frontend, Backend, Database, DevOps"
        ],
        correct: 1,
        explanation: "The quadrant categorizes debt based on whether the decision was reckless or prudent, and whether it was deliberate or inadvertent.",
        difficulty: "hard"
      },
      {
        id: "q27-2-2",
        question: "Which quadrant does 'We don't have time for design' fall into?",
        options: [
          "Prudent/Deliberate",
          "Reckless/Deliberate",
          "Prudent/Inadvertent",
          "Reckless/Inadvertent"
        ],
        correct: 1,
        explanation: "Deliberately skipping design to save time without a plan to fix it later is considered reckless/deliberate debt.",
        difficulty: "medium"
      },
      {
        id: "q27-2-3",
        question: "What characterizes 'Prudent/Inadvertent' debt?",
        options: [
          "Writing bad code on purpose",
          "Learning a better way to have designed a system after it has been built",
          "Copy-pasting from Stack Overflow",
          "Ignoring a known bug"
        ],
        correct: 1,
        explanation: "Even with the best intentions and design, you often learn better approaches as the project progresses. This 'learning' debt is prudent but inadvertent.",
        difficulty: "hard"
      }
    ],
    "27-3": [
      {
        id: "q27-3-1",
        question: "What is a 'Technical Debt Register'?",
        options: [
          "A list of all developers in the company",
          "A document or backlog for tracking and prioritizing technical debt items",
          "A legal document for software licensing",
          "An automated tool that deletes bad code"
        ],
        correct: 1,
        explanation: "A register makes debt visible, allowing it to be prioritized alongside new features.",
        difficulty: "easy"
      },
      {
        id: "q27-3-2",
        question: "Why is visibility of technical debt important?",
        options: [
          "To shame the developers who wrote it",
          "To allow stakeholders to make informed trade-offs between speed and quality",
          "To increase the count of JIRA tickets",
          "To satisfy auditors"
        ],
        correct: 1,
        explanation: "When debt is invisible, it's impossible to manage or explain why feature delivery is slowing down.",
        difficulty: "medium"
      },
      {
        id: "q27-3-3",
        question: "How should items in a debt register be prioritized?",
        options: [
          "By the age of the code",
          "By the 'interest rate' (how often it affects development) and business impact",
          "By the number of lines of code",
          "Alphabetically"
        ],
        correct: 1,
        explanation: "Focus on fixing debt in areas where development is most active and where the debt causes the most friction.",
        difficulty: "medium"
      }
    ],
    "27-4": [
      {
        id: "q27-4-1",
        question: "What is 'Refactoring'?",
        options: [
          "Adding new features to existing code",
          "Changing the internal structure of code without changing its external behavior",
          "Rewriting a system from scratch",
          "Fixing bugs in production"
        ],
        correct: 1,
        explanation: "Refactoring improves code quality, readability, and maintainability without altering what the code actually does.",
        difficulty: "easy"
      },
      {
        id: "q27-4-2",
        question: "What is a prerequisite for safe refactoring?",
        options: [
          "A large budget",
          "A comprehensive suite of automated tests",
          "Approval from the CEO",
          "Using a specific IDE"
        ],
        correct: 1,
        explanation: "Tests ensure that the refactoring hasn't changed the external behavior or introduced new bugs.",
        difficulty: "medium"
      },
      {
        id: "q27-4-3",
        question: "Which of these is a common 'Code Smell' indicating the need for refactoring?",
        options: [
          "Short functions",
          "Descriptive variable names",
          "Duplicated code",
          "Small classes"
        ],
        correct: 2,
        explanation: "Duplicated code (DRY principle violation) is a classic indicator that the code could be improved through abstraction.",
        difficulty: "easy"
      }
    ],
    "27-5": [
      {
        id: "q27-5-1",
        question: "What is the 'Boy Scout Rule' in software engineering?",
        options: [
          "Always wear a uniform",
          "Always leave the code slightly cleaner than you found it",
          "Help users cross the street",
          "Only seniors should clean the code"
        ],
        correct: 1,
        explanation: "The rule encourages continuous, small-scale cleaning of the codebase as part of every task.",
        difficulty: "easy"
      },
      {
        id: "q27-5-2",
        question: "What is 'Opportunistic Refactoring'?",
        options: [
          "Refactoring only when a manager asks",
          "Cleaning up code that is relevant to the feature you are currently working on",
          "Scheduling a three-month refactoring project",
          "Fixing code that isn't broken"
        ],
        correct: 1,
        explanation: "Opportunistic refactoring is the practice of fixing debt 'along the way' during regular development work.",
        difficulty: "medium"
      },
      {
        id: "q27-5-3",
        question: "What is a 'Refactoring Sprint'?",
        options: [
          "A dedicated time block for addressing technical debt, away from feature work",
          "A sprint where you work twice as fast",
          "A meeting about refactoring",
          "A way to deploy code faster"
        ],
        correct: 0,
        explanation: "While opportunistic refactoring is preferred, sometimes a dedicated block of time is needed to tackle larger debt items.",
        difficulty: "medium"
      }
    ],
    "27-6": [
      {
        id: "q27-6-1",
        question: "What is the 'Strangler Fig' pattern?",
        options: [
          "Deleting a system and starting over",
          "Incrementally replacing system functionality with new code until the old system is gone",
          "Using a specific design pattern for tree structures",
          "Encryption of legacy data"
        ],
        correct: 1,
        explanation: "Named after the Strangler Fig tree, this pattern involves building a new system around the edges of the old one, gradually replacing it.",
        difficulty: "medium"
      },
      {
        id: "q27-6-2",
        question: "Why is the Strangler Fig pattern often preferred over a 'Big Bang' rewrite?",
        options: [
          "It's faster to finish",
          "It reduces risk by delivering value incrementally and allowing for early feedback",
          "It's cheaper to implement",
          "It requires fewer developers"
        ],
        correct: 1,
        explanation: "Big Bang rewrites are notoriously risky and often fail. Incremental replacement is more manageable and maintains service continuity.",
        difficulty: "medium"
      },
      {
        id: "q27-6-3",
        question: "How do you typically route traffic in a Strangler Fig implementation?",
        options: [
          "Ask users to use a different URL",
          "Using a proxy or gateway to route requests to either the old or new system",
          "Manually copying data between systems",
          "Hard-coding routes in the frontend"
        ],
        correct: 1,
        explanation: "An interceptor/proxy handles the routing logic, making the transition transparent to the outside world.",
        difficulty: "hard"
      }
    ],
    "27-7": [
      {
        id: "q27-7-1",
        question: "What is 'Feature Creep's' relationship to technical debt?",
        options: [
          "More features always mean less debt",
          "Adding unnecessary features increases the surface area for debt and complexity",
          "They are unrelated",
          "Feature creep is a way to pay off debt"
        ],
        correct: 1,
        explanation: "The more code you have, the more you have to maintain. Unnecessary complexity is a major source of debt.",
        difficulty: "medium"
      },
      {
        id: "q27-7-2",
        question: "What is 'Complexity Budget'?",
        options: [
          "The cost of a software license",
          "The amount of complexity a team can handle before productivity drops",
          "The number of classes allowed in a project",
          "The time spent on design meetings"
        ],
        correct: 1,
        explanation: "Just as we have error budgets for reliability, we have a limited capacity for complexity before the cognitive load becomes too high.",
        difficulty: "hard"
      },
      {
        id: "q27-7-3",
        question: "How does 'Dead Code' contribute to technical debt?",
        options: [
          "It makes the binary smaller",
          "It increases cognitive load and makes refactoring harder",
          "It speeds up the compiler",
          "It has no impact"
        ],
        correct: 1,
        explanation: "Dead code is confusing for maintainers and can lead to bugs if someone accidentally re-activates or depends on it.",
        difficulty: "medium"
      }
    ],
    "27-8": [
      {
        id: "q27-8-1",
        question: "What is 'Modularization' in the context of debt?",
        options: [
          "Breaking a monolith into smaller, independent components",
          "Using modules in JavaScript",
          "Hiring more people",
          "Writing documentation"
        ],
        correct: 0,
        explanation: "Decoupling systems through modularization prevents debt in one area from 'infecting' the entire codebase.",
        difficulty: "medium"
      },
      {
        id: "q27-8-2",
        question: "What is 'Leaky Abstraction'?",
        options: [
          "A bug where data is lost",
          "When details of an implementation leak through its abstraction layer",
          "A type of memory leak",
          "A design pattern"
        ],
        correct: 1,
        explanation: "Leaky abstractions increase debt because callers must understand the underlying details, breaking the encapsulation.",
        difficulty: "hard"
      },
      {
        id: "q27-8-3",
        question: "How does 'YAGNI' (You Ain't Gonna Need It) help prevent technical debt?",
        options: [
          "By delaying all coding",
          "By preventing the introduction of speculative complexity",
          "By skipping all tests",
          "By ignoring user requests"
        ],
        correct: 1,
        explanation: "YAGNI prevents debt by ensuring you only build what is actually needed, keeping the system simple.",
        difficulty: "medium"
      }
    ],
    "27-9": [
      {
        id: "q27-9-1",
        question: "What is the 'Bankruptcy' approach to technical debt?",
        options: [
          "Filing for legal protection",
          "A total rewrite of the system because the debt is unpayable",
          "Paying developers in stock options",
          "Closing the company"
        ],
        correct: 1,
        explanation: "Sometimes the cost of paying 'interest' on debt is so high that the only viable path is to start over (technical bankruptcy).",
        difficulty: "medium"
      },
      {
        id: "q27-9-2",
        question: "What is the danger of a 'Total Rewrite'?",
        options: [
          "It's too easy",
          "It often takes much longer than planned and fails to capture all legacy requirements",
          "It makes the code too modern",
          "It causes the database to shrink"
        ],
        correct: 1,
        explanation: "Rewrites often fall into the 'Second System Syndrome' and struggle to reach parity with the battle-tested legacy system.",
        difficulty: "medium"
      },
      {
        id: "q27-9-3",
        question: "How can you tell if a system is 'Bankrupt'?",
        options: [
          "When it uses an old version of React",
          "When the cost of maintenance exceeds the value delivered and engineers refuse to work on it",
          "When it has more than 100 files",
          "When the documentation is missing"
        ],
        correct: 1,
        explanation: "True technical bankruptcy is when the system effectively becomes unchangeable.",
        difficulty: "hard"
      }
    ],
    "27-10": [
      {
        id: "q27-10-1",
        question: "How can technical debt impact developer morale?",
        options: [
          "It has no impact",
          "It leads to frustration, burnout, and higher turnover",
          "It makes developers happy because they are busy",
          "It improves job security"
        ],
        correct: 1,
        explanation: "Working in a high-debt environment is exhausting and demoralizing for engineers who value quality.",
        difficulty: "easy"
      },
      {
        id: "q27-10-2",
        question: "What is the 'Debt-to-Value' ratio?",
        options: [
          "The cost of the software vs the price of the stock",
          "A heuristic comparing technical debt levels to the business value of the system",
          "The number of bugs per feature",
          "The ratio of developers to managers"
        ],
        correct: 1,
        explanation: "It helps in deciding whether to invest in fixing debt or building new value.",
        difficulty: "hard"
      },
      {
        id: "q27-10-3",
        question: "What is a 'Quality Bar'?",
        options: [
          "A place where developers drink",
          "A set of standards that every piece of code must meet before being merged",
          "A graph of bug counts",
          "The highest possible code quality"
        ],
        correct: 1,
        explanation: "Enforcing a quality bar (via linting, testing, reviews) prevents the accumulation of new debt.",
        difficulty: "medium"
      }
    ]
  },
  examQuestions: [
    {
      id: "q27-exam-1",
      question: "In Martin Fowler's Technical Debt Quadrant, what is 'Prudent/Deliberate' debt?",
      options: ["'We don't know what we're doing'", "'We need to ship now and we'll deal with the consequences'", "'What's layering?'", "'Now we know how we should have done it'"],
      correct: 1,
      explanation: "This is a conscious choice to take a shortcut to meet a business goal, with a plan to pay it back.",
      difficulty: "hard"
    },
    {
      id: "q27-exam-2",
      question: "What is 'Technical Interest'?",
      options: ["The excitement developers feel for new tech", "The extra work required for every new feature due to poor code quality", "The financial cost of AWS", "The time spent learning new languages"],
      correct: 1,
      explanation: "Interest is the ongoing productivity cost of debt.",
      difficulty: "medium"
    },
    {
      id: "q27-exam-3",
      question: "Which pattern is used to incrementally replace a monolith?",
      options: ["Singleton", "Observer", "Strangler Fig", "Factory"],
      correct: 2,
      explanation: "The Strangler Fig pattern allows for the gradual replacement of a legacy system.",
      difficulty: "easy"
    },
    {
      id: "q27-exam-4",
      question: "What does the 'Boy Scout Rule' suggest?",
      options: ["Fix all bugs at once", "Leave the code cleaner than you found it", "Only seniors refactor", "Write docs before code"],
      correct: 1,
      explanation: "Continuous small improvements prevent major debt accumulation.",
      difficulty: "easy"
    },
    {
      id: "q27-exam-5",
      question: "Refactoring is:",
      options: ["Fixing bugs", "Adding features", "Improving internal structure without changing behavior", "Rewriting from scratch"],
      correct: 2,
      explanation: "Refactoring improves quality without changing external functionality.",
      difficulty: "easy"
    },
    {
      id: "q27-exam-6",
      question: "What is a 'Code Smell'?",
      options: ["The smell of an old server", "A surface indication of a deeper problem in the code", "A syntax error", "A security vulnerability"],
      correct: 1,
      explanation: "Code smells are heuristics that suggest where the code might be problematic or in need of refactoring.",
      difficulty: "medium"
    },
    {
      id: "q27-exam-7",
      question: "Why is a 'Technical Debt Register' useful?",
      options: ["It makes debt visible and manageable", "It helps HR fire bad coders", "It speeds up the CI/CD pipeline", "It reduces the cost of servers"],
      correct: 0,
      explanation: "You can't manage what you can't see; a register tracks debt items for prioritization.",
      difficulty: "medium"
    },
    {
      id: "q27-exam-8",
      question: "Which of these is 'Reckless/Inadvertent' debt?",
      options: ["'We need to ship now'", "'What's layering?'", "'Now we know better'", "Using a proxy"],
      correct: 1,
      explanation: "Reckless/Inadvertent debt occurs when a team builds poor code simply because they don't know any better.",
      difficulty: "hard"
    },
    {
      id: "q27-exam-9",
      question: "What is 'YAGNI'?",
      options: ["You Are Gonna Need It", "You Ain't Gonna Need It", "Yet Another Great New Innovation", "Yield All Great Net Income"],
      correct: 1,
      explanation: "YAGNI is a principle that discourages adding functionality until it is actually necessary.",
      difficulty: "easy"
    },
    {
      id: "q27-exam-10",
      question: "The 'Blast Radius' of refactoring is minimized by:",
      options: ["Good documentation", "Automated tests", "Manual testing", "Hiring more QA"],
      correct: 1,
      explanation: "Tests give you the confidence that your changes didn't break existing functionality.",
      difficulty: "medium"
    }
  ]
};
