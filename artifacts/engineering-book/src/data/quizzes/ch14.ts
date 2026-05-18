import { ChapterQuizData } from "../quizTypes";

export const CH14_QUIZ: ChapterQuizData = {
  "chapterId": "ch14",
  "sectionQuizzes": {
    "14-1": [
      {
        "id": "q-14-1-1",
        "question": "What does OWASP stand for in the context of web security?",
        "options": [
          "Online Web Application Security Protocol",
          "Open Web Application Security Project",
          "Open World Authentication Security Program",
          "Organizational Web Access Security Policy"
        ],
        "correct": 1,
        "explanation": "OWASP (Open Web Application Security Project) is a non-profit foundation that works to improve the security of software.",
        "difficulty": "easy"
      },
      {
        "id": "q-14-1-2",
        "question": "Which of the following has consistently been a top threat in the OWASP Top 10?",
        "options": [
          "Lack of dark mode support",
          "Injection (e.g., SQL, NoSQL)",
          "Slow page load times",
          "Use of deprecated HTML tags"
        ],
        "correct": 1,
        "explanation": "Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query.",
        "difficulty": "easy"
      },
      {
        "id": "q-14-1-3",
        "question": "What is the primary goal of the OWASP Top 10 list?",
        "options": [
          "To provide a comprehensive list of all known vulnerabilities",
          "To rank the most critical web application security risks",
          "To define a mandatory legal standard for web developers",
          "To promote specific security software products"
        ],
        "correct": 1,
        "explanation": "The OWASP Top 10 serves as a standard awareness document for developers and web application security.",
        "difficulty": "medium"
      }
    ],
    "14-2": [
      {
        "id": "q-14-2-1",
        "question": "What is the main difference between Authentication and Authorization?",
        "options": [
          "Authentication is about who you are; Authorization is about what you can do",
          "Authorization is about who you are; Authentication is about what you can do",
          "Authentication is for users; Authorization is for machines",
          "There is no difference; the terms are interchangeable"
        ],
        "correct": 0,
        "explanation": "Authentication verifies identity, while Authorization determines access rights.",
        "difficulty": "easy"
      },
      {
        "id": "q-14-2-2",
        "question": "Which of these is an example of Multi-Factor Authentication (MFA)?",
        "options": [
          "Using two different passwords for the same account",
          "Using a password and a code sent via SMS or an authenticator app",
          "Logging in from two different devices at the same time",
          "Requiring the user to change their password every 30 days"
        ],
        "correct": 1,
        "explanation": "MFA requires two or more independent pieces of evidence (factors) to verify a user's identity.",
        "difficulty": "easy"
      },
      {
        "id": "q-14-2-3",
        "question": "What is 'Role-Based Access Control' (RBAC)?",
        "options": [
          "Giving every user the same level of access",
          "Assigning permissions to roles and then assigning users to those roles",
          "Hardcoding user permissions directly into the application code",
          "Allowing users to choose their own access levels"
        ],
        "correct": 1,
        "explanation": "RBAC simplifies permission management by grouping users with similar responsibilities into roles.",
        "difficulty": "medium"
      }
    ],
    "14-3": [
      {
        "id": "q-14-3-1",
        "question": "What is the difference between Symmetric and Asymmetric encryption?",
        "options": [
          "Symmetric uses one key for both; Asymmetric uses a public and a private key",
          "Asymmetric is faster than Symmetric",
          "Symmetric is only for data at rest; Asymmetric is only for data in transit",
          "Symmetric is more secure than Asymmetric"
        ],
        "correct": 0,
        "explanation": "Symmetric encryption uses a single shared key. Asymmetric encryption uses a key pair (public/private).",
        "difficulty": "medium"
      },
      {
        "id": "q-14-3-2",
        "question": "What is a 'Salt' in the context of password hashing?",
        "options": [
          "A special character required in passwords",
          "A random string added to a password before hashing to prevent rainbow table attacks",
          "An encryption key used to encrypt the entire database",
          "A method of compressing password data"
        ],
        "correct": 1,
        "explanation": "Salts ensure that identical passwords result in different hashes, protecting against precomputed dictionary attacks.",
        "difficulty": "medium"
      },
      {
        "id": "q-14-3-3",
        "question": "Why is 'Hashing' different from 'Encryption'?",
        "options": [
          "Hashing is two-way; Encryption is one-way",
          "Hashing is one-way; Encryption is two-way",
          "Hashing is only for files; Encryption is for strings",
          "Encryption is always faster than hashing"
        ],
        "correct": 1,
        "explanation": "Hashing is a one-way function used for integrity or password storage. Encryption is reversible (with a key) and used for confidentiality.",
        "difficulty": "medium"
      }
    ],
    "14-4": [
      {
        "id": "q-14-4-1",
        "question": "What is the primary role of TLS (Transport Layer Security)?",
        "options": [
          "To speed up website loading times",
          "To provide secure, encrypted communication over a computer network",
          "To block malicious IP addresses",
          "To manage user sessions on a server"
        ],
        "correct": 1,
        "explanation": "TLS ensures privacy and data integrity between two communicating applications (most commonly a browser and a server).",
        "difficulty": "easy"
      },
      {
        "id": "q-14-4-2",
        "question": "How does a client verify a server's identity in a TLS handshake?",
        "options": [
          "By checking the server's IP address",
          "By validating the server's Digital Certificate signed by a trusted Certificate Authority (CA)",
          "By sending a secret password to the server",
          "By asking the user to confirm the connection"
        ],
        "correct": 1,
        "explanation": "Certificates issued by trusted CAs are used to verify the authenticity of the server's public key.",
        "difficulty": "medium"
      },
      {
        "id": "q-14-4-3",
        "question": "What is 'Perfect Forward Secrecy' (PFS)?",
        "options": [
          "A guarantee that old session keys cannot be compromised even if the server's private key is stolen later",
          "A method for encrypting data forever",
          "A policy of never changing encryption keys",
          "An encryption algorithm that cannot be cracked by quantum computers"
        ],
        "correct": 0,
        "explanation": "PFS generates unique session keys for every session, so a future compromise of the main key doesn't expose past traffic.",
        "difficulty": "hard"
      }
    ],
    "14-5": [
      {
        "id": "q-14-5-1",
        "question": "What are the three parts of a JSON Web Token (JWT)?",
        "options": [
          "Header, Payload, Signature",
          "User, Pass, Role",
          "Key, Value, Expiry",
          "Id, Content, Hash"
        ],
        "correct": 0,
        "explanation": "A JWT consists of a header (algorithm), payload (claims), and a signature for verification.",
        "difficulty": "easy"
      },
      {
        "id": "q-14-5-2",
        "question": "Where should a JWT typically be stored in a web browser to minimize XSS risks?",
        "options": [
          "localStorage",
          "sessionStorage",
          "An HttpOnly, Secure cookie",
          "In a global JavaScript variable"
        ],
        "correct": 2,
        "explanation": "HttpOnly cookies cannot be accessed via JavaScript, making them resilient to Cross-Site Scripting (XSS) attacks.",
        "difficulty": "medium"
      },
      {
        "id": "q-14-5-3",
        "question": "What is a major disadvantage of using JWTs for session management?",
        "options": [
          "They are too small to carry user data",
          "They are difficult to revoke before they expire",
          "They can only be used with Node.js servers",
          "They require a constant database connection to verify"
        ],
        "correct": 1,
        "explanation": "Since JWTs are stateless, invalidating a specific token before its expiration usually requires a 'blacklist' or short-lived tokens with refresh mechanisms.",
        "difficulty": "hard"
      }
    ],
    "14-6": [
      {
        "id": "q-14-6-1",
        "question": "What is a SQL Injection attack?",
        "options": [
          "Injecting malicious JavaScript into a web page",
          "Inserting malicious SQL code into an input field to manipulate a database query",
          "Overloading a database with too many requests",
          "Stealing database backup files"
        ],
        "correct": 1,
        "explanation": "SQL injection occurs when user input is concatenated directly into SQL strings rather than using parameterized queries.",
        "difficulty": "easy"
      },
      {
        "id": "q-14-6-2",
        "question": "What is the most effective way to prevent SQL Injection?",
        "options": [
          "Using regular expressions to filter out 'SELECT' and 'DROP'",
          "Using Parameterized Queries (Prepared Statements)",
          "Restricting the length of input fields",
          "Encrypting the database connection"
        ],
        "correct": 1,
        "explanation": "Prepared statements ensure that user input is treated as data, not as executable code.",
        "difficulty": "easy"
      },
      {
        "id": "q-14-6-3",
        "question": "Which of these is an example of a 'Blind SQL Injection'?",
        "options": [
          "An attack where the database returns error messages that reveal the schema",
          "An attack where the attacker infers data by observing the server's response time or HTTP status codes",
          "An attack that uses a script to automatically try many passwords",
          "An attack that redirects the user to a fake login page"
        ],
        "correct": 1,
        "explanation": "Blind SQLi occurs when the application doesn't return data directly but its behavior changes based on the query's success.",
        "difficulty": "hard"
      }
    ],
    "14-7": [
      {
        "id": "q-14-7-1",
        "question": "What is Cross-Site Scripting (XSS)?",
        "options": [
          "Running malicious scripts on the server",
          "Injecting malicious scripts into web pages viewed by other users",
          "Forging a request from one site to another",
          "Intercepting network traffic"
        ],
        "correct": 1,
        "explanation": "XSS allows attackers to execute scripts in the victim's browser, potentially stealing cookies or session tokens.",
        "difficulty": "medium"
      },
      {
        "id": "q-14-7-2",
        "question": "What is 'Stored XSS'?",
        "options": [
          "When the malicious script is included in a URL and reflected back",
          "When the malicious script is permanently stored on the target server (e.g., in a database)",
          "When the script is executed by the browser's DOM",
          "When the script is stored in the attacker's local storage"
        ],
        "correct": 1,
        "explanation": "Stored XSS (or Persistent XSS) is particularly dangerous because it affects anyone who views the compromised page.",
        "difficulty": "medium"
      },
      {
        "id": "q-14-7-3",
        "question": "How can Content Security Policy (CSP) help prevent XSS?",
        "options": [
          "By encrypting all JavaScript code",
          "By defining which sources of content (scripts, styles, etc.) are trusted",
          "By automatically scanning for vulnerabilities in the code",
          "By requiring users to solve a CAPTCHA before running scripts"
        ],
        "correct": 1,
        "explanation": "CSP is a browser-level security layer that restricts where scripts can be loaded from and prevents inline script execution.",
        "difficulty": "hard"
      }
    ],
    "14-8": [
      {
        "id": "q-14-8-1",
        "question": "What is Cross-Site Request Forgery (CSRF)?",
        "options": [
          "Stealing a user's password using a fake website",
          "Tricking a user's browser into performing an unwanted action on a site where they are authenticated",
          "Injecting malicious code into a database",
          "Intercepting data sent over an unencrypted connection"
        ],
        "correct": 1,
        "explanation": "CSRF exploits the trust a site has in the user's browser by sending requests that the user didn't intend.",
        "difficulty": "medium"
      },
      {
        "id": "q-14-8-2",
        "question": "Which of these is a common defense against CSRF?",
        "options": [
          "Using complex passwords",
          "Implementing Anti-CSRF Tokens (Unique, unpredictable tokens for each session/request)",
          "Encrypting the user's session ID",
          "Using HTTPS for all pages"
        ],
        "correct": 1,
        "explanation": "Anti-CSRF tokens ensure that the request was intentionally initiated by the user from the application's own UI.",
        "difficulty": "medium"
      },
      {
        "id": "q-14-8-3",
        "question": "How does the 'SameSite' cookie attribute help prevent CSRF?",
        "options": [
          "By preventing the cookie from being sent with cross-site requests",
          "By ensuring the cookie is only sent over HTTPS",
          "By making the cookie inaccessible to JavaScript",
          "By requiring the cookie to be signed by the server"
        ],
        "correct": 0,
        "explanation": "SameSite=Lax or SameSite=Strict prevents browsers from sending cookies during cross-site POST requests, neutralizing many CSRF vectors.",
        "difficulty": "hard"
      }
    ],
    "14-9": [
      {
        "id": "q-14-9-1",
        "question": "What is the principle of 'Least Privilege'?",
        "options": [
          "Giving users only the minimum access levels they need to perform their jobs",
          "Allowing everyone to have administrator access to speed up development",
          "Ignoring security for internal-only applications",
          "Encrypting only the most sensitive data"
        ],
        "correct": 0,
        "explanation": "Least privilege reduces the 'blast radius' if an account is compromised.",
        "difficulty": "easy"
      },
      {
        "id": "q-14-9-2",
        "question": "What is 'Defense in Depth'?",
        "options": [
          "Using only one very strong security measure",
          "Layering multiple security controls to provide redundancy",
          "Focusing security efforts only on the database",
          "Encrypting data multiple times with the same key"
        ],
        "correct": 1,
        "explanation": "Defense in depth assumes that any single security measure can fail and provides multiple fallbacks.",
        "difficulty": "medium"
      },
      {
        "id": "q-14-9-3",
        "question": "What does 'Shift Left' mean in the context of Security?",
        "options": [
          "Moving security testing to the end of the development lifecycle",
          "Integrating security early and continuously in the software development process",
          "Hiring more security engineers to replace developers",
          "Using older, more established security protocols"
        ],
        "correct": 1,
        "explanation": "Shifting left aims to catch and fix security issues during design and development rather than after deployment.",
        "difficulty": "medium"
      }
    ],
    "14-10": [
      {
        "id": "q-14-10-1",
        "question": "What is a 'Rate Limiter' used for in security?",
        "options": [
          "To speed up database queries",
          "To prevent Brute Force and Denial of Service (DoS) attacks by limiting requests",
          "To compress network traffic",
          "To monitor the performance of the server"
        ],
        "correct": 1,
        "explanation": "Rate limiting protects against automated attacks like credential stuffing and DDoS.",
        "difficulty": "easy"
      },
      {
        "id": "q-14-10-2",
        "question": "Which header can be used to prevent a site from being embedded in an iframe (preventing Clickjacking)?",
        "options": [
          "X-Content-Type-Options",
          "X-Frame-Options",
          "Strict-Transport-Security",
          "Content-Encoding"
        ],
        "correct": 1,
        "explanation": "X-Frame-Options (or CSP frame-ancestors) prevents attackers from overlaying your site in an iframe to trick users.",
        "difficulty": "medium"
      },
      {
        "id": "q-14-10-3",
        "question": "What is 'Sanitization' in the context of web security?",
        "options": [
          "Deleting all user data once per year",
          "Cleaning user input to remove potentially harmful characters or code",
          "Formatting code according to a style guide",
          "Removing old logs from the server"
        ],
        "correct": 1,
        "explanation": "Sanitization ensures that data is safe to be used in HTML, SQL queries, or other sensitive contexts.",
        "difficulty": "easy"
      }
    ]
  },
  "examQuestions": [
    {
      "id": "exam-ch14-1",
      "question": "Which of these is the most secure way to store user passwords?",
      "options": [
        "Plain text in an encrypted database",
        "MD5 hash with a simple salt",
        "Salted and Pepped Hash using Argon2 or bcrypt",
        "Base64 encoded strings"
      ],
      "correct": 2,
      "explanation": "Modern algorithms like Argon2 or bcrypt are designed to be slow and resistant to hardware-accelerated cracking.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch14-2",
      "question": "In a JWT-based authentication system, what happens if the server's Secret Key is leaked?",
      "options": [
        "Existing tokens remain valid until they expire",
        "An attacker can forge valid tokens for any user",
        "The server will stop accepting all tokens",
        "Nothing, since tokens are stored on the client"
      ],
      "correct": 1,
      "explanation": "The Secret Key is used to sign tokens; if leaked, anyone can create 'signed' tokens that the server will trust.",
      "difficulty": "hard"
    },
    {
      "id": "exam-ch14-3",
      "question": "Which OWASP risk category covers issues like using 'admin/admin' for a production system?",
      "options": [
        "Injection",
        "Broken Access Control",
        "Identification and Authentication Failures",
        "Security Misconfiguration"
      ],
      "correct": 3,
      "explanation": "Security Misconfiguration includes default accounts/passwords, unnecessary features enabled, and overly verbose error messages.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch14-4",
      "question": "What is the primary defense against Cross-Site Request Forgery (CSRF)?",
      "options": [
        "Input Validation",
        "Anti-CSRF Tokens",
        "Using TLS/SSL",
        "Password Hashing"
      ],
      "correct": 1,
      "explanation": "Anti-CSRF tokens prove that a request originated from within the application's trusted UI.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch14-5",
      "question": "Which of these provides 'Confidentiality' in a network connection?",
      "options": [
        "Checksums",
        "Encryption",
        "Digital Signatures",
        "Firewalls"
      ],
      "correct": 1,
      "explanation": "Encryption ensures that only authorized parties can read the data.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch14-6",
      "question": "What is 'Insecure Direct Object Reference' (IDOR)?",
      "options": [
        "A type of SQL injection",
        "Accessing a resource (like /api/user/123) by simply changing the ID, when you shouldn't have access",
        "Using an old version of a library",
        "Sharing your password with another user"
      ],
      "correct": 1,
      "explanation": "IDOR is a sub-type of Broken Access Control where an application provides direct access to objects based on user-supplied input.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch14-7",
      "question": "What does the 'HttpOnly' flag on a cookie do?",
      "options": [
        "Ensures the cookie is only sent over HTTPS",
        "Prevents JavaScript from accessing the cookie",
        "Makes the cookie expire when the browser closes",
        "Restricts the cookie to a specific domain"
      ],
      "correct": 1,
      "explanation": "HttpOnly is a critical defense against XSS-based session theft.",
      "difficulty": "medium"
    },
    {
      "id": "exam-ch14-8",
      "question": "Which attack involves an attacker positioning themselves between a user and a server to intercept or modify traffic?",
      "options": [
        "DDoS",
        "Man-in-the-Middle (MitM)",
        "XSS",
        "SQLi"
      ],
      "correct": 1,
      "explanation": "MitM attacks exploit unencrypted or poorly verified connections to spy on or alter communications.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch14-9",
      "question": "What is 'Input Validation'?",
      "options": [
        "Checking that data supplied by a user matches the expected format, type, and length",
        "Automatically correcting errors in user input",
        "Encrypting user input before saving it",
        "Displaying user input back to them for confirmation"
      ],
      "correct": 0,
      "explanation": "Validation is the first line of defense against many types of injection and logic errors.",
      "difficulty": "easy"
    },
    {
      "id": "exam-ch14-10",
      "question": "What is the purpose of 'HSTS' (HTTP Strict Transport Security)?",
      "options": [
        "To speed up HTTPS connections",
        "To force browsers to only communicate with a server over HTTPS",
        "To provide a list of trusted SSL certificates",
        "To encrypt data at the application layer"
      ],
      "correct": 1,
      "explanation": "HSTS prevents SSL-stripping attacks by telling the browser to never use HTTP for the site.",
      "difficulty": "hard"
    }
  ]
};
