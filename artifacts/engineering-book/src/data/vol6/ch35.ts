import type { Section } from '../types';

export const CH35_SECTIONS: Section[] = [
  {
    id: "35-1",
    number: "35.1",
    title: "Cloud Computing: The Engineering Reality",
    content: `Cloud computing is not just "someone else's computer." It is a fundamental shift from **Resource Management** to **Resource Orchestration**. In the cloud, infrastructure is programmable, ephemeral, and virtually infinite.

## The Three Service Models
1. **IaaS (Infrastructure as a Service)**: You get the virtual machine (EC2). You manage the OS, runtime, and data.
2. **PaaS (Platform as a Service)**: You get the runtime (Heroku, App Engine). You only manage the code and data.
3. **SaaS (Software as a Service)**: You get the whole app (Gmail, Salesforce). You only manage the configuration.

## The Engineering Reality
The "magic" of the cloud comes with a price: **Complexity**.
- **Failure is the norm**: In a data center, a server might stay up for 5 years. In the cloud, instances can be reclaimed at any time (Spot instances).
- **Latency is variable**: The network is shared. You must design for "noisy neighbors."
- **Cost is a first-class citizen**: In a data center, cost is a capital expenditure (CapEx). In the cloud, it's an operating expense (OpEx). Every line of code that is inefficient now has a direct, monthly dollar cost.

A master engineer treats the cloud as a **distributed system framework**, leveraging its strengths (scalability) while mitigating its weaknesses (unpredictability).`
  },
  {
    id: "35-2",
    number: "35.2",
    title: "The Shared Responsibility Model",
    content: `One of the most critical concepts in cloud engineering is understanding where the provider's job ends and yours begins.

## Security OF the Cloud (Provider)
AWS/Azure/GCP are responsible for:
- Physical security of data centers.
- Hardware maintenance.
- Virtualization layer (Hypervisor).
- Regional and edge network infrastructure.

## Security IN the Cloud (Customer)
You are responsible for:
- **IAM (Identity and Access Management)**: Who can access your resources.
- **Data Encryption**: Both at rest and in transit.
- **OS Patching**: If you run an EC2 instance, you must patch the Linux kernel.
- **Application Security**: The provider won't fix your SQL injection.

**The most common cause of cloud breaches is not a provider failure, but a customer misconfiguration** (e.g., an S3 bucket left open to the public).`
  },
  {
    id: "35-3",
    number: "35.3",
    title: "AWS Core Services: The Engineering Guide",
    content: `While there are hundreds of AWS services, 90% of engineering work revolves around a core set of primitives.

## The "Big Six"
1. **EC2 (Elastic Compute Cloud)**: Virtual machines. The foundation.
2. **S3 (Simple Storage Service)**: Object storage. "Infinite" capacity and 99.999999999% (11 nines) of durability.
3. **VPC (Virtual Private Cloud)**: Your private network in the cloud.
4. **IAM (Identity and Access Management)**: The security gatekeeper.
5. **RDS (Relational Database Service)**: Managed SQL (Postgres, MySQL).
6. **Lambda**: Serverless functions.

## Region vs Availability Zone (AZ)
- **Region**: A physical location in the world (e.g., \`us-east-1\`). Regions are isolated from each other.
- **Availability Zone**: One or more discrete data centers within a region. They have redundant power and networking.
**Engineering Rule**: To build a highly available system, you must deploy across at least **three AZs** within a single region.`
  },
  {
    id: "35-4",
    number: "35.4",
    title: "Compute: EC2, ECS, EKS, Lambda — Trade-off Analysis",
    content: `Choosing the right compute abstraction is the most important architectural decision in the cloud.

| Service | Abstraction | Management Effort | Use Case |
| :--- | :--- | :--- | :--- |
| **EC2** | Virtual Machine | High | Legacy apps, custom OS needs, extreme performance tuning. |
| **ECS** | Container | Medium | Standard web apps, Docker-first workflows, simpler than K8s. |
| **EKS** | Kubernetes | High | Large-scale microservices, complex orchestration, multi-cloud. |
| **Lambda** | Function | Low | Event-driven, glue code, low-traffic or highly bursty APIs. |

## The Fargate Option
AWS **Fargate** is a "serverless" way to run containers on ECS or EKS. You don't manage the underlying EC2 instances; you just specify CPU and RAM for your container. It's the "Goldilocks" zone for many modern engineering teams—full control over the environment without the toil of patching servers.`
  },
  {
    id: "35-5",
    number: "35.5",
    title: "Storage: S3, EBS, EFS — When to Use Each",
    content: `Not all storage is created equal. You must choose based on access patterns and performance requirements.

## 1. S3 (Object Storage)
- **Nature**: Key-value store for files. Access via HTTP API.
- **Best For**: Static assets, backups, data lakes.
- **Limit**: You can't "mount" it like a drive for high-performance random writes.

## 2. EBS (Elastic Block Store)
- **Nature**: A virtual hard drive attached to a single EC2 instance.
- **Best For**: Database storage, boot volumes.
- **Limit**: It is specific to one Availability Zone. If the AZ fails, the EBS volume is inaccessible unless you have snapshots.

## 3. EFS (Elastic File System)
- **Nature**: Managed NFS (Network File System). Can be mounted by hundreds of instances simultaneously.
- **Best For**: Shared configuration, shared media uploads, CMS platforms.
- **Limit**: Higher latency and cost compared to EBS.

A master engineer uses **S3** as the primary storage by default, only moving to EBS/EFS when the application requires a traditional filesystem.`
  },
  {
    id: "35-6",
    number: "35.6",
    title: "Databases: RDS, Aurora, DynamoDB, ElastiCache",
    content: `Cloud databases offer "High Availability" out of the box, but you must understand the underlying technology.

## RDS vs Aurora
- **RDS**: Managed versions of standard DBs. Multi-AZ works by synchronous replication to a standby instance.
- **Aurora**: AWS-proprietary, cloud-native DB. It separates storage from compute. Storage is replicated 6 times across 3 AZs. Aurora is generally faster and more resilient than standard RDS.

## DynamoDB (NoSQL)
- **Nature**: Key-value and document database.
- **Strength**: Consistent single-digit millisecond latency at *any* scale. No servers to manage.
- **Trade-off**: Requires a deep understanding of "Single Table Design" to be efficient.

## ElastiCache
- Managed **Redis** or **Memcached**. Used for session storage, caching, and real-time leaderboards.

**Rule of Thumb**: Start with **Aurora Postgres** for most applications. Move to **DynamoDB** only if you need scale that exceeds Aurora or if your data model is perfectly suited for key-value access.`
  },
  {
    id: "35-7",
    number: "35.7",
    title: "Networking: VPC, Subnets, Security Groups, NAT",
    content: `Networking in the cloud is defined by software.

## VPC (Virtual Private Cloud)
Your logically isolated section of the AWS Cloud. 

## Subnets
- **Public Subnet**: Has a route to an **Internet Gateway**. Instances get public IPs. Used for Load Balancers.
- **Private Subnet**: No direct route from the internet. Used for App Servers and Databases.

## Security Groups vs NACLs
- **Security Groups**: Statefull firewalls at the *instance* level. "Allow port 80."
- **NACLs (Network ACLs)**: Stateless firewalls at the *subnet* level. "Deny this IP range."

## NAT Gateway
Allows instances in a **Private Subnet** to connect to the internet (for updates) without allowing the internet to connect to them.

**Security Best Practice**: Keep 100% of your application and database servers in Private Subnets. Only the Load Balancer (ALB) should be in the Public Subnet.`
  },
  {
    id: "35-8",
    number: "35.8",
    title: "AWS Well-Architected Framework",
    content: `The Well-Architected Framework is the "Bible" of cloud engineering. It is built on six pillars:

1. **Operational Excellence**: Running and monitoring systems to deliver business value.
2. **Security**: Protecting information and systems.
3. **Reliability**: Ensuring the system can recover from failures.
4. **Performance Efficiency**: Using resources efficiently.
5. **Cost Optimization**: Avoiding unnecessary costs.
6. **Sustainability**: Minimizing the environmental impact of cloud workloads.

A "Well-Architected Review" is a formal process where you evaluate your architecture against these pillars. It often reveals critical single points of failure that teams have overlooked.`
  },
  {
    id: "35-9",
    number: "35.9",
    title: "Cloud Cost Engineering: RI, Savings Plans, Spot Instances",
    content: `Cost is an engineering metric. If your app is successful, your cloud bill will eventually become one of the company's largest expenses.

## Pricing Models
1. **On-Demand**: Most expensive. Pay by the second. Use for testing/spiky loads.
2. **Reserved Instances (RI) / Savings Plans**: Commit to 1-3 years of usage for a 30-70% discount. Use for your "baseline" load.
3. **Spot Instances**: Bid on unused AWS capacity. Up to 90% discount. 
   - **Catch**: AWS can take the instance back with a 2-minute warning.
   - **Usage**: Perfect for batch processing, CI/CD runners, and stateless web tiers (if you have enough replicas).

**Master Strategy**: Use Spot instances for 80% of your compute, backed by Savings Plans for the remaining 20% of critical "On-Demand" baseline.`
  },
  {
    id: "35-10",
    number: "35.10",
    title: "Multi-Cloud Strategy: Reality vs Theory",
    content: `Many executives dream of "Multi-Cloud" to avoid vendor lock-in. For engineers, this is often a nightmare.

## The Theory
If AWS goes down, we just flip a switch to Azure.

## The Reality
- **Lowest Common Denominator**: You can only use services that exist in both clouds (basically just VMs and Kubernetes). You lose the power of cloud-native services like DynamoDB or BigQuery.
- **Complexity**: You now have two networking models, two IAM models, and two sets of bugs to manage.
- **Data Gravity**: Moving petabytes of data between clouds is slow and expensive (Egress fees).

**The Master's Advice**: Most companies should pick one cloud and go "All In." The agility gained by using that cloud's specific high-level services far outweighs the theoretical risk of lock-in. Only at massive scale (Uber, Netflix) does multi-cloud become a necessity for bargaining power or extreme DR.`
  },
  {
    id: "35-11",
    number: "35.11",
    title: "Cloud Security: IAM, SCP, GuardDuty",
    content: `In the cloud, **Identity is the New Perimeter**.

## IAM (Identity and Access Management)
- **Users**: Humans.
- **Groups**: Collection of users.
- **Roles**: Used by services (e.g., an EC2 instance has a role to read from S3).
- **Policies**: JSON documents defining permissions.

## SCP (Service Control Policies)
Available in AWS Organizations. They allow you to set "Guardrails" at the account level.
- Example: "No one in this account is allowed to create an S3 bucket in a region other than \`us-east-1\`."

## GuardDuty
A managed threat detection service that monitors VPC Flow Logs, CloudTrail, and DNS logs for malicious activity (e.g., an EC2 instance talking to a known Bitcoin mining pool).`
  },
  {
    id: "35-12",
    number: "35.12",
    title: "Serverless Architectures: Real Trade-offs",
    content: `Serverless isn't just about Lambda; it's an operational model where you manage zero servers.

## The Pros
- **Auto-scaling**: Scales from zero to thousands of requests instantly.
- **Pay-per-request**: If no one uses your app, you pay $0.
- **Reduced Toil**: No OS patching, no capacity planning.

## The Cons
- **Cold Starts**: The first request after a period of inactivity can take seconds as the provider spins up the execution environment.
- **Limited Execution Time**: Lambda has a 15-minute timeout.
- **State Management**: Functions are stateless. You must use external stores like Redis or DynamoDB.

**The "Cold Start" Fix**: Use "Provisioned Concurrency" for critical paths, or choose languages with fast startup times (Go, Rust, Node.js) over heavy ones (Java, C#).`
  },
  {
    id: "35-13",
    number: "35.13",
    title: "Edge Computing: CloudFront Functions, Lambda@Edge",
    content: `Wait time is the enemy of UX. If your server is in Virginia and your user is in Tokyo, the speed of light limits your performance. **Edge Computing** moves the logic closer to the user.

## CloudFront Functions
- **Nature**: Tiny JavaScript functions that run at the 200+ AWS Edge Locations.
- **Constraints**: 1ms execution time, no network access.
- **Use Case**: Header manipulation, URL rewrites, cache key normalization.

## Lambda@Edge
- **Nature**: Full Lambda functions that run at the edge.
- **Capabilities**: Access to external APIs, longer execution time.
- **Use Case**: Real-time image resizing, A/B testing logic, SEO injection.

By moving logic to the edge, you can respond to requests in 10-50ms instead of 200-500ms.`
  },
  {
    id: "35-14",
    number: "35.14",
    title: "Data Engineering on Cloud: S3, Glue, Athena, Redshift",
    content: `The cloud has revolutionized Big Data by separating storage from compute.

## The Modern Data Stack
1. **S3 (The Data Lake)**: Raw data (JSON, CSV, Parquet) is dumped here.
2. **AWS Glue**: A managed ETL (Extract, Transform, Load) service that crawls the data and creates a schema catalog.
3. **Amazon Athena**: A serverless query engine that allows you to run **Standard SQL** directly against files in S3. 
   - **Cost**: You pay $5 per Terabyte scanned.
4. **Amazon Redshift**: A high-performance, columnar data warehouse for complex analytics.

**Engineering Insight**: For many teams, **Athena** replaces the need for a permanent database for analytics. It's the ultimate "Serverless" data tool.`
  },
  {
    id: "35-15",
    number: "35.15",
    title: "Case Study: Airbnb's Cloud Architecture Evolution",
    content: `Airbnb was one of the earliest adopters of AWS. Their journey illustrates the standard path of a growing tech company.

## Phase 1: The Monolith on EC2
A single Ruby on Rails app. Scaling meant buying bigger EC2 instances (**Vertical Scaling**).

## Phase 2: Microservices and SOA
Moving to Java and internal services. Using **Chef** for configuration management.

## Phase 3: Kubernetes and Cloud-Native
Migrating to K8s for better resource utilization. Adopting **DynamoDB** for high-scale storage and **Druid** for real-time analytics.

## Key Lesson
Airbnb didn't start with K8s. They moved to it when the **Operational Complexity** of managing thousands of EC2 instances became greater than the **Complexity** of K8s itself. Always choose the simplest tool that solves your current problem.`
  },
  {
    id: "35-16",
    number: "35.16",
    title: "Exercises",
    content: `## Exercises

1. **VPC Design**: You need to host a web app and a database. Draw the subnet layout. Which resources go where?
2. **Cost Calculation**: An on-demand m5.large instance costs $0.096/hr. A Spot instance is 70% cheaper. What is the monthly saving for 10 instances?
3. **Storage Choice**: You are building a video streaming site. Where do you store the raw MP4 files? Where do you store the user's profile picture?
4. **IAM Policy**: Write a simple JSON policy that allows a user to "Read-Only" from a specific S3 bucket named "my-app-logs".
5. **Multi-AZ Reliability**: Your app is in 2 AZs. AZ-A goes down. Your app has 4 instances (2 in each). What happens to your capacity? How do you prevent a crash?
6. **Serverless Logic**: Why is a "database connection pool" problematic in AWS Lambda?
7. **Cloud Security**: Explain the difference between an IAM User and an IAM Role. Which should an EC2 instance use to access S3?
8. **Edge Computing**: A user in Australia is accessing your site hosted in the US. What AWS service reduces the "Time to First Byte" (TTFB)?

## Answers

1. **Public Subnet**: Application Load Balancer (ALB). **Private Subnet**: EC2/ECS App Instances and RDS Database.
2. On-demand: $0.096 * 24 * 30 * 10 = $691.20. Spot: $691.20 * 0.3 = $207.36. Saving: $483.84.
3. Both in **S3**. Use CloudFront as a CDN for the video files.
4. \`{"Effect": "Allow", "Action": ["s3:Get*", "s3:List*"], "Resource": ["arn:aws:s3:::my-app-logs/*"]}\`
5. Capacity drops by 50%. If the remaining 2 instances can't handle the load, they will crash too. **Fix**: Use Auto Scaling Groups (ASG) and ensure you always have N+1 capacity.
6. Lambda functions are short-lived. Every time a function spins up, it creates a new connection. If you have 1,000 concurrent Lambdas, you'll hit the DB's connection limit. **Fix**: Use RDS Proxy.
7. A User is for a human with a password. A Role is for a service with temporary credentials. An EC2 should *always* use a Role.
8. **Amazon CloudFront** (the CDN) and potentially **Lambda@Edge** for logic.`
  }
];
