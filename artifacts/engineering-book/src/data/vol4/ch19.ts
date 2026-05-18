import type { Section } from '../types';

export const CH19_SECTIONS: Section[] = [
  {
    id: "19-1",
    number: "19.1",
    title: "The System Design Framework: Eight Steps",
    content: `System design is often perceived as a dark art, but in reality, it is a structured engineering process. When faced with a vague prompt like "Design Twitter," the goal isn't just to draw boxes; it's to demonstrate a rigorous approach to handling ambiguity and trade-offs. The **Eight-Step Framework** provides a repeatable mental model for any system design interview or real-world architectural proposal.

## 1. Clarify Requirements
Never start designing without knowing what you are building. You must identify the **core features** (Functional Requirements) and the **operating constraints** (Non-Functional Requirements). Ask questions: Who are the users? How many? What is the primary use case?

## 2. Back-of-the-Envelope Estimation
Estimate the scale. Determine the **QPS** (Queries Per Second), storage requirements, and bandwidth. This tells you if you need a single server or a massive distributed cluster. If your database needs to handle 100k writes per second, you know immediately that a standard single-node relational DB won't suffice.

## 3. API Design
Define the "contract" between the client and the server. Designing the **API endpoints** early helps solidify the functional requirements. Whether you use REST, GraphQL, or gRPC, the focus should be on clean resource definitions and necessary parameters.

## 4. Database Schema Design
Map out how the data will live. Decide between **SQL** and **NoSQL** based on the data relationships and scale requirements. Define the tables, primary keys, and indexes. This is the foundation upon which your logic will sit.

## 5. High-Level Design
Sketch the primary components: Load Balancers, Web Servers, Databases, and Caches. At this stage, you are just drawing the "happy path" flow of data through the system.

## 6. Deep Dive
Pick the most critical or challenging components and explore them in detail. If the system is "read-heavy," dive deep into your **caching strategy**. If it requires high availability, discuss **replication** and **failover**.

## 7. Identify Bottlenecks and Resolve
Every design has a weak point. Is the database a single point of failure? Is the network latency between data centers too high? This step is about **refinement** and introducing concepts like sharding, rate limiting, and monitoring.

## 8. Summary and Trade-offs
End by summarizing the final architecture. Be honest about the trade-offs. You might say, "We chose eventual consistency to ensure high availability during network partitions," acknowledging the **CAP theorem** implications.`
  },
  {
    id: "19-2",
    number: "19.2",
    title: "Requirements: Functional and Non-Functional",
    content: `In engineering, requirements are the "What" and the "How Well." A failure to distinguish between functional and non-functional requirements is a leading cause of architectural drift and project failure.

## Functional Requirements
These describe the **specific behaviors** of the system. They are the features the user interacts with.
- "Users can post a tweet."
- "Users can follow other users."
- "The system must send a push notification when a user is mentioned."

## Non-Functional Requirements (The 'ilities')
These describe the **constraints** and quality attributes of the system. In system design, these often dictate the entire architecture.
- **Scalability**: Can the system handle 100x growth in users?
- **Availability**: Can the system survive a data center outage? (e.g., "four nines" or 99.99% uptime).
- **Latency**: How fast must the response be? (e.g., P99 latency < 200ms).
- **Consistency**: Do all users need to see the same data at the exact same time?
- **Reliability**: Does the system ensure data is never lost?

## The Trade-off Matrix
Engineers live in a world of trade-offs. You rarely get both perfect consistency and 100% availability in a distributed system.
| Requirement | High Availability Focus | Strict Consistency Focus |
|-------------|-------------------------|--------------------------|
| **Database** | NoSQL (DynamoDB/Cassandra)| Relational (Postgres/MySQL)|
| **Pattern** | Eventual Consistency    | Strong Consistency       |
| **Cost**    | Higher (Redundancy)     | Higher (Latency/Locking) |

A senior engineer understands that "Performance is a feature." If a notification system is reliable but has a 10-minute delay, it has failed its functional purpose even if it meets its technical spec.`
  },
  {
    id: "19-3",
    number: "19.3",
    title: "Back-of-Envelope Estimation: The Numbers That Matter",
    content: `Back-of-envelope (BoE) estimation is the art of using rough calculations to validate a design's feasibility. You don't need a calculator; you need to understand the **orders of magnitude**.

## The Power of Two
In distributed systems, we often work with powers of 10 or 2. Knowing these approximations is vital:
- 2^10 ≈ 1,000 (Thousand/KB)
- 2^20 ≈ 1,000,000 (Million/MB)
- 2^30 ≈ 1,000,000,000 (Billion/GB)

## Converting Traffic to QPS
If a system has 100 million Daily Active Users (DAU) and each user makes 10 requests per day:
- Total Requests = 100M * 10 = 1 Billion requests per day.
- Seconds in a day ≈ 100,000 (86,400 to be exact).
- **Average QPS** = 1,000,000,000 / 100,000 = 10,000 QPS.
- **Peak QPS** = Average QPS * 2 (standard multiplier) = 20,000 QPS.

## Storage Estimation
If we store tweets that are 280 characters (roughly 300 bytes including metadata) for 100M users posting once a day:
- 100M * 300 bytes = 30 GB per day.
- For 5 years: 30 GB * 365 * 5 ≈ 55 TB.

## Why it Matters
These numbers tell you:
1. **Memory**: If your active data set fits in 100GB, you can use Redis. If it's 10TB, you need a disk-based solution with aggressive caching.
2. **Network**: If you are serving 1GB/s of video, you need a CDN; a single server's NIC will saturate.
3. **Database**: 10k QPS is manageable for a single Postgres instance with good hardware, but 500k QPS requires sharding.`
  },
  {
    id: "19-4",
    number: "19.4",
    title: "The Latency Table: Memorize This Forever",
    content: `Every software engineer must have a "feel" for how long operations take. Without this intuition, you cannot optimize effectively. These numbers, popularized by Jeff Dean, illustrate the massive gaps between different computer operations.

## The Latency Numbers (Approximate)
| Operation | Time (ns) | Time (Human Scale) |
|-----------|-----------|--------------------|
| L1 Cache reference | 0.5 ns | 0.5 sec |
| L2 Cache reference | 7 ns | 7 sec |
| Main memory reference (RAM) | 100 ns | 100 sec |
| Send 1K bytes over 1 Gbps network | 10,000 ns | 2.7 hrs |
| Read 1 MB sequentially from RAM | 250,000 ns | 2.9 days |
| Read 1 MB sequentially from SSD | 1,000,000 ns | 11.6 days |
| Round trip within same datacenter | 500,000 ns | 5.8 days |
| Read 1 MB sequentially from HDD | 20,000,000 ns | 7.7 months |
| Send packet CA -> Netherlands -> CA | 150,000,000 ns | 4.8 years |

## Key Insights
1. **Memory vs. Disk**: RAM is roughly 10,000x faster than Disk (HDD) and 10x-100x faster than SSD. This is why **caching** is the first line of defense in performance tuning.
2. **The Network Cost**: A network round trip within a datacenter is 5,000x slower than a RAM access. This implies that "chunky" APIs (returning more data in one call) are often better than "chatty" APIs (multiple small calls).
3. **Physical Distance**: Light in glass travels at roughly 200,000 km/s. The physical distance between your user and your server is a hard physical limit on latency. No amount of code optimization can beat the speed of light; this is why we use **Edge Computing** and CDNs.`
  },
  {
    id: "19-5",
    number: "19.5",
    title: "Scalability Estimation: QPS, Storage, Bandwidth",
    content: `Scalability is the ability of a system to handle increased load by adding resources. Estimation is the precursor to capacity planning.

## Calculating Query Per Second (QPS)
Start with user activity.
- **DAU**: 500 Million.
- **Reads**: Each user views 20 items per day.
- **Writes**: Each user creates 1 item per day.
- **Total Reads**: 500M * 20 = 10 Billion/day.
- **Total Writes**: 500M * 1 = 500 Million/day.
- **Read QPS**: 10B / 86400 ≈ 115,000 QPS.
- **Write QPS**: 500M / 86400 ≈ 5,800 QPS.

## Storage Capacity
Identify the "warm" data vs the "cold" data.
- **Post object**: ID (8 bytes), AuthorID (8 bytes), Content (avg 200 bytes), Timestamp (8 bytes). Total ≈ 224 bytes.
- **Daily Storage**: 500M writes * 224 bytes ≈ 112 GB/day.
- **Annual Storage**: 112 GB * 365 ≈ 40 TB/year.

## Bandwidth Estimation
Bandwidth is usually measured in bits per second, but we calculate in bytes first.
- **Incoming**: 5,800 writes/sec * 224 bytes ≈ 1.3 MB/s.
- **Outgoing**: 115,000 reads/sec * 224 bytes ≈ 25.7 MB/s.
- If the system involves media (images/video), the bandwidth requirements explode. A 2MB image per read would require 115,000 * 2MB = 230 GB/s, which requires a highly distributed CDN architecture.

## RAM for Caching
A common rule of thumb is the **80/20 rule**: 20% of the data generates 80% of the traffic.
- If we want to cache 20% of the daily read traffic:
- 10 Billion reads/day * 20% * 224 bytes ≈ 448 GB of RAM.
- This is achievable with a cluster of a few large Redis nodes (e.g., 4 nodes with 128GB RAM each).`
  },
  {
    id: "19-6",
    number: "19.6",
    title: "API Design: REST, GraphQL, gRPC — Deep Comparison",
    content: `The choice of API protocol defines how services talk and how developers interact with your system.

## REST (Representational State Transfer)
The industry standard. Uses HTTP verbs (GET, POST, PUT, DELETE) and is stateless.
- **Pros**: Wide support, easily cacheable at the HTTP level (CDNs, Varnish), human-readable (JSON).
- **Cons**: Over-fetching (getting fields you don't need) and Under-fetching (needing multiple calls to get related data).

## GraphQL
A query language for APIs developed by Facebook.
- **Pros**: Client defines exactly what data it wants. Great for complex frontend applications with nested data.
- **Cons**: Harder to cache (usually uses POST for everything), "N+1" query problem on the backend if not handled with DataLoader, query complexity risks (users can write expensive queries).

## gRPC (Google Remote Procedure Call)
Uses **Protocol Buffers** (binary serialization) and HTTP/2.
- **Pros**: Extremely fast and efficient (binary is smaller than JSON), strongly typed, supports streaming (uni-directional and bi-directional).
- **Cons**: Not easily readable by humans (requires tooling), limited browser support (requires gRPC-web), stricter contract management.

## Comparison Table
| Feature | REST | GraphQL | gRPC |
|---------|------|---------|------|
| **Format** | JSON | JSON | Protocol Buffers (Binary) |
| **Contract** | OpenAPI/Swagger | Schema (SDL) | .proto files |
| **Caching** | Excellent (HTTP) | Difficult | Difficult |
| **Typical Use** | Public APIs | Mobile/Web Frontends | Microservices/Internal |

## Best Practice: Which one to use?
For external public APIs, stick to **REST**. For complex data requirements in a React/Mobile app, use **GraphQL**. For internal high-performance microservice communication, **gRPC** is the winner.`
  },
  {
    id: "19-7",
    number: "19.7",
    title: "API Versioning Strategies",
    content: `In a distributed system, you cannot force all clients to upgrade simultaneously. Versioning is how you maintain backward compatibility while evolving your system.

## 1. URI Versioning
The most common approach. The version is part of the URL path.
\`\`\`http
GET /v1/users/123
GET /v2/users/123
\`\`\`
- **Pros**: Easy to implement, visible in logs, easy to cache via CDN.
- **Cons**: "Pollutes" the URI space.

## 2. Header Versioning (Accept Header)
Using the \`Accept\` header or a custom header like \`X-API-Version\`.
\`\`\`http
Accept: application/vnd.myapi.v1+json
\`\`\`
- **Pros**: Keeps URLs clean (REST purist approach).
- **Cons**: Harder to test in browsers, complicates CDN caching (requires \`Vary: X-API-Version\`).

## 3. Parameter Versioning
Adding a query string.
\`\`\`http
GET /users/123?version=2
\`\`\`
- **Pros**: Simple to implement.
- **Cons**: Can be easily missed or stripped by some proxies.

## The Sunset Strategy
Never release a new version without a plan to kill the old one.
1. **Notify**: Use headers like \`Warning: 299 - "This version is deprecated"\`.
2. **Monitor**: Track usage of the old version.
3. **Brownout**: Intentionally take the old version down for short periods to alert remaining users.
4. **Sunset**: Final decommission.

## Rule of Thumb
Only introduce a new version when there is a **breaking change** (removing a field, changing a data type, changing the logic of a resource). Adding a field is NOT a breaking change for well-designed clients.`
  },
  {
    id: "19-8",
    number: "19.8",
    title: "Idempotency: The Foundation of Safe Retries",
    content: `In distributed systems, networks are unreliable. A request might reach the server and succeed, but the acknowledgment might fail. The client will retry. If the operation is "charging a credit card," you must ensure that retrying doesn't charge the user twice. This is **Idempotency**.

## Definition
An operation is idempotent if performing it multiple times has the same effect as performing it once.
- \`GET /user/1\` is idempotent.
- \`DELETE /post/100\` is idempotent (the post is gone either way).
- \`POST /orders\` (without an ID) is **NOT** idempotent.

## Implementing Idempotency with Keys
The standard way to handle non-idempotent operations (like creating an order) is an **Idempotency Key**.
1. Client generates a unique UUID for the operation.
2. Client sends \`X-Idempotency-Key: <UUID>\` in the header.
3. Server checks if this key exists in its database (or Redis).
4. If it exists, return the **cached result** of the first successful operation.
5. If it doesn't, process the request and store the result with the key.

## Code Pattern (Pseudo-code)
\`\`\`python
def process_payment(idempotency_key, amount):
    # Atomic Check-and-Set
    existing_record = db.get_idempotency_record(idempotency_key)
    if existing_record:
        return existing_record.response

    # Process actual payment
    result = stripe.charge(amount)
    
    # Store result
    db.save_idempotency_record(idempotency_key, result)
    return result
\`\`\`

## Critical Note
The idempotency key store must be as reliable as your primary database. If you lose the keys, you risk duplicate operations. Typically, these keys have an **expiration** (e.g., 24 hours), after which retries are treated as new requests.`
  },
  {
    id: "19-9",
    number: "19.9",
    title: "Rate Limiting: Token Bucket, Leaky Bucket, Sliding Window",
    content: `Rate limiting protects your services from being overwhelmed by too many requests, whether from a malicious DDoS attack or a "noisy neighbor" in a multi-tenant system.

## 1. Token Bucket
The most popular algorithm (used by AWS and Stripe).
- Imagine a bucket that holds up to \`N\` tokens.
- Tokens are added at a fixed rate (e.g., 10 tokens/second).
- Each request consumes 1 token.
- If no tokens are left, the request is rejected (HTTP 429).
- **Pros**: Allows for **bursts** of traffic while maintaining a long-term average.

## 2. Leaky Bucket
- Imagine a bucket with a small hole at the bottom.
- Requests enter at any rate, but "leak" out (are processed) at a constant rate.
- If the bucket overflows, new requests are dropped.
- **Pros**: Smooths out traffic, providing a very steady processing rate.

## 3. Fixed Window Counter
- Divide time into fixed windows (e.g., 1 minute).
- Each window has a counter.
- **Cons**: The "Edge Case." If a user sends 100 requests at 11:59:59 and 100 requests at 12:00:01, they effectively sent 200 requests in 2 seconds, potentially overwhelming the system.

## 4. Sliding Window Log / Counter
- A more sophisticated version that tracks the exact timestamps of requests or maintains sub-window counts.
- **Pros**: Eliminates the edge case of fixed windows.
- **Cons**: More memory-intensive.

## Distributed Rate Limiting
In a cluster, you can't store the count in local memory. You must use a central store like **Redis**.
- Use \`INCR\` and \`EXPIRE\` for Fixed Window.
- Use **Lua scripts** in Redis to ensure that "Check-and-Increment" operations are atomic, preventing race conditions where multiple requests might bypass the limit.`
  },
  {
    id: "19-10",
    number: "19.10",
    title: "Case Study: Design a URL Shortener (tinyurl)",
    content: `Designing a URL shortener is the "Hello World" of system design. It touches on encoding, database selection, and redirection.

## 1. Requirements
- **Functional**: Shorten a long URL, redirect a short URL to the original, custom aliases.
- **Non-Functional**: High availability, low latency, URLs should be unguessable.

## 2. Capacity Estimation
- **Writes**: 100M URLs per month.
- **Reads**: 100:1 read/write ratio = 10B redirects per month.
- **QPS**: 10B / (30 * 86400) ≈ 3,800 QPS.
- **Storage**: 100M * 500 bytes (URL + metadata) = 50 GB per month.

## 3. The Shortening Algorithm
How do we generate a 7-character code? We use **Base 62** ([a-z, A-Z, 0-9]).
- 62^7 ≈ 3.5 trillion unique combinations.
- **Method A: Hashing (MD5/SHA)**. Hash the URL and take the first 7 chars. Problem: Collisions.
- **Method B: Counter (Base Conversion)**. Use a distributed counter (e.g., Zookeeper or a DB auto-increment). Convert the counter number (e.g., 10,000,000) to Base 62.

## 4. The Architecture
1. **Write Path**: Client -> Load Balancer -> Web Server -> Base62 Conversion -> Database (Store Long URL + Short Key) -> Cache.
2. **Read Path**: Client -> Load Balancer -> Web Server -> Check Cache -> (If miss) Check DB -> Redirect (HTTP 301 or 302).

## 5. 301 vs 302 Redirect
- **301 (Permanent)**: Browser caches the redirect. Reduces server load but prevents you from collecting analytics on every click.
- **302 (Temporary)**: Browser asks the server every time. Better for analytics.

## 6. Optimization
Since reads are 100x writes, use a **Global Cache** (Redis). Most people only click recent links. A LRU (Least Recently Used) cache policy will be highly effective here.`
  },
  {
    id: "19-11",
    number: "19.11",
    title: "Case Study: Design Twitter/X",
    content: `Twitter presents the unique challenge of "Fan-out" — how to deliver a single tweet to millions of followers in real-time.

## 1. Requirements
- **Functional**: Tweet, Follow, Home Timeline, User Timeline.
- **Non-Functional**: Highly available, low latency for timeline generation (eventual consistency is okay).

## 2. The Timeline Problem
There are two ways to build a timeline:
- **Pull Model (Fan-out on Load)**: When a user refreshes their timeline, the system fetches all tweets from people they follow and sorts them by time.
  - *Problem*: Extremely slow for users following thousands of people.
- **Push Model (Fan-out on Write)**: When you post a tweet, the system immediately pushes it into the "Timeline Cache" (Redis) of every follower.
  - *Problem*: Celebrity tweets (like Elon Musk) would require pushing to 100M+ caches, which can take minutes.

## 3. The Hybrid Approach
Modern Twitter uses a hybrid:
1. **Regular Users**: Use Push model. Post a tweet, fan out to followers' Redis lists.
2. **Celebrities (High Fan-out)**: Use Pull model. Their tweets are NOT pushed. When a follower views their timeline, the system pulls the celebrity's tweets and merges them with the cached timeline.

## 4. Data Storage
- **Tweets**: NoSQL (Cassandra/DynamoDB) for high-volume writes and horizontal scaling.
- **Social Graph (Follows)**: Graph Database (Neo4j) or a relational DB with a dedicated index on \`(follower_id, followee_id)\`.
- **Timelines**: Redis clusters storing the TweetIDs for the last 100-500 tweets of a user.

## 5. Feed Ranking
Moving from a chronological feed to an algorithmic one involves a **Scoring Service**. This service takes the candidate tweets, runs them through a machine-learning model (considering engagement, recency, and relevance), and returns a ranked list. This is often done asynchronously to keep latency low.`
  },
  {
    id: "19-12",
    number: "19.12",
    title: "Case Study: Design YouTube",
    content: `YouTube is fundamentally a **Content Delivery** and **Video Processing** problem.

## 1. Requirements
- **Functional**: Upload video, stream video, search, comment.
- **Non-Functional**: Reliability (don't lose videos), Availability, Low Latency for playback.

## 2. The Upload Pipeline
Uploading a raw video is just the start.
1. **Blob Storage**: Raw video is stored (e.g., GCS or S3).
2. **Transcoding**: The video must be converted into multiple resolutions (1080p, 720p, 360p) and formats (HLS, DASH) for different devices and network speeds.
3. **Queueing**: Use a message queue (Kafka/RabbitMQ) to manage transcoding tasks.
4. **Metadata**: Video title, description, and tags go into a Relational DB for search indexing.

## 3. Video Streaming
Streaming doesn't involve downloading the whole file. It uses **Adaptive Bitrate Streaming**.
- The video is split into small chunks (2-5 seconds).
- The client (browser/app) requests chunks one by one.
- If the network slows down, the client automatically asks for a lower-resolution chunk.

## 4. CDN (The Core)
You cannot serve global video traffic from one data center.
- **Content Delivery Network**: Place video chunks as close to the user as possible (ISP data centers).
- **Popularity-based Caching**: Not all videos can be in the CDN. Popular videos stay at the "edge," while obscure ones are fetched from the "origin" storage.

## 5. Storage Efficiency
Videos are huge.
- **Deduplication**: If two users upload the exact same file, only store it once.
- **Cold Storage**: Move old, unpopular videos to cheaper, slower storage tiers (Google Coldline / AWS Glacier).`
  },
  {
    id: "19-13",
    number: "19.13",
    title: "Case Study: Design a Ride-Sharing Service (Uber)",
    content: `Uber is a **Geospatial** problem involving real-time tracking and matching.

## 1. Requirements
- **Functional**: Request ride, track driver, update location.
- **Non-Functional**: Ultra-low latency for location updates, high consistency for matching (no double-booking).

## 2. Geospatial Indexing
How do you find the closest drivers? A standard SQL query \`SELECT * FROM drivers WHERE lat BETWEEN ... AND long BETWEEN ...\` is too slow for millions of updates.
- **Quadtrees**: A tree structure where each node has four children, representing a quadrant of a map. If a quadrant has too many drivers, it splits into four smaller ones.
- **Google S2 / Uber H3**: Libraries that divide the world into hexagonal or rectangular cells. Each cell has a unique ID. Finding a driver becomes a simple key-value lookup of the cell ID.

## 3. The Dispatch System
1. **Driver Location**: Drivers send GPS updates every few seconds via **WebSockets** (for bi-directional low latency).
2. **Location Store**: An in-memory store (Redis/Peloton) holds the latest \`(driver_id, last_cell_id)\`.
3. **Matching**: When a rider requests a ride, the system finds all drivers in the nearby cells, filters for availability, and uses a ranking algorithm (ETA, rating) to pick one.

## 4. Payment and Consistency
Matching must be **Atomic**. Use a distributed lock or a transactional database to ensure two riders aren't matched with the same driver simultaneously.

## 5. Handling Surge
Surge pricing is calculated based on the ratio of riders to drivers in a specific cell. This is a real-time stream processing task (using Flink or Spark Streaming) that updates price multipliers every minute.`
  },
  {
    id: "19-14",
    number: "19.14",
    title: "Case Study: Design a Distributed Chat System (WhatsApp)",
    content: `WhatsApp's primary challenge is maintaining **stateful connections** and ensuring message delivery across multiple devices.

## 1. Requirements
- **Functional**: 1-on-1 chat, Group chat, Read receipts, Last seen.
- **Non-Functional**: Real-time delivery, high availability, end-to-end encryption.

## 2. Connection Management
HTTP is request-response. Chat needs "Push."
- **WebSockets**: Maintain a persistent TCP connection between the client and the **Chat Server**.
- **Connection Service**: A fleet of servers handling millions of open sockets. Because servers have limits (usually 64k connections per IP, but practically much more with tuning), you need a load balancer that supports sticky sessions or a service registry to know which server holds the connection for \`User A\`.

## 3. Message Flow
1. **User A** sends message to **Chat Server**.
2. **Chat Server** writes message to **Store** (Cassandra is great for this sequence-heavy data).
3. **Chat Server** looks up **User B**'s connection.
4. If **User B** is online, push via WebSocket.
5. If **User B** is offline, send a **Push Notification** (FCM/APNS).

## 4. Group Chats
Group chats are more complex. For a group of 100, one message must be sent 99 times.
- **Optimization**: For small groups, the sender's server can handle the fan-out.
- **Large Groups**: Use a message queue. The message is put on a "Group Topic," and a background worker handles the delivery to all members.

## 5. Read Receipts
Read receipts are just another message type. When User B renders the message, the app sends a \`read_ack\` back to the server, which then notifies User A. This is why "Seen" often has a slight lag compared to the message arrival.`
  },
  {
    id: "19-15",
    number: "19.15",
    title: "Case Study: Design a Web Crawler",
    content: `A web crawler (like Googlebot) is a massive **Distributed Task Queue** system.

## 1. Requirements
- **Functional**: Given a set of seed URLs, crawl the web and store the content.
- **Non-Functional**: Scalability (billions of pages), Politeness (don't DDoS websites), Robustness (handle broken links, traps).

## 2. The Workflow
1. **URL Frontier**: A prioritized queue of URLs to be crawled.
2. **Fetcher**: Downloads the HTML content.
3. **Parser**: Extracts text and links.
4. **Content Filter/Deduper**: Checks if we've already crawled this content (using **Fingerprinting** or SimHash).
5. **URL Filter/Deduper**: Checks if the extracted links are already in the Frontier or already crawled (using a **Bloom Filter**).

## 3. Politeness
The crawler must respect \`robots.txt\` and never hit the same domain too fast.
- **Solution**: Use a mapping of \`Domain -> Worker Queue\`. Each worker queue processes one domain at a time with a delay between requests.

## 4. Handling Scale
- **Storage**: Use a NoSQL database (BigTable/HBase) to store the "Web Graph" (which pages link to which).
- **DNS Resolver**: Standard DNS is too slow for billions of requests. The crawler needs a local, high-performance DNS caching layer.
- **Priority**: Not all pages are equal. Use PageRank or update frequency to decide which URLs in the Frontier to crawl first.

## 5. Traps and Cycles
"Spider traps" are infinite URL loops (e.g., \`site.com/a/b/a/b...\`). The crawler must detect these by tracking the depth of the crawl or using heuristic analysis of the URL structure.`
  },
  {
    id: "19-16",
    number: "19.16",
    title: "Case Study: Design a Notification System",
    content: `A notification system must handle multiple channels (Push, Email, SMS) and ensure delivery even under high load.

## 1. Requirements
- **Functional**: Send notifications, support multiple providers (SendGrid, Twilio, FCM).
- **Non-Functional**: Reliability (at-least-once delivery), Scalability, Extensibility.

## 2. High-Level Architecture
1. **API Service**: Internal services call this to send a notification.
2. **Validator/Prioritizer**: Checks if the request is valid and assigns priority (e.g., OTPs have higher priority than marketing emails).
3. **Message Queue**: Decouples the API from the heavy lifting of sending. Use Kafka for high throughput and persistence.
4. **Workers**: Pull from the queue, format the message (using templates), and call the 3rd party provider.

## 3. Handling Failure
3rd party providers fail frequently.
- **Retry Mechanism**: If an SMS fails, put it back in a "Retry Queue" with **Exponential Backoff**.
- **Dead Letter Queue (DLQ)**: If a message fails 5 times, move it to a DLQ for manual inspection.

## 4. Rate Limiting and Deduplication
- **Rate Limiting**: Don't annoy users. Limit "Marketing" notifications to 1 per day.
- **Deduplication**: Prevent sending the same notification twice due to network retries. Use an **Idempotency Key** from the upstream service.

## 5. User Preferences
The system must check a "Settings Database" before sending. Does the user have "Email Notifications" turned off? This check should happen at the Worker level to ensure it's the most up-to-date state.`
  },
  {
    id: "19-17",
    number: "19.17",
    title: "Case Study: Design an Autocomplete System",
    content: `Autocomplete (Search Suggestions) is a **latency-critical** system. Users expect suggestions within 10-20ms of typing.

## 1. Requirements
- **Functional**: Return top 10 suggestions based on prefix.
- **Non-Functional**: Ultra-low latency, highly available, suggestions should be relevant/popular.

## 2. Data Structure: The Trie
A **Trie (Prefix Tree)** is the ideal structure. Each node represents a character.
- To find suggestions for "cat", you traverse to the "t" node and explore all children.
- **Optimization**: Storing the top 10 suggestions *at every node* avoids the need to traverse all the way down during a search. This makes the search O(1) relative to the length of the prefix.

## 3. Data Update Pipeline
The trie is too large for a single machine and needs to be updated as new searches become popular.
1. **Analytics Logs**: Capture search queries.
2. **Aggregator**: Use MapReduce or Spark to count query frequencies (e.g., "how many times was 'coffee' searched today?").
3. **Trie Builder**: Build a new trie weekly/daily based on aggregated data.
4. **Trie Cache**: Deploy the trie to an in-memory store.

## 4. Scaling the Trie
- **Sharding**: Divide the trie by prefix. One server handles 'a-m', another 'n-z'.
- **Replication**: Use multiple read replicas of the trie to handle high QPS.

## 5. Personalization and Context
Standard autocomplete uses global popularity. Advanced systems incorporate:
- **Location**: "Coffee" in Seattle might suggest "Starbucks," while in Rome it suggests "Espresso."
- **User History**: Suggesting things the user recently searched for. These are merged with the global suggestions at the application layer.`
  },
  {
    id: "19-18",
    number: "19.18",
    title: "Exercises",
    content: `Test your mastery of system design principles with these exercises.

## Questions
1. **Latency Analysis**: Why is a 302 redirect often preferred over a 301 for a URL shortener despite the extra latency?
2. **Scaling**: If your database is handling 15,000 QPS and starting to lag, but your data fits in memory, what is the first optimization you should try?
3. **Availability**: Calculate the total downtime allowed per year for a system with "Five Nines" (99.999%) availability.
4. **Rate Limiting**: Why is the Token Bucket algorithm preferred over Fixed Window for public APIs?
5. **Caching**: Explain the "Thundering Herd" problem and how to prevent it.
6. **API Design**: When would you choose gRPC over REST for an internal microservice?
7. **Storage**: You need to store 500TB of video files. Which storage type do you use?
8. **Twitter Design**: Why is "Fan-out on write" problematic for celebrities, and how do we fix it?

## Answers
1. **302 Redirect**: It allows the server to receive every click request, enabling real-time analytics. 301 is cached by the browser, so the server only sees the first click.
2. **Optimization**: Implement a **Read Replica** or a **Cache (Redis)**. Since the data fits in memory, Redis will offload the read QPS from the DB.
3. **Five Nines**: 0.00001 * 365.25 * 24 * 60 = **5.26 minutes** of downtime per year.
4. **Token Bucket**: It allows for traffic bursts. If a user has been idle, they can use their accumulated "tokens" all at once, which is a common pattern in web usage.
5. **Thundering Herd**: Occurs when a cached item expires and thousands of simultaneous requests all hit the database at once. **Prevention**: Use a "Mutex Lock" so only one request updates the cache, or add "Jitter" to expiration times.
6. **gRPC vs REST**: Choose gRPC when performance and bandwidth are critical, and when you want strong typing between services via Protobuf.
7. **Storage**: **Object Storage** (like AWS S3 or GCS). It is designed for massive scale and unstructured data.
8. **Fan-out**: Celebrities have millions of followers. Pushing a tweet to millions of Redis timelines simultaneously creates massive lag. **Fix**: Use a hybrid model where celebrity tweets are pulled (merged) at read-time by the follower.`
  }
];
