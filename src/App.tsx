/* @vite-ignore */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Terminal, 
  Cpu, 
  Database, 
  ChevronRight,
  Globe,
  Zap,
  Flower2,
  BrainCircuit,
  ExternalLink
} from "lucide-react";
import React, { useState, useEffect, useMemo, useRef, ReactNode, MouseEvent } from "react";
import { PERSONAL_INFO, PROJECTS, EXPERIENCE, EDUCATION } from "./constants";

import * as THREE from 'three';

// Cinematic 3D Particle Animation (WebGL)
// --- Components ---

const MagneticButton = ({ children, className, onClick }: { children: ReactNode, className?: string, onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", damping: 15, stiffness: 150, mass: 0.1 }}
      className={className}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

const TextReveal = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={`overflow-hidden inline-block ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="block"
      >
        {text}
      </motion.span>
    </div>
  );
};

const GlitchHeader = ({ text, number }: { text: string, number: string }) => {
  return (
    <div className="relative group mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4"
      >
        <span className="text-neon-magenta font-mono text-xl">{number}.</span>
        <h2 className="text-4xl font-bold uppercase tracking-tighter relative">
          <TextReveal text={text} />
          <motion.span 
            className="absolute -inset-1 bg-neon-pink/20 -z-10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ x: [-2, 2, -2], y: [1, -1, 1] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
          />
        </h2>
      </motion.div>
      <div className="h-[1px] w-full bg-gradient-to-r from-neon-pink/50 to-transparent mt-4" />
    </div>
  );
};

const TiltCard = ({ children, className }: { children: ReactNode, className?: string, key?: string | number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientY - top) / height;
    const y = (e.clientX - left) / width;
    const rotateX = (x - 0.5) * 10;
    const rotateY = (y - 0.5) * -10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", damping: 20, stiffness: 150 }}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

const HeroScanline = () => {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden opacity-20">
      <motion.div 
        animate={{ y: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="w-full h-[2px] bg-white shadow-[0_0_10px_white]"
      />
    </div>
  );
};

const GlitchOverlay = () => {
  return (
    <motion.div 
      animate={{ 
        opacity: [0, 0, 0.1, 0, 0.05, 0, 0],
        x: [0, 0, 5, 0, -5, 0, 0]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 5,
        times: [0, 0.8, 0.82, 0.84, 0.86, 0.88, 1]
      }}
      className="absolute inset-0 z-50 pointer-events-none bg-white mix-blend-overlay"
    />
  );
};

const Vignette = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle,transparent_40%,black_100%)] opacity-60" />
  );
};

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: [null, "-=100"],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5
          }}
          className="absolute w-1 h-1 bg-neon-pink rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

const HUDOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-neon-pink/30" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-neon-purple/30" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-neon-magenta/30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-neon-pink/30" />

      {/* Floating Data Readouts */}
      <div className="absolute top-1/4 left-10 font-mono text-[8px] text-neon-pink/40 space-y-2 hidden lg:block">
        <p>SYSTEM_STATUS: OPTIMAL</p>
        <p>NEURAL_LINK: ESTABLISHED</p>
        <p>LATENCY: 12MS</p>
        <div className="w-32 h-1 bg-white/5 overflow-hidden">
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-full bg-neon-pink/40"
          />
        </div>
      </div>

      <div className="absolute bottom-1/4 right-10 font-mono text-[8px] text-neon-purple/40 text-right space-y-2 hidden lg:block">
        <p>COORDINATES: 22.3193° N, 114.1694° E</p>
        <p>LOCALE: HONG_KONG_SAR</p>
        <p>ENCRYPTION: AES-256</p>
        <div className="w-32 h-1 bg-white/5 overflow-hidden ml-auto">
          <motion.div 
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-full h-full bg-neon-purple/40"
          />
        </div>
      </div>

      {/* Moving Grid Lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-neon-pink to-transparent animate-pulse" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-neon-purple to-transparent animate-pulse" />
      </div>
    </div>
  );
};

const FluidParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationFrameId: number;
    let geometry: THREE.BufferGeometry;
    let material: THREE.ShaderMaterial;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 2000);
      camera.position.z = 500;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);

      const PARTICLE_COUNT = 15000;
      geometry = new THREE.BufferGeometry();
      
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const velocities = new Float32Array(PARTICLE_COUNT * 3);
      const life = new Float32Array(PARTICLE_COUNT);
      const sizes = new Float32Array(PARTICLE_COUNT);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 1200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 800;

        velocities[i * 3] = (Math.random() - 0.5) * 0.5;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

        life[i] = Math.random();
        sizes[i] = Math.random() * 3 + 1;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('life', new THREE.BufferAttribute(life, 1));

      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color('#00ffff') },
          uColor2: { value: new THREE.Color('#8b5cf6') },
        },
        vertexShader: `
          uniform float uTime;
          attribute float size;
          attribute float life;
          varying float vLife;
          varying vec3 vColor;
          
          void main() {
            vLife = mod(life + uTime * 0.05, 1.0);
            
            vec3 pos = position;
            
            // More complex fluid-like motion
            float noiseX = sin(uTime * 0.15 + pos.y * 0.008 + pos.z * 0.005);
            float noiseY = cos(uTime * 0.2 + pos.x * 0.008 + pos.z * 0.005);
            float noiseZ = sin(uTime * 0.1 + pos.x * 0.005 + pos.y * 0.005);
            
            pos.x += noiseX * 40.0;
            pos.y += noiseY * 40.0;
            pos.z += noiseZ * 20.0;
            
            // Add a swirling effect
            float angle = uTime * 0.1;
            float s = sin(angle);
            float c = cos(angle);
            float rx = pos.x * c - pos.y * s;
            float ry = pos.x * s + pos.y * c;
            pos.x = mix(pos.x, rx, 0.2);
            pos.y = mix(pos.y, ry, 0.2);
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (400.0 / -mvPosition.z) * (1.0 - abs(vLife - 0.5) * 2.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying float vLife;
          
          void main() {
            float dist = distance(gl_PointCoord, vec2(0.5));
            if (dist > 0.5) discard;
            
            float alpha = (1.0 - dist * 2.0) * (1.0 - abs(vLife - 0.5) * 2.0);
            vec3 color = mix(uColor1, uColor2, vLife);
            
            gl_FragColor = vec4(color, alpha * 0.6);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const animate = () => {
        const time = performance.now() * 0.001;
        material.uniforms.uTime.value = time;
        
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (containerRef.current) containerRef.current.innerHTML = '';
        geometry.dispose();
        material.dispose();
      };
    } catch (error) {
      console.error("FluidParticleBackground failed:", error);
    }
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none" />;
};

const MovingImageBackground = ({ mousePos }: { mousePos: { x: number, y: number } }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="https://github.com/JaneWu0922/Portfolio/blob/main/AI%20Generated%20Visual%20Asset/Gemini_Generated_Image_d1ea7dd1ea7dd1ea.png?raw=true" 
          alt="Cyberpunk Background" 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      {/* Fluid Particle Layer */}
      <FluidParticleBackground />
      
      {/* Overlay Gradients for Depth and Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      
      {/* Light Flow Effect (Shadow/Light Flow) */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          x: ["-10%", "10%", "-10%"]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-tr from-neon-pink/5 via-transparent to-neon-purple/5 pointer-events-none"
      />
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [glitchText, setGlitchText] = useState(PERSONAL_INFO.title);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const titles = [PERSONAL_INFO.title, "AI Architect", "People Strategist", "Data Explorer"];
      setGlitchText(titles[Math.floor(Math.random() * titles.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navItems = useMemo(() => [
    { id: "home", label: "HOME", icon: <Terminal size={18} /> },
    { id: "about", label: "BIO", icon: <Globe size={18} /> },
    { id: "experience", label: "XP", icon: <Cpu size={18} /> },
    { id: "projects", label: "LAB", icon: <Database size={18} /> },
    { id: "contact", label: "LINK", icon: <Mail size={18} /> },
  ], []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-neon-pink selection:text-black cursor-none bg-black">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-neon-pink z-[100] origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />

      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-neon-pink rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-1 h-1 bg-neon-purple rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 2, y: mousePos.y - 2 }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.1 }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-cyber-bg/50 to-cyber-bg pointer-events-none" />
      <div className="scanline" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-cyber-bg/80 backdrop-blur-md border-b border-neon-pink/30 py-2" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-neon-pink/10 border border-neon-pink flex items-center justify-center rounded-sm group-hover:bg-neon-pink group-hover:text-black transition-all">
              <span className="font-mono font-bold text-xl">JW</span>
            </div>
          </motion.div>

          <div className="flex gap-1 sm:gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-2 px-3 py-1 rounded-sm font-mono text-xs tracking-tighter transition-all ${
                  activeSection === item.id 
                    ? "bg-neon-pink text-black shadow-[0_0_15px_rgba(255,0,255,0.5)]" 
                    : "text-gray-400 hover:text-neon-pink hover:bg-neon-pink/10"
                }`}
              >
                {item.icon}
                <span className="hidden md:block uppercase">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section 
          id="home" 
          className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden"
        >
          {/* The Background Layer */}
          <div className="absolute inset-0 bg-black z-0">
             <MovingImageBackground mousePos={mousePos} />
          </div>

          {/* HUD Overlay */}
          <HUDOverlay />

          {/* Foreground Particles */}
          <FloatingParticles />

          {/* Vignette */}
          <Vignette />

          {/* Glitch Overlay */}
          <GlitchOverlay />

          {/* Hero Scanline */}
          <HeroScanline />
          
          {/* The Content Layer - Higher Z-Index */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10 pointer-events-auto perspective-1000" // This z-10 is crucial
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 relative">
              <span className="block text-white uppercase relative z-10">Portfolio of</span>
              <span className="block neon-text-pink text-neon-pink italic uppercase relative z-10">Jane Wu</span>
              <motion.div 
                animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.05, 1]
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute inset-0 bg-neon-pink/20 blur-[60px] -z-10"
              />
            </h1>
            <div className="h-8">
              <motion.p 
                key={glitchText}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl md:text-2xl font-mono text-gray-400 tracking-widest uppercase"
              >
                {glitchText}
              </motion.p>
            </div>

            <div className="mt-12">
              <MagneticButton
                className="px-12 py-4 bg-neon-pink text-black font-bold tracking-[0.2em] rounded-sm shadow-[0_0_20px_rgba(255,0,255,0.4)] transition-all uppercase flex items-center gap-3 mx-auto hover:shadow-[0_0_35px_rgba(255,0,255,0.7)]"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                THE JOURNEY OF JANE <ChevronRight size={20} />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neon-pink/50 z-10"
          >
            <ChevronRight className="rotate-90" size={32} />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
          {/* Row 1: Bio and Image */}
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-0 items-stretch mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="pr-12 flex flex-col justify-center"
            >
              <GlitchHeader number="01" text="About_Me" />
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-8">
                {PERSONAL_INFO.profile.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                <p className="text-neon-pink font-mono text-sm uppercase tracking-widest">
                  {"// Multilingual: "}
                  {PERSONAL_INFO.languages.map(l => l.name).join(", ")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex h-full min-h-[400px] group"
            >
              <div className="absolute -inset-4 border border-neon-pink/20 rounded-lg -z-10 group-hover:border-neon-pink/40 transition-colors" />
              <div className="absolute -inset-2 border border-neon-purple/20 rounded-lg -z-10 group-hover:border-neon-purple/40 transition-colors" />
              <div className="w-full h-full overflow-hidden rounded-sm border border-white/10 shadow-2xl relative">
                <motion.div 
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1616394158624-a2ba9cfe2994?q=80&w=774&auto=format&fit=crop" 
                    alt="Hong Kong Victoria Peak" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <motion.div 
                  initial={{ x: "0%" }}
                  whileInView={{ x: "100%" }}
                  transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                  className="absolute inset-0 bg-neon-pink z-20"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md p-3 border-l-2 border-neon-pink z-30">
                <p className="text-sm font-bold uppercase tracking-tighter">Hong Kong (HKG)</p>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Education History */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 uppercase text-white">
              <Terminal size={20} className="text-neon-pink" /> Education_History
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {EDUCATION.map((edu, i) => (
                <div key={i} className="p-8 border border-white/5 bg-white/5 rounded-sm hover:border-neon-pink/30 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                    <BrainCircuit size={40} />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-neon-pink uppercase leading-tight">{edu.degree}</h4>
                    <span className="font-mono text-[10px] text-gray-500 uppercase bg-black/50 px-2 py-1 border border-white/10">{edu.period}</span>
                  </div>
                  <p className="text-neon-magenta font-bold text-sm mb-4 uppercase tracking-wide">{edu.school} — {edu.location}</p>
                  <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">{edu.details}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 3: Skills and Traits (Horizontal) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 uppercase text-white">
              <Zap size={20} className="text-neon-pink" /> Neural_Upgrades
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 border border-neon-pink/20 bg-neon-pink/5 rounded-sm">
                <h3 className="text-neon-pink font-mono text-sm mb-8 tracking-widest uppercase flex items-center gap-2">
                  <Zap size={16} /> Technical_Arsenal
                </h3>
                <div className="flex flex-wrap gap-3">
                  {PERSONAL_INFO.skills.hard.map(skill => (
                    <span key={skill} className="text-[10px] font-mono px-3 py-1.5 bg-black/50 text-gray-300 border border-white/10 uppercase hover:border-neon-pink/50 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8 border border-neon-purple/20 bg-neon-purple/5 rounded-sm">
                <h3 className="text-neon-purple font-mono text-sm mb-8 tracking-widest uppercase flex items-center gap-2">
                  <BrainCircuit size={16} /> Human_Architecture
                </h3>
                <div className="flex flex-wrap gap-3">
                  {PERSONAL_INFO.skills.soft.map(skill => (
                    <span key={skill} className="text-[10px] font-mono px-3 py-1.5 bg-black/50 text-gray-300 border border-white/10 uppercase hover:border-neon-purple/50 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <GlitchHeader number="02" text="Career_Log" />
            
            <div className="space-y-12">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={{ x: 10 }}
                  className="group relative grid md:grid-cols-[1fr_3fr] gap-8 p-8 border border-white/5 hover:border-neon-pink/30 transition-all bg-black/40 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-neon-pink transition-all duration-300" />
                  <div className="absolute inset-0 bg-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  <div>
                    <p className="font-mono text-neon-pink text-sm mb-2 uppercase">{exp.period}</p>
                    <p className="text-gray-500 text-xs flex items-center gap-1 uppercase">
                      <MapPin size={12} /> {exp.location}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-neon-pink transition-colors uppercase">
                      {exp.role} @ <span className="text-neon-magenta">{exp.company}</span>
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {exp.highlights.map((item, i) => (
                        <li key={i} className="text-gray-400 flex gap-3">
                          <span className="text-neon-pink mt-1.5">
                            <ChevronRight size={14} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <GlitchHeader number="03" text="Project_Lab" />
              <p className="text-gray-400 font-mono text-sm tracking-widest uppercase tracking-tighter">Decrypting_Innovations...</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <TiltCard
                key={project.id}
                className="group bg-cyber-card border border-white/10 overflow-hidden flex flex-col relative"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="h-full flex flex-col"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-neon-pink/0 group-hover:border-neon-pink/50 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-neon-purple/0 group-hover:border-neon-purple/50 transition-all duration-500" />
                  
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-card to-transparent opacity-60" />
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/80 border border-neon-pink/50 text-neon-pink text-[10px] font-mono uppercase">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col" style={{ transform: "translateZ(20px)" }}>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-neon-pink transition-colors uppercase tracking-tighter">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                      {project.description || project.objective}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.skills.map(skill => (
                        <span key={skill} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 text-gray-400 border border-white/10 uppercase">
                          {skill}
                        </span>
                      ))}
                    </div>

                      <div className="mt-auto">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 border border-neon-pink text-neon-pink font-mono text-xs tracking-widest hover:bg-neon-pink hover:text-black transition-all uppercase"
                        >
                          ACCESS_GITHUB <Github size={14} />
                        </a>
                      </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 bg-neon-pink/5 border-y border-neon-pink/10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-8 uppercase tracking-tighter">Ready to <span className="neon-text-magenta text-neon-magenta">Collaborate?</span></h2>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                System is open for inquiries. Whether it's AI strategy, people operations, or just a friendly "Hello World", let's establish a connection.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 p-6 bg-black/40 border border-white/5 hover:border-neon-pink transition-all group"
                >
                  <div className="w-12 h-12 bg-neon-pink/10 flex items-center justify-center rounded-sm text-neon-pink group-hover:bg-neon-pink group-hover:text-black transition-all">
                    <Mail size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Email_Protocol</p>
                    <p className="text-sm font-bold tracking-tighter">{PERSONAL_INFO.email}</p>
                  </div>
                </a>
                <a 
                  href={`https://${PERSONAL_INFO.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-black/40 border border-white/5 hover:border-neon-purple transition-all group"
                >
                  <div className="w-12 h-12 bg-neon-purple/10 flex items-center justify-center rounded-sm text-neon-purple group-hover:bg-neon-purple group-hover:text-black transition-all">
                    <Linkedin size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Linkedin_Sync</p>
                    <p className="text-sm font-bold tracking-tighter">jane-wu0922</p>
                  </div>
                </a>
                <a 
                  href={`https://${PERSONAL_INFO.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-black/40 border border-white/5 hover:border-neon-magenta transition-all group"
                >
                  <div className="w-12 h-12 bg-neon-magenta/10 flex items-center justify-center rounded-sm text-neon-magenta group-hover:bg-neon-magenta group-hover:text-black transition-all">
                    <Github size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Github_Repo</p>
                    <p className="text-sm font-bold tracking-tighter">JaneWu0922</p>
                  </div>
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-gray-500 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-neon-pink" /> {PERSONAL_INFO.location}
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-neon-purple" /> STATUS: ACTIVE
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">
            © 2026 JANE_WU // Built_With_Neon_And_AI
          </p>
          <div className="flex gap-6">
            <a href={`https://${PERSONAL_INFO.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-neon-pink transition-colors"><Github size={20} /></a>
            <a href={`https://${PERSONAL_INFO.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-neon-purple transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-neon-magenta transition-colors"><Globe size={20} /></a>
          </div>
          <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">
            System_Status: <span className="text-neon-pink animate-pulse">Online</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

