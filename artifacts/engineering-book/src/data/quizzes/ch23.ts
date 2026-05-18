import { ChapterQuizData } from "../quizTypes";

export const CH23_QUIZ: ChapterQuizData = {
  chapterId: "ch23",
  sectionQuizzes: {
    "23-1": [
      {
        id: "q23-1-1",
        question: "What does IaaS stand for?",
        options: [
          "Infrastructure as a Service",
          "Integration as a Service",
          "Intelligence as a Service",
          "Internet as a Service"
        ],
        correct: 0,
        explanation: "IaaS provides fundamental computing resources like virtual machines, storage, and networking.",
        difficulty: "easy"
      },
      {
        id: "q23-1-2",
        question: "In which cloud model does the provider manage the underlying hardware and OS, allowing the user to focus on application deployment?",
        options: [
          "IaaS",
          "PaaS",
          "SaaS",
          "On-premises"
        ],
        correct: 1,
        explanation: "Platform as a Service (PaaS) provides a framework for developers to build and deploy applications without managing servers.",
        difficulty: "medium"
      },
      {
        id: "q23-1-3",
        question: "What is the main characteristic of SaaS?",
        options: [
          "Users manage the servers",
          "Software is delivered over the internet and managed by a third party",
          "Users write their own operating systems",
          "It only works on local networks"
        ],
        correct: 1,
        explanation: "Software as a Service (SaaS) delivers applications over the web (e.g., Gmail, Salesforce).",
        difficulty: "easy"
      }
    ],
    "23-2": [
      {
        id: "q23-2-1",
        question: "Which of these is a core AWS service for virtual servers?",
        options: [
          "S3",
          "EC2",
          "RDS",
          "Lambda"
        ],
        correct: 1,
        explanation: "EC2 (Elastic Compute Cloud) allows users to rent virtual computers.",
        difficulty: "easy"
      },
      {
        id: "q23-2-2",
        question: "What is Amazon S3 primarily used for?",
        options: [
          "Running database queries",
          "Scalable object storage",
          "Executing code in response to events",
          "Managing virtual networks"
        ],
        correct: 1,
        explanation: "Simple Storage Service (S3) is used for storing and retrieving any amount of data.",
        difficulty: "easy"
      },
      {
        id: "q23-2-3",
        question: "In Azure, what is the equivalent of an AWS EC2 instance?",
        options: [
          "Azure Functions",
          "Azure Virtual Machines",
          "Azure Blob Storage",
          "Azure SQL Database"
        ],
        correct: 1,
        explanation: "Azure Virtual Machines provide on-demand computing resources similar to EC2.",
        difficulty: "medium"
      }
    ],
    "23-3": [
      {
        id: "q23-3-1",
        question: "What is 'Serverless' computing?",
        options: [
          "Computing that doesn't use any servers",
          "A model where the cloud provider manages the server infrastructure and automatically scales based on demand",
          "Using only local computers",
          "A way to run servers without electricity"
        ],
        correct: 1,
        explanation: "Serverless doesn't mean no servers; it means the developer doesn't have to manage them.",
        difficulty: "easy"
      },
      {
        id: "q23-3-2",
        question: "Which of these is a popular serverless FaaS (Function as a Service) offering?",
        options: [
          "AWS Lambda",
          "AWS EC2",
          "AWS RDS",
          "AWS EBS"
        ],
        correct: 0,
        explanation: "AWS Lambda allows you to run code without provisioning or managing servers.",
        difficulty: "easy"
      },
      {
        id: "q23-3-3",
        question: "What is a key benefit of the 'pay-as-you-go' model in serverless?",
        options: [
          "You pay for the server even when it's idle",
          "You only pay for the exact duration and resources used by your code execution",
          "It's always more expensive than VMs",
          "You pay a flat monthly fee"
        ],
        correct: 1,
        explanation: "Serverless is cost-effective because you aren't billed for idle capacity.",
        difficulty: "medium"
      }
    ],
    "23-4": [
      {
        id: "q23-4-1",
        question: "What is a 'Cloud-Native' application?",
        options: [
          "Any application that runs on a computer",
          "An application designed specifically to leverage cloud computing models (e.g., microservices, containers)",
          "An application that only runs offline",
          "An application written in assembly language"
        ],
        correct: 1,
        explanation: "Cloud-native apps are built for the cloud's elasticity and distributed nature.",
        difficulty: "medium"
      },
      {
        id: "q23-4-2",
        question: "Which of the following is a key pillar of the 'Twelve-Factor App' methodology?",
        options: [
          "Storing config in code",
          "Dependency isolation",
          "Scaling manually",
          "Using only one server"
        ],
        correct: 1,
        explanation: "The Twelve-Factor App methodology emphasizes explicit dependency management and isolation.",
        difficulty: "hard"
      },
      {
        id: "q23-4-3",
        question: "What does 'Elasticity' mean in the cloud?",
        options: [
          "The ability to stretch the physical cables",
          "The ability to automatically scale resources up or down based on demand",
          "The flexibility of the terms of service",
          "The speed of the network"
        ],
        correct: 1,
        explanation: "Elasticity allows a system to handle spikes in traffic and save costs during low-demand periods.",
        difficulty: "easy"
      }
    ],
    "23-5": [
      {
        id: "q23-5-1",
        question: "What is a VPC (Virtual Private Cloud)?",
        options: [
          "A type of physical router",
          "A private, isolated section of a public cloud where you can launch resources in a virtual network",
          "A cloud provider's internal corporate network",
          "A way to share files between clouds"
        ],
        correct: 1,
        explanation: "VPCs give you control over your virtual networking environment, including IP ranges and subnets.",
        difficulty: "medium"
      },
      {
        id: "q23-5-2",
        question: "What is the purpose of a 'Subnet' within a VPC?",
        options: [
          "To connect two different clouds",
          "To divide the VPC's IP address range into smaller groups",
          "To increase the speed of the internet",
          "To store large files"
        ],
        correct: 1,
        explanation: "Subnets allow you to organize and isolate resources within a VPC.",
        difficulty: "medium"
      },
      {
        id: "q23-5-3",
        question: "Which component is used to allow a VPC to communicate with the internet?",
        options: [
          "Internet Gateway",
          "Internal Router",
          "Local Loopback",
          "Ethernet Port"
        ],
        correct: 0,
        explanation: "An Internet Gateway (IGW) enables communication between instances in your VPC and the internet.",
        difficulty: "medium"
      }
    ],
    "23-6": [
      {
        id: "q23-6-1",
        question: "What is the 'Shared Responsibility Model' in cloud security?",
        options: [
          "The provider is responsible for everything",
          "The customer is responsible for everything",
          "The provider manages security 'of' the cloud; the customer manages security 'in' the cloud",
          "Security is not important in the cloud"
        ],
        correct: 2,
        explanation: "The cloud provider secures the infrastructure, while the customer secures their data and applications.",
        difficulty: "medium"
      },
      {
        id: "q23-6-2",
        question: "Which service is used for Identity and Access Management in AWS?",
        options: [
          "IAM",
          "EC2",
          "S3",
          "RDS"
        ],
        correct: 0,
        explanation: "IAM allows you to securely manage access to AWS services and resources.",
        difficulty: "easy"
      },
      {
        id: "q23-6-3",
        question: "What is the principle of 'Least Privilege'?",
        options: [
          "Giving users access to everything they might ever need",
          "Granting only the minimum permissions required to perform a specific task",
          "Having no security at all",
          "Using the same password for everyone"
        ],
        correct: 1,
        explanation: "Least privilege minimizes the potential damage from compromised accounts or accidental errors.",
        difficulty: "medium"
      }
    ],
    "23-7": [
      {
        id: "q23-7-1",
        question: "What is 'Cloud Cost Optimization'?",
        options: [
          "Paying as much as possible to ensure reliability",
          "The process of reducing overall cloud spend by identifying mismanaged resources and rightsizing capacity",
          "Buying more servers than needed just in case",
          "Using only the most expensive cloud services"
        ],
        correct: 1,
        explanation: "Optimization helps ensure you are getting the most value for your cloud investment.",
        difficulty: "easy"
      },
      {
        id: "q23-7-2",
        question: "What are 'Reserved Instances' in AWS?",
        options: [
          "Instances that are broken",
          "A billing discount applied in exchange for a commitment to use a specific instance type for a set period",
          "Instances that only run on weekends",
          "Instances reserved for VIP customers"
        ],
        correct: 1,
        explanation: "Reserved Instances can provide significant savings compared to On-Demand pricing.",
        difficulty: "medium"
      },
      {
        id: "q23-7-3",
        question: "What is 'Rightsizing' in the cloud?",
        options: [
          "Making all servers the same size",
          "Matching instance types and sizes to your workload performance and capacity requirements at the lowest possible cost",
          "Always picking the largest server available",
          "Buying smaller monitors"
        ],
        correct: 1,
        explanation: "Rightsizing ensures you don't overpay for resources you aren't using.",
        difficulty: "medium"
      }
    ],
    "23-8": [
      {
        id: "q23-8-1",
        question: "What is a 'Multi-Cloud' strategy?",
        options: [
          "Using many servers from one provider",
          "Using cloud services from multiple providers (e.g., AWS and GCP) to avoid vendor lock-in",
          "Using only private clouds",
          "Running the same application twice"
        ],
        correct: 1,
        explanation: "Multi-cloud can improve resilience and provide leverage in price negotiations.",
        difficulty: "medium"
      },
      {
        id: "q23-8-2",
        question: "What is 'Hybrid Cloud'?",
        options: [
          "A mix of two different public clouds",
          "A combination of on-premises infrastructure (private cloud) and public cloud services",
          "A cloud that runs on solar power",
          "A cloud that uses both Windows and Linux"
        ],
        correct: 1,
        explanation: "Hybrid cloud allows data and applications to be shared between private and public environments.",
        difficulty: "medium"
      },
      {
        id: "q23-8-3",
        question: "Which of these is a challenge of Multi-Cloud?",
        options: [
          "Complexity in management and networking",
          "It's always cheaper than single cloud",
          "There are no challenges",
          "It's only for small companies"
        ],
        correct: 0,
        explanation: "Managing multiple providers requires specialized knowledge and can lead to operational complexity.",
        difficulty: "hard"
      }
    ],
    "23-9": [
      {
        id: "q23-9-1",
        question: "What is a Content Delivery Network (CDN)?",
        options: [
          "A way to write content",
          "A distributed network of proxy servers that cache content closer to users to improve performance",
          "A social media platform",
          "A type of internet connection"
        ],
        correct: 1,
        explanation: "CDNs reduce latency by serving static assets from edge locations.",
        difficulty: "easy"
      },
      {
        id: "q23-9-2",
        question: "Which AWS service provides CDN functionality?",
        options: [
          "CloudFront",
          "CloudTrail",
          "CloudWatch",
          "CloudFormation"
        ],
        correct: 0,
        explanation: "Amazon CloudFront is a fast content delivery network service.",
        difficulty: "easy"
      },
      {
        id: "q23-9-3",
        question: "What is an 'Edge Location' in the context of a CDN?",
        options: [
          "The center of the data center",
          "A site where content is cached to be delivered to users with low latency",
          "The edge of the server rack",
          "A remote office"
        ],
        correct: 1,
        explanation: "Edge locations are points of presence where the CDN serves content.",
        difficulty: "medium"
      }
    ],
    "23-10": [
      {
        id: "q23-10-1",
        question: "What is 'Auto-scaling'?",
        options: [
          "Automatically changing the font size",
          "A method to automatically adjust the number of active computing resources based on load",
          "A way to measure weight",
          "Manually adding more servers"
        ],
        correct: 1,
        explanation: "Auto-scaling helps maintain application availability and control costs.",
        difficulty: "easy"
      },
      {
        id: "q23-10-2",
        question: "What is the 'Cold Start' problem in serverless functions?",
        options: [
          "The server is too cold to run",
          "The latency experienced when a function is invoked after being idle for a while",
          "Starting the application in the winter",
          "Waiting for the database to boot"
        ],
        correct: 1,
        explanation: "Cold starts happen when the provider has to spin up a new container for the function.",
        difficulty: "hard"
      },
      {
        id: "q23-10-3",
        question: "What is 'Data Sovereignty'?",
        options: [
          "The data is the king",
          "The concept that data is subject to the laws of the country in which it is located",
          "Making sure data is always correct",
          "Using only local databases"
        ],
        correct: 1,
        explanation: "Cloud users must consider where their data is stored to comply with local regulations (like GDPR).",
        difficulty: "hard"
      }
    ]
  },
  examQuestions: [
    {
      id: "q23-exam-1",
      question: "Which cloud service model provides the most control over the underlying infrastructure?",
      options: [
        "SaaS",
        "PaaS",
        "IaaS",
        "FaaS"
      ],
      correct: 2,
      explanation: "IaaS gives users control over the OS and the entire software stack above the virtualization layer.",
      difficulty: "easy"
    },
    {
      id: "q23-exam-2",
      question: "Which of these is a GCP (Google Cloud Platform) service for data warehousing?",
      options: [
        "BigQuery",
        "Redshift",
        "Snowflake",
        "DynamoDB"
      ],
      correct: 0,
      explanation: "BigQuery is Google's fully managed, serverless enterprise data warehouse.",
      difficulty: "medium"
    },
    {
      id: "q23-exam-3",
      question: "What is the primary benefit of using a Managed Database service like AWS RDS?",
      options: [
        "It's always cheaper than running your own",
        "It automates tasks like patching, backups, and scaling",
        "It eliminates the need for SQL knowledge",
        "It makes the data public"
      ],
      correct: 1,
      explanation: "Managed services reduce operational overhead for database administration.",
      difficulty: "easy"
    },
    {
      id: "q23-exam-4",
      question: "What does 'High Availability' (HA) mean in the cloud?",
      options: [
        "The system is always running at maximum speed",
        "The system is designed to be operational and accessible for a high percentage of time (e.g., 99.99%)",
        "The system is expensive",
        "The system is located on a high floor"
      ],
      correct: 1,
      explanation: "HA involves redundancy and failover mechanisms to minimize downtime.",
      difficulty: "easy"
    },
    {
      id: "q23-exam-5",
      question: "What is 'Vendor Lock-in'?",
      options: [
        "When a vendor locks their office doors",
        "The difficulty of migrating from one cloud provider to another due to proprietary technologies",
        "Signing a long-term contract",
        "Using only one programming language"
      ],
      correct: 1,
      explanation: "Vendor lock-in can limit flexibility and bargaining power.",
      difficulty: "medium"
    },
    {
      id: "q23-exam-6",
      question: "Which service would you use to store large amounts of unstructured data like images and videos in Azure?",
      options: [
        "Azure SQL",
        "Azure Blob Storage",
        "Azure Cosmos DB",
        "Azure Active Directory"
      ],
      correct: 1,
      explanation: "Blob storage is optimized for storing massive amounts of unstructured data.",
      difficulty: "medium"
    },
    {
      id: "q23-exam-7",
      question: "What is a 'Spot Instance' in AWS?",
      options: [
        "An instance with spots on it",
        "Spare compute capacity available at high discounts, but can be interrupted by AWS",
        "The most expensive instance type",
        "An instance used for testing only"
      ],
      correct: 1,
      explanation: "Spot instances are great for fault-tolerant, flexible workloads at low cost.",
      difficulty: "medium"
    },
    {
      id: "q23-exam-8",
      question: "What is 'Serverless Orchestration'?",
      options: [
        "Managing multiple serverless functions to work together in a workflow",
        "Writing code for servers",
        "Playing music on servers",
        "Deleting old functions"
      ],
      correct: 0,
      explanation: "Tools like AWS Step Functions help coordinate multiple Lambda functions.",
      difficulty: "hard"
    },
    {
      id: "q23-exam-9",
      question: "What is 'Object Storage' different from 'Block Storage'?",
      options: [
        "Object storage is for files; block storage is for databases",
        "Object storage treats data as discrete units with metadata; block storage treats data as chunks in a volume",
        "Object storage is faster",
        "Block storage is only for cloud"
      ],
      correct: 1,
      explanation: "Object storage is highly scalable and includes rich metadata.",
      difficulty: "hard"
    },
    {
      id: "q23-exam-10",
      question: "What is the purpose of an AWS 'Availability Zone' (AZ)?",
      options: [
        "To provide a backup in case a whole region fails",
        "To provide isolated locations within a region to protect against local failures",
        "To connect to other cloud providers",
        "To store physical backup tapes"
      ],
      correct: 1,
      explanation: "AZs are physically separate data centers within a region with redundant power and networking.",
      difficulty: "medium"
    }
  ]
};
