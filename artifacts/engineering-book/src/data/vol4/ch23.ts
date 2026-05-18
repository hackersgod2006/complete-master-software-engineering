import type { Section } from '../types';

export const CH23_SECTIONS: Section[] = [
  {
    id: "23-1",
    number: "23.1",
    title: "Why Caching Is the Highest-ROI Performance Investment",
    content: `In the world of system design, there is no tool more powerful, or more dangerous, than the **Cache**. Caching is the process of storing a copy of data in a high-speed storage layer (usually RAM) to serve future requests faster.

## The Performance Gap
The reason caching is so effective is the massive disparity in hardware speeds. Accessing data in **L1 Cache** takes ~1ns. Accessing data in **Main Memory (RAM)** takes ~100ns. Accessing data from a **Solid State Drive (SSD)** takes ~100,000ns. Accessing data over a **Network** from a database can take 1,000,000ns or more.

Caching isn't just a "speed up"; it's a 10,000x improvement in data access latency.

## The Return on Investment (ROI)
Caching is often the highest ROI (Return on Investment) engineering effort for two reasons:
1.  **Latency Reduction**: Users perceive a system as "instant" if it responds under 100ms. Caching moves slow database queries into the <10ms range.
2.  **Scalability / Cost**: A single Redis node can handle 100,000+ requests per second, whereas a relational database might struggle at 5,000. By caching popular items, you can shield your expensive database from 99% of the read load, allowing you to scale without buying massive database clusters.

## The Pareto Principle
Most systems follow the **80/20 Rule**: 80% of the traffic goes to 20% of the data (the "hot" keys). Caching these hot keys provides an outsized benefit for a relatively small storage cost.
`
  },
  {
    id: "23-2",
    number: "23.2",
    title: "Cache Taxonomy: Client, CDN, Application, Database",
    content: `Caching occurs at almost every layer of the modern technology stack. Understanding where to place a cache is as important as the cache itself.

## 1. Client-Side (Browser/Mobile)
The fastest request is the one that never leaves the user's device. Browsers cache static assets (JS, CSS, Images) and API responses based on HTTP headers. This reduces bandwidth costs and provides the best user experience.

## 2. CDN (Edge)
**Content Delivery Networks** like Cloudflare or Akamai place servers physically close to users. By caching assets at the "edge," you reduce the distance data must travel, overcoming the speed-of-light limitations of the internet.

## 3. Application Cache (Server-Side)
-   **Local Cache**: Data stored in the memory of the application process itself (e.g., a HashMap in Java or a dictionary in Python). Extremely fast but lost when the process restarts.
-   **Distributed Cache**: A separate service like **Redis** or **Memcached**. Multiple application nodes share the same cache. This is the standard for modern distributed systems.

## 4. Database Cache
Databases themselves have internal caches. PostgreSQL has its **Buffer Cache**, and MySQL has the **InnoDB Buffer Pool**. They keep frequently accessed disk pages in memory.

| Layer | Speed | Scope | Example |
| :--- | :--- | :--- | :--- |
| **Client** | < 1ms | Per User | Browser Cache |
| **CDN** | 10-50ms | Regional | Cloudflare |
| **App** | 1-5ms | Shared | Redis |
| **DB** | 5-20ms | Local to DB | Buffer Pool |
`
  },
  {
    id: "23-3",
    number: "23.3",
    title: "Cache-Aside, Write-Through, Write-Behind, Refresh-Ahead",
    content: `How does data get into the cache? The choice of strategy affects consistency, latency, and reliability.

## 1. Cache-Aside (Lazy Loading)
The most common pattern. The application code is responsible for checking the cache.
- **Read**: Check cache. If miss, read from DB, then write to cache.
- **Write**: Write to DB, then **invalidate** (delete) the cache key.
*Pro*: Flexible, resilient to cache failure. *Con*: Each miss results in 3 round trips.

## 2. Write-Through
The application treats the cache as the primary data store. The cache is responsible for writing to the DB.
- **Read/Write**: Always through the cache.
*Pro*: Cache is never stale. *Con*: Higher write latency (waits for DB write).

## 3. Write-Behind (Write-Back)
The application writes to the cache, which acknowledges immediately. The cache then writes to the DB asynchronously in the background.
- **Pro**: Insanely fast write performance. Great for heavy-write workloads like logging or gaming scores.
- **Con**: Risk of data loss if the cache node crashes before it persists to the DB.

## 4. Refresh-Ahead
The cache predicts which data will be needed soon and refreshes it from the DB *before* it expires.
- **Pro**: Eliminates latency for popular keys.
- **Con**: Hard to implement correctly; can lead to "ghost" load on the database.

\`\`\`python
# Cache-Aside Example
def get_user(user_id):
    user = cache.get(user_id)
    if user:
        return user # Cache Hit
    
    user = db.query("SELECT * FROM users WHERE id = ?", user_id) # Cache Miss
    cache.set(user_id, user, ttl=3600)
    return user
\`\`\`
`
  },
  {
    id: "23-4",
    number: "23.4",
    title: "Cache Invalidation: The Genuinely Hard Problem",
    content: `Phil Karlton famously said: *"There are only two hard things in Computer Science: cache invalidation and naming things."*

Invalidation is the process of removing data from the cache when the underlying source of truth (the DB) changes. If you fail at this, your users see old, "stale" data—like an "In Stock" message for a product that just sold out.

## Why it's Hard
In a distributed system, updates can happen on any node. Ensuring that *all* cache copies are updated simultaneously is a problem of **Distributed Consensus**.

## Invalidation Strategies
1.  **TTL (Time To Live)**: The simplest approach. Data expires after $X$ seconds. It's essentially "eventual consistency" by design.
2.  **Purge on Update**: When a record is updated in the DB, the application explicitly deletes the corresponding key in Redis.
3.  **Version-Based Invalidation**: Add a version number or timestamp to the key (e.g., \`user:123:v5\`). When data changes, you increment the version.
4.  **CDC (Change Data Capture)**: Tools like **Debezium** listen to the database's transaction log (WAL) and automatically send an invalidation message to the cache when a row changes.

**The Golden Rule**: When in doubt, delete. It is usually better to have a cache miss (slower but correct) than a cache hit with stale data (fast but wrong).
`
  },
  {
    id: "23-5",
    number: "23.5",
    title: "TTL Strategies and Stale-While-Revalidate",
    content: `Choosing a **TTL (Time To Live)** is a delicate balance. Too short, and the cache is useless. Too long, and the data is too stale.

## Dynamic TTLs
Not all data is created equal. A "News Article" might have a TTL of 5 minutes, while a "User's Profile Picture" could have a TTL of 24 hours. A "Stock Price" might only be cached for 1 second.

## Stale-While-Revalidate (SWR)
SWR is a sophisticated pattern that provides the speed of a cache hit without the penalty of a cache miss.
1.  The client requests data.
2.  If the cache is stale (expired), the cache *still returns the stale data* to the user immediately.
3.  In the background, the cache triggers a refresh to get fresh data for the *next* request.

This pattern is widely used in CDNs and modern frontend libraries like **Vercel's SWR** or **React Query**.

\`\`\`javascript
// SWR concept in a fetch wrapper
async function getWithSWR(key, fetcher) {
  const cached = cache.get(key);
  if (cached) {
    // Return stale immediately, but revalidate in background
    if (isExpired(cached)) {
      fetcher(key).then(fresh => cache.set(key, fresh));
    }
    return cached.data;
  }
  // Hard miss
  const fresh = await fetcher(key);
  cache.set(key, fresh);
  return fresh;
}
\`\`\`
`
  },
  {
    id: "23-6",
    number: "23.6",
    title: "Cache Stampede: The Thundering Herd Problem",
    content: `A **Cache Stampede** (or Thundering Herd) occurs when a high-traffic cache key expires. 

## The Scenario
Imagine a key like \`homepage_data\` that is requested 1,000 times per second. When the TTL hits zero, the next 1,000 requests all see a "Cache Miss" simultaneously. All 1,000 requests then hit the database at once to re-fetch the data. This can crash the database, causing a site-wide outage.

## Prevention Techniques
1.  **Locking (Mutex)**: The first request to see the miss acquires a lock. All other requests wait for the first one to populate the cache.
2.  **Promise Coalescing**: In Node.js or Go, you can ensure that only one function call is active for a given key at a time.
3.  **Probabilistic Early Expiration (PER)**: Instead of waiting for the TTL to hit 0, nodes randomly choose to "expire" the key slightly early (e.g., when 95% of the TTL is gone). This spreads the refresh load over time.
4.  **External Cron / Background Refresher**: Never let users trigger a refresh of a "hot" key. Have a background process that updates the cache every minute.

**Real-world impact**: In 2012, Facebook suffered an outage when a "hot" cache key expired, triggering a massive wave of DB queries that exceeded their capacity.
`
  },
  {
    id: "23-7",
    number: "23.7",
    title: "Cache Poisoning: Security Implications",
    content: `Caching isn't just a performance tool; it's a security surface. **Cache Poisoning** occurs when an attacker tricks a cache into storing a malicious or incorrect response, which is then served to other users.

## How it Works
Attackers exploit differences in how the cache and the application parse HTTP headers (like \`X-Forwarded-Host\`). 
1.  Attacker sends a request with a malicious header.
2.  The application generates a response containing an injected script (XSS) or a redirect to a phishing site.
3.  The CDN/Cache sees the request, thinks it's a standard page, and stores the malicious response.
4.  Legitimate users now receive the malicious content from the cache.

## Mitigation
-   **Strict Keying**: Ensure the cache key includes all headers that affect the response (e.g., \`Vary\` header).
-   **Normalize Headers**: Strip or sanitize suspicious headers at the load balancer before they reach the application.
-   **Don't Cache Error Pages**: By default, many systems cache 404s or 500s. An attacker can trigger an error and "poison" the cache with that error, making the site appear down for everyone.
`
  },
  {
    id: "23-8",
    number: "23.8",
    title: "Redis Deep Dive: Data Structures, Persistence, Clustering",
    content: `**Redis** (Remote Dictionary Server) is the industry standard for distributed caching. Unlike Memcached, which only stores strings, Redis is a "Data Structure Store."

## Core Data Structures
-   **Strings**: Basic key-value. Great for sessions and HTML fragments.
-   **Hashes**: Maps (fields to values). Perfect for storing user objects.
-   **Lists**: Linked lists. Used for message queues (LPUSH/RPOP).
-   **Sets**: Unsorted unique items. Used for "Friends List" or "Tags."
-   **Sorted Sets (ZSet)**: Unique items sorted by a score. Ideal for **Leaderboards** or **Rate Limiting**.

## Persistence
Redis is an in-memory database, but it can persist to disk:
-   **RDB (Redis Database)**: Point-in-time snapshots (e.g., every hour). Fast to load but risks losing the last hour of data.
-   **AOF (Append Only File)**: Logs every write operation. Much safer but results in larger files and slower recovery.

## Memory Management
Since RAM is expensive, Redis uses **Eviction Policies** when it runs out of space:
-   **LRU (Least Recently Used)**: Discards the least recently accessed keys.
-   **LFU (Least Frequently Used)**: Discards keys used the fewest times.
-   **Volatile-TTL**: Only evicts keys that have an expiration set.
`
  },
  {
    id: "23-9",
    number: "23.9",
    title: "Redis Sentinel and Redis Cluster",
    content: `Running a single Redis node is a Single Point of Failure (SPOF). To achieve high availability and horizontal scale, we use Sentinel or Cluster.

## Redis Sentinel
Sentinel provides **High Availability (HA)**. 
- It monitors a Primary node and several Replicas.
- If the Primary fails, Sentinel automatically promotes a Replica to Primary.
- The application (client) asks Sentinel "Who is the Primary right now?" before making a request.

## Redis Cluster
Cluster provides **Horizontal Scaling (Sharding)**. 
- Data is automatically split across multiple nodes using **Hash Slots**.
- There are 16,384 hash slots. \`slot = crc16(key) % 16384\`.
- Each node in the cluster is responsible for a subset of these slots.
- If you need more capacity, you add a node and "rebalance" the slots.

## The Trade-off
- **Sentinel**: Good for small to medium workloads where you need reliability but one machine can handle all the data.
- **Cluster**: Necessary when your dataset is larger than the RAM of a single server, or your request volume is massive.
`
  },
  {
    id: "23-10",
    number: "23.10",
    title: "Memcached vs Redis: The Real Comparison",
    content: `While Redis is more popular today, **Memcached** is still a highly effective tool.

| Feature | Memcached | Redis |
| :--- | :--- | :--- |
| **Data Types** | Strings Only | Strings, Hashes, Lists, Sets, etc. |
| **Threading** | Multi-threaded (scales with CPU cores) | Single-threaded (Event Loop) |
| **Persistence** | No (Memory only) | Yes (RDB/AOF) |
| **Replication** | No (Client-side sharding) | Yes (Built-in) |
| **Memory Policy** | LRU only | Multiple (LRU, LFU, Random) |

## When to use Memcached
Memcached is simpler and more performant for very large, simple key-value workloads. Because it is multi-threaded, it can outperform Redis on a single high-core-count machine for raw throughput of small strings.

## When to use Redis
Use Redis for almost everything else. Its rich data structures allow you to perform complex operations (like "Get the top 10 users") *inside* the cache, rather than fetching data and sorting it in your application.
`
  },
  {
    id: "23-11",
    number: "23.11",
    title: "CDN Caching: Cloudflare, Fastly, CloudFront",
    content: `A **CDN (Content Delivery Network)** is a distributed system of proxy servers. When a user in Tokyo requests a website hosted in New York, the CDN serves the content from a server in Tokyo.

## Static vs Dynamic Content
-   **Static**: Images, JS, CSS. Caching is easy and long-lived.
-   **Dynamic**: HTML pages, API responses. Caching is harder but often has the highest impact on perceived performance.

## The Edge Compute Revolution
Modern CDNs like **Fastly** (Varnish-based) and **Cloudflare** (Workers) allow you to run code at the edge. 
- You can perform A/B testing at the edge.
- You can check authentication tokens at the edge.
- You can transform images (resizing/webP conversion) at the edge.

## Purging
The biggest challenge with CDNs is the **Purge Latency**. When you update a blog post, it might take 60 seconds for that change to propagate to all 300+ edge locations globally. High-performance CDNs like Fastly offer "Instant Purge" (guaranteed < 150ms globally), allowing you to cache dynamic content more aggressively.
`
  },
  {
    id: "23-12",
    number: "23.12",
    title: "CPU Cache Optimization in Application Code",
    content: `Caching isn't just about Redis; it's also about how you write code to respect the **CPU Cache Hierarchy (L1, L2, L3)**.

## Cache Locality
CPUs don't read single bytes; they read **Cache Lines** (usually 64 bytes). If you access an array sequentially, the CPU "pre-fetches" the next few items into the L1 cache. This is **Spatial Locality**.

## Performance Impact
Consider these two ways to sum a 2D array:
-   **Row-Major**: Accessing \`arr[i][j]\` then \`arr[i][j+1]\`. (Very fast, respects cache lines).
-   **Column-Major**: Accessing \`arr[i][j]\` then \`arr[i+1][j]\`. (Slow, triggers "Cache Misses" as each access jumps to a different memory page).

\`\`\`c
// Fast: Sequential access
for(int i=0; i<rows; i++)
    for(int j=0; j<cols; j++)
        sum += array[i][j];

// Slow: Strided access
for(int j=0; j<cols; j++)
    for(int i=0; i<rows; i++)
        sum += array[i][j];
\`\`\`

In high-performance systems (HFT, Game Engines, Database Engines), **Data-Oriented Design** focuses on laying out data in memory specifically to maximize cache hits.
`
  },
  {
    id: "23-13",
    number: "23.13",
    title: "HTTP Caching: ETag, Last-Modified, Cache-Control",
    content: `The HTTP protocol has a built-in caching specification. Browsers and proxies use these headers to decide if they should request a file or use a local copy.

## Cache-Control
The most important header.
-   \`max-age=3600\`: Cache for 1 hour.
-   \`no-store\`: Never cache (sensitive data like bank balances).
-   \`public\`: Can be cached by shared proxies (CDNs).
-   \`private\`: Only the user's browser can cache.

## Conditional Requests (Validators)
If a cache has a file but it's expired, it can ask the server: "Has this changed?"
1.  **Last-Modified / If-Modified-Since**: Uses a timestamp.
2.  **ETag / If-None-Match**: Uses a unique hash of the content.

If the content hasn't changed, the server returns a **304 Not Modified**. The body is empty, saving bandwidth, and the client continues to use its cached version.

## The "Cache-Busting" Strategy
For static assets (like \`app.js\`), engineers often use a long TTL (1 year) and include a hash in the filename: \`app.a7f2b1.js\`. When the code changes, the filename changes, forcing a fresh download. This is the most reliable way to handle browser caching.
`
  },
  {
    id: "23-14",
    number: "23.14",
    title: "Case Study: Facebook's Memcached Architecture",
    content: `Facebook is the world's largest user of Memcached. They use it as a "Lookaside Cache" for their massive MySQL fleet.

## Scaling to Billions
To handle billions of users, Facebook developed several unique caching strategies:
1.  **McRouter**: A custom proxy that routes Memcached requests, handles failover, and supports complex hashing strategies.
2.  **Regional Pools**: They maintain separate cache pools for different data types. General-purpose data is stored in "Regional" pools, while highly specific data is stored in "Global" pools.
3.  **Lease Mechanism**: To solve the Thundering Herd and "Stale Set" problems, they use "leases." When a cache miss occurs, the server gives the client a lease ID. Only the client with the lease can update the cache with the new value from the DB.

## Lessons Learned
Facebook treats its cache as a first-class citizen, often as important as the database. Their architecture shows that at massive scale, the complexity of managing the cache (routing, invalidation, consistency) becomes a significant engineering challenge in its own right.
`
  },
  {
    id: "23-15",
    number: "23.15",
    title: "Case Study: The 2012 Facebook Thundering Herd",
    content: `In 2012, Facebook experienced a severe outage due to a "Cache Stampede" on a single, extremely high-traffic key.

## The Key
The key in question was a global configuration object used by almost every server in the fleet. It was cached with a TTL.

## The Failure
When the TTL expired, every server (tens of thousands of them) noticed the miss and attempted to re-fetch the config from the underlying backend system. The backend was immediately overwhelmed and crashed.

## The Solution
Facebook implemented **Probabilistic Early Expiration**. Instead of a fixed TTL of 600s, each server would calculate a random expiration between 570s and 600s. This ensured that different servers would refresh the key at slightly different times, spreading the load on the backend over 30 seconds instead of 1 millisecond.

This taught the industry that **Fixed TTLs are a hazard** in high-concurrency systems.
`
  },
  {
    id: "23-16",
    number: "23.16",
    title: "Exercises",
    content: `Test your understanding of Caching and performance optimization.

## Questions

1.  **The Memory Gap**: Why is caching still necessary if SSDs are becoming faster and faster?
2.  **Strategy Selection**: You are building a system for "Real-time Stock Ticker" prices. Which cache strategy is best: Cache-Aside or Write-Behind? Why?
3.  **TTL Calculation**: If your database can handle 100 queries per second, and you receive 1,000 requests per second, what is the *minimum* Cache Hit Ratio you need to survive?
4.  **The Purge Problem**: A user updates their profile picture, but the old one still shows up. The application code correctly deleted the Redis key. What else could be causing the staleness?
5.  **Redis vs Memcached**: When would you choose Memcached over Redis in a modern system?
6.  **Locality**: Explain why a linked list is generally slower to iterate over than a contiguous array of the same size, in terms of CPU caching.
7.  **Cache Poisoning**: How can "Cache-Control: private" help prevent certain types of cache poisoning?
8.  **Thundering Herd**: How does "Locking" help prevent a cache stampede, and what is the "downside" of using locks in this scenario?

## Answers

1.  **Memory Gap**: Even the fastest SSDs have latencies in the tens of microseconds, while RAM is in the nanoseconds. That's still a 1,000x difference. Furthermore, SSDs have limited write endurance compared to RAM.
2.  **Strategy**: Cache-Aside or Write-Through. Write-Behind is dangerous because losing a stock price update before it hits the DB could have financial legal implications.
3.  **Hit Ratio**: You need to offload at least 900 requests. $900 / 1000 = 90\%$. Your Cache Hit Ratio must be 90% or higher.
4.  **Staleness**: The browser cache or a CDN (Edge) cache. Deleting the Redis key only fixes the server-side cache.
5.  **Memcached**: When you have a massive, simple key-value workload that requires multi-core performance on a single node and you don't need Redis's complex data structures or persistence.
6.  **Locality**: An array is contiguous; the CPU can pre-fetch the next elements into L1/L2. A linked list has pointers to random memory addresses, causing a "Cache Miss" for nearly every step of the iteration.
7.  **Private**: "Private" ensures the content is only stored in the user's browser, not on a shared CDN edge. An attacker cannot "poison" the CDN for other users if the CDN is forbidden from caching that response.
8.  **Locking**: It ensures only one request hits the DB. The downside is that all other requests "block" (wait), which can increase latency and consume threads on the application server while they wait for the lock to release.
`
  }
];
