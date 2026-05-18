import type { Section } from '../types';

export const CH36_SECTIONS: Section[] = [
  {
    id: "36-1",
    number: "36.1",
    title: "ML as a Software Engineering Problem",
    content: `For decades, Machine Learning was the domain of researchers and mathematicians. Today, the challenge has shifted from "How do we build a better model?" to "How do we build a reliable, maintainable system around a model?" This is the birth of **Machine Learning Engineering**.

## The Hidden Technical Debt
Google's famous paper, "Hidden Technical Debt in Machine Learning Systems," points out that the ML code itself is only a tiny fraction of a production system. The vast majority of the effort goes into:
- Data collection and verification.
- Feature extraction.
- Resource management.
- Analysis tools.
- Process management.
- Configuration.
- Serving infrastructure.

## Determinism vs. Probabilism
Traditional software is **deterministic**: given Input A, the system *always* produces Output B. ML is **probabilistic**: given Input A, the system produces Output B with a certain confidence. This shift requires a complete rethink of how we test, monitor, and debug software.

A master engineer treats ML not as "magic" but as a powerful, yet high-maintenance, component of a larger software system.`
  },
  {
    id: "36-2",
    number: "36.2",
    title: "The ML System Architecture",
    content: `A production ML system is a pipeline of interconnected components.

## The Training Pipeline (Offline)
1. **Data Ingestion**: Gathering data from databases, logs, or third-party APIs.
2. **Preprocessing**: Cleaning data, handling missing values, and normalization.
3. **Feature Engineering**: Transforming raw data into numerical vectors that the model can understand.
4. **Training**: The actual "learning" phase where the model adjusts its weights.
5. **Evaluation**: Testing the model against a "hold-out" set of data it hasn't seen before.

## The Serving Pipeline (Online)
1. **Inference Request**: The user sends data (e.g., a photo or a search query).
2. **Feature Fetching**: Retrieving real-time features (e.g., the user's recent click history).
3. **Prediction**: The model generates an output.
4. **Monitoring**: Logging the prediction and, eventually, the "ground truth" (did the user actually click the recommendation?) to close the feedback loop.

The key to a successful architecture is **Reproducibility**. If you can't recreate a specific model version with the exact same data and code, you don't have a production system; you have a science project.`
  },
  {
    id: "36-3",
    number: "36.3",
    title: "Data Engineering: Pipelines, Quality, and Governance",
    content: `In ML, "Garbage In, Garbage Out" is the absolute law. **Data Engineering** is the foundation of ML.

## Data Pipelines
Modern pipelines use tools like **Apache Airflow**, **Dagster**, or **Prefect** to manage complex Directed Acyclic Graphs (DAGs) of tasks.
- **Extraction**: Getting data from disparate sources.
- **Transformation**: Converting types, joining tables, and deduplication.
- **Loading**: Storing data in a Data Warehouse (Snowflake) or Data Lake (S3).

## Data Quality (The "Unit Tests" of Data)
You must validate your data *before* it hits the model.
- **Schema Validation**: Is the column still a \`float\`?
- **Range Checks**: Is the \`age\` column between 0 and 120?
- **Distribution Checks**: Did the average \`order_value\` suddenly drop by 50%? This might indicate a bug in the upstream logging.

## Data Governance
Who owns the data? How long is it kept? Is it compliant with GDPR/CCPA? Master engineers ensure that data lineage is tracked so that every prediction can be traced back to its source data.`
  },
  {
    id: "36-4",
    number: "36.4",
    title: "Feature Stores",
    content: `A **Feature Store** is a central repository for storing and serving features. It solves the problem of "Training-Serving Skew."

## The Problem: Training-Serving Skew
In training, you might calculate a user's "average spend over 30 days" using a massive SQL query. In production, you need that same value in 10ms. If the production team rewrites the SQL into Java, they might introduce a subtle logic difference. The model was trained on one thing but is being fed another.

## The Solution
A feature store (like **Feast** or **Tecton**) provides:
1. **Offline Store**: High-volume historical data for training (S3, BigQuery).
2. **Online Store**: Low-latency storage for inference (Redis, DynamoDB).
3. **Feature Registry**: A single definition of the feature code that is shared by both.

By using a feature store, you ensure that the "feature logic" is defined once and used everywhere.`
  },
  {
    id: "36-5",
    number: "36.5",
    title: "Model Training Infrastructure",
    content: `Training a model at scale requires specialized infrastructure.

## Hardware Acceleration
- **GPUs (Graphics Processing Units)**: Excellent for the matrix multiplications found in Deep Learning.
- **TPUs (Tensor Processing Units)**: Google's custom chips optimized specifically for TensorFlow/PyTorch.

## Distributed Training
When a model or dataset is too large for one machine:
- **Data Parallelism**: The same model is on multiple GPUs, each processing a slice of the data.
- **Model Parallelism**: Different parts of the model are on different GPUs.

## Managed Training Services
Platforms like **AWS SageMaker**, **GCP Vertex AI**, and **Azure ML** provide "Managed Notebooks" and "Training Jobs." They handle the provisioning of GPU instances, the mounting of S3 data, and the shutting down of instances when the job is done, saving massive amounts of money.`
  },
  {
    id: "36-6",
    number: "36.6",
    title: "Model Serving: Latency, Throughput, and Cost",
    content: `Serving a model is where software engineering constraints (latency, throughput) hit the reality of heavy ML computation.

## Serving Patterns
1. **Request-Response (REST/gRPC)**: Low latency. The user waits for the prediction.
2. **Asynchronous (Queue-based)**: Higher throughput. Good for background tasks (e.g., image moderation).
3. **Batch**: The model runs on millions of rows at once and stores the results for later lookup.

## Optimization Techniques
- **Model Quantization**: Converting 32-bit weights to 8-bit to reduce model size and increase speed (with minimal accuracy loss).
- **Pruning**: Removing "weak" neurons from the network.
- **ONNX (Open Neural Network Exchange)**: A common format that allows you to train in PyTorch but serve in a highly optimized C++ runtime.

A master engineer balances the "Accuracy" of a large model against the "Latency" and "Cost" of serving it. Sometimes, a simple Logistic Regression is better for the business than a complex Transformer.`
  },
  {
    id: "36-7",
    number: "36.7",
    title: "MLOps: The CI/CD of Machine Learning",
    content: `**MLOps** is the application of DevOps principles to ML.

## The ML Lifecycle
- **CI**: Continuous Integration of code *and* data validation.
- **CD**: Continuous Delivery of the model. This isn't just a container deployment; it's a "Model Rollout."
- **CT**: **Continuous Training**. If the model's performance drops, the pipeline automatically triggers a new training run with the latest data.

## Model Registry
A versioned repository for models (like **MLflow**). It tracks:
- Who trained the model?
- What data was used?
- What were the accuracy metrics?
- Is it "Staging," "Production," or "Archived"?

MLOps ensures that the model is treated as a first-class software artifact, with automated testing and rollback capabilities.`
  },
  {
    id: "36-8",
    number: "36.8",
    title: "A/B Testing and Experimentation Platforms",
    content: `In ML, you never know if a new model is truly better until it hits real users.

## The Experimentation Workflow
1. **Offline Evaluation**: The new model looks better on the test set.
2. **Shadow Mode**: Deploy the new model alongside the old one. It receives real traffic, but its predictions aren't shown to users. We just compare the outputs.
3. **Canary/AB Test**: 5% of users see the new model. We track business metrics (Conversion Rate, CTR).
4. **Full Rollout**: If the metrics are positive, move to 100%.

## Multi-Armed Bandits (MAB)
A more advanced approach than A/B testing. MAB automatically shifts traffic toward the "winning" model in real-time, minimizing the "cost" of showing a sub-optimal model to users during the test.`
  },
  {
    id: "36-9",
    number: "36.9",
    title: "Monitoring ML in Production: Data Drift, Concept Drift",
    content: `ML models can "fail" even if the code is running perfectly and the CPU is low.

## 1. Data Drift
The statistical properties of the *input* data change.
- **Example**: Your model was trained on photos from high-end iPhones, but a new group of users joins with low-quality Android cameras. The model's performance will likely drop.

## 2. Concept Drift
The relationship between the input and the target (the *concept*) changes.
- **Example**: A fraud detection model trained before the pandemic might fail because people's buying patterns changed fundamentally during lockdown.

## Monitoring Strategy
Use tools like **WhyLogs** or **Great Expectations**. You must monitor:
- **Prediction Distributions**: Is the model suddenly predicting "Fraud" 50% more often?
- **Feature Distributions**: Did the average \`income\` of our users shift?
- **Feedback Loops**: Comparing the prediction to the real outcome as soon as it's available.`
  },
  {
    id: "36-10",
    number: "36.10",
    title: "Large Language Model Engineering",
    content: `LLMs have introduced a new layer of the stack: **Prompt Engineering** and **LLM Orchestration**.

## The LLM Stack
1. **Foundation Models**: GPT-4, Llama 3, Claude.
2. **Prompt Management**: Versioning and testing prompts as if they were code.
3. **Context Window Management**: LLMs have limited "memory." You must carefully choose what information to send.
4. **Guardrails**: Tools like **NeMo Guardrails** or **Guardrails AI** to prevent the model from hallucinating or generating toxic content.

## Token Economics
LLMs are billed by **tokens** (roughly 0.75 words).
- **Strategy**: Cache frequent queries. Use smaller, cheaper models (GPT-3.5) for simple tasks and "Route" complex ones to larger models (GPT-4).`
  },
  {
    id: "36-11",
    number: "36.11",
    title: "RAG Architecture: Retrieval-Augmented Generation",
    content: `LLMs are frozen in time. They don't know about your private company docs or the news that happened this morning. **RAG** solves this.

## The RAG Workflow
1. **User Query**: "What is our company's policy on remote work?"
2. **Retrieval**: The system searches your internal document database for the most relevant paragraphs.
3. **Augmentation**: The system creates a new prompt: "Based on the following context: [Relevant Paragraphs], answer the user's question: [User Query]."
4. **Generation**: The LLM generates an answer based *only* on the provided context.

RAG significantly reduces hallucinations because the model is "grounded" in real data. It also allows you to update the model's knowledge by simply updating the database, without retraining.`
  },
  {
    id: "36-12",
    number: "36.12",
    title: "Vector Database Integration",
    content: `To make RAG work at scale, you need a **Vector Database**.

## Embeddings
A "Vector" is a long list of numbers that represents the *meaning* of a piece of text. 
- "King" and "Queen" will have vectors that are close to each other in mathematical space.
- The process of turning text into a vector is called **Embedding**.

## The Database (Pinecone, Weaviate, Milvus, pgvector)
A vector database is optimized for **Semantic Search** (finding things with similar meanings) rather than keyword search.
- When the user asks a question, you embed the question and ask the database: "Find me the 5 vectors in your index that are closest to this question vector."

A master engineer understands the trade-offs between different indexing algorithms like **HNSW** (Fast but memory-intensive) and **IVF** (Slower but more compact).`
  },
  {
    id: "36-13",
    number: "36.13",
    title: "LLM Evaluation: Metrics and Human Evaluation",
    content: `How do you know if your LLM app is actually good?

## Automated Metrics
- **BLEU / ROUGE**: Old-school metrics that compare word overlap. Not very useful for LLMs.
- **LLM-as-a-Judge**: Using a "strong" model (GPT-4) to grade the output of a "weaker" model.
- **RAGAS**: A specialized framework for evaluating RAG, measuring:
  - **Faithfulness**: Is the answer derived from the context?
  - **Relevance**: Does the answer actually address the question?

## Human-in-the-loop
Ultimately, subjective quality requires humans. Use tools like **Argilla** or **Label Studio** to allow experts to "thumbs up/down" responses. This data can then be used for **RLHF** (Reinforcement Learning from Human Feedback) to further fine-tune the model.`
  },
  {
    id: "36-14",
    number: "36.14",
    title: "Case Study: Spotify's Recommendation System",
    content: `Spotify's "Discover Weekly" is a masterpiece of ML engineering.

## How it Works
It's not just one model; it's an ensemble:
1. **Collaborative Filtering**: "People who liked the songs you like also liked this song."
2. **Natural Language Processing (NLP)**: Scraping the web for blogs and articles about music to understand how people *describe* artists.
3. **Audio Analysis**: Using Convolutional Neural Networks (CNNs) to analyze the raw audio (tempo, key, loudness, "danceability").

## The Infrastructure
Spotify uses **Eventual Consistency** for recommendations. They process billions of events using **Apache Beam** (Scio) on GCP. Their scale is so massive that they had to build their own internal tool, **Backstage** (now open source), to manage their thousands of microservices and ML models.`
  },
  {
    id: "36-15",
    number: "36.15",
    title: "Exercises",
    content: `## Exercises

1. **ML Debt**: Read the "Hidden Technical Debt" paper. Identify one "ML-specific" debt in a project you've worked on.
2. **Pipeline Design**: Draw a DAG for a model that predicts "House Prices." What are the input sources?
3. **Feature Engineering**: You have a "Timestamp" of an order. Propose three features you could derive from it.
4. **Skew Analysis**: Why might a model's accuracy be 95% in your Jupyter Notebook but only 60% in production?
5. **Quantization**: If you convert a model from FP32 to INT8, what is the theoretical reduction in memory usage?
6. **Drift Detection**: You are monitoring a "Credit Score" model. What metric would you use to detect Data Drift?
7. **RAG Workflow**: Sketch the steps from a user typing a query to the LLM generating a response.
8. **Vector Search**: Explain why "Keyword Search" (Elasticsearch) and "Semantic Search" (Pinecone) are often used together in a "Hybrid Search" system.

## Answers

1. (Subjective) Common answers include "Lack of data lineage" or "Manual model deployment."
2. Sources: SQL (historical sales), API (current interest rates), Crawlers (neighborhood stats). Stages: Ingest -> Clean -> Join -> Train -> Eval.
3. 1. Hour of day (is it night?). 2. Day of week (is it a weekend?). 3. Is it a public holiday?
4. Training-Serving Skew. The production data might be formatted differently, or some features available in training (like the final sale price) aren't available at the time of prediction.
5. 4x reduction (32 bits down to 8 bits).
6. **Population Stability Index (PSI)** or the **Kullback-Leibler (KL) Divergence** between the training and production feature distributions.
7. Query -> Embedding -> Vector DB Search -> Retrieve Context -> Build Prompt -> LLM Generation.
8. Keyword search is great for exact matches (names, product IDs). Semantic search is great for "vibes" and synonyms. Hybrid search combines both for the best results.`
  }
];
