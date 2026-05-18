import { ChapterQuizData } from '../quizTypes';

export const CH04_QUIZ: ChapterQuizData = {
  chapterId: "ch4",
  sectionQuizzes: {
    "4-1": [
      {
        id: "q-4-1-1",
        question: "What is the primary difference between a Process and a Thread?",
        options: [
          "Processes are faster than threads",
          "Processes have their own independent memory space; threads share memory within a process",
          "Threads are managed by the hardware; processes by the OS",
          "A process can only have one thread"
        ],
        correct: 1,
        explanation: "Processes provide isolation; threads provide concurrency with low communication overhead because they share the same heap and address space.",
        difficulty: "medium"
      },
      {
        id: "q-4-1-2",
        question: "What is a 'Context Switch'?",
        options: [
          "Switching between two different programming languages",
          "The process of the OS saving the state of a running process and loading the state of another",
          "Moving data from RAM to the GPU",
          "Changing the desktop wallpaper"
        ],
        correct: 1,
        explanation: "Context switches are expensive because they involve saving registers, switching page tables, and flushing caches.",
        difficulty: "medium"
      },
      {
        id: "q-4-1-3",
        question: "Which of the following is shared between threads of the same process?",
        options: [
          "Stack memory",
          "CPU registers",
          "Heap memory and open file descriptors",
          "The program counter"
        ],
        correct: 2,
        explanation: "Threads share the process's resources (heap, global variables, files) but have their own execution state (stack, registers, PC).",
        difficulty: "medium"
      }
    ],
    "4-2": [
      {
        id: "q-4-2-1",
        question: "What is 'Preemptive Scheduling'?",
        options: [
          "When a process voluntarily gives up the CPU",
          "When the OS forcibly interrupts a running process to give another process a turn",
          "When the CPU predicts which branch will be taken",
          "When a process is loaded into memory before it starts"
        ],
        correct: 1,
        explanation: "Most modern OSs are preemptive, ensuring that a single bugged or greedy process cannot freeze the entire system.",
        difficulty: "medium"
      },
      {
        id: "q-4-2-2",
        question: "What is the goal of a 'Round Robin' scheduler?",
        options: [
          "To finish the shortest jobs first",
          "To give every process an equal time slice (quantum) to ensure fairness and responsiveness",
          "To maximize total system throughput at the cost of latency",
          "To run processes in the order they arrived"
        ],
        correct: 1,
        explanation: "Round Robin is excellent for interactive systems where responsiveness is more important than pure efficiency.",
        difficulty: "easy"
      },
      {
        id: "q-4-2-3",
        question: "What is the 'Completely Fair Scheduler' (CFS) used in Linux?",
        options: [
          "A scheduler that uses a lottery to pick processes",
          "A scheduler that uses a red-black tree to track 'vruntime' and always runs the process that has received the least CPU time",
          "A scheduler that only runs processes with high priority",
          "A legacy scheduler from the Unix era"
        ],
        correct: 1,
        explanation: "CFS aims to model a 'perfect multi-tasking CPU' by balancing execution time across all runnable tasks.",
        difficulty: "hard"
      }
    ],
    "4-3": [
      {
        id: "q-4-3-1",
        question: "What is a 'System Call' (syscall)?",
        options: [
          "A function call within a library like jQuery",
          "A request by a user-space program for a service provided by the OS kernel (e.g., reading a file)",
          "A hardware interrupt from the mouse",
          "A network request to a remote server"
        ],
        correct: 1,
        explanation: "Syscalls are the interface between applications and the protected kernel. They involve a transition from 'User Mode' to 'Kernel Mode'.",
        difficulty: "easy"
      },
      {
        id: "q-4-3-2",
        question: "Why can't applications directly access the hard drive or network card?",
        options: [
          "It would be too slow",
          "Hardware manufacturers don't allow it",
          "For security and stability: the kernel must mediate access to shared resources to prevent chaos",
          "User-space languages don't have the syntax for it"
        ],
        correct: 2,
        explanation: "If any program could write anywhere on the disk, privacy and data integrity would be impossible to maintain.",
        difficulty: "easy"
      },
      {
        id: "q-4-3-3",
        question: "What happens during a 'User Mode' to 'Kernel Mode' transition?",
        options: [
          "The CPU increases its clock speed",
          "The privilege level of the CPU is raised, allowing access to protected instructions and memory",
          "The program is moved to a different CPU core",
          "Nothing, it is just a naming convention"
        ],
        correct: 1,
        explanation: "The hardware enforces this boundary. Instructions like 'hlt' or direct I/O port access will cause an exception if attempted in User Mode.",
        difficulty: "medium"
      }
    ],
    "4-4": [
      {
        id: "q-4-4-1",
        question: "What is a 'Race Condition'?",
        options: [
          "When two programs try to finish as fast as possible",
          "When the output of a program depends on the non-deterministic timing of thread execution",
          "When a process uses 100% of the CPU",
          "When a network packet arrives before it was sent"
        ],
        correct: 1,
        explanation: "Race conditions occur when multiple threads access shared data and at least one access is a write, without proper synchronization.",
        difficulty: "medium"
      },
      {
        id: "q-4-4-2",
        question: "What is a 'Mutex' (Mutual Exclusion)?",
        options: [
          "A type of thread that can't be interrupted",
          "A synchronization primitive that ensures only one thread can access a resource at a time",
          "A way to share memory between different computers",
          "A scheduling algorithm for real-time systems"
        ],
        correct: 1,
        explanation: "A thread must 'lock' the mutex before entering a critical section and 'unlock' it when finished.",
        difficulty: "easy"
      },
      {
        id: "q-4-4-3",
        question: "What is a 'Deadlock'?",
        options: [
          "When a process terminates unexpectedly",
          "A situation where two or more threads are stuck forever, each waiting for a resource held by the other",
          "When the battery dies while a program is running",
          "When a hard drive stops spinning"
        ],
        correct: 1,
        explanation: "Deadlock requires four conditions (Coffman conditions): Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
        difficulty: "medium"
      }
    ],
    "4-5": [
      {
        id: "q-4-5-1",
        question: "What is a 'Semaphore'?",
        options: [
          "A flag used in naval communication",
          "A synchronization primitive that maintains a counter to control access to a finite number of resources",
          "A type of process that cannot be killed",
          "A protocol for encrypted communication"
        ],
        correct: 1,
        explanation: "A binary semaphore is similar to a mutex, but a counting semaphore can allow, say, 5 threads into a resource pool simultaneously.",
        difficulty: "medium"
      },
      {
        id: "q-4-5-2",
        question: "What is 'Priority Inversion'?",
        options: [
          "When a low-priority process runs faster than a high-priority one",
          "When a high-priority task is blocked by a low-priority task holding a required lock",
          "When the OS ignores priorities to be fair",
          "When a user changes the priority of a process"
        ],
        correct: 1,
        explanation: "This famously caused issues on the Mars Pathfinder rover, where a medium-priority task prevented the low-priority task from releasing a lock needed by the high-priority task.",
        difficulty: "hard"
      },
      {
        id: "q-4-5-3",
        question: "What is an 'Atomic Operation'?",
        options: [
          "An operation performed by a nuclear computer",
          "An operation that completes entirely or not at all, appearing instantaneous to other threads without being interrupted",
          "A very fast CPU instruction",
          "An operation that uses only 1 bit of data"
        ],
        correct: 1,
        explanation: "Atomic operations (like Compare-And-Swap) are the building blocks of lock-free data structures.",
        difficulty: "medium"
      }
    ],
    "4-6": [
      {
        id: "q-4-6-1",
        question: "What is the primary function of a File System?",
        options: [
          "To speed up the internet connection",
          "To organize and store data on persistent storage, providing a human-readable hierarchy of files and directories",
          "To protect the computer from viruses",
          "To manage the RAM usage of the OS"
        ],
        correct: 1,
        explanation: "File systems abstract the raw blocks of a disk into files, folders, and permissions.",
        difficulty: "easy"
      },
      {
        id: "q-4-6-2",
        question: "What is an 'Inode' in Unix-like file systems?",
        options: [
          "A type of file that contains only text",
          "A data structure that stores metadata about a file (size, owner, permissions, block locations) but not its name",
          "The name of the root directory",
          "A shortcut to a file"
        ],
        correct: 1,
        explanation: "Directory entries map filenames to Inode numbers. The Inode itself contains all the technical details about the file.",
        difficulty: "hard"
      },
      {
        id: "q-4-6-3",
        question: "What is 'Journaling' in a file system?",
        options: [
          "Writing a diary of what the user does",
          "Recording intended changes in a log before applying them, to prevent corruption after a crash",
          "Compressing files as they are written",
          "Encrypting the hard drive"
        ],
        correct: 1,
        explanation: "Journaling (used in NTFS, ext4, APFS) ensures that the file system can be quickly restored to a consistent state after an improper shutdown.",
        difficulty: "medium"
      }
    ],
    "4-7": [
      {
        id: "q-4-7-1",
        question: "What is a 'Virtual File System' (VFS)?",
        options: [
          "A file system that exists only in RAM",
          "An abstraction layer that allows the OS to support many different physical file systems through a common interface",
          "A cloud storage service",
          "A simulation of a hard drive"
        ],
        correct: 1,
        explanation: "VFS allows a program to use the same read/write calls whether the file is on an SSD, a network drive, or a USB stick.",
        difficulty: "medium"
      },
      {
        id: "q-4-7-2",
        question: "What is the difference between a Hard Link and a Soft (Symbolic) Link?",
        options: [
          "Hard links are for files; soft links are for folders",
          "Hard links point to the Inode; soft links point to a filename/path",
          "Soft links are faster than hard links",
          "There is no difference"
        ],
        correct: 1,
        explanation: "Deleting the original file breaks a symbolic link, but a hard link remains valid as long as at least one link to the Inode exists.",
        difficulty: "hard"
      },
      {
        id: "q-4-7-3",
        question: "What is 'Memory-Mapped I/O'?",
        options: [
          "Using RAM as a hard drive",
          "Mapping hardware device registers to specific memory addresses so the CPU can communicate with them using standard memory instructions",
          "Mapping a file into RAM for faster access",
          "A way to increase the size of the CPU cache"
        ],
        correct: 1,
        explanation: "This allows the kernel to talk to network cards, GPUs, and other peripherals using move/load instructions.",
        difficulty: "hard"
      }
    ],
    "4-8": [
      {
        id: "q-4-8-1",
        question: "What is a 'Signal' in Unix-like systems?",
        options: [
          "A hardware alert from the monitor",
          "A software interrupt sent to a process to notify it of an event (e.g., SIGINT, SIGKILL)",
          "A type of variable that can be shared between threads",
          "A network packet used for pinging"
        ],
        correct: 1,
        explanation: "Signals allow the OS or other processes to communicate asynchronously with a process.",
        difficulty: "medium"
      },
      {
        id: "q-4-8-2",
        question: "What is the difference between SIGTERM and SIGKILL?",
        options: [
          "SIGTERM is for terminals; SIGKILL is for processes",
          "SIGTERM asks a process to shut down gracefully; SIGKILL forces the process to stop immediately and cannot be ignored",
          "SIGKILL is safer than SIGTERM",
          "SIGTERM is only used by the root user"
        ],
        correct: 1,
        explanation: "Always try SIGTERM first to allow the program to save data and close files before killing it with SIGKILL.",
        difficulty: "medium"
      },
      {
        id: "q-4-8-3",
        question: "What is a 'Zombie Process'?",
        options: [
          "A process that has high CPU usage",
          "A process that has finished execution but still has an entry in the process table because its parent hasn't read its exit code",
          "A process that was restarted after a crash",
          "A virus that takes over other processes"
        ],
        correct: 1,
        explanation: "Zombies don't consume memory or CPU, but they take up a process ID (PID) slot. The parent must 'wait()' on them to clear them.",
        difficulty: "medium"
      }
    ],
    "4-9": [
      {
        id: "q-4-9-1",
        question: "What is a 'Pipe' (|) in the command line?",
        options: [
          "A way to save output to a file",
          "An Inter-Process Communication (IPC) mechanism that redirects the standard output of one process to the standard input of another",
          "A tool for checking network connections",
          "A method for compressing data streams"
        ],
        correct: 1,
        explanation: "Pipes allow small, specialized tools to be chained together to perform complex tasks.",
        difficulty: "easy"
      },
      {
        id: "q-4-9-2",
        question: "What is 'Shared Memory' IPC?",
        options: [
          "When two people use the same computer",
          "A region of memory that can be accessed by multiple processes simultaneously, providing the fastest form of IPC",
          "When the OS shares its RAM with the BIOS",
          "A way to send files over a network"
        ],
        correct: 1,
        explanation: "Because data isn't copied between processes, shared memory is extremely fast but requires careful synchronization (like semaphores).",
        difficulty: "medium"
      },
      {
        id: "q-4-9-3",
        question: "What is a 'Socket' in the context of IPC?",
        options: [
          "A physical port on the back of the computer",
          "An endpoint for communication between processes, either on the same machine or across a network",
          "A piece of hardware that connects the CPU to the RAM",
          "A software bug that causes memory leaks"
        ],
        correct: 1,
        explanation: "Sockets are the foundation of network programming and can also be used for local (Unix Domain) communication.",
        difficulty: "medium"
      }
    ],
    "4-10": [
      {
        id: "q-4-10-1",
        question: "What is an 'Interrupt'?",
        options: [
          "A bug that stops the program",
          "A signal to the processor emitted by hardware or software indicating an event that needs immediate attention",
          "A user pressing 'Cancel' on a dialog box",
          "When the power cable is unplugged"
        ],
        correct: 1,
        explanation: "When an interrupt occurs, the CPU pauses the current task, runs an 'Interrupt Service Routine' (ISR), and then resumes the task.",
        difficulty: "medium"
      },
      {
        id: "q-4-10-2",
        question: "What is 'Direct Memory Access' (DMA)?",
        options: [
          "When the user types directly into RAM",
          "A feature that allows hardware subsystems to access main system memory independently of the CPU",
          "A way to skip the OS login screen",
          "A type of fast-access RAM"
        ],
        correct: 1,
        explanation: "DMA allows devices like disk controllers or network cards to transfer large amounts of data without burdening the CPU.",
        difficulty: "hard"
      },
      {
        id: "q-4-10-3",
        question: "What is 'Monolithic Kernel' vs 'Microkernel'?",
        options: [
          "Monolithic kernels are for large computers; microkernels for small ones",
          "Monolithic kernels run all OS services in kernel space; microkernels move as much as possible to user space",
          "Microkernels are always faster than monolithic kernels",
          "There is no difference in modern design"
        ],
        correct: 1,
        explanation: "Linux is monolithic (for performance); macOS (Mach) and QNX are more microkernel-oriented (for modularity and stability).",
        difficulty: "hard"
      }
    ]
  },
  examQuestions: [
    {
      id: "exam-ch4-1",
      question: "Which of the following describes a 'Ready' state in the process lifecycle?",
      options: [
        "The process is currently running on the CPU",
        "The process is waiting for an I/O operation to complete",
        "The process is loaded and waiting for its turn to use the CPU",
        "The process has finished and is being cleaned up"
      ],
      correct: 2,
      explanation: "A ready process has everything it needs to run; it's just waiting for the scheduler to pick it.",
      difficulty: "easy"
    },
    {
      id: "exam-ch4-2",
      question: "What is a 'Spinlock'?",
      options: [
        "A lock where the thread continuously checks the lock status in a loop until it becomes available",
        "A lock that rotates between different processes",
        "A lock that is only used for hard drives",
        "A type of error in the OS scheduler"
      ],
      correct: 0,
      explanation: "Spinlocks avoid the cost of a context switch but waste CPU cycles, so they are only used for very short critical sections.",
      difficulty: "medium"
    },
    {
      id: "exam-ch4-3",
      question: "What is the 'init' process (PID 1)?",
      options: [
        "The first process started by the kernel, responsible for starting all other processes",
        "A process that initializes the graphics card",
        "A temporary process used during boot that is deleted later",
        "The process that manages the BIOS"
      ],
      correct: 0,
      explanation: "PID 1 (systemd, launchd, or init) is the ancestor of all other processes in the system.",
      difficulty: "easy"
    },
    {
      id: "exam-ch4-4",
      question: "What is 'Thrashing' in the context of CPU scheduling?",
      options: [
        "When a single process uses all CPU cores",
        "When the system spends more time switching between processes than actually running them",
        "When the CPU fan spins too fast",
        "When a process is terminated for using too much memory"
      ],
      correct: 1,
      explanation: "This often happens when the 'time slice' is too small compared to the cost of a context switch.",
      difficulty: "medium"
    },
    {
      id: "exam-ch4-5",
      question: "What is 'Starvation' in process scheduling?",
      options: [
        "When a process runs out of memory",
        "When a low-priority process is never given a chance to run because higher-priority processes keep arriving",
        "When the computer is turned off while a process is running",
        "When a process waits for a file that doesn't exist"
      ],
      correct: 1,
      explanation: "Aging is a technique used to prevent starvation by gradually increasing the priority of processes that have waited a long time.",
      difficulty: "medium"
    },
    {
      id: "exam-ch4-6",
      question: "What is the purpose of the 'PATH' environment variable?",
      options: [
        "To tell the OS where the user's home directory is",
        "To list the directories the shell should search in to find executable programs",
        "To store the history of commands typed by the user",
        "To define the location of the system's log files"
      ],
      correct: 1,
      explanation: "When you type 'ls', the shell looks through each directory in PATH to find the 'ls' binary.",
      difficulty: "easy"
    },
    {
      id: "exam-ch4-7",
      question: "What is a 'Shell'?",
      options: [
        "A protective casing for the CPU",
        "A user-space program that provides an interface to the operating system's services",
        "The core part of the kernel that manages memory",
        "A type of encrypted file system"
      ],
      correct: 1,
      explanation: "Bash, Zsh, and PowerShell are all shells that let users interact with the kernel via commands.",
      difficulty: "easy"
    },
    {
      id: "exam-ch4-8",
      question: "What is the 'Standard Error' (stderr) stream?",
      options: [
        "A log of all errors that happened since the computer started",
        "A separate output stream specifically for error messages and diagnostics, usually piped or redirected independently of stdout",
        "A hardware port for debugging",
        "A type of memory corruption"
      ],
      correct: 1,
      explanation: "By default, both stdout and stderr go to the screen, but you can redirect them separately (e.g., '2> error.log').",
      difficulty: "medium"
    },
    {
      id: "exam-ch4-9",
      question: "What is 'Amdahl's Law' primarily used to calculate?",
      options: [
        "The power consumption of a CPU",
        "The theoretical maximum speedup of a task when using multiple processors",
        "The probability of a hard drive failure",
        "The amount of RAM needed for a specific process"
      ],
      correct: 1,
      explanation: "It reminds us that the sequential parts of a program limit how much we can benefit from adding more cores.",
      difficulty: "medium"
    },
    {
      id: "exam-ch4-10",
      question: "What is 'User-Level Threads' vs 'Kernel-Level Threads'?",
      options: [
        "User threads are faster to switch but the OS is unaware of them; kernel threads are managed by the OS",
        "Kernel threads are only for OS code; user threads are for apps",
        "User threads can't perform I/O; kernel threads can",
        "There is no difference in modern operating systems"
      ],
      correct: 0,
      explanation: "Modern systems (like Linux) use a 1:1 model where every user thread is backed by a kernel thread.",
      difficulty: "hard"
    }
  ]
};
