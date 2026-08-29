---
title: "Building ML-KEM-1024: A Post-Quantum Cryptography FYP"
date: "2026-08-29"
excerpt: "A final-year hardware design project built around one question: what happens to today's encrypted data once quantum computers arrive?"
tags: ["post-quantum-cryptography", "cybersecurity", "hardware-security", "ML-KEM", "Kyber", "FYP"]
type: "blog"
---

Every piece of data encrypted today with RSA or ECC carries an expiration date nobody can see yet. It's not that these algorithms are weak now. It's that a sufficiently powerful quantum computer will eventually be able to break them, and adversaries know it. That's the premise behind a strategy called "harvest now, decrypt later": intercept and store encrypted traffic today, then decrypt it once the hardware catches up. For anything meant to stay confidential for years, that threat is already active.

This project is a final-year engineering effort to build ML-KEM-1024, the highest-security variant of the algorithm NIST selected as its primary post-quantum key encapsulation standard, from the ground up, with a hardware implementation as the end goal.

![Encrypted data at rest: today's cryptographic protections carry a quietly ticking expiration date](/public/blog/security-lock-hero.png)

**Key takeaways**
- "Harvest now, decrypt later" makes post-quantum migration an active problem, not a future one
- ML-KEM (Kyber) was named NIST's primary Key Encapsulation Mechanism standard in August 2024
- ML-KEM-1024 sits in NIST Security Category 5, the highest tier defined in the standard
- The project's direction shifted from a pure software build to a hardware-level implementation
- Industry collaboration was pursued but not secured, so the project is being built independently to the same standard

## Why This Problem Matters

Quantum computers capable of breaking RSA or ECC at scale don't exist yet. But the data being encrypted today doesn't need them to exist yet, it just needs them to exist eventually. Financial records, medical data, government communications and long-lived intellectual property are all being encrypted right now with algorithms that have a known theoretical break point. An adversary patient enough to store that traffic today only needs to wait.

That's the gap post-quantum cryptography is built to close: replacing the mathematical hard problems that quantum algorithms can solve efficiently with ones they can't.

![The quantum threat to classical encryption: as quantum computing power grows, today's cryptographic locks become tomorrow's open doors](./public/blog/quantum-threat-encryption.png)

## Choosing a Direction: Security as the Foundation

Going into final year, the goal was to build something genuinely new to the university's project history rather than a variation on a familiar theme. The direction came from a professor guiding hardware design coursework since fourth semester, who framed the brief simply: build something related to security.

That single instruction led into research on where cryptography is actually heading, and from there into the NIST Post-Quantum Cryptography standardization effort.

## Why ML-KEM (Kyber)

NIST finalized its Post-Quantum Cryptography standards in August 2024, and ML-KEM was named the primary standard for Key Encapsulation Mechanisms, the algorithm responsible for securely establishing shared keys between two parties. That result mattered for one reason: it's not a research candidate anymore. It's what the industry is actively adopting, which made it the algorithm worth building a project around.

## Choosing the 1024 Variant

ML-KEM is defined across three parameter sets, each trading performance for a different security margin.

| Variant | NIST Security Category | Comparable Classical Strength |
|---|---|---|
| ML-KEM-512 | Category 1 | AES-128 |
| ML-KEM-768 | Category 3 | AES-192 |
| ML-KEM-1024 | Category 5 | AES-256 |

ML-KEM-1024 was chosen deliberately. Category 5 is the highest security tier the standard defines, and the goal was to build toward that ceiling rather than a lighter, faster variant that would have been simpler to implement.

## From Algorithm to Hardware: Where the Project Stands

The research and algorithm-level understanding of ML-KEM-1024 is complete. The current phase is hardware implementation: moving the algorithm out of pure software simulation and into a design that reflects real deployment constraints, power, timing and silicon area among them, rather than treating those as an afterthought layered on top of a working software model.

## The Industry Collaboration That Didn't Happen

Part of the original plan was to connect this project with a company, so the design would be shaped by real industrial constraints instead of academic ones alone. That connection didn't materialize despite reaching out to several organizations.

The project hasn't been scaled back as a result. It's being built to the same rigor it would have been held to under an industry partnership, on the reasoning that the standard shouldn't depend on who's watching.

## What's Next

The remaining work centers on completing the hardware architecture, validating it against the ML-KEM-1024 specification, and documenting the design trade-offs made along the way. Students exploring post-quantum cryptography or hardware security for their own projects, or organizations working in this space, are welcome to reach out to compare notes.

## Closing

Post-quantum cryptography isn't a hypothetical field waiting on quantum computers to arrive. The migration is already underway, and "harvest now, decrypt later" is the reason it can't wait. Building ML-KEM-1024 at the hardware level, alone rather than with an industry partner, has been the harder path, but it's the one that produces something worth standing behind.
