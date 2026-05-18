import { ChapterQuizData } from "../quizTypes";

export const CH07_QUIZ: ChapterQuizData = {
  chapterId: "ch7",
  sectionQuizzes: {
    "7-1": [
      {
        id: "q-7-1-1",
        question: "What is the primary task of a Lexer (Scanner)?",
        options: ["To check the logic of the code", "To convert source code into a stream of tokens", "To generate machine code", "To optimize loops"],
        correct: 1,
        explanation: "Lexing is the process of grouping characters into meaningful sequences called tokens (e.g., keywords, identifiers, symbols).",
        difficulty: "easy"
      },
      {
        id: "q-7-1-2",
        question: "Which of these would typically be a token produced by a lexer?",
        options: ["An Abstract Syntax Tree", "The keyword 'while'", "A machine instruction", "A memory address"],
        correct: 1,
        explanation: "Keywords like 'while', 'if', and 'return' are standard tokens.",
        difficulty: "easy"
      },
      {
        id: "q-7-1-3",
        question: "What happens if a lexer encounters a character that doesn't match any token pattern?",
        options: ["It ignores it", "It generates a syntax error", "It generates a lexical error", "It creates a generic token"],
        correct: 2,
        explanation: "If a character cannot be mapped to a token, it results in a lexical error (often reported during the scanning phase).",
        difficulty: "medium"
      }
    ],
    "7-2": [
      {
        id: "q-7-2-1",
        question: "What is the output of the Parsing phase in a compiler?",
        options: ["A list of tokens", "Assembly code", "A Parse Tree or Abstract Syntax Tree (AST)", "Executable binary"],
        correct: 2,
        explanation: "The parser takes a token stream and organizes it into a hierarchical structure representing the grammatical structure of the program.",
        difficulty: "easy"
      },
      {
        id: "q-7-2-2",
        question: "What is the difference between a Concrete Syntax Tree (Parse Tree) and an Abstract Syntax Tree (AST)?",
        options: ["AST is larger", "Parse Tree contains every detail of the grammar (like parentheses); AST simplifies and keeps only structural info", "AST is only used for interpretation", "There is no difference"],
        correct: 1,
        explanation: "ASTs are 'abstract' because they omit details like grouping parentheses or semicolons that are implied by the tree structure.",
        difficulty: "medium"
      },
      {
        id: "q-7-2-3",
        question: "Which type of parser builds the tree from the leaves up to the root?",
        options: ["Top-down (LL)", "Bottom-up (LR)", "Recursive Descent", "Predictive Parser"],
        correct: 1,
        explanation: "LR parsers are bottom-up; they 'reduce' tokens into higher-level constructs until they reach the start symbol.",
        difficulty: "hard"
      }
    ],
    "7-3": [
      {
        id: "q-7-3-1",
        question: "What is 'Semantic Analysis' in the context of compilers?",
        options: ["Checking for syntax errors", "Checking for meaning (e.g., type checking, variable declaration)", "Generating assembly", "Minimizing the number of registers used"],
        correct: 1,
        explanation: "Semantic analysis ensures that the program follows the rules of the language that go beyond syntax (e.g., ensuring you don't add a string and a boolean).",
        difficulty: "medium"
      },
      {
        id: "q-7-3-2",
        question: "A 'Symbol Table' is used by a compiler to track:",
        options: ["Mathematics symbols", "Information about identifiers (variables, functions, classes)", "Tokens and their line numbers", "Optimization flags"],
        correct: 1,
        explanation: "The symbol table stores scopes, types, and memory locations for every identifier in the program.",
        difficulty: "medium"
      },
      {
        id: "q-7-3-3",
        question: "When is 'Static Type Checking' performed?",
        options: ["During program execution", "During the compilation process", "After the program finishes", "Only when the user requests it"],
        correct: 1,
        explanation: "Static checking happens at compile-time (without running the code), whereas dynamic checking happens at runtime.",
        difficulty: "easy"
      }
    ],
    "7-4": [
      {
        id: "q-7-4-1",
        question: "What is Intermediate Representation (IR)?",
        options: ["Source code translated to another high-level language", "A platform-independent internal language used by compilers between the frontend and backend", "Code that can be executed by a human", "The final machine code"],
        correct: 1,
        explanation: "IR (like LLVM IR) allows a compiler to separate language-specific features from machine-specific optimizations.",
        difficulty: "medium"
      },
      {
        id: "q-7-4-2",
        question: "What is 'Three-Address Code' (TAC)?",
        options: ["A form of IR where each instruction has at most three operands", "Code that only uses three registers", "Code for a 3-bit processor", "A way to address memory using three indices"],
        correct: 0,
        explanation: "TAC is a common IR where complex expressions are broken down into simple instructions (e.g., x = y + z).",
        difficulty: "medium"
      },
      {
        id: "q-7-4-3",
        question: "What is the main benefit of using a common IR like LLVM IR?",
        options: ["It makes the code run slower", "It allows a single backend (optimizer/generator) to support multiple frontend languages", "It eliminates the need for a lexer", "It makes the source code easier to read"],
        correct: 1,
        explanation: "By targeting a common IR, new languages only need to write a frontend to gain access to all the backend optimizations.",
        difficulty: "medium"
      }
    ],
    "7-5": [
      {
        id: "q-7-5-1",
        question: "What is 'Dead Code Elimination'?",
        options: ["Removing code that has comments", "Removing code that can never be executed or whose results are never used", "Removing variables that are equal to zero", "Killing processes that take too much time"],
        correct: 1,
        explanation: "Dead code elimination reduces the size and increases the speed of the executable by removing unnecessary instructions.",
        difficulty: "easy"
      },
      {
        id: "q-7-5-2",
        question: "What does 'Inlining' do in compiler optimization?",
        options: ["Puts all code on one line", "Replaces a function call with the actual body of the function", "Moves variables to the stack", "Compresses the binary size"],
        correct: 1,
        explanation: "Inlining removes call overhead and allows the optimizer to better see the context of the code, though it can increase binary size.",
        difficulty: "medium"
      },
      {
        id: "q-7-5-3",
        question: "What is 'Loop Unrolling'?",
        options: ["Converting a while loop to a for loop", "Replicating the loop body to reduce the number of iterations and branch overhead", "Deleting the loop entirely", "Turning a loop into a recursive function"],
        correct: 1,
        explanation: "Unrolling helps by reducing the 'tax' of loop control (incrementing, checking the condition) and increasing instruction-level parallelism.",
        difficulty: "hard"
      }
    ],
    "7-6": [
      {
        id: "q-7-6-1",
        question: "What does JIT stand for in compiler technology?",
        options: ["Just In Time", "Jump Instruction Table", "Joint Interface Toolkit", "Just Integrated Tools"],
        correct: 0,
        explanation: "Just-In-Time compilation compiles bytecode to machine code at runtime, rather than ahead of time (AOT).",
        difficulty: "easy"
      },
      {
        id: "q-7-6-2",
        question: "What is a 'Hot Spot' in the context of a JIT compiler?",
        options: ["A bug in the code", "A portion of the code that is executed frequently", "A CPU core that is overheating", "A memory leak"],
        correct: 1,
        explanation: "JITs monitor execution and only optimize the 'hot' paths that will yield the most performance benefit.",
        difficulty: "medium"
      },
      {
        id: "q-7-6-3",
        question: "How does a JIT compiler differ from an Interpreter?",
        options: ["Interpreters are faster", "Interpreters execute code line-by-line; JITs compile code to machine code before execution", "JITs only work for C++", "There is no difference"],
        correct: 1,
        explanation: "Pure interpreters execute instructions directly; JITs transform code into the native machine language of the host CPU.",
        difficulty: "medium"
      }
    ],
    "7-7": [
      {
        id: "q-7-7-1",
        question: "What are V8 'Hidden Classes' (or Shapes)?",
        options: ["Classes that are not visible to the developer", "An internal mechanism to optimize property access in dynamic objects by grouping objects with the same structure", "A way to hide private variables", "Classes used for security"],
        correct: 1,
        explanation: "V8 uses hidden classes to transition dynamic JavaScript objects into a more static, predictable structure for faster property lookup.",
        difficulty: "hard"
      },
      {
        id: "q-7-7-2",
        question: "What is 'Inline Caching' (IC) in V8?",
        options: ["Caching the results of math operations", "Caching the memory address of object properties at the call site", "Storing the entire source code in memory", "Speeding up network requests"],
        correct: 1,
        explanation: "IC remembers where a property was found last time a specific line of code was executed, bypassing the need for a full lookup.",
        difficulty: "hard"
      },
      {
        id: "q-7-7-3",
        question: "Why is 'Deoptimization' sometimes necessary in JIT engines?",
        options: ["Because the computer is too fast", "When an assumption about a variable's type (used for optimization) is violated", "To save battery life", "When the program finishes"],
        correct: 1,
        explanation: "If a function optimized for integers suddenly receives a string, the JIT must 'deoptimize' back to a safer, generic version.",
        difficulty: "hard"
      }
    ],
    "7-8": [
      {
        id: "q-7-8-1",
        question: "What is the Java Virtual Machine (JVM) 'Bytecode'?",
        options: ["Source code in .java files", "Platform-independent instructions that the JVM executes", "Machine code for Intel CPUs", "A way to compress Java files"],
        correct: 1,
        explanation: "Bytecode (.class files) is the intermediate format that allows Java to be 'Write Once, Run Anywhere'.",
        difficulty: "easy"
      },
      {
        id: "q-7-8-2",
        question: "Which of these is a popular JVM garbage collector?",
        options: ["G1 GC", "Python GC", "V8 Scavenger", "Arc"],
        correct: 0,
        explanation: "G1 (Garbage First) is a standard, low-pause collector in modern JVMs.",
        difficulty: "medium"
      },
      {
        id: "q-7-8-3",
        question: "What does 'Type Erasure' in Java Generics mean for the runtime?",
        options: ["Types are deleted from the source code", "Generic type information is removed at compile time and is not available to the JVM at runtime", "All variables become strings", "The JVM runs faster"],
        correct: 1,
        explanation: "Java implements generics by replacing type parameters with their bounds or Object, meaning the runtime doesn't know about specific generic types.",
        difficulty: "hard"
      }
    ],
    "7-9": [
      {
        id: "q-7-9-1",
        question: "What is the Global Interpreter Lock (GIL) in CPython?",
        options: ["A lock that prevents the program from crashing", "A mechanism that allows only one thread to execute Python bytecode at a time", "A lock on the filesystem", "A security feature for web servers"],
        correct: 1,
        explanation: "The GIL simplifies memory management in CPython but prevents pure Python code from taking full advantage of multi-core processors.",
        difficulty: "medium"
      },
      {
        id: "q-7-9-2",
        question: "How does Python handle memory management?",
        options: ["Manual malloc/free", "Reference counting with a cyclic garbage collector", "Only stack allocation", "It doesn't manage memory"],
        correct: 1,
        explanation: "Python primarily uses reference counting for immediate cleanup and a cycle detector to find groups of objects that point to each other.",
        difficulty: "medium"
      },
      {
        id: "q-7-9-3",
        question: "What is the difference between .py and .pyc files?",
        options: ["None, they are the same", ".py is source code; .pyc is compiled bytecode", ".pyc is for Python 2 only", ".pyc is encrypted"],
        correct: 1,
        explanation: ".pyc files store the compiled bytecode so Python doesn't have to re-parse the source code every time it runs.",
        difficulty: "easy"
      }
    ],
    "7-10": [
      {
        id: "q-7-10-1",
        question: "What is 'Garbage Collection'?",
        options: ["Deleting old files", "Automatic reclamation of memory that is no longer reachable by the program", "Clearing the screen", "Restarting the compiler"],
        correct: 1,
        explanation: "GC allows developers to allocate memory without having to manually track and free it when finished.",
        difficulty: "easy"
      },
      {
        id: "q-7-10-2",
        question: "What is a 'Stop-the-World' event in GC?",
        options: ["When the computer shuts down", "When all application threads are paused to allow the garbage collector to run", "When an error occurs", "When the network is disconnected"],
        correct: 1,
        explanation: "Many GCs need a consistent view of memory, so they pause the program briefly to identify and move objects.",
        difficulty: "medium"
      },
      {
        id: "q-7-10-3",
        question: "What is the advantage of 'Reference Counting' over 'Mark-and-Sweep' GC?",
        options: ["It can handle cyclic references", "It reclaims memory as soon as the last reference is gone (deterministic)", "It has no performance overhead", "It is easier to implement in multi-threaded environments"],
        correct: 1,
        explanation: "Reference counting provides immediate reclamation and lower peak memory usage, but struggles with cycles and requires atomic updates.",
        difficulty: "medium"
      }
    ]
  },
  examQuestions: [
    {
      id: "exam-ch7-1",
      question: "Which phase of compilation is responsible for 'Constant Folding'?",
      options: ["Lexing", "Parsing", "Optimization", "Code Generation"],
      correct: 2,
      explanation: "Constant folding (evaluating 2+2 at compile time) is a standard optimization.",
      difficulty: "easy"
    },
    {
      id: "exam-ch7-2",
      question: "Which of the following describes 'SSA Form' (Static Single Assignment)?",
      options: ["Every variable is only assigned once", "Every variable is global", "There are no variables", "All functions are single-line"],
      correct: 0,
      explanation: "SSA form simplifies many optimizations because every variable has exactly one definition point in the code.",
      difficulty: "hard"
    },
    {
      id: "exam-ch7-3",
      question: "What is the 'Linker's' job?",
      options: ["To find syntax errors", "To combine multiple object files into a single executable and resolve external symbols", "To download dependencies", "To run the code"],
      correct: 1,
      explanation: "The linker bridges the gap between separate compilation units (files) and the final program.",
      difficulty: "medium"
    },
    {
      id: "exam-ch7-4",
      question: "In the context of V8, what is 'TurboFan'?",
      options: ["A hardware cooling system", "The optimizing JIT compiler", "An interpreter", "A memory profiler"],
      correct: 1,
      explanation: "TurboFan is V8's optimizing compiler that generates highly efficient machine code for hot functions.",
      difficulty: "medium"
    },
    {
      id: "exam-ch7-5",
      question: "Which language runtime is famous for NOT using a Garbage Collector, but instead using 'Ownership' and 'Borrowing'?",
      options: ["Java", "Go", "Rust", "Swift"],
      correct: 2,
      explanation: "Rust uses a compile-time ownership model to manage memory without a runtime GC.",
      difficulty: "easy"
    },
    {
      id: "exam-ch7-6",
      question: "What is a 'Call Stack'?",
      options: ["A stack of books", "A memory region that stores local variables and return addresses for active functions", "A list of phone numbers", "A type of database"],
      correct: 1,
      explanation: "The stack manages function execution life cycles. When a function is called, a new frame is pushed.",
      difficulty: "easy"
    },
    {
      id: "exam-ch7-7",
      question: "What is the primary difference between a Compiler and an Interpreter?",
      options: ["Compilers are only for C++", "Compilers translate code to machine language once; Interpreters translate/execute on the fly", "Interpreters are always faster", "Compilers don't check for errors"],
      correct: 1,
      explanation: "Compilers produce a standalone executable; interpreters need to be present to run the source/bytecode.",
      difficulty: "easy"
    },
    {
      id: "exam-ch7-8",
      question: "What is 'Tail Call Optimization' (TCO)?",
      options: ["Removing the end of a function", "Reusing the current stack frame for a function call if it is the last action in the function", "Moving a function to the end of the file", "Speeding up the exit of a program"],
      correct: 1,
      explanation: "TCO allows recursive functions to run in constant stack space, preventing stack overflow.",
      difficulty: "hard"
    },
    {
      id: "exam-ch7-9",
      question: "Which of these is a Register Allocation technique?",
      options: ["Graph Coloring", "Binary Search", "Heap Sort", "Quick Sort"],
      correct: 0,
      explanation: "Register allocation is often modeled as a graph coloring problem, where nodes are variables and edges represent 'interference' (being needed at the same time).",
      difficulty: "hard"
    },
    {
      id: "exam-ch7-10",
      question: "What is a 'Foreign Function Interface' (FFI)?",
      options: ["A way to call functions from another programming language", "A translation service", "An API for internet protocols", "A way to write code in another language"],
      correct: 0,
      explanation: "FFI (like Node-API or Python's ctypes) allows high-level languages to call functions written in low-level languages like C or C++.",
      difficulty: "medium"
    }
  ]
};
