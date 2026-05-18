import type { Section } from '../types';

export const CH01_EXTRA_SECTIONS: Section[] = [
  {
    id: "1-9",
    number: "1.9",
    title: "Out-of-Order Execution",
    content: `A modern CPU is not just a fast calculator; it is a massive, complex **scheduling engine**. In the early days of computing, processors followed a strict "In-Order" model: read instruction A, execute instruction A, then read instruction B. If instruction A was waiting for data from slow memory, the entire CPU sat idle.

Modern CPUs (since the mid-90s, starting with architectures like the Intel P6) use **Out-of-Order Execution (OoOE)**. The goal is simple: keep the execution units busy at all times. If the current instruction is blocked, the CPU looks ahead in the instruction stream to find subsequent instructions that *can* be run because their dependencies are already met.

## The Execution Pipeline
To understand OoOE, we must look at the pipeline stages:
1.  **Fetch & Decode**: Instructions are pulled from memory and translated into "micro-ops" (uOps).
2.  **Dispatch/Rename**: The CPU maps "architectural registers" (like EAX) to a much larger pool of "physical registers" to avoid false dependencies.
3.  **The Scheduler (Issue Queue)**: Micro-ops wait here until their operands are ready.
4.  **Execution Units**: Multiple units (ALUs, FPUs, Load/Store units) execute the micro-ops in parallel.
5.  **Reorder Buffer (ROB)**: This is the "secret sauce." Even though instructions execute out of order, they must **retire** (commit their results to the architectural state) in the original program order to ensure correctness.

## Why This Matters for Software
As a software engineer, you rarely see OoOE directly, but you feel its effects in performance. The CPU can hide the latency of a cache miss by executing hundreds of other instructions while waiting for the RAM.

\`\`\`c
// An example of potential OoOE optimization
int a = data[0]; // Cache miss! Wait 200 cycles.
int b = 2 + 2;   // No dependency on 'a'.
int c = b * 5;   // CPU can execute 'b' and 'c' while 'a' is still loading.
\`\`\`

The CPU creates a **Dependency Graph** on the fly. If two instructions don't share data, they are candidates for parallel, out-of-order execution. The limit to this is the **Instruction Window** size—modern high-end CPUs can look ahead at roughly 200-500 micro-ops.

---
**Key Insight**: The CPU effectively "re-writes" your sequential code into a parallel execution plan every nanosecond, ensuring that stalling on slow I/O or memory doesn't stop the world.`
  },
  {
    id: "1-10",
    number: "1.10",
    title: "Branch Prediction and Speculation",
    content: `If Out-of-Order execution is the engine, **Speculation** is the fuel that keeps it running at high speeds. Modern software is full of conditional logic (\`if\`, \`else\`, \`switch\`, \`while\`). In a deep pipeline, the CPU might fetch an \`if\` statement and not know which way the branch goes for another 15-20 cycles.

If the CPU waited for the result, it would stall. Instead, it **guesses**.

## The Branch Predictor
The CPU maintains a **Branch Target Buffer (BTB)**, a small cache that remembers the history of branches. If a specific \`if\` statement has gone "True" the last 100 times, the predictor assumes it will go "True" again. It then starts fetching and executing instructions from the "True" path **speculatively**.

## What happens if the guess is wrong?
If the CPU realizes it guessed incorrectly (a **branch misprediction**), it must:
1.  **Flush the pipeline**: Discard all speculatively executed work.
2.  **Undo side effects**: Use the Reorder Buffer to ensure no data was actually written to memory or registers.
3.  **Restart**: Start fetching from the correct path.

This penalty is heavy—often 15 to 20 clock cycles. In a tight loop, this can be the difference between a high-performance system and a sluggish one.

## Programming for the Predictor
Consider this classic experiment: sorting an array before processing it.

\`\`\`cpp
// Unsorted: Predictor fails often (roughly 50/50 chance)
for (int i = 0; i < size; ++i) {
    if (data[i] >= 128) sum += data[i];
}

// Sorted: Predictor succeeds (111...111 then 000...000)
std::sort(data, data + size);
for (int i = 0; i < size; ++i) {
    if (data[i] >= 128) sum += data[i];
}
\`\`\`

In the sorted case, the CPU learns the pattern quickly. In the unsorted case, the predictor is effectively guessing at random. On modern hardware, the sorted version can be **3x to 5x faster** purely due to branch prediction accuracy.

---
**Key Insight**: Performance isn't just about how many instructions you write, but how **predictable** those instructions are for the hardware. Avoid "branchy" code in hot paths.`
  },
  {
    id: "1-11",
    number: "1.11",
    title: "The Clock: Timing and Frequency",
    content: `The **Clock Speed** (measured in GHz) is the heartbeat of the CPU. A 3.0 GHz processor has 3 billion "ticks" per second. Every tick is an opportunity for the CPU to advance an instruction through the pipeline.

However, frequency is a deceptive metric. A 3.0 GHz processor from 2024 is vastly more powerful than a 3.0 GHz processor from 2004. Why? Because of **Instructions Per Cycle (IPC)**.

## The Power Wall
For decades, frequency increased exponentially. But in the mid-2000s, we hit the **Power Wall**. Increasing frequency requires increasing voltage, and power consumption (and heat) increases with the *square* of the voltage (\`P ≈ C * V^2 * f\`). We reached a point where we couldn't cool the chips effectively if we pushed them much past 4-5 GHz.

## Clock Cycles vs. Wall Time
As an engineer, you must think in cycles, not just milliseconds.
- **L1 Cache Access**: ~4 cycles.
- **L2 Cache Access**: ~12 cycles.
- **L3 Cache Access**: ~40 cycles.
- **Main Memory (RAM)**: ~200-300 cycles.

If your CPU is 3 GHz, one cycle is ~0.33 nanoseconds. A RAM access of 100ns is "only" 100 billionths of a second, but to the CPU, it is a **300-cycle eternity**. If the CPU is waiting for RAM, it is effectively doing nothing for the time it could have executed nearly a thousand instructions.

## Instruction Latency vs. Throughput
Different instructions take different amounts of time:
- \`ADD\`: 1 cycle.
- \`MUL\`: 3-5 cycles.
- \`DIV\`: 20-80 cycles.

Modern CPUs use **Pipelining** to ensure that even if an instruction takes 5 cycles, a *new* one can start every single cycle. This is the difference between latency (how long one takes) and throughput (how many we finish per second).

---
**Key Insight**: Don't be fooled by GHz. Performance is the product of \`Frequency * IPC\`. To make code faster, reduce the number of cycles spent waiting for data (memory latency) or waiting for complex math (instruction latency).`
  },
  {
    id: "1-13",
    number: "1.13",
    title: "Cache Lines and Cache Friendliness",
    content: `The CPU does not load data from memory one byte at a time. It loads data in chunks called **Cache Lines**, typically **64 bytes** on modern x86 and ARM processors.

When you access a single \`int\` (4 bytes), the CPU pulls that byte *plus* the next 60 bytes into the L1 cache. If your next access is to the very next \`int\` in memory, it's already in the cache—a "Cache Hit." If your next access is to a distant memory address, the CPU must fetch a new cache line—a "Cache Miss."

## Spatial Locality
This behavior makes **Spatial Locality** the most important rule of data structures. Arrays are "Cache Friendly" because they store data contiguously. Linked lists are "Cache Killers" because each node is likely on a different cache line, forcing a full RAM round-trip for every pointer jump.

| Access Pattern | Cache Performance | Reason |
| :--- | :--- | :--- |
| Sequential Array Scan | Excellent | Pre-fetcher can predict next line |
| Random Array Access | Poor | No predictability, likely misses |
| Linked List Traversal | Terrible | Pointer chasing, high latency |

## The Impact of Strides
Consider a 2D array (matrix). In languages like C++, matrices are stored in **row-major order**.

\`\`\`c
// Fast: Sequential access (Row-major)
for (int i = 0; i < rows; i++)
    for (int j = 0; j < cols; j++)
        sum += matrix[i][j];

// Slow: Strided access (jumping across rows)
for (int j = 0; j < cols; j++)
    for (int i = 0; i < rows; i++)
        sum += matrix[i][j];
\`\`\`

The second version can be **10x slower** or more because each \`matrix[i][j]\` access might fall into a different cache line, effectively invalidating the cache for every single operation.

## Data-Oriented Design
Modern high-performance engineering (common in game engines and high-frequency trading) uses **Data-Oriented Design**. Instead of creating objects like \`Player { id, x, y, health, name }\`, we create arrays: \`positionsX[]\`, \`positionsY[]\`, \`healths[]\`. This ensures that when we update the health of all players, we are loading cache lines full of health values, with zero wasted space for names or IDs.

---
**Key Insight**: Your code's speed is dictated by your data's layout. Organize your data to be processed in tight, contiguous blocks to maximize the power of the CPU cache.`
  },
  {
    id: "1-14",
    number: "1.14",
    title: "False Sharing in Multi-Core Systems",
    content: `We know that the CPU caches data in 64-byte lines. But what happens in a multi-core system when two different cores want to write to different variables that happen to live on the **same cache line**?

This phenomenon is called **False Sharing**, and it is a silent performance killer in concurrent programming.

## The Coherency Protocol
Cores keep their caches synchronized using a protocol like **MESI** (Modified, Exclusive, Shared, Invalid). If Core A modifies a byte in a cache line, that line is marked "Invalid" in Core B's cache. If Core B then wants to read its own (unrelated) variable on that same line, it is forced to reload the entire line from memory or Core A's cache.

## A Concrete Example
Imagine two threads incrementing two different counters:

\`\`\`c
struct Counters {
    volatile long countA; // 8 bytes
    volatile long countB; // 8 bytes
};
// total size: 16 bytes. They will be on the same 64-byte cache line.
\`\`\`

If Thread 1 is pinned to Core 1 updating \`countA\`, and Thread 2 is pinned to Core 2 updating \`countB\`, the two cores will fight over the cache line. Each write by Core 1 invalidates the line for Core 2. The hardware spends all its time bouncing the cache line between cores instead of doing actual work.

## The Solution: Padding
To fix false sharing, we must ensure that independently accessed variables live on different cache lines. We do this by adding "padding."

\`\`\`c
struct Counters {
    volatile long countA;
    long padding[8];      // 64 bytes of "dummy" space
    volatile long countB;
};
\`\`\`

In modern Java, you can use the \`@Contended\` annotation. In C++, you can use \`alignas(64)\`. 

## Detecting False Sharing
False sharing is invisible in standard profilers. You won't see high CPU usage or specific "slow" functions. Instead, you'll see that your multi-threaded code doesn't scale—adding more cores actually makes the program *slower*. Use tools like \`perf c2c\` (cache-to-cache) on Linux to find these "hot" cache lines.

---
**Key Insight**: Parallelism doesn't guarantee speed. If your threads share a cache line, they are effectively serialized by the hardware's cache coherency mechanism. Respect the 64-byte boundary.`
  },
  {
    id: "1-15",
    number: "1.15",
    title: "NUMA Architecture",
    content: `In a simple computer, all RAM is equally "far" from all CPUs. This is **UMA** (Uniform Memory Access). But as we scale to servers with multiple CPU sockets and hundreds of cores, this model breaks down. The wires literally become too long, and the contention for the memory bus becomes too high.

Enter **NUMA** (Non-Uniform Memory Access).

## Local vs. Remote Memory
In a NUMA system (like a dual-socket Xeon or EPYC server), the memory is divided. Each CPU socket has its own "local" RAM. A CPU can access its local RAM very quickly. If it needs data from the RAM attached to *the other* socket, it must go through an interconnect (like Intel's QPI/UPI or AMD's Infinity Fabric).

- **Local Access Latency**: ~80-100ns
- **Remote Access Latency**: ~150-300ns (or more)

## The Software Impact
If you are writing a high-performance database or web server, you must be "NUMA-aware." If your process is running on Socket 0 but its memory was allocated on Socket 1, you are paying a "NUMA tax" on every single memory access.

### NUMA Policies
Operating systems like Linux allow you to control this:
1.  **Local Allocation**: Allocate memory on the same node as the thread.
2.  **Interleaving**: Spread memory across all nodes (good for large shared caches).
3.  **Binding**: Pin a process to a specific node so it never touches "remote" RAM.

\`\`\`bash
# Run a process pinned to NUMA node 0
numactl --cpunodebind=0 --membind=0 ./my_app
\`\`\`

## First-Touch Policy
Linux uses a "First-Touch" policy. Memory isn't actually allocated when you call \`malloc()\`; it's allocated when you first *write* to it. If a "master" thread initializes a huge array and then spawns 32 threads on different NUMA nodes to process it, all that memory will be stuck on the master thread's node.

**Better approach**: Have each worker thread initialize its own chunk of the data structure.

---
**Key Insight**: On modern servers, "Memory" is not a single bucket. It is a distributed system. To achieve maximum throughput, you must keep your computation close to your data.`
  },
  {
    id: "1-16",
    number: "1.16",
    title: "The Memory Model: What Concurrent Code Actually Does",
    content: `You might think that if you write:
\`\`\`c
X = 1;
Y = 1;
\`\`\`
...then any other thread looking at memory will see \`X=1\` before or at the same time as \`Y=1\`.

**On modern hardware, this is false.**

The CPU and the compiler both reserve the right to reorder these operations for performance, as long as it doesn't change the result of a *single-threaded* program. This is the **Memory Model**.

## Hardware Reordering
As we saw in Out-of-Order execution, the CPU might execute the write to \`Y\` before \`X\` because \`Y\` was already in the store buffer. To the CPU, this is a "win" because it didn't have to wait. But to another thread, this is a disaster.

## Memory Barriers (Fences)
To prevent this, we use **Memory Barriers**. A barrier tells the CPU: "Do not move any instructions from after this line to before it, and vice versa."

In C++11 and later, we use \`std::atomic\` with memory orders:
- **memory_order_relaxed**: No ordering guarantees (only atomicity).
- **memory_order_acquire/release**: Ensures that writes in one thread are visible to reads in another.
- **memory_order_seq_cst**: (Sequentially Consistent) The strongest model, makes the code behave like you'd intuitively expect, but with a significant performance cost.

## Total Store Order (TSO) vs. Weak Ordering
- **x86** uses a relatively strong model (TSO). It generally doesn't reorder writes with other writes, but it *can* reorder a read before an older write to a different location.
- **ARM** and **PowerPC** use "Weak Ordering." They can reorder almost anything. Code that works on your Intel laptop might crash on an ARM-based phone because of a missing memory barrier.

## The Compiler's Role
Even before the CPU gets the code, the compiler (GCC/Clang) might reorder instructions.
\`\`\`c
// Compiler sees:
a = 1;
b = 2;
a = 3;
// Compiler might optimize to:
b = 2;
a = 3;
\`\`\`
If another thread was waiting for \`a\` to be 1 to perform an action, it will now wait forever.

---
**Key Insight**: Concurrency is not just about "atomicity" (stopping two threads from writing at once). It is about **visibility** and **ordering**. Never roll your own locks; use the primitives provided by your language's memory model.`
  },
  {
    id: "1-17",
    number: "1.17",
    title: "Input/Output: PCIe, DMA, and Interrupts",
    content: `How does a CPU talk to the outside world? It doesn't use the same bus as the RAM. It uses **PCI Express (PCIe)** for high-speed peripherals like GPUs, NVMe SSDs, and Network Cards.

## Programmed I/O (The Slow Way)
In the early days, the CPU had to manually move every byte from the disk controller into a register, and then into RAM. This is **Programmed I/O (PIO)**. It's incredibly wasteful; the CPU—the most expensive part of the system—is reduced to a glorified delivery person.

## Direct Memory Access (DMA)
Modern systems use **DMA**. The CPU tells the disk controller: "Here is a memory address (0x1000). Please put the next 4MB of data from the disk there. Let me know when you're done." The CPU then goes back to doing actual work. The disk controller handles the transfer directly to RAM, bypassing the CPU entirely.

## Interrupts vs. Polling
How does the CPU know the DMA transfer is finished?
1.  **Polling**: The CPU periodically checks a status bit. "Are you done yet? How about now?" This wastes cycles.
2.  **Interrupts**: The device sends a signal to the **Interrupt Controller**. The CPU immediately pauses its current task, saves its state, and jumps to an **Interrupt Service Routine (ISR)**.

Interrupts are great for efficiency but terrible for "jitter." If you are a high-frequency trading app, an interrupt from the mouse moving can stall your trade for several microseconds. High-performance apps often "poll" the network card in a tight loop to avoid the overhead of context switching.

## The PCIe Bus
PCIe is not a single bus but a collection of point-to-point **lanes**.
- **PCIe 4.0 x1**: ~2 GB/s per direction.
- **PCIe 4.0 x16** (GPU): ~32 GB/s per direction.

When you call \`read()\` on a file in Node.js or Python, you are triggering a massive chain: the OS kernel translates the request, the driver initiates a DMA transfer over PCIe, and an interrupt eventually wakes your thread up to process the data.

---
**Key Insight**: Efficient I/O is about getting the CPU out of the way. Use DMA and asynchronous patterns (like \`io_uring\` in Linux) to let the hardware do the heavy lifting in parallel.`
  },
  {
    id: "1-18",
    number: "1.18",
    title: "Multi-Core and Superscalar Execution",
    content: `We often use "Parallelism" and "Concurrency" interchangeably, but at the hardware level, they happen in two very different ways.

## Superscalar Execution (ILP)
Even a single core is parallel. A **Superscalar** processor can execute multiple instructions in the *same clock cycle*. This is called **Instruction-Level Parallelism (ILP)**.
Inside the core, there are multiple "Execution Ports." One port might handle integer math, another floating-point math, and another memory loads.

If you write:
\`\`\`c
a = b + c;
d = e * f;
\`\`\`
A superscalar CPU will detect that these don't depend on each other and will fire them off to different ports simultaneously. Modern CPUs can "issue" 4 to 8 instructions per cycle.

## Simultaneous Multi-Threading (Hyper-Threading)
Often, a single thread can't keep all those execution ports busy. Maybe it's waiting for a load from memory, leaving the ALU idle. **Hyper-Threading** (Intel) or **SMT** (AMD/ARM) makes one physical core look like two "logical" cores. It keeps two sets of registers and two instruction pointers. When Thread A stalls on a cache miss, the core immediately switches to Thread B, filling the gaps in the pipeline.

**Crucial Note**: SMT does *not* double your performance. It typically adds 15-30% throughput because the two threads are still fighting for the same underlying execution units and caches.

## Multi-Core Parallelism (TLP)
This is **Thread-Level Parallelism**. Each core is a completely independent unit with its own L1/L2 caches and execution pipeline. This is how we scale today. Instead of one 10GHz core (impossible), we have 16 cores at 3GHz.

| Level | Scale | Controlled By |
| :--- | :--- | :--- |
| Superscalar | Instructions | CPU Hardware |
| SMT (Hyper-Thread) | Hardware Threads | OS Scheduler / Hardware |
| Multi-Core | OS Processes / Threads | Software Engineer |

---
**Key Insight**: To maximize modern hardware, you must exploit all three levels. Use multi-threading for TLP, but also write clean, dependency-free code to let the CPU's superscalar engine maximize ILP.`
  },
  {
    id: "1-19",
    number: "1.19",
    title: "Case Study: The Spectre and Meltdown Vulnerabilities",
    content: `In 2018, the world of computing was rocked by **Spectre** and **Meltdown**. These weren't bugs in software like Windows or Linux; they were "bugs" in the fundamental design of modern CPUs. Specifically, they exploited **Speculative Execution**.

## The Core Concept: Side Channels
Recall that the CPU speculatively executes code before it knows if the code *should* run. If the guess is wrong, the CPU throws away the result. Meltdown and Spectre realized that while the CPU throws away the *result*, it doesn't throw away the **cache state**.

If a speculative instruction loads data into the cache, that data stays there. A hacker can then measure how long it takes to access that memory. If it's fast (a cache hit), they know the secret data had a certain value. If it's slow (a cache miss), it had a different value.

## Meltdown
Meltdown allowed a user-level program to read kernel memory. 
\`\`\`c
// Speculative execution
char secret = *kernel_address; // This should trigger a fault
char leak = data_array[secret * 4096]; // CPU speculatively runs this
\`\`\`
The CPU checks the permission *after* it starts the load. By the time it realizes the user isn't allowed to read that memory, the value of \`secret\` has already been used to pull a specific part of \`data_array\` into the cache.

## Spectre
Spectre is even more devious. It tricks the **Branch Predictor**. By "training" the predictor that a certain branch is usually true, an attacker can force the CPU to speculatively execute a piece of code (a "gadget") that it would never normally reach, leaking data from within the same process (e.g., a browser leaking passwords to a malicious JavaScript snippet).

## The Fix and the Cost
Fixing these required "Kernel Page-Table Isolation" (KPTI) and "Retpolines." These fixes essentially disable certain optimizations or add heavy barriers between user and kernel space. For some I/O-heavy workloads (like databases), the performance hit was as high as **30%**.

---
**Key Insight**: Spectre and Meltdown proved that "abstracting away the hardware" is a myth. Security and performance are deeply linked to the physical implementation of the processor. Optimization is never free; it often comes with hidden risks.`
  },
  {
    id: "1-20",
    number: "1.20",
    title: "Exercises",
    content: `Test your understanding of the physical machine with these architectural challenges.

## Questions

1.  **Pipeline Depth**: A processor has a 20-stage pipeline and runs at 2 GHz. If a branch misprediction happens, and the pipeline must be completely flushed, what is the minimum time penalty in nanoseconds?
2.  **Cache Lines**: You have a 1GB array of integers. You sum every 16th integer (e.g., index 0, 16, 32...). Assuming a 64-byte cache line and 4-byte integers, will this be faster, slower, or the same speed as summing every integer? Why?
3.  **False Sharing**: You have a \`struct\` with two \`int64_t\` counters. Two threads on two different cores are incrementing these counters. How would you modify the struct to ensure no false sharing occurs? Show the code.
4.  **OoOE**: Explain why a CPU might execute a \`MUL\` (multiply) instruction that appears on line 10 of your code before a \`LOAD\` instruction on line 5.
5.  **NUMA**: You are running a high-performance web server on a dual-socket machine. You notice that throughput is inconsistent. What tool would you use to check memory locality, and what is one OS-level command to improve it?
6.  **Speculation**: Why does sorting an array before processing it with an \`if\` statement improve performance?
7.  **Memory Model**: In C++, what is the difference between \`memory_order_relaxed\` and \`memory_order_seq_cst\`? When would you use the former?
8.  **PCIe/DMA**: Why is DMA essential for high-speed NVMe SSDs to reach their rated speeds (e.g., 7 GB/s)?

---

## Answers

1.  **20 cycles / 2,000,000,000 cycles/sec = 10 nanoseconds.** (A huge amount of time for a CPU).
2.  **Roughly the same speed.** Because 16 * 4 bytes = 64 bytes. Each access still pulls in a new cache line. You are loading the same amount of data from RAM but using only 1/16th of it. The bottleneck is the RAM-to-Cache transfer.
3.  Use padding or alignment: \`struct C { alignas(64) int64_t a; alignas(64) int64_t b; };\`
4.  If the \`LOAD\` is a cache miss, it's stalled for 200 cycles. If the operands for \`MUL\` are already in registers, the OoOE engine will execute the \`MUL\` to keep the ALU busy.
5.  Use \`numastat\` to check hits/misses. Use \`numactl --interleave=all\` or bind the process to a specific node.
6.  It makes the branch highly predictable for the Branch Predictor, minimizing pipeline flushes.
7.  \`relaxed\` only guarantees the operation is atomic; \`seq_cst\` guarantees a global ordering across all threads. Use \`relaxed\` for simple counters where the exact order relative to other variables doesn't matter.
8.  Without DMA, the CPU would have to move every byte manually, maxing out the CPU at ~1-2 GB/s and leaving no cycles for the actual application.`
  }
];
