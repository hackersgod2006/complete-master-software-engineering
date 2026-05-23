import type { Section } from '../types';

export const CH05_SECTIONS: Section[] = [
  {
    id: "5-1",
    number: "5.1",
    title: "The Philosophy of Data Structures",
    content: `A data structure is a principled organization of data enabling efficient access, modification, and reasoning. The choice of data structure is often the single most impactful engineering decision in a program — more impactful than compiler optimizations, hardware upgrades, or any micro-optimization.
The difference between O(n) and O(1) lookup is not a 10% improvement. For a million elements it is the difference between one million operations and one. No hardware compensates for the wrong data structure. Every data structure embodies trade-offs across four dimensions: time complexity, space overhead, access pattern requirements, and mutability. The engineer matches structure strengths to actual access patterns.`
  },
  {
    id: "5-2",
    number: "5.2",
    title: "Choosing the Right Structure: The Four Dimensions",
    content: `The array's defining property: elements stored in contiguous memory, accessible in O(1) time by index. Address = base + index × element_size. No pointer following, no searching, just arithmetic. Every other data structure is either built from arrays or pays for flexibility by losing this cache efficiency.

### 5.2.1 Memory Layout and Cache Behavior


\`\`\`python
import sys, numpy as np, array as arr_mod

# PYTHON LIST: array of pointers to separate Python objects
lst = [1, 2, 3, 4, 5]
# Memory layout:
# list object → [ptr0, ptr1, ptr2, ptr3, ptr4]
# ↓ ↓ ↓ ↓ ↓
# int(1) int(2) int(3) int(4) int(5) (heap objects ~28B each)
# Total: ~236 bytes for 5 integers
print(f'list: {sys.getsizeof(lst)} bytes header + {5*8} ptr bytes')

# ARRAY MODULE: compact typed storage
int_arr = arr_mod.array('i', [1,2,3,4,5]) # 'i' = signed int32
print(f'array: {sys.getsizeof(int_arr)} bytes total') # ~64 bytes
# Memory: [1|2|3|4|5] — 20 bytes of actual data, no per-element overhead

# NUMPY: contiguous, typed, SIMD-vectorizable
np_arr = np.array([1,2,3,4,5], dtype=np.int32)
print(f'numpy: {np_arr.nbytes} bytes data') # 20 bytes exactly
# numpy is 10-100x faster for bulk operations due to SIMD + cache locality

# STRUCT OF ARRAYS vs ARRAY OF STRUCTS:

# Array of Structs (AoS) — natural OOP layout:
# Memory: [x0,y0,z0,vx0,vy0, x1,y1,z1,vx1,vy1, x2,y2,z2,vx2,vy2, ...]
# Accessing all x values: stride = 5 floats = 20 bytes between each x
# Poor SIMD utilization, poor cache line usage for column operations
particles_aos = np.zeros(1_000_000, dtype=[
\`\`\`

('x','f4'),('y','f4'),('z','f4'),('vx','f4'),('vy','f4')])


\`\`\`python
# Struct of Arrays (SoA) — data-oriented layout:
# Memory: [x0,x1,x2,...,xN] [y0,y1,...,yN] [z0,z1,...,zN]
# Accessing all x values: sequential, cache-friendly, SIMD-vectorizable
xs = np.zeros(1_000_000, dtype=np.float32) # all x values contiguous
ys = np.zeros(1_000_000, dtype=np.float32)

# SoA bulk sum is 2-4x faster for column operations
# Used by: Unity ECS, game physics engines, columnar databases (Parquet)

# DYNAMIC ARRAY GROWTH — amortized O(1) append:
# Doubling strategy: when full, allocate 2x and copy all elements
# Total copies for n appends: 1+2+4+...+n/2 = n-1
# Amortized cost per append: O(n)/n = O(1)

# Python list actual growth: 0,4,8,16,25,35,46,58,72,88,106...
# Not pure doubling — empirically tuned for common sizes
# append(): O(1) amortized pop(): O(1)
# insert(i): O(n) pop(i): O(n)
# lst[i]: O(1) sort(): O(n log n) Timsort
# x in lst: O(n) linear scan len(): O(1)
\`\`\``
  },
  {
    id: "5-3",
    number: "5.3",
    title: "Arrays: Static, Dynamic, and Multi-Dimensional",
    content: `Linked lists pay O(1) for insert and delete at a known node but sacrifice cache performance. A cache miss costs 60ns versus 1ns for a cache hit — 60 times slower. This means arrays with O(n) shifting often beat linked lists with O(1) insertion at practical sizes because cache misses dominate.

\`\`\`python
from typing import Optional, TypeVar, Generic
T = TypeVar('T')

class Node(Generic[T]):
def __init__(self, val: T):
\`\`\`

self.val = val
self.next: Optional['Node[T]'] = None
self.prev: Optional['Node[T]'] = None


\`\`\`python
class DoublyLinkedList(Generic[T]):
def __init__(self):
\`\`\`

self.head: Optional[Node[T]] = None
self.tail: Optional[Node[T]] = None
self.size = 0


\`\`\`python
def append(self, val: T) -> Node[T]: # O(1) — returns node!
n = Node(val)
if not self.tail: self.head = self.tail = n
else:
\`\`\`

n.prev = self.tail; self.tail.next = n; self.tail = n
self.size += 1

\`\`\`python
return n # return node for O(1) future removal

def remove(self, n: Node[T]) -> None: # O(1) given the node
if n.prev: n.prev.next = n.next
else: self.head = n.next
if n.next: n.next.prev = n.prev
else: self.tail = n.prev
\`\`\`

n.next = n.prev = None; self.size -= 1


\`\`\`python
def move_to_front(self, n: Node[T]) -> None: # O(1)
\`\`\`

self.remove(n)
n.next = self.head

\`\`\`python
if self.head: self.head.prev = n
\`\`\`

self.head = n; n.prev = None

\`\`\`python
if not self.tail: self.tail = n
\`\`\`

self.size += 1


\`\`\`python
# WHEN LINKED LISTS WIN:
# LRU Cache: doubly-linked list + hash map = O(1) access AND eviction
# Queue/deque: O(1) both ends (collections.deque uses linked blocks)
# Undo/redo history: O(1) insert at current cursor position
# OS ready queues: O(1) process insert and remove by priority

# WHEN ARRAYS WIN (almost always for performance-critical code):
# Random access required, binary search, SIMD operations,
# iteration over all elements (array is 60x faster due to cache)

# PYTHON DEQUE — correct choice for queue and stack:
from collections import deque
q = deque(maxlen=100) # bounded, O(1) append AND popleft
\`\`\`

q.append('right') # O(1)
q.appendleft('left') # O(1)
q.popleft() # O(1)

\`\`\`python
# Implemented as doubly-linked list of fixed-size blocks (~64 nodes each)
# Better cache performance than individual node allocation
\`\`\``
  },
  {
    id: "5-4",
    number: "5.4",
    title: "Array of Structs vs Struct of Arrays",
    content: `The hash table achieves O(1) average-case lookup, insertion, and deletion. It powers Python dict and set, Java HashMap, JavaScript objects, Go maps, Redis core structures, and virtually every in-memory index. Understanding hash tables completely — hash functions, collision resolution, load factors, pathological cases — is not optional for serious engineers.

### 5.4.1 Complete Open-Addressing Implementation


\`\`\`python
class HashTable:
EMPTY = object() # slot never used
DELETED = object() # tombstone: was here, now deleted

def __init__(self, cap=8):
\`\`\`

self.cap = cap; self.size = 0
self.keys = [self.EMPTY] * cap
self.vals = [None] * cap


\`\`\`python
def _probe(self, key):
idx = hash(key) % self.cap
first_del = -1
for _ in range(self.cap):
s = self.keys[idx]
if s is self.EMPTY:
return first_del if first_del >= 0 else idx
elif s is self.DELETED:
if first_del < 0: first_del = idx
elif s == key: return idx
idx = (idx + 1) % self.cap # linear probing
return first_del

def set(self, key, val):
if self.size / self.cap > 0.7: # resize at 70% load
\`\`\`

self._resize(self.cap * 2)

\`\`\`python
idx = self._probe(key)
if self.keys[idx] in (self.EMPTY, self.DELETED):
\`\`\`

self.size += 1
self.keys[idx] = key; self.vals[idx] = val


\`\`\`python
def get(self, key, default=None):
idx = self._probe(key)
if self.keys[idx] in (self.EMPTY, self.DELETED): return default
return self.vals[idx]

def delete(self, key):
idx = self._probe(key)
if self.keys[idx] in (self.EMPTY, self.DELETED): return False
\`\`\`

self.keys[idx] = self.DELETED # TOMBSTONE — never EMPTY!

\`\`\`python
# Setting EMPTY would break probe chains for other keys
\`\`\`

self.vals[idx] = None; self.size -= 1; return True


\`\`\`python
def _resize(self, new_cap):
\`\`\`

old_k, old_v = self.keys, self.vals
self.cap = new_cap
self.keys = [self.EMPTY] * new_cap
self.vals = [None] * new_cap; self.size = 0

\`\`\`python
for k, v in zip(old_k, old_v):
if k not in (self.EMPTY, self.DELETED): self.set(k, v)

# THE HASH FLOODING ATTACK (2011):
# Attacker crafts HTTP params where ALL keys hash to same bucket
# O(1) expected lookup becomes O(n) worst case per parameter
# n=1000 params: 1,000,000 comparisons per request = DoS
# Affected: PHP, Java, Python, Ruby, Perl, ASP.NET simultaneously

# FIX: randomize hash seed per process (PYTHONHASHSEED)
# Python added this in 3.3 specifically to defeat this attack
# hash('hello') is DIFFERENT every Python process start
# Never serialize hash() values or rely on them across processes

# HASH FUNCTION GUIDE:
# SipHash (Python default): DoS-resistant, seeded randomly, ~1-2ns/byte
# xxHash: fastest non-cryptographic (>40 GB/s), great distribution
# BLAKE3: cryptographic AND fast (>2 GB/s) — new systems should use this
# SHA-256: standard cryptographic, 400 MB/s — for signing, content addressing
# NEVER: MD5, SHA-1 for security (broken), bad_sum_of_chars for tables
\`\`\``
  },
  {
    id: "5-5",
    number: "5.5",
    title: "Dynamic Array: Amortized Analysis of Growth",
    content: `### 5.5.1 AVL Tree: Self-Balancing BST


\`\`\`python
# AVL Tree: O(log n) guaranteed for all operations
# Balance invariant: |height(left) - height(right)| <= 1 for every node

class AVLNode:
def __init__(self, key, val):
\`\`\`

self.key = key; self.val = val
self.left = self.right = None; self.height = 1


\`\`\`python
class AVLTree:
def __init__(self): self.root = None
def _h(self, n): return n.height if n else 0
def _bf(self, n): return self._h(n.left) - self._h(n.right)
def _upd(self, n): n.height = 1 + max(self._h(n.left), self._h(n.right))

def _rr(self, y): # right rotation
x = y.left; t2 = x.right
\`\`\`

x.right = y; y.left = t2
self._upd(y); self._upd(x); return x


\`\`\`python
def _rl(self, x): # left rotation
y = x.right; t2 = y.left
\`\`\`

y.left = x; x.right = t2
self._upd(x); self._upd(y); return y


\`\`\`python
def _insert(self, node, key, val):
if not node: return AVLNode(key, val)
if key < node.key: node.left = self._insert(node.left, key, val)
elif key > node.key: node.right = self._insert(node.right, key, val)
else: node.val = val; return node
\`\`\`

self._upd(node); bf = self._bf(node)

\`\`\`python
if bf > 1:
if key > node.left.key: node.left = self._rl(node.left)
return self._rr(node)
if bf < -1:
if key < node.right.key: node.right = self._rr(node.right)
return self._rl(node)
return node

def insert(self, key, val): self.root = self._insert(self.root, key, val)

def search(self, key):
n = self.root
while n:
if key == n.key: return n.val
n = n.left if key < n.key else n.right
return None

# REAL-WORLD USES OF BALANCED BSTs:
# Linux CFS scheduler: Red-Black tree of runnable threads by vruntime
# Java TreeMap/TreeSet: Red-Black tree for sorted maps and sets
# C++ std::map/std::set: Red-Black tree
# Python sortedcontainers: SortedList, SortedDict, SortedSet
# Database index structures (in-memory sorted indexes)
\`\`\`

### 5.5.2 B-Trees: The Database Engine


\`\`\`python
# B-TREE: designed for block I/O — each node fills one disk page

# PostgreSQL B+ tree parameters:
# Page size: 8192 bytes
# Index entry (int4 + heap pointer): ~40 bytes
# Keys per page: 8192 / 40 ≈ 200 keys per internal node

# HEIGHT vs ROWS:
# Height 1: 200 keys
# Height 2: 200^2 = 40,000 keys
# Height 3: 200^3 = 8,000,000 keys
# Height 4: 200^4 = 1,600,000,000 keys ← 1.6 BILLION rows, 4 page reads!

# Finding 1 row in 1.6 billion:
# Without index: 1.6B row reads (sequential scan)
# With B-tree: 4 page reads (navigate tree) + 1 heap read
# Speedup: 320,000,000x for a single lookup

# COMPOSITE INDEX RULES:
# Index on (a, b, c):
# WHERE a = ? YES — uses index (leftmost prefix)
# WHERE a = ? AND b = ? YES — uses a and b
# WHERE b = ? NO — missing leading column a
# WHERE a = ? AND c = ? PARTIAL — uses a, skips b, cannot filter c
# Always put high-cardinality equality columns first

# COVERING INDEX (index-only scan — never reads heap):
# CREATE INDEX idx ON orders(customer_id) INCLUDE (status, total);
# SELECT status, total FROM orders WHERE customer_id = 42;
# Zero heap page reads — data is entirely in the index
# 2-3x faster for read-heavy queries on large tables

# B+ TREE vs B-TREE:
# B+ tree: data only in leaf nodes; leaves linked for range scans
# B tree: data in all nodes; faster single lookup, no range advantage
# ALL major databases use B+ trees: PostgreSQL, MySQL, SQLite, Oracle
\`\`\``
  },
  {
    id: "5-6",
    number: "5.6",
    title: "Linked Lists: Singly and Doubly Linked",
    content: `\`\`\`python
import heapq
from dataclasses import dataclass, field

# Python heapq: min-heap backed by a list
# Invariant: h[k] <= h[2k+1] and h[k] <= h[2k+2] for all k

h = []
\`\`\`

heapq.heappush(h, 5); heapq.heappush(h, 1); heapq.heappush(h, 8)

\`\`\`python
print(h[0]) # O(1) peek minimum: 1
print(heapq.heappop(h)) # O(log n) extract min: 1

lst = [5,3,8,1,9,2,7]
\`\`\`

heapq.heapify(lst) # O(n) — Floyd's algorithm, NOT O(n log n)!

\`\`\`python
# Proof: work at each level = n/2^i nodes x O(i) sift each
# Total: sum(n/2^i * i for i) = O(n) by geometric series

# MAX-HEAP: negate all values
max_h = []
\`\`\`

[heapq.heappush(max_h, -v) for v in [5,1,8,3,9]]

\`\`\`python
print(-heapq.heappop(max_h)) # 9

# PRIORITY QUEUE FOR TASK SCHEDULING:
@dataclass(order=True)
class Task:
\`\`\`

priority: int # lower = higher priority
name: str = field(compare=False)


\`\`\`python
tasks = []
\`\`\`

heapq.heappush(tasks, Task(3, 'newsletter'))
heapq.heappush(tasks, Task(1, 'payment')) # runs first
heapq.heappush(tasks, Task(2, 'email'))

\`\`\`python
print(heapq.heappop(tasks).name) # 'payment'

# TOP-K ELEMENTS:
def top_k(stream, k):
heap = []
for x in stream:
\`\`\`

heapq.heappush(heap, x)

\`\`\`python
if len(heap) > k: heapq.heappop(heap)
return sorted(heap, reverse=True)

# STREAMING MEDIAN (two heaps):
# max-heap for lower half, min-heap for upper half
# Keep |len(lower) - len(upper)| <= 1
# Median = top of larger heap OR average of both tops

# COMPLEXITIES:
# heappush/pop: O(log n) h[0] peek: O(1) heapify: O(n)
# USE FOR: Dijkstra, A*, event simulation, scheduling, top-K
\`\`\``
  },
  {
    id: "5-7",
    number: "5.7",
    title: "When Linked Lists Actually Beat Arrays",
    content: `\`\`\`python
import math

class BloomFilter:
def __init__(self, capacity, fp_rate):
# Optimal bits: m = -n*ln(p) / (ln2)^2
\`\`\`

self.m = int(-capacity * math.log(fp_rate) / (math.log(2)**2))

\`\`\`python
# Optimal hash count: k = (m/n) * ln2
\`\`\`

self.k = max(1, round(self.m / capacity * math.log(2)))
self.bits = bytearray(self.m // 8 + 1)

\`\`\`python
print(f'{self.m:,} bits ({self.m//8//1024:.1f} KB), {self.k} hash functions')

def _hashes(self, item):
h1 = hash(item + ':1') % self.m
h2 = hash(item + ':2') % self.m
for i in range(self.k):
yield (h1 + i * h2) % self.m

def add(self, item):
for h in self._hashes(item):
\`\`\`

self.bits[h // 8] |= (1 << (h % 8))


\`\`\`python
def might_contain(self, item) -> bool:
return all(self.bits[h//8] & (1<<(h%8)) for h in self._hashes(item))
# True → MIGHT be in set (false positive rate = fp_rate)
# False → DEFINITELY NOT in set (zero false negatives ever)

# 1M items, 1% false positive: ~9.6 MB vs ~50-100 MB for a set
# Used by: Chrome Safe Browsing, Cassandra, Bitcoin SPV, RocksDB

# TRIE: prefix tree for string keys
class TrieNode:
def __init__(self):
\`\`\`

self.children = {} # char -> TrieNode
self.is_end = False


\`\`\`python
class Trie:
def __init__(self): self.root = TrieNode()

def insert(self, word): # O(L) where L = len(word)
n = self.root
for c in word:
if c not in n.children: n.children[c] = TrieNode()
n = n.children[c]
\`\`\`

n.is_end = True


\`\`\`python
def search(self, word) -> bool: # O(L)
n = self.root
for c in word:
if c not in n.children: return False
n = n.children[c]
return n.is_end

def autocomplete(self, prefix) -> list:
n = self.root
for c in prefix:
if c not in n.children: return []
n = n.children[c]
results = []
def dfs(node, path):
if node.is_end: results.append(path)
for c, child in sorted(node.children.items()):
dfs(child, path + c)
dfs(n, prefix)
return results

# WHEN TRIES BEAT HASH MAPS:
# Prefix queries: 'all words starting with X' — O(|prefix|) to navigate
# IP routing: longest-prefix matching (routers use Patricia/radix tries)
# Spell checking: all words within edit distance K
# Dictionary compression: shared prefixes save significant space
\`\`\``
  },
  {
    id: "5-8",
    number: "5.8",
    title: "Hash Tables: The Most Important Data Structure",
    content: `Hash table with Robin Hood hashing: implement open addressing where on collision, if new element has longer probe sequence than incumbent, swap them. Benchmark against standard linear probing for 1M inserts and lookups.
LRU Cache O(1): implement using doubly-linked list plus hash map. Support get(key) and put(key, value) with capacity limit. Test with 1M operations. Verify eviction order is correct.
B-tree order 3: implement insert and search. Insert 50 random integers. Verify: all leaves at same depth, all non-root nodes have 2-5 keys. Count comparisons per search.
Bloom filter analysis: test with 100K inserts then 100K non-inserted queries. Measure actual vs theoretical false positive rate for m/n ratios of 5, 8, 10, 15, 20. Plot the curve.
External sort: sort a 500MB file of int64 using 64MB memory. Phase 1: read chunks, sort, write temp files. Phase 2: k-way merge using a min-heap. Measure I/O vs CPU time.
Chapter 5 — Ten Data Structure Truths
Data structure choice changes complexity class. O(n) vs O(1) is not a factor — it is a scalability cliff that no hardware overcomes.
Arrays are cache-friendly, SIMD-vectorizable, and prefetcher-friendly. Use them unless a specific invariant requires a different structure.
Struct of Arrays outperforms Array of Structs 2-4x for bulk column operations. Game engines and columnar databases exploit this pattern.
Dynamic array append is O(1) amortized via doubling. Insertion at position i is O(n). Avoid inserting in the middle of large arrays.
Linked lists beat arrays only when you have a direct node reference AND do not need random access. LRU cache is the canonical valid use.
Hash tables: SipHash for DoS resistance (Python default). xxHash for non-security use. BLAKE3 or SHA-256 for cryptographic use.
Load factor above 0.7 causes hash table probe chains to explode. Most implementations resize at 0.7-0.75 to maintain O(1) operations.
B-trees minimize disk I/O by fitting many keys per page. For 1.6 billion rows, at most 4 page reads finds any row with a proper index.

\`\`\`python
heapify() builds a heap in O(n) using Floyd's algorithm. Not O(n log n). Use it when converting a list to a priority queue.
\`\`\`

Bloom filters use 10x less memory than hash sets at 1% false positive rate. Zero false negatives. Perfect for probably-yes definitely-no checks.


---


CHAPTER 6
ALGORITHMS: FROM INTUITION TO PROOF
Sorting, Graphs, Dynamic Programming, and Computational Complexity — Complete Mastery

"An algorithm must be seen to be believed." — Donald Knuth`
  },
  {
    id: "5-9",
    number: "5.9",
    title: "Hash Functions: FNV-1a, MurmurHash, SipHash, xxHash",
    content: `A Hash Function is not a Cryptographic Hash (like SHA-256). For data structures, we need speed and distribution, not collision resistance against a powerful adversary (though SipHash is a notable exception).

## FNV-1a (Fowler-Noll-Vo)
A simple, fast hash function based on prime number multiplication and XORing.
\`\`\`python
def fnv1a(data):
    hash_val = 2166136261  # FNV offset basis
    for byte in data:
        hash_val ^= byte
        hash_val *= 16777619  # FNV prime
    return hash_val
\`\`\`
**Use Case**: Simple sets and maps where performance is paramount.

## MurmurHash (and CityHash)
Designed by Austin Appleby, MurmurHash is significantly faster than FNV and has excellent distribution properties. It uses "mixing" steps to ensure small changes in input cause large changes in output.
**Use Case**: Used extensively in Hadoop, Cassandra, and many internal Google systems.

## SipHash
Unlike others, SipHash is designed to be **secure** against "Hash Flooding" attacks. It uses a secret key to randomize the output.
**Use Case**: Default hash for Python, Ruby, Rust, and Perl. It trades a bit of speed (~3-5x slower than Murmur) for security.

## xxHash
Currently the gold standard for non-cryptographic hashing. It operates at speeds close to the memory bandwidth limit (GB/s).
**Use Case**: Real-time data processing, checksums in filesystems (ZFS).

## The "Perfect Hash"
If the set of keys is static (e.g., reserved words in a programming language compiler), we can use a **Perfect Hash Function** generator (like Gperf) to create a function with zero collisions.`
  },
  {
    id: "5-10",
    number: "5.10",
    title: "Collision Resolution: Chaining vs Open Addressing",
    content: `Collisions are inevitable due to the **Pigeonhole Principle**. How we handle them defines the memory layout of our table.

## 1. Separate Chaining
Each bucket in the array points to a **Linked List** (or a balanced tree) of entries.
- **Pros**: Simple to implement. Deletion is easy. The table can hold more items than buckets ($\lambda > 1$).
- **Cons**: Pointer chasing leads to cache misses. Requires dynamic memory allocation for each node.

## 2. Open Addressing (Closed Hashing)
All entries are stored within the array itself. If a collision occurs, we "probe" for the next empty slot.
- **Linear Probing**: Check \`index + 1\`, \`index + 2\`, etc.
    - *Problem*: **Primary Clustering**. Long runs of occupied slots build up, slowing down searches.
- **Quadratic Probing**: Check \`index + 1^2\`, \`index + 2^2\`, etc. Reduces clustering but can lead to **Secondary Clustering**.
- **Double Hashing**: Use a second hash function to determine the probe step: \`index + i * hash2(key)\`.

## The "Tombstone" Problem
In Open Addressing, when you delete an item, you cannot simply empty the slot, or you would break the "chain" for items that were placed further down during a probe. You must leave a **Tombstone** marker. Too many tombstones degrade performance, requiring a "rehash" to clean them up.

| Feature | Chaining | Open Addressing |
| :--- | :--- | :--- |
| Performance at high $\lambda$ | Degrades slowly | Degrades sharply |
| Cache Friendliness | Poor | Excellent |
| Implementation | Simple | Complex |
| Max Items | Infinite | $k$ (buckets) |`
  },
  {
    id: "5-11",
    number: "5.11",
    title: "Robin Hood Hashing and Swiss Tables",
    content: `Modern high-performance Hash Tables have moved beyond simple linear probing.

## Robin Hood Hashing
The core idea: **"Take from the rich, give to the poor."**
In a standard linear probe, some items are lucky (at their ideal index, distance = 0) while others are unlucky (pushed far away, distance = 10).
When inserting a new item, if its "Distance from Ideal" is greater than the item currently in the slot, we **swap** them. The new item takes the slot, and we continue searching for a home for the displaced item.
- **Result**: Drastically reduces the variance of probe lengths. Most lookups end very quickly because long "tail" probe sequences are eliminated.

## Swiss Tables (Abseil / HashBrown)
Used in Google's Abseil library and Rust's standard library, Swiss Tables use **SIMD Metadata** to speed up lookups.
1.  The table is split into "Control" bytes and "Slot" bytes.
2.  The Control byte stores the lower 7 bits of the hash.
3.  To find a key, the CPU uses a SIMD instruction (e.g., \`_mm_cmpeq_epi8\` on x86) to compare the hash of the target key against **16 buckets simultaneously**.
4.  Only if a match is found in the metadata do we check the actual key in the slot.

This approach virtually eliminates the "Search" cost in the $O(1)$ lookup, making the table performance bounded by memory latency rather than CPU cycles.`
  },
  {
    id: "5-12",
    number: "5.12",
    title: "Hash Table Sizing and Load Factor Analysis",
    content: `How large should your hash table be?

## Power of Two vs. Prime Numbers
- **Prime Number Sizing**: Using a prime number for the table size (e.g., 101, 1031) helps distribute keys better if the hash function is mediocre. You use the modulo operator: \`index = hash % prime\`. Modulo on primes is slow.
- **Power of Two Sizing**: Modern implementations (Java, Python, Rust) use sizes like $2^{10}, 2^{11}$. This allows for a very fast bitwise AND: \`index = hash & (size - 1)\`. However, this requires a "high-quality" hash function because it only uses the lower bits of the hash.

## The Cost of Resizing
When the load factor $\lambda$ crosses a threshold (usually 0.7 for open addressing), we must **Rehash**.
1. Create a new array (usually double the size).
2. For each item in the old array, calculate its new index.
3. Insert into the new array.
This is $O(n)$. In a web server, a rehash on a map with 10 million entries can cause a "freeze" of several hundred milliseconds.

## Incremental Resizing
Redis and MongoDB use incremental resizing. Instead of moving all items at once, they maintain two tables. Every time a user performs a \`GET\` or \`SET\`, the system moves a few items (e.g., 10 buckets) from the old table to the new one. Eventually, the old table is emptied and deleted. This spreads the $O(n)$ cost over many operations, maintaining low latency.`
  },
  {
    id: "5-13",
    number: "5.13",
    title: "Trees: Binary Search Trees",
    content: `While Hash Tables are great for exact lookups, they are useless for **Ordered Data**. If you need to find "all users with age between 20 and 30," a Hash Table requires scanning every element ($O(n)$). This is where **Trees** shine.

## Binary Search Tree (BST) Properties
A tree where for every node:
1. All keys in the **Left Subtree** are smaller than the node's key.
2. All keys in the **Right Subtree** are larger than the node's key.

## Operations
- **Search**: $O(h)$ where $h$ is the height.
- **Insert**: $O(h)$.
- **In-order Traversal**: Visiting (Left, Root, Right) yields the keys in sorted order in $O(n)$.

## The Fatal Flaw: Imbalance
A BST is only $O(\log n)$ if it is balanced. If you insert sorted data (1, 2, 3, 4, 5), the BST becomes a "degenerate" tree—effectively a Linked List—and performance collapses to $O(n)$.

\`\`\`text
1
 \\
  2
   \\
    3  <-- Degenerate Tree
\`\`\`

To prevent this, we use **Self-Balancing Trees** which perform "Rotations" during insertion and deletion to keep the height at approximately $\log n$.`
  },
  {
    id: "5-14",
    number: "5.14",
    title: "AVL Trees: Self-Balancing with Rotations",
    content: `Named after Adelson-Velsky and Landis, the **AVL Tree** was the first self-balancing BST.

## The Balance Factor
For every node, the height of its left and right subtrees can differ by **at most 1**.
\`BalanceFactor = height(left) - height(right)\`
Valid values: $\{-1, 0, 1\}$.

## Tree Rotations
When an insertion violates the balance, the tree performs a rotation. There are four cases:
1.  **Left-Left (LL)**: Fixed by a Single Right Rotation.
2.  **Right-Right (RR)**: Fixed by a Single Left Rotation.
3.  **Left-Right (LR)**: Fixed by a Left Rotation then a Right Rotation.
4.  **Right-Left (RL)**: Fixed by a Right Rotation then a Left Rotation.

## Performance
- **Search**: Faster than Red-Black trees because AVL trees are more strictly balanced.
- **Insert/Delete**: Slower than Red-Black trees because they may require more frequent rotations to maintain the strict balance.

**When to use**: Use AVL trees when lookups are much more frequent than insertions (e.g., a static dictionary or lookup table).`
  },
  {
    id: "5-15",
    number: "5.15",
    title: "Red-Black Trees: The Industry Standard",
    content: `The **Red-Black Tree** is the most widely used balanced BST in production. It powers C++ \`std::map\`, Java \`TreeMap\`, and the Linux kernel's process scheduler (CFS).

## The Rules (The Invariants)
1. Every node is either **Red** or **Black**.
2. The root is always **Black**.
3. Red nodes cannot have Red children (No two Reds in a row).
4. Every path from a node to its descendant \`null\` nodes must contain the same number of **Black** nodes (**Black Height**).

## Why Red-Black?
Unlike AVL trees, which require strict height balance, Red-Black trees allow the longest path to be up to **twice** as long as the shortest path. This "looser" constraint means fewer rotations are required during insertions and deletions.

## Complexity
- Search: $O(\log n)$
- Insert: $O(\log n)$ (Max 2 rotations)
- Delete: $O(\log n)$ (Max 3 rotations)

The Red-Black tree strikes the perfect balance between search speed and update efficiency. In the Linux kernel, the **Completely Fair Scheduler (CFS)** uses a Red-Black tree to keep track of process runtimes. The process with the least runtime (the leftmost node) is chosen to run next, and updating its runtime takes $O(\log n)$.`
  },
  {
    id: "5-16",
    number: "5.16",
    title: "B-Trees and B+ Trees: The Database Engine",
    content: `If we need to store 100 Terabytes of data, we cannot keep it all in RAM. We must use Disk (SSD/HDD). Binary Trees are terrible for disks because they have a low **fan-out** (only 2 children). A tree with 1 billion nodes would be 30 levels deep, requiring 30 disk seeks. Disks are slow; seeks are expensive.

## The B-Tree (Balanced Tree)
A B-Tree is a "fat" tree. Each node can have many children (e.g., $M = 100$).
- A node with $M$ children can store $M-1$ keys.
- This keeps the tree very shallow. A B-Tree with 1 billion entries and a fan-out of 100 is only 5 levels deep.

## B+ Trees: The Golden Standard
Nearly all relational databases (PostgreSQL, MySQL/InnoDB) and filesystems (NTFS, APFS, XFS) use **B+ Trees**.
- **Internal Nodes**: Only store keys to guide the search.
- **Leaf Nodes**: Store the actual data (or pointers to it).
- **Linked Leaves**: All leaf nodes are linked together in a doubly-linked list.

**Why B+ over B?**
1. **Range Scans**: Because leaves are linked, you can find the start of a range ($O(\log n)$) and then just follow the pointers ($O(k)$) to get all subsequent values. In a standard B-Tree, you'd have to perform many tree traversals.
2. **Cache Efficiency**: Internal nodes are smaller (no data), so more of them fit in the CPU cache or RAM, further reducing disk I/O.`
  },
  {
    id: "5-17",
    number: "5.17",
    title: "Heaps and Priority Queues",
    content: `A **Priority Queue** is an ADT where each element has a "priority." The element with the highest priority is always removed first. The **Heap** is the most efficient data structure to implement it.

## The Binary Heap
A Binary Heap is a "Complete Binary Tree" (all levels filled except possibly the last, which is filled left-to-right).
- **Max-Heap Property**: Parent $\ge$ Children.
- **Min-Heap Property**: Parent $\le$ Children.

## The Array Implementation Magic
Because a heap is a complete tree, we don't need pointers! We can store it in a simple array:
- For a node at index \`i\`:
    - Left Child: \`2i + 1\`
    - Right Child: \`2i + 2\`
    - Parent: \`(i - 1) / 2\`

## Key Operations
1. **Push ($O(\log n)$)**: Add to the end of the array and "Bubble Up" until the heap property is restored.
2. **Pop ($O(\log n)$)**: Remove the root, move the last element to the root, and "Bubble Down" (Sift Down).
3. **Peek ($O(1)$)**: The root of the heap is always at \`arr[0]\`.

## Use Cases
- **Task Scheduling**: The OS runs the process with the highest priority.
- **Dijkstra's Algorithm**: Finding the shortest path in a graph.
- **Heapsort**: An $O(n \log n)$ sorting algorithm that uses $O(1)$ extra space.`
  },
  {
    id: "5-18",
    number: "5.18",
    title: "Fibonacci Heaps: Theoretical Optimum for Dijkstra",
    content: `While Binary Heaps are great, some algorithms (like Dijkstra's or Prim's) perform many more "Decrease Key" operations than "Extract Min" operations.

## The Efficiency Gap
| Operation | Binary Heap | Fibonacci Heap (Amortized) |
| :--- | :--- | :--- |
| Insert | $O(\log n)$ | $O(1)$ |
| Extract Min | $O(\log n)$ | $O(\log n)$ |
| Decrease Key | $O(\log n)$ | $O(1)$ |
| Merge | $O(n)$ | $O(1)$ |

## How it works
A Fibonacci Heap is a collection of trees (a forest). It delays the work of maintaining the heap property.
- **Insert**: Just add a new tree to the forest ($O(1)$).
- **Decrease Key**: Cut the node from its parent and add it as a new tree in the forest ($O(1)$).
- **Extract Min**: This is where the work happens. It finds the min, removes it, and then "consolidates" the forest into a more structured set of trees ($O(\log n)$).

## The Catch
Fibonacci Heaps have a very high **constant factor**. The pointers and bookkeeping required make them slower than Binary Heaps for small or medium datasets. They are primarily of theoretical interest unless you are dealing with extremely large, dense graphs where the $O(1)$ Decrease Key truly pays off.`
  },
  {
    id: "5-19",
    number: "5.19",
    title: "Tries: Prefix Trees for Strings",
    content: `A **Trie** (derived from "retrieval") is a specialized tree used to store a set of strings.

## Structure
Each node represents a character. A path from the root to a node represents a prefix.
- If we store "cat", "car", and "dog":
    - The root has children 'c' and 'd'.
    - 'c' has a child 'a', which has children 't' and 'r'.

## Advantages
1. **Prefix Search**: Finding all words starting with "ca" is $O(L)$ where $L$ is the length of the prefix. In a Hash Map, you'd have to scan everything.
2. **Autocompletion**: Tries are the backbone of search engine suggestions and T9 texting.
3. **Space**: Common prefixes are stored only once.

## The Cost
Memory. In a naive implementation, each node might have an array of 26 pointers (for A-Z). If most nodes only have 1 or 2 children, this is incredibly wasteful.
**Solutions**:
- **Compressed Tries (Radix Trees)**: Combine nodes with only one child (e.g., "apple" becomes one node if there are no other "ap..." words).
- **Ternary Search Trees**: Use a BST structure at each node to store children, saving space at the cost of a little speed.`
  },
  {
    id: "5-20",
    number: "5.20",
    title: "Suffix Arrays and Suffix Trees",
    content: `While Tries are for sets of words, **Suffix Trees** and **Suffix Arrays** are for searching *inside* a single long string (like the human genome).

## Suffix Tree
A compressed Trie of all suffixes of a string.
For "banana$":
Suffixes: "banana$", "anana$", "nana$", "ana$", "na$", "a$", "$"
A suffix tree allows you to find any substring of length $m$ in $O(m)$ time, regardless of how long the main string is. It's used in bioinformatics for DNA pattern matching.

## Suffix Array
The Suffix Tree is complex to implement and memory-heavy. The **Suffix Array** is a simpler, more space-efficient alternative. It is an array of integers representing the starting positions of all suffixes, sorted lexicographically.

String: \`banana\`
Indices:
0: banana
1: anana
2: nana
3: ana
4: na
5: a

Sorted Suffixes:
5: a
3: ana
1: anana
0: banana
4: na
2: nana

Suffix Array: \`[5, 3, 1, 0, 4, 2]\`

To find a pattern, you perform a **Binary Search** on the Suffix Array in $O(m \log n)$. When combined with a **Longest Common Prefix (LCP)** array, Suffix Arrays can match the performance of Suffix Trees for most problems.`
  },
  {
    id: "5-21",
    number: "5.21",
    title: "Skip Lists: Probabilistic Balance",
    content: `Balancing a BST (AVL/Red-Black) is complex. **Skip Lists** provide $O(\log n)$ search and insertion using **Randomization** instead of complex rotations.

## The Structure
Imagine a sorted Linked List. Searching takes $O(n)$.
Now, imagine a second list on top that "skips" every other element.
Now a third list that skips every 4 elements.
You can "zoom" in on your target by starting at the top level and dropping down when you overshoot.

## Building the List
When inserting an element:
1. Insert it into the base list.
2. Flip a coin. If it's Heads, "promote" the element to the next level up.
3. Repeat until you flip Tails.

## Why it works
Statistically, the skip list will have $\log n$ levels, and searching will take $\log n$ steps. Because it's just linked lists, it's much easier to implement a **Concurrent Skip List** (using CAS) than a concurrent balanced tree.
**Real-world use**: Redis (\`ZSET\`), Lucene (search indices), and LevelDB/RocksDB (MemTables).`
  },
  {
    id: "5-22",
    number: "5.22",
    title: "Bloom Filters: Probabilistic Set Membership",
    content: `Sometimes you don't need to know *what* is in a set, just *if* it might be there.

## The Problem
Imagine a database with 1 billion rows. A user requests \`user:99999\`. If that user doesn't exist, the database might still perform a slow disk seek to find out.

## The Solution: Bloom Filter
A Bloom Filter is a large bit array and $k$ hash functions.
- **To add an item**: Hash it $k$ times and set those bits to 1.
- **To check an item**: Hash it $k$ times. If *any* of those bits are 0, the item is **definitely not** in the set. If all are 1, the item is **probably** in the set.

## False Positives
A Bloom Filter never has **False Negatives**. If it says "No," it's "No."
It can have **False Positives**. It might say "Yes" when the item isn't there (because other items happened to flip the same bits). You can tune the false positive rate by adjusting the number of bits and hash functions.

**Usage**: Google Chrome uses a Bloom Filter to check if a URL is on a malicious site list. If the filter says "Yes," it then performs a full, slow check against the server.`
  },
  {
    id: "5-23",
    number: "5.23",
    title: "Count-Min Sketch: Frequency Estimation",
    content: `If a Bloom Filter is a probabilistic **Set**, a Count-Min Sketch is a probabilistic **Frequency Map**.

## The Problem
You want to count the occurrences of millions of unique URLs in a high-speed stream (like a 10Gbps backbone). A Hash Map would consume Gigabytes of RAM.

## The Structure
A 2D array of counters (width $w$, depth $d$) and $d$ hash functions.
1. When an item arrives, hash it with each function.
2. Increment the corresponding counter in each row: \`Table[row][hash_i(item)]++\`.
3. To estimate the count, take the **Minimum** of all the counters associated with that item.

## Why the Minimum?
Since multiple items can hash to the same counter, the counters always **overestimate** the count. By taking the minimum of several independent hash-based counters, you drastically reduce the error.

**Usage**: Used in top-K heavy hitter detection, network traffic monitoring, and recommendation engines (e.g., "Which songs are being played most right now?").`
  },
  {
    id: "5-24",
    number: "5.24",
    title: "HyperLogLog: Cardinality Estimation",
    content: `How many **unique** users visited your site today?
- 10 users? Easy.
- 10 billion users? A Hash Set of IDs would take 80GB+.

**HyperLogLog (HLL)** can estimate the cardinality of a set with 1 billion+ elements using only **1.5 KB** of memory, with a standard error of ~2%.

## The Intuition: Leading Zeros
If you flip a coin and get 5 Heads in a row, you'd guess you've flipped the coin about $2^5 = 32$ times.
HLL does this with hashes:
1. Hash the input.
2. Count the number of leading zeros in the hash.
3. If the max leading zeros observed is $n$, the number of unique items is approximately $2^n$.

To improve accuracy, HLL splits the stream into thousands of "buckets" and takes the **harmonic mean** of their estimates.

**Real-world use**: Redis \`PFADD\`, BigQuery \`APPROX_COUNT_DISTINCT\`. It allows huge companies to count unique events across massive datasets in real-time.`
  },
  {
    id: "5-25",
    number: "5.25",
    title: "Disjoint Sets: Union-Find with Path Compression",
    content: `Disjoint Set Union (DSU) manages a collection of elements split into non-overlapping sets. It's the engine for **Kruskal's Algorithm** (Minimum Spanning Tree).

## Operations
1. **Find**: Determine which set an element belongs to (returns the "root" of the set).
2. **Union**: Merge two sets into one.

## Optimization 1: Path Compression
When you call \`Find(x)\`, you traverse up to the root. **Path Compression** makes every node along the path point *directly* to the root. This flattens the tree.

## Optimization 2: Union by Rank/Size
Always attach the smaller tree under the root of the larger tree. This prevents the tree from becoming too deep.

## Complexity
With both optimizations, the complexity per operation is $O(\alpha(n))$, where $\alpha$ is the **Inverse Ackermann Function**. For all practical purposes (up to the number of atoms in the universe), $\alpha(n) < 5$. It is effectively constant time.

\`\`\`python
def find(parent, i):
    if parent[i] == i:
        return i
    parent[i] = find(parent, parent[i]) # Path Compression
    return parent[i]
\`\`\`

**Usage**: Cycle detection in graphs, image segmentation (grouping pixels), and social network connectivity.`
  },
  {
    id: "5-26",
    number: "5.26",
    title: "Segment Trees and Fenwick Trees",
    content: `These structures are designed for **Range Queries** on an array that is frequently updated.

## The Problem
You have an array. You need to:
1. Update value at index $i$.
2. Find the sum (or min/max) of elements from index $L$ to $R$.
- Array: Update $O(1)$, Sum $O(n)$.
- Prefix Sums: Update $O(n)$, Sum $O(1)$.
We need both to be $O(\log n)$.

## Segment Tree
A binary tree where each node stores the aggregate (e.g., sum) of a range. The root stores $[0, n-1]$. Its children store $[0, n/2]$ and $[n/2+1, n-1]$.
- **Update**: $O(\log n)$ (update leaf and ancestors).
- **Query**: $O(\log n)$ (sum of a few nodes covering the range).

## Fenwick Tree (Binary Indexed Tree)
A more compact, array-based version of a segment tree. It uses bit manipulation (\`i & -i\`) to navigate. It is harder to understand but uses less memory and is faster in practice.

| Operation | Segment Tree | Fenwick Tree |
| :--- | :--- | :--- |
| Memory | $4n$ | $n$ |
| Range Sum | Yes | Yes |
| Range Max/Min | Yes | Only with complexity |
| Code Complexity | High | Low |`
  },
  {
    id: "5-27",
    number: "5.27",
    title: "Spatial Data Structures: KD-Trees, R-Trees, Quadtrees",
    content: `How does Uber find the 5 closest drivers to your location? They don't check every driver's distance ($O(n)$). They use **Spatial Data Structures**.

## 1. Quadtrees / Octrees
Recursive decomposition of space into 4 (2D) or 8 (3D) quadrants. If a quadrant has too many points, it splits.
**Use Case**: Collision detection in games, image compression.

## 2. KD-Trees (K-Dimensional Trees)
A BST that alternates the dimension it splits on at each level (e.g., Level 1 splits on X, Level 2 on Y, Level 3 on X...).
**Use Case**: Nearest neighbor search in machine learning (k-NN).

## 3. R-Trees (Rectangle Trees)
Groups nearby objects and represents them with their **Minimum Bounding Rectangle (MBR)**.
**Use Case**: The foundation of **PostGIS** and all modern mapping software. When you query a map, the database only checks objects whose MBR intersects your screen's MBR.

These structures reduce spatial queries from $O(n)$ to $O(\log n)$ by effectively "pruning" large areas of space that couldn't possibly contain the result.`
  },
  {
    id: "5-28",
    number: "5.28",
    title: "Case Study: Redis Data Structures Dissected",
    content: `Redis is the "Swiss Army Knife" of data structures. It's successful because it doesn't just use *one* implementation for a type; it switches implementations based on data size.

## Strings (SDS - Simple Dynamic Strings)
Redis doesn't use C strings (null-terminated). It uses SDS, which stores the length. This makes \`strlen()\` $O(1)$ and prevents buffer overflows.

## Hash Maps (ZipList to Hash Table)
- **Small Hashes**: Stored as a **ZipList** (a highly compressed, contiguous byte array). This is extremely cache-friendly and saves memory.
- **Large Hashes**: Automatically converted to a standard Hash Table with incremental resizing.

## Sorted Sets (ZipList to Skip List)
- **Small Sets**: ZipList.
- **Large Sets**: A combination of a **Hash Map** (for $O(1)$ score lookup) and a **Skip List** (for $O(\log n)$ range queries).

## Key Insight
Redis prioritizes **Memory Efficiency** and **Cache Locality** for small data, and **Algorithmic Complexity** for large data. This "dual-implementation" strategy is a masterclass in pragmatic software engineering.`
  },
  {
    id: "5-29",
    number: "5.29",
    title: "Exercises",
    content: `Test your mastery of data structures with these challenges.

1.  **Dynamic Array Analysis**: If a dynamic array grows by a factor of 3 (instead of 2), is the amortized cost of insertion still $O(1)$? Prove it.
    - *Answer*: Yes. Any geometric growth $\alpha > 1$ results in amortized $O(1)$. The number of copies forms a geometric series that converges to $n \cdot (\frac{\alpha}{\alpha-1})$.

2.  **XOR Linked List**: How can you implement a Doubly Linked List using only ONE pointer's worth of space per node?
    - *Answer*: Store \`node.ptr_diff = prev_address ^ next_address\`. To move forward, calculate \`next = curr.ptr_diff ^ prev\`.

3.  **Hash Table Collision**: Given a hash table of size 100 using linear probing, where do the keys hash if the hash function is \`h(k) = k % 100\`? Insert 42, 142, 242.
    - *Answer*: 42 at index 42, 142 at 43, 242 at 44.

4.  **Tree Balancing**: Insert 10, 20, 30 into an empty AVL tree. What rotation occurs?
    - *Answer*: A Left Rotation on node 10. 20 becomes the new root, with 10 as left child and 30 as right.

5.  **Min-Heap Array**: If a Min-Heap is stored in an array \`[10, 20, 15, 30, 40, 50]\`, what is the array after inserting \`5\`?
    - *Answer*: \`[5, 20, 10, 30, 40, 50, 15]\`. (5 is added at the end and bubbles up to the root).

6.  **Bloom Filter Probability**: If you have a Bloom Filter with 1 million bits and 7 hash functions, what happens to the false positive rate as you add more items?
    - *Answer*: It increases. As more bits are set to 1, the probability that $k$ random hashes all land on a 1 by chance increases.

7.  **Suffix Array**: Construct the suffix array for "ABABA".
    - *Answer*: Suffixes: ABABA (0), BABA (1), ABA (2), BA (3), A (4). Sorted: A (4), ABA (2), ABABA (0), BA (3), BABA (1). Array: \`[4, 2, 0, 3, 1]\`.

8.  **LRU Cache**: Which two data structures would you combine to implement an LRU (Least Recently Used) cache where \`get\` and \`put\` are $O(1)$?
    - *Answer*: A **Hash Map** (for $O(1)$ lookup) and a **Doubly Linked List** (to maintain access order and allow $O(1)$ removal/re-insertion at the head).`
  }
];
