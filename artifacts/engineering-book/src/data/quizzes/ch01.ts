import { ChapterQuizData } from '../quizTypes';

export const CH01_QUIZ: ChapterQuizData = {
  chapterId: "ch1",
  sectionQuizzes: {
    "1-1": [
      {
        id: "q-1-1-1",
        question: "Why must a software engineer understand hardware?",
        options: [
          "All programming languages require hardware-level knowledge",
          "Understanding hardware helps reason about performance, concurrency bugs, and system behavior",
          "Modern abstractions make hardware knowledge completely unnecessary",
          "Hardware knowledge is only required for embedded systems engineers"
        ],
        correct: 1,
        explanation: "Understanding hardware lets engineers reason about why code is fast or slow, why concurrency is hard, and what causes certain classes of bugs.",
        difficulty: "easy"
      },
      {
        id: "q-1-1-2",
        question: "What is a transistor in modern computer hardware?",
        options: [
          "A unit for measuring CPU speed in GHz",
          "A type of memory module used in RAM",
          "An electronic switch that forms the foundation of all digital logic",
          "A protocol for communicating between CPU cores"
        ],
        correct: 2,
        explanation: "A transistor is a tiny electronic switch — billions of them make up modern CPUs, and their on/off states represent binary digits.",
        difficulty: "easy"
      },
      {
        id: "q-1-1-3",
        question: "Which CPU component is responsible for performing arithmetic and logic operations?",
        options: [
          "Control Unit (CU)",
          "Memory Management Unit (MMU)",
          "Arithmetic Logic Unit (ALU)",
          "Translation Lookaside Buffer (TLB)"
        ],
        correct: 2,
        explanation: "The ALU performs all arithmetic (add, subtract, multiply) and logical (AND, OR, NOT) operations in the CPU.",
        difficulty: "medium"
      }
    ],
    "1-2": [
      {
        id: "q-1-2-1",
        question: "What does the fetch-decode-execute cycle describe?",
        options: [
          "How data moves from RAM to disk",
          "The sequence a CPU follows for every instruction it processes",
          "How compilers translate high-level code to machine code",
          "The process of loading an operating system at boot"
        ],
        correct: 1,
        explanation: "Every CPU instruction goes through Fetch (get from memory), Decode (interpret opcode), and Execute (perform the operation).",
        difficulty: "easy"
      },
      {
        id: "q-1-2-2",
        question: "What is CPU pipelining?",
        options: [
          "Connecting multiple CPUs in parallel",
          "Overlapping multiple instruction stages so multiple instructions are in-flight simultaneously",
          "A method for cache invalidation across cores",
          "A technique for reducing memory bus bandwidth usage"
        ],
        correct: 1,
        explanation: "Pipelining overlaps the fetch, decode, and execute stages of multiple instructions, dramatically increasing throughput even though each instruction still takes the same number of cycles.",
        difficulty: "medium"
      },
      {
        id: "q-1-2-3",
        question: "What is a branch misprediction and why is it costly?",
        options: [
          "When the CPU accesses the wrong memory address, causing a page fault",
          "When the CPU incorrectly guesses a conditional branch direction and must discard pipeline work",
          "When a CPU core writes to a cache line owned by another core",
          "When an integer overflow causes incorrect arithmetic results"
        ],
        correct: 1,
        explanation: "Branch misprediction flushes the pipeline — all in-flight work is discarded and must restart from the correct path, costing 10-20 cycles.",
        difficulty: "hard"
      }
    ],
    "1-3": [
      {
        id: "q-1-3-1",
        question: "In the CPU cache hierarchy, which cache is fastest and smallest?",
        options: [
          "L3 cache",
          "L2 cache",
          "L1 cache",
          "Last-level cache (LLC)"
        ],
        correct: 2,
        explanation: "L1 cache is the fastest (~1ns, ~32KB) and is per-core. L2 is slightly larger and slower. L3 is shared across cores and is largest but slowest.",
        difficulty: "easy"
      },
      {
        id: "q-1-3-2",
        question: "What is cache-friendly code?",
        options: [
          "Code that avoids using heap allocations",
          "Code that accesses memory in sequential or predictable patterns, exploiting spatial locality",
          "Code that minimizes function call overhead",
          "Code that uses SIMD intrinsics for vectorized operations"
        ],
        correct: 1,
        explanation: "Cache-friendly code accesses memory sequentially (e.g., iterating arrays row-by-row), which exploits CPU prefetching and spatial locality for dramatically better performance.",
        difficulty: "medium"
      },
      {
        id: "q-1-3-3",
        question: "What is false sharing in a multi-core system?",
        options: [
          "Two threads writing to the same variable causing a data race",
          "A deadlock caused by threads waiting on each other's locks",
          "Two cores invalidating each other's cache lines because they hold different data on the same cache line",
          "An OS scheduler placing threads on the wrong NUMA node"
        ],
        correct: 2,
        explanation: "False sharing occurs when two cores modify different variables that happen to share the same cache line, causing constant cache-line bouncing and severe performance degradation.",
        difficulty: "hard"
      }
    ],
    "1-4": [
      {
        id: "q-1-4-1",
        question: "What does SIMD stand for and what is its purpose?",
        options: [
          "Synchronous Instruction with Memory Dispatch — for DMA transfers",
          "Single Instruction, Multiple Data — for performing the same operation on multiple values simultaneously",
          "Staged Instruction and Memory Dispatch — for pipelined CPU designs",
          "Superscalar Instruction with Memory Decode — for out-of-order execution"
        ],
        correct: 1,
        explanation: "SIMD (Single Instruction, Multiple Data) allows one CPU instruction to operate on multiple data elements simultaneously, enabling vectorized computation for significant speedups.",
        difficulty: "medium"
      },
      {
        id: "q-1-4-2",
        question: "What is out-of-order execution?",
        options: [
          "Executing instructions in a non-sequential program order to reduce stalls and improve CPU utilization",
          "Running multiple threads simultaneously on different CPU cores",
          "Speculative execution of branches before the condition is known",
          "Prefetching data from memory before it is requested by the program"
        ],
        correct: 0,
        explanation: "Out-of-order execution allows the CPU to reorder instructions (while preserving correctness) to avoid stalls caused by data dependencies or long-latency operations like cache misses.",
        difficulty: "hard"
      },
      {
        id: "q-1-4-3",
        question: "What is a CPU clock cycle, and why does clock speed not fully determine performance?",
        options: [
          "A clock cycle is one fetch operation; performance is also limited by memory speed",
          "A clock cycle is the basic unit of CPU time; performance also depends on IPC (instructions per cycle), memory latency, and cache efficiency",
          "A clock cycle determines power consumption; performance is entirely determined by core count",
          "A clock cycle measures context switch overhead; performance depends on OS scheduling"
        ],
        correct: 1,
        explanation: "Performance = Clock Speed × IPC (instructions per cycle). A CPU at 3GHz with low IPC can be outperformed by a 2GHz CPU with high IPC and good cache behavior.",
        difficulty: "medium"
      }
    ],
    "1-5": [
      {
        id: "q-1-5-1",
        question: "What is NUMA (Non-Uniform Memory Access)?",
        options: [
          "A type of RAM that is faster than standard DDR memory",
          "A multi-processor architecture where memory access time depends on which processor is accessing which memory bank",
          "A cache coherence protocol used in multi-core CPUs",
          "A virtual memory technique for large-address-space processes"
        ],
        correct: 1,
        explanation: "In NUMA systems (common in servers with multiple CPU sockets), accessing local memory is fast but accessing memory attached to another CPU socket is significantly slower.",
        difficulty: "hard"
      },
      {
        id: "q-1-5-2",
        question: "Which bus connects the CPU to main memory (RAM)?",
        options: [
          "PCIe bus",
          "SATA bus",
          "Memory bus (front-side bus / memory controller)",
          "USB bus"
        ],
        correct: 2,
        explanation: "The memory bus (or memory controller in modern CPUs) connects the CPU to RAM. Its bandwidth and latency are critical performance factors.",
        difficulty: "easy"
      },
      {
        id: "q-1-5-3",
        question: "Why is understanding the CPU memory hierarchy important for a software engineer?",
        options: [
          "It determines which programming language to choose",
          "It helps write code that minimizes cache misses, which can cause 100x performance differences",
          "It is only relevant for OS kernel developers",
          "It determines the maximum file size a program can process"
        ],
        correct: 1,
        explanation: "Cache misses can make code 100x slower than cache-hot code. Engineers who understand the hierarchy can design data structures and algorithms to exploit locality.",
        difficulty: "medium"
      }
    ]
  },
  examQuestions: [
    {
      id: "exam-ch1-1",
      question: "What happens during a cache miss in a CPU?",
      options: [
        "The CPU raises an interrupt and the OS handles the missing data",
        "The CPU stalls and fetches data from a slower memory level (L2, L3, or RAM)",
        "The program crashes with a segmentation fault",
        "The CPU executes a NOP instruction and retries the memory access"
      ],
      correct: 1,
      explanation: "On a cache miss, the CPU stalls while it fetches data from the next level of the hierarchy. L1 miss costs ~4 cycles, L3 miss costs ~40 cycles, DRAM miss costs ~200+ cycles.",
      difficulty: "medium"
    },
    {
      id: "exam-ch1-2",
      question: "What is speculative execution and what security vulnerability did it lead to?",
      options: [
        "Parallel execution of threads; it led to race conditions",
        "Executing instructions before knowing if they are needed; it led to Spectre/Meltdown vulnerabilities",
        "Predicting memory addresses before they are computed; it led to buffer overflows",
        "Running multiple programs simultaneously; it led to privilege escalation attacks"
      ],
      correct: 1,
      explanation: "Speculative execution runs instructions ahead of time. Spectre and Meltdown exploited this by reading privileged memory through timing side channels on speculatively-executed paths.",
      difficulty: "hard"
    },
    {
      id: "exam-ch1-3",
      question: "How many transistors does a modern CPU like Apple M3 contain?",
      options: [
        "About 1 million",
        "About 100 million",
        "About 1 billion",
        "About 25 billion"
      ],
      correct: 3,
      explanation: "Apple M3 contains ~25 billion transistors. Modern CPUs have billions of transistors packed at nanometer-scale density.",
      difficulty: "easy"
    },
    {
      id: "exam-ch1-4",
      question: "What does the Memory Hierarchy optimize for?",
      options: [
        "Maximizing total storage capacity at the lowest cost",
        "Balancing speed and cost: fast-but-small caches near the CPU, slow-but-large storage far away",
        "Ensuring all memory is equally fast regardless of access pattern",
        "Minimizing power consumption across all memory levels"
      ],
      correct: 1,
      explanation: "The hierarchy (registers → L1 → L2 → L3 → RAM → disk) trades speed for capacity at each level, giving programs the illusion of fast, large memory.",
      difficulty: "medium"
    },
    {
      id: "exam-ch1-5",
      question: "What is cache line size on most modern x86 processors?",
      options: [
        "8 bytes",
        "16 bytes",
        "64 bytes",
        "512 bytes"
      ],
      correct: 2,
      explanation: "Cache lines are 64 bytes on most modern x86 CPUs. When you access one byte, the CPU loads the entire 64-byte line, which is why sequential access patterns are efficient.",
      difficulty: "medium"
    },
    {
      id: "exam-ch1-6",
      question: "What is the primary job of the CPU Control Unit?",
      options: [
        "Performing floating-point arithmetic operations",
        "Managing virtual-to-physical memory address translations",
        "Directing the fetch, decode, and execute operations of the CPU",
        "Handling interrupts from I/O devices"
      ],
      correct: 2,
      explanation: "The Control Unit (CU) orchestrates the fetch-decode-execute cycle, directing other CPU components to fetch instructions, decode them, and execute them in the right order.",
      difficulty: "easy"
    },
    {
      id: "exam-ch1-7",
      question: "Why does row-major array traversal outperform column-major traversal in C/C++?",
      options: [
        "Row-major uses fewer CPU instructions",
        "C arrays are stored row-major in memory, so row traversal is sequential and cache-friendly",
        "Column-major traversal causes integer overflow on large arrays",
        "Modern compilers always optimize column-major into row-major access"
      ],
      correct: 1,
      explanation: "C/C++ store 2D arrays in row-major order. Traversing column-by-column causes a cache miss on almost every access, while row-by-row exploits spatial locality perfectly.",
      difficulty: "hard"
    },
    {
      id: "exam-ch1-8",
      question: "What is the role of the Translation Lookaside Buffer (TLB)?",
      options: [
        "Buffering disk reads to reduce I/O latency",
        "Caching virtual-to-physical address translations to avoid walking the page table on every memory access",
        "Storing recently used CPU instructions to speed up fetch",
        "Managing context switches between kernel and user space"
      ],
      correct: 1,
      explanation: "Walking the page table for every memory access would be extremely slow. The TLB caches recent virtual-to-physical translations, making most address lookups fast.",
      difficulty: "hard"
    },
    {
      id: "exam-ch1-9",
      question: "What is the difference between latency and throughput?",
      options: [
        "Latency is the maximum rate; throughput is the minimum time",
        "Latency is the time to complete one operation; throughput is how many operations complete per unit time",
        "Latency measures CPU speed; throughput measures memory speed",
        "They are synonyms describing different aspects of the same metric"
      ],
      correct: 1,
      explanation: "Latency = time for a single operation (e.g., 10ms per request). Throughput = operations per second (e.g., 1000 requests/sec). You can have high throughput with high latency using parallelism.",
      difficulty: "medium"
    },
    {
      id: "exam-ch1-10",
      question: "What is Amdahl's Law and what does it tell us about parallelization?",
      options: [
        "Any program can be perfectly parallelized if given enough cores",
        "The speedup from parallelization is limited by the sequential fraction of the program",
        "Adding more cores always results in proportional performance improvement",
        "Memory bandwidth, not CPU count, limits all parallel programs"
      ],
      correct: 1,
      explanation: "Amdahl's Law states: speedup = 1 / (S + (1-S)/N) where S is the sequential fraction. If 20% of a program is sequential, the max possible speedup is 5x no matter how many cores you add.",
      difficulty: "hard"
    }
  ]
};
