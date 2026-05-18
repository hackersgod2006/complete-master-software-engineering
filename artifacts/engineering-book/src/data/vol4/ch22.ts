import type { Section } from '../types';

export const CH22_SECTIONS: Section[] = [
  {
    id: "22-1",
    number: "22.1",
    title: "The Philosophy of Resilience: Failure Is Normal",
    content: `In monolithic, local computing, we often treat errors as exceptional events—stack traces that signify a bug to be fixed. In **Distributed Systems**, failure is not an exception; it is a statistical certainty. When you operate at the scale of thousands of nodes and millions of network requests per second, the "one-in-a-million" event happens every few minutes.

## From Robustness to Resilience
Traditional engineering focuses on **Robustness**: building a system so strong it doesn't break. Think of a concrete dam. It works perfectly until its threshold is exceeded, at which point it fails catastrophically. **Resilience Engineering** shifts the focus to how a system behaves *under* failure. A resilient system is like a reed in the wind—it bends, sheds load, degrades gracefully, and eventually recovers.

The core philosophy of resilience engineering rests on three pillars:
1.  **Expectation of Failure**: We assume the network is unreliable, disks will fail, and dependencies will slow down.
2.  **Containment**: When a component fails, the failure must be isolated so it doesn't trigger a **Cascading Failure** across the entire fleet.
3.  **Observability**: We cannot manage what we cannot see. Resilience requires deep telemetry to detect the "gray failures" that don't immediately trigger hard errors.

## The Cost of 9s
Reliability is measured in "9s" (e.g., 99.9% uptime). Moving from three 9s (8.77 hours of downtime/year) to five 9s (5.26 minutes/year) isn't just a 100x improvement in code quality; it's a fundamental change in architecture. Resilience engineering is the set of patterns that make those "five 9s" economically and technically feasible.

Remember: A system is resilient not because it doesn't fail, but because it is never fully broken.
`
  },
  {
    id: "22-2",
    number: "22.2",
    title: "Timeouts: Every Network Call Must Have One",
    content: `The most dangerous state for a distributed system is not "Error," but "Hanging." A hung request consumes a thread, memory, and a file descriptor. If enough requests hang, the entire service runs out of resources and dies—a classic **Resource Exhaustion** failure.

## The Anatomy of a Timeout
A **Timeout** is a limit on how long a client is willing to wait for a response. Without them, a slow dependency is indistinguishable from a dead one, but far more destructive.

There are three critical types of timeouts to configure:
-   **Connect Timeout**: How long to wait to establish the TCP/TLS handshake. (Usually short: 100-500ms).
-   **Read/Socket Timeout**: How long to wait between packets of data.
-   **Request/Total Timeout**: The hard limit for the entire operation.

## Why Timeouts are Hard
Setting a timeout is a trade-off. Set it too short, and you reject successful requests that were just slightly slow (False Negatives). Set it too long, and you risk saturating your thread pool during a dependency slowdown.

\`\`\`python
import requests

# BAD: No timeout. The thread can hang forever.
response = requests.get("https://api.slow-service.com/data")

# GOOD: Explicit timeouts.
try:
    response = requests.get(
        "https://api.slow-service.com/data",
        timeout=(3.05, 10) # (connect timeout, read timeout)
    )
except requests.exceptions.Timeout:
    print("Service was too slow. Dropping request to save local resources.")
\`\`\`

A "good" timeout should be based on the **p99.9 latency** of the dependency. If the service usually responds in 100ms, a 500ms timeout is reasonable. Waiting 30 seconds for a 100ms service is a recipe for a site-wide outage.
`
  },
  {
    id: "22-3",
    number: "22.3",
    title: "Retries: Exponential Backoff and Jitter",
    content: `If a request fails due to a transient issue (a network blip or a temporary overload), the simplest solution is to try again. However, naive retries are a "distributed denial of service" (DDoS) attack in disguise. If a service is struggling, 1,000 clients retrying immediately will only sink it further.

## Exponential Backoff
Instead of retrying every 100ms, we increase the wait time between attempts. This gives the failing service time to recover.
The formula is usually: \`delay = initial_interval * (multiplier ^ attempt_number)\`.

## The Necessity of Jitter
If 10,000 clients all time out at the same second and use the same backoff formula, they will all retry at the exact same time, creating massive "spikes" of traffic. This is the **Thundering Herd** problem. We solve this by adding **Jitter**—a random variation to the delay.

\`\`\`javascript
async function fetchWithRetry(url, maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fetch(url);
    } catch (err) {
      attempt++;
      if (attempt === maxRetries) throw err;

      // Exponential Backoff: 100ms, 200ms, 400ms...
      const backoff = 100 * Math.pow(2, attempt);
      // Jitter: Add or subtract up to 25% of the backoff
      const jitter = backoff * 0.25 * Math.random();
      const delay = backoff + jitter;

      console.log(\`Attempt \${attempt} failed. Retrying in \${delay}ms...\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
\`\`\`

## Best Practices
-   **Only retry idempotent operations**: Never retry a \`POST /payments\` unless you have an idempotency key.
-   **Check the Error Code**: Only retry 503 (Service Unavailable) or 504 (Gateway Timeout). Never retry 4xx errors (client errors), as they will never succeed.
`
  },
  {
    id: "22-4",
    number: "22.4",
    title: "Circuit Breakers: Preventing Cascade Failures",
    content: `In an electrical circuit, a breaker snaps when current is too high, protecting the house from fire. In software, a **Circuit Breaker** stops a client from calling a failing service, protecting the *entire system* from a cascade.

## The Three States
A circuit breaker (popularized by Netflix's **Hystrix** library) has three states:
1.  **Closed**: Everything is normal. Requests flow through. The breaker monitors the failure rate.
2.  **Open**: The failure threshold (e.g., 50% errors) is reached. Requests are failed *immediately* at the caller side without even attempting the network call. This gives the dependency "breathing room."
3.  **Half-Open**: After a "sleep window," the breaker allows a small number of test requests. If they succeed, the circuit closes. If they fail, it swings back to Open.

## Why It Matters
Circuit breakers turn a slow, resource-heavy failure into a fast, cheap failure. Instead of waiting 10 seconds for a timeout, the caller gets a "503 Service Unavailable" in 1ms.

| State | Action | Outcome |
| :--- | :--- | :--- |
| **Closed** | Allow calls | Latency and Errors are tracked |
| **Open** | Block calls | Immediate error returned, dependency recovers |
| **Half-Open** | Probe | Check if dependency is healthy again |

Implementation often involves a sliding window of recent results. If you use a service mesh like **Istio** or **Linkerd**, circuit breaking can be handled at the infrastructure level, meaning your application code doesn't even need to know it's happening.
`
  },
  {
    id: "22-5",
    number: "22.5",
    title: "Bulkheads: Isolating Failure Domains",
    content: `The term **Bulkhead** comes from ship design. A ship's hull is divided into watertight compartments. If one compartment is breached, it floods, but the rest of the ship remains buoyant. In software, bulkheads ensure that the failure of one feature doesn't take down unrelated features.

## Thread Pool Bulkheads
The most common implementation is separating thread pools for different dependencies. If your "Search" service is slow and consumes all threads in the Search thread pool, your "Checkout" service (which has its own pool) remains unaffected.

## Region and Zone Bulkheads
At the infrastructure level, you can create bulkheads by isolating deployments. If you deploy a buggy update to Availability Zone A, and it crashes, Zones B and C should be completely isolated so the entire region doesn't go dark.

## Microservices as Bulkheads
One of the primary drivers for Microservices is the creation of bulkheads. In a monolith, a memory leak in the "PDF Generation" module can crash the entire process. In a microservice architecture, only the PDF service crashes; the "Order Management" service continues to function.

**Critical Rule**: Never share a database between two critical services. If the database locks or runs out of connections, your bulkhead is breached, and both services fail together.
`
  },
  {
    id: "22-6",
    number: "22.6",
    title: "Fallbacks and Graceful Degradation",
    content: `When a component fails and the circuit breaker opens, what does the user see? A resilient system provides a **Fallback**—a secondary, lower-quality mechanism to fulfill the request. This is the essence of **Graceful Degradation**.

## Strategies for Fallbacks
1.  **Static Responses**: If the "Recommendation Engine" is down, return a hardcoded list of "Top 10 Global Best Sellers."
2.  **Stale Data**: If the "Live Inventory" service fails, return the last known value from a cache, even if it's 5 minutes old. "In Stock" is better than an error page.
3.  **Feature Disablement**: If the "Comments" service is down, hide the comment section entirely but allow the user to read the article.
4.  **Local Computation**: If the "Advanced Search" is down, fall back to a simple regex search on a local cache of the most recent results.

## Design for Failure
Fallbacks must be designed *before* the failure happens. A common mistake is a fallback that calls *another* service that is likely to be overloaded by the sudden surge of traffic.

\`\`\`javascript
// Example of a fallback in a UI component
async function getProductRecommendations(userId) {
  try {
    return await api.getRecommendations(userId); // Primary path
  } catch (error) {
    console.warn("Rec service down, falling back to static top-sellers");
    return [
      { id: '1', name: 'Standard Widget' },
      { id: '2', name: 'Generic Gadget' }
    ]; // Fallback path
  }
}
\`\`\`

Graceful degradation is a product decision as much as a technical one. It requires the business to decide: "What is the minimum viable experience we can provide?"
`
  },
  {
    id: "22-7",
    number: "22.7",
    title: "Load Shedding: Protecting the System Under Overload",
    content: `When a system is overwhelmed, its performance doesn't just degrade—it often collapses. As queues grow, memory usage increases, and context switching overhead destroys throughput. **Load Shedding** is the intentional act of dropping requests to keep the system healthy for those it *can* serve.

## Better to Fail Fast
It is better to serve 80% of users with 100ms latency and fail the other 20% immediately than to try to serve 100% of users with 30-second latency. In the latter case, every single user has a broken experience, and the system likely crashes.

## How to Shed Load
1.  **Queue Limits**: If the incoming request queue exceeds a certain size, start returning \`HTTP 503\` immediately.
2.  **Priority-Based Shedding**: Drop "background" tasks (like analytics or email pings) before dropping "critical" tasks (like checkout).
3.  **CPU/Memory Thresholds**: If CPU usage stays above 90% for 10 seconds, start shedding 10% of traffic.

## The Token Bucket Algorithm
A common way to implement load shedding and rate limiting is the **Token Bucket**.
- A bucket holds a maximum of $N$ tokens.
- Tokens are added at a constant rate $R$.
- Each request requires a token. If the bucket is empty, the request is shed.

This allows for short bursts of traffic (up to $N$) while enforcing a long-term average rate of $R$.
`
  },
  {
    id: "22-8",
    number: "22.8",
    title: "Backpressure: Communicating Capacity",
    content: `Load shedding is a local decision: "I am full, so I will drop this." **Backpressure** is the communication of that state to the upstream service. It's a way for a "consumer" to tell a "producer" to slow down.

## The Push vs. Pull Problem
In a "Push" system (like a stream of events), the producer can easily overwhelm the consumer. Without backpressure, the consumer's memory buffer fills up and the process crashes (OOM - Out of Memory).

## Implementing Backpressure
-   **TCP Flow Control**: The classic example. The TCP "Receive Window" tells the sender how much data the receiver can buffer. If the window is 0, the sender stops sending.
-   **Reactive Streams**: Libraries like RxJS or Akka Streams have built-in backpressure. A subscriber can request exactly $N$ items. The publisher will not send $N+1$ until requested.
-   **HTTP 429 (Too Many Requests)**: An explicit signal to a client to slow down. High-quality clients will see this and increase their backoff.

## Why it's critical for Resilience
Backpressure prevents "Bufferbloat," where data sits in queues for so long that it's no longer relevant by the time it's processed. In a resilient system, information about capacity flows upstream so that the *entire chain* can adjust its pace.
`
  },
  {
    id: "22-9",
    number: "22.9",
    title: "Health Checks: Liveness, Readiness, Startup",
    content: `In a distributed environment (like Kubernetes), the infrastructure needs to know the state of your application to manage its lifecycle. We use **Health Checks** to expose this internal state.

## Three Types of Probes
1.  **Startup Probe**: Used for slow-starting apps (e.g., a Java app that needs to warm up its JIT). If this fails, the container is killed and restarted.
2.  **Liveness Probe**: "Are you alive?" If this fails, it means the process is deadlocked or in a broken state. The orchestrator kills the container.
3.  **Readiness Probe**: "Are you ready to take traffic?" This is the most important for resilience. If a service is still loading a 2GB cache into memory, it is *alive* but not *ready*. If it fails, traffic is diverted away from this node but the process is kept running.

## The Pitfalls of Deep Health Checks
A common mistake is a "Deep Health Check" where a service checks its database connection in its readiness probe.
**Scenario**: The database goes down.
**Result**: Every single microservice fails its readiness probe. Kubernetes removes every pod from the load balancer. Now your system is completely unreachable, making it harder to debug or recover.

**Better approach**: Readiness should check *local* state. If the database is down, the service should still be "Ready" to take traffic so it can return useful errors or cached fallbacks, rather than the entire fleet disappearing from the network.
`
  },
  {
    id: "22-10",
    number: "22.10",
    title: "Chaos Engineering: Netflix's Simian Army and Beyond",
    content: `How do you know your circuit breakers actually work? How do you know your fallbacks aren't broken? You don't know until you fail. **Chaos Engineering** is the discipline of experimenting on a software system in production to build confidence in the system's capability to withstand turbulent conditions.

## The Principles of Chaos
1.  **Build a Hypothesis**: "If we kill one Redis node, the system will switch to the replica with <1s of downtime."
2.  **Vary Real-world Events**: Inject latency, terminate instances, disconnect power to a rack, simulate a clock drift.
3.  **Run Experiments in Production**: Lab environments never perfectly replicate the "weirdness" of production traffic.
4.  **Automate Experiments**: Run them continuously.

## The Netflix Simian Army
Netflix pioneered this with tools like:
-   **Chaos Monkey**: Randomly terminates EC2 instances during business hours.
-   **Chaos Gorilla**: Simulates the failure of an entire AWS Availability Zone.
-   **Latent Monkey**: Injects artificial delays in REST calls to simulate a degraded network.

## Blast Radius
The key to safe chaos engineering is minimizing the **Blast Radius**. Start with a single user, or a single canary node. If the metrics (like "Orders per Minute") drop, the experiment is automatically aborted. You aren't "breaking things"; you are proving that the system *doesn't* break when things fail.
`
  },
  {
    id: "22-11",
    number: "22.11",
    title: "Game Days: Testing Failure Without Breaking Production",
    content: `While Chaos Engineering is often automated, **Game Days** are focused human exercises. A team intentionally breaks a system in a controlled environment (usually a staging or "shadow" production environment) to practice their response.

## Objectives of a Game Day
1.  **Train the Team**: Does everyone know how to use the monitoring tools? Do they know where the "Emergency Stop" button is?
2.  **Verify Runbooks**: Are the instructions for "Database Failover" actually correct? Most runbooks are outdated the moment they are written.
3.  **Find "Unknown Unknowns"**: You might discover that when the primary database fails, the monitoring system itself goes down because it was using the same DB.

## Roleplay
-   **The Master of Ceremonies**: The person who triggers the failure.
-   **The On-Call Engineer**: The person tasked with diagnosing and fixing the issue.
-   **The Observer**: Takes notes on the timeline, communication, and tools used.

Game days turn "High-Stakes Outages" into "Routine Maintenance." The goal is to build **Operational Muscle Memory**.
`
  },
  {
    id: "22-12",
    number: "22.12",
    title: "SLI, SLO, SLA: Defining and Measuring Reliability",
    content: `Resilience is not an abstract feeling; it is a measurable metric. We use a hierarchy of definitions to align engineering work with business goals.

## 1. SLI (Service Level Indicator)
A specific metric you measure.
*Examples*: Request Latency, Error Rate, Throughput, Availability (uptime).
*Definition*: "The percentage of successful HTTP requests over a 5-minute window."

## 2. SLO (Service Level Objective)
A target value or range for an SLI. This is what the engineering team actually aims for.
*Definition*: "99.9% of requests must return a 2xx status code."
*Crucial Point*: An SLO should be high enough that users are happy, but low enough that the team can still move fast. **100% is never the right SLO.**

## 3. SLA (Service Level Agreement)
A legal contract with your users. If you miss your SLA, you usually pay a penalty (money back, service credits).
*Definition*: "If uptime falls below 99.5%, we refund 10% of your monthly bill."
*Note*: The SLA is almost always "looser" than the SLO. If your SLO is 99.9%, your SLA might be 99.5%.

| Metric | Purpose | Stakeholder |
| :--- | :--- | :--- |
| **SLI** | Measurement | Engineers |
| **SLO** | Target | Product / Engineering |
| **SLA** | Liability | Business / Legal |
`
  },
  {
    id: "22-13",
    number: "22.13",
    title: "Error Budgets: The Engineering-Business Alliance",
    content: `The most powerful tool for balancing reliability and feature velocity is the **Error Budget**. It is derived directly from the SLO.

## The Math of Error Budgets
If your SLO is **99.9% availability**, your Error Budget is **0.1%**.
Over a 30-day month, 0.1% downtime equals **43 minutes and 12 seconds**.

## How to Use It
The Error Budget belongs to the engineering team.
-   **If the budget is full**: You can take risks. Deploy that experimental feature, refactor that core library, or run a chaos experiment.
-   **If the budget is empty**: You stop all feature development. The entire team focuses solely on reliability, bug fixes, and infrastructure until the budget is replenished.

## Alignment
This removes the tension between "Product" (who wants features) and "Ops" (who wants stability). Everyone agrees that as long as we are within the budget, we are meeting our commitment to the user. It turns reliability from a "nice-to-have" into a hard constraint on development.
`
  },
  {
    id: "22-14",
    number: "22.14",
    title: "Case Study: Amazon's Availability Design Principles",
    content: `Amazon Web Services (AWS) operates at a scale where "rare" hardware failures happen thousands of times a day. Their resilience is built on the concept of **Cell-Based Architecture**.

## Static Stability
Amazon designs for "Static Stability." This means that if a dependency fails, the system continues to work without needing to make any changes (like re-routing or scaling). For example, if the control plane (the API used to create new VMs) goes down, existing VMs must continue to run perfectly.

## Shuffling Sharding
To prevent one "poison pill" request or one malicious user from taking down an entire fleet, Amazon uses **Shuffle Sharding**.
Instead of assigning a user to a single server, they assign the user to a "shard" of servers (e.g., 2 servers out of a fleet of 100).
- In traditional sharding, if a user crashes a server, 1/100th of your users are affected.
- In shuffle sharding, because every user's "pair" of servers is unique, the probability of two users sharing the exact same failing servers is infinitesimally small.

## "Everything Fails All the Time"
This quote from Werner Vogels (Amazon CTO) summarizes their approach: Don't try to prevent failure; build a system that can survive it. This led to the creation of **Availability Zones (AZs)**—physically separate data centers with independent power and networking, allowing for regional resilience.
`
  },
  {
    id: "22-15",
    number: "22.15",
    title: "Case Study: Cloudflare's Cascading Failure of 2019",
    content: `In July 2019, Cloudflare suffered a massive global outage due to a single **Regular Expression**. This is a classic example of how a small failure can cascade into a global catastrophe.

## The Event
An engineer deployed a new WAF (Web Application Firewall) rule designed to detect cross-site scripting (XSS). The regex was poorly optimized (containing an un-anchored \`.*\` in a way that caused **Catastrophic Backtracking**).

## The Cascade
1.  One CPU core hit 100% trying to evaluate the regex.
2.  The WAF was running on the same machines that handled traffic.
3.  Because the regex was global, it was deployed to every edge node simultaneously.
4.  Within seconds, CPU usage across the global fleet hit 100%.
5.  Health checks began failing because the CPU was too busy with the regex to respond to pings.
6.  The system entered a "death spiral" where it couldn't even process the command to *disable* the rule.

## The Lesson
-   **Isolate Control and Data Planes**: The mechanism to update the system should not be dependent on the system being healthy.
-   **Canary Deployments**: Never deploy a change to 100% of the fleet at once. Even "safe" config changes can be fatal.
-   **Resource Limits**: A single process (like the WAF engine) should have been capped so it couldn't starve the entire OS of CPU.
`
  },
  {
    id: "22-16",
    number: "22.16",
    title: "Case Study: Facebook's Five-Hour Outage of 2021",
    content: `On October 4, 2021, Facebook (including Instagram and WhatsApp) disappeared from the internet. This wasn't a software bug, but a failure of **BGP (Border Gateway Protocol)** and **DNS**.

## The Root Cause
During routine maintenance, a command was issued to assess the capacity of the global backbone. A bug in the audit tool allowed a command through that unintentionally disconnected all of Facebook's data centers from the backbone.

## The Vicious Cycle
1.  BGP routes were withdrawn. Facebook's DNS servers became unreachable from the outside world.
2.  Because the DNS servers were unreachable, other ISPs stopped seeing \`facebook.com\`.
3.  **The Catch-22**: Facebook employees used Facebook tools to communicate and access the data centers. Their "smart cards" to enter buildings were linked to the internet. Their internal email was down.
4.  Engineers had to physically drive to data centers and manually reset routers.

## The Lesson
-   **Out-of-Band Management**: You must have a way to access your infrastructure that doesn't depend on that infrastructure being up.
-   **Dependency Loops**: Facebook's infrastructure was too "integrated." By using their own identity and network services to manage those very services, they created a circular dependency that made recovery nearly impossible.
-   **Testing "The Big Red Button"**: Do you know how to bring your system back from a "cold start"?
`
  },
  {
    id: "22-17",
    number: "22.17",
    title: "Exercises",
    content: `Test your understanding of Resilience Engineering.

## Questions

1.  **Timeout Math**: If a service has a p99 latency of 50ms and a p99.9 latency of 200ms, what is the risk of setting a timeout at 60ms?
2.  **Backoff Calculation**: Calculate the wait time for the 4th retry using exponential backoff with an initial interval of 100ms and a multiplier of 2.
3.  **Circuit Breakers**: Why is the "Half-Open" state necessary? Why not just go from Open to Closed?
4.  **Bulkheads**: How does using a separate thread pool for "Logging" prevent an outage if the logging disk is full and I/O blocks?
5.  **Load Shedding**: You are designing a video streaming service. Which requests do you shed first during an overload: "Start Video" or "Log Analytics Heartbeat"? Why?
6.  **Error Budgets**: Your monthly error budget is 43 minutes. A single 10-minute outage occurred. What percentage of your budget remains?
7.  **Chaos Engineering**: Propose a chaos experiment for a database-backed web app that uses a read-replica.
8.  **The Fallback Trap**: Why is it dangerous for a fallback mechanism to be more complex than the primary mechanism?

## Answers

1.  **Timeout Math**: At 60ms, you will fail 1% of all healthy requests (since p99 is 50ms). This adds significant "noise" and artificial errors to your system.
2.  **Backoff Calculation**: Attempt 1: 100ms, Attempt 2: 200ms, Attempt 3: 400ms, Attempt 4: 800ms.
3.  **Half-Open**: It allows a "probe" of traffic. If the dependency is still failing, we only let a few requests fail before opening the circuit again, rather than flooding the dependency with 100% of traffic and crashing it again.
4.  **Bulkheads**: If logging uses the main thread pool, all threads will block waiting for the disk. By using a separate pool, only the logging threads block; the main threads remain free to serve user requests (perhaps without logs).
5.  **Load Shedding**: Shed "Log Analytics." The core user value is watching the video. Analytics is a background task that can be sacrificed to maintain the primary service.
6.  **Error Budgets**: (43 - 10) / 43 = ~76.7% remains.
7.  **Chaos Experiment**: "Hypothesis: If the primary DB fails, the app will switch to the read-replica and become read-only without crashing. Experiment: Force a failover in the dev environment and monitor error rates."
8.  **The Fallback Trap**: If the fallback is complex, it is likely to have its own bugs. Since fallbacks are rarely exercised, these bugs stay hidden until a real outage occurs, at which point the fallback fails too, making the situation worse. Fallbacks should be as simple and "dumb" as possible.
`
  }
];
