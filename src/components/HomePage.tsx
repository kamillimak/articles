import { useState } from "react";
import { motion } from "motion/react";
import { Search, BookOpen, Clock, ArrowRight, Terminal, Layers, Code2, Compass, CheckCircle, Sparkles } from "lucide-react";
import { ARTICLES } from "../data/articles";

interface HomePageProps {
  onSelectArticle: (id: string) => void;
}

const TOOL_FLOW = [
  { label: "AI Studio", text: "Mapa systemu i szeroki kontekst", icon: Compass },
  { label: "Claude", text: "Architektura, warianty i refaktoryzacja", icon: Sparkles },
  { label: "Codex", text: "Zmiany w repozytorium i weryfikacja", icon: Terminal },
  { label: "Trae", text: "Precyzyjne lokalne poprawki w edytorze", icon: Code2 },
];

export default function HomePage({ onSelectArticle }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("WSZYSTKIE");
  const [maxReadTime, setMaxReadTime] = useState<number>(10);

  const totalArticles = ARTICLES.length;
  const totalReadTime = ARTICLES.reduce((sum, a) => sum + a.readTimeMin, 0);
  const totalWords = ARTICLES.reduce((sum, a) => sum + a.wordCount, 0);
  const categories = ["WSZYSTKIE", ...Array.from(new Set(ARTICLES.map(article => article.category)))];

  const filteredArticles = ARTICLES.filter((article) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(query) ||
      article.subtitle.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query);

    const matchesCategory = selectedCategory === "WSZYSTKIE" || article.category === selectedCategory;
    const matchesReadTime = article.readTimeMin <= maxReadTime;

    return matchesSearch && matchesCategory && matchesReadTime;
  });

  const featuredArticle = ARTICLES[0];

  return (
    <div className="space-y-12">
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end py-6">
        <div className="lg:col-span-7">
          <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-[#F97316] font-bold">
            AI Coding Workflow · Codex · Trae · Claude · AI Studio
          </span>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-[#1A1A1A] tracking-tighter leading-[0.92] mt-4 mb-6">
            Warsztat <br />
            <span className="font-serif italic font-light text-[#F97316]">AI Coding</span>
          </h1>
          <p className="text-base md:text-xl text-[#1A1A1A]/72 font-sans leading-relaxed max-w-2xl">
            Pięć esejów o pracy z narzędziami AI w prawdziwym repozytorium: jak planować, dzielić role,
            edytować kod, sprawdzać wynik i nie zamieniać produktywności w chaos.
          </p>
        </div>

        <button
          onClick={() => onSelectArticle(featuredArticle.id)}
          className="lg:col-span-5 text-left bg-[#1A1A1A] text-white border border-[#1A1A1A] rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-all group"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-bold">Start serii</span>
          <h2 className="font-display font-bold text-2xl mt-3 leading-tight group-hover:text-orange-100 transition-colors">
            {featuredArticle.title}
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed mt-3">
            {featuredArticle.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-mono font-bold text-white">
            Czytaj pierwszy artykuł <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-5 shadow-sm">
          <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider block">Artykuły</span>
          <span className="text-3xl font-display font-extrabold text-[#1A1A1A] block mt-1">{totalArticles}</span>
          <span className="text-[10px] font-mono text-[#F97316] block mt-1">Pełna seria</span>
        </div>
        <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-5 shadow-sm">
          <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider block">Czas czytania</span>
          <span className="text-3xl font-display font-extrabold text-[#1A1A1A] block mt-1">{totalReadTime} <span className="text-sm font-sans font-normal text-zinc-500">min</span></span>
          <span className="text-[10px] font-mono text-[#F97316] block mt-1">Kompaktowy przewodnik</span>
        </div>
        <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-5 shadow-sm">
          <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider block">Objętość</span>
          <span className="text-3xl font-display font-extrabold text-[#1A1A1A] block mt-1">{totalWords}</span>
          <span className="text-[10px] font-mono text-emerald-600 block mt-1">Słów w serii</span>
        </div>
        <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-5 shadow-sm">
          <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider block">Model pracy</span>
          <span className="text-3xl font-display font-extrabold text-[#1A1A1A] block mt-1">4</span>
          <span className="text-[10px] font-mono text-indigo-600 block mt-1">Narzędzia, jeden proces</span>
        </div>
      </section>

      <section className="max-w-6xl mx-auto bg-white border border-[#1A1A1A]/10 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-xl">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-[#1A1A1A]/40" />
            </span>
            <input
              type="text"
              placeholder="Szukaj po narzędziu, temacie albo problemie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 w-full bg-[#F9F8F6] border border-[#1A1A1A]/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316] transition-all"
            />
          </div>

          <div className="flex items-center gap-4 bg-[#F9F8F6] border border-[#1A1A1A]/5 px-4 py-2 rounded-lg">
            <span className="text-xs font-mono text-[#1A1A1A]/50 whitespace-nowrap">Maks. czas:</span>
            <input
              type="range"
              min="5"
              max="10"
              value={maxReadTime}
              onChange={(e) => setMaxReadTime(Number(e.target.value))}
              className="w-24 md:w-32 accent-[#F97316]"
            />
            <span className="text-xs font-mono font-bold text-[#F97316] min-w-[32px]">{maxReadTime} min</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-5 mt-5 border-t border-[#1A1A1A]/5">
          <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-wider mr-2">Narzędzie:</span>
          {categories.map((cat) => {
            const count = cat === "WSZYSTKIE" ? ARTICLES.length : ARTICLES.filter(a => a.category === cat).length;
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

      <section className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-bold">Biblioteka serii</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#1A1A1A] mt-1">Artykuły</h2>
          </div>
          <span className="text-xs font-mono text-[#1A1A1A]/40 hidden sm:inline">{filteredArticles.length} wyników</span>
        </div>

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
                <motion.article
                  key={article.id}
                  layout
                  onClick={() => onSelectArticle(article.id)}
                  className={`group bg-white border border-[#1A1A1A]/10 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between ${
                    isLarge ? "md:col-span-2 flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/10" : ""
                  }`}
                  style={{ borderLeftColor: article.accentColor, borderLeftWidth: "4px" }}
                  whileHover={{ y: -3 }}
                >
                  <div className={`overflow-hidden relative ${isLarge ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"}`}>
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1A1A1A] text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      {article.wpis}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/95 text-[#1A1A1A] font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      {article.category}
                    </div>
                  </div>

                  <div className={`p-6 flex flex-col justify-between flex-grow ${isLarge ? "md:w-1/2" : ""}`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-mono font-bold" style={{ color: article.accentColor }}>
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                        <span>·</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="font-display font-extrabold text-xl md:text-2xl text-[#1A1A1A] group-hover:text-[#F97316] transition-colors leading-tight">
                        {article.title}
                      </h3>

                      <p className="text-xs md:text-sm text-[#1A1A1A]/70 leading-relaxed font-sans line-clamp-3">
                        {article.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#1A1A1A]/5 pt-4 mt-6">
                      <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.wordCount} słów
                      </span>
                      <span className="text-xs font-mono font-bold text-[#1A1A1A] group-hover:text-[#F97316] flex items-center gap-1 transition-colors">
                        Czytaj dalej <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto bg-[#1A1A1A] text-white rounded-xl overflow-hidden shadow-lg border border-[#1A1A1A]">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <Layers className="w-5 h-5 text-[#F97316]" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] font-bold">Layout serii</span>
            <h2 className="font-display text-2xl font-bold tracking-tight">Jak czytać ten przewodnik</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {TOOL_FLOW.map(({ label, text, icon: Icon }, index) => (
            <div key={label} className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5 text-[#F97316]" />
                <span className="text-[10px] font-mono text-white/30">0{index + 1}</span>
              </div>
              <h3 className="font-display font-bold text-lg">{label}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white/[0.03] border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
            Strony artykułów mają układ czytelniczy: mocny nagłówek, metadane, obraz, sekcje tematyczne, pull-quote i interaktywny moduł dopasowany do tematu.
          </p>
          <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-300">
            <CheckCircle className="w-4 h-4" /> Gotowe pod publikację
          </span>
        </div>
      </section>
    </div>
  );
}
