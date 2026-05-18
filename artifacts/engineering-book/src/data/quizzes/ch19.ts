import { ChapterQuizData } from "../quizTypes";

export const CH19_QUIZ: ChapterQuizData = {
  chapterId: "ch19",
  sectionQuizzes: {
    "19-1": [
      {
        id: "q19-1-1",
        question: "What is the primary goal of the Layered Architecture (n-tier)?",
        options: [
          "To maximize performance by removing abstractions",
          "To organize code into horizontal layers with specific responsibilities",
          "To ensure all code is in a single file",
          "To eliminate the need for a database"
        ],
        correct: 1,
        explanation: "Layered architecture separates concerns by organizing code into layers (e.g., Presentation, Business, Data Access).",
        difficulty: "easy"
      },
      {
        id: "q19-1-2",
        question: "In a standard 3-tier architecture, which layer is responsible for business logic?",
        options: [
          "Presentation Layer",
          "Application/Business Layer",
          "Data Access Layer",
          "Database Layer"
        ],
        correct: 1,
        explanation: "The Application or Business layer contains the core logic and rules of the application.",
        difficulty: "easy"
      },
      {
        id: "q19-1-3",
        question: "What is a 'Closed Layer' in layered architecture?",
        options: [
          "A layer that cannot be modified",
          "A layer that can only be accessed by the layer immediately above it",
          "A layer that is private to the developer",
          "A layer that has no outgoing dependencies"
        ],
        correct: 1,
        explanation: "In a closed-layer architecture, a layer can only communicate with the layer directly beneath it.",
        difficulty: "medium"
      }
    ],
    "19-2": [
      {
        id: "q19-2-1",
        question: "What is another name for Hexagonal Architecture?",
        options: [
          "Microservices",
          "Ports and Adapters",
          "Event-Sourcing",
          "Onion Architecture"
        ],
        correct: 1,
        explanation: "Hexagonal Architecture is also known as Ports and Adapters, focusing on isolating the core logic from external concerns.",
        difficulty: "easy"
      },
      {
        id: "q19-2-2",
        question: "What is the role of a 'Port' in Hexagonal Architecture?",
        options: [
          "A physical hardware port",
          "An entry point into the system",
          "An interface that defines how the outside world interacts with the application core",
          "A type of database connection"
        ],
        correct: 2,
        explanation: "Ports are interfaces that define the interactions allowed with the core application logic.",
        difficulty: "medium"
      },
      {
        id: "q19-2-3",
        question: "What is the role of an 'Adapter' in Hexagonal Architecture?",
        options: [
          "To convert electrical signals",
          "To implement the Port interface for a specific technology (e.g., REST API, Database)",
          "To manage the deployment of the application",
          "To serve as a proxy for the user"
        ],
        correct: 1,
        explanation: "Adapters bridge the gap between the application's ports and specific external technologies.",
        difficulty: "medium"
      }
    ],
    "19-3": [
      {
        id: "q19-3-1",
        question: "What is the core principle of Event-Driven Architecture (EDA)?",
        options: [
          "Using events to trigger and communicate between decoupled services",
          "Writing code that only runs on weekends",
          "Storing all data in a single event log",
          "Using JavaScript event listeners for everything"
        ],
        correct: 0,
        explanation: "EDA uses events as the primary mechanism for communication and coordination between components.",
        difficulty: "easy"
      },
      {
        id: "q19-3-2",
        question: "What is 'Eventual Consistency' in the context of EDA?",
        options: [
          "The system will never be consistent",
          "Data across services will become consistent over time as events are processed",
          "Events are processed in a single transaction",
          "The database is updated before the event is sent"
        ],
        correct: 1,
        explanation: "Since events are processed asynchronously, different parts of the system may be temporarily out of sync.",
        difficulty: "medium"
      },
      {
        id: "q19-3-3",
        question: "Which component is responsible for distributing events to subscribers in EDA?",
        options: [
          "Event Producer",
          "Event Broker",
          "Event Consumer",
          "Event Store"
        ],
        correct: 1,
        explanation: "The Event Broker (like Kafka or RabbitMQ) manages the routing and delivery of events.",
        difficulty: "easy"
      }
    ],
    "19-4": [
      {
        id: "q19-4-1",
        question: "What does CQRS stand for?",
        options: [
          "Common Query Response System",
          "Command Query Responsibility Segregation",
          "Code Quality Review Standard",
          "Centralized Queue Retrieval Service"
        ],
        correct: 1,
        explanation: "CQRS is a pattern that separates read (query) and write (command) operations into different models.",
        difficulty: "easy"
      },
      {
        id: "q19-4-2",
        question: "Why would you use CQRS?",
        options: [
          "To make the code simpler",
          "To allow independent scaling and optimization of read and write workloads",
          "To avoid using a database",
          "Because it is required by microservices"
        ],
        correct: 1,
        explanation: "CQRS allows you to optimize the read model for fast queries and the write model for complex business logic.",
        difficulty: "medium"
      },
      {
        id: "q19-4-3",
        question: "In CQRS, what is a 'Command'?",
        options: [
          "A request to fetch data",
          "An operation that changes the state of the system",
          "A bash command",
          "A type of event"
        ],
        correct: 1,
        explanation: "Commands are intentions to change the state of the system (e.g., 'PlaceOrder').",
        difficulty: "medium"
      }
    ],
    "19-5": [
      {
        id: "q19-5-1",
        question: "What is the core idea of Event Sourcing?",
        options: [
          "Storing the current state of an object in a database",
          "Storing the entire history of changes as a sequence of immutable events",
          "Using events to source new developers",
          "Deleting events after they are processed"
        ],
        correct: 1,
        explanation: "Event sourcing persists the state of an application by storing every change as an event in an append-only log.",
        difficulty: "medium"
      },
      {
        id: "q19-5-2",
        question: "How do you reconstruct the current state in an Event Sourced system?",
        options: [
          "By querying a relational table",
          "By replaying the sequence of events from the beginning",
          "By asking the user",
          "By looking at the latest log entry"
        ],
        correct: 1,
        explanation: "Current state is derived by 'replaying' all events in order to arrive at the present state.",
        difficulty: "medium"
      },
      {
        id: "q19-5-3",
        question: "What is a 'Snapshot' in Event Sourcing?",
        options: [
          "A photo of the server",
          "A point-in-time state of an entity to speed up reconstruction",
          "A copy of the event log",
          "A debugging tool"
        ],
        correct: 1,
        explanation: "Snapshots periodically save the current state so that you don't have to replay thousands of events from the start of time.",
        difficulty: "hard"
      }
    ],
    "19-6": [
      {
        id: "q19-6-1",
        question: "What is a 'Microservices Architecture'?",
        options: [
          "A large, single-unit application",
          "An application composed of small, independent, and loosely coupled services",
          "A system using only small servers",
          "A framework for mobile apps"
        ],
        correct: 1,
        explanation: "Microservices decompose an application into small, independent services that communicate over a network.",
        difficulty: "easy"
      },
      {
        id: "q19-6-2",
        question: "Which of the following is a challenge of Microservices?",
        options: [
          "Easier deployment",
          "Operational complexity and distributed system challenges",
          "Limited technology choices",
          "Single point of failure"
        ],
        correct: 1,
        explanation: "Microservices introduce complexity in networking, data consistency, monitoring, and deployment.",
        difficulty: "medium"
      },
      {
        id: "q19-6-3",
        question: "What is a 'Monolith' architecture?",
        options: [
          "A system with many small parts",
          "A single-tiered software application in which different components are combined into a single program",
          "A type of distributed database",
          "A modern cloud-native pattern"
        ],
        correct: 1,
        explanation: "A monolith is a traditional unified model where all components are packaged and deployed together.",
        difficulty: "easy"
      }
    ],
    "19-7": [
      {
        id: "q19-7-1",
        question: "What is 'Serverless' architecture?",
        options: [
          "Computing that doesn't use any servers",
          "A model where the cloud provider manages server infrastructure and resource allocation",
          "A way to run apps offline",
          "Storing data on client devices only"
        ],
        correct: 1,
        explanation: "Serverless (FaaS) allows developers to write functions that are executed in response to events, without managing the underlying servers.",
        difficulty: "medium"
      },
      {
        id: "q19-7-2",
        question: "What is 'Cold Start' in serverless?",
        options: [
          "The server being physically cold",
          "The latency experienced when a serverless function is invoked for the first time or after a period of inactivity",
          "Restarting the entire cloud provider",
          "Initializing a database connection"
        ],
        correct: 1,
        explanation: "Cold starts happen when the provider has to spin up a new container instance for your function.",
        difficulty: "medium"
      },
      {
        id: "q19-7-3",
        question: "What is a primary benefit of Serverless?",
        options: [
          "Always-on servers",
          "Pay-per-execution and automatic scaling",
          "Full control over the OS",
          "Zero latency"
        ],
        correct: 1,
        explanation: "Serverless is cost-effective because you only pay for the exact time your code runs.",
        difficulty: "easy"
      }
    ],
    "19-8": [
      {
        id: "q19-8-1",
        question: "What is the 'Service Mesh' used for?",
        options: [
          "To clean the servers",
          "To manage service-to-service communication, providing security, observability, and reliability",
          "To replace the internet",
          "To design user interfaces"
        ],
        correct: 1,
        explanation: "A service mesh (like Istio) is an infrastructure layer that handles traffic management, security, and monitoring for microservices.",
        difficulty: "hard"
      },
      {
        id: "q19-8-2",
        question: "What is a 'Sidecar' pattern in microservices?",
        options: [
          "A second developer working on the same task",
          "A separate container that runs alongside the main application container to provide auxiliary features",
          "A backup server",
          "A type of mobile app"
        ],
        correct: 1,
        explanation: "Sidecars provide common functionality (like logging or proxying) without cluttering the main application code.",
        difficulty: "medium"
      },
      {
        id: "q19-8-3",
        question: "Which of these is a popular Service Mesh implementation?",
        options: [
          "Kubernetes",
          "Istio",
          "Docker",
          "Jenkins"
        ],
        correct: 1,
        explanation: "Istio is one of the most widely used service meshes in the Kubernetes ecosystem.",
        difficulty: "medium"
      }
    ],
    "19-9": [
      {
        id: "q19-9-1",
        question: "What is 'Domain-Driven Design' (DDD)?",
        options: [
          "An approach to software development focused on the core business domain and its logic",
          "A way to design domain names for websites",
          "A database optimization technique",
          "A project management methodology"
        ],
        correct: 0,
        explanation: "DDD emphasizes collaboration between technical and business experts to create a model that reflects the business domain.",
        difficulty: "medium"
      },
      {
        id: "q19-9-2",
        question: "What is a 'Bounded Context' in DDD?",
        options: [
          "A physical server boundary",
          "A specific area of the business where a particular model and its terms are valid",
          "A limit on the number of classes",
          "The maximum size of a microservice"
        ],
        correct: 1,
        explanation: "Bounded contexts define the explicit boundaries within which a domain model is defined and applicable.",
        difficulty: "hard"
      },
      {
        id: "q19-9-3",
        question: "What is an 'Aggregate' in DDD?",
        options: [
          "A total sum of values",
          "A cluster of associated objects treated as a unit for data changes",
          "A list of database tables",
          "A type of microservice"
        ],
        correct: 1,
        explanation: "An Aggregate is a pattern used to define ownership and consistency boundaries between objects.",
        difficulty: "hard"
      }
    ],
    "19-10": [
      {
        id: "q19-10-1",
        question: "What is 'Onion Architecture' primarily concerned with?",
        options: [
          "Making developers cry",
          "Ensuring that the core application logic does not depend on external layers",
          "Using many layers of security",
          "Replacing Hexagonal Architecture"
        ],
        correct: 1,
        explanation: "Onion Architecture is similar to Hexagonal; it places the domain model at the center and uses dependency inversion to keep it pure.",
        difficulty: "medium"
      },
      {
        id: "q19-10-2",
        question: "In Onion Architecture, where should the 'Domain Model' reside?",
        options: [
          "The outermost layer",
          "The innermost layer",
          "The middle layer",
          "In a separate database"
        ],
        correct: 1,
        explanation: "The core domain model is at the very center, with no dependencies on any other layer.",
        difficulty: "medium"
      },
      {
        id: "q19-10-3",
        question: "Which principle is fundamental to both Onion and Hexagonal Architectures?",
        options: [
          "Dependency Injection",
          "Dependency Inversion",
          "Inheritance",
          "Singleton"
        ],
        correct: 1,
        explanation: "Dependency Inversion ensures that high-level modules (core logic) do not depend on low-level modules (infrastructure).",
        difficulty: "hard"
      }
    ]
  },
  examQuestions: [
    {
      id: "q19-exam-1",
      question: "Which architecture pattern is best suited for high-performance read-heavy systems with complex domain logic?",
      options: [
        "Layered",
        "CQRS",
        "Monolith",
        "Client-Server"
      ],
      correct: 1,
      explanation: "CQRS allows for optimized read models which can significantly improve performance in complex systems.",
      difficulty: "medium"
    },
    {
      id: "q19-exam-2",
      question: "What is the 'Database-per-service' pattern?",
      options: [
        "Each service has its own private database",
        "All services share a single database instance",
        "One database is used for the whole company",
        "Each developer gets their own database"
      ],
      correct: 0,
      explanation: "This pattern ensures loose coupling and independence of microservices.",
      difficulty: "medium"
    },
    {
      id: "q19-exam-3",
      question: "In Event Sourcing, what is the 'Audit Log'?",
      options: [
        "A separate security file",
        "The event store itself, which naturally records every change",
        "A list of failed logins",
        "The server's error log"
      ],
      correct: 1,
      explanation: "Because Event Sourcing stores every state change, it provides an inherent and perfect audit trail.",
      difficulty: "medium"
    },
    {
      id: "q19-exam-4",
      question: "What is a 'Distributed Monolith'?",
      options: [
        "A highly efficient microservices system",
        "A system that has the complexity of microservices but the tight coupling of a monolith",
        "A monolith spread across multiple data centers",
        "A type of blockchain"
      ],
      correct: 1,
      explanation: "It's an anti-pattern where services are separated but still depend so heavily on each other that they cannot be deployed or scaled independently.",
      difficulty: "hard"
    },
    {
      id: "q19-exam-5",
      question: "Which layer in the Onion Architecture usually contains the database implementation?",
      options: [
        "Domain Model",
        "Domain Services",
        "Application Services",
        "Infrastructure (Outermost layer)"
      ],
      correct: 3,
      explanation: "External concerns like databases, file systems, and UI are in the outermost 'Infrastructure' layer.",
      difficulty: "medium"
    },
    {
      id: "q19-exam-6",
      question: "What is 'API Gateway' in microservices?",
      options: [
        "A firewall",
        "A single entry point for all clients that routes requests to appropriate services",
        "A documentation tool",
        "A database for APIs"
      ],
      correct: 1,
      explanation: "API Gateway handles cross-cutting concerns like authentication, routing, and rate limiting.",
      difficulty: "easy"
    },
    {
      id: "q19-exam-7",
      question: "What is 'Polyglot Persistence'?",
      options: [
        "Using only one database for everything",
        "Using different database technologies for different services based on their needs",
        "Storing data in multiple languages",
        "A type of data encryption"
      ],
      correct: 1,
      explanation: "Microservices allow each service to choose the best storage engine (SQL, NoSQL, Graph, etc.) for its specific task.",
      difficulty: "medium"
    },
    {
      id: "q19-exam-8",
      question: "What is the primary trade-off of Event Sourcing?",
      options: [
        "Simplicity vs Speed",
        "Ease of use vs Security",
        "Read performance vs Complexity and Event Evolution",
        "Storage space vs Reliability"
      ],
      correct: 2,
      explanation: "Event sourcing is complex and requires careful handling of schema changes in events over time.",
      difficulty: "hard"
    },
    {
      id: "q19-exam-9",
      question: "Which pattern is often used with CQRS to synchronize the read and write models?",
      options: [
        "Synchronous HTTP calls",
        "Eventual consistency via messaging",
        "Shared database tables",
        "Manual data entry"
      ],
      correct: 1,
      explanation: "Commands trigger events that are then used to update the read models asynchronously.",
      difficulty: "medium"
    },
    {
      id: "q19-exam-10",
      question: "What does 'Loose Coupling' mean?",
      options: [
        "Components depend heavily on each other",
        "Components have little or no knowledge of the internal workings of other components",
        "Code is written without any structure",
        "Servers are not connected to the network"
      ],
      correct: 1,
      explanation: "Loose coupling allows components to be changed or replaced without affecting others.",
      difficulty: "easy"
    }
  ]
};
