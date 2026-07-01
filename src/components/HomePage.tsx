import { useState } from "react";
import { motion } from "motion/react";
import { Search, BookOpen, Clock, Tag, ArrowRight, Github, Terminal, Copy, Check, FileJson, AlertCircle } from "lucide-react";
import { ARTICLES, Article } from "../data/articles";

interface HomePageProps {
  onSelectArticle: (id: string) => void;
}

export default function HomePage({ onSelectArticle }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("WSZYSTKIE");
  const [maxReadTime, setMaxReadTime] = useState<number>(10);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Statistics
  const totalArticles = ARTICLES.length;
  const totalReadTime = ARTICLES.reduce((sum, a) => sum + a.readTimeMin, 0);
  const totalWords = ARTICLES.reduce((sum, a) => sum + a.wordCount, 0);

  // Filter logic
  const filteredArticles = ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "WSZYSTKIE" ||
      article.category.toUpperCase() === selectedCategory.toUpperCase();

    const matchesReadTime = article.readTimeMin <= maxReadTime;

    return matchesSearch && matchesCategory && matchesReadTime;
  });

  const categories = ["WSZYSTKIE", "ARCHITEKTURA", "DESIGN & DEV", "KOMPETENCJE", "WORKFLOW", "AUTOMATYZACJA"];

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const schemaExample = `{
  "id": "twoj-projekt",
  "title": "Nazwa Twojego Projektu",
  "industry": "FinTech / E-commerce / AI",
  "category": "mobile",
  "description": "Krótki, przyciągający uwagę opis projektu.",
  "tools": "React - Tailwind - Node.js",
  "colorAccent": "#F97316",
  "colorBg": "#111827",
  "tags": ["FinTech", "NextJS", "Premium UI"],
  "featured": true,
  "dateAdded": "2026-07"
}`;

  const validatorCode = `/**
 * validate-project.js
 * Automatyczny skrypt walidacyjny weryfikujący poprawność meta.json w folderze projektu.
 * Uruchom: node validate-project.js [sciezka_do_meta.json]
 */
import fs from 'fs';
import path from 'path';

function validateMeta(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error('❌ Błąd: Plik meta.json nie istnieje pod wskazaną ścieżką!');
      process.exit(1);
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    const meta = JSON.parse(rawData);

    const requiredFields = ['id', 'title', 'industry', 'category', 'description', 'tools', 'colorAccent', 'colorBg', 'tags'];
    const missing = requiredFields.filter(field => !meta[field]);

    if (missing.length > 0) {
      console.error(\`❌ Błąd walidacji: Brakujące wymagane pola: \${missing.join(', ')}\`);
      process.exit(1);
    }

    // Walidacja kolorów hex
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    if (!hexRegex.test(meta.colorAccent)) {
      console.error(\`❌ Błąd: Niepoprawny format pola colorAccent (\${meta.colorAccent}). Wymagany format HEX (np. #F97316)\`);
      process.exit(1);
    }

    if (!Array.isArray(meta.tags) || meta.tags.length === 0) {
      console.error('❌ Błąd: Pole tags musi być niepustą tablicą stringów!');
      process.exit(1);
    }

    console.log(\`✅ Sukces: Plik meta.json projektu "\${meta.title}" jest w 100% zgodny z kontraktem!\`);
  } catch (error) {
    console.error('❌ Błąd krytyczny podczas parsowania pliku JSON:', error.message);
    process.exit(1);
  }
}

const targetPath = process.argv[2] || './meta.json';
validateMeta(targetPath);`;

  return (
    <div className="space-y-12">
      {/* Premium Editorial Header */}
      <section className="text-center max-w-3xl mx-auto py-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F97316] font-bold">
          Magazyn Inżynieryjny & Dziennik Budowy
        </span>
        <h1 className="font-display font-bold text-5xl md:text-8xl text-[#1A1A1A] tracking-tighter leading-none mt-4 mb-6">
          Dziennik <br />
          <span className="font-serif italic font-light text-[#F97316]">Budowy</span>
        </h1>
        <p className="text-base md:text-lg text-[#1A1A1A]/70 font-sans leading-relaxed">
          Przemyślenia i taktyki wokół orkiestracji narzędzi AI, automatyzacji portfolio, rygorystycznych
          kontraktów danych i weryfikowalnych realizacji inżynieryjnych w roku 2026.
        </p>
      </section>

      {/* Editorial Dashboard / Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto p-6 bg-white border border-[#1A1A1A]/10 rounded-xl shadow-sm">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider block">Wpisy ogółem</span>
          <span className="text-3xl font-display font-extrabold text-[#1A1A1A] block">{totalArticles}</span>
          <span className="text-[10px] font-mono text-[#F97316] block">Opublikowane</span>
        </div>
        <div className="space-y-1 border-l border-[#1A1A1A]/10 pl-4 md:pl-6">
          <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider block">Szacowany czas nauk</span>
          <span className="text-3xl font-display font-extrabold text-[#1A1A1A] block">{totalReadTime} <span className="text-sm font-sans font-normal text-zinc-500">min</span></span>
          <span className="text-[10px] font-mono text-[#F97316] block">Esencja wiedzy</span>
        </div>
        <div className="space-y-1 border-l border-[#1A1A1A]/10 pl-4 md:pl-6">
          <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider block">Objętość esejów</span>
          <span className="text-3xl font-display font-extrabold text-[#1A1A1A] block">{totalWords} <span className="text-sm font-sans font-normal text-zinc-500">słów</span></span>
          <span className="text-[10px] font-mono text-emerald-600 block">Drobiazgowa analiza</span>
        </div>
        <div className="space-y-1 border-l border-[#1A1A1A]/10 pl-4 md:pl-6">
          <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider block">Standard Systemu</span>
          <span className="text-3xl font-display font-extrabold text-[#1A1A1A] block">v2.0</span>
          <span className="text-[10px] font-mono text-indigo-600 block">Gotowy pod Git/Submodule</span>
        </div>
      </section>

      {/* Advanced Filter Panel */}
      <section className="bg-white border border-[#1A1A1A]/10 rounded-xl p-6 shadow-sm max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-grow max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-[#1A1A1A]/40" />
            </span>
            <input
              type="text"
              placeholder="Przeszukaj treść dziennika..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 w-full bg-[#F9F8F6] border border-[#1A1A1A]/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-all"
            />
          </div>

          {/* Read time slider */}
          <div className="flex items-center gap-4 bg-[#F9F8F6] border border-[#1A1A1A]/5 px-4 py-2 rounded-lg">
            <span className="text-xs font-mono text-[#1A1A1A]/50 whitespace-nowrap">Czas czytania:</span>
            <input
              type="range"
              min="4"
              max="10"
              value={maxReadTime}
              onChange={(e) => setMaxReadTime(Number(e.target.value))}
              className="w-24 md:w-32 accent-[#F97316]"
            />
            <span className="text-xs font-mono font-bold text-[#F97316] min-w-[32px]">{maxReadTime} min</span>
          </div>
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1A1A1A]/5">
          <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider mr-2">Tematyka:</span>
          {categories.map((cat) => {
            const count = cat === "WSZYSTKIE" 
              ? ARTICLES.length 
              : ARTICLES.filter(a => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-[#F9F8F6] hover:bg-[#1A1A1A]/5 text-[#1A1A1A]/60"
                }`}
              >
                {cat} <span className="opacity-40 text-[10px] ml-1">({count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Articles List & Grid */}
      <section className="max-w-5xl mx-auto">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#1A1A1A]/10 rounded-xl">
            <Search className="h-8 w-8 text-[#1A1A1A]/20 mx-auto mb-3" />
            <p className="text-sm font-mono text-[#1A1A1A]/60">Brak artykułów spełniających kryteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("WSZYSTKIE");
                setMaxReadTime(10);
              }}
              className="mt-4 text-xs font-mono text-[#F97316] border-b border-[#F97316] font-bold"
            >
              Resetuj filtry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article, index) => {
              const isLarge = index === 0 && searchQuery === "" && selectedCategory === "WSZYSTKIE";
              return (
                <motion.div
                  key={article.id}
                  layout
                  onClick={() => onSelectArticle(article.id)}
                  className={`group bg-white border border-[#1A1A1A]/10 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between ${
                    isLarge ? "md:col-span-2 flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/10" : ""
                  }`}
                  style={{
                    borderLeftColor: article.accentColor,
                    borderLeftWidth: "4px"
                  }}
                  whileHover={{ y: -3 }}
                >
                  {/* Article Thumbnail */}
                  <div className={`overflow-hidden relative ${isLarge ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"}`}>
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1A1A1A] text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      {article.wpis}
                    </div>
                  </div>

                  {/* Article Meta / Description */}
                  <div className={`p-6 flex flex-col justify-between flex-grow ${isLarge ? "md:w-1/2" : ""}`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#F97316]">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-display font-extrabold text-xl md:text-2xl text-[#1A1A1A] group-hover:text-[#F97316] transition-colors leading-tight">
                        {article.title}
                      </h3>

                      <p className="text-xs md:text-sm text-[#1A1A1A]/70 leading-relaxed font-sans line-clamp-3">
                        {article.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#1A1A1A]/5 pt-4 mt-6">
                      <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase">{article.date}</span>
                      <span className="text-xs font-mono font-bold text-[#1A1A1A] group-hover:text-[#F97316] flex items-center gap-1 transition-colors">
                        Czytaj dalej <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Interactive Integration Guide (Addressing user intent of sub-repos and GitHub linking) */}
      <section className="max-w-5xl mx-auto bg-zinc-950 text-zinc-100 rounded-xl overflow-hidden shadow-lg border border-[#1A1A1A]">
        <div className="p-6 bg-[#111827] border-b border-zinc-800 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#F97316]" />
          <div>
            <h3 className="font-display font-bold text-lg text-white tracking-tight">
              Instrukcja integracji z nadrzędnym repozytorium (Projects Feed)
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Jak spiąć ten Dziennik oraz podkatalogi pod centralny portal i automatycznie walidować metadane.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Conceptual workflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/60 p-4 border border-zinc-800 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#F97316] font-bold uppercase tracking-wider block">KROK 1: Folder strukturalny</span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Przenieś gotowy produkcyjny folder swojego projektu (np. wybudowany static site) do centralnego folderu <code className="text-[11px] font-mono bg-zinc-800 text-zinc-200 px-1 py-0.5 rounded">projects/[slug]/</code> w nadrzędnym projekcie.
              </p>
            </div>
            <div className="bg-zinc-900/60 p-4 border border-zinc-800 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#F97316] font-bold uppercase tracking-wider block">KROK 2: Wypełnij meta.json</span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                W folderze projektu utwórz i uzupełnij plik <code className="text-[11px] font-mono bg-zinc-800 text-zinc-200 px-1 py-0.5 rounded">meta.json</code> według standardowego kontraktu danych. Silnik zaciągnie stamtąd kolory, tagi i opisy.
              </p>
            </div>
            <div className="bg-zinc-900/60 p-4 border border-zinc-800 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#F97316] font-bold uppercase tracking-wider block">KROK 3: Automatyczna Walidacja</span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Uruchom poniższy skrypt <code className="text-[11px] font-mono bg-zinc-800 text-zinc-200 px-1 py-0.5 rounded">validate-project.js</code> przed commitowaniem, by upewnić się, że dane nie popsują głównej tablicy projektów.
              </p>
            </div>
          </div>

          {/* Tab 1: meta.json contract */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-[#F97316] flex items-center gap-1.5">
                <FileJson className="w-4 h-4" /> Standardowy schemat kontraktu (meta.json)
              </span>
              <button
                onClick={() => handleCopyCode(schemaExample, "schema")}
                className="text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white px-2.5 py-1 rounded transition-colors flex items-center gap-1"
              >
                {copiedIndex === "schema" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copiedIndex === "schema" ? "Skopiowano!" : "Kopiuj schemat"}
              </button>
            </div>
            <pre className="bg-zinc-900 border border-zinc-800 text-emerald-400 font-mono text-xs p-4 rounded-lg overflow-x-auto leading-relaxed max-h-[220px]">
              {schemaExample}
            </pre>
          </div>

          {/* Tab 2: validator script */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-[#F97316] flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> Skrypt Walidacyjny (validate-project.js)
              </span>
              <button
                onClick={() => handleCopyCode(validatorCode, "validator")}
                className="text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white px-2.5 py-1 rounded transition-colors flex items-center gap-1"
              >
                {copiedIndex === "validator" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copiedIndex === "validator" ? "Skopiowano!" : "Kopiuj kod skryptu"}
              </button>
            </div>
            <pre className="bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] p-4 rounded-lg overflow-x-auto leading-relaxed max-h-[240px]">
              {validatorCode}
            </pre>
          </div>

          <div className="p-4 bg-orange-950/20 border border-orange-900/40 rounded-lg flex gap-3 text-xs text-orange-200">
            <AlertCircle className="w-5 h-5 text-[#F97316] shrink-0" />
            <div className="font-sans leading-relaxed">
              <strong>Zalecenie Submodułu Git:</strong> Aby podpiąć ten Dziennik jako uzupełnienie głównego portfolio (dostępnego np. na <code className="bg-zinc-900 px-1 py-0.5 rounded">kamillimak.github.io/Projects</code>), możesz dodać to repozytorium jako Git Submodule poleceniem: <code className="bg-zinc-900 text-orange-400 px-1.5 py-0.5 rounded font-mono">git submodule add [url-tego-repo] dziennik</code>. Dzięki temu rozwijasz oba systemy niezależnie, zachowując czystą strukturę!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
