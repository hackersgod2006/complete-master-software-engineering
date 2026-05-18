import { ChapterQuizData } from "../quizTypes";

export const CH22_QUIZ: ChapterQuizData = {
  chapterId: "ch22",
  sectionQuizzes: {
    "22-1": [
      {
        id: "q22-1-1",
        question: "What is the core definition of Observability?",
        options: [
          "The ability to see what's happening on the screen",
          "Understanding the internal state of a system by looking at its external outputs",
          "Installing more monitors in the office",
          "Recording all user sessions"
        ],
        correct: 1,
        explanation: "Observability is about inferring the internal state of a complex system from its logs, metrics, and traces.",
        difficulty: "easy"
      },
      {
        id: "q22-1-2",
        question: "How does Observability differ from Monitoring?",
        options: [
          "They are exactly the same",
          "Monitoring tells you when something is wrong; Observability helps you understand why",
          "Observability is only for hardware",
          "Monitoring is more modern than Observability"
        ],
        correct: 1,
        explanation: "Monitoring is often about 'known unknowns' (thresholds), while Observability is for 'unknown unknowns' (exploration).",
        difficulty: "medium"
      },
      {
        id: "q22-1-3",
        question: "Which are often called the 'Three Pillars of Observability'?",
        options: [
          "Logs, Metrics, and Traces",
          "Servers, Storage, and Network",
          "Developers, Operators, and Managers",
          "HTML, CSS, and JavaScript"
        ],
        correct: 0,
        explanation: "Logs, metrics, and traces are the foundational data types for observing distributed systems.",
        difficulty: "easy"
      }
    ],
    "22-2": [
      {
        id: "q22-2-1",
        question: "What is 'Structured Logging'?",
        options: [
          "Writing logs in a notebook",
          "Logs formatted as machine-readable data (e.g., JSON) instead of plain text",
          "Indenting log messages properly",
          "Only logging during business hours"
        ],
        correct: 1,
        explanation: "Structured logs allow for easy parsing and querying by automated tools.",
        difficulty: "medium"
      },
      {
        id: "q22-2-2",
        question: "Which log level should be used for messages that are helpful during development but too verbose for production?",
        options: [
          "ERROR",
          "WARN",
          "INFO",
          "DEBUG"
        ],
        correct: 3,
        explanation: "DEBUG logs provide high-granularity information typically used for troubleshooting during development.",
        difficulty: "easy"
      },
      {
        id: "q22-2-3",
        question: "What is 'Log Aggregation'?",
        options: [
          "Deleting old logs",
          "Collecting logs from many sources into a single, searchable location",
          "Summarizing logs at the end of the day",
          "Encrypting log files"
        ],
        correct: 1,
        explanation: "In distributed systems, you need a central place to view logs from all services (e.g., ELK stack).",
        difficulty: "medium"
      }
    ],
    "22-3": [
      {
        id: "q22-3-1",
        question: "What are 'Metrics' in the context of observability?",
        options: [
          "Written descriptions of errors",
          "Numerical measurements of a system's behavior over time",
          "Lists of user names",
          "Pictures of server racks"
        ],
        correct: 1,
        explanation: "Metrics are quantitative data points like CPU usage, request rate, or error count.",
        difficulty: "easy"
      },
      {
        id: "q22-3-2",
        question: "What is the difference between a 'Counter' and a 'Gauge' metric?",
        options: [
          "A Counter only goes up; a Gauge can go up and down",
          "A Gauge only goes up; a Counter can go up and down",
          "They are the same thing",
          "Counter is for text; Gauge is for numbers"
        ],
        correct: 0,
        explanation: "Counters (like total requests) are monotonic; Gauges (like current memory usage) represent a current value.",
        difficulty: "medium"
      },
      {
        id: "q22-3-3",
        question: "What is 'Cardinality' in metrics?",
        options: [
          "The number of servers in a cluster",
          "The number of unique combinations of label values",
          "The speed of the network",
          "The color of the dashboard"
        ],
        correct: 1,
        explanation: "High cardinality (e.g., using User ID as a label) can cause performance issues in metric systems like Prometheus.",
        difficulty: "hard"
      }
    ],
    "22-4": [
      {
        id: "q22-4-1",
        question: "What is Distributed Tracing used for?",
        options: [
          "Tracking physical server shipments",
          "Following a single request as it moves through multiple services",
          "Drawing diagrams of the network",
          "Counting the number of developers in a team"
        ],
        correct: 1,
        explanation: "Tracing helps visualize the path and timing of a request across service boundaries.",
        difficulty: "medium"
      },
      {
        id: "q22-4-2",
        question: "What is a 'Span' in distributed tracing?",
        options: [
          "The total time a request takes",
          "A single operation within a trace, with a start and end time",
          "A type of network cable",
          "A unique user ID"
        ],
        correct: 1,
        explanation: "A trace is composed of multiple spans, each representing work done by a specific component.",
        difficulty: "medium"
      },
      {
        id: "q22-4-3",
        question: "What is 'Context Propagation' in tracing?",
        options: [
          "Passing trace IDs across service boundaries in headers",
          "Updating the documentation",
          "Restarting the services",
          "Translating the code to another language"
        ],
        correct: 0,
        explanation: "Propagation ensures that all spans belonging to the same request are linked by a common Trace ID.",
        difficulty: "hard"
      }
    ],
    "22-5": [
      {
        id: "q22-5-1",
        question: "What does SLI stand for?",
        options: [
          "Service Level Interface",
          "Service Level Indicator",
          "System Level Integration",
          "Standard Level Indicator"
        ],
        correct: 1,
        explanation: "An SLI is a quantitative measure of some aspect of the level of service that is provided.",
        difficulty: "medium"
      },
      {
        id: "q22-5-2",
        question: "What is an SLO (Service Level Objective)?",
        options: [
          "A legal contract with a customer",
          "A target value or range of values for a service level that is measured by an SLI",
          "A goal for the marketing team",
          "A list of available services"
        ],
        correct: 1,
        explanation: "SLOs are internal targets (e.g., 99.9% availability) used to manage service quality.",
        difficulty: "medium"
      },
      {
        id: "q22-5-3",
        question: "What is an 'Error Budget'?",
        options: [
          "The amount of money spent on fixing bugs",
          "The allowed amount of unreliability (1 - SLO) before action must be taken",
          "The number of errors allowed in a single file",
          "A fund for buying new servers"
        ],
        correct: 1,
        explanation: "If you have a 99.9% SLO, your error budget is 0.1% downtime. If it's exhausted, you might stop new features to focus on stability.",
        difficulty: "hard"
      }
    ],
    "22-6": [
      {
        id: "q22-6-1",
        question: "What is an SLA (Service Level Agreement)?",
        options: [
          "A technical specification for an API",
          "A legal agreement between a service provider and a customer defining expected service levels and penalties",
          "A type of load balancer",
          "An internal team meeting"
        ],
        correct: 1,
        explanation: "SLAs are business contracts that often include financial consequences if objectives aren't met.",
        difficulty: "medium"
      },
      {
        id: "q22-6-2",
        question: "Who is typically the audience for an SLA?",
        options: [
          "Internal developers only",
          "External customers",
          "The HR department",
          "The compiler"
        ],
        correct: 1,
        explanation: "SLAs define the promise made to external users or customers.",
        difficulty: "easy"
      },
      {
        id: "q22-6-3",
        question: "Which of these is usually stricter?",
        options: [
          "The SLO",
          "The SLA",
          "They are always identical",
          "Neither, they are unrelated"
        ],
        correct: 0,
        explanation: "Internal SLOs are typically stricter than external SLAs to provide a safety margin.",
        difficulty: "hard"
      }
    ],
    "22-7": [
      {
        id: "q22-7-1",
        question: "What is the goal of an Alerting system?",
        options: [
          "To notify humans when action is required",
          "To log every single event",
          "To automatically fix all bugs",
          "To play music in the office"
        ],
        correct: 0,
        explanation: "Alerts should be actionable and notify the right people when the system's health is at risk.",
        difficulty: "easy"
      },
      {
        id: "q22-7-2",
        question: "What is 'Alert Fatigue'?",
        options: [
          "Being too tired to write alerts",
          "Desensitization due to receiving too many irrelevant or low-priority alerts",
          "A type of hardware failure",
          "When the alerting system crashes"
        ],
        correct: 1,
        explanation: "If alerts fire too often for non-issues, engineers might ignore them, missing real problems.",
        difficulty: "medium"
      },
      {
        id: "q22-7-3",
        question: "What makes an alert 'actionable'?",
        options: [
          "It is sent to everyone",
          "It clearly indicates what is wrong and what steps should be taken",
          "It contains a lot of technical jargon",
          "It fires every 5 minutes"
        ],
        correct: 1,
        explanation: "Actionable alerts provide enough context for the receiver to respond effectively.",
        difficulty: "medium"
      }
    ],
    "22-8": [
      {
        id: "q22-8-1",
        question: "What does 'On-call' mean for a software engineer?",
        options: [
          "Working on the phone all day",
          "Being available outside of regular hours to respond to system incidents",
          "Calling customers to sell software",
          "Sitting in meetings all day"
        ],
        correct: 1,
        explanation: "On-call rotations ensure that there is always someone available to handle urgent production issues.",
        difficulty: "easy"
      },
      {
        id: "q22-8-2",
        question: "What is an 'Escalation Policy'?",
        options: [
          "A plan to increase server prices",
          "A set of rules defining who to contact next if the primary on-call person doesn't respond",
          "A way to promote employees",
          "A method for speeding up the network"
        ],
        correct: 1,
        explanation: "Escalation ensures that critical issues are eventually addressed even if the first person is unavailable.",
        difficulty: "medium"
      },
      {
        id: "q22-8-3",
        question: "What is an 'Incident Post-mortem' (or Retrospective)?",
        options: [
          "A meeting to blame the person who caused the error",
          "A blameless analysis of an incident to learn and prevent recurrence",
          "A ceremony for retired servers",
          "A way to delete old logs"
        ],
        correct: 1,
        explanation: "Post-mortems focus on process and system improvements rather than individual mistakes.",
        difficulty: "medium"
      }
    ],
    "22-9": [
      {
        id: "q22-9-1",
        question: "What is 'Real User Monitoring' (RUM)?",
        options: [
          "Watching users through their webcams",
          "Collecting performance data from actual users' browsers or devices",
          "Hiring people to test the website",
          "Reading user emails"
        ],
        correct: 1,
        explanation: "RUM provides insights into the actual experience of users in the real world.",
        difficulty: "medium"
      },
      {
        id: "q22-9-2",
        question: "What is 'Synthetic Monitoring'?",
        options: [
          "Monitoring artificial intelligence",
          "Using automated scripts to simulate user actions and check system health",
          "Monitoring hardware components",
          "A type of fake logging"
        ],
        correct: 1,
        explanation: "Synthetic monitoring (probing) helps detect issues even when there is no real user traffic.",
        difficulty: "medium"
      },
      {
        id: "q22-9-3",
        question: "Which of these is a 'Golden Signal' of monitoring (according to Google SRE)?",
        options: [
          "Latency",
          "Color of the UI",
          "Number of Git commits",
          "Office humidity"
        ],
        correct: 0,
        explanation: "The four golden signals are Latency, Traffic, Errors, and Saturation.",
        difficulty: "hard"
      }
    ],
    "22-10": [
      {
        id: "q22-10-1",
        question: "What is 'Tracing Profiling'?",
        options: [
          "Drawing pictures of code",
          "Combining tracing with low-level CPU/memory profiling to find bottlenecks",
          "Checking the history of a file",
          "Identifying the developers of a project"
        ],
        correct: 1,
        explanation: "Tracing profiling helps pinpoint exactly which line of code is slow during a specific request.",
        difficulty: "hard"
      },
      {
        id: "q22-10-2",
        question: "What is the OpenTelemetry project?",
        options: [
          "A new operating system",
          "A vendor-neutral standard and set of tools for collecting observability data",
          "A cloud provider",
          "A type of open-source database"
        ],
        correct: 1,
        explanation: "OpenTelemetry provides a standardized way to instrument applications for logs, metrics, and traces.",
        difficulty: "medium"
      },
      {
        id: "q22-10-3",
        question: "What is 'Event-driven Observability'?",
        options: [
          "Only observing when a party happens",
          "Using discrete events (like a button click or a database write) as the primary unit of observation",
          "A way to manage calendar events",
          "Observing events in a sports game"
        ],
        correct: 1,
        explanation: "Events provide rich context that simple metrics might miss.",
        difficulty: "hard"
      }
    ]
  },
  examQuestions: [
    {
      id: "q22-exam-1",
      question: "Which of the following is NOT one of the 'Three Pillars of Observability'?",
      options: [
        "Logs",
        "Metrics",
        "Traces",
        "Documentation"
      ],
      correct: 3,
      explanation: "Logs, metrics, and traces are the standard three pillars.",
      difficulty: "easy"
    },
    {
      id: "q22-exam-2",
      question: "A metric that represents a 'current value' (like CPU temperature) is called a:",
      options: [
        "Counter",
        "Gauge",
        "Histogram",
        "Summary"
      ],
      correct: 1,
      explanation: "Gauges represent values that can fluctuate up and down.",
      difficulty: "medium"
    },
    {
      id: "q22-exam-3",
      question: "What is the primary benefit of distributed tracing?",
      options: [
        "It replaces logging entirely",
        "It allows you to see how a request flows through multiple microservices",
        "It makes the application run faster",
        "It reduces the cost of cloud storage"
      ],
      correct: 1,
      explanation: "Tracing is essential for understanding performance and failures in distributed architectures.",
      difficulty: "medium"
    },
    {
      id: "q22-exam-4",
      question: "What is the formula for an Error Budget given an SLO of 99.9% uptime?",
      options: [
        "99.9%",
        "0.1%",
        "1%",
        "10%"
      ],
      correct: 1,
      explanation: "Error Budget = 100% - SLO.",
      difficulty: "medium"
    },
    {
      id: "q22-exam-5",
      question: "What is the main purpose of a 'blameless' post-mortem?",
      options: [
        "To avoid hurting people's feelings",
        "To focus on finding systemic causes rather than individual fault",
        "To make sure nobody gets fired",
        "To hide the true cause of an outage"
      ],
      correct: 1,
      explanation: "Blamelessness encourages honesty and leads to better systemic improvements.",
      difficulty: "medium"
    },
    {
      id: "q22-exam-6",
      question: "In the ELK stack, what is the role of Elasticsearch?",
      options: [
        "Log collection",
        "Log storage and indexing",
        "Log visualization",
        "Log generation"
      ],
      correct: 1,
      explanation: "Elasticsearch is the search and analytics engine where logs are stored.",
      difficulty: "easy"
    },
    {
      id: "q22-exam-7",
      question: "Which 'Golden Signal' refers to the demand placed on a system?",
      options: [
        "Latency",
        "Traffic",
        "Errors",
        "Saturation"
      ],
      correct: 1,
      explanation: "Traffic measures demand (e.g., HTTP requests per second).",
      difficulty: "medium"
    },
    {
      id: "q22-exam-8",
      question: "What does 'Sampling' mean in the context of tracing?",
      options: [
        "Collecting data for only a percentage of requests to reduce overhead",
        "Trying out different tracing tools",
        "Testing the application with fake data",
        "Asking users for feedback"
      ],
      correct: 0,
      explanation: "High-volume systems often sample traces to avoid excessive performance impact and storage costs.",
      difficulty: "medium"
    },
    {
      id: "q22-exam-9",
      question: "An SLI is usually expressed as:",
      options: [
        "A paragraph of text",
        "A ratio of 'good events' to 'total events'",
        "A binary 'yes' or 'no'",
        "The name of the service"
      ],
      correct: 1,
      explanation: "Most SLIs are ratios (e.g., percentage of successful requests).",
      difficulty: "hard"
    },
    {
      id: "q22-exam-10",
      question: "What is 'White-box monitoring'?",
      options: [
        "Monitoring the system from the outside (like a user)",
        "Monitoring based on internal metrics and logs (e.g., JVM stats)",
        "Monitoring only the physical hardware",
        "Using only open-source tools"
      ],
      correct: 1,
      explanation: "White-box monitoring uses internal knowledge of the system.",
      difficulty: "hard"
    }
  ]
};
