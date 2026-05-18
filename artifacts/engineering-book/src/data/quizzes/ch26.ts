import { ChapterQuizData } from "../quizTypes";

export const CH26_QUIZ: ChapterQuizData = {
  chapterId: "ch26",
  sectionQuizzes: {
    "26-1": [
      {
        id: "q26-1-1",
        question: "What is the primary objective of Incident Response?",
        options: [
          "To find the person who caused the error",
          "To restore normal service operation as quickly as possible",
          "To rewrite the failing code immediately",
          "To update the user manual"
        ],
        correct: 1,
        explanation: "The goal of incident response is to mitigate the impact and restore service, minimizing downtime and business disruption.",
        difficulty: "easy"
      },
      {
        id: "q26-1-2",
        question: "Which of these is typically the first step in an incident response lifecycle?",
        options: [
          "Postmortem writing",
          "Detection and Identification",
          "Closing the ticket",
          "Performing chaos engineering"
        ],
        correct: 1,
        explanation: "You cannot respond to an incident until it has been detected and identified as such.",
        difficulty: "easy"
      },
      {
        id: "q26-1-3",
        question: "What is 'Triage' in incident management?",
        options: [
          "The process of fixing all bugs in the backlog",
          "Determining the severity and priority of an incident",
          "Writing the final report",
          "Interviewing customers about the downtime"
        ],
        correct: 1,
        explanation: "Triage involves assessing the impact and urgency to decide how to allocate resources to the incident.",
        difficulty: "medium"
      }
    ],
    "26-2": [
      {
        id: "q26-2-1",
        question: "What is the role of the 'Incident Commander' (IC)?",
        options: [
          "To write the code fixes",
          "To lead the response, delegate tasks, and maintain high-level state",
          "To talk to the press",
          "To reboot the servers"
        ],
        correct: 1,
        explanation: "The IC is the single person in charge of the incident, responsible for the overall strategy and coordination.",
        difficulty: "medium"
      },
      {
        id: "q26-2-2",
        question: "What is the 'Scribe' role in an incident?",
        options: [
          "The person who fixes the database",
          "The person who records the timeline of events and decisions",
          "The person who tells customers about the outage",
          "The manager who approves the budget"
        ],
        correct: 1,
        explanation: "The Scribe documents everything that happens during the incident for later analysis in the postmortem.",
        difficulty: "medium"
      },
      {
        id: "q26-2-3",
        question: "Why should the Incident Commander usually NOT be the one typing commands to fix the system?",
        options: [
          "They probably don't know how",
          "They need to maintain a 'bird's eye view' and not get bogged down in details",
          "It's against HR policy",
          "They should be busy talking to the CEO"
        ],
        correct: 1,
        explanation: "To effectively manage the incident, the IC must avoid 'tunnel vision' and keep track of the overall situation.",
        difficulty: "hard"
      }
    ],
    "26-3": [
      {
        id: "q26-3-1",
        question: "What is an SLO (Service Level Objective)?",
        options: [
          "A legal contract with a customer",
          "A target level for a service reliability metric",
          "The actual measured uptime",
          "A list of bugs to fix"
        ],
        correct: 1,
        explanation: "An SLO is a specific target level for a service's reliability (e.g., 99.9% success rate) that the team aims to meet.",
        difficulty: "medium"
      },
      {
        id: "q26-3-2",
        question: "What is an 'Error Budget'?",
        options: [
          "The amount of money lost during downtime",
          "The difference between 100% reliability and the SLO",
          "The number of bugs allowed in a release",
          "The cost of hiring SREs"
        ],
        correct: 1,
        explanation: "An Error Budget (e.g., 0.1% if the SLO is 99.9%) is the amount of unreliability the team is willing to tolerate before stopping new features to focus on stability.",
        difficulty: "hard"
      },
      {
        id: "q26-3-3",
        question: "What is an SLI (Service Level Indicator)?",
        options: [
          "A promise to the customer",
          "A quantitative measure of some aspect of the level of service",
          "The goal for next year",
          "A tool for monitoring"
        ],
        correct: 1,
        explanation: "An SLI is the metric itself (e.g., latency or error rate) that is used to measure performance against an SLO.",
        difficulty: "medium"
      }
    ],
    "26-4": [
      {
        id: "q26-4-1",
        question: "What is the purpose of an 'On-Call' rotation?",
        options: [
          "To ensure someone is always available to handle incidents",
          "To make sure engineers don't have personal lives",
          "To save money on overnight security",
          "To test who can work the longest"
        ],
        correct: 0,
        explanation: "On-call rotations ensure that technical expertise is available 24/7 to respond to critical service failures.",
        difficulty: "easy"
      },
      {
        id: "q26-4-2",
        question: "What is 'Alert Fatigue'?",
        options: [
          "Being too tired to read emails",
          "The desensitization of engineers to alerts because they are too frequent or non-actionable",
          "A computer virus",
          "When the monitoring system stops working"
        ],
        correct: 1,
        explanation: "Alert fatigue occurs when engineers are overwhelmed by noise, leading them to ignore or miss important alerts.",
        difficulty: "medium"
      },
      {
        id: "q26-4-3",
        question: "Which of these is a best practice for on-call health?",
        options: [
          "Never providing compensation for on-call",
          "Ensuring a minimum of 6-8 people in a rotation to prevent burnout",
          "Alerting on every single warning-level log",
          "Having one person on call 24/7/365"
        ],
        correct: 1,
        explanation: "Sustainable rotations require enough team members to ensure people have significant breaks between their shifts.",
        difficulty: "medium"
      }
    ],
    "26-5": [
      {
        id: "q26-5-1",
        question: "What is a 'Runbook'?",
        options: [
          "A list of running shoes",
          "A compilation of routine procedures and operations for handling specific alerts/tasks",
          "The source code of the application",
          "A diary of the developer"
        ],
        correct: 1,
        explanation: "Runbooks (or playbooks) provide clear, step-by-step instructions for responding to common incidents or performing operational tasks.",
        difficulty: "easy"
      },
      {
        id: "q26-5-2",
        question: "What makes a runbook effective?",
        options: [
          "Being at least 100 pages long",
          "Being clear, actionable, and regularly updated",
          "Using complex language to show expertise",
          "Keeping it in a private folder"
        ],
        correct: 1,
        explanation: "Runbooks must be easy to follow under the stress of an incident and must accurately reflect the current state of the system.",
        difficulty: "medium"
      },
      {
        id: "q26-5-3",
        question: "What is 'Automation of Runbooks'?",
        options: [
          "Deleting the runbooks",
          "Turning manual steps into scripts or automated workflows",
          "Hiring robots to read them",
          "Printing them out automatically"
        ],
        correct: 1,
        explanation: "The ultimate goal is to automate as many operational tasks as possible to reduce human error and response time.",
        difficulty: "medium"
      }
    ],
    "26-6": [
      {
        id: "q26-6-1",
        question: "What is 'Chaos Engineering'?",
        options: [
          "Deleting code at random in production",
          "Disciplined experimentation to reveal systemic weaknesses by injecting failure",
          "Letting interns push to production without review",
          "Working without a plan"
        ],
        correct: 1,
        explanation: "Chaos Engineering involves intentionally introducing failures (like killing a server) to verify that the system is resilient.",
        difficulty: "medium"
      },
      {
        id: "q26-6-2",
        question: "What was the 'Chaos Monkey' tool designed to do?",
        options: [
          "Optimize database queries",
          "Randomly terminate virtual machine instances",
          "Generate fake user traffic",
          "Scan for security vulnerabilities"
        ],
        correct: 1,
        explanation: "Developed by Netflix, Chaos Monkey tests the resilience of their cloud infrastructure by randomly shutting down instances.",
        difficulty: "medium"
      },
      {
        id: "q26-6-3",
        question: "What is the 'Steady State' in chaos engineering?",
        options: [
          "The state when the system is down",
          "The normal, measurable behavior of a system under load",
          "The state of the database after a crash",
          "The mental state of the engineer"
        ],
        correct: 1,
        explanation: "Before injecting failure, you must define and measure the 'steady state' to see how the failure impacts the system's output.",
        difficulty: "hard"
      }
    ],
    "26-7": [
      {
        id: "q26-7-1",
        question: "What is 'Observability' vs 'Monitoring'?",
        options: [
          "They are exactly the same",
          "Monitoring is knowing something is wrong; observability is understanding why",
          "Observability is only for logs",
          "Monitoring is for the UI, observability is for the backend"
        ],
        correct: 1,
        explanation: "Monitoring tells you when a system fails. Observability is the ability to ask arbitrary questions about the system's internal state using external outputs.",
        difficulty: "hard"
      },
      {
        id: "q26-7-2",
        question: "What are the 'Three Pillars of Observability'?",
        options: [
          "Uptime, Downtime, Meantime",
          "Metrics, Logs, Traces",
          "CPU, RAM, Disk",
          "Alerts, Dashboards, Reports"
        ],
        correct: 1,
        explanation: "Observability is typically built on metrics (counters/gauges), logs (event records), and distributed traces (request paths).",
        difficulty: "medium"
      },
      {
        id: "q26-7-3",
        question: "What is a 'Distributed Trace'?",
        options: [
          "A map of all servers",
          "A record of a single request's journey through multiple services",
          "A log file on a remote server",
          "A way to track employee locations"
        ],
        correct: 1,
        explanation: "Distributed tracing is essential in microservices to understand how a single request propagates through the system.",
        difficulty: "medium"
      }
    ],
    "26-8": [
      {
        id: "q26-8-1",
        question: "What is MTTR in the context of incidents?",
        options: [
          "Mean Time To Recurrence",
          "Mean Time To Resolution (or Recovery)",
          "Maximum Time To Respond",
          "Minimum Time To Restart"
        ],
        correct: 1,
        explanation: "MTTR measures how long it takes, on average, to restore service after an incident is detected.",
        difficulty: "easy"
      },
      {
        id: "q26-8-2",
        question: "What is MTTD?",
        options: [
          "Mean Time To Delivery",
          "Mean Time To Detection",
          "Minimum Time To Deploy",
          "Maximum Time To Debug"
        ],
        correct: 1,
        explanation: "MTTD measures the average time between the start of an incident and when the team becomes aware of it.",
        difficulty: "easy"
      },
      {
        id: "q26-8-3",
        question: "Why can 'Mean Time Between Failures' (MTBF) be a misleading metric for modern cloud systems?",
        options: [
          "Cloud systems never fail",
          "In complex systems, components fail constantly; what matters is service availability",
          "It's too hard to calculate",
          "It only applies to hardware"
        ],
        correct: 1,
        explanation: "In distributed systems, individual node failures are expected. The focus shifts from preventing all failure to building resilient services that survive failure.",
        difficulty: "hard"
      }
    ],
    "26-9": [
      {
        id: "q26-9-1",
        question: "What is a 'Game Day'?",
        options: [
          "A day for playing video games at work",
          "A scheduled exercise where a team practices responding to a simulated incident",
          "The day of a product launch",
          "A day with no meetings"
        ],
        correct: 1,
        explanation: "Game Days are proactive sessions to test people, processes, and tools in a controlled failure environment.",
        difficulty: "medium"
      },
      {
        id: "q26-9-2",
        question: "What is 'Self-Healing' in infrastructure?",
        options: [
          "Servers that fix their own hardware",
          "Automated systems that detect and remediate common failures without human intervention",
          "A meditation technique for SREs",
          "Using AI to write code"
        ],
        correct: 1,
        explanation: "Examples of self-healing include auto-scaling groups that replace unhealthy instances or Kubernetes restarts for crashed pods.",
        difficulty: "medium"
      },
      {
        id: "q26-9-3",
        question: "What is 'Blast Radius'?",
        options: [
          "The physical distance from a data center",
          "The extent of the impact of a failure or a change",
          "The speed of a deployment",
          "The number of servers in a cluster"
        ],
        correct: 1,
        explanation: "Engineering for resilience involves minimizing the blast radius of any given failure so it doesn't take down the entire system.",
        difficulty: "medium"
      }
    ],
    "26-10": [
      {
        id: "q26-10-1",
        question: "In a postmortem, what are 'Action Items'?",
        options: [
          "Things people did wrong",
          "Concrete tasks to be completed to prevent future occurrences",
          "The names of people on call",
          "A list of the tools used"
        ],
        correct: 1,
        explanation: "Postmortems are only useful if they lead to tangible improvements in the system or process.",
        difficulty: "easy"
      },
      {
        id: "q26-10-2",
        question: "Why should postmortems be shared widely?",
        options: [
          "To embarrass the team responsible",
          "To allow other teams to learn from the incident and prevent similar issues",
          "Because of legal requirements",
          "To prove that the engineers were working"
        ],
        correct: 1,
        explanation: "Sharing postmortems fosters a culture of transparency and collective learning across the organization.",
        difficulty: "medium"
      },
      {
        id: "q26-10-3",
        question: "What is the 'Five Whys' technique?",
        options: [
          "Asking 'why' five times to find the root cause of a problem",
          "A way to annoy your coworkers",
          "A marketing strategy",
          "A method for deciding which features to build"
        ],
        correct: 0,
        explanation: "By repeatedly asking 'Why?', you can peel away layers of symptoms to find the underlying systemic cause.",
        difficulty: "medium"
      }
    ]
  },
  examQuestions: [
    {
      id: "q26-exam-1",
      question: "Which role in incident management is responsible for communication outside the response team?",
      options: ["Incident Commander", "Liaison Officer / Communications Lead", "Scribe", "Operations Lead"],
      correct: 1,
      explanation: "The Communications Lead handles updates to stakeholders and customers so the technical team can focus on the fix.",
      difficulty: "medium"
    },
    {
      id: "q26-exam-2",
      question: "What does a 99.9% uptime SLO allow in terms of downtime per year?",
      options: ["~52 minutes", "~8.7 hours", "~3.6 days", "~31 seconds"],
      correct: 1,
      explanation: "99.9% uptime (three nines) allows for approximately 8 hours and 45 minutes of downtime per year.",
      difficulty: "hard"
    },
    {
      id: "q26-exam-3",
      question: "What is the main difference between Monitoring and Observability?",
      options: ["Monitoring is newer", "Observability allows you to understand internal states from external outputs", "Monitoring is for logs only", "There is no difference"],
      correct: 1,
      explanation: "Monitoring tells you 'when' things are wrong; observability helps you understand 'why' they are wrong in complex systems.",
      difficulty: "medium"
    },
    {
      id: "q26-exam-4",
      question: "In a blameless postmortem, who is usually to blame?",
      options: ["The Junior Developer", "The CEO", "Nobody; the focus is on the system", "The person on call"],
      correct: 2,
      explanation: "Blameless postmortems explicitly avoid individual blame to focus on systemic improvements.",
      difficulty: "easy"
    },
    {
      id: "q26-exam-5",
      question: "What is an 'Error Budget' used for?",
      options: ["To buy better servers", "To balance feature development with reliability work", "To pay for incident response software", "To track financial losses"],
      correct: 1,
      explanation: "If the error budget is exhausted, the team typically shifts focus from new features to stability and reliability.",
      difficulty: "medium"
    },
    {
      id: "q26-exam-6",
      question: "What is the purpose of 'Chaos Monkey'?",
      options: ["To find security bugs", "To test system resilience by terminating instances", "To automate deployments", "To fix broken code"],
      correct: 1,
      explanation: "It was designed to ensure that the system could survive the failure of individual components.",
      difficulty: "medium"
    },
    {
      id: "q26-exam-7",
      question: "MTTR stands for:",
      options: ["Mean Time To Respond", "Mean Time To Resolution/Recovery", "Minimum Time To Reboot", "Maximum Time To Release"],
      correct: 1,
      explanation: "It is the average time taken to fix an incident once it occurs.",
      difficulty: "easy"
    },
    {
      id: "q26-exam-8",
      question: "What is 'Alert Fatigue'?",
      options: ["When the server gets tired", "Ignoring alerts because there are too many of them", "Being awake all night on call", "When the monitoring tool fails"],
      correct: 1,
      explanation: "Too many non-actionable alerts lead engineers to ignore notification channels, potentially missing real issues.",
      difficulty: "medium"
    },
    {
      id: "q26-exam-9",
      question: "A 'Runbook' should contain:",
      options: ["The history of the company", "Step-by-step procedures for common operations and incidents", "A list of all employees", "The budget for the next year"],
      correct: 1,
      explanation: "Runbooks provide standard operating procedures for technical tasks.",
      difficulty: "easy"
    },
    {
      id: "q26-exam-10",
      question: "The 'Five Whys' is a technique for:",
      options: ["Finding the root cause", "Determining the project deadline", "Deciding on a technology stack", "Interviewing candidates"],
      correct: 0,
      explanation: "It is a simple but effective tool for drilling down through symptoms to find the source of a problem.",
      difficulty: "medium"
    }
  ]
};
