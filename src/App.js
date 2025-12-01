import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, Bird, HandMetal, Heart, BookOpen, Gavel, ChevronDown, 
  Moon, Sun, Download, Trophy, Sparkles, CheckCircle2, Globe 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const translations = {
  en: {
    title: "Fundamental Rights",
    subtitle: "UPSC CSE • Polity • Part III",
    tagline: "The Magna Carta of India • Articles 12–35",
    visualTab: "Visual Journey",
    cheatTab: "Cheat Sheet",
    rights: [
      { title: "Right to Equality", articles: "Articles 14–18", mnemonic: "L-D-O-U-T", details: ["Art 14: Equality before Law & Equal Protection", "Art 15: No Discrimination", "Art 16: Public Employment", "Art 17: Abolish Untouchability", "Art 18: No Titles"] },
      { title: "Right to Freedom", articles: "Articles 19–22", mnemonic: "S-A-M-R-A-P", details: ["Art 19: 6 Freedoms", "Art 20: Conviction Protection", "Art 21: Life & Liberty", "Art 21A: Education", "Art 22: Arrest Protection"] },
      { title: "Right Against Exploitation", articles: "Articles 23–24", mnemonic: "No Trafficking & Child Labour", details: ["Art 23: No Forced Labour", " 24: No Child Labour"] },
      { title: "Freedom of Religion", articles: "Articles 25–28", mnemonic: "Conscience • Manage • Tax • Attend", details: ["Art 25: Practice & Propagation", "Art 26: Manage Affairs", "Art 27: No Religious Tax", "Art 28: No Compulsory Instruction"] },
      { title: "Cultural & Educational Rights", articles: "Articles 29–30", mnemonic: "Minority Culture & Schools", details: ["Art 29: Preserve Culture", "Art 30: Establish Schools"] },
      { title: "Constitutional Remedies", articles: "Article 32", mnemonic: "Heart & Soul – Dr. Ambedkar", details: ["Art 32: Approach Supreme Court", "5 Writs: Habeas, Mandamus, Prohibition, Certiorari, Quo-Warranto"] }
    ],
    mastered: "Mastered All 6 Rights!",
    footer: "Made with ❤️ for UPSC Warriors • Jai Hind!"
  },
  hi: {
    title: "मौलिक अधिकार",
    subtitle: "UPSC CSE • राज्यशास्त्र • भाग-III",
    tagline: "भारत का मैग्ना कार्टा • अनुच्छेद 12–35",
    visualTab: "दृश्य यात्रा",
    cheatTab: "चीट शीट",
    rights: [
      { title: "समता का अधिकार", articles: 14–18", mnemonic: "L-D-O-U-T", details: ["अनु.14: विधि के समक्ष समता", "अनु.15: भेदभाव निषेध", "अनु.16: सरकारी नौकरी में अवसर", "अनु.17: अस्पृश्यता उन्मूलन", "अनु.18: उपाधियाँ समाप्त"] },
      { title: "स्वतंत्रता का अधिकार", articles: "अनुच्छेद 19–22", mnemonic: "स-आ-च-न-सं-व्य", details: ["अनु.19: 6 स्वतंत्रताएँ", "अनु.20: दोषसिद्धि संरक्षण", "अनु.21: जीवन व व्यक्तिगत स्वतंत्रता", "अनु.21A: शिक्षा", "अनु.22: गिरफ्तारी संरक्षण"] },
      { title: "शोषण के विरुद्ध अधिकार", articles: "अनुच्छेद 23–24", mnemonic: "मानव तस्करी व बाल श्रम निषेध", details: ["अनु.23: बलात् श्रम निषेध", "अनु.24: कारखानों में बाल श्रम निषेध"] },
      { title: "धर्म की स्वतंत्रता", articles: "अनुच्छेद 25–28", mnemonic: "च-प्र-व्य-कर-बा", details: ["अनु.25: अंतःकरण व प्रचार की स्वतंत्रता", "अनु.26: धार्मिक कार्य प्रबंधन", "अनु.27: धर्म हेतु कर नहीं", "अनु.28: धार्मिक शिक्षा बाध्यता नहीं"] },
      { title: "संस्कृति एवं शिक्षा का अधिकार", articles: "अनुच्छेद 29–30", mnemonic: "अल्पसंख्यक संस्कृति व विद्यालय", details: ["अनु.29: संस्कृति संरक्षण", "अनु.30: शैक्षणिक संस्थाएँ स्थापित करने का अधिकार"] },
      { title: "संवैधानिक उपचारों का अधिकार", articles: "अनुच्छेद 32", mnemonic: "संविधान की आत्मा – डॉ. आंबेडकर", details: ["अनु.32: सर्वोच्च न्यायालय में याचिका", "5 रिट: हैबियस कॉर्पस, परमादेश, प्रतिषेध, प्रमाणीकरण, अधिकार पृच्छा"] }
    ],
    mastered: "सभी 6 अधिकार पूर्ण कर लिए!",
    footer: "UPSC योद्धाओं के लिए ❤️ • भारत माता की जय!"
  },
  mr: {
    title: "मूलभूत अधिकार",
    subtitle: "UPSC CSE • राज्यशास्त्र • भाग-३",
    tagline: "भारताचे मॅग्ना कार्टा • कलम १२–३५",
    visualTab: "दृश्य प्रवास",
    cheatTab: "चीट शीट",
    rights: [
      { title: "समानतेचा अधिकार", articles: "कलम १४–१८", mnemonic: "L-D-O-U-T", details: ["कलम १४: कायद्यापुढे समानता", "कलम १५: भेदभाव प्रतिबंध", "कलम १६: सरकारी नोकरीत संधी", "कलम १७: अस्पृश्यता निर्मूलन", "कलम १८: किताब बंदी"] },
      { title: "स्वातंत्र्याचा अधिकार", articles: "कलम १९–२२", mnemonic: "स-आ-च-न-सं-व्य", details: ["कलम १९: ६ स्वातंत्र्ये", "कलम २०: शिक्षा संरक्षण", "कलम २१: जीवन व वैयक्तिक स्वातंत्र्य", "कलम २१अ: शिक्षण", "कलम २२: अटक संरक्षण"] },
      { title: "शोषणाविरुद्ध अधिकार", articles: "कलम २३–२४", mnemonic: "मानवी तस्करी व बालमजुरी बंदी", details: ["कलम २३: सक्तीच्या मजुरीवर बंदी", "कलम २४: कारखान्यात बालमजुरी बंदी"] },
      { title: "धर्मस्वातंत्र्य", articles: "कलम २५–२८", mnemonic: "अंतःकरण-प्रचार-व्यवस्था-कर-बाध्यता", details: ["कलम २५: अंतःकरण व प्रचार स्वातंत्र्य", "कलम २६: धार्मिक व्यवस्था", "कलम २७: धर्मासाठी कर नाही", "कलम २८: धार्मिक शिक्षण बंधनकारक नाही"] },
      { title: "सांस्कृतिक व शैक्षणिक अधिकार", articles: "कलम २९–३०", mnemonic: "अल्पसंख्याक संस्कृती व शाळा", details: ["कलम २९: संस्कृती जपण्याचा अधिकार", "कलम ३०: शैक्षणिक संस्था स्थापनेचा अधिकार"] },
      { title: "संवैधानिक उपायांचा अधिकार", articles: "कलम ३२", mnemonic: "संविधानाची आत्मा – डॉ. आंबेडकर", details: ["कलम ३२: सर्वोच्च न्यायालयात याचिका", "५ रिट: हेबियस कॉर्पस, मंडामस, प्रतिषेध, प्रमाणपत्र, अधिकारपृच्छा"] }
    ],
    mastered: "सर्व ६ अधिकार पूर्ण केले!",
    footer: "UPSC योद्ध्यांसाठी ❤️ • जय हिंद! जय महाराष्ट्र!"
  }
};

const FundamentalRights = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('grid');
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en');
  const [completedCards, setCompletedCards] = useState(new Set());

  const t = translations[lang];

  const toggleExpand = (id) => {
    const newId = expandedId === id ? null : id;
    setExpandedId(newId);
    if (newId && !completedCards.has(id)) {
      setCompletedCards(prev => new Set([...prev, id]));
      if (completedCards.size + 1 === 6) {
        setTimeout(() => confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } }), 300);
      }
    }
  };

  const cycleLang = () => {
    setLang(current => current === 'en' ? 'hi' : current === 'hi' ? 'mr' : 'en');
  };

  const rightsData = t.rights.map((r, i) => ({
    id: i + 1,
    ...r,
    icon: [<Scale />, <Bird />, <HandMetal />, <Heart />, <BookOpen />, <Gavel />][i],
    color: ["from-blue-500 to-cyan-500", "from-green-500 to-emerald-600", "from-red-500 to-pink-600", 
            "from-purple-500 to-indigo-600", "from-amber-500 to-orange-600", "from-slate-700 to-slate-900"][i]
  }));

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'} font-sans p-4`}>
      {/* Controls */}
      <div className="fixed right-6 top-20 z-50 flex flex-col gap-3">
        <motion.button whileHover={{ scale: 1.1 }} onClick={cycleLang} className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-2xl mb-2">
          <Globe className="w-6 h-6" />
          <span className="text-xs mt-1 block">{lang.toUpperCase()}</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-2xl mb-2">
          {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-indigo-600" />}
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} onClick={() => window.print()} className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl print:hidden">
          <Download className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Progress & Trophy */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-40">
        <motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-600" animate={{ width: `${(completedCards.size / 6) * 100}%` }} />
      </div>
      {completedCards.size === 6 && (
        <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="fixed top-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-50">
          <Trophy className="w-5 h-5" /> {t.mastered} <Sparkles className="w-5 h-5 animate-pulse" />
        </motion.div>
      )}

      {/* Header */}
      <header className="pt-24 pb-8 text-center">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
            {t.subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t.tagline}</p>
        </motion.div>
      </header>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('grid')}
          className={`px-6 py-3 rounded-xl font-bold ${activeTab === 'grid' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-white dark:bg-gray-800'}`}>
          {t.visualTab}
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab('cheatsheet')}
          className={`px-6 py-3 rounded-xl font-bold ${activeTab === 'cheatsheet' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-white dark:bg-gray-800'}`}>
          {t.cheatTab}
        </motion.button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'grid' && (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {rightsData.map((right, i) => (
              <motion.div key={right.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }} onClick={() => toggleExpand(right.id)} className="cursor-pointer">
                <div className={`relative rounded-2xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border border-gray-200 dark:border-gray-700`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${right.color} opacity-90`} />
                  <div className="relative p-6 text-white">
                    <div className="flex justify-between mb-4">
                      <div className="p-3 bg-white/20 rounded-xl">{right.icon}</div>
                      {completedCards.has(right.id) && <CheckCircle2 className="w-7 h-7 text-green-400" />}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{right.title}</h3>
                    <p className="opacity-90 mb-4">{right.articles}</p>
                    <p className="bg-black/30 px-3 py-1 rounded-full text-sm inline-block mb-4">{right.mnemonic}</p>
                    <motion.div animate={{ rotate: expandedId === right.id ? 180 : 0 }} className="flex justify-end">
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expandedId === right.id && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t">
                          <ul className="space-y-3 text-sm">
                            {right.details.map((d, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">•</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center py-8 text-gray-500 text-sm mt-12">
        {t.footer}
      </footer>
    </div>
  );
};

function App() {
  return <FundamentalRights />;
}

export default App;
