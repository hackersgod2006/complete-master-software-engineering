import type { Section } from '../types';

export const CH02_ORIGINAL_SECTIONS: Section[] = [
  {
    id: "2-1",
    number: "2.1",
    title: "Why Number Representation Is Not Trivial",
    content: `In 1996, the Ariane 5 rocket exploded 37 seconds after launch, destroying a payload worth $500 million. The cause: a 64-bit floating point number was converted to a 16-bit signed integer. The value was too large for 16 bits. The software threw an exception. The exception wasn't handled. The rocket self-destructed.

In 2014, Heartbleed allowed attackers to read private memory from servers running OpenSSL — certificates, private keys, passwords. The cause: a 16-bit integer described the length of a "heartbeat" message, but the actual message could be shorter than its claimed length. The code trusted the length value and read beyond the actual data.

Number representation is the source of real, catastrophic, expensive bugs. Understanding it deeply is the difference between engineers who reason about their code at every level and those who are perpetually surprised.

---

**The Core Problem**

Mathematics has infinitely many integers and infinitely precise real numbers. Computers have finite memory.

This mismatch means computers can only represent a *finite subset* of numbers. When your code performs arithmetic, it operates within a specific, limited representation — and the rules of that representation govern what happens when values exceed the representable range or when precision is lost.

If you don't know those rules, you will write bugs.

---

**What You Will Learn**

- **Binary**: How integers are represented as patterns of bits
- **Two's complement**: How computers represent negative integers, and why integer overflow works the way it does
- **IEEE 754 floating point**: Why \`0.1 + 0.2 != 0.3\` in most languages
- **Unicode and UTF-8**: How text is encoded
- **Endianness**: Why bytes can be ordered differently on different systems

Each connects directly to real bugs, security vulnerabilities, and performance issues you will encounter in your career.`
  },
  {
    id: "2-2",
    number: "2.2",
    title: "Binary: The Complete Treatment",
    content: `Binary is base-2: each digit can only be 0 or 1. Every bit position represents a power of 2.

---

**Reading Binary**

\`\`\`
Binary:   1  0  1  1  0  1
Position: 5  4  3  2  1  0

Value: 1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1
     = 32 + 0 + 8 + 4 + 0 + 1
     = 45
\`\`\`

---

**Converting Decimal to Binary**

Repeatedly divide by 2, recording the remainder. Read remainders from bottom to top.

\`\`\`
Convert 45:
45 ÷ 2 = 22 remainder 1  ↑ (LSB)
22 ÷ 2 = 11 remainder 0  ↑
11 ÷ 2 =  5 remainder 1  ↑
 5 ÷ 2 =  2 remainder 1  ↑
 2 ÷ 2 =  1 remainder 0  ↑
 1 ÷ 2 =  0 remainder 1  ↑ (MSB)

Result: 101101 ✓
\`\`\`

---

**Why Base 2?**

Transistors have two stable states: voltage high or low. Binary maps perfectly onto this. Base 10 would require 10 stable voltage levels — vastly harder to engineer reliably. Binary is not a choice — it is the inevitable consequence of transistor physics.

---

**Practical Groupings**

| Name | Bits | Max Value |
|------|------|-----------|
| Bit | 1 | 1 |
| Nibble | 4 | 15 |
| Byte | 8 | 255 |
| Word | 16 | 65,535 |
| Dword | 32 | 4,294,967,295 |
| Qword | 64 | 18,446,744,073,709,551,615 |

---

**Bit Manipulation Fundamentals**

\`\`\`python
# Check if bit N is set
def is_bit_set(number, n): return bool(number & (1 << n))

# Set bit N
def set_bit(number, n): return number | (1 << n)

# Clear bit N
def clear_bit(number, n): return number & ~(1 << n)

# Toggle bit N
def toggle_bit(number, n): return number ^ (1 << n)
\`\`\`

\`1 << n\` shifts the bit 1 left by n positions — creating a mask with exactly one bit set.`
  },
];
