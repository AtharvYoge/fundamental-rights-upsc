import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, Bird, HandMetal, Heart, BookOpen, Gavel, ChevronDown, 
  Download, Trophy, Sparkles, CheckCircle2, Globe 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const translations = {
  en: { title: "Fundamental Rights", subtitle: "UPSC CSE • Polity • Part III", tagline: "Articles 12–35", visualTab: "Visual Journey", cheatTab: "Cheat Sheet", mastered: "Mastered All 6 Rights!", footer: "Made with love for UPSC Warriors • Jai Hind!",
    rights: [
      { title: "Right to Equality", articles: "Articles 14-18", mnemonic: "L-D-O-U-T", details: ["Art 14: Equality before Law", "Art 15: No Discrimination", "Art 16: Public Employment", "Art 17: Abolish Untouchability", "Art 18: No Titles"] },
      { title: "Right to Freedom", articles: "Articles 19-22", mnemonic: "S-A-M-R-A-P", details: ["Art 19: 6 Freedoms", "Art 20: Conviction Protection", "Art 21: Life & Liberty", "Art 21A: Education", "Art 22: Arrest Protection"] },
      { title: "Right Against Exploitation", articles: "Articles 23-24", mnemonic: "No Trafficking & Child Labour", details: ["Art 23: No Forced Labour", "Art 24: No Child Labour"] },
      { title: "Freedom of Religion", articles: "Articles 25-28", mnemonic: "Conscience • Manage • Tax • Attend", details: ["Art 25: Practice & Propagation", "Art 26: Manage Affairs", "Art 27: No Religious Tax", "Art 28: No Compulsory Instruction"] },
      { title: "Cultural & Educational Rights", articles: "Articles 29-30", mnemonic: "Minority Culture & Schools", details: ["Art 29: Preserve Culture", "Art 30: Establish Schools"] },
      { title: "Constitutional Remedies", articles: "Article 32", mnemonic: "Heart & Soul - Dr. Ambedkar", details: ["Art 32: Supreme Court Access", "5 Writs: Habeas, Mandamus, Prohibition, Certiorari, Quo-Warranto"] }
    ]
  },
  hi: { title: "मौलिक अधिकार", subtitle: "UPSC CSE • राज्यशास्त्र • भाग-III", tagline: "अनुच्छेद १२-३५", visualTab: "दृश्य यात्रा", cheatTab: "चीट शीट", mastered: "सभी 6 अधिकार पूर्ण!", footer: "UPSC योद्धाओं के लिए love • भारत माता की जय!",
    rights: [
      { title: "समता का अधिकार", articles: "अनुच्छेद 14-18", mnemonic: "L-D-O-U-T", details: ["अनु.14: विधि के समक्ष समता", "अनु.15: भेदभाव निषेध", "अनु.16: सरकारी नौकरी में अवसर", "अनु.17: अस्पृश्यता उन्मूलन", "अनु.18: उपाधियाँ समाप्त"] },
      { title: "स्वतंत्रता का अधिकार", articles: "अनुच्छेद 19-22", mnemonic: "स-आ-च-न-सं-व्य", details: ["अनु.19: 6 स्वतंत्रताएँ", "अनु.20: दोषसिद्धि संरक्षण", "अनु.21: जीवन व व्यक्तिगत स्वतंत्रता", "अनु.21A: शिक्षा", "अनु.22: गिरफ्तारी से संरक्षण"] },
      { title: "शोषण के विरुद्ध अधिकार", articles: "अनुच्छेद 23-24", mnemonic: "मानव तस्करी व बाल श्रम निषेध", details: ["अनु.23: बलात् श्रम निषेध", "अनु.24: बाल श्रम निषेध"] },
      { title: "धर्म की स्वतंत्रता", articles: "अनुच्छेद 25-28", mnemonic: "अंतःकरण-प्रचार-व्यवस्था-कर", details: ["अनु.25: अंतःकरण व प्रचार", "अनु.26: धार्मिक कार्य प्रबंधन", "अनु.27: धर्म हेतु कर नहीं", "अनु.28: धार्मिक शिक्षा बाध्यता नहीं"] },
      { title: "संस्कृति एवं शिक्षा का अधिकार", articles: "अनुच्छेद 29-30", mnemonic: "अल्पसंख्यक संस्कृति व विद्यालय", details: ["अनु.29: संस्कृति संरक्षण", "अनु.30: शैक्षणिक संस्थाएँ"] },
      { title: "संवैधानिक उपचारों का अधिकार", articles: "अनुच्छेद 32", mnemonic: "संविधान की आत्मा - डॉ. आंबेडकर", details: ["अनु.32: सर्वोच्च न्यायालय में याचिका", "५ रिट: हैबियस, परमादेश, प्रतिषेध, प्रमाणीकरण, अधिकार पृच्छा"] }
    ]
  },
  mr: { title: "मूलभूत अधिकार", subtitle: "UPSC CSE • राज्यशास्त्र • भाग-३", tagline: "कलम १२-३५", visualTab: "दृश्य प्रवास", cheatTab: "चीट शीट", mastered: "सर्व ६ अधिकार पूर्ण!", footer: "UPSC योद्ध्यांसाठी love • जय हिंद! जय महाराष्ट्र!",
    rights: [
      { title: "समानतेचा अधिकार", articles: "कलम १४-१८", mnemonic: "L-D-O-U-T", details: ["कलम १४: कायद्यापुढे समानता", "कलम १५: भेदभाव प्रतिबंध", "कलम १६: सरकारी नोकरीत संधी", "कलम १७: अस्पृश्यता निर्मूलन", "कलम १८: किताब बंदी"] },
      { title: "स्वातंत्र्याचा अधिकार", articles: "कलम १९-२२", mnemonic: "स-आ-च-न-सं-व्य", details: ["कलम १९: ६ स्वातंत्र्ये", "कलम २०: शिक्षा संरक्षण", "कलम २१: जीवन व वैयक्तिक स्वातंत्र्य", "कलम २१अ: शिक्षण", "कलम २२: अटक संरक्षण"] },
      { title: "शोषणाविरुद्ध अधिकार", articles: "कलम २३-२४", mnemonic: "मानवी तस्करी व बालमजुरी बंदी", details: ["कलम २३: सक्तीच्या मजुरीवर बंदी", "कलम २४: बालमजुरी बंदी"] },
      { title: "धर्मस्वातंत्र्य", articles: "कलम २५-२८", mnemonic: "अंतःकरण-प्रचार-व्यवस्था-कर", details: ["कलम २५: अंतःकरण व प्रचार", "कलम २६: धार्मिक व्यवस्था", "कलम २७: धर्मासाठी कर नाही", "कलम २८: धार्मिक शिक्षण बंधनकारक नाही"] },
      { title: "सांस्कृतिक व शैक्षणिक अधिकार", articles: "कलम २९-३०", mnemonic: "अल्पसंख्याक संस्कृती व शाळा", details: ["कलम २९: संस्कृती जपणे", "कलम ३०: शैक्षणिक संस्था"] },
      { title: "संवैधानिक उपायांचा अधिकार", articles: "कलम ३२", mnemonic: "संविधानाची आत्मा - डॉ. आंबेडकर", details: ["कलम ३२: सर्वोच्च न्यायालयात याचिका", "५ रिट: हेबियस, मंडामस, प्रतिषेध, प्रमाणपत्र, अधिकारपृच्छा"] }
    ]
  }
};

const FundamentalRights = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [lang, setLang] = useState('en');
  const [completedCards, setCompletedCards] = useState(new Set());

  const t = translations[lang];

  const toggleExpand = (id) => {
    const newId = expandedId === id ? null : id;
    setExpandedId(newId);
    if (newId && !completedCards.has(id)) {
      setCompletedCards(prev => new Set([...prev, id]));
      if (completedCards.size + 1 === 6) {
        setTimeout(() => confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 } }), 300);
      }
    }
  };

  const cycleLang = () => setLang(prev => prev === 'en' ? 'hi' : prev === 'hi' ? 'mr' : 'en');

  const icons = [<Scale />, <Bird />, <HandMetal />, <Heart />, <BookOpen />, <Gavel />];
  const cardColors = ["from-blue-800 to-blue-950", "from-emerald-800 to-emerald-950", "from-red-800 to-red-950",
                      "from-purple-800 to-purple-950", "from-amber-800 to-amber-950", "from-gray-800 to-gray-950"];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans p-4">
      {/* Controls */}
      <div className="fixed right-6 top-20 z-50 flex flex-col gap-4">
        <motion.button whileHover={{ scale: 1.1 }} onClick={cycleLang} className="p-4 bg-gray-800 rounded-full shadow-2xl border border-gray-700">
          <Globe className="w-7 h-7" />
          <span className="text-xs block mt-1">{lang.toUpperCase()}</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} onClick={() => window.print()} className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-2xl print:hidden">
          <Download className="w-7 h-7" />
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-800 z-40">
        <motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-600" animate={{ width: `${(completedCards.size / 6) * 100}%` }} />
      </div>

      {completedCards.size === 6 && (
        <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="fixed top-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-pink-500 px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 z-50 text-lg font-bold">
          <Trophy className="w-6 h-6" /> {t.mastered} <Sparkles className="w-6 h-6 animate-pulse" />
        </motion.div>
      )}

      {/* Header */}
      <header className="pt-24 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block bg-gradient-to-r from-orange-500 to-red-600 px-6 py-2 rounded-full text-sm font-bold mb-6">
            {t.subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400">{t.tagline}</p>
        </motion.div>
      </header>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {t.rights.map((right, i) => (
          <motion.div key={i+1} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
            whileHover={{ y: -12, scale: 1.03 }} onClick={() => toggleExpand(i+1)} className="cursor-pointer">
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800 h-full bg-gradient-to-br ${cardColors[i]} p-1`}>
              <div className="bg-gray-900/95 backdrop-blur-sm rounded-3xl p-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-5 bg-white/10 rounded-2xl backdrop-blur">{icons[i]}</div>
                  {completedCards.has(i+1) && <CheckCircle2 className="w-9 h-9 text-green-400" />}
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">{right.title}</h3>
                <p className="text-gray-300 mb-6 text-xl">{right.articles}</p>
                <p className="bg-white/10 px-5 py-2 rounded-full text-sm font-medium mb-8 inline-block">{right.mnemonic}</p>
                <motion.div animate={{ rotate: expandedId === i+1 ? 180 : 0 }} className="mt-auto flex justify-end">
                  <ChevronDown className="w-8 h-8 text-gray-400" />
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === i+1 && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="mt-6 bg-gray-900/90 backdrop-blur border border-gray-800 rounded-3xl overflow-hidden">
                  <div className="p-8">
                    <ul className="space-y-5 text-gray-100 text-lg">
                      {right.details.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="text-indigo-400 mt-1.5 text-xl">▹</span>
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <footer className="text-center py-16 text-gray-500 text-sm mt-24">
        {t.footer}
      </footer>
    </div>
  );
};

export default function App() {
  return <FundamentalRights />;
}
