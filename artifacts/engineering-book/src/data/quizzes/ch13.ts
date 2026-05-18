import { ChapterQuizData } from "../quizTypes";

export const CH13_QUIZ: ChapterQuizData = {
  "chapterId": "ch13",
  "sectionQuizzes": {
    "13-1": [
      {
        "id": "q-13-1-1",
        "question": "Which of the following is a primary characteristic of Relational Databases (RDBMS)?",
        "options": [
          "Schema-less data storage",
          "Horizontal scaling as the primary growth path",
          "Strict predefined schemas and ACID compliance",
          "Key-value pair storage"
        ],
        "correct": 2,
        "explanation": "Relational databases are characterized by structured schemas, the use of SQL, and adherence to ACID properties for transactions.",
        "difficulty": "easy"
      },
      {
        "id": "q-13-1-2",
        "question": "What is a major advantage of NoSQL databases over relational databases?",
        "options": [
          "Guaranteed strict consistency in all scenarios",
          "Superior support for complex JOIN operations",
          "Flexibility in handling unstructured or semi-structured data",
          "Inherent support for multi-table transactions"
        ],
        "correct": 2,
        "explanation": "NoSQL databases provide flexibility for evolving data models and are often easier to scale horizontally.",
        "difficulty": "easy"
      },
      {
        "id": "q-13-1-3",
        "question": "When would you choose a Document Store (like MongoDB) over a Relational Database?",
        "options": [
          "When data integrity and normalization are the top priorities",
          "When the data model is highly hierarchical and evolves frequently",
          "When you need to perform complex analytical queries across many tables",
          "When you require strict ACID compliance for every operation"
        ],
        "correct": 1,
        "explanation": "Document stores are ideal for hierarchical data and scenarios where the schema needs to be flexible.",
        "difficulty": "medium"
      }
    ],
    "13-2": [
      {
        "id": "q-13-2-1",
        "question": "In the context of ACID properties, what does 'Atomicity' guarantee?",
        "options": [
          "Data is consistent before and after a transaction",
          "All operations in a transaction either succeed or fail as a single unit",
          "Multiple transactions can run concurrently without interference",
          "Once a transaction is committed, it remains so even in the event of a crash"
        ],
        "correct": 1,
        "explanation": "Atomicity ensures that a transaction is 'all or nothing'.",
        "difficulty": "medium"
      },
      {
        "id": "q-13-2-2",
        "question": "Which ACID property ensures that the results of a transaction are made permanent?",
        "options": [
          "Consistency",
          "Isolation",
          "Durability",
          "Atomicity"
        ],
        "correct": 2,
        "explanation": "Durability guarantees that once a transaction is committed, its effects persist through system failures.",
        "difficulty": "easy"
      },
      {
        "id": "q-13-2-3",
        "question": "What is the main goal of the 'Isolation' property in ACID?",
        "options": [
          "To ensure data is replicated to multiple nodes",
          "To prevent concurrent transactions from seeing each other's partial results",
          "To ensure that only one user can access the database at a time",
          "To make sure the database schema is strictly followed"
        ],
        "correct": 1,
        "explanation": "Isolation prevents transactions from interfering with each other when running concurrently.",
        "difficulty": "medium"
      }
    ],
    "13-3": [
      {
        "id": "q-13-3-1",
        "question": "What is the purpose of a Database Index?",
        "options": [
          "To encrypt sensitive data columns",
          "To speed up data retrieval operations at the cost of slower writes",
          "To enforce referential integrity between tables",
          "To compress data on disk"
        ],
        "correct": 1,
        "explanation": "Indexes improve read performance by providing a faster lookup mechanism, though they add overhead to inserts and updates.",
        "difficulty": "easy"
      },
      {
        "id": "q-13-3-2",
        "question": "Which type of index is most efficient for range queries?",
        "options": [
          "Hash Index",
          "B-Tree Index",
          "Bitmap Index",
          "Full-text Index"
        ],
        "correct": 1,
        "explanation": "B-Tree indexes maintain sorted order, making them highly efficient for range-based lookups.",
        "difficulty": "medium"
      },
      {
        "id": "q-13-3-3",
        "question": "What is a 'Covering Index'?",
        "options": [
          "An index that includes all columns of a table",
          "An index that contains all the data needed for a specific query without accessing the table",
          "An index that is automatically created by the primary key",
          "An index that covers multiple tables in a JOIN"
        ],
        "correct": 1,
        "explanation": "A covering index contains all fields requested by a query, allowing the database to skip reading the actual data pages.",
        "difficulty": "hard"
      }
    ],
    "13-4": [
      {
        "id": "q-13-4-1",
        "question": "What does a Database Query Optimizer do?",
        "options": [
          "Rewrites the application code for better performance",
          "Determines the most efficient way to execute a SQL statement",
          "Automatically creates indexes based on query patterns",
          "Compresses the results of a query before sending them to the client"
        ],
        "correct": 1,
        "explanation": "The optimizer analyzes different execution plans (e.g., table scans vs. index lookups) and chooses the most efficient one.",
        "difficulty": "medium"
      },
      {
        "id": "q-13-4-2",
        "question": "In query optimization, what is 'Predicate Pushdown'?",
        "options": [
          "Moving filters as close to the data source as possible",
          "Converting all WHERE clauses into JOIN conditions",
          "Executing subqueries after the main query results are fetched",
          "Sorting data before applying any filters"
        ],
        "correct": 0,
        "explanation": "Predicate pushdown improves performance by filtering data early, reducing the amount of data processed in later stages.",
        "difficulty": "hard"
      },
      {
        "id": "q-13-4-3",
        "question": "Which of the following is usually a sign of a poorly optimized query?",
        "options": [
          "Index Seek",
          "Full Table Scan on a large table",
          "Use of a CTE (Common Table Expression)",
          "Parameterization of queries"
        ],
        "correct": 1,
        "explanation": "Full table scans on large datasets are often slow and indicate a lack of appropriate indexing.",
        "difficulty": "easy"
      }
    ],
    "13-5": [
      {
        "id": "q-13-5-1",
        "question": "What is 'Database Sharding'?",
        "options": [
          "Creating read-only copies of the database",
          "Partitioning a large dataset across multiple independent database instances",
          "Combining multiple small databases into one large one",
          "Normalizing a table into many smaller tables"
        ],
        "correct": 1,
        "explanation": "Sharding is a horizontal scaling technique that splits data across multiple servers to handle higher loads.",
        "difficulty": "medium"
      },
      {
        "id": "q-13-5-2",
        "question": "Which sharding strategy involves using a range of values (e.g., A-M, N-Z) to determine the shard?",
        "options": [
          "Hash-based Sharding",
          "Range-based Sharding",
          "Directory-based Sharding",
          "Vertical Sharding"
        ],
        "correct": 1,
        "explanation": "Range-based sharding partitions data based on a range of keys, which can lead to hotspots if data isn't evenly distributed.",
        "difficulty": "medium"
      },
      {
        "id": "q-13-5-3",
        "question": "What is a major challenge when implementing sharding?",
        "options": [
          "It makes simple SELECT statements impossible",
          "It complicates queries that need to join data across different shards",
          "It reduces the total storage capacity of the system",
          "It requires all shards to be on the same physical server"
        ],
        "correct": 1,
        "explanation": "Cross-shard joins are complex and often require application-level logic or specialized middleware.",
        "difficulty": "hard"
      }
    ],
    "13-6": [
      {
        "id": "q-13-6-1",
        "question": "What is the primary purpose of Database Replication?",
        "options": [
          "To normalize the database schema",
          "To provide high availability and improve read performance",
          "To ensure that data is encrypted at rest",
          "To reduce the amount of storage used by the database"
        ],
        "correct": 1,
        "explanation": "Replication involves copying data to multiple nodes, allowing for failover and distributing read traffic.",
        "difficulty": "easy"
      },
      {
        "id": "q-13-6-2",
        "question": "In 'Multi-Leader' replication, where can writes occur?",
        "options": [
          "Only on a single designated primary node",
          "On any node in the cluster",
          "On multiple designated leader nodes",
          "Only on secondary nodes"
        ],
        "correct": 2,
        "explanation": "Multi-leader replication allows writes to happen on several nodes, which is useful for multi-datacenter deployments.",
        "difficulty": "medium"
      },
      {
        "id": "q-13-6-3",
        "question": "What is 'Read-Your-Own-Writes' consistency?",
        "options": [
          "A guarantee that a user will always see the latest data from any node",
          "A guarantee that if a user submits a write, they will see that update in subsequent reads",
          "A guarantee that no two users can write to the same record at once",
          "A guarantee that reads are faster than writes"
        ],
        "correct": 1,
        "explanation": "This consistency model ensures that a user's own updates are immediately visible to them, even in asynchronous replication systems.",
        "difficulty": "hard"
      }
    ],
    "13-7": [
      {
        "id": "q-13-7-1",
        "question": "What do the letters in CAP Theorem stand for?",
        "options": [
          "Complexity, Accuracy, Performance",
          "Consistency, Availability, Partition Tolerance",
          "Concurrency, Atomicity, Persistence",
          "Capacity, Agility, Portability"
        ],
        "correct": 1,
        "explanation": "CAP Theorem states that a distributed system can only provide two of these three guarantees simultaneously.",
        "difficulty": "easy"
      },
      {
        "id": "q-13-7-2",
        "question": "According to CAP Theorem, what happens in a network partition if you choose Availability?",
        "options": [
          "The system shuts down to prevent data loss",
          "The system continues to respond but may return stale or inconsistent data",
          "The system waits until the partition is resolved before responding",
          "The system automatically switches to a relational model"
        ],
        "correct": 1,
        "explanation": "Choosing Availability (AP) means the system stays operational during a partition, sacrificing strict Consistency.",
        "difficulty": "medium"
      },
      {
        "id": "q-13-7-3",
        "question": "Which type of system prioritizes Consistency and Partition Tolerance (CP)?",
        "options": [
          "A system that must always respond, even with old data",
          "A system where data accuracy is critical and it's better to return an error than wrong data",
          "A system that doesn't care about network failures",
          "A single-node database with no network connection"
        ],
        "correct": 1,
        "explanation": "CP systems (like many distributed locking services) will stop responding if they cannot guarantee consistent data during a partition.",
        "difficulty": "hard"
      }
    ],
    "13-8": [
      {
        "id": "q-13-8-1",
        "question": "What is 'Polyglot Persistence'?",
        "options": [
          "Storing data in many different languages",
          "Using different database technologies for different data requirements within one application",
          "Using a single database that supports multiple query languages",
          "Replicating data across different geographical regions"
        ],
        "correct": 1,
        "explanation": "Polyglot persistence means choosing the right tool for the job (e.g., RDBMS for transactions, Graph DB for relationships).",
        "difficulty": "medium"
      },
      {
        "id": "q-13-8-2",
        "question": "Which database type is best suited for analyzing complex relationships like social networks?",
        "options": [
          "Relational Database",
          "Key-Value Store",
          "Graph Database",
          "Time-Series Database"
        ],
        "correct": 2,
        "explanation": "Graph databases are optimized for traversing relationships between entities.",
        "difficulty": "easy"
      },
      {
        "id": "q-13-8-3",
        "question": "When would a Time-Series Database (TSDB) be the most appropriate choice?",
        "options": [
          "Storing user profile information",
          "Handling high-volume sensor data or application metrics over time",
          "Managing financial transactions with strict ACID requirements",
          "Storing large binary assets like images"
        ],
        "correct": 1,
        "explanation": "TSDBs are optimized for high-write volumes and range queries over time-stamped data.",
        "difficulty": "medium"
      }
    ],
    "13-9": [
      {
        "id": "q-13-9-1",
        "question": "What is the primary goal of Database Normalization?",
        "options": [
          "To maximize the speed of SELECT queries",
          "To reduce data redundancy and improve data integrity",
          "To make the database easier to shard",
          "To encrypt all fields by default"
        ],
        "correct": 1,
        "explanation": "Normalization organizes data to minimize duplication and ensure logical dependencies.",
        "difficulty": "medium"
      },
      {
        "id": "q-13-9-2",
        "question": "What characterizes Third Normal Form (3NF)?",
        "options": [
          "All attributes depend only on the primary key",
          "There are no multi-valued attributes",
          "Non-key attributes are not dependent on other non-key attributes (no transitive dependencies)",
          "The table is split into at least three separate tables"
        ],
        "correct": 2,
        "explanation": "3NF removes transitive dependencies, ensuring every non-key column depends solely on the primary key.",
        "difficulty": "hard"
      },
      {
        "id": "q-13-9-3",
        "question": "When might you intentionally 'Denormalize' a database?",
        "options": [
          "To improve write performance",
          "To reduce storage space",
          "To improve read performance by avoiding expensive joins",
          "To simplify the database schema for beginners"
        ],
        "correct": 2,
        "explanation": "Denormalization adds redundant data to speed up complex read queries by reducing the number of joins needed.",
        "difficulty": "medium"
      }
    ],
    "13-10": [
      {
        "id": "q-13-10-1",
        "question": "What is the purpose of a Database Transaction Log (Write-Ahead Log)?",
        "options": [
          "To record user login attempts",
          "To ensure data can be recovered after a crash by recording changes before they are applied",
          "To provide a list of slow queries for optimization",
          "To store old versions of data for auditing"
        ],
        "correct": 1,
        "explanation": "WAL ensures durability by logging changes to a stable storage before they are committed to the main database.",
        "difficulty": "hard"
      },
      {
        "id": "q-13-10-2",
        "question": "What is 'Optimistic Concurrency Control'?",
        "options": [
          "Locking a row as soon as it is read",
          "Checking if data has been modified by someone else before committing a change",
          "Assuming that no two users will ever access the same data",
          "Allowing all writes to succeed and resolving conflicts later"
        ],
        "correct": 1,
        "explanation": "Optimistic concurrency uses versioning or timestamps to detect conflicts at commit time rather than using heavy locks.",
        "difficulty": "medium"
      },
      {
        "id": "q-13-10-3",
        "question": "What is a 'Deadlock' in a database?",
        "options": [
          "A situation where the database server runs out of disk space",
          "Two or more transactions waiting for each other to release locks, preventing any from proceeding",
          "A query that takes too long to execute and is killed by the system",
          "A corrupted index that prevents data retrieval"
        ],
        "correct": 1,
        "explanation": "A deadlock occurs when circular dependencies between locks prevent progress, usually requiring the database to abort one of the transactions.",
        "difficulty": "medium"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch13-1",
      "question": "Which database type is most appropriate for a system requiring strict ACID compliance for complex financial transactions?",
      "options": ["Document Store", "Key-Value Store", "Relational Database", "Wide-Column Store"],
      "correct": 2,
      "explanation": "Relational databases (RDBMS) are the industry standard for ACID compliance and complex transactions.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch13-2",
      "question": "In CAP Theorem, what is 'Partition Tolerance'?",
      "options": [
        "The ability to handle large amounts of data",
        "The ability of the system to continue operating despite network failures between nodes",
        "The guarantee that all nodes see the same data at the same time",
        "The speed at which data is replicated"
      ],
      "correct": 1,
      "explanation": "Partition tolerance is the ability of a distributed system to survive network splits.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch13-3",
      "question": "What is the primary trade-off when adding an index to a table?",
      "options": [
        "Faster reads vs slower writes",
        "Higher security vs lower performance",
        "Better consistency vs lower availability",
        "More storage vs less memory usage"
      ],
      "correct": 0,
      "explanation": "Indexes speed up data retrieval but require extra work (and time) during data modification (INSERT/UPDATE/DELETE).",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch13-4",
      "question": "Which sharding technique is most likely to result in 'Hotspots' if not managed carefully?",
      "options": ["Hash-based Sharding", "Range-based Sharding", "Round-robin Sharding", "Vertical Sharding"],
      "correct": 1,
      "explanation": "Range-based sharding can lead to uneven distribution if many keys fall into the same range (e.g., all recent dates).",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch13-5",
      "question": "What is 'Eventual Consistency'?",
      "options": [
        "Data is guaranteed to be consistent across all nodes immediately",
        "If no new updates are made, all nodes will eventually converge to the same value",
        "Data is only consistent on the leader node",
        "Consistency is checked only once per day"
      ],
      "correct": 1,
      "explanation": "Eventual consistency is a common model in distributed NoSQL systems where updates propagate over time.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch13-6",
      "question": "What does 'Durability' in ACID ensure?",
      "options": [
        "Transactions are processed quickly",
        "Data is not corrupted by concurrent access",
        "Commits are persistent even in the face of system failure",
        "The database can handle a high number of users"
      ],
      "correct": 2,
      "explanation": "Durability guarantees that once a transaction is confirmed, it is safely stored on non-volatile media.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch13-7",
      "question": "Which of these is a benefit of 'Write-Ahead Logging'?",
      "options": [
        "It eliminates the need for backups",
        "It provides atomicity and durability by ensuring changes are logged before being applied",
        "It makes read queries faster",
        "It automatically optimizes SQL queries"
      ],
      "correct": 1,
      "explanation": "WAL is a fundamental technique for ensuring database reliability and recovery.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch13-8",
      "question": "What is 'Vertical Scaling' (Scaling Up)?",
      "options": [
        "Adding more servers to a cluster",
        "Increasing the resources (CPU, RAM) of a single server",
        "Moving data to a cloud provider",
        "Splitting a database into multiple shards"
      ],
      "correct": 1,
      "explanation": "Vertical scaling means making a single machine more powerful.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch13-9",
      "question": "Which isolation level prevents 'Dirty Reads' but allows 'Non-Repeatable Reads'?",
      "options": ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
      "correct": 1,
      "explanation": "Read Committed ensures a transaction only sees data that has already been committed by others.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch13-10",
      "question": "What is the 'N+1 Query Problem'?",
      "options": [
        "Executing one query that returns N results, then N more queries to fetch related data",
        "A bug that causes a query to run N+1 times in a loop",
        "Running N queries in parallel on 1 server",
        "The overhead of adding 1 more node to a cluster of N nodes"
      ],
      "correct": 0,
      "explanation": "The N+1 problem occurs when an application makes separate database calls for every item in a list, leading to poor performance.",
      "difficulty": "medium"
    }
  ]
};
