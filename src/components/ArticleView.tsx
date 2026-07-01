import { useState } from "react";
import { MessageSquare, Heart, Share2, ArrowLeft, ArrowRight, Eye, Sparkles } from "lucide-react";
import InteractiveDiagram from "./InteractiveDiagram";
import CardSimulator from "./CardSimulator";
import ProofChecklist from "./ProofChecklist";
import ToolMatrix from "./ToolMatrix";
import JsonValidatorWidget from "./JsonValidatorWidget";
import { Article, ARTICLES } from "../data/articles";

interface ArticleViewProps {
  article: Article;
  fontSize: "sm" | "base" | "lg" | "xl";
  highlightsEnabled: boolean;
  onOpenComments: (paragraphId: string) => void;
  commentsCount: Record<string, number>;
  likesCount: number;
  onLike: () => void;
  isLiked: boolean;
  onBackToHome: () => void;
  onSelectArticle: (id: string) => void;
}

export default function ArticleView({
  article,
  fontSize,
  highlightsEnabled,
  onOpenComments,
  commentsCount,
  likesCount,
  onLike,
  isLiked,
  onBackToHome,
  onSelectArticle
}: ArticleViewProps) {
  // Local state for highlights marked in this session
  const [sessionHighlights, setSessionHighlights] = useState<Record<string, boolean>>({
    "p1-s1": true,
    "p2-s2": true,
    "p3-s1": true,
  });

  const toggleHighlight = (key: string) => {
    if (!highlightsEnabled) return;
    setSessionHighlights(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const fontSizeClass = {
    sm: "text-base leading-relaxed",
    base: "text-lg leading-relaxed md:text-[19px] md:leading-8",
    lg: "text-xl leading-relaxed md:text-[22px] md:leading-9",
    xl: "text-2xl leading-relaxed md:text-[25px] md:leading-10",
  }[fontSize];

  // Find index and next article
  const currentIndex = ARTICLES.findIndex(a => a.id === article.id);
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : ARTICLES[0];

  return (
    <article className="max-w-[720px] mx-auto px-1 py-4">
      {/* Navigation & Back button */}
      <button
        onClick={onBackToHome}
        className="group flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A]/60 hover:text-[#F97316] mb-8 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Powrót do Dziennika
      </button>

      {/* Article Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs font-mono text-[#F97316] mb-6">
          <span className="px-2 py-0.5 bg-[#F97316] text-white text-[9px] font-bold tracking-tighter uppercase rounded-sm">
            Opublikowane
          </span>
          <span className="text-[10px] tracking-widest font-semibold uppercase opacity-40 text-[#1A1A1A]">
            {article.wpis} · {article.readTime}
          </span>
        </div>

        <h1 
          className="font-display font-bold text-4xl md:text-6xl text-[#1A1A1A] tracking-tighter leading-[0.95] mb-8"
          dangerouslySetInnerHTML={{ __html: article.titleRich }}
        />
        
        <h3 className="font-sans text-base md:text-lg text-[#1A1A1A]/80 font-normal leading-relaxed mb-8">
          {article.subtitle}
        </h3>

        {/* Author Bio Section */}
        <div className="flex items-center justify-between py-6 border-y border-[#1A1A1A]/10 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white font-serif italic text-lg shadow-md">
              KM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-xs text-[#1A1A1A]">Kamil Mikołajczyk</span>
                <span className="text-[9px] uppercase tracking-wider bg-orange-100 text-[#F97316] px-1.5 py-0.5 rounded-sm font-bold">Autor</span>
              </div>
              <p className="text-[10px] text-[#1A1A1A]/50 font-mono uppercase tracking-wider mt-0.5">
                Future IT · Żórawina / Wrocław
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isLiked 
                  ? "bg-rose-50 text-rose-600 border border-rose-200" 
                  : "bg-white hover:bg-zinc-50 text-zinc-600 border border-[#1A1A1A]/10 shadow-sm"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 stroke-rose-500" : ""}`} />
              <span>{likesCount}</span>
            </button>
            <span className="text-xs text-[#1A1A1A]/50 font-mono hidden sm:inline">{article.date}</span>
          </div>
        </div>
      </header>

      {/* Hero Banner Image */}
      <div className="my-10 -mx-4 md:-mx-12 relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
        <img
          src={article.heroImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-auto object-cover rounded-none md:rounded-2xl shadow-md border border-[#1A1A1A]/10"
        />
        <div className="mt-3 px-4 md:px-12 text-center">
          <p className="text-xs text-zinc-400 font-mono italic">
            {article.imageCaption}
          </p>
        </div>
      </div>

      {/* Article Content Area */}
      <div className={`font-serif text-zinc-800 ${fontSizeClass} space-y-7 mb-12`}>
        {article.paragraphs.map((p, idx) => {
          // Scope paragraph IDs per article dynamically
          const globalParagraphId = `${article.id}_${p.id}`;
          const globalHighlightId = `${article.id}_${p.highlightId || `h-${idx}`}`;
          
          const isHighlighted = sessionHighlights[globalHighlightId] && highlightsEnabled;
          const boldPart = p.boldSnippet || "";
          const normalPart = boldPart ? p.text.replace(boldPart, "") : p.text;

          return (
            <p key={p.id} className="relative group">
              {boldPart ? (
                <>
                  <span 
                    onClick={() => toggleHighlight(globalHighlightId)}
                    className={`transition-all rounded px-0.5 cursor-pointer ${
                      isHighlighted
                        ? "bg-amber-100 border-b-2 border-amber-300 text-zinc-900" 
                        : "hover:bg-zinc-50"
                    }`}
                  >
                    {boldPart}
                  </span>
                  {normalPart}
                </>
              ) : (
                p.text
              )}

              {/* Comments margin trigger */}
              <button
                onClick={() => onOpenComments(globalParagraphId)}
                className="absolute -left-12 top-1 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-full bg-white border border-[#1A1A1A]/10 shadow-sm text-zinc-500 hover:text-[#F97316] hover:scale-105 hidden md:block cursor-pointer"
                title="Skomentuj akapit"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                {commentsCount[globalParagraphId] > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#F97316] text-white text-[8px] px-1 rounded-full font-mono font-bold">
                    {commentsCount[globalParagraphId]}
                  </span>
                )}
              </button>
            </p>
          );
        })}
      </div>

      {/* Custom Dynamic Interactive Widgets Based on Article Topic */}
      {article.hasCustomWidget === "diagram" && (
        <div className="space-y-6">
          <InteractiveDiagram />
          <CardSimulator />
        </div>
      )}

      {article.hasCustomWidget === "simulator" && (
        <CardSimulator />
      )}

      {article.hasCustomWidget === "checklist" && (
        <ProofChecklist />
      )}

      {article.hasCustomWidget === "tools" && (
        <ToolMatrix />
      )}

      {article.hasCustomWidget === "validator" && (
        <JsonValidatorWidget />
      )}

      {/* Horizontal divider */}
      <hr className="border-[#1A1A1A]/10 my-10" />

      {/* "Next Post" Recommendation Teaser */}
      <footer className="bg-white border border-[#1A1A1A]/10 rounded-xl p-6 hover:border-[#F97316]/40 transition-all shadow-sm">
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#F97316] font-bold block mb-1">
          Polecany kolejny artykuł
        </span>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h4 
              onClick={() => onSelectArticle(nextArticle.id)}
              className="font-display font-bold text-lg text-[#1A1A1A] hover:text-[#F97316] transition-colors cursor-pointer leading-tight"
            >
              {nextArticle.title}
            </h4>
            <p className="text-xs text-[#1A1A1A]/60 font-sans mt-1">
              {nextArticle.subtitle}
            </p>
          </div>
          <button
            onClick={() => onSelectArticle(nextArticle.id)}
            className="text-xs font-mono font-medium px-4 py-2 bg-[#1A1A1A] hover:bg-[#F97316] text-white rounded-sm whitespace-nowrap transition-all flex items-center gap-1 shrink-0 shadow-md cursor-pointer"
          >
            Przejdź do artykułu <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </article>
  );
}
