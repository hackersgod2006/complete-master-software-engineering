import type { Section } from '../types';

export const CH14_SECTIONS: Section[] = [
  {
    id: "14-1",
    number: "14.1",
    title: "The Performance Mindset: Measure First, Always",
    content: `Performance engineering is not about making every line of code as fast as possible. It is about ensuring the system is fast enough where it matters, for the users who experience it, under the load it actually receives. The engineer who optimizes everything equally is wasting time. The engineer who measures first and optimizes only the bottleneck is using engineering judgment.
The single most important rule in performance engineering: measure before you optimize. This is not just advice — it is a requirement. Every performance optimization that is not preceded by measurement is a guess. Guesses are usually wrong. The bottleneck is almost never where you think it is, and optimizing the wrong thing wastes time while users continue to suffer.
Amdahl's Law makes this mathematically precise: if 90% of program time is in function A and 10% in function B, and you make B infinitely fast, the program is only 11% faster overall. Making A twice as fast makes the program 1.82x faster. You must find the actual bottleneck and fix it — nothing else delivers significant improvement.


---`
  },
  {
    id: "14-2",
    number: "14.2",
    title: "Profiling Tools: cProfile, perf, VisualVM, pprof, async-profiler",
    content: `\`\`\`python
import cProfile, pstats, io, time
from functools import wraps

# PYTHON PROFILING: cProfile (CPU time)

# METHOD 1: Profile a specific function
def profile_function(func, *args, **kwargs):
pr = cProfile.Profile()
\`\`\`

pr.enable()

\`\`\`python
result = func(*args, **kwargs)
\`\`\`

pr.disable()


\`\`\`python
s = io.StringIO()
ps = pstats.Stats(pr, stream=s).sort_stats('cumulative')
\`\`\`

ps.print_stats(20) # top 20 functions by cumulative time

\`\`\`python
print(s.getvalue())
return result

# METHOD 2: Profile entire program from command line
# $ python -m cProfile -s cumulative myprogram.py
# Output shows: ncalls, tottime, percall, cumtime, filename:lineno(function)

# METHOD 3: Decorator for profiling specific functions
def profile(func):
@wraps(func)
def wrapper(*args, **kwargs):
pr = cProfile.Profile()
\`\`\`

pr.enable()

\`\`\`python
result = func(*args, **kwargs)
\`\`\`

pr.disable()
pr.print_stats(sort='cumulative')

\`\`\`python
return result
return wrapper

@profile
def expensive_function(data):
return process(data)

# METHOD 4: line_profiler — line-by-line timing
# pip install line_profiler
# @profile decorator (not the one above — line_profiler's own)
# $ kernprof -l -v myscript.py
# Output: time per LINE inside the decorated function
# Use when cProfile shows a function is slow but you need to know which line

# METHOD 5: memory_profiler — memory usage per line
# pip install memory_profiler
# @profile decorator
# $ python -m memory_profiler myscript.py
# Shows: memory usage increase per line

# FLAME GRAPHS: the best way to visualize profiling data
# pip install py-spy
# $ py-spy record -o profile.svg -- python myscript.py
# Opens an SVG: x-axis = time, y-axis = call stack
# Widest bars = most time spent — instantly shows the bottleneck
# Works on running processes without restarting: py-spy top --pid PID

# READING A PROFILE: what to look for
# cumtime: total time including callees (start here — find the fattest bar)
# tottime: time in function excluding callees (actual work done here)
# ncalls: number of calls (high ncalls in a slow function = fix the caller)
# The bottleneck: high cumtime + high in the call stack = fix this
\`\`\``
  },
  {
    id: "14-3",
    number: "14.3",
    title: "Flame Graphs: Reading and Acting on Profiles",
    content: `\`\`\`python
import timeit, statistics, time

# TIMEIT: the correct way to benchmark Python code

# METHOD 1: timeit module
setup = 'data = list(range(10000))'
stmt_list = '[x for x in data if x % 2 == 0]'
stmt_filter = 'list(filter(lambda x: x % 2 == 0, data))'

# timeit runs 1,000,000 iterations and returns total time
time_list = timeit.timeit(stmt_list, setup=setup, number=100000)
time_filter = timeit.timeit(stmt_filter, setup=setup, number=100000)
print(f'List comprehension: {time_list:.3f}s')
print(f'filter(): {time_filter:.3f}s')

# BENCHMARKING RULES:

# RULE 1: Run enough iterations for stable results
# Single run: noise from OS scheduling, CPU frequency scaling
# Minimum: 3 runs, report minimum (not average) — average includes outliers

# RULE 2: Warm up before benchmarking
# First run: cold cache, JIT compilation (for JVM/V8), OS scheduling
# Warm up: run the code 3-5 times before starting the timer
def benchmark(func, args, warmup=3, iterations=10):
# Warmup
for _ in range(warmup):
func(*args)
# Measure
times = []
for _ in range(iterations):
t0 = time.perf_counter() # highest resolution timer
func(*args)
\`\`\`

times.append(time.perf_counter() - t0)

\`\`\`python
return {
\`\`\`

'min': min(times),
'median': statistics.median(times),
'mean': statistics.mean(times),
'stdev': statistics.stdev(times),
'max': max(times),
}


\`\`\`python
# RULE 3: Use time.perf_counter() not time.time()
# perf_counter: highest resolution clock, includes sleep time
# time.time(): lower resolution, may jump due to NTP adjustments
# process_time(): CPU time only, excludes sleep/IO waits

# RULE 4: Benchmark at realistic scale
# Benchmarking on 10 items is useless if production has 1,000,000
# Algorithmic complexity only shows at scale: O(n^2) looks fine at n=10

# RULE 5: Profile before optimizing
# Benchmark AFTER profiling shows where the bottleneck is
# Benchmark BEFORE and AFTER to verify the optimization helped

# MICROBENCHMARKING PITFALLS:
# Dead code elimination: compiler may skip code with no observable effect
# Loop overhead: loop itself takes time — subtract it
# Cache effects: first iteration cold, rest warm — unfair comparison
# GC pauses: run gc.collect() before benchmarking in Python/Java/Go
\`\`\``
  },
  {
    id: "14-4",
    number: "14.4",
    title: "Benchmarking: Methodology and Pitfalls",
    content: `\`\`\`python
# DATABASE PERFORMANCE: the most common production bottleneck

# EXPLAIN ANALYZE: understand what the database actually does
# PostgreSQL:
# EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42 AND status = 'pending';

# Sample output and what it means:
# Seq Scan on orders (cost=0.00..45231.00 rows=1 width=120) (actual time=0.123..892.345 rows=47 loops=1)
# Filter: ((customer_id = 42) AND ((status)::text = 'pending'::text))
# Rows Removed by Filter: 999953
# Planning Time: 0.234 ms
# Execution Time: 892.456 ms

# DIAGNOSIS: Seq Scan = reading ALL 1,000,000 rows to find 47
# Rows Removed by Filter: 999953 = MAJOR RED FLAG

# FIX: create index
# CREATE INDEX idx_orders_customer_status ON orders(customer_id, status);

# AFTER INDEX:
# Index Scan using idx_orders_customer_status on orders
# (cost=0.42..12.85 rows=47 width=120) (actual time=0.031..0.089 rows=47 loops=1)
# Execution Time: 0.156 ms
# SPEEDUP: 892ms -> 0.156ms = 5,717x faster

# THE N+1 QUERY PROBLEM: the most common ORM performance mistake

# WRONG: N+1 queries
# This code makes 1 query for orders + N queries for customers (one per order)
orders = Order.objects.filter(status='pending') # 1 query: SELECT * FROM orders
for order in orders:
print(order.customer.name) # N queries: SELECT * FROM customers WHERE id = ?
# For 1000 pending orders: 1001 queries!

# CORRECT: eager loading (1 query with JOIN)
orders = Order.objects.filter(status='pending').select_related('customer')
# Django: .select_related() for ForeignKey, .prefetch_related() for ManyToMany
# SQLAlchemy: .options(joinedload(Order.customer))
# Result: 1 query instead of 1001

# DETECTING N+1 IN DJANGO:
# pip install django-debug-toolbar
# Shows: number of queries per request, duplicate queries, slow queries

# QUERY OPTIMIZATION RULES:
# 1. Index columns used in WHERE, JOIN ON, and ORDER BY
# 2. Index composite queries in the right order (highest cardinality first)
# 3. Use LIMIT when you do not need all results
# 4. Select only needed columns: SELECT id, name NOT SELECT *
# 5. Avoid functions on indexed columns in WHERE: WHERE LOWER(email) = ?
# This prevents index use. Use: WHERE email = LOWER(?) instead
# 6. Use covering indexes for read-heavy queries (include projected columns)
# 7. Use EXPLAIN ANALYZE on every slow query — never guess

# QUERY LOGGING: find slow queries automatically
# PostgreSQL: log_min_duration_statement = 100 (log queries > 100ms)
# MySQL: slow_query_log = ON, long_query_time = 0.1
# Python SQLAlchemy: echo=True for development
# Django: DEBUG=True logs all queries to django.db.backends
\`\`\``
  },
  {
    id: "14-5",
    number: "14.5",
    title: "JIT Warm-Up Effects: Why Benchmarks Lie",
    content: `\`\`\`python
import timeit, functools
from typing import Iterator

# 1. LIST COMPREHENSION vs LOOP vs MAP
# In Python, list comprehensions are implemented in C — faster than explicit loops

data = list(range(1_000_000))

# Loop (slowest in Python):
def loop_version():
result = []
for x in data:
if x % 2 == 0:
\`\`\`

result.append(x * 2)

\`\`\`python
return result

# List comprehension (fastest for creating lists):
def comprehension_version():
return [x * 2 for x in data if x % 2 == 0]

# Generator (best when you do not need all results at once):
def generator_version() -> Iterator[int]:
return (x * 2 for x in data if x % 2 == 0)
# Generators: O(1) memory, process one at a time — no list created

# 2. STRING CONCATENATION
# BAD: string += in loop creates new string object every iteration
def bad_join(strings):
result = ''
for s in strings: result += s # O(n^2) total — each += copies all so far
return result

# GOOD: join() builds all at once
def good_join(strings):
return ''.join(strings) # O(n) — one pass

# 3. CACHING EXPENSIVE COMPUTATIONS
@functools.lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
if n <= 1: return n
return fibonacci(n-1) + fibonacci(n-2)
# First call: O(n). Subsequent calls: O(1) lookup.
# Without cache: O(2^n) exponential. With cache: O(n) total.

# 4. AVOID REPEATED ATTRIBUTE LOOKUP IN HOT LOOPS
# BAD: Python looks up list.append on every iteration
def bad_loop(data):
result = []
for x in data:
\`\`\`

result.append(x) # attribute lookup every time


\`\`\`python
# GOOD: cache the method reference
def good_loop(data):
result = []
append = result.append # single attribute lookup
for x in data:
append(x) # direct call, no lookup

# 5. USE SETS FOR MEMBERSHIP TESTING
# BAD: O(n) per lookup
allowed_users_list = ['alice', 'bob', 'charlie'] # list
if username in allowed_users_list: # O(n) linear scan
grant_access()

# GOOD: O(1) per lookup
allowed_users_set = {'alice', 'bob', 'charlie'} # set (hash table)
if username in allowed_users_set: # O(1) hash lookup
grant_access()

# 6. NUMPY FOR NUMERICAL WORK
import numpy as np
data_py = list(range(1_000_000))
data_np = np.arange(1_000_000)

# Pure Python sum: ~60ms
# sum(data_py)

# NumPy sum: ~1ms (60x faster — SIMD vectorization in C)
# data_np.sum()

# 7. PROFILING-GUIDED OPTIMIZATION EXAMPLE
# Profile showed: 80% of time in format_user_name()
# format_user_name called 10 million times
# Fix: cache results with lru_cache
@functools.lru_cache(maxsize=10000)
def format_user_name(first: str, last: str) -> str:
return f'{first.strip().title()} {last.strip().title()}'
# After: format_user_name takes 0% of profile time (cache hit rate 99.8%)
\`\`\``
  },
  {
    id: "14-6",
    number: "14.6",
    title: "CPU Performance: Instruction Throughput and Latency",
    content: `\`\`\`python
import asyncio, aiohttp, time

# ASYNC I/O: handle thousands of concurrent I/O operations in one thread
# Correct for: web scraping, API calls, database queries, file I/O
# NOT correct for: CPU-bound computation (use multiprocessing instead)

# SEQUENTIAL (slow): 10 HTTP requests one at a time
async def fetch_sequential(urls):
async with aiohttp.ClientSession() as session:
results = []
for url in urls:
async with session.get(url) as response:
\`\`\`

results.append(await response.text())

\`\`\`python
return results
# Time: sum of all individual response times (e.g. 10 × 200ms = 2000ms)

# CONCURRENT (fast): 10 HTTP requests all at once
async def fetch_concurrent(urls):
async with aiohttp.ClientSession() as session:
tasks = [
\`\`\`

asyncio.create_task(fetch_one(session, url))

\`\`\`python
for url in urls
\`\`\`

]

\`\`\`python
return await asyncio.gather(*tasks)

async def fetch_one(session, url):
async with session.get(url) as response:
return await response.text()

# Time: max of all individual response times (~200ms instead of 2000ms)
# 10x speedup from concurrency alone — zero threads added

# CONTROLLING CONCURRENCY: avoid overwhelming target server
async def fetch_with_limit(urls, max_concurrent=10):
semaphore = asyncio.Semaphore(max_concurrent) # max 10 at once

async def fetch_with_sem(session, url):
async with semaphore: # blocks if 10 already running
async with session.get(url) as response:
return await response.text()

async with aiohttp.ClientSession() as session:
tasks = [fetch_with_sem(session, url) for url in urls]
return await asyncio.gather(*tasks)

# ASYNC DATABASE QUERIES (asyncpg for PostgreSQL):
import asyncpg

async def fetch_user_orders(user_ids: list) -> dict:
conn = await asyncpg.connect('postgresql://user:pass@localhost/db')
try:
# Fetch all users concurrently with a single query
rows = await conn.fetch(
\`\`\`

'SELECT user_id, COUNT(*) as order_count FROM orders WHERE user_id = ANY($1) GROUP BY user_id',
user_ids
)

\`\`\`python
return {row['user_id']: row['order_count'] for row in rows}
\`\`\`

finally:

\`\`\`python
await conn.close()

# WHEN TO USE ASYNC vs THREADS vs MULTIPROCESSING:
# Async: I/O-bound, high concurrency (1000s of connections)
# Threading: I/O-bound, simpler code, moderate concurrency (<100)
# Multiprocessing: CPU-bound, embarrassingly parallel computation
# Rule: if you spend time WAITING for I/O -> async or threads
# if you spend time COMPUTING -> multiprocessing
\`\`\``
  },
  {
    id: "14-7",
    number: "14.7",
    title: "Vectorization: SIMD and Auto-Vectorization",
    content: `\`\`\`python
import functools, time, hashlib, json
from typing import Any, Callable

# CACHING: serve results from fast storage instead of recomputing

# LEVEL 1: In-process cache (lru_cache)
@functools.lru_cache(maxsize=1000)
def get_country_from_ip(ip_address: str) -> str:
return geoip_service.lookup(ip_address) # slow: 50ms per call
# First call: 50ms (hits geoip_service)
# Subsequent calls with same IP: <1ms (from cache)
# maxsize=1000: keeps last 1000 unique IPs in memory

# LIMITATION: lru_cache is process-local and not thread-safe for complex objects
# For thread-safe caching: use threading.Lock or a proper cache library

# LEVEL 2: Distributed cache (Redis) — shared across all processes and servers
import redis

cache = redis.Redis(host='localhost', port=6379, db=0)

def cached(ttl_seconds: int = 300):
\`\`\`

'''Decorator: cache function results in Redis with TTL.'''

\`\`\`python
def decorator(func: Callable) -> Callable:
@functools.wraps(func)
def wrapper(*args, **kwargs) -> Any:
# Build cache key from function name and arguments
key_data = json.dumps({'func': func.__name__, 'args': args, 'kwargs': kwargs}, sort_keys=True)
cache_key = 'cache:' + hashlib.sha256(key_data.encode()).hexdigest()[:16]

# Try cache first
cached_value = cache.get(cache_key)
if cached_value is not None:
return json.loads(cached_value) # cache hit: return immediately

# Cache miss: compute and store
result = func(*args, **kwargs)
\`\`\`

cache.setex(cache_key, ttl_seconds, json.dumps(result))

\`\`\`python
return result
return wrapper
return decorator

@cached(ttl_seconds=3600) # cache for 1 hour
def get_product_recommendations(user_id: int) -> list:
return ml_model.predict(user_id) # slow: 500ms ML inference

# CACHE INVALIDATION STRATEGIES:
# TTL-based: cache expires after N seconds (simple, stale data possible)
# Event-based: invalidate when data changes (fresh, complex to implement)
# Write-through: update cache on every write (always fresh, slower writes)

# CACHE STAMPEDE (thundering herd):
# When cache expires, all requests simultaneously miss and hit the database
# Fix: probabilistic early expiration (refresh before expiry) OR
# cache lock (only one request recomputes, others wait)

def cached_with_lock(cache_key: str, compute_fn: Callable, ttl: int) -> Any:
\`\`\`

'''Prevent cache stampede with a distributed lock.'''

\`\`\`python
value = cache.get(cache_key)
if value: return json.loads(value)

lock_key = f'lock:{cache_key}'
lock_acquired = cache.set(lock_key, '1', ex=10, nx=True) # NX = set if not exists
if lock_acquired:
try:
result = compute_fn() # only one process computes
\`\`\`

cache.setex(cache_key, ttl, json.dumps(result))

\`\`\`python
return result
\`\`\`

finally:
cache.delete(lock_key)

\`\`\`python
else:
# Another process is computing — wait and retry
\`\`\`

time.sleep(0.1)

\`\`\`python
return cached_with_lock(cache_key, compute_fn, ttl)
\`\`\``
  },
  {
    id: "14-8",
    number: "14.8",
    title: "Memory Performance: Locality, Prefetching, Alignment",
    content: `PROFILING SESSION: Take any Python program that takes more than 1 second to run. Profile it with cProfile. Identify the top 3 bottlenecks by cumulative time. Generate a flame graph with py-spy. Fix the single biggest bottleneck. Measure before and after. Report the speedup.
N+1 QUERY DETECTION: In a Django or SQLAlchemy project, use django-debug-toolbar or SQLAlchemy event logging to count queries per endpoint. Find an endpoint with an N+1 problem. Fix it with select_related/prefetch_related or joinedload. Measure before and after query count and response time.
ASYNC CONVERSION: Take a sequential function that makes 10 HTTP API calls. Convert it to async using asyncio and aiohttp. Measure the speedup with asyncio.gather vs sequential. Add a semaphore to limit concurrency to 3 at a time.
BENCHMARK SUITE: Write a benchmark comparing: (a) list vs tuple for iteration, (b) dict vs list for membership testing at sizes 10, 100, 1000, 10000, (c) string concatenation with += vs join for 10, 100, 1000 strings. Plot the results. Explain each result in terms of Python internals.
DATABASE INDEX EXERCISE: Create a PostgreSQL table with 1 million rows. Run EXPLAIN ANALYZE on a query without index. Create the right index. Run EXPLAIN ANALYZE again. Report: execution plan change, execution time before and after, rows removed by filter.
Chapter 14 — Ten Performance Engineering Truths
Measure before you optimize. The bottleneck is almost never where you think it is. Profiling reveals reality. Guessing wastes time.
Amdahl's Law: optimizing a 10% bottleneck to zero gives 11% speedup. Find the real bottleneck (80%+ of time) and fix that.
Flame graphs are the best tool for understanding performance. The widest bars are the bottlenecks. Everything else is noise.
EXPLAIN ANALYZE every slow database query. Seq Scan on large tables is always suspicious. The fix is almost always an index.
N+1 queries are the most common ORM performance mistake. Use select_related, prefetch_related, or JOIN to fix them.
Index columns used in WHERE, JOIN ON, and ORDER BY. Composite index order matters: put highest cardinality equality columns first.
Async I/O handles thousands of concurrent I/O operations in one thread. Use asyncio.gather for concurrent requests, not sequential await.
String concatenation with += in a loop is O(n^2). Always use ''.join(strings). This is not a micro-optimization — it is an algorithmic fix.
Use sets for membership testing, not lists. Set lookup is O(1). List lookup is O(n). For 1000 items: 1000x faster.
Cache expensive computations at the right level: in-process (lru_cache), distributed (Redis), or HTTP (CDN). Always set a TTL to prevent stale data.`
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
