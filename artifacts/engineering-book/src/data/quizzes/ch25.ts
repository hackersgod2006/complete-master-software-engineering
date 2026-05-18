import { ChapterQuizData } from "../quizTypes";

export const CH25_QUIZ: ChapterQuizData = {
  chapterId: "ch25",
  sectionQuizzes: {
    "25-1": [
      {
        id: "q25-1-1",
        question: "What is the primary characteristic of a 'Generative' culture in the Westrum model?",
        options: [
          "Information is hidden",
          "Information is performance-oriented",
          "Messengers are shot",
          "Responsibilities are avoided"
        ],
        correct: 1,
        explanation: "In Westrum's model, a Generative culture is performance-oriented, where messengers are trained, risks are shared, and bridge-building is encouraged.",
        difficulty: "medium"
      },
      {
        id: "q25-1-2",
        question: "Which of the following describes a 'Pathological' culture?",
        options: [
          "Power-oriented, low cooperation",
          "Rule-oriented, bureaucracy",
          "Performance-oriented, high cooperation",
          "Collaborative, mission-driven"
        ],
        correct: 0,
        explanation: "A Pathological culture is power-oriented, characterized by low cooperation and information withholding.",
        difficulty: "medium"
      },
      {
        id: "q25-1-3",
        question: "Why is information flow critical in Westrum's model?",
        options: [
          "It reduces the need for meetings",
          "It predicts software delivery performance",
          "It helps in micromanaging employees",
          "It ensures everyone has the same salary"
        ],
        correct: 1,
        explanation: "Research (like DORA) shows that organizational culture, measured by information flow, predicts software delivery performance and organizational success.",
        difficulty: "hard"
      }
    ],
    "25-2": [
      {
        id: "q25-2-1",
        question: "What is Psychological Safety as defined by Amy Edmondson?",
        options: [
          "A guarantee that no one will be fired",
          "A belief that one will not be punished for making a mistake",
          "A requirement to be nice to everyone",
          "A lack of conflict in the workplace"
        ],
        correct: 1,
        explanation: "Psychological safety is the belief that the environment is safe for interpersonal risk-taking, where one won't be punished for speaking up with ideas, questions, or mistakes.",
        difficulty: "easy"
      },
      {
        id: "q25-2-2",
        question: "How does psychological safety impact team performance?",
        options: [
          "It has no impact on performance",
          "It leads to lower accountability",
          "It enables learning and innovation through open communication",
          "It increases the time taken to make decisions"
        ],
        correct: 2,
        explanation: "Psychological safety allows team members to admit mistakes and learn from them, which is a prerequisite for high performance and innovation.",
        difficulty: "medium"
      },
      {
        id: "q25-2-3",
        question: "Which behavior foster psychological safety in a team?",
        options: [
          "Blaming individuals for system failures",
          "Ignoring minority opinions",
          "Leading by example in admitting fallibility",
          "Enforcing strict hierarchies"
        ],
        correct: 2,
        explanation: "Leaders foster psychological safety by acknowledging their own mistakes and encouraging others to speak up.",
        difficulty: "medium"
      }
    ],
    "25-3": [
      {
        id: "q25-3-1",
        question: "What does Conway's Law state?",
        options: [
          "Software quality decreases over time",
          "Organizations design systems that mirror their communication structures",
          "The speed of light limits distributed systems",
          "Number of developers determines project duration"
        ],
        correct: 1,
        explanation: "Conway's Law states: 'Organizations which design systems... are constrained to produce designs which are copies of the communication structures of these organizations.'",
        difficulty: "medium"
      },
      {
        id: "q25-3-2",
        question: "What is the 'Inverse Conway Maneuver'?",
        options: [
          "Changing the code to fit the team structure",
          "Evolving the organization's structure to achieve a desired architecture",
          "Ignoring communication lines during design",
          "Hiring more people to fix architectural issues"
        ],
        correct: 1,
        explanation: "The Inverse Conway Maneuver involves restructuring the organization to promote the software architecture you want to achieve.",
        difficulty: "hard"
      },
      {
        id: "q25-3-3",
        question: "If two separate teams work on two different modules with no communication, what is the likely outcome?",
        options: [
          "Highly integrated modules",
          "Decoupled modules with a narrow interface",
          "Duplicate code in both modules",
          "Modules that cannot be compiled together"
        ],
        correct: 1,
        explanation: "Conway's Law suggests that lack of communication between teams will result in decoupled system components with minimal interaction points.",
        difficulty: "hard"
      }
    ],
    "25-4": [
      {
        id: "q25-4-1",
        question: "What is a primary benefit of an 'Async-First' culture?",
        options: [
          "More meetings",
          "Immediate responses to all queries",
          "Deep work and flexibility across time zones",
          "Reduced documentation"
        ],
        correct: 2,
        explanation: "Async-first communication enables deep work by reducing interruptions and supports distributed teams across different time zones.",
        difficulty: "easy"
      },
      {
        id: "q25-4-2",
        question: "In an async-first culture, what should be the default for complex discussions?",
        options: [
          "An immediate Zoom call",
          "A well-structured written document or RFC",
          "A long Slack thread",
          "Waiting for the next weekly sync"
        ],
        correct: 1,
        explanation: "Complex discussions should ideally start with written documentation to allow everyone to process information and contribute thoughtfully.",
        difficulty: "medium"
      },
      {
        id: "q25-4-3",
        question: "What is a common pitfall of moving to async-only communication?",
        options: [
          "Too much social interaction",
          "Loss of social bonding and spontaneous collaboration",
          "Faster decision making",
          "Increased office costs"
        ],
        correct: 1,
        explanation: "While async is great for work, 'async-only' can lead to isolation. Successful teams balance async work with intentional synchronous social or high-bandwidth sessions.",
        difficulty: "medium"
      }
    ],
    "25-5": [
      {
        id: "q25-5-1",
        question: "What is 'Documentation Culture'?",
        options: [
          "Writing manuals only at the end of a project",
          "Treating documentation as a first-class citizen in the development process",
          "Hiring technical writers to do all the writing",
          "Saving all emails for legal reasons"
        ],
        correct: 1,
        explanation: "A documentation culture treats writing and maintaining docs as part of the core engineering task, not an afterthought.",
        difficulty: "medium"
      },
      {
        id: "q25-5-2",
        question: "What does 'Docs like Code' mean?",
        options: [
          "Writing docs in binary",
          "Using the same tools for docs as for code (Git, Markdown, CI/CD)",
          "Executing documentation to run tests",
          "Only developers should read documentation"
        ],
        correct: 1,
        explanation: "'Docs like Code' involves using version control, peer reviews, and automated testing/deployment for documentation.",
        difficulty: "medium"
      },
      {
        id: "q25-5-3",
        question: "Why is 'Institutional Memory' important?",
        options: [
          "It helps in tracking employee attendance",
          "It prevents the loss of critical knowledge when people leave",
          "It's a requirement for ISO certification",
          "It increases the size of the database"
        ],
        correct: 1,
        explanation: "Documentation preserves the 'why' behind decisions, ensuring that knowledge remains within the organization regardless of staff turnover.",
        difficulty: "medium"
      }
    ],
    "25-6": [
      {
        id: "q25-6-1",
        question: "What is the core goal of a 'Blameless Postmortem'?",
        options: [
          "To find out whose fault it was",
          "To understand systemic failures and prevent recurrence",
          "To excuse bad behavior",
          "To satisfy legal requirements"
        ],
        correct: 1,
        explanation: "Blameless postmortems focus on how a failure happened and how the system can be improved, rather than blaming individuals.",
        difficulty: "easy"
      },
      {
        id: "q25-6-2",
        question: "In a blameless culture, how is human error viewed?",
        options: [
          "As the root cause of most problems",
          "As a symptom of deeper systemic issues",
          "As something that should be punished",
          "As something that can't be avoided or improved"
        ],
        correct: 1,
        explanation: "Human error is seen as a starting point for investigation, pointing toward gaps in tools, training, or process.",
        difficulty: "medium"
      },
      {
        id: "q25-6-3",
        question: "What is the 'Retrospective Prime Directive'?",
        options: [
          "The person with the highest rank is always right",
          "Everyone did the best job they could, given what they knew at the time",
          "All bugs must be fixed within 24 hours",
          "Meetings must end on time"
        ],
        correct: 1,
        explanation: "The Prime Directive states that we believe everyone did the best they could with the information and skills they had at the time.",
        difficulty: "medium"
      }
    ],
    "25-7": [
      {
        id: "q25-7-1",
        question: "What is 'Engineering Excellence'?",
        options: [
          "Writing the most complex code possible",
          "A continuous commitment to technical quality and operational health",
          "Never having any bugs",
          "Using only the newest technologies"
        ],
        correct: 1,
        explanation: "Engineering excellence is a culture of high standards, continuous improvement, and pride in craft.",
        difficulty: "easy"
      },
      {
        id: "q25-7-2",
        question: "Which of these is a key metric for engineering health?",
        options: [
          "Lines of code written per day",
          "Change Lead Time",
          "Number of emails sent",
          "Hours spent in the office"
        ],
        correct: 1,
        explanation: "Change Lead Time (one of the DORA metrics) is a key indicator of engineering efficiency and health.",
        difficulty: "medium"
      },
      {
        id: "q25-7-3",
        question: "How does 'Continuous Improvement' (Kaizen) apply to software?",
        options: [
          "Doing a big rewrite every year",
          "Making small, incremental improvements to code and processes daily",
          "Changing the tech stack every month",
          "Only fixing bugs that customers report"
        ],
        correct: 1,
        explanation: "Kaizen in software means constantly looking for ways to improve the codebase, tools, and workflows in small steps.",
        difficulty: "medium"
      }
    ],
    "25-8": [
      {
        id: "q25-8-1",
        question: "What does 'You Build It, You Run It' imply?",
        options: [
          "Developers should never sleep",
          "Developers are responsible for the operation of their own services",
          "Operations teams are no longer needed",
          "The CEO should write code"
        ],
        correct: 1,
        explanation: "This philosophy, popularized by Amazon, aligns incentives by making the people who write the software responsible for its performance in production.",
        difficulty: "medium"
      },
      {
        id: "q25-8-2",
        question: "What is a 'T-shaped' engineer?",
        options: [
          "An engineer who only does testing",
          "An engineer with deep expertise in one area and broad knowledge across others",
          "An engineer who works 10 hours a day",
          "An engineer who only works on the 'T' (Top) layer of an app"
        ],
        correct: 1,
        explanation: "A T-shaped person has deep skill in one specialty (the vertical bar) and a broad ability to collaborate across disciplines (the horizontal bar).",
        difficulty: "medium"
      },
      {
        id: "q25-8-3",
        question: "Why is 'Autonomy' important in engineering teams?",
        options: [
          "It allows people to do whatever they want",
          "It fosters ownership, motivation, and faster decision making",
          "It removes the need for management",
          "It ensures everyone uses different tools"
        ],
        correct: 1,
        explanation: "Autonomy, when coupled with alignment, empowers teams to solve problems effectively and take ownership of their results.",
        difficulty: "medium"
      }
    ],
    "25-9": [
      {
        id: "q25-9-1",
        question: "What is 'Toil' in the context of SRE and engineering culture?",
        options: [
          "Hard engineering work that adds value",
          "Manual, repetitive work with no long-term value",
          "Writing unit tests",
          "Attending design reviews"
        ],
        correct: 1,
        explanation: "Toil is manual, repetitive, automatable work that lacks enduring value and scales linearly with service growth.",
        difficulty: "medium"
      },
      {
        id: "q25-9-2",
        question: "How should a healthy engineering culture handle toil?",
        options: [
          "Hire more juniors to do it",
          "Ignore it until it becomes a crisis",
          "Identify and automate it away",
          "Make it a permanent part of the job description"
        ],
        correct: 2,
        explanation: "Healthy cultures prioritize the automation of toil to free up engineers for high-value creative work.",
        difficulty: "medium"
      },
      {
        id: "q25-9-3",
        question: "What is the 'Broken Window Theory' in software?",
        options: [
          "If the office is messy, the code will be too",
          "Small instances of low quality (like bad code) lead to a general decline in standards",
          "Windows 11 is broken",
          "Physical security is as important as cyber security"
        ],
        correct: 1,
        explanation: "Allowing 'small' things like messy code or failing tests to persist signals that low quality is acceptable, leading to further decay.",
        difficulty: "medium"
      }
    ],
    "25-10": [
      {
        id: "q25-10-1",
        question: "What is 'Mentorship' in a healthy culture?",
        options: [
          "A one-way street where seniors tell juniors what to do",
          "A mutual learning relationship that grows both parties",
          "Only for interns",
          "A waste of senior engineers' time"
        ],
        correct: 1,
        explanation: "Mentorship benefits both the mentor and mentee, fostering knowledge sharing and professional growth across the organization.",
        difficulty: "easy"
      },
      {
        id: "q25-10-2",
        question: "What is 'Sponsorship' compared to mentorship?",
        options: [
          "Paying for someone's lunch",
          "Actively using one's influence to advocate for someone's career advancement",
          "The same thing as mentorship",
          "Finding a company to pay for a conference"
        ],
        correct: 1,
        explanation: "While mentors give advice, sponsors use their social capital and authority to open doors for their protégés.",
        difficulty: "hard"
      },
      {
        id: "q25-10-3",
        question: "Why is 'Inclusivity' vital for engineering teams?",
        options: [
          "It's just a legal requirement",
          "Diverse perspectives lead to better problem solving and innovation",
          "It makes the team look good on social media",
          "It reduces the cost of hiring"
        ],
        correct: 1,
        explanation: "Inclusivity ensures that all voices are heard, bringing a wider range of perspectives to bear on complex technical challenges.",
        difficulty: "medium"
      }
    ]
  },
  examQuestions: [
    {
      id: "q25-exam-1",
      question: "In the Westrum model, which culture is characterized by 'messengers are trained'?",
      options: ["Pathological", "Bureaucratic", "Generative", "Authoritarian"],
      correct: 2,
      explanation: "Generative cultures value information and treat messengers who bring bad news as sources of learning.",
      difficulty: "medium"
    },
    {
      id: "q25-exam-2",
      question: "According to Conway's Law, what determines the architecture of a system?",
      options: ["The programming language used", "The organization's communication structure", "The hardware requirements", "The project budget"],
      correct: 1,
      explanation: "Conway's Law posits that a system's design is a reflection of the communication patterns of the team that built it.",
      difficulty: "medium"
    },
    {
      id: "q25-exam-3",
      question: "What is the primary goal of a blameless postmortem?",
      options: ["Identify the culprit", "Avoid legal liability", "Prevent future incidents by learning", "Close the ticket quickly"],
      correct: 2,
      explanation: "The goal is to understand the systemic causes of a failure to prevent it from happening again.",
      difficulty: "easy"
    },
    {
      id: "q25-exam-4",
      question: "Which of these is a hallmark of 'Async-First' communication?",
      options: ["Mandatory standups", "Reliance on well-written documents", "Instant replies to DMs", "Frequent all-hands meetings"],
      correct: 1,
      explanation: "Async-first cultures rely on documentation to communicate ideas and decisions without requiring everyone to be online at once.",
      difficulty: "medium"
    },
    {
      id: "q25-exam-5",
      question: "What does psychological safety allow team members to do without fear?",
      options: ["Take extra vacation", "Take interpersonal risks like admitting mistakes", "Ignore company policies", "Work on whatever they want"],
      correct: 1,
      explanation: "Psychological safety is about being able to speak up and take risks without fear of negative consequences.",
      difficulty: "easy"
    },
    {
      id: "q25-exam-6",
      question: "The 'Inverse Conway Maneuver' suggests:",
      options: ["Organizing teams to match the desired software architecture", "Rewriting code to match the org chart", "Firing teams that don't communicate", "Moving all developers to the same office"],
      correct: 0,
      explanation: "It involves changing the organization's structure to encourage the emergence of a specific system architecture.",
      difficulty: "hard"
    },
    {
      id: "q25-exam-7",
      question: "What is 'Toil'?",
      options: ["Creative coding", "Repetitive, manual work with no long-term value", "Complex bug fixing", "Managing a team"],
      correct: 1,
      explanation: "Toil is the kind of work that scales with service size but doesn't improve the service.",
      difficulty: "medium"
    },
    {
      id: "q25-exam-8",
      question: "A 'T-shaped' engineer has:",
      options: ["One narrow skill", "Deep expertise in one area and broad skills in others", "Equal expertise in all areas", "Only management skills"],
      correct: 1,
      explanation: "The vertical bar represents depth, and the horizontal bar represents breadth/collaboration.",
      difficulty: "medium"
    },
    {
      id: "q25-exam-9",
      question: "What is the benefit of 'Docs like Code'?",
      options: ["It makes docs harder to read", "It applies engineering rigour (reviews, CI/CD) to documentation", "It allows docs to be compiled", "It reduces the need for comments"],
      correct: 1,
      explanation: "Treating docs like code ensures they are reviewed, tested, and kept in sync with the system.",
      difficulty: "medium"
    },
    {
      id: "q25-exam-10",
      question: "Which Westrum culture type is characterized by 'responsibilities are avoided'?",
      options: ["Generative", "Pathological", "Bureaucratic", "Collaborative"],
      correct: 1,
      explanation: "Pathological cultures are power-oriented and often involve avoiding responsibility and blaming others.",
      difficulty: "hard"
    }
  ]
};
