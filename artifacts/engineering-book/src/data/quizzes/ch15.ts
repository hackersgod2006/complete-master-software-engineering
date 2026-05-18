import { ChapterQuizData } from "../quizTypes";

export const CH15_QUIZ: ChapterQuizData = {
  "chapterId": "ch15",
  "sectionQuizzes": {
    "15-1": [
      {
        "id": "q-15-1-1",
        "question": "In software performance, what is the difference between Latency and Throughput?",
        "options": [
          "Latency is the time for a single action; Throughput is actions per unit of time",
          "Throughput is the time for a single action; Latency is actions per unit of time",
          "Latency is about storage; Throughput is about network",
          "They are the same thing measured in different units"
        ],
        "correct": 0,
        "explanation": "Latency measures delay (e.g., ms), while throughput measures capacity (e.g., requests per second).",
        "difficulty": "easy"
      },
      {
        "id": "q-15-1-2",
        "question": "What is 'Profiling' in the context of software development?",
        "options": [
          "Creating user personas for marketing",
          "Using tools to analyze a program's resource usage (CPU, memory, etc.) during execution",
          "Writing documentation for the system's architecture",
          "Setting up the production environment"
        ],
        "correct": 1,
        "explanation": "Profiling helps identify bottlenecks by measuring exactly where time and resources are being spent in the code.",
        "difficulty": "easy"
      },
      {
        "id": "q-15-1-3",
        "question": "Which of these is a common goal of Performance Benchmarking?",
        "options": [
          "To find all bugs in the code",
          "To compare the performance of different systems or versions under controlled conditions",
          "To ensure the code is easy to read",
          "To secure the application against XSS attacks"
        ],
        "correct": 1,
        "explanation": "Benchmarks provide a standard of comparison to track performance improvements or regressions.",
        "difficulty": "medium"
      }
    ],
    "15-2": [
      {
        "id": "q-15-2-1",
        "question": "What is the primary benefit of 'Caching'?",
        "options": [
          "It reduces the size of the application",
          "It avoids expensive re-computation or data retrieval by storing results temporarily",
          "It makes the application more secure",
          "It ensures data is always up-to-date"
        ],
        "correct": 1,
        "explanation": "Caching improves speed by serving data from a faster, closer storage layer.",
        "difficulty": "easy"
      },
      {
        "id": "q-15-2-2",
        "question": "Which caching strategy updates the cache and the underlying database simultaneously?",
        "options": [
          "Cache-Aside",
          "Write-Through",
          "Write-Back (Write-Behind)",
          "Read-Through"
        ],
        "correct": 1,
        "explanation": "Write-Through ensures data consistency by writing to both the cache and the permanent store at once.",
        "difficulty": "medium"
      },
      {
        "id": "q-15-2-3",
        "question": "What is 'Cache Invalidation'?",
        "options": [
          "The process of filling the cache with new data",
          "Removing or updating entries in the cache when the underlying data changes",
          "Choosing which data should be cached",
          "Monitoring the hit rate of the cache"
        ],
        "correct": 1,
        "explanation": "Invalidation is one of the hardest problems in caching, ensuring users don't see 'stale' (old) data.",
        "difficulty": "medium"
      }
    ],
    "15-3": [
      {
        "id": "q-15-3-1",
        "question": "What is a Content Delivery Network (CDN)?",
        "options": [
          "A server that generates dynamic HTML",
          "A distributed network of proxy servers that serve content from locations closer to the user",
          "A type of database for storing large videos",
          "A tool for managing social media content"
        ],
        "correct": 1,
        "explanation": "CDNs reduce latency by caching static assets (images, CSS, JS) on 'edge' servers geographically near users.",
        "difficulty": "easy"
      },
      {
        "id": "q-15-3-2",
        "question": "Which of these content types is most commonly served via a CDN?",
        "options": [
          "Personalized user dashboards",
          "Static images and JavaScript files",
          "Real-time database queries",
          "Private user messages"
        ],
        "correct": 1,
        "explanation": "Static content that is the same for all users is ideal for CDN caching.",
        "difficulty": "easy"
      },
      {
        "id": "q-15-3-3",
        "question": "What is an 'Edge Function' in the context of CDNs?",
        "options": [
          "A function that runs on the user's browser",
          "Small pieces of code that run on the CDN's distributed nodes, close to the user",
          "A CSS trick for making sharp borders",
          "A database trigger for data replication"
        ],
        "correct": 1,
        "explanation": "Edge functions allow developers to run logic (like redirects or header manipulation) at the CDN level, reducing the need to hit the origin server.",
        "difficulty": "hard"
      }
    ],
    "15-4": [
      {
        "id": "q-15-4-1",
        "question": "What is 'Lazy Loading'?",
        "options": [
          "A development style where tasks are postponed until the last minute",
          "The practice of delaying the initialization of an object or resource until it is actually needed",
          "Using low-priority threads for all background tasks",
          "A technique to reduce the speed of the website for testing"
        ],
        "correct": 1,
        "explanation": "Lazy loading (e.g., for images or code modules) reduces the initial load time and saves bandwidth.",
        "difficulty": "easy"
      },
      {
        "id": "q-15-4-2",
        "question": "In React or Vue, what is 'Code Splitting'?",
        "options": [
          "Dividing a large file into smaller files manually",
          "Breaking the application into smaller bundles that are loaded on demand",
          "Using multiple monitors for coding",
          "Writing code in two different programming languages"
        ],
        "correct": 1,
        "explanation": "Code splitting allows the browser to download only the JavaScript needed for the current page.",
        "difficulty": "medium"
      },
      {
        "id": "q-15-4-3",
        "question": "What is a potential drawback of over-using Lazy Loading?",
        "options": [
          "It increases the initial bundle size",
          "It can cause 'layout shift' if not handled with placeholders",
          "It makes the application less secure",
          "It consumes more memory on the server"
        ],
        "correct": 1,
        "explanation": "If elements appear suddenly as they load, it can disrupt the user experience (Cumulative Layout Shift).",
        "difficulty": "medium"
      }
    ],
    "15-5": [
      {
        "id": "q-15-5-1",
        "question": "Why is 'Connection Pooling' important for database performance?",
        "options": [
          "It allows the database to store more data",
          "It reduces the overhead of repeatedly opening and closing database connections",
          "It encrypts the data sent to the database",
          "It prevents SQL injection attacks"
        ],
        "correct": 1,
        "explanation": "Establishing a connection is expensive; a pool keeps a set of open connections ready for reuse.",
        "difficulty": "medium"
      },
      {
        "id": "q-15-5-2",
        "question": "What happens if a connection pool is too small?",
        "options": [
          "The database will run out of memory",
          "Incoming requests may have to wait for a connection to become available, increasing latency",
          "The application will crash immediately",
          "Data will be corrupted"
        ],
        "correct": 1,
        "explanation": "If the pool is exhausted, requests queue up, leading to timeouts and slow response times.",
        "difficulty": "medium"
      },
      {
        "id": "q-15-5-3",
        "question": "What is 'Database Connection Leak'?",
        "options": [
          "When data is stolen from the database",
          "When an application fails to return a connection to the pool after use",
          "When the database password is exposed in the logs",
          "When two users share the same connection"
        ],
        "correct": 1,
        "explanation": "Leaked connections stay 'in use' forever, eventually exhausting the pool and making the database unreachable.",
        "difficulty": "hard"
      }
    ],
    "15-6": [
      {
        "id": "q-15-6-1",
        "question": "What is the 'N+1 Query Problem'?",
        "options": [
          "Using N+1 databases for high availability",
          "Fetching a list of N items, then making N additional queries for related data",
          "A mathematical formula for calculating database load",
          "An error where a loop runs one extra time"
        ],
        "correct": 1,
        "explanation": "This is a common performance killer in ORMs where related data is fetched individually instead of using a JOIN.",
        "difficulty": "medium"
      },
      {
        "id": "q-15-6-2",
        "question": "How can you fix the N+1 problem in an ORM?",
        "options": [
          "By using Eager Loading (e.g., .include() or .join())",
          "By increasing the database CPU",
          "By adding more indexes to the table",
          "By using a NoSQL database"
        ],
        "correct": 0,
        "explanation": "Eager loading tells the ORM to fetch all necessary data in a single, efficient query using a JOIN or a second subquery.",
        "difficulty": "medium"
      },
      {
        "id": "q-15-6-3",
        "question": "Which tool is commonly used to detect N+1 problems in development?",
        "options": [
          "A load balancer",
          "Database query logs or specialized ORM profilers",
          "A code linter",
          "A unit testing framework"
        ],
        "correct": 1,
        "explanation": "Monitoring the number of queries generated by a single request is the key to identifying N+1 issues.",
        "difficulty": "medium"
      }
    ],
    "15-7": [
      {
        "id": "q-15-7-1",
        "question": "What is 'Memoization'?",
        "options": [
          "Writing a memo to the team about performance",
          "An optimization technique that stores the results of expensive function calls",
          "Reducing the memory usage of an application",
          "A type of database indexing"
        ],
        "correct": 1,
        "explanation": "Memoization returns the cached result when the same inputs occur again, particularly useful in recursive functions.",
        "difficulty": "medium"
      },
      {
        "id": "q-15-7-2",
        "question": "When is memoization NOT useful?",
        "options": [
          "For pure functions (same input always gives same output)",
          "For functions with side effects or that return non-deterministic values (like the current time)",
          "For expensive mathematical calculations",
          "For React component rendering"
        ],
        "correct": 1,
        "explanation": "If a function depends on external state or randomness, caching its result would produce incorrect behavior.",
        "difficulty": "hard"
      },
      {
        "id": "q-15-7-3",
        "question": "In JavaScript, what is the 'Event Loop' bottleneck?",
        "options": [
          "When the network is too slow",
          "When a CPU-intensive task blocks the single main thread, preventing other tasks from running",
          "When there are too many events in the queue",
          "When the garbage collector is disabled"
        ],
        "correct": 1,
        "explanation": "Since JS is single-threaded, long-running synchronous code stops the engine from processing UI updates or network callbacks.",
        "difficulty": "hard"
      }
    ],
    "15-8": [
      {
        "id": "q-15-8-1",
        "question": "What is 'Load Balancing'?",
        "options": [
          "Distributing incoming network traffic across multiple servers",
          "Making sure all files are the same size",
          "Dividing work equally between frontend and backend developers",
          "Optimizing the weight of the server hardware"
        ],
        "correct": 0,
        "explanation": "Load balancers ensure no single server is overwhelmed, improving availability and responsiveness.",
        "difficulty": "easy"
      },
      {
        "id": "q-15-8-2",
        "question": "What is 'Sticky Sessions' (Session Affinity) in load balancing?",
        "options": [
          "A session that never expires",
          "Routing all requests from a specific user to the same backend server",
          "Storing session data in a central database",
          "Encrypting session cookies"
        ],
        "correct": 1,
        "explanation": "Sticky sessions are useful when application state is stored locally on the server, though they can make scaling harder.",
        "difficulty": "medium"
      },
      {
        "id": "q-15-8-3",
        "question": "Which algorithm is commonly used by load balancers to distribute traffic evenly?",
        "options": [
          "Binary Search",
          "Round Robin",
          "Quicksort",
          "Dijkstra's Algorithm"
        ],
        "correct": 1,
        "explanation": "Round Robin assigns requests to servers in a simple, sequential order.",
        "difficulty": "easy"
      }
    ],
    "15-9": [
      {
        "id": "q-15-9-1",
        "question": "What is 'Premature Optimization'?",
        "options": [
          "Optimizing code before it is written",
          "Optimizing code before you have evidence (benchmarks/profiles) that it is a bottleneck",
          "Using a compiler that is too fast",
          "Finishing a project ahead of schedule"
        ],
        "correct": 1,
        "explanation": "As Donald Knuth said, 'Premature optimization is the root of all evil.' It often leads to complex, unreadable code for negligible gains.",
        "difficulty": "easy"
      },
      {
        "id": "q-15-9-2",
        "question": "What is 'Amdahl's Law' primarily about?",
        "options": [
          "The speed of light in fiber optic cables",
          "The theoretical limit of speedup for a program when only a part of it is improved",
          "The number of transistors on a microchip",
          "The cost of cloud computing over time"
        ],
        "correct": 1,
        "explanation": "It shows that the maximum improvement is limited by the portion of the task that cannot be parallelized or improved.",
        "difficulty": "hard"
      },
      {
        "id": "q-15-9-3",
        "question": "What is 'Tail Latency' (P99)?",
        "options": [
          "The average latency of all requests",
          "The latency experienced by the slowest 1% of users",
          "The time it takes to process the last byte of a request",
          "The latency of requests that fail"
        ],
        "correct": 1,
        "explanation": "P99 is a critical metric because even if the average is good, a significant number of users might experience very slow responses.",
        "difficulty": "hard"
      }
    ],
    "15-10": [
      {
        "id": "q-15-10-1",
        "question": "What is 'Throttling' in the context of performance?",
        "options": [
          "Stopping the server when it gets too hot",
          "Intentionally slowing down a process to conserve resources or stay within limits",
          "A type of data compression",
          "Speeding up a process by bypassing security checks"
        ],
        "correct": 1,
        "explanation": "Throttling is used to ensure stability by limiting how many operations can happen in a given time.",
        "difficulty": "medium"
      },
      {
        "id": "q-15-10-2",
        "question": "What is 'Garbage Collection' (GC) overhead?",
        "options": [
          "The cost of buying more RAM",
          "The CPU time spent by the system to identify and free unused memory",
          "The space taken up by old log files",
          "The time spent deleting old database records"
        ],
        "correct": 1,
        "explanation": "Frequent or long-running GC cycles can cause 'stop-the-world' pauses, impacting application responsiveness.",
        "difficulty": "medium"
      },
      {
        "id": "q-15-10-3",
        "question": "How does 'Gzip' or 'Brotli' compression help web performance?",
        "options": [
          "By making the CPU work faster",
          "By reducing the size of text assets (HTML/CSS/JS) sent over the network",
          "By encrypting the data",
          "By reducing the number of HTTP requests"
        ],
        "correct": 1,
        "explanation": "Compression significantly reduces the bytes transferred, which is especially important for users on slow mobile networks.",
        "difficulty": "easy"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch15-1",
      "question": "Which metric is most useful for identifying if your system is experiencing intermittent slowdowns for a small number of users?",
      "options": ["Average Latency", "Median (P50) Latency", "P99 Latency", "Throughput"],
      "correct": 2,
      "explanation": "Percentile-based metrics like P99 capture the 'tail' of the distribution, showing the worst-case performance.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch15-2",
      "question": "In a 'Cache-Aside' pattern, what happens when there is a cache miss?",
      "options": [
        "The application returns an error",
        "The application fetches data from the database, then stores it in the cache",
        "The database automatically updates the cache",
        "The request is put into a queue"
      ],
      "correct": 1,
      "explanation": "In cache-aside, the application is responsible for reading from and writing to the cache.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch15-3",
      "question": "What is the main benefit of using a CDN for globally distributed users?",
      "options": [
        "Reduced distance between the user and the content (lower latency)",
        "Automatic translation of content",
        "Higher security for financial data",
        "Simplified database management"
      ],
      "correct": 0,
      "explanation": "CDNs bring content closer to the user physically, reducing the number of network hops.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch15-4",
      "question": "Which of these is a symptom of a 'Memory Leak'?",
      "options": [
        "Slow CPU performance on startup",
        "Gradual increase in memory usage over time until the application crashes",
        "Immediate crash on the first request",
        "High network latency"
      ],
      "correct": 1,
      "explanation": "Memory leaks happen when a program fails to release memory it no longer needs.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch15-5",
      "question": "What is 'Debouncing'?",
      "options": [
        "Increasing the power of a server",
        "Ensuring a function is only called once after a certain amount of time has passed without further calls",
        "A method of compressing images",
        "Checking for duplicate records in a database"
      ],
      "correct": 1,
      "explanation": "Debouncing is common in UI development (e.g., search-as-you-type) to avoid triggering expensive operations on every keystroke.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch15-6",
      "question": "What is 'Horizontal Scaling'?",
      "options": [
        "Adding more RAM to an existing server",
        "Upgrading the CPU of a server",
        "Adding more machines to the pool of resources",
        "Optimizing the code to use fewer threads"
      ],
      "correct": 2,
      "explanation": "Horizontal scaling (scaling out) means adding more nodes to a system.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch15-7",
      "question": "Which of these is likely to cause an N+1 query problem?",
      "options": [
        "A single large JOIN query",
        "Looping through a list of results and calling the database for each item's details",
        "Using a cache for frequent queries",
        "Executing multiple queries in parallel"
      ],
      "correct": 1,
      "explanation": "Performing database lookups inside a loop is a classic performance antipattern.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch15-8",
      "question": "What does 'Critical Rendering Path' optimization involve?",
      "options": [
        "Optimizing the order in which browser resources are loaded to show the page faster",
        "Optimizing SQL queries on the backend",
        "Adding more servers to the load balancer",
        "Encrypting the network traffic"
      ],
      "correct": 0,
      "explanation": "This involves prioritizing the HTML, CSS, and JS needed for the initial view ('above the fold').",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch15-9",
      "question": "What is the purpose of 'Minification' of JS/CSS files?",
      "options": [
        "To make the code more readable",
        "To remove unnecessary characters (whitespace, comments) to reduce file size",
        "To encrypt the code so it can't be stolen",
        "To add more features to the code"
      ],
      "correct": 1,
      "explanation": "Minification reduces the amount of data the browser needs to download.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch15-10",
      "question": "What is 'Database Sharding'?",
      "options": [
        "Partitioning data across multiple databases to improve performance and scale",
        "Making backups of the database",
        "Normalizing the database schema",
        "Using a faster database engine"
      ],
      "correct": 0,
      "explanation": "Sharding is a horizontal scaling technique for databases.",
      "difficulty": "easy"
    }
  ]
};
