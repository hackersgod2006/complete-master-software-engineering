import { ChapterQuizData } from "../quizTypes";

export const CH05_QUIZ: ChapterQuizData = {
  chapterId: "ch5",
  sectionQuizzes: {
    "5-1": [
      {
        id: "q-5-1-1",
        question: "What is the time complexity of accessing an element in an array by its index?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 0,
        explanation: "Array access by index is a constant time operation because the memory address can be calculated directly.",
        difficulty: "easy"
      },
      {
        id: "q-5-1-2",
        question: "Which of the following is a disadvantage of a standard array?",
        options: ["Slow random access", "Fixed size (in many languages)", "High memory overhead per element", "Cannot store primitive types"],
        correct: 1,
        explanation: "Standard arrays often have a fixed size determined at allocation, making resizing expensive (requiring a new allocation and copy).",
        difficulty: "easy"
      },
      {
        id: "q-5-1-3",
        question: "When should you prefer an array over a linked list?",
        options: ["When frequent insertions at the beginning are required", "When the number of elements is unknown", "When random access performance is critical", "When you need to minimize memory usage for very small elements"],
        correct: 2,
        explanation: "Arrays provide O(1) random access, whereas linked lists require O(n) time to reach the i-th element.",
        difficulty: "medium"
      }
    ],
    "5-2": [
      {
        id: "q-5-2-1",
        question: "What is the primary advantage of a doubly linked list over a singly linked list?",
        options: ["Less memory usage", "Faster insertion at the tail", "Ability to traverse in both directions", "Faster sorting"],
        correct: 2,
        explanation: "Doubly linked lists store pointers to both the next and previous nodes, allowing bidirectional traversal.",
        difficulty: "easy"
      },
      {
        id: "q-5-2-2",
        question: "What is the time complexity to insert an element at the beginning of a linked list?",
        options: ["O(1)", "O(log n)", "O(n)", "O(1) if you have a tail pointer"],
        correct: 0,
        explanation: "Inserting at the head of a linked list only requires updating the new node's next pointer and the head pointer, which is O(1).",
        difficulty: "easy"
      },
      {
        id: "q-5-2-3",
        question: "Which data structure is most efficient for implementing a LIFO (Last-In-First-Out) stack where the size changes frequently?",
        options: ["Array", "Linked List", "Hash Table", "Binary Search Tree"],
        correct: 1,
        explanation: "A linked list is excellent for stacks because push and pop operations at the head are O(1) and don't require resizing.",
        difficulty: "medium"
      }
    ],
    "5-3": [
      {
        id: "q-5-3-1",
        question: "What is a 'collision' in a hash table?",
        options: ["When two different keys hash to the same index", "When the hash table runs out of memory", "When a key is deleted multiple times", "When the hash function returns a negative number"],
        correct: 0,
        explanation: "A collision occurs when the hash function maps two distinct keys to the same bucket index.",
        difficulty: "easy"
      },
      {
        id: "q-5-3-2",
        question: "What is the purpose of 'Chaining' in hash table implementations?",
        options: ["To encrypt the data", "To handle collisions by storing multiple elements in a list at each bucket", "To link multiple hash tables together", "To improve the speed of the hash function"],
        correct: 1,
        explanation: "Chaining handles collisions by maintaining a linked list (or other structure) of all elements that hash to the same index.",
        difficulty: "medium"
      },
      {
        id: "q-5-3-3",
        question: "What is the average-case time complexity for lookup in a well-distributed hash table?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 0,
        explanation: "In the average case, hash tables provide O(1) time complexity for lookup, insertion, and deletion.",
        difficulty: "easy"
      }
    ],
    "5-4": [
      {
        id: "q-5-4-1",
        question: "In a Binary Search Tree (BST), where are values smaller than the root stored?",
        options: ["In the right subtree", "In the left subtree", "In the next level only", "At the root itself"],
        correct: 1,
        explanation: "By definition, a BST stores values smaller than the node in its left subtree and larger values in its right subtree.",
        difficulty: "easy"
      },
      {
        id: "q-5-4-2",
        question: "What is the worst-case time complexity for searching in a non-balanced Binary Search Tree?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        correct: 2,
        explanation: "In the worst case (a degenerate tree like a linked list), searching takes O(n) time.",
        difficulty: "medium"
      },
      {
        id: "q-5-4-3",
        question: "Which tree traversal visited nodes in ascending order for a BST?",
        options: ["Pre-order", "In-order", "Post-order", "Level-order"],
        correct: 1,
        explanation: "In-order traversal (Left, Root, Right) visits nodes of a BST in non-decreasing order.",
        difficulty: "medium"
      }
    ],
    "5-5": [
      {
        id: "q-5-5-1",
        question: "What property must a Max-Heap maintain?",
        options: ["Every node is smaller than its children", "The root is always the smallest element", "Every parent node is greater than or equal to its children", "The tree is always a complete binary tree only"],
        correct: 2,
        explanation: "A Max-Heap requires that for any given node, the value of that node is greater than or equal to the values of its children.",
        difficulty: "easy"
      },
      {
        id: "q-5-5-2",
        question: "What is the time complexity of extracting the maximum element from a Max-Heap of size n?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 1,
        explanation: "Removing the root takes O(1), but 'heapifying' to restore the heap property takes O(log n).",
        difficulty: "medium"
      },
      {
        id: "q-5-5-3",
        question: "Which data structure is typically used to implement a Priority Queue?",
        options: ["Stack", "Queue", "Heap", "Hash Table"],
        correct: 2,
        explanation: "Heaps are the standard implementation for priority queues because they offer efficient O(log n) insertion and extraction of the priority element.",
        difficulty: "easy"
      }
    ],
    "5-6": [
      {
        id: "q-5-6-1",
        question: "What is a 'Directed Acyclic Graph' (DAG)?",
        options: ["A graph with no edges", "A graph where edges have no direction", "A directed graph with no cycles", "A graph where every node is connected to every other node"],
        correct: 2,
        explanation: "A DAG is a directed graph that contains no directed cycles, often used to represent dependencies.",
        difficulty: "medium"
      },
      {
        id: "q-5-6-2",
        question: "Which representation of a graph is more space-efficient for sparse graphs?",
        options: ["Adjacency Matrix", "Adjacency List", "Incidence Matrix", "Complete Graph"],
        correct: 1,
        explanation: "Adjacency lists only store existing edges, making them O(V + E) in space, whereas matrices are always O(V^2).",
        difficulty: "medium"
      },
      {
        id: "q-5-6-3",
        question: "What does BFS (Breadth-First Search) use to keep track of nodes to visit?",
        options: ["Stack", "Queue", "Priority Queue", "Hash Map"],
        correct: 1,
        explanation: "BFS uses a Queue (First-In-First-Out) to explore nodes level by level.",
        difficulty: "easy"
      }
    ],
    "5-7": [
      {
        id: "q-5-7-1",
        question: "What is a Bloom Filter primarily used for?",
        options: ["Sorting large datasets", "Testing if an element is a member of a set", "Compressing images", "Encrypting passwords"],
        correct: 1,
        explanation: "A Bloom Filter is a space-efficient probabilistic data structure used to test set membership.",
        difficulty: "medium"
      },
      {
        id: "q-5-7-2",
        question: "What kind of errors can a Bloom Filter produce?",
        options: ["False Positives", "False Negatives", "Both False Positives and False Negatives", "No errors"],
        correct: 0,
        explanation: "Bloom Filters can yield false positives (saying an item is in the set when it isn't), but never false negatives.",
        difficulty: "medium"
      },
      {
        id: "q-5-7-3",
        question: "Which operation is NOT supported by a standard Bloom Filter?",
        options: ["Insertion", "Membership Query", "Deletion", "None of the above"],
        correct: 2,
        explanation: "Standard Bloom Filters do not support deletion because multiple elements might map to the same bits; clearing a bit might accidentally remove other elements.",
        difficulty: "hard"
      }
    ],
    "5-8": [
      {
        id: "q-5-8-1",
        question: "What is the main purpose of the HyperLogLog algorithm?",
        options: ["To find the shortest path in a graph", "To estimate the number of unique elements (cardinality)", "To sort data in parallel", "To store key-value pairs"],
        correct: 1,
        explanation: "HyperLogLog is a probabilistic algorithm used to estimate the cardinality of very large datasets with minimal memory.",
        difficulty: "hard"
      },
      {
        id: "q-5-8-2",
        question: "How does HyperLogLog achieve its memory efficiency?",
        options: ["By compressing the input data", "By using a hash function and observing the number of leading zeros", "By storing only the first 100 elements", "By using a distributed hash table"],
        correct: 1,
        explanation: "It estimates cardinality by hashing elements and recording the maximum number of leading zeros observed in the hash values.",
        difficulty: "hard"
      },
      {
        id: "q-5-8-3",
        question: "What is the typical error rate of HyperLogLog?",
        options: ["Fixed at 5%", "Determined by the amount of memory allocated (m), usually around 1.04/sqrt(m)", "0% (it is exact)", "It grows exponentially with data size"],
        correct: 1,
        explanation: "The error rate is inversely proportional to the square root of the number of registers used.",
        difficulty: "hard"
      }
    ],
    "5-9": [
      {
        id: "q-5-9-1",
        question: "What is a Skip List?",
        options: ["A list that skips every other element", "A probabilistic data structure that allows O(log n) search within a linked list", "A list used for memory garbage collection", "A data structure for storing sparse matrices"],
        correct: 1,
        explanation: "Skip lists use multiple levels of linked lists to allow fast 'skipping' of elements, providing logarithmic search time on average.",
        difficulty: "medium"
      },
      {
        id: "q-5-9-2",
        question: "What is the average time complexity for search, insertion, and deletion in a Skip List?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 1,
        explanation: "Like balanced trees, Skip Lists offer O(log n) average performance for basic operations.",
        difficulty: "medium"
      },
      {
        id: "q-5-9-3",
        question: "How does a Skip List decide the height of a new node?",
        options: ["It is always the same height", "It is based on the value of the node", "It is determined randomly (probabilistically)", "It is based on the current height of the list"],
        correct: 2,
        explanation: "Height is usually determined by 'flipping a coin' until it comes up tails, ensuring a logarithmic distribution of levels.",
        difficulty: "medium"
      }
    ],
    "5-10": [
      {
        id: "q-5-10-1",
        question: "Which data structure would be most appropriate for implementing an 'Undo' feature in a text editor?",
        options: ["Queue", "Stack", "Hash Table", "Heap"],
        correct: 1,
        explanation: "A Stack (LIFO) is perfect because the most recent action is the first one to be undone.",
        difficulty: "easy"
      },
      {
        id: "q-5-10-2",
        question: "What is a 'Trie' (Prefix Tree) best suited for?",
        options: ["Storing numerical values", "Fast retrieval of strings with common prefixes", "Calculating shortest paths", "Balancing binary trees"],
        correct: 1,
        explanation: "Tries are optimized for string operations like autocomplete and prefix matching.",
        difficulty: "medium"
      },
      {
        id: "q-5-10-3",
        question: "Which structure is used in 'Disjoint Set Union' (DSU)?",
        options: ["Forest of trees", "Single linked list", "Hash table of queues", "Complete graph"],
        correct: 0,
        explanation: "DSU (Union-Find) is typically represented as a forest where each node points to its parent in the set.",
        difficulty: "hard"
      }
    ]
  },
  examQuestions: [
    {
      id: "exam-ch5-1",
      question: "Which data structure provides O(1) access but O(n) insertion (in the worst case due to resizing)?",
      options: ["Linked List", "Dynamic Array", "Binary Search Tree", "Stack"],
      correct: 1,
      explanation: "Dynamic arrays (like ArrayList in Java or list in Python) have O(1) access but can take O(n) to insert if a resize/copy is triggered.",
      difficulty: "medium"
    },
    {
      id: "exam-ch5-2",
      question: "In a Red-Black Tree, what is the maximum height relative to a perfectly balanced BST?",
      options: ["Same height", "Approximately 2 * log(n)", "Approximately 1.44 * log(n)", "O(n)"],
      correct: 1,
      explanation: "Red-Black trees guarantee that the longest path is no more than twice as long as the shortest path, keeping height O(log n).",
      difficulty: "hard"
    },
    {
      id: "exam-ch5-3",
      question: "Which of the following uses the most memory per element for storing 10,000 integers?",
      options: ["A contiguous array", "A singly linked list", "A doubly linked list", "A Bloom Filter"],
      correct: 2,
      explanation: "A doubly linked list requires two pointers (next and prev) plus the data for every element, which is significant overhead.",
      difficulty: "medium"
    },
    {
      id: "exam-ch5-4",
      question: "What happens to the load factor of a hash table as you add more elements without resizing?",
      options: ["It decreases", "It stays the same", "It increases", "It becomes zero"],
      correct: 2,
      explanation: "Load factor is n/m (elements/buckets). As n increases, the load factor increases.",
      difficulty: "easy"
    },
    {
      id: "exam-ch5-5",
      question: "Which traversal of a tree corresponds to a Breadth-First search?",
      options: ["Pre-order", "In-order", "Post-order", "Level-order"],
      correct: 3,
      explanation: "Level-order traversal visits nodes layer by layer, which is exactly what BFS does.",
      difficulty: "easy"
    },
    {
      id: "exam-ch5-6",
      question: "A Bloom filter with 0.1% false positive rate is used to check if a username is taken. If it says 'Available', what is the probability the name is actually taken?",
      options: ["0.1%", "100%", "0%", "Unknown"],
      correct: 2,
      explanation: "Bloom filters have zero false negatives. If it says an item is NOT in the set, it is definitely not in the set.",
      difficulty: "hard"
    },
    {
      id: "exam-ch5-7",
      question: "What is the primary advantage of a B-Tree over a standard Binary Search Tree?",
      options: ["It is faster for in-memory operations", "It minimizes disk I/O by having a large branching factor", "It uses less memory", "It is easier to implement"],
      correct: 1,
      explanation: "B-Trees are designed for storage systems (databases/filesystems) where reading a large block (node) of many keys is faster than many small reads.",
      difficulty: "medium"
    },
    {
      id: "exam-ch5-8",
      question: "If you need to find the K-th smallest element in a stream of numbers, which structure is most helpful?",
      options: ["Hash Table", "Max-Heap of size K", "Min-Heap of size K", "Queue"],
      correct: 1,
      explanation: "A Max-Heap of size K allows you to keep track of the K smallest elements seen so far; the root will be the K-th smallest.",
      difficulty: "hard"
    },
    {
      id: "exam-ch5-9",
      question: "Which of these is a self-balancing binary search tree?",
      options: ["AVL Tree", "Binary Heap", "Trie", "Huffman Tree"],
      correct: 0,
      explanation: "AVL trees and Red-Black trees are common self-balancing BSTs.",
      difficulty: "easy"
    },
    {
      id: "exam-ch5-10",
      question: "What is the time complexity to build a heap from an unordered array of n elements?",
      options: ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"],
      correct: 1,
      explanation: "While inserting n elements one by one is O(n log n), the 'build-heap' algorithm (bottom-up) is O(n).",
      difficulty: "hard"
    }
  ]
};
