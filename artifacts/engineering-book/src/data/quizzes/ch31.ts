import { ChapterQuizData } from "../quizTypes";

export const CH31_QUIZ: ChapterQuizData = {
  "chapterId": "ch31",
  "sectionQuizzes": {
    "31-1": [
      {
        "id": "q-31-1-1",
        "question": "What is 'Product Thinking' for an engineer?",
        "options": [
          "Thinking about how to use the latest tech stack",
          "Understanding the 'why' behind a feature and focusing on the value delivered to the user",
          "Thinking about how many lines of code a feature needs",
          "Leaving all decisions to the Product Manager"
        ],
        "correct": 1,
        "explanation": "Product thinking involves understanding user needs, business goals, and the problems the software is trying to solve.",
        "difficulty": "medium"
      },
      {
        "id": "q-31-1-2",
        "question": "Why is it important for engineers to understand the 'User Persona'?",
        "options": [
          "To know what name to use in test data",
          "To empathize with the user and make better design/implementation trade-offs",
          "To avoid writing code for certain people",
          "User personas are only for designers, not engineers"
        ],
        "correct": 1,
        "explanation": "Knowing who the user is helps engineers build features that actually solve that user's specific pain points.",
        "difficulty": "easy"
      },
      {
        "id": "q-31-1-3",
        "question": "What is the 'Jobs to be Done' (JTBD) framework?",
        "options": [
          "A list of tasks for the engineering team",
          "A perspective that users 'hire' products to perform a specific job in their lives",
          "A way to track how many jobs are available in the company",
          "A method for calculating salary"
        ],
        "correct": 1,
        "explanation": "JTBD focuses on the underlying motivation and outcome the user wants to achieve.",
        "difficulty": "medium"
      }
    ],
    "31-2": [
      {
        "id": "q-31-2-1",
        "question": "What is an A/B Test (Split Testing)?",
        "options": [
          "Testing two different versions of code in development",
          "Comparing two versions of a webpage or feature to see which one performs better with users",
          "Having two engineers write the same code to see who is faster",
          "A test that only has two possible answers"
        ],
        "correct": 1,
        "explanation": "A/B testing uses data to determine which version of a feature leads to better user engagement or conversion.",
        "difficulty": "easy"
      },
      {
        "id": "q-31-2-2",
        "question": "In A/B testing, what is 'Statistical Significance'?",
        "options": [
          "The number of lines of code changed",
          "A measure of how likely it is that the observed difference between versions is not due to chance",
          "How many people liked the new feature",
          "The speed of the server during the test"
        ],
        "correct": 1,
        "explanation": "You need enough data (sample size) to be confident that the results are meaningful.",
        "difficulty": "medium"
      },
      {
        "id": "q-31-2-3",
        "question": "What is a 'Control' group in an A/B test?",
        "options": [
          "The group that receives the new feature",
          "The group that receives the current (unchanged) version of the product",
          "The engineers who are managing the test",
          "The database that stores the results"
        ],
        "correct": 1,
        "explanation": "The control group provides the baseline for comparison.",
        "difficulty": "easy"
      }
    ],
    "31-3": [
      {
        "id": "q-31-3-1",
        "question": "What is a 'Feature Flag' (or Feature Toggle)?",
        "options": [
          "A way to mark a bug in the code",
          "A software engineering technique that allows turning features on or off without redeploying code",
          "The flag icon in a UI",
          "A type of unit test"
        ],
        "correct": 1,
        "explanation": "Feature flags enable techniques like canary releases, trunk-based development, and gradual rollouts.",
        "difficulty": "easy"
      },
      {
        "id": "q-31-3-2",
        "question": "Which of the following is a benefit of using Feature Flags?",
        "options": [
          "It makes the code more complex",
          "It allows for 'Dark Launches' (deploying code but keeping it hidden from users)",
          "It increases the size of the JavaScript bundle",
          "It eliminates the need for testing"
        ],
        "correct": 1,
        "explanation": "Feature flags allow testing in production safely and decoupling deployment from release.",
        "difficulty": "medium"
      },
      {
        "id": "q-31-3-3",
        "question": "What is 'Canary Deployment'?",
        "options": [
          "Deploying code only to birds",
          "Rolling out a change to a small subset of users before making it available to everyone",
          "Deploying code that is destined to fail",
          "A deployment that happens very early in the morning"
        ],
        "correct": 1,
        "explanation": "Canary deployments help catch issues with a new release before they affect the entire user base.",
        "difficulty": "medium"
      }
    ],
    "31-4": [
      {
        "id": "q-31-4-1",
        "question": "What does 'OKR' stand for?",
        "options": [
          "Overall Knowledge Review",
          "Objectives and Key Results",
          "Operational Key Requirements",
          "Onsite Kernel Resource"
        ],
        "correct": 1,
        "explanation": "OKRs are a popular goal-setting framework used to align teams around measurable outcomes.",
        "difficulty": "easy"
      },
      {
        "id": "q-31-4-2",
        "question": "In OKRs, what is the 'Objective'?",
        "options": [
          "A specific number to be achieved",
          "A qualitative, inspirational, and time-bound goal",
          "The person responsible for the task",
          "A list of tasks to complete"
        ],
        "correct": 1,
        "explanation": "Objectives describe what you want to achieve; Key Results describe how you'll measure success.",
        "difficulty": "medium"
      },
      {
        "id": "q-31-4-3",
        "question": "What is a 'Vanity Metric'?",
        "options": [
          "A metric that is very hard to calculate",
          "A metric that looks good on paper but doesn't correlate with actual business success",
          "A metric about how many people use the 'About Us' page",
          "A metric used by the design team only"
        ],
        "correct": 1,
        "explanation": "Examples include total registered users (if they aren't active) or total page views.",
        "difficulty": "medium"
      }
    ],
    "31-5": [
      {
        "id": "q-31-5-1",
        "question": "What is the primary role of a Product Manager (PM) in relation to the engineering team?",
        "options": [
          "To tell the engineers exactly how to write the code",
          "To define the 'what' and 'why' of the product, prioritizing work based on value",
          "To write the unit tests for the team",
          "To manage the engineers' career paths"
        ],
        "correct": 1,
        "explanation": "PMs act as the bridge between customers, business, and engineering, focusing on product-market fit.",
        "difficulty": "easy"
      },
      {
        "id": "q-31-5-2",
        "question": "What is 'Product Discovery'?",
        "options": [
          "Finding a new product in a store",
          "The process of figuring out what to build through research, prototyping, and validation",
          "The initial release of a software product",
          "Searching for bugs in a competitor's product"
        ],
        "correct": 1,
        "explanation": "Discovery happens before delivery to ensure the team is building the right thing.",
        "difficulty": "medium"
      },
      {
        "id": "q-31-5-3",
        "question": "What is an 'MVP' in product engineering?",
        "options": [
          "Most Valuable Programmer",
          "Minimum Viable Product — the simplest version of a product that allows for learning from users",
          "Maximum Value Protocol",
          "Minimum Version Process"
        ],
        "correct": 1,
        "explanation": "The goal of an MVP is to validate hypotheses with the least amount of effort.",
        "difficulty": "easy"
      }
    ],
    "31-6": [
      {
        "id": "q-31-6-1",
        "question": "What is 'Churn Rate'?",
        "options": [
          "The speed at which code is committed",
          "The percentage of customers who stop using a service over a given time period",
          "How often the database is updated",
          "The rate at which new features are added"
        ],
        "correct": 1,
        "explanation": "Low churn is a sign of a healthy, sticky product.",
        "difficulty": "easy"
      },
      {
        "id": "q-31-6-2",
        "question": "What does 'LTV' stand for in product metrics?",
        "options": [
          "Long Term Value",
          "Lifetime Value — the total revenue expected from a single customer account",
          "Local Time Variable",
          "Logical Task Validation"
        ],
        "correct": 1,
        "explanation": "LTV helps determine how much can be spent on acquiring a new customer (CAC).",
        "difficulty": "medium"
      },
      {
        "id": "q-31-6-3",
        "question": "What is 'Cohort Analysis'?",
        "options": [
          "Analyzing the performance of the whole team",
          "Breaking down users into groups that share common characteristics over time (e.g., signup month)",
          "Comparing the company to its competitors",
          "A type of security audit"
        ],
        "correct": 1,
        "explanation": "Cohorts help identify if product changes are improving retention or engagement for new users compared to old ones.",
        "difficulty": "hard"
      }
    ],
    "31-7": [
      {
        "id": "q-31-7-1",
        "question": "What is 'Product-Led Growth' (PLG)?",
        "options": [
          "Hiring more product managers to grow the company",
          "A strategy where the product itself is the primary driver of customer acquisition and expansion",
          "Letting the product team decide the budget",
          "Marketing a product through TV ads only"
        ],
        "correct": 1,
        "explanation": "PLG relies on users finding value in the product and inviting others (e.g., Slack, Zoom, Dropbox).",
        "difficulty": "medium"
      },
      {
        "id": "q-31-7-2",
        "question": "What is 'Friction' in a user experience?",
        "options": [
          "The physical resistance of a mouse",
          "Anything that prevents a user from accomplishing their goal easily",
          "A disagreement between the designer and the engineer",
          "The heat generated by a server"
        ],
        "correct": 1,
        "explanation": "Reducing friction (e.g., fewer signup steps) is a key goal of product engineering.",
        "difficulty": "easy"
      },
      {
        "id": "q-31-7-3",
        "question": "What is the 'North Star Metric' in the context of product?",
        "options": [
          "The total revenue of the company",
          "The single key metric that best captures the core value your product delivers to customers",
          "The number of likes on social media",
          "The most recent version number"
        ],
        "correct": 1,
        "explanation": "It aligns the team's efforts toward the most impactful outcome for users.",
        "difficulty": "medium"
      }
    ],
    "31-8": [
      {
        "id": "q-31-8-1",
        "question": "What is 'Agile' software development in its purest sense?",
        "options": [
          "A set of strict rules about meetings",
          "An iterative approach to software development that focuses on continuous delivery and feedback",
          "Using Jira for every task",
          "Working as fast as possible without documentation"
        ],
        "correct": 1,
        "explanation": "Agile is a philosophy defined by the Agile Manifesto, emphasizing individuals, interactions, and working software.",
        "difficulty": "easy"
      },
      {
        "id": "q-31-8-2",
        "question": "In Scrum, what is the 'Product Backlog'?",
        "options": [
          "A list of all the products the company has ever made",
          "An ordered list of everything that might be needed in the product",
          "The bugs that were found in production",
          "The history of all git commits"
        ],
        "correct": 1,
        "explanation": "The backlog is the single source of truth for work to be done on the product.",
        "difficulty": "easy"
      },
      {
        "id": "q-31-8-3",
        "question": "What is 'User Story Mapping'?",
        "options": [
          "A map of where all the users live",
          "A visual exercise to help teams understand the user journey and prioritize features",
          "Drawing the UI on a whiteboard",
          "A way to track user GPS locations"
        ],
        "correct": 1,
        "explanation": "It helps teams see the big picture of the user experience rather than just a flat list of tickets.",
        "difficulty": "medium"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch31-1",
      "question": "Which of these is a 'Leading Indicator' for product success?",
      "options": ["Quarterly Revenue", "Daily Active Users (DAU)", "Annual Churn Rate", "Total Profit"],
      "correct": 1,
      "explanation": "Leading indicators (like DAU) change before the business outcomes (like revenue) follow.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch31-2",
      "question": "In the context of A/B testing, what is a 'P-value'?",
      "options": [
        "The probability that the observed result occurred by chance",
        "The price of the product being tested",
        "The number of participants in the test",
        "The performance impact on the server"
      ],
      "correct": 0,
      "explanation": "A lower p-value (usually < 0.05) indicates that the results are statistically significant.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch31-3",
      "question": "What is the 'Aha! Moment' for a user?",
      "options": [
        "When they find a bug",
        "When they first realize the value of the product",
        "When they finish the signup process",
        "When they receive their first invoice"
      ],
      "correct": 1,
      "explanation": "Identifying and accelerating the 'Aha! moment' is critical for user retention.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch31-4",
      "question": "What is 'Dark Launching'?",
      "options": [
        "Launching a product at night",
        "Deploying code into production but keeping features hidden from users via feature flags",
        "Releasing a product without any marketing",
        "Shutting down a product permanently"
      ],
      "correct": 1,
      "explanation": "Dark launches allow for testing performance and stability in the real environment without user impact.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch31-5",
      "question": "What does 'CAC' stand for in business metrics?",
      "options": ["Customer Acquisition Cost", "Centralized Access Control", "Code Analysis Capability", "Customer Activity Cycle"],
      "correct": 0,
      "explanation": "CAC is the total cost of sales and marketing efforts to acquire a new customer.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch31-6",
      "question": "Which of the following is NOT one of the 'AARRR' Pirate Metrics?",
      "options": ["Acquisition", "Activation", "Algorithm", "Retention"],
      "correct": 2,
      "explanation": "AARRR stands for Acquisition, Activation, Retention, Referral, and Revenue.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch31-7",
      "question": "What is 'Dogfooding'?",
      "options": [
        "Feeding the office pet",
        "Using your own product internally to find bugs and improve UX",
        "Selling your product to pet stores",
        "Writing code that is 'low quality' like dog food"
      ],
      "correct": 1,
      "explanation": "Dogfooding helps teams experience the product as a user would.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch31-8",
      "question": "What is a 'Unit of Value' in product engineering?",
      "options": [
        "A single line of code",
        "The smallest exchangeable value a product provides (e.g., a message sent, a ride booked)",
        "One dollar of revenue",
        "One hour of engineering time"
      ],
      "correct": 1,
      "explanation": "Focusing on units of value helps teams align on what truly matters to the customer.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch31-9",
      "question": "What is 'Survivorship Bias' in product research?",
      "options": [
        "Focusing only on the customers who stayed and ignoring those who left",
        "The bias of engineers who survived a layoff",
        "A bias toward products that have been around for a long time",
        "Thinking your product will last forever"
      ],
      "correct": 0,
      "explanation": "If you only talk to active users, you won't understand why people are churning.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch31-10",
      "question": "What is 'Feature Parity'?",
      "options": [
        "Having the same number of features as a competitor",
        "When a new version of a product has all the features of the old version",
        "When two features use the same amount of CPU",
        "When all features are equally liked by users"
      ],
      "correct": 1,
      "explanation": "Achieving feature parity is often a requirement when migrating to a new platform or rewriting a service.",
      "difficulty": "easy"
    }
  ]
};
