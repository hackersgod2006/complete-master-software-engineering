import { ChapterQuizData } from "../quizTypes";

export const CH06_QUIZ: ChapterQuizData = {
  chapterId: "ch6",
  sectionQuizzes: {
    "6-1": [
      {
        id: "q-6-1-1",
        question: "What does Big-O notation describe?",
        options: ["The exact execution time of a program", "The upper bound of the growth rate of an algorithm", "The average case performance", "The memory usage in bytes"],
        correct: 1,
        explanation: "Big-O notation describes the worst-case scenario or upper bound of how the resource requirements grow with input size.",
        difficulty: "easy"
      },
      {
        id: "q-6-1-2",
        question: "If an algorithm's complexity is O(n^2), what happens to the execution time if the input size doubles?",
        options: ["It doubles", "It triples", "It quadruples", "It stays the same"],
        correct: 2,
        explanation: "(2n)^2 = 4n^2, so the time increases by a factor of 4.",
        difficulty: "easy"
      },
      {
        id: "q-6-1-3",
        question: "What is the Big-O complexity of a nested loop where the inner loop runs 'i' times (where i is the current index of the outer loop)?",
        options: ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"],
        correct: 3,
        explanation: "The sum of 1 to n is n(n+1)/2, which simplifies to O(n^2).",
        difficulty: "medium"
      }
    ],
    "6-2": [
      {
        id: "q-6-2-1",
        question: "Which sorting algorithm is known for its O(n^2) worst-case but is often faster in practice due to cache locality and small constants?",
        options: ["Merge Sort", "Quick Sort", "Insertion Sort", "Heap Sort"],
        correct: 2,
        explanation: "Insertion Sort is very efficient for small datasets and nearly-sorted data, often outperforming O(n log n) algorithms in those cases.",
        difficulty: "medium"
      },
      {
        id: "q-6-2-2",
        question: "What is the main drawback of Merge Sort?",
        options: ["O(n^2) worst case", "It is not stable", "O(n) auxiliary space requirement", "It cannot handle duplicate values"],
        correct: 2,
        explanation: "Merge Sort requires O(n) extra space to merge the sub-arrays, unlike in-place algorithms like Quick Sort or Heap Sort.",
        difficulty: "medium"
      },
      {
        id: "q-6-2-3",
        question: "Which sorting algorithm provides a guaranteed O(n log n) time complexity and O(1) extra space?",
        options: ["Quick Sort", "Merge Sort", "Heap Sort", "Bubble Sort"],
        correct: 2,
        explanation: "Heap Sort is in-place and always O(n log n), though it is often slower than Quick Sort in practice.",
        difficulty: "medium"
      }
    ],
    "6-3": [
      {
        id: "q-6-3-1",
        question: "Binary search requires which property of the input data?",
        options: ["Data must be integers", "Data must be sorted", "Data must be in a linked list", "Data must be positive"],
        correct: 1,
        explanation: "Binary search works by repeatedly halving the search space, which requires the data to be ordered.",
        difficulty: "easy"
      },
      {
        id: "q-6-3-2",
        question: "What is the time complexity of binary search on a sorted array of n elements?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 1,
        explanation: "Each step of binary search halves the remaining range, leading to a logarithmic number of steps.",
        difficulty: "easy"
      },
      {
        id: "q-6-3-3",
        question: "In what scenario would you use Ternary Search over Binary Search?",
        options: ["When searching in a sorted array", "When finding the maximum/minimum of a unimodal function", "When memory is extremely limited", "When the data is unsorted"],
        correct: 1,
        explanation: "Ternary search is specifically useful for finding the peak or valley of a unimodal function (increasing then decreasing).",
        difficulty: "hard"
      }
    ],
    "6-4": [
      {
        id: "q-6-4-1",
        question: "What are the three steps of the 'Divide and Conquer' strategy?",
        options: ["Scan, Process, Output", "Divide, Conquer, Combine", "Split, Sort, Save", "Map, Filter, Reduce"],
        correct: 1,
        explanation: "The strategy involves dividing the problem into subproblems, conquering them recursively, and combining the results.",
        difficulty: "easy"
      },
      {
        id: "q-6-4-2",
        question: "Which of the following is NOT a typical Divide and Conquer algorithm?",
        options: ["Merge Sort", "Quick Sort", "Binary Search", "Dijkstra's Algorithm"],
        correct: 3,
        explanation: "Dijkstra's is a greedy algorithm. Merge Sort, Quick Sort, and Binary Search all divide the problem into smaller parts.",
        difficulty: "medium"
      },
      {
        id: "q-6-4-3",
        question: "What does the Master Theorem help with?",
        options: ["Proving NP-completeness", "Solving recurrence relations for Divide and Conquer algorithms", "Finding the shortest path in a graph", "Optimizing database queries"],
        correct: 1,
        explanation: "The Master Theorem provides a cookbook solution for finding the Big-O complexity of many recursive algorithms.",
        difficulty: "hard"
      }
    ],
    "6-5": [
      {
        id: "q-6-5-1",
        question: "What is the key difference between Dynamic Programming and Divide and Conquer?",
        options: ["DP uses recursion, D&C doesn't", "DP is for sorting, D&C is for searching", "DP is used when subproblems overlap", "D&C is always faster than DP"],
        correct: 2,
        explanation: "Dynamic Programming is specifically used for optimization problems with overlapping subproblems, allowing it to store results (memoization) and avoid redundant work.",
        difficulty: "medium"
      },
      {
        id: "q-6-5-2",
        question: "What is 'Memoization' in Dynamic Programming?",
        options: ["A way to delete unused variables", "Storing the results of expensive function calls and returning the cached result when the same inputs occur again", "Sorting the input before processing", "A technique for parallelizing loops"],
        correct: 1,
        explanation: "Memoization is the top-down optimization technique in DP that caches results of subproblems.",
        difficulty: "medium"
      },
      {
        id: "q-6-5-3",
        question: "Which of these is a classic Dynamic Programming problem?",
        options: ["0/1 Knapsack Problem", "Quick Sort", "Binary Search", "Finding the maximum in an array"],
        correct: 0,
        explanation: "The 0/1 Knapsack problem is a famous example solved using DP to find the optimal combination of items.",
        difficulty: "medium"
      }
    ],
    "6-6": [
      {
        id: "q-6-6-1",
        question: "What characterizes a 'Greedy' algorithm?",
        options: ["It explores all possible solutions", "It makes the locally optimal choice at each step", "It uses a lot of memory", "It always finds the global optimum"],
        correct: 1,
        explanation: "Greedy algorithms make the best choice available at the current moment without considering future consequences.",
        difficulty: "easy"
      },
      {
        id: "q-6-6-2",
        question: "Which of these is a greedy algorithm?",
        options: ["Merge Sort", "Huffman Coding", "Floyd-Warshall Algorithm", "Longest Common Subsequence"],
        correct: 1,
        explanation: "Huffman coding uses a greedy approach to build an optimal prefix tree for data compression.",
        difficulty: "medium"
      },
      {
        id: "q-6-6-3",
        question: "Does a greedy algorithm always find the optimal solution for the Coin Change problem?",
        options: ["Yes, always", "No, it depends on the currency denominations", "Yes, if the amount is large", "No, greedy algorithms never find optimal solutions"],
        correct: 1,
        explanation: "Greedy works for US currency but fails for arbitrary denominations (e.g., coins of 1, 3, 4 for change of 6).",
        difficulty: "medium"
      }
    ],
    "6-7": [
      {
        id: "q-6-7-1",
        question: "Which algorithm finds the shortest path from a source node to all other nodes in a graph with non-negative edge weights?",
        options: ["Prim's", "Kruskal's", "Dijkstra's", "Bellman-Ford"],
        correct: 2,
        explanation: "Dijkstra's algorithm is the standard choice for single-source shortest paths with non-negative weights.",
        difficulty: "easy"
      },
      {
        id: "q-6-7-2",
        question: "What is the purpose of Kruskal's algorithm?",
        options: ["To find the shortest path between two nodes", "To find the Minimum Spanning Tree (MST) of a graph", "To detect cycles in a graph", "To perform a topological sort"],
        correct: 1,
        explanation: "Kruskal's algorithm is a greedy algorithm used to find the MST of a connected, undirected graph.",
        difficulty: "medium"
      },
      {
        id: "q-6-7-3",
        question: "When should you use the Bellman-Ford algorithm instead of Dijkstra's?",
        options: ["When the graph is very large", "When the graph contains negative edge weights", "When you need the MST", "When the graph is undirected"],
        correct: 1,
        explanation: "Bellman-Ford can handle negative weights (and detect negative cycles), whereas Dijkstra's cannot.",
        difficulty: "medium"
      }
    ],
    "6-8": [
      {
        id: "q-6-8-1",
        question: "What is a 'backtracking' algorithm?",
        options: ["An algorithm that reverses the input", "A refined brute-force that discards solutions that cannot be completed", "A sorting algorithm for linked lists", "An algorithm used in networking"],
        correct: 1,
        explanation: "Backtracking builds candidates for solutions and abandons a candidate ('backtracks') as soon as it determines it cannot possibly lead to a valid solution.",
        difficulty: "medium"
      },
      {
        id: "q-6-8-2",
        question: "The N-Queens problem is typically solved using which technique?",
        options: ["Greedy", "Divide and Conquer", "Backtracking", "Dynamic Programming"],
        correct: 2,
        explanation: "Backtracking is used to place queens one by one and backtrack when a conflict is detected.",
        difficulty: "medium"
      },
      {
        id: "q-6-8-3",
        question: "What is the time complexity of a naive backtracking solution for the Traveling Salesperson Problem?",
        options: ["O(n^2)", "O(2^n)", "O(n!)", "O(n log n)"],
        correct: 2,
        explanation: "Trying all permutations of n cities leads to O(n!) complexity.",
        difficulty: "hard"
      }
    ],
    "6-9": [
      {
        id: "q-6-9-1",
        question: "What is the time complexity of topological sort on a graph with V vertices and E edges?",
        options: ["O(V^2)", "O(V + E)", "O(E log V)", "O(V log V)"],
        correct: 1,
        explanation: "Topological sort can be performed using DFS in linear time O(V + E).",
        difficulty: "medium"
      },
      {
        id: "q-6-9-2",
        question: "Can topological sort be performed on a graph with a cycle?",
        options: ["Yes, always", "No, it must be a Directed Acyclic Graph (DAG)", "Yes, if the cycle is small", "Only if the graph is undirected"],
        correct: 1,
        explanation: "Topological sorting is only possible for DAGs; a cycle means there is no valid linear ordering of dependencies.",
        difficulty: "medium"
      },
      {
        id: "q-6-9-3",
        question: "Which algorithm is used to find all-pairs shortest paths in a graph?",
        options: ["Dijkstra's", "Floyd-Warshall", "A*", "Breadth-First Search"],
        correct: 1,
        explanation: "Floyd-Warshall is a DP algorithm that finds the shortest paths between every pair of vertices in O(V^3).",
        difficulty: "hard"
      }
    ],
    "6-10": [
      {
        id: "q-6-10-1",
        question: "What is the main advantage of the A* search algorithm over Dijkstra's?",
        options: ["It uses less memory", "It uses a heuristic to guide the search, making it faster in many cases", "It works with negative weights", "It is easier to implement"],
        correct: 1,
        explanation: "A* uses a heuristic function h(n) to estimate the cost to the goal, significantly reducing the number of nodes explored.",
        difficulty: "medium"
      },
      {
        id: "q-6-10-2",
        question: "What condition must a heuristic satisfy for A* to be 'admissible'?",
        options: ["It must never over-estimate the actual cost to the goal", "It must always be zero", "It must be greater than the actual cost", "It must be a linear function"],
        correct: 0,
        explanation: "An admissible heuristic never over-estimates the cost, ensuring A* finds the optimal path.",
        difficulty: "hard"
      },
      {
        id: "q-6-10-3",
        question: "What is the Boyer-Moore algorithm used for?",
        options: ["Graph coloring", "Matrix multiplication", "String searching/matching", "Random number generation"],
        correct: 2,
        explanation: "Boyer-Moore is a highly efficient string-searching algorithm that skips characters using 'bad character' and 'good suffix' rules.",
        difficulty: "hard"
      }
    ]
  },
  examQuestions: [
    {
      id: "exam-ch6-1",
      question: "Which sorting algorithm has a worst-case time complexity of O(n log n)?",
      options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Selection Sort"],
      correct: 1,
      explanation: "Merge Sort and Heap Sort are O(n log n) in the worst case. Quick Sort is O(n^2) in its worst case (though rare with good pivots).",
      difficulty: "easy"
    },
    {
      id: "exam-ch6-2",
      question: "What is the time complexity of adding an item to a priority queue implemented with a binary heap?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: 1,
      explanation: "Inserting into a heap takes O(log n) time to 'bubble up' the element.",
      difficulty: "medium"
    },
    {
      id: "exam-ch6-3",
      question: "Which algorithm is used to find the strongly connected components of a directed graph?",
      options: ["Tarjan's Algorithm", "Prim's Algorithm", "Kruskal's Algorithm", "Dijkstra's Algorithm"],
      correct: 0,
      explanation: "Tarjan's and Kosaraju's are the primary algorithms for finding SCCs.",
      difficulty: "hard"
    },
    {
      id: "exam-ch6-4",
      question: "If you need to sort a list of 1 million integers that are already nearly sorted, which algorithm would likely be fastest?",
      options: ["Quick Sort", "Insertion Sort", "Merge Sort", "Heap Sort"],
      correct: 1,
      explanation: "Insertion Sort runs in O(n) for nearly-sorted data.",
      difficulty: "medium"
    },
    {
      id: "exam-ch6-5",
      question: "What is the space complexity of Depth-First Search on a graph with V vertices?",
      options: ["O(1)", "O(V)", "O(E)", "O(V^2)"],
      correct: 1,
      explanation: "In the worst case (a single path of all vertices), the recursion stack or visited set will store V entries.",
      difficulty: "easy"
    },
    {
      id: "exam-ch6-6",
      question: "A* search becomes identical to Dijkstra's algorithm when the heuristic h(n) is:",
      options: ["Very large", "Always 0", "The exact cost to the goal", "Negative"],
      correct: 1,
      explanation: "If h(n) = 0, A* only considers the cost from the start g(n), which is exactly what Dijkstra's does.",
      difficulty: "medium"
    },
    {
      id: "exam-ch6-7",
      question: "What is the time complexity of the most efficient known algorithm for multiplying two n x n matrices (Big-O notation)?",
      options: ["O(n^2)", "O(n^3)", "Approximately O(n^2.37)", "O(n^log n)"],
      correct: 2,
      explanation: "While the naive algorithm is O(n^3), Strassen's is O(n^2.8) and current state-of-the-art (like Coppersmith-Winograd variants) is around O(n^2.37).",
      difficulty: "hard"
    },
    {
      id: "exam-ch6-8",
      question: "Which data structure is essential for implementing Kruskal's algorithm efficiently?",
      options: ["Priority Queue and Disjoint Set (Union-Find)", "Stack and Queue", "Hash Table", "Binary Search Tree"],
      correct: 0,
      explanation: "Kruskal's uses a priority queue to sort edges and a Disjoint Set to track connected components and avoid cycles.",
      difficulty: "hard"
    },
    {
      id: "exam-ch6-9",
      question: "What is the amortized time complexity of an operation?",
      options: ["The worst-case for a single operation", "The average-case over a sequence of operations", "The best-case scenario", "The time complexity in parallel"],
      correct: 1,
      explanation: "Amortized analysis looks at the total cost of a sequence of operations to provide a more realistic average (e.g., O(1) for dynamic array appends).",
      difficulty: "medium"
    },
    {
      id: "exam-ch6-10",
      question: "Which of the following problems is NOT solvable in polynomial time (P) with current knowledge?",
      options: ["Sorting an array", "Finding the shortest path", "Traveling Salesperson Problem", "Determining if a number is prime"],
      correct: 2,
      explanation: "TSP is NP-hard. Primality testing was proven to be in P (AKS test) in 2002.",
      difficulty: "medium"
    }
  ]
};
