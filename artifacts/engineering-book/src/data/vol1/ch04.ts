import type { Section } from '../types';

export const CH04_SECTIONS: Section[] = [
  {
    id: "4-1",
    number: "4.1",
    title: "What an Operating System Is and Does",
    content: `An operating system is a layer of software between hardware and user programs providing two fundamental services: resource management and abstraction. Resource management means dividing CPU time, memory, I/O bandwidth, and storage fairly among competing processes. Abstraction means presenting a clean hardware-independent interface so your program does not need to know whether it runs on an Intel Xeon or an Apple M3.
Every line of code you write runs within an OS context. The OS decides when your code runs, how much memory it gets, and how it talks to hardware. Engineers who understand the OS understand the environment their code inhabits — and gain extraordinary diagnostic and optimization power as a result.


---`
  },
  {
    id: "4-2",
    number: "4.2",
    title: "The Kernel: Modes, Rings, and Privilege Levels",
    content: `A process is an instance of a running program with its own virtual address space, file descriptor table, signal handlers, current working directory, user and group IDs, and resource limits. The OS enforces these boundaries in hardware. A misbehaving process cannot corrupt another process or the kernel.

### 4.2.1 Process Creation: fork() and exec()

On Unix and Unix-like systems, all processes except the initial init process are created by fork(). fork() creates an exact copy of the calling process. The child is identical to the parent except for its PID, its PPID, and the return value of fork() itself — zero in the child, the child's PID in the parent.

\`\`\`python
import os, sys, subprocess

# THE FORK + EXEC PATTERN: how Unix spawns every program
pid = os.fork()

if pid == 0: # CHILD PROCESS
print(f'Child PID: {os.getpid()}, Parent: {os.getppid()}')
# exec() replaces this process image with a new program
\`\`\`

os.execv('/bin/ls', ['/bin/ls', '-la', '/tmp'])

\`\`\`python
# Never reaches here if exec succeeds
\`\`\`

os._exit(1) # must use _exit() in child, not sys.exit()


\`\`\`python
else: # PARENT PROCESS
print(f'Parent PID: {os.getpid()}, spawned child: {pid}')
\`\`\`

child_pid, status = os.waitpid(pid, 0) # wait for child

\`\`\`python
print(f'Child {child_pid} exited: {os.WEXITSTATUS(status)}')

# Between fork() and exec() the child can:
# redirect stdin/stdout/stderr for pipes
# drop privileges (setuid/setgid)
# set resource limits (setrlimit)
# change working directory
# This two-step design gives shells enormous flexibility

# PREVENTING ZOMBIE PROCESSES:
# When child exits before parent calls waitpid(), child becomes zombie
# OS keeps exit status until parent collects it
# Fix: always waitpid() or install SIGCHLD handler
import signal
def reap_children(signum, frame):
while True:
try:
\`\`\`

pid, _ = os.waitpid(-1, os.WNOHANG)

\`\`\`python
if pid == 0: break
except ChildProcessError: break
\`\`\`

signal.signal(signal.SIGCHLD, reap_children)

### 4.2.2 Process States

State
Description
Common Cause
RUNNING
Executing on a CPU core
Scheduled by OS; doing work
RUNNABLE
Ready, waiting for CPU
I/O completed; just created; woken from sleep
BLOCKED
Waiting for event: I/O, lock, timer

\`\`\`python
read(), mutex.lock(), sleep(), select()
\`\`\`

STOPPED
Paused by SIGSTOP or Ctrl+Z
Debugger attached; user pressed Ctrl+Z
ZOMBIE
Exited but parent not called waitpid()
Child exits before parent reaps it

### 4.2.3 Inter-Process Communication

Mechanism
Bandwidth
Latency
Best For
Anonymous Pipe
~2 GB/s
~1 µs
Parent-child streaming (shell: ls | grep)
Unix Domain Socket
~8 GB/s
~2 µs
Local daemon IPC (Docker, PostgreSQL, Redis)
Shared Memory (mmap)
~50 GB/s
< 100 ns
High-throughput: video, databases, game engines
TCP Loopback
~20 GB/s
~20 µs
Services that may later be distributed
Signal
minimal
~2 µs
Lifecycle: SIGTERM (shutdown), SIGHUP (reload config)
POSIX Message Queue
~300 MB/s
~5 µs
Decoupled producers and consumers


---`
  },
  {
    id: "4-3",
    number: "4.3",
    title: "Processes: The Unit of Isolation",
    content: `Threads share a process address space, file descriptors, and most resources but each has its own stack, registers, and program counter. Threads enable CPU parallelism and concurrent I/O. The fundamental challenge: shared memory corrupted by uncoordinated concurrent access produces data races — non-deterministic, intermittent, extraordinarily hard to reproduce.

### 4.3.1 Python GIL: What It Means for You


\`\`\`python
import threading, time, multiprocessing

# THE GIL (Global Interpreter Lock):
# CPython allows only ONE thread to execute Python bytecode at a time.
# Released during I/O operations (read, write, recv, send, sleep)

# CPU-BOUND: threading gives NO speedup (GIL blocks parallelism)
def cpu_work(n):
return sum(i*i for i in range(n))

N = 5_000_000
t0 = time.perf_counter()
t1 = threading.Thread(target=cpu_work, args=(N,))
t2 = threading.Thread(target=cpu_work, args=(N,))
\`\`\`

t1.start(); t2.start(); t1.join(); t2.join()

\`\`\`python
thread_time = time.perf_counter() - t0
# Result: same as single-threaded or SLOWER (GIL contention)

# CPU-BOUND FIX: multiprocessing (separate Python interpreters, no GIL)
t0 = time.perf_counter()
with multiprocessing.Pool(2) as pool:
\`\`\`

pool.map(cpu_work, [N, N])

\`\`\`python
mp_time = time.perf_counter() - t0
# Result: ~2x faster — each process has its own GIL

print(f'Threading: {thread_time:.2f}s Multiprocessing: {mp_time:.2f}s')

# I/O-BOUND: threading IS effective
# While thread A waits on network recv(), thread B runs Python code
# GIL is RELEASED during all I/O — genuine concurrency
# 10 simultaneous HTTP requests: threaded = ~100ms, sequential = ~1000ms

# PYTHON 3.13 NO-GIL BUILD:
# Experimental. Removes GIL for true CPU parallelism with threads.
# Uses per-object biased reference counting.
# Expected stable around Python 3.14.
\`\`\`

### 4.3.2 Synchronization Primitives: The Complete Guide


\`\`\`python
import threading
from collections import deque

# MUTEX (Lock): one thread at a time in critical section
counter = 0
lock = threading.Lock()

def safe_increment(n):
\`\`\`

global counter

\`\`\`python
for _ in range(n):
with lock: # acquire → critical section → release
\`\`\`

counter += 1 # without lock: race condition → lost updates


\`\`\`python
# WHY counter += 1 needs a lock:
# Bytecode: LOAD_GLOBAL counter, LOAD_CONST 1, BINARY_ADD, STORE_GLOBAL
# GIL can switch threads between ANY two bytecodes
# Thread A reads 5. Thread B reads 5. Both write 6. Net: 6 not 7.
# This is a lost update data race.

# CONDITION VARIABLE: wait for a condition to become true
buffer = deque(maxlen=10)
cond = threading.Condition()

def producer(items):
for item in items:
with cond:
while len(buffer) == buffer.maxlen:
\`\`\`

cond.wait() # release lock + sleep atomically
buffer.append(item)
cond.notify_all() # wake waiting consumers


\`\`\`python
def consumer():
results = []
while True:
with cond:
while not buffer: # ALWAYS while-loop, never if
\`\`\`

cond.wait() # spurious wakeups are real

\`\`\`python
item = buffer.popleft()
\`\`\`

cond.notify_all() # wake producers (space freed)

\`\`\`python
if item is None: break # sentinel value means done
\`\`\`

results.append(item)

\`\`\`python
return results

# SEMAPHORE: limit concurrent access to N
db_pool = threading.Semaphore(10) # max 10 concurrent DB connections
def query(sql):
with db_pool: # blocks if 10 threads already inside
return execute_sql(sql)

# BARRIER: all threads must arrive before any proceed
barrier = threading.Barrier(4)
def worker(wid):
result = do_phase_1(wid)
\`\`\`

barrier.wait() # ALL 4 threads must finish phase 1

\`\`\`python
do_phase_2(wid, result) # now phase 2 can use all phase 1 results
\`\`\`

### 4.3.3 Deadlock: Prevention

Deadlock occurs when threads form a circular wait: A waits for B's lock, B waits for A's lock, neither can proceed. Coffman's four conditions must ALL hold: mutual exclusion, hold-and-wait, no preemption, circular wait. Break any one condition to prevent deadlock.

\`\`\`python
import threading
lock_a = threading.Lock()
lock_b = threading.Lock()

# DEADLOCK: Thread 1 acquires A then B
# Thread 2 acquires B then A → circular wait

# FIX 1: Lock ordering — always acquire in same global order
def thread_safe_1():
with lock_a: # always acquire A before B
with lock_b: # never the reverse
\`\`\`

pass # critical section


\`\`\`python
def thread_safe_2():
with lock_a: # same order — deadlock impossible
with lock_b:
\`\`\`

pass


\`\`\`python
# FIX 2: Try-lock with timeout
def thread_timeout():
if not lock_a.acquire(timeout=1.0):
raise TimeoutError('lock_a unavailable')
try:
if not lock_b.acquire(timeout=1.0):
\`\`\`

lock_a.release() # release what we hold

\`\`\`python
raise TimeoutError('lock_b unavailable')
try:
\`\`\`

pass # critical section
finally:
lock_b.release()
finally:
lock_a.release()


\`\`\`python
# DETECTING DEADLOCK IN PRODUCTION:
# Java: jstack PID → shows all threads and lock ownership
# Go: runtime panics with 'all goroutines are asleep — deadlock'
# Python: faulthandler.dump_traceback_later(5) dumps stacks after 5s
# Linux: watchdog thread alerts if lock held > N seconds
\`\`\`

---`
  },
  {
    id: "4-4",
    number: "4.4",
    title: "Process Creation: fork(), exec(), and waitpid()",
    content: `The CPU scheduler decides which runnable thread gets CPU time. Scheduling decisions happen thousands of times per second and directly determine application responsiveness. Understanding scheduling explains latency spikes, priority starvation, and how to tune process priorities.
Algorithm
Core Idea
Strength
Linux Usage
Round Robin
Time quantum (1-100ms), preempt if not done
Fair, no starvation
Default for normal processes
CFS (Completely Fair Scheduler)
Run thread with lowest accumulated virtual runtime
Fair weighted distribution
Linux default since 2.6.23
EEVDF (Linux 6.6+)
Eligible earliest deadline first
Better latency
Linux 6.6+ replacing CFS
SCHED_FIFO (Real-Time)
Runs until done or preempted by higher RT task
Guaranteed low latency
Audio, HFT, robotics
SCHED_BATCH
Treats process as batch — lower priority
Good for background jobs
CI builds, backups


\`\`\`python
# MEASURING CONTEXT SWITCH COST: pipe ping-pong benchmark
import os, time

def measure_context_switch(iterations=100_000):
# Two pipes: parent→child and child→parent
\`\`\`

pr, pw = os.pipe() # parent reads, child writes
cr, cw = os.pipe() # child reads, parent writes


\`\`\`python
pid = os.fork()
if pid == 0: # CHILD
\`\`\`

os.close(pr); os.close(cw)

\`\`\`python
for _ in range(iterations):
\`\`\`

os.read(cr, 1) # wait for parent ping
os.write(pw, b'x') # send pong
os._exit(0)

\`\`\`python
else: # PARENT
\`\`\`

os.close(cr); os.close(pw)

\`\`\`python
t0 = time.perf_counter()
for _ in range(iterations):
\`\`\`

os.write(cw, b'x') # ping
os.read(pr, 1) # wait for pong

\`\`\`python
elapsed = time.perf_counter() - t0
\`\`\`

os.waitpid(pid, 0)

\`\`\`python
# 2 context switches per iteration
us = elapsed / (iterations * 2) * 1_000_000
print(f'Context switch cost: {us:.1f} µs')
# Typical: 2-5 µs on modern hardware

measure_context_switch()

# WHY THIS MATTERS FOR ARCHITECTURE:
# 10,000 threads × 100 switches/sec × 3 µs = 3 seconds of switching/sec
# 30% of server CPU wasted on context switches at high concurrency
# Async I/O (event loop): ZERO context switches for I/O handling
# This is why nginx beats Apache at high connection counts

# TUNING PROCESS PRIORITY:
\`\`\`

os.nice(10) # lower priority (nice 0-19, higher = nicer = lower priority)

\`\`\`python
# os.nice(-5) # higher priority (requires root / CAP_SYS_NICE)
# $ nice -n 10 ./batch_job start command at lower priority
# $ renice -n 5 -p PID change priority of running process
# $ chrt -f -p 50 PID set SCHED_FIFO real-time priority 50 (requires root)
\`\`\`

---`
  },
  {
    id: "4-5",
    number: "4.5",
    title: "Process States: Running, Runnable, Blocked, Zombie",
    content: `System calls are how user programs request kernel services. Every file read, network connection, memory allocation, and process creation invokes a system call. They cost 100-400ns each due to ring transition and kernel validation. Minimizing and batching syscalls is a real performance optimization.

\`\`\`python
# WHAT HAPPENS WHEN Python CALLS open('file.txt', 'r'):
\`\`\`

#

\`\`\`python
# 1. Python runtime → C library fopen() → glibc open() wrapper
# 2. glibc sets registers: RAX=2 (syscall number for open on Linux x86-64)
# RDI=pointer to filename string
# RSI=O_RDONLY flags
# 3. SYSCALL instruction: CPU switches to ring 0 (kernel mode)
# saves user registers, loads kernel stack
# 4. Kernel sys_openat(): validates filename, checks permissions,
# allocates file descriptor entry, creates struct file
# 5. SYSRET: restores user registers, returns fd in RAX
\`\`\`

#

\`\`\`python
# COST: ~100-150ns before Meltdown mitigations
# ~200-400ns with KPTI (Kernel Page Table Isolation)

# STRACE: see every syscall your program makes
# $ strace -c python3 -c 'print(42)'
\`\`\`

#

\`\`\`python
# % time calls syscall
# 45.2 46 mmap (allocate virtual memory)
# 28.4 37 openat (open files for imports)
# 15.8 33 read (read module files)
# 0.5 1 write (the actual print!)
\`\`\`

#

\`\`\`python
# 200+ syscalls just to print '42'
# The write to stdout is 0.5% of all syscalls
# Everything else is Python startup and module loading

# REDUCING SYSCALL OVERHEAD:
# 1. Batch writes: one write(64KB) beats 64 × write(1KB)
# 2. io_uring (Linux 5.1+): submit many I/Os with ONE syscall
# Shared ring buffers between kernel and userspace → >10M IOPS
# 3. vDSO: gettimeofday, clock_gettime mapped to user space
# No ring transition needed: ~5ns instead of ~200ns
# 4. mmap files: access via memory, no read/write syscalls per access
# 5. splice/sendfile: zero-copy transfer in kernel space
\`\`\``
  },
  {
    id: "4-6",
    number: "4.6",
    title: "Inter-Process Communication: Pipes, Sockets, Shared Memory, Signals",
    content: `Understanding file I/O semantics — specifically the difference between data in OS cache and data on stable storage — is essential for building correct, durable applications. This is where most engineers have dangerous gaps.

\`\`\`python
import os

# THE DURABILITY HIERARCHY:
\`\`\`

#

\`\`\`python
# write(fd, data) → data in OS page cache. NOT on stable storage.
# Power failure: data MAY be lost. Speed: ~500ns.
\`\`\`

#

\`\`\`python
# fdatasync(fd) → data and minimal metadata on stable storage.
# Power failure: data survives. Speed: ~1-10ms.
\`\`\`

#

\`\`\`python
# fsync(fd) → data AND all metadata on stable storage.
# Stricter than fdatasync. Slightly slower.

# WRITING CORRECTLY: write() may return fewer bytes than requested
def write_all(fd, data):
sent = 0
while sent < len(data):
n = os.write(fd, data[sent:])
if n == 0: raise IOError('write returned 0')
\`\`\`

sent += n


\`\`\`python
# ATOMIC FILE UPDATE — crash-safe pattern:
def atomic_write(path, content):
\`\`\`

'''
Write to temp file, sync, rename.
POSIX rename() is atomic: readers see old OR new, never partial.
'''

\`\`\`python
tmp = path + '.tmp'
fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o644)
try:
write_all(fd, content)
\`\`\`

os.fdatasync(fd) # ensure content is on disk
finally:
os.close(fd)
os.rename(tmp, path) # atomic directory entry update

\`\`\`python
# Sync the directory to ensure rename survives power failure:
dir_fd = os.open(os.path.dirname(path) or '.', os.O_RDONLY)
\`\`\`

os.fsync(dir_fd)
os.close(dir_fd)


\`\`\`python
# WRITE-AHEAD LOG (WAL) — how databases achieve durability:
# Instead of writing data pages immediately (random writes = slow),
# write to sequential append-only log first, then acknowledge.
# On crash: replay the log to reconstruct state.
# PostgreSQL, MySQL InnoDB, SQLite, etcd, RocksDB, Kafka all use WAL.
# Result: durable writes at sequential I/O speed (~2 GB/s NVMe)
# instead of random I/O speed (~100K IOPS × 4KB = 400 MB/s)

# COMMON DURABILITY BUGS:
# Bug 1: write() without fdatasync() before acknowledging to client
# → client believes data is safe, power failure loses it
# Bug 2: updating file in-place without atomic rename
# → crash mid-write produces half-old half-new corrupt file
# Bug 3: syncing file but not directory
# → rename may not survive power failure on some filesystems
\`\`\`


⚠️ THE fsync() LIE — Pre-Linux 4.16
Before Linux 4.16: I/O errors during page writeback were silently discarded.
The next fsync() returned SUCCESS even though data was NOT on disk.

PostgreSQL called fsync() and believed the WAL was durable.
It acknowledged transactions as committed.
The WAL data was NOT actually on disk.
On crash: recovery produced corrupted data.

Fix: Linux 4.16 now reliably reports writeback errors to next fsync().

Lesson: durability guarantees are layered. Test your full storage stack.
Especially on cloud block storage — EBS, GCS PD, Azure Disk.
Never assume fsync means what you think until you have verified it.`
  },
  {
    id: "4-7",
    number: "4.7",
    title: "Threads: Concurrency Within a Process",
    content: `Build a minimal shell: fork+exec commands, handle pipes (cmd1 | cmd2), I/O redirection (> file, < file), background jobs (&), zombie reaping via SIGCHLD handler. Measure fork+exec+waitpid latency for a trivial command.
Deadlock experiment: 5 threads, 5 locks. Create a version that deadlocks. Fix with lock ordering. Add timeout detection. Report time to deadlock and false positive rate of timeout detection.
Context switch benchmark: pipe ping-pong. Vary thread count 1,2,4,8,16,32. Pin threads with os.sched_setaffinity(). Compare voluntary vs involuntary switches via /proc/PID/status.
strace analysis: Profile (a) python3 -c 'print(42)', (b) HTTP server handling one request, (c) SQLite with 1000 INSERTs. Count syscalls, identify top 3 by count and time, find one optimization for each.
Durable key-value store: put(key, value) and get(key) backed by a WAL. put() must survive SIGKILL. Test: write 1000 records, SIGKILL the process, restart, verify all 1000 present. Measure throughput.
Chapter 4 — Twelve OS Engineering Truths
Every Unix process descends from fork(). fork()+exec() gives full control over environment, I/O, and privileges before the new program starts.
Zombies accumulate if waitpid() is never called. Install a SIGCHLD handler or explicitly wait for every spawned child process.
Python GIL prevents CPU parallelism for pure Python threads. Use multiprocessing for CPU-bound. Threads work correctly for I/O-bound work.
Deadlock requires four conditions simultaneously. Break any one: enforce lock ordering, use timeouts, or eliminate hold-and-wait.
A context switch costs 1-15 µs. Thousands of threads at high concurrency waste significant CPU. Async I/O eliminates this overhead.
System calls cost 100-400 ns. Batch I/O. Use io_uring for high throughput. Use mmap to eliminate repeated read/write syscall overhead.

\`\`\`python
write() does NOT guarantee durability. Only fdatasync() or fsync() after write() guarantees data reaches stable storage hardware.
\`\`\`

Atomic file update: write temp file, fdatasync, rename(). POSIX rename is atomic. Never update a file in-place without atomic replace.
The Write-Ahead Log is why databases can be fast (sequential writes) AND durable (log replayed on crash recovery).
CFS runs thread with least accumulated virtual runtime. nice values adjust weight. cgroups impose hard CPU percentage limits.
strace reveals what code actually does at the OS level. Use it for mysterious slowness, unexpected file access, and permission failures.
fsync success does not guarantee durability on all Linux kernel versions below 4.16. Test crash-consistency explicitly on your storage stack.


---


CHAPTER 5
DATA STRUCTURES: THEORY TO MASTERY
Every Structure, Every Operation, Every Trade-off — Completely Understood

"Smart data structures and dumb code works a lot better than the other way around." — Eric S. Raymond`
  },
  {
    id: "4-8",
    number: "4.8",
    title: "The POSIX Threading Model",
    content: `On Unix-like systems, the standard for threading is **pthreads** (POSIX Threads). It defines an API and set of behaviors that allow C/C++ programs to be portable across Linux, macOS, and FreeBSD.

## Key Functions
- \`pthread_create()\`: Spawns a new thread.
- \`pthread_join()\`: Waits for a thread to finish (like \`waitpid\` for processes).
- \`pthread_detach()\`: Tells the system to clean up the thread automatically when it ends.

## Example: Spawning a Thread
\`\`\`c
#include <pthread.h>
#include <stdio.h>

void* print_hello(void* arg) {
    printf("Hello from thread!\\n");
    return NULL;
}

int main() {
    pthread_t thread;
    pthread_create(&thread, NULL, print_hello, NULL);
    pthread_join(thread, NULL); // Wait for it to finish
    return 0;
}
\`\`\`

## Memory Model
POSIX specifies that memory changes made by one thread are only guaranteed to be visible to another thread if they use a synchronization primitive (like a Mutex). Without this, the CPU or Compiler might reorder operations, leading to impossible-to-find bugs.

## Linux Implementation: NPTL
On Linux, threads are implemented by the **Native POSIX Thread Library (NPTL)**. Interestingly, the Linux kernel doesn't distinguish between processes and threads—it calls both "Tasks." A thread is just a task that shares its memory space with another task. This is achieved via the powerful \`clone()\` system call.
`
  },
  {
    id: "4-9",
    number: "4.9",
    title: "The Python GIL: What It Is and How to Work Around It",
    content: `One of the most famous (and controversial) topics in OS/Language interaction is the **Global Interpreter Lock (GIL)** in CPython.

## What is the GIL?
The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at once. This means even if you have 64 CPU cores, a single Python process will only ever use **one core** at a time for Python code.

## Why does it exist?
1. **Refcounting**: Python uses reference counting for GC. Without a lock, two threads could increment a refcount simultaneously, leading to memory leaks or crashes.
2. **Simplicity**: It makes writing C extensions much easier.
3. **Legacy**: It was added in the early 90s when multi-core CPUs weren't common.

## The Workarounds
1. **Multiprocessing**: Use the \`multiprocessing\` module to spawn separate *processes*. Each process has its own GIL and its own core. (Cost: Higher memory usage, requires IPC).
2. **Native Extensions**: Libraries like **NumPy** or **TensorFlow** release the GIL when doing heavy math in C/C++.
3. **AsyncIO**: For I/O bound tasks (web servers), use \`asyncio\`. It doesn't solve the "one core" problem, but it allows one thread to handle thousands of connections efficiently.

## The Future
As of Python 3.13, there is an experimental "Free-threaded" mode that allows running Python without a GIL. This is a massive engineering effort that requires replacing the simple GIL with much more complex fine-grained locking.
`
  },
  {
    id: "4-10",
    number: "4.10",
    title: "Mutexes, Condition Variables, and Semaphores",
    content: `To write safe concurrent code, we use **Synchronization Primitives**. These are the "traffic lights" of the multi-threaded world.

## 1. Mutex (Mutual Exclusion)
A lock that only one thread can hold at a time.
- **Lock**: If the mutex is held, the thread blocks.
- **Unlock**: Releases the lock and wakes up one waiting thread.
- *Use for: Protecting a shared variable or data structure.*

## 2. Semaphore
A counter that controls access to a finite resource.
- **P (Wait)**: Decrements the counter. If counter is 0, blocks.
- **V (Signal)**: Increments the counter.
- *Use for: Limiting access to a pool of connections (e.g., "only 5 threads can talk to the DB").*

## 3. Condition Variable (CV)
A way for a thread to wait for a specific "condition" to become true.
- **Wait**: Atomically releases a mutex and sleeps.
- **Signal**: Wakes up one thread waiting on the CV.
- *Use for: The Producer-Consumer problem (e.g., "wait until there is an item in the queue").*

## The Golden Rule: Always Lock/Unlock the same Mutex
\`\`\`c
pthread_mutex_lock(&lock);
// Critical Section: modify shared data
pthread_mutex_unlock(&lock);
\`\`\`

## Pitfall: Priority Inversion
A low-priority thread holds a lock. A high-priority thread wants it and blocks. A medium-priority thread comes along and takes the CPU (since it doesn't need the lock). Now the high-priority thread is waiting for a low-priority thread that isn't even running! Modern OSs solve this via **Priority Inheritance**.
`
  },
  {
    id: "4-11",
    number: "4.11",
    title: "Deadlock: Detection, Prevention, and Recovery",
    content: `A **Deadlock** is a state where two or more threads are stuck forever, each waiting for a resource held by the other.

## The Four Necessary Conditions (Coffman Conditions)
For a deadlock to occur, all four must be true:
1. **Mutual Exclusion**: Resources cannot be shared.
2. **Hold and Wait**: A thread holding a resource can wait for another.
3. **No Preemption**: Resources cannot be forcibly taken away.
4. **Circular Wait**: Thread A waits for B, who waits for A.

## Prevention: The Hierarchy
The most common way to prevent deadlock is to enforce a **Lock Ordering**. If all threads always acquire Lock A before Lock B, a circular wait is impossible.

\`\`\`c
// Thread 1
lock(A); lock(B); // OK

// Thread 2
lock(B); lock(A); // DANGER! This can deadlock.
\`\`\`

## Detection and Recovery
Some systems (like high-end Databases) maintain a "Wait-For Graph." If a cycle is detected:
1. **Abort**: Kill one of the deadlocked processes.
2. **Preempt**: Forcibly take a resource away (difficult to do safely).
3. **Rollback**: Return to a previous "checkpoint" (used in DBs).

## The "Ostrich Algorithm"
Most general-purpose OSs (Windows, Linux, macOS) actually do nothing. They assume deadlocks are rare and it's better to let the user "force quit" a frozen app than to pay the performance cost of constant deadlock detection.
`
  },
  {
    id: "4-12",
    number: "4.12",
    title: "Lock-Free Programming and Atomic Operations",
    content: `Locks are slow. They involve context switches and can lead to deadlocks. **Lock-Free Programming** uses special hardware instructions to update data safely without ever "blocking."

## Atomic Operations
Most modern CPUs provide instructions that are guaranteed to be "atomic" (indivisible).
- **Atomic Increment**: \`x++\` that is safe across threads.
- **Compare-and-Swap (CAS)**: "If the value of X is currently 5, change it to 10. Otherwise, do nothing and tell me what it was."

## Example: Atomic Counter (Pseudocode)
\`\`\`c
void increment(atomic_int *counter) {
    int old_val;
    do {
        old_val = *counter;
    } while (!CAS(counter, old_val, old_val + 1));
}
\`\`\`

## Advantages
1. **Performance**: No kernel intervention, no context switches.
2. **No Deadlocks**: Since there are no locks, you can't have a circular wait.
3. **Fault Tolerance**: If a thread is killed while performing an atomic op, the data isn't left in a "locked" state.

## The "ABA" Problem
A major pitfall in lock-free code. Thread A reads value \`A\`. Thread B changes it to \`B\` and then back to \`A\`. Thread A performs a CAS and succeeds, thinking nothing changed. This can cause memory corruption in structures like linked lists. We solve this using "versioning" or "hazard pointers."

---
Lock-free programming is incredibly difficult to get right. Unless you are building a low-level primitive (like a queue for a high-performance actor system), you should probably stick to Mutexes.
`
  },
  {
    id: "4-13",
    number: "4.13",
    title: "CPU Scheduling: FIFO, Round Robin, Priority, CFS, EEVDF",
    content: `The **Scheduler** is the part of the kernel that decides which "Runnable" process gets to use the CPU next.

## Basic Algorithms
- **FIFO (First-In, First-Out)**: Simple, but a single long task can block everything else ("Convoy Effect").
- **Round Robin (RR)**: Each process gets a "Time Slice" (e.g., 10ms). Good for responsiveness.
- **Priority**: High-priority tasks run first. (Danger: Starvation).

## Linux: Completely Fair Scheduler (CFS)
For over a decade, Linux used CFS. It uses a **Red-Black Tree** to track the "virtual runtime" of every process. The process that has had the *least* amount of CPU time is always at the left of the tree and gets scheduled next. This ensures perfect "fairness."

## The New Frontier: EEVDF
In 2023, Linux started moving to **EEVDF (Earliest Eligible Virtual Deadline First)**. 
While CFS is "fair" over the long term, it doesn't guarantee *when* a process will run. EEVDF adds a "deadline" concept, allowing the scheduler to be both fair AND better at handling latency-sensitive tasks like audio processing or video games.

## Throughput vs. Latency
- **Server OS**: Wants high throughput (longer time slices, fewer context switches).
- **Desktop/Mobile OS**: Wants low latency (shorter time slices, snappy feel).

You can often tune this in the kernel. On Linux, look at \`/proc/sys/kernel/sched_latency_ns\`.
`
  },
  {
    id: "4-14",
    number: "4.14",
    title: "Context Switching: Cost and Measurement",
    content: `A **Context Switch** is the process of the CPU stopping one task and starting another. While it happens thousands of times a second, it is not free.

## What Happens During a Switch?
1. **Save State**: Save the current registers (PC, SP, etc.) to the PCB.
2. **Switch Address Space**: Update the page table pointer (CR3 register on x86).
3. **Load State**: Load the registers for the new process.
4. **Cache/TLB Invalidation**: This is the "hidden" cost. The new process's data isn't in the L1/L2 caches or the TLB. The first few microseconds of the new process will be slow as it "warms up" the cache.

## Measuring the Cost
On a modern Linux system, a context switch takes between **1 to 5 microseconds**.
If your app context switches 100,000 times a second, you are losing ~10-50% of your CPU just to management overhead!

## Voluntary vs. Involuntary
- **Voluntary**: The process "gave up" the CPU (e.g., waiting for I/O).
- **Involuntary**: The Scheduler "kicked" the process off because its time slice ended.

\`\`\`bash
# See context switches for a process
grep ctxt /proc/<pid>/status
# voluntary_ctxt_switches: 123
# nonvoluntary_ctxt_switches: 45
\`\`\`

## High-Performance Engineering
To minimize context switches:
1. **Pinning (Affinity)**: Lock a thread to a specific CPU core.
2. **Batching**: Do more work per "wake up."
3. **User-level Threading**: Use Go or Erlang to handle thousands of tasks on a small number of OS threads.
`
  },
  {
    id: "4-15",
    number: "4.15",
    title: "Real-Time Scheduling and Latency Guarantees",
    content: `In a standard OS, "fairness" is the goal. In a **Real-Time Operating System (RTOS)**, "predictability" is the goal.

## Hard vs. Soft Real-Time
- **Hard Real-Time**: If the deadline is missed, the system has failed (e.g., car airbag, airplane flight control).
- **Soft Real-Time**: Missing a deadline is bad but not catastrophic (e.g., video streaming stutter).

## Determinism
A Real-Time scheduler guarantees that a task will start within **X microseconds** of an event. To achieve this, RTOSs often:
1. **Disable Caching/Paging**: To avoid unpredictable "page faults."
2. **Preemptible Kernel**: A high-priority task can interrupt the kernel itself.
3. **Fixed-Priority Scheduling**: No "fairness"—the highest priority task runs as long as it wants.

## Linux and Real-Time
Standard Linux is not an RTOS. However, the **PREEMPT_RT** patch set (now mostly merged into the main kernel) turns Linux into a "Hard" Real-Time system by making almost every part of the kernel interruptible.

## Real-world Example: SpaceX
SpaceX's Falcon 9 rockets run a stripped-down Linux with real-time patches. The flight control loop must run at a precise frequency (e.g., 50Hz) to calculate engine gimbal adjustments. If the OS decided to do a "fair" background disk cleanup at that moment, the rocket would explode.
`
  },
  {
    id: "4-16",
    number: "4.16",
    title: "System Calls: The Interface to the Kernel",
    content: `**System Calls (Syscalls)** are the API of the operating system. They are the only way for a User Mode program to request services from the Kernel.

## The Standard Categories
- **Process Control**: \`fork\`, \`exit\`, \`wait\`
- **File Management**: \`open\`, \`read\`, \`write\`, \`close\`
- **Device Management**: \`ioctl\`, \`read\`, \`write\`
- **Information Maintenance**: \`getpid\`, \`time\`
- **Communication**: \`pipe\`, \`mmap\`, \`socket\`

## The Wrapper Library
You rarely call syscalls directly. Instead, you use a library like **libc** (on Linux) or the **Win32 API**.
- You call: \`printf("hello")\`
- Library calls: \`write(1, "hello", 5)\`
- OS performs: The actual physical I/O to the terminal.

## The Overhead
Every syscall involves a mode switch (User -> Kernel -> User). This takes ~100-200ns. 
If you write a loop that calls a syscall 1,000,000 times to write 1 byte each time, it will be incredibly slow. This is why **Buffering** (like C's \`fwrite\`) is so important—it groups many small writes into one large syscall.

## Linux Syscall Table
Each syscall has a unique number. On x86-64 Linux:
- \`0\`: read
- \`1\`: write
- \`2\`: open
- \`60\`: exit

You can find the full list in \`/usr/include/asm/unistd_64.h\`.
`
  },
  {
    id: "4-17",
    number: "4.17",
    title: "The x86-64 System Call Mechanism",
    content: `How does the CPU actually perform the jump from User to Kernel mode? On modern x86-64, it uses a specialized instruction called \`syscall\`.

## The Legacy: \`int 0x80\`
In the 32-bit era, syscalls were performed using a "Software Interrupt" (\`int 0x80\`). This was slow because the CPU had to go through the full interrupt handling logic, which involved many memory lookups.

## The Modern Way: \`syscall\` / \`sysret\`
The \`syscall\` instruction was designed for speed. It uses Model-Specific Registers (MSRs) to store the jump target, avoiding the need to look up an interrupt table.

## The Register Protocol
To make a syscall on Linux x86-64:
1. Put the **Syscall Number** in the \`rax\` register.
2. Put the **Arguments** in \`rdi\`, \`rsi\`, \`rdx\`, \`r10\`, \`r8\`, \`r9\`.
3. Execute the \`syscall\` instruction.
4. The result comes back in \`rax\`.

## Example (Assembly)
\`\`\`asm
mov rax, 60    ; syscall number for exit
mov rdi, 0     ; return code 0
syscall        ; go!
\`\`\`

## Spectre and Meltdown
These famous CPU vulnerabilities exploited the way syscalls handled memory. To fix them, OSs had to implement **KPTI (Kernel Page Table Isolation)**, which makes the jump from User to Kernel mode much more expensive because it now requires a full TLB flush. This is why many servers saw a 5-20% performance drop in 2018.
`
  },
  {
    id: "4-18",
    number: "4.18",
    title: "strace and System Call Tracing",
    content: `If you could only learn one debugging tool for Linux, it should be **strace**. It allows you to see every system call a process makes in real-time.

## Why use it?
- **Mystery Hangs**: Is the program stuck in a loop, or is it waiting for a network packet?
- **Missing Files**: Why did the app fail to start? (You might see a \`ENOENT\` error when it tries to open a config file).
- **Performance**: Is the app doing thousands of tiny \`read()\` calls instead of one big one?

## Usage Examples
\`\`\`bash
# Trace a new command
strace ls -l

# Attach to a running process
strace -p <pid>

# Count syscalls and see timing
strace -c ls -l
\`\`\`

## Interpreting Output
Output looks like this:
\`\`\`c
openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
fstat(3, {st_mode=S_IFREG|0644, st_size=83452, ...}) = 0
mmap(NULL, 83452, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f83e2
\`\`\`
Each line shows the name of the syscall, the arguments passed to it, and the return value.

## Security Warning
\`strace\` can see everything a program does, including passwords passed to \`write()\` or \`connect()\`. It uses a kernel feature called \`ptrace\`, which is why you often need \`sudo\` to trace a process you don't own.
`
  },
  {
    id: "4-19",
    number: "4.19",
    title: "File Systems: The Complete Abstraction",
    content: `A **File System** is a way of organizing and storing data on a persistent device. It turns a giant, linear array of bytes (the disk) into a human-friendly hierarchy of directories and files.

## The Hierarchy of Abstraction
1. **User View**: Directories, filenames, extensions.
2. **File API**: \`open\`, \`read\`, \`write\`.
3. **The Logical Layer**: Inodes, directories, path resolution.
4. **The Block Layer**: Mapping files to specific blocks on disk.
5. **The Driver Layer**: Talking to the NVMe/SATA controller.

## What is a "File"?
To the OS, a file is just a stream of bytes. It has no internal structure. Whether those bytes represent a JPEG, a PDF, or a Database is entirely up to the application.

## Metadata
Every file has metadata that isn't part of the content:
- **Ownership** (UID/GID)
- **Permissions** (Read/Write/Execute)
- **Timestamps** (Created, Modified, Accessed)
- **Size**

## Journaling
Modern file systems (like **ext4**, **NTFS**, **APFS**) are "Journaling" file systems. Before making any change to the disk, they write the intended change to a small "Journal." If the power goes out mid-write, the OS can look at the journal and either finish the operation or roll it back, preventing disk corruption.
`
  },
  {
    id: "4-20",
    number: "4.20",
    title: "The POSIX File API: open, read, write, fsync, mmap",
    content: `To interact with the file system, nearly all languages use a set of standard system calls defined by the POSIX standard.

## 1. open(path, flags)
Returns a **File Descriptor (FD)**—a small integer that represents your "handle" to the file. 
- Flags include \`O_RDONLY\`, \`O_WRONLY\`, \`O_CREAT\` (create if it doesn't exist), and \`O_TRUNC\` (clear existing content).

## 2. read / write
Copy bytes between a buffer in your program and the file. Note that these are "synchronous"—the thread blocks until the OS says the operation is complete.

## 3. fsync(fd)
This is the most critical call for database engineers. When you call \`write()\`, the OS doesn't usually write to the physical disk immediately; it just copies the data into the **Page Cache** (RAM). \`fsync()\` forces the OS to actually flush that data to the hardware. Without it, a power failure could lose your "saved" data.

## 4. mmap(addr, len, prot, flags, fd, offset)
Map a file directly into memory. This bypasses the \`read()\`/\`write()\` buffers and allows you to treat a file on disk as if it were an array in RAM.

## The File Descriptor Table
Each process has a private table of open FDs.
- \`0\`: stdin
- \`1\`: stdout
- \`2\`: stderr
- \`3+\`: Files, Sockets, Pipes you open.

When you call \`close(3)\`, the entry is removed and the resource is freed. If you forget to close files, you will hit the "Too many open files" limit.
`
  },
  {
    id: "4-21",
    number: "4.21",
    title: "Buffered vs Unbuffered I/O",
    content: `When you write code to save data, you must choose between "Buffered" and "Unbuffered" I/O. This decision dramatically impacts performance.

## Unbuffered I/O (System Level)
Each call like \`write()\` or \`read()\` goes directly to the Kernel. 
- **Pros**: You have precise control over when data moves.
- **Cons**: High overhead for small operations due to syscall costs.

## Buffered I/O (Library Level)
Standard libraries (like C's \`stdio.h\` or Python's \`open()\`) maintain a buffer in user memory (usually 4KB or 8KB).
- **Process**: When you call \`fprintf\`, the data is stored in the library buffer. When the buffer is full (or you call \`flush\`), the library makes *one* large \`write()\` syscall.
- **Pros**: Much faster for many small writes.
- **Cons**: If the program crashes before the buffer is flushed, that data is lost forever.

## Direct I/O (\`O_DIRECT\`)
Advanced databases (like Oracle or MySQL) sometimes bypass the *Kernel's* buffer cache entirely using the \`O_DIRECT\` flag. This allows the database to manage its own caching logic (the "Buffer Pool") which is often more efficient for specific DB workloads than the general-purpose OS cache.

## Summary Table
| Type | Location | Managed By | Good For |
|------|----------|------------|----------|
| User Buffer | App RAM | libc (\`FILE*\`) | many small writes |
| Page Cache | System RAM | OS Kernel | general performance |
| Disk Cache | Hardware | Disk Controller | hardware safety |
`
  },
  {
    id: "4-22",
    number: "4.22",
    title: "The Write-Ahead Log: The Foundation of Durability",
    content: `How do systems like PostgreSQL or SQLite ensure that your data is never lost, even if the computer crashes halfway through an update? The answer is the **Write-Ahead Log (WAL)**.

## The Problem
Writing a complex update to a database (e.g., updating an index, a data row, and a metadata table) involves writing to multiple different locations on the disk. If the system crashes after writing the index but before the data row, the database is corrupted.

## The WAL Solution
Before making any changes to the actual data files, the system writes a description of the change to a single, sequential log file (the WAL).
1. **Append**: The change is appended to the WAL.
2. **fsync**: The WAL is flushed to disk.
3. **Commit**: Only now is the transaction considered "successful."
4. **Checkpoint**: Later, in the background, the changes are applied to the main data files.

## Why it's Faster
Sequential writes (appending to a log) are significantly faster than random writes (jumping around in a 100GB data file), especially on mechanical disks but also on SSDs.

## Recovery
If the system crashes, upon restart, the database simply "replays" the WAL. Any operation that was in the WAL but not yet in the main data files is re-applied. Any operation that didn't make it to the WAL is discarded.

---
WAL is the "Secret Sauce" of reliability in the software world. From file systems (journaling) to distributed systems (Raft/Paxos), the log is everything.
`
  },
  {
    id: "4-23",
    number: "4.23",
    title: "File System Internals: Inodes, Dentries, Extents",
    content: `To understand how the OS actually finds your data, we need to look at the internal data structures of a file system like **ext4**.

## 1. Inode (Index Node)
The most important structure. Every file has exactly one Inode. It stores all metadata (size, owner, permissions) and pointers to the actual data blocks. 
*Crucially, the Inode does NOT store the filename.*

## 2. Dentry (Directory Entry)
A directory is just a special file that contains a list of (Filename, Inode Number) pairs. This is why a single file (one Inode) can have multiple names—this is what a **Hard Link** is.

## 3. Extents
Old file systems used "block pointers"—a list of every single block a file occupied. For a 1GB file, this list was huge.
Modern systems use **Extents**: "This file starts at block 500 and continues for 10,000 blocks." This is much more compact and efficient for large, contiguous files.

## The Lookup Process
When you open \`/home/user/notes.txt\`:
1. OS looks at the Inode for \`/\` (usually Inode 2).
2. It finds the data blocks for \`/\` and searches for the name \`home\`.
3. It gets the Inode for \`home\`, finds its data, and searches for \`user\`.
4. It repeats this until it finds the Inode for \`notes.txt\`.

## The dentry cache
Because this lookup is slow, the kernel maintains a **dentry cache** in RAM to remember these mappings. This is why opening a file for the second time is nearly instant.
`
  },
  {
    id: "4-24",
    number: "4.24",
    title: "The Virtual File System (VFS) Layer",
    content: `Linux supports dozens of different file systems: ext4, XFS, Btrfs, NFS (Network), and even pseudo-file systems like \`/proc\`. How does a single \`read()\` call work across all of them? Through the **Virtual File System (VFS)**.

## The Interface Layer
The VFS is an abstraction layer inside the kernel. It defines a set of common operations that every file system must implement:
- \`vfs_read\`
- \`vfs_write\`
- \`vfs_open\`
- \`vfs_lookup\`

When you call \`read(fd, ...)\`, the kernel doesn't care what the file system is. It just looks up the "File" object associated with that FD, which contains a table of function pointers (\`file_operations\`). It then calls the specific function for that file system.

## Everything is a File
This is the genius of Unix. Because of the VFS, the OS can treat completely different things as "files":
- **Hardware**: \`/dev/sda\` (your disk)
- **Kernel State**: \`/proc/meminfo\` (memory stats)
- **Networking**: Sockets
- **Communication**: Pipes

## Benefits
1. **Uniformity**: Tools like \`cat\`, \`grep\`, and \`ls\` work on anything that looks like a file.
2. **Transparency**: An application doesn't need to know if it's writing to a local SSD or a server in another country (NFS).
`
  },
  {
    id: "4-25",
    number: "4.25",
    title: "Case Study: The fsync() Lie on Linux",
    content: `For years, developers trusted \`fsync()\` to guarantee their data was safe. In 2018, a major controversy erupted in the PostgreSQL community regarding how the Linux kernel handled \`fsync()\` errors.

## The Bug
When you call \`fsync()\`, the kernel sends the data to the disk. If the disk returns an error (e.g., "I'm out of space" or "Hardware failure"):
1. The kernel marks the pages in the Page Cache as "clean" (assuming they are now on disk).
2. It returns an error to the application.

## The Problem
If the application (like Postgres) sees the error and tries to call \`fsync()\` again, the kernel looks at its cache, sees the pages are "clean," and returns **Success**! 
The application thinks the data is safe, but it actually only existed in the kernel's RAM and was never written to the disk. The data was silently lost.

## The Fallout
This "fsyncgate" led to a massive overhaul in how databases handle I/O errors. 
- **The Fix**: Databases now often treat *any* \`fsync()\` error as a fatal event that requires immediate shutdown and a full recovery from logs.
- **The Lesson**: Even the most fundamental system calls have edge cases. As a systems engineer, you must understand the contract between the OS and the hardware. Don't assume "Success" always means what you think it means.
`
  },
  {
    id: "4-26",
    number: "4.26",
    title: "Case Study: Knight Capital's $440M Scheduling Bug",
    content: `In 2012, Knight Capital Group lost $440 million in 45 minutes due to a software deployment error. While often cited as a DevOps failure, it was at its heart a failure of **Environment Isolation** and **Process Management**.

## The Incident
Knight Capital deployed new code to 7 out of 8 servers. The 8th server was left running an old, decommissioned version of the software. Crucially, a configuration flag that used to mean "Do Not Trade" in the old code now meant "Trade Aggressively" in the new code.

## The OS Angle: Why didn't it fail?
1. **Zombie Configuration**: The old process was running in an environment that didn't match its expectations.
2. **Lack of Monitoring**: The system calls the process was making (thousands of trades per second) weren't being monitored for "anomalous behavior" by the OS or the infrastructure.
3. **Improper Process Cleanup**: The old code should have been completely purged from the system. Instead, it was left "dormant," waiting for a signal to wake up.

## The Systems Engineering Lesson
- **Immutability**: Modern systems solve this by using **Containers** (Docker). A container image includes the OS, the libraries, and the code. You don't "update" a server; you kill the old container and start a new one.
- **Process Supervision**: Using tools like \`systemd\` or \`Kubernetes\` ensures that only the exact intended processes are running. 
- **Audit Logging**: Tracking syscall frequency (e.g., with \`auditd\`) could have flagged the massive spike in network I/O immediately.
`
  },
  {
    id: "4-27",
    number: "4.27",
    title: "Exercises",
    content: `Deepen your OS knowledge by working through these practical and theoretical exercises.

## Questions

1. **Kernel Mode**: Why can't a user-mode program directly read the contents of a file from the disk by accessing the disk's hardware addresses?
2. **Fork/Exec**: If a process has 10 threads and it calls \`fork()\`, how many threads does the child process have?
3. **IPC Performance**: You need to transfer 1GB of data between two processes on the same machine. Which IPC mechanism should you use for maximum speed?
4. **Context Switches**: Why does increasing the number of threads beyond the number of CPU cores often decrease the total throughput of a CPU-bound application?
5. **Priority Inversion**: Explain a scenario where a low-priority thread can block a high-priority thread indefinitely.
6. **File Buffering**: Why is it faster to write 10,000 bytes at once than to write 1 byte 10,000 times?
7. **Inode Mechanics**: If you delete a file while another process still has it open, what happens to the data on the disk?
8. **Syscalls**: Why did the "Spectre" and "Meltdown" fixes make system calls slower?

---

## Answers

1. **Memory Protection**: The CPU is in Ring 3 (User Mode), which prevents instructions that interact with hardware I/O ports. Accessing hardware requires Ring 0 privileges.
2. **One Thread**: By POSIX standards, \`fork()\` only duplicates the thread that called it. All other threads vanish in the child. This is a common source of bugs (e.g., if another thread held a mutex during the fork).
3. **Shared Memory**: It is the only mechanism that requires zero copies. Both processes look at the same physical RAM.
4. **Scheduling Overhead**: The CPU spends more time saving/loading contexts and dealing with "cold" caches/TLBs than it does performing actual work.
5. **Scenario**: Low-priority thread holds a lock. High-priority thread waits for that lock. A medium-priority thread (not needing the lock) takes the CPU because it's higher than the low-priority one. The high-priority thread is now stuck.
6. **Syscall Overhead**: Each write is a system call. Writing 1 byte 10k times involves 10,000 mode switches and kernel transitions. Writing 10k bytes once involves only 1 mode switch.
7. **Delayed Deletion**: The OS removes the name from the directory (dentry), but the Inode and data blocks remain until the last process closes the file descriptor.
8. **KPTI (Kernel Page Table Isolation)**: To prevent side-channel attacks, the kernel and user memory were separated into different page tables. Switching between them now requires a full reload of the MMU tables, which is very slow.
`
  }
];
