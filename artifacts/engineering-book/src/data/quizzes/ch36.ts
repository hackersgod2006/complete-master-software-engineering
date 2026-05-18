import { ChapterQuizData } from "../quizTypes";

export const CH36_QUIZ: ChapterQuizData = {
  "chapterId": "ch36",
  "sectionQuizzes": {
    "36-1": [
      {
        "id": "q-36-1-1",
        "question": "What is 'Algorithmic Bias'?",
        "options": [
          "When an algorithm runs too slowly",
          "Systematic and repeatable errors in a computer system that create unfair outcomes, such as privileging one group of users over others",
          "A preference for a specific sorting algorithm",
          "When an algorithm is written in a biased programming language"
        ],
        "correct": 1,
        "explanation": "Bias can enter systems through biased training data, poor model design, or the developer's own prejudices.",
        "difficulty": "easy"
      },
      {
        "id": "q-36-1-2",
        "question": "How can training data lead to bias in AI models?",
        "options": [
          "If the data is stored in an unencrypted database",
          "If the data reflects existing historical prejudices or is not representative of the real-world population",
          "If the data is too large for the model",
          "If the data is in the wrong format"
        ],
        "correct": 1,
        "explanation": "A model is only as good (and fair) as the data it is trained on ('Garbage In, Garbage Out').",
        "difficulty": "easy"
      },
      {
        "id": "q-36-1-3",
        "question": "What is the 'Black Box' problem in AI ethics?",
        "options": [
          "The hardware being painted black",
          "The difficulty in understanding or explaining how a complex model arrived at a specific decision",
          "A type of secure storage for data",
          "When the computer screen goes black"
        ],
        "correct": 1,
        "explanation": "Lack of interpretability makes it hard to identify and fix biased or incorrect reasoning in deep learning models.",
        "difficulty": "medium"
      }
    ],
    "36-2": [
      {
        "id": "q-36-2-1",
        "question": "What is the primary goal of the GDPR (General Data Protection Regulation)?",
        "options": [
          "To make the internet faster in Europe",
          "To give individuals control over their personal data and simplify the regulatory environment for international business",
          "To ban all data collection",
          "To tax large tech companies"
        ],
        "correct": 1,
        "explanation": "GDPR established strong privacy rights for EU citizens and has become a global standard.",
        "difficulty": "easy"
      },
      {
        "id": "q-36-2-2",
        "question": "What does 'Privacy by Design' mean?",
        "options": [
          "Making the UI look private",
          "Incorporating privacy and data protection into the development process from the very beginning",
          "Hiding the privacy policy in a small font",
          "Only collecting data from private individuals"
        ],
        "correct": 1,
        "explanation": "Privacy should be a core requirement, not an afterthought or an 'opt-in' feature.",
        "difficulty": "easy"
      },
      {
        "id": "q-36-2-3",
        "question": "What is 'Differential Privacy'?",
        "options": [
          "Treating different users with different levels of privacy",
          "A system for sharing information about a dataset by describing the patterns of groups while withholding information about individuals",
          "A way to encrypt files with different passwords",
          "A privacy setting that changes every day"
        ],
        "correct": 1,
        "explanation": "Differential privacy adds mathematical 'noise' to data to protect individual identities while maintaining statistical accuracy.",
        "difficulty": "hard"
      }
    ],
    "36-3": [
      {
        "id": "q-36-3-1",
        "question": "What is 'Responsible AI'?",
        "options": [
          "AI that does its chores",
          "A framework for developing and deploying AI that is ethical, transparent, and accountable",
          "AI that is owned by a responsible company",
          "AI that never makes a mistake"
        ],
        "correct": 1,
        "explanation": "Responsible AI involves multi-disciplinary efforts to ensure AI benefits society and minimizes harm.",
        "difficulty": "easy"
      },
      {
        "id": "q-36-3-2",
        "question": "What is an 'Ethics Review Board' in a tech company?",
        "options": [
          "A group that decides which snacks to buy",
          "A committee that evaluates projects for potential ethical risks and social impact",
          "The legal department",
          "The board of directors"
        ],
        "correct": 1,
        "explanation": "Ethics boards help ensure that 'just because we can build it, doesn't mean we should'.",
        "difficulty": "medium"
      },
      {
        "id": "q-36-3-3",
        "question": "What is the 'Dual-Use' dilemma in technology?",
        "options": [
          "Having two users for every account",
          "Technologies that can be used for both beneficial and harmful purposes (e.g., facial recognition)",
          "A laptop that is also a tablet",
          "Writing code that works on two operating systems"
        ],
        "correct": 1,
        "explanation": "Engineers must consider how their work might be repurposed for harm by others.",
        "difficulty": "medium"
      }
    ],
    "36-4": [
      {
        "id": "q-36-4-1",
        "question": "What is 'Web Accessibility' (a11y)?",
        "options": [
          "How fast a website loads",
          "The practice of making websites usable by as many people as possible, including those with disabilities",
          "Making a website public",
          "Having a simple URL"
        ],
        "correct": 1,
        "explanation": "Accessibility is an ethical and often legal requirement for software engineering.",
        "difficulty": "easy"
      },
      {
        "id": "q-36-4-2",
        "question": "Which of these is a core principle of the WCAG (Web Content Accessibility Guidelines)?",
        "options": [
          "Perceivable, Operable, Understandable, Robust",
          "Fast, Secure, Scalable, Modern",
          "Beautiful, Interactive, Dark-mode, Mobile-first",
          "Free, Open, Global, Anonymous"
        ],
        "correct": 0,
        "explanation": "The 'POUR' principles guide the creation of accessible digital content.",
        "difficulty": "medium"
      },
      {
        "id": "q-36-4-3",
        "question": "Why is 'Alt Text' important for images?",
        "options": [
          "It makes the page look better",
          "It provides a textual description for screen readers used by people with visual impairments",
          "It helps with SEO only",
          "It is a requirement for JPEG files"
        ],
        "correct": 1,
        "explanation": "Alt text is a simple but vital step in making the web more inclusive.",
        "difficulty": "easy"
      }
    ],
    "36-5": [
      {
        "id": "q-36-5-1",
        "question": "What is 'Dark Patterns' in UI/UX design?",
        "options": [
          "Using a dark color theme",
          "User interfaces designed to trick users into doing things they didn't intend to do (e.g., hidden costs, difficult cancellation)",
          "A design pattern for backend security",
          "Design patterns used at night"
        ],
        "correct": 1,
        "explanation": "Dark patterns are considered unethical as they manipulate user behavior for company profit.",
        "difficulty": "easy"
      },
      {
        "id": "q-36-5-2",
        "question": "What is the 'Right to be Forgotten'?",
        "options": [
          "The right to forget your password",
          "The right to have personal data deleted so that it is no longer accessible to third parties",
          "The right to stop using the internet",
          "When a company forgets who you are"
        ],
        "correct": 1,
        "explanation": "This is a key right under GDPR, allowing individuals to request the removal of their data in certain circumstances.",
        "difficulty": "medium"
      },
      {
        "id": "q-36-5-3",
        "question": "What is 'Surveillance Capitalism'?",
        "options": [
          "Selling security cameras",
          "An economic system centered around the commodification of personal data with the core purpose of profit-making",
          "The government monitoring the stock market",
          "Investing in tech companies"
        ],
        "correct": 1,
        "explanation": "It refers to the business model of many large tech companies that rely on tracking user behavior.",
        "difficulty": "medium"
      }
    ],
    "36-6": [
      {
        "id": "q-36-6-1",
        "question": "What is 'Sustainable Software Engineering'?",
        "options": [
          "Software that never needs to be updated",
          "The practice of building software that minimizes its environmental impact (e.g., carbon footprint, energy usage)",
          "Hiring engineers who can work for a long time",
          "Building software with a large budget"
        ],
        "correct": 1,
        "explanation": "This involves optimizing code for energy efficiency and choosing 'green' cloud providers.",
        "difficulty": "medium"
      },
      {
        "id": "q-36-6-2",
        "question": "What is the 'Carbon Footprint' of a data center?",
        "options": [
          "The physical size of the building",
          "The total amount of greenhouse gases generated by its operation",
          "The amount of paper used in the office",
          "The number of servers it contains"
        ],
        "correct": 1,
        "explanation": "Data centers consume massive amounts of electricity, much of which still comes from fossil fuels.",
        "difficulty": "easy"
      },
      {
        "id": "q-36-6-3",
        "question": "How can 'Bloatware' affect environmental sustainability?",
        "options": [
          "It makes the computer heavier",
          "It requires more processing power and energy, shortening battery life and requiring more frequent hardware upgrades",
          "It uses too much internet bandwidth",
          "It is made of non-recyclable plastic"
        ],
        "correct": 1,
        "explanation": "Efficient code is not just good for performance; it's also better for the planet.",
        "difficulty": "medium"
      }
    ],
    "36-7": [
      {
        "id": "q-36-7-1",
        "question": "What is the 'ACM Code of Ethics'?",
        "options": [
          "A secret code for members only",
          "A set of principles and guidelines for professional conduct in the computing field",
          "A programming language for ethics",
          "A legal contract for all software engineers"
        ],
        "correct": 1,
        "explanation": "The Association for Computing Machinery provides a foundational ethical framework for all computing professionals.",
        "difficulty": "easy"
      },
      {
        "id": "q-36-7-2",
        "question": "What is 'Whistleblowing' in the tech industry?",
        "options": [
          "Blowing a literal whistle in the office",
          "Reporting unethical or illegal activities within one's own organization to the public or authorities",
          "Finding a bug in a competitor's code",
          "Using a whistle to communicate between teams"
        ],
        "correct": 1,
        "explanation": "Whistleblowers play a dangerous but vital role in holding powerful tech companies accountable.",
        "difficulty": "medium"
      },
      {
        "id": "q-36-7-3",
        "question": "Why is 'Informed Consent' difficult in modern software?",
        "options": [
          "Because users can't read",
          "Because terms of service are often too long and complex for users to truly understand what they are agreeing to",
          "Because the internet is too fast",
          "Because consent is not required by law"
        ],
        "correct": 1,
        "explanation": "Improving the transparency and clarity of consent is a major ethical challenge in UX.",
        "difficulty": "medium"
      }
    ],
    "36-8": [
      {
        "id": "q-36-8-1",
        "question": "What is 'Deepfake' technology?",
        "options": [
          "A very deep database",
          "The use of AI to create realistic but fake videos or audio of people saying or doing things they never did",
          "A fake AI that doesn't actually work",
          "A type of highly encrypted message"
        ],
        "correct": 1,
        "explanation": "Deepfakes pose massive ethical risks for misinformation, fraud, and harassment.",
        "difficulty": "easy"
      },
      {
        "id": "q-36-8-2",
        "question": "What is the 'Filter Bubble'?",
        "options": [
          "A physical shield for servers",
          "A state of intellectual isolation that can result from personalized searches when a website algorithm selectively guesses what information a user would like to see",
          "A bug in a search engine's filters",
          "A way to block all ads"
        ],
        "correct": 1,
        "explanation": "Filter bubbles can polarize society by reinforcing existing beliefs and hiding opposing views.",
        "difficulty": "medium"
      },
      {
        "id": "q-36-8-3",
        "question": "What is 'Technological Determinism'?",
        "options": [
          "The belief that technology is always good",
          "The theory that technology is the primary driver of social and cultural change",
          "A way to determine which technology to use",
          "Being determined to finish a coding task"
        ],
        "correct": 1,
        "explanation": "It's the idea that technology follows its own path, regardless of human intent, which can lead to a sense of powerlessness over its ethical impact.",
        "difficulty": "hard"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch36-1",
      "question": "Which ethical principle focuses on 'doing the most good for the greatest number of people'?",
      "options": ["Deontology", "Utilitarianism", "Virtue Ethics", "Nihilism"],
      "correct": 1,
      "explanation": "Utilitarianism is a common framework for evaluating the social impact of technology.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch36-2",
      "question": "What is 'Exploitative Labor' in the context of AI?",
      "options": [
        "Forcing engineers to work long hours",
        "The use of low-paid workers in developing countries to perform data labeling and content moderation under poor conditions",
        "Hiring children to write code",
        "Not paying interns"
      ],
      "correct": 1,
      "explanation": "The 'hidden human labor' behind AI often involves significant ethical concerns.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch36-3",
      "question": "What does 'Explainable AI' (XAI) aim to achieve?",
      "options": [
        "Making AI talk like a human",
        "Creating models that humans can understand, trust, and manage",
        "Adding comments to AI source code",
        "Teaching AI how to explain things to children"
      ],
      "correct": 1,
      "explanation": "XAI is essential for accountability in high-stakes fields like medicine or finance.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch36-4",
      "question": "What is the 'Trolley Problem' in the context of self-driving cars?",
      "options": [
        "The car getting stuck on trolley tracks",
        "The ethical dilemma of choosing between two harmful outcomes in an unavoidable accident",
        "The car not being able to see trolleys",
        "A bug in the navigation system"
      ],
      "correct": 1,
      "explanation": "Autonomous systems must be programmed with ethical rules for situations where harm is inevitable.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch36-5",
      "question": "What is 'Digital Sovereignty'?",
      "options": [
        "The power of the King of the Internet",
        "The ability of a country (or individual) to have control over its digital destiny, data, and infrastructure",
        "A type of cryptocurrency",
        "Having a lot of followers on social media"
      ],
      "correct": 1,
      "explanation": "It involves issues like data residency, local cloud providers, and open-source independence.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch36-6",
      "question": "What is 'Vulnerability Disclosure' ethics?",
      "options": [
        "Telling everyone your secrets",
        "The process of responsibly reporting security flaws to vendors before making them public",
        "Selling security bugs to the highest bidder",
        "Ignoring bugs to save time"
      ],
      "correct": 1,
      "explanation": "Responsible disclosure (or 'Coordinated Vulnerability Disclosure') balances public safety with the need to fix flaws.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch36-7",
      "question": "What is 'Implicit Bias'?",
      "options": [
        "Bias that is explicitly written in the code",
        "Unconscious associations or stereotypes that affect our understanding, actions, and decisions",
        "A bias toward implicit variable naming",
        "Bias that only happens in Python"
      ],
      "correct": 1,
      "explanation": "Engineers may unconsciously build their own biases into the software they create.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch36-8",
      "question": "What is 'Data Minimization'?",
      "options": [
        "Compressing data to save space",
        "The practice of collecting only the data that is strictly necessary for a specific purpose",
        "Deleting all data after use",
        "Using small datasets for training"
      ],
      "correct": 1,
      "explanation": "Data minimization is a core privacy principle that reduces the risk of data breaches.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch36-9",
      "question": "What is the 'Weaponization of AI'?",
      "options": [
        "Building literal robots with guns",
        "The use of AI in cyber warfare, autonomous weapons, or mass surveillance",
        "Making AI that is very mean to users",
        "Using AI to write angry emails"
      ],
      "correct": 1,
      "explanation": "The development of Lethal Autonomous Weapons Systems (LAWS) is a major international ethical debate.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch36-10",
      "question": "What is 'Fairness' in Machine Learning?",
      "options": [
        "The model being fast for everyone",
        "The attempt to ensure that ML models do not discriminate against certain groups based on protected attributes like race or gender",
        "A model that gives every user the same answer",
        "A model that is free to use"
      ],
      "correct": 1,
      "explanation": "Fairness is a complex technical and social goal with many different mathematical definitions.",
      "difficulty": "medium"
    }
  ]
};
