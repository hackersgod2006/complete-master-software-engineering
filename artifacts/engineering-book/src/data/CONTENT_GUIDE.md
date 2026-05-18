# Content Writing Guide for Subagents

## Format for each chapter file

```typescript
import type { Section } from '../types';

export const CH_N_SECTIONS: Section[] = [
  {
    id: "N-M",        // e.g. "1-9" for section 1.9
    number: "N.M",    // e.g. "1.9"
    title: "Section Title Here",
    content: `Full educational content here.

Use these formatting conventions in content strings:
- ## for major sub-headers within a section
- **bold** for key terms on first introduction
- \`inline code\` for short code references
- Triple backtick blocks for multi-line code (with language tag)
- | tables | like | this | for comparison tables
- - bullet lists
- --- for horizontal dividers between major topics

Content should be 300-700 words per section.
Include real code examples in Python, JavaScript, or pseudocode where relevant.
Escape backticks inside template literals with a backslash.
`
  },
];
```

## Quality bar

Each section should feel like the best university lecture you've ever attended:
- Open with WHY this matters — connect it to real engineering
- Explain the WHAT with precision and clarity
- Show the HOW with concrete code or examples
- End with the key insight to remember

Use real numbers (latency figures, complexity, benchmarks).
Reference real systems (Linux, PostgreSQL, V8, Redis, Python, Java).
Include the kind of insight a senior engineer would share — not just facts, but wisdom.
Never pad. Every sentence must earn its place.
