import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function useEasterEggs() {
  const [nyanCats, setNyanCats] = useState<{id: number}[]>([]);
  const [snoopDoggs, setSnoopDoggs] = useState<{id: number}[]>([]);

  const triggerNyan = () => {
    const id = Date.now();
    setNyanCats(prev => [...prev, { id }]);
    setTimeout(() => {
      setNyanCats(prev => prev.filter(c => c.id !== id));
    }, 4000);
  };

  const triggerSnoop = () => {
    const id = Date.now();
    setSnoopDoggs(prev => [...prev, { id }]);
    setTimeout(() => {
      setSnoopDoggs(prev => prev.filter(c => c.id !== id));
    }, 6000); // Snoop takes his time, 6 seconds
  };

  return {
    nyanCats,
    snoopDoggs,
    triggerNyan,
    triggerSnoop
  };
}

export function EasterEggOverlay({ nyanCats, snoopDoggs }: { nyanCats: {id: number}[], snoopDoggs: {id: number}[] }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {nyanCats.map(cat => (
          <motion.div 
            key={`nyan-${cat.id}`}
            initial={{ x: "-20vw", y: "-50%" }}
            animate={{ x: "110vw", y: "-50%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "linear" }}
            className="absolute top-1/2 flex items-center"
          >
            <img src="/nyan-cat.gif" alt="Nyan Cat" className="h-48 w-auto object-contain" />
          </motion.div>
        ))}
        {snoopDoggs.map(snoop => (
          <motion.div 
            key={`snoop-${snoop.id}`}
            initial={{ x: "110vw", y: "-50%" }}
            animate={{ x: "-20vw", y: "-50%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6, ease: "linear" }}
            className="absolute top-1/3 flex items-center"
          >
            <img src="/snopp.gif" alt="Snoop Dogg" className="h-48 w-auto object-contain" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
