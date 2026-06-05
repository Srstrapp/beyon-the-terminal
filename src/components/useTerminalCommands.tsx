import { useState } from "react";
import { useAppContext } from "@/lib/context";
import { useEasterEggs } from "./EasterEggs";

export function useTerminalCommands() {
  const { content, language } = useAppContext();
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<{cmd: string, output: React.ReactNode}[]>([]);
  const { nyanCats, snoopDoggs, triggerNyan, triggerSnoop } = useEasterEggs();

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.trim().toLowerCase();
      let output: React.ReactNode = null;
      
      if (cmd === 'nyan') {
        output = <span className="text-primary neon-glow">Summoning Nyan Cat... 🐱🌈</span>;
        triggerNyan();
      } else if (cmd === 'snoop') {
        output = <span className="text-primary neon-glow">Drop it like it's hot... 🌿💨</span>;
        triggerSnoop();
      } else if (cmd === 'clear') {
        setCommandHistory([]);
        setInputValue("");
        return;
      } else if (cmd === 'ls') {
        output = <span className="text-secondary">Johnny.js Skills.json Experience.log Projects.json</span>;
      } else if (cmd === 'whoami') {
        const msg = language === 'es' ? "¿quién eres tú? ¡no te conozco! 🕵️‍♂️" : "who are you? I don't know you! 🕵️‍♂️";
        output = <span className="text-error font-bold">{msg}</span>;
      } else if (cmd === 'motivate') {
        // @ts-ignore
        const list = content.quotes || [];
        const randomQuote = list.length > 0 ? list[Math.floor(Math.random() * list.length)] : "Error 404: Motivation not found.";
        output = <span className="text-secondary italic">"{randomQuote}"</span>;
      } else if (cmd === 'escuchando' || cmd === 'playing') {
        const tracks = [
          { id: '5aF2hoUHaU9GainPXIZDMV', name: "Lil Supa' - 光 LUZ" },
          { id: '6psVBDz2XlXdfInmWd3pic', name: "Estresado" },
          { id: '6v65QeSN24Bbk7QWQNASdq', name: "A Veces" },
          { id: '4Dbjp9NwMitzE8fxFrDJRD', name: "50 Cent - In Da Club" },
          { id: '5iTyKHHx9efbjrOXPP48gG', name: "Got My Mind Made Up - Method Man" },
          { id: '5Tbpp3OLLClPJF8t1DmrFD', name: "Dr. Dre, Snoop Dogg - Nuthin' But A \"G\" Thang" }
        ];
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        output = (
          <div className="mt-2 mb-2 w-full max-w-md">
            <span className="text-primary-container block mb-2">♪ Now playing: {randomTrack.name}</span>
            <iframe 
              src={`https://open.spotify.com/embed/track/${randomTrack.id}?utm_source=generator&theme=0`}
              width="80%" 
              height="152" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="rounded-xl shadow-lg"
            ></iframe>
          </div>
        );
      } else if (cmd === 'help') {
        output = (
          <div className="text-on-surface-variant flex flex-col gap-1">
            <span className="text-primary font-bold">Available commands:</span>
            <span><span className="text-tertiary-container">help</span> - Show this message</span>
            <span><span className="text-tertiary-container">ls</span> - List files</span>
            <span><span className="text-tertiary-container">whoami</span> - Display current user</span>
            <span><span className="text-tertiary-container">clear</span> - Clear terminal</span>
            <span><span className="text-tertiary-container">motivate</span> - Get a random motivational quote</span>
            <span><span className="text-tertiary-container">escuchando</span> - See what I'm listening to</span>
            <span><span className="text-tertiary-container">nyan</span> - ???</span>
            <span><span className="text-tertiary-container">snoop</span> - Drop it like it's hot</span>
          </div>
        );
      } else if (cmd !== '') {
        output = (
          <div className="flex flex-col gap-1">
            <span className="text-error">bash: command not found: {cmd}</span>
            <span className="text-on-surface-variant mt-1">Available commands: <span className="text-tertiary-container">help, ls, whoami, clear, motivate, escuchando, nyan, snoop</span></span>
          </div>
        );
      }
      
      if (cmd !== '') {
        setCommandHistory(prev => [...prev, { cmd: inputValue, output }]);
      }
      setInputValue("");
    }
  };

  return {
    inputValue,
    setInputValue,
    commandHistory,
    handleCommand,
    nyanCats,
    snoopDoggs
  };
}
