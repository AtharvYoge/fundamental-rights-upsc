// src/App.js  ← Paste everything from here

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale, Bird, HandMetal, Heart, BookOpen, Gavel,
  ChevronDown, UserCheck, Globe, Moon, Sun, Download, Trophy, Sparkles, CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const FundamentalRights = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('grid');
  const [darkMode, setDarkMode] = useState(false);
  const [completedCards, setCompletedCards] = useState(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('fr-darkmode');
    if (saved !== null) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => localStorage.setItem('fr-darkmode', JSON.stringify(darkMode)), [darkMode]);

  const toggleExpand = (id) => {
    const newId = expandedId === id ? null : id;
    setExpandedId(newId);
    if (newId && !completedCards.has(id)) {
      setCompletedCards(prev => new Set(prev).add(id));
      if (completedCards.size + 1 === 6) {
        setTimeout(() => confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } }), 400);
      }
    }
  };

  const rights = [
    { id: 1, title: "Right to Equality", arts: "14–18", icon: <Scale className="w-10 h-10"/>, color: "from-blue-500 to-cyan-500", mnemonic: "L-D-O-U-T" },
    { id: 2, title: "Right to Freedom", arts: "19–22", icon: <Bird className="w-10 h-10"/>, color: "from-green-500 to-emerald-600", mnemonic: "SAMRAP" },
    { id: 3, title: "Right Against Exploitation", arts: "23–24", icon: <HandMetal className="w-10 h-10"/>, color: "from-red-500 to-pink-600", mnemonic: "No Trafficking & Child Labour" },
    { id: 4, title: "Freedom of Religion", arts: "25–28", icon: <Heart className="w-10 h-10"/>, color: "from-purple-500 to-indigo-600", mnemonic: "Conscience • Manage • Tax • Attend" },
    { id: 5, title: "Cultural & Educational Rights", arts: "29–30", icon: <BookOpen className="w-10 h-10"/>, color: "from-amber-500 to-orange-600", mnemonic: "Minority Culture & Schools" },
    { id: 6, title: "Constitutional Remedies", arts: "32", icon: <Gavel className="w-10 h-10"/>, color: "from-slate-700 to-slate-900", mnemonic: "Heart & Soul – Dr. Ambedkar" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-br from-indigo-50 to-purple-50'} p-4`}>
      {/* Floating Buttons */}
      <div className="fixed right-6 top-20 z-50 flex flex-col gap-3">
        <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white/90 dark:bg-gray-800 rounded-full shadow-2xl">
          {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6" />}
        </button>
        <button onClick={() => window.print()} className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl print:hidden">
          <Download className="w-6 h-6" />
        </button>
      </div>

      {/* Progress + Trophy */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 dark:bg-gray-700 z-40">
        <motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-600" animate={{ width: `${(completedCards.size/6)*100}%` }} />
      </div>
      {completedCards.size === 6 && (
        <motion.div initial={{y: -100}} animate={{y: 0}} className="fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50">
          <Trophy className="w-6 h-6" /> <span className="font-bold">Mastered All 6 Rights!</span> <Sparkles className="w-5 h-5" />
        </motion.div>
      )}

      <header className="text-center pt-20 pb-10 text-center">
        <motion.h1 initial={{y: -40}} animate={{y: 0}} className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
          Fundamental Rights
        </motion.h1>
        <p className="text-xl opacity-80">Part III • Articles 12–35 • UPSC CSE</p>
      </header>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {['grid', 'cheatsheet'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-xl font-bold ${activeTab === tab ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-white dark:bg-gray-800'}`}>
            {tab === 'grid' ? 'Visual Journey' : 'Cheat Sheet'}
          </button>
        ))}
      </div>

      {/* Grid View */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {rights.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={() => toggleExpand(r.id)}
            className="cursor-pointer"
          >
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl h-64 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${r.color} opacity-90`} />
              <div className="relative p-8 h-full flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur">{r.icon}</div>
                  {completedCards.has(r.id) && <CheckCircle2 className="w-8 h-8 text-green-300" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{r.title}</h3>
                  <p className="text-sm opacity-80">Articles {r.arts}</p>
                  <p className="mt-3 text-sm font-medium bg-black/30 px-3 py-1 rounded-full inline-block">{r.mnemonic}</p>
                </div>
                <motion.div animate={{ rotate: expandedId === r.id ? 180 : 0 }}>
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return <FundamentalRights />;
}
