const m=`---
title: "Building a Smart IoT Device from Scratch"
date: "2026-08-23"
excerpt: "A systems-engineering breakdown of what it actually takes to ship an intelligent, connected device — from architecture decisions to field-ready hardware."
tags: ["IoT", "embedded-systems", "hardware", "edge-computing"]
type: "blog"
---

Every intelligent edge device — an industrial sensor predicting bearing failure, a wearable tracking a heartbeat for years on a single coin cell — starts from the same set of constraints: microwatts of power, kilobytes of memory, and an expectation of unattended, reliable operation for years in the field. Designing for those constraints is a fundamentally different discipline than general-purpose computing, and it rewards engineers who think in systems rather than components.

This article breaks down that discipline: the architectural decisions that determine whether a device scales from prototype to fleet, and the engineering trade-offs — power, latency, cost, security — that separate a production-grade product from a demo.

**Key takeaways**
- Intelligence should be *distributed* across the edge-to-cloud stack, not centralized at either extreme
- Radio protocol selection is one of the highest-leverage decisions in the entire design
- Security and observability are baseline requirements for any multi-year field deployment, not later add-ons

![Prototype build during firmware bring-up: microcontroller, breadboarded sensor interface, and live debug console](/blog/iot-device-build.jpg)

## Why Edge Intelligence Matters

"IoT" is frequently shorthand for "device connected to the internet," but that framing understates the engineering problem. A smart IoT device is an embedded system that perceives its environment, reasons over that data — locally, remotely, or both — and acts, all within a power and cost envelope that traditional computing rarely has to respect.

That envelope forces a discipline that shows up across four domains an engineer has to master simultaneously:

- **Embedded systems** — the hardware and firmware that sense and control
- **Networking** — the protocols that move data reliably and efficiently under real-world RF conditions
- **Edge and cloud computing** — where inference and analytics actually run
- **Security engineering** — the layer that keeps all of the above trustworthy over a multi-year deployment

The engineers who excel here aren't the ones who go deep on a single layer — they're the ones who understand how a decision in one layer constrains every layer above and below it.

## Architecture: Where Should Intelligence Live?

A well-engineered IoT device follows a layered architecture, and keeping those layers decoupled is what separates a robust product from a fragile prototype:

1. **Perception layer** — sensors and actuators interfacing with the physical world
2. **Processing layer** — the MCU/MPU reading sensor data, applying logic, and managing power states
3. **Connectivity layer** — the radio and protocol stack moving data to and from the device
4. **Cloud/platform layer** — ingestion, storage, analytics, and fleet management at scale
5. **Application layer** — dashboards, alerts, and integrations that turn telemetry into decisions

![Reference architecture: sensor/actuator layer, connectivity layer, edge computing layer, and cloud/application layer](/blog/iot-architecture-diagram.png)

The central architectural question is *where intelligence lives*. Centralizing processing in the cloud maximizes flexibility but adds latency, bandwidth cost, and a hard dependency on connectivity. Pushing inference to the edge cuts latency and bandwidth but constrains you to the device's compute and power budget. Production-grade IoT architecture rarely picks an extreme — it distributes intelligence deliberately, running time-critical decisions on-device while reserving the cloud for aggregation, model training, and fleet-level insight.

## Component Selection: The Decisions That Actually Matter

**Sensors.** Selection criteria go well beyond "does it measure the right thing": accuracy and resolution relative to the application's tolerance, power draw in both sleep and active-sampling states, interface choice (analog, I²C, SPI, UART) and its effect on wiring complexity and noise immunity, and whether the sampling model is polling- or interrupt-driven — a decision that materially affects battery life.

**Microcontroller.** The MCU is the device's cognition, and the right choice is rarely the most powerful one. What matters is core architecture and clock speed sized to the actual workload, flash/RAM footprint relative to firmware and buffer requirements, the peripheral set (ADCs, timers, PWM, comms interfaces), and — most critically for battery-powered designs — power modes that support deep sleep, standby, and wake-on-interrupt.

**Connectivity.** This is one of the highest-leverage decisions in the entire design, and it's dictated by the deployment environment, not familiarity:

| Protocol | Strength | Trade-off |
|---|---|---|
| Wi-Fi | High throughput | High power draw |
| BLE | Low power, short range | Limited throughput |
| LoRaWAN | Long range, low power | Low bandwidth |
| Cellular (NB-IoT / LTE-M) | Wide coverage | Higher cost per device |

**Cloud platform.** A mature platform handles secure device provisioning, over-the-air firmware updates, time-series storage, and rules engines that trigger downstream actions — this is the difference between a gadget and a manageable fleet.

## From Prototype to Field-Ready Hardware

Building the device is a sequence of decisions, each of which constrains the next:

1. **Define the operating envelope** — power budget, environmental conditions, required battery life, and data update frequency, established before a single component is selected.
2. **Select and validate sensors independently** — breadboard the sensor, verify accuracy against a known reference, and characterize power draw in both active and idle states.
3. **Build the firmware around a state machine** — sleep, sample, process, transmit — rather than a monolithic loop. This structure is what makes power optimization possible downstream.
4. **Implement the connectivity stack** with graceful reconnection and local buffering, so network interruptions don't mean data loss.
5. **Establish secure provisioning** — unique device credentials, mutual TLS (or equivalent) authentication, and zero hardcoded secrets in production firmware.
6. **Integrate the cloud platform** — telemetry ingestion, device shadow/state sync, and remote configuration.
7. **Move from breadboard to enclosure and field-test** — thermal behavior, ingress protection, and real-world RF performance. A signal that's clean on a bench often degrades measurably inside a plastic housing.
8. **Instrument for observability** — battery voltage, signal strength, and error counts shipped as diagnostic telemetry, so field failures are diagnosable remotely instead of requiring a truck roll.

## Where the Discipline Compounds

**Edge AI.** Running lightweight inference on-device — anomaly detection, keyword spotting, predictive-maintenance triggers — cuts the volume of raw data that needs to be transmitted and delivers sub-second response times independent of network conditions. Quantization and model pruning make this practical even on constrained MCUs.

**Power optimization.** The largest gains rarely come from the part number alone — they come from firmware discipline: aggressive sleep-state usage, event-driven wake triggers instead of polling, and batched transmissions that minimize radio-on time, typically the single largest power draw in the system.

**Security by design.** Secure boot, encrypted firmware images, signed OTA updates, and hardware-backed key storage aren't optional extras for a serious deployment — they're the baseline expected of any device with a multi-year field life.

**Fleet-scale management.** Provisioning, monitoring, and updating have to be automated and auditable from day one. Retrofitting that discipline after a deployment has already scaled to thousands of units is exponentially harder than building it in from the start.

## Applications in Production Today

- **Industrial monitoring** — vibration and temperature sensing for predictive maintenance on rotating machinery
- **Smart agriculture** — soil moisture and microclimate sensing to optimize irrigation
- **Healthcare wearables** — continuous, low-power vital-sign monitoring
- **Smart infrastructure** — structural health monitoring in bridges and buildings
- **Energy management** — real-time load monitoring and demand-response automation

## What's Next

The next generation of IoT devices leans further into on-device intelligence, ultra-low-power wide-area networking, and self-healing security architectures capable of detecting and isolating compromised nodes autonomously. As silicon continues to shrink and energy-harvesting matures, the line between "sensor" and "computer" keeps dissolving — every object engineered from here forward has the potential to be quietly, deliberately intelligent.

## Closing

Building a smart IoT device is an exercise in trade-offs: power against performance, flexibility against security, simplicity against scale. The engineers who get this right aren't the ones who master a single layer of the stack — they're the ones who understand how every layer constrains the others, and design accordingly. Done well, the result isn't just a connected object. It's a system that senses, decides, and acts with quiet reliability for years in the field.
`,u=`---
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

*Based on research from the NVIDIA Hardware Security Systems Group. Full technical paper, including quantitative benchmarks, threat-model scope, and complete references, available on request.*`,g=Object.assign({"/src/content/blog/building-a-smart-iot-device-from-scratch.md":m,"/src/content/blog/ml-kem-research-paper-example.md":u});function p(e){const t=e.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);if(!t)return{data:{},content:e};const[,n,i]=t,o={};return n.split(/\r?\n/).forEach(c=>{const s=c.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);if(!s)return;const[,d,l]=s;let a=l.trim();a.startsWith("[")&&a.endsWith("]")?a=a.slice(1,-1).split(",").map(h=>h.trim().replace(/^["']|["']$/g,"")).filter(Boolean):a=a.replace(/^["']|["']$/g,""),o[d]=a}),{data:o,content:i.trim()}}function f(e){return e.split("/").pop().replace(/\.md$/,"")}const r=Object.entries(g).map(([e,t])=>{const{data:n,content:i}=p(t);return{slug:f(e),title:n.title||"Untitled",date:n.date||"",excerpt:n.excerpt||"",tags:Array.isArray(n.tags)?n.tags:[],type:n.type||"blog",pdf:n.pdf||"",content:i}});r.sort((e,t)=>new Date(t.date)-new Date(e.date));function y(){return r}function w(e){return r.find(t=>t.slug===e)}export{w as a,y as g};
