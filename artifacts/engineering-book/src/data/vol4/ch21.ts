import type { Section } from '../types';

export const CH21_SECTIONS: Section[] = [
  {
    id: "21-1",
    number: "21.1",
    title: "Why Distribution Is Hard: The Fundamental Problems",
    content: `In a single-machine system, the CPU, memory, and disk are connected by high-speed, reliable buses. If the memory fails, the machine crashes. In a **Distributed System**, components are connected by an inherently unreliable network. This shift changes everything.

## The Problem of Partial Failure
The defining characteristic of a distributed system is **Partial Failure**. On a single machine, things usually work or they don't. In a cluster, Server A might be healthy, but Server B might be slow, or the network switch between them might be dropping 5% of packets. Dealing with a system that is "mostly working but partly broken" is the core challenge of distributed engineering.

## The Uncertainty of the Network
When you send a request from Node A to Node B, and you don't get a response, you have three possibilities:
1. The request never reached Node B (Network issue).
2. Node B received it, processed it, and crashed before sending a reply (Node issue).
3. Node B received it, processed it, and sent a reply, but the reply was lost (Network issue).

You cannot distinguish between these three cases from the perspective of Node A. This is known as the **Two Generals' Problem**, a thought experiment proving that it is impossible for two parties to reach a perfect agreement over an unreliable link.

## The Clock Problem
In a single machine, you have a single source of truth for time. In a distributed system, every machine has its own clock, and they **always drift**. You can never assume that "12:00:00" on Node A is the same as "12:00:00" on Node B. This makes ordering events by "timestamp" extremely dangerous.`
  },
  {
    id: "21-2",
    number: "21.2",
    title: "The Fallacies of Distributed Computing",
    content: `L. Peter Deutsch and others at Sun Microsystems famously identified eight fallacies that programmers new to distributed systems often assume are true. Building a system based on these fallacies leads to fragile, bug-ridden architectures.

## 1. The Network is Reliable
It isn't. Cables get cut, routers overheat, and congestion happens. Your code must handle timeouts and retries at every layer.

## 2. Latency is Zero
Local function calls take nanoseconds. Network calls take milliseconds (1,000,000x slower). You cannot treat a remote service call like a local object method.

## 3. Bandwidth is Infinite
While we have 10Gbps+ links today, moving massive amounts of data (like a database migration) still takes time and creates congestion for other services.

## 4. The Network is Secure
Assume every packet can be intercepted or forged. Encrypt everything in transit (mTLS).

## 5. Topology Doesn't Change
Nodes come and go. IP addresses change. Use **Service Discovery** (Consul, Kubernetes DNS) instead of hardcoding IPs.

## 6. There is One Administrator
In large systems, different teams manage different services. You cannot assume a uniform configuration or deployment schedule across the system.

## 7. Transport Cost is Zero
Moving data between data centers (egress) costs money. Moving data between AWS regions is expensive. Architecture decisions should minimize unnecessary data movement.

## 8. The Network is Homogeneous
Your system likely runs on different hardware, different OS versions, and different network stacks. Avoid assumptions about specific platform behaviors.`
  },
  {
    id: "21-3",
    number: "21.3",
    title: "The CAP Theorem: The Complete Treatment",
    content: `The CAP Theorem, proposed by Eric Brewer, is the most misunderstood principle in distributed systems. It states that in a distributed data store, you can only provide two of the following three guarantees:

## 1. Consistency (C)
Every read receives the most recent write or an error. This is **Linearizability**.

## 2. Availability (A)
Every request receives a (non-error) response, without the guarantee that it contains the most recent write.

## 3. Partition Tolerance (P)
The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.

## The Reality: You MUST choose P
In a distributed system, network partitions (P) are a fact of life. You cannot "choose" CA. If you choose CA, your system will simply crash or hang when a network partition occurs. Therefore, the choice is always between **CP** and **AP**.

- **CP (Consistency + Partition Tolerance)**: If a partition happens, the system shuts down or returns errors to avoid serving inconsistent data. (e.g., HBase, MongoDB, Consul).
- **AP (Availability + Partition Tolerance)**: If a partition happens, nodes continue to serve data, even if it's "stale." They will resync when the partition heals. (e.g., Cassandra, DynamoDB, CouchDB).

## The Nuance
CAP is a binary model that only applies during a network partition. In normal operation, you can have both consistency and availability. The CAP theorem simply defines your "Failure Mode."`
  },
  {
    id: "21-4",
    number: "21.4",
    title: "PACELC: Beyond CAP",
    content: `The CAP theorem only describes what happens when the system is failing (partitioned). But what about when it's working correctly? The **PACELC** theorem extends CAP to cover the trade-off between **Latency** and **Consistency** during normal operation.

## The acronym breakdown:
If there is a **P**artition, how does the system trade off **A**vailability vs **C**onsistency?
**E**lse (no partition), how does the system trade off **L**atency vs **C**onsistency?

## The Trade-offs
- **PA/EL**: When partitioned, choose availability. When healthy, choose low latency. (e.g., DynamoDB, Cassandra, Riak). These systems use eventual consistency.
- **PC/EC**: Always choose consistency, even if it means higher latency or downtime. (e.g., BigTable, HDFS).
- **PA/EC**: When partitioned, choose availability. When healthy, choose consistency. (e.g., MongoDB with \`majority\` read/write concern).

## Why Latency vs. Consistency?
To ensure strong consistency (EC), a primary node must wait for multiple replicas to acknowledge a write before telling the client "Success." This waiting adds **latency**. If you want low latency (EL), you tell the client "Success" immediately and replicate to others in the background, but this risks a client reading stale data from a replica.`
  },
  {
    id: "21-5",
    number: "21.5",
    title: "Consistency Models: Linearizability, Sequential, Causal, Eventual",
    content: `Not all "consistency" is created equal. We use different models to define exactly how and when data becomes visible to different observers.

## 1. Linearizability (Strongest)
The system behaves as if there is only one copy of the data, and all operations are atomic. If Operation A completes before Operation B starts, then Operation B must see the results of A.
- **Human Analogy**: A physical notebook where only one person can write at a time.

## 2. Sequential Consistency
Operations follow a specific order that is consistent across all nodes, but that order might not align with real-world time. All clients see the same sequence of events.
- **Human Analogy**: A group chat where everyone sees the messages in the same order, even if the timestamps are slightly off.

## 3. Causal Consistency
Only operations that are "causally related" must be seen in the same order. If User A replies to User B, everyone must see User B's message before User A's reply. If two people post unrelated messages, different users might see them in different orders.
- **Status**: This is the strongest model that can still be highly available during a partition.

## 4. Eventual Consistency (Weakest)
If no new updates are made to a key, eventually all reads will return the last updated value.
- **Human Analogy**: DNS or Git. It might take a while for your changes to propagate, but they will eventually get everywhere.

## Why it matters
Choosing a model is about performance. Linearizability requires heavy coordination (locking/consensus), while Eventual Consistency allows for maximum throughput and 100% availability.`
  },
  {
    id: "21-6",
    number: "21.6",
    title: "Consensus Algorithms: Paxos — Complete Derivation",
    content: `Consensus is the process of getting a group of nodes to agree on a single value, even if some nodes fail. **Paxos** is the foundational algorithm for this, proposed by Leslie Lamport.

## The Roles
1. **Proposers**: Suggest a value.
2. **Acceptors**: Vote on the value.
3. **Learners**: Store the final agreed-upon value.

## The Two-Phase Protocol
Paxos operates in rounds. Each round has two phases:

### Phase 1: Prepare
1. A Proposer selects a unique, increasing **Proposal Number** (n) and sends a \`Prepare(n)\` message to a majority of Acceptors.
2. If an Acceptor receives \`Prepare(n)\` and n is higher than any number it has seen, it promises never to accept a proposal numbered less than n. It also returns the highest-numbered proposal it has already accepted (if any).

### Phase 2: Accept
1. If the Proposer receives a majority of "Promises," it sends an \`Accept(n, value)\` message to those Acceptors. The value is either the one it received from an Acceptor in Phase 1 (if any) or its own value.
2. If an Acceptor receives \`Accept(n, value)\` and it hasn't promised anyone else with a higher number, it accepts the value.

## Why it works
Because a Proposer must get a **majority** of Acceptors to promise, and any subsequent Proposer must also get a majority, their sets of Acceptors will always overlap by at least one node. That overlapping node acts as the "memory" of the system, ensuring that once a value is chosen, it can never be changed.

## The Problem
"Basic Paxos" only agrees on one value. To manage a database, we need to agree on a sequence of values (a log). This leads to **Multi-Paxos**, which is significantly more complex and is what systems like Google Spanner actually use.`
  },
  {
    id: "21-7",
    number: "21.7",
    title: "Raft: Understandable Consensus",
    content: `Paxos is notoriously difficult to understand and implement correctly. **Raft** was designed in 2013 by Diego Ongaro and John Ousterhout to provide the same guarantees as Paxos but with a much cleaner mental model.

## The Three States
A node in Raft is always in one of three states: **Follower**, **Candidate**, or **Leader**.

## Leader Election
1. Nodes start as Followers.
2. If they don't hear from a Leader (via a "heartbeat"), they become a Candidate and start an election.
3. They vote for themselves and ask others for votes.
4. If they get a majority, they become the Leader.
5. All updates must go through the Leader.

## Log Replication
1. The Leader receives a command from a client.
2. The Leader appends the command to its local log.
3. The Leader sends an \`AppendEntries\` RPC to all Followers.
4. Once a majority of Followers acknowledge the entry, the Leader **Commits** it and tells the Followers to do the same.

## Safety via the "Election Restriction"
A Candidate cannot become leader unless its log is "at least as up-to-date" as a majority of the cluster. This ensures that the leader always contains all committed entries from previous terms.

## Raft vs Paxos
| Feature | Raft | Paxos |
|---------|------|-------|
| **Structure** | Strong Leader | Any node can propose |
| **Log Management** | Strict, sequential | Can have "holes" in the log |
| **Complexity** | Designed to be understood | Mathematical proof focused |

Raft is the heart of **etcd** (Kubernetes), **Consul**, and **CockroachDB**.`
  },
  {
    id: "21-8",
    number: "21.8",
    title: "Leader Election and the Split-Brain Problem",
    content: `In a leader-based system, there must be exactly one leader. If two nodes think they are both the leader, they will both accept writes, leading to data corruption. This is the **Split-Brain Problem**.

## How it happens
Imagine a 5-node cluster. A network partition splits it into two groups: {A, B} and {C, D, E}.
- If the original leader was A, the {C, D, E} group will notice the leader is gone and elect a new leader (say, C).
- If the partition is "asymmetric" (A can't talk to C, but A can still talk to clients), A might still think it's the leader.

## The Solution: Quorums
To prevent split-brain, a leader must only be allowed to function if it can talk to a **Quorum** (a majority) of nodes.
- In the example above, Node A would see it can only talk to 1 other node (total 2/5). Since 2 is not a majority, it must step down and stop accepting writes.
- Group {C, D, E} has 3/5, which is a majority, so it can safely elect a new leader.

## Fencing Tokens
Even with quorums, a "zombie" leader might still try to write to storage. We use **Fencing Tokens** (like a monotonically increasing "Epoch" number).
1. When a new leader is elected, it gets an Epoch of 10.
2. Every write to the database includes \`epoch=10\`.
3. If the old leader tries to write with \`epoch=9\`, the storage layer rejects it because it has already seen a higher epoch.

## Key Insight
Consensus isn't just about picking a leader; it's about ensuring the *old* leader knows it's no longer in charge.`
  },
  {
    id: "21-9",
    number: "21.9",
    title: "Distributed Transactions: 2PC, 3PC, and Their Problems",
    content: `Atomic transactions across multiple different databases or services are incredibly hard. The classic approach is the **Two-Phase Commit (2PC)**.

## Two-Phase Commit (2PC)
1. **Prepare Phase**: A Coordinator asks all participating nodes, "Can you commit this?" The nodes perform all checks and "lock" the necessary resources. They respond with "Yes" or "No."
2. **Commit Phase**: If *everyone* said Yes, the Coordinator sends a "Commit" message. If *anyone* said No (or timed out), the Coordinator sends a "Rollback" message.

## The Fatal Flaw: Blocking
2PC is a **blocking protocol**. If the Coordinator crashes after sending the "Prepare" but before sending the "Commit," all participants are left in a state of limbo. They have locks held and don't know whether to commit or abort. They must wait for the Coordinator to recover.

## Three-Phase Commit (3PC)
Adds a "Pre-Commit" phase to ensure that no node commits unless everyone has already agreed to commit and has been notified.
- **Pros**: Non-blocking in many failure scenarios.
- **Cons**: Still fails during network partitions, which is why it's rarely used in practice compared to Paxos/Raft-based solutions.

## The Modern View
Distributed transactions are often avoided in favor of **Eventual Consistency** or the **Saga Pattern** because 2PC significantly reduces system availability and increases latency.`
  },
  {
    id: "21-10",
    number: "21.10",
    title: "The Saga Pattern: Long-Running Transactions",
    content: `When you can't use a distributed lock (like in a microservices architecture), you use a **Saga**. A Saga is a sequence of local transactions where each transaction updates data within a single service.

## How it works
If a step in the sequence fails, the Saga must execute **Compensating Transactions** to undo the changes made by the previous steps.

## Example: Booking a Trip
1. **Order Service**: Create a pending order.
2. **Payment Service**: Charge the credit card.
3. **Flight Service**: Book the flight.
4. **Hotel Service**: Book the hotel.

**If the Hotel Service fails (e.g., no rooms left):**
1. **Hotel Service**: Returns "Failure."
2. **Flight Service**: Execute "Cancel Flight" (Compensating Transaction).
3. **Payment Service**: Execute "Refund Payment" (Compensating Transaction).
4. **Order Service**: Mark order as "Failed."

## Two Implementation Styles
1. **Choreography**: Each service produces an event that the next service listens to. No central coordinator. Simple but hard to debug as the number of steps grows.
2. **Orchestration**: A central "Saga Execution Component" tells each service what to do and manages the failure logic. Easier to monitor and visualize.

## Critical Limitation
Sagas lack **Isolation**. One Saga might see the "intermediate state" of another Saga (e.g., seeing a flight as booked before the hotel is confirmed). This must be handled at the application layer using techniques like "Semantic Locks" or "Versioning."`
  },
  {
    id: "21-11",
    number: "21.11",
    title: "Logical Clocks: Lamport Clocks and Vector Clocks",
    content: `Since we can't trust physical clocks in a distributed system, we use **Logical Clocks** to capture the **Causality** (Happens-Before relationship) between events.

## Lamport Clocks
Each node maintains a simple counter.
1. Increment the counter before every local event.
2. When sending a message, include the counter.
3. When receiving a message, set your counter to \`max(local_counter, message_counter) + 1\`.
- **Limitation**: If \`Clock(A) < Clock(B)\`, we don't know if A happened before B, or if they were concurrent.

## Vector Clocks
Each node maintains an **array** (vector) of counters, one for every node in the system.
- \`[NodeA: 5, NodeB: 2, NodeC: 0]\`
1. Increment your own entry in the vector for every event.
2. Send the whole vector with every message.
3. On receipt, merge the vectors by taking the maximum of each element.

## Detecting Conflicts
Vector clocks allow us to distinguish between "Causal" and "Concurrent" events:
- **Causal**: If every element in Vector A is less than or equal to the corresponding element in Vector B, then A happened before B.
- **Concurrent (Conflict)**: If some elements in A are greater than B, and some are less, the events happened simultaneously.

## Real World: DynamoDB
Amazon's Dynamo used vector clocks to handle conflicting updates to the same key. When a conflict was detected, it was sent to the client to "Merge" (e.g., merging two versions of a shopping cart).`
  },
  {
    id: "21-12",
    number: "21.12",
    title: "CRDTs: Conflict-Free Replicated Data Types",
    content: `What if we could design data structures that **never** have conflicts? **CRDTs** are data types that can be updated independently on multiple nodes and always merge into a consistent state without any central coordination.

## The Mathematical Requirement
The merge function must be:
1. **Commutative**: Order doesn't matter (\`A + B = B + A\`).
2. **Associative**: Grouping doesn't matter (\`(A + B) + C = A + (B + C)\`).
3. **Idempotent**: Merging the same state twice has no effect (\`A + A = A\`).

## Common CRDTs
- **G-Counter (Grow-only Counter)**: Each node keeps its own count. To merge, take the maximum count for each node.
- **PN-Counter (Positive-Negative Counter)**: Uses two G-Counters, one for increments and one for decrements.
- **LWW-Element-Set (Last-Write-Wins Set)**: Each element has a timestamp. To merge, keep the version with the highest timestamp.
- **RGA (Replicated Growable Array)**: Used for collaborative text editing (like Google Docs).

## The Trade-off
CRDTs often require more storage than traditional types because they must keep "metadata" (like tombstones for deleted items) to ensure correct merging. However, they are the gold standard for **Local-First** apps and highly available distributed databases (like Redis Enterprise or Riak).`
  },
  {
    id: "21-13",
    number: "21.13",
    title: "Gossip Protocols: Epidemic Communication",
    content: `How do thousands of nodes in a cluster share information without a central "Master" node becoming a bottleneck? They use **Gossip Protocols**, modeled after how viruses spread through a population.

## The Mechanism
1. Every T seconds, a node picks 3 random nodes from its list of known peers.
2. It sends them its latest information (e.g., "I think Node B is dead" or "The value of X is 10").
3. The receiving nodes update their state and, in their next cycle, pass the info to 3 more random nodes.

## Properties
- **Scalability**: The time it takes for information to reach every node (convergence) is **O(log N)**. In a 10,000-node cluster, a message can propagate in just 14-15 rounds.
- **Fault Tolerance**: There is no single point of failure. If 50% of the nodes crash, the gossip still finds its way through the remaining nodes.
- **Efficiency**: Each node only sends a few small packets per second.

## Use Cases
1. **Failure Detection**: Cassandra and Consul use gossip to track which nodes are healthy.
2. **Cluster Membership**: Adding or removing nodes from a cluster.
3. **Metadata Propagation**: Spreading information about which data partitions are on which nodes.

## Anti-Entropy
A specific type of gossip where nodes compare their entire datasets (often using **Merkle Trees** to find differences quickly) and sync up. This is used in Cassandra to repair data on nodes that were offline.`
  },
  {
    id: "21-14",
    number: "21.14",
    title: "Consistent Hashing: Dynamic Cluster Membership",
    content: `In a distributed system, you need to map keys to nodes. A simple \`hash(key) % N\` (where N is the number of nodes) is a disaster because if you add or remove a single node, **every single key** maps to a different node, causing a massive data migration (cache miss storm).

## The Consistent Hashing Ring
1. Imagine the hash space as a circle (0 to 2^32-1).
2. Hash both the **Keys** and the **Nodes** onto this circle.
3. A key belongs to the first node encountered when moving clockwise from the key's position.

## Why it works
- **Adding a node**: Only the keys that were previously mapped to the next node on the ring might move to the new node. On average, only \`1/N\` of the keys are redistributed.
- **Removing a node**: Only the keys from the removed node move to its successor.

## Virtual Nodes (VNodes)
To prevent "Hotspots" (where one node gets more keys than others due to random distribution), we use **Virtual Nodes**. Each physical server is hashed multiple times onto the ring (e.g., 200 times). This ensures a much more even distribution of data and makes it easier to balance the load if one physical server is more powerful than others.

## Implementation
Consistent hashing is the foundation of **Amazon Dynamo**, **Cassandra**, and most modern **Load Balancers** (like Maglev).`
  },
  {
    id: "21-15",
    number: "21.15",
    title: "Replication Strategies: Single-Leader, Multi-Leader, Leaderless",
    content: `Replication is how we ensure that if a node dies, the data is still safe. There are three primary ways to organize this.

## 1. Single-Leader (Primary-Replica)
All writes go to one Leader. The Leader sends a stream of changes to Replicas.
- **Pros**: Easy to implement, no write conflicts.
- **Cons**: Leader is a bottleneck; if the Leader is in the US and the user is in Asia, writes will be slow.

## 2. Multi-Leader (Active-Active)
Multiple nodes act as Leaders and can accept writes. They sync with each other.
- **Use Case**: Multi-datacenter setups. You can write to the "Local" datacenter for low latency.
- **Challenge**: Write Conflicts. If two people edit the same row in two different datacenters, you need a way to resolve it (e.g., Last-Write-Wins or CRDTs).

## 3. Leaderless (Dynamo-style)
Any node can accept a write. The client (or a coordinator) sends the write to multiple nodes.
- **Quorums**: You don't need *every* node to agree. You just need a "Quorum" (e.g., writing to 2 out of 3 nodes).
- **Pros**: Extremely high availability; can survive multiple node failures without an "election" process.
- **Cons**: Clients must handle stale reads and conflict resolution.

## Synchronous vs. Asynchronous Replication
- **Synchronous**: Leader waits for replicas to acknowledge before confirming to the client. (Safety+, Latency-).
- **Asynchronous**: Leader confirms immediately and sends to replicas in the background. (Latency+, Safety-). Most real-world systems use **Semi-synchronous** replication (wait for 1 out of N replicas).`
  },
  {
    id: "21-16",
    number: "21.16",
    title: "Quorum Systems: Balancing Availability and Consistency",
    content: `In leaderless systems, we use the variables **N, W, and R** to tune the balance between speed and correctness.

- **N**: The number of replicas (e.g., 3).
- **W**: The number of nodes that must acknowledge a **Write**.
- **R**: The number of nodes that must respond to a **Read**.

## The Quorum Rule
For **Strong Consistency**, you must ensure that the set of nodes that wrote the data and the set of nodes that read the data **overlap**. Mathematically:
**W + R > N**

### Example: N=3, W=2, R=2
- 2 + 2 > 3 (True). This is a "Quorum." You are guaranteed to see the latest write because at least one node in your read set must have been in the write set.

### Example: N=3, W=1, R=1
- 1 + 1 < 3 (False). This is a "Sloppy Quorum." You get extremely low latency, but you might read stale data.

## Common Configurations
| Strategy | Config | Result |
|----------|--------|--------|
| **Write-heavy** | W=1, R=N | Fast writes, slow reads, eventual consistency |
| **Read-heavy** | W=N, R=1 | Slow writes, fast reads, strong consistency |
| **Balanced** | W=N/2+1, R=N/2+1 | The standard "Quorum" |

## Hint
Even with \`W + R > N\`, you only get strong consistency if you use **Read Repair** (updating stale nodes during a read) or **Anti-Entropy** (background syncing).`
  },
  {
    id: "21-17",
    number: "21.17",
    title: "Geo-Distribution: Active-Active and Active-Passive",
    content: `When your users are global, your data must be too. Geo-distribution involves placing data in multiple geographic regions (e.g., US-East, EU-West, AP-South).

## 1. Active-Passive (Disaster Recovery)
One region is "Live," and another is a "Warm Standby." Data is replicated asynchronously to the standby.
- **Failover**: If the primary region goes dark, you point your DNS to the standby.
- **Challenge**: **RPO (Recovery Point Objective)**. Because replication is asynchronous, you might lose the last few seconds of data during the failover.

## 2. Active-Active (Read-Local)
Users in Europe read from the EU datacenter, and users in the US read from the US datacenter. Writes usually still go to a single primary "Global" master or are handled via Multi-Leader replication.
- **Challenge**: The **Speed of Light**. It takes ~150ms for a packet to go from London to Sydney. Global consistency at this distance is physically impossible without high latency.

## 3. Global Consistency (Google Spanner)
Spanner uses atomic clocks (TrueTime) to provide global linearizability. It essentially uses Paxos across datacenters. This is the "Holy Grail" of geo-distribution, but it requires specialized hardware and careful engineering to keep latency manageable.

## Practical Advice
Most companies should use **Active-Passive** for safety or **Edge Caching** (CDN) for performance. Only move to a true Active-Active multi-region database (like Aurora Global or CockroachDB) if your scale and availability requirements absolutely demand it.`
  },
  {
    id: "21-18",
    number: "21.18",
    title: "Case Study: DynamoDB's Architecture — Leaderless Replication",
    content: `DynamoDB is the implementation of the concepts in the 2007 "Dynamo" paper. It is designed for "Infinite Scale" and "Always-on Writes."

## Key Architectural Pillars
1. **Consistent Hashing**: Data is partitioned across a massive fleet of storage nodes.
2. **Leaderless Replication**: Every write is sent to N nodes (usually 3). It uses the **W + R > N** rule.
3. **Sloppy Quorums and Hinted Handoff**: If the intended node for a key is down, DynamoDB writes it to a temporary "Hint" node. When the original node comes back, the hint node sends the data back. This ensures writes almost never fail.
4. **Vector Clocks**: Used to track versioning and detect conflicts between concurrent writes in different regions.
5. **Merkle Trees**: Used in the background for "Anti-entropy" to find and fix inconsistencies between replicas.

## The Evolution
The original Dynamo (internal to Amazon) was a Key-Value store. **DynamoDB** (the AWS service) evolved this by adding:
- B-Tree based storage for secondary indexes.
- Log-structured storage for the main data.
- **Transactions**: Modern DynamoDB supports ACID transactions using a two-phase protocol behind the scenes, effectively offering a "Best of both worlds" approach.

## Why it's used
It is the gold standard for "Serverless" databases. It scales from 1 request per month to 100 million requests per second without the user ever managing a server or an election.`
  },
  {
    id: "21-19",
    number: "21.19",
    title: "Case Study: Google Spanner — Global Consistency",
    content: `Google Spanner is the world's first globally distributed, linearly consistent database. It defies the common interpretation of the CAP theorem.

## The Secret: TrueTime
Spanner's breakthrough is **TrueTime**, an API that uses **Atomic Clocks** and **GPS receivers** in every Google datacenter.
- TrueTime doesn't give you a single time; it gives you a **Time Interval** \`[earliest, latest]\` that is guaranteed to contain the absolute global time.
- The uncertainty (\`latest - earliest\`) is usually very small (under 7ms).

## External Consistency
When a transaction commits, Spanner waits until it is certain that the "earliest" possible time of the *next* transaction is greater than the "latest" possible time of the *current* transaction. This is called **Commit Wait**.
By waiting out the clock uncertainty, Spanner ensures that timestamps reflect the true causal order of events globally.

## Architecture
- **Paxos Groups**: Data is split into "Tablets," and each tablet is managed by a Paxos group for replication.
- **Directory-based Sharding**: Spanner can move data between machines and regions dynamically to balance load or reduce latency.

## Result
Developers get a global SQL database with strong consistency. You can write a row in Tokyo and read it in New York, and you are guaranteed to see the latest data. The cost? Slightly higher write latency due to the Paxos round-trips and Commit Wait.`
  },
  {
    id: "21-20",
    number: "21.20",
    title: "Case Study: The 2013 GitHub Outage — Split Brain in Production",
    content: `In 2013, GitHub suffered a major outage that serves as a textbook example of the dangers of mismanaged leader election and "Split Brain."

## The Setup
GitHub used a high-availability setup with a primary MySQL database and a standby replica. They used a tool to monitor the primary and automatically "failover" to the replica if the primary went down.

## The Trigger
A brief network glitch caused the monitoring tool to lose contact with the primary.

## The Failure
1. The tool assumed the primary was dead and promoted the standby to be the "New Primary."
2. However, the old primary wasn't dead; it was just unreachable from the monitoring tool. It was still reachable from some of the application servers.
3. For several minutes, GitHub had two primaries. Some writes went to the old one, some to the new one.
4. When the network healed, the two databases had **Diverged**. They had different data for the same IDs.

## The Recovery
GitHub had to manually reconcile the data, which took hours of downtime and resulted in some lost data.

## Lessons Learned
1. **The STONITH Principle**: "Shoot The Other Node In The Head." Before promoting a standby, you must *guarantee* the old primary is dead (e.g., by cutting its power or revoking its network access).
2. **Quorums are Required**: Never let a single monitoring node decide on a failover. Use a consensus-based approach (like Raft/etcd) where a majority must agree before a leader change occurs.`
  },
  {
    id: "21-21",
    number: "21.21",
    title: "Exercises",
    content: `Validate your understanding of distributed systems theory and practice.

## Questions
1. **CAP Theorem**: If a system is described as "AP," what happens when a network partition occurs and a client tries to write data?
2. **Consensus**: In a Raft cluster of 5 nodes, how many nodes can fail while still allowing the system to process writes?
3. **Clocks**: Why are Vector Clocks superior to Lamport Clocks for conflict detection?
4. **Consistent Hashing**: If you have 4 physical servers and you add a 5th, what percentage of keys (roughly) will need to be moved?
5. **Transactions**: What is the primary reason why the Two-Phase Commit (2PC) is considered "Unavailability-prone"?
6. **Quorums**: You have a 3-node cluster (N=3). If you set W=1 and R=3, do you have strong consistency? (W + R > N).
7. **Sagas**: How does a Saga maintain the "Atomicity" of ACID without using a global lock?
8. **Replication**: What is the difference between "Asynchronous" and "Semi-synchronous" replication?

## Answers
1. **AP System**: The system will accept the write on whatever node the client can reach. This data will be "eventually" synced to the other side of the partition once the network heals.
2. **Raft Failure**: A majority (3/5) is needed. Therefore, the system can tolerate **2** node failures.
3. **Vector Clocks**: Lamport clocks can only tell you if events *might* be causal. Vector clocks can explicitly tell you if two events are **concurrent** (happened without knowledge of each other).
4. **Consistent Hashing**: On average, **20%** (1/N, where N is the new number of nodes).
5. **2PC**: It is a **blocking protocol**. If the coordinator crashes during the second phase, all participant nodes must hold their locks indefinitely until the coordinator recovers.
6. **Quorum**: Yes, 1 + 3 > 3. Since every write only goes to 1 node, but every read checks all 3 nodes, you are guaranteed to find the node that has the latest write.
7. **Sagas**: It doesn't provide technical atomicity; it provides **Semantic Atomicity** through compensating transactions (undoing previous steps if a later one fails).
8. **Replication**: Asynchronous sends data in the background and doesn't wait. Semi-synchronous waits for **at least one** replica to acknowledge before confirming the write to the client.`
  }
];
