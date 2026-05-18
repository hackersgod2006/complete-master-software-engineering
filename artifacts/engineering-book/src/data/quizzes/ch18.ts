import { ChapterQuizData } from "../quizTypes";

export const CH18_QUIZ: ChapterQuizData = {
  chapterId: "ch18",
  sectionQuizzes: {
    "18-1": [
      {
        id: "q18-1-1",
        question: "What is the first step in the system design process?",
        options: [
          "Writing the code",
          "Requirements gathering (Functional and Non-Functional)",
          "Capacity estimation",
          "Selecting a database"
        ],
        correct: 1,
        explanation: "Before designing anything, it's crucial to understand the requirements, both functional (what it does) and non-functional (how it performs).",
        difficulty: "easy"
      },
      {
        id: "q18-1-2",
        question: "Which of the following is a 'Functional Requirement'?",
        options: [
          "The system must handle 10k requests per second",
          "The system must allow users to post tweets",
          "The system must have 99.9% availability",
          "The system must respond in less than 200ms"
        ],
        correct: 1,
        explanation: "Functional requirements describe specific features or behaviors of the system, such as 'posting tweets'.",
        difficulty: "easy"
      },
      {
        id: "q18-1-3",
        question: "What is 'Non-Functional' requirement also known as?",
        options: [
          "User Stories",
          "Quality Attributes",
          "Business Logic",
          "Database Schema"
        ],
        correct: 1,
        explanation: "Non-functional requirements are often referred to as quality attributes (e.g., scalability, availability, reliability).",
        difficulty: "medium"
      }
    ],
    "18-2": [
      {
        id: "q18-2-1",
        question: "What is the primary purpose of 'Back-of-the-envelope' calculations?",
        options: [
          "To get exact hardware counts",
          "To estimate scale and identify potential bottlenecks",
          "To prove the design is 100% correct",
          "To calculate the project budget"
        ],
        correct: 1,
        explanation: "These estimations help engineers understand the order of magnitude of the system's needs and identify constraints.",
        difficulty: "medium"
      },
      {
        id: "q18-2-2",
        question: "If a system has 100 million Daily Active Users (DAU) and each user makes 10 requests per day, what is the approximate QPS (Queries Per Second)?",
        options: [
          "~1,150 QPS",
          "~11,500 QPS",
          "~115,000 QPS",
          "~1,150,000 QPS"
        ],
        correct: 1,
        explanation: "(100M * 10) / (24 * 3600) ≈ 1,000,000,000 / 86,400 ≈ 11,574 QPS.",
        difficulty: "hard"
      },
      {
        id: "q18-2-3",
        question: "When estimating storage for 5 years with 100GB of new data per day, how much total storage is needed (ignoring replication)?",
        options: [
          "~1.8 TB",
          "~18 TB",
          "~182 TB",
          "~1.8 PB"
        ],
        correct: 2,
        explanation: "100GB/day * 365 days/year * 5 years ≈ 182,500 GB ≈ 182.5 TB.",
        difficulty: "medium"
      }
    ],
    "18-3": [
      {
        id: "q18-3-1",
        question: "In a URL shortener design, why might we use Base62 encoding for the short URL?",
        options: [
          "It's more secure than Base64",
          "It uses only alphanumeric characters (a-z, A-Z, 0-9), making it URL-safe",
          "It compresses the data better than binary",
          "It is the only way to store data in Redis"
        ],
        correct: 1,
        explanation: "Base62 is common because it provides a compact, alphanumeric representation that doesn't include special characters like '+' or '/' found in Base64.",
        difficulty: "medium"
      },
      {
        id: "q18-3-2",
        question: "For a URL shortener, what is a common way to generate unique IDs at scale?",
        options: [
          "UUIDs",
          "Centralized Ticket Server or Snowflake ID",
          "Random string generation with collision checking",
          "The database's auto-incrementing ID"
        ],
        correct: 1,
        explanation: "Centralized ticket servers or distributed ID generators like Snowflake provide unique, ordered IDs at high scale.",
        difficulty: "medium"
      },
      {
        id: "q18-3-3",
        question: "What is the primary redirection status code used for URL shorteners to ensure analytics can be tracked?",
        options: [
          "301 (Permanent Redirect)",
          "302 (Found/Temporary Redirect)",
          "404 (Not Found)",
          "500 (Internal Server Error)"
        ],
        correct: 1,
        explanation: "302 is often preferred over 301 if the system wants to track every click, as browsers might cache 301 redirects locally.",
        difficulty: "hard"
      }
    ],
    "18-4": [
      {
        id: "q18-4-1",
        question: "In a News Feed design, what is 'Fan-out on write' (Push model)?",
        options: [
          "A user's feed is generated when they log in",
          "A post is delivered to all followers' feeds at the time of posting",
          "A post is deleted from all feeds after 24 hours",
          "The system fans out logs to ELK"
        ],
        correct: 1,
        explanation: "Fan-out on write delivers the post to all followers' pre-computed feeds as soon as it's published.",
        difficulty: "medium"
      },
      {
        id: "q18-4-2",
        question: "What is the 'Celebrity Problem' in news feed design?",
        options: [
          "Celebrities having too many followers, making fan-out on write extremely expensive",
          "Celebrities posting too much content",
          "Celebrities not posting enough",
          "User accounts being hacked by celebrities"
        ],
        correct: 0,
        explanation: "When a celebrity with millions of followers posts, fan-out on write creates millions of updates simultaneously, which can overwhelm the system.",
        difficulty: "medium"
      },
      {
        id: "q18-4-3",
        question: "Which hybrid approach is often used to solve the celebrity problem?",
        options: [
          "Push for regular users, Pull (Fan-out on load) for celebrities",
          "Pull for regular users, Push for celebrities",
          "Caching all feeds in memory",
          "Storing all posts in a single relational table"
        ],
        correct: 0,
        explanation: "A hybrid approach often uses push for small followings and pull (on-demand) for users with massive followings.",
        difficulty: "hard"
      }
    ],
    "18-5": [
      {
        id: "q18-5-1",
        question: "What is the primary goal of a Rate Limiter?",
        options: [
          "To speed up the network",
          "To prevent resource exhaustion and protect against DoS attacks",
          "To count the number of users",
          "To encrypt outgoing traffic"
        ],
        correct: 1,
        explanation: "Rate limiters protect services by limiting the number of requests a client can make within a certain time window.",
        difficulty: "easy"
      },
      {
        id: "q18-5-2",
        question: "Which algorithm is commonly used for rate limiting?",
        options: [
          "Token Bucket",
          "Merge Sort",
          "Dijkstra's Algorithm",
          "Paxos"
        ],
        correct: 0,
        explanation: "Token Bucket and Leaky Bucket are classic algorithms used for rate limiting.",
        difficulty: "easy"
      },
      {
        id: "q18-5-3",
        question: "What is a disadvantage of the 'Fixed Window' rate limiting algorithm?",
        options: [
          "It's too complex to implement",
          "It can allow a burst of traffic at the edges of the window",
          "It requires a lot of memory",
          "It only works with Redis"
        ],
        correct: 1,
        explanation: "Fixed window counters can allow twice the allowed rate of traffic near the window boundaries.",
        difficulty: "medium"
      }
    ],
    "18-6": [
      {
        id: "q18-6-1",
        question: "What is 'Vertical Scaling'?",
        options: [
          "Adding more servers to a cluster",
          "Adding more resources (CPU, RAM) to an existing server",
          "Moving servers to a higher floor in the data center",
          "Scaling the database only"
        ],
        correct: 1,
        explanation: "Vertical scaling (scaling up) means increasing the power of a single machine.",
        difficulty: "easy"
      },
      {
        id: "q18-6-2",
        question: "What is a major disadvantage of Horizontal Scaling?",
        options: [
          "There is a hard limit on how much you can scale",
          "It introduces complexity in communication and data consistency",
          "It's cheaper than vertical scaling",
          "It requires less maintenance"
        ],
        correct: 1,
        explanation: "Horizontal scaling (scaling out) requires distributed system management, load balancing, and handling network partitions.",
        difficulty: "medium"
      },
      {
        id: "q18-6-3",
        question: "Which component is essential for distributing traffic across multiple servers?",
        options: [
          "Database",
          "Load Balancer",
          "Cache",
          "Message Queue"
        ],
        correct: 1,
        explanation: "A Load Balancer distributes incoming network traffic across multiple servers.",
        difficulty: "easy"
      }
    ],
    "18-7": [
      {
        id: "q18-7-1",
        question: "What is the primary benefit of using a Content Delivery Network (CDN)?",
        options: [
          "To encrypt database queries",
          "To serve static content from servers closer to the user, reducing latency",
          "To replace the web server entirely",
          "To provide a more secure password storage"
        ],
        correct: 1,
        explanation: "CDNs store copies of static assets (images, CSS, JS) in geographically distributed 'edge' locations.",
        difficulty: "easy"
      },
      {
        id: "q18-7-2",
        question: "When should you NOT use a CDN?",
        options: [
          "For high-traffic static websites",
          "For frequently changing dynamic content that is user-specific",
          "For global applications",
          "For serving large video files"
        ],
        correct: 1,
        explanation: "CDNs are less effective for highly dynamic, personalized content that cannot be easily cached.",
        difficulty: "medium"
      },
      {
        id: "q18-7-3",
        question: "What is a 'Cache Hit Ratio'?",
        options: [
          "The number of times the server crashes",
          "The percentage of requests served from the cache vs the total requests",
          "The speed of the cache",
          "The size of the cache"
        ],
        correct: 1,
        explanation: "A higher cache hit ratio means the cache is effectively serving most requests, reducing load on the origin.",
        difficulty: "easy"
      }
    ],
    "18-8": [
      {
        id: "q18-8-1",
        question: "What is 'Database Sharding'?",
        options: [
          "Deleting old data from the database",
          "Horizontal partitioning of data across multiple database instances",
          "Encrypting the database disk",
          "Creating a read replica"
        ],
        correct: 1,
        explanation: "Sharding involves splitting a large dataset into smaller, more manageable pieces called shards, each stored on a different server.",
        difficulty: "medium"
      },
      {
        id: "q18-8-2",
        question: "What is a 'Shard Key'?",
        options: [
          "A password to access the shard",
          "The column used to determine which shard a data row belongs to",
          "The primary key of the shard table",
          "A key used for SSL connections"
        ],
        correct: 1,
        explanation: "The shard key is used by the partitioning logic to route queries and data to the correct shard.",
        difficulty: "medium"
      },
      {
        id: "q18-8-3",
        question: "Which of the following is a problem caused by sharding?",
        options: [
          "Faster queries",
          "Complex cross-shard joins",
          "Improved availability",
          "Reduced storage costs"
        ],
        correct: 1,
        explanation: "Joining data across different shards (on different physical servers) is difficult and often avoided in sharded architectures.",
        difficulty: "hard"
      }
    ],
    "18-9": [
      {
        id: "q18-9-1",
        question: "What is the primary role of a Message Queue (e.g., Kafka, RabbitMQ)?",
        options: [
          "To store user passwords",
          "To provide asynchronous communication between services",
          "To replace the database",
          "To speed up CSS rendering"
        ],
        correct: 1,
        explanation: "Message queues allow services to communicate asynchronously, decoupling them and improving system resilience.",
        difficulty: "easy"
      },
      {
        id: "q18-9-2",
        question: "Which pattern is common with message queues?",
        options: [
          "Producer-Consumer",
          "Client-Server",
          "Direct-Attached Storage",
          "Singleton"
        ],
        correct: 0,
        explanation: "In a producer-consumer pattern, one or more producers add messages to a queue, and one or more consumers process them.",
        difficulty: "easy"
      },
      {
        id: "q18-9-3",
        question: "What does 'Durability' mean in a message queue context?",
        options: [
          "The queue is very fast",
          "Messages are persisted to disk and survive server restarts",
          "The queue can handle many consumers",
          "The queue uses low memory"
        ],
        correct: 1,
        explanation: "Durability ensures that messages are not lost if the message broker crashes.",
        difficulty: "medium"
      }
    ],
    "18-10": [
      {
        id: "q18-10-1",
        question: "What is 'Consistent Hashing'?",
        options: [
          "A way to hash passwords securely",
          "A technique to minimize data reshuffling when servers are added or removed from a cluster",
          "A hash function that always returns the same value",
          "A way to sort data in a B-Tree"
        ],
        correct: 1,
        explanation: "Consistent hashing allows for efficient scaling of distributed caches and databases by only moving a fraction of the data when nodes change.",
        difficulty: "hard"
      },
      {
        id: "q18-10-2",
        question: "In consistent hashing, what are 'Virtual Nodes' used for?",
        options: [
          "To simulate server failures",
          "To achieve a more uniform distribution of data across physical nodes",
          "To replace physical servers entirely",
          "To increase the speed of hashing"
        ],
        correct: 1,
        explanation: "Virtual nodes help balance the load more evenly by representing one physical node multiple times on the hash ring.",
        difficulty: "hard"
      },
      {
        id: "q18-10-3",
        question: "Which of the following is an example of a system that uses consistent hashing?",
        options: [
          "Amazon Dynamo",
          "A single-node SQLite database",
          "A simple bash script",
          "A static HTML file"
        ],
        correct: 0,
        explanation: "Amazon Dynamo (and many other distributed NoSQL databases like Cassandra) uses consistent hashing for data partitioning.",
        difficulty: "medium"
      }
    ]
  },
  examQuestions: [
    {
      id: "q18-exam-1",
      question: "Which redirection code is best for a URL shortener if we want to reduce server load but potentially lose some tracking data?",
      options: [
        "301 Permanent Redirect",
        "302 Temporary Redirect",
        "307 Temporary Redirect",
        "308 Permanent Redirect"
      ],
      correct: 0,
      explanation: "A 301 redirect is cached by the browser, so subsequent requests for the same short URL won't hit the server, reducing load but also preventing tracking of those clicks.",
      difficulty: "hard"
    },
    {
      id: "q18-exam-2",
      question: "What is the 'Fan-out on load' (Pull model) in News Feed design?",
      options: [
        "Computing the feed at the time of posting",
        "Computing the feed on-demand when the user opens the app",
        "Sending a notification to all users",
        "Caching all posts for 30 days"
      ],
      correct: 1,
      explanation: "Pull model computes the feed dynamically when the user requests it, which is efficient for users with many followers (celebrities).",
      difficulty: "medium"
    },
    {
      id: "q18-exam-3",
      question: "Why is capacity estimation important early in the system design?",
      options: [
        "To select the right programming language",
        "To identify if the system can fit on one machine or needs to be distributed",
        "To hire the right number of developers",
        "To design the UI"
      ],
      correct: 1,
      explanation: "Estimation reveals if the scale requires distribution, which fundamentally changes the architecture.",
      difficulty: "medium"
    },
    {
      id: "q18-exam-4",
      question: "What is a 'Hot Key' problem in a sharded database?",
      options: [
        "A key that is too long",
        "A specific shard key that receives a disproportionately high amount of traffic",
        "A key that is frequently deleted",
        "An encrypted key"
      ],
      correct: 1,
      explanation: "Hot keys lead to 'hotspots' where one shard is overwhelmed while others are idle.",
      difficulty: "medium"
    },
    {
      id: "q18-exam-5",
      question: "Which rate limiting algorithm allows for sudden bursts of traffic?",
      options: [
        "Leaky Bucket",
        "Token Bucket",
        "Fixed Window",
        "All of them"
      ],
      correct: 1,
      explanation: "Token Bucket allows bursts up to the capacity of the bucket, whereas Leaky Bucket smooths out the flow to a constant rate.",
      difficulty: "hard"
    },
    {
      id: "q18-exam-6",
      question: "What is the primary benefit of 'Microservices' over 'Monoliths'?",
      options: [
        "Lower complexity",
        "Easier debugging",
        "Independent deployment and scaling of components",
        "Faster communication between modules"
      ],
      correct: 2,
      explanation: "Microservices allow teams to deploy and scale different parts of the system independently.",
      difficulty: "medium"
    },
    {
      id: "q18-exam-7",
      question: "What does 'SLA' stand for in system design?",
      options: [
        "Service Level Agreement",
        "System Logic Archive",
        "Simple Load Access",
        "Standard Level Architecture"
      ],
      correct: 0,
      explanation: "SLA is a contract between a service provider and a client that specifies the expected level of service (e.g., uptime).",
      difficulty: "easy"
    },
    {
      id: "q18-exam-8",
      question: "In consistent hashing, if you have 1000 keys and add a 4th server to a 3-server cluster, roughly how many keys need to be moved?",
      options: [
        "All 1000",
        "~333",
        "~250",
        "0"
      ],
      correct: 2,
      explanation: "In consistent hashing, only about K/N keys are moved (1000/4 = 250). In standard hashing (mod N), nearly all keys might move.",
      difficulty: "hard"
    },
    {
      id: "q18-exam-9",
      question: "What is 'Read Replica' primarily used for?",
      options: [
        "Data backup only",
        "Scaling read-heavy workloads",
        "Increasing write throughput",
        "Replacing the primary database"
      ],
      correct: 1,
      explanation: "Read replicas allow you to distribute read queries across multiple instances, keeping the primary instance for writes.",
      difficulty: "easy"
    },
    {
      id: "q18-exam-10",
      question: "What is 'Throughput' in a system?",
      options: [
        "The time it takes to process one request",
        "The number of requests the system can handle in a given time period",
        "The total amount of memory used",
        "The number of lines of code"
      ],
      correct: 1,
      explanation: "Throughput measures the rate of successful message delivery or request processing.",
      difficulty: "easy"
    }
  ]
};
