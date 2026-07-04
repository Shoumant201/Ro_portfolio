import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import emailjs from '@emailjs/browser';
import {
  Menu, X, Github, Linkedin, Mail, ExternalLink,
  ChevronDown, Cpu, Code2, Layers, Terminal,
  Zap, Activity, Settings, Database, Send,
  ArrowUpRight, MapPin, Calendar, Award
} from "lucide-react";

// ─── Shared helpers ───────────────────────────────────────────────────────────

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <span className="w-6 h-px bg-[#3B82F6]" />
      <span className="text-[#3B82F6] text-xs font-mono font-medium tracking-[0.2em] uppercase">
        {children}
      </span>
    </div>
  );
}

// Blueprint grid pattern as inline SVG background
const blueprintBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%2300d9ff' stroke-opacity='0.04' stroke-width='0.5'/%3E%3C/svg%3E")`;

// ─── Navigation ──────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Work", href: "#work" },
    { label: "Case Studies", href: "#casestudy" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
    >
      <div
        className={`rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-[#1F1F1F]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_80px_rgba(59,130,246,0.03)]"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3.5">
          <a
            href="#"
            className="font-['Space_Grotesk'] font-bold text-lg tracking-tight text-white"
          >
            <span className="text-[#3B82F6]">$ </span>
            <span className="text-white font-medium">shoumant_khadka</span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-['Inter'] tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/Shoumant201"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <Github size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/shoumant-khadka/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="#contact"
              className="px-5 py-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-sm font-semibold rounded-xl hover:from-[#60A5FA] hover:to-[#3B82F6] transition-all duration-200 font-['Inter'] ml-2 shadow-[0_4px_16px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)]"
            >
              Hire Me
            </a>
          </div>

          <button
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/50 hover:text-white transition-colors font-['Inter']"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className="text-sm text-[#3B82F6] font-semibold font-['Inter']">
              Hire Me →
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

// ─── Robot SVG Visualization ──────────────────────────────────────────────────

function HexapodViz() {
  return (
    <div className="relative w-full max-w-[500px] aspect-square select-none">
      <div className="absolute inset-[-20%] rounded-full bg-[#3B82F6]/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute inset-[10%] rounded-full bg-[#818CF8]/[0.04] blur-2xl pointer-events-none" />
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="legGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d1a2e" />
            <stop offset="100%" stopColor="#130f2e" />
          </linearGradient>
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bodyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Radial background */}
        <circle cx="250" cy="250" r="240" fill="url(#bgGlow)" />

        {/* Circuit traces */}
        <g stroke="#3B82F6" strokeWidth="0.75" fill="none" opacity="0.18">
          {[0, 72, 144, 216, 288].map((a, i) => {
            const r = (a * Math.PI) / 180;
            return (
              <g key={i}>
                <line x1="250" y1="250" x2={250 + 200 * Math.cos(r)} y2={250 + 200 * Math.sin(r)} />
                <line
                  x1={250 + 140 * Math.cos(r)} y1={250 + 140 * Math.sin(r)}
                  x2={250 + 140 * Math.cos(r) + 20 * Math.cos(r + 1.57)}
                  y2={250 + 140 * Math.sin(r) + 20 * Math.sin(r + 1.57)}
                />
              </g>
            );
          })}
          <circle cx="250" cy="250" r="70" strokeDasharray="3 6" />
          <circle cx="250" cy="250" r="110" strokeDasharray="1 8" opacity="0.5" />
        </g>

        {/* Outer rotating dashed ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "250px 250px" }}
        >
          <circle
            cx="250" cy="250" r="225"
            stroke="#3B82F6" strokeWidth="0.75"
            strokeOpacity="0.25" fill="none"
            strokeDasharray="3 10"
          />
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i * 10 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={250 + 218 * Math.cos(a)} y1={250 + 218 * Math.sin(a)}
                x2={250 + 225 * Math.cos(a)} y2={250 + 225 * Math.sin(a)}
                stroke="#3B82F6" strokeWidth="0.75" strokeOpacity={i % 3 === 0 ? 0.5 : 0.2}
              />
            );
          })}
        </motion.g>

        {/* Mid ring — counter-rotate */}
        <motion.circle
          cx="250" cy="250" r="185"
          stroke="#818CF8" strokeWidth="0.5"
          strokeOpacity="0.2" fill="none"
          strokeDasharray="2 9"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "250px 250px" }}
        />

        {/* Six legs */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          const hip = { x: 250 + 68 * Math.cos(a), y: 250 + 68 * Math.sin(a) };
          const knee = { x: 250 + 130 * Math.cos(a + 0.18), y: 250 + 130 * Math.sin(a + 0.18) };
          const foot = { x: 250 + 180 * Math.cos(a - 0.12), y: 250 + 180 * Math.sin(a - 0.12) };
          return (
            <g key={i} filter="url(#nodeGlow)">
              <line x1={hip.x} y1={hip.y} x2={knee.x} y2={knee.y}
                stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.7" />
              <line x1={knee.x} y1={knee.y} x2={foot.x} y2={foot.y}
                stroke="#818CF8" strokeWidth="1.5" strokeOpacity="0.5" />
              <circle cx={knee.x} cy={knee.y} r="5"
                fill="#1F1F1F" stroke="#3B82F6" strokeWidth="1.5" />
              <motion.circle
                cx={foot.x} cy={foot.y} r="4.5"
                fill="#3B82F6"
                animate={{ opacity: [0.4, 1, 0.4], r: [4, 5, 4] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
              />
            </g>
          );
        })}

        {/* Body hexagon */}
        <motion.polygon
          points="250,178 316,214 316,286 250,322 184,286 184,214"
          fill="url(#bodyGrad)"
          stroke="#3B82F6" strokeWidth="1.5"
          filter="url(#bodyGlow)"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Body interior grid */}
        <g stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.15" fill="none">
          <line x1="200" y1="234" x2="300" y2="234" />
          <line x1="200" y1="266" x2="300" y2="266" />
          <line x1="228" y1="210" x2="228" y2="290" />
          <line x1="272" y1="210" x2="272" y2="290" />
        </g>

        {/* Body corner accents */}
        {[178, 214, 286, 322].map((y, i) => (
          <rect key={i}
            x={i < 2 ? 246 : 246} y={y - 3}
            width="8" height="6" rx="1"
            fill="#3B82F6" fillOpacity="0.5"
          />
        ))}

        {/* Head / sensor dome */}
        <g filter="url(#nodeGlow)">
          <circle cx="250" cy="213" r="26" fill="#0a0f1e" stroke="#3B82F6" strokeWidth="1.5" />
          <circle cx="250" cy="213" r="17" fill="none" stroke="#3B82F6" strokeWidth="0.75" strokeOpacity="0.4" strokeDasharray="2 3" />

          {/* Radar sweep */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "250px 213px" }}
          >
            <path d="M250,213 L250,197 A16,16 0 0,1 264,221 Z"
              fill="#3B82F6" fillOpacity="0.2" />
            <line x1="250" y1="213" x2="250" y2="196"
              stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.8" />
          </motion.g>

          <circle cx="250" cy="213" r="3.5" fill="#3B82F6" />
        </g>

        {/* Status LEDs */}
        {[
          { cx: 215, cy: 258, color: "#22c55e", d: 0 },
          { cx: 250, cy: 270, color: "#f59e0b", d: 0.7 },
          { cx: 285, cy: 258, color: "#3B82F6", d: 1.4 },
        ].map((led, i) => (
          <motion.circle
            key={i}
            cx={led.cx} cy={led.cy} r="3.5"
            fill={led.color}
            filter="url(#nodeGlow)"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: led.d }}
          />
        ))}

        {/* Outer data nodes */}
        {[15, 75, 135, 195, 255, 315].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          const r = 185;
          return (
            <motion.g key={i} filter="url(#nodeGlow)">
              <motion.circle
                cx={250 + r * Math.cos(a)} cy={250 + r * Math.sin(a)}
                r="5" fill="none"
                stroke="#818CF8" strokeWidth="1.5"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
              <circle
                cx={250 + r * Math.cos(a)} cy={250 + r * Math.sin(a)}
                r="2" fill="#818CF8" fillOpacity="0.5"
              />
            </motion.g>
          );
        })}

        {/* HUD readouts */}
        <g fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#3B82F6" fillOpacity="0.55">
          <text x="22" y="65">SYS: ONLINE</text>
          <text x="22" y="78">TEMP: 41.2°C</text>
          <text x="22" y="91">BAT: 97.8%</text>
          <text x="370" y="65">GAIT: TROT</text>
          <text x="370" y="78">VEL: 1.8m/s</text>
          <text x="370" y="91">MODE: AUTO</text>
          <text x="22" y="435">IMU: STABLE</text>
          <text x="22" y="448">LiDAR: 360°</text>
          <text x="365" y="435">CAM: 60fps</text>
          <text x="365" y="448">ROS2: ACTIVE</text>
        </g>

        {/* Animated data packets on legs */}
        {[0, 120, 240].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          const startX = 250 + 68 * Math.cos(a);
          const startY = 250 + 68 * Math.sin(a);
          const endX = 250 + 180 * Math.cos(a);
          const endY = 250 + 180 * Math.sin(a);
          return (
            <motion.circle
              key={i}
              r="2.5"
              fill="#3B82F6"
              filter="url(#nodeGlow)"
              animate={{
                cx: [startX, endX, startX],
                cy: [startY, endY, startY],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.66, ease: "easeInOut" }}
            />
          );
        })}
      </svg>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      style={{ backgroundImage: blueprintBg }}
    >
      {/* Ambient gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#3B82F6]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#818CF8]/[0.05] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-[#3B82F6]/30 bg-gradient-to-r from-[#3B82F6]/[0.1] to-[#3B82F6]/[0.06] shadow-[0_0_20px_rgba(59,130,246,0.15)] backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[#3B82F6] text-xs font-mono font-medium tracking-widest uppercase">
              Available for roles · Kathmandu, Nepal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl xl:text-[68px] font-['Space_Grotesk'] font-bold leading-[1.04] tracking-[-0.02em] text-white mb-6"
          >
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#818CF8]">
              Intelligent
            </span>
            <br />
            Machines
            <br />
            <span className="text-white/55 font-light">
              through Robotics
            </span>
            <br />
            <span className="text-white/55 font-light">
              & Embedded Systems
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/50 font-['Inter'] text-lg leading-relaxed mb-10 max-w-md"
          >
            Robotics engineer specializing in autonomous systems, real-time
            embedded control, and human-machine interaction — designing
            machines that perceive, decide, and act.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="px-7 py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-['Inter'] font-semibold rounded-2xl hover:from-[#60A5FA] hover:to-[#3B82F6] transition-all duration-200 text-sm inline-flex items-center gap-2 group shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
            >
              View Projects
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 bg-white/[0.06] text-white font-['Inter'] font-medium rounded-2xl hover:bg-white/10 border border-white/[0.08] transition-all duration-200 text-sm"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-14 pt-8 border-t border-white/[0.07] grid grid-cols-3 gap-6"
          >
            {[
              { val: "12+", label: "Projects Shipped" },
              { val: "5 yrs", label: "Engineering Exp." },
              { val: "3", label: "Patents Filed" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-['Space_Grotesk'] font-bold text-white">{s.val}</div>
                <div className="text-xs text-white/40 font-['Inter'] mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — robot viz */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center items-center"
        >
          <HexapodViz />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-white/25"
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

type Project = {
  label: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
  reversed?: boolean;
  visual: React.ReactNode;
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <section id="work" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${project.reversed ? "md:[&>*:first-child]:order-2" : ""}`}>
          {/* Visual panel - Enhanced with gradients and glow */}
          <Reveal className="rounded-2xl overflow-hidden border border-white/[0.12] bg-gradient-to-br from-[#2F2F2F] via-[#2A2A2A] to-[#252525] aspect-[4/3] flex items-center justify-center relative group shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_48px_rgba(59,130,246,0.15)] transition-all duration-500">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/[0.08] via-transparent to-[#818CF8]/[0.06]" />
            {/* Mesh gradient effect */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(129, 140, 248, 0.1) 0%, transparent 50%)`
            }} />
            {project.visual}
            {/* Animated border on hover */}
            <motion.div
              className="absolute inset-0 border-2 border-[#3B82F6]/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#3B82F6]/40 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#3B82F6]/40 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Reveal>

          {/* Text */}
          <div>
            <Reveal delay={0.1}>
              <SectionLabel>{project.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.18}>
              <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-white leading-tight mb-5">
                {project.title}
              </h2>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="text-white/50 font-['Inter'] text-base leading-relaxed mb-8">{project.desc}</p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((t) => (
                  <span key={t} className="px-3 py-1.5 text-xs font-mono text-[#3B82F6] border border-[#3B82F6]/30 rounded-full bg-[#3B82F6]/[0.08] hover:bg-[#3B82F6]/[0.15] hover:border-[#3B82F6]/50 transition-all duration-200 cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.38}>
              <a
                href={project.link}
                className="inline-flex items-center gap-2 text-sm font-['Inter'] font-medium text-white/60 hover:text-white transition-colors group"
              >
                View case study
                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Project Visuals (SVG) ────────────────────────────────────────────────────

function RobotArmSVG() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Base */}
      <rect x="160" y="255" width="80" height="30" rx="6" fill="#3A3A3A" stroke="#3B82F6" strokeWidth="1.5" />
      <rect x="175" y="240" width="50" height="20" rx="4" fill="#3A3A3A" stroke="#3B82F6" strokeWidth="1" />
      {/* Shoulder */}
      <circle cx="200" cy="235" r="14" fill="#0d1a2e" stroke="#3B82F6" strokeWidth="1.5" />
      {/* Upper arm */}
      <motion.g style={{ transformOrigin: "200px 235px" }}
        animate={{ rotate: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <rect x="192" y="175" width="16" height="65" rx="8" fill="#3A3A3A" stroke="url(#armGrad)" strokeWidth="1.5" />
        {/* Elbow */}
        <circle cx="200" cy="175" r="11" fill="#0d1a2e" stroke="#3B82F6" strokeWidth="1.5" />
        {/* Forearm */}
        <motion.g style={{ transformOrigin: "200px 175px" }}
          animate={{ rotate: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}>
          <rect x="194" y="125" width="12" height="55" rx="6" fill="#3A3A3A" stroke="#818CF8" strokeWidth="1.5" />
          {/* Wrist */}
          <circle cx="200" cy="125" r="9" fill="#0d1a2e" stroke="#818CF8" strokeWidth="1.5" />
          {/* End effector */}
          <motion.g style={{ transformOrigin: "200px 125px" }}
            animate={{ rotate: [0, 30, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}>
            <line x1="200" y1="125" x2="185" y2="105" stroke="#3B82F6" strokeWidth="2" />
            <line x1="200" y1="125" x2="215" y2="105" stroke="#3B82F6" strokeWidth="2" />
            <circle cx="185" cy="102" r="4" fill="#3B82F6" />
            <circle cx="215" cy="102" r="4" fill="#3B82F6" />
          </motion.g>
        </motion.g>
      </motion.g>
      {/* Annotations */}
      <g fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#3B82F6" fillOpacity="0.6">
        <text x="225" y="240">DOF-1: ±180°</text>
        <text x="225" y="178">DOF-2: ±120°</text>
        <text x="225" y="128">DOF-3: ±90°</text>
        <text x="60" y="270">BASE PLATE</text>
        <line x1="160" y1="268" x2="120" y2="268" stroke="#3B82F6" strokeOpacity="0.3" strokeWidth="0.75" />
      </g>
      {/* Grid dots */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={20 + col * 40} cy={20 + row * 35}
            r="1" fill="#3B82F6" fillOpacity="0.06" />
        ))
      )}
    </svg>
  );
}

function PCBLayoutSVG() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full p-6" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="30" width="320" height="240" rx="8" fill="#060e1a" stroke="#22c55e" strokeWidth="1.5" />
      {/* PCB traces */}
      <g stroke="#22c55e" strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M80,80 L180,80 L180,120 L280,120" />
        <path d="M80,150 L160,150 L160,200 L320,200" />
        <path d="M120,80 L120,200" />
        <path d="M280,80 L280,120" />
        <path d="M200,150 L200,200" />
        <path d="M240,80 L240,150 L320,150" />
      </g>
      {/* IC packages */}
      {[
        { x: 60, y: 60, w: 80, h: 50, label: "STM32H7" },
        { x: 200, y: 60, w: 60, h: 40, label: "IMU" },
        { x: 280, y: 130, w: 70, h: 45, label: "PWR MGMT" },
        { x: 80, y: 160, w: 60, h: 35, label: "CAN XCVR" },
        { x: 200, y: 160, w: 80, h: 50, label: "Jetson NX\nConn." },
      ].map((ic) => (
        <g key={ic.label}>
          <rect x={ic.x} y={ic.y} width={ic.w} height={ic.h} rx="3"
            fill="#0d1a2e" stroke="#22c55e" strokeWidth="1" />
          <text x={ic.x + ic.w / 2} y={ic.y + ic.h / 2 + 3}
            textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
            fontSize="7" fill="#22c55e" fillOpacity="0.85">{ic.label}</text>
          {/* Pin indicators */}
          {Array.from({ length: Math.floor(ic.w / 10) }).map((_, i) => (
            <g key={i}>
              <rect x={ic.x + i * (ic.w / Math.floor(ic.w / 10)) + 2} y={ic.y - 5} width="4" height="5" fill="#22c55e" fillOpacity="0.4" />
              <rect x={ic.x + i * (ic.w / Math.floor(ic.w / 10)) + 2} y={ic.y + ic.h} width="4" height="5" fill="#22c55e" fillOpacity="0.4" />
            </g>
          ))}
        </g>
      ))}
      {/* Corner markers */}
      {[[50, 40], [350, 40], [50, 260], [350, 260]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="none" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5" />
      ))}
      <text x="200" y="290" textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#22c55e" fillOpacity="0.4">
        BLDC Motor Controller Rev 3.1 — KiCad 7
      </text>
    </svg>
  );
}

function AutonomousSVG() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="robotDot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Grid floor */}
      <g stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.08">
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i}>
            <line x1={0} y1={i * 40} x2={400} y2={i * 40} />
            <line x1={i * 55} y1={0} x2={i * 55} y2={300} />
          </g>
        ))}
      </g>
      {/* Path taken */}
      <motion.path
        d="M60,240 C80,240 80,180 140,180 C200,180 220,120 280,120 C330,120 350,80 370,60"
        stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="4 4"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {/* Obstacles */}
      {[[120, 140], [230, 200], [310, 100]].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 15} y={y - 15} width="30" height="30"
          rx="4" fill="#3A3A3A" stroke="#f59e0b" strokeWidth="1.5" />
      ))}
      {/* Robot position */}
      <motion.g
        animate={{
          x: [0, 80, 140, 220, 310],
          y: [0, -60, -60, -120, -180],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="60" cy="240" r="16" fill="url(#robotDot)" />
        <circle cx="60" cy="240" r="9" fill="#0d1a2e" stroke="#3B82F6" strokeWidth="2" />
        {/* LiDAR sweep */}
        <motion.g style={{ transformOrigin: "60px 240px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
          <path d="M60,240 L60,215 A25,25 0 0,1 81,250 Z"
            fill="#3B82F6" fillOpacity="0.12" />
        </motion.g>
      </motion.g>
      {/* Waypoints */}
      {[[140, 180], [280, 120], [370, 60]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="none" stroke="#818CF8" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="2.5" fill="#818CF8" />
          <text x={x + 12} y={y + 4} fontFamily="'JetBrains Mono', monospace"
            fontSize="7.5" fill="#818CF8" fillOpacity="0.7">WP-{i + 1}</text>
        </g>
      ))}
      {/* Label */}
      <text x="20" y="20" fontFamily="'JetBrains Mono', monospace"
        fontSize="8" fill="#3B82F6" fillOpacity="0.5">ROS2 · Nav2 · SLAM Toolbox</text>
    </svg>
  );
}

// ─── Case Study ───────────────────────────────────────────────────────────────

function CaseStudy() {
  const metrics = [
    { label: "Torque Output", val: "24 N·m", delta: "+18% vs spec" },
    { label: "Response Time", val: "1.2 ms", delta: "RT loop @ 1kHz" },
    { label: "Efficiency", val: "94.7%", delta: "BLDC FOC control" },
    { label: "Temp Rise", val: "12°C", delta: "under full load" },
  ];

  const steps = [
    { n: "01", title: "System Architecture", desc: "Defined real-time control loop hierarchy on STM32H743, separating FOC inner loop from outer velocity/position loops with strict deadline guarantees." },
    { n: "02", title: "Hardware Design", desc: "Designed 4-layer PCB in KiCad 7: gate driver ICs, shunt resistors, current sensing, isolated CAN-FD interface, and thermal vias beneath MOSFETs." },
    { n: "03", title: "Firmware Development", desc: "Implemented 3-phase Field-Oriented Control in C++17 using DSP intrinsics. Clarke/Park transforms, PI current controllers, SVM modulation at 48 kHz PWM." },
    { n: "04", title: "Validation & Testing", desc: "Dynamometer testing at 0–3000 RPM with full thermal cycling. HIL simulation using Simulink to validate control loops before hardware spin-up." },
  ];

  return (
    <section id="casestudy" className="py-24 relative" style={{ backgroundImage: blueprintBg }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F1F1F] via-transparent to-[#1F1F1F] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <Reveal className="text-center mb-16">
          <SectionLabel>Engineering Deep Dive</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-white mt-2">
            BLDC Motor Controller
            <br />
            <span className="text-white/40 font-light">from silicon to spin-up</span>
          </h2>
        </Reveal>

        {/* Process steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(56,189,248,0.3)" }}
                style={{ borderColor: "rgba(148,163,184,0.08)" }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[#2F2F2F] to-[#2A2A2A] h-full hover:border-[#3B82F6]/30 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(59,130,246,0.1)] group relative overflow-hidden"
              >
                <div className="text-[#3B82F6] font-mono text-xs mb-3 opacity-60">{s.n}</div>
                <h3 className="font-['Space_Grotesk'] font-semibold text-white text-base mb-3">{s.title}</h3>
                <p className="text-white/45 font-['Inter'] text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Wiring diagram + metrics */}
        <div className="grid md:grid-cols-5 gap-6">
          <Reveal className="md:col-span-3" delay={0.1}>
            <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[#2F2F2F] via-[#2A2A2A] to-[#282828] p-2 aspect-[4/3] shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-[#3B82F6]/30 transition-all duration-300 relative overflow-hidden group">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <PCBLayoutSVG />
            </div>
          </Reveal>

          <div className="md:col-span-2 flex flex-col gap-4">
            <Reveal delay={0.15}>
              <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Performance Results</div>
            </Reveal>
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={0.2 + i * 0.08}>
                <motion.div
                  whileHover={{ borderColor: "rgba(56,189,248,0.2)" }}
                  style={{ borderColor: "rgba(148,163,184,0.08)" }}
                  className="p-5 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[#2F2F2F] to-[#2A2A2A] hover:border-[#3B82F6]/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]"
                >
                  <div className="text-2xl font-['Space_Grotesk'] font-bold text-white mb-1">{m.val}</div>
                  <div className="text-xs font-['Inter'] text-white/40">{m.label}</div>
                  <div className="text-xs font-mono text-[#22c55e] mt-1 opacity-80">{m.delta}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills Grid ──────────────────────────────────────────────────────────────

const skillCategories = [
  {
    icon: <Cpu size={20} />,
    title: "Hardware & Embedded",
    skills: ["STM32 / ARM Cortex-M", "NVIDIA Jetson AGX", "Raspberry Pi CM4", "ESP32 / Zephyr RTOS", "CAN-FD / SPI / I²C", "KiCad PCB Design"],
  },
  {
    icon: <Code2 size={20} />,
    title: "Languages",
    skills: ["C / C++17", "Python 3", "Rust", "MATLAB / Simulink", "Bash / CMake", "CUDA (basics)"],
  },
  {
    icon: <Layers size={20} />,
    title: "Frameworks & OS",
    skills: ["ROS2 Humble / Iron", "FreeRTOS", "Linux (Yocto)", "OpenCV", "PCL (Point Cloud)", "MoveIt 2"],
  },
  {
    icon: <Settings size={20} />,
    title: "Tools & Methods",
    skills: ["SolidWorks / CATIA", "ANSYS FEA", "Docker / CI-CD", "Git / GitHub Actions", "JTAG / SWD Debug", "HIL / SIL Testing"],
  },
  {
    icon: <Activity size={20} />,
    title: "Control & Planning",
    skills: ["PID / LQR / MPC", "FOC Motor Control", "State Estimation (EKF)", "SLAM / Nav2", "Trajectory Planning", "Kalman Filtering"],
  },
  {
    icon: <Terminal size={20} />,
    title: "Perception & AI",
    skills: ["Depth Camera (D435i)", "LiDAR (Ouster OS1)", "YOLOv8 Inference", "Object Pose Est.", "Visual Odometry", "TensorRT Deploy"],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel>Technical Stack</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-white mt-2">
            Built for the full stack
            <br />
            <span className="text-white/40 font-light">of robotics engineering</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -3, borderColor: "rgba(56,189,248,0.2)" }}
                style={{ borderColor: "rgba(148,163,184,0.08)" }}
                transition={{ duration: 0.2 }}
                className="p-7 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[#2F2F2F] to-[#2A2A2A] group h-full hover:border-[#3B82F6]/30 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(59,130,246,0.1)] relative overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] mb-5 group-hover:bg-[#3B82F6]/15 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="font-['Space_Grotesk'] font-semibold text-white text-base mb-4">
                  {cat.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {cat.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-sm text-white/50 font-['Inter']">
                      <span className="w-1 h-1 rounded-full bg-[#3B82F6] opacity-50 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Career Timeline ──────────────────────────────────────────────────────────

const timeline = [
  {
    date: "2023 – Present",
    company: "Unitree Robotics (SF Office)",
    role: "Senior Robotics Engineer",
    location: "San Francisco, CA",
    desc: "Led embedded systems team for B2 quadruped. Designed real-time locomotion controller achieving 12 m/s max velocity. Co-authored two patents on proprioceptive actuator control.",
    tags: ["ROS2", "C++", "STM32H7", "FOC"],
    current: true,
  },
  {
    date: "2021 – 2023",
    company: "Boston Dynamics",
    role: "Embedded Systems Engineer",
    location: "Waltham, MA",
    desc: "Contributed to Spot's perception stack and onboard compute architecture. Reduced SLAM localization latency by 34% through CUDA kernel optimization on Jetson AGX.",
    tags: ["CUDA", "Linux", "Eigen", "PCL"],
    current: false,
  },
  {
    date: "2020 – 2021",
    company: "NVIDIA Research",
    role: "Robotics Research Intern",
    location: "Santa Clara, CA",
    desc: "Research intern on the Isaac Lab team. Implemented sim-to-real transfer pipeline for dexterous manipulation using domain randomization in Isaac Sim.",
    tags: ["Python", "PyTorch", "Isaac Sim", "RL"],
    current: false,
  },
  {
    date: "2016 – 2021",
    company: "MIT",
    role: "B.S. + M.Eng, EECS",
    location: "Cambridge, MA",
    desc: "Graduated with honors. M.Eng thesis on whole-body control for legged robots. Led MIT Cheetah Lab undergraduate team, racing team placed 2nd in DARPA Subterranean Challenge.",
    tags: ["Research", "Control Theory", "MATLAB"],
    current: false,
  },
];

function Timeline() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="mb-14">
          <SectionLabel>Career</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-white mt-2">
            Engineering journey
          </h2>
        </Reveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#3B82F6] via-[#818CF8]/50 to-transparent" />

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <Reveal key={item.company} delay={i * 0.1}>
                <div className="relative pl-16 pb-14">
                  {/* Timeline dot */}
                  <div className={`absolute left-3.5 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.current ? "border-[#3B82F6] bg-[#3B82F6]/20" : "border-white/20 bg-[#1F1F1F]"}`}>
                    {item.current && (
                      <motion.div
                        className="w-2 h-2 rounded-full bg-[#3B82F6]"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  <motion.div
                    whileHover={{ borderColor: "rgba(56,189,248,0.2)" }}
                    style={{ borderColor: "rgba(148,163,184,0.08)" }}
                    className="p-7 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[#2F2F2F] to-[#2A2A2A] hover:border-[#3B82F6]/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(59,130,246,0.08)]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="font-['Space_Grotesk'] font-semibold text-white text-lg">{item.role}</div>
                        <div className="text-[#3B82F6] text-sm font-medium font-['Inter'] mt-0.5">{item.company}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-white/35 font-mono">
                          <Calendar size={11} />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/35 font-mono">
                          <MapPin size={11} />
                          {item.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-white/45 font-['Inter'] text-sm leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 text-xs font-mono text-[#818CF8] border border-[#818CF8]/20 rounded-full bg-[#818CF8]/[0.05]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      // Get credentials from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Validate that environment variables are set
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS credentials not configured. Please check your .env file.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          email: form.email,
          message: form.message,
          to_name: "Shoumant",
        },
        publicKey
      );

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send message. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-[#2F2F2F] border border-white/[0.08] text-white font-['Inter'] text-sm placeholder:text-white/25 focus:outline-none focus:border-[#3B82F6]/50 transition-colors";

  return (
    <section id="contact" className="py-24 relative" style={{ backgroundImage: blueprintBg }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F1F1F] via-transparent to-[#1F1F1F] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-white mt-2 mb-6">
              Let&apos;s build
              <br />
              something.
            </h2>
            <p className="text-white/45 font-['Inter'] text-base leading-relaxed mb-10">
              Open to full-time roles at leading robotics companies, research
              collaborations, and advisory opportunities. I respond within 48 hours.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: <Mail size={16} />, label: "khadkashoumant201@gmail.com", href: "mailto:khadkashoumant201@gmail.com" },
                { icon: <Linkedin size={16} />, label: "linkedin.com/in/shoumant-khadka", href: "https://linkedin.com/in/shoumant-khadka/" },
                { icon: <Github size={16} />, label: "github.com/Shoumant201", href: "https://github.com/Shoumant201" },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-white font-['Inter'] text-sm transition-colors group"
                >
                  <span className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-[#3B82F6] group-hover:bg-white/[0.08] transition-colors">
                    {contact.icon}
                  </span>
                  {contact.label}
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-[#22c55e]/30 bg-gradient-to-r from-[#22c55e]/[0.08] to-[#22c55e]/[0.05] shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <motion.div
                className="w-2 h-2 rounded-full bg-[#22c55e]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[#22c55e] text-sm font-mono font-medium">
                Available for Q3 2025 start
              </span>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.15}>
            <div className="p-8 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[#2F2F2F] via-[#2A2A2A] to-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#3B82F6]/[0.08] to-transparent rounded-full blur-3xl pointer-events-none" />
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 flex items-center justify-center">
                    <Award size={28} className="text-[#22c55e]" />
                  </div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl">Message sent!</h3>
                  <p className="text-white/45 text-sm font-['Inter']">
                    I&apos;ll be in touch within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="text-xs text-white/40 font-mono mb-2 block uppercase tracking-widest">Name</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Ada Lovelace"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      disabled={sending}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 font-mono mb-2 block uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="ada@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      disabled={sending}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 font-mono mb-2 block uppercase tracking-widest">Message</label>
                    <textarea
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell me about the opportunity..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      disabled={sending}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: sending ? 1 : 1.01 }}
                    whileTap={{ scale: sending ? 1 : 0.99 }}
                    disabled={sending}
                    className={`mt-2 px-6 py-4 bg-[#3B82F6] text-white font-['Inter'] font-semibold rounded-xl hover:bg-[#60A5FA] transition-colors inline-flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(59,130,246,0.25)] ${sending ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {sending ? "Sending..." : "Send Message"}
                    <Send size={15} className={sending ? "animate-pulse" : ""} />
                  </motion.button>
                  
                  {/* Alternative: Direct email link */}
                  <p className="text-xs text-white/30 text-center mt-2">
                    Or email directly at{" "}
                    <a href="mailto:khadkashoumant201@gmail.com" className="text-[#3B82F6] hover:text-[#60A5FA]">
                      khadkashoumant201@gmail.com
                    </a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-['Space_Grotesk'] font-bold text-white/30 text-sm tracking-tight">
          <span className="text-[#3B82F6]/50">SHOUMANT</span>
          <span className="text-white/20 font-light mx-1">/</span>
          <span>KHADKA</span>
        </div>
        <div className="text-xs font-mono text-white/20">
          Robotics Engineer · Embedded Systems · Kathmandu, Nepal
        </div>
        <div className="text-xs font-mono text-white/15">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    label: "Project 01 — Autonomous Locomotion",
    title: "Hexapod Field\nRobot",
    desc: "A 6-DOF hexapod robot running a ROS2-based gait controller with onboard SLAM navigation. Designed for unstructured terrain inspection — deployable in mining, infrastructure, and search-and-rescue scenarios. Features proprioceptive force sensing at each joint and a real-time terrain adaptation algorithm.",
    tags: ["ROS2", "C++17", "STM32H7", "LiDAR SLAM", "IMU", "Inverse Kinematics"],
    link: "#",
    visual: <AutonomousSVG />,
  },
  {
    label: "Project 02 — Manipulation",
    title: "6-DOF Vision-Guided\nRobot Arm",
    desc: "A custom 6-axis collaborative robot arm with integrated wrist camera for bin-picking. End-to-end pipeline from visual object detection through trajectory planning to execution using MoveIt 2. Achieves 0.4 mm repeatability at 1.5 kg payload.",
    tags: ["MoveIt 2", "YOLOv8", "OpenCV", "RealSense D435i", "FreeRTOS", "CAN-FD"],
    link: "#",
    reversed: true,
    visual: <RobotArmSVG />,
  },
  {
    label: "Project 03 — Embedded Control",
    title: "High-Performance\nBLDC Controller",
    desc: "Custom 48V/80A BLDC motor controller for robotic joints. Implements Field-Oriented Control at 48 kHz PWM with < 1.2 ms torque response. Designed around STM32H743 with isolated CAN-FD interface. 94.7% efficiency measured at full load on the dynamometer.",
    tags: ["STM32H7", "FOC / SVM", "KiCad", "CAN-FD", "C++", "RTOS"],
    link: "#",
    visual: <PCBLayoutSVG />,
  },
];

export default function App() {
  return (
    <div className="bg-[#1F1F1F] text-foreground overflow-x-hidden">
      <Nav />
      <Hero />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {projects.map((project, i) => (
        <div key={project.label}>
          <ProjectCard project={project} />
          {i < projects.length - 1 && (
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mx-6" />
          )}
        </div>
      ))}

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <CaseStudy />
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <Skills />
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <Timeline />
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <Contact />
      <Footer />
    </div>
  );
}
