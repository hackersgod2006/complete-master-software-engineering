import type { Section } from '../types';

export const CH07_SECTIONS: Section[] = [
  {
    id: "7-1",
    number: "7.1",
    title: "Why Every Engineer Should Understand Compilation",
    content: `To many developers, the compiler is a "black box": you feed it source code, and through some dark magic, it produces an executable. However, treating the compiler as an opaque tool is a missed opportunity for technical mastery. Understanding how your code is transformed, optimized, and executed is the difference between writing code that works and writing code that excels.

## The Bridge Between Human and Machine
A **compiler** is fundamentally a translator. It bridges the semantic gap between high-level languages designed for human readability (like Rust or Swift) and the rigid, low-level world of machine instructions. By understanding this translation, you gain insight into why certain patterns are fast, why others are slow, and why some bugs only appear in "release" builds.

## Performance is Not Magic
When you write \`x = y + z\`, a modern compiler doesn't just emit an \`ADD\` instruction. It analyzes data flow, checks types, manages memory alignment, and decides whether to keep those variables in registers or spill them to the stack. If you don't understand **optimization passes**, you might spend hours manually unrolling loops that the compiler would have unrolled better itself, or worse, you might write code that prevents the compiler from performing critical optimizations like **vectorization**.

## Debugging and Diagnostics
Ever seen a "Linker Error" or a "Segmentation Fault" and felt lost? These errors are the compiler's way of telling you about violations in the contract between your code and the system. Understanding **symbol tables**, **object files**, and **relocation** makes these errors trivial to diagnose. 

## Language Runtimes: The Invisible Hand
For languages like Python, Java, or JavaScript, the "compiler" is only half the story. The **Runtime**—including the Garbage Collector (GC), Just-In-Time (JIT) compiler, and event loop—dictates the actual behavior of your application. An engineer who understands how V8 optimizes JavaScript can write code that stays on the "fast path," while others unknowingly trigger "deoptimizations" that tank performance by 10x.

In this chapter, we will pull back the curtain on the entire pipeline, from the first character of source code to the final bit of machine instruction.`
  },
  {
    id: "7-2",
    number: "7.2",
    title: "Lexical Analysis: From Characters to Tokens",
    content: `The first phase of any compiler is **Lexical Analysis**, performed by a component called the **lexer** or **scanner**. Its job is to read the raw stream of characters that make up your source code and group them into meaningful sequences called **lexemes**.

## From Characters to Tokens
Computers don't see "keywords" or "variables" initially; they see ASCII or UTF-8 values. The lexer uses **Regular Expressions** to recognize patterns. For example, the string \`if (x > 10)\` is broken down into a series of **tokens**:

| Lexeme | Token Type | Value |
|--------|------------|-------|
| \`if\`   | KEYWORD    | \`if\`  |
| \`(\`    | LPAREN     | -     |
| \`x\`    | IDENTIFIER | \`x\`   |
| \`>\`    | OPERATOR   | \`GT\`  |
| \`10\`   | LITERAL    | \`10\`  |
| \`)\`    | RPAREN     | -     |

## The Finite Automata Under the Hood
Lexers are usually implemented as **Deterministic Finite Automata (DFA)**. As the lexer consumes characters, it transitions between states. If it reaches an "accepting state" when it hits a delimiter (like a space), it emits a token.

\`\`\`python
# A simple conceptual Lexer in Python
import re

tokens = [
    ('NUMBER',  r'\\d+'),
    ('ID',      r'[a-zA-Z_]\\w*'),
    ('OP',      r'[+\\-*/]'),
    ('SPACE',   r'\\s+'),
]

def lex(code):
    pos = 0
    while pos < len(code):
        match = None
        for type, pattern in tokens:
            regex = re.compile(pattern)
            match = regex.match(code, pos)
            if match:
                if type != 'SPACE':
                    yield (type, match.group(0))
                pos = match.end(0)
                break
        if not match:
            raise SyntaxError(f"Illegal character at {pos}")

for t in lex("count + 42"):
    print(t)
# Output: ('ID', 'count'), ('OP', '+'), ('NUMBER', '42')
\`\`\`

## Efficiency Matters
The lexer is often the only part of the compiler that touches every single character of the source code. Consequently, it must be highly optimized. Modern lexers often use **buffer doubling** and specialized SIMD instructions to process gigabytes of source code per second. For an engineer, knowing this reminds us that while lexing is "fast," unnecessary bloat in source files (like massive generated headers) still carries a cost in build times.`
  },
  {
    id: "7-3",
    number: "7.3",
    title: "Parsing: From Tokens to Abstract Syntax Trees",
    content: `Once the lexer has provided a stream of tokens, the **Parser** takes over. Its goal is to determine the hierarchical structure of the program based on a **Grammar**. The output of this phase is typically an **Abstract Syntax Tree (AST)**.

## Grammars and Rules
Most programming languages are defined using **Context-Free Grammars (CFGs)**, often expressed in **Backus-Naur Form (BNF)**. A rule might look like this:
\`\`\`text
expression ::= term (('+' | '-') term)*
term       ::= factor (('*' | '/') factor)*
factor     ::= NUMBER | '(' expression ')'
\`\`\`
This grammar naturally handles **operator precedence** (multiplication happens before addition because it's "deeper" in the grammar).

## Recursive Descent Parsing
A common and intuitive way to implement a parser is **Recursive Descent**. Each grammar rule becomes a function.

\`\`\`javascript
// Simplified Recursive Descent Fragment
function parseExpression() {
  let node = parseTerm();
  while (match('+') || match('-')) {
    const op = previous().value;
    const right = parseTerm();
    node = { type: 'BinaryExpr', left: node, op, right };
  }
  return node;
}
\`\`\`

## The Abstract Syntax Tree (AST)
The AST is a tree representation of the source code that strips away "syntactic sugar" like parentheses and semicolons, leaving only the structural meaning.

For the expression \`5 + 3 * 2\`, the AST looks like:
\`\`\`text
    +
   / \\
  5   *
     / \\
    3   2
\`\`\`

## Why ASTs Matter to You
ASTs are the foundation of modern tooling. **Linters** (like ESLint), **Formatters** (like Prettier), and **Babel** all work by parsing your code into an AST, transforming it, and sometimes printing it back to source code. Understanding the AST allows you to write custom lint rules or codemod scripts that can refactor thousands of files with mathematical precision.`
  },
  {
    id: "7-4",
    number: "7.4",
    title: "Semantic Analysis: Type Checking and Symbol Tables",
    content: `A program can be syntactically perfect (the parser is happy) but semantically nonsensical. For example, \`"hello" / 5\` is valid syntax in many languages but a logical error. **Semantic Analysis** is the "sanity check" phase.

## The Symbol Table
During parsing and semantic analysis, the compiler maintains a **Symbol Table**. This is a data structure (usually a hash map or a stack of scopes) that tracks identifiers and their attributes: type, scope, memory location, and visibility.

| Identifier | Type | Scope | Offset |
|------------|------|-------|--------|
| \`user_id\`  | int  | global| 0x00   |
| \`buffer\`   | char*| local | 0x08   |

## Type Checking
In statically typed languages (Rust, C++, Java), the compiler performs **Type Inference** and type checking here. It ensures that functions are called with the correct arguments and that assignments are valid. In TypeScript, this is where the "heavy lifting" happens, turning your type annotations into errors if they are violated.

## Scope Resolution
The semantic analyzer ensures that when you use a variable, it actually exists in the current scope. It handles **Shadowing** (where a local variable has the same name as a global one) and ensures that you aren't accessing variables before they are initialized.

## The Output: Decorated AST
The result of this phase is often a **Decorated AST**—an AST where each node has been annotated with its type and a pointer to its entry in the symbol table. This is the last point at which the compiler deals with "source-like" structures before moving into the world of intermediate representations.`
  },
  {
    id: "7-5",
    number: "7.5",
    title: "Intermediate Representations: LLVM IR, Three-Address Code",
    content: `Compilers rarely go straight from an AST to machine code. Doing so would make the compiler incredibly complex and difficult to port to different hardware. Instead, they use an **Intermediate Representation (IR)**.

## The "M-by-N" Problem
If you have 5 languages and 5 CPU architectures, you'd need 25 different compilers if you went direct. By using a common IR, you only need 5 "front-ends" (to produce IR) and 5 "back-ends" (to turn IR into machine code). This is the philosophy behind **LLVM**.

## Three-Address Code (3AC)
A common form of IR is **Three-Address Code**. It breaks complex expressions into simple instructions with at most three operands: two inputs and one result.

Original: \`x = a + b * c + d\`
3AC:
\`\`\`text
t1 = b * c
t2 = a + t1
x = t2 + d
\`\`\`

## Static Single Assignment (SSA)
Modern IRs (like LLVM IR) use **SSA form**. In SSA, every variable is assigned exactly once. If a variable is updated in the source, the IR creates a new version (\`x1\`, \`x2\`, etc.).

Example LLVM IR (simplified):
\`\`\`llvm
%1 = load i32, i32* %a_addr
%2 = mul i32 %1, 42
store i32 %2, i32* %res_addr
\`\`\`

## Why IR Matters
IR is where most **optimizations** happen. Because IR is simpler and more regular than source code, it's easier for the compiler to prove that a transformation (like removing a redundant calculation) is safe. When you look at compiler output (e.g., using Compiler Explorer), you are often looking at a representation of this IR before it becomes final assembly.`
  },
  {
    id: "7-6",
    number: "7.6",
    title: "Optimization: Dead Code, Inlining, Loop Unrolling, Vectorization",
    content: `Optimization is where the compiler earns its keep. A modern optimizer is a collection of hundreds of passes, each trying to make the code smaller or faster.

## Common Optimization Techniques

1.  **Inlining**: Replacing a function call with the actual body of the function. This removes call overhead and allows further optimizations within the caller.
2.  **Dead Code Elimination (DCE)**: Removing code that has no effect on the program's output. If you calculate \`x = 10\` but never use \`x\`, the compiler deletes it.
3.  **Loop Unrolling**: Expanding a loop to reduce branching overhead.
    \`\`\`c
    // Original
    for(int i=0; i<4; i++) a[i] = 0;
    // Unrolled
    a[0] = 0; a[1] = 0; a[2] = 0; a[3] = 0;
    \`\`\`
4.  **Vectorization (SIMD)**: Converting a loop that processes one element at a time into one that uses specialized CPU instructions (like AVX-512) to process 4, 8, or 16 elements simultaneously.

## The Cost of Optimization
Optimizations are not "free." They increase compilation time and can make debugging significantly harder (as the machine code no longer maps 1:1 to source code). This is why we have \`-O0\` for development and \`-O3\` for production.

## Profile-Guided Optimization (PGO)
The ultimate optimization is **PGO**. The compiler first builds an instrumented version of your app, you run it with real-world data, and the compiler uses the collected "profile" (knowing which branches are usually taken) to re-compile the app for maximum efficiency. Google reported a ~15% speedup in Chrome using PGO.`
  },
  {
    id: "7-7",
    number: "7.7",
    title: "Register Allocation: The Graph Coloring Problem",
    content: `CPUs have a limited number of **registers** (fastest memory), typically 16-32 general-purpose registers on x86_64 or ARM. However, a program might have hundreds of variables. **Register Allocation** is the process of deciding which variable stays in a register and which gets "spilled" to the much slower RAM (stack).

## Liveness Analysis
The compiler first determines the **live range** of every variable—from where it is first defined to where it is last used. If two variables are never "live" at the same time, they can share the same register.

## Graph Coloring
This problem is mathematically equivalent to **Graph Coloring**. 
- Each variable is a **node**.
- An **edge** exists between two nodes if they are live at the same time (interference).
- Each **color** represents a physical register.

The goal is to color the graph such that no two connected nodes have the same color, using the minimum number of colors. If the number of colors required exceeds the available registers, the compiler must pick a variable to "spill."

## The Performance Impact
Spilling a variable can be disastrous for performance, as a register access takes ~1 cycle, while a cache hit takes ~4-40 cycles, and a main memory access takes ~200+ cycles. Efficient register allocation is one of the primary reasons why C and Rust can outperform managed languages that rely more heavily on stack-based execution.`
  },
  {
    id: "7-8",
    number: "7.8",
    title: "Code Generation: From IR to Machine Code",
    content: `The final stage of the compiler backend is **Code Generation**. This is the process of turning the optimized Intermediate Representation into actual machine instructions (Binary).

## Instruction Selection
The compiler must choose the best CPU instructions to implement the IR operations. For example, on x86, \`x * 2\` might be implemented as a \`MUL\` instruction, but a smart code generator will use a \`SHL\` (shift left) instruction because it's much faster.

## Instruction Scheduling
Modern CPUs are **Pipelined** and **Out-of-Order**. They can execute multiple instructions at once, but only if they don't depend on each other. The code generator reorders instructions to keep the CPU's execution units busy, minimizing "bubbles" (stalls) in the pipeline.

## Basic Blocks and Control Flow
Code is organized into **Basic Blocks**—sequences of instructions with one entry and one exit. The code generator emits "jump" or "branch" instructions to connect these blocks, implementing \`if/else\` and \`loops\`.

## Emitting the Object File
The output is an **Object File** (e.g., \`.o\` or \`.obj\`). This file contains:
- **Machine Code**: The actual bytes the CPU executes.
- **Data**: Global constants and strings.
- **Relocation Info**: Markers telling the linker where to "patch" addresses once the final memory layout is known.
- **Debug Symbols**: Mapping machine code back to line numbers (for GDB/LLDB).`
  },
  {
    id: "7-9",
    number: "7.9",
    title: "Linking: Static and Dynamic",
    content: `Compilers usually work on one source file at a time. The **Linker** is the tool that stitches these individual object files into a single executable or library.

## Symbol Resolution
If \`main.c\` calls \`printf()\`, the compiler for \`main.c\` doesn't know where \`printf\` lives. It leaves a "hole" in the object file. The linker looks through other object files and libraries (like \`libc\`) to find the definition of \`printf\` and "plugs" the hole with its address.

## Static Linking
In **Static Linking**, the linker copies the code of all required library functions directly into your executable.
- **Pros**: The executable is self-contained; no dependency issues.
- **Cons**: Large file size; updates to the library require re-linking the app.
- **Examples**: Go binaries, Rust (by default for the standard library).

## Dynamic Linking
In **Dynamic Linking**, the executable only contains a reference to a library (e.g., a \`.so\` on Linux or \`.dll\` on Windows). The **Dynamic Linker** (part of the OS) loads the library into memory when the program starts.
- **Pros**: Smaller executables; multiple programs can share one copy of the library in RAM.
- **Cons**: "DLL Hell" (version mismatches); slightly slower startup.

## Link-Time Optimization (LTO)
Traditional linking is "blind"—the linker just moves blocks of code. **LTO** allows the linker to perform optimizations *across* different object files, such as inlining a function from \`libA.o\` into \`main.o\`. This can result in significant performance gains (5-20%) but makes the linking step much slower.`
  },
  {
    id: "7-10",
    number: "7.10",
    title: "Just-In-Time Compilation: V8, HotSpot, PyPy",
    content: `**Just-In-Time (JIT)** compilation is a hybrid approach. It combines the flexibility of an interpreter with the speed of a compiler.

## How it Works
1.  **Interpretation**: The program starts running immediately in an interpreter.
2.  **Profiling**: The runtime monitors which parts of the code are "hot" (executed frequently).
3.  **Compilation**: Hot functions are sent to a background thread to be compiled into machine code.
4.  **Replacement**: The next time the function is called, the runtime "swaps" the slow interpreted version for the fast machine code version.

## The V8 Pipeline (Chrome/Node.js)
V8 uses a multi-tier JIT:
- **Ignition**: A fast interpreter that generates bytecode.
- **Turbofan**: An optimizing compiler that takes hot bytecode and generates highly optimized machine code.

## Speculative Optimization
JITs have an advantage over static compilers: they know the actual types of variables at runtime. If a JavaScript function \`add(a, b)\` is always called with integers, the JIT can generate an "integer-only" version of the function.
However, if you suddenly pass a string, the JIT must **Deoptimize**—discarding the machine code and falling back to the interpreter. This is why "monomorphic" code (consistent types) is faster in JS.

## The JIT Warm-up
The downside of JIT is the "warm-up" period. For short-running tasks (like a simple CLI tool), a JIT might actually be slower than an interpreter because it spends time compiling code that will only run once. This is why Java servers often take a few minutes to reach peak performance.`
  },
  {
    id: "7-11",
    number: "7.11",
    title: "Ahead-of-Time Compilation: GCC, Clang, Rust/LLVM",
    content: `**Ahead-of-Time (AOT)** compilation is the traditional model used by C, C++, Rust, and Go. The compilation happens entirely before the program is ever run.

## The AOT Workflow
The developer runs the compiler, which performs all analysis, optimization, and code generation, producing a binary tailored for a specific **Target Triple** (e.g., \`x86_64-unknown-linux-gnu\`).

## Advantages of AOT
1.  **Zero Overhead**: No JIT or interpreter overhead at runtime.
2.  **Predictability**: Performance is consistent from the first millisecond.
3.  **Security**: The binary doesn't contain the source code or an IR that is easy to reverse-engineer.
4.  **Optimization Depth**: Because the compiler isn't limited by "runtime time," it can perform extremely expensive global optimizations that a JIT wouldn't dare.

## The LLVM Ecosystem
Most modern AOT compilers (Clang, Rustc, Swiftc) are built on **LLVM**.
- **Front-end**: Parses language-specific code into LLVM IR.
- **Middle-end**: Runs architecture-independent optimizations.
- **Back-end**: Generates machine code for specific CPUs (x86, ARM, RISC-V).

## Modern AOT: Beyond C/C++
AOT is seeing a resurgence in managed languages. **GraalVM** allows Java to be compiled AOT into "Native Images," eliminating the JVM's startup time and memory footprint—critical for serverless functions (AWS Lambda) where cold starts matter.`
  },
  {
    id: "7-12",
    number: "7.12",
    title: "Interpreter Architectures: AST Walkers, Bytecode VMs",
    content: `If you aren't compiling to machine code, you are **interpreting**. There are two primary ways to build an interpreter.

## 1. AST Walkers
This is the simplest type of interpreter. It takes the AST produced by the parser and traverses it recursively.

\`\`\`python
def evaluate(node, env):
    if node.type == 'NUMBER':
        return node.value
    if node.type == 'BINARY_OP':
        left = evaluate(node.left, env)
        right = evaluate(node.right, env)
        if node.op == '+': return left + right
        # ...
\`\`\`
**Performance**: Very slow. Every operation requires multiple function calls and tree traversals. Early versions of Ruby used this.

## 2. Bytecode VMs
Most modern interpreted languages (Python, Java, Lua) first compile the AST into a flat, compact sequence of instructions called **Bytecode**.

Example Bytecode for \`a = b + 10\`:
\`\`\`text
LOAD_FAST       1 (b)
LOAD_CONST      2 (10)
BINARY_ADD
STORE_FAST      0 (a)
\`\`\`

## Stack-Based vs. Register-Based VMs
- **Stack-Based (JVM, CPython)**: Arguments for instructions are pushed onto and popped off a stack. Easier to generate bytecode for.
- **Register-Based (LuaJIT, Dalvik)**: Instructions use virtual registers (like 3-address code). Faster to execute (fewer instructions), but more complex to generate.

Bytecode VMs are significantly faster than AST walkers because they minimize pointer chasing and utilize the CPU cache better. The VM is essentially a giant \`switch\` statement inside a loop (often called a **Dispatch Loop**).`
  },
  {
    id: "7-13",
    number: "7.13",
    title: "CPython's Bytecode VM: A Complete Tour",
    content: `Python is often called an "interpreted" language, but it's more accurate to call it a **Bytecode-Compiled** language. When you run a \`.py\` file, Python compiles it to \`.pyc\` (bytecode) and then runs it on the **CPython VM**.

## The Dispatch Loop
The core of CPython is a file called \`ceval.c\`. It contains a massive loop that fetches the next bytecode instruction and executes it.

\`\`\`c
// Conceptual CPython Dispatch
for (;;) {
    opcode = NEXT_OPCODE();
    switch (opcode) {
        case TARGET(BINARY_ADD):
            PyObject *right = POP();
            PyObject *left = POP();
            PyObject *res = PyNumber_Add(left, right);
            PUSH(res);
            break;
        // ... hundreds more cases
    }
}
\`\`\`

## Key Characteristics
- **Stack-Based**: Uses a value stack for almost all operations.
- **Object Model**: Everything in the VM is a \`PyObject*\`. Even an integer is a heap-allocated object, which is why Python is slower than C.
- **The GIL**: The **Global Interpreter Lock** ensures that only one thread executes Python bytecode at a time, protecting the VM's internal state but limiting multi-core performance.

## Inspection
You can see the bytecode yourself using the \`dis\` module:
\`\`\`python
import dis
def example(a, b):
    return a + b

dis.dis(example)
# Output:
#  2           0 LOAD_FAST                0 (a)
#              2 LOAD_FAST                1 (b)
#              4 BINARY_ADD
#              6 RETURN_VALUE
\`\`\`
Understanding bytecode is essential for debugging weird performance issues or building advanced tools like debuggers and profilers.`
  },
  {
    id: "7-14",
    number: "7.14",
    title: "The JVM: Class Loading, JIT Tiers, Deoptimization",
    content: `The **Java Virtual Machine (JVM)** is arguably the most sophisticated piece of software ever written. It is a high-performance, industrial-grade runtime environment.

## Dynamic Class Loading
Unlike a C++ binary, the JVM loads code (\`.class\` files) lazily. When your code references a class for the first time, the **ClassLoader** finds the file, verifies the bytecode for safety, and links it into the running system. This allows for powerful features like **Reflection** and hot-swapping code.

## Multi-Tiered Compilation
The JVM doesn't just have one JIT; it has several:
1.  **Interpreter**: Runs code immediately.
2.  **C1 (Client) Compiler**: Quickly generates machine code with basic optimizations.
3.  **C2 (Server) Compiler**: The "Heavyweight" optimizer. It takes longer but produces code that rivals C++.

## Deoptimization and Guarding
The JVM makes "speculative" assumptions. For example, it might notice that a certain interface only ever has one implementation in the current program. It will then **Inline** that implementation directly.
If you later load a JAR that provides a *second* implementation, the JVM's assumptions are invalidated. It will **Deoptimize** (reverting the affected machine code back to interpreted mode) and then potentially re-compile it with the new information. This "Class Hierarchy Analysis" (CHA) is why Java can often inline virtual calls that C++ cannot.`
  },
  {
    id: "7-15",
    number: "7.15",
    title: "Language Runtime Services: Type System, Reflection, FFI",
    content: `A **Language Runtime** is the set of services that support the execution of a program. It is the environment in which your code lives.

## Type Systems
The runtime manages how types are represented in memory. In a language like Python or JavaScript, every value is "tagged" with its type. In Java, objects have a **Header** that points to their class definition.

## Reflection and Introspection
Reflection is the ability of a program to examine and modify its own structure at runtime.
- **Introspection**: "What fields does this object have?"
- **Modification**: "Set the field named 'id' to 5."
Reflection is powerful but usually slow, as it bypasses the compiler's optimizations and requires lookups in the runtime's metadata.

## Foreign Function Interface (FFI)
No language is an island. **FFI** allows a language (like Python) to call functions written in another language (like C). This is how libraries like **NumPy** or **TensorFlow** achieve high performance while remaining easy to use.
The runtime handles the "marshalling"—converting Python objects into C-compatible pointers and back.

## Exception Handling
The runtime also manages the "unwinding" of the stack when an exception is thrown. It must find the nearest \`try/catch\` block and ensure that resources (like memory or file handles) are cleaned up correctly. This "Zero-cost exception" model in C++ means you pay nothing until an exception actually occurs, but the binary size increases to store "unwind tables."`
  },
  {
    id: "7-16",
    number: "7.16",
    title: "WASM: The New Portable Binary",
    content: `**WebAssembly (WASM)** is a low-level, binary instruction format for a stack-based virtual machine. While originally designed for the web, it is rapidly becoming a universal sandboxing technology for servers and edge computing.

## Why WASM?
Before WASM, the only way to run code in the browser was JavaScript. JS is high-level and dynamically typed, which makes it hard for the browser's JIT to optimize quickly.
WASM is:
- **Fast**: It is designed to be mapped directly to machine code.
- **Secure**: It runs in a memory-safe sandbox (it cannot access the host's memory unless explicitly allowed).
- **Portable**: The same \`.wasm\` file runs on Windows, Mac, Linux, and inside the browser.

## The WASM Memory Model
WASM uses a **Linear Memory** model. The program sees a single, contiguous array of bytes. There is no heap or garbage collector built into the core spec; the language you compile to WASM (like Rust or C++) must bring its own memory allocator.

## Beyond the Browser (WASI)
The **WebAssembly System Interface (WASI)** provides a standardized API for WASM modules to interact with the OS (files, network, clock). This allows WASM to run on servers, potentially replacing Docker containers for some use cases because WASM modules start up in microseconds, compared to milliseconds or seconds for containers.

## Example Use Case
Figma moved their C++ engine to WASM, resulting in a 3x speedup over their previous asm.js implementation. Photoshop and Google Earth also run in the browser today thanks to WASM.`
  },
  {
    id: "7-17",
    number: "7.17",
    title: "Case Study: V8's Hidden Classes and Inline Caches",
    content: `JavaScript is a dynamic language where objects can change shape at any time:
\`\`\`js
let obj = { x: 1 };
obj.y = 2; // Shape changed!
\`\`\`
To optimize this, Google's V8 engine uses a technique called **Hidden Classes** (also known as Maps or Shapes).

## Hidden Classes
When you create an object, V8 assigns it a hidden class (e.g., \`C0\`). When you add a property \`y\`, V8 creates a *new* hidden class \`C1\` and sets up a "transition" from \`C0\` to \`C1\`.
If you create many objects with the same properties in the same order, they will share the same hidden class. This allows the engine to predict where a property is located in memory (offset) instead of doing a slow hash map lookup.

## Inline Caches (IC)
The first time a function accesses \`obj.x\`, V8 looks up the offset for \`x\` in the hidden class. It then **caches** that offset directly in the machine code of the function.
Next time the function runs, it checks: "Is this object's hidden class still \`C0\`?" If yes, it uses the cached offset. This turns a complex lookup into a single comparison and a memory load.

## The "Deopt" Trap
If you write "polymorphic" code where a function receives objects of many different shapes, the Inline Cache becomes "Megamorphic." V8 gives up on the fast path and falls back to a slow generic lookup.
**Engineering Lesson**: For maximum JS performance, always initialize your object properties in the constructor and in a consistent order. This ensures your objects share hidden classes and stay on the "Fast Path."`
  },
  {
    id: "7-18",
    number: "7.18",
    title: "Case Study: How Rust's Borrow Checker Works",
    content: `Rust's **Borrow Checker** is a unique compiler component that enforces memory safety without a Garbage Collector. It works during the **Semantic Analysis** phase.

## Ownership and Lifetimes
The borrow checker tracks the **Lifetime** of every variable. It ensures three rules are never broken:
1. Each value has a single owner.
2. You can have many immutable references (\`&T\`).
3. You can have exactly ONE mutable reference (\`&mut T\`), and no other references can exist at that time.

## Data Flow Analysis
The borrow checker doesn't just look at the code; it analyzes the **Control Flow Graph (CFG)**. It tracks "loans" across the graph.

\`\`\`rust
let mut x = 5;
let y = &x;     // Loan of x begins
println!("{}", y);
x = 10;         // Error! Cannot mutate while a loan is active
\`\`\`

## Non-Lexical Lifetimes (NLL)
Early Rust was too strict. It considered a loan active until the end of the block (\`}\`). Modern Rust (NLL) is smarter; it sees that \`y\` is not used after the \`println\`, so it "ends" the loan early, allowing \`x = 10\` to succeed.

## Zero-Cost Abstraction
The amazing thing about the borrow checker is that it's entirely **Compile-Time**. Once the code passes the check, all the lifetime information is stripped away. The final machine code is exactly the same as if you had written manual memory management in C, but with a mathematical guarantee that you won't have Use-After-Free or Data Races.`
  },
  {
    id: "7-19",
    number: "7.19",
    title: "Exercises",
    content: `Test your understanding of compilers and language runtimes with these exercises.

## Exercise 1: Lexical Analysis
**Question**: Given the following regexes for tokens:
- \`KEYWORD\`: \`if|else|while\`
- \`ID\`: \`[a-z]+\`
- \`NUM\`: \`[0-9]+\`
How would the string "while10" be lexed?
**Answer**: It would be lexed as a single \`ID\` token ("while10") because the regex for \`ID\` would likely be matched greedily or it would fail \`KEYWORD\` because "while10" != "while". (Actual behavior depends on "maximal munch" rules).

## Exercise 2: AST Construction
**Question**: Draw the AST for \`a = b + c * d\`.
**Answer**: 
\`\`\`text
    =
   / \\
  a   +
     / \\
    b   *
       / \\
      c   d
\`\`\`

## Exercise 3: Three-Address Code
**Question**: Convert \`y = (a + b) * (c - d)\` into 3AC.
**Answer**:
\`\`\`text
t1 = a + b
t2 = c - d
y = t1 * t2
\`\`\`

## Exercise 4: Optimization
**Question**: What optimization is being applied here?
Before: \`for(int i=0; i<x; i++) { printf("%d", 5 * 2); }\`
After: \`int tmp = 10; for(int i=0; i<x; i++) { printf("%d", tmp); }\`
**Answer**: **Loop-Invariant Code Motion** (moving calculations that don't change inside a loop to the outside) and **Constant Folding** (calculating \`5 * 2\` at compile time).

## Exercise 5: Register Allocation
**Question**: If variables A and B are never used at the same time, can they share a register?
**Answer**: Yes. Their live ranges do not overlap, so they do not "interfere" in the interference graph.

## Exercise 6: JIT vs AOT
**Question**: Why might a JIT-compiled program eventually run *faster* than an AOT-compiled one?
**Answer**: Because a JIT has access to runtime information (Profile-Guided Optimization) and can perform speculative optimizations based on actual data types and branch probabilities.

## Exercise 7: V8 Hidden Classes
**Question**: Why is \`{a:1, b:2}\` a different hidden class than \`{b:2, a:1}\`?
**Answer**: Because V8 tracks the *order* of property addition to build its transition graph. Different orders lead to different transition paths and different hidden classes.

## Exercise 8: Linking
**Question**: What is the primary difference between a "Symbol Not Found" error at compile time vs. at link time?
**Answer**: A compiler error means the *declaration* is missing (you didn't include the header). A linker error means the *definition* is missing (you didn't link the actual library containing the function).`
  }
];
