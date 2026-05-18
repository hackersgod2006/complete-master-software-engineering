import type { Chapter, Section } from './types';
export type { Chapter, Section };

// Volume I
import { CH01_ORIGINAL_SECTIONS } from './vol1/ch01_original';
import { CH01_EXTRA_SECTIONS } from './vol1/ch01_extra';
import { CH02_ORIGINAL_SECTIONS } from './vol1/ch02_original';
import { CH02_SECTIONS } from './vol1/ch02';
import { CH03_SECTIONS } from './vol1/ch03';
import { CH04_SECTIONS } from './vol1/ch04';
import { CH05_SECTIONS } from './vol1/ch05';
import { CH06_SECTIONS } from './vol1/ch06';
import { CH07_SECTIONS } from './vol1/ch07';
import { CH08_SECTIONS } from './vol1/ch08';

// Volume II
import { CH09_SECTIONS } from './vol2/ch09';
import { CH10_SECTIONS } from './vol2/ch10';
import { CH11_SECTIONS } from './vol2/ch11';
import { CH12_SECTIONS } from './vol2/ch12';
import { CH13_SECTIONS } from './vol2/ch13';
import { CH14_SECTIONS } from './vol2/ch14';

// Volume III
import { CH15_SECTIONS } from './vol3/ch15';
import { CH16_SECTIONS } from './vol3/ch16';
import { CH17_SECTIONS } from './vol3/ch17';
import { CH18_SECTIONS } from './vol3/ch18';

// Volume IV
import { CH19_SECTIONS } from './vol4/ch19';
import { CH20_SECTIONS } from './vol4/ch20';
import { CH21_SECTIONS } from './vol4/ch21';
import { CH22_SECTIONS } from './vol4/ch22';
import { CH23_SECTIONS } from './vol4/ch23';
import { CH24_SECTIONS } from './vol4/ch24';

// Volume V
import { CH25_SECTIONS } from './vol5/ch25';
import { CH26_SECTIONS } from './vol5/ch26';
import { CH27_SECTIONS } from './vol5/ch27';
import { CH28_SECTIONS } from './vol5/ch28';
import { CH29_SECTIONS } from './vol5/ch29';
import { CH30_SECTIONS } from './vol5/ch30';
import { CH31_SECTIONS } from './vol5/ch31';

// Volume VI
import { CH32_SECTIONS } from './vol6/ch32';
import { CH33_SECTIONS } from './vol6/ch33';
import { CH34_SECTIONS } from './vol6/ch34';
import { CH35_SECTIONS } from './vol6/ch35';
import { CH36_SECTIONS } from './vol6/ch36';
import { CH37_SECTIONS } from './vol6/ch37';

function sortSections(sections: Section[]): Section[] {
  return [...sections].sort((a, b) => {
    const aSec = parseFloat(a.number);
    const bSec = parseFloat(b.number);
    return aSec - bSec;
  });
}

export const CHAPTERS: Chapter[] = [
  // ── VOLUME I ─────────────────────────────────────────
  {
    id: 'ch1',
    number: 1,
    title: 'The Physical Machine',
    volume: 'Volume I',
    volumeNumber: 1,
    volumeSubtitle: 'Foundations',
    surpassing: 'CLRS · SICP · Code: The Hidden Language · Computer Systems: A Programmer\'s Perspective',
    intro: 'Everything your code does ultimately happens in hardware. This chapter traces the path from a single transistor — a tiny electronic switch — all the way to a 64-core processor executing billions of instructions per second. Understanding this machinery gives you superpowers: you can reason about why your code is fast or slow, why concurrency is hard, and why certain classes of bugs exist at all.',
    sections: sortSections([...CH01_ORIGINAL_SECTIONS, ...CH01_EXTRA_SECTIONS]),
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Number Systems and Data Representation',
    volume: 'Volume I',
    volumeNumber: 1,
    volumeSubtitle: 'Foundations',
    surpassing: 'CLRS · SICP · Code: The Hidden Language',
    intro: 'The Ariane 5 rocket ($370M payload) exploded because of an integer overflow. Heartbleed leaked private keys from half the internet due to a buffer length miscalculation. Number representation is not abstract — it is the source of real, expensive, dangerous bugs. This chapter gives you complete mastery: binary, two\'s complement, IEEE 754 floating point, Unicode, and endianness.',
    sections: sortSections([...CH02_ORIGINAL_SECTIONS, ...CH02_SECTIONS]),
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Memory — The Complete Picture',
    volume: 'Volume I',
    volumeNumber: 1,
    volumeSubtitle: 'Foundations',
    surpassing: 'Computer Systems: A Programmer\'s Perspective · The Garbage Collection Handbook',
    intro: 'Memory is simultaneously the most important and most misunderstood resource in computing. This chapter builds a complete mental model: virtual memory, page tables, the stack and heap, malloc internals, and every major garbage collection algorithm from reference counting to ZGC\'s sub-millisecond pauses.',
    sections: CH03_SECTIONS,
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Operating Systems',
    volume: 'Volume I',
    volumeNumber: 1,
    volumeSubtitle: 'Foundations',
    surpassing: 'Operating Systems: Three Easy Pieces · Advanced Programming in the UNIX Environment',
    intro: 'The operating system is the contract between your code and the physical machine. Every file open, every thread spawn, every network connection goes through the OS. This chapter covers processes, threads, scheduling, synchronization, the system call interface, and file systems — with deep dives into Linux internals.',
    sections: CH04_SECTIONS,
  },
  {
    id: 'ch5',
    number: 5,
    title: 'Data Structures — Theory to Mastery',
    volume: 'Volume I',
    volumeNumber: 1,
    volumeSubtitle: 'Foundations',
    surpassing: 'CLRS · The Algorithm Design Manual · Purely Functional Data Structures',
    intro: 'Data structures are the vocabulary of efficient algorithms. This chapter covers every major data structure from arrays and hash tables to HyperLogLog and spatial indexes — with full treatment of internals, trade-offs, and real-world usage. After this chapter, you will know not just how to use each structure, but when to choose it and why.',
    sections: CH05_SECTIONS,
  },
  {
    id: 'ch6',
    number: 6,
    title: 'Algorithms — From Intuition to Proof',
    volume: 'Volume I',
    volumeNumber: 1,
    volumeSubtitle: 'Foundations',
    surpassing: 'CLRS · The Algorithm Design Manual · Programming Pearls',
    intro: 'Algorithms are the science of solving problems efficiently. This chapter goes beyond memorizing Big-O notation — it teaches you to think algorithmically: to see structure in problems, to recognize which paradigm applies, and to prove your solutions correct.',
    sections: CH06_SECTIONS,
  },
  {
    id: 'ch7',
    number: 7,
    title: 'Compilers and Language Runtimes',
    volume: 'Volume I',
    volumeNumber: 1,
    volumeSubtitle: 'Foundations',
    surpassing: 'Engineering a Compiler · Crafting Interpreters · Programming Language Pragmatics',
    intro: 'Your code does not run. A transformed version of it does. This chapter explains that transformation: from source characters to tokens, to an AST, to IR, to optimized machine code — and then dives into the runtimes: CPython\'s bytecode VM, the JVM\'s tiered JIT, V8\'s hidden classes, and Rust\'s zero-cost abstractions.',
    sections: CH07_SECTIONS,
  },
  {
    id: 'ch8',
    number: 8,
    title: 'Computation Theory',
    volume: 'Volume I',
    volumeNumber: 1,
    volumeSubtitle: 'Foundations',
    surpassing: 'Introduction to the Theory of Computation · Sipser · Computational Complexity',
    intro: 'Computation theory answers the deepest questions about what computers can and cannot do. This chapter covers finite automata, Turing machines, the halting problem, and the P vs NP question — and explains how these theoretical results shape real engineering decisions in cryptography, parsing, and verification.',
    sections: CH08_SECTIONS,
  },

  // ── VOLUME II ────────────────────────────────────────
  {
    id: 'ch9',
    number: 9,
    title: 'The Anatomy of Excellent Code',
    volume: 'Volume II',
    volumeNumber: 2,
    volumeSubtitle: 'The Craft of Code',
    surpassing: 'Clean Code · A Philosophy of Software Design · The Pragmatic Programmer · Code Complete',
    intro: 'Writing code that works is easy. Writing code that is clear, maintainable, and a joy to read is a craft that takes years to develop — unless you learn its principles explicitly. This chapter covers the cognitive science of code readability, naming, function design, comments, and the complete catalog of code smells.',
    sections: CH09_SECTIONS,
  },
  {
    id: 'ch10',
    number: 10,
    title: 'Error Handling — The Architecture of Failure',
    volume: 'Volume II',
    volumeNumber: 2,
    volumeSubtitle: 'The Craft of Code',
    surpassing: 'Clean Code · Release It! · The Pragmatic Programmer',
    intro: 'How a system fails is as important as how it succeeds. Therac-25 killed people because errors were silently swallowed. Knight Capital lost $440M because an error handling path was never triggered. This chapter gives you a complete framework: exception vs error value vs Result types, writing actionable error messages, and structured logging.',
    sections: CH10_SECTIONS,
  },
  {
    id: 'ch11',
    number: 11,
    title: 'Testing — The Science of Confidence',
    volume: 'Volume II',
    volumeNumber: 2,
    volumeSubtitle: 'The Craft of Code',
    surpassing: 'Test-Driven Development by Example · Growing Object-Oriented Software · xUnit Test Patterns',
    intro: 'Tests are not just a way to find bugs — they are a design tool, a safety net, a specification, and the foundation of refactoring. This chapter covers the complete testing landscape: unit tests, TDD, BDD, property-based testing, mutation testing, fuzz testing, and chaos engineering.',
    sections: CH11_SECTIONS,
  },
  {
    id: 'ch12',
    number: 12,
    title: 'Refactoring — The Ongoing Art of Improvement',
    volume: 'Volume II',
    volumeNumber: 2,
    volumeSubtitle: 'The Craft of Code',
    surpassing: 'Refactoring: Improving the Design of Existing Code · Tidy First? · Working Effectively with Legacy Code',
    intro: 'Code is never finished — it evolves. Refactoring is the discipline of improving code\'s internal structure without changing its behavior. This chapter covers Fowler\'s complete catalog of refactoring techniques, database schema evolution, and large-scale refactoring with the Strangler Fig pattern.',
    sections: CH12_SECTIONS,
  },
  {
    id: 'ch13',
    number: 13,
    title: 'Working With Legacy Code',
    volume: 'Volume II',
    volumeNumber: 2,
    volumeSubtitle: 'The Craft of Code',
    surpassing: 'Working Effectively with Legacy Code · Software Design X-Rays',
    intro: 'Most software engineering is not greenfield development — it is working with existing, often messy, often untested code. This chapter gives you a systematic toolkit: finding seams for testing, breaking dependencies safely, using characterization tests, and incrementally replacing systems without the big-bang rewrite.',
    sections: CH13_SECTIONS,
  },
  {
    id: 'ch14',
    number: 14,
    title: 'Performance Engineering — The Science of Making Code Fast',
    volume: 'Volume II',
    volumeNumber: 2,
    volumeSubtitle: 'The Craft of Code',
    surpassing: 'Systems Performance · BPF Performance Tools · Every Computer Performance Book',
    intro: 'Performance engineering begins with a rule: measure first, always. This chapter teaches the complete discipline: profiling tools, flame graphs, benchmarking methodology, CPU and memory performance, database query optimization, I/O tuning, and serialization — with a real case study of cutting API latency from 500ms to 12ms.',
    sections: CH14_SECTIONS,
  },

  // ── VOLUME III ───────────────────────────────────────
  {
    id: 'ch15',
    number: 15,
    title: 'The Principles of Software Design',
    volume: 'Volume III',
    volumeNumber: 3,
    volumeSubtitle: 'Architecture and Design',
    surpassing: 'A Philosophy of Software Design · Clean Architecture · Tidy First?',
    intro: 'Software design is the art of managing complexity. This chapter covers the foundational principles that guide all good design: information hiding, deep vs shallow modules, the SOLID principles, DRY, YAGNI, coupling and cohesion, the Law of Demeter, and composition over inheritance — explained with the clarity they deserve.',
    sections: CH15_SECTIONS,
  },
  {
    id: 'ch16',
    number: 16,
    title: 'Design Patterns — The Complete Catalog',
    volume: 'Volume III',
    volumeNumber: 3,
    volumeSubtitle: 'Architecture and Design',
    surpassing: 'Design Patterns (GoF) · Head First Design Patterns · Patterns of Enterprise Application Architecture',
    intro: 'Design patterns are proven solutions to recurring design problems. This chapter covers every pattern from the Gang of Four catalog plus enterprise patterns like CQRS and Event Sourcing, and a complete guide to recognizing and escaping anti-patterns. Each pattern includes a real implementation and analysis of when not to use it.',
    sections: CH16_SECTIONS,
  },
  {
    id: 'ch17',
    number: 17,
    title: 'Software Architecture — Decisions That Age Well',
    volume: 'Volume III',
    volumeNumber: 3,
    volumeSubtitle: 'Architecture and Design',
    surpassing: 'Fundamentals of Software Architecture · Building Evolutionary Architectures · Clean Architecture',
    intro: 'Architecture is the set of decisions that are hard to change. This chapter covers architectural styles from modular monolith to microservices to event-driven, with honest trade-off analysis, Architecture Decision Records, Conway\'s Law, and case studies of Amazon, Shopify, and Netflix.',
    sections: CH17_SECTIONS,
  },
  {
    id: 'ch18',
    number: 18,
    title: 'Domain-Driven Design — The Complete Treatment',
    volume: 'Volume III',
    volumeNumber: 3,
    volumeSubtitle: 'Architecture and Design',
    surpassing: 'Domain-Driven Design (Evans) · Implementing Domain-Driven Design · Learning Domain-Driven Design',
    intro: 'Domain-Driven Design aligns code structure with business reality. This chapter covers the complete DDD toolkit: ubiquitous language, bounded contexts, aggregates, domain events, repositories, hexagonal architecture, and Event Storming for collaborative domain discovery.',
    sections: CH18_SECTIONS,
  },

  // ── VOLUME IV ────────────────────────────────────────
  {
    id: 'ch19',
    number: 19,
    title: 'System Design Mastery',
    volume: 'Volume IV',
    volumeNumber: 4,
    volumeSubtitle: 'Distributed Systems and Scale',
    surpassing: 'System Design Interview · Designing Data-Intensive Applications · Building Microservices',
    intro: 'System design is the skill of architecting solutions for scale — millions of users, petabytes of data, five-nines availability. This chapter gives you a complete framework and eight detailed case studies: URL shorteners, Twitter, YouTube, Uber, WhatsApp, web crawlers, notification systems, and autocomplete.',
    sections: CH19_SECTIONS,
  },
  {
    id: 'ch20',
    number: 20,
    title: 'Databases — The Complete Engineering Guide',
    volume: 'Volume IV',
    volumeNumber: 4,
    volumeSubtitle: 'Distributed Systems and Scale',
    surpassing: 'Designing Data-Intensive Applications · Database Internals · Use The Index Luke',
    intro: 'Databases are the most critical infrastructure component in most systems. This chapter gives you complete mastery: ACID, transaction isolation, MVCC, B-tree indexes, query planning, PostgreSQL and MySQL internals, LSM trees, and every major NoSQL database — with Instagram\'s sharding strategy and Slack\'s architecture as case studies.',
    sections: CH20_SECTIONS,
  },
  {
    id: 'ch21',
    number: 21,
    title: 'Distributed Systems — Theory and Practice',
    volume: 'Volume IV',
    volumeNumber: 4,
    volumeSubtitle: 'Distributed Systems and Scale',
    surpassing: 'Designing Data-Intensive Applications · Distributed Systems: Principles and Paradigms',
    intro: 'Distribution introduces fundamental problems that cannot be solved — only managed. This chapter covers CAP and PACELC, consistency models, Paxos and Raft consensus, CRDTs, consistent hashing, and replication strategies — with DynamoDB, Google Spanner, and the 2013 GitHub split-brain outage as case studies.',
    sections: CH21_SECTIONS,
  },
  {
    id: 'ch22',
    number: 22,
    title: 'Resilience Engineering',
    volume: 'Volume IV',
    volumeNumber: 4,
    volumeSubtitle: 'Distributed Systems and Scale',
    surpassing: 'Release It! · Site Reliability Engineering · The Site Reliability Workbook',
    intro: 'Failure is not exceptional — it is the normal operating condition of large systems. This chapter covers timeouts, retries with jitter, circuit breakers, bulkheads, load shedding, SLOs, error budgets, and chaos engineering — with case studies from Amazon, Cloudflare, and Facebook.',
    sections: CH22_SECTIONS,
  },
  {
    id: 'ch23',
    number: 23,
    title: 'Caching — The Complete Engineering Guide',
    volume: 'Volume IV',
    volumeNumber: 4,
    volumeSubtitle: 'Distributed Systems and Scale',
    surpassing: 'Designing Data-Intensive Applications · Systems Performance',
    intro: 'Caching is the highest-ROI performance investment in most systems. A well-placed cache can reduce database load by 99% and cut latency from 100ms to 1ms. This chapter covers every caching layer, every strategy, and every failure mode — with Facebook\'s Memcached architecture as the definitive case study.',
    sections: CH23_SECTIONS,
  },
  {
    id: 'ch24',
    number: 24,
    title: 'Messaging and Streaming',
    volume: 'Volume IV',
    volumeNumber: 4,
    volumeSubtitle: 'Distributed Systems and Scale',
    surpassing: 'Designing Data-Intensive Applications · Kafka: The Definitive Guide',
    intro: 'Asynchronous messaging decouples systems in time and enables architectures that absorb unpredictable load. This chapter covers Kafka\'s complete architecture, RabbitMQ\'s AMQP model, Event Sourcing, CQRS, and the Outbox pattern — with LinkedIn\'s Kafka origin story and Uber\'s real-time processing as anchoring case studies.',
    sections: CH24_SECTIONS,
  },

  // ── VOLUME V ─────────────────────────────────────────
  {
    id: 'ch25',
    number: 25,
    title: 'Engineering Culture — The Foundation of Performance',
    volume: 'Volume V',
    volumeNumber: 5,
    volumeSubtitle: 'Teams, Culture, and Leadership',
    surpassing: 'Peopleware · Software Engineering at Google · An Elegant Puzzle · The Manager\'s Path',
    intro: 'Culture is the primary predictor of engineering team performance. Google\'s Project Aristotle found that psychological safety matters more than individual talent. The Westrum model shows generative cultures outperform pathological ones on every metric. This chapter teaches what engineering culture is, how it forms, and how to change it.',
    sections: CH25_SECTIONS,
  },
  {
    id: 'ch26',
    number: 26,
    title: 'The Blameless Postmortem',
    volume: 'Volume V',
    volumeNumber: 5,
    volumeSubtitle: 'Teams, Culture, and Leadership',
    surpassing: 'Site Reliability Engineering · The Checklist Manifesto · Normal Accidents',
    intro: 'When systems fail — and they will — the organization\'s response determines whether it learns and improves or stagnates. The blameless postmortem is the most powerful organizational learning tool in engineering. This chapter gives you a complete guide, with GitLab\'s database deletion postmortem as the gold standard case study.',
    sections: CH26_SECTIONS,
  },
  {
    id: 'ch27',
    number: 27,
    title: 'Technical Debt — A Complete Management System',
    volume: 'Volume V',
    volumeNumber: 5,
    volumeSubtitle: 'Teams, Culture, and Leadership',
    surpassing: 'Tidy First? · A Philosophy of Software Design · Software Design X-Rays',
    intro: 'Technical debt is not a failure — it is a financial decision. The problem is when debt accumulates invisibly and the interest becomes crushing. This chapter gives you a complete management system: the debt quadrant, the debt register, how to measure interest, and how to communicate debt to stakeholders who control the budget.',
    sections: CH27_SECTIONS,
  },
  {
    id: 'ch28',
    number: 28,
    title: 'Engineering Metrics That Actually Work',
    volume: 'Volume V',
    volumeNumber: 5,
    volumeSubtitle: 'Teams, Culture, and Leadership',
    surpassing: 'Accelerate · Software Engineering at Google · An Elegant Puzzle',
    intro: 'Most engineering metrics are either wrong or counterproductive. The Accelerate research program gave us something better: the DORA metrics — four measures validated by research across 31,000 engineers. This chapter covers DORA, the SPACE framework, code quality metrics, and how to build a meaningful engineering dashboard.',
    sections: CH28_SECTIONS,
  },
  {
    id: 'ch29',
    number: 29,
    title: 'Software Requirements — Getting It Right Before You Build',
    volume: 'Volume V',
    volumeNumber: 5,
    volumeSubtitle: 'Teams, Culture, and Leadership',
    surpassing: 'Software Requirements · User Story Mapping · Discovering Requirements',
    intro: 'The most expensive bugs are not in code — they are in requirements. Building the wrong system is worse than building the right system poorly, because you can fix bad code, but you cannot recover the time spent building something nobody needed. This chapter covers requirements elicitation, acceptance criteria, and the Healthcare.gov failure as a $2B lesson.',
    sections: CH29_SECTIONS,
  },
  {
    id: 'ch30',
    number: 30,
    title: 'Project Management for Engineers',
    volume: 'Volume V',
    volumeNumber: 5,
    volumeSubtitle: 'Teams, Culture, and Leadership',
    surpassing: 'The Mythical Man-Month · Rapid Development · The Deadline · Making Software',
    intro: 'Every engineer eventually ships late, runs over budget, or inherits a failing project. Understanding project management is not optional for senior engineers — it is the difference between being effective and being frustrated. This chapter covers estimation, Brooks\' Law, Scrum vs Kanban vs Shape Up, and the Denver Airport baggage system ($2B lesson).',
    sections: CH30_SECTIONS,
  },
  {
    id: 'ch31',
    number: 31,
    title: 'The Engineering Career — From First Job to Principal',
    volume: 'Volume V',
    volumeNumber: 5,
    volumeSubtitle: 'Teams, Culture, and Leadership',
    surpassing: 'The Staff Engineer\'s Path · An Elegant Puzzle · The Manager\'s Path · Staff Engineer',
    intro: 'Engineering careers have changed. The IC track now goes as high as Distinguished Engineer and Fellow — roles that shape technical direction for thousands of engineers. This chapter gives you a complete map: what each level actually expects, how to make the Senior→Staff transition, the four Staff archetypes, and how to build the reputation that gets you there.',
    sections: CH31_SECTIONS,
  },

  // ── VOLUME VI ────────────────────────────────────────
  {
    id: 'ch32',
    number: 32,
    title: 'Security Engineering — Building Systems That Resist Attack',
    volume: 'Volume VI',
    volumeNumber: 6,
    volumeSubtitle: "The Master's Path",
    surpassing: 'The Web Application Hacker\'s Handbook · The Security Engineering Book · Hacking: The Art of Exploitation',
    intro: 'Security is not a feature — it is a property of a system. Engineers who add security at the end build systems that are fundamentally insecure. This chapter gives you the attacker\'s mindset, the complete OWASP Top 10 with working exploits and fixes, cryptography, TLS, and modern threats: SolarWinds and Log4Shell.',
    sections: CH32_SECTIONS,
  },
  {
    id: 'ch33',
    number: 33,
    title: 'CI/CD and DevOps — The Engineering of Deployment',
    volume: 'Volume VI',
    volumeNumber: 6,
    volumeSubtitle: "The Master's Path",
    surpassing: 'Continuous Delivery · The Phoenix Project · Accelerate · The DevOps Handbook',
    intro: 'Amazon deploys to production every 11.6 seconds. This is the result of a complete CI/CD discipline that makes deployment so safe and routine that it stops being an event. This chapter covers CI pipelines, trunk-based development, feature flags, Kubernetes architecture, GitOps, and zero-downtime deployment strategies.',
    sections: CH33_SECTIONS,
  },
  {
    id: 'ch34',
    number: 34,
    title: 'Observability — Seeing Inside Your System',
    volume: 'Volume VI',
    volumeNumber: 6,
    volumeSubtitle: "The Master's Path",
    surpassing: 'Observability Engineering · Site Reliability Engineering · Systems Performance',
    intro: 'You cannot fix what you cannot see. Observability is the discipline of making system behavior legible — building the ability to ask arbitrary questions about system state without deploying new code. This chapter covers the three pillars (metrics, logs, traces), the four golden signals, Prometheus, Grafana, and OpenTelemetry.',
    sections: CH34_SECTIONS,
  },
  {
    id: 'ch35',
    number: 35,
    title: 'The Complete Cloud Engineering Guide',
    volume: 'Volume VI',
    volumeNumber: 6,
    volumeSubtitle: "The Master's Path",
    surpassing: 'AWS in Action · Cloud Native Patterns · The Cloud Architecture Patterns Book',
    intro: 'Understanding the cloud at engineering depth — not as a checkbox of managed services, but as a set of trade-offs with real costs and constraints — is essential for senior engineers. This chapter covers the AWS Well-Architected Framework, compute and storage trade-offs, cloud cost engineering, IAM security, and Airbnb\'s cloud evolution.',
    sections: CH35_SECTIONS,
  },
  {
    id: 'ch36',
    number: 36,
    title: 'Machine Learning Systems Engineering',
    volume: 'Volume VI',
    volumeNumber: 6,
    volumeSubtitle: "The Master's Path",
    surpassing: 'Designing Machine Learning Systems · Machine Learning Engineering · Reliable Machine Learning',
    intro: 'ML systems fail in ways that traditional software does not: silently, gradually, and statistically. This chapter covers the full ML system stack — data engineering, feature stores, model training, serving, MLOps, A/B testing, and LLM engineering — with Spotify\'s recommendation system as the anchoring case study.',
    sections: CH36_SECTIONS,
  },
  {
    id: 'ch37',
    number: 37,
    title: 'The Mastery Principles — Operating at the Frontier',
    volume: 'Volume VI',
    volumeNumber: 6,
    volumeSubtitle: "The Master's Path",
    surpassing: 'The Staff Engineer\'s Path · An Elegant Puzzle · A Philosophy of Software Design',
    intro: 'This final chapter is about operating at the highest levels of the craft — where technical decisions shape organizations, where influence matters more than authority, and where the ten-year horizon matters as much as next sprint. It covers principal engineer thinking, technical strategy, the art of trade-offs, and what mastery looks like and how to pursue it deliberately.',
    sections: CH37_SECTIONS,
  },
];

export const ALL_SECTIONS = CHAPTERS.flatMap(ch =>
  ch.sections.map(s => ({ ...s, chapterId: ch.id, chapterNumber: ch.number }))
);

export const TOTAL_SECTIONS = ALL_SECTIONS.length;
export const PLANNED_TOTAL_SECTIONS = 739;

export function getSectionProgress(chapterId: string, sectionId: string): number {
  let count = 0;
  for (const ch of CHAPTERS) {
    for (const s of ch.sections) {
      if (ch.id === chapterId && s.id === sectionId) return count;
      count++;
    }
  }
  return count;
}

export function getNextSection(chapterId: string, sectionId: string): { chapter: Chapter; section: Section } | null {
  let found = false;
  for (const ch of CHAPTERS) {
    for (const s of ch.sections) {
      if (found) return { chapter: ch, section: s };
      if (ch.id === chapterId && s.id === sectionId) found = true;
    }
  }
  return null;
}

export function getPrevSection(chapterId: string, sectionId: string): { chapter: Chapter; section: Section } | null {
  let prev: { chapter: Chapter; section: Section } | null = null;
  for (const ch of CHAPTERS) {
    for (const s of ch.sections) {
      if (ch.id === chapterId && s.id === sectionId) return prev;
      prev = { chapter: ch, section: s };
    }
  }
  return null;
}
