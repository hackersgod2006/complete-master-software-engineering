import { ChapterQuizData } from "../quizTypes";

export const CH34_QUIZ: ChapterQuizData = {
  "chapterId": "ch34",
  "sectionQuizzes": {
    "34-1": [
      {
        "id": "q-34-1-1",
        "question": "What is the core concept of a 'Distributed Ledger'?",
        "options": [
          "A spreadsheet shared via email",
          "A database that is replicated across multiple nodes where all nodes agree on the state",
          "A single server that everyone can access",
          "A ledger that is stored in pieces across different hard drives"
        ],
        "correct": 1,
        "explanation": "In a distributed ledger, there is no central authority; instead, consensus mechanisms ensure all participants have the same data.",
        "difficulty": "easy"
      },
      {
        "id": "q-34-1-2",
        "question": "Which property makes blockchain 'immutable'?",
        "options": [
          "It is stored in the cloud",
          "Each block contains a cryptographic hash of the previous block, creating an unbreakable chain",
          "It is written in a special language",
          "Only the creator can change the data"
        ],
        "correct": 1,
        "explanation": "Changing data in one block would invalidate all subsequent blocks, making tampering easily detectable.",
        "difficulty": "medium"
      },
      {
        "id": "q-34-1-3",
        "question": "What is a 'Genesis Block'?",
        "options": [
          "The most recent block in a chain",
          "The first block ever created in a blockchain",
          "A block that contains no transactions",
          "A block created by the Genesis company"
        ],
        "correct": 1,
        "explanation": "The genesis block is the foundation of the entire blockchain.",
        "difficulty": "easy"
      }
    ],
    "34-2": [
      {
        "id": "q-34-2-1",
        "question": "What is a 'Smart Contract'?",
        "options": [
          "A legal document signed with a digital pen",
          "Self-executing code stored on a blockchain that automatically performs actions when conditions are met",
          "An AI that writes legal contracts",
          "A contract that is easy to understand"
        ],
        "correct": 1,
        "explanation": "Smart contracts allow for trustless transactions and automation without intermediaries.",
        "difficulty": "easy"
      },
      {
        "id": "q-34-2-2",
        "question": "Which blockchain platform popularised smart contracts?",
        "options": [
          "Bitcoin",
          "Ethereum",
          "Litecoin",
          "Dogecoin"
        ],
        "correct": 1,
        "explanation": "Ethereum was designed from the ground up to support a Turing-complete virtual machine for smart contracts.",
        "difficulty": "easy"
      },
      {
        "id": "q-34-2-3",
        "question": "What is 'Gas' in the context of Ethereum?",
        "options": [
          "Fuel for the office cars",
          "A unit that measures the amount of computational effort required to execute an operation",
          "A type of cryptocurrency",
          "The speed of the network"
        ],
        "correct": 1,
        "explanation": "Gas fees are paid to miners/validators to process transactions and prevent network spam.",
        "difficulty": "medium"
      }
    ],
    "34-3": [
      {
        "id": "q-34-3-1",
        "question": "What is 'Proof of Work' (PoW)?",
        "options": [
          "Showing your boss your code at the end of the day",
          "A consensus mechanism where participants (miners) solve complex mathematical puzzles to validate transactions",
          "A document proving you are employed",
          "A way to measure how fast an engineer writes code"
        ],
        "correct": 1,
        "explanation": "PoW is used by Bitcoin but is criticized for its high energy consumption.",
        "difficulty": "medium"
      },
      {
        "id": "q-34-2-2",
        "question": "What is 'Proof of Stake' (PoS)?",
        "options": [
          "A mechanism where validators are chosen based on the number of tokens they hold and are willing to 'stake'",
          "Proving that you own a stake in a company",
          "A way to cook meat on a blockchain",
          "A system where the person with the most money makes all decisions"
        ],
        "correct": 0,
        "explanation": "PoS is much more energy-efficient than PoW and is now used by Ethereum.",
        "difficulty": "medium"
      },
      {
        "id": "q-34-3-3",
        "question": "What is a '51% Attack'?",
        "options": [
          "When 51% of the code has bugs",
          "When a single entity gains control of more than half of the network's mining power or stake, allowing them to manipulate the ledger",
          "A 51% discount on transaction fees",
          "When the network is down for 51 minutes"
        ],
        "correct": 1,
        "explanation": "A 51% attack is a major theoretical threat to the security of decentralized blockchains.",
        "difficulty": "hard"
      }
    ],
    "34-4": [
      {
        "id": "q-34-4-1",
        "question": "What does 'DeFi' stand for?",
        "options": [
          "Defined Finance",
          "Decentralized Finance",
          "Default File Interface",
          "Delayed Finality"
        ],
        "correct": 1,
        "explanation": "DeFi refers to financial services (lending, borrowing, trading) built on top of public blockchains.",
        "difficulty": "easy"
      },
      {
        "id": "q-34-4-2",
        "question": "What is a 'DEX' in the context of Web3?",
        "options": [
          "A digital index",
          "A Decentralized Exchange",
          "A type of database",
          "A security tool"
        ],
        "correct": 1,
        "explanation": "DEXs (like Uniswap) allow users to trade cryptocurrencies directly without a central authority.",
        "difficulty": "medium"
      },
      {
        "id": "q-34-4-3",
        "question": "What is a 'Stablecoin'?",
        "options": [
          "A coin that doesn't move",
          "A cryptocurrency designed to have a stable value, usually pegged to a fiat currency like the US Dollar",
          "A coin used only in horse stables",
          "A coin that is very hard to hack"
        ],
        "correct": 1,
        "explanation": "Stablecoins (like USDC or USDT) bridge the gap between traditional finance and crypto.",
        "difficulty": "easy"
      }
    ],
    "34-5": [
      {
        "id": "q-34-5-1",
        "question": "What is a 'DAO'?",
        "options": [
          "A Digital Access Object",
          "A Decentralized Autonomous Organization",
          "A Data Analysis Office",
          "A type of smart contract bug"
        ],
        "correct": 1,
        "explanation": "DAOs are organizations governed by code and token holders rather than a central leadership team.",
        "difficulty": "medium"
      },
      {
        "id": "q-34-5-2",
        "question": "What are 'Governance Tokens' used for?",
        "options": [
          "To pay for groceries",
          "To allow holders to vote on proposals that affect the direction of a DAO or protocol",
          "To secure the network from hackers",
          "To encrypt private messages"
        ],
        "correct": 1,
        "explanation": "Governance tokens give community members a say in how the project is run.",
        "difficulty": "medium"
      },
      {
        "id": "q-34-5-3",
        "question": "What is 'On-chain' vs 'Off-chain'?",
        "options": [
          "On-chain is on the internet, off-chain is not",
          "On-chain refers to data stored directly on the blockchain; off-chain is stored elsewhere",
          "On-chain is for Bitcoin, off-chain is for Ethereum",
          "There is no difference"
        ],
        "correct": 1,
        "explanation": "Storing everything on-chain is expensive, so many applications use off-chain storage (like IPFS) for large data.",
        "difficulty": "medium"
      }
    ],
    "34-6": [
      {
        "id": "q-34-6-1",
        "question": "What does 'NFT' stand for?",
        "options": [
          "New Financial Technology",
          "Non-Fungible Token",
          "Network File Transfer",
          "Non-Functional Test"
        ],
        "correct": 1,
        "explanation": "Non-fungible means unique and non-interchangeable (unlike Bitcoin or Dollars).",
        "difficulty": "easy"
      },
      {
        "id": "q-34-6-2",
        "question": "What is the primary use case for NFTs currently?",
        "options": [
          "Replacing all cash",
          "Digital art, collectibles, and proof of ownership/authenticity",
          "Storing database backups",
          "Speeding up the internet"
        ],
        "correct": 1,
        "explanation": "NFTs allow for verifiable ownership of digital assets.",
        "difficulty": "easy"
      },
      {
        "id": "q-34-6-3",
        "question": "What is a 'Wallet' in Web3?",
        "options": [
          "A physical place to keep your hardware",
          "A software or hardware tool that stores your private keys and allows you to interact with blockchains",
          "A database of all your transactions",
          "A type of smart contract"
        ],
        "correct": 1,
        "explanation": "Wallets don't actually 'store' coins; they store the keys that allow you to move coins on the ledger.",
        "difficulty": "easy"
      }
    ],
    "34-7": [
      {
        "id": "q-34-7-1",
        "question": "What is 'Layer 2' (L2) in blockchain scaling?",
        "options": [
          "The second floor of a data center",
          "A secondary framework or protocol built on top of an existing blockchain (Layer 1) to improve its scalability",
          "A backup blockchain in case the first one fails",
          "A way to store twice as much data"
        ],
        "correct": 1,
        "explanation": "L2s (like Arbitrum or Lightning Network) process transactions off the main chain and then settle them on L1.",
        "difficulty": "medium"
      },
      {
        "id": "q-34-7-2",
        "question": "What is a 'Rollup'?",
        "options": [
          "A type of snack",
          "A scaling solution that 'rolls up' many transactions into a single batch to be processed on Layer 1",
          "A way to undo a transaction",
          "A method for restarting a blockchain node"
        ],
        "correct": 1,
        "explanation": "Rollups significantly reduce transaction costs while inheriting the security of the underlying Layer 1.",
        "difficulty": "hard"
      },
      {
        "id": "q-34-7-3",
        "question": "What is 'Zero-Knowledge Proof' (ZKP)?",
        "options": [
          "A proof that someone knows nothing",
          "A cryptographic method by which one party can prove to another that they know a value, without conveying any information apart from the fact that they know the value",
          "A type of bug in a smart contract",
          "A way to hide the existence of a blockchain"
        ],
        "correct": 1,
        "explanation": "ZKPs are used for privacy and scaling (e.g., ZK-Rollups).",
        "difficulty": "hard"
      }
    ],
    "34-8": [
      {
        "id": "q-34-8-1",
        "question": "What is 'Oracle' in the context of blockchain?",
        "options": [
          "A large software company",
          "A service that provides external data to smart contracts",
          "A person who predicts the price of Bitcoin",
          "A special type of validator node"
        ],
        "correct": 1,
        "explanation": "Since blockchains are isolated, oracles (like Chainlink) are needed to bring in real-world data (e.g., stock prices, weather).",
        "difficulty": "medium"
      },
      {
        "id": "q-34-8-2",
        "question": "What is 'Self-Custody'?",
        "options": [
          "Being your own lawyer",
          "Being solely responsible for holding and managing your own private keys",
          "Letting an exchange hold your crypto",
          "Keeping your computer in a safe"
        ],
        "correct": 1,
        "explanation": "'Not your keys, not your coins' is the mantra of self-custody.",
        "difficulty": "easy"
      },
      {
        "id": "q-34-8-3",
        "question": "What is a 'Hard Fork'?",
        "options": [
          "A metal utensil",
          "A radical change to a network's protocol that makes previously invalid blocks/transactions valid (or vice-versa), often resulting in a split into two separate chains",
          "A physical damage to a server",
          "A very difficult decision for the developers"
        ],
        "correct": 1,
        "explanation": "Hard forks require all nodes to upgrade or follow a new chain (e.g., Bitcoin vs Bitcoin Cash).",
        "difficulty": "medium"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch34-1",
      "question": "What problem does the 'Byzantine Generals Problem' illustrate in distributed systems?",
      "options": [
        "The difficulty of managing a large army",
        "The challenge of reaching consensus in a network where some participants may be malicious or fail",
        "The speed of communication between ancient cities",
        "How to coordinate an attack on a database"
      ],
      "correct": 1,
      "explanation": "Blockchain consensus mechanisms are designed to solve this problem.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch34-2",
      "question": "Which of these is a primary difference between a 'Public' and 'Private' blockchain?",
      "options": [
        "Public is free, private costs money",
        "Public is permissionless (anyone can join), private is permissioned",
        "Public is on the internet, private is on a local network only",
        "There is no difference"
      ],
      "correct": 1,
      "explanation": "Public blockchains (like Bitcoin) are open to all; private ones (like Hyperledger) are restricted to authorized members.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch34-3",
      "question": "What is 'Liquidity' in a DeFi protocol?",
      "options": [
        "The amount of water in the server room",
        "The availability of assets for trading or borrowing within the protocol",
        "The speed of the smart contract execution",
        "The number of users online"
      ],
      "correct": 1,
      "explanation": "High liquidity is essential for low slippage in decentralized exchanges.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch34-4",
      "question": "What does it mean for a smart contract to be 'Turing Complete'?",
      "options": [
        "It was written by Alan Turing",
        "It can perform any calculation that a computer can theoretically perform (has loops, logic, etc.)",
        "It is 100% secure",
        "It can only be run once"
      ],
      "correct": 1,
      "explanation": "Ethereum's Solidity is Turing-complete, allowing for complex applications.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch34-5",
      "question": "What is 'Slashing' in a Proof of Stake network?",
      "options": [
        "Reducing the price of tokens",
        "A penalty where a validator's staked tokens are taken away for malicious behavior or downtime",
        "Deleting old blocks to save space",
        "A type of network attack"
      ],
      "correct": 1,
      "explanation": "Slashing provides a financial disincentive for validators to act against the network's interests.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch34-6",
      "question": "What is 'Web3' often defined as, in contrast to Web2?",
      "options": [
        "The Web of AI",
        "The Read-Write-Own Web, focused on decentralization and user ownership",
        "The Faster Web",
        "The mobile-only Web"
      ],
      "correct": 1,
      "explanation": "Web3 aims to return control of data and value to the users.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch34-7",
      "question": "What is a 'Cold Wallet' (or Cold Storage)?",
      "options": [
        "A wallet kept in a refrigerator",
        "A crypto wallet that is not connected to the internet, providing higher security",
        "A wallet that hasn't been used in a long time",
        "A wallet with zero balance"
      ],
      "correct": 1,
      "explanation": "Hardware wallets and paper wallets are forms of cold storage.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch34-8",
      "question": "What is the 'Double Spend' problem?",
      "options": [
        "Spending twice as much money as you have",
        "The risk that a digital currency can be spent more than once",
        "Being charged twice for a single transaction",
        "A bug in a calculator app"
      ],
      "correct": 1,
      "explanation": "Blockchain's distributed consensus prevents double-spending without needing a central bank.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch34-9",
      "question": "What is 'Impermanent Loss' in DeFi?",
      "options": [
        "A loss that is only temporary",
        "A potential loss faced by liquidity providers due to the volatility of token prices in a pool",
        "Losing your password and then finding it later",
        "The cost of transaction fees"
      ],
      "correct": 1,
      "explanation": "It occurs when the price ratio of tokens in a liquidity pool changes compared to when they were deposited.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch34-10",
      "question": "What is 'IPFS'?",
      "options": [
        "Internet Protocol for Fast Servers",
        "InterPlanetary File System — a peer-to-peer network for storing and sharing data in a distributed file system",
        "A new version of IPv6",
        "A type of centralized cloud storage"
      ],
      "correct": 1,
      "explanation": "IPFS is frequently used in Web3 to store NFT metadata and website frontends.",
      "difficulty": "medium"
    }
  ]
};
