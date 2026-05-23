import type { Section } from '../types';

export const CH06_SECTIONS: Section[] = [
  {
    id: "6-1",
    number: "6.1",
    title: "Algorithm Analysis: Big-O, Big-Omega, Big-Theta",
    content: `\`\`\`python
# BIG-O: f(n) = O(g(n)) if exists c>0, n0 such that f(n) <= c*g(n) for n >= n0
# Example: 3n^2 + 5n + 100 = O(n^2)
# Proof: 3n^2+5n+100 <= 108n^2 for n>=1 (c=108 absorbs lower terms)

# GROWTH RATES (ascending):
# O(1) < O(log n) < O(sqrt n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)

# CONCRETE NUMBERS at n = 1,000,000:
# O(log n): 20 operations
# O(n): 1,000,000 operations
# O(n log n): 20,000,000 operations
# O(n^2): 10^12 operations = 17 MINUTES at 10^9 ops/sec
# O(2^n): immense — universe lifetime insufficient

# This is not a constant factor difference.
# O(n^2) vs O(n log n) on 1M items: usable software vs completely unusable.

# MASTER THEOREM for T(n) = aT(n/b) + f(n):
# Case 1: f(n) = O(n^(log_b(a) - e)) -> T(n) = Theta(n^log_b(a))
# Case 2: f(n) = Theta(n^log_b(a)) -> T(n) = Theta(n^log_b(a) * log n)
# Case 3: f(n) = Omega(n^(log_b(a)+e))-> T(n) = Theta(f(n))

# Merge sort: T(n) = 2T(n/2) + O(n)
# a=2, b=2: n^(log_2 2) = n^1 = n. f(n)=O(n) matches -> Case 2
# T(n) = O(n log n) checkmark

# AMORTIZED ANALYSIS — dynamic array doubling:
# Each append: charge 3 units (1 for insert, 1 save for self, 1 save for another)
# At doubling from k to 2k: need k copies, have k credits saved
# Credits never go negative -> amortized cost = 3 = O(1) per append
\`\`\``
  },
  {
    id: "6-2",
    number: "6.2",
    title: "Amortized Analysis: Banker's Method and Potential Method",
    content: `Sorting appears in query processing, search, compression, and as a precondition for dozens of other algorithms. The comparison sort lower bound of Omega(n log n) is proven by the decision tree argument: n! possible permutations require at least log2(n!) comparisons, and log2(n!) = Theta(n log n) by Stirling's approximation.
Algorithm
Best
Average
Worst
Space
Stable
When to Use
Insertion Sort

\`\`\`python
O(n)
O(n^2)
O(n^2)
O(1)
\`\`\`

Yes
n < 50; nearly sorted; online stream
Merge Sort

\`\`\`python
O(n log n)
O(n log n)
O(n log n)
O(n)
\`\`\`

Yes
Stable required; linked lists; external sort
Quicksort

\`\`\`python
O(n log n)
O(n log n)
O(n^2)
O(log n)
\`\`\`

No
Fastest in practice; large arrays; in-place
Heap Sort

\`\`\`python
O(n log n)
O(n log n)
O(n log n)
O(1)
\`\`\`

No
Guaranteed n log n with O(1) space
Timsort

\`\`\`python
O(n)
O(n log n)
O(n log n)
O(n)
\`\`\`

Yes
Python and Java default; real-world data
Counting Sort

\`\`\`python
O(n+k)
O(n+k)
O(n+k)
O(k)
\`\`\`

Yes
Integer keys in small range [0,k)
Radix Sort

\`\`\`python
O(nk)
O(nk)
O(nk)
O(n)
\`\`\`

Yes
Fixed-width integers; strings equal length


\`\`\`python
import random

def quicksort(arr, lo=0, hi=None):
\`\`\`

'''
In-place quicksort with random pivot and 3-way partition.

\`\`\`python
O(n log n) expected. O(n^2) worst case (vanishingly rare with random pivot).
\`\`\`

Fastest in practice: cache-friendly, in-place, low constant factor.
'''

\`\`\`python
if hi is None: hi = len(arr) - 1
if lo >= hi: return

# Random pivot eliminates worst case for adversarial input
pivot_idx = random.randint(lo, hi)
\`\`\`

arr[lo], arr[pivot_idx] = arr[pivot_idx], arr[lo]

\`\`\`python
pivot = arr[lo]

# 3-WAY PARTITION (Dijkstra Dutch National Flag):
# Partitions into: [< pivot | == pivot | > pivot]
# Critical for arrays with many duplicates: O(n log n) not O(n^2)
\`\`\`

lt, i, gt = lo, lo, hi

\`\`\`python
while i <= gt:
if arr[i] < pivot:
\`\`\`

arr[lt], arr[i] = arr[i], arr[lt]; lt += 1; i += 1

\`\`\`python
elif arr[i] > pivot:
\`\`\`

arr[i], arr[gt] = arr[gt], arr[i]; gt -= 1

\`\`\`python
# Don't increment i: new arr[i] not yet examined
else:
\`\`\`

i += 1


\`\`\`python
# Recurse only on < and > regions; == region is fully sorted
quicksort(arr, lo, lt - 1)
quicksort(arr, gt + 1, hi)

# WHY QUICKSORT IS FASTEST IN PRACTICE:
# In-place: no auxiliary array needed unlike merge sort's O(n)
# Cache-friendly: scans left-right and right-left (prefetcher works)
# Low constant: few instructions per element comparison
# 3-way: O(n) for arrays with many equal elements

# TIMSORT — Python's and Java's default:
# Detects 'runs' (already sorted subsequences) in input
# Real-world data has natural ordering (timestamps, sorted IDs)
# O(n) on already sorted input. Stable. O(n log n) worst case.
# list.sort() and sorted() use Timsort in Python

def counting_sort(arr, k): # O(n+k) — beats Omega(n log n) lower bound!
\`\`\`

'''Sort integers in [0, k). Uses key structure, not comparisons.'''

\`\`\`python
count = [0] * k
for x in arr: count[x] += 1
# Prefix sums for stable placement
for i in range(1, k): count[i] += count[i-1]
output = [0] * len(arr)
for x in reversed(arr): # reversed for stability
\`\`\`

count[x] -= 1; output[count[x]] = x

\`\`\`python
return output

# Counting sort is faster than Timsort when k is small (pixel values 0-255,
# ratings 1-5, age in years 0-150). Radix sort extends this to large integers.
\`\`\``
  },
  {
    id: "6-3",
    number: "6.3",
    title: "Recurrence Relations and the Master Theorem",
    content: `Graphs model relationships between entities. Every navigation system, package manager, social network, recommendation engine, and network router uses graph algorithms. Mastering them means mastering the most powerful problem-solving framework in computer science.

\`\`\`python
from collections import defaultdict, deque
from typing import Dict, List, Optional, Any
import heapq
from math import inf

# BFS: shortest path (fewest edges) in unweighted graphs
def bfs_shortest_path(graph, start, end):
\`\`\`

'''O(V+E) time and space. Correct because BFS explores by distance.'''

\`\`\`python
if start == end: return [start]
visited = {start}
queue = deque([(start, [start])])
while queue:
\`\`\`

node, path = queue.popleft()

\`\`\`python
for neighbor in graph.get(node, []):
if neighbor == end: return path + [neighbor]
if neighbor not in visited:
\`\`\`

visited.add(neighbor)
queue.append((neighbor, path + [neighbor]))

\`\`\`python
return None # no path

# DFS: topological sort, cycle detection, SCCs
def topological_sort(graph, n):
\`\`\`

'''
DFS-based topological sort. O(V+E).
Returns None if cycle detected (no valid topological order).
Uses 3-color marking: 0=unvisited, 1=in-progress, 2=done
'''

\`\`\`python
color = [0] * n; result = []; cycle = [False]
def dfs(v):
if cycle[0]: return
\`\`\`

color[v] = 1

\`\`\`python
for u in graph.get(v, []):
if color[u] == 1: cycle[0] = True; return # back edge = cycle
if color[u] == 0: dfs(u)
\`\`\`

color[v] = 2; result.append(v)

\`\`\`python
for v in range(n):
if color[v] == 0: dfs(v)
if cycle[0]: return None
return result[::-1] # reverse post-order = topological order

# DIJKSTRA: shortest path in weighted non-negative graphs
def dijkstra(graph, source, n):
\`\`\`

'''

\`\`\`python
O((V+E) log V) with binary heap.
\`\`\`

REQUIRES: all edge weights >= 0.
For negative weights: use Bellman-Ford instead.
'''

\`\`\`python
dist = [inf] * n; prev = [-1] * n; dist[source] = 0
heap = [(0.0, source)]
while heap:
\`\`\`

d, u = heapq.heappop(heap)

\`\`\`python
if d > dist[u]: continue # stale entry: skip
for v, weight in graph.get(u, []):
new_dist = dist[u] + weight
if new_dist < dist[v]:
\`\`\`

dist[v] = new_dist; prev[v] = u
heapq.heappush(heap, (new_dist, v))

\`\`\`python
return dist, prev

# CORRECTNESS of Dijkstra (greedy invariant):
# When u is popped with distance d, d is the true shortest distance.
# Proof: any alternate path through unpopped vertex v has dist[v] >= d.
# Adding positive edge weights can only increase distance further.
# So no path through unpopped vertices can be shorter than d.
# This proof FAILS if any edge weight is negative!

# MINIMUM SPANNING TREE: Kruskal's algorithm
class UnionFind:
def __init__(self, n):
\`\`\`

self.parent = list(range(n)); self.rank = [0] * n

\`\`\`python
def find(self, x):
if self.parent[x] != x:
\`\`\`

self.parent[x] = self.find(self.parent[x]) # path compression

\`\`\`python
return self.parent[x]
def union(self, x, y):
\`\`\`

px, py = self.find(x), self.find(y)

\`\`\`python
if px == py: return False # already connected — adding creates cycle
if self.rank[px] < self.rank[py]: px, py = py, px
\`\`\`

self.parent[py] = px # union by rank

\`\`\`python
if self.rank[px] == self.rank[py]: self.rank[px] += 1
return True

def kruskal(n, edges): # edges = [(weight, u, v), ...]
\`\`\`

'''O(E log E). Sort edges, add if no cycle (checked by Union-Find).'''

\`\`\`python
mst = []; uf = UnionFind(n)
for weight, u, v in sorted(edges):
if uf.union(u, v):
\`\`\`

mst.append((weight, u, v))

\`\`\`python
if len(mst) == n - 1: break # MST complete: V-1 edges
return mst
\`\`\``
  },
  {
    id: "6-4",
    number: "6.4",
    title: "Sorting: Why It Matters More Than You Think",
    content: `Dynamic programming solves problems by breaking them into overlapping subproblems, solving each once, and storing results. It transforms exponential brute force into polynomial efficiency. The four steps: define the subproblem, write the recurrence, identify base cases, determine computation order.

\`\`\`python
# DP STEP 1: Define the subproblem precisely
# DP STEP 2: Write the recurrence (how dp[i] relates to smaller dp[j])
# DP STEP 3: Identify base cases (smallest known subproblems)
# DP STEP 4: Determine computation order (dependencies are ready)

# LONGEST COMMON SUBSEQUENCE (LCS)
def lcs(s, t):
\`\`\`

m, n = len(s), len(t)

\`\`\`python
# dp[i][j] = LCS length of s[:i] and t[:j]
dp = [[0]*(n+1) for _ in range(m+1)]
for i in range(1, m+1):
for j in range(1, n+1):
if s[i-1] == t[j-1]:
\`\`\`

dp[i][j] = dp[i-1][j-1] + 1 # extend LCS

\`\`\`python
else:
\`\`\`

dp[i][j] = max(dp[i-1][j], dp[i][j-1]) # skip one char

\`\`\`python
return dp[m][n]
# T(n) = O(mn) time, O(mn) space (reducible to O(min(m,n)))

# EDIT DISTANCE (Levenshtein)
def edit_distance(s, t):
\`\`\`

m, n = len(s), len(t)

\`\`\`python
# dp[i][j] = min ops to transform s[:i] to t[:j]
dp = [[0]*(n+1) for _ in range(m+1)]
for i in range(m+1): dp[i][0] = i # delete i chars from s
for j in range(n+1): dp[0][j] = j # insert j chars into s
for i in range(1, m+1):
for j in range(1, n+1):
if s[i-1] == t[j-1]:
\`\`\`

dp[i][j] = dp[i-1][j-1] # no operation needed

\`\`\`python
else:
\`\`\`

dp[i][j] = 1 + min(
dp[i-1][j], # delete s[i-1]
dp[i][j-1], # insert t[j-1]
dp[i-1][j-1] # substitute
)

\`\`\`python
return dp[m][n]
# Used by: spell checkers, diff tools, DNA alignment, fuzzy search

# 0/1 KNAPSACK
def knapsack(weights, values, W):
n = len(weights)
# dp[i][w] = max value using first i items, capacity w
dp = [[0]*(W+1) for _ in range(n+1)]
for i in range(1, n+1):
\`\`\`

wi, vi = weights[i-1], values[i-1]

\`\`\`python
for w in range(W+1):
\`\`\`

dp[i][w] = dp[i-1][w] # don't take item i

\`\`\`python
if wi <= w: # take item i if it fits
\`\`\`

dp[i][w] = max(dp[i][w], dp[i-1][w-wi] + vi)

\`\`\`python
return dp[n][W]
# O(nW) pseudo-polynomial time — NP-Hard in general

# LONGEST INCREASING SUBSEQUENCE: O(n log n)
import bisect
def lis(arr):
tails = [] # tails[i] = smallest tail of IS of length i+1
for x in arr:
pos = bisect.bisect_left(tails, x)
if pos == len(tails): tails.append(x) # extends longest IS
else: tails[pos] = x # replaces: maintains smallest possible tail
return len(tails)
# [10,9,2,5,3,7,101,18] -> tails=[2,3,7,18] -> LIS length = 4
\`\`\``
  },
  {
    id: "6-5",
    number: "6.5",
    title: "Insertion Sort, Shell Sort: Small n Champions",
    content: `\`\`\`python
# P: problems solvable in polynomial time O(n^k)
# NP: problems where YES answer verifiable in polynomial time
# NP-COMPLETE: hardest problems in NP (every NP problem reduces to them)
# If ANY NP-complete problem has polynomial algorithm: P = NP
# P vs NP is the most important open problem in mathematics
# Most experts believe P != NP but no proof exists

# KEY NP-COMPLETE PROBLEMS:
# SAT: is there assignment making Boolean formula true?
# 3-SAT: SAT with exactly 3 literals per clause
# Vertex Cover: minimum vertex set covering all edges
# Traveling Salesman: shortest tour visiting all cities
# Knapsack (decision): can we get value >= V in capacity W?
# Graph Coloring: can graph be colored with k colors (k>=3)?

# PRACTICAL TOOLKIT FOR NP-HARD PROBLEMS:

# 1. EXACT SOLVERS (for small n < 50-100):
# Integer Linear Programming: Gurobi, CPLEX, CBC (free)
# SAT solvers: MiniSAT, Z3 — surprisingly fast on real instances

# 2. APPROXIMATION (polynomial, guaranteed ratio):
def vertex_cover_2approx(graph):
\`\`\`

'''2-approximation: result <= 2 * optimal size. O(V+E).'''

\`\`\`python
covered = set()
edges = set()
for u in graph:
for v in graph[u]:
if (v,u) not in edges: edges.add((u,v))
while edges:
\`\`\`

u, v = next(iter(edges))
covered.add(u); covered.add(v)

\`\`\`python
edges = {(a,b) for a,b in edges
if a not in covered and b not in covered}
return covered
# WHY 2-APPROX: edges we pick form a matching M.
# We add 2|M| vertices. OPT must include at least |M| vertices.
# Our solution: 2|M| <= 2 * OPT

# 3. HEURISTICS (no formal guarantee, fast in practice):
# Simulated annealing, genetic algorithms, local search
# 2-opt and 3-opt for TSP — finds near-optimal for n=10000

# 4. SPECIAL STRUCTURE:
# Knapsack with small W: O(nW) pseudo-polynomial
# TSP on trees: O(n) trivial
# Graph coloring on interval graphs: O(n log n)
# Identify structure in YOUR instances before concluding intractable

# REAL-WORLD NP-HARD SUCCESSES:
# American Airlines scheduling optimizer: saves ~$500M/year
# UPS ORION routing: saves 100M miles of driving per year
# Chip layout (placement + routing): billions of transistors placed daily
# These are solved with ILP + heuristics, not exact algorithms
\`\`\``
  },
  {
    id: "6-6",
    number: "6.6",
    title: "Merge Sort: The Divide-and-Conquer Paradigm",
    content: `Sorting benchmark: implement merge sort, quicksort (random pivot + 3-way), heapsort, counting sort. Benchmark on random, nearly sorted, reverse sorted, many duplicates. Plot time vs n for n = 1K to 1M. Explain in terms of cache and branch prediction.
Dijkstra variants: implement with binary heap. Test on sparse (E=O(V)), dense (E=O(V^2)), and grid graphs. Explain which representation wins in each case and why.
DP palindrome: find longest palindromic subsequence in a string. Define subproblem, write recurrence, implement bottom-up DP. Test: 'bbbab' expected 4, 'cbbd' expected 2.
DP coin change: given denominations and target, find minimum coins and all combinations. Handle no-solution case. Test edge cases: amount=0, single coin equals target, no combination works.
2-approximation TSP: build complete Euclidean graph, find MST, do DFS preorder walk. Compare to brute force exact for n<=12. Plot approximation ratio as n grows.
Chapter 6 — Twelve Algorithm Engineering Truths

\`\`\`python
O(n^2) on 1M elements = 10^12 operations = 17 minutes. O(n log n) = 20M ops = 0.02 seconds. Algorithm choice is not a constant factor.
\`\`\`

Comparison sort lower bound is Omega(n log n). Proven by decision tree: n! permutations require log2(n!) comparisons minimum.
Quicksort is fastest in practice: cache-friendly, in-place, low constant. Random pivot prevents O(n^2) worst case. 3-way partition handles duplicates.
Timsort exploits natural runs in real data. O(n) on sorted input. Python and Java default sort. Always use it unless you have specific reason not to.
BFS finds shortest path in unweighted graphs. FIFO queue ensures closest nodes explored first. O(V+E) time and space.
DFS with 3-color marking detects cycles and computes topological order in O(V+E). Gray back-edge means cycle.
Dijkstra finds shortest path for non-negative weights. O((V+E) log V). Fails with negative weights — use Bellman-Ford.
Kruskal's MST: sort edges, add if no cycle (Union-Find). O(E log E). MST has exactly V-1 edges. Prim's is better for dense graphs.
DP: define subproblem precisely, write recurrence, identify base cases, determine computation order. This template solves LCS, edit distance, knapsack, LIS.
DP correctness requires optimal substructure: optimal solution contains optimal sub-solutions. Verify this before applying DP.
NP-hardness means worst-case intractable, not always intractable in practice. ILP solvers, approximation algorithms, and heuristics solve NP-hard daily.
For NP-hard problems: identify structure, exploit special cases, use approximation with formal ratio, use ILP for small n. Never give up without trying these.`
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
