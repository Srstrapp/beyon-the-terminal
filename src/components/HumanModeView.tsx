"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Disc, Dumbbell, Map, Gamepad2, Terminal, Send } from "lucide-react";
import { useAppContext } from "@/lib/context";

// Helper component for editorial sections with Bento-style cards
const EditorialSection = ({ index, title, desc, icon: Icon, align = "left", imageSrc, gradient }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const cardY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  // Fade in much earlier to avoid blank space
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.3, 1, 1, 0.3]);

  const isLeft = align === "left";

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className={`min-h-[80vh] flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24 relative py-16 border-t border-black/10`}
    >
      <div className={`absolute top-12 ${isLeft ? 'right-0' : 'left-0'} text-[12rem] md:text-[20rem] font-playfair font-black text-black/[0.02] select-none pointer-events-none -z-10 leading-none`}>
        0{index + 1}
      </div>
      
      {/* Bento Card Visual Container */}
      <motion.div 
        style={{ y: cardY }}
        className={`w-full md:w-1/2 h-[60vh] md:h-[70vh] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl ${gradient}`}
      >
        {/* Subtle noise texture over gradient */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Unsplash Image */}
        <img 
          src={imageSrc} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
        />

        {/* Top Right Icon from original Bento */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12">
          {index === 0 && (
             <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
               <div className="w-4 h-4 rounded-full bg-white/70" />
             </div>
          )}
          {index !== 0 && (
            <Icon className="w-10 h-10 text-white/50" strokeWidth={1.5} />
          )}
        </div>

        {/* Badge from original Bento */}
        <div className="absolute bottom-12 left-12">
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/80 font-ui-label text-[10px] uppercase tracking-widest backdrop-blur-md border border-white/10">
            Passion
          </span>
        </div>
      </motion.div>

      {/* Text Container */}
      <motion.div style={{ y }} className={`w-full md:w-1/2 flex flex-col ${isLeft ? "items-start" : "items-start"}`}>
        <h2 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter text-[#111] leading-[0.9]">
          {title}
        </h2>
        <p className="font-ui-sans text-lg md:text-xl text-[#444] leading-relaxed max-w-xl font-light">
          {desc}
        </p>
      </motion.div>
    </motion.div>
  );
};

export function HumanModeView() {
  const { content, language } = useAppContext();
  const h = content.human;
  const cv = content.cv_info;
  
  const containerRef = useRef(null);

  const icons = [Disc, Dumbbell, Map, Gamepad2];

  const placeholders = [
    "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200", 
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const gradients = [
    "bg-gradient-to-br from-[#3D2314] to-[#1A100C]", // Gods Luck (Brown)
    "bg-gradient-to-br from-[#161C24] to-[#0A0D14]", // Cocina (Dark Blue)
    "bg-gradient-to-br from-[#004225] to-[#002A18]", // Gym/Pitch (Emerald)
    "bg-gradient-to-br from-[#2A2A2A] to-[#111111]", // Gaming (Dark Grey)
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F7F5F0] text-[#111] pb-0 font-ui-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* Editorial Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full flex justify-between items-center px-6 md:px-12 lg:px-16 py-8 md:py-12 fixed top-0 z-40 bg-gradient-to-b from-[#F7F5F0] via-[#F7F5F0]/90 to-transparent backdrop-blur-sm"
      >
        <div 
          onClick={() => scrollTo('vida')}
          className="font-playfair text-4xl font-black tracking-tighter text-[#111] md:w-[240px] lg:w-[280px] cursor-pointer"
        >
          Jhon Mercado.
        </div>
        <div className="hidden md:flex flex-1 justify-center gap-12 font-ui-label text-[11px] uppercase tracking-[0.3em] text-[#111] font-semibold">
          <a onClick={() => scrollTo('vida')} className="hover:opacity-50 transition-opacity cursor-pointer">
            {language === "es" ? "Vida" : "Life"}
          </a>
          <a onClick={() => scrollTo('trabajo')} className="hover:opacity-50 transition-opacity cursor-pointer">
            {language === "es" ? "Trabajo" : "Work"}
          </a>
          <a onClick={() => scrollTo('contacto')} className="hover:opacity-50 transition-opacity cursor-pointer">
            {language === "es" ? "Contacto" : "Contact"}
          </a>
        </div>
        {/* Spacer for ModeToggle */}
        <div className="hidden md:block md:w-[240px] lg:w-[280px]"></div>
      </motion.nav>

      <main className="px-6 md:px-16 w-full max-w-[1600px] mx-auto pt-24">
        
        {/* --- SECTION: VIDA --- */}
        <section id="vida">
          <div className="min-h-[85vh] flex flex-col md:flex-row items-center gap-12 relative pt-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="w-full md:w-1/2 z-10"
            >
              <h1 className="font-playfair text-6xl md:text-[7rem] lg:text-[9rem] leading-[0.85] tracking-tighter text-[#111] relative z-10">
                {h.hero.replace('.', '')}
                <span className="block italic font-light text-[#555] mt-6 text-4xl md:text-6xl lg:text-7xl">
                  {h.heroSub}
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              className="w-full md:w-1/2 h-[60vh] md:h-[85vh] relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
                alt="Johnny" 
                className="w-full h-full object-cover grayscale opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5F0] via-transparent to-transparent md:bg-gradient-to-l" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-4 left-0 right-0 flex justify-center z-20"
            >
              <ArrowDown className="w-6 h-6 text-black/30 animate-bounce cursor-pointer" onClick={() => scrollTo('bio')} />
            </motion.div>
          </div>

          <motion.div 
            id="bio"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start max-w-6xl mx-auto"
          >
            <div className="md:col-span-6">
              <p className="font-ui-sans text-xl md:text-3xl leading-relaxed font-light text-[#333] first-letter:text-8xl first-letter:font-playfair first-letter:mr-4 first-letter:float-left first-letter:text-black">
                {h.bio.split('.')[0]}. {h.bio.split('.')[1]}.
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-8 border-l border-black/10 pl-8 md:pl-12">
              <p className="font-ui-sans text-base md:text-lg text-[#666] leading-loose">
                {h.bio.split('.').slice(2, -1).join('.').trim()}.
              </p>
            </div>
          </motion.div>

          <div className="py-20 flex justify-center text-center">
            <h3 className="font-playfair italic text-3xl md:text-6xl max-w-5xl leading-tight text-[#111]">
              "{h.pullQuote}"
            </h3>
          </div>

          <div className="mt-12 flex flex-col gap-12">
            {h.hobbies.map((hobby: any, index: number) => (
              <EditorialSection 
                key={index} 
                index={index}
                title={hobby.title} 
                desc={hobby.desc}
                icon={icons[index % icons.length]}
                align={index % 2 === 0 ? "left" : "right"}
                imageSrc={placeholders[index % placeholders.length]}
                gradient={gradients[index % gradients.length]}
              />
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-32 pt-24 border-t border-black/10 grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-5">
              <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-[#111]">
                {language === "es" ? "Educación." : "Education."}
              </h3>
              <div className="space-y-6">
                {cv.education.map((ed: string, idx: number) => (
                  <p key={idx} className="font-ui-sans text-lg text-[#666] leading-relaxed">
                    {ed}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-6 md:col-start-7">
              <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-[#111]">
                {language === "es" ? "Habilidades Humanas." : "Human Skills."}
              </h3>
              <div className="flex flex-wrap gap-4">
                {h.skills.map((skill: string, idx: number) => (
                  <span 
                    key={idx} 
                    className="px-6 py-3 border border-black/20 rounded-full font-ui-label text-xs uppercase tracking-widest text-[#333] hover:bg-black hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- SECTION: TRABAJO --- */}
        <section id="trabajo" className="min-h-screen py-32 border-t border-black/10 mt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5 relative">
              <div className="sticky top-40">
                <div className="mb-8 p-4 rounded-full border border-black/20 bg-black/5 w-max">
                  <Terminal className="w-8 h-8 text-black/70" strokeWidth={1} />
                </div>
                <h2 className="font-playfair text-6xl md:text-[7rem] font-bold tracking-tighter text-[#111] leading-[0.85] mb-6">
                  The <br/> <span className="italic font-light">Architect.</span>
                </h2>
                <p className="font-ui-sans text-xl text-[#666] max-w-md font-light leading-relaxed">
                  {cv.philosophy}
                </p>
                <div className="mt-12 space-y-6">
                  <div>
                    <h4 className="font-ui-label text-xs uppercase tracking-[0.2em] text-[#888] mb-2">Role</h4>
                    <p className="font-ui-sans text-lg text-[#111] font-medium">{cv.role}</p>
                  </div>
                  <div>
                    <h4 className="font-ui-label text-xs uppercase tracking-[0.2em] text-[#888] mb-2">Current</h4>
                    <p className="font-ui-sans text-lg text-[#111] font-medium">{cv.experience.company}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 md:col-start-7 flex flex-col gap-24 mt-12 md:mt-0">
              {cv.past_jobs.map((job: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.8 }}
                  className="group"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h3 className="font-playfair text-4xl md:text-5xl font-bold text-[#111]">
                      {job.company}
                    </h3>
                    <span className="font-ui-label text-xs uppercase tracking-[0.2em] text-[#888] mt-4 md:mt-0">
                      {job.years}
                    </span>
                  </div>
                  <h4 className="font-ui-sans text-xl font-medium text-[#333] mb-4">
                    {job.role}
                  </h4>
                  <p className="font-ui-sans text-[#555] text-lg leading-relaxed font-light">
                    {job.desc}
                  </p>
                  <div className="mt-8 h-[1px] w-full bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION: CONTACTO --- */}
        <section id="contacto" className="min-h-[80vh] py-32 border-t border-black/10 mt-24 flex flex-col justify-center items-center text-center">
          <div className="mb-12 p-6 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">
            <Send className="w-10 h-10" strokeWidth={1} />
          </div>
          <h2 className="font-playfair text-7xl md:text-[9rem] font-black tracking-tighter text-[#111] leading-none mb-8 hover:italic transition-all duration-500 cursor-pointer">
            Let's Talk.
          </h2>
          <p className="font-ui-sans text-2xl text-[#666] max-w-2xl font-light mb-16">
            {h.contactText}
          </p>
          <a 
            href="mailto:jhonfrank34@gmail.com" 
            className="group relative inline-flex items-center gap-6 font-ui-label text-sm uppercase tracking-[0.3em] text-[#111] mb-12"
          >
            <span className="relative z-10 pb-2 border-b-2 border-black group-hover:border-transparent transition-colors">
              Say Hello
            </span>
            <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-10 h-[calc(100%+16px)] -mt-2 -mx-4 px-4" />
            <span className="group-hover:text-white transition-colors duration-500 relative z-10">
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </a>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full px-6 md:px-16 py-16 border-t border-black/10 flex flex-col md:flex-row justify-between items-center bg-[#111] text-white">
        <div className="font-playfair text-2xl font-bold tracking-tighter">Johnny.</div>
        <p className="font-ui-sans text-xs uppercase tracking-widest text-[#888] mt-4 md:mt-0">
          © 2026 Beyond the Terminal
        </p>
        <div className="flex gap-8 mt-4 md:mt-0 font-ui-label text-xs uppercase tracking-[0.2em] text-[#CCC]">
          <a className="hover:text-white transition-colors cursor-pointer">Instagram</a>
          <a className="hover:text-white transition-colors cursor-pointer">LinkedIn</a>
          <a className="hover:text-white transition-colors cursor-pointer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
