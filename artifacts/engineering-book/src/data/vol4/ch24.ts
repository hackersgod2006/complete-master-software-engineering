import type { Section } from '../types';

export const CH24_SECTIONS: Section[] = [
  {
    id: "24-1",
    number: "24.1",
    title: "Why Asynchronous Communication",
    content: `In a world of synchronous REST or gRPC calls, Service A calls Service B and waits. If B is slow, A is slow. If B is down, A fails. This is **Temporal Coupling**. Asynchronous communication breaks this coupling, allowing systems to be more resilient, scalable, and responsive.

## The Problem with Sync
In a synchronous chain (A -> B -> C -> D), the availability of the entire chain is the product of the availability of each component ($0.99 \times 0.99 \times 0.99 \times 0.99 = 0.96$). One slow service at the end of the chain can cause a "backlog" that reaches all the way to the user.

## The Asynchronous Advantage
By using a **Message Broker**, Service A simply emits an event ("OrderCreated") and moves on.
1.  **Decoupling**: Service A doesn't need to know who processes the order.
2.  **Scalability**: If the "Email Service" is slow, messages just sit in a queue. We can scale the Email Service independently to catch up.
3.  **Resilience**: If the "Invoice Service" is down, the message stays in the broker. When the service comes back up, it processes the backlog. No data is lost.
4.  **Smoothing**: Asynchronous communication acts as a "buffer" for traffic spikes. Instead of the database crashing under a surge, the message queue absorbs the pressure.

Asynchronous design is the fundamental building block of **Event-Driven Architecture (EDA)**.
`
  },
  {
    id: "24-2",
    number: "24.2",
    title: "Message Queues vs Event Streams: The Fundamental Difference",
    content: `While often used interchangeably, **Message Queues** and **Event Streams** serve different architectural purposes.

## Message Queues (e.g., RabbitMQ, SQS)
A queue is a "Point-to-Point" system.
- **Consumption**: Once a message is processed and acknowledged by a consumer, it is **deleted** from the queue.
- **Logic**: Used for "Work Distribution." You have a pile of tasks, and multiple workers pull tasks from the pile.
- **Analogy**: A physical inbox. Once you take the letter and act on it, it's gone.

## Event Streams (e.g., Kafka, Kinesis)
A stream is a "Publish-Subscribe" (Pub/Sub) system with a **Log-based** architecture.
- **Consumption**: Messages are *not* deleted after consumption. They are appended to a persistent log.
- **Logic**: Multiple different services can read the *same* stream of events independently. Consumers keep track of their own "Offset" (where they are in the stream).
- **Analogy**: A DVR (Digital Video Recorder). You can rewind the stream, replay events from yesterday, or join the live broadcast.

| Feature | Message Queue | Event Stream |
| :--- | :--- | :--- |
| **Data Retention** | Deleted after ack | Persistent (TTL or Size based) |
| **Consumer Pattern** | Competing Consumers | Fan-out (Multiple groups) |
| **Ordering** | Hard to guarantee with multiple consumers | Guaranteed within a partition |
| **Primary Use Case** | Task Queues / Job Processing | Event Sourcing / Real-time Analytics |
`
  },
  {
    id: "24-3",
    number: "24.3",
    title: "Kafka: Architecture Deep Dive",
    content: `Apache Kafka is not just a message broker; it is a **Distributed Streaming Platform**. It is designed to handle trillions of events per day with millisecond latency.

## The Commit Log
At its heart, Kafka is an append-only sequence of records. Each record consists of a key, a value, and a timestamp. Because it's append-only, Kafka can achieve incredible throughput by utilizing **Sequential I/O**, which is significantly faster than random disk access.

## Core Components
-   **Producers**: Send data to Kafka topics.
-   **Brokers**: The servers that store the data. A Kafka cluster consists of multiple brokers.
-   **Topics**: A category or feed name to which records are published.
-   **Partitions**: Topics are divided into partitions for parallelism. This is the unit of scalability in Kafka.
-   **Consumers**: Read data from topics.

## Why it's so fast
Kafka uses two key Linux kernel features:
1.  **Page Cache**: It writes to the OS page cache immediately. The OS flushes to disk in the background.
2.  **Zero-Copy (sendfile)**: When a consumer requests data, Kafka tells the kernel to move data directly from the disk/page-cache to the network socket, bypassing the application's memory entirely. This reduces CPU overhead and context switching.
`
  },
  {
    id: "24-4",
    number: "24.4",
    title: "Kafka Partitions, Replication, and Consumer Groups",
    content: `Kafka's power comes from how it handles distribution and fault tolerance.

## Partitions: The Scalability Unit
A topic is split into **Partitions**.
- If a topic has 10 partitions, you can have up to 10 consumers in a group reading from it in parallel.
- Messages with the same **Key** always go to the same partition. This ensures **Ordering** for a specific entity (e.g., all events for \`user_123\` will be processed in the order they occurred).

## Replication: The Fault Tolerance
Each partition has one **Leader** and multiple **Followers**.
- All reads and writes go to the Leader.
- Followers replicate the data from the leader.
- If the Leader dies, one of the "In-Sync Replicas" (ISR) is automatically elected as the new Leader.

## Consumer Groups
This is Kafka's most unique feature. A **Consumer Group** acts as a single "logical" subscriber.
- If you have 2 consumers in a group, Kafka splits the partitions between them.
- If you add a 3rd consumer, Kafka "rebalances" and moves some partitions to the new member.
- This allows you to scale consumption linearly by simply adding more instances of your service.

**Pro-tip**: Always over-partition. It's easy to have more partitions than consumers, but hard to add partitions later without breaking key-based ordering.
`
  },
  {
    id: "24-5",
    number: "24.5",
    title: "Kafka Exactly-Once Semantics",
    content: `In distributed systems, delivery guarantees are notoriously difficult. Kafka supports three modes:
1.  **At-Most-Once**: Messages might be lost but never duplicated.
2.  **At-Least-Once**: Messages are never lost but might be duplicated (default).
3.  **Exactly-Once (EOS)**: The "Holy Grail." Each message is processed exactly once, even if producers or consumers crash.

## How EOS Works
Kafka achieves this through two mechanisms:
-   **Idempotent Producer**: The producer attaches a sequence number to every message. If the broker receives a duplicate sequence number (due to a network retry), it ignores it.
-   **Transactions**: Kafka allows a producer to send a batch of messages to multiple topics as a single atomic unit. Either all are "committed" (visible to consumers) or none are.

## The Consumer Side
To achieve true exactly-once processing, your consumer must be idempotent or the sink (e.g., the database you are writing to) must support transactions that include the Kafka offset.

\`\`\`python
# Pseudocode for a Transactional Producer
producer.init_transactions()
try:
    producer.begin_transaction()
    producer.send("topic-a", "key1", "value1")
    producer.send("topic-b", "key2", "value2")
    # Commit the offsets of the messages we just processed
    producer.send_offsets_to_transaction(offsets, consumer_group_id)
    producer.commit_transaction()
except Exception:
    producer.abort_transaction()
\`\`\`
`
  },
  {
    id: "24-6",
    number: "24.6",
    title: "Kafka Streams and ksqlDB",
    content: `Kafka evolved from a transport layer into a processing layer. **Kafka Streams** is a library for building "Stream Processing" applications.

## KStream vs KTable
-   **KStream**: An unbounded stream of events. "Fact-like" (e.g., "User clicked button," "Payment received").
-   **KTable**: A changelog of state. "Table-like" (e.g., "User's current address," "Item's current price").
A KTable is essentially a materialized view of a KStream.

## ksqlDB
ksqlDB is an event-streaming database that allows you to write stream processing logic using SQL.

\`\`\`sql
-- Create a stream of high-value orders in real-time
CREATE STREAM high_value_orders AS
  SELECT * FROM orders
  WHERE total_amount > 1000;

-- Calculate a running total of sales by category
CREATE TABLE sales_by_category AS
  SELECT category, SUM(price)
  FROM orders
  GROUP BY category;
\`\`\`

Instead of writing complex Java/Scala code, you can use SQL to filter, join, and aggregate streams in real-time. This democratizes data engineering, allowing anyone who knows SQL to build real-time streaming pipelines.
`
  },
  {
    id: "24-7",
    number: "24.7",
    title: "RabbitMQ: Exchanges, Queues, Bindings",
    content: `RabbitMQ is the most popular implementation of the **AMQP (Advanced Message Queuing Protocol)**. Unlike Kafka's log-based approach, RabbitMQ is a sophisticated "Smart Broker."

## The AMQP Model
1.  **Publisher**: Sends a message to an **Exchange**.
2.  **Exchange**: A routing engine. It looks at the message's "Routing Key" and decides which queue(s) to send it to.
3.  **Queue**: Stores the message until a consumer takes it.
4.  **Binding**: The rule that connects an Exchange to a Queue.

## Exchange Types
-   **Direct**: Message goes to the queue with the exact matching routing key.
-   **Fanout**: Message is broadcast to *all* queues bound to the exchange (Classic Pub/Sub).
-   **Topic**: Flexible routing using wildcards (e.g., \`orders.us.*\` matches \`orders.us.shipping\` and \`orders.us.billing\`).
-   **Headers**: Routing based on message header attributes.

## Smart Broker, Dumb Consumer
In RabbitMQ, the broker does the heavy lifting of routing and tracking who has seen what. Once a consumer acknowledges a message, the broker deletes it. This makes RabbitMQ excellent for complex task routing, but it lacks the "replayability" of Kafka.
`
  },
  {
    id: "24-8",
    number: "24.8",
    title: "Message Ordering, Idempotency, and At-Least-Once Delivery",
    content: `In a distributed system, you must assume that messages will arrive out of order or more than once.

## The Ordering Challenge
If you have multiple consumers reading from one queue, "Message A" (Create User) might be processed *after* "Message B" (Update User) if the first consumer is slow.
**Solution**: Use Kafka-style partitioning (where all messages for one user go to one consumer) or use a single consumer (sacrificing throughput).

## Idempotency
An operation is **Idempotent** if performing it multiple times has the same effect as performing it once.
**Example**: \`SET status = 'PAID'\` is idempotent. \`INCREMENT balance BY 10\` is NOT.

How to make consumers idempotent:
1.  **Database Unique Constraints**: Use the Message ID as a unique key in your DB. If you try to insert a duplicate, the DB rejects it.
2.  **Idempotency Keys**: Clients send a unique UUID with every request. The server tracks these UUIDs in Redis and ignores duplicates for 24 hours.

## At-Least-Once is the Standard
Most systems aim for "At-Least-Once." This means the system will retry until it's sure the message was delivered. This guarantees no data loss, but puts the burden of handling duplicates (Idempotency) on the consumer.
`
  },
  {
    id: "24-9",
    number: "24.9",
    title: "Dead Letter Queues and Poison Pills",
    content: `What happens when a message is "un-processable"? Maybe it has a malformed JSON body, or it triggers a bug in your code that causes a crash.

## The Poison Pill
A **Poison Pill** is a message that causes a consumer to crash every time it's received.
**Scenario**:
1. Consumer pulls message.
2. Consumer crashes.
3. Broker notices consumer is gone, puts message back in queue.
4. New consumer pulls the same message, crashes.
5. Repeat until the entire cluster is down.

## Dead Letter Queues (DLQ)
A DLQ is a separate queue for messages that have failed processing multiple times.
**The Workflow**:
1. Consumer tries to process message.
2. If it fails, increment a "retry count" in the message header.
3. If retry count > 3, move the message to the **DLQ**.
4. Engineers monitor the DLQ, fix the bug or the data, and then "re-drive" the messages back into the main queue.

DLQs prevent a single bad message from blocking your entire pipeline while ensuring that problematic data is captured for manual inspection.
`
  },
  {
    id: "24-10",
    number: "24.10",
    title: "Event Sourcing: The Complete Pattern",
    content: `**Event Sourcing** is an architectural pattern where we don't store the *current state* of an object. Instead, we store the *complete sequence of events* that led to that state.

## State vs. Events
- **Traditional**: \`Table: BankAccount { id: 1, balance: 150 }\`.
- **Event Sourced**:
    1. \`AccountCreated(id=1, initial=100)\`
    2. \`MoneyDeposited(id=1, amount=100)\`
    3. \`MoneyWithdrawn(id=1, amount=50)\`

To get the current balance, you "replay" the events: $100 + 100 - 50 = 150$.

## Why use Event Sourcing?
1.  **Perfect Audit Log**: You don't just know the balance; you know exactly how it got there.
2.  **Time Travel**: You can reconstruct the state of the system as it was at any point in history.
3.  **Analytics**: You can run new types of analysis on old data. If you decide to track "Average withdrawal time," you already have the data in your event log.

## Snapshots
Replaying millions of events to find one balance is slow. We optimize this with **Snapshots**. Every 1,000 events, we save the current state. To get the current state, you load the latest snapshot and replay only the events that happened after it.
`
  },
  {
    id: "24-11",
    number: "24.11",
    title: "CQRS: Command Query Responsibility Segregation",
    content: `**CQRS** is a pattern that separates the code that *updates* data from the code that *reads* data. It is the natural companion to Event Sourcing.

## The Split
-   **Command Side**: Optimized for writes. It processes "Commands" (intent to change state), validates them, and emits events. It doesn't need to support complex searches.
-   **Query Side**: Optimized for reads. It listens to the events and maintains a "Read Model" (e.g., an Elasticsearch index or a specialized SQL table) that is perfectly structured for the UI.

## Benefits
-   **Independent Scaling**: Usually, you have 100x more reads than writes. CQRS allows you to scale your read-replicas independently.
-   **Optimized Schemas**: Your write model might be a normalized SQL DB, while your read model is a flattened JSON document in DocumentDB for fast lookup.

## The Cost: Eventual Consistency
Because the read model is updated by an event listener, there is a small delay (milliseconds) between a command being accepted and the change appearing in the UI. This "Eventual Consistency" is a trade-off you must manage.
`
  },
  {
    id: "24-12",
    number: "24.12",
    title: "Outbox Pattern: Reliable Event Publishing",
    content: `How do you ensure that a database update and a message publication happen atomically? If you update the DB and then the power fails before you send the message, your system is inconsistent.

## The Solution: The Outbox
Instead of sending the message to the broker directly, you write the message into a special **Outbox Table** in the *same database transaction* as your primary data change.

\`\`\`sql
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  INSERT INTO outbox (topic, payload) VALUES ('payments', '{"id": 1, "amt": 100}');
COMMIT;
\`\`\`

## The Relay
A separate process (the **Message Relay**) polls the Outbox table or listens to the DB's Change Data Capture (CDC) log. It reads the messages and publishes them to the broker. Once published, it marks them as "sent" or deletes them.

This guarantees **At-Least-Once** delivery of events. Even if the application crashes, the Relay will eventually find the message in the Outbox and send it.
`
  },
  {
    id: "24-13",
    number: "24.13",
    title: "Stream Processing: Flink, Spark Streaming, Kafka Streams",
    content: `Stream processing is the act of performing computations on data while it is in motion, rather than waiting for it to be stored in a database.

## Three Tiers of Tooling
1.  **Kafka Streams**: A lightweight library. Best when your data is already in Kafka and you want to build microservices that process it.
2.  **Apache Flink**: The "Gold Standard" for complex stream processing. Supports advanced features like "Exactly-Once" state management, event-time processing (handling data that arrives late), and complex windowing.
3.  **Spark Streaming (Structured Streaming)**: Part of the Spark ecosystem. Best if you are already using Spark for batch processing and want to use the same code for streaming.

## Key Concepts
-   **Windowing**: Processing data in chunks of time (e.g., "Calculate the average temperature every 5 minutes").
-   **Watermarks**: A way to handle "Late Data." If a message arrives 10 seconds late due to network lag, a watermark tells the system how long to wait before finalizing a time-window.
-   **Stateful Processing**: Keeping track of information across messages (e.g., "Is this the third time this IP address has failed to login in the last minute?").
`
  },
  {
    id: "24-14",
    number: "24.14",
    title: "Case Study: LinkedIn's Kafka Origin Story",
    content: `Kafka was created at LinkedIn around 2010 to solve a "Spaghetti Architecture" problem.

## The Problem
LinkedIn had dozens of data systems (Oracle, MySQL, Teradata, Lucene) and hundreds of point-to-point "pipelines" connecting them. Adding a new feature required writing dozens of custom parsers and connectors. The system was fragile and couldn't scale to the volume of activity data they wanted to track.

## The Innovation
Jay Kreps and his team realized that all these pipelines were essentially trying to do the same thing: transport a log of events. They built Kafka as a "Universal Data Pipeline."
- Instead of N-to-N connections, every system connected to Kafka.
- Producers (the web app) sent events once.
- Consumers (Hadoop, Search, Real-time graphs) read the events they needed at their own pace.

## The Result
Kafka allowed LinkedIn to move from "Batch" processing (where data was hours old) to "Real-time" processing (where data was milliseconds old), enabling features like "People You May Know" to update instantly.
`
  },
  {
    id: "24-15",
    number: "24.15",
    title: "Case Study: Uber's Real-Time Event Processing",
    content: `Uber is one of the largest users of Kafka and Flink in the world, processing trillions of events per day for everything from pricing to fraud detection.

## Marketplace Balancing
Uber's "Surge Pricing" is a real-time stream processing problem.
1.  **Streams**: Incoming rider requests and driver GPS locations flow into Kafka.
2.  **Processing (Flink)**: A Flink job aggregates these streams into "Hexagons" (geographic cells). It calculates the ratio of supply to demand in every cell every few seconds.
3.  **Action**: If demand > supply, it triggers a surge event, which is pushed back into the app to encourage more drivers to head to that area.

## Fault Tolerance
Because Uber's business happens in the real world, they cannot afford "downtime." They use a "Multi-Region" Kafka setup where data is replicated across different parts of the world. If one data center goes dark, the streaming pipelines automatically fail over to the other region, ensuring that rides (and payments) continue to function.
`
  },
  {
    id: "24-16",
    number: "24.16",
    title: "Exercises",
    content: `Test your knowledge of Messaging and Streaming.

## Questions

1.  **Temporal Coupling**: Explain in your own words how a Message Queue solves the problem of "Service A is slow because Service B is slow."
2.  **Kafka Partitioning**: You have a topic with 5 partitions. You have a consumer group with 10 instances of your service. How many instances will be idle?
3.  **RabbitMQ Routing**: A message is sent to a "Fanout" exchange. There are 3 queues bound to it. How many copies of the message will be delivered?
4.  **Idempotency**: Why is a \`POST /orders\` request not naturally idempotent, and how would you fix it using an Idempotency Key?
5.  **Event Sourcing**: In an event-sourced system, how do you handle a "GDPR Right to be Forgotten" request where you must delete a user's name?
6.  **Outbox Pattern**: What happens if the "Message Relay" process crashes? Is data lost?
7.  **Stream Processing**: What is the difference between "Event Time" and "Processing Time"?
8.  **Exactly-Once**: If Kafka provides exactly-once delivery to a consumer, does that mean the consumer's side-effect (like sending an email) is also exactly-once?

## Answers

1.  **Temporal Coupling**: Service A doesn't wait for Service B to respond. It just drops the message in the queue and returns a "202 Accepted" to the user. Service B processes it whenever it can. The two services are no longer "coupled" in time.
2.  **Kafka Partitioning**: 5 instances will be idle. Kafka only allows one consumer per partition within a single group to ensure ordering.
3.  **RabbitMQ Routing**: 3 copies. Fanout broadcasts to every bound queue.
4.  **Idempotency**: If the client retries a failed POST, you might create two identical orders. Fix it by requiring a \`X-Idempotency-Key\` (UUID). The server stores this UUID in Redis; if it sees it again, it returns the *previous* success response instead of creating a new order.
5.  **GDPR**: This is a classic challenge. Solutions include "Crypto-shredding" (encrypting the user's data in the event and then deleting the key) or emitting a "UserDeleted" event that triggers a rewrite/compaction of the log.
6.  **Outbox**: No. The data is safe in the Outbox Table (on disk). When the Relay restarts, it will simply pick up where it left off.
7.  **Time**: "Event Time" is when the event actually happened in the real world (timestamped by the device). "Processing Time" is when the message actually hit your server. Network lag causes these to diverge.
8.  **Exactly-Once**: No. Kafka only guarantees exactly-once *state* inside Kafka. Sending an email is an external side-effect that Kafka cannot roll back. You must handle external idempotency separately (e.g., the email provider's API must support idempotency keys).
`
  }
];
