import type { Section } from '../types';

export const CH20_SECTIONS: Section[] = [
  {
    id: "20-1",
    number: "20.1",
    title: "The Database as an Engineering System",
    content: `A database is not just a place where data lives; it is a complex engineering system designed to manage the trade-offs between **durability**, **concurrency**, and **performance**. To an application developer, a database might look like a simple API, but to an engineer, it is a sophisticated stack of components: the storage engine, the query optimizer, the transaction manager, and the buffer pool.

## The Core Responsibility
The primary job of a database is to provide an abstraction over physical storage (disk or SSD) that ensures data integrity even in the face of hardware failure or simultaneous access by thousands of users. This is achieved through the **Storage Engine**, which handles how data is represented on disk and in memory.

## The Performance Gap
The defining challenge of database engineering is the **I/O Gap**. As we saw in Chapter 19, reading from RAM takes ~100ns, while reading from an SSD takes ~1,000,000ns (1ms). A database's efficiency is largely determined by how well it avoids "hitting the disk." This is why **Buffer Pools** (caching disk pages in RAM) and **Indexes** (minimizing the amount of data read) are central to database design.

## Understanding the Stack
1. **Transport Layer**: Handles client connections (TCP/IP, Unix Sockets).
2. **Query Processor**: Parses SQL, checks permissions, and creates an execution plan.
3. **Execution Engine**: Executes the plan by calling the storage engine.
4. **Storage Engine**: Manages files, transactions, and the buffer cache (e.g., InnoDB for MySQL, WiredTiger for MongoDB).`
  },
  {
    id: "20-2",
    number: "20.2",
    title: "Relational Databases: The ACID Guarantee",
    content: `Relational databases (RDBMS) have dominated the industry for decades because they provide a rigorous mathematical model (Relational Algebra) and a set of safety guarantees known as **ACID**.

## Atomicity (All or Nothing)
A transaction is a single unit of work. If it contains five SQL statements and the fourth one fails, the entire transaction is rolled back. The database returns to the state it was in before the transaction started. This prevents "partial updates" which lead to corrupted data.

## Consistency (State Validity)
Consistency ensures that a transaction takes the database from one valid state to another, maintaining all **integrity constraints** (e.g., unique keys, foreign keys, check constraints). If a transaction would violate a rule (like moving more money than a user has), it must be rejected.

## Isolation (Concurrency Control)
Isolation ensures that concurrently executing transactions do not interfere with each other. The highest level of isolation is **Serializability**, where the result of running transactions in parallel is the same as if they were run one after another.

## Durability (Persistence)
Once a transaction is committed, it remains committed even in the case of a system failure (e.g., power loss). This is usually achieved by writing the changes to a **Write-Ahead Log (WAL)** before updating the actual data files.

## The ACID Trade-off
ACID is expensive. Ensuring these properties requires locking, logging, and synchronous disk writes. In high-scale systems, engineers sometimes relax ACID (specifically Consistency and Isolation) to gain performance, leading to the "NoSQL" movement.`
  },
  {
    id: "20-3",
    number: "20.3",
    title: "Transactions: Isolation Levels — Complete Treatment",
    content: `Isolation is the most complex part of ACID. Perfect isolation (Serializability) is slow because it requires heavy locking. Therefore, the SQL standard defines four isolation levels that allow engineers to trade safety for speed.

## 1. Read Uncommitted
The lowest level. A transaction can see the results of another transaction that hasn't committed yet. This is extremely fast but dangerous because you might read data that is later "rolled back."

## 2. Read Committed
A transaction only sees data that has been committed. This is the **default for PostgreSQL and SQL Server**. It prevents "Dirty Reads" but allows "Non-Repeatable Reads."

## 3. Repeatable Read
Ensures that if you read a row twice in the same transaction, you get the same result. This is the **default for MySQL (InnoDB)**. It uses **Snapshot Isolation** to ensure the transaction sees a consistent "point-in-time" view of the data.

## 4. Serializable
The gold standard. Transactions are executed in a way that is equivalent to some serial order. In modern databases like Postgres, this is often implemented using **Serializable Snapshot Isolation (SSI)**, which tracks read/write dependencies to detect conflicts without blocking every operation.

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|-----------------|------------|---------------------|--------------|
| Read Uncommitted| Possible   | Possible            | Possible     |
| Read Committed  | Impossible | Possible            | Possible     |
| Repeatable Read | Impossible | Impossible          | Possible*    |
| Serializable    | Impossible | Impossible          | Impossible   |
*\*Note: MySQL's Repeatable Read also prevents most Phantoms.*`
  },
  {
    id: "20-4",
    number: "20.4",
    title: "Read Phenomena: Dirty Reads, Non-Repeatable Reads, Phantom Reads",
    content: `To understand isolation levels, you must understand the specific anomalies they are designed to prevent.

## Dirty Reads
Transaction A updates a row but hasn't committed. Transaction B reads that updated row. If Transaction A then rolls back, Transaction B has read data that "never existed."
- **Example**: Checking a bank balance that was temporarily increased by a failed transfer.

## Non-Repeatable Reads (Read Skew)
Transaction A reads a row. Transaction B updates that same row and commits. Transaction A reads the row again and sees a different value.
- **Example**: You read the stock of an item (1 left), then your transaction does some other work. Meanwhile, someone else buys it. You read the stock again, and it's 0.

## Phantom Reads
Transaction A reads a *set* of rows based on a criteria (e.g., \`WHERE price < 10\`). Transaction B inserts a new row that matches that criteria and commits. Transaction A reads again and sees a "phantom" row that wasn't there before.
- **Example**: Generating a report of all "Active" users. While the report is running, a new user signs up. The final count is different from the count of the rows you actually processed.

## Why we care
In a high-traffic e-commerce system, a Non-Repeatable Read could lead to an overselling event. In a financial system, a Dirty Read could lead to "phantom money" being moved. Choosing the right level is about knowing which anomalies your application logic can tolerate.`
  },
  {
    id: "20-5",
    number: "20.5",
    title: "Locking: Shared, Exclusive, Intent Locks",
    content: `Locking is the mechanism databases use to implement isolation. Without locks, concurrent writes would lead to data corruption.

## Shared (S) Locks
Also called **Read Locks**. Multiple transactions can hold a shared lock on the same resource (row or table) simultaneously. This means multiple people can read the data, but no one can modify it while the locks are held.

## Exclusive (X) Locks
Also called **Write Locks**. Only one transaction can hold an exclusive lock. No other transaction can hold any lock (S or X) on that resource. This ensures that only one person can modify the data at a time.

## Intent Locks (IS, IX)
These are used in hierarchical locking (e.g., locking a table vs locking a row). An **Intent Exclusive (IX)** lock on a table indicates that a transaction intends to set an exclusive lock on some row in that table. This prevents another transaction from locking the *entire table* for a schema change while someone is updating a row.

## Deadlocks
A deadlock occurs when Transaction A holds a lock on Row 1 and waits for Row 2, while Transaction B holds a lock on Row 2 and waits for Row 1.
- **Detection**: Modern databases have a "Deadlock Detector" that runs periodically, identifies the cycle, and kills (rolls back) one of the transactions.
- **Prevention**: Always update rows in the same order (e.g., sorted by ID) to ensure that two transactions don't "cross paths."`
  },
  {
    id: "20-6",
    number: "20.6",
    title: "MVCC: Multi-Version Concurrency Control",
    content: `If we used strict locking (S/X) for everything, "readers would block writers" and "writers would block readers," making the database incredibly slow. Modern databases (Postgres, MySQL, Oracle) use **MVCC** to allow readers and writers to operate simultaneously.

## The Core Concept
Instead of overwriting data in place, MVCC keeps multiple versions of a row.
1. When a row is updated, a new version is created.
2. Each version is tagged with a **Transaction ID (XID)**.
3. When you read, the database determines which version of the row was "current" at the start of your transaction (or statement).

## The "Read Snapshot"
In Postgres, every row has hidden columns \`xmin\` and \`xmax\`. 
- \`xmin\`: The ID of the transaction that inserted the row.
- \`xmax\`: The ID of the transaction that deleted/updated the row (0 if still alive).

When you run a query, the DB looks at its "Snapshot" (a list of active transactions) and only shows you rows where:
- \`xmin\` is a committed transaction that finished before you started.
- \`xmax\` is either 0 or a transaction that started after you started.

## The Result
**Readers never block writers, and writers never block readers.** This is the secret to high-performance relational databases. However, it comes at a cost: **Bloat**. Since old versions aren't deleted immediately, the database must periodically "clean up" (VACUUM) old versions that are no longer visible to any active transaction.`
  },
  {
    id: "20-7",
    number: "20.7",
    title: "Optimistic vs Pessimistic Concurrency",
    content: `How do you handle the situation where two users try to edit the same record at the same time?

## Pessimistic Concurrency
"Assume the worst." You lock the record as soon as you start.
- **Workflow**: \`SELECT ... FOR UPDATE\`. This places an Exclusive Lock.
- **Pros**: Guaranteed success if you get the lock; prevents conflicts before they happen.
- **Cons**: High risk of deadlocks; reduces throughput because other users are blocked even if they just want to read.

## Optimistic Concurrency
"Assume the best." You don't lock anything during the read/edit phase. Instead, you check for a conflict only when you save.
- **Workflow**: Add a \`version\` or \`updated_at\` column to the table.
  \`\`\`sql
  -- Read:
  SELECT id, name, version FROM users WHERE id = 1; -- version is 5
  -- Write:
  UPDATE users SET name = 'New Name', version = 6 
  WHERE id = 1 AND version = 5;
  \`\`\`
- **Result**: If the \`version\` in the DB is still 5, the update succeeds. If someone else changed it to 6, the \`UPDATE\` matches 0 rows, and your application knows there was a conflict.
- **Pros**: High throughput; no long-held locks.
- **Cons**: If there is high contention (many people editing the same row), the "Retry" logic can become expensive.

## Decision Framework
Use **Pessimistic** for high-contention, low-latency needs (like a stock order book). Use **Optimistic** for web applications where users take time to fill out forms and concurrent edits are relatively rare.`
  },
  {
    id: "20-8",
    number: "20.8",
    title: "B-Tree Indexes: Deep Internals",
    content: `The B-Tree (specifically the B+ Tree) is the most important data structure in database engineering. It allows the database to find any row in a multi-terabyte table in just 3 or 4 disk reads.

## Why not Binary Search Trees?
Standard Binary Trees have a low **fan-out** (only 2 children). For 1 million rows, you might need 20 levels. Each level could be a separate disk seek, which is slow.
A **B-Tree** has a high fan-out (often 100+). A 3-level B-Tree with a fan-out of 100 can store 1,000,000 keys (100^3).

## B+ Tree Structure
In a B+ Tree (used by most databases):
- **Internal Nodes**: Only store keys and pointers to child nodes. They act as a "map."
- **Leaf Nodes**: Store the actual data (or pointers to the data) and are linked together in a **doubly-linked list**.
- **Balanced**: The tree is always balanced; every leaf is at the same depth.

## The Search Process
To find \`ID=50\`:
1. Load the Root node. See that 50 is between 1 and 100.
2. Follow the pointer to the next level.
3. Load the Leaf node containing the range.
4. Perform a binary search within the node (which is in RAM).

## Engineering Implications
1. **Sorted Order**: B-Trees keep data sorted. This means they are excellent for **Range Queries** (\`WHERE age > 18\`).
2. **Write Overhead**: Every \`INSERT\` or \`DELETE\` might require splitting or merging nodes to keep the tree balanced. This is why you shouldn't index every column.
3. **Sequential I/O**: Because leaf nodes are linked, scanning an index is mostly sequential I/O, which is much faster than random I/O.`
  },
  {
    id: "20-9",
    number: "20.9",
    title: "Hash Indexes, GIN, GiST, BRIN",
    content: `While B-Trees are the general-purpose workhorse, specialized workloads require specialized indexes.

## Hash Indexes
Uses a hash table.
- **Use Case**: Equality checks only (\`WHERE id = 123\`).
- **Pros**: O(1) average lookup.
- **Cons**: Cannot do range queries; cannot be used for sorting.

## GIN (Generalized Inverted Index)
Think of this as the "Index of an Index." It maps values (like words in a document or elements in an array) to the rows where they appear.
- **Use Case**: Full-text search, JSONB columns in Postgres.
- **Example**: Finding all documents containing the word "database."

## GiST (Generalized Search Tree)
A framework that allows you to build custom tree-based indexes.
- **Use Case**: Geometric/Spatial data (finding points in a polygon), range types.

## BRIN (Block Range Index)
Instead of indexing every row, BRIN stores the min/max values for a "block" of pages.
- **Use Case**: Extremely large tables (billions of rows) that are naturally sorted by time.
- **Pros**: 1/1000th the size of a B-Tree.
- **How it works**: If you query for \`2023-01-01\`, the DB checks the BRIN index to see which blocks *could* contain that date and only reads those blocks.

## Choosing the Index
If you're not sure, use a **B-Tree**. If you're doing full-text search on JSON, use **GIN**. If you have 10TB of logs sorted by timestamp, consider **BRIN** to save disk space.`
  },
  {
    id: "20-10",
    number: "20.10",
    title: "Query Execution: Parsing, Planning, Execution",
    content: `When you send a SQL string to a database, it goes through a "factory pipeline" before returning results.

## 1. Parsing and Normalization
The database checks the syntax of your SQL. It ensures the tables and columns exist and that you have permission to access them. It converts the string into an **Abstract Syntax Tree (AST)**.

## 2. Optimization (The Brain)
This is the most complex part of the DB. The **Query Optimizer** takes the AST and tries to find the most efficient way to execute it.
- It considers different **Join Algorithms**.
- It decides whether to use an Index or a Full Table Scan.
- It uses **Statistics** (histograms of data distribution) to estimate how many rows will be returned by each filter.

## 3. Planning
The optimizer produces a **Query Plan** (often seen via \`EXPLAIN\`). This is a tree of operations like \`Index Scan\`, \`Hash Join\`, or \`Sort\`.

## 4. Execution
The Execution Engine traverses the plan. Modern engines use the **Volcano Model**: each operator "pulls" a row from its child, processes it, and passes it up. High-performance engines (like Snowflake or DuckDB) use **Vectorized Execution**, where they process batches of rows at a time to leverage CPU SIMD instructions.

## The Senior Insight
Slow queries are rarely caused by the execution engine; they are caused by the **Optimizer** making a bad guess because its statistics are out of date. This is why \`ANALYZE\` is a critical maintenance command.`
  },
  {
    id: "20-11",
    number: "20.11",
    title: "Join Algorithms: Nested Loop, Hash Join, Merge Join",
    content: `Joining two tables is one of the most expensive operations in a database. The optimizer chooses between three primary algorithms.

## 1. Nested Loop Join
For every row in Table A, scan Table B for a match.
- **Complexity**: O(N * M).
- **When it's good**: If Table A is very small, or if there is an index on the join column of Table B. In the latter case, it becomes O(N * log M).

## 2. Hash Join
Build a hash table of the smaller table in memory. Then scan the larger table and look up matches in the hash table.
- **Complexity**: O(N + M).
- **When it's good**: Joining large tables where no index is available. It requires enough RAM to hold the smaller table's hash map.

## 3. Merge Join
Both tables must be sorted by the join column. You "walk" down both tables simultaneously, like merging two sorted lists.
- **Complexity**: O(N log N + M log M) for sorting, then O(N + M) for merging.
- **When it's good**: If the tables are already sorted (e.g., they are being read from a B-Tree index). It is the most efficient way to join massive datasets.

## Summary Table
| Algorithm | Best Used When... | Key Weakness |
|-----------|-------------------|--------------|
| **Nested Loop** | One table is tiny or indexed | Slow for large unindexed tables |
| **Hash Join** | Large tables, no index | High memory usage |
| **Merge Join** | Data is already sorted | High cost if sorting is needed |`
  },
  {
    id: "20-12",
    number: "20.12",
    title: "PostgreSQL Internals: The Best-Engineered Open-Source Database",
    content: `PostgreSQL is often called the "Oracle of Open Source." Its architecture is designed for extensibility and reliability.

## Process-Based Model
Unlike MySQL, which uses threads, Postgres uses a **Process-per-connection** model.
- **Pros**: If one connection crashes (e.g., due to a C-extension bug), it doesn't bring down the whole database.
- **Cons**: Creating a process is more expensive than a thread. This is why you *must* use a **Connection Pooler** like PgBouncer for high-concurrency apps.

## Shared Memory
Even though they are separate processes, they share a large block of memory called the **Shared Buffer Cache**. This is where data pages are cached.

## Extensibility: The Catalog
Almost everything in Postgres is a row in a system table (the Catalog). This allows Postgres to support custom types (JSONB, PostGIS), custom indexes (GIN, GiST), and even custom languages (PL/Python, PL/v8) without changing the core engine.

## Reliability: The Force
Postgres is famous for its strict adherence to standards and its "No Data Loss" philosophy. Its implementation of MVCC and WAL is considered the industry benchmark for correctness. If Postgres tells you a transaction is committed, you can bet your career that the data is on the disk.`
  },
  {
    id: "20-13",
    number: "20.13",
    title: "Write-Ahead Logging in PostgreSQL",
    content: `How does a database ensure durability without being incredibly slow? Writing a whole 8KB data page to disk for every 10-byte update is inefficient. The answer is the **Write-Ahead Log (WAL)**.

## The Principle
"Never write data to the main data files without first logging the change to a sequential file (the WAL)."

## The Workflow
1. A transaction modifies a row.
2. The change is made in the **Buffer Pool** (RAM).
3. A small record describing the change is written to the **WAL Buffer**.
4. When the transaction commits, the WAL Buffer is flushed to the **WAL File** on disk.
5. Crucially: The actual data file is NOT updated yet. This happens later via a background process called the **Checkpointer**.

## Why it's fast
Writing to the WAL is **Sequential I/O** (appending to the end of a file). Sequential I/O is 10x-100x faster than Random I/O (finding and updating a specific page in a multi-GB data file).

## Crash Recovery
If the power fails before the Checkpointer has updated the data files:
1. On restart, Postgres reads the WAL from the last checkpoint.
2. It "replays" the changes in the WAL to the data pages in RAM.
3. The database is restored to a consistent state.

## Replication
WAL is also the foundation of **Streaming Replication**. The primary server simply sends its WAL stream to the replica, which replays it to stay in sync.`
  },
  {
    id: "20-14",
    number: "20.14",
    title: "VACUUM, TOAST, and PostgreSQL's Storage Engine",
    content: `Postgres has some unique storage characteristics that every engineer should understand.

## The Need for VACUUM
Because of MVCC, updating a row doesn't delete the old version; it marks it as "obsolete." Over time, these obsolete rows (bloat) take up space and slow down scans. **VACUUM** is the background process that:
1. Finds obsolete rows that are no longer needed by any active transaction.
2. Marks that space as available for new rows.
3. Updates the "Visibility Map" to speed up index-only scans.
*Warning*: If VACUUM can't keep up with writes, your database will experience "Bloat," leading to massive performance degradation.

## TOAST (The Oversized-Attribute Storage Technique)
Postgres has a fixed page size of 8KB. What happens if you try to store a 1MB PDF in a \`BYTEA\` column?
Postgres uses **TOAST**:
1. Large values are compressed.
2. If they are still > 2KB, they are broken into chunks and stored in a separate, hidden "TOAST table."
3. The main table only stores a small pointer to the TOAST entries.
This ensures that "normal" queries don't slow down just because a table has a few massive rows.

## Heaps vs Index-Organized Tables
Postgres uses a **Heap Storage** model. Rows are stored wherever there is space. Indexes contain pointers to the physical location (CTID) in the heap. In contrast, MySQL (InnoDB) uses **Index-Organized Tables**, where the data is actually stored *inside* the primary key B-Tree.`
  },
  {
    id: "20-15",
    number: "20.15",
    title: "MySQL InnoDB: Architecture and Trade-offs",
    content: `MySQL's most popular storage engine, InnoDB, takes a different architectural path than Postgres.

## Clustered Index
In InnoDB, the table IS a B-Tree (the Clustered Index). The leaf nodes of the primary key index contain the actual row data.
- **Pros**: Extremely fast lookups by Primary Key (data is right there).
- **Cons**: Secondary indexes are slower because they store the Primary Key value, requiring a "double-lookup" (one to the secondary index, one to the primary index).

## Thread-Based Model
MySQL uses a thread-per-connection. This is more lightweight than Postgres processes, allowing MySQL to handle thousands of connections more easily without a proxy (though a proxy is still recommended at scale).

## Change Buffer
InnoDB has a "Change Buffer." If you update a secondary index that isn't in RAM, InnoDB records the change in a buffer and applies it later when the index page is loaded. This significantly speeds up write operations on tables with many indexes.

## The Undo Log
While Postgres stores multiple versions in the main table (causing bloat), InnoDB stores old versions in a separate **Undo Log**. This keeps the main table clean but makes the Undo Log a potential bottleneck for long-running transactions.`
  },
  {
    id: "20-16",
    number: "20.16",
    title: "LSM Trees: RocksDB, LevelDB, Cassandra Storage Engine",
    content: `B-Trees are great for reads but can be slow for writes because they require random I/O. **LSM Trees (Log-Structured Merge-Trees)** are an alternative designed for write-heavy workloads.

## The Architecture
1. **MemTable**: All writes go to an in-memory sorted structure (like a Skip List).
2. **WAL**: Writes are also logged to a WAL for durability.
3. **SSTables (Sorted String Tables)**: When the MemTable is full, it is flushed to disk as a sorted file. Once written, these files are **Immutable**.
4. **Compaction**: Because there might be many SSTables, a background process merges them together, removing old versions of keys and keeping the total number of files manageable.

## The Levels
SSTables are organized in levels (Level 0, Level 1, etc.). Level 0 contains the most recent flushes. As data gets older, it is compacted into higher levels.

## Trade-offs
- **Write Performance**: Incredible. Every write is a sequential append to a WAL and a memory update. No random disk seeks.
- **Read Performance**: Slower than B-Trees. To find a key, you might have to check the MemTable and then multiple SSTables.
- **Bloom Filters**: To speed up reads, LSM-based databases use Bloom Filters to quickly tell if a key *doesn't* exist in an SSTable, avoiding unnecessary disk reads.

## Use Cases
LSM Trees are the heart of **Cassandra**, **HBase**, **RocksDB**, and **BigTable**. Use them when your write volume is massive (e.g., logging, metrics, social media feeds).`
  },
  {
    id: "20-17",
    number: "20.17",
    title: "Document Databases: MongoDB Architecture",
    content: `MongoDB replaced the "Row/Column" model with "Collections/Documents," typically using BSON (Binary JSON).

## Schema-less Flexibility
The primary draw is that documents in the same collection don't need the same fields. This is great for rapidly evolving startups or data with varied attributes (like a product catalog).

## WiredTiger Storage Engine
Modern MongoDB uses the WiredTiger engine, which supports both **B-Trees** and **LSM Trees** (though B-Trees are default). It provides document-level locking and compression.

## Replica Sets
High availability is built-in via Replica Sets (typically 3 nodes). They use the **Raft-like consensus** to elect a primary. Only the primary handles writes; secondaries replicate the "Oplog" (Operation Log).

## Sharding
MongoDB scales horizontally by "Sharding" data across multiple clusters. A **Shard Key** determines which shard a document lives on.
- **Pros**: Handles massive datasets.
- **Cons**: Queries that don't include the Shard Key must be "broadcast" to all shards, which is very slow. Choosing a good shard key is the most critical decision in MongoDB engineering.`
  },
  {
    id: "20-18",
    number: "20.18",
    title: "Key-Value Stores: Redis Architecture Deep Dive",
    content: `Redis is more than a cache; it is an in-memory data structure store.

## Why is it so fast?
1. **In-Memory**: No disk I/O on the critical path.
2. **Single-Threaded**: This sounds like a weakness, but it's a strength. It eliminates the need for locks, context switching, and complex concurrency control. (Note: Modern Redis uses multiple threads for background tasks like I/O, but the command execution is still serial).
3. **Efficient Structures**: Redis provides specialized structures like Hashes, Sets, Sorted Sets (\`ZSET\`), and HyperLogLogs.

## Persistence Options
- **RDB (Redis Database)**: Point-in-time snapshots (e.g., every hour). Fast to restart, but you lose data between snapshots.
- **AOF (Append Only File)**: Logs every write command. Much more durable, but the file can get huge.

## Redis Sentinel and Cluster
- **Sentinel**: Manages failover. If the master dies, Sentinel promotes a replica.
- **Cluster**: Horizontal scaling. Data is partitioned into 16,384 **Hash Slots**. Each node is responsible for a subset of slots.

## Use Cases
Session management, real-time leaderboards (\`ZSET\`), rate limiting, and pub/sub messaging. **Rule**: If the data must fit in RAM and needs sub-millisecond response, use Redis.`
  },
  {
    id: "20-19",
    number: "20.19",
    title: "Column-Family Stores: Cassandra Architecture",
    content: `Cassandra is a distributed, "Always-On" database designed for massive write throughput across multiple data centers.

## The Data Model
It's not truly "Columnar" like a warehouse; it's a **Partitioned Row Store**. 
- **Partition Key**: Determines which node stores the data (via Consistent Hashing).
- **Clustering Columns**: Determines the sort order *within* the partition.

## Peer-to-Peer Architecture
Unlike MySQL or MongoDB, Cassandra has no "Primary." All nodes are equal. This is based on the **Amazon Dynamo** paper.
- **Gossip Protocol**: Nodes talk to each other to share cluster state.
- **LSM Storage**: Uses the LSM tree model for high-speed writes.

## Tunable Consistency
This is Cassandra's "Killer Feature." You can choose how many nodes must acknowledge a write or read.
- \`ANY\`: Highest availability, lowest consistency.
- \`QUORUM\`: (N/2 + 1) nodes must agree. Good balance.
- \`ALL\`: Highest consistency, lowest availability.

## The Downsides
Cassandra is "Query-First." You must design your table specifically for the query you want to run. There are no Joins and no \`GROUP BY\`. If you need a new query pattern, you often need a new table.`
  },
  {
    id: "20-20",
    number: "20.20",
    title: "Search Engines: Elasticsearch / Lucene Internals",
    content: `Elasticsearch is a distributed search engine built on top of **Apache Lucene**. It is designed for full-text search and real-time analytics.

## The Inverted Index
This is the core of Lucene. It's like the index at the back of a book.
- **Term**: A word (e.g., "Software").
- **Postings List**: A list of Document IDs where that word appears.
When you search for "Software Engineering," Elasticsearch finds the postings for both words and performs an **Intersection** (AND) or **Union** (OR).

## Sharding and Replicas
Elasticsearch breaks an "Index" into multiple "Shards." Each shard is a full Lucene instance.
- **Primary Shard**: Handles the initial indexing.
- **Replica Shard**: Provides hardware redundancy and increases read throughput.

## Analysis Pipeline
Before a document is indexed, it goes through:
1. **Character Filters**: Remove HTML tags.
2. **Tokenizer**: Split string into words.
3. **Token Filters**: Lowercase, remove "stop words" (the, a, is), and **Stemming** (converting "running" to "run").

## Why not just use Postgres \`LIKE\`?
Postgres \`LIKE '%word%'\` requires a full table scan. Even GIN indexes in Postgres are not as feature-rich as Lucene for things like **Fuzzy Matching** (finding "Apple" when you typed "Aple") or **Relevance Scoring** (TF-IDF or BM25).`
  },
  {
    id: "20-21",
    number: "20.21",
    title: "Time-Series Databases: InfluxDB, TimescaleDB",
    content: `Time-series data (metrics, sensor data, stock prices) has two unique properties: it's almost always **Append-Only**, and queries are almost always **Range-Based on time**.

## TimescaleDB
Built as an extension to PostgreSQL.
- **Hypertables**: Automatically partitions data into "chunks" based on time.
- **Pros**: You get full SQL, ACID, and Joins. It's just Postgres under the hood, but optimized for time.
- **Native Compression**: Can compress old data by 90%+ by using columnar storage for older chunks.

## InfluxDB
A purpose-built TSDB with its own engine (TSM - Time Structured Merge Tree).
- **Tag-based Model**: Data is organized by tags (metadata) and fields (values).
- **Pros**: Extremely high write throughput; handles "High Cardinality" data well.
- **Cons**: Uses a custom query language (Flux/InfluxQL), although modern versions support SQL.

## Why use a TSDB?
1. **Retention Policies**: Automatically drop data older than 30 days.
2. **Continuous Aggregations**: Automatically calculate the "Average price per minute" as data flows in.
3. **Time-Centric Functions**: Easy functions for "Windowing," "Moving Averages," and "Rate of Change."`
  },
  {
    id: "20-22",
    number: "20.22",
    title: "Vector Databases: Similarity Search at Scale",
    content: `With the rise of LLMs and AI, Vector Databases (Pinecone, Milvus, Weaviate, pgvector) have become essential.

## What is a Vector?
In AI, data (text, images) is converted into an array of numbers (an **Embedding**) that represents its semantic meaning.
- "King" and "Queen" will have vectors that are "close" to each other in high-dimensional space.

## The Challenge
You can't use a B-Tree to find the "nearest neighbor" in 1536-dimensional space. Standard indexing fails.

## ANN (Approximate Nearest Neighbor)
Vector DBs use ANN algorithms to find "close enough" results very quickly.
- **HNSW (Hierarchical Navigable Small World)**: Creates a multi-layered graph where you can "zoom in" to the neighborhood of your vector.
- **IVF (Inverted File Index)**: Clusters vectors into buckets and only searches the most relevant buckets.

## pgvector
A Postgres extension that brings vector search to the relational world.
- **Pros**: You can join your vector search results with your regular relational data in a single SQL query.
- **Cons**: Not as specialized as a standalone engine for extremely high scale (billions of vectors).

## Use Case
Semantic Search, Retrieval Augmented Generation (RAG), and Recommendation Engines.`
  },
  {
    id: "20-23",
    number: "20.23",
    title: "Database Selection: The Complete Decision Framework",
    content: `Choosing a database is a "one-way door" decision that is very hard to reverse. Use this framework to guide your choice.

## 1. What is the Data Structure?
- **Highly Relational**: Complex joins, strict schema -> **PostgreSQL**.
- **Unstructured/Flexible**: Product catalogs, varied attributes -> **MongoDB**.
- **Simple Key-Value**: Sessions, configuration -> **Redis / DynamoDB**.
- **Graph-based**: Social networks, fraud detection -> **Neo4j**.

## 2. What is the Read/Write Pattern?
- **Heavy Writes**: Logs, IoT metrics -> **Cassandra / InfluxDB**.
- **Heavy Reads**: Content sites -> **PostgreSQL with Caching**.
- **Search-heavy**: Full-text, fuzzy matching -> **Elasticsearch**.

## 3. What is the Scale?
- **Single Machine (<1TB)**: **PostgreSQL** is almost always the answer.
- **Global Scale (Multi-region)**: **DynamoDB / Spanner / Cassandra**.

## 4. What are the Consistency Needs?
- **Financial/Critical**: Strict ACID -> **PostgreSQL / MySQL**.
- **Eventual Consistency is Fine**: Likes on a post -> **Cassandra / DynamoDB**.

## The "Postgres-First" Rule
In modern engineering, the default should be **PostgreSQL**. It has extensions for JSON (JSONB), Vectors (pgvector), and Time-series (Timescale). Only move to a specialized database when you have a proven performance bottleneck that Postgres cannot solve.`
  },
  {
    id: "20-24",
    number: "20.24",
    title: "Case Study: Instagram's Sharding Strategy",
    content: `When Instagram grew to millions of users, a single Postgres instance couldn't handle the load. They had to **Shard** (horizontally partition) their database.

## The Strategy
They chose to shard at the **Application Layer**. Instead of using a complex middleware, their Python code decided which database to talk to.

## ID Generation (The Genius Part)
In a sharded system, you can't use standard auto-increment IDs because Shard A and Shard B might generate the same ID. Instagram built a custom 64-bit ID:
- **41 bits**: Timestamp in milliseconds (gives 69 years of IDs).
- **13 bits**: Shard ID (supports 8192 shards).
- **10 bits**: Auto-incrementing sequence (supports 1024 IDs per shard per millisecond).
This allowed them to generate unique, time-ordered IDs without a central coordination service.

## Shard Management
They mapped thousands of "Logical Shards" to a smaller number of "Physical Servers." This allowed them to move logical shards between servers as load changed, using Postgres replication to migrate data without downtime.

## Lesson
Simplicity wins. By handling sharding in the application and keeping the IDs smart, they avoided the complexity of distributed transaction coordinators.`
  },
  {
    id: "20-25",
    number: "20.25",
    title: "Case Study: Slack's Database Architecture",
    content: `Slack's primary challenge is managing "Workspaces." Each workspace is like a mini-database.

## Vitess: Scaling MySQL
Slack uses **Vitess**, a database clustering system for horizontal scaling of MySQL. Vitess was originally developed at YouTube.
- It provides a **SQL Proxy** (VTGate) that makes a cluster of MySQL nodes look like a single database to the application.
- It handles sharding, failover, and connection pooling.

## The "Warm" Cache Problem
Slack has a unique problem: when a user opens the app, they need a "Snapshot" of their entire workspace.
- They use **Redis** extensively to cache the most recent messages and channel states.
- To prevent the "Thundering Herd" (everyone in a company opening Slack at 9 AM), they use a sophisticated "Pre-warming" strategy where background workers refresh caches before users even log in.

## Data Locality
Because users in a workspace usually talk to each other, Slack keeps all data for a single workspace on the same shard. This allows them to perform joins and maintain consistency within a workspace while scaling the total number of workspaces across thousands of servers.`
  },
  {
    id: "20-26",
    number: "20.26",
    title: "Exercises",
    content: `Deepen your understanding of database engineering with these challenges.

## Questions
1. **ACID**: In a banking system, which of the ACID properties is most critical for ensuring that money isn't created or destroyed during a transfer?
2. **Indexing**: You have a table with 100 million rows. You add a B-Tree index to a \`status\` column which only has two values: "Active" and "Inactive." Will this index be effective? Why or why not?
3. **MVCC**: Explain why Postgres requires a \`VACUUM\` process but a standard file system does not.
4. **Performance**: If a query takes 500ms and \`EXPLAIN ANALYZE\` shows a "Sequential Scan" on a table with 10 million rows, what is the most likely fix?
5. **Storage**: Why are LSM trees preferred for high-write workloads over B-Trees?
6. **Isolation**: Which isolation level is the default for MySQL, and which anomaly does it allow that PostgreSQL's default level prevents? (Wait, check that).
7. **Vector DB**: Why can't we use a standard B-Tree index for finding similar images?
8. **Sharding**: What is the "Hot Partition" problem in sharding, and how can it be mitigated?

## Answers
1. **Atomicity**: It ensures the "Subtract" from Account A and "Add" to Account B either both happen or neither happens.
2. **Indexing**: No. This is called **Low Cardinality**. The optimizer will likely ignore the index and perform a Full Table Scan because the index doesn't significantly narrow down the results.
3. **MVCC**: Because Postgres doesn't overwrite data; it creates new versions. Obsolete versions (garbage) must be explicitly reclaimed. File systems usually overwrite or manage blocks differently.
4. **Fix**: Add an **Index** on the column used in the \`WHERE\` clause.
5. **LSM vs B-Tree**: LSM trees turn random writes into sequential writes, which are much faster on disk.
6. **Isolation**: MySQL's default is **Repeatable Read**. Postgres's default is **Read Committed**. Actually, Repeatable Read is "stricter" than Read Committed, so it prevents *more* anomalies, not fewer.
7. **Vector DB**: B-Trees only work for 1-dimensional, sortable data. Vectors are high-dimensional and "similarity" is based on distance, not alphabetical order.
8. **Hot Partition**: Occurs when one shard (e.g., a celebrity's user ID) gets 100x more traffic than others. **Mitigation**: Use a different shard key, or "Salt" the shard key to spread the data across multiple partitions.`
  }
];
