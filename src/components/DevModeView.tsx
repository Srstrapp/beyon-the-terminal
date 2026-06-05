/* eslint-disable react/jsx-no-comment-textnodes, react/no-unescaped-entities */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/lib/context";
import { FileText, Terminal, History, FolderOpen, Play, X } from "lucide-react";
import { EasterEggOverlay } from "./EasterEggs";
import { useTerminalCommands } from "./useTerminalCommands";

type Tab = "johnny" | "skills" | "experience" | "projects";

export function DevModeView() {
  const { content, language } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>("johnny");
  const [openTabs, setOpenTabs] = useState<Tab[]>(["johnny", "skills", "experience", "projects"]);

  // Terminal state and commands logic extracted to custom hook
  const { inputValue, setInputValue, commandHistory, handleCommand, nyanCats, snoopDoggs } = useTerminalCommands();
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const cv = content.cv_info;

  const handleTabClick = (tab: Tab) => {
    if (!openTabs.includes(tab)) {
      setOpenTabs([...openTabs, tab]);
    }
    setActiveTab(tab);
  };

  const closeTab = (e: React.MouseEvent, tab: Tab) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== tab);
    setOpenTabs(newTabs);
    if (activeTab === tab) {
      setActiveTab(newTabs[0] || "johnny"); // fallback
    }
  };

  const fileIcons = {
    johnny: <FileText className="w-[18px] h-[18px]" />,
    skills: <Terminal className="w-[18px] h-[18px]" />,
    experience: <History className="w-[18px] h-[18px]" />,
    projects: <FolderOpen className="w-[18px] h-[18px]" />,
  };

  const fileNames = {
    johnny: "Johnny.js",
    skills: "Skills.json",
    experience: "Experience.log",
    projects: "Projects.json",
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  return (
    <div className="flex h-screen w-full bg-surface-container-lowest overflow-hidden">
      {/* Side Navigation */}
      <nav className="hidden md:flex flex-col w-64 border-r border-outline-variant bg-surface-container-lowest py-4 z-40">
        <div className="px-6 mb-8">
          <h1 className="font-code-label text-code-label uppercase tracking-widest text-primary neon-glow">SRC</h1>
          <p className="font-code-body text-code-body text-secondary-fixed-dim text-sm opacity-70">~/portfolio/root</p>
        </div>
        <div className="flex flex-col gap-1 px-2 flex-grow">
          {(Object.keys(fileNames) as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`file-btn flex items-center gap-3 px-4 py-2 w-full text-left font-code-label text-code-label transition-colors ${
                activeTab === tab
                  ? "bg-secondary-container text-on-secondary-container border-l-2 border-primary-fixed-dim active"
                  : "text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              {fileIcons[tab]}
              {fileNames[tab]}
            </button>
          ))}
        </div>
        <div className="px-6 mt-auto">
          <button className="w-full py-2 border border-outline-variant text-primary font-code-label text-code-label hover:bg-primary hover:text-surface-container-lowest transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(179,255,179,0.3)]">
            <Play className="w-4 h-4" />
            npm run deploy
          </button>
        </div>
      </nav>

      {/* Main Editor Area */}
      <main className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
        {/* Easter Eggs Overlay */}
        <EasterEggOverlay nyanCats={nyanCats} snoopDoggs={snoopDoggs} />
        
        {/* Editor Tabs */}
        <div className="h-10 border-b border-outline-variant flex bg-surface-container-low w-full overflow-x-auto custom-scrollbar">
          {openTabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab px-4 py-2 flex items-center gap-2 font-code-label text-code-label min-w-max cursor-pointer transition-colors ${
                activeTab === tab
                  ? "bg-background border-r border-outline-variant border-t-2 border-t-primary text-primary active"
                  : "bg-surface-container-low border-r border-outline-variant text-on-surface-variant opacity-60 hover:opacity-100"
              }`}
            >
              {fileIcons[tab]}
              {fileNames[tab]}
              <X 
                onClick={(e) => closeTab(e, tab)}
                className="w-3.5 h-3.5 hover:text-error ml-2 rounded-full hover:bg-surface-variant transition-colors" 
              />
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 font-code-body text-code-body text-on-surface code-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "johnny" && (
                <div>
                  <div className="terminal-line"><span className="text-outline-variant italic">// ==========================================</span></div>
                  <div className="terminal-line"><span className="text-outline-variant italic">// Nombre: {cv.name}</span></div>
                  <div className="terminal-line"><span className="text-outline-variant italic">// Rol: {cv.role}</span></div>
                  <div className="terminal-line"><span className="text-outline-variant italic">// ==========================================</span></div>
                  <div className="terminal-line"><br/></div>
                  <div className="terminal-line"><span className="text-secondary">const</span> <span className="text-primary-fixed">developer</span> <span className="text-on-surface">=</span> {"{"}</div>
                  <div className="terminal-line pl-8"><span className="text-secondary-fixed-dim">name:</span> <span className="text-tertiary-container">"{cv.name}"</span>,</div>
                  <div className="terminal-line pl-8"><span className="text-secondary-fixed-dim">role:</span> <span className="text-tertiary-container">"{cv.role}"</span>,</div>
                  <div className="terminal-line pl-8"><span className="text-secondary-fixed-dim">philosophy:</span> <span className="text-tertiary-container">"{cv.philosophy}"</span></div>
                  <div className="terminal-line">{"};"}</div>
                  <div className="terminal-line"><br/></div>
                  <div className="terminal-line"><span className="text-outline-variant italic">// Proyectos Destacados</span></div>
                  {cv.projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                      <div className="terminal-line"><span className="text-secondary">function</span> <span className="text-secondary-container font-bold">{proj.name.replace(/\s+/g, '')}</span>() {"{"}</div>
                      <div className="terminal-line pl-8"><span className="text-secondary">return</span> {"{"}</div>
                      <div className="terminal-line pl-16"><span className="text-secondary-fixed-dim">desc:</span> <span className="text-tertiary-container">"{proj.desc}"</span></div>
                      <div className="terminal-line pl-8">{"};"}</div>
                      <div className="terminal-line">{"}"}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "skills" && (
                <div>
                  <div className="terminal-line"><span className="text-outline-variant italic">// Skills.json</span></div>
                  <div className="terminal-line">{"{"}</div>
                  <div className="terminal-line pl-8"><span className="text-secondary-fixed-dim">"techStack"</span>: [</div>
                  {cv.experience.techStack.split(", ").map((tech, i, arr) => (
                    <div key={tech} className="terminal-line pl-16">
                      <span className="text-tertiary-container">"{tech}"</span>{i < arr.length - 1 ? "," : ""}
                    </div>
                  ))}
                  <div className="terminal-line pl-8">],</div>
                  <div className="terminal-line pl-8"><span className="text-secondary-fixed-dim">"education"</span>: [</div>
                  {cv.education.map((edu, i, arr) => (
                    <div key={i} className="terminal-line pl-16">
                      <span className="text-tertiary-container">"{edu}"</span>{i < arr.length - 1 ? "," : ""}
                    </div>
                  ))}
                  <div className="terminal-line pl-8">]</div>
                  <div className="terminal-line">{"}"}</div>
                </div>
              )}

              {activeTab === "experience" && (
                <div>
                  <div className="terminal-line"><span className="text-outline-variant italic"># Experience.log</span></div>
                  <div className="terminal-line"><span className="text-secondary-fixed-dim">Current:</span> <span className="text-on-surface">{cv.experience.company} - {cv.experience.position}</span></div>
                  <div className="terminal-line"><br/></div>
                  <div className="terminal-line"><span className="text-outline-variant italic"># Responsibilities</span></div>
                  {cv.experience.responsibilities.map((resp, i) => (
                    <div key={i} className="terminal-line"><span className="text-on-surface">- {resp}</span></div>
                  ))}
                </div>
              )}

              {activeTab === "projects" && (
                <div>
                  <div className="terminal-line">{"{"}</div>
                  <div className="terminal-line pl-8"><span className="text-secondary-fixed-dim">"projects"</span>: [</div>
                  {cv.projects.map((proj, i, arr) => (
                    <div key={proj.id}>
                      <div className="terminal-line pl-16">{"{"}</div>
                      <div className="terminal-line pl-24"><span className="text-secondary-fixed-dim">"id"</span>: <span className="text-tertiary-container">"{proj.id}"</span>,</div>
                      <div className="terminal-line pl-24"><span className="text-secondary-fixed-dim">"name"</span>: <span className="text-tertiary-container">"{proj.name}"</span>,</div>
                      <div className="terminal-line pl-24"><span className="text-secondary-fixed-dim">"desc"</span>: <span className="text-tertiary-container">"{proj.desc}"</span></div>
                      <div className="terminal-line pl-16">{"}"}{i < arr.length - 1 ? "," : ""}</div>
                    </div>
                  ))}
                  <div className="terminal-line pl-8">]</div>
                  <div className="terminal-line">{"}"}</div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Terminal Log */}
        <div className="h-48 border-t border-outline-variant bg-surface-container-lowest p-4 font-code-label text-code-label overflow-y-auto">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="text-primary neon-glow">TERMINAL</span>
            <span className="text-outline-variant">|</span>
            <span>Git Log</span>
          </div>
          {/* Initial Static History */}
          {commandHistory.length === 0 && (
            <>
              <div className="text-secondary-fixed-dim">
                <span className="text-primary-container">johnny@macbook</span> <span className="text-on-surface">~/portfolio</span> $ git log --oneline
              </div>
              <div className="text-on-surface-variant mt-1">
                <span className="text-error">a1b2c3d</span> (HEAD -&gt; main) update: {cv.experience.company} - {cv.experience.position}
              </div>
              <div className="text-on-surface-variant">
                <span className="text-error">e4f5g6h</span> feat: Added projects {cv.projects.map(p => p.name).join(', ')}
              </div>
              <div className="text-on-surface-variant mb-4">
                <span className="text-error">i7j8k9l</span> fix: Optimizing queries and full stack workflow
              </div>
            </>
          )}

          {/* Dynamic History */}
          {commandHistory.map((item, idx) => (
            <div key={idx} className="mb-2">
              <div className="text-secondary-fixed-dim">
                <span className="text-primary-container">johnny@macbook</span> <span className="text-on-surface">~/portfolio</span> $ {item.cmd}
              </div>
              {item.output && <div className="text-on-surface-variant mt-1">{item.output}</div>}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="text-secondary-fixed-dim mt-2 flex items-center">
            <span className="text-primary-container shrink-0">johnny@macbook</span> <span className="text-on-surface mx-2 shrink-0">~/portfolio</span> $ 
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none text-on-surface flex-1 ml-2 font-code-label focus:ring-0"
              spellCheck={false}
              autoFocus
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </main>
    </div>
  );
}
