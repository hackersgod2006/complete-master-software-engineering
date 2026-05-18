import { ChapterQuizData } from "../quizTypes";

export const CH32_QUIZ: ChapterQuizData = {
  "chapterId": "ch32",
  "sectionQuizzes": {
    "32-1": [
      {
        "id": "q-32-1-1",
        "question": "What is the main goal of an MVP (Minimum Viable Product) for a startup?",
        "options": [
          "To build a perfect, bug-free product",
          "To validate core business hypotheses with the least effort",
          "To use as many new technologies as possible",
          "To impress venture capitalists with a beautiful UI"
        ],
        "correct": 1,
        "explanation": "The MVP is about learning and validation, not feature completeness or technical perfection.",
        "difficulty": "easy"
      },
      {
        "id": "q-32-1-2",
        "question": "What is 'Lean Startup' methodology?",
        "options": [
          "A startup with very few employees",
          "An approach focused on the build-measure-learn feedback loop to eliminate waste",
          "A startup that doesn't use any cloud services",
          "A way to build startups without any funding"
        ],
        "correct": 1,
        "explanation": "Lean Startup emphasizes rapid experimentation and validated learning.",
        "difficulty": "medium"
      },
      {
        "id": "q-32-1-3",
        "question": "What is a 'Pivot' in the context of a startup?",
        "options": [
          "Firing the CEO",
          "A fundamental change in business strategy based on learning from the market",
          "Rotating the office furniture",
          "Changing the programming language of the backend"
        ],
        "correct": 1,
        "explanation": "Pivoting allows startups to find product-market fit when their initial idea isn't working.",
        "difficulty": "easy"
      }
    ],
    "32-2": [
      {
        "id": "q-32-2-1",
        "question": "What is the primary responsibility of a Technical Co-founder?",
        "options": [
          "Only writing code for 12 hours a day",
          "Building the initial product while also making high-level technology and strategy decisions",
          "Hiring the first 100 employees immediately",
          "Managing the startup's bank account"
        ],
        "correct": 1,
        "explanation": "The technical co-founder must balance hands-on development with long-term technical vision.",
        "difficulty": "easy"
      },
      {
        "id": "q-32-2-2",
        "question": "What is 'Vesting' in the context of founder equity?",
        "options": [
          "The process of buying professional clothes",
          "A schedule where equity is earned over time to ensure long-term commitment",
          "Selling all shares to an investor",
          "Giving away free products to users"
        ],
        "correct": 1,
        "explanation": "Vesting protects the company by ensuring founders and early employees stay long enough to contribute value.",
        "difficulty": "medium"
      },
      {
        "id": "q-32-2-3",
        "question": "What is a 'Cliff' in a vesting schedule?",
        "options": [
          "The point where the startup goes bankrupt",
          "A period (usually one year) before any equity begins to vest",
          "The highest point of the company's valuation",
          "A dangerous bug in the code"
        ],
        "correct": 1,
        "explanation": "A one-year cliff means if you leave before one year, you get no equity.",
        "difficulty": "medium"
      }
    ],
    "32-3": [
      {
        "id": "q-32-3-1",
        "question": "Which architecture is often recommended for early-stage startups to move fast?",
        "options": [
          "A complex microservices architecture",
          "A well-structured monolith",
          "A multi-region serverless deployment from day one",
          "Manual deployment to a single physical server"
        ],
        "correct": 1,
        "explanation": "Monoliths are generally easier to build, deploy, and reason about in the early stages when the domain is still evolving.",
        "difficulty": "medium"
      },
      {
        "id": "q-32-3-2",
        "question": "What is 'Boring Technology' in the context of startups?",
        "options": [
          "Technologies that are no longer used",
          "Stable, well-understood technologies with large communities and proven track records",
          "Technologies that are hard to learn",
          "Technologies that have no documentation"
        ],
        "correct": 1,
        "explanation": "Using 'boring' tech (like Postgres or Rails) reduces technical risk and allows the team to focus on the product.",
        "difficulty": "medium"
      },
      {
        "id": "q-32-3-3",
        "question": "Why is 'Premature Optimization' often called the root of all evil in startups?",
        "options": [
          "Because it makes the code too fast",
          "Because it wastes time on technical problems that might never be relevant if the product fails",
          "Because it uses too much memory",
          "Because it's only for senior engineers"
        ],
        "correct": 1,
        "explanation": "Startups should focus on features and validation before spending significant time on deep performance tuning.",
        "difficulty": "easy"
      }
    ],
    "32-4": [
      {
        "id": "q-32-4-1",
        "question": "What is the 'Rule of Three' in scaling systems?",
        "options": [
          "You must have three servers at all times",
          "A system architecture usually needs a major rethink when it grows by roughly 3x or 10x",
          "Only three people should have admin access",
          "Everything should be backed up three times"
        ],
        "correct": 1,
        "explanation": "As traffic grows by orders of magnitude, the bottlenecks and architectural assumptions change.",
        "difficulty": "medium"
      },
      {
        "id": "q-32-4-2",
        "question": "What is the primary benefit of 'Horizontal Scaling'?",
        "options": [
          "Making a single server more powerful",
          "Adding more instances of servers to handle increased load",
          "Writing code that is more horizontal",
          "Reducing the number of tables in a database"
        ],
        "correct": 1,
        "explanation": "Horizontal scaling allows for nearly limitless growth by adding more commodity hardware or cloud instances.",
        "difficulty": "easy"
      },
      {
        "id": "q-32-4-3",
        "question": "What is 'Database Sharding'?",
        "options": [
          "A way to encrypt data",
          "Partitioning data across multiple database instances to distribute load",
          "Deleting old data to save space",
          "Creating read-only replicas"
        ],
        "correct": 1,
        "explanation": "Sharding is a common technique for scaling databases when a single instance can't handle the volume.",
        "difficulty": "medium"
      }
    ],
    "32-5": [
      {
        "id": "q-32-5-1",
        "question": "What is 'Product-Market Fit' (PMF)?",
        "options": [
          "When the product looks like the marketing materials",
          "The stage where a product satisfies a strong market demand",
          "When the product fits on a mobile screen",
          "When the engineers agree with the product managers"
        ],
        "correct": 1,
        "explanation": "PMF is the goal of every early-stage startup; once achieved, the focus shifts to scaling.",
        "difficulty": "easy"
      },
      {
        "id": "q-32-5-2",
        "question": "What is 'Burn Rate'?",
        "options": [
          "How fast the servers are running",
          "The rate at which a startup spends its venture capital before generating positive cash flow",
          "The rate of employee resignations",
          "How fast the team writes code"
        ],
        "correct": 1,
        "explanation": "Managing burn rate is critical for survival until the next funding round or profitability.",
        "difficulty": "easy"
      },
      {
        "id": "q-32-5-3",
        "question": "What is 'Runway'?",
        "options": [
          "The path to the office",
          "The amount of time a startup has before it runs out of money, calculated based on current cash and burn rate",
          "The speed of the network",
          "The time it takes to deploy a feature"
        ],
        "correct": 1,
        "explanation": "Runway = (Current Cash) / (Monthly Burn Rate).",
        "difficulty": "easy"
      }
    ],
    "32-6": [
      {
        "id": "q-32-6-1",
        "question": "What is the purpose of a 'Seed Round'?",
        "options": [
          "To buy seeds for the office garden",
          "The first formal stage of venture capital financing to help the startup grow from an idea to a product",
          "The final round of funding before an IPO",
          "A round of funding only for agriculture startups"
        ],
        "correct": 1,
        "explanation": "Seed funding usually supports initial product development and market entry.",
        "difficulty": "easy"
      },
      {
        "id": "q-32-6-2",
        "question": "What is a 'Series A' round typically focused on?",
        "options": [
          "Building the very first prototype",
          "Scaling a product that has already shown some product-market fit",
          "Firing the founders",
          "Preparing for an immediate acquisition"
        ],
        "correct": 1,
        "explanation": "Series A is about taking a proven concept and scaling the business model.",
        "difficulty": "medium"
      },
      {
        "id": "q-32-6-3",
        "question": "What is 'Equity Dilution'?",
        "options": [
          "Making the company's value lower",
          "The reduction in ownership percentage for existing shareholders when new shares are issued (e.g., in a funding round)",
          "Selling shares at a discount",
          "Giving shares to every single user"
        ],
        "correct": 1,
        "explanation": "Every time a startup raises money, the founders' percentage of ownership decreases.",
        "difficulty": "medium"
      }
    ],
    "32-7": [
      {
        "id": "q-32-7-1",
        "question": "What is 'Growth Hacking'?",
        "options": [
          "Hacking into other companies to steal their users",
          "A process of rapid experimentation across marketing and product to identify the most effective ways to grow a business",
          "Writing code that grows automatically",
          "Hiring a lot of people very quickly"
        ],
        "correct": 1,
        "explanation": "Growth hacking focuses on low-cost, high-impact strategies for user acquisition.",
        "difficulty": "medium"
      },
      {
        "id": "q-32-7-2",
        "question": "What is a 'Viral Loop'?",
        "options": [
          "A bug that causes a server to crash",
          "A mechanism where a user's action leads to more users joining the platform",
          "A type of infinite loop in JavaScript",
          "A video that goes viral"
        ],
        "correct": 1,
        "explanation": "Classic examples include inviting friends to get more storage (Dropbox) or 'Sent from my iPhone'.",
        "difficulty": "medium"
      },
      {
        "id": "q-32-7-3",
        "question": "What is 'Product-Led Growth'?",
        "options": [
          "Growth driven primarily by the sales team",
          "Growth driven by the product itself being the main driver of acquisition, retention, and expansion",
          "Growth driven by spending a lot on ads",
          "Growth driven by the product manager's decisions only"
        ],
        "correct": 1,
        "explanation": "PLG focuses on delivering value quickly to convert users into advocates.",
        "difficulty": "medium"
      }
    ],
    "32-8": [
      {
        "id": "q-32-8-1",
        "question": "What is a 'Cap Table'?",
        "options": [
          "A table where everyone wears caps",
          "A spreadsheet showing the ownership of a company, including equity shares and valuations",
          "A table of the maximum capacities of servers",
          "A list of all capital expenditures"
        ],
        "correct": 1,
        "explanation": "The capitalization table tracks who owns what percentage of the startup.",
        "difficulty": "easy"
      },
      {
        "id": "q-32-8-2",
        "question": "What is an 'Exit' for a startup?",
        "options": [
          "When the office door is closed",
          "An event where founders and investors sell their shares, typically through an acquisition or IPO",
          "When a founder leaves the company early",
          "When a user deletes their account"
        ],
        "correct": 1,
        "explanation": "An exit is the liquidating event that realizes the value created by the startup.",
        "difficulty": "easy"
      },
      {
        "id": "q-32-8-3",
        "question": "What is 'Acqui-hiring'?",
        "options": [
          "Hiring people who were recently fired",
          "Acquiring a company primarily for its talented employees rather than its product or service",
          "Hiring people from a company you just acquired",
          "Hiring people through an agency"
        ],
        "correct": 1,
        "explanation": "Large tech companies often buy small startups just to get their engineers.",
        "difficulty": "medium"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch32-1",
      "question": "What is the 'Innovator's Dilemma'?",
      "options": [
        "Choosing which programming language to use",
        "The difficulty for established companies to adopt new technologies that might disrupt their existing business",
        "Deciding whether to build or buy a solution",
        "The struggle of finding a technical co-founder"
      ],
      "correct": 1,
      "explanation": "Established companies often focus on current customers and miss the next wave of innovation.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch32-2",
      "question": "Which of these is a key characteristic of a 'Unicorn' startup?",
      "options": ["It has a magical culture", "It is valued at over $1 billion", "It has over 1,000 employees", "It is profitable from day one"],
      "correct": 1,
      "explanation": "Unicorn is a term for a private startup valued at $1 billion or more.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch32-3",
      "question": "What is the 'Build-Measure-Learn' loop?",
      "options": [
        "The process of code compilation",
        "The core feedback loop of the Lean Startup methodology",
        "The stages of a developer's career",
        "A way to calculate server costs"
      ],
      "correct": 1,
      "explanation": "It emphasizes rapid iteration to validate ideas.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch32-4",
      "question": "What is 'Technical Debt' in a startup context?",
      "options": [
        "Money owed to AWS",
        "The cost of choosing a 'quick and dirty' solution now to move fast",
        "The cost of buying new laptops",
        "The salary of the CTO"
      ],
      "correct": 1,
      "explanation": "Startups often take on tech debt intentionally to reach market faster, but it must be managed.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch32-5",
      "question": "In the 'Scaling from 0 to 1M users' journey, when is caching usually introduced?",
      "options": [
        "Day 1, even before the first user",
        "When the database becomes a bottleneck (usually around 10k-100k users)",
        "Only after reaching 1 million users",
        "Never, modern databases are fast enough"
      ],
      "correct": 1,
      "explanation": "Caching is a cost-effective way to offload the database as traffic grows.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch32-6",
      "question": "What is 'Blitzscaling'?",
      "options": [
        "A very fast way to compile code",
        "The pursuit of rapid growth by prioritizing speed over efficiency in an environment of uncertainty",
        "Scaling a team by hiring only interns",
        "Scaling a startup without any investment"
      ],
      "correct": 1,
      "explanation": "Blitzscaling is a strategy for aggressive growth to dominate a market.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch32-7",
      "question": "What does 'SaaS' stand for?",
      "options": ["Software as a Service", "Servers and a Storage", "System and Application Security", "Software and Analytics Suite"],
      "correct": 0,
      "explanation": "SaaS is a common business model for startups delivering software over the internet.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch32-8",
      "question": "What is a 'Convertible Note'?",
      "options": [
        "A laptop that turns into a tablet",
        "A type of short-term debt that converts into equity, typically in conjunction with a future financing round",
        "A note written in multiple languages",
        "A way to change the programming language of a project"
      ],
      "correct": 1,
      "explanation": "Convertible notes are often used in seed rounds to defer valuation until a Series A.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch32-9",
      "question": "What is 'Unit Economics'?",
      "options": [
        "The cost of a single unit of CPU time",
        "The direct revenues and costs associated with a particular business model, expressed on a per-unit basis",
        "The salary of one engineer",
        "The price of one share of stock"
      ],
      "correct": 1,
      "explanation": "Unit economics (like LTV and CAC) show whether a business is sustainable.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch32-10",
      "question": "What is 'Churn' and why is it dangerous for a startup?",
      "options": [
        "A way to make butter",
        "The rate at which users stop using the product; high churn can kill growth even with many new signups",
        "The rate at which code is refactored",
        "The frequency of server restarts"
      ],
      "correct": 1,
      "explanation": "If you lose users as fast as you gain them, you cannot scale.",
      "difficulty": "easy"
    }
  ]
};
