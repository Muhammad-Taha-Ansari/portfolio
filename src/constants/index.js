import {
  RTL,
  Electrical,
  web,
  javascript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  ubuntu,
  python,
  django,
  meta,
  starbucks,
  tesla,
  shopify,
  threejs,
  xceleriumLogo,
  nclLogo,
  natLogo,
  sapLogo,
  anjumanLogo,
  sv,
  uvm,
  cpp,
  live,
  mlKem,
  tempHumidity,
  smartEnergyMeter,
  ventexCrypto,
  ceramicPlant,
  agriSenseX7,
  certPlaceholder,
  certEmbeddedC,
  certVlsi,
  certHardwareDesign,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "involvement",
    title: "Involvement",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "certificates",
    title: "Certificates",
  },
];

const services = [
  {
    title: "Electrical Engineer",
    icon: Electrical,
  },
  {
    title: "RTL Engineer",
    icon: RTL,
  },
  {
    title: "Web Developer",
    icon: web,
  },
];

const technologies = [
  {
    name: "SystemVerilog",
    icon: sv,
  },
  {
    name: "UVM",
    icon: uvm,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "C++",
    icon: cpp,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Django",
    icon: django,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "ubuntu",
    icon: ubuntu,
  },
];

const experiences = [
  {
    title: "Training Engineer (RTL/ASIC)",
    company_name: "Xcelerium",
    icon: xceleriumLogo,
    iconBg: "#fff",
    date: "December 2025 - June 2026",
    points: [
      "Completed professional training in RTL/ASIC design with a focus on SystemVerilog and digital design methodologies.",
      "Worked on industry-standard ASIC design flow, including RTL development, synthesis, timing analysis, and verification.",
      "Implemented FPGA-based designs, including RISC-V processor architecture, to strengthen digital hardware design expertise.",
    ],
  },
  {
    title: "Hardware Security Intern",
    company_name: "Neurocomputation Lab, NEDUET",
    icon: nclLogo,
    iconBg: "#fff",
    date: "February 2026 - March 2026",
    points: [
      "Completed a one-month internship at NCL, focusing on Post-Quantum Cryptography, Hardware Security, and Elliptic Curve Diffie-Hellman (ECDH).",
      "Worked on cryptographic algorithm implementation and gained practical experience in secure hardware design principles.",
      "Explored emerging post-quantum cryptographic techniques to develop secure systems resilient against quantum computing threats.",
    ],
  },
  {
    title: "Solar System Installation Intern",
    company_name: "NAT Solar Energy",
    icon: natLogo,
    iconBg: "#fff",
    iconScale: 1.25,
    date: "March 2025 - April 2025",
    points: [
      "Completed a one-month internship at NAT Solar Energy, assisting in the site surveying, installation, and wiring of solar PV systems.",
      "Performed system troubleshooting and preventive maintenance to identify faults and ensure optimal performance while following safety standards.",
      "Participated in client meetings to assess energy requirements and recommend efficient solar power solutions.",
    ],
  },
];

const involvements = [
  {
    company_name: "Study Aid Project (SAP), NED University",
    icon: sapLogo,
    iconBg: "#fff",
    iconScale: 1.3,
    date: "February 2025 - Present",
    points: [
      "Joined SAP in February 2025 as a General Member of the Competitions domain.",
      "Proposed and helped establish the IT domain within SAP, a function that didn't previously exist in the society.",
      "Promoted to IT Lead in February 2026 to head the domain, now responsible for the society's technical and IT initiatives.",
    ],
  },
  {
    company_name: "Anjuman Hayat-ul-Islam",
    icon: anjumanLogo,
    iconBg: "#fff",
    iconScale: 1.3,
    date: "February 2025",
    points: [
      "Completed 18 hours of volunteer work over three days at an orphanage run by Anjuman Hayat-ul-Islam, Karachi.",
      "Engaged with children through storytelling, creative play, and interactive learning activities, fostering a joyful and nurturing environment.",
      "Promoted social and emotional development among the children while demonstrating patience, empathy, and teamwork throughout the service.",
      "Received a Certificate of Appreciation for dedication and compassionate service.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Taha picked up RTL design and the ASIC flow faster than most trainees we've had — synthesis, timing analysis, verification, all of it. His FPGA work on the RISC-V core showed real attention to detail.",
    name: "Training Supervisor",
    designation: "RTL/ASIC Training Program",
    company: "Xcelerium",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    testimonial:
      "During his internship, Taha dug into post-quantum cryptography and elliptic curve Diffie-Hellman with genuine curiosity, not just to complete the assignment. That kind of initiative is rare in an intern.",
    name: "Research Supervisor",
    designation: "Hardware Security Internship",
    company: "Neurocomputation Lab, NEDUET",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    testimonial:
      "Taha didn't just join SAP — he saw a gap, proposed an entire IT domain for the society, and then earned the lead role for it within a year. That's the kind of ownership you want on a team.",
    name: "Society Coordinator",
    designation: "Study Aid Project (SAP)",
    company: "NED University",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const projects = [
  {
    name: "ML-KEM",
    description:
      "My Final Year Design Project (FYDP), currently in progress. ML-KEM (Module-Lattice Key Encapsulation Mechanism) is a post-quantum cryptographic hardware security implementation.",
    tags: [
      {
        name: "post-quantum-crypto",
        color: "blue-text-gradient",
      },
      {
        name: "hardware-security",
        color: "green-text-gradient",
      },
      {
        name: "FYDP",
        color: "pink-text-gradient",
      },
    ],
    image: mlKem,
    source_code_link: "https://github.com/Muhammad-Taha-Ansari",
    live_link: "https://www.tahaansari.pages.dev",
  },
  {
    name: "AgriSense X7",
    description:
      "An ongoing smart agriculture project — a multi-parameter soil sensing device that reads pH, EC, moisture, temperature, and NPK levels to turn raw readings into actionable irrigation and fertilization insights.",
    tags: [
      {
        name: "coming-soon",
        color: "blue-text-gradient",
      },
      {
        name: "smart-agriculture",
        color: "pink-text-gradient",
      },
    ],
    image: agriSenseX7,
    source_code_link: "https://github.com/Muhammad-Taha-Ansari",
    live_link: "https://www.tahaansari.pages.dev",
  },
  {
    name: "Temperature and Humidity Sensor",
    description:
      "A temperature and humidity monitoring system built using Proteus and embedded C on an Arduino microcontroller, with live sensor readings and status display.",
    tags: [
      {
        name: "embedded-C",
        color: "blue-text-gradient",
      },
      {
        name: "Proteus",
        color: "green-text-gradient",
      },
      {
        name: "Arduino",
        color: "pink-text-gradient",
      },
    ],
    image: tempHumidity,
    source_code_link:
      "https://github.com/Muhammad-Taha-Ansari/Humidity-And-Temperature-Sensor",
    live_link: "https://www.tahaansari.pages.dev",
  },
  {
    name: "Smart Energy Meter",
    description:
      "A Smart Energy Meter designed using SystemVerilog on a Cyclone V (Altera) FPGA board, interfaced with a Cortex board to display live readings on Linux.",
    tags: [
      {
        name: "SystemVerilog",
        color: "blue-text-gradient",
      },
      {
        name: "FPGA",
        color: "green-text-gradient",
      },
      {
        name: "Cyclone-V",
        color: "pink-text-gradient",
      },
    ],
    image: smartEnergyMeter,
    source_code_link:
      "https://github.com/Muhammad-Taha-Ansari/Smart-Energy-Meter-using-FPGA",
    live_link: "https://www.tahaansari.pages.dev",
  },
  {
    name: "Ventex Crypto",
    description:
      "A crypto trading platform frontend designed and built using Vite, HTML, CSS, and JavaScript.",
    tags: [
      {
        name: "vite",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "green-text-gradient",
      },
      {
        name: "frontend",
        color: "pink-text-gradient",
      },
    ],
    image: ventexCrypto,
    source_code_link:
      "https://github.com/Muhammad-Taha-Ansari/Ventex-Crypto",
    live_link: "https://vantex-crypto.vercel.app/login",
  },
  {
    name: "Ceramic Plant",
    description:
      "SLD and lighting design for a ceramic plant, done in DIALux, with the plant structure modeled in AutoCAD.",
    tags: [
      {
        name: "DIALux",
        color: "blue-text-gradient",
      },
      {
        name: "AutoCAD",
        color: "green-text-gradient",
      },
      {
        name: "electrical-design",
        color: "pink-text-gradient",
      },
    ],
    image: ceramicPlant,
    source_code_link:
      "https://github.com/Muhammad-Taha-Ansari/Ceramic-Plant-SLD-and-DIALux-Design",
    live_link: "https://www.tahaansari.pages.dev",
  },
];

const certifications = [
  {
    name: "Crash Course on Embedded C Programming",
    issuer: "Packt (via Coursera)",
    date: "Aug 2025",
    image: certEmbeddedC,
    verify_link: "https://www.coursera.org/account/accomplishments/verify/7HP45WTUZHFO",
  },
  {
    name: "Fundamentals of Digital Design for VLSI Chip Design",
    issuer: "L&T EduTech (via Coursera)",
    date: "Aug 2025",
    image: certVlsi,
    verify_link: "https://www.coursera.org/account/accomplishments/verify/AXMCVLLDBOG9",
  },
  {
    name: "SystemVerilog Tutorials: Hardware Design & Verification",
    issuer: "Starweaver (via Coursera)",
    date: "Aug 2026",
    image: certHardwareDesign,
    verify_link: "https://www.coursera.org/account/accomplishments/verify/VKP680EFHYH7",
  },
];

export { services, technologies, experiences, involvements, testimonials, projects, certifications };
