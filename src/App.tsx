import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'motion/react';
import { Star, Send, Instagram, Linkedin, Pin as PinterestIcon, Monitor, Ruler, Palette, PenTool, Zap, Shield, BookOpen, Mail, MapPin } from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  span: string;
  color: string;
}

// --- Components ---

const TextReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const containerVars = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      }
    }
  };

  const charVars = {
    initial: { opacity: 0, y: 100, rotateX: -90, scale: 0.2 },
    whileInView: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  } as const;

  return (
    <motion.span
      variants={containerVars}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className={`inline-block perspective-1000 ${className}`}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={charVars} className="inline-block origin-bottom transform-gpu">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Loader = () => {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("BOOTING...");
  const [showSlash, setShowSlash] = useState(false);

  useEffect(() => {
    const steps = [
      { p: 20, t: "INITIALIZING" },
      { p: 45, t: "SYNCING_CONTEXT" },
      { p: 75, t: "RENDERING_VIBE" },
      { p: 100, t: "READY!" },
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setPercent(steps[stepIndex].p);
        setStatus(steps[stepIndex].t);
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSlash(true), 500);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[10000] bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Background Anime Impact Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0], x: ['-50%', '50%'] }}
            transition={{ duration: 0.2, repeat: Infinity, delay: i * 0.1 }}
            className="absolute h-[50vh] w-px bg-manga-orange left-1/2 -ml-px rotate-45"
            style={{ top: `${i * 20}%` }}
          />
        ))}
      </div>

      {/* Main Content Reveal */}
      <div className="relative z-20 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-8"
        >
          {/* Red Sun Backdrop (Japan Flag Vibe) */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-12 bg-manga-orange/5 rounded-full blur-2xl"
          />
          
          <h1 className="font-tomorrow font-black text-7xl md:text-8xl tracking-tight text-ink relative mix-blend-multiply">
            <span className="text-manga-pink">VELVET</span>
            <br />
            <span className="text-manga-orange italic">STUDIO</span>
          </h1>
        </motion.div>

        {/* Loading Progress (Anime Dash style) */}
        <div className="flex items-center gap-4 mt-8">
          <div className="w-12 h-1 bg-ink/10 rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-full w-full bg-manga-orange"
            />
          </div>
          <span className="font-tomorrow text-[10px] font-black tracking-[5px] text-ink/40 uppercase">
            {status} ({percent}%)
          </span>
          <div className="w-12 h-1 bg-ink/10 rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-full w-full bg-manga-pink"
            />
          </div>
        </div>
      </div>

      {/* Finishing Slashes on Exit */}
      <AnimatePresence>
        {showSlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 pointer-events-none"
          >
            <motion.div 
              initial={{ x: '-100%', y: '-100%' }}
              animate={{ x: '100%', y: '100%' }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 w-full h-1 bg-white shadow-[0_0_20px_white]"
              style={{ transform: 'rotate(45deg)' }}
            />
            <motion.div 
              initial={{ x: '100%', y: '-100%' }}
              animate={{ x: '-100%', y: '100%' }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute top-0 right-0 w-full h-1 bg-white shadow-[0_0_20px_white]"
              style={{ transform: 'rotate(-45deg)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Kanji background */}
      <div className="absolute left-12 top-12 font-black text-9xl opacity-[0.03] select-none text-ink">
        創造
      </div>
      <div className="absolute right-12 bottom-12 font-black text-9xl opacity-[0.03] select-none text-ink">
        情熱
      </div>
    </motion.div>
  );
};


const BURST_POOL = ['✦', '★', '✿', '⚡', '🎨', '✏️', 'NICE!', 'COOL!', 'WOW!', 'BANG!'];
const BURST_COLORS = ['#FF6B35', '#A855F7', '#06B6D4', '#EAB308', '#EC4899'];

const CustomCursor = ({ color }: { color: string }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Ultra-responsive dot — near-instant tracking with minimal lag
  const springConfig = useMemo(() => ({ damping: 28, stiffness: 800, mass: 0.02 }), []);
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Ring follows closely with a subtle trailing delay
  const ringSpringConfig = useMemo(() => ({ damping: 22, stiffness: 350, mass: 0.08 }), []);
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  const [isClicking, setIsClicking] = useState(false);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number; text: string; color: string }[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play a short click SFX using a single reusable AudioContext
  const playClickSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (_) {}
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      playClickSound();
      const newBurst = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        text: BURST_POOL[Math.floor(Math.random() * BURST_POOL.length)],
        color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)]
      };
      setBursts(prev => [...prev.slice(-3), newBurst]);
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-[99999] transform-gpu"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: color,
          width: isClicking ? '12px' : '8px',
          height: isClicking ? '12px' : '8px',
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: `0 0 10px ${color}66`,
          willChange: 'transform'
        }}
      />
      
      {/* Ring */}
      <motion.div
        className="fixed rounded-full border-2 pointer-events-none z-[99998] transform-gpu"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          borderColor: color,
          width: isClicking ? '20px' : '28px',
          height: isClicking ? '20px' : '28px',
          translateX: '-50%',
          translateY: '-50%',
          opacity: isClicking ? 1 : 0.6,
          willChange: 'transform'
        }}
      />

      {/* Bursts */}
      {bursts.map(burst => (
        <div
          key={burst.id}
          className="burst-text"
          style={{ left: burst.x, top: burst.y, color: burst.color }}
          onAnimationEnd={() => setBursts(prev => prev.filter(b => b.id !== burst.id))}
        >
          {burst.text}
        </div>
      ))}

    </>
  );
};

const Magnetic = ({ children, strength = 0.5 }: { children: React.ReactNode, strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = (clientX - centerX) * strength;
    const moveY = (clientY - centerY) * strength;
    setPosition({ x: moveX, y: moveY });
  };

  const resetPosition = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const Navigation = ({ isLightMode, toggleMode }: { isLightMode: boolean, toggleMode: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-8 md:px-12 py-5 bg-dark-bg/85 backdrop-blur-xl border-b border-manga-orange/20 transition-colors duration-500 light-mode:bg-white/85">
      <div className="font-display text-2xl tracking-tighter text-manga-orange font-black">
        <span className="text-manga-pink">VELVET</span> STUDIO
      </div>
      <ul className="hidden lg:flex items-center gap-6 list-none">
        {[
          { label: 'Studio', id: 'antigravity' },
          { label: 'Story', id: 'story' },
          { label: 'About', id: 'about' },
          { label: 'Work', id: 'work' },
          { label: 'Services', id: 'services' },
          { label: 'Process', id: 'process' },
          { label: 'Contact', id: 'contact' }
        ].map((item) => (
          <li key={item.id}>
            <motion.a
              href={`#${item.id}`}
              whileHover={{ 
                color: 'var(--color-manga-orange)',
                transition: { duration: 0.2 }
              }}
              className="text-[12px] font-bold tracking-[3px] uppercase text-[#F5F0FF]/55 hover:text-manga-orange transition-colors duration-200 light-mode:text-ink/75 inline-block"
            >
              {item.label}
            </motion.a>
          </li>
        ))}
        <li className="ml-4">
          <button
            onClick={toggleMode}
            className="border-2 border-manga-orange text-manga-orange px-4 py-1.5 font-display text-sm font-bold tracking-tight hover:bg-manga-orange hover:text-dark-bg transition-all cursor-none"
          >
            {isLightMode ? 'INK MODE' : 'PAPER MODE'}
          </button>
        </li>
      </ul>
    </nav>
  );
};


const Hero = () => {
  return (
    <section id="start" className="min-h-screen flex items-center px-8 md:px-12 pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,107,53,0.05)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="hero-glass-cards absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block w-[400px] h-[500px] perspective-1000">
         <motion.div
           animate={{ y: [0, -20, 0], rotateX: [0, 5, 0], rotateY: [0, 10, 0] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="relative w-full h-full"
         >
            <div className="absolute top-1/4 left-0 w-64 h-40 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col items-center justify-center gap-4">
               <div className="font-bangers text-6xl text-manga-orange drop-shadow-[0_0_10px_rgba(255,107,53,0.5)]">VS</div>
               <div className="font-bebas text-xs tracking-[4px] text-white/40"><span className="text-manga-pink">VELVET</span> STUDIO · CREATIVE</div>
            </div>
            
            <div className="absolute top-[10%] right-0 w-40 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-6 flex items-center gap-3 shadow-xl">
               <div className="w-2 h-2 rounded-full bg-manga-orange animate-pulse" />
               <div className="font-bebas text-xs tracking-widest text-manga-orange">ILLUSTRATION</div>
            </div>

            <div className="absolute bottom-[20%] right-[10%] w-40 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-6 flex items-center gap-3 shadow-xl">
               <div className="w-2 h-2 rounded-full bg-manga-cyan animate-pulse" />
               <div className="font-bebas text-xs tracking-widest text-manga-cyan">PHOTOGRAPHY</div>
            </div>

            <div className="absolute bottom-[40%] left-[-20px] w-20 h-20 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full flex flex-col items-center justify-center gap-1 shadow-xl">
               <div className="text-3xl">🎨</div>
               <div className="font-bebas text-[8px] tracking-widest text-white/40">ART</div>
            </div>
         </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="font-rajdhani font-bold tracking-[8px] text-manga-orange uppercase mb-6 text-xs flex items-center gap-4"
        >
          <div className="w-12 h-px bg-manga-orange" />
          Vignesh Shankar — Creative Tech & Design Portfolio
        </motion.div>
        
        <h1 className="text-[clamp(72px,12vw,140px)] leading-[0.85] tracking-tighter text-white light-mode:text-ink">
          <motion.div 
            initial={{ opacity: 0, x: -100, rotate: -15, scale: 0.5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05, 
              transition: { duration: 0.3 }
            }}
            animate={{ 
              y: [0, -12, 0],
            }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.8 },
              rotate: { duration: 0.8 },
              scale: { type: "spring", damping: 10 }
            }}
            className="relative group inline-block font-inter font-black italic select-none cursor-pointer transition-colors duration-300 text-manga-pink light-mode:text-manga-purple"
          >
            <span className="relative z-10 block">VELVET</span>
          </motion.div>
          <br />
          <motion.div 
            initial={{ opacity: 0, x: 100, rotate: 15, scale: 0.5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05, 
              transition: { duration: 0.3 }
            }}
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              opacity: { duration: 0.8, delay: 0.2 },
              rotate: { duration: 0.8, delay: 0.2 },
              scale: { type: "spring", damping: 10 }
            }}
            className="text-transparent text-stroke-2 text-stroke-orange relative group inline-block font-inter font-black italic select-none cursor-pointer light-mode:text-manga-orange light-mode:text-stroke-0"
          >
            <span className="relative z-10 block">STUDIO</span>
          </motion.div>
        </h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-md text-lg leading-relaxed text-manga-orange/80 light-mode:text-manga-orange font-medium"
        >
          Turning ideas into impactful digital experiences. UI/UX Design. Frontend Dev. Content Creation. Visual Arts.
        </motion.p>
        
        <div className="flex flex-wrap gap-2 mt-8">
           {['UI/UX Design', 'Frontend Dev', 'Content Creation', 'Visual Arts'].map((tag, i) => (
             <span key={i} className="text-[10px] font-bold tracking-[3px] uppercase px-3 py-1 border border-manga-pink/20 text-manga-pink light-mode:text-manga-pink light-mode:border-manga-pink/30">{tag}</span>
           ))}
        </div>

        <motion.div
           initial={{ y: 30, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.6 }}
           className="mt-12 flex gap-4"
        >
          <Magnetic strength={0.3}>
            <a
              href="#work"
              className="bg-manga-orange text-dark-bg px-10 py-4 font-bebas text-xl tracking-[4px] inline-block border-2 border-transparent manga-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              VIEW WORK ↗
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#antigravity"
              className="bg-white/5 backdrop-blur-xl text-white px-10 py-4 font-bebas text-xl tracking-[4px] inline-block border border-white/10 hover:border-manga-orange transition-all light-mode:bg-ink/5 light-mode:border-ink/15 light-mode:text-ink"
            >
              THE STUDIO ✦
            </a>
          </Magnetic>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-12 flex items-center gap-4 text-[10px] font-bold tracking-[5px] text-white/20 uppercase light-mode:text-ink/40">
         <div className="h-10 w-px bg-white/20 animate-[height_2s_infinite] light-mode:bg-ink/30" />
         SCROLL
      </div>
    </section>
  );
};

const Ticker = () => {
  return (
    <div className="ticker bg-dark-surface border-y border-white/10 py-4 overflow-hidden whitespace-nowrap relative z-10">
      <div className="animate-ticker inline-block">
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="font-display text-2xl tracking-tight mx-10 text-white/30 light-mode:text-ink/50 font-bold uppercase">
              <span className="text-manga-orange">//</span> UI DESIGN
            </span>
            <span className="font-display text-2xl tracking-tight mx-10 text-white/30 light-mode:text-ink/50 font-bold uppercase">
              <span className="text-manga-orange">//</span> FRONTEND DEVELOPMENT
            </span>
            <span className="font-display text-2xl tracking-tight mx-10 text-white/30 light-mode:text-ink/50 font-bold uppercase">
              <span className="text-manga-orange">//</span> MANGA ILLUSTRATION
            </span>
            <span className="font-display text-2xl tracking-tight mx-10 text-white/30 light-mode:text-ink/50 font-bold uppercase">
              <span className="text-manga-orange">//</span> UX ARCHITECTURE
            </span>
            <span className="font-display text-2xl tracking-tight mx-10 text-white/30 light-mode:text-ink/50 font-bold uppercase">
              <span className="text-manga-orange">//</span> MOTION GRAPHICS
            </span>
            <span className="font-display text-2xl tracking-tight mx-10 text-white/30 light-mode:text-ink/50 font-bold uppercase">
              <span className="text-manga-orange">//</span> BRAND IDENTITY
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const AntigravityStudio = () => {
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const updateEye = (eye: SVGEllipseElement | null) => {
        if (!eye) return;
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = Math.min(3, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 100);
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;
        eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
      };
      updateEye(leftEyeRef.current);
      updateEye(rightEyeRef.current);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="antigravity" className="min-h-screen bg-[#000005] py-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-6xl text-white light-mode:text-ink font-black uppercase">
          <TextReveal text="ZENITH" /> <TextReveal text="DREAMSCAPE" className="text-manga-yellow" delay={0.3} />
        </h2>
        <p className="font-marker text-manga-yellow font-['Verdana']" style={{ fontFamily: 'Verdana, sans-serif' }}>Physics is merely a suggestion here.</p>
      </motion.div>

      <div ref={containerRef} className="w-full max-w-5xl h-[600px] relative bg-gradient-to-b from-manga-yellow/5 to-transparent border border-white/5 rounded-[4px] overflow-hidden">
        {/* Wall panels effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:18px_18px] opacity-50" />
        
        {/* Floor line */}
        <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-manga-yellow/30 to-transparent" />

        {/* Floating character */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[140px] z-10"
        >
          <svg viewBox="0 0 140 240" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="70" cy="232" fill="rgba(0,0,0,0.3)" rx="30" ry="5" />
            <rect x="52" y="175" width="16" height="55" rx="4" fill="#1a1a2e" />
            <rect x="72" y="175" width="16" height="55" rx="4" fill="#1a1a2e" />
            <path d="M38 115 Q30 130 32 175 L108 175 Q110 130 102 115 Q86 108 70 110 Q54 108 38 115Z" fill="#2a1a3e" />
            <rect x="62" y="100" width="16" height="16" rx="4" fill="#c4956a" />
            <ellipse cx="70" cy="88" rx="28" ry="26" fill="#c4956a" />
            <path d="M42 82 Q44 55 70 52 Q96 55 98 82 Q90 68 70 66 Q50 68 42 82Z" fill="#1a0a00" />
            <ellipse ref={leftEyeRef} cx="58" cy="88" rx="6" ry="7" fill="#1a1a2e" />
            <ellipse ref={rightEyeRef} cx="82" cy="88" rx="6" ry="7" fill="#1a1a2e" />
            <circle cx="56" cy="86" r="1.5" fill="white" />
            <circle cx="80" cy="86" r="1.5" fill="white" />
          </svg>
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-white text-ink px-3 py-1 rounded-xl text-[10px] font-marker whitespace-nowrap border-2 border-ink">
            ✨ Let's create!
          </div>
        </motion.div>

        {/* Floating Items from reference */}
        <FloatingItem emoji="🎨" top="20%" left="15%" drift={-25} rotate={-15} duration={5} />
        <FloatingItem emoji="✏️" top="15%" right="15%" drift={-20} rotate={15} duration={6} />
        <FloatingItem emoji="☕" bottom="30%" left="10%" drift={-15} rotate={-10} duration={4.5} />
        <FloatingItem emoji="📱" bottom="40%" right="10%" drift={-30} rotate={20} duration={7} />
        <FloatingItem emoji="📐" top="40%" left="8%" drift={-18} rotate={5} duration={5.5} />
        <FloatingItem emoji="🥤" bottom="25%" right="25%" drift={-12} rotate={-8} duration={6.5} />
        
        {/* Sticky Notes */}
        <motion.div
           animate={{ y: [0, -15, 0], rotate: [-5, -3, -5] }}
           transition={{ duration: 5, repeat: Infinity }}
           className="absolute top-[25%] right-[20%] w-16 h-16 bg-manga-yellow text-ink p-2 text-[8px] font-bold shadow-lg"
        >
          MEET CLIENT<br/>@ 3PM!
        </motion.div>
        
        <motion.div
           animate={{ y: [0, -12, 0], rotate: [8, 10, 8] }}
           transition={{ duration: 6, repeat: Infinity }}
           className="absolute top-[15%] left-[25%] w-16 h-16 bg-manga-pink text-white p-2 text-[8px] font-bold shadow-lg"
        >
          NEW<br/>IDEA!! ✦
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-1/2 -translate-x-1/2 font-display font-black tracking-tight text-manga-orange border-2 border-manga-orange bg-black px-4 py-2 text-xs"
        >
          <span className="text-manga-pink">VELVET</span> STUDIO CONTEXT
        </motion.div>
      </div>
    </section>
  );
};

const StorySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 100 } as any
    }
  } as const;

  return (
    <section id="story" className="py-32 px-8 md:px-12 bg-paper text-ink relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.03)_1px,_transparent_1px)] bg-[length:8px_8px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-20 relative z-10"
      >
        <div className="flex items-center justify-center gap-4 text-xs font-black tracking-[8px] text-ink/30 uppercase mb-4">
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>★</motion.span> 
          Story Mode Universe 
          <motion.span animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>★</motion.span>
        </div>
        <h2 className="font-bangers text-[clamp(64px,10vw,120px)] tracking-wider leading-none">
          STORY <span className="text-manga-orange">BOARD</span>
        </h2>
        <p className="font-tomorrow text-xs font-bold tracking-[6px] text-ink/40 mt-4 uppercase">クリエイティブ · ジャーニー</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-1 border-[4px] border-ink shadow-[12px_12px_0_rgba(0,0,0,0.15)] bg-ink"
      >
        {/* Panel 1: Creative Balance */}
        <motion.div 
          variants={panelVariants}
          whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
          className="md:row-span-2 bg-[#f5f2ee] p-10 flex flex-col items-center justify-center relative overflow-hidden group min-h-[450px]"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-10 -right-10 text-9xl opacity-[0.03] select-none"
          >
            🎨
          </motion.div>
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0deg,_rgba(0,0,0,0.06)_2deg,_transparent_3deg)] bg-[length:20%_20%]" />
          
          <div className="relative z-10">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0] }}
              className="text-8xl grayscale contrast-125 mb-8 text-center"
            >
              🎹
            </motion.div>
            <h3 className="font-tomorrow font-black text-2xl mb-6 text-center leading-tight uppercase tracking-tighter">
              CREATIVE <span className="text-manga-orange">BALANCE</span>
            </h3>
            <p className="font-marker text-lg text-center leading-relaxed font-bold">
              "I balance creativity with technical curiosity. Whether I'm finding rhythm on the piano through classical compositions or strategizing on the cricket field, these disciplines fuel my focus. My time is split between these passions and my laptop—where I build clean, modern frontend experiences with the same precision."
            </p>
          </div>
          
          <div className="absolute top-4 right-4 bg-white border-2 border-ink py-2 px-3 rounded-full font-marker text-[10px] leading-tight shadow-md rotate-12">
            VELVET<br />ORIGINS
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-ink text-paper py-1.5 px-4 text-[10px] font-black tracking-[4px] uppercase">IDENTITY / CHAPTER 01</div>
        </motion.div>

        {/* Panel 2: Technical Edge */}
        <motion.div 
          variants={panelVariants}
          whileHover={{ backgroundColor: "#ff6b35", color: "#ffffff" }}
          className="bg-[#eeeae4] p-10 flex flex-col items-center justify-center relative overflow-hidden min-h-[260px] group transition-colors duration-300"
        >
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[repeating-conic-gradient(from_0deg_at_50%_120%,_transparent_0deg,_rgba(0,0,0,0.04)_4deg)]" />
          <motion.div 
            animate={{ skewX: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="font-bangers text-5xl mb-4 italic group-hover:text-white"
          >
            VLSI!
          </motion.div>
          <p className="font-tomorrow font-bold text-center text-sm leading-relaxed uppercase tracking-widest px-4">
            Exploring design & tech intersection, sharpening UI/UX skills, and diving deep into VLSI verification—mastering SystemVerilog, UVM methodologies, and RTL functional verification to ensure hardware integrity at the gate level.
          </p>
          <div className="absolute top-2 left-2 font-tomorrow font-black text-[8px] opacity-20">SYSTEM_BOOT_LOG</div>
        </motion.div>

        {/* Panel 3: Global Horizon */}
        <motion.div 
          variants={panelVariants}
          whileHover={{ scale: 1.02 }}
          className="md:row-span-2 bg-[#f2f0ec] p-10 flex flex-col items-center justify-center relative overflow-hidden min-h-[450px] group"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent,_transparent_8px,_rgba(0,0,0,0.03)_8px,_rgba(0,0,0,0.03)_9px)] opacity-50" />
          <div className="relative z-10 text-center">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-7xl grayscale contrast-125 mb-8"
            >
              🇯🇵
            </motion.div>
            <h3 className="font-tomorrow font-black text-2xl mb-6 leading-tight uppercase tracking-tighter">
              GLOBAL <span className="text-manga-pink">HORIZON</span>
            </h3>
            <p className="font-marker text-lg text-center leading-relaxed font-bold">
              "Learning Japanese through Genki and NHK resources, aiming for JLPT N3 proficiency. I'm expanding my global perspective to bridge the gap between cutting-edge technology and international opportunities in the global market."
            </p>
          </div>
          <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] font-tomorrow font-black opacity-30 whitespace-nowrap tracking-[10px]">日本への旅</div>
          <div className="absolute bottom-0 left-0 right-0 bg-ink text-paper py-1.5 px-4 text-[10px] font-black tracking-[4px] uppercase">HORIZON / SCENE 03</div>
        </motion.div>

        {/* Panel 4: Constant Evolution */}
        <motion.div 
          variants={panelVariants}
          className="md:col-span-2 bg-[#ede9e3] p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden min-h-[220px]"
        >
          <div className="absolute inset-0 bg-manga-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex flex-col items-center relative z-10 shrink-0">
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-7xl grayscale opacity-40 absolute -z-10"
            >
              ⚙️
            </motion.div>
            <div className="text-6xl grayscale mb-2">⚡</div>
            <div className="font-bangers text-3xl rotate-[-3deg] text-manga-orange">EVOLVE!</div>
          </div>
          <div className="flex-1 relative z-10">
            <p className="font-marker text-lg md:text-xl leading-relaxed italic font-bold">
              "Experimenting, learning, and improving—whether it’s building motion-heavy React dashboards, experimenting with generative AI for custom textures, or refining my musical arrangements to better express complex ideas through sound."
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['Experiment', 'Learn', 'Improve', 'Create'].map(tag => (
                <motion.span 
                  key={tag}
                  whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                  className="text-[10px] font-black border-2 border-ink py-1.5 px-4 uppercase tracking-[3px] transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-ink text-paper py-1.5 px-4 text-[10px] font-black tracking-[4px] uppercase">RESOLUTION / END_FILE</div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 text-center font-tomorrow text-[10px] font-black text-ink/30 tracking-[12px] uppercase"
      >
        進化 ✦ 創造 ✦ 挑戦 ✦ 未知
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'PROJECTS', num: '20+', detail: 'Completed Missions' },
    { label: 'CLIENTS', num: '15+', detail: 'Global Allies' },
    { label: 'YEARS', num: '1-3', detail: 'In the Field' },
    { label: 'DISC', num: '04', detail: 'Specializations' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 bg-dark-bg border-y-4 border-manga-orange/20 relative z-10">
      {stats.map((stat, i) => (
        <div key={i} className="p-10 border-r border-white/5 last:border-none relative overflow-hidden group">
          {/* Ink Bleed Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden">
            <motion.div 
               initial={{ scale: 0.5, opacity: 0 }}
               whileHover={{ scale: 1.5, opacity: 1 }}
               className="absolute top-0 right-0 w-64 h-64 bg-manga-orange/15 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2"
            />
            <motion.div 
               initial={{ scale: 0.5, opacity: 0 }}
               whileHover={{ scale: 1.8, opacity: 1 }}
               className="absolute bottom-0 left-0 w-80 h-80 bg-manga-pink/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.015] group-hover:opacity-10 transition-opacity">
            <span className="font-tomorrow font-black text-[clamp(6rem,14vw,12rem)] leading-none uppercase -rotate-6 select-none">{stat.label}</span>
          </div>
          <div className="relative z-10 text-center">
            <div className="font-tomorrow text-6xl font-black text-manga-orange leading-none mb-4">{stat.num}</div>
            <div className="font-tomorrow text-xs tracking-[4px] font-bold text-white/40 light-mode:text-ink/60 uppercase">{stat.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FloatingItem = ({ emoji, top, left, right, bottom, drift, rotate, duration }: any) => {
  return (
    <motion.div
      animate={{ 
        y: [0, drift, 0],
        rotate: [rotate, rotate + 15, rotate - 15, rotate],
        scale: [1, 1.1, 0.9, 1]
      }}
      whileHover={{ scale: 1.4, rotate: rotate + 45 }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: "linear",
      }}
      style={{ position: 'absolute', top, left, right, bottom, fontSize: '44px'}}
      className="select-none cursor-pointer drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:drop-shadow-[0_20px_20px_rgba(255,107,53,0.3)]"
    >
      {emoji}
    </motion.div>
  );
};



const About = () => {
  return (
    <section id="about" className="py-28 px-8 md:px-12 bg-dark-surface relative overflow-hidden transition-colors duration-500 light-mode:bg-paper/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(168,85,247,0.03)_1px,_transparent_1px)] bg-[length:15px_15px] opacity-50" />
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 font-bangers text-[200px] text-white/[0.02] rotate-90 pointer-events-none uppercase tracking-widest">ABOUT</div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          className="relative"
        >
          <div className="border-[3px] border-manga-purple p-2 bg-dark-bg relative">
            <div className="aspect-[3/4] bg-black overflow-hidden flex items-center justify-center">
              <img
                src="/protagonist.jpg"
                alt="Vignesh Shankar"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125 sepia-[0.2] hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <motion.div
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 5 }}
              className="absolute -bottom-4 -right-4 bg-manga-purple text-white px-4 py-1 font-display font-black border-2 border-black"
            >
              THE PROTAGONIST
            </motion.div>
          </div>
        </motion.div>

        <div className="about-text">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="text-manga-purple font-bold tracking-[4px] mb-2 uppercase text-sm"
          >
            Character Profile
          </motion.div>
          <h2 className="font-display font-black text-7xl leading-[0.9] mb-6 uppercase text-white light-mode:text-ink">
            <TextReveal text="VIGNESH" /><br />
            <TextReveal text="SHANKAR" className="text-manga-purple" delay={0.2} />
          </h2>
          <p className="text-lg leading-relaxed text-white/70 mb-4 light-mode:text-ink/85">
            I'm <strong className="text-manga-purple">Vignesh Shankar</strong>, a 19-year-old engineering student from <strong className="text-white light-mode:text-ink">Chennai, India</strong> — specializing in UI/UX design, frontend development, and digital content creation. I bring a fresh, modern perspective backed by strong technical curiosity and hands-on project experience.
          </p>
          <p className="text-lg leading-relaxed text-white/70 mb-8 light-mode:text-ink/75">
            Even at this stage, I focus on delivering practical, user-centered solutions that combine design, technology, and audience engagement — helping brands and individuals build a strong digital presence.
          </p>
          <div className="flex flex-wrap gap-3">
            {['React.js', 'Figma', 'Tailwind', 'Illustration'].map(skill => (
              <span key={skill} className="border-2 border-manga-purple px-4 py-1 text-manga-purple font-bold text-xs tracking-widest uppercase">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Archives = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'FLAGSHIP ARTWORK',
      description: 'The flagship artwork for Velvet Studio. A deep dive into illustrative storytelling and motion.',
      image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000',
      span: 'col-span-12 lg:col-span-8',
      color: 'bg-gradient-a'
    },
    {
      id: 2,
      title: 'IDENTITY DESIGN',
      description: 'Brand identity design and strategy for high-end boutique labels.',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000',
      span: 'col-span-12 lg:col-span-4',
      color: 'bg-gradient-b'
    },
    {
      id: 3,
      title: 'VISUAL SERIES',
      description: 'A photography collection capturing the hidden geometries of the urban landscape.',
      image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1000',
      span: 'col-span-12 lg:col-span-4',
      color: 'bg-gradient-c'
    },
    {
      id: 4,
      title: 'APP INTERFACE',
      description: 'Full-stack application design focusing on user flow and performance-driven UI.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
      span: 'col-span-12 lg:col-span-8',
      color: 'bg-gradient-d'
    },
    {
      id: 5,
      title: 'CHARACTER DESIGN',
      description: 'Character conceptualization and illustration for narrative-driven projects.',
      image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=1000',
      span: 'col-span-12 lg:col-span-6',
      color: 'bg-gradient-e'
    },
    {
      id: 6,
      title: 'ART SERIES',
      description: 'Mixed media exploration pushing the boundaries of digital and organic art.',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1000',
      span: 'col-span-12 lg:col-span-6',
      color: 'bg-gradient-f'
    }
  ];

  return (
    <section id="work" className="py-28 px-8 md:px-12 bg-dark-bg transition-colors duration-500 light-mode:bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-10 mb-4 opacity-20 light-mode:opacity-40">
             <div className="h-px w-20 bg-manga-cyan" />
             <div className="font-bebas tracking-[10px] text-manga-cyan">SELECTED MISSIONS</div>
             <div className="h-px w-20 bg-manga-cyan" />
          </div>
          <h2 className="font-display font-black text-8xl text-white light-mode:text-ink uppercase">
            <TextReveal text="THE" /> <TextReveal text="ARCHIVES" className="text-manga-cyan" delay={0.2} />
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-5 md:gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              className={`relative overflow-hidden border-2 border-white/5 group ${project.span} cursor-none bg-dark-bg`}
              style={{ transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              <div className={`h-80 flex items-center justify-center relative overflow-hidden transition-all ${project.color}`}>
                <div className="absolute inset-0 screentone opacity-20" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                
                <div className="z-10 group-hover:scale-125 transition-transform duration-700 w-full h-full flex items-center justify-center">
                  {project.image.startsWith('http') ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="text-8xl filter drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">{project.image}</span>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-12 text-center">
                   <div className="font-tomorrow font-black tracking-[5px] text-manga-cyan text-sm mb-4">VIEW PROJECT</div>
                   <div className="font-tomorrow font-black text-3xl text-white mb-2">{project.title}</div>
                   <Zap className="w-8 h-8 text-manga-cyan mt-4 animate-bounce" />
                </div>
              </div>
              
              <div className="p-6 bg-dark-bg border-t border-white/5 flex justify-between items-center group-hover:bg-dark-surface transition-colors">
                <div>
                   <div className="font-tomorrow font-black tracking-[1px] text-manga-cyan text-lg mb-1">{project.title}</div>
                   <div className="font-tomorrow text-[10px] font-bold text-white/40 light-mode:text-ink/60 uppercase tracking-widest">{project.description.slice(0, 40)}...</div>
                </div>
                <div className="w-10 h-10 border border-manga-cyan/30 flex items-center justify-center group-hover:bg-manga-cyan group-hover:text-black transition-all">
                  <Star className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const ServicesProcess = () => {
  return (
    <section id="services" className="py-28 px-8 md:px-12 bg-dark-surface transition-colors duration-500 light-mode:bg-paper/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(234,179,8,0.03)_1px,_transparent_1px)] bg-[length:20px_20px] opacity-40" />
      <div className="absolute right-[-50px] top-40 font-bangers text-[180px] text-white/[0.02] pointer-events-none uppercase tracking-widest leading-none">SVC</div>
      
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 relative z-10">
        <div>
          <h2 className="font-display font-black text-6xl mb-12 uppercase text-white light-mode:text-ink">
            <TextReveal text="TACTICAL" /> <span className="text-manga-purple"><TextReveal text="SERVICES" delay={0.3} /></span>
          </h2>
          <div className="grid gap-6">
            {[
              { icon: <Monitor className="w-6 h-6" />, title: 'UI/UX DESIGN', desc: 'Clean, intuitive, user-friendly interfaces based on real user behavior. Wireframing, prototyping, user flow optimization, and mobile-first responsive design.' },
              { icon: <PenTool className="w-6 h-6" />, title: 'FRONTEND DEVELOPMENT', desc: 'Transforming designs into functional, responsive websites using HTML, CSS, and JavaScript — performance-focused, clean, and scalable code.' },
              { icon: <Zap className="w-6 h-6" />, title: 'CONTENT CREATION & PROMOTION', desc: 'Social media creatives, content strategy, audience engagement techniques, and brand-focused storytelling that attracts and converts.' },
              { icon: <Palette className="w-6 h-6" />, title: 'VISUAL ARTS & CREATIVE DESIGN', desc: 'Posters, banners, digital art, branding elements, and creative concept designs — visuals that communicate and stand out.' }
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10 }}
                className="p-6 border-l-4 border-manga-purple bg-dark-bg light-mode:bg-white shadow-xl transition-all"
              >
                <div className="text-manga-purple mb-3">{s.icon}</div>
                <h4 className="font-display font-bold text-2xl text-manga-purple mb-2">{s.title}</h4>
                <p className="text-sm text-white/60 light-mode:text-ink/80">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="process">
          <h2 className="font-display font-black text-6xl mb-12 uppercase text-white light-mode:text-ink">
            <TextReveal text="THE" /> <span className="text-manga-purple"><TextReveal text="PROCESS" delay={0.2} /></span>
          </h2>
          {[
            { num: '01', color: 'var(--color-manga-purple)', title: 'UNDERSTANDING YOUR VISION', desc: 'I take time to understand your goals, audience, and purpose before anything else.' },
            { num: '02', color: 'var(--color-manga-cyan)', title: 'RESEARCH & STRATEGY', desc: 'I study your niche and competitors to plan the most effective approach.' },
            { num: '03', color: 'var(--color-manga-orange)', title: 'DESIGN & EXECUTION', desc: 'Designs that are both visually strong and highly user-friendly — built to work.' },
            { num: '04', color: 'var(--color-manga-pink)', title: 'FEEDBACK & REFINEMENT', desc: 'I improve the work based on your feedback until every detail is perfect.' },
            { num: '05', color: 'var(--color-manga-yellow)', title: 'FINAL DELIVERY & SUPPORT', desc: 'You get polished results, with continued support for future improvements.' }
          ].map((step, i) => (
            <motion.div
              key={i}
              className="p-8 mb-5 bg-dark-surface light-mode:bg-white border-l-4 relative overflow-hidden"
              style={{ borderColor: step.color }}
            >
              <div className="absolute top-4 right-6 font-display font-black text-5xl opacity-40 pointer-events-none" style={{ color: step.color }}>{step.num}</div>
              <h4 className="font-display font-bold text-2xl mb-1 text-white light-mode:text-ink">{step.title}</h4>
              <p className="text-sm text-white/60 light-mode:text-ink/80">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 px-8 md:px-12 bg-dark-bg transition-colors duration-500 light-mode:bg-paper">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="text-left">
          <h2 className="font-display font-black text-7xl leading-[0.9] uppercase text-white light-mode:text-ink mb-6">
            GOT A <span className="text-manga-pink">PROJECT</span><br />IN MIND?
          </h2>
          <p className="text-xl text-white/60 light-mode:text-ink/80 mb-10">
            I'm open to freelance work, collaborations, and new creative challenges. Let's build something worth talking about.
          </p>
          
          <div className="space-y-4">
            {[
              { label: 'vigneshss2006@gmail.com', href: 'mailto:vigneshss2006@gmail.com', icon: <Mail className="w-5 h-5" /> },
              { label: '@kowboii_duh — Instagram', href: 'https://www.instagram.com/kowboii_duh/', icon: <Instagram className="w-5 h-5" /> },
              { label: 'VelvetStudioCreator — Pinterest', href: 'https://pinterest.com/VelvetStudioCreator', icon: <PinterestIcon className="w-5 h-5" /> },
              { label: 'Vignesh Shankar — LinkedIn', href: 'https://www.linkedin.com/in/vickyysha08/', icon: <Linkedin className="w-5 h-5" /> },
              { label: 'Chennai, India 📍', href: '#', icon: <MapPin className="w-5 h-5" /> }
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                whileHover={{ x: 10, color: 'var(--color-manga-pink)' }}
                className="flex items-center gap-4 py-3 border-b border-white/5 text-[#F5F0FF]/60 light-mode:text-ink/75 font-semibold tracking-wider transition-colors group"
              >
                <div className="text-manga-pink group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="bg-black/30 p-8 md:p-12 border-[3px] border-manga-pink manga-shadow-pink min-h-[400px] flex items-center justify-center overflow-hidden relative"
        >

          <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="space-y-6 w-full relative z-10" 
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="YOUR NAME"
                    required
                    className="bg-transparent border-2 border-white/10 p-4 text-white light-mode:text-ink font-sans outline-none focus:border-manga-pink focus:ring-4 focus:ring-manga-pink/30 transition-all w-full"
                  />
                  <input
                    type="email"
                    placeholder="YOUR EMAIL"
                    required
                    className="bg-transparent border-2 border-white/10 p-4 text-white light-mode:text-ink font-sans outline-none focus:border-manga-pink focus:ring-4 focus:ring-manga-pink/30 transition-all w-full"
                  />
                </div>
                <textarea
                  placeholder="THE BRIEF..."
                  required
                  rows={5}
                  className="w-full bg-transparent border-2 border-white/10 p-4 text-white light-mode:text-ink font-sans outline-none focus:border-manga-pink focus:ring-4 focus:ring-manga-pink/30 transition-all resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-manga-pink text-white py-5 font-display font-black text-2xl tracking-tighter hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  TRANSMIT SIGNAL ↗
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="text-center relative z-10"
              >
                <div className="text-white font-display font-black text-6xl mb-4 tracking-tighter uppercase">
                  SIGNAL <span className="text-manga-pink">TRANSMITTED</span>
                </div>
                <div className="font-marker text-manga-yellow text-2xl mb-8">
                  Check your inbox for a transmission...
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 border-2 border-white text-white font-display font-bold tracking-tight hover:bg-white hover:text-black transition-colors"
                >
                  SEND ANOTHER SIGNAL
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 bg-dark-bg border-t border-white/5 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden transition-colors duration-500 light-mode:bg-white text-center md:text-left">
    <div className="font-tomorrow font-black text-3xl text-manga-orange tracking-[5px]">
      <span className="text-manga-pink">VELVET</span>STUDIO
    </div>
    <div className="text-[10px] font-bold tracking-[3px] text-white/20 light-mode:text-ink/50 uppercase leading-relaxed">
      © 2025 VIGNESH S — VELVET STUDIO — CHENNAI, INDIA — ALL RIGHTS RESERVED
    </div>
    <div className="flex gap-6 items-center">
       <div className="w-2 h-2 rounded-full bg-manga-cyan animate-pulse shadow-[0_0_10px_#06B6D4]" />
       <div className="font-bebas tracking-[2px] text-white/20 light-mode:text-ink/40 text-xs uppercase">ONLINE AND READY</div>
    </div>
  </footer>
);


// --- Particle Background (Lightweight CSS-only version) ---
const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle scanline overlay — pure CSS, no JS animation */}
      <div className="absolute inset-0 opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,107,53,0.08)_2px,rgba(255,107,53,0.08)_4px)]" />

      {/* Slow-moving grid — CSS animation instead of Framer Motion */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.03] light-mode:opacity-[0.05] animate-[gridDrift_60s_linear_infinite]" />

      {/* Ambient color blobs — CSS transforms are GPU-accelerated */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-manga-orange/10 blur-[150px] rounded-full animate-[blobPulse_20s_ease-in-out_infinite]" />
      <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] bg-manga-purple/10 blur-[180px] rounded-full animate-[blobPulse_25s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-manga-cyan/5 blur-[200px] rounded-full animate-[blobDrift_30s_linear_infinite]" />
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const [activeColor, setActiveColor] = useState('#FF6B35');

  // Handle Loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle Mode Switch
  const toggleMode = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle('light-mode');
  };


  // Section Color Awareness
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const color = (e.target as HTMLElement).dataset.cur;
            if (color) setActiveColor(color);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section[data-cur]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative cursor-none select-none">
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      <Navigation isLightMode={isLightMode} toggleMode={toggleMode} />
      <FloatingBackground />
      <CustomCursor color={activeColor} />

      <main>
        <section data-cur="#FF6B35">
          <Hero />
        </section>
        <Ticker />
        <section data-cur="#EAB308">
          <AntigravityStudio />
        </section>

        <StorySection />

        <section data-cur="#A855F7">
          <About />
        </section>
        
        <Stats />

        <section data-cur="#06B6D4">
          <Archives />
        </section>
        <section data-cur="#A855F7">
          <ServicesProcess />
        </section>
        <section data-cur="#EC4899">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}
