---
title: "Securing the Quantum Transition: A Hardware Co-Design Approach to Side-Channel-Resistant Post-Quantum Cryptography"
date: "2026-08-25"
excerpt: "Post-quantum cryptography closes the door on Shor's algorithm. But moving ML-KEM and ML-DSA onto real silicon opens a different door entirely: side-channel leakage. Here's how a masked, shuffled, RISC-V-sequenced accelerator architecture pushes that door shut."
tags: ["post-quantum-cryptography", "hardware-security", "side-channel-analysis", "RISC-V", "silicon"]
type: "article"
---

Quantum computers threaten to break RSA and elliptic-curve cryptography wide open. The industry's answer is post-quantum cryptography (PQC): ML-KEM and ML-DSA, NIST's standardized lattice-based replacements for key establishment and digital signatures. Both are believed to resist classical and quantum adversaries alike.

But standardizing an algorithm and securing a chip are two different problems. The moment ML-KEM and ML-DSA get mapped onto real silicon, whether that's a microcontroller, an FPGA, or a dedicated accelerator, they inherit a threat model that has nothing to do with math and everything to do with physics. Power draw. Electromagnetic emissions. Timing. An adversary with physical access to a device doesn't need to break the lattice problem. They just need to watch the chip work.

This is where the real engineering challenge begins.

![macro photography of black circuit board](https://images.unsplash.com/photo-1518770660439-4636190af475?fm=jpg&q=80&w=1600&auto=format&fit=crop)

## Why Post-Quantum Hardware Is a New Attack Surface

Algorithmic security proofs for ML-KEM and ML-DSA are built on a black-box model: the adversary only interacts with the scheme through its defined inputs and outputs. Real hardware doesn't offer that luxury. Every logic transition on a chip consumes current, radiates an electromagnetic field, and takes a measurable amount of time, and all three of these can leak secret data even when the algorithm's control flow looks perfectly clean on paper.

This isn't a hypothetical risk. A documented correlation power analysis (CPA) attack against Caliptra's open-source "Adam's Bridge" ML-DSA accelerator recovered private root key material using roughly 10,000 power traces, exploiting leakage in the arithmetic datapath before masking was applied. Separately, multiple academic studies have shown that unmasked rejection-sampling loops in ML-DSA leak the number of sampling iterations through nothing more than wall-clock timing, handing an attacker a meaningful head start on key recovery.

The takeaway: the risk to PQC hardware isn't a flaw in the lattice problem. It's in how faithfully the correct math gets turned into silicon.

## Where the Leakage Actually Comes From

ML-KEM and ML-DSA share a common arithmetic backbone, polynomial rings with degree-256 elements, but they stress different parts of the hardware.

**The Number Theoretic Transform (NTT).** Both schemes need fast polynomial multiplication. The NTT gets there by trading O(n²) schoolbook multiplication for O(n log n), implemented in hardware as a pipeline of butterfly units performing modular arithmetic. The data movement pattern is fixed and doesn't depend on secret values, so a naive NTT doesn't leak through control flow. It leaks anyway: the power drawn by each butterfly's modular multiplier correlates strongly with the Hamming weight of its operands, making it a rich target for power analysis with zero data-dependent branching required.

**High/low bit decomposition, unique to ML-DSA.** Signing decomposes commitment-vector coefficients into high and low bits to build a hint the verifier can use to reconstruct randomness without ever seeing it. The accept/reject decision that follows is a secret-dependent branch, and its timing and power signature are both observable. This is where some of the most practical ML-DSA leaks in the wild have been documented.

**Rejection sampling.** Both schemes reject and resample: ML-KEM to draw centered binomial noise, ML-DSA to discard signature candidates outside an acceptable range. The number of iterations required is itself a random variable, and unless it's constant-time-masked, that iteration count leaks straight through wall-clock timing or trace length.

On a constrained Cortex-M0+ platform, the cost of getting this wrong is measurable: ML-DSA-44 signing runs roughly 4.5x slower than an ML-KEM-512 handshake, driven almost entirely by rejection-sampling overhead, and peak stack RAM during signing runs more than 5x higher.

## The Countermeasure Stack: No Single Fix Is Enough

Hardware side-channel resistance isn't a single technique. It's layers, each closing a different leakage path.

**Constant-time execution** removes timing and cache-based leakage by keeping control flow and memory access independent of secret data. It does nothing, however, for power or EM leakage from data-dependent logic transitions inside an otherwise-fixed instruction sequence.

**Masking** splits every secret-dependent value into randomized shares, such that no share (and no subset smaller than the full set) correlates with the secret on its own. Arithmetic masking fits the NTT's modular math naturally; Boolean masking fits Keccak's bitwise permutation. Because real implementations mix both, converting between masking domains without leaking anything during the conversion itself becomes its own hardware design problem.

**Shuffling** randomizes the order of independent operations, like NTT butterfly evaluations. It doesn't reduce the total leakage present in a trace, but it forces an attacker to de-shuffle traces before conventional differential or correlation power analysis even applies, which meaningfully raises the trace count required for a successful attack when paired with masking.

**Certified entropy** underwrites all of it. Masking's security guarantee depends entirely on the freshness and uniformity of the randomness refreshing each share. A biased random source collapses the whole scheme's effective security order, which is why certified TRNGs conforming to NIST SP 800-90B sit at the foundation of the stack rather than as an afterthought.

![a close up of a circuit board](https://images.unsplash.com/photo-1651340550839-3b295d930048?fm=jpg&q=80&w=1600&auto=format&fit=crop)

## A Co-Design Architecture Built for the Threat Model

Rather than embedding masking logic monolithically into one large datapath, the proposed architecture takes a different approach: a lightweight RISC-V sequencer orchestrates a set of independently hardened engines, each purpose-built for its part of the workload.

- **RISC-V control core.** A minimal RV32I/E-class sequencer handles operation ordering, key-lifecycle events, and host communication. It issues opaque commands to the cryptographic engines and never touches unmasked secret material, keeping its own side-channel exposure limited to control-flow signals that don't depend on key values.
- **NTT-Lite engine.** A constant-time butterfly pipeline with masked modular arithmetic, running at 16-bit precision for ML-KEM's smaller modulus or 32-bit with Barrett reduction for ML-DSA's larger one, all on a single parameterized physical macro.
- **Masked Keccak / sponge core.** A Boolean-masked Keccak-f[1600] permutation underlying SHAKE-128/256 for sampling, hashing, and re-encryption. Share-refresh is built directly into the round function to stop leakage from accumulating across rounds.
- **X2X mask-conversion pipeline.** A dedicated, high-throughput pipeline that converts shares between arithmetic and Boolean masking domains using fresh randomness for every conversion, and does it over physically isolated DMA share buses so the two shares of any masked value never cross the same wire at the same time.
- **Shuffling controller and entropy subsystem.** Randomizes evaluation order across both the NTT and Keccak engines, drawing its seed from the same certified TRNG that feeds the masked PRNG. Protected key memory zeroizes on detected voltage, clock, or temperature anomalies, the classic precursors to a combined fault-and-side-channel attack.

![a close up of a computer chip on a printed circuit board](https://images.unsplash.com/photo-1675602488512-bdd631490fcb?fm=jpg&q=80&w=1600&auto=format&fit=crop)

## What It Costs, and What It Buys

Security is never free, and this architecture doesn't pretend otherwise. The masked NTT and Keccak cores individually carry roughly a 2 to 3x area overhead relative to an unprotected baseline. But at the full SoC level, with the X2X pipeline, isolated share buses, and shuffling controller all assembled, total overhead comes in at approximately 15 to 18%, since the RISC-V core, host interface, and memory subsystem are shared with the rest of the platform rather than duplicated.

What that buys: against the documented Adam's Bridge CPA attack, which recovered key material in roughly 10,000 traces, first-order masking combined with shuffling is projected to push the required trace count up by more than two orders of magnitude. That's the difference between an attack that's a weekend project and one that's no longer practical.

This is an engineering estimate, and it's presented as one. Physical evaluation on fabricated or FPGA-realized silicon is the next step before any such design earns production-ready status.

## What's Still Open

Higher-order masking pushes attack complexity further but comes with multiplicative randomness and area cost, bounded by how good the underlying TRNG actually is. Fault-injection resistance gets a partial answer here through zeroize-on-fault memory, but dedicated redundancy, like dual-rail or time-redundant execution, is deliberately out of scope for this architecture and worth its own design pass. And before any of this ships, the masked NTT and Keccak implementations need formal, tool-assisted verification: leakage-simulation frameworks that check for probing security under a specified adversary order, not just estimated trace counts.

## The Bottom Line

Moving to post-quantum cryptography doesn't remove the physical attack surface that's challenged cryptographic hardware for decades. It relocates it. The NTT, Keccak-based sampling, and rejection sampling each introduce leakage surfaces that the algorithms' black-box security proofs never had to account for, and documented attacks confirm the risk is practical, not theoretical.

Constant-time execution, arithmetic and Boolean masking, operation shuffling, and certified entropy, sequenced behind a lightweight RISC-V core, add up to a defense-in-depth approach that can raise attack complexity by more than two orders of magnitude for a moderate area cost. As PQC hardware moves from reference implementations toward production silicon, side-channel resistance has to be a first-class design constraint from day one, not a patch applied to an already-optimized datapath after the fact.

---

*Based on research from the NVIDIA Hardware Security Systems Group. Full technical paper, including quantitative benchmarks, threat-model scope, and complete references, available on request.*