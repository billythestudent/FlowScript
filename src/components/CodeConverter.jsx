import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  convertCode,
  getCodeStats,
  codeTemplates,
  syntaxThemes,
  getConversionHistory,
  addToHistory,
  clearHistory,
} from '../utils/codeConverter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  nightOwl,
  dracula,
  vscDarkPlus,
  okaidia,
  tomorrow,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

const themeStyles = {
  nightOwl: nightOwl,
  dracula: dracula,
  github: vscDarkPlus,
  vsDark: vscDarkPlus,
  okaidia: okaidia,
  tomorrow: tomorrow,
};

const languages = [
  { id: 'javascript', name: 'JavaScript', ext: 'js' },
  { id: 'python', name: 'Python', ext: 'py' },
  { id: 'java', name: 'Java', ext: 'java' },
];

export default function CodeConverter() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [fromLang, setFromLang] = useState('javascript');
  const [toLang, setToLang] = useState('python');
  const [activeTab, setActiveTab] = useState('converter');
  const [selectedTheme, setSelectedTheme] = useState('nightOwl');
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ lines: 0, chars: 0, words: 0, functions: 0 });
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHistory(getConversionHistory());
  }, []);

  useEffect(() => {
    setStats(getCodeStats(inputCode));
  }, [inputCode]);

  const handleConvert = () => {
    if (!inputCode.trim()) return;
    
    setIsConverting(true);
    setTimeout(() => {
      const result = convertCode(inputCode, fromLang, toLang);
      setOutputCode(result);
      const newHistory = addToHistory(fromLang, toLang, inputCode, result);
      setHistory(newHistory);
      setIsConverting(false);
    }, 500);
  };

  const handleSwapLanguages = () => {
    const tempLang = fromLang;
    setFromLang(toLang);
    setToLang(tempLang);
    if (outputCode) {
      setInputCode(outputCode);
      setOutputCode('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const lang = languages.find(l => l.id === toLang);
    const blob = new Blob([outputCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_code.${lang?.ext || 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const loadFromHistory = (item) => {
    setFromLang(item.fromLang);
    setToLang(item.toLang);
    // History stores truncated code, so we just show what we have
  };

  const loadTemplate = (templateName) => {
    const template = codeTemplates[fromLang]?.[templateName];
    if (template) {
      setInputCode(template);
    }
  };

  const getPrismLang = (langId) => {
    const map = { javascript: 'javascript', python: 'python', java: 'java' };
    return map[langId] || 'javascript';
  };

  const tabs = [
    { id: 'converter', name: 'Dönüştürücü', icon: '🔄' },
    { id: 'templates', name: 'Şablonlar', icon: '📝' },
    { id: 'history', name: 'Geçmiş', icon: '📜' },
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 bg-slate-800/50 p-1.5 rounded-xl backdrop-blur-sm border border-slate-700/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Converter Tab */}
        {activeTab === 'converter' && (
          <motion.div
            key="converter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Theme Selection */}
            <div className="flex items-center gap-4 justify-end">
              <label className="text-sm text-slate-400">Tema:</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(syntaxThemes).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>

            {/* Language Selection & Swap */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm text-slate-400 mb-2 block">Kaynak Dil</label>
                <select
                  value={fromLang}
                  onChange={(e) => setFromLang(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSwapLanguages}
                className="mt-6 p-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                title="Dilleri değiştir"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>

              <div className="flex-1">
                <label className="text-sm text-slate-400 mb-2 block">Hedef Dil</label>
                <select
                  value={toLang}
                  onChange={(e) => setToLang(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Code Editors */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Input Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-slate-400">Kaynak Kod</label>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{stats.lines} satır</span>
                    <span>•</span>
                    <span>{stats.chars} karakter</span>
                    <span>•</span>
                    <span>{stats.functions} fonksiyon</span>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Dönüştürmek istediğiniz kodu buraya yapıştırın..."
                    className="w-full h-64 p-4 bg-slate-900/80 border border-slate-700 rounded-xl text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500"
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* Output Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-slate-400">Dönüştürülmüş Kod</label>
                  <div className="flex items-center gap-2">
                    {outputCode && (
                      <>
                        <button
                          onClick={handleCopy}
                          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-white transition-colors flex items-center gap-1"
                        >
                          {copied ? '✓ Kopyalandı' : '📋 Kopyala'}
                        </button>
                        <button
                          onClick={handleDownload}
                          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-white transition-colors flex items-center gap-1"
                        >
                          ⬇️ İndir
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="h-64 bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden">
                  {outputCode ? (
                    <SyntaxHighlighter
                      language={getPrismLang(toLang)}
                      style={themeStyles[selectedTheme] || nightOwl}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: 'transparent',
                        height: '100%',
                        fontSize: '0.875rem',
                      }}
                      showLineNumbers
                    >
                      {outputCode}
                    </SyntaxHighlighter>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                      Dönüştürülmüş kod burada görünecek...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Convert Button */}
            <div className="flex justify-center">
              <motion.button
                onClick={handleConvert}
                disabled={!inputCode.trim() || isConverting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center gap-3 ${
                  inputCode.trim()
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-purple-500/25'
                    : 'bg-slate-700 cursor-not-allowed opacity-50'
                }`}
              >
                {isConverting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Dönüştürülüyor...</span>
                  </>
                ) : (
                  <>
                    <span>🔄</span>
                    <span>Kodu Dönüştür</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <motion.div
            key="templates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm text-slate-400">Dil Seç:</label>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(codeTemplates[fromLang] || {}).map(([name, code]) => (
                <motion.div
                  key={name}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    loadTemplate(name);
                    setActiveTab('converter');
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">{name}</h3>
                    <span className="text-xs text-slate-500 group-hover:text-blue-400 transition-colors">
                      Kullan →
                    </span>
                  </div>
                  <div className="h-24 overflow-hidden rounded-lg bg-slate-900/80">
                    <SyntaxHighlighter
                      language={getPrismLang(fromLang)}
                      style={themeStyles[selectedTheme] || nightOwl}
                      customStyle={{
                        margin: 0,
                        padding: '0.5rem',
                        background: 'transparent',
                        fontSize: '0.7rem',
                      }}
                    >
                      {code.substring(0, 200)}
                    </SyntaxHighlighter>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Son Dönüşümler</h3>
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  🗑️ Geçmişi Temizle
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-4xl mb-3">📜</div>
                <p>Henüz dönüşüm geçmişi yok</p>
                <p className="text-sm mt-1">Kod dönüştürdüğünüzde burada görünecek</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                          {languages.find(l => l.id === item.fromLang)?.name}
                        </span>
                        <span className="text-slate-500">→</span>
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">
                          {languages.find(l => l.id === item.toLang)?.name}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(item.timestamp).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-slate-900/50 rounded-lg">
                        <code className="text-xs text-slate-400 font-mono line-clamp-2">
                          {item.inputCode}
                        </code>
                      </div>
                      <div className="p-2 bg-slate-900/50 rounded-lg">
                        <code className="text-xs text-slate-400 font-mono line-clamp-2">
                          {item.outputCode}
                        </code>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
