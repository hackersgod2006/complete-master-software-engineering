import type { Section } from '../types';

export const CH34_SECTIONS: Section[] = [
  {
    id: "34-1",
    number: "34.1",
    title: "Observability vs Monitoring: The Critical Difference",
    content: `In the era of monoliths, **Monitoring** was sufficient. You knew what could break (CPU, Disk, Memory), and you watched it. In the era of microservices and ephemeral containers, we need **Observability**.

## The Definition
- **Monitoring**: Watching the "known unknowns." You have a dashboard for CPU usage because you know high CPU is bad. It tells you *that* something is wrong.
- **Observability**: The ability to understand the internal state of a system solely by looking at its external outputs (telemetry). It allows you to ask "why" something is happening, even for "unknown unknowns" you never anticipated.

## The Shift
If your system is observable, you can answer questions like: "Why is the checkout slow for users on Chrome in Germany who have a discount code applied?" You didn't build a dashboard for that specific scenario, but the data exists to reconstruct the answer.

Observability is an **engineering property** of the system, not just a tool you buy. It requires the application to "speak" to you through structured telemetry.`
  },
  {
    id: "34-2",
    number: "34.2",
    title: "The Three Pillars: Metrics, Logs, Traces",
    content: `Telemetery is usually categorized into the "Three Pillars." While each is useful alone, they are transformative when correlated.

## 1. Metrics (Aggregatable Data)
Numerical representations of data measured over intervals of time.
- **Example**: \`http_requests_total\`, \`memory_usage_bytes\`.
- **Strength**: Small storage footprint, excellent for alerting and long-term trends.
- **Weakness**: Lacks context. You know latency is high, but not why.

## 2. Logs (Event Data)
A timestamped record of a discrete event.
- **Example**: \`User 123 logged in from IP 1.1.1.1\`.
- **Strength**: High detail and context.
- **Weakness**: Expensive to store and search at scale.

## 3. Traces (Request Data)
The "journey" of a single request as it moves through various services.
- **Example**: A trace showing a request hitting the Load Balancer -> Auth Service -> Order Service -> Database.
- **Strength**: Visualizes distributed systems and identifies bottlenecks between services.

A master engineer uses **Correlation IDs** to link these pillars. A metric alert triggers a look at a trace, which links to the specific logs for that request.`
  },
  {
    id: "34-3",
    number: "34.3",
    title: "The Four Golden Signals: Latency, Traffic, Errors, Saturation",
    content: `If you can only monitor four things, the **SRE Handbook** by Google suggests these "Golden Signals."

## 1. Latency
The time it takes to service a request.
- **Key Insight**: It's important to distinguish between the latency of successful requests and the latency of failed requests. A 500 error that returns in 1ms shouldn't mask a slow 200 OK.

## 2. Traffic
A measure of how much demand is being placed on your system.
- **Examples**: HTTP requests per second, bandwidth, or concurrent transactions.

## 3. Errors
The rate of requests that fail, either explicitly (e.g., HTTP 500), implicitly (e.g., HTTP 200 but with wrong content), or by policy (e.g., taking >1s).

## 4. Saturation
How "full" your service is. A measure of your system fraction, emphasizing the resources that are most constrained (e.g., memory in a RAM-bound system).
- **Proactive Signal**: Many systems degrade in performance before they hit 100% saturation. Watching the *increase* in saturation helps predict outages.`
  },
  {
    id: "34-4",
    number: "34.4",
    title: "The USE Method: Utilization, Saturation, Errors",
    content: `While the Golden Signals focus on user-facing services, the **USE Method** (developed by Brendan Gregg) is for hardware and infrastructure resources.

For every resource (CPU, Disk, Network interface), check:
1. **Utilization**: The average time that the resource was busy servicing work. (e.g., "The CPU is at 90% utilization").
2. **Saturation**: The degree to which the resource has extra work which it can't service, often queued. (e.g., "The CPU run queue length is 5").
3. **Errors**: The count of error events.

## Why Saturation Matters
A disk might show 10% utilization (low), but if it has high saturation (long wait queues), your application will feel incredibly slow. Utilization tells you if the resource is busy; saturation tells you if it's the bottleneck.`
  },
  {
    id: "34-5",
    number: "34.5",
    title: "Metrics: Types, Cardinality, and Collection",
    content: `To use metrics effectively, you must understand how they are stored and the cost of "labels."

## Metric Types
- **Counter**: A value that only goes up (e.g., total requests). It resets to zero on restart.
- **Gauge**: A value that can go up and down (e.g., current memory usage, temperature).
- **Histogram**: Samples observations (usually request durations) and counts them in configurable buckets. Useful for calculating percentiles (p99).

## The Cardinality Trap
**Cardinality** refers to the number of unique combinations of label values.
- \`http_requests_total{method="GET", status="200"}\` -> Low cardinality.
- \`http_requests_total{user_id="12345"}\` -> **High cardinality**.

If you have 1 million users, the second metric creates 1 million time-series in your database. This will crash most monitoring systems (Prometheus, etc.) and lead to massive costs. **Never use high-cardinality data like User IDs or UUIDs as metric labels.**`
  },
  {
    id: "34-6",
    number: "34.6",
    title: "Prometheus: Architecture and Query Language (PromQL)",
    content: `**Prometheus** is the de facto standard for cloud-native metrics.

## Architecture
Unlike many systems, Prometheus is **pull-based**. It "scrapes" metrics from your applications via an HTTP endpoint (usually \`/metrics\`). 
- **Exporters**: Small binaries that convert "non-Prometheus" data (like MySQL or Node stats) into Prometheus format.

## PromQL (Prometheus Query Language)
PromQL is designed for time-series math.
- **Rate**: \`rate(http_requests_total[5m])\` calculates the per-second rate of requests over the last 5 minutes.
- **Percentiles**: \`histogram_quantile(0.99, sum by (le) (rate(http_duration_seconds_bucket[5m])))\` calculates the p99 latency.

The p99 (99th percentile) is the latency that only 1% of your users experience. It is a much better measure of system "pain" than the average or median.`
  },
  {
    id: "34-7",
    number: "34.7",
    title: "Grafana: Dashboard Design Principles",
    content: `A dashboard is a communication tool. A bad dashboard hides the truth; a good one reveals it instantly.

## Principles of Good Design
1. **The "Glance" Test**: Can an engineer look at the dashboard and know if the system is healthy in 5 seconds?
2. **Top-Down Hierarchy**: Put the most important "Golden Signals" at the top. Put internal details (CPU by core, etc.) at the bottom.
3. **Consistency**: Use the same colors (e.g., Red for errors, Green for success) across all dashboards.
4. **Context**: Show the "week-over-week" or "day-over-day" line. 1,000 errors might be normal for a Monday morning.

## Anti-Patterns
- **The Space Shuttle Cockpit**: 50 widgets on one screen. No human can process that much info.
- **No Units**: Is that "10" milliseconds, seconds, or gigabytes? Always label your axes.`
  },
  {
    id: "34-8",
    number: "34.8",
    title: "Alerting: The Art of Meaningful Alerts",
    content: `An alert is a call to action. If an alert doesn't require immediate action, it shouldn't be an alert.

## Symptom-Based vs Cause-Based
- **Cause-Based (Bad)**: "MySQL CPU is at 90%." (Maybe the DB is just working hard, but the users are fine).
- **Symptom-Based (Good)**: "Checkout error rate is > 1%." (The users are definitely having a bad time).

## Alert Severity
- **Critical (Pager)**: The system is down or severely degraded. Requires immediate attention.
- **Warning (Ticket/Slack)**: Something is sub-optimal but not impacting users yet. To be handled during business hours.

Every alert should have a **Runbook**—a document explaining what the alert means and the first three steps to take to fix it.`
  },
  {
    id: "34-9",
    number: "34.9",
    title: "Alert Fatigue: Prevention and Recovery",
    content: `**Alert Fatigue** occurs when an engineer is exposed to a high frequency of alerts, leading to desensitization and missed critical issues.

## Prevention Strategies
1. **Aggressive Silencing**: If an alert fires and you determine "this is fine," you must tune the alert or delete it.
2. **Downtime Management**: Automatically silence alerts during planned maintenance or deployments.
3. **High-Percentile Alerting**: Don't alert on a single "blip." Use \`avg_over_time\` or \`min_over_time\` to ensure the condition is persistent.

## The Cost of Paging
Paging an engineer at 3 AM has a massive cognitive cost. It ruins their next day of work and leads to burnout. A master engineer treats "the pager" as a precious resource, only to be used when the business is actively losing money or data.`
  },
  {
    id: "34-10",
    number: "34.10",
    title: "Structured Logging: JSON, Log Levels, Correlation IDs",
    content: `Plain text logs (\`User logged in\`) are for humans. **Structured logs** (JSON) are for machines.

## Why JSON?
When logs are JSON, you can query them like a database.
\`\`\`json
{
  "timestamp": "2023-10-27T10:00:00Z",
  "level": "ERROR",
  "message": "Payment failed",
  "user_id": "u123",
  "request_id": "req-abc-789",
  "latency_ms": 450
}
\`\`\`
Now you can search for "All ERROR logs where latency_ms > 400".

## Correlation IDs
When a request enters your system, generate a unique ID and pass it in the headers to every internal service. Include this ID in every log line. This allows you to reconstruct the entire life of a request across 10 different services by searching for one ID.`
  },
  {
    id: "34-11",
    number: "34.11",
    title: "Centralized Logging: ELK Stack, Loki, Datadog Logs",
    content: `In a distributed system, you cannot \`ssh\` into 100 servers to check logs. You need a centralized sink.

## The ELK Stack (Elasticsearch, Logstash, Kibana)
The traditional heavyweight.
- **Logstash**: Collects and transforms logs.
- **Elasticsearch**: Indexes and stores logs.
- **Kibana**: The UI for searching.
- **Cons**: Elasticsearch is extremely memory-hungry and expensive to run.

## Grafana Loki
A newer, "Prometheus-inspired" approach. It doesn't index the full text of the logs, only the labels. 
- **Pros**: Much cheaper to store, integrates perfectly with Grafana.

## Datadog / Splunk
SaaS solutions. They are "set and forget" but can become the most expensive part of your infrastructure if you log too much data.`
  },
  {
    id: "34-12",
    number: "34.12",
    title: "Distributed Tracing: OpenTelemetry Standard",
    content: `**Distributed Tracing** follows a request as it hops across service boundaries.

## The OpenTelemetry (OTel) Standard
OTel is a vendor-neutral framework for collecting telemetry. It defines:
- **Spans**: A single operation (e.g., a database query).
- **Traces**: A collection of spans that represent a single request's path.

## How it works (Propagation)
The client sends a \`traceparent\` header. Each service that receives it creates a new "child span" and passes the ID to the next service.

\`\`\`javascript
// Simplified OTel auto-instrumentation
const sdk = new HoneycombSDK({
  apiKey: "your-key",
  serviceName: "my-microservice",
});
sdk.start();
\`\`\`

By adopting OTel, you can switch from Jaeger to Honeycomb to Datadog without changing a single line of application code.`
  },
  {
    id: "34-13",
    number: "34.13",
    title: "Jaeger, Zipkin, Honeycomb: Trace Visualization",
    content: `Once you have trace data, you need to see it.

## Jaeger / Zipkin
Open-source tools that show "Gantt chart" views of traces. You can see that Service A took 100ms, and 80ms of that was waiting for Service B.

## Honeycomb
A pioneer in **Observability**. Honeycomb focuses on "High Cardinality" data. It allows you to group and filter by *any* attribute (e.g., User ID, Build ID) across billions of rows in seconds.

## The "Waterfall" View
The most common trace visualization. If you see a long gap between two spans, you've found a "blind spot"—logic happening in your code that isn't being instrumented. Every gap is a place where a bug could be hiding.`
  },
  {
    id: "34-14",
    number: "34.14",
    title: "Profiling in Production: Continuous Profiling",
    content: `Tracing tells you *which* service is slow. **Profiling** tells you *which line of code* is slow.

## Traditional Profiling
Usually done in dev by running the app with a profiler attached (e.g., \`py-spy\`, \`pprof\`). It slows the app down significantly.

## Continuous Profiling (e.g., Pyroscope, Parca)
Uses "Sampling Profilers" that have very low overhead (< 1% CPU). They take a snapshot of the stack trace 100 times a second.
- **The Flame Graph**: A visualization showing where the CPU is spending its time. The wider the bar, the more CPU that function is consuming.

Continuous profiling allows you to find "death by a thousand cuts"—functions that aren't "bugs" but are inefficient enough to cost your company thousands of dollars in extra cloud spend.`
  },
  {
    id: "34-15",
    number: "34.15",
    title: "Real User Monitoring (RUM)",
    content: `Your backend might be fast, but if your JavaScript bundle is 5MB, the user will feel like your site is slow. **RUM** measures the experience on the user's actual device.

## Core Web Vitals
- **LCP (Largest Contentful Paint)**: How fast the main content loads.
- **FID (First Input Delay)**: How responsive the page is to clicks.
- **CLS (Cumulative Layout Shift)**: Does the page "jump" around as images load?

RUM tools (like **Sentry**, **LogRocket**, or **New Relic Browser**) capture these metrics along with the user's browser, device, and network speed. This is the only way to see the impact of "last mile" latency.`
  },
  {
    id: "34-16",
    number: "34.16",
    title: "Synthetic Monitoring",
    content: `RUM only tells you about users who are *currently* on your site. What if your site is down and no one is coming? **Synthetic Monitoring** (or "Uptime Monitoring") involves running automated scripts that simulate user behavior from various locations around the world.

## Types of Synthetics
- **HTTP Check**: Is the status code 200?
- **SSL Check**: Is the certificate about to expire?
- **Browser Script**: A Playwright or Puppeteer script that actually logs in and adds an item to the cart.

Synthetics provide a stable baseline. If the synthetic monitor fails but RUM is fine, you might have a regional outage. If both fail, your system is down.`
  },
  {
    id: "34-17",
    number: "34.17",
    title: "Cost Management: Controlling Observability Costs",
    content: `A common horror story in modern engineering is the "Observability Bill" being larger than the "Compute Bill."

## Strategies to Control Cost
1. **Sampling**: Don't store 100% of traces. Store 100% of errors, but only 1% of successful "Home Page" visits.
2. **Log Retention**: Keep "Debug" logs for 1 day, "Info" for 7 days, and "Error" for 30 days. Move old logs to "Cold Storage" (S3 Glacier).
3. **Metric Aggregation**: Aggregate high-resolution metrics (10s) into lower resolution (1h) after 30 days.
4. **Drop Unused Metrics**: Use Prometheus's \`drop\` action to ignore metrics that no one has looked at in months.

Observability is about **ROI**. If a metric doesn't help you find a bug or save money, it's just expensive noise.`
  },
  {
    id: "34-18",
    number: "34.18",
    title: "Case Study: Honeycomb and the Observability Revolution",
    content: `Honeycomb was founded by Charity Majors and Christine Yen, former engineers at Parse (Facebook). They realized that the tools used to monitor monoliths were fundamentally broken for microservices.

## The Breakthrough: Wide Events
Instead of logging many small things, Honeycomb encouraged "one wide event per request." This event contains everything: the user ID, the build ID, the database query, the execution time, etc.

## The "Bubble Up" Feature
Honeycomb's "Bubble Up" allows you to select a "bad" cluster of points on a graph and ask: "How are these points different from the 'good' points?"
- The system might respond: "90% of these bad points have the label \`browser=Internet Explorer 11\`."
- This turns debugging from a "guessing game" into a "data science problem."`
  },
  {
    id: "34-19",
    number: "34.19",
    title: "Exercises",
    content: `## Exercises

1. **Metrics Design**: You are building a "File Upload" service. Define three metrics (one counter, one gauge, one histogram) you would track.
2. **Cardinality Calculation**: You have a metric \`api_errors\` with labels \`method\` (5 values), \`region\` (10 values), and \`status_code\` (3 values). How many time-series are created? Is this safe?
3. **PromQL**: Write a query to find the 95th percentile latency of all "POST" requests over the last 10 minutes.
4. **SLI/SLO**: Define a Service Level Indicator (SLI) and a Service Level Objective (SLO) for an API's availability.
5. **Log Transformation**: Convert this plain text log into a structured JSON log: \`[2023-10-27 12:00] WARN: User 55 failed login on /login after 200ms\`.
6. **Tracing Logic**: Explain why we need "context propagation" in distributed tracing. What happens if one service in the chain doesn't support it?
7. **Alert Tuning**: An alert for "High CPU" fires every night at 2 AM during the database backup. The system is fine. How do you fix this alert?
8. **RUM Analysis**: A RUM tool shows that your LCP is 5 seconds in India but 1 second in the US. What are two potential infrastructure fixes?

## Answers

1. **Counter**: \`files_uploaded_total\`. **Gauge**: \`current_active_uploads\`. **Histogram**: \`upload_file_size_bytes\`.
2. 5 * 10 * 3 = 150. Yes, this is very safe. (Usually < 100,000 is safe for a single Prometheus instance).
3. \`histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket{method="POST"}[10m])))\`.
4. **SLI**: The percentage of successful (non-5xx) requests over 30 days. **SLO**: 99.9% of requests must be successful.
5. \`{"timestamp": "2023-10-27T12:00:00Z", "level": "WARN", "user_id": 55, "path": "/login", "latency_ms": 200, "event": "failed_login"}\`.
6. Without propagation, the "link" is broken. The trace will appear as two separate, unrelated traces, and you lose the "big picture" of the request.
7. Use a "Time of Day" filter or change the alert to a symptom-based one (e.g., "Is the app actually slow during the backup?").
8. 1. Use a Content Delivery Network (CDN) with a PoP in India. 2. Use a multi-region database to reduce data fetch time.`
  }
];
