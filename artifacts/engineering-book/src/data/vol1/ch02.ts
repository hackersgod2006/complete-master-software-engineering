import type { Section } from '../types';

export const CH02_SECTIONS: Section[] = [
  {
    id: "2-3",
    number: "2.3",
    title: "Hexadecimal and Octal",
    content: `While binary (base-2) is the language of the machine, it is nearly unreadable for humans. Reading a 64-bit memory address in binary (\`01111111 11111111 ...\`) is an exercise in futility. To bridge this gap, engineers use **Hexadecimal** (base-16) and, occasionally, **Octal** (base-8).

## Hexadecimal: The Perfect Binary Companion
Hexadecimal is the standard shorthand for binary because $16$ is a power of $2$ ($2^4$). This means exactly **four binary bits** (a "nibble") map to exactly **one hex digit**.

| Hex | Binary | Decimal | Hex | Binary | Decimal |
| :-- | :--- | :-- | :-- | :--- | :-- |
| 0 | 0000 | 0 | 8 | 1000 | 8 |
| 1 | 0001 | 1 | 9 | 1001 | 9 |
| 2 | 0010 | 2 | A | 1010 | 10 |
| 3 | 0011 | 3 | B | 1011 | 11 |
| 4 | 0100 | 4 | C | 1100 | 12 |
| 5 | 0101 | 5 | D | 1101 | 13 |
| 6 | 0110 | 6 | E | 1110 | 14 |
| 7 | 0111 | 7 | F | 1111 | 15 |

When you see a memory address like \`0x7FFF\`, you can instantly translate it: \`7\` is \`0111\`, and \`F\` is \`1111\`. The address is \`0111 1111 1111 1111\`.

## Octal: The Linux Permission Specialist
Octal (base-8) uses digits 0-7. Each octal digit represents exactly **three binary bits**. While less common today, it survives in Linux file permissions.

\`\`\`bash
# chmod 755 file.txt
# 7 = 111 (rwx)
# 5 = 101 (r-x)
# 5 = 101 (r-x)
\`\`\`

## Why use base-16 instead of base-10?
In base-10, the boundaries of bytes and words are messy. $255$ is \`0xFF\`. $256$ is \`0x100\`. In decimal, these numbers look unrelated, but in hex, the transition from one byte (8 bits) to two bytes is perfectly clear. For an engineer, hex is "transparent" to the underlying bits.

---
**Key Insight**: Hexadecimal isn't just a different way to count; it's a visualization tool for binary. Every two hex digits is exactly one byte. Learn the 16 digits by heart.`
  },
  {
    id: "2-4",
    number: "2.4",
    title: "Binary Arithmetic: Addition, Subtraction, Multiplication",
    content: `Arithmetic in binary follows the same rules as decimal, but the "carrying" happens much more frequently because each digit can only hold two values (0 or 1).

## Addition
The rules are simple:
- \`0 + 0 = 0\`
- \`0 + 1 = 1\`
- \`1 + 1 = 0\` (carry 1)
- \`1 + 1 + 1 = 1\` (carry 1)

Example: \`5 + 6\` (in 4-bit binary)
\`\`\`
  0101 (5)
+ 0110 (6)
------
  1011 (11)
\`\`\`

## Subtraction (The Secret Trick)
In modern hardware, we rarely perform "subtraction" directly. Instead, we use **Two's Complement** to turn subtraction into addition. To calculate \`A - B\`, the CPU calculates \`A + (-B)\`. We will cover Two's Complement in depth in section 2.7, but for now, know that addition is the primary operation of the ALU.

## Multiplication: Shift and Add
Binary multiplication is actually easier than decimal because you are only ever multiplying by 0 or 1.
- To multiply by 2: **Shift left by 1 bit** (\`0101\` (5) becomes \`1010\` (10)).
- To multiply by any other number: The CPU uses a "Shift and Add" algorithm.

\`\`\`python
# Pseudocode for 5 * 3
# 5 is 101, 3 is 011
result = 0
# 3 is 2^1 + 2^0
# result = (5 << 1) + (5 << 0)
# result = 10 + 5 = 15
\`\`\`

## Hardware Implementation
Inside the CPU, these operations are performed by the **ALU (Arithmetic Logic Unit)** using gates like XOR (for the sum) and AND (for the carry). While a human might take time to carry digits, a modern ALU uses **Carry-Lookahead Adders** to calculate the carries for 64 bits almost instantaneously.

---
**Key Insight**: All complex math in a computer—from physics simulations to AI—is ultimately built upon these simple bitwise additions and shifts. Efficiency at this level is what makes modern computing possible.`
  },
  {
    id: "2-5",
    number: "2.5",
    title: "Bit Manipulation: The Core Skill",
    content: `To a high-level programmer, a number is just a value. To a software engineer, a number is a **collection of switches**. Bit manipulation is the art of flipping those switches to store data compactly and perform logic at lightning speed.

## The Core Operators
1.  **AND (&)**: Returns 1 if *both* bits are 1. Used for "masking" (extracting bits).
2.  **OR (|)**: Returns 1 if *either* bit is 1. Used for setting bits.
3.  **XOR (^)**: Returns 1 if bits are *different*. Used for flipping bits and fast equality checks.
4.  **NOT (~)**: Flips all bits.
5.  **Shifts (<<, >>)**: Moves bits left or right.

## Common Techniques

### 1. Masking (Extracting a value)
Suppose you have a 32-bit integer where the last 8 bits represent a color's "Alpha" channel.
\`\`\`c
uint32_t color = 0x123456FF;
uint8_t alpha = color & 0xFF; // result: 0xFF
\`\`\`

### 2. Packing Data
In memory-constrained environments, you can pack multiple values into one integer.
\`\`\`c
// Store three 4-bit values in one 16-bit int
uint16_t packed = (val1 << 8) | (val2 << 4) | val3;
\`\`\`

### 3. The Power of XOR
XOR has a unique property: \`A ^ B ^ B = A\`. This is the basis for many RAID algorithms and simple "obfuscation" ciphers. It's also used to swap two variables without a temporary one:
\`\`\`c
x = x ^ y;
y = x ^ y;
x = x ^ y;
\`\`\`

### 4. Checking for Power of Two
A classic interview question that reveals hardware knowledge:
\`\`\`c
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
// Why? Power of 2 (e.g., 1000) minus 1 is (0111). ANDing them gives 0.
\`\`\`

---
**Key Insight**: Bitwise operations are single-cycle instructions on every CPU. Whenever you can replace a complex condition or a division with a bitmask or a shift, you are working *with* the hardware's natural language.`
  },
  {
    id: "2-6",
    number: "2.6",
    title: "Unsigned Integers: Ranges and Overflow",
    content: `An **Unsigned Integer** is the simplest way to represent a number: every bit contributes to a positive value. For $N$ bits, the range is $[0, 2^N - 1]$.

| Size | Bits | Max Value (Approx) | Exact Max |
| :--- | :--- | :--- | :--- |
| Byte | 8 | 255 | $2^8 - 1$ |
| Word | 16 | 65,535 | $2^{16} - 1$ |
| DWord | 32 | 4.29 Billion | $2^{32} - 1$ |
| QWord | 64 | 18.4 Quintillion | $2^{64} - 1$ |

## The Mechanics of Overflow
What happens when you add \`1\` to the maximum value?
In a 4-bit system, the max is \`1111\` (15).
\`\`\`
  1111 (15)
+ 0001 (1)
------
 10000 (16?)
\`\`\`
But we only have 4 bits! The "1" on the left is lost. The result becomes \`0000\`. This is **Overflow**. The number "wraps around" back to zero.

## Why this is dangerous
In systems programming (C/C++), unsigned overflow is well-defined (it wraps). However, it often leads to catastrophic logic errors.

\`\`\`c
// A dangerous bug
void process(unsigned int count) {
    for (unsigned int i = count; i >= 0; i--) {
        // This loop never terminates! 
        // When i is 0, i-- makes it 4,294,967,295.
    }
}
\`\`\`

## Real-World Example: YouTube and Gangnam Style
YouTube originally stored video view counts as a 32-bit signed integer. When "Gangnam Style" hit 2,147,483,647 views, the next view caused an overflow into the negative. YouTube had to quickly upgrade their database to 64-bit integers.

---
**Key Insight**: Always choose your integer size based on the *maximum possible* value. If there's any chance of exceeding $2^{32}$, move to 64-bit immediately. In modern 64-bit systems, there is almost no performance penalty for using \`uint64_t\` instead of \`uint32_t\`.`
  },
  {
    id: "2-7",
    number: "2.7",
    title: "Signed Integers: Two's Complement — Complete Treatment",
    content: `How do we represent negative numbers in binary? We could just use one bit for the "sign" (Sign-Magnitude), but that leads to two problems: it gives us two zeros (\`+0\` and \`-0\`) and it makes the hardware for addition and subtraction different.

The solution used by virtually every computer in existence is **Two's Complement**.

## The Algorithm
To represent a negative number:
1.  Start with the positive binary version.
2.  Invert all the bits (NOT).
3.  Add 1.

Example: Representing \`-5\` in 4-bit:
1.  \`5\` is \`0101\`.
2.  Invert: \`1010\`.
3.  Add 1: \`1011\`.
So, \`-5\` is \`1011\`.

## Why It's Brilliant: Unified Math
In Two's Complement, subtraction is just addition. Let's calculate \`7 - 5\`:
\`\`\`
  0111 (7)
+ 1011 (-5)
------
 10010 
\`\`\`
Drop the extra carry bit: \`0010\`. Which is \`2\`. It works perfectly! The CPU doesn't need a "subtractor" circuit; it only needs an "adder."

## The Most Significant Bit (MSB)
In Two's Complement, the highest bit is the **Sign Bit**. 
- If it's \`0\`, the number is positive.
- If it's \`1\`, the number is negative.

## Range and Asymmetry
Because we use one bit for the sign, the range of an $N$-bit signed integer is $[-2^{N-1}, 2^{N-1} - 1]$.
For 8 bits: \`-128\` to \`127\`.
Notice it is **asymmetric**. There is one more negative number than positive because \`0\` takes up one of the "positive" slots. This is why \`abs(-128)\` on an 8-bit integer is a famous source of bugs—the value \`128\` cannot be represented!

---
**Key Insight**: Two's Complement is a mathematical hack that makes hardware simpler. It turns the number line into a circle, where moving past the max positive number leads you to the most negative number.`
  },
  {
    id: "2-8",
    number: "2.8",
    title: "Integer Overflow: The Source of Critical Bugs",
    content: `While unsigned overflow is "wrap-around," signed overflow is **Undefined Behavior (UB)** in C and C++. This means the compiler is allowed to assume it *never* happens, which can lead to the optimizer deleting your security checks.

## The Logic of Overflow Bugs
Consider an allocation check:
\`\`\`c
void* alloc_array(size_t element_size, size_t count) {
    // Potential overflow: count * element_size could wrap!
    if (count * element_size > MAX_MEMORY) return NULL;
    return malloc(count * element_size);
}
\`\`\`
If \`count\` is very large, the multiplication might overflow and return a small number (e.g., 100). The check passes, but \`malloc\` only allocates 100 bytes. When you later write to the "large" array, you trigger a **Buffer Overflow**, allowing for remote code execution.

## Famous Failures
- **Ariane 5**: A 64-bit float was converted to a 16-bit signed integer. The value was larger than 32,767, causing an overflow. The flight computer crashed, and the rocket exploded 37 seconds after launch.
- **Boeing 787**: A counter tracking the time since boot would overflow after 248 days, causing the electrical generators to shut down. The fix? Reboot every 247 days.

## Prevention
1.  **Use 64-bit**: Unless you have a specific reason not to, use \`int64_t\` for counts and sizes.
2.  **Checked Arithmetic**: Modern languages like Rust check for overflow by default in debug mode. In C, use built-ins: \`__builtin_mul_overflow(a, b, &res)\`.
3.  **Static Analysis**: Tools like Clang's Thread Sanitizer or UBSan can catch these at runtime.

---
**Key Insight**: Overflow is not a "hardware error"—the hardware is doing exactly what it's told. It is a **semantic error** where the programmer's mental model of "infinite numbers" clashes with the machine's finite bits.`
  },
  {
    id: "2-9",
    number: "2.9",
    title: "IEEE 754 Floating Point: The Complete Specification",
    content: `Integers are easy. But how do we represent $3.14159$, or $0.000000001$? We use **Scientific Notation**, but in binary. The global standard for this is **IEEE 754**.

A floating-point number is divided into three parts:
1.  **Sign Bit** (1 bit): 0 for positive, 1 for negative.
2.  **Exponent**: Determines the scale (the "floating" part).
3.  **Fraction (Mantissa/Significand)**: The actual digits of the number.

## Single Precision (32-bit / \`float\`)
- 1 sign bit
- 8 exponent bits (biased by 127)
- 23 fraction bits

## Double Precision (64-bit / \`double\`)
- 1 sign bit
- 11 exponent bits (biased by 1023)
- 52 fraction bits

## The "Implicit Leading One"
To save a bit, IEEE 754 assumes every number (except zero) starts with a \`1\`. In binary scientific notation, you always normalize to \`1.xxxxx * 2^y\`. Since the first digit is always \`1\`, we don't need to store it! This gives 23-bit floats the precision of 24 bits.

## Why "Floating"?
The "decimal point" (binary point) floats because the exponent can move it.
\`\`\`
Value = (-1)^sign * (1 + fraction) * 2^(exponent - bias)
\`\`\`

## Precision Limits
A 32-bit float has about **7 decimal digits** of precision. A 64-bit double has about **15-17 digits**. This is why financial systems *never* use floats—they use "Fixed Point" or decimal strings to avoid losing pennies in rounding errors.

---
**Key Insight**: Floating point is an approximation. It is designed for speed and range (representing stars and atoms), not for perfect accuracy. Never use \`==\` to compare two floats.`
  },
  {
    id: "2-10",
    number: "2.10",
    title: "Floating Point Arithmetic Pitfalls",
    content: `The most important thing to understand about floating point is that **addition is not associative**. In math, \`(a + b) + c\` always equals \`a + (b + c)\`. In computers, this is not guaranteed.

## Precision Loss (Catastrophic Cancellation)
When you add a very large number and a very small number, the small number might simply disappear.
\`\`\`js
let x = 10000000000000000.0;
let y = 1.0;
console.log(x + y === x); // true!
\`\`\`
The exponent of \`x\` is so large that the \`1.0\` falls off the end of the 52-bit mantissa. This is why adding a list of numbers should always be done from smallest to largest to preserve precision.

## The Binary Gap
Many decimal numbers like \`0.1\` or \`0.2\` have **no exact representation** in binary. They become repeating fractions, much like \`1/3\` is \`0.333...\` in decimal.

\`\`\`js
console.log(0.1 + 0.2); // 0.30000000000000004
\`\`\`

## Comparing Floats: The Epsilon
Because of these rounding errors, you must use an **Epsilon** (a tiny tolerance) for comparisons.

\`\`\`c
// WRONG
if (x == 0.3) { ... }

// RIGHT
if (fabs(x - 0.3) < 1e-9) { ... }
\`\`\`

## Subnormal Numbers
When a number gets extremely close to zero, it becomes a "subnormal" (or denormal). Processing these is often **10x to 100x slower** on older CPUs because the hardware has to fall back to a special microcode path. High-performance apps (like audio processors) often set the "Flush to Zero" (FTZ) flag to treat these tiny values as zero.

---
**Key Insight**: Treat floats like physical measurements: they have an inherent "margin of error." If you need exactness (like in accounting), use integers representing cents or a decimal library.`
  },
  {
    id: "2-11",
    number: "2.11",
    title: "Special Values: NaN, Infinity, Negative Zero, Subnormals",
    content: `IEEE 754 isn't just for numbers; it also defines how to handle "impossible" math. It reserves specific bit patterns in the exponent and mantissa for special states.

## Infinity (\`inf\`)
When you divide by zero (\`1.0 / 0.0\`), you don't get a crash; you get **Infinity**. There is both a positive and a negative infinity. Any number added to infinity is still infinity.

## Not a Number (\`NaN\`)
What is \`0.0 / 0.0\` or \`sqrt(-1)\`? These results are undefined. The CPU returns **NaN**.
A unique property of NaN: **it is not equal to anything, including itself.**
\`\`\`js
let x = NaN;
console.log(x == x); // false
\`\`\`
This is the standard way to check for NaN: \`if (x != x) { /* it's NaN */ }\`.

## Negative Zero (\`-0.0\`)
Because there is a dedicated sign bit, floating point has two zeros. While \`0.0 == -0.0\` is true, they behave differently in some cases:
- \`1.0 / 0.0 = +inf\`
- \`1.0 / -0.0 = -inf\`

## Signaling vs. Quiet NaN
- **Quiet NaN (qNaN)**: The most common type. It propagates through calculations without raising an error.
- **Signaling NaN (sNaN)**: Designed to trigger a hardware exception immediately. Useful for catching uninitialized variables in debug mode.

## The NaN-Boxing Trick
Modern JavaScript engines (like V8) use a technique called **NaN-Boxing**. Since a 64-bit float has many bit patterns that represent NaN, the engine uses those "extra" patterns to store other data types (like pointers or booleans) inside a single 64-bit slot. This makes the garbage collector's job much easier.

---
**Key Insight**: IEEE 754's special values allow a program to continue running after a math error rather than crashing. As a developer, you must check for \`isNaN()\` before using results from complex calculations.`
  },
  {
    id: "2-12",
    number: "2.12",
    title: "Kahan Summation and Numerical Stability",
    content: `As we saw in Section 2.10, adding a large number of floats can lead to massive "drift" in the result because smaller values are truncated. If you are summing millions of values (e.g., in a weather simulation or a neural network), this drift can ruin the model.

**Kahan Summation** is an algorithm that tracks the "lost" precision and injects it back into the next step.

## The Algorithm
Instead of a simple \`sum += value\`, Kahan uses a "compensation" variable.

\`\`\`python
def kahan_sum(input_list):
    sum = 0.0
    c = 0.0 # A running compensation for lost low-order bits.
    for x in input_list:
        y = x - c     # Subtract the compensation from the current value
        t = sum + y   # Sum is big, y is small. Low bits of y are lost here.
        c = (t - sum) - y # (t-sum) recovers the high bits of y. 
                          # Subtracting y leaves the negated low bits.
        sum = t
    return sum
\`\`\`

## Numerical Stability
A "numerically stable" algorithm is one where small errors in input or intermediate steps don't blow up into huge errors in the output.
- **Stable**: Kahan Summation, Merge Sort (on data indices).
- **Unstable**: Naive matrix inversion, high-degree polynomial interpolation.

## Compensated Arithmetic in Hardware
Some modern CPUs and GPUs provide instructions for "Fused Multiply-Add" (**FMA**). \`FMA(a, b, c)\` calculates \`(a * b) + c\` with a single rounding step at the end, rather than two. This is not only faster but significantly more accurate.

---
**Key Insight**: Accuracy is an engineering choice. If your totals don't match your expectations, don't blame the hardware; check your algorithm's numerical stability. Use Kahan summation when precision is non-negotiable.`
  },
  {
    id: "2-13",
    number: "2.13",
    title: "ASCII: The Foundation",
    content: `How do we turn bits into letters? We use a **Character Encoding**. The grandparent of all modern encodings is **ASCII** (American Standard Code for Information Interchange).

Created in 1963, ASCII uses **7 bits** to represent 128 characters.
- **0-31**: Control Characters (non-printable things like "Line Feed", "Carriage Return", "Bell").
- **48-57**: Digits \`0-9\`.
- **65-90**: Uppercase \`A-Z\`.
- **97-122**: Lowercase \`a-z\`.

## The 8th Bit: Extended ASCII
Since computers work in 8-bit bytes, the 8th bit was originally "wasted." Soon, different companies used that 8th bit to add 128 more characters (like \`é\` or \`Ω\`). This led to **"Code Pages."** A file saved on a DOS machine (Code Page 437) would look like gibberish on a Windows machine (Windows-1252). This was the "Dark Ages" of text encoding.

## Key ASCII Properties
ASCII was designed cleverly:
1.  **Lowercase/Uppercase**: To convert 'A' to 'a', you just flip the 6th bit (\`0x41\` vs \`0x61\`).
2.  **Digit conversion**: To get the integer \`5\` from the character \`'5'\`, you just subtract \`0x30\`.
3.  **Sortability**: ASCII order matches alphabetical order, making \`string < string\` comparisons simple subtraction.

## Why it still matters
ASCII is the "common denominator" of the internet. Most protocols (HTTP, SMTP, DNS) still use ASCII for their headers. Almost every modern encoding (like UTF-8) is **backward compatible** with ASCII.

---
**Key Insight**: ASCII is the bedrock of text. While it only supports English, its simplicity and efficiency made it the standard that all subsequent systems had to respect.`
  },
  {
    id: "2-14",
    number: "2.14",
    title: "Unicode: The Universal Standard",
    content: `The chaos of "Code Pages" made global software impossible. **Unicode** was created to solve this by assigning a unique number, called a **Code Point**, to every character in every language on Earth.

## Code Points
Unicode is not an encoding (like UTF-8); it is a **mapping**.
- The code point for 'A' is \`U+0041\`.
- The code point for 'π' is \`U+03C0\`.
- The code point for '😂' is \`U+1F602\`.

Unicode currently defines over 140,000 characters across 160 modern and historic scripts.

## The Structure of Unicode
1.  **Basic Multilingual Plane (BMP)**: The first 65,536 code points (\`U+0000\` to \`U+FFFF\`). This contains almost everything you use daily.
2.  **Supplementary Planes**: Used for historic scripts, musical symbols, and emojis (\`U+10000\` and above).

## Characters vs. Glyphs
Unicode separates the *identity* of a character from its *appearance*. One code point (the character) can be rendered as many different "glyphs" depending on the font. Furthermore, one "perceived character" (like \`é\`) can be represented as:
- A single code point: \`U+00E9\` (Precomposed).
- Two code points: \`U+0065\` (e) + \`U+0301\` (combining accent).

This is why string \`length\` is a nightmare in modern programming. Does "é" have length 1 or 2?

---
**Key Insight**: Unicode is the "Dictionary of Humanity." It ensures that a specific bit pattern means the same thing in Tokyo as it does in New York. To use it effectively, you must understand the difference between a Code Point (the ID) and an Encoding (how the ID is stored).`
  },
  {
    id: "2-15",
    number: "2.15",
    title: "UTF-8: The Encoding That Won",
    content: `If Unicode is the map, **UTF-8** is the transport. It is a **Variable-Width** encoding that stores Unicode code points using 1 to 4 bytes.

## How it works: The Prefix Rule
UTF-8 is brilliant because it is self-synchronizing. You can tell how many bytes a character uses just by looking at the first byte:
- \`0xxxxxxx\`: 1 byte (0-127, exact match for ASCII).
- \`110xxxxx\`: 2 bytes.
- \`1110xxxx\`: 3 bytes.
- \`11110xxx\`: 4 bytes.
- All continuation bytes start with \`10xxxxxx\`.

## Why UTF-8 won the internet
1.  **Backward Compatibility**: Any valid ASCII file is also a valid UTF-8 file. This allowed the web to transition without breaking old systems.
2.  **Efficiency**: For English and code (mostly ASCII), it is twice as compact as UTF-16.
3.  **Self-Correction**: If a byte is lost during transmission, you only lose that one character. You can find the start of the next character by looking for the next byte that doesn't start with \`10\`.
4.  **No Endianness**: UTF-8 treats everything as a sequence of bytes, so there's no "Big vs Little Endian" confusion (unlike UTF-16).

## Complexity for Programmers
The "Variable-Width" nature means you can no longer find the $N$-th character in $O(1)$ time. To find the 100th character, you must scan from the beginning and count how many "start bytes" you see.

\`\`\`python
# Python strings are Unicode, but internally use a flexible representation
s = "Hello 😂"
print(len(s)) # 7 (the emoji is 1 character)
print(len(s.encode('utf-8'))) # 10 (the emoji is 4 bytes)
\`\`\`

---
**Key Insight**: UTF-8 is the default choice for 99% of use cases. It is the gold standard for storage and transmission. Always use UTF-8 unless you have a very specific, benchmarked reason to use something else.`
  },
  {
    id: "2-16",
    number: "2.16",
    title: "UTF-16 and the Surrogate Pair Trap",
    content: `While UTF-8 won the web, **UTF-16** is still common because it's the internal encoding for Windows, Java, and JavaScript. It uses 2 bytes for characters in the BMP and 4 bytes for everything else.

## The Surrogate Pair
Since a 16-bit number only goes up to 65,535, UTF-16 cannot represent emojis or rare scripts directly. It uses **Surrogate Pairs**: two 16-bit values that work together to point to a single code point in the higher planes.

Example: \`😂\` (\`U+1F602\`) in UTF-16 is \`0xD83D 0xDE02\`.

## The Great JavaScript Bug
Because JavaScript was designed in 10 days in 1995 (when Unicode was smaller), it treats strings as sequences of 16-bit units.
\`\`\`js
console.log("😂".length); // 2
console.log("😂"[0]);     // "\ud83d" (gibberish)
\`\`\`
This "leak" of the internal encoding into the language semantics causes endless bugs in text processing, especially with emojis.

## Endianness and the BOM
Because UTF-16 uses 16-bit "words," it is sensitive to the CPU's endianness. To solve this, files often start with a **Byte Order Mark (BOM)**: \`0xFEFF\`. If you see \`0xFFFE\`, you know the bytes are swapped.

## When to use UTF-16?
In modern engineering, the answer is "almost never," unless you are interacting with a legacy Windows API or a Java/JVM internal. The overhead of surrogate pairs and the lack of ASCII compatibility make it inferior to UTF-8 for most tasks.

---
**Key Insight**: If you work in JS, Java, or C#, remember that \`.length\` measures **memory units**, not **characters**. Use iterators or modern string methods (\`Array.from(str)\` in JS) to handle Unicode correctly.`
  },
  {
    id: "2-17",
    number: "2.17",
    title: "Endianness: Big vs Little",
    content: `When a number is larger than one byte (like a 32-bit \`int\`), how do we store its bytes in memory? There are two philosophies:

1.  **Big-Endian (BE)**: Store the "big end" (most significant byte) first. This is how we write numbers in human language. \`0x12345678\` is stored as \`12 34 56 78\`.
2.  **Little-Endian (LE)**: Store the "little end" first. \`0x12345678\` is stored as \`78 56 34 12\`.

## The Victor: Little Endian
Most modern processors (x86, ARM) are Little-Endian. Why? Because it has a slight mathematical advantage: you can cast a 32-bit pointer to an 8-bit pointer and get the same value without any address math. It's more "natural" for the hardware's addition logic.

## The Network Order
While CPUs are Little-Endian, **the Internet is Big-Endian**. TCP/IP specifies that all header values must be sent in Big-Endian. This is called **Network Byte Order**.

As a result, every time your computer sends a packet, it must swap the bytes of the port numbers and IP addresses:
\`\`\`c
// C code to prepare a port for the network
uint16_t port = 80;
uint16_t network_port = htons(port); // "Host TO Network Short"
\`\`\`

## Debugging Nightmares
Endianness is the "invisible wall" of cross-platform development. If you save a binary file on an Intel Mac (LE) and read it on an old PowerPC (BE), your numbers will be scrambled.

---
**Key Insight**: Always define a specific endianness (usually Little-Endian for files, Big-Endian for network) when designing a binary format. Never assume the "other side" has the same byte order as you.`
  },
  {
    id: "2-18",
    number: "2.18",
    title: "Data Representation End-to-End: A Complete Trace",
    content: `Let's pull everything together. Suppose you have the following line of code in a high-level language:
\`\`\`js
const status = { id: 5, active: true, label: "OK" };
\`\`\`

How does the machine see this?

## 1. The Integer (\`id: 5\`)
Stored as a 64-bit signed integer (Standard for JS).
Binary: \`0000...0000 0101\` (8 bytes, Little-Endian).

## 2. The Boolean (\`active: true\`)
In memory, \`true\` is typically stored as the byte \`0x01\`. However, because of **Alignment**, the compiler might pad this to 4 or 8 bytes so that the next field starts on a clean memory boundary.

## 3. The String (\`label: "OK"\`)
In UTF-8:
- \`O\`: \`0x4F\`
- \`K\`: \`0x4B\`
- \`null terminator\`: \`0x00\` (in C strings) or a separate length field.

## 4. The Object Layout
The "Object" doesn't exist to the hardware. The language engine (V8) creates a **Struct** in memory.
| Offset | Data | Raw Hex (LE) |
| :--- | :--- | :--- |
| 0 | ID (8 bytes) | \`05 00 00 00 00 00 00 00\` |
| 8 | Active (1 byte) | \`01\` |
| 9 | Padding (7 bytes) | \`00 00 00 00 00 00 00\` |
| 16 | String Pointer | \`A0 FF 12 00 00 00 00 00\` |

## 5. The Hardware Execution
When you access \`status.id\`, the CPU:
1.  Calculates the address: \`BasePointer + 0\`.
2.  Fetches a 64-byte **Cache Line**.
3.  Loads the 8 bytes into a **Register**.
4.  Performs arithmetic using the **ALU**.

---
**Key Insight**: High-level abstractions are "illusions" that eventually dissolve into offsets, pointers, and raw bytes. Understanding this trace allows you to predict the performance and memory cost of your code.`
  },
  {
    id: "2-19",
    number: "2.19",
    title: "Case Study: Ariane 5 — A $370M Integer Overflow",
    content: `On June 4, 1996, the Ariane 5 rocket exploded 37 seconds after launch. The cause was not a mechanical failure or a fuel leak, but a single line of code involving data representation.

## The Bug
The software was attempting to convert a **64-bit floating-point** value (representing "horizontal bias") into a **16-bit signed integer**.

- The value was: \`32768.0\` (approximately)
- The max 16-bit signed integer is: \`32767\`

When the conversion happened, the number overflowed. In Ada (the language used), this triggered an exception. However, there was no exception handler for this specific conversion. The flight computer shut down, the secondary computer (running the same buggy code) also shut down, and the rocket's nozzles swiveled to their extreme positions, causing the rocket to disintegrate under aerodynamic stress.

## Why did it happen?
The code was reused from the older Ariane 4. The Ariane 4 was slower and its horizontal bias never reached such high values. The engineers assumed the conversion was "safe" and didn't wrap it in an error handler to save on CPU cycles.

## Lessons Learned
1.  **Reuse is Risky**: Code that is "proven" in one environment can be fatal in another if the physical constraints change.
2.  **Implicit Assumptions**: Every time you cast a larger type to a smaller one (Narrowing Conversion), you are making a bet. Always use "checked" casts or explicit bounds checking.
3.  **Fail-Safe Design**: A single software exception shouldn't be able to destroy a half-billion-dollar vehicle.

---
**Key Insight**: Types are not just hints for the compiler; they are the **physical boundaries** of your system. Respecting those boundaries is a matter of safety, not just "clean code."`
  },
  {
    id: "2-20",
    number: "2.20",
    title: "Case Study: Heartbleed — Buffer Arithmetic and Security",
    content: `In 2014, the **Heartbleed** bug exposed two-thirds of the internet's encrypted traffic. It was a perfect example of how a simple misunderstanding of integer sizes can lead to a global security disaster.

## The TLS Heartbeat
The TLS protocol has a "heartbeat" feature:
1.  Client sends a "Payload" (e.g., "HELLO").
2.  Client sends a "Payload Length" (e.g., 5 bytes).
3.  Server allocates memory, copies the payload, and sends it back.

## The Vulnerability
OpenSSL (the library used) trusted the "Payload Length" field without checking it against the *actual* size of the incoming data.

If a hacker sent "HELLO" but said the length was **65,535 bytes**, OpenSSL would:
1.  Allocate 64KB of memory.
2.  Copy "HELLO" (5 bytes) into the start.
3.  **Copy the next 65,530 bytes of whatever happened to be in the server's RAM** and send it back to the hacker.

## The Leak
Because of how memory is reused, that 64KB of "extra" RAM often contained private encryption keys, user passwords, and session cookies from other users.

## The Fix
The fix was a simple bounds check:
\`\`\`c
if (payload_length > actual_record_length) {
    return 0; // Ignore malicious request
}
\`\`\`

---
**Key Insight**: Security is often just "correctness under pressure." Heartbleed wasn't a complex cryptographic failure; it was a failure to validate that a number (the length) matched reality. Always treat lengths and offsets from external sources as untrusted.`
  },
  {
    id: "2-21",
    number: "2.21",
    title: "Exercises",
    content: `Apply your knowledge of binary, floats, and encodings to these real-world problems.

## Questions

1.  **Hex to Binary**: Convert the hex value \`0x3C5A\` to binary.
2.  **Two's Complement**: In an 8-bit signed system, what is the binary representation of \`-1\`?
3.  **Floating Point**: Why does \`0.1 + 0.1 + 0.1 == 0.3\` return \`false\` in most languages?
4.  **Bitwise**: Write a bitmask expression to extract the middle 4 bits of an 8-bit byte.
5.  **UTF-8**: How many bytes does the character 'A' (U+0041) take in UTF-8? How about the emoji '🔥' (U+1F525)?
6.  **Endianness**: If you store the 16-bit integer \`0xABCD\` in Little-Endian memory, what is the value of the first byte?
7.  **Overflow**: You have an unsigned 16-bit integer at its maximum value. You add 10. What is the result?
8.  **NaN**: Explain why \`NaN != NaN\` is a useful feature for developers.

---

## Answers

1.  \`0x3\` = \`0011\`, \`0xC\` = \`1100\`, \`0x5\` = \`0101\`, \`0xA\` = \`1010\`. Total: \`0011110001011010\`.
2.  \`-1\` is always "all bits on" in Two's Complement: \`11111111\`.
3.  \`0.1\` cannot be represented exactly in binary; it is a repeating fraction. The small rounding errors accumulate when added.
4.  \`(byte >> 2) & 0x0F\` (Assuming bits 2, 3, 4, 5 are the "middle").
5.  'A' takes **1 byte** (ASCII compatible). '🔥' takes **4 bytes** (High plane Unicode).
6.  The first byte is \`0xCD\` (the "little end").
7.  $65535 + 1 \to 0$. $0 + 9 = 9$. The result is **9**.
8.  It allows you to detect the result of a failed calculation without the language needing a special \`isNaN\` function in its syntax (though most have one anyway). It ensures that a "corrupted" number never accidentally passes an equality check.`
  }
];
