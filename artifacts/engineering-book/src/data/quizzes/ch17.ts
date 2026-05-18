import { ChapterQuizData } from "../quizTypes";

export const CH17_QUIZ: ChapterQuizData = {
  chapterId: "ch17",
  sectionQuizzes: {
    "17-1": [
      {
        id: "q17-1-1",
        question: "In the Raft consensus algorithm, what is the primary role of the Leader?",
        options: [
          "To initiate elections when it detects a failure",
          "To manage log replication and client requests",
          "To serve as a standby for the Follower",
          "To handle only read requests from clients"
        ],
        correct: 1,
        explanation: "The Leader in Raft is responsible for managing the replicated log, accepting client requests, and coordinating replication to other nodes.",
        difficulty: "medium"
      },
      {
        id: "q17-1-2",
        question: "What does 'Quorum' typically mean in the context of distributed consensus?",
        options: [
          "A simple majority of nodes needed to reach an agreement",
          "The fastest node in the network",
          "A backup node that takes over during failure",
          "A specific configuration file for Paxos"
        ],
        correct: 0,
        explanation: "A quorum is a majority of nodes (usually n/2 + 1) required to ensure consistency and progress in distributed systems.",
        difficulty: "easy"
      },
      {
        id: "q17-1-3",
        question: "Which phase is NOT part of the classic Paxos algorithm?",
        options: [
          "Prepare",
          "Promise",
          "Accept",
          "Commitment-Phase-3"
        ],
        correct: 3,
        explanation: "Classic Paxos consists of Prepare/Promise and Accept/Accepted phases. Commitment-Phase-3 is not a standard term in classic Paxos.",
        difficulty: "hard"
      }
    ],
    "17-2": [
      {
        id: "q17-2-1",
        question: "What is Eventual Consistency?",
        options: [
          "Data is never guaranteed to be consistent",
          "Data will eventually become consistent across all nodes given no new updates",
          "All nodes see the same data at the exact same time",
          "A consistency model that only works with single-node systems"
        ],
        correct: 1,
        explanation: "Eventual consistency guarantees that if no new updates are made to a data item, eventually all accesses to that item will return the last updated value.",
        difficulty: "easy"
      },
      {
        id: "q17-2-2",
        question: "Which of the following is a common conflict resolution technique in eventually consistent systems?",
        options: [
          "Last Write Wins (LWW)",
          "Immediate locking",
          "Stop-the-world garbage collection",
          "Single-leader replication"
        ],
        correct: 0,
        explanation: "Last Write Wins (LWW) is a common strategy where the update with the latest timestamp is chosen as the winner in case of conflicts.",
        difficulty: "medium"
      },
      {
        id: "q17-2-3",
        question: "What is the 'Read Your Own Writes' consistency model?",
        options: [
          "A user can always read what they just wrote",
          "A user can only read what others have written",
          "The system writes data to a local file before sending it to the network",
          "All writes are immediately consistent globally"
        ],
        correct: 0,
        explanation: "Read Your Own Writes ensures that a process will always see the updates it has made itself, even if other processes haven't seen them yet.",
        difficulty: "medium"
      }
    ],
    "17-3": [
      {
        id: "q17-3-1",
        question: "What is the primary purpose of Vector Clocks in distributed systems?",
        options: [
          "To synchronize system time across all servers",
          "To detect causality and partial ordering of events",
          "To speed up database queries",
          "To encrypt network traffic"
        ],
        correct: 1,
        explanation: "Vector clocks are used to track causality between events in a distributed system, helping to identify concurrent updates.",
        difficulty: "hard"
      },
      {
        id: "q17-3-2",
        question: "If two events have vector clocks [1, 2] and [2, 1], what is their relationship?",
        options: [
          "The first event happened before the second",
          "The second event happened before the first",
          "The events are concurrent",
          "The events are identical"
        ],
        correct: 2,
        explanation: "When neither vector clock is strictly greater than the other in all components, the events are considered concurrent.",
        difficulty: "hard"
      },
      {
        id: "q17-3-3",
        question: "What is a Lamport Clock?",
        options: [
          "A physical clock that measures milliseconds",
          "A logical clock used to determine the order of events",
          "A hardware component for network timing",
          "A type of distributed lock"
        ],
        correct: 1,
        explanation: "A Lamport clock is a simple logical clock used to provide a partial ordering of events in a distributed system.",
        difficulty: "medium"
      }
    ],
    "17-4": [
      {
        id: "q17-4-1",
        question: "What is the main challenge of Distributed Transactions?",
        options: [
          "They are too fast for human monitoring",
          "Ensuring Atomicity across multiple independent nodes",
          "They only work with SQL databases",
          "They require expensive hardware"
        ],
        correct: 1,
        explanation: "The primary challenge is maintaining ACID properties, especially Atomicity, when the transaction spans multiple networked nodes that can fail independently.",
        difficulty: "medium"
      },
      {
        id: "q17-4-2",
        question: "What are the two phases in the Two-Phase Commit (2PC) protocol?",
        options: [
          "Start and Stop",
          "Prepare and Commit/Abort",
          "Read and Write",
          "Lock and Unlock"
        ],
        correct: 1,
        explanation: "2PC consists of a Prepare phase where nodes signal readiness, and a Commit/Abort phase where the coordinator finalizes the outcome.",
        difficulty: "easy"
      },
      {
        id: "q17-4-3",
        question: "What is a significant drawback of the Two-Phase Commit protocol?",
        options: [
          "It is too simple to implement",
          "It is a blocking protocol that can lead to resource hanging",
          "It doesn't work with more than two nodes",
          "It requires constant user intervention"
        ],
        correct: 1,
        explanation: "2PC is blocking; if the coordinator fails after the prepare phase, participants may be left in an uncertain state holding locks.",
        difficulty: "hard"
      }
    ],
    "17-5": [
      {
        id: "q17-5-1",
        question: "What is the Saga Pattern primarily used for?",
        options: [
          "Speeding up microservices communication",
          "Managing long-lived transactions across microservices",
          "Encrypting database connections",
          "Replacing REST with gRPC"
        ],
        correct: 1,
        explanation: "The Saga pattern manages distributed transactions by breaking them into a sequence of local transactions, each with a corresponding compensating transaction.",
        difficulty: "medium"
      },
      {
        id: "q17-5-2",
        question: "In a Saga, what is a 'Compensating Transaction'?",
        options: [
          "A transaction that pays for server costs",
          "An operation that undoes the effects of a previous failed local transaction",
          "A transaction that retries the same operation",
          "A transaction that double-checks the results"
        ],
        correct: 1,
        explanation: "A compensating transaction is designed to semantically undo the work of a previous step if the overall saga fails.",
        difficulty: "medium"
      },
      {
        id: "q17-5-3",
        question: "What are the two common ways to coordinate a Saga?",
        options: [
          "Choreography and Orchestration",
          "Push and Pull",
          "Master and Slave",
          "Synchronous and Asynchronous"
        ],
        correct: 0,
        explanation: "Sagas are typically coordinated either through Choreography (event-driven) or Orchestration (centralized controller).",
        difficulty: "hard"
      }
    ],
    "17-6": [
      {
        id: "q17-6-1",
        question: "What does the CAP theorem state about distributed systems?",
        options: [
          "A system can have Consistency, Availability, and Partition Tolerance all at once",
          "A system can only provide two out of Consistency, Availability, and Partition Tolerance during a network partition",
          "Consistency is always more important than Availability",
          "Partition Tolerance is optional in modern networks"
        ],
        correct: 1,
        explanation: "CAP theorem states that under a network partition, a distributed system must choose between Consistency and Availability.",
        difficulty: "medium"
      },
      {
        id: "q17-6-2",
        question: "Which of the following is an example of a CP system (Consistent and Partition Tolerant)?",
        options: [
          "A single-node MySQL instance",
          "A Raft-based distributed key-value store",
          "A simple DNS server",
          "A CDN cache"
        ],
        correct: 1,
        explanation: "Systems using consensus algorithms like Raft prioritize consistency and partition tolerance, often becoming unavailable if a quorum cannot be reached.",
        difficulty: "medium"
      },
      {
        id: "q17-6-3",
        question: "In CAP, what does 'Availability' mean?",
        options: [
          "The system is always up",
          "Every request receives a (non-error) response, without guarantee that it contains the most recent write",
          "The database is always backed up",
          "The network latency is low"
        ],
        correct: 1,
        explanation: "Availability in CAP means every request gets a response, even if it's potentially stale data.",
        difficulty: "easy"
      }
    ],
    "17-7": [
      {
        id: "q17-7-1",
        question: "What is Gossip Protocol used for in distributed systems?",
        options: [
          "Broadcasting messages to every node immediately",
          "Disseminating information across a cluster using peer-to-peer communication",
          "Monitoring developer chats",
          "Managing user sessions"
        ],
        correct: 1,
        explanation: "Gossip protocols are decentralized communication patterns used for peer-to-peer information sharing, like cluster membership or health checks.",
        difficulty: "medium"
      },
      {
        id: "q17-7-2",
        question: "Which property is a key advantage of Gossip Protocols?",
        options: [
          "Strict consistency",
          "High scalability and fault tolerance",
          "Instantaneous propagation",
          "Deterministic behavior"
        ],
        correct: 1,
        explanation: "Gossip protocols are highly scalable and resilient to individual node failures, making them great for large clusters.",
        difficulty: "medium"
      },
      {
        id: "q17-7-3",
        question: "How does a node typically 'gossip'?",
        options: [
          "It sends an email to the administrator",
          "It periodically picks random neighbors and shares its known state",
          "It waits for a signal from the master node",
          "It writes to a shared global file"
        ],
        correct: 1,
        explanation: "Nodes periodically select a set of random peers to exchange information with, leading to exponential spread of data.",
        difficulty: "easy"
      }
    ],
    "17-8": [
      {
        id: "q17-8-1",
        question: "What is the Byzantine Generals Problem?",
        options: [
          "A problem of managing multiple generals in an army",
          "The difficulty of reaching consensus in a system where nodes may fail or act maliciously",
          "A problem with slow network speeds in Byzantium",
          "A specific error in the Linux kernel"
        ],
        correct: 1,
        explanation: "The Byzantine Generals Problem describes the challenge of reaching consensus when nodes can fail arbitrarily or send conflicting/malicious information.",
        difficulty: "hard"
      },
      {
        id: "q17-8-2",
        question: "What is 'Byzantine Fault Tolerance' (BFT)?",
        options: [
          "Tolerance to network latency",
          "A system's ability to reach consensus even if some nodes are malicious or compromised",
          "A way to fix broken hard drives",
          "A method for compressing distributed logs"
        ],
        correct: 1,
        explanation: "BFT systems are designed to resist malicious nodes that may deviate from the protocol.",
        difficulty: "medium"
      },
      {
        id: "q17-8-3",
        question: "What is the threshold of malicious nodes a standard BFT system can typically handle?",
        options: [
          "Less than 1/2 of nodes",
          "Less than 1/3 of nodes",
          "Exactly 50%",
          "No malicious nodes are allowed"
        ],
        correct: 1,
        explanation: "Many BFT algorithms (like PBFT) require that fewer than 1/3 of the nodes are faulty/malicious to maintain safety and liveness.",
        difficulty: "hard"
      }
    ],
    "17-9": [
      {
        id: "q17-9-1",
        question: "What is Partition Tolerance in distributed systems?",
        options: [
          "The ability to handle database partitions",
          "The system continues to operate despite arbitrary message loss or failure of part of the network",
          "The ability to divide data into smaller chunks",
          "Ensuring all partitions have the same size"
        ],
        correct: 1,
        explanation: "Partition Tolerance means the system remains functional even when network communication between some nodes is interrupted.",
        difficulty: "medium"
      },
      {
        id: "q17-9-2",
        question: "In the PACELC theorem, what does the 'E' stand for?",
        options: [
          "Eventually",
          "Else",
          "Error",
          "Encryption"
        ],
        correct: 1,
        explanation: "PACELC states: if there is a Partition (P), choose between Availability (A) and Consistency (C); Else (E), when the system is running normally, choose between Latency (L) and Consistency (C).",
        difficulty: "hard"
      },
      {
        id: "q17-9-3",
        question: "According to PACELC, what is the trade-off during normal operation (no partition)?",
        options: [
          "Security vs Privacy",
          "Latency vs Consistency",
          "Storage vs Computation",
          "Throughput vs Durability"
        ],
        correct: 1,
        explanation: "When there is no partition, systems must decide whether to prioritize lower latency (L) or stronger consistency (C).",
        difficulty: "hard"
      }
    ],
    "17-10": [
      {
        id: "q17-10-1",
        question: "Which consensus algorithm is specifically designed to be easier to understand than Paxos?",
        options: [
          "Zab",
          "Raft",
          "Gossip",
          "Saga"
        ],
        correct: 1,
        explanation: "Raft was developed with the explicit goal of being more understandable than Paxos while providing equivalent safety.",
        difficulty: "easy"
      },
      {
        id: "q17-10-2",
        question: "What happens in Raft if a Follower doesn't receive a heartbeat within its timeout period?",
        options: [
          "It shuts down",
          "It starts a new election and becomes a Candidate",
          "It contacts the administrator",
          "It tries to become the Follower of a different leader"
        ],
        correct: 1,
        explanation: "If a follower times out, it increments its term and transitions to the Candidate state to start an election.",
        difficulty: "medium"
      },
      {
        id: "q17-10-3",
        question: "What is 'Linearizability'?",
        options: [
          "Writing code in a single line",
          "A strong consistency model where operations appear instantaneous and atomic",
          "The ability to scale linearly",
          "Sorting logs by date"
        ],
        correct: 1,
        explanation: "Linearizability is a strong consistency guarantee where every operation appears to take place at some point between its invocation and its completion, making the system behave like it has only one copy of data.",
        difficulty: "hard"
      }
    ]
  },
  examQuestions: [
    {
      id: "q17-exam-1",
      question: "Which of the following is NOT one of the 2PC phases?",
      options: [
        "Prepare phase",
        "Commit phase",
        "Voting phase",
        "Gossip phase"
      ],
      correct: 3,
      explanation: "2PC consists of Prepare and Commit. Gossip is a communication protocol, not a phase of 2PC.",
      difficulty: "medium"
    },
    {
      id: "q17-exam-2",
      question: "What is a major limitation of Lamport Clocks compared to Vector Clocks?",
      options: [
        "They are harder to implement",
        "They cannot distinguish between concurrent events",
        "They require specialized hardware",
        "They only work in centralized systems"
      ],
      correct: 1,
      explanation: "Lamport clocks provide a total ordering, but you cannot tell if two events were concurrent just by looking at their timestamps. Vector clocks solve this.",
      difficulty: "hard"
    },
    {
      id: "q17-exam-3",
      question: "In Raft, what does a Candidate need to become Leader?",
      options: [
        "Votes from all nodes",
        "Votes from a majority of nodes",
        "The fastest CPU",
        "Permission from the previous leader"
      ],
      correct: 1,
      explanation: "A candidate becomes a leader if it receives votes from a majority of nodes in the cluster.",
      difficulty: "medium"
    },
    {
      id: "q17-exam-4",
      question: "Which consistency model is usually associated with the Saga pattern?",
      options: [
        "Strict Consistency",
        "Linearizability",
        "Eventual Consistency",
        "Read-After-Write Consistency"
      ],
      correct: 2,
      explanation: "Sagas typically provide eventual consistency because each step is committed individually.",
      difficulty: "medium"
    },
    {
      id: "q17-exam-5",
      question: "What is the primary goal of the Paxos algorithm?",
      options: [
        "To maximize network bandwidth",
        "To reach consensus on a single value among a set of unreliable processors",
        "To encrypt data at rest",
        "To route packets efficiently"
      ],
      correct: 1,
      explanation: "Paxos is a foundational consensus algorithm used to agree on a single value in a distributed system.",
      difficulty: "medium"
    },
    {
      id: "q17-exam-6",
      question: "What is the main advantage of Choreography-based Sagas?",
      options: [
        "Easier to debug",
        "No single point of failure (centralized orchestrator)",
        "Clear centralized logic",
        "Guaranteed immediate consistency"
      ],
      correct: 1,
      explanation: "Choreography is decentralized, avoiding the need for a central orchestrator and reducing tight coupling.",
      difficulty: "hard"
    },
    {
      id: "q17-exam-7",
      question: "In CAP theorem, if you choose Availability over Consistency during a partition (AP), what happens?",
      options: [
        "The system stops accepting writes",
        "The system might return stale data",
        "The system crashes",
        "The system ensures all nodes have identical data"
      ],
      correct: 1,
      explanation: "Choosing Availability means the system stays up but may return data that hasn't converged yet (stale data).",
      difficulty: "medium"
    },
    {
      id: "q17-exam-8",
      question: "What is 'Quorum Sensing'?",
      options: [
        "A biological process used in bacteria",
        "A distributed system technique to detect cluster health",
        "Checking if enough nodes are available to perform an operation",
        "The ability to hear nodes through walls"
      ],
      correct: 2,
      explanation: "In distributed systems, it refers to checking if a majority of nodes are responsive to ensure safe operations.",
      difficulty: "easy"
    },
    {
      id: "q17-exam-9",
      question: "What is a 'Conflict-free Replicated Data Type' (CRDT)?",
      options: [
        "A data structure that automatically resolves conflicts without coordination",
        "A database that never allows concurrent writes",
        "A type of encrypted file",
        "A networking protocol for high-speed fiber"
      ],
      correct: 0,
      explanation: "CRDTs are data structures designed to be replicated across multiple nodes where replicas can be updated independently and concurrently without coordination, while ensuring they converge to the same state.",
      difficulty: "hard"
    },
    {
      id: "q17-exam-10",
      question: "In the context of PACELC, what does 'L' stand for?",
      options: [
        "Logging",
        "Latency",
        "Locking",
        "Linearizability"
      ],
      correct: 1,
      explanation: "PACELC trade-offs include Latency vs Consistency during normal operation.",
      difficulty: "medium"
    }
  ]
};
