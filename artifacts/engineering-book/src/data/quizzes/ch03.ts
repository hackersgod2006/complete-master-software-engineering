import { ChapterQuizData } from '../quizTypes';

export const CH03_QUIZ: ChapterQuizData = {
  chapterId: "ch3",
  sectionQuizzes: {
    "3-1": [
      {
        id: "q-3-1-1",
        question: "What is the primary purpose of Virtual Memory?",
        options: [
          "To allow the computer to run without physical RAM",
          "To provide each process with its own private, contiguous address space and protect memory between processes",
          "To speed up CPU cache access times",
          "To automatically compress data stored in RAM"
        ],
        correct: 1,
        explanation: "Virtual memory decouples the addresses used by a program from actual physical RAM locations, enabling protection, swapping, and isolation.",
        difficulty: "medium"
      },
      {
        id: "q-3-1-2",
        question: "What component is responsible for translating virtual addresses to physical addresses?",
        options: [
          "The Operating System kernel",
          "The Memory Management Unit (MMU) in the hardware",
          "The BIOS/UEFI",
          "The compiler"
        ],
        correct: 1,
        explanation: "The MMU is a hardware component in the CPU that uses page tables to perform high-speed address translation.",
        difficulty: "medium"
      },
      {
        id: "q-3-1-3",
        question: "What is a 'Page Fault'?",
        options: [
          "A hardware failure in the RAM stick",
          "An interrupt triggered when a process tries to access a page not currently in physical RAM",
          "A syntax error in the source code",
          "When the CPU cache is full"
        ],
        correct: 1,
        explanation: "When a page fault occurs, the OS must fetch the required data from disk (or allocate a new page) before the process can continue.",
        difficulty: "medium"
      }
    ],
    "3-2": [
      {
        id: "q-3-2-1",
        question: "What is a Page Table?",
        options: [
          "A list of all files on the hard drive",
          "A data structure used by the OS to store the mapping between virtual and physical addresses",
          "A cache inside the CPU for instructions",
          "A table used for database indexing"
        ],
        correct: 1,
        explanation: "Page tables store where each virtual page is located in physical memory (or if it is on disk).",
        difficulty: "easy"
      },
      {
        id: "q-3-2-2",
        question: "Why are multi-level page tables used instead of a single flat table?",
        options: [
          "They are faster to access",
          "They save memory by not allocating tables for unused parts of the virtual address space",
          "They are required by the C programming language",
          "They prevent fragmented memory"
        ],
        correct: 1,
        explanation: "A flat table for a 64-bit space would be gigabytes in size. Multi-level tables allow 'sparse' allocation, only creating tables for address ranges actually in use.",
        difficulty: "hard"
      },
      {
        id: "q-3-2-3",
        question: "What is the typical page size on most modern systems?",
        options: [
          "64 bytes",
          "4 KB",
          "1 MB",
          "1 GB"
        ],
        correct: 1,
        explanation: "4 KB is the standard page size, though 'huge pages' (2MB or 1GB) can be used for performance-critical applications.",
        difficulty: "easy"
      }
    ],
    "3-3": [
      {
        id: "q-3-3-1",
        question: "What is the 'Stack' in process memory used for?",
        options: [
          "Long-term data storage",
          "Dynamic allocations via malloc/new",
          "Local variables, function arguments, and return addresses",
          "Storing the program's executable code"
        ],
        correct: 2,
        explanation: "The stack is a LIFO (Last-In-First-Out) structure that grows and shrinks automatically as functions are called and return.",
        difficulty: "easy"
      },
      {
        id: "q-3-3-2",
        question: "What causes a 'Stack Overflow'?",
        options: [
          "Allocating too much memory on the heap",
          "Infinite recursion or excessively deep function calls exceeding the stack's fixed size",
          "Reading past the end of an array",
          "Running too many processes at once"
        ],
        correct: 1,
        explanation: "Each thread has a fixed-size stack. If calls go too deep, it hits a 'guard page', triggering a crash.",
        difficulty: "medium"
      },
      {
        id: "q-3-3-3",
        question: "How is memory on the Stack managed?",
        options: [
          "By the Garbage Collector",
          "Manually by the programmer using free()",
          "Automatically by the CPU/compiler via the stack pointer",
          "By the Operating System's page allocator"
        ],
        correct: 2,
        explanation: "Stack management is extremely fast (just incrementing/decrementing a register) and requires no explicit manual cleanup.",
        difficulty: "medium"
      }
    ],
    "3-4": [
      {
        id: "q-3-4-1",
        question: "What is the 'Heap' in process memory?",
        options: [
          "A region for fixed-size static variables",
          "A region for dynamically allocated memory that persists until explicitly freed",
          "A temporary buffer for network packets",
          "The area where the OS kernel resides"
        ],
        correct: 1,
        explanation: "The heap is used for data whose size or lifetime isn't known at compile time. It requires manual or automated management.",
        difficulty: "easy"
      },
      {
        id: "q-3-4-2",
        question: "What is 'Memory Fragmentation' in the heap?",
        options: [
          "When the RAM hardware physically breaks",
          "When free memory is split into small, non-contiguous holes, making large allocations fail even if total free space is sufficient",
          "When multiple threads access the same memory address",
          "When the OS swaps pages to disk"
        ],
        correct: 1,
        explanation: "Fragmentation is a major challenge for allocators like malloc, leading to inefficient use of memory over time.",
        difficulty: "medium"
      },
      {
        id: "q-3-4-3",
        question: "What is the difference between malloc() and calloc() in C?",
        options: [
          "malloc is for integers; calloc is for objects",
          "malloc leaves memory uninitialized; calloc zeroes out the allocated memory",
          "malloc is faster; calloc is more secure",
          "There is no difference"
        ],
        correct: 1,
        explanation: "calloc also takes the number of elements and size per element, and guarantees the memory is zero-filled.",
        difficulty: "medium"
      }
    ],
    "3-5": [
      {
        id: "q-3-5-1",
        question: "What is a 'Memory Leak'?",
        options: [
          "When data is stolen by a hacker",
          "When a program allocates memory but fails to release it back to the system",
          "When the RAM loses charge and forgets data",
          "When a pointer points to the wrong variable"
        ],
        correct: 1,
        explanation: "Leaked memory remains 'occupied' from the OS perspective, eventually causing the system to run out of RAM.",
        difficulty: "easy"
      },
      {
        id: "q-3-5-2",
        question: "What is a 'Dangling Pointer'?",
        options: [
          "A pointer that hasn't been initialized yet",
          "A pointer that still points to a memory location that has already been freed",
          "A pointer that points to the NULL address",
          "A pointer used in a linked list"
        ],
        correct: 1,
        explanation: "Using a dangling pointer leads to 'Use-After-Free' bugs, which are a major source of security vulnerabilities and crashes.",
        difficulty: "medium"
      },
      {
        id: "q-3-5-3",
        question: "What is a 'Double Free' error?",
        options: [
          "Freeing two different variables at the same time",
          "Attempting to free the same memory address twice, potentially corrupting the allocator's internal metadata",
          "A technique to increase free memory",
          "An OS optimization for garbage collection"
        ],
        correct: 1,
        explanation: "Double freeing often corrupts the free-list structures in the heap allocator, allowing attackers to perform arbitrary code execution.",
        difficulty: "hard"
      }
    ],
    "3-6": [
      {
        id: "q-3-6-1",
        question: "How does Reference Counting garbage collection work?",
        options: [
          "It periodically scans all memory for unused objects",
          "It keeps a count of how many pointers point to an object and deletes it when the count reaches zero",
          "It moves objects to different memory regions based on their age",
          "It requires the programmer to manually count references"
        ],
        correct: 1,
        explanation: "Reference counting (used in Python, Swift) provides immediate cleanup but struggles with 'circular references'.",
        difficulty: "medium"
      },
      {
        id: "q-3-6-2",
        question: "What is the primary drawback of basic Reference Counting?",
        options: [
          "It is very slow to increment/decrement",
          "It cannot detect and clean up cycles (e.g., A points to B, and B points to A)",
          "It requires a 'Stop the World' pause",
          "It only works for small objects"
        ],
        correct: 1,
        explanation: "If two objects point to each other but are otherwise unreachable, their counts never hit zero, causing a leak.",
        difficulty: "medium"
      },
      {
        id: "q-3-6-3",
        question: "Which language uses Reference Counting as its primary memory management strategy?",
        options: [
          "Java",
          "Go",
          "Swift",
          "C++"
        ],
        correct: 2,
        explanation: "Swift uses Automatic Reference Counting (ARC). Java and Go use tracing garbage collectors.",
        difficulty: "medium"
      }
    ],
    "3-7": [
      {
        id: "q-3-7-1",
        question: "How does 'Mark-and-Sweep' garbage collection work?",
        options: [
          "It marks every object as dirty and cleans them all",
          "It traverses from 'roots' to mark reachable objects, then sweeps (frees) everything not marked",
          "It marks objects with a timestamp and deletes old ones",
          "It swaps marked objects to disk"
        ],
        correct: 1,
        explanation: "Mark-and-sweep can handle cycles but often requires a 'Stop the World' phase where the application is paused.",
        difficulty: "medium"
      },
      {
        id: "q-3-7-2",
        question: "What are 'Roots' in the context of tracing garbage collection?",
        options: [
          "The first objects ever created by the program",
          "Directly accessible pointers like global variables and variables on the current call stack",
          "The addresses of the RAM chips",
          "The folders where the source code is stored"
        ],
        correct: 1,
        explanation: "The GC starts from roots to determine what is currently reachable by the program.",
        difficulty: "medium"
      },
      {
        id: "q-3-7-3",
        question: "What is a 'Stop the World' (STW) event?",
        options: [
          "When the computer shuts down",
          "A pause in program execution while the garbage collector performs its work",
          "A deadlock between two threads",
          "A network timeout"
        ],
        correct: 1,
        explanation: "During STW, all application threads are halted so the GC can safely move or analyze objects without them changing.",
        difficulty: "medium"
      }
    ],
    "3-8": [
      {
        id: "q-3-8-1",
        question: "What is the 'Generational Hypothesis' in garbage collection?",
        options: [
          "Computers get faster every generation",
          "Most objects die young (are short-lived), while long-lived objects tend to stay alive for a long time",
          "The number of objects doubles every year",
          "Older programs use more memory than newer ones"
        ],
        correct: 1,
        explanation: "This observation allows GCs to be more efficient by focusing frequent collection efforts on the 'Young Generation'.",
        difficulty: "medium"
      },
      {
        id: "q-3-8-2",
        question: "In a generational GC, what is the 'Young Generation' (or Eden space)?",
        options: [
          "Where the smallest objects are stored",
          "Where newly allocated objects are placed",
          "The region for objects that have survived many GC cycles",
          "The stack memory"
        ],
        correct: 1,
        explanation: "Most objects in Eden are expected to be unreachable by the next collection cycle.",
        difficulty: "medium"
      },
      {
        id: "q-3-8-3",
        question: "What is 'Promotion' (or Tenuring) in generational GC?",
        options: [
          "Moving an object from the heap to the stack",
          "Moving a surviving object from the Young Generation to the Old (Survivor) Generation",
          "Increasing the priority of a thread",
          "Compressing an object to save space"
        ],
        correct: 1,
        explanation: "Objects that survive several minor collections are promoted to the 'Old' generation, which is collected less frequently.",
        difficulty: "medium"
      }
    ],
    "3-9": [
      {
        id: "q-3-9-1",
        question: "What is the goal of 'Low-Latency' GCs like ZGC or Shenandoah?",
        options: [
          "To use as little CPU as possible",
          "To keep 'Stop the World' pauses very short (e.g., < 1ms) regardless of heap size",
          "To minimize the total RAM usage of the program",
          "To make the application run faster overall"
        ],
        correct: 1,
        explanation: "They perform most work (marking and compacting) concurrently with the application threads.",
        difficulty: "hard"
      },
      {
        id: "q-3-9-2",
        question: "What is a 'Write Barrier' in the context of concurrent GC?",
        options: [
          "A hardware feature that prevents writing to read-only memory",
          "A piece of code injected by the GC to track changes to pointers in the heap during execution",
          "A lock that prevents multiple threads from writing to the same variable",
          "A file system permission"
        ],
        correct: 1,
        explanation: "Write barriers allow the GC to know if the object graph changed while it was busy marking, ensuring it doesn't miss any reachable objects.",
        difficulty: "hard"
      },
      {
        id: "q-3-9-3",
        question: "How do modern GCs handle large heaps (e.g., 100GB+)?",
        options: [
          "They don't; large heaps always cause 30-second pauses",
          "By using regionalized heaps and concurrent processing",
          "By disabling garbage collection entirely",
          "By requiring manual memory management for large arrays"
        ],
        correct: 1,
        explanation: "Regionalized heaps (like in G1 or ZGC) allow the collector to work on small parts of the heap at a time.",
        difficulty: "medium"
      }
    ],
    "3-10": [
      {
        id: "q-3-10-1",
        question: "What is 'Memory Mapping' (mmap)?",
        options: [
          "Drawing a diagram of how variables are stored",
          "A system call that maps a file or device directly into a process's virtual address space",
          "A way to find the physical address of a variable",
          "A tool for debugging memory leaks"
        ],
        correct: 1,
        explanation: "mmap allows efficient file I/O by treating a file as if it were a large array in memory.",
        difficulty: "hard"
      },
      {
        id: "q-3-10-2",
        question: "What is 'Copy-on-Write' (COW) memory?",
        options: [
          "A type of memory that cannot be modified",
          "An optimization where processes share the same physical pages until one process attempts to modify the data",
          "A backup system for RAM",
          "A method for synchronizing data between CPU cores"
        ],
        correct: 1,
        explanation: "COW is extensively used by the fork() system call to create new processes efficiently.",
        difficulty: "hard"
      },
      {
        id: "q-3-10-3",
        question: "What is the 'OOM Killer' in Linux?",
        options: [
          "A virus that deletes memory",
          "A kernel mechanism that kills processes when the system is dangerously low on memory to prevent a total crash",
          "A tool for developers to test memory pressure",
          "A bug in the memory allocator"
        ],
        correct: 1,
        explanation: "The Out-Of-Memory killer selects processes to terminate (often based on high RAM usage) to keep the OS stable.",
        difficulty: "medium"
      }
    ]
  },
  examQuestions: [
    {
      id: "exam-ch3-1",
      question: "Which memory region is generally faster for allocation and deallocation?",
      options: [
        "The Heap",
        "The Stack",
        "The Data Segment",
        "The Disk Swap space"
      ],
      correct: 1,
      explanation: "Stack allocation is just a register increment; heap allocation requires searching for a free block and managing metadata.",
      difficulty: "easy"
    },
    {
      id: "exam-ch3-2",
      question: "What is the role of the TLB (Translation Lookaside Buffer)?",
      options: [
        "It caches recent virtual-to-physical address translations",
        "It stores recently accessed data from the heap",
        "It manages the order of function calls on the stack",
        "It compresses pages before they are written to disk"
      ],
      correct: 0,
      explanation: "The TLB is a tiny, super-fast cache in the CPU that prevents the need to walk the multi-level page tables for every memory access.",
      difficulty: "hard"
    },
    {
      id: "exam-ch3-3",
      question: "What happens to a process's memory when it calls fork() on a system with Copy-on-Write?",
      options: [
        "All physical memory is immediately duplicated for the child",
        "The child gets its own virtual space but shares the same physical pages as the parent until one of them writes to a page",
        "The child process starts with empty memory",
        "The parent process is paused until the child finishes"
      ],
      correct: 1,
      explanation: "This makes fork() very fast, as only the page tables are copied, not the actual data.",
      difficulty: "hard"
    },
    {
      id: "exam-ch3-4",
      question: "Which of the following is NOT a common cause of memory leaks in Garbage Collected languages?",
      options: [
        "Forgotten event listeners",
        "Static collections (e.g., global lists) that grow indefinitely",
        "Circular references (in modern tracing GCs)",
        "Closures capturing large variables that are no longer needed"
      ],
      correct: 2,
      explanation: "Modern tracing GCs (Mark-and-Sweep) handle circular references fine; leaks usually occur when objects are still reachable but shouldn't be.",
      difficulty: "medium"
    },
    {
      id: "exam-ch3-5",
      question: "What is 'Thrashing' in an operating system?",
      options: [
        "When the CPU is performing too many arithmetic operations",
        "When the system spends more time swapping pages in and out of disk than executing instructions",
        "When multiple threads compete for the same lock",
        "When a hard drive is about to fail"
      ],
      correct: 1,
      explanation: "Thrashing occurs when the 'working set' of all processes exceeds available physical RAM.",
      difficulty: "medium"
    },
    {
      id: "exam-ch3-6",
      question: "What is 'Compaction' in garbage collection?",
      options: [
        "Reducing the size of objects using ZIP compression",
        "Moving live objects together in memory to eliminate fragmentation and create large contiguous free blocks",
        "Storing objects on disk to save RAM",
        "Deleting all objects in the Young Generation"
      ],
      correct: 1,
      explanation: "Compaction makes future allocations faster and prevents fragmentation-related failures.",
      difficulty: "medium"
    },
    {
      id: "exam-ch3-7",
      question: "Which of these is a 'Manual Memory Management' language?",
      options: [
        "Java",
        "Python",
        "C++",
        "Ruby"
      ],
      correct: 2,
      explanation: "In C++, programmers use 'new' and 'delete' (or smart pointers), whereas the others have built-in garbage collectors.",
      difficulty: "easy"
    },
    {
      id: "exam-ch3-8",
      question: "What is the 'Working Set' of a process?",
      options: [
        "The total amount of memory the process has allocated",
        "The set of pages the process has actively accessed in the recent past",
        "The number of threads the process is running",
        "The list of files the process has open"
      ],
      correct: 1,
      explanation: "Keeping the working set in physical RAM is critical for performance.",
      difficulty: "medium"
    },
    {
      id: "exam-ch3-9",
      question: "What is a 'Segmentation Fault'?",
      options: [
        "A bug in the compiler's parser",
        "A hardware error in the CPU's ALU",
        "A memory access violation where a process tries to access memory it doesn't own or in a way that isn't allowed",
        "When a hard drive partition is corrupted"
      ],
      correct: 2,
      explanation: "For example, trying to write to a read-only page or access an unmapped virtual address.",
      difficulty: "easy"
    },
    {
      id: "exam-ch3-10",
      question: "How does 'Spatial Locality' benefit memory performance?",
      options: [
        "By allowing the OS to place processes in different rooms",
        "By ensuring that related data is stored near each other, making CPU prefetching and cache lines more effective",
        "By reducing the size of the page tables",
        "By increasing the clock speed of the RAM"
      ],
      correct: 1,
      explanation: "When you access one address, the CPU loads a whole 'cache line' (usually 64 bytes) into the cache, making nearby access instant.",
      difficulty: "medium"
    }
  ]
};
