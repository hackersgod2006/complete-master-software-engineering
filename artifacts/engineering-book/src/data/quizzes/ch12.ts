import { ChapterQuizData } from "../quizTypes";

export const CH12_QUIZ: ChapterQuizData = {
  "chapterId": "ch12",
  "sectionQuizzes": {
    "12-1": [
      {
        "id": "q-12-1-1",
        "question": "What does REST stand for in API design?",
        "options": [
          "Remote Extraction Service Technology",
          "Representational State Transfer",
          "Reformatted Engine State Task",
          "Relational Storage Transmission"
        ],
        "correct": 1,
        "explanation": "REST is an architectural style for providing standards between computer systems on the web, making it easier for systems to communicate with each other.",
        "difficulty": "easy"
      },
      {
        "id": "q-12-1-2",
        "question": "Which of these is NOT a core principle of REST?",
        "options": [
          "Statelessness",
          "Client-Server architecture",
          "Strict use of XML for all payloads",
          "Uniform Interface"
        ],
        "correct": 2,
        "explanation": "REST is format-agnostic, although JSON is the most common format today. XML was common in the past but is not a requirement.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-1-3",
        "question": "What does 'Stateless' mean in the context of REST?",
        "options": [
          "The server doesn't have a database",
          "The server does not store any client context between requests; each request must contain all necessary information",
          "The API only works for one country",
          "The system never changes its state"
        ],
        "correct": 1,
        "explanation": "Statelessness improves scalability as any server can handle any request, and simplifies the server logic.",
        "difficulty": "medium"
      }
    ],
    "12-2": [
      {
        "id": "q-12-2-1",
        "question": "What is the primary difference between GraphQL and REST?",
        "options": [
          "GraphQL is only for mobile apps",
          "REST is faster than GraphQL",
          "GraphQL allows clients to request exactly the data they need; REST typically has fixed resource structures",
          "GraphQL doesn't use HTTP"
        ],
        "correct": 2,
        "explanation": "GraphQL solves the problems of over-fetching and under-fetching by providing a flexible query language.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-2-2",
        "question": "In GraphQL, what is a 'Schema'?",
        "options": [
          "A type of database",
          "A document defining the available types, queries, and mutations",
          "A CSS file for the API",
          "A list of API users"
        ],
        "correct": 1,
        "explanation": "The schema serves as a contract between the client and the server, defining what data can be requested.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-2-3",
        "question": "What is a 'Mutation' in GraphQL?",
        "options": [
          "A bug in the API",
          "An operation used to write or change data on the server",
          "A change in the API version",
          "A type of security vulnerability"
        ],
        "correct": 1,
        "explanation": "Queries are for fetching data; Mutations are for modifying data (similar to POST/PUT/DELETE in REST).",
        "difficulty": "easy"
      }
    ],
    "12-3": [
      {
        "id": "q-12-3-1",
        "question": "What is gRPC?",
        "options": [
          "A type of JavaScript framework",
          "A high-performance RPC framework developed by Google that uses Protocol Buffers",
          "A graphic design tool for APIs",
          "A new version of HTML"
        ],
        "correct": 1,
        "explanation": "gRPC is often used for efficient microservice-to-microservice communication due to its binary format and streaming capabilities.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-3-2",
        "question": "What are 'Protocol Buffers' (Protobuf)?",
        "options": [
          "A way to speed up the internet",
          "A language-neutral, platform-neutral mechanism for serializing structured data",
          "A type of database index",
          "A browser plugin"
        ],
        "correct": 1,
        "explanation": "Protobuf is smaller and faster than JSON/XML, as it is a binary format.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-3-3",
        "question": "Which protocol does gRPC primarily use for transport?",
        "options": ["HTTP/1.1", "UDP", "HTTP/2", "FTP"],
        "correct": 2,
        "explanation": "HTTP/2 provides features like multiplexing and server push that gRPC leverages for high performance.",
        "difficulty": "hard"
      }
    ],
    "12-4": [
      {
        "id": "q-12-4-1",
        "question": "Why is API Versioning important?",
        "options": [
          "To make the API name look better",
          "To allow making breaking changes without breaking existing client integrations",
          "To charge users more for newer versions",
          "To satisfy compliance requirements"
        ],
        "correct": 1,
        "explanation": "Versioning ensures backward compatibility and a smooth transition for API consumers.",
        "difficulty": "easy"
      },
      {
        "id": "q-12-4-2",
        "question": "Which of these is a common strategy for API versioning?",
        "options": [
          "URL path (e.g., /v1/users)",
          "Header (e.g., Accept-Version: 1.0)",
          "Query parameter (e.g., /users?version=1)",
          "All of the above"
        ],
        "correct": 3,
        "explanation": "Different teams prefer different methods, but URL and Header versioning are the most popular.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-4-3",
        "question": "What is 'Semantic Versioning' (SemVer)?",
        "options": [
          "Giving versions funny names",
          "A 3-part numbering system (Major.Minor.Patch) that indicates the level of change",
          "A way to version database schemas",
          "Only using odd numbers for versions"
        ],
        "correct": 1,
        "explanation": "Major = breaking, Minor = new features, Patch = bug fixes.",
        "difficulty": "easy"
      }
    ],
    "12-5": [
      {
        "id": "q-12-5-1",
        "question": "What is 'Rate Limiting' in API management?",
        "options": [
          "Limiting the size of the API code",
          "Restricting the number of requests a client can make in a given timeframe",
          "Slowing down the server response time",
          "Limiting the number of developers on a project"
        ],
        "correct": 1,
        "explanation": "Rate limiting protects the API from abuse, DDoS attacks, and ensures fair usage among clients.",
        "difficulty": "easy"
      },
      {
        "id": "q-12-5-2",
        "question": "What is the 'Token Bucket' algorithm used for?",
        "options": [
          "Storing user passwords",
          "Implementing rate limiting by allowing bursts of traffic while maintaining a steady average rate",
          "A way to sort data",
          "Managing database transactions"
        ],
        "correct": 1,
        "explanation": "Token bucket is a popular and flexible algorithm for traffic shaping and rate limiting.",
        "difficulty": "hard"
      },
      {
        "id": "q-12-5-3",
        "question": "Which HTTP status code is typically returned when a client exceeds their rate limit?",
        "options": ["401 Unauthorized", "403 Forbidden", "429 Too Many Requests", "503 Service Unavailable"],
        "correct": 2,
        "explanation": "429 is the standard code, often accompanied by a 'Retry-After' header.",
        "difficulty": "medium"
      }
    ],
    "12-6": [
      {
        "id": "q-12-6-1",
        "question": "What is 'Idempotency' in the context of APIs?",
        "options": [
          "The speed of the API",
          "The property where multiple identical requests have the same effect as a single request",
          "Ensuring the API only works for one user at a time",
          "A type of data encryption"
        ],
        "correct": 1,
        "explanation": "Crucial for handling network retries safely without causing unintended duplicate actions (like double charging a card).",
        "difficulty": "medium"
      },
      {
        "id": "q-12-6-2",
        "question": "Which HTTP method should NOT be idempotent according to REST standards?",
        "options": ["GET", "PUT", "DELETE", "POST"],
        "correct": 3,
        "explanation": "POST is used for creating new resources, so calling it twice usually creates two distinct resources.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-6-3",
        "question": "How can you make a non-idempotent operation (like a POST) safe for retries?",
        "options": [
          "By using a unique Idempotency Key provided by the client",
          "By making the request faster",
          "By using a different URL for every request",
          "It's not possible"
        ],
        "correct": 0,
        "explanation": "The server can check the key and return the previous successful response if it sees the same key again.",
        "difficulty": "medium"
      }
    ],
    "12-7": [
      {
        "id": "q-12-7-1",
        "question": "What is OpenAPI (formerly Swagger)?",
        "options": [
          "A type of open-source database",
          "A standard for defining and documenting RESTful APIs in a machine-readable format",
          "An API that is free to use",
          "A browser for APIs"
        ],
        "correct": 1,
        "explanation": "OpenAPI allows for automated documentation, client code generation, and API testing.",
        "difficulty": "easy"
      },
      {
        "id": "q-12-7-2",
        "question": "What is the benefit of 'Design-First' API development?",
        "options": [
          "It makes the API look better",
          "Teams can agree on the API contract before any code is written, allowing parallel development",
          "It eliminates the need for coding",
          "It makes the API faster"
        ],
        "correct": 1,
        "explanation": "Design-first leads to better-designed APIs and fewer integration surprises later in the project.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-7-3",
        "question": "Which of these is a tool commonly used with OpenAPI?",
        "options": ["Swagger UI", "Photoshop", "Excel", "Docker"],
        "correct": 0,
        "explanation": "Swagger UI renders OpenAPI definitions as interactive documentation that allows users to try out API calls.",
        "difficulty": "easy"
      }
    ],
    "12-8": [
      {
        "id": "q-12-8-1",
        "question": "What is a 'Webhook'?",
        "options": [
          "A way to catch fish on the web",
          "A method for an API to provide real-time information to other applications via HTTP POST callbacks",
          "A security vulnerability",
          "A type of network cable"
        ],
        "correct": 1,
        "explanation": "Webhooks are 'reverse APIs'—the server notifies the client when an event occurs, rather than the client polling the server.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-8-2",
        "question": "What is a common security practice for Webhooks?",
        "options": [
          "Not using any security",
          "Using a shared secret to sign the payload so the receiver can verify it came from the trusted source",
          "Only sending webhooks on weekdays",
          "Encrypting the webhook URL"
        ],
        "correct": 1,
        "explanation": "Since anyone can send a POST request to a public endpoint, signature verification is essential for security.",
        "difficulty": "hard"
      },
      {
        "id": "q-12-8-3",
        "question": "Why would you use Webhooks instead of Polling?",
        "options": [
          "Polling is faster",
          "Webhooks are more efficient as they only send data when something actually happens",
          "Polling is not supported by modern browsers",
          "Webhooks are easier to debug"
        ],
        "correct": 1,
        "explanation": "Polling wastes resources by making many empty requests; webhooks are event-driven and more scalable.",
        "difficulty": "medium"
      }
    ],
    "12-9": [
      {
        "id": "q-12-9-1",
        "question": "What is 'HATEOAS' in REST?",
        "options": [
          "A type of error message",
          "Hypermedia As The Engine Of Application State—providing links to related resources in API responses",
          "A JavaScript library",
          "A naming convention for servers"
        ],
        "correct": 1,
        "explanation": "HATEOAS makes an API self-discoverable by guiding the client through available actions via links.",
        "difficulty": "hard"
      },
      {
        "id": "q-12-9-2",
        "question": "What is a 'BFF' (Backend For Frontend) pattern?",
        "options": [
          "A very close friend who is a developer",
          "A separate backend service tailored specifically for the needs of a particular frontend (e.g., Mobile vs Web)",
          "A type of database replication",
          "A frontend framework"
        ],
        "correct": 1,
        "explanation": "BFFs help optimize data delivery and reduce complexity in frontend applications by providing a custom API.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-9-3",
        "question": "What is 'API Gateway'?",
        "options": [
          "A physical router",
          "A single entry point for all clients that handles routing, security, rate limiting, and other cross-cutting concerns",
          "A website that lists APIs",
          "A type of firewall"
        ],
        "correct": 1,
        "explanation": "API Gateways simplify client interactions and centralize management for microservices.",
        "difficulty": "medium"
      }
    ],
    "12-10": [
      {
        "id": "q-12-10-1",
        "question": "What is 'CORS' (Cross-Origin Resource Sharing)?",
        "options": [
          "A security feature that allows or restricts web applications from making requests to a different domain",
          "A way to share database connections",
          "A type of browser cookie",
          "A method for compressing images"
        ],
        "correct": 0,
        "explanation": "CORS is a browser-level security mechanism; servers must explicitly allow cross-origin requests via headers.",
        "difficulty": "medium"
      },
      {
        "id": "q-12-10-2",
        "question": "What is a 'Preflight' request in CORS?",
        "options": [
          "A request made before a developer goes on vacation",
          "An OPTIONS request sent by the browser to check if the actual request is safe to send",
          "A fast version of a GET request",
          "Checking the server's availability"
        ],
        "correct": 1,
        "explanation": "Preflight requests are used for 'non-simple' requests (like those with custom headers or using PUT/DELETE).",
        "difficulty": "hard"
      },
      {
        "id": "q-12-10-3",
        "question": "What is 'JWT' (JSON Web Token)?",
        "options": [
          "A way to store data in a database",
          "A compact, URL-safe means of representing claims to be transferred between two parties, often used for authentication",
          "A type of encryption algorithm",
          "A library for building APIs"
        ],
        "correct": 1,
        "explanation": "JWTs are commonly used for stateless authentication in modern APIs.",
        "difficulty": "medium"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch12-1",
      "question": "Which HTTP status code category represents Client Errors?",
      "options": ["2xx", "3xx", "4xx", "5xx"],
      "correct": 2,
      "explanation": "400-499 codes indicate issues with the request (e.g., 400 Bad Request, 404 Not Found).",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch12-2",
      "question": "Which HTTP status code category represents Server Errors?",
      "options": ["2xx", "3xx", "4xx", "5xx"],
      "correct": 3,
      "explanation": "500-599 codes indicate that the server failed to fulfill an apparently valid request.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch12-3",
      "question": "What is the primary purpose of the HTTP 'PATCH' method?",
      "options": [
        "To replace a resource entirely",
        "To apply partial modifications to a resource",
        "To delete a resource",
        "To create a new resource"
      ],
      "correct": 1,
      "explanation": "PUT replaces the whole resource; PATCH updates only specific fields.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch12-4",
      "question": "What is 'Over-fetching' in API usage?",
      "options": [
        "Downloading too many files",
        "When an API response contains more data than the client actually needs",
        "Making too many requests per second",
        "Using too much bandwidth"
      ],
      "correct": 1,
      "explanation": "Over-fetching is a common issue with REST that GraphQL aims to solve.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch12-5",
      "question": "What is 'API Documentation-as-Code'?",
      "options": [
        "Writing documentation in a Word document",
        "Generating API documentation automatically from the source code or a specification file (like OpenAPI)",
        "Teaching code how to read",
        "Only using comments for documentation"
      ],
      "correct": 1,
      "explanation": "This ensures the documentation stays in sync with the actual implementation.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch12-6",
      "question": "What is the role of an 'API Key'?",
      "options": [
        "To encrypt the database",
        "To identify the calling application for tracking, billing, and simple access control",
        "To log into the server",
        "To unlock the office door"
      ],
      "correct": 1,
      "explanation": "API keys are simple identifiers; they should not be used for sensitive authentication on their own.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch12-7",
      "question": "What is 'Circuit Breaking' in the context of an API Gateway?",
      "options": [
        "Turning off the power to the server",
        "Automatically failing requests to a downstream service that is known to be down",
        "A way to optimize images",
        "A method for compressing data"
      ],
      "correct": 1,
      "explanation": "It prevents a failing service from causing a cascade of failures across the system.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch12-8",
      "question": "In GraphQL, what is the purpose of 'Resolvers'?",
      "options": [
        "To resolve merge conflicts in Git",
        "Functions that provide the data for a specific field in the schema",
        "To fix bugs automatically",
        "To determine the user's IP address"
      ],
      "correct": 1,
      "explanation": "Resolvers are the glue between the GraphQL schema and the data sources (DB, other APIs).",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch12-9",
      "question": "What is 'Bearer Authentication'?",
      "options": [
        "Authentication using a physical key",
        "A scheme where the client provides a token (like a JWT) in the 'Authorization' header",
        "Authentication using a bear-shaped token",
        "Only for mobile devices"
      ],
      "correct": 1,
      "explanation": "The 'bearer' of the token is granted access.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch12-10",
      "question": "What is the difference between 'Authentication' and 'Authorization'?",
      "options": [
        "They are the same",
        "AuthN is who you are; AuthZ is what you are allowed to do",
        "AuthN is for users; AuthZ is for servers",
        "AuthN is faster"
      ],
      "correct": 1,
      "explanation": "Authentication verifies identity; Authorization verifies permissions.",
      "difficulty": "easy"
    }
  ]
};
