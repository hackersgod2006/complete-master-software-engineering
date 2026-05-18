import type { Section } from '../types';

export const CH33_SECTIONS: Section[] = [
  {
    id: "33-1",
    number: "33.1",
    title: "The DevOps Philosophy: Culture, Automation, Measurement, Sharing",
    content: `**DevOps** is often misunderstood as a job title or a set of tools. In reality, it is a cultural and professional movement that stresses communication, collaboration, and integration between software developers and IT operations professionals.

## CALMS Framework
Coined by Jez Humble, the **CALMS** framework defines the pillars of DevOps:
- **Culture**: Breaking down silos. Developers care about stability; Operations care about agility.
- **Automation**: Removing manual toil. If you do it twice, automate it.
- **Lean**: Using small batch sizes and minimizing work-in-progress (WIP).
- **Measurement**: You can't improve what you don't measure. Use data to drive decisions.
- **Sharing**: Sharing tools, patterns, and successes (and failures) across the organization.

## The Goal: High-Performance Engineering
According to the **DORA** (DevOps Research and Assessment) metrics, high-performing teams are characterized by:
1. **Deployment Frequency**: How often you ship code.
2. **Lead Time for Changes**: Time from code commit to production.
3. **Change Failure Rate**: Percentage of deployments that cause a failure.
4. **Time to Restore Service**: How fast you recover from a failure.

DevOps is about creating a "generative" culture where the system is designed to handle failure and learn from it, rather than seeking someone to blame.`
  },
  {
    id: "33-2",
    number: "33.2",
    title: "Continuous Integration: The Discipline and the Pipeline",
    content: `**Continuous Integration (CI)** is the practice of merging all developer working copies to a shared mainline several times a day.

## The Heart of CI
CI is not just about running a Jenkins or GitHub Actions job. It is a **discipline**. If the build breaks, the *entire team* stops to fix it. A broken build is a "stop the line" event (inspired by the Toyota Production System's **Andon cord**).

## The Workflow
1. Developer pulls from main.
2. Developer writes code and local tests.
3. Developer pushes to a branch.
4. **CI Server** detects the change.
5. CI Server builds the code, runs unit tests, and performs static analysis.
6. Feedback is sent back to the developer in minutes.

## Why it Matters
Without CI, you face "Integration Hell"—the weeks at the end of a project where everyone's code is combined for the first time, resulting in thousands of conflicts and bugs. CI moves those conflicts to the moment they are created.`
  },
  {
    id: "33-3",
    number: "33.3",
    title: "The Complete CI Pipeline: Quality Gate Design",
    content: `A modern CI pipeline is a series of **Quality Gates** that code must pass before it is deemed "releasable."

## Typical Stages
1. **Source**: Linting and formatting (e.g., Prettier, ESLint). Ensure code style is consistent.
2. **Build**: Compiling code and installing dependencies.
3. **Unit Tests**: Fast tests (milliseconds) that mock external dependencies.
4. **Static Analysis**: Tools like **SonarQube** or **CodeQL** looking for security flaws or "code smells."
5. **Security Scanning**: Checking for vulnerable dependencies (SBOM scanning).
6. **Containerization**: Building the Docker image.

## Quality Gate Principles
- **Fast Feedback**: The first stages should be the fastest. If a linter fails, don't waste 10 minutes running integration tests.
- **Idempotency**: Running the same code through the pipeline should produce the same result.
- **Visibility**: Every team member should see the status of the pipeline at all times.

\`\`\`yaml
# GitHub Actions snippet
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Tests
        run: npm test
      - name: Security Scan
        run: npx snyk test
\`\`\`

A master engineer designs the pipeline to be a "path of least resistance" to quality.`
  },
  {
    id: "33-4",
    number: "33.4",
    title: "Trunk-Based Development vs GitFlow vs GitHub Flow",
    content: `How your team uses Git determines your delivery velocity.

## GitFlow
A complex model involving \`master\`, \`develop\`, \`feature/*\`, \`release/*\`, and \`hotfix/*\` branches.
- **Pros**: Clear structure for scheduled releases.
- **Cons**: High merge overhead, encourages "long-lived" feature branches that diverge from reality.

## GitHub Flow
A simpler model: everything in \`main\` is deployable. Create a branch for a feature, open a PR, merge to \`main\`.
- **Pros**: Simple, works well for web apps.

## Trunk-Based Development (TBD)
The gold standard for high-performing teams. Developers commit directly to \`main\` (the "trunk") multiple times a day.
- **Pros**: Minimizes merge conflicts, enforces CI, encourages small changes.
- **Requirement**: Requires excellent automated testing and **Feature Flags** (see 33.5).

| Strategy | Velocity | Complexity | Best For |
| :--- | :--- | :--- | :--- |
| GitFlow | Low | High | Legacy/Packaged Software |
| GitHub Flow | Medium | Low | Startups/Web |
| Trunk-Based | High | Medium | Enterprise/Scale |`
  },
  {
    id: "33-5",
    number: "33.5",
    title: "Feature Flags: Decoupling Deployment from Release",
    content: `**Feature Flags** (or Toggles) are a powerful technique that allows you to change system behavior without changing code.

## The Concept
You wrap new code in a conditional check:
\`\`\`javascript
if (featureFlags.isEnabled('new-checkout-flow')) {
  return <NewCheckout />;
} else {
  return <OldCheckout />;
}
\`\`\`

## Why Use Them?
1. **Decouple Deployment from Release**: You can deploy the code to production (Deployment) but keep it hidden from users (Release).
2. **Canary Releases**: Enable the feature for 5% of users to check for errors.
3. **Kill Switch**: If the new feature causes a spike in 500 errors, flip the flag off instantly without a redeploy.

## Managing Flags
Flags add **Technical Debt**. A master engineer ensures that once a feature is 100% rolled out, the flag and the old code path are removed. Tools like **LaunchDarkly** or **Flagsmith** provide enterprise-grade management.`
  },
  {
    id: "33-6",
    number: "33.6",
    title: "Continuous Delivery vs Continuous Deployment",
    content: `The terms are often used interchangeably, but the distinction is critical.

## Continuous Delivery (CD)
Code is *always* in a releasable state. Every commit that passes the CI pipeline *could* be deployed to production, but the actual deployment requires a manual "push of a button."
- **Use Case**: Organizations with regulatory requirements or specific business timing for releases.

## Continuous Deployment (CD)
Every commit that passes the pipeline is automatically deployed to production without human intervention.
- **Use Case**: SaaS companies (Amazon, Netflix, GitHub).

## The "Human in the Loop"
The transition from Delivery to Deployment is not a technical change; it's a **trust** change. It requires extreme confidence in your automated testing suite. If you don't trust your tests to catch a critical bug, you cannot do Continuous Deployment.`
  },
  {
    id: "33-7",
    number: "33.7",
    title: "Deployment Strategies: Rolling, Blue-Green, Canary",
    content: `How do you move the new code to the servers without dropping traffic?

## 1. Rolling Deployment
Nodes are updated one by one.
- **Process**: Stop V1 on Node A -> Start V2 on Node A -> Move to Node B.
- **Pros**: No extra hardware needed.
- **Cons**: During the rollout, two different versions of your app are running simultaneously. Your database must support both.

## 2. Blue-Green Deployment
Two identical environments: "Blue" (Production) and "Green" (Staging).
- **Process**: Deploy V2 to Green -> Test -> Switch Load Balancer to Green.
- **Pros**: Instant rollback (switch back to Blue).
- **Cons**: Costs 2x hardware.

## 3. Canary Deployment
Deploy V2 to a small subset of "Canary" nodes.
- **Process**: 1% of traffic goes to V2. If metrics look good (latency, error rate), increase to 10%, then 50%, then 100%.
- **Pros**: Minimal impact if a bug is introduced.

A master engineer selects the strategy based on the **Risk Profile** of the change and the **Resource Constraints** of the infrastructure.`
  },
  {
    id: "33-8",
    number: "33.8",
    title: "Infrastructure as Code: Terraform, Pulumi, CloudFormation",
    content: `**Infrastructure as Code (IaC)** is the management of infrastructure (networks, virtual machines, load balancers) using configuration files rather than manual web console clicks.

## Why IaC?
- **Reproducibility**: Spin up a dev environment identical to production in minutes.
- **Version Control**: Track every change to your infrastructure in Git.
- **Auditability**: Who opened port 22 to the world? Check the Git history.

## Declarative vs Imperative
- **Declarative (Terraform)**: You describe the *desired state* ("I want 3 servers"). Terraform calculates the diff and applies it.
- **Imperative (Shell scripts)**: You describe the *steps* ("Create server, then install Nginx"). If a step fails halfway through, the system is in an inconsistent state.

\`\`\`hcl
# Terraform Example
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
\`\`\`

**Pulumi** allows you to use familiar languages (TypeScript, Python) instead of DSLs (HCL), bringing the power of loops, classes, and testing to infrastructure.`
  },
  {
    id: "33-9",
    number: "33.9",
    title: "Container Orchestration: Kubernetes Architecture",
    content: `If Docker is a single shipping container, **Kubernetes (K8s)** is the crane and the ship that manages thousands of them.

## The Architecture
K8s follows a **Control Plane / Worker Node** model.

### Control Plane (The Brain)
- **API Server**: The gateway for all commands.
- **etcd**: A distributed key-value store for the cluster's state.
- **Scheduler**: Decides which node a container should run on based on resources.
- **Controller Manager**: Maintains the desired state (e.g., "ensure 3 pods are running").

### Worker Nodes (The Brawn)
- **Kubelet**: An agent that runs on every node, ensuring containers are running in Pods.
- **Kube-proxy**: Manages network rules.
- **Container Runtime**: Usually Docker or containerd.

Kubernetes is essentially a large state-reconciliation engine. It constantly compares "What is happening" to "What the user requested" and makes changes to align them.`
  },
  {
    id: "33-10",
    number: "33.10",
    title: "Kubernetes: Pods, Deployments, Services, Ingress",
    content: `To work with Kubernetes, you must understand its core abstractions.

## Pod
The smallest unit. A Pod wraps one or more containers (usually one). Containers in a Pod share an IP address and local storage.

## Deployment
Describes the desired state for a set of Pods. If a Pod in a Deployment dies, K8s automatically replaces it.
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  template:
    ... # Pod definition
\`\`\`

## Service
Pods are ephemeral (they die and get new IPs). A **Service** provides a stable IP address and DNS name to access a set of Pods. It acts as an internal load balancer.

## Ingress
An API object that manages external access to the services, typically HTTP. It handles SSL termination, path-based routing, and virtual hosting.`
  },
  {
    id: "33-11",
    number: "33.11",
    title: "Kubernetes: Resource Limits, Health Checks, Rolling Updates",
    content: `Running K8s in production requires moving beyond the basics to ensuring stability.

## Resource Management
Always define **Requests** (what a container is guaranteed) and **Limits** (the maximum it can use).
- Without limits, a "leaky" container can consume all memory on a node, causing other containers to crash (**OOMKilled**).

## Health Checks (Probes)
- **Liveness Probe**: "Is the app alive?" If it fails, K8s restarts the container.
- **Readiness Probe**: "Is the app ready to serve traffic?" If it fails, K8s stops sending traffic to it (useful during startup or heavy load).

## Rolling Updates
By default, a Deployment updates Pods in a rolling fashion. You can control the pace with:
- \`maxUnavailable\`: How many Pods can be down during the update.
- \`maxSurge\`: How many extra Pods can be created during the update.

A master engineer uses these settings to ensure a "Zero Downtime" deployment, even if the new version takes 60 seconds to boot.`
  },
  {
    id: "33-12",
    number: "33.12",
    title: "GitOps: ArgoCD, Flux",
    content: `**GitOps** is a paradigm where Git is the "Single Source of Truth" for your infrastructure.

## The Workflow
1. You change a Kubernetes YAML file in Git.
2. A GitOps controller (like **ArgoCD**) notices the change.
3. The controller automatically applies the change to the cluster.

## Why GitOps?
- **No manual \`kubectl apply\`**: This prevents "Configuration Drift" where the cluster state differs from the code.
- **Easy Rollbacks**: Want to undo a deployment? Just \`git revert\` the commit.
- **Security**: The CI system doesn't need "cluster admin" permissions to push code. Instead, the cluster "pulls" the state from Git.

GitOps brings the rigor of software development—code review, testing, version history—to the world of operations.`
  },
  {
    id: "33-13",
    number: "33.13",
    title: "Service Mesh: Istio, Linkerd",
    content: `As you move to microservices, the "network" becomes the most complex part of your system. A **Service Mesh** is a dedicated infrastructure layer for handling service-to-service communication.

## The Sidecar Pattern
A service mesh usually works by deploying a small proxy (like **Envoy**) next to every application container. All traffic goes through the proxy.

## Key Features
1. **Traffic Management**: Easy canary rollouts, traffic splitting (e.g., 5% to V2).
2. **Security**: Automatic Mutual TLS (mTLS) between all services.
3. **Observability**: Automatic tracing and metrics for every network call.
4. **Resilience**: Retries, timeouts, and **Circuit Breakers** at the network level.

## Is it worth it?
Service meshes add significant complexity and latency (1-2ms per hop). For small teams, it's often overkill. For large organizations with hundreds of services, it's the only way to maintain sanity.`
  },
  {
    id: "33-14",
    number: "33.14",
    title: "Database Migrations in CI/CD: Zero-Downtime Strategies",
    content: `The hardest part of CI/CD is the database. You can't just "roll back" data like you can code.

## The "Expand and Contract" Pattern
To avoid downtime, never perform a breaking change (like renaming a column) in a single step.
1. **Expand**: Add the new column (\`email_v2\`). Code writes to BOTH.
2. **Migrate**: Run a background job to copy data from \`email\` to \`email_v2\`.
3. **Transition**: Change code to read from \`email_v2\`.
4. **Contract**: Delete the old \`email\` column.

## Tooling
Use migration tools like **Flyway**, **Liquibase**, or **Prisma Migrate**. 
**Golden Rule**: Migrations must be versioned and checked into Git. The CI pipeline should run them automatically against a staging database before allowing a deployment to production.`
  },
  {
    id: "33-15",
    number: "33.15",
    title: "Rollback Strategies: When and How",
    content: `A "Master" is defined by how they handle things when they go wrong.

## Automated Rollback
In a mature CD pipeline, if a canary deployment results in an error rate > 1%, the system should automatically trigger a rollback.

## Data-Aware Rollback
If a deployment involved a database migration, rolling back the code might break it (if the code no longer matches the schema). This is why "Expand and Contract" is vital.

## The "Fix Forward" Alternative
In some high-scale systems, rolling back is more dangerous than fixing the bug and pushing a new version. This is only possible if your pipeline is extremely fast (< 5 minutes).

A rollback should be a standard, practiced procedure, not a panic-induced scramble.`
  },
  {
    id: "33-16",
    number: "33.16",
    title: "Case Study: Amazon Deploys Every 11.6 Seconds",
    content: `In 2011, Amazon revealed that they were deploying to production every 11.6 seconds on average. This was a revolutionary claim at the time.

## How they did it
1. **Microservices**: Each team owned their own service and their own pipeline.
2. **Extreme Automation**: Every manual step was eliminated.
3. **Internal Tooling**: They built "Apollo" (the precursor to AWS CodeDeploy) to manage deployments across thousands of nodes.
4. **Two-Pizza Teams**: Small, autonomous teams that owned their code from "cradle to grave" (DevOps in its purest form).

## The Lesson
Speed is a byproduct of **Decoupling**. By making services independent, Amazon allowed 1,000+ teams to move at their own pace without waiting for a "Global Release Train."`
  },
  {
    id: "33-17",
    number: "33.17",
    title: "Case Study: GitLab's All-Remote CI/CD Pipeline",
    content: `GitLab is one of the largest all-remote companies in the world. Their entire product is built using their own CI/CD tools.

## The "Dogfooding" Advantage
By using their own tools, GitLab engineers feel the pain of their users instantly.
- Their handbook (thousands of pages) is deployed via CI/CD.
- Every merge request triggers a "Review App"—a temporary, full-stack environment where reviewers can see the changes in action.

## Key Takeaway
A CI/CD pipeline is not just for production; it's a tool for **Collaboration**. By providing instant feedback and preview environments, GitLab enables 1,500+ people to work asynchronously across every time zone.`
  },
  {
    id: "33-18",
    number: "33.18",
    title: "Exercises",
    content: `## Exercises

1. **Pipeline Design**: Draw a CI/CD pipeline for a React frontend and a Go backend. What stages are different?
2. **DORA Metrics**: Your team has a Lead Time of 5 days. What are three specific changes you could make to bring it under 1 day?
3. **Deployment Trade-offs**: Compare Blue-Green and Canary deployments. In what scenario is Blue-Green better?
4. **IaC Logic**: Write a pseudo-Terraform resource for an S3 bucket with versioning enabled.
5. **K8s Debugging**: A Pod is in \`CrashLoopBackOff\`. List the three \`kubectl\` commands you would use to find the cause.
6. **Feature Flag Debt**: You have a feature flag that has been 100% on for 3 months. Outline the steps to safely remove it.
7. **Zero-Downtime Database**: You need to rename the \`user_name\` column to \`username\`. Write out the "Expand and Contract" steps.
8. **GitOps Theory**: Why is "Pull-based" GitOps (like Flux) considered more secure than "Push-based" CI (like Jenkins)?

## Answers

1. Frontend: Lint, Build (webpack/vite), Unit Tests (Jest), S3 Upload/CloudFront Invalidate. Backend: Lint, Unit Tests, Compile (binary), Docker Build, Push to Registry, K8s Deploy.
2. 1. Automate testing. 2. Implement Trunk-Based Development. 3. Reduce PR review time.
3. Blue-Green is better when you need an absolute "all or nothing" switch (e.g., a massive breaking change that can't coexist with the old version).
4. \`resource "aws_s3_bucket" "b" { bucket="my-bucket"; versioning { enabled=true } }\`
5. \`kubectl get pods\`, \`kubectl describe pod [name]\`, \`kubectl logs [name]\`.
6. 1. Delete code branches. 2. Remove flag from config. 3. Delete flag from the dashboard.
7. 1. Add \`username\` column. 2. App writes to both. 3. Script copies old to new. 4. App reads from new. 5. Drop \`user_name\`.
8. Push-based requires CI to have credentials to the cluster. Pull-based has an agent *inside* the cluster that only needs read access to Git.`
  }
];
