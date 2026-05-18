import type { Section } from '../types';

export const CH05_SECTIONS: Section[] = [
  {
    id: "5-1",
    number: "5.1",
    title: "The Philosophy of Data Structures",
    content: `Data structures are not merely ways to store bits; they are the **physical architecture of logic**. In software engineering, the structure of your data dictates the performance, scalability, and even the existence of your algorithms. As Fred Brooks famously noted in *The Mythical Man-Month*, "Show me your flowcharts and conceal your tables, and I shall continue to be mystified. Show me your tables, and I won't usually need your flowcharts; they'll be obvious."

## Data as the Driver
Every piece of software is essentially a transformation engine: it takes input data, processes it, and produces output data. The "processing" part—the algorithm—is limited by how the data is organized. If you store a million records in a simple list and need to find one by ID, you are forced into an $O(n)$ search. If you store them in a Hash Map, you find them in $O(1)$. The difference isn't just a bit of speed; it's the difference between a responsive system and a crashed one.

## The Memory Hierarchy Constraint
A fundamental philosophy of modern data structures is acknowledging the **von Neumann bottleneck** and the memory hierarchy. CPU registers operate in sub-nanosecond cycles, L1 cache in ~1ns, but Main Memory (RAM) takes ~100ns. A data structure that requires frequent "pointer chasing" across RAM (like a fragmented Linked List) will be significantly slower than a contiguous structure (like an Array) that utilizes **Spatial Locality**, even if their theoretical time complexities are identical.

## Abstract Data Types (ADTs) vs. Data Structures
It is vital to distinguish between the **Abstract Data Type (ADT)**—the "what" (e.g., a Stack, a Queue, a Set)—and the **Data Structure**—the "how" (e.g., an Array-based Stack vs. a Linked-List-based Stack). The ADT defines the interface and behavior, while the Data Structure defines the implementation and the performance trade-offs.

| Feature | ADT (Interface) | Data Structure (Implementation) |
| :--- | :--- | :--- |
| Focus | Behavior and Operations | Memory layout and Complexity |
| Example | List | Array, Linked List |
| Goal | Encapsulation | Performance Optimization |

Choosing a data structure is an exercise in **trade-off management**. You are trading space for time, or write-speed for read-speed. There is no "best" structure, only the most appropriate one for your specific constraints.`
  },
  {
    id: "5-2",
    number: "5.2",
    title: "Choosing the Right Structure: The Four Dimensions",
    content: `When a senior engineer selects a data structure, they evaluate it across four critical dimensions. This systematic approach prevents the common mistake of "using a Hash Map for everything" or over-engineering a simple problem.

## 1. Time Complexity (Operation Profile)
You must analyze the frequency of operations. Is your application **read-heavy**, **write-heavy**, or does it require **frequent deletions**?
- **Search**: Do you need $O(1)$ lookup by key (Hash Table) or $O(\log n)$ range queries (B-Tree)?
- **Insertion/Deletion**: Is it always at the end ($O(1)$ for dynamic arrays) or in the middle ($O(1)$ for linked lists if you have the pointer)?

## 2. Space Complexity (Memory Overhead)
Memory is finite. A Linked List has significant overhead because each node requires extra bytes for pointers (8 bytes for a 64-bit address). A 4-byte integer in a linked list effectively takes 12-16 bytes. In contrast, a bitset can represent a set of booleans with 1/8th the space of a byte array.

## 3. Data Volatility and Size
- **Static vs. Dynamic**: If the data size is known at compile time, a static array is unbeatable.
- **Persistence**: Do you need to keep previous versions of the data? Functional data structures (Immutable) are designed for this.

## 4. Access Patterns and Cache Locality
Modern CPUs use **prefetching**. When you access \`arr[i]\`, the CPU loads the next few elements into the cache automatically. Structures that store data contiguously (Arrays, Struct of Arrays) benefit from this. Structures that scatter data (Linked Lists, Trees with fragmented nodes) suffer from **Cache Misses**, which can be 100x slower than a cache hit.

## The "Fit-for-Purpose" Test
Consider a high-frequency trading system. The data structure for the "Order Book" must support $O(\log n)$ insertions but also $O(1)$ access to the "best price." A combination of a **Red-Black Tree** and a **Hash Map** might be necessary to satisfy both constraints simultaneously. This is known as a **Hybrid Data Structure**.`
  },
  {
    id: "5-3",
    number: "5.3",
    title: "Arrays: Static, Dynamic, and Multi-Dimensional",
    content: `The **Array** is the most fundamental data structure. It represents a contiguous block of memory where each element is of a fixed size, allowing for **Constant Time Access** via the formula: \`Address = Base + Index * ElementSize\`.

## Static Arrays
A static array has a fixed size determined at allocation. In languages like C, this is a direct mapping to a segment of memory.
\`\`\`c
int scores[5] = {90, 85, 80, 75, 70};
// Accessing scores[3] is exactly one addition and one multiplication at the CPU level.
\`\`\`

## Dynamic Arrays (Vectors)
Most modern languages provide dynamic arrays (e.g., \`std::vector\` in C++, \`ArrayList\` in Java, \`Array\` in JavaScript/Python). They solve the "fixed size" problem by over-allocating memory. When the capacity is reached, the array **reallocates**:
1. Allocate a new, larger block of memory (usually 1.5x or 2x the current size).
2. Copy all existing elements to the new block.
3. Free the old memory.

## Multi-Dimensional Arrays
There are two ways to represent a 2D array (Matrix) in memory:
- **Row-Major Order**: Consecutive elements of a row are placed next to each other (Standard in C/C++, Python/NumPy).
- **Column-Major Order**: Consecutive elements of a column are placed next to each other (Standard in Fortran, MATLAB).

Understanding this is crucial for performance. In Row-Major order, iterating through a row is fast due to cache hits, while iterating through a column causes a cache miss for every element.

| Access Type | Complexity |
| :--- | :--- |
| Indexing | $O(1)$ |
| Search (Unsorted) | $O(n)$ |
| Search (Sorted) | $O(\log n)$ |
| Insertion/Deletion (Middle) | $O(n)$ |`
  },
  {
    id: "5-4",
    number: "5.4",
    title: "Array of Structs vs Struct of Arrays",
    content: `When dealing with large collections of objects, the memory layout significantly impacts performance, particularly for **SIMD (Single Instruction, Multiple Data)** processing and cache efficiency.

## Array of Structs (AoS)
This is the "natural" Object-Oriented way. You have an array where each element is an instance of a class/struct.
\`\`\`typescript
struct Particle {
    float x, y, z;
    int color;
};
Particle particles[1000];
\`\`\`
**Pros**: High **Spatial Locality** for operations on a single object (e.g., "Get all properties of particle #5").
**Cons**: Poor performance when you only need one property from all objects (e.g., "Update only the Y-coordinate of all particles"). The CPU fetches the \`x\`, \`z\`, and \`color\` into cache even though they aren't used.

## Struct of Arrays (SoA)
This is the "Data-Oriented Design" approach. You have one struct that contains multiple arrays.
\`\`\`typescript
struct ParticleSystem {
    float x[1000];
    float y[1000];
    float z[1000];
    int color[1000];
};
\`\`\`
**Pros**: Excellent for **Parallel Processing**. To update all Y-coordinates, the CPU can load a block of \`y\` values into a SIMD register and process 4, 8, or 16 values at once.
**Cons**: Accessing all properties of a single entity requires multiple index lookups in different memory locations.

## Practical Use
In game development and high-performance computing (HPC), SoA is often preferred for "hot" update loops (physics, rendering), while AoS is used for "cold" data (UI, configuration). Modern engines often use a hybrid approach.`
  },
  {
    id: "5-5",
    number: "5.5",
    title: "Dynamic Array: Amortized Analysis of Growth",
    content: `Why do dynamic arrays (like Python's \`list\`) usually double in size when they run out of space? Why not just add 100 extra slots? The answer lies in **Amortized Analysis**.

## The Cost of Reallocation
If we grow an array by 1 every time we insert, we perform $n$ reallocations. The total number of copies for $n$ elements would be $1 + 2 + 3 + ... + n = O(n^2)$. This is a disaster.

If we use a **Geometric Expansion** (doubling the size), we only reallocate $\log n$ times.
Let's analyze the total work for $n$ insertions:
- Most insertions are $O(1)$.
- At $n = 2^k$, we pay $n$ to copy.
The total cost is approximately $n + (n/2 + n/4 + n/8 ...) = n + n(1) = 2n$.
Since $2n / n = 2$, the **Amortized Cost** per insertion is $O(1)$.

## The Growth Factor ($\alpha$)
- **Java ArrayList**: $\alpha = 1.5$. This is more memory-efficient and allows for potentially reusing memory blocks after a few deallocations.
- **Python/C++ Vector**: $\alpha = 2.0$. This is faster (fewer reallocations) but more memory-intensive.

## Pre-allocation
A professional engineer always uses \`reserve()\` or provides an initial capacity if the final size is roughly known. This eliminates the $O(n)$ "spikes" in latency during growth, which is critical for real-time systems.

\`\`\`cpp
std::vector<int> data;
data.reserve(1000000); // Prevents ~20 reallocations and millions of copies
\`\`\`

The takeaway: Dynamic arrays are $O(1)$ *on average*, but they have $O(n)$ "worst-case" latency on specific operations. In hard real-time systems (like flight control), dynamic arrays are often forbidden for this reason.`
  },
  {
    id: "5-6",
    number: "5.6",
    title: "Linked Lists: Singly and Doubly Linked",
    content: `A **Linked List** is a linear collection of data elements where order is not given by their physical placement in memory but by **pointers**.

## Singly Linked List (SLL)
Each node contains data and a \`next\` pointer.
- **Head**: The first node.
- **Tail**: The last node (points to \`null\`).
SLLs are memory-efficient for unidirectional traversal. They are the backbone of Stacks and Simple Queues.

## Doubly Linked List (DLL)
Each node contains data, a \`next\` pointer, and a \`prev\` pointer.
- **Pros**: Can traverse in both directions. Can delete a node in $O(1)$ if you already have a pointer to it.
- **Cons**: Consumes more memory (2 pointers per node).

## The Implementation Detail: Sentinels
To avoid "if-else" hell when dealing with empty lists or inserting at the head/tail, we use **Sentinel Nodes** (Dummy nodes).
A DLL with sentinels looks like: \`Header <-> Node1 <-> Node2 <-> Footer\`.
This ensures that \`node.next\` and \`node.prev\` are *always* valid pointers, simplifying the logic for \`insert\` and \`remove\` operations.

\`\`\`python
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None
        self.prev = None

def remove_node(node):
    # O(1) removal in DLL
    node.prev.next = node.next
    node.next.prev = node.prev
\`\`\`

## Circular Linked Lists
The last node points back to the first. This is useful for **Round Robin Scheduling** or implementing a **Ring Buffer** where the buffer should continuously cycle.`
  },
  {
    id: "5-7",
    number: "5.7",
    title: "When Linked Lists Actually Beat Arrays",
    content: `In modern software interviews, candidates often dismiss Linked Lists because "Arrays are faster for the cache." While generally true, there are specific, critical scenarios where Linked Lists are superior.

## 1. Guaranteed $O(1)$ Insertion/Deletion
An array-based list (like \`ArrayList\`) has $O(n)$ worst-case insertion (if it must shift elements). A Linked List has a hard guarantee of $O(1)$ if you have the pointer. This is vital in **Operating System Kernels** for managing task queues where latency spikes are unacceptable.

## 2. No Memory Reallocation
Linked Lists grow gracefully. They don't require a large contiguous block of memory. If memory is heavily fragmented, you might be able to allocate 10,000 small nodes even if you cannot allocate a single contiguous array for 10,000 integers.

## 3. Efficient Merging
Two Linked Lists can be merged into one in $O(1)$ time simply by pointing the tail of one to the head of another. Merging two arrays is always $O(n)$.

## 4. Concurrent Data Structures
Many **Lock-Free** data structures (like the Michael-Scott Queue used in Java's \`ConcurrentLinkedQueue\`) use Linked Lists. It is much easier to use atomic operations like **Compare-And-Swap (CAS)** to update a single pointer than to safely reallocate and shift an entire array in a multi-threaded environment.

## 5. Functional Programming
In languages like Lisp, Haskell, or Elixir, the **Singly Linked List** (the "Cons cell") is the primary structure. Because it is persistent, you can "add" an element to the head to create a new list while sharing the entire tail with the old list. This provides $O(1)$ immutability.

| Feature | Array | Linked List |
| :--- | :--- | :--- |
| Random Access | $O(1)$ | $O(n)$ |
| Insert/Delete at Start | $O(n)$ | $O(1)$ |
| Memory Locality | Excellent | Poor |
| Overhead | Low | High (Pointers) |`
  },
  {
    id: "5-8",
    number: "5.8",
    title: "Hash Tables: The Most Important Data Structure",
    content: `The **Hash Table** (or Hash Map) is arguably the most impactful data structure in computing. It provides (on average) **Constant Time $O(1)$** for insertion, deletion, and lookup. It is the magic behind Python's \`dict\`, JavaScript's \`Object\`, and Redis's core storage.

## The Concept: Key to Index
The goal is to store key-value pairs. We use a **Hash Function** to transform a potentially infinite set of keys (like strings) into a finite range of array indices (the buckets).

\`\`\`text
Key: "user:123" -> HashFunction -> 452
Buckets[452] = { name: "Alice", email: "alice@example.com" }
\`\`\`

## The Three Components of a Great Hash Table
1.  **A Large Enough Array**: The underlying storage for buckets.
2.  **An Efficient Hash Function**: Must be fast and distribute keys uniformly.
3.  **A Collision Resolution Strategy**: What happens when two different keys hash to the same index?

## Why isn't it always $O(1)$?
The $O(1)$ is an *average* case. If the hash function is poor and maps many keys to the same bucket, the performance degrades to $O(n)$ (a linked list of items in one bucket). This is known as a **Hash Collision Attack**, where an attacker sends specifically crafted keys to DOS a server by forcing it into $O(n^2)$ processing time.

## Load Factor ($\lambda$)
Defined as $\lambda = n/k$ (number of items / number of buckets). Most implementations resize the table when $\lambda$ hits 0.7 or 0.75. Resizing is an $O(n)$ operation as every single key must be re-hashed into the new, larger array.`
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
