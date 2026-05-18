import { ChapterQuizData } from "../quizTypes";

export const CH08_QUIZ: ChapterQuizData = {
  chapterId: "ch8",
  sectionQuizzes: {
    "8-1": [
      {
        id: "q-8-1-1",
        question: "What is a Deterministic Finite Automaton (DFA)?",
        options: ["A computer with infinite memory", "A theoretical model of computation with a finite number of states and transitions", "A type of neural network", "A programming language"],
        correct: 1,
        explanation: "A DFA is a simple state machine where for each state and input symbol, there is exactly one transition to a next state.",
        difficulty: "easy"
      },
      {
        id: "q-8-1-2",
        question: "What determines if a string is 'accepted' by a DFA?",
        options: ["If the machine crashes", "If the machine ends in a designated 'final' or 'accepting' state", "If the machine runs for 100 steps", "If the machine returns a value of 1"],
        correct: 1,
        explanation: "A string is accepted if, after processing all symbols, the DFA is in one of its accepting states.",
        difficulty: "easy"
      },
      {
        id: "q-8-1-3",
        question: "What is the main difference between a DFA and an NFA (Nondeterministic Finite Automaton)?",
        options: ["NFAs are faster", "NFAs can be in multiple states at once (or have multiple transition choices for a single input)", "DFAs can recognize more languages", "NFAs require infinite memory"],
        correct: 1,
        explanation: "In an NFA, there can be multiple possible next states for a given input, or 'epsilon' transitions that require no input.",
        difficulty: "medium"
      }
    ],
    "8-2": [
      {
        id: "q-8-2-1",
        question: "What is the most powerful model of computation in the Chomsky hierarchy?",
        options: ["Finite Automata", "Pushdown Automata", "Turing Machine", "Linear Bounded Automata"],
        correct: 2,
        explanation: "Turing Machines are the most powerful, capable of simulating any algorithmic process.",
        difficulty: "easy"
      },
      {
        id: "q-8-2-2",
        question: "What component does a Turing Machine have that a Finite Automaton lacks?",
        options: ["A screen", "An infinite read/write tape", "Multiple states", "A battery"],
        correct: 1,
        explanation: "The infinite tape allows the Turing Machine to store and retrieve an unlimited amount of information, unlike the finite state memory of an FA.",
        difficulty: "easy"
      },
      {
        id: "q-8-2-3",
        question: "What does it mean for a language to be 'Turing Complete'?",
        options: ["It can be compiled to C", "It can simulate any Turing Machine (it can perform any computation)", "It has a complete documentation", "It is used by Alan Turing"],
        correct: 1,
        explanation: "A system is Turing complete if it can perform any calculation that a universal Turing machine can perform.",
        difficulty: "medium"
      }
    ],
    "8-3": [
      {
        id: "q-8-3-1",
        question: "What is the 'Halting Problem'?",
        options: ["The problem of a computer overheating", "Determining if a program will eventually stop or run forever on a given input", "Fixing a bug that causes a crash", "Finding the fastest way to exit a loop"],
        correct: 1,
        explanation: "The Halting Problem asks if we can write a program that takes another program and its input and tells us if it will ever stop.",
        difficulty: "medium"
      },
      {
        id: "q-8-3-2",
        question: "Is the Halting Problem 'decidable'?",
        options: ["Yes, for all programs", "No, it is proven to be undecidable", "Only for programs under 100 lines", "Only for programs written in assembly"],
        correct: 1,
        explanation: "Alan Turing famously proved using diagonalization that no algorithm exists that can solve the Halting Problem for all possible program-input pairs.",
        difficulty: "medium"
      },
      {
        id: "q-8-3-3",
        question: "What is an 'Undecidable Problem'?",
        options: ["A problem that is very hard to solve", "A decision problem for which it is proved to be impossible to construct an algorithm that always leads to a correct yes-or-no answer", "A problem with no answer", "A problem that takes O(n!) time"],
        correct: 1,
        explanation: "Undecidable doesn't mean 'hard'—it means mathematically impossible for an algorithm to exist that works in all cases.",
        difficulty: "hard"
      }
    ],
    "8-4": [
      {
        id: "q-8-4-1",
        question: "What does the class 'P' represent in complexity theory?",
        options: ["Problems solvable in Polynomial time by a deterministic Turing machine", "Problems that are hard", "Parallelizable problems", "Problems solvable in Prime time"],
        correct: 0,
        explanation: "P is the set of problems that are 'efficiently' solvable.",
        difficulty: "easy"
      },
      {
        id: "q-8-4-2",
        question: "What does 'NP' stand for?",
        options: ["Non-Polynomial", "Nondeterministic Polynomial time", "Not Possible", "Network Protocol"],
        correct: 1,
        explanation: "NP is the set of decision problems where a 'yes' answer can be verified in polynomial time, even if finding the answer is hard.",
        difficulty: "medium"
      },
      {
        id: "q-8-4-3",
        question: "The 'P vs NP' question asks:",
        options: ["If computers will ever be faster than humans", "If every problem whose solution can be quickly verified can also be quickly solved", "If polynomial time is faster than linear time", "If NP stands for 'Not P'"],
        correct: 1,
        explanation: "This is one of the most important open questions in computer science: does checking a solution imply we can find it just as easily?",
        difficulty: "medium"
      }
    ],
    "8-5": [
      {
        id: "q-8-5-1",
        question: "What makes a problem 'NP-Complete'?",
        options: ["It is in NP and every other problem in NP can be reduced to it in polynomial time", "It is impossible to solve", "It takes O(2^n) time exactly", "It was discovered by Alan Turing"],
        correct: 0,
        explanation: "NP-complete problems are the 'hardest' problems in NP. If you solve one in polynomial time, you've solved all of them (P=NP).",
        difficulty: "hard"
      },
      {
        id: "q-8-5-2",
        question: "Which of these is a famous NP-complete problem?",
        options: ["Sorting", "Boolean Satisfiability (SAT)", "Binary Search", "Shortest Path (Dijkstra)"],
        correct: 1,
        explanation: "The Cook-Levin theorem proved that SAT is NP-complete, making it the first such problem identified.",
        difficulty: "medium"
      },
      {
        id: "q-8-5-3",
        question: "What is 'NP-Hard'?",
        options: ["A problem that is at least as hard as the hardest problems in NP, but doesn't have to be in NP itself", "A problem that is in P", "A problem that is very hard for humans to understand", "A problem that requires a GPU to solve"],
        correct: 0,
        explanation: "NP-hard problems include NP-complete problems but also problems that are even harder (like the Halting problem).",
        difficulty: "hard"
      }
    ],
    "8-6": [
      {
        id: "q-8-6-1",
        question: "What level of language do Regular Expressions (Regex) recognize?",
        options: ["Regular Languages", "Context-Free Languages", "Recursive Languages", "All languages"],
        correct: 0,
        explanation: "Regex corresponds exactly to the set of Regular Languages, which are also recognizable by Finite Automata.",
        difficulty: "easy"
      },
      {
        id: "q-8-6-2",
        question: "Which of the following CANNOT be matched by a standard (theoretical) Regular Expression?",
        options: ["Email addresses", "Phone numbers", "Arbitrarily nested parentheses", "A sequence of digits"],
        correct: 2,
        explanation: "Matching nested structures requires memory (like a stack) that finite automata/regex do not have.",
        difficulty: "medium"
      },
      {
        id: "q-8-6-3",
        question: "In regex, what does the '*' (Kleene Star) operator mean?",
        options: ["Match exactly once", "Match zero or more times", "Match one or more times", "Match anything"],
        correct: 1,
        explanation: "The Kleene Star indicates that the preceding element can repeat any number of times, including zero.",
        difficulty: "easy"
      }
    ],
    "8-7": [
      {
        id: "q-8-7-1",
        question: "What type of automaton is used to recognize Context-Free Languages?",
        options: ["DFA", "NFA", "Pushdown Automaton (PDA)", "Turing Machine"],
        correct: 2,
        explanation: "A PDA is essentially a finite automaton with a stack, which provides the memory needed for context-free features.",
        difficulty: "medium"
      },
      {
        id: "q-8-7-2",
        question: "Most programming languages' syntax is described using which type of grammar?",
        options: ["Regular Grammar", "Context-Free Grammar (CFG)", "Unrestricted Grammar", "Context-Sensitive Grammar"],
        correct: 1,
        explanation: "CFGs are powerful enough to describe the nested structures of programs (functions, loops, etc.) but restricted enough to be parsed efficiently.",
        difficulty: "medium"
      },
      {
        id: "q-8-7-3",
        question: "What notation is commonly used to write Context-Free Grammars?",
        options: ["JSON", "Backus-Naur Form (BNF)", "Regex", "YAML"],
        correct: 1,
        explanation: "BNF is the standard notation for expressing context-free grammars used in programming language specifications.",
        difficulty: "medium"
      }
    ],
    "8-8": [
      {
        id: "q-8-8-1",
        question: "What does the 'Pumping Lemma' for regular languages help you do?",
        options: ["Prove a language IS regular", "Prove a language IS NOT regular", "Find the shortest string in a language", "Simplify a regex"],
        correct: 1,
        explanation: "The Pumping Lemma provides a property that all regular languages must have; if a language lacks it, it cannot be regular.",
        difficulty: "hard"
      },
      {
        id: "q-8-8-2",
        question: "What is the complexity of recognizing a context-free language using the CYK algorithm?",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(n^3)"],
        correct: 3,
        explanation: "The CYK (Cocke-Younger-Kasami) algorithm can parse any CFG in O(n^3) time.",
        difficulty: "hard"
      },
      {
        id: "q-8-8-3",
        question: "Which of these is a context-sensitive language (but not context-free)?",
        options: ["Palindromes", "L = {a^n b^n c^n | n >= 0}", "Balanced parentheses", "Strings of only 'a's"],
        correct: 1,
        explanation: "The language a^n b^n c^n requires keeping track of three counts at once, which a single stack (PDA) cannot do.",
        difficulty: "hard"
      }
    ],
    "8-9": [
      {
        id: "q-8-9-1",
        question: "What is 'Rice's Theorem'?",
        options: ["A theorem about agriculture", "Any non-trivial semantic property of a program is undecidable", "All programs can be written in 100 lines", "Compilers are always correct"],
        correct: 1,
        explanation: "Rice's theorem states that for any non-trivial property of the language recognized by a Turing machine, there is no algorithm to decide it.",
        difficulty: "hard"
      },
      {
        id: "q-8-9-2",
        question: "What is a 'Church-Turing Thesis'?",
        options: ["A law passed by Alan Turing", "The hypothesis that anything computable can be computed by a Turing Machine", "A religious text", "A proof that P = NP"],
        correct: 1,
        explanation: "It's a foundational belief that our intuitive notion of 'algorithm' is perfectly captured by Turing Machines.",
        difficulty: "medium"
      },
      {
        id: "q-8-9-3",
        question: "What is a 'Universal Turing Machine'?",
        options: ["A machine that can solve the Halting problem", "A Turing machine that can simulate any other Turing machine when given its description and input", "A computer that works in space", "The first computer ever built"],
        correct: 1,
        explanation: "This is the theoretical foundation of the modern computer: a single machine that can run any program.",
        difficulty: "medium"
      }
    ],
    "8-10": [
      {
        id: "q-8-10-1",
        question: "What is 'Computational Complexity' concerned with?",
        options: ["How hard code is to read", "The amount of resources (time/space) required to solve a problem", "The number of lines of code", "The cost of hardware"],
        correct: 1,
        explanation: "Complexity theory classifies problems by their inherent resource requirements.",
        difficulty: "easy"
      },
      {
        id: "q-8-10-2",
        question: "Which class contains problems that can be solved in polynomial time by a QUANTUM computer?",
        options: ["P", "NP", "BQP", "EXPTIME"],
        correct: 2,
        explanation: "BQP (Bounded-error Quantum Polynomial time) is the class of problems efficiently solvable by quantum computers.",
        difficulty: "medium"
      },
      {
        id: "q-8-10-3",
        question: "What is the relationship between P and PSPACE?",
        options: ["P = PSPACE", "P is a subset of PSPACE", "PSPACE is a subset of P", "They are disjoint"],
        correct: 1,
        explanation: "Anything solvable in polynomial time is also solvable in polynomial space, but the reverse is not necessarily true.",
        difficulty: "hard"
      }
    ]
  },
  examQuestions: [
    {
      id: "exam-ch8-1",
      question: "Which of the following languages is NOT regular?",
      options: ["Strings containing an even number of 'a's", "Strings that represent valid floating-point numbers", "The language of balanced parentheses", "Strings that start with 'abc'"],
      correct: 2,
      explanation: "Balanced parentheses require a stack to keep track of depth, which a finite automaton cannot do.",
      difficulty: "medium"
    },
    {
      id: "exam-ch8-2",
      question: "If P = NP, then which of the following would be true?",
      options: ["Cryptography as we know it would likely collapse", "Computers would become slower", "The Halting problem would be decidable", "Regex could match anything"],
      correct: 0,
      explanation: "Many encryption schemes (like RSA) rely on the fact that some problems (like factoring) are hard to solve but easy to verify.",
      difficulty: "medium"
    },
    {
      id: "exam-ch8-3",
      question: "What is 'Diagonalization' used for in theory of computation?",
      options: ["Sorting matrices", "Proving that some sets are larger than others (and that undecidable problems exist)", "Increasing the speed of a DFA", "Drawing graphs"],
      correct: 1,
      explanation: "Cantor used diagonalization to show the reals are uncountable, and Turing adapted it to prove the Halting problem is undecidable.",
      difficulty: "hard"
    },
    {
      id: "exam-ch8-4",
      question: "A problem is 'Decidable' if:",
      options: ["It can be solved by a human", "There exists a Turing Machine that always halts and gives a correct answer for any input", "It takes less than O(n^2) time", "It has a 'yes' or 'no' answer"],
      correct: 1,
      explanation: "Decidability means an algorithm exists that is guaranteed to finish and be correct.",
      difficulty: "easy"
    },
    {
      id: "exam-ch8-5",
      question: "Which of these is the most restricted language class in the Chomsky Hierarchy?",
      options: ["Context-Free", "Regular", "Context-Sensitive", "Recursively Enumerable"],
      correct: 1,
      explanation: "Regular languages are the simplest, recognized by DFAs.",
      difficulty: "easy"
    },
    {
      id: "exam-ch8-6",
      question: "What is the significance of the Cook-Levin Theorem?",
      options: ["It proved that P = NP", "It proved that the SAT problem is NP-complete", "It invented the Turing Machine", "It showed that all languages are context-free"],
      correct: 1,
      explanation: "It provided the first example of an NP-complete problem, which allowed others to be found via reduction.",
      difficulty: "hard"
    },
    {
      id: "exam-ch8-7",
      question: "In complexity theory, 'Reduction' from problem A to problem B means:",
      options: ["Problem A is easier than problem B", "Problem B is easier than problem A", "An algorithm for B can be used to solve A", "Problem A and B are identical"],
      correct: 2,
      explanation: "If we can transform A into B, then a solution for B gives us a solution for A. This shows B is 'at least as hard' as A.",
      difficulty: "medium"
    },
    {
      id: "exam-ch8-8",
      question: "What is 'Big-Omega' notation (Ω)?",
      options: ["The upper bound", "The lower bound", "The average case", "The exact value"],
      correct: 1,
      explanation: "Big-Omega provides an asymptotic lower bound for the growth rate of a function.",
      difficulty: "easy"
    },
    {
      id: "exam-ch8-9",
      question: "The 'Busy Beaver' function is an example of:",
      options: ["A polynomial time function", "An uncomputable function", "A sorting algorithm", "A graph property"],
      correct: 1,
      explanation: "The Busy Beaver function grows faster than any computable function, proving it is uncomputable.",
      difficulty: "hard"
    },
    {
      id: "exam-ch8-10",
      question: "Which machine model corresponds to 'Context-Sensitive' languages?",
      options: ["Finite Automata", "Pushdown Automata", "Linear Bounded Automata", "Turing Machine"],
      correct: 2,
      explanation: "LBAs are Turing machines with a tape limited to the size of the input.",
      difficulty: "hard"
    }
  ]
};
