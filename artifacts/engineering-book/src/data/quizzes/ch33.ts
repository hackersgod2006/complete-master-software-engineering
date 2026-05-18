import { ChapterQuizData } from "../quizTypes";

export const CH33_QUIZ: ChapterQuizData = {
  "chapterId": "ch33",
  "sectionQuizzes": {
    "33-1": [
      {
        "id": "q-33-1-1",
        "question": "What are the three main components of a typical Machine Learning pipeline?",
        "options": [
          "Frontend, Backend, Database",
          "Data Preparation, Model Training, Model Deployment",
          "Javascript, Python, C++",
          "CPU, GPU, TPU"
        ],
        "correct": 1,
        "explanation": "An ML pipeline involves collecting/cleaning data, training a model, and serving it in production.",
        "difficulty": "easy"
      },
      {
        "id": "q-33-1-2",
        "question": "What is 'Supervised Learning'?",
        "options": [
          "Learning where an engineer watches the computer 24/7",
          "Learning using a dataset where the desired output (label) is already known",
          "Learning where the computer asks for help constantly",
          "Learning without any input data"
        ],
        "correct": 1,
        "explanation": "Supervised learning uses labeled data to train models for classification or regression.",
        "difficulty": "easy"
      },
      {
        "id": "q-33-1-3",
        "question": "In ML, what is 'Inference'?",
        "options": [
          "The process of gathering more data",
          "Using a trained model to make predictions on new, unseen data",
          "Writing the code for the neural network",
          "A guess made by the engineer"
        ],
        "correct": 1,
        "explanation": "Inference is the 'running' phase of a model after it has been trained.",
        "difficulty": "medium"
      }
    ],
    "33-2": [
      {
        "id": "q-33-2-1",
        "question": "What is 'Feature Engineering' in ML?",
        "options": [
          "Building new features for the user interface",
          "Selecting, manipulating, and transforming raw data into features that better represent the underlying problem to the model",
          "Fixing bugs in the ML library",
          "Hiring more engineers for the ML team"
        ],
        "correct": 1,
        "explanation": "Feature engineering is often the most important part of building a successful ML model.",
        "difficulty": "medium"
      },
      {
        "id": "q-33-2-2",
        "question": "What is 'Overfitting'?",
        "options": [
          "When a model is too large to fit in memory",
          "When a model learns the training data too well, including its noise, and fails to generalize to new data",
          "When an engineer spends too much time on a project",
          "When the dataset is too large for the model"
        ],
        "correct": 1,
        "explanation": "Overfitted models perform great on training data but poorly on real-world tests.",
        "difficulty": "medium"
      },
      {
        "id": "q-33-2-3",
        "question": "What is a 'Validation Set' used for?",
        "options": [
          "To check if the user is authorized to use the model",
          "To tune hyperparameters and prevent overfitting during the training process",
          "To store the final weights of the model",
          "To replace the training set"
        ],
        "correct": 1,
        "explanation": "The validation set is a subset of data used to evaluate the model while it's being tuned.",
        "difficulty": "medium"
      }
    ],
    "33-3": [
      {
        "id": "q-33-3-1",
        "question": "What is 'MLOps'?",
        "options": [
          "A new programming language for ML",
          "The application of DevOps principles to ML workflows, including automation, monitoring, and versioning",
          "Managing the ML team's budget",
          "Only deploying models to the cloud"
        ],
        "correct": 1,
        "explanation": "MLOps aims to bridge the gap between model development and reliable production deployment.",
        "difficulty": "easy"
      },
      {
        "id": "q-33-3-2",
        "question": "What is 'Data Drift'?",
        "options": [
          "When data is accidentally deleted",
          "The phenomenon where the statistical properties of the target variable or input data change over time",
          "Data moving between different cloud regions",
          "A slow database query"
        ],
        "correct": 1,
        "explanation": "Data drift can cause a model's performance to degrade over time because it no longer reflects the real world.",
        "difficulty": "medium"
      },
      {
        "id": "q-33-3-3",
        "question": "What is a 'Feature Store'?",
        "options": [
          "A place to buy ML models",
          "A centralized repository for storing and serving features for both training and inference",
          "The hard drive where the data is stored",
          "A database for storing user profiles"
        ],
        "correct": 1,
        "explanation": "Feature stores promote reuse and consistency of features across different models and teams.",
        "difficulty": "hard"
      }
    ],
    "33-4": [
      {
        "id": "q-33-4-1",
        "question": "What does 'LLM' stand for?",
        "options": [
          "Low-Level Model",
          "Large Language Model",
          "Logical Learning Module",
          "Layered Linear Matrix"
        ],
        "correct": 1,
        "explanation": "LLMs are models like GPT-4 trained on massive amounts of text data.",
        "difficulty": "easy"
      },
      {
        "id": "q-33-4-2",
        "question": "What is 'Prompt Engineering'?",
        "options": [
          "Writing the source code for an LLM",
          "The process of crafting and optimizing inputs to an LLM to get the desired output",
          "Asking an engineer to work faster",
          "Managing the queue of tasks for an LLM"
        ],
        "correct": 1,
        "explanation": "Prompting is a key way to interact with and control LLM behavior without retraining.",
        "difficulty": "easy"
      },
      {
        "id": "q-33-4-3",
        "question": "What is a 'Hallucination' in the context of LLMs?",
        "options": [
          "The LLM getting a virus",
          "When an LLM generates text that is factually incorrect but sounds plausible",
          "The engineer dreaming about code",
          "A visual bug in the LLM's interface"
        ],
        "correct": 1,
        "explanation": "Hallucinations are a major challenge in ensuring the reliability of LLM-based applications.",
        "difficulty": "medium"
      }
    ],
    "33-5": [
      {
        "id": "q-33-5-1",
        "question": "What does 'RAG' stand for?",
        "options": [
          "Random Access Generator",
          "Retrieval-Augmented Generation",
          "Resource Allocation Grid",
          "Real-time Automated Guidance"
        ],
        "correct": 1,
        "explanation": "RAG combines LLMs with external data retrieval to improve accuracy and provide context.",
        "difficulty": "medium"
      },
      {
        "id": "q-33-5-2",
        "question": "In RAG, what is the role of the 'Retriever'?",
        "options": [
          "To train the model on the new data",
          "To find relevant documents or information from a database based on the user's query",
          "To generate the final response to the user",
          "To translate the LLM's output into different languages"
        ],
        "correct": 1,
        "explanation": "The retriever fetches the relevant context which is then passed to the LLM.",
        "difficulty": "medium"
      },
      {
        "id": "q-33-5-3",
        "question": "Why use RAG instead of fine-tuning a model on your data?",
        "options": [
          "Fine-tuning is always better but RAG is cheaper",
          "RAG allows for using up-to-date information without expensive retraining and reduces hallucinations",
          "RAG is only for small datasets",
          "Fine-tuning is not possible with modern LLMs"
        ],
        "correct": 1,
        "explanation": "RAG is more flexible and cost-effective for many business use cases where data changes frequently.",
        "difficulty": "hard"
      }
    ],
    "33-6": [
      {
        "id": "q-33-6-1",
        "question": "What is a 'Vector Database'?",
        "options": [
          "A database that only stores numbers",
          "A specialized database for storing and querying high-dimensional vector embeddings",
          "An old type of relational database",
          "A database used for graphic design"
        ],
        "correct": 1,
        "explanation": "Vector databases are essential for similarity searches in AI applications.",
        "difficulty": "medium"
      },
      {
        "id": "q-33-6-2",
        "question": "What is an 'Embedding' in AI?",
        "options": [
          "A way to put a video on a website",
          "A numerical representation of data (like text or images) that captures its semantic meaning",
          "The process of putting a chip in a brain",
          "A hidden message in the model's output"
        ],
        "correct": 1,
        "explanation": "Embeddings convert complex data into vectors that the computer can compare mathematically.",
        "difficulty": "medium"
      },
      {
        "id": "q-33-6-3",
        "question": "What is 'Cosine Similarity'?",
        "options": [
          "A measure of how fast a model is",
          "A mathematical measure of the similarity between two vectors",
          "The angle of a computer screen",
          "A type of neural network layer"
        ],
        "correct": 1,
        "explanation": "Cosine similarity is frequently used to find 'nearby' or 'similar' items in a vector space.",
        "difficulty": "hard"
      }
    ],
    "33-7": [
      {
        "id": "q-33-7-1",
        "question": "What is 'Transfer Learning'?",
        "options": [
          "Transferring knowledge from one engineer to another",
          "Taking a pre-trained model and fine-tuning it for a specific, related task",
          "Learning how to use a new keyboard",
          "Moving a model from one cloud provider to another"
        ],
        "correct": 1,
        "explanation": "Transfer learning allows building powerful models with much less data and compute than training from scratch.",
        "difficulty": "medium"
      },
      {
        "id": "q-33-7-2",
        "question": "What is 'Reinforcement Learning' (RL)?",
        "options": [
          "Learning by repeating the same task forever",
          "Learning through a system of rewards and punishments based on actions taken in an environment",
          "Learning with a very strict teacher",
          "Making the computer work harder by adding more CPU"
        ],
        "correct": 1,
        "explanation": "RL is used for things like game playing, robotics, and LLM alignment (RLHF).",
        "difficulty": "medium"
      },
      {
        "id": "q-33-7-3",
        "question": "What is 'RLHF'?",
        "options": [
          "Reinforcement Learning from Human Feedback",
          "Rapid Learning of High-level Functions",
          "Random Learning for Heavy Frameworks",
          "Real-time Learning with High Frequency"
        ],
        "correct": 0,
        "explanation": "RLHF is used to align LLMs with human preferences and safety guidelines.",
        "difficulty": "hard"
      }
    ],
    "33-8": [
      {
        "id": "q-33-8-1",
        "question": "What is a 'Transformer' in the context of AI?",
        "options": [
          "A toy that changes shape",
          "A specific neural network architecture that uses self-attention mechanisms, forming the basis of modern LLMs",
          "An electrical device used for power",
          "A program that converts Python to C++"
        ],
        "correct": 1,
        "explanation": "The Transformer architecture (from the paper 'Attention Is All You Need') revolutionized NLP.",
        "difficulty": "medium"
      },
      {
        "id": "q-33-8-2",
        "question": "What is 'Self-Attention' in a Transformer model?",
        "options": [
          "The model being aware of its own existence",
          "A mechanism that allows the model to weigh the importance of different words in a sequence when processing one of them",
          "The model ignoring all external input",
          "A way for the model to fix its own bugs"
        ],
        "correct": 1,
        "explanation": "Self-attention allows the model to understand context and relationships between words regardless of distance in a text.",
        "difficulty": "hard"
      },
      {
        "id": "q-33-8-3",
        "question": "What is 'Zero-shot Learning'?",
        "options": [
          "Learning with zero data",
          "The ability of a model to perform a task without having seen any specific examples for that task during training",
          "A model that makes zero mistakes",
          "A training process that takes zero time"
        ],
        "correct": 1,
        "explanation": "LLMs can often perform new tasks just by being told what to do in a prompt.",
        "difficulty": "medium"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch33-1",
      "question": "Which of these is the most likely cause of a model performing perfectly on training data but poorly on a test set?",
      "options": ["Underfitting", "Overfitting", "Data Drift", "Not enough GPUs"],
      "correct": 1,
      "explanation": "Overfitting is when the model 'memorizes' the training data instead of learning to generalize.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch33-2",
      "question": "In the context of MLOps, what does 'Model Versioning' entail?",
      "options": [
        "Giving the model a funny name",
        "Tracking the code, data, and parameters used to produce a specific model artifact",
        "Only keeping the latest version of the model",
        "Naming the model after the engineer who trained it"
      ],
      "correct": 1,
      "explanation": "Reproducibility is key in MLOps, requiring tracking of all inputs to the model creation process.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch33-3",
      "question": "What is 'Tokenization' in Large Language Models?",
      "options": [
        "Giving the user a digital token to use the API",
        "Breaking down text into smaller units (tokens) like words or sub-words for processing",
        "Encrypting the model's weights",
        "Converting a model into a cryptocurrency"
      ],
      "correct": 1,
      "explanation": "Tokenization is the first step in processing text for an LLM.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch33-4",
      "question": "What is the 'Cold Start' problem in recommendation systems?",
      "options": [
        "The server taking a long time to boot up",
        "The difficulty of making recommendations for new users or items with no history",
        "The recommendation system getting a virus",
        "The user not knowing how to use the system"
      ],
      "correct": 1,
      "explanation": "Without data on a user or item, collaborative filtering cannot make accurate predictions.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch33-5",
      "question": "Which type of learning is typically used for image classification (e.g., Cat vs Dog)?",
      "options": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Evolutionary Learning"],
      "correct": 0,
      "explanation": "Labeled images are used to train the model to recognize categories.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch33-6",
      "question": "What is a 'Gradient' in the context of neural network training?",
      "options": [
        "A pretty color transition in the UI",
        "The direction and magnitude of the change needed to reduce the model's error (loss)",
        "The slope of the office floor",
        "The speed at which the model is training"
      ],
      "correct": 1,
      "explanation": "Gradients are used in backpropagation to update the model's weights.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch33-7",
      "question": "What is 'Quantization' for ML models?",
      "options": [
        "Increasing the number of neurons in a model",
        "Reducing the precision of the model's weights (e.g., from 32-bit to 8-bit) to save memory and speed up inference",
        "Counting how many users the model has",
        "Measuring the quality of the model's output"
      ],
      "correct": 1,
      "explanation": "Quantization is a key technique for running large models on edge devices or with less VRAM.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch33-8",
      "question": "What is 'Chain of Thought' (CoT) prompting?",
      "options": [
        "Asking the LLM a long sequence of unrelated questions",
        "A technique where the model is encouraged to 'show its work' by explaining its reasoning steps",
        "Linking multiple LLMs together in a chain",
        "Thinking about code while in a meeting"
      ],
      "correct": 1,
      "explanation": "CoT prompting significantly improves the performance of LLMs on complex reasoning tasks.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch33-9",
      "question": "What is 'Perplexity' in language modeling?",
      "options": [
        "A measure of how confused the engineer is",
        "A metric for how well a probability model predicts a sample (lower is usually better)",
        "The length of the training dataset",
        "The number of GPUs used for training"
      ],
      "correct": 1,
      "explanation": "Perplexity is a standard way to measure the performance of language models.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch33-10",
      "question": "What is the primary function of an 'Activation Function' (like ReLU) in a neural network?",
      "options": [
        "To turn the power on for the server",
        "To introduce non-linearity, allowing the network to learn complex patterns",
        "To save the model to disk",
        "To display the results to the user"
      ],
      "correct": 1,
      "explanation": "Without non-linear activation functions, a neural network would just be a series of linear transformations, which is limited in power.",
      "difficulty": "hard"
    }
  ]
};
