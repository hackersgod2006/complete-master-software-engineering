import type { Section } from '../types';

export const CH01_ORIGINAL_SECTIONS: Section[] = [
  {
    id: "1-1",
    number: "1.1",
    title: "Why a Software Engineer Must Understand Hardware",
    content: `Most programming courses start with code. This book starts one level below that — with the machine that runs the code.

Here is why that matters.

When you write this:

\`\`\`python
x = x + 1
\`\`\`

You think you know what happens. A number gets bigger by one. Simple.

But what *actually* happens is this:

1. The CPU fetches that instruction from memory
2. It reads the current value of \`x\` from a register or cache
3. It sends that value to the ALU (Arithmetic Logic Unit) — a circuit made of millions of transistors
4. The ALU adds 1 using binary arithmetic
5. The result is written back

That entire sequence happens in **less than one nanosecond** — one billionth of a second.

Now multiply that by a billion lines of code running across millions of machines. The engineers who understand *what is actually happening at each step* are the ones who can diagnose why their code is slow, why it crashes, why two threads are fighting over the same memory, why their program behaves differently on a different machine.

The engineers who don't understand hardware treat their computer like a magic box. Magic boxes break in mysterious ways.

---

**The Two Kinds of Software Engineers**

There are engineers who write code that *works*. And there are engineers who write code that works, is fast, is safe, and can be reasoned about deeply even when something goes wrong at 3am in production.

The difference between them is almost always **depth of understanding** — not years of experience, not the number of languages they know, not how fast they type.

Depth means: you can trace what your code does all the way down to the metal.

By the end of this chapter, you will be able to do that.

---

**What You Will Learn in This Chapter**

This chapter covers the actual physical machine — from a single transistor all the way up to how your code executes on a modern multi-core processor.

You will learn:

- What a transistor is and why it is the fundamental building block of all computing
- How transistors combine into logic gates, and gates combine into circuits that can *add numbers*
- How a CPU is structured and what each part does
- How the CPU fetches, decodes, and executes your instructions
- Why memory access is the single biggest performance bottleneck in modern software
- What happens when two CPU cores share memory at the same time

None of this requires a hardware engineering background. You only need patience and the willingness to follow each idea one step at a time.`
  },
  {
    id: "1-2",
    number: "1.2",
    title: "The Transistor: The Atom of Modern Computing",
    content: `A transistor is a tiny electronic switch. That is the complete, honest definition.

It can be **on** — allowing current to flow through it.
Or **off** — blocking current completely.

That's it. On or off. Two states.

But here is the staggering part: a modern CPU contains **50 to 100 billion transistors**. Each one is about 3 to 5 nanometers wide — roughly the diameter of 15 to 25 atoms placed side by side. They are so small that quantum effects start to matter. Engineers fight physics itself to keep making them smaller.

---

**Why Does a Switch Matter?**

Think about it carefully. A switch has two states: on and off. We can represent those states as numbers: **1** and **0**.

Now imagine two switches in series — both must be on for current to flow:

\`\`\`
Switch A ──┬── Switch B ──► Output
           │
         (only flows if A AND B are both on)
\`\`\`

You've just built a logic gate — specifically an AND gate. If A=1 and B=1, output=1. Any other combination, output=0.

With a different arrangement (both switches in parallel), you get an OR gate. Flip the output, and you get a NOT gate.

From just these three fundamental operations — AND, OR, NOT — you can build **any computation that has ever been performed by any computer in history**.

This is not an exaggeration. It is a mathematical theorem, proved by Claude Shannon in 1937. All logic can be expressed in AND, OR, and NOT.

---

**The Physical Reality**

Modern transistors are called **MOSFETs** — Metal-Oxide-Semiconductor Field-Effect Transistors. The name doesn't matter. What matters is the principle:

- There is a **gate** (the control input)
- When voltage is applied to the gate, it creates an electric field
- That field pulls electrons into a channel, allowing current to flow (ON)
- When voltage is removed, the channel closes, blocking current (OFF)

The key insight: **no moving parts**. Unlike mechanical switches, transistors switch states billions of times per second using only electricity and the quantum behavior of electrons. They are essentially perfect — they don't wear out from switching, they generate very little heat per switch, and they can be made almost unimaginably small.

---

**Why This Matters to You**

You will never design a transistor. But understanding that your code ultimately executes as patterns of billions of switches toggling on and off — that changes how you think about computation.

When your program runs slowly, somewhere in that machine, certain sequences of switches are being toggled more than necessary.

When your program crashes with a memory error, certain switches are being set to configurations the CPU doesn't know how to interpret.

When two threads conflict, two parts of the chip are racing to toggle the same switches.

The transistor is where everything begins. Keep it in mind.`
  },
  {
    id: "1-3",
    number: "1.3",
    title: "From Transistors to Logic Gates",
    content: `We established that transistors are switches, and that switches can be arranged to perform AND, OR, and NOT. Let's now be precise about what these operations actually do.

---

**The Three Fundamental Gates**

**NOT Gate (Inverter)**

Takes one input. Flips it.

| Input | Output |
|-------|--------|
| 0     | 1      |
| 1     | 0      |

**AND Gate**

Takes two inputs. Output is 1 only if *both* inputs are 1.

| A | B | Output |
|---|---|--------|
| 0 | 0 | 0      |
| 0 | 1 | 0      |
| 1 | 0 | 0      |
| 1 | 1 | 1      |

**OR Gate**

Takes two inputs. Output is 1 if *at least one* input is 1.

| A | B | Output |
|---|---|--------|
| 0 | 0 | 0      |
| 0 | 1 | 1      |
| 1 | 0 | 1      |
| 1 | 1 | 1      |

---

**The NAND Gate: The Universal Gate**

**NAND** (Not-AND) is an AND gate followed by a NOT gate. You can build ANY other gate using only NAND gates:

- NOT A = A NAND A
- A AND B = (A NAND B) NAND (A NAND B)
- A OR B = (A NAND A) NAND (B NAND B)

This means theoretically, your entire CPU could be built from a single type of component. In practice, real chips use a mix for efficiency — but the mathematical universality of NAND is a cornerstone result.

---

**From Gates to Useful Circuits: The Half Adder**

What happens when we add two single bits?

\`\`\`
0 + 0 = 0 (no carry)
0 + 1 = 1 (no carry)
1 + 0 = 1 (no carry)
1 + 1 = 0 (carry 1)  ← like decimal 9 + 1 = 10
\`\`\`

The sum column follows XOR logic. The carry column follows AND logic.

A half adder uses:
- One XOR gate → sum
- One AND gate → carry

Chain 64 full adders and you can add two 64-bit integers — which is exactly what your CPU does, billions of times per second.`
  },
  {
    id: "1-4",
    number: "1.4",
    title: "Building Arithmetic from Gates: Adders and the ALU",
    content: `We now have gates. The next step is combining them into something genuinely useful: arithmetic on multi-bit numbers.

---

**From Bits to Numbers**

With 8 bits: 0 to 255. With 32 bits: 0 to ~4 billion. With 64 bits: 0 to ~18 quintillion.

\`\`\`
Binary: 01001010
Position: 7  6  5  4  3  2  1  0
Value:  128 64 32 16  8  4  2  1

01001010 = 0+64+0+0+8+0+2+0 = 74
\`\`\`

---

**The Full Adder**

When chaining adders, each stage handles three inputs: A, B, and carry-in.

\`\`\`
Sum  = A XOR B XOR Cin
Cout = (A AND B) OR (Cin AND (A XOR B))
\`\`\`

Chain 64 full adders → 64-bit addition.

---

**The Arithmetic Logic Unit (ALU)**

The ALU is the computational heart of the CPU. A typical ALU performs:

- Add, Subtract
- AND, OR, XOR (bitwise)
- Left/right bit shifts
- Compare (returns <, =, >)

The CPU selects the operation using control bits called the **opcode**.

**Key practical implications:**

- Integer operations (add, AND, shift) take 1 clock cycle — they're the fastest operations possible
- Division is slower than multiplication — it requires more cycles
- \`x >> 1\` (right shift) is faster than \`x / 2\` (division) for powers of 2
- Floating point uses a separate **FPU** — different performance and precision characteristics
- Comparison is subtraction — \`if a == b\` subtracts and checks for zero

Every \`if\`, every loop counter, every array index flows through circuits like this.`
  },
  {
    id: "1-5",
    number: "1.5",
    title: "The CPU: A Complete Anatomy",
    content: `The CPU is the component that executes your program's instructions. Everything else — memory, storage, GPU, network — exists in service of the CPU.

---

**Major Components**

**The ALU** — Performs arithmetic and logic (covered in 1.4).

**The Control Unit (CU)** — The director. Reads instructions, decodes them, coordinates all other units. It decides: fetch this instruction, send these values to the ALU, write the result back.

**Registers** — Tiny, extremely fast storage built directly into the CPU. ~16-32 general-purpose registers on modern 64-bit CPUs. Each holds 8 bytes. Accessing a register takes a fraction of a nanosecond.

**The Cache** — A hierarchy of fast memory on the CPU chip itself (L1, L2, L3). Much faster than RAM, but much smaller. The memory hierarchy is covered deeply in Section 1.12.

**The Bus Interface Unit** — Manages communication between CPU and the outside world: RAM, storage, peripherals.

**The Branch Predictor** — Guesses which way conditional branches will go before the CPU evaluates the condition. Section 1.10.

---

**The Architecture Diagram**

\`\`\`
┌─────────────────────────────────────────┐
│                  CPU                    │
│  ┌──────────┐    ┌─────────────────┐   │
│  │ Control  │────│    Registers    │   │
│  │   Unit   │    │  (R0, R1...R15) │   │
│  └──────────┘    └─────────────────┘   │
│       │                  │              │
│  ┌──────────┐    ┌─────────────────┐   │
│  │   ALU    │────│  Cache (L1/L2)  │   │
│  └──────────┘    └─────────────────┘   │
└──────────────────────────┼─────────────┘
                           │
                    ┌──────────────┐
                    │   RAM (Main  │
                    │   Memory)    │
                    └──────────────┘
\`\`\`

**The memory wall**: A modern CPU executes in 0.3ns. RAM access takes 50-100ns — 150-300× longer. The cache exists entirely to bridge this gap.

**Clock speed**: Modern CPUs run at 3-5 GHz — 3 to 5 billion cycles per second. A CPU executing 4 instructions per clock (superscalar) is effectively 4× faster than its clock speed implies.`
  },
  {
    id: "1-6",
    number: "1.6",
    title: "Registers: The CPU's Working Memory",
    content: `Registers are the fastest memory in your computer — built directly into the CPU chip.

| Memory Level | Access Time | Relative Speed |
|---|---|---|
| Register | ~0.3 ns | 1× |
| L1 Cache | ~1-4 ns | 3-13× slower |
| L2 Cache | ~4-14 ns | 13-47× slower |
| L3 Cache | ~30-70 ns | 100-230× slower |
| RAM | ~50-100 ns | 165-330× slower |
| SSD | ~10-100 μs | 33,000-330,000× slower |

Registers are not just fast — they are *incomparably* fast.

---

**x86-64 Registers**

\`\`\`
RAX, RBX, RCX, RDX   ← General arithmetic
RSI, RDI              ← Source/Destination index
RSP                   ← Stack Pointer
RBP                   ← Base Pointer
R8-R15                ← Additional general purpose
RIP                   ← Instruction Pointer (next instruction)
RFLAGS               ← Condition flags (zero, overflow, carry...)
\`\`\`

The 16 general-purpose registers hold 128 bytes total. That's the CPU's entire working scratchpad.

---

**Register Allocation**

Your variables (\`temperature\`, \`userId\`) must be mapped to registers (\`RAX\`, \`RBX\`). The compiler does this — it's called **register allocation**, solved using graph-coloring algorithms.

If you have more live variables than registers, the compiler **spills** variables to the stack in RAM — dramatically slower.

\`\`\`c
int a=1, b=2, c=3, d=4;
return a + b + c + d;
// Compiler output:
// mov eax, 1   ; RAX = 1
// add eax, 2   ; RAX = 3
// add eax, 3   ; RAX = 6
// add eax, 4   ; RAX = 10
// ret          ; return RAX
\`\`\`

All computation in registers. Zero memory accesses.

---

**The RIP Register**

The Instruction Pointer always contains the address of the next instruction to execute. Every bug involving "execution jumping to the wrong place" — stack overflows corrupting RIP, function pointer errors, return-oriented programming attacks — involves RIP being set to an unintended value.`
  },
  {
    id: "1-7",
    number: "1.7",
    title: "The Fetch-Decode-Execute-Writeback Cycle",
    content: `The CPU executes your program by repeating a cycle, billions of times per second.

---

**The Four Stages**

**Stage 1: FETCH**
The CPU reads the next instruction from memory using RIP. If the instruction is in L1 cache: ~1ns. If it must come from RAM: ~100ns. After fetching, RIP advances to the next instruction.

**Stage 2: DECODE**
The instruction is a pattern of bits. The CPU figures out what it means: what operation, what operands, where to store the result. Modern CPUs decode multiple instructions per cycle.

**Stage 3: EXECUTE**
The actual computation. The ALU performs the operation, the memory unit loads/stores data, or the branch unit evaluates a condition.

**Stage 4: WRITEBACK**
The result is written back to a register (or to memory for store operations).

---

**A Concrete Example**

\`\`\`c
int add(int a, int b) { return a + b; }
// Arguments in RDI and RSI on x86-64
// add_func:
//   mov eax, edi    ; copy a to EAX
//   add eax, esi    ; add b to EAX
//   ret             ; return EAX
\`\`\`

Tracing \`add eax, esi\`:
1. **Fetch**: Read bytes encoding \`add eax, esi\` (likely from L1 cache). RIP advances.
2. **Decode**: Identify ADD operation with operands EAX and ESI.
3. **Execute**: ALU reads EAX and ESI, adds them.
4. **Writeback**: Sum written to EAX.

Elapsed: ~1 clock cycle (0.3 nanoseconds at 3 GHz).

---

**Why This Matters**

- **Branch mispredictions are expensive**: Wrong guess = flush the pipeline = 10-20 wasted cycles
- **Cache misses stall the entire pipeline**: CPU sits idle waiting for RAM
- **Instruction count matters**: Every instruction requires a full cycle; tight inner loops need minimal instructions`
  },
  {
    id: "1-8",
    number: "1.8",
    title: "Pipelining: Instruction-Level Parallelism",
    content: `Without pipelining, the CPU would sit idle while each stage waits for the previous one. Pipelining fixes this — like an assembly line.

---

**The Pipeline in Action**

\`\`\`
Cycle:    1      2      3      4      5      6
Instr 1: FETCH  DECODE EXEC   WRITE
Instr 2:        FETCH  DECODE EXEC   WRITE
Instr 3:               FETCH  DECODE EXEC   WRITE
Instr 4:                      FETCH  DECODE EXEC  WRITE
\`\`\`

By cycle 4, all four stages are busy simultaneously. A 4-stage pipeline processes one instruction per clock cycle in steady state — a 4× throughput improvement over sequential processing.

---

**Real CPUs: Deeper Pipelines**

Modern CPUs have 14-20+ stage pipelines. Each stage does a smaller, faster piece of work — enabling higher clock speeds. The trade-off: deeper pipelines have higher **branch misprediction penalties**.

Intel's Pentium 4 pushed to 31 stages for high clock speeds — and suffered brutally from mispredictions. The successor Core architecture returned to shorter pipelines. A real engineering lesson about trade-offs.

---

**Pipeline Hazards**

**Data Hazards**: Instruction N+1 needs a result N hasn't produced yet.
\`\`\`asm
add rax, rbx    ; RAX = RAX + RBX
add rcx, rax   ; Needs RAX before it's ready!
\`\`\`
Fix: **forwarding** — route the output directly to the next stage's input.

**Control Hazards**: Conditional branches — the CPU doesn't know which instruction to fetch next. Fix: branch prediction (Section 1.10).

**Structural Hazards**: Two instructions need the same hardware resource. Fix: duplicate units (multiple ALUs, multiple load/store ports).

---

**The Takeaway**

Pipelining is why your CPU processes one instruction per clock cycle on average. Your tight loop's iterations execute simultaneously in different pipeline stages. Unpredictable branches cause flushes. Sequential, predictable code keeps the pipeline full.`
  },
  {
    id: "1-12",
    number: "1.12",
    title: "The Memory Hierarchy: The Most Important Performance Reality",
    content: `If you take one thing from this chapter, take this section.

The single biggest cause of slow software is **memory access patterns** — not bad algorithms, not poor language choice, not CPU speed.

---

**The Speed Gap Problem**

In 1990, the gap between CPU speed and RAM speed was about 10×. Today it's about **300×**. Every time your program accesses a variable that isn't in cache, your CPU sits idle for hundreds of cycles.

This is the **memory wall** — the defining performance problem of modern computing.

---

**The Hierarchy**

\`\`\`
                SIZE        SPEED       LATENCY
┌─────────────┐
│  Registers  │  ~128 B    Instant       0.3 ns
├─────────────┤
│  L1 Cache   │  32-64 KB  Ext. fast     1-4 ns
├─────────────┤
│  L2 Cache   │  256KB-1MB Very fast     4-14 ns
├─────────────┤
│  L3 Cache   │  4-64 MB   Fast         30-70 ns
├─────────────┤
│     RAM     │  8-256 GB  Slow        50-100 ns
├─────────────┤
│     SSD     │  512GB-8TB Very slow   10-100 μs
└─────────────┘
\`\`\`

The difference between an L1 hit and a RAM miss is **~100×**. In a tight loop running millions of times, this dominates everything.

---

**Cache Lines: The Unit of Transfer**

Data never moves between levels one byte at a time. It moves in **64-byte cache lines**.

When you read one byte from RAM, the CPU fetches an entire 64-byte block containing that byte.

**Spatial locality matters**: If you read data[0], the cache line also contains data[1]–data[15]. Reading them next is essentially free. This is why iterating arrays in order is fast.

**Random access is expensive**: Following linked-list pointers or doing hash table lookups with poor locality triggers a new cache miss on each access — this is why arrays often outperform linked lists despite identical algorithmic complexity.

---

**A Real Performance Example**

\`\`\`python
# Row-major: sequential memory access — cache-friendly
for i in range(N):
    for j in range(N):
        total += matrix[i][j]

# Column-major: jumps N*8 bytes each access — cache-thrashing
for j in range(N):
    for i in range(N):
        total += matrix[i][j]
\`\`\`

On a 1000×1000 matrix, the column-major version is **5-20× slower** with identical arithmetic.

**From now on**: when you design data structures or algorithms, always ask: Will this data be accessed sequentially or randomly? How large is it relative to L1/L2/L3 cache sizes? Are the next elements I'll access nearby in memory?

This analysis separates engineers who make code fast from those who can't figure out why it's slow.`
  },
];
