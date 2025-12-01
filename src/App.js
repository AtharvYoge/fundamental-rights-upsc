import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Bird, HandMetal, Heart, BookOpen, Gavel, ChevronDown, Moon, Sun, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

const FundamentalRights = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [completedCards, setCompletedCards] = useState(new Set());

  const toggleExpand = (id) => {
    const newId = expandedId === id ? null : id;
    setExpandedId(newId);
    if (newId && !completedCards.has(id)) {
      setCompletedCards(prev => new Set([...prev, id]));
      if (completedCards.size + 1 === 6) {
        confetti({ particleCount: 100, spread: 70 });
      }
    }
  };

  const rightsData = [
    {
      id: 1, title: "Right to Equality", articles: "14-18", icon: <Scale className="w-8 h-8" />, color: "bg-blue-500", mnemonic: "LDOUT", details: ["Art 14: Equality before Law", "Art 15: No Discrimination", "Art 16: Public Employment", "Art 17: Abolish Untouchability", "Art 18: No Titles"]
    },
    {
      id: 2, title: "Right to Freedom", articles: "19-22", icon: <Bird className="w-8 h-8" />, color: "bg-green-500", mnemonic: "SAMRAP", details: ["Art 19: 6 Freedoms", "Art 20: Conviction Protection", "Art 21: Life & Liberty", "Art 21A: Education", "Art 22: No Arbitrary Arrest"]
    },
    {
      id: 3, title: "Right Against Exploitation", articles: "23-24", icon: <HandMetal className="w-8 h-8" />, color: "bg-red-500", mnemonic: "Trafficking & Child Labor", details: ["Art 23: No Forced Labor", "Art 24: No Child Labor"]
    },
    {
      id: 4, title: "Freedom of Religion", articles: "25-28", icon: <Heart className="w-8 h-8" />, color: "bg-purple-500", mnemonic: "Conscience, Manage, Tax, Attend", details: ["Art 25: Conscience & Practice", "Art 26: Manage Affairs", "Art 27: No Religious Tax", "Art 28: No Compulsory Instruction"]
    },
    {
      id: 5, title: "Cultural & Educational Rights", articles: "29-30", icon: <BookOpen className="w-8 h-8" />, color: "bg-yellow-500", mnemonic: "Minority Protection", details: ["Art 29: Culture Preservation", "Art 30: Educational Institutions"]
    },
    {
      id: 6, title: "Constitutional Remedies", articles: "32", icon: <Gavel className="w-8 h-8" />, color: "bg-gray-500", mnemonic: "Soul of Constitution", details: ["Art 32: Writs to SC", "Writs: Habeas, Mandamus, etc."]
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-4 transition-colors duration-300`}>
      {/* Controls */}
      <div className="fixed top-4 right-4 flex gap-2 z-10">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button onClick={() => window.print()} className="p-2 bg-blue-500 text-white rounded">
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 dark:bg-gray-700">
        <div className="h-full bg-blue-500" style={{ width: `${(completedCards.size / 6) * 100}%` }} />
      </div>

      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">Fundamental Rights</h1>
        <p className="text-gray-600 dark:text-gray-300">UPSC CSE • Part III (Articles 12-35)</p>
      </header>

      {/* Cards Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rightsData.map((right) => (
          <motion.div
            key={right.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: right.id * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer relative"
            onClick={() => toggleExpand(right.id)}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`p-3 rounded-full ${right.color} text-white mb-4`}>{right.icon}</div>
            <h3 className="text-xl font-bold mb-2">{right.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{right.articles}</p>
            <p className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mb-4">{right.mnemonic}</p>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandedId === right.id ? 'rotate-180' : ''}`} />
            
            {expandedId === right.id && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-4 space-y-2 text-sm"
              >
                {right.details.map((detail, idx) => (
                  <li key={idx} className="pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                    • {detail}
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        ))}
      </div>

      <footer className="text-center py-8 text-gray-500 text-sm mt-12">
        Interactive UPSC Study Aid • Jai Hind!
      </footer>
    </div>
  );
};

function App() {
  return <FundamentalRights />;
}

export default App;
