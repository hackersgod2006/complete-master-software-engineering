import type { Section } from '../types';

export const CH14_SECTIONS: Section[] = [
  {
    id: "14-1",
    number: "14.1",
    title: "The Performance Mindset: Measure First, Always",
    content: `The first rule of **Performance Engineering** is: "Don't guess." Human intuition is remarkably bad at identifying bottlenecks in complex systems. We often spend days optimizing a function that accounts for only 0.1% of execution time, while ignoring the 90% bottleneck right next to it.

## The Measurement-Driven Cycle
Performance engineering is a scientific process:
1. **Establish a Baseline**: Measure the system as it is.
2. **Profile**: Use tools to find where the time or resources are actually going.
3. **Hypothesize**: Formulate a theory about why a specific part is slow.
4. **Experiment**: Apply an optimization.
5. **Verify**: Measure again. If the baseline didn't improve significantly, **discard the change**.

## The Trap of Premature Optimization
Donald Knuth famously said, "Premature optimization is the root of all evil." This doesn't mean you should write slow code. It means you shouldn't add complexity (like custom caching or assembly code) until you have evidence that it's necessary. Clean, readable code is often easier for a compiler or JIT (Just-In-Time) engine to optimize anyway.

## Amdahl's Law
Amdahl's Law provides the mathematical limit of any optimization. If you optimize a part of a program that takes 10% of the time to be 10x faster, the total speedup is only about 9%. If you optimize the part that takes 80% to be 2x faster, the total speedup is 40%. **Focus on the 80%.**

---
**Key Insight**: Performance is a feature, but it's often the most expensive feature to implement. Always ask: "What is the performance budget for this operation?" If 100ms is acceptable and you're at 80ms, your time is better spent elsewhere.`
  },
  {
    id: "14-2",
    number: "14.2",
    title: "Profiling Tools: cProfile, perf, VisualVM, pprof, async-profiler",
    content: `A **Profiler** is a tool that monitors your program's execution and records how much time and resources each part consumes.

## Sampling vs. Instrumentation
- **Instrumentation**: The profiler modifies your code (or the bytecode) to record every single function entry and exit. This is highly accurate but adds significant overhead (often 10x slower), which can distort results.
- **Sampling**: The profiler periodically (e.g., 100 times per second) interrupts the CPU to see what function is currently running. This has very low overhead (1-5%) and is usually sufficient for finding bottlenecks.

## The Toolbelt
- **Python (cProfile)**: A built-in deterministic profiler. Good for finding which Python functions are slow, but doesn't see into C extensions or the kernel.
- **Linux (perf)**: The "Gold Standard" for system-level profiling. It can profile anything from application code to the Linux kernel itself. It uses CPU hardware counters.
- **JVM (VisualVM, async-profiler)**: \`async-profiler\` is essential for Java because it avoids the "Safepoint Bias" that plagues older JVM profilers, providing an accurate view of where the JIT is spending time.
- **Go (pprof)**: Built directly into the Go runtime. It provides CPU, heap, and goroutine profiling with minimal setup.

## When to Profile?
Profile in an environment that matches production as closely as possible. Profiling on a MacBook with 8 cores and 64GB of RAM will give very different results than a t3.micro instance in AWS. Always use "Production-like" data; logic that is fast with 10 items may behave very differently with 10 million.`
  },
  {
    id: "14-3",
    number: "14.3",
    title: "Flame Graphs: Reading and Acting on Profiles",
    content: `Invented by Brendan Gregg, **Flame Graphs** are a visualization of profiled software, allowing the most frequent code-paths to be identified quickly and accurately.

## How to Read a Flame Graph
- **Each Box**: Represents a function in the stack.
- **Width**: The width of a box indicates the total time spent in 그 function and its children (ancestry). The wider the box, the more time spent.
- **Y-Axis**: Represents stack depth (the call chain).
- **X-Axis**: Does NOT represent time. The functions are sorted alphabetically to maximize "merging" of similar paths.
- **Color**: Usually random or used to differentiate types of code (e.g., Java vs. Kernel).

## Identifying the "Plateau"
Look for wide boxes at the top of a stack. This is "Self Time"—time the function spent doing work itself rather than calling other functions. If you see a wide box at the bottom that narrows quickly, that function is just a "dispatcher" and isn't the bottleneck.

## Acting on the Data
1. **Find the Wide Peaks**: Start with the widest boxes.
2. **Analyze the Ancestry**: Why is this function being called so much? Can you cache the result? Can you call it once for a batch of items?
3. **Drill Down**: Most profilers allow you to click a box to "zoom in" and see exactly what's happening inside that stack.

Flame graphs turn thousands of lines of raw profiling data into a map. Without a map, you're just wandering in the dark.`
  },
  {
    id: "14-4",
    number: "14.4",
    title: "Benchmarking: Methodology and Pitfalls",
    content: `A **Benchmark** is a controlled test used to measure the performance of a specific piece of code. Writing a good benchmark is surprisingly difficult.

## The Pitfalls of "Microbenchmarking"
Microbenchmarks measure very small snippets of code (like a single loop). They are often misleading because:
- **Dead Code Elimination**: A clever compiler might see that your benchmark doesn't use the result of a calculation and delete the entire code being tested, resulting in "0.00ns" execution time.
- **Inlining**: The compiler might inline the function into the benchmark loop, which wouldn't happen in real code.
- **Cache Effects**: A microbenchmark might fit entirely in the L1 cache, while real-world usage involves L3 or main memory.

## Methodology for Accurate Benchmarking
1. **Warmup**: Run the code several thousand times before measuring to allow the JIT to optimize.
2. **Statistical Significance**: Run the benchmark many times and report the **Median** and **99th Percentile (p99)**, not just the Mean. The Mean is easily skewed by background system noise.
3. **Prevent Optimization**: Ensure the result of the code under test is used (e.g., return it or pass it to a "Black Hole" function).
4. **Environment Control**: Disable "Turbo Boost" on the CPU and close other applications to ensure consistent clock speeds.

## Tools
- **Java**: JMH (Java Microbenchmark Harness) - the industry standard.
- **Go**: Built-in \`testing\` package with \`Benchmark\` functions.
- **Rust**: Criterion.rs.
- **JS**: Benchmark.js or the built-in test runners in Node/Deno.`
  },
  {
    id: "14-5",
    number: "14.5",
    title: "JIT Warm-Up Effects: Why Benchmarks Lie",
    content: `Modern languages like Java, C#, and JavaScript (V8) use **Just-In-Time (JIT) Compilation**. When your program starts, it is interpreted (slow). As functions are called repeatedly, the JIT identifies "hot" spots and compiles them into optimized machine code.

## The Tiered Compilation Process
1. **Interpreter**: Starts immediately, no overhead, slow execution.
2. **Tier 1 (Baseline)**: Quick compilation, minor optimizations.
3. **Tier 2 (Optimizing)**: Deep optimization (inlining, loop unrolling), but takes time to compile.

## Why This Matters for Performance
If you measure your application immediately after startup, you are measuring the "Cold" performance. In production, your app might run for weeks, meaning you care about the "Warm" performance.

## The De-optimization Trap
The JIT makes assumptions (e.g., "this variable is always an integer"). If those assumptions are violated later (e.g., you pass a string), the JIT must **de-optimize**, throw away the machine code, and revert to the interpreter. This causes a massive, temporary latency spike.

---
**Practical Advice**: When deploying a new version of a high-traffic service, use "Warmup Rounds"—send a small amount of dummy traffic to the service to trigger the JIT before you direct real user traffic to it. This prevents the "p99 spike" often seen after a deployment.`
  },
  {
    id: "14-6",
    number: "14.6",
    title: "CPU Performance: Instruction Throughput and Latency",
    content: `To optimize code at the highest level, you must understand how a modern CPU actually executes instructions. It is not a simple "one instruction per clock cycle" process.

## Pipelining
CPUs use a **Pipeline** to execute instructions in stages (Fetch, Decode, Execute, Writeback). This allows the CPU to work on multiple instructions simultaneously.
- **Throughput**: How many instructions are completed per second.
- **Latency**: How long a single instruction takes from start to finish.

## Out-of-Order Execution (OoO)
Modern CPUs don't execute instructions in the order they appear in your code. They look ahead, find instructions whose dependencies are met, and execute them as resources become available. They effectively perform a real-time topological sort of your code's dependency graph.

## Superscalar Execution
High-end CPUs have multiple execution units (ALUs). They can often retire 4 to 8 instructions per clock cycle if the instructions are independent.

## The Bottleneck: Data Hazards
The biggest enemy of CPU performance is the **Data Dependency**. If instruction B needs the result of instruction A, B must wait.
\`\`\`c
a = b + c; // Instruction 1
d = a + e; // Instruction 2 (Depends on 1)
\`\`\`
To optimize, try to "unroll" loops or restructure math so the CPU can find independent work to do while waiting for long-latency operations (like memory fetches).`
  },
  {
    id: "14-7",
    number: "14.7",
    title: "Vectorization: SIMD and Auto-Vectorization",
    content: `**SIMD** (Single Instruction, Multiple Data) allows a CPU to perform the same operation on multiple data points at once using wide registers (128-bit, 256-bit, or 512-bit).

## The Math of SIMD
Imagine you need to add two arrays of 8 integers.
- **Scalar**: 8 separate ADD instructions.
- **SIMD (AVX2)**: One VADDPS instruction that adds all 8 pairs in a single clock cycle. This is an 8x theoretical speedup.

## Auto-Vectorization
Modern compilers (GCC, Clang, Rustc) are very good at **Auto-Vectorization**. If you write a simple loop, the compiler will try to transform it into SIMD instructions.
\`\`\`c
// The compiler can easily vectorize this
for (int i = 0; i < 1024; i++) {
    c[i] = a[i] + b[i];
}
\`\`\`

## What Blocks Vectorization?
1. **Branching**: \`if\` statements inside loops make vectorization difficult or impossible.
2. **Data Dependencies**: If \`a[i]\` depends on \`a[i-1]\`.
3. **Memory Alignment**: SIMD instructions often require data to be aligned to 16 or 32-byte boundaries in memory.

## Intrinsics and Libraries
If the compiler fails, you can use **Intrinsics** (functions that map directly to SIMD instructions) or highly optimized libraries like **Intel MKL**, **OpenBLAS**, or **Eigen**. For Data Science and AI, libraries like NumPy and PyTorch are essentially wrappers around these SIMD-optimized engines.`
  },
  {
    id: "14-8",
    number: "14.8",
    title: "Memory Performance: Locality, Prefetching, Alignment",
    content: `In modern computing, the **Memory Wall** is the primary bottleneck. CPUs are thousands of times faster than Main Memory (RAM). A CPU can execute an instruction in 0.5ns, but waiting for RAM takes 100ns.

## The Cache Hierarchy
To hide this latency, CPUs use layers of cache:
- **L1 Cache**: ~1ns (tiny, very fast)
- **L2 Cache**: ~4ns
- **L3 Cache**: ~10-20ns (shared across cores)
- **RAM**: ~100ns

## Spatial Locality
When the CPU fetches one byte from RAM, it actually fetches a 64-byte **Cache Line**. If your code then accesses the next byte (as in an array), it's already in the L1 cache. This is why **Arrays** are much faster than **Linked Lists**. In a linked list, each node is in a random location in memory, causing a "Cache Miss" for every single step.

## Temporal Locality
If you access the same memory location repeatedly, it stays in the cache.

## Memory Alignment
Modern CPUs prefer data to be at addresses that are multiples of their size (e.g., a 4-byte integer at an address divisible by 4). Misaligned access can require two memory fetches instead of one, doubling the latency.

---
**Data-Oriented Design**: The key to performance is organizing your data so it flows through the cache efficiently. Prefer "Structures of Arrays" (SoA) over "Arrays of Structures" (AoS) when you only need to process a subset of fields across many objects.`
  },
  {
    id: "14-9",
    number: "14.9",
    title: "Branch-Free Programming: When It Helps",
    content: `CPUs use **Branch Prediction** to guess which way an \`if\` statement will go. If it guesses right, the pipeline stays full. If it guesses wrong (a **Branch Mispredict**), it must flush the pipeline and start over, costing 15-20 clock cycles.

## The Cost of Unpredictability
If you are processing a sorted array, the branch \`if (val < 500)\` is highly predictable (it's true for the first half, then false). If the array is random, the predictor will fail 50% of the time, causing a massive performance hit.

## Branch-Free Techniques
You can sometimes replace a branch with math or bitwise operations.
### Branched:
\`\`\`c
if (a < b) return a; else return b;
\`\`\`
### Branch-Free (using CMOV or bitwise):
\`\`\`c
return a < b ? a : b; // Modern compilers turn this into a CMOV (Conditional Move)
\`\`\`

## Bitmasking
You can use the result of a comparison (0 or 1) as a mask.
\`\`\`c
// Sum only positive numbers without an 'if'
sum += (val > 0) * val;
\`\`\`

## When to use?
Don't obsess over every \`if\` statement. Only consider branch-free programming in tight inner loops that process millions of items where profiling has identified branch misprediction as a bottleneck (using \`perf stat\`).`
  },
  {
    id: "14-10",
    number: "14.10",
    title: "Concurrency Performance: Lock Contention Analysis",
    content: `Adding more threads doesn't always make a program faster. In fact, due to **Amdahl's Law** and the overhead of synchronization, it can make it slower.

## Lock Contention
When two threads try to acquire the same lock, one must wait (block). This is **Lock Contention**. High contention turns your parallel program back into a serial one, but with the added overhead of context switching.

## Strategies to Reduce Contention
1. **Reduce Lock Duration**: Hold the lock for the absolute minimum time. Do the heavy calculation *before* acquiring the lock.
2. **Lock Stripping**: Instead of one lock for a whole Map, use 16 locks, each protecting 1/16th of the buckets (e.g., \`ConcurrentHashMap\` in Java).
3. **Read-Write Locks**: Allow multiple readers simultaneously, but only one writer.
4. **Lock-Free Data Structures**: Use atomic operations (Compare-and-Swap / CAS) instead of locks. This is much harder to implement but scales better.

## False Sharing
This is a subtle concurrency killer. If two independent variables (used by different cores) happen to sit on the same **Cache Line**, the hardware will constantly synchronize that line across cores as if they were the same variable. This is called "Cache Line Bouncing" and can slow down a program by 10x or more.

---
**Measurement**: Use tools like \`mutrace\` (Linux) or the Java Flight Recorder to see how much time your threads spend waiting for locks. If "Monitor Wait" is high, you have a contention problem.`
  },
  {
    id: "14-11",
    number: "14.11",
    title: "Database Performance: Query Optimization Deep Dive",
    content: `In most web applications, the database is the primary bottleneck. Query optimization is the art of making the database do the minimum amount of work to find your data.

## The Query Life Cycle
1. **Parsing**: Checking SQL syntax.
2. **Binding**: Checking table and column existence.
3. **Planning**: The **Query Optimizer** evaluates different ways to fetch the data (e.g., use index A vs. index B, or do a full table scan).
4. **Execution**: The database engine fetches the rows.

## Why Queries are Slow
- **Missing Indexes**: The DB has to read every row in the table (O(N)).
- **Over-fetching**: Selecting columns you don't need (\`SELECT *\`) or rows you don't need.
- **N+1 Problems**: Sending 100 small queries instead of 1 large one.
- **Locking**: Your query is waiting for another transaction to finish.

## The Optimizer's Cost Model
The optimizer assigns a "cost" to each plan based on estimated I/O and CPU usage. It relies on **Statistics** about the data (e.g., "how many unique values are in the country column?"). If your statistics are outdated, the optimizer might choose a terrible plan. Run \`ANALYZE\` regularly in Postgres or MySQL to keep statistics fresh.`
  },
  {
    id: "14-12",
    number: "14.12",
    title: "EXPLAIN ANALYZE: Reading and Acting on Query Plans",
    content: `To optimize a query, you must look at its **Execution Plan**. In Postgres or MySQL, you do this by prefixing your query with \`EXPLAIN ANALYZE\`.

## Key Terms in a Plan
- **Seq Scan**: A full table scan. Bad for large tables.
- **Index Scan**: Using an index to find specific rows. Good.
- **Index Only Scan**: The data you need is in the index itself; no need to look at the main table. The holy grail of performance.
- **Nested Loop Join**: For each row in A, look for a match in B. Fast if B is indexed and the number of rows is small.
- **Hash Join**: Build a hash table of one table and probe it with the other. Fast for large joins.

## Analyzing the Output
Look for the node with the highest **Actual Time**. Compare "Estimated Rows" with "Actual Rows." If they are wildly different, your statistics are out of date, and the optimizer is making bad decisions.

### Example (Postgres):
\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
-- Result: Index Scan using users_email_idx on users ... (actual time=0.042..0.043 rows=1 loops=1)
\`\`\`
If this said "Seq Scan" and took 500ms, you know you need an index on the \`email\` column.`
  },
  {
    id: "14-13",
    number: "14.13",
    title: "Index Strategy: When to Add, When to Remove",
    content: `Indexes are not free. Every index makes \`SELECT\` faster but makes \`INSERT\`, \`UPDATE\`, and \`DELETE\` slower because the index itself must be updated.

## Types of Indexes
- **B-Tree**: The default. Good for equality (\`=\`) and range queries (\`>\`, \`BETWEEN\`).
- **Hash**: Fast equality (\`=\`) but doesn't support ranges.
- **GIN/GIST**: Used for full-text search, arrays, and JSONB in Postgres.
- **Composite Index**: An index on multiple columns \`(last_name, first_name)\`.

## Composite Index Rules (The Left-to-Right Rule)
A composite index on \`(A, B)\` can be used for queries on \`(A)\` or \`(A, B)\`, but **NOT** for queries on \`(B)\` alone. Order matters! Put the most "selective" column (the one with the most unique values) first.

## Index Maintenance
- **Remove Unused Indexes**: Use DB metadata views (\`pg_stat_user_indexes\` in Postgres) to find indexes that haven't been scanned in months. They are just slowing down your writes.
- **Index Bloat**: Over time, deleted rows leave "holes" in the B-Tree. Running \`REINDEX\` or \`VACUUM FULL\` can reclaim space and improve performance.`
  },
  {
    id: "14-14",
    number: "14.14",
    title: "The N+1 Query Problem: Detection and Elimination",
    content: `The **N+1 Query Problem** is the most common performance killer in applications using an ORM (Object-Relational Mapper) like Hibernate, Django, or Prisma.

## The Problem
You want to list 100 orders and their customer names.
1. You run one query: \`SELECT * FROM orders LIMIT 100;\`
2. For **each** of those 100 orders, the ORM runs another query: \`SELECT * FROM customers WHERE id = ?;\`
Total queries: 1 (initial) + 100 (one per order) = 101 queries. This is devastating for performance due to network round-trip times.

## Detection
- **Logs**: If you see a wall of similar \`SELECT\` statements in your logs.
- **Tools**: Use tools like \`django-debug-toolbar\` or Hibernate's \`show_sql\`.

## The Fix: Eager Loading
Tell your ORM to fetch the related data in the first query using a **JOIN** or a **Subquery**.
- **Django**: \`Order.objects.select_related('customer').all()\`
- **ActiveRecord (Rails)**: \`Order.includes(:customer).all()\`
- **SQL**: \`SELECT orders.*, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id;\`

By changing one line of code, you reduce 101 queries to 1 query, often improving performance from several seconds to a few milliseconds.`
  },
  {
    id: "14-15",
    number: "14.15",
    title: "ORM Performance Traps and Solutions",
    content: `ORMs are powerful but dangerous. They make it too easy to write "accidental" O(N^2) algorithms.

## Trap 1: Lazy Loading in Loops
(See 14.14 - N+1 Problem). This is the most common trap.

## Trap 2: Updating Single Fields
When you call \`user.save()\` in many ORMs, they generate a SQL statement that updates **every single column** in the table, even if you only changed the password. This increases I/O and can cause lock contention.
**Solution**: Use "Partial Updates" (e.g., \`user.save(update_fields=['password'])\`).

## Trap 3: Counting Large Tables
Calling \`User.objects.count()\` in Postgres on a table with 10 million rows is slow because Postgres must scan the entire table (due to MVCC).
**Solution**: For large tables, use a cached count or look at table metadata if an approximation is acceptable.

## Trap 4: Heavy Objects
Fetching 1000 objects with 50 columns each into memory is expensive.
**Solution**: Use \`.values()\` or \`.only('id', 'name')\` to fetch only the data you need. Avoid creating full objects if you're just generating a report.

---
**The Rule**: Use the ORM for 90% of your work, but don't be afraid to drop down to raw SQL for the complex 10% where performance is critical.`
  },
  {
    id: "14-16",
    number: "14.16",
    title: "I/O Performance: Batching, Buffering, Async",
    content: `I/O (Disk, Network) is orders of magnitude slower than CPU or RAM. Performance engineering here is about **Reducing the Number of Trips**.

## 1. Batching
Instead of writing 1000 small files, write one large file. Instead of 1000 \`INSERT\` statements, use one \`INSERT ... VALUES (...), (...), ...;\`.

## 2. Buffering
Don't write to disk for every byte. Accumulate data in a memory buffer (e.g., 8KB or 64KB) and write it all at once. This is why \`BufferedOutputStream\` in Java or \`bw = io.BufferedWriter(f)\` in Python is so much faster than raw writes.

## 3. Asynchronous I/O
In a synchronous system, the thread waits for the I/O to finish ("Blocking"). In an asynchronous system (Node.js, Go's netpoller, Python's asyncio), the thread sends the request and then goes to work on something else until the data is ready.
- **Throughput**: Async dramatically increases the number of concurrent connections a single server can handle.
- **Latency**: Async doesn't make a single request faster; it just keeps the CPU from being idle.

## 4. Sequential vs. Random I/O
Disks (especially HDDs, but even SSDs to some extent) are much faster at reading data that is stored sequentially. Modern file formats like **Apache Parquet** or **LSM Trees** (used in RocksDB) are designed to maximize sequential I/O.`
  },
  {
    id: "14-17",
    number: "14.17",
    title: "Network Performance: Latency vs Throughput",
    content: `Network performance is governed by the laws of physics (the speed of light) and the protocols of the internet (TCP/IP).

## Latency vs. Throughput
- **Throughput**: How much data can you send per second (e.g., 1 Gbps).
- **Latency**: How long it takes for a single bit to travel from A to B (e.g., 50ms).

For a web request, **Latency** is usually the bottleneck. A 100ms round-trip time (RTT) means that no matter how fast your 1Gbps fiber is, you can't have more than 10 round-trips per second on a single connection.

## The TCP Handshake
TCP requires a 3-way handshake before sending data. HTTPS requires another several round-trips for TLS negotiation.
**Solution**: Use **Keep-Alive (Connection Pooling)** to reuse established connections.

## HTTP/2 and HTTP/3
- **HTTP/1.1**: One request at a time per connection (Head-of-Line Blocking).
- **HTTP/2**: Multiple requests over one connection (Multiplexing).
- **HTTP/3 (QUIC)**: Uses UDP to eliminate the "retransmission" bottleneck of TCP, making it much faster on flaky mobile networks.

## Data Compression
Reducing the payload size (using Gzip or Brotli) reduces the time the data spends "on the wire." For APIs, this is usually a 70-80% reduction in size for a small CPU cost.`
  },
  {
    id: "14-18",
    number: "14.18",
    title: "Serialization Performance: JSON vs MessagePack vs Protobuf",
    content: `Before data can be sent over the network, it must be **Serialized** (converted to bytes). The choice of format has a huge impact on both CPU usage and payload size.

| Format | Type | Human Readable? | Speed | Size | Features |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **JSON** | Text | Yes | Slow | Large | Ubiquitous, no schema |
| **MessagePack** | Binary | No | Medium | Medium | Compact JSON alternative |
| **Protobuf** | Binary | No | Fast | Small | Schema-based, strict types |
| **Avro** | Binary | No | Fast | Very Small | Schema stays with data |

## Why JSON is Slow
1. **Parsing**: The computer has to read strings, handle escapes, and parse numbers from text (which involves expensive floating-point math).
2. **Size**: Field names ("user_id", "first_name") are repeated for every single object in a list.

## The Protobuf Advantage
Protobuf (Protocol Buffers) uses a binary format where field names are replaced by small integers (tags). It doesn't need to "parse" numbers because they are already stored in binary format. In high-performance microservices, switching from JSON to Protobuf can reduce CPU usage by 20-30%.

---
**When to use?** Use JSON for public APIs and internal web-to-server communication. Use Protobuf or gRPC for internal service-to-service communication where performance and type safety are paramount.`
  },
  {
    id: "14-19",
    number: "14.19",
    title: "Performance Regressions: Preventing and Detecting",
    content: `Performance is not a one-time fix; it is a property that must be defended. A single commit can undo months of optimization work.

## Performance Testing in CI
Integrate performance checks into your Continuous Integration pipeline.
- **Thresholds**: "This API must respond in under 200ms."
- **Trend Analysis**: Compare the performance of the current PR against the \`main\` branch. If it's 5% slower, fail the build or trigger a manual review.

## Observability in Production
You can't catch everything in CI. You need **Observability**:
- **Metrics**: Track p50, p90, and p99 latencies.
- **Tracing**: Use Distributed Tracing (e.g., Jaeger, Honeycomb, AWS X-Ray) to see where time is spent across multiple services for a single request.
- **Logging**: Log "Slow Queries" (e.g., any query taking more than 500ms).

## The "Budget" Mentality
Give each team a "Performance Budget." If they go over it, they must stop adding features and spend the next sprint optimizing. This ensures that performance remains a priority throughout the product life cycle.`
  },
  {
    id: "14-20",
    number: "14.20",
    title: "Case Study: Optimizing a Django API from 500ms to 12ms",
    content: `Let's look at a real-world optimization of a \`/products/\` listing API.

## The Starting Point: 500ms
The endpoint was fetching 50 products and their reviews.
- **Problem 1 (200ms)**: N+1 Query. For every product, it was fetching reviews separately.
- **Fix 1**: Used \`prefetch_related('reviews')\`. Latency dropped to **300ms**.

- **Problem 2 (150ms)**: Excessive serialization. The ORM was creating full \`Review\` objects just to calculate an average rating.
- **Fix 2**: Used database aggregation: \`Product.objects.annotate(avg_rating=Avg('reviews__rating'))\`. Latency dropped to **150ms**.

- **Problem 3 (100ms)**: Middleware overhead. The app had 20 different middlewares, many of which were doing unnecessary DB lookups (like checking session data for a public API).
- **Fix 3**: Optimized middleware and moved the API to a separate, lightweight path. Latency dropped to **50ms**.

- **Problem 4 (40ms)**: Network and JSON overhead. The JSON payload was 200KB because it included the full product description for every item.
- **Fix 4**: Limited the fields returned to only what the list view needed (\`id\`, \`name\`, \`price\`, \`avg_rating\`). Payload dropped to 5KB. Latency dropped to **12ms**.

## Conclusion
The final API was **40x faster**. No complex caching or assembly code was required—just a systematic identification and removal of "waste" in the application and database layers.`
  },
  {
    id: "14-21",
    number: "14.21",
    title: "Exercises",
    content: `Test your performance engineering knowledge.

## 1. Amdahl's Law
**Question**: You optimize a database query that takes 50% of your total request time. You make it 10x faster. What is the total speedup of the request?
**Answer**: Using the formula: \`Speedup = 1 / ((1 - P) + (P / S))\` where P=0.5 and S=10.
\`Speedup = 1 / (0.5 + 0.05) = 1 / 0.55 ≈ 1.81x\`. The total request is about 81% faster.

## 2. Flame Graphs
**Question**: On a Flame Graph, if you see a very wide box at the very top of a stack, what does that indicate?
**Answer**: It indicates a function with high **Self-Time**. That function is doing a lot of work (CPU-bound) rather than waiting for other functions to return. This is your primary optimization target.

## 3. Memory Locality
**Question**: Why is summing an array of 1,000,000 integers faster than summing a linked list of 1,000,000 integers?
**Answer**: **Spatial Locality**. The array is contiguous in memory, so the CPU can prefetch cache lines, achieving a near 100% L1 cache hit rate. The linked list nodes are scattered, causing a cache miss (and a ~100ns stall) for almost every node access.

## 4. Database Plans
**Question**: You see a "Seq Scan" on a table with 5 million rows in an EXPLAIN plan. What is the first thing you should do?
**Answer**: Create an index on the column(s) used in the \`WHERE\` clause of the query.

## 5. N+1 Problem
**Question**: In an ORM, what is the difference between \`select_related\` and \`prefetch_related\`?
**Answer**: \`select_related\` performs a SQL **JOIN** and is best for "one-to-one" or "many-to-one" relationships. \`prefetch_related\` performs a separate SQL query with an \`IN\` clause and is best for "many-to-many" or "one-to-many" relationships where a JOIN would create a massive, redundant result set.

## 6. JIT Compilation
**Question**: Why should you "warm up" a Java application before running a benchmark?
**Answer**: To allow the JIT compiler to identify hot methods and compile them into optimized machine code. Otherwise, you are measuring the performance of the slower interpreter or baseline compiler.

## 7. Serialization
**Question**: Why is Protobuf faster to parse than JSON?
**Answer**: Protobuf is a binary format that maps directly to memory structures. It avoids the overhead of string parsing, character escaping, and converting text to numbers.

## 8. Branching
**Question**: How does a CPU handle an \`if\` statement?
**Answer**: It uses a **Branch Predictor** to guess the outcome and continues executing instructions speculatively. If the guess is wrong, the pipeline is flushed, causing a performance penalty.`
  }
];
