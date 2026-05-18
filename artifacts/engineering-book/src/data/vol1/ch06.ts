import type { Section } from '../types';

export const CH06_SECTIONS: Section[] = [
  {
    id: "6-1",
    number: "6.1",
    title: "Algorithm Analysis: Big-O, Big-Omega, Big-Theta",
    content: `Algorithm analysis is the mathematical foundation of software engineering. It allows us to predict performance and scalability without relying on specific hardware benchmarks.

## The Big Three Notations
1. **Big-O ($O$)**: The **Upper Bound**. It represents the "worst-case" scenario. If an algorithm is $O(n^2)$, it will never be slower than $n^2$ for large $n$.
2. **Big-Omega ($\Omega$)**: The **Lower Bound**. It represents the "best-case" scenario.
3. **Big-Theta ($\Theta$)**: The **Tight Bound**. An algorithm is $\Theta(f(n))$ if it is both $O(f(n))$ and $\Omega(f(n))$. This is the most precise description of an algorithm's behavior.

## Why $n \to \infty$?
We care about **Asymptotic Analysis**. For small $n$, a constant factor might make an $O(n^2)$ algorithm faster than an $O(n \log n)$ one. But as $n$ grows, the higher-order term dominates. This is why we ignore constants ($2n \to n$) and lower-order terms ($n^2 + n \to n^2$).

## Common Complexities in the Wild
- **$O(1)$**: Accessing an array index or a hash map (average).
- **$O(\log n)$**: Binary search. Scale-invariant; doubling $n$ only adds one more step.
- **$O(n)$**: Linear scan.
- **$O(n \log n)$**: Efficient sorting (Merge Sort, Quicksort).
- **$O(n^2)$**: Simple loops (Insertion Sort).
- **$O(2^n)$**: Recursive Fibonacci, exhaustive search.
- **$O(n!)$**: Traveling Salesperson (brute force).

| Complexity | 10 Items | 10,000 Items |
| :--- | :--- | :--- |
| $O(\log n)$ | 3 steps | 13 steps |
| $O(n)$ | 10 steps | 10,000 steps |
| $O(n \log n)$ | 33 steps | 130,000 steps |
| $O(n^2)$ | 100 steps | 100,000,000 steps |`
  },
  {
    id: "6-2",
    number: "6.2",
    title: "Amortized Analysis: Banker's Method and Potential Method",
    content: `Sometimes, a single operation is expensive, but it only happens rarely. **Amortized Analysis** gives us the "average cost per operation" over a long sequence.

## 1. The Aggregate Method
Sum the total cost of $n$ operations and divide by $n$.
*Example*: In a dynamic array, most \`push()\` calls are $O(1)$. The $O(n)$ resize happens only at powers of 2. The total cost for $n$ pushes is $\approx 3n$, so the amortized cost is $O(1)$.

## 2. The Banker's Method (Accounting Method)
Think of time as money. We overcharge cheap operations and save the "surplus" as credit. When an expensive operation occurs, we use the credit to pay for it.
- **Push**: Charge $3 units. $1 pays for the insertion, $2 is stored as credit.
- **Resize**: Every element in the array already has $2 of credit—one to pay for its own move and one to pay for a "passive" element's move. The resize is "pre-paid."

## 3. The Potential Method
The most formal method. We define a **Potential Function** $\Phi$ representing the "stored energy" of the data structure.
\`Amortized Cost = Actual Cost + Change in Potential (\Delta\Phi)\`
If an operation is expensive but significantly simplifies the structure (reduces potential), the amortized cost remains low. This is used to prove the efficiency of **Splay Trees** and **Fibonacci Heaps**.`
  },
  {
    id: "6-3",
    number: "6.3",
    title: "Recurrence Relations and the Master Theorem",
    content: `Recursive algorithms (Divide and Conquer) require a different way to calculate complexity: **Recurrence Relations**.

## The Master Theorem
For recurrences of the form: $T(n) = aT(n/b) + f(n)$
Where:
- $a$: Number of subproblems.
- $n/b$: Size of each subproblem.
- $f(n)$: Cost of the "work" done outside the recursive calls (divide and combine).

Compare $f(n)$ with $n^{\log_b a}$ (the "critical value"):
1.  If $f(n)$ is smaller, $T(n) = \Theta(n^{\log_b a})$.
2.  If they are equal, $T(n) = \Theta(n^{\log_b a} \log n)$.
3.  If $f(n)$ is larger, $T(n) = \Theta(f(n))$.

## Examples
- **Binary Search**: $T(n) = 1T(n/2) + O(1)$. $a=1, b=2 \to n^{\log_2 1} = n^0 = 1$. Equal $\to \Theta(\log n)$.
- **Merge Sort**: $T(n) = 2T(n/2) + O(n)$. $a=2, b=2 \to n^{\log_2 2} = n^1 = n$. Equal $\to \Theta(n \log n)$.
- **Strassen's Matrix Mult**: $T(n) = 7T(n/2) + O(n^2)$. $a=7, b=2 \to \log_2 7 \approx 2.81$. Case 1 $\to \Theta(n^{2.81})$.

If the Master Theorem doesn't apply (e.g., $T(n) = T(n-1) + n$), we use a **Recursion Tree** or the **Substitution Method**.`
  },
  {
    id: "6-4",
    number: "6.4",
    title: "Sorting: Why It Matters More Than You Think",
    content: `Sorting is the most studied problem in computer science. It's not just about putting names in alphabetical order; it's about **enabling other algorithms**.

## Searching
You cannot perform Binary Search on unsorted data. Sorting is the prerequisite for fast retrieval.

## De-duplication
Finding duplicates in an unsorted list takes $O(n^2)$ or $O(n)$ with a Hash Set (memory expensive). On sorted data, it's a single linear scan ($O(n)$).

## Closest Pair
Finding the two closest numbers in a set:
- Unsorted: $O(n^2)$ (check every pair).
- Sorted: $O(n \log n)$ to sort, then $O(n)$ to check adjacent elements.

## Set Operations
Intersection, Union, and Difference between two sets are $O(n+m)$ if the inputs are sorted (the "Merge" step of Merge Sort).

## Real Systems
Sorting is the heart of **Database Indexing**, **Log Processing**, and **Graphics Rendering Pipelines**. When you see "ORDER BY" in SQL, you are triggering a sophisticated sorting engine that might involve external merge sorts if the data doesn't fit in RAM.`
  },
  {
    id: "6-5",
    number: "6.5",
    title: "Insertion Sort, Shell Sort: Small n Champions",
    content: `While $O(n \log n)$ algorithms are theoretically better, for small datasets (usually $n < 32$ or $n < 64$), **Insertion Sort** is often faster due to its incredibly low constant factors and $O(n)$ best-case performance.

## Insertion Sort
It builds the sorted array one item at a time.
\`\`\`python
for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and key < arr[j]:
        arr[j + 1] = arr[j]
        j -= 1
    arr[j + 1] = key
\`\`\`
- **Online**: Can sort a list as it receives it.
- **Stable**: Preserves the relative order of equal elements.
- **Adaptive**: $O(n)$ on nearly-sorted data.

## Shell Sort
An optimization of Insertion Sort that allows the exchange of far-apart elements. It uses a **gap sequence**. It starts by sorting elements far apart, then gradually reduces the gap.
- **Why?** Insertion sort is slow because it only moves elements one position at a time. Shell sort moves them long distances early on, "pre-sorting" the array.
- **Complexity**: Depends on the gap sequence (e.g., $O(n^{1.3})$ or $O(n \log^2 n)$). It is often used in embedded systems where code space is limited but $O(n^2)$ is too slow.`
  },
  {
    id: "6-6",
    number: "6.6",
    title: "Merge Sort: The Divide-and-Conquer Paradigm",
    content: `Merge Sort is the textbook example of **Divide and Conquer**.

1. **Divide**: Split the array into two halves.
2. **Conquer**: Recursively sort the two halves.
3. **Combine**: Merge the two sorted halves into one.

## The Merge Step
The magic happens here. We compare the heads of two sorted lists and pick the smallest.
\`\`\`python
def merge(left, right):
    result = []
    while left and right:
        if left[0] <= right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))
    return result + left + right
\`\`\`

## Key Characteristics
- **Worst-case**: $O(n \log n)$.
- **Stable**: Yes.
- **Space**: $O(n)$. This is its biggest drawback. It requires an auxiliary array to perform the merge.
- **External Sorting**: Merge Sort is the king of sorting data that doesn't fit in RAM (e.g., 10TB of logs). You sort chunks that fit in RAM and then perform a multi-way merge of the resulting "runs" on disk.`
  },
  {
    id: "6-7",
    number: "6.7",
    title: "Quicksort: The Practical Champion",
    content: `Quicksort is usually the fastest general-purpose sort in practice. It is used in C's \`qsort\`, C++'s \`std::sort\`, and many others.

## How it Works
1. **Pick a Pivot**: Choose an element from the array.
2. **Partition**: Rearrange the array so that everything smaller than the pivot is on the left, and everything larger is on the right.
3. **Recurse**: Sort the left and right partitions.

## The Partitioning Strategy (Hoare vs. Lomuto)
The goal is to partition **in-place** ($O(1)$ extra space).
\`\`\`python
def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1
\`\`\`

## The Danger: $O(n^2)$
If you pick the smallest or largest element as the pivot every time (e.g., sorting an already sorted array with the last element as pivot), Quicksort collapses to $O(n^2)$.
**Solutions**:
- **Randomized Pivot**: Pick a random element.
- **Median-of-Three**: Use the median of the first, middle, and last elements.
- **Introsort**: A hybrid algorithm that starts with Quicksort but switches to Heapsort if the recursion depth exceeds a certain limit (protecting against the $O(n^2)$ case).`
  },
  {
    id: "6-8",
    number: "6.8",
    title: "Heap Sort: Guaranteed O(n log n) in O(1) Space",
    content: `Heapsort uses the **Binary Heap** data structure to sort elements.

## Two Phases
1. **Build-Heap**: Transform the unsorted array into a Max-Heap in $O(n)$ time.
2. **Extract**: Repeatedly remove the maximum element (the root) and move it to the end of the array, then "sift down" to restore the heap property ($O(n \log n)$).

## Comparison
| Feature | Quicksort | Merge Sort | Heapsort |
| :--- | :--- | :--- | :--- |
| Worst Case | $O(n^2)$ | $O(n \log n)$ | $O(n \log n)$ |
| Average Case | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ |
| Space | $O(\log n)$ | $O(n)$ | $O(1)$ |
| Stable | No | Yes | No |

## Why is it rarely the default?
Although Heapsort has better worst-case than Quicksort and better space than Merge Sort, it is often slower in practice. This is because its access pattern is **Cache-Unfriendly**. It constantly jumps between \`i\`, \`2i\`, and \`i/2\`, causing frequent cache misses compared to the linear scans of Quicksort and Merge Sort.`
  },
  {
    id: "6-9",
    number: "6.9",
    title: "Timsort: How Python and Java Actually Sort",
    content: `Real-world data is rarely random. It often contains "runs" of already sorted data. **Timsort** (created by Tim Peters for Python in 2002) is a hybrid algorithm designed to exploit this.

## The Strategy
1. **Divide**: Split the array into small chunks called **Runs**.
2. **Insertion Sort**: Use Insertion Sort on each Run (remember, it's the champion for small $n$).
3. **Merge**: Use a sophisticated Merge Sort to combine the runs.

## Galloping
During the merge, if one run is consistently contributing many elements in a row, Timsort enters "Galloping Mode." It uses binary search to find where the next element of the *other* run fits, skipping many comparisons.

## Performance
- **Best-case**: $O(n)$ (for already sorted data).
- **Average/Worst**: $O(n \log n)$.
- **Stability**: Yes.
- **Usage**: Default sort in Python, Java (Object arrays), Android, and Swift.

Timsort is a masterpiece of pragmatic engineering—it recognizes that theoretical randomness is the exception, and "nearly sorted" data is the rule.`
  },
  {
    id: "6-10",
    number: "6.10",
    title: "Counting Sort, Radix Sort, Bucket Sort: Linear Time Sorting",
    content: `Can we sort faster than $O(n \log n)$?
**Theorem**: Any **Comparison-Based** sorting algorithm must be at least $\Omega(n \log n)$ in the worst case.
But if we know something about the *values* (not just their relative order), we can break this limit.

## 1. Counting Sort
If we know all numbers are between 0 and $k$:
1. Create an array of size $k+1$ to count occurrences.
2. Iterate through the input and increment counts.
3. Reconstruct the array.
**Complexity**: $O(n + k)$. If $k$ is small ($k \approx n$), this is $O(n)$.

## 2. Radix Sort
Sorts numbers digit by digit, from Least Significant to Most Significant, using Counting Sort as a stable subroutine for each digit.
**Complexity**: $O(d \cdot (n + k))$ where $d$ is the number of digits. For 32-bit integers, $d$ is constant.

## 3. Bucket Sort
Distributes elements into $k$ buckets based on their value range. Sort each bucket individually (e.g., with Insertion Sort) and concatenate.
**Complexity**: $O(n)$ on average if the data is uniformly distributed.

**When to use**: Use these when sorting integers, bytes, or strings with a limited alphabet where $n$ is very large and the range of values is constrained.`
  },
  {
    id: "6-11",
    number: "6.11",
    title: "Searching: Linear, Binary, Interpolation, Exponential",
    content: `Searching is about finding an element in a collection. The "right" way depends entirely on how the data is structured.

## 1. Linear Search ($O(n)$)
Check every item. Use this only for unsorted data or small arrays where cache locality makes it faster than complex logic.

## 2. Binary Search ($O(\log n)$)
For sorted arrays. Repeatedly halve the search space.
\`\`\`python
while low <= high:
    mid = low + (high - low) // 2 # Avoids overflow
    if arr[mid] == target: return mid
    elif arr[mid] < target: low = mid + 1
    else: high = mid - 1
\`\`\`

## 3. Interpolation Search
A smarter version of binary search for **uniformly distributed** data (like a phone book). Instead of checking the middle, it estimates the position: \`pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low])\`.
- **Complexity**: $O(\log(\log n))$ on average, but $O(n)$ in the worst case.

## 4. Exponential Search
Used for **unbounded or infinite** lists.
1. Find a range where the element might exist by checking indices 1, 2, 4, 8, 16... until \`arr[i] > target\`.
2. Perform Binary Search within that range.
- **Complexity**: $O(\log i)$ where $i$ is the actual position of the element.`
  },
  {
    id: "6-12",
    number: "6.12",
    title: "Graph Traversal: BFS — Shortest Paths Unweighted",
    content: `Breadth-First Search (BFS) explores a graph level by level, like a ripple in a pond.

## The Algorithm
Use a **Queue**.
1. Start at node $S$, mark as visited, and enqueue.
2. While queue is not empty:
    a. Dequeue $U$.
    b. For each unvisited neighbor $V$ of $U$: Mark as visited, set \`parent[V] = U\`, and enqueue $V$.

## The Key Insight: Shortest Path
In an **unweighted** graph (where every edge has cost 1), BFS is guaranteed to find the shortest path from the source to any other node. The "level" of a node in the BFS tree is its minimum distance from the source.

## Complexity
- **Time**: $O(V + E)$ where $V$ is vertices and $E$ is edges.
- **Space**: $O(V)$ for the visited set and the queue.

**Use Cases**: 
- Peer-to-peer networks (Gnutella).
- Social networking "degrees of separation."
- Garbage collection (tracing reachable objects).
- Pathfinding in simple grid-based games.`
  },
  {
    id: "6-13",
    number: "6.13",
    title: "Graph Traversal: DFS — Cycles, Topological Sort, SCCs",
    content: `Depth-First Search (DFS) explores as deep as possible before backtracking. It is a fundamental tool for analyzing graph structure.

## The Algorithm
Use a **Stack** (or recursion).
1. Visit node $U$.
2. For each neighbor $V$ that is not visited, recursively visit $V$.

## 1. Cycle Detection
In a Directed Graph, if you encounter a node that is currently in the "recursion stack" (an ancestor in the DFS tree), you have found a **Back Edge**, and thus a cycle.

## 2. Topological Sort
For a Directed Acyclic Graph (DAG), you can order nodes such that for every edge $U \to V$, $U$ comes before $V$.
**Algorithm**: Perform DFS. When a node's recursion finishes, push it onto a stack. The stack, when popped, gives the topological order.
**Use Case**: Build systems (Make/Bazel) deciding the order to compile files.

## 3. Strongly Connected Components (SCCs)
An SCC is a sub-graph where every node is reachable from every other node.
**Kosaraju's Algorithm**:
1. DFS on the original graph to get a finishing order.
2. Transpose the graph (reverse all edges).
3. DFS on the transposed graph in the order of step 1. Each tree in the forest is an SCC.`
  },
  {
    id: "6-14",
    number: "6.14",
    title: "Shortest Paths: Dijkstra's Algorithm — Complete Proof",
    content: `Dijkstra's algorithm finds the shortest path from a source to all other nodes in a graph with **non-negative** edge weights.

## The Algorithm
1. Set \`dist[source] = 0\`, all others to $\infty$.
2. Create a **Min-Priority Queue** of \`(distance, node)\`.
3. While queue not empty:
    a. Extract node $U$ with smallest \`dist\`.
    b. For each neighbor $V$ of $U$:
        If \`dist[U] + weight(U, V) < dist[V]\`:
            Update \`dist[V]\`, push to queue.

## The Greedy Property
Dijkstra is greedy: it always picks the "closest" unvisited node. Why does this work?
**Proof Sketch**:
Assume at some step, we extract node $V$, but the distance we found ($d(V)$) is not the shortest. There must be some other path through an unvisited node $X$. But since all edge weights are positive, any path through $X$ must have length $\ge d(X)$. Since we picked $V$, $d(V) \le d(X)$. Contradiction.

## Complexity
- With a Binary Heap: $O((V+E) \log V)$.
- With a Fibonacci Heap: $O(E + V \log V)$.

**Crucial Limitation**: Dijkstra fails if there are **negative edge weights**. It may "settle" a node too early, not realizing a later negative edge could have reduced its total distance.`
  },
  {
    id: "6-15",
    number: "6.15",
    title: "Shortest Paths: Bellman-Ford — Negative Weights",
    content: `When a graph has negative edge weights, Dijkstra fails. **Bellman-Ford** is the solution.

## The Concept: Relaxation
To "relax" an edge $(U, V)$ means checking if \`dist[U] + weight(U, V)\` is a better path to $V$ than what we currently know.

## The Algorithm
1. Initialize \`dist[source] = 0\`, others $\infty$.
2. **Relax every edge** in the graph $V-1$ times.
3. Why $V-1$? A shortest path can have at most $V-1$ edges.

## Detecting Negative Cycles
After $V-1$ passes, if you can relax *any* edge one more time, then a **Negative Cycle** exists. The distance would keep decreasing to $-\infty$. This is vital in financial "Arbitrage" detection (finding a loop of currency trades that nets a profit).

## Complexity
- **Time**: $O(V \cdot E)$. This is much slower than Dijkstra.

**Optimization: SPFA (Shortest Path Faster Algorithm)**
A variant of Bellman-Ford that only relaxes edges from nodes that have changed. It performs well on average but has the same $O(VE)$ worst case.`
  },
  {
    id: "6-16",
    number: "6.16",
    title: "Shortest Paths: A* — Informed Search",
    content: `A* (A-Star) is an extension of Dijkstra used in AI and games. It uses a **Heuristic** to guide the search toward the target, making it much faster.

## The Formula
Instead of just using $g(n)$ (distance from start), A* uses:
\`f(n) = g(n) + h(n)\`
- $g(n)$: Actual cost from start to $n$.
- $h(n)$: **Estimated** cost from $n$ to the goal.

## Admissibility and Consistency
For A* to find the shortest path, the heuristic $h(n)$ must be **Admissible**: it must *never* overestimate the true cost to the goal ($h(n) \le h^*(n)$).
*Example*: For a map, the "Straight-line distance" (Euclidean) is admissible because you can never travel shorter than a straight line.

## Performance
- If $h(n) = 0$, A* is exactly Dijkstra.
- If $h(n)$ is the exact cost, A* will walk directly to the target without checking any extra nodes.

**Use Case**: GPS navigation (Google Maps), pathfinding in games like StarCraft or World of Warcraft.`
  },
  {
    id: "6-17",
    number: "6.17",
    title: "All-Pairs Shortest Paths: Floyd-Warshall",
    content: `What if you need the shortest path between **every** pair of nodes in a graph?
- You could run Dijkstra $V$ times: $O(V \cdot E \log V)$.
- Or you can use **Floyd-Warshall**, a beautiful Dynamic Programming algorithm.

## The Idea
Let $dist[i][j][k]$ be the shortest path from $i$ to $j$ using only nodes $\{1, 2, ..., k\}$ as intermediate steps.
To find $dist[i][j][k]$, we have two choices:
1. Don't use $k$: $dist[i][j][k-1]$.
2. Use $k$: $dist[i][k][k-1] + dist[k][j][k-1]$.

## The Algorithm (In-Place)
\`\`\`python
for k in range(V):
    for i in range(V):
        for j in range(V):
            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
\`\`\`

## Key Characteristics
- **Complexity**: $O(V^3)$.
- **Negative weights**: Handles them, but not negative cycles.
- **Implementation**: The simplest graph algorithm to code. It works on the adjacency matrix.

**Use Case**: Computing "transitive closure" in a graph (can $A$ reach $B$?) or calculating routing tables in small networks.`
  },
  {
    id: "6-18",
    number: "6.18",
    title: "Minimum Spanning Trees: Kruskal's and Prim's",
    content: `A **Minimum Spanning Tree (MST)** is a subset of edges that connects all vertices together, without any cycles, and with the minimum possible total edge weight.

## 1. Kruskal's Algorithm (Edge-Based)
1. Sort all edges by weight.
2. Iterate through edges: if adding the edge doesn't create a cycle, add it to the MST.
3. Use **Union-Find (DSU)** to check for cycles efficiently.
- **Complexity**: $O(E \log E)$ or $O(E \log V)$.
- **Best for**: Sparse graphs.

## 2. Prim's Algorithm (Vertex-Based)
1. Start with an arbitrary node.
2. Repeatedly add the cheapest edge that connects a vertex in the MST to a vertex *outside* the MST.
3. Use a **Min-Priority Queue** to find the cheapest edge.
- **Complexity**: $O(E \log V)$ or $O(E + V \log V)$ with Fibonacci Heap.
- **Best for**: Dense graphs.

## Comparison
Both are **Greedy** algorithms. Because the MST problem has the "Matroid" property, the greedy approach is guaranteed to find the global optimum.
**Use Case**: Designing low-cost networks (electrical grids, water pipes, telecommunications).`
  },
  {
    id: "6-19",
    number: "6.19",
    title: "Network Flow: Ford-Fulkerson and Max-Flow Min-Cut",
    content: `Network Flow problems model the movement of "stuff" (water, data, cars) through a network with capacity constraints.

## The Problem
Given a source $S$ and a sink $T$, what is the maximum amount of flow that can be sent from $S$ to $T$?

## Ford-Fulkerson Algorithm
1. Find an **Augmenting Path** (a path from $S$ to $T$ with available capacity) using BFS or DFS.
2. Push as much flow as possible through that path.
3. Update the **Residual Graph** (subtract flow from forward edges, add to reverse edges).
4. Repeat until no more augmenting paths exist.

## Max-Flow Min-Cut Theorem
The maximum flow in a network is exactly equal to the capacity of the **Minimum Cut** (the minimum set of edges that, if removed, would disconnect $S$ from $T$).

## Complexity and Edmonds-Karp
Ford-Fulkerson with DFS can be slow. **Edmonds-Karp** is a specific implementation that uses **BFS** to find augmenting paths, guaranteeing a runtime of $O(V E^2)$.

**Use Cases**:
- Bipartite Matching (assigning $N$ jobs to $M$ workers).
- Image Segmentation (separating foreground from background).
- Airline scheduling.`
  },
  {
    id: "6-20",
    number: "6.20",
    title: "Dynamic Programming: The Complete Methodology",
    content: `Dynamic Programming (DP) is often the most feared topic in algorithms, but it follows a strict, logical methodology. It is used to solve problems with **Overlapping Subproblems** and **Optimal Substructure**.

## The Four Steps of DP
1.  **Characterize the Structure of an Optimal Solution**: Break the problem into subproblems.
2.  **Define a Recursive State**: e.g., \`DP[i]\` is the max profit using the first $i$ items.
3.  **Compute the Value (Transition)**: Define the relation between subproblems. \`DP[i] = max(DP[i-1], val[i] + DP[i-w])\`.
4.  **Construct the Solution**: Usually via a table (Bottom-Up) or Memoization (Top-Down).

## Memoization (Top-Down)
Start with the big problem. If you solve a subproblem, store the result in a map/array. If you see it again, just return the stored value.
- **Pros**: Only solves necessary subproblems.
- **Cons**: Recursion depth limits (stack overflow).

## Tabulation (Bottom-Up)
Start with the base cases (smallest subproblems) and fill a table until you reach the target.
- **Pros**: Faster (no recursion), space-efficient (can sometimes use only $O(1)$ extra space).
- **Cons**: Solves all subproblems, even if not needed.

DP is essentially **Trading Space for Time**. You store results ($O(n)$ space) to avoid re-calculating them ($O(2^n) \to O(n)$ time).`
  },
  {
    id: "6-21",
    number: "6.21",
    title: "DP Patterns: Fibonacci, Knapsack, LCS, Edit Distance",
    content: `Most DP problems fall into a few classic patterns. Mastering these is the key to solving 90% of DP challenges.

## 1. 0/1 Knapsack
You have a bag with capacity $W$ and items with weights and values. Can't split items.
- **State**: \`dp[i][w]\` = max value using first $i$ items with capacity $w$.
- **Transition**: \`dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-weight[i]])\`.

## 2. Longest Common Subsequence (LCS)
Find the longest subsequence common to two strings (e.g., "ABC" and "AC" -> "AC").
- **State**: \`dp[i][j]\` = LCS of \`str1[0..i]\` and \`str2[0..j]\`.
- **Transition**: If \`str1[i] == str2[j]\`, \`1 + dp[i-1][j-1]\`. Else, \`max(dp[i-1][j], dp[i][j-1])\`.

## 3. Edit Distance (Levenshtein)
Minimum operations (insert, delete, replace) to turn string $A$ into $B$.
- **Use Case**: Spell checkers, DNA sequencing, \`git diff\`.

## 4. Fibonacci / Staircase
- **State**: \`dp[n] = dp[n-1] + dp[n-2]\`.
- **Insight**: This is the simplest DP. You only need the last two values, so space can be reduced to $O(1)$.`
  },
  {
    id: "6-22",
    number: "6.22",
    title: "DP Patterns: Matrix Chain, Optimal BST, DP on Trees",
    content: `Advanced DP involves more complex states and structures.

## 1. Matrix Chain Multiplication
Given a sequence of matrices, find the most efficient way to multiply them (matrix multiplication is associative but the number of operations depends on the order).
- **Key**: This uses **Interval DP**. The state is \`dp[i][j]\` representing the cost to multiply matrices from $i$ to $j$.

## 2. Optimal Binary Search Tree
If we know the frequency of lookups for each key, how do we arrange the BST to minimize the *average* search time? (Not just height balance).

## 3. DP on Trees
Problems like "Maximum Independent Set" or "Diameter of a Tree."
- **Pattern**: Perform a DFS. Each node calculates its state based on the states of its children.
- **Example**: \`dp[u][0]\` (max value of subtree $u$ if $u$ is NOT included) and \`dp[u][1]\` (if $u$ IS included).

## 4. Bitmask DP
When you need to track a subset of items (e.g., Traveling Salesperson).
- **State**: \`dp[mask][last_city]\`, where \`mask\` is an integer whose bits represent visited cities.
- **Complexity**: Usually $O(2^n \cdot n^2)$. Only feasible for $n \le 20$.`
  },
  {
    id: "6-23",
    number: "6.23",
    title: "Greedy Algorithms: When They Work and When They Don't",
    content: `A **Greedy Algorithm** makes the locally optimal choice at each step with the hope of finding the global optimum.

## When they work
Greedy works if the problem has the **Greedy Choice Property**: a global optimum can be reached by making local optima.
- **Huffman Coding**: For data compression.
- **Dijkstra's Algorithm**: For shortest paths.
- **Fractional Knapsack**: If you can take half an item (like gold dust).
- **Interval Scheduling**: Picking the maximum number of non-overlapping meetings.

## When they fail
Greedy fails if a local choice prevents the global optimum.
- **0/1 Knapsack**: Picking the most valuable item first might fill the bag and prevent you from taking two slightly less valuable items that sum to more.
- **Coin Change**: If coins are {1, 3, 4} and you need 6. Greedy takes 4, then 1, 1 (3 coins). The optimum is 3, 3 (2 coins).

**The Senior Engineer's Rule**: Never assume Greedy works. Always try to find a counter-example or use an **Exchange Argument** to prove it.`
  },
  {
    id: "6-24",
    number: "6.24",
    title: "Greedy Proofs: Exchange Arguments",
    content: `How do you prove a greedy algorithm is correct? The most common technique is the **Exchange Argument**.

## The Steps
1.  Assume there is an **Optimal Solution** ($O$) that is different from your **Greedy Solution** ($G$).
2.  Find the first place where $O$ and $G$ differ.
3.  Show that you can "exchange" the element in $O$ with the one in $G$ without making $O$ worse.
4.  By induction, you can transform $O$ into $G$ without losing optimality, proving $G$ is also optimal.

## Example: Interval Scheduling
- **Greedy Rule**: Always pick the talk that finishes earliest.
- **Proof**: Suppose an optimal solution $O$ picks a talk $X$ that finishes later than the greedy choice $Y$. If we replace $X$ with $Y$ in $O$, we still have a valid schedule (since $Y$ finishes earlier, it's even less likely to conflict with later talks). The number of talks didn't decrease. Thus, the greedy choice is as good as the optimal.`
  },
  {
    id: "6-25",
    number: "6.25",
    title: "Divide and Conquer: Strassen, Karatsuba, FFT",
    content: `Divide and Conquer can often reduce the complexity of mathematical operations.

## 1. Karatsuba Multiplication
Standard multiplication of two $n$-digit numbers is $O(n^2)$. Karatsuba uses a clever algebraic trick to do it in $O(n^{1.58})$. It reduces 4 multiplications to 3.

## 2. Strassen's Matrix Multiplication
Standard matrix mult is $O(n^3)$. Strassen reduced it to $O(n^{2.81})$ by using 7 recursive multiplications instead of 8.

## 3. Fast Fourier Transform (FFT)
One of the most important algorithms in history. It converts a signal from the time domain to the frequency domain.
- **Naive DFT**: $O(n^2)$.
- **FFT**: $O(n \log n)$.
FFT is the reason we have high-speed wireless communication, MP3 compression, and digital image processing. It treats a sequence of numbers as coefficients of a polynomial and uses divide and conquer to evaluate it at specific points.`
  },
  {
    id: "6-26",
    number: "6.26",
    title: "String Algorithms: KMP, Boyer-Moore, Rabin-Karp",
    content: `Finding a pattern $P$ in a text $T$ ($n = |T|, m = |P|$).

## 1. Naive Search ($O(nm)$)
Check every position. Slow.

## 2. Knuth-Morris-Pratt (KMP)
If we fail a match at \`T[i]\`, we don't reset to the beginning. We use a **Partial Match Table** (Prefix Function) to know how much of the pattern we've already matched.
- **Complexity**: $O(n + m)$.

## 3. Boyer-Moore
The standard for \`ctrl+f\` and \`grep\`. It searches from **right to left** in the pattern. It uses the "Bad Character Rule" to skip large chunks of text.
- **Complexity**: Often sub-linear ($O(n/m)$) because it doesn't look at every character.

## 4. Rabin-Karp
Uses **Rolling Hashes**.
1. Calculate hash of pattern.
2. Calculate hash of every $m$-length window in the text.
3. If hashes match, verify the characters.
- **Use Case**: Detecting plagiarism or finding multiple patterns simultaneously.`
  },
  {
    id: "6-27",
    number: "6.27",
    title: "Randomized Algorithms: Quickselect, Treaps, Hashing",
    content: `Sometimes, adding a bit of randomness makes an algorithm faster and harder to defeat with "worst-case" inputs.

## 1. Quickselect
Find the $k$-th smallest element in an array.
- Use the partitioning logic of Quicksort.
- Instead of recursing into both sides, only recurse into the side containing $k$.
- **Complexity**: Average $O(n)$, Worst $O(n^2)$.

## 2. Treaps (Tree + Heap)
A BST where each node is assigned a **random priority**.
- Elements follow BST order for keys.
- Elements follow Heap order for priorities.
- The randomness ensures the tree is balanced with high probability ($O(\log n)$).

## 3. Monte Carlo vs. Las Vegas
- **Las Vegas**: Always correct, but runtime is probabilistic (e.g., Quicksort).
- **Monte Carlo**: Fixed runtime, but has a small probability of error (e.g., primality testing).`
  },
  {
    id: "6-28",
    number: "6.28",
    title: "Approximation Algorithms: When Exact Is Too Slow",
    content: `Some problems are **NP-Hard** (e.g., Traveling Salesperson, Knapsack, Set Cover). We cannot find the *exact* solution in polynomial time. Instead, we use Approximation Algorithms.

## Approximation Ratio ($\rho$)
An algorithm is a $\rho$-approximation if it is guaranteed to find a solution at most $\rho$ times worse than the optimal.

## Example: Vertex Cover
Problem: Find the minimum set of vertices that touch every edge.
**Greedy Approximation**:
1. Pick an arbitrary edge $(u, v)$.
2. Add both $u$ and $v$ to the cover.
3. Remove all edges touching $u$ or $v$.
4. Repeat.
This is a **2-approximation**. It will never be more than twice the size of the optimal cover.

## Local Search and Heuristics
For many problems, we use **Simulated Annealing** or **Genetic Algorithms**. These don't have a guaranteed ratio but perform exceptionally well on real-world engineering problems like chip design or logistics routing.`
  },
  {
    id: "6-29",
    number: "6.29",
    title: "Case Study: Google's PageRank — Graphs at Internet Scale",
    content: `PageRank is the algorithm that launched Google. It treats the entire web as a directed graph.

## The Concept: Random Surfer
Imagine a user clicking random links. A page is "important" if many other important pages link to it.
\`PR(A) = (1-d) + d * (PR(B)/L(B) + PR(C)/L(C) + ...)\`
- $d$: Damping factor (probability the user keeps clicking, usually 0.85).
- $L(B)$: Number of outbound links from page $B$.

## The Linear Algebra view
PageRank is finding the **Principal Eigenvector** of the Google Matrix.
1. Start with a vector of equal ranks.
2. Repeatedly multiply the vector by the adjacency matrix (the **Power Method**).
3. The vector converges to the PageRank values.

## Engineering Challenges
The web graph has billions of nodes and trillions of edges. Google cannot fit this matrix in one machine. They use **MapReduce** to perform the matrix-vector multiplication in a distributed fashion across thousands of servers.`
  },
  {
    id: "6-30",
    number: "6.30",
    title: "Exercises",
    content: `Test your algorithmic thinking.

1.  **Master Theorem**: What is the complexity of $T(n) = 8T(n/2) + n^2$?
    - *Answer*: $a=8, b=2, n^{\log_2 8} = n^3$. Since $n^2 < n^3$, $T(n) = \Theta(n^3)$.

2.  **Stable Sorting**: Is Quicksort stable? Why does it matter?
    - *Answer*: No. Swapping during partitioning can jump an element over another equal element. It matters if you are sorting by "Date," then by "Price"—an unstable sort would ruin the "Date" ordering.

3.  **Binary Search**: You have a sorted array that was rotated at an unknown pivot (e.g., \`[4,5,6,7,0,1,2]\`). Can you still search in $O(\log n)$?
    - *Answer*: Yes. In each step, at least one half of the array must be sorted. You can check which half and proceed.

4.  **Dijkstra vs BFS**: When should you use BFS instead of Dijkstra?
    - *Answer*: When all edge weights are equal (or there are no weights). BFS is $O(V+E)$ while Dijkstra is $O(E \log V)$.

5.  **Dynamic Programming**: How many ways can you climb a staircase of $n$ steps if you can take 1 or 2 steps at a time?
    - *Answer*: This is exactly the Fibonacci sequence. \`ways[n] = ways[n-1] + ways[n-2]\`.

6.  **Greedy**: In the Coin Change problem with coins {1, 5, 10, 25}, does Greedy work?
    - *Answer*: Yes, because US currency is a "Canonical Coin System."

7.  **Graph Cycles**: How do you detect a cycle in an undirected graph using BFS?
    - *Answer*: If you encounter an already visited node that is NOT the parent of the current node, a cycle exists.

8.  **String Matching**: If you need to find 100 different keywords in a large document, which algorithm is best?
    - *Answer*: **Aho-Corasick**. It's a trie-based extension of KMP that searches for all patterns in one pass ($O(n + \text{sum of pattern lengths})$).`
  }
];
