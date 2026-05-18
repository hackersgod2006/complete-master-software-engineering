import { ChapterQuizData } from "../quizTypes";

export const CH35_QUIZ: ChapterQuizData = {
  "chapterId": "ch35",
  "sectionQuizzes": {
    "35-1": [
      {
        "id": "q-35-1-1",
        "question": "What is the fundamental unit of information in a quantum computer?",
        "options": [
          "Bit",
          "Qubit",
          "Byte",
          "Qbyte"
        ],
        "correct": 1,
        "explanation": "A qubit (quantum bit) is the quantum version of the classical bit.",
        "difficulty": "easy"
      },
      {
        "id": "q-35-1-2",
        "question": "In classical computing, a bit can be 0 or 1. What can a qubit be?",
        "options": [
          "Always 0 and 1 at the same time",
          "0, 1, or a superposition of both states",
          "Any number between 0 and 10",
          "Only 0 or 1, but faster"
        ],
        "correct": 1,
        "explanation": "Superposition allows qubits to exist in a complex combination of 0 and 1 until measured.",
        "difficulty": "easy"
      },
      {
        "id": "q-35-1-3",
        "question": "What happens when you 'measure' a qubit in superposition?",
        "options": [
          "It stays in superposition",
          "It collapses into a definite state (0 or 1)",
          "It disappears",
          "It doubles in power"
        ],
        "correct": 1,
        "explanation": "The act of measurement forces the qubit to choose one of the classical states.",
        "difficulty": "medium"
      }
    ],
    "35-2": [
      {
        "id": "q-35-2-1",
        "question": "What is 'Quantum Entanglement'?",
        "options": [
          "When two computers are plugged into each other",
          "A phenomenon where the state of one particle is instantly connected to the state of another, regardless of distance",
          "A bug where two variables are tied together",
          "A way to speed up the internet"
        ],
        "correct": 1,
        "explanation": "Entanglement is a key quantum resource that has no classical equivalent.",
        "difficulty": "medium"
      },
      {
        "id": "q-35-2-2",
        "question": "What did Albert Einstein famously call entanglement?",
        "options": [
          "Quantum Magic",
          "Spooky action at a distance",
          "Infinite Speed",
          "The God Particle"
        ],
        "correct": 1,
        "explanation": "Einstein was skeptical of the non-local nature of entanglement.",
        "difficulty": "easy"
      },
      {
        "id": "q-35-2-3",
        "question": "Why is entanglement useful for quantum computing?",
        "options": [
          "It makes the computer look cool",
          "It allows for coordinated operations across multiple qubits, enabling massive parallelism",
          "It prevents the computer from overheating",
          "It makes the code easier to write"
        ],
        "correct": 1,
        "explanation": "Entangled qubits can represent complex correlations that are impossible for classical bits.",
        "difficulty": "medium"
      }
    ],
    "35-3": [
      {
        "id": "q-35-3-1",
        "question": "What is a 'Quantum Gate'?",
        "options": [
          "A physical door to the lab",
          "A basic quantum circuit operating on a small number of qubits",
          "A security firewall for quantum networks",
          "A way to turn off a quantum computer"
        ],
        "correct": 1,
        "explanation": "Quantum gates are the building blocks of quantum algorithms, similar to classical logic gates (AND, OR, NOT).",
        "difficulty": "easy"
      },
      {
        "id": "q-35-3-2",
        "question": "What does the 'Hadamard' (H) gate do?",
        "options": [
          "It flips a bit from 0 to 1",
          "It puts a qubit into a superposition state",
          "It deletes the qubit",
          "It measures the qubit"
        ],
        "correct": 1,
        "explanation": "The Hadamard gate is fundamental for creating the initial superposition in many quantum algorithms.",
        "difficulty": "hard"
      },
      {
        "id": "q-35-3-3",
        "question": "Are quantum gates reversible?",
        "options": [
          "No, they are like classical gates",
          "Yes, all unitary quantum gates are theoretically reversible",
          "Only the ones that operate on two qubits",
          "Only if the computer is cooled to absolute zero"
        ],
        "correct": 1,
        "explanation": "Quantum mechanics is unitary, which implies that quantum operations can be undone.",
        "difficulty": "hard"
      }
    ],
    "35-4": [
      {
        "id": "q-35-4-1",
        "question": "What is 'Shor's Algorithm' famous for?",
        "options": [
          "Sorting a list very fast",
          "Efficiently finding the prime factors of large integers, potentially breaking modern encryption",
          "Calculating the weather with 100% accuracy",
          "Playing Chess perfectly"
        ],
        "correct": 1,
        "explanation": "Shor's algorithm poses a significant threat to RSA and other public-key cryptosystems.",
        "difficulty": "medium"
      },
      {
        "id": "q-35-4-2",
        "question": "What is 'Grover's Algorithm' used for?",
        "options": [
          "Factoring numbers",
          "Searching an unsorted database with a quadratic speedup",
          "Optimizing delivery routes",
          "Training neural networks"
        ],
        "correct": 1,
        "explanation": "While not as dramatic as Shor's, Grover's algorithm provides a useful speedup for search problems.",
        "difficulty": "medium"
      },
      {
        "id": "q-35-4-3",
        "question": "What is 'Quantum Advantage' (or Quantum Supremacy)?",
        "options": [
          "When a quantum computer is cheaper than a classical one",
          "When a quantum computer can solve a problem that is practically impossible for any classical computer",
          "When a quantum computer is used for the first time",
          "When quantum computers are sold in stores"
        ],
        "correct": 1,
        "explanation": "Quantum advantage marks the point where quantum hardware surpasses the best classical supercomputers for a specific task.",
        "difficulty": "easy"
      }
    ],
    "35-5": [
      {
        "id": "q-35-5-1",
        "question": "Why must most quantum computers be kept at temperatures near absolute zero?",
        "options": [
          "To save electricity",
          "To minimize 'decoherence' and noise caused by thermal energy",
          "Because the engineers like it cold",
          "To prevent the computer from melting"
        ],
        "correct": 1,
        "explanation": "Qubits are extremely sensitive to their environment; even tiny amounts of heat can destroy their quantum state.",
        "difficulty": "medium"
      },
      {
        "id": "q-35-5-2",
        "question": "What is 'Quantum Decoherence'?",
        "options": [
          "The computer turning off",
          "The loss of quantum properties (like superposition) due to interaction with the environment",
          "A type of programming error",
          "The qubits becoming too entangled"
        ],
        "correct": 1,
        "explanation": "Decoherence is the primary obstacle to building large-scale, reliable quantum computers.",
        "difficulty": "medium"
      },
      {
        "id": "q-35-5-3",
        "question": "What is 'Noisy Intermediate-Scale Quantum' (NISQ)?",
        "options": [
          "A quantum computer that makes a lot of sound",
          "The current era of quantum computing where devices have 50-hundreds of qubits but are prone to errors",
          "A type of quantum algorithm",
          "A quantum computer for children"
        ],
        "correct": 1,
        "explanation": "NISQ devices are not yet powerful enough for Shor's algorithm but may be useful for other tasks.",
        "difficulty": "hard"
      }
    ],
    "35-6": [
      {
        "id": "q-35-6-1",
        "question": "What is the goal of 'Quantum Error Correction' (QEC)?",
        "options": [
          "To fix bugs in the code",
          "To protect quantum information from errors due to decoherence and noise by using multiple physical qubits to represent one logical qubit",
          "To make the computer run faster",
          "To prevent the user from making mistakes"
        ],
        "correct": 1,
        "explanation": "QEC is necessary for building 'Fault-Tolerant' quantum computers.",
        "difficulty": "hard"
      },
      {
        "id": "q-35-6-2",
        "question": "What is a 'Logical Qubit'?",
        "options": [
          "A qubit that makes sense",
          "An error-corrected qubit composed of many physical qubits",
          "The software representation of a qubit",
          "A qubit that only performs logic gates"
        ],
        "correct": 1,
        "explanation": "It takes many physical qubits (thousands or more) to create one reliable logical qubit with current technology.",
        "difficulty": "hard"
      },
      {
        "id": "q-35-6-3",
        "question": "What is the 'No-Cloning Theorem'?",
        "options": [
          "You cannot copy a quantum computer",
          "It is impossible to create an identical copy of an unknown arbitrary quantum state",
          "Cloning humans is illegal",
          "You cannot have two qubits in the same state"
        ],
        "correct": 1,
        "explanation": "This is a fundamental law of quantum mechanics with deep implications for quantum communication and security.",
        "difficulty": "hard"
      }
    ],
    "35-7": [
      {
        "id": "q-35-7-1",
        "question": "In which field is quantum computing expected to have the most immediate impact?",
        "options": [
          "Web Development",
          "Materials Science and Drug Discovery",
          "Word Processing",
          "Social Media"
        ],
        "correct": 1,
        "explanation": "Quantum computers are naturally suited for simulating quantum systems like molecules and new materials.",
        "difficulty": "medium"
      },
      {
        "id": "q-35-7-2",
        "question": "What is 'Post-Quantum Cryptography' (PQC)?",
        "options": [
          "Cryptography for quantum computers",
          "Cryptographic algorithms that are thought to be secure against an attack by a quantum computer",
          "Encryption that uses qubits",
          "A new type of blockchain"
        ],
        "correct": 1,
        "explanation": "PQC algorithms are designed to run on classical computers but withstand quantum attacks.",
        "difficulty": "medium"
      },
      {
        "id": "q-35-7-3",
        "question": "How does quantum computing relate to Optimization problems?",
        "options": [
          "It makes them impossible to solve",
          "It can theoretically find the best solution among a massive number of possibilities much faster than classical algorithms",
          "It only works for linear optimization",
          "Quantum computers are not good at optimization"
        ],
        "correct": 1,
        "explanation": "Tasks like logistics, portfolio optimization, and scheduling are prime targets for quantum speedup.",
        "difficulty": "medium"
      }
    ],
    "35-8": [
      {
        "id": "q-35-8-1",
        "question": "What is 'Qiskit'?",
        "options": [
          "A quantum snack",
          "An open-source SDK for working with quantum computers at the level of pulses, circuits, and application modules",
          "A new type of hardware",
          "A quantum operating system"
        ],
        "correct": 1,
        "explanation": "Qiskit (by IBM) is one of the most popular frameworks for quantum programming.",
        "difficulty": "easy"
      },
      {
        "id": "q-35-8-2",
        "question": "Can you run quantum programs today?",
        "options": [
          "No, they don't exist yet",
          "Yes, through cloud-based quantum computing services (like IBM Quantum, AWS Braket, or Azure Quantum)",
          "Only if you have a quantum computer in your house",
          "Only in movies"
        ],
        "correct": 1,
        "explanation": "Many companies offer cloud access to real quantum hardware and simulators.",
        "difficulty": "easy"
      },
      {
        "id": "q-35-8-3",
        "question": "What is the 'Bloch Sphere'?",
        "options": [
          "The shape of a quantum computer",
          "A geometric representation of the pure state space of a two-level quantum mechanical system (a qubit)",
          "A sphere that protects the qubits from noise",
          "A mathematical tool for classical bits"
        ],
        "correct": 1,
        "explanation": "It's a way to visualize the state of a single qubit.",
        "difficulty": "hard"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch35-1",
      "question": "Which of these quantum properties allows a computer to process multiple possibilities simultaneously?",
      "options": ["Decoherence", "Superposition", "Error Correction", "No-Cloning"],
      "correct": 1,
      "explanation": "Superposition is what gives quantum computers their potential for massive parallelism.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch35-2",
      "question": "What is the 'Quantum Threat' to cybersecurity?",
      "options": [
        "Quantum computers being used to hack into power grids",
        "The ability of large-scale quantum computers to break standard public-key encryption like RSA",
        "Quantum computers sending viruses through the air",
        "Quantum computers replacing all security engineers"
      ],
      "correct": 1,
      "explanation": "Shor's algorithm can factor large numbers, which is the basis of much of today's internet security.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch35-3",
      "question": "What is a 'Unitary' matrix in the context of quantum gates?",
      "options": [
        "A matrix that is only for one qubit",
        "A square matrix whose conjugate transpose is also its inverse, representing a reversible transformation",
        "A matrix that has only ones",
        "A matrix that cannot be changed"
      ],
      "correct": 1,
      "explanation": "Quantum gates are represented by unitary matrices, ensuring the conservation of probability.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch35-4",
      "question": "What is the primary difference between a 'Quantum Simulator' and a 'Quantum Computer'?",
      "options": [
        "A simulator runs on classical hardware; a quantum computer uses actual quantum effects",
        "A simulator is faster than a quantum computer",
        "There is no difference",
        "A simulator is only for games"
      ],
      "correct": 0,
      "explanation": "Simulators are used for testing algorithms on classical machines but cannot scale to many qubits.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch35-5",
      "question": "What does 'Bra-ket notation' (Dirac notation) represent?",
      "options": [
        "The code for a quantum gate",
        "A standard mathematical notation for describing quantum states",
        "A way to name different quantum computers",
        "A type of security protocol"
      ],
      "correct": 1,
      "explanation": "It uses symbols like |ψ⟩ (ket) and ⟨φ| (bra) to represent vectors and their duals.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch35-6",
      "question": "What is 'Quantum Annealing'?",
      "options": [
        "A way to cool down a computer",
        "A quantum computing method used specifically for finding the global minimum of a given objective function (optimization)",
        "A type of quantum error",
        "A process for building quantum chips"
      ],
      "correct": 1,
      "explanation": "Companies like D-Wave focus on quantum annealing rather than universal gate-based quantum computing.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch35-7",
      "question": "Which of these is a major physical platform for building qubits?",
      "options": ["Superconducting loops", "Trapped ions", "Photonic circuits", "All of the above"],
      "correct": 3,
      "explanation": "There are several competing technologies for building quantum hardware.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch35-8",
      "question": "What is 'Quantum Teleportation'?",
      "options": [
        "Moving physical objects instantly through space",
        "The transfer of a quantum state from one location to another using entanglement and classical communication",
        "A sci-fi concept that is not possible",
        "A way to download files faster"
      ],
      "correct": 1,
      "explanation": "It doesn't move matter, only the quantum state (information).",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch35-9",
      "question": "What is the 'Measurement Problem' in quantum mechanics?",
      "options": [
        "Not having a good enough ruler",
        "The lack of consensus on how (or if) wave function collapse occurs",
        "Calculating the speed of light",
        "Measuring the temperature of a qubit"
      ],
      "correct": 1,
      "explanation": "It's a foundational philosophical and physical question about the nature of reality in quantum mechanics.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch35-10",
      "question": "What is 'Quantum Key Distribution' (QKD)?",
      "options": [
        "Using quantum computers to find passwords",
        "A secure communication method that uses quantum mechanics to share a cryptographic key",
        "A way to unlock a quantum computer",
        "Distributing quantum computers to every home"
      ],
      "correct": 1,
      "explanation": "QKD (like the BB84 protocol) is theoretically unbreakable because any eavesdropping would be detected.",
      "difficulty": "medium"
    }
  ]
};
