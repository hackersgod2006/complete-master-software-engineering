import { ChapterQuizData } from "../quizTypes";

export const CH24_QUIZ: ChapterQuizData = {
  chapterId: "ch24",
  sectionQuizzes: {
    "24-1": [
      {
        id: "q24-1-1",
        question: "What is the primary motivation for moving from a Monolith to Microservices?",
        options: [
          "To make the code simpler to understand",
          "To allow independent scaling and deployment of different business capabilities",
          "To reduce the number of servers needed",
          "To use only one programming language"
        ],
        correct: 1,
        explanation: "Microservices enable teams to work on and deploy services independently, improving agility and scalability.",
        difficulty: "easy"
      },
      {
        id: "q24-1-2",
        question: "Which of these is a common challenge with Microservices?",
        options: [
          "Lack of code reuse",
          "Operational complexity and network latency",
          "Too few databases",
          "Simplistic deployment pipelines"
        ],
        correct: 1,
        explanation: "Managing many services and their communication introduces overhead that doesn't exist in a monolith.",
        difficulty: "medium"
      },
      {
        id: "q24-1-3",
        question: "What does 'Bounded Context' mean in Microservices (from Domain-Driven Design)?",
        options: [
          "A boundary around a service's physical location",
          "A clear boundary within which a specific domain model is defined and applicable",
          "The limit of the network bandwidth",
          "The maximum size of the source code file"
        ],
        correct: 1,
        explanation: "Bounded contexts help define clear service boundaries based on business logic.",
        difficulty: "hard"
      }
    ],
    "24-2": [
      {
        id: "q24-2-1",
        question: "What is an API Gateway?",
        options: [
          "A physical device for connecting to the internet",
          "A single entry point for all clients that routes requests to appropriate microservices",
          "A way to write API documentation",
          "A database for storing API keys"
        ],
        correct: 1,
        explanation: "The API Gateway handles cross-cutting concerns like authentication, routing, and rate limiting.",
        difficulty: "easy"
      },
      {
        id: "q24-2-2",
        question: "Which function is typically NOT performed by an API Gateway?",
        options: [
          "Request routing",
          "Authentication and authorization",
          "Complex business logic execution",
          "Load balancing"
        ],
        correct: 2,
        explanation: "API Gateways should remain thin; business logic belongs inside the microservices themselves.",
        difficulty: "medium"
      },
      {
        id: "q24-2-3",
        question: "What is 'BFF' (Backend for Frontend)?",
        options: [
          "A Best Friend Forever in the dev team",
          "A pattern where each client (e.g., mobile, web) has its own dedicated backend/gateway",
          "A way to share frontend code",
          "A tool for debugging"
        ],
        correct: 1,
        explanation: "BFFs allow backends to be optimized for the specific needs of different client types.",
        difficulty: "medium"
      }
    ],
    "24-3": [
      {
        id: "q24-3-1",
        question: "What is Service Discovery?",
        options: [
          "Searching for services on Google",
          "The process of automatically detecting devices and services on a network",
          "Writing a list of all services in a text file",
          "A manual check of server status"
        ],
        correct: 1,
        explanation: "In dynamic cloud environments, services need a way to find each other's current IP addresses and ports.",
        difficulty: "easy"
      },
      {
        id: "q24-3-2",
        question: "What is the difference between 'Client-side' and 'Server-side' discovery?",
        options: [
          "In client-side, the client queries a registry; in server-side, a load balancer handles it",
          "In server-side, the client queries a registry; in client-side, it doesn't",
          "They are the same thing",
          "Client-side is only for mobile apps"
        ],
        correct: 0,
        explanation: "Server-side discovery (like AWS ELB) abstracts the registry from the client.",
        difficulty: "hard"
      },
      {
        id: "q24-3-3",
        question: "Which of these is a popular tool for Service Discovery and Key-Value storage?",
        options: [
          "Consul",
          "Git",
          "Nginx",
          "Docker"
        ],
        correct: 0,
        explanation: "HashiCorp Consul is a widely used service networking solution.",
        difficulty: "medium"
      }
    ],
    "24-4": [
      {
        id: "q24-4-1",
        question: "What is the purpose of the Circuit Breaker pattern?",
        options: [
          "To stop the server from overheating",
          "To prevent a failure in one service from cascading to other services",
          "To cut the power to the data center",
          "To encrypt network traffic"
        ],
        correct: 1,
        explanation: "Circuit breakers detect failures and 'trip', stopping requests to a failing service and allowing it to recover.",
        difficulty: "medium"
      },
      {
        id: "q24-4-2",
        question: "What are the three states of a Circuit Breaker?",
        options: [
          "On, Off, Wait",
          "Closed, Open, Half-Open",
          "Start, Stop, Pause",
          "Active, Idle, Failed"
        ],
        correct: 1,
        explanation: "Closed (normal), Open (failing/skipping), Half-Open (testing for recovery).",
        difficulty: "hard"
      },
      {
        id: "q24-4-3",
        question: "What is a 'Fallback' in the context of Circuit Breakers?",
        options: [
          "The server falling over",
          "A default response or behavior to use when a service call fails or the circuit is open",
          "The person who takes the blame",
          "A backup server"
        ],
        correct: 1,
        explanation: "Fallbacks provide a graceful degradation of service (e.g., returning cached data).",
        difficulty: "medium"
      }
    ],
    "24-5": [
      {
        id: "q24-5-1",
        question: "What is a Service Mesh?",
        options: [
          "A type of network cable",
          "A dedicated infrastructure layer for handling service-to-service communication",
          "A way to organize the office",
          "A database for microservices"
        ],
        correct: 1,
        explanation: "A service mesh (like Istio) manages security, observability, and traffic control between services.",
        difficulty: "medium"
      },
      {
        id: "q24-5-2",
        question: "What is a 'Sidecar' proxy in a Service Mesh?",
        options: [
          "A second developer working on the same code",
          "A proxy container that runs alongside the application container to handle network traffic",
          "A backup server",
          "A type of cloud storage"
        ],
        correct: 1,
        explanation: "The sidecar pattern allows the mesh to intercept and manage traffic without changing the application code.",
        difficulty: "hard"
      },
      {
        id: "q24-5-3",
        question: "Which component of a Service Mesh is responsible for configuration and policy management?",
        options: [
          "Data Plane",
          "Control Plane",
          "Storage Plane",
          "User Plane"
        ],
        correct: 1,
        explanation: "The control plane manages the configuration and state of the proxies in the data plane.",
        difficulty: "hard"
      }
    ],
    "24-6": [
      {
        id: "q24-6-1",
        question: "What is the 'Database per Service' pattern?",
        options: [
          "Every developer has their own database",
          "Each microservice has its own private data store, accessible only through its API",
          "One big database for all services",
          "Deleting the database every time a service restarts"
        ],
        correct: 1,
        explanation: "This pattern ensures loose coupling and allows each service to use the best database for its needs.",
        difficulty: "medium"
      },
      {
        id: "q24-6-2",
        question: "How do you maintain data consistency across microservices without a shared database?",
        options: [
          "Use a single global transaction",
          "Use the Saga pattern (coordinated local transactions)",
          "Manual data entry",
          "Data consistency is not possible in microservices"
        ],
        correct: 1,
        explanation: "Sagas use events or messages to ensure eventual consistency across multiple services.",
        difficulty: "hard"
      },
      {
        id: "q24-6-3",
        question: "What is the main drawback of 'Eventual Consistency'?",
        options: [
          "It's too fast",
          "There's a period where data might be inconsistent across different services",
          "It requires more disk space",
          "It only works with SQL databases"
        ],
        correct: 1,
        explanation: "Applications must be designed to handle the fact that data is not updated everywhere simultaneously.",
        difficulty: "medium"
      }
    ],
    "24-7": [
      {
        id: "q24-7-1",
        question: "What is 'Distributed Tracing' in the context of Microservices?",
        options: [
          "Following the path of a request as it traverses multiple microservices",
          "Drawing a map of the office",
          "Checking the history of a file",
          "Tracking the physical location of servers"
        ],
        correct: 0,
        explanation: "Tracing is essential for identifying performance bottlenecks in a complex chain of service calls.",
        difficulty: "easy"
      },
      {
        id: "q24-7-2",
        question: "Which of these is a popular tool for Distributed Tracing?",
        options: [
          "Jaeger",
          "Photoshop",
          "Slack",
          "Excel"
        ],
        correct: 0,
        explanation: "Jaeger (inspired by Dapper and Zipkin) is widely used for tracing microservices.",
        difficulty: "medium"
      },
      {
        id: "q24-7-3",
        question: "What is a 'Correlation ID'?",
        options: [
          "A random number",
          "A unique identifier passed between services to link all logs and traces related to a single request",
          "A user's password",
          "The name of the service"
        ],
        correct: 1,
        explanation: "Correlation IDs are vital for stitching together logs from different services during troubleshooting.",
        difficulty: "medium"
      }
    ],
    "24-8": [
      {
        id: "q24-8-1",
        question: "What is the 'Bulkhead' pattern?",
        options: [
          "A type of heavy door",
          "Isolating components into pools so that if one fails, others continue to work",
          "A way to store data on disk",
          "A type of network router"
        ],
        correct: 1,
        explanation: "Like bulkheads in a ship, this pattern prevents a single failure from sinking the entire system.",
        difficulty: "hard"
      },
      {
        id: "q24-8-2",
        question: "In the Bulkhead pattern, what might be isolated?",
        options: [
          "Thread pools or connection pools",
          "The developers' offices",
          "The colors of the UI",
          "The documentation files"
        ],
        correct: 0,
        explanation: "Isolating resources ensures that a slow service doesn't consume all available threads in a caller.",
        difficulty: "hard"
      },
      {
        id: "q24-8-3",
        question: "What is a 'Retry' policy?",
        options: [
          "Retrying the same operation forever until it works",
          "Automatically re-executing a failed operation with a strategy like exponential backoff",
          "Giving up immediately on any error",
          "Asking the user to try again manually"
        ],
        correct: 1,
        explanation: "Retries help handle transient failures (like network blips) gracefully.",
        difficulty: "medium"
      }
    ],
    "24-9": [
      {
        id: "q24-9-1",
        question: "What is gRPC?",
        options: [
          "A new type of database",
          "A high-performance, open-source universal RPC framework",
          "A way to write CSS",
          "A graphics library"
        ],
        correct: 1,
        explanation: "gRPC uses Protocol Buffers and HTTP/2 for efficient communication between services.",
        difficulty: "medium"
      },
      {
        id: "q24-9-2",
        question: "What are 'Protocol Buffers' (Protobuf)?",
        options: [
          "A way to speed up the internet",
          "A language-neutral, platform-neutral, extensible mechanism for serializing structured data",
          "A type of network switch",
          "A social media protocol"
        ],
        correct: 1,
        explanation: "Protobuf is more efficient and smaller than JSON for inter-service communication.",
        difficulty: "medium"
      },
      {
        id: "q24-9-3",
        question: "How does gRPC compare to REST over JSON?",
        options: [
          "gRPC is generally faster and more efficient due to binary serialization",
          "REST is always faster",
          "They are the same speed",
          "gRPC only works in a browser"
        ],
        correct: 0,
        explanation: "gRPC's binary format and HTTP/2 features (like multiplexing) often provide better performance.",
        difficulty: "hard"
      }
    ],
    "24-10": [
      {
        id: "q24-10-1",
        question: "What is 'Contract Testing'?",
        options: [
          "Testing a physical paper contract",
          "Testing that a service (provider) meets the expectations of its clients (consumers)",
          "Testing only the database",
          "A type of performance testing"
        ],
        correct: 1,
        explanation: "Contract tests ensure that changes to one service don't break others that depend on its API.",
        difficulty: "medium"
      },
      {
        id: "q24-10-2",
        question: "What is 'Consumer-Driven Contract' (CDC) testing?",
        options: [
          "The provider dictates the rules",
          "The consumer defines the expectations, and the provider must satisfy them",
          "The user tests the software manually",
          "A way to test hardware"
        ],
        correct: 1,
        explanation: "CDC ensures providers only change APIs in ways that don't break their actual consumers.",
        difficulty: "hard"
      },
      {
        id: "q24-10-3",
        question: "What is the 'Strangler Fig' pattern?",
        options: [
          "A way to kill a process",
          "Incrementally migrating a legacy system by replacing functionality with new services until the old system is gone",
          "A type of security attack",
          "A way to organize code folders"
        ],
        correct: 1,
        explanation: "This pattern allows for a safe, gradual migration from a monolith to microservices.",
        difficulty: "medium"
      }
    ]
  },
  examQuestions: [
    {
      id: "q24-exam-1",
      question: "Which pattern is used to handle cross-cutting concerns for microservices in a centralized way?",
      options: [
        "Circuit Breaker",
        "API Gateway",
        "Saga",
        "Bulkhead"
      ],
      correct: 1,
      explanation: "API Gateways handle things like auth, rate limiting, and routing.",
      difficulty: "easy"
    },
    {
      id: "q24-exam-2",
      question: "In the context of microservices, what does 'Loose Coupling' imply?",
      options: [
        "Services are highly dependent on each other",
        "Services can be changed and deployed independently with minimal impact on others",
        "Services share the same database",
        "Services are written in the same language"
      ],
      correct: 1,
      explanation: "Loose coupling is a key goal of microservice architectures.",
      difficulty: "easy"
    },
    {
      id: "q24-exam-3",
      question: "What is the main purpose of the 'Saga' pattern?",
      options: [
        "To manage long-running transactions across multiple services",
        "To speed up database queries",
        "To encrypt messages",
        "To draw diagrams"
      ],
      correct: 0,
      explanation: "Sagas coordinate distributed transactions without relying on 2PC (Two-Phase Commit).",
      difficulty: "hard"
    },
    {
      id: "q24-exam-4",
      question: "Which of these is a benefit of using a Service Mesh?",
      options: [
        "It makes the code simpler by moving communication logic out of the app",
        "It eliminates the need for containers",
        "It reduces the number of microservices",
        "It replaces the database"
      ],
      correct: 0,
      explanation: "Service meshes offload concerns like retries, mutual TLS, and tracing to sidecars.",
      difficulty: "medium"
    },
    {
      id: "q24-exam-5",
      question: "What does 'Service Discovery' solve in a microservices environment?",
      options: [
        "How to find the source code",
        "How services find the network locations (IP/port) of other services",
        "How to hire new developers",
        "How to choose a cloud provider"
      ],
      correct: 1,
      explanation: "Discovery is necessary because service instances can change locations frequently.",
      difficulty: "easy"
    },
    {
      id: "q24-exam-6",
      question: "What is 'Polyglot Persistence'?",
      options: [
        "Using only one database for everything",
        "Using different database technologies for different services based on their needs",
        "Storing data in multiple languages",
        "Using a database that supports multiple languages"
      ],
      correct: 1,
      explanation: "Microservices allow each team to pick the best database (SQL, NoSQL, Graph, etc.) for their task.",
      difficulty: "medium"
    },
    {
      id: "q24-exam-7",
      question: "Which pattern helps prevent a single failing service from taking down the entire system?",
      options: [
        "Circuit Breaker",
        "Singleton",
        "Factory",
        "Decorator"
      ],
      correct: 0,
      explanation: "Circuit breakers isolate failures and allow the system to remain partially functional.",
      difficulty: "easy"
    },
    {
      id: "q24-exam-8",
      question: "What is the 'Sidecar' pattern?",
      options: [
        "Running a helper process alongside the main application",
        "Using a secondary database",
        "Writing tests after the code",
        "A backup server"
      ],
      correct: 0,
      explanation: "Sidecars are commonly used in service meshes and for logging/monitoring agents.",
      difficulty: "medium"
    },
    {
      id: "q24-exam-9",
      question: "What is 'Backpressure'?",
      options: [
        "Pressure on the back of the server rack",
        "A mechanism where a downstream service signals an upstream service to slow down",
        "A type of database index",
        "High network latency"
      ],
      correct: 1,
      explanation: "Backpressure prevents a fast producer from overwhelming a slow consumer.",
      difficulty: "hard"
    },
    {
      id: "q24-exam-10",
      question: "What is the 'Orchestration' vs 'Choreography' debate in microservices about?",
      options: [
        "How services should be named",
        "How to coordinate interactions between multiple services",
        "How to organize the dev team",
        "How to write CSS"
      ],
      correct: 1,
      explanation: "Orchestration uses a central coordinator; choreography uses decentralized events.",
      difficulty: "hard"
    }
  ]
};
