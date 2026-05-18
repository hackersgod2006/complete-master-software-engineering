import { ChapterQuizData } from "../quizTypes";

export const CH21_QUIZ: ChapterQuizData = {
  chapterId: "ch21",
  sectionQuizzes: {
    "21-1": [
      {
        id: "q21-1-1",
        question: "What is the primary goal of DevOps?",
        options: [
          "To separate development and operations teams",
          "To automate all manual coding tasks",
          "To bridge the gap between development and operations for faster, reliable delivery",
          "To eliminate the need for quality assurance"
        ],
        correct: 2,
        explanation: "DevOps aims to break down silos between development and operations teams to improve collaboration and delivery speed.",
        difficulty: "easy"
      },
      {
        id: "q21-1-2",
        question: "Which of the following is a core principle of DevOps?",
        options: [
          "Continuous Improvement",
          "Manual deployments",
          "Siloed communication",
          "Infrequent releases"
        ],
        correct: 0,
        explanation: "Continuous improvement (Kaizen) is a fundamental DevOps principle, along with automation and collaboration.",
        difficulty: "medium"
      },
      {
        id: "q21-1-3",
        question: "What does the 'C' in CALMS framework stand for?",
        options: [
          "Code",
          "Culture",
          "Cloud",
          "Compliance"
        ],
        correct: 1,
        explanation: "CALMS stands for Culture, Automation, Lean, Measurement, and Sharing.",
        difficulty: "hard"
      }
    ],
    "21-2": [
      {
        id: "q21-2-1",
        question: "What is the main purpose of a Continuous Integration (CI) pipeline?",
        options: [
          "To deploy code to production automatically",
          "To integrate code changes into a shared repository frequently and run automated tests",
          "To manage cloud infrastructure",
          "To monitor application performance"
        ],
        correct: 1,
        explanation: "CI focuses on early detection of integration issues by frequently merging and testing code.",
        difficulty: "easy"
      },
      {
        id: "q21-2-2",
        question: "In a CI/CD pipeline, what does 'Continuous Delivery' imply?",
        options: [
          "Code is automatically deployed to production without human intervention",
          "Code is always in a deployable state, but manual approval may be required for production",
          "Only development environments are updated",
          "The database is continuously backed up"
        ],
        correct: 1,
        explanation: "Continuous Delivery ensures code is ready for release, while Continuous Deployment automates the actual release.",
        difficulty: "medium"
      },
      {
        id: "q21-2-3",
        question: "Which tool is commonly used for orchestrating CI/CD pipelines?",
        options: [
          "Jenkins",
          "Redis",
          "PostgreSQL",
          "Wireshark"
        ],
        correct: 0,
        explanation: "Jenkins is a widely used open-source automation server for CI/CD.",
        difficulty: "easy"
      }
    ],
    "21-3": [
      {
        id: "q21-3-1",
        question: "What is a Docker container?",
        options: [
          "A virtual machine with a full OS",
          "A lightweight, standalone, executable package that includes everything needed to run an application",
          "A hardware device for networking",
          "A type of cloud storage"
        ],
        correct: 1,
        explanation: "Containers share the host OS kernel, making them lighter and faster than traditional virtual machines.",
        difficulty: "easy"
      },
      {
        id: "q21-3-2",
        question: "What is the purpose of a Dockerfile?",
        options: [
          "To store application data",
          "To define the steps to build a Docker image",
          "To manage network traffic between containers",
          "To encrypt sensitive credentials"
        ],
        correct: 1,
        explanation: "A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.",
        difficulty: "medium"
      },
      {
        id: "q21-3-3",
        question: "Which command is used to run a Docker container from an image?",
        options: [
          "docker build",
          "docker run",
          "docker stop",
          "docker push"
        ],
        correct: 1,
        explanation: "The 'docker run' command creates a container from a specified image and starts it.",
        difficulty: "easy"
      }
    ],
    "21-4": [
      {
        id: "q21-4-1",
        question: "What is Kubernetes?",
        options: [
          "A programming language",
          "A database engine",
          "An open-source container orchestration platform",
          "A web server"
        ],
        correct: 2,
        explanation: "Kubernetes automates the deployment, scaling, and management of containerized applications.",
        difficulty: "easy"
      },
      {
        id: "q21-4-2",
        question: "What is a 'Pod' in Kubernetes?",
        options: [
          "The smallest deployable unit that can contain one or more containers",
          "A physical server in a data center",
          "A type of load balancer",
          "A persistent storage volume"
        ],
        correct: 0,
        explanation: "Pods are the basic execution units of Kubernetes, representing a single instance of a running process.",
        difficulty: "medium"
      },
      {
        id: "q21-4-3",
        question: "What is the role of the Kubernetes Control Plane?",
        options: [
          "To run user applications",
          "To store database records",
          "To manage the cluster and maintain the desired state",
          "To provide a user interface for developers"
        ],
        correct: 2,
        explanation: "The control plane makes global decisions about the cluster and detects/responds to cluster events.",
        difficulty: "hard"
      }
    ],
    "21-5": [
      {
        id: "q21-5-1",
        question: "What is Infrastructure as Code (IaC)?",
        options: [
          "Writing documentation for servers",
          "Managing and provisioning infrastructure through machine-readable definition files",
          "Manually configuring servers via GUI",
          "A type of firmware"
        ],
        correct: 1,
        explanation: "IaC allows for automated, repeatable, and version-controlled infrastructure management.",
        difficulty: "easy"
      },
      {
        id: "q21-5-2",
        question: "Which tool is a popular choice for implementing IaC?",
        options: [
          "Terraform",
          "Photoshop",
          "Excel",
          "Slack"
        ],
        correct: 0,
        explanation: "Terraform is a widely used tool for building, changing, and versioning infrastructure safely and efficiently.",
        difficulty: "medium"
      },
      {
        id: "q21-5-3",
        question: "What is the benefit of 'Idempotency' in IaC?",
        options: [
          "It makes the code run faster",
          "It ensures that applying the same configuration multiple times results in the same state",
          "It allows for manual changes to be preserved",
          "It encrypts the infrastructure files"
        ],
        correct: 1,
        explanation: "Idempotency ensures consistency and prevents unintended side effects during multiple runs.",
        difficulty: "hard"
      }
    ],
    "21-6": [
      {
        id: "q21-6-1",
        question: "What is a Blue-Green deployment?",
        options: [
          "Deploying code only on weekends",
          "A technique that uses two identical production environments to reduce downtime and risk",
          "A strategy where users are randomly assigned to versions",
          "Testing code in a 'green' environment before 'blue' production"
        ],
        correct: 1,
        explanation: "One environment (Blue) handles live traffic while the other (Green) is updated; then traffic is switched.",
        difficulty: "medium"
      },
      {
        id: "q21-6-2",
        question: "What is the main advantage of Blue-Green deployment?",
        options: [
          "It is the cheapest deployment method",
          "It allows for near-zero downtime and easy rollback",
          "It requires only one server",
          "It eliminates the need for testing"
        ],
        correct: 1,
        explanation: "If issues occur in the new environment, traffic can be quickly routed back to the old one.",
        difficulty: "medium"
      },
      {
        id: "q21-6-3",
        question: "In Blue-Green deployment, which environment is typically 'live'?",
        options: [
          "Always the Blue one",
          "Always the Green one",
          "The one currently receiving production traffic",
          "The one with the newest code"
        ],
        correct: 2,
        explanation: "The 'live' environment is whichever one is actively serving users at that moment.",
        difficulty: "easy"
      }
    ],
    "21-7": [
      {
        id: "q21-7-1",
        question: "What is a Canary Release?",
        options: [
          "Releasing code to all users at once",
          "A technique of rolling out a new version to a small subset of users before full release",
          "A type of security audit",
          "A deployment that only happens in the morning"
        ],
        correct: 1,
        explanation: "Canary releases help identify issues with minimal user impact before a wider rollout.",
        difficulty: "medium"
      },
      {
        id: "q21-7-2",
        question: "How does a Canary Release differ from Blue-Green deployment?",
        options: [
          "It doesn't; they are the same",
          "Canary releases involve gradual traffic shifting; Blue-Green is usually an all-or-nothing switch",
          "Canary requires more hardware",
          "Blue-Green is only for frontend changes"
        ],
        correct: 1,
        explanation: "Canary is incremental, whereas Blue-Green typically involves switching all traffic from one environment to another.",
        difficulty: "hard"
      },
      {
        id: "q21-7-3",
        question: "Which metric is crucial to monitor during a Canary Release?",
        options: [
          "Number of lines of code",
          "Error rate and performance metrics for the canary group",
          "Developer productivity",
          "Office temperature"
        ],
        correct: 1,
        explanation: "Monitoring health metrics of the canary group determines if it's safe to continue the rollout.",
        difficulty: "medium"
      }
    ],
    "21-8": [
      {
        id: "q21-8-1",
        question: "What is GitOps?",
        options: [
          "Operations managed through Git pull requests for infrastructure and application updates",
          "Using Git only for source code",
          "A new version of Git",
          "Operations without any version control"
        ],
        correct: 0,
        explanation: "GitOps uses Git as the single source of truth for declarative infrastructure and applications.",
        difficulty: "medium"
      },
      {
        id: "q21-8-2",
        question: "Which of the following is a benefit of GitOps?",
        options: [
          "Manual SSH access to servers",
          "Audit trail and easy reverts through Git history",
          "Faster internet connection",
          "Reduced need for security"
        ],
        correct: 1,
        explanation: "Git provides a clear record of changes, making it easy to see who did what and when, and to roll back if needed.",
        difficulty: "medium"
      },
      {
        id: "q21-8-3",
        question: "What is a 'reconciliation loop' in the context of GitOps?",
        options: [
          "A meeting to resolve conflicts",
          "A process that constantly ensures the actual state matches the desired state in Git",
          "A type of recursive function",
          "A way to fix broken Git commits"
        ],
        correct: 1,
        explanation: "Automated tools constantly compare the cluster state with Git and apply changes to align them.",
        difficulty: "hard"
      }
    ],
    "21-9": [
      {
        id: "q21-9-1",
        question: "What is the purpose of 'Shift Left' in DevOps?",
        options: [
          "Moving operations to the left side of the building",
          "Introducing testing and security earlier in the development lifecycle",
          "Delaying deployments",
          "Prioritizing frontend development"
        ],
        correct: 1,
        explanation: "Shifting left helps catch bugs and security vulnerabilities sooner, reducing cost and risk.",
        difficulty: "medium"
      },
      {
        id: "q21-9-2",
        question: "What does DevSecOps add to the traditional DevOps model?",
        options: [
          "More developers",
          "Integrating security practices into the DevOps pipeline",
          "Separate security teams that block releases",
          "Using only secure programming languages"
        ],
        correct: 1,
        explanation: "DevSecOps emphasizes that security is a shared responsibility integrated throughout the lifecycle.",
        difficulty: "medium"
      },
      {
        id: "q21-9-3",
        question: "Which tool might be used for 'Shifting Left' with security?",
        options: [
          "Static Application Security Testing (SAST) tools",
          "Google Analytics",
          "Microsoft Word",
          "A physical firewall"
        ],
        correct: 0,
        explanation: "SAST tools analyze source code for vulnerabilities during development or CI.",
        difficulty: "hard"
      }
    ],
    "21-10": [
      {
        id: "q21-10-1",
        question: "What is a 'Chaos Engineering' experiment?",
        options: [
          "Deliberately introducing failures into a system to test its resilience",
          "Deleting the production database by mistake",
          "Writing code without any plan",
          "Changing requirements mid-sprint"
        ],
        correct: 0,
        explanation: "Chaos Engineering helps uncover systemic weaknesses before they cause real outages.",
        difficulty: "medium"
      },
      {
        id: "q21-10-2",
        question: "Which famous tool was pioneered by Netflix for Chaos Engineering?",
        options: [
          "Chaos Monkey",
          "Gorilla Test",
          "Bug Squasher",
          "Server Killer"
        ],
        correct: 0,
        explanation: "Chaos Monkey was one of the first tools to randomly terminate instances in production to test resilience.",
        difficulty: "medium"
      },
      {
        id: "q21-10-3",
        question: "What is the 'Blast Radius' in Chaos Engineering?",
        options: [
          "The physical distance from the server",
          "The potential impact of an experiment on the system and its users",
          "The size of the backup file",
          "The number of developers involved"
        ],
        correct: 1,
        explanation: "Limiting the blast radius is essential to ensure experiments don't cause catastrophic outages.",
        difficulty: "hard"
      }
    ]
  },
  examQuestions: [
    {
      id: "q21-exam-1",
      question: "Which of the following best describes the CI/CD pipeline?",
      options: [
        "A manual process for code reviews",
        "An automated sequence of steps to build, test, and deploy code",
        "A way to write documentation",
        "A tool for project management"
      ],
      correct: 1,
      explanation: "CI/CD pipelines automate the path from code commit to production delivery.",
      difficulty: "easy"
    },
    {
      id: "q21-exam-2",
      question: "In Kubernetes, which component is responsible for scheduling pods onto nodes?",
      options: [
        "kube-proxy",
        "kube-scheduler",
        "etcd",
        "kubelet"
      ],
      correct: 1,
      explanation: "The kube-scheduler watches for newly created pods and selects a node for them to run on.",
      difficulty: "medium"
    },
    {
      id: "q21-exam-3",
      question: "What is the primary difference between a container and a Virtual Machine (VM)?",
      options: [
        "Containers have their own OS kernel; VMs share it",
        "Containers share the host OS kernel; VMs have their own guest OS",
        "VMs are lighter than containers",
        "There is no difference"
      ],
      correct: 1,
      explanation: "Containers are more efficient because they don't require a full guest OS for every instance.",
      difficulty: "medium"
    },
    {
      id: "q21-exam-4",
      question: "Which IaC tool uses a declarative language called HCL?",
      options: [
        "Ansible",
        "Chef",
        "Terraform",
        "Puppet"
      ],
      correct: 2,
      explanation: "Terraform uses HashiCorp Configuration Language (HCL).",
      difficulty: "medium"
    },
    {
      id: "q21-exam-5",
      question: "What is the main goal of a 'Dry Run' in deployment tools?",
      options: [
        "To speed up the deployment",
        "To simulate the changes without actually applying them",
        "To delete old files",
        "To check the network speed"
      ],
      correct: 1,
      explanation: "Dry runs allow operators to verify what will happen before making real changes.",
      difficulty: "easy"
    },
    {
      id: "q21-exam-6",
      question: "Which deployment strategy involves having two identical environments?",
      options: [
        "Rolling update",
        "Canary release",
        "Blue-Green deployment",
        "Recreate"
      ],
      correct: 2,
      explanation: "Blue-Green deployment uses two environments to enable easy switching and rollback.",
      difficulty: "easy"
    },
    {
      id: "q21-exam-7",
      question: "What does 'Observability' in DevOps usually involve?",
      options: [
        "Watching developers work",
        "Logging, metrics, and tracing to understand system state",
        "Reading the source code",
        "Customer surveys"
      ],
      correct: 1,
      explanation: "Observability is about gaining insights into the internal state of a system from its external outputs.",
      difficulty: "easy"
    },
    {
      id: "q21-exam-8",
      question: "Which of these is a key benefit of immutable infrastructure?",
      options: [
        "You can change servers easily manually",
        "Infrastructure is never updated",
        "Consistency is improved by replacing rather than modifying servers",
        "It's cheaper to maintain"
      ],
      correct: 2,
      explanation: "Replacing components ensures they match the defined state exactly, avoiding 'configuration drift'.",
      difficulty: "hard"
    },
    {
      id: "q21-exam-9",
      question: "What is 'Self-healing' in a container orchestrator?",
      options: [
        "The ability to fix bugs in the code automatically",
        "Automatically restarting or replacing failed containers",
        "Asking developers to fix issues",
        "Closing the application when it crashes"
      ],
      correct: 1,
      explanation: "Kubernetes, for example, restarts containers that fail or don't respond to health checks.",
      difficulty: "medium"
    },
    {
      id: "q21-exam-10",
      question: "What does 'Pipeline as Code' mean?",
      options: [
        "Writing the CI/CD pipeline definition in a file (e.g., YAML) and versioning it",
        "The pipeline is made of physical pipes",
        "Manual steps written in a document",
        "Using a GUI to drag and drop steps"
      ],
      correct: 0,
      explanation: "Storing pipeline definitions in version control ensures consistency and visibility.",
      difficulty: "medium"
    }
  ]
};
