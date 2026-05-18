import { ChapterQuizData } from '../quizTypes';

export const CH02_QUIZ: ChapterQuizData = {
  chapterId: "ch2",
  sectionQuizzes: {
    "2-1": [
      {
        id: "q-2-1-1",
        question: "Why do computers use binary (base-2) instead of decimal (base-10)?",
        options: [
          "Binary numbers are shorter and easier to read for humans",
          "Binary represents the two stable states of electronic switches (on/off)",
          "Base-10 math is theoretically impossible to implement in silicon",
          "Binary was chosen solely for historical reasons and is now a legacy constraint"
        ],
        correct: 1,
        explanation: "Binary mapping to voltage levels (high/low) is robust against electrical noise compared to distinguishing ten different voltage levels.",
        difficulty: "easy"
      },
      {
        id: "q-2-1-2",
        question: "How many distinct values can be represented by a single byte (8 bits)?",
        options: [
          "128",
          "255",
          "256",
          "512"
        ],
        correct: 2,
        explanation: "2 to the power of 8 equals 256. The range for an unsigned byte is 0 to 255.",
        difficulty: "easy"
      },
      {
        id: "q-2-1-3",
        question: "What is the decimal equivalent of the binary number 1011?",
        options: [
          "9",
          "11",
          "13",
          "15"
        ],
        correct: 1,
        explanation: "(1 * 2^3) + (0 * 2^2) + (1 * 2^1) + (1 * 2^0) = 8 + 0 + 2 + 1 = 11.",
        difficulty: "medium"
      }
    ],
    "2-2": [
      {
        id: "q-2-2-1",
        question: "Why is hexadecimal frequently used in software engineering?",
        options: [
          "It is the native language of the CPU",
          "It provides a compact representation of binary data where 1 hex digit equals 4 bits",
          "It is faster for the computer to process than binary",
          "It allows for better encryption of memory addresses"
        ],
        correct: 1,
        explanation: "Hexadecimal is a 'shorthand' for binary. Two hex digits represent one byte (8 bits), making it ideal for inspecting memory and registers.",
        difficulty: "easy"
      },
      {
        id: "q-2-2-2",
        question: "What is the hexadecimal representation of the decimal number 255?",
        options: [
          "0x100",
          "0xFE",
          "0xFF",
          "0xAA"
        ],
        correct: 2,
        explanation: "255 in binary is 1111 1111, which maps to F and F in hex.",
        difficulty: "medium"
      },
      {
        id: "q-2-2-3",
        question: "Convert 0x2A to decimal.",
        options: [
          "24",
          "32",
          "42",
          "52"
        ],
        correct: 2,
        explanation: "2 * 16^1 + 10 * 16^0 = 32 + 10 = 42.",
        difficulty: "medium"
      }
    ],
    "2-3": [
      {
        id: "q-2-3-1",
        question: "How does Two's Complement represent negative numbers?",
        options: [
          "By setting the most significant bit to 1 and leaving other bits unchanged",
          "By inverting all bits and adding 1",
          "By subtracting the number from the maximum possible value",
          "By using a dedicated byte to store the minus sign"
        ],
        correct: 1,
        explanation: "Two's Complement allows addition and subtraction to use the same hardware logic and avoids the 'negative zero' problem.",
        difficulty: "hard"
      },
      {
        id: "q-2-3-2",
        question: "In an 8-bit signed integer, what is the range of values?",
        options: [
          "-128 to 127",
          "-127 to 127",
          "-256 to 255",
          "0 to 255"
        ],
        correct: 0,
        explanation: "Two's complement for N bits gives -2^(N-1) to 2^(N-1)-1. For 8 bits, this is -128 to 127.",
        difficulty: "medium"
      },
      {
        id: "q-2-3-3",
        question: "What is the 8-bit two's complement representation of -1?",
        options: [
          "10000001",
          "11111110",
          "11111111",
          "01111111"
        ],
        correct: 2,
        explanation: "Take 1 (00000001), invert bits (11111110), add 1 (11111111).",
        difficulty: "hard"
      }
    ],
    "2-4": [
      {
        id: "q-2-4-1",
        question: "What is the structure of an IEEE 754 single-precision floating point number?",
        options: [
          "Sign bit (1), Exponent (8), Mantissa (23)",
          "Sign bit (1), Exponent (11), Mantissa (52)",
          "Sign bit (1), Integer part (15), Fractional part (16)",
          "Exponent (16), Mantissa (16)"
        ],
        correct: 0,
        explanation: "Single precision (float) uses 32 bits: 1 sign, 8 exponent, 23 mantissa/fraction.",
        difficulty: "medium"
      },
      {
        id: "q-2-4-2",
        question: "Why can't 0.1 be represented exactly in binary floating point?",
        options: [
          "It is an irrational number",
          "It is a repeating fraction in base-2 (like 1/3 in base-10)",
          "The IEEE 754 standard explicitly excludes it for performance",
          "The mantissa is not large enough to hold the digits"
        ],
        correct: 1,
        explanation: "Just as 1/3 is 0.333... in decimal, 1/10 is a repeating sequence in binary, leading to precision errors in financial calculations.",
        difficulty: "hard"
      },
      {
        id: "q-2-4-3",
        question: "What does NaN stand for in floating point arithmetic?",
        options: [
          "Negative and Null",
          "New Arithmetic Number",
          "Not a Number",
          "Node-aligned Numeric"
        ],
        correct: 2,
        explanation: "NaN represents undefined or unrepresentable values, such as the result of 0/0 or sqrt(-1).",
        difficulty: "easy"
      }
    ],
    "2-5": [
      {
        id: "q-2-5-1",
        question: "What is integer overflow?",
        options: [
          "When a pointer points to an invalid memory address",
          "When an arithmetic operation produces a value too large for the storage type",
          "When too many integers are allocated on the heap",
          "When a floating point number is cast to an integer"
        ],
        correct: 1,
        explanation: "Overflow occurs when the result of a calculation exceeds the maximum value the data type can hold, often wrapping around to a negative number in signed types.",
        difficulty: "medium"
      },
      {
        id: "q-2-5-2",
        question: "In C/C++, what is the result of unsigned integer overflow?",
        options: [
          "A runtime exception is thrown",
          "The program crashes immediately",
          "The value wraps around modulo 2^N",
          "The value is clamped to the maximum possible value"
        ],
        correct: 2,
        explanation: "Standard C/C++ defines unsigned overflow as wrapping around. Signed overflow, however, is Undefined Behavior.",
        difficulty: "hard"
      },
      {
        id: "q-2-5-3",
        question: "What is floating-point underflow?",
        options: [
          "When a number is too large to be represented",
          "When a result is so close to zero that it is smaller than the smallest representable value",
          "When a division by zero occurs",
          "When a negative number is square-rooted"
        ],
        correct: 1,
        explanation: "Underflow happens when a non-zero result is so small that it is represented as zero or a subnormal number.",
        difficulty: "medium"
      }
    ],
    "2-6": [
      {
        id: "q-2-6-1",
        question: "What is the primary advantage of UTF-8 over UTF-32?",
        options: [
          "It supports more characters than UTF-32",
          "It is fixed-width, making string indexing O(1)",
          "It is backward compatible with ASCII and uses space more efficiently for Western text",
          "It is easier to implement in hardware"
        ],
        correct: 2,
        explanation: "UTF-8 uses 1 to 4 bytes per character. ASCII characters take only 1 byte, making it highly efficient for web content and source code.",
        difficulty: "medium"
      },
      {
        id: "q-2-6-2",
        question: "How does UTF-8 handle multi-byte characters?",
        options: [
          "It uses a prefix byte to specify the total number of bytes",
          "It uses specific bit patterns in the first byte to indicate length and 'continuation bits' in following bytes",
          "It uses escape sequences like in C strings",
          "Every character is always 4 bytes, with leading zeros"
        ],
        correct: 1,
        explanation: "UTF-8 first bytes start with '110' for 2-byte, '1110' for 3-byte, etc. Continuation bytes always start with '10'.",
        difficulty: "hard"
      },
      {
        id: "q-2-6-3",
        question: "What is Unicode?",
        options: [
          "A character encoding format like UTF-8",
          "A font used to display international characters",
          "A universal character set that maps every character in the world to a unique code point",
          "A compression algorithm for text files"
        ],
        correct: 2,
        explanation: "Unicode is the standard set of characters (code points). UTF-8, UTF-16, and UTF-32 are different ways to encode those code points into bytes.",
        difficulty: "easy"
      }
    ],
    "2-7": [
      {
        id: "q-2-7-1",
        question: "What is Little-Endian byte order?",
        options: [
          "Storing the most significant byte at the lowest memory address",
          "Storing the least significant byte at the lowest memory address",
          "A method of compressing integer arrays",
          "The standard order for network protocols like TCP/IP"
        ],
        correct: 1,
        explanation: "Little-endian (used by x86 and ARM) stores the 'little end' first. For example, 0x12345678 is stored as 78 56 34 12.",
        difficulty: "medium"
      },
      {
        id: "q-2-7-2",
        question: "Which byte order is typically used as the 'Network Byte Order' for internet protocols?",
        options: [
          "Little-Endian",
          "Big-Endian",
          "Middle-Endian",
          "Bi-Endian"
        ],
        correct: 1,
        explanation: "Big-endian is the standard for network protocols. Software on little-endian machines must use functions like 'htons' to swap bytes before sending.",
        difficulty: "medium"
      },
      {
        id: "q-2-7-3",
        question: "Why does endianness matter when writing to a file or network?",
        options: [
          "It doesn't matter; the OS handles it automatically",
          "Because different CPU architectures may interpret the sequence of bytes differently",
          "Because little-endian is always faster to transmit",
          "Because big-endian provides better error correction"
        ],
        correct: 1,
        explanation: "If a little-endian machine writes a 32-bit int to a file and a big-endian machine reads it, the value will be incorrect unless byte-swapping is performed.",
        difficulty: "medium"
      }
    ],
    "2-8": [
      {
        id: "q-2-8-1",
        question: "What is the result of 'x & 1' in most programming languages?",
        options: [
          "It doubles the value of x",
          "It clears all bits of x",
          "It returns 1 if x is odd, 0 if x is even",
          "It returns the most significant bit of x"
        ],
        correct: 2,
        explanation: "Bitwise AND with 1 masks everything except the last bit. In binary, even numbers end in 0 and odd numbers end in 1.",
        difficulty: "easy"
      },
      {
        id: "q-2-8-2",
        question: "What does the XOR (^) operator do?",
        options: [
          "Returns 1 if both bits are 1",
          "Returns 1 if at least one bit is 1",
          "Returns 1 if the bits are different, 0 if they are the same",
          "Returns the complement of the first operand"
        ],
        correct: 2,
        explanation: "Exclusive OR (XOR) is 1 only when the inputs differ. It is often used for toggling bits or simple checksums.",
        difficulty: "medium"
      },
      {
        id: "q-2-8-3",
        question: "How do you efficiently multiply an integer by 4 using bit manipulation?",
        options: [
          "x >> 2",
          "x << 2",
          "x | 4",
          "x ^ 4"
        ],
        correct: 1,
        explanation: "Left shifting by N is equivalent to multiplying by 2^N. Left shifting by 2 is multiplying by 4.",
        difficulty: "medium"
      }
    ],
    "2-9": [
      {
        id: "q-2-9-1",
        question: "What is a 'bitmask'?",
        options: [
          "A security feature to hide data from the CPU",
          "A value used to select, modify, or ignore specific bits in a bitwise operation",
          "A type of compression for image files",
          "A hardware component that prevents unauthorized memory access"
        ],
        correct: 1,
        explanation: "Bitmasks allow you to treat a single integer as a collection of boolean flags, saving memory and allowing fast batch updates.",
        difficulty: "medium"
      },
      {
        id: "q-2-9-2",
        question: "How do you set the N-th bit of a variable 'x' to 1?",
        options: [
          "x = x & (1 << N)",
          "x = x | (1 << N)",
          "x = x ^ (1 << N)",
          "x = x >> N"
        ],
        correct: 1,
        explanation: "Bitwise OR with a value where only the N-th bit is 1 will force that bit to 1 without changing others.",
        difficulty: "medium"
      },
      {
        id: "q-2-9-3",
        question: "How do you clear the N-th bit of 'x' (set it to 0)?",
        options: [
          "x = x | ~(1 << N)",
          "x = x & ~(1 << N)",
          "x = x ^ (1 << N)",
          "x = x & (1 << N)"
        ],
        correct: 1,
        explanation: "Generate a mask where the N-th bit is 0 and all others are 1 (using NOT), then bitwise AND it with x.",
        difficulty: "hard"
      }
    ],
    "2-10": [
      {
        id: "q-2-10-1",
        question: "What is the difference between a logical right shift (>>>) and an arithmetic right shift (>>)?",
        options: [
          "There is no difference in most languages",
          "Logical shift fills with zeros; Arithmetic shift fills with the sign bit to preserve the sign of the number",
          "Logical shift is for floats; Arithmetic shift is for integers",
          "Arithmetic shift is faster than logical shift"
        ],
        correct: 1,
        explanation: "Arithmetic shift preserves the sign (MSB), allowing 'x >> 1' to behave like 'x / 2' for negative numbers.",
        difficulty: "hard"
      },
      {
        id: "q-2-10-2",
        question: "What is a 'subnormal' (or denormal) number in floating point?",
        options: [
          "An error state returned by the CPU",
          "A number very close to zero that uses a special representation to prevent underflow to zero",
          "A floating point number with no exponent",
          "A number that has been rounded incorrectly"
        ],
        correct: 1,
        explanation: "Subnormals allow 'gradual underflow' by relaxing the requirement that the leading bit of the mantissa be 1. They are often slower for CPUs to process.",
        difficulty: "hard"
      },
      {
        id: "q-2-10-3",
        question: "What is 'precision' vs 'range' in data representation?",
        options: [
          "Precision is the maximum value; range is the number of digits",
          "Precision is how many distinct values can be represented in an interval; range is the total span of values",
          "They are the same thing",
          "Precision applies to integers; range applies to floats"
        ],
        correct: 1,
        explanation: "A 64-bit float has a much larger range than a 64-bit int, but its precision decreases as the numbers get larger.",
        difficulty: "medium"
      }
    ]
  },
  examQuestions: [
    {
      id: "exam-ch2-1",
      question: "Which of the following is the most common representation for signed integers in modern computers?",
      options: [
        "Sign-Magnitude",
        "One's Complement",
        "Two's Complement",
        "Offset Binary"
      ],
      correct: 2,
      explanation: "Two's complement is the industry standard because it simplifies arithmetic logic and has a single representation for zero.",
      difficulty: "easy"
    },
    {
      id: "exam-ch2-2",
      question: "What is the result of 0.1 + 0.2 === 0.3 in most IEEE 754-compliant languages (like JS or Python)?",
      options: [
        "true",
        "false",
        "Undefined",
        "Throws an error"
      ],
      correct: 1,
      explanation: "Due to floating point precision errors, 0.1 + 0.2 actually equals 0.30000000000000004.",
      difficulty: "medium"
    },
    {
      id: "exam-ch2-3",
      question: "How many bits are in a 16-bit Unicode (UTF-16) code unit?",
      options: [
        "8",
        "16",
        "32",
        "64"
      ],
      correct: 1,
      explanation: "UTF-16 uses 16-bit units. Some characters (surrogate pairs) require two units (32 bits total).",
      difficulty: "easy"
    },
    {
      id: "exam-ch2-4",
      question: "What happens when you perform 'x << 1' on a signed integer where the highest bit is 1?",
      options: [
        "The number is doubled and stays negative",
        "The sign bit is shifted out, potentially changing the number from negative to positive (Overflow)",
        "The CPU throws a 'bit-shift-error' exception",
        "The shift is ignored"
      ],
      correct: 1,
      explanation: "Shifting the sign bit out is a form of overflow and can change the sign and value significantly.",
      difficulty: "hard"
    },
    {
      id: "exam-ch2-5",
      question: "In hex, what is 0xF + 0x1?",
      options: [
        "0x10",
        "0xG",
        "16",
        "0xFF"
      ],
      correct: 0,
      explanation: "F is 15. 15 + 1 = 16, which is 0x10 in hexadecimal.",
      difficulty: "medium"
    },
    {
      id: "exam-ch2-6",
      question: "What is a 'BOM' (Byte Order Mark) in text files?",
      options: [
        "A character at the start of a file to indicate its encoding and endianness",
        "A virus that corrupts text files",
        "A method for compressing text",
        "A marker used to separate lines in CSV files"
      ],
      correct: 0,
      explanation: "The BOM (U+FEFF) tells readers if a file is UTF-8, UTF-16LE, UTF-16BE, etc.",
      difficulty: "medium"
    },
    {
      id: "exam-ch2-7",
      question: "What is the bitwise expression to check if the 3rd bit (index 2) is set?",
      options: [
        "x & 3",
        "x & (1 << 2)",
        "x | (1 << 2)",
        "x ^ 4"
      ],
      correct: 1,
      explanation: "Creating a mask with '1 << 2' (binary 100) and ANDing it with x will result in a non-zero value only if the 3rd bit is set.",
      difficulty: "medium"
    },
    {
      id: "exam-ch2-8",
      question: "Which of the following describes 'lossy' vs 'lossless' data?",
      options: [
        "Lossy data is always smaller but discards information; lossless can be perfectly reconstructed",
        "Lossy is for text; lossless is for images",
        "Lossless is a type of integer; lossy is a type of float",
        "There is no difference in modern systems"
      ],
      correct: 0,
      explanation: "Lossless compression (ZIP, PNG) preserves all bits. Lossy (JPEG, MP3) discards 'unimportant' bits to save space.",
      difficulty: "easy"
    },
    {
      id: "exam-ch2-9",
      question: "What is the decimal value of the binary 1111?",
      options: [
        "7",
        "8",
        "15",
        "16"
      ],
      correct: 2,
      explanation: "8 + 4 + 2 + 1 = 15.",
      difficulty: "easy"
    },
    {
      id: "exam-ch2-10",
      question: "Why do we use 'Base64' encoding for email attachments?",
      options: [
        "To encrypt the data for security",
        "To represent binary data using only printable ASCII characters for transmission over text-only protocols",
        "To compress the file size by 33%",
        "To allow faster download speeds"
      ],
      correct: 1,
      explanation: "Base64 encodes 3 bytes into 4 printable characters, ensuring data isn't corrupted by systems that handle only text.",
      difficulty: "medium"
    }
  ]
};
