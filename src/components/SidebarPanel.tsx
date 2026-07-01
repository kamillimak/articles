import { Sparkles, BookOpen, Clock, Flame } from "lucide-react";
import { Article } from "../data/articles";

interface SidebarPanelProps {
  article: Article;
  fontSize: "sm" | "base" | "lg" | "xl";
  setFontSize: (size: "sm" | "base" | "lg" | "xl") => void;
  highlightsEnabled: boolean;
  setHighlightsEnabled: (enabled: boolean) => void;
  commentsCount: Record<string, number>;
  likesCount: number;
}

export default function SidebarPanel({
  article,
  fontSize,
  setFontSize,
  highlightsEnabled,
  setHighlightsEnabled,
  commentsCount,
  likesCount
}: SidebarPanelProps) {
  const totalComments = Object.entries(commentsCount)
    .filter(([paragraphId]) => paragraphId.startsWith(`${article.id}_`))
    .reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="sticky top-6 space-y-6">
      <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-5 shadow-sm">
        <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/40 font-bold mb-4 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" style={{ color: article.accentColor }} />
          Statystyki Artykułu
        </h4>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="bg-[#F9F8F6] rounded-lg p-3 border border-[#1A1A1A]/5">
            <span className="text-[9px] font-mono text-[#1A1A1A]/50 block uppercase tracking-wider">Czas czytania</span>
            <span className="text-sm font-display font-bold text-[#1A1A1A] mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" style={{ color: article.accentColor }} /> {article.readTimeMin} min
            </span>
          </div>
          <div className="bg-[#F9F8F6] rounded-lg p-3 border border-[#1A1A1A]/5">
            <span className="text-[9px] font-mono text-[#1A1A1A]/50 block uppercase tracking-wider">Słowa</span>
            <span className="text-sm font-display font-bold text-[#1A1A1A] mt-1">
              {article.wordCount} wyrazów
            </span>
          </div>
          <div className="bg-[#F9F8F6] rounded-lg p-3 border border-[#1A1A1A]/5">
            <span className="text-[9px] font-mono text-[#1A1A1A]/50 block uppercase tracking-wider">Reakcje</span>
            <span className="text-sm font-display font-bold text-[#1A1A1A] mt-1 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-100" /> {likesCount} braw
            </span>
          </div>
          <div className="bg-[#F9F8F6] rounded-lg p-3 border border-[#1A1A1A]/5">
            <span className="text-[9px] font-mono text-[#1A1A1A]/50 block uppercase tracking-wider">Komentarze</span>
            <span className="text-sm font-display font-bold text-[#1A1A1A] mt-1">
              {totalComments} wpisów
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-5 shadow-sm space-y-5">
        <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/40 font-bold flex items-center gap-1.5">
          <Settings className="w-3.5 h-3.5 text-[#1A1A1A]/60" />
          Ustawienia Czytnika
        </h4>

        <div>
          <span className="text-[9px] font-mono text-[#1A1A1A]/50 block mb-2 uppercase tracking-wider">Rozmiar Czcionki</span>
          <div className="flex bg-[#F9F8F6] p-1 rounded-lg border border-[#1A1A1A]/10">
            {(["sm", "base", "lg", "xl"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`flex-1 text-xs font-mono py-1 rounded-md transition-all ${
                  fontSize === size
                    ? "bg-white text-[#1A1A1A] font-bold shadow-sm border border-[#1A1A1A]/5"
                    : "text-[#1A1A1A]/40 hover:text-[#1A1A1A]/80"
                }`}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-[9px] font-mono text-[#1A1A1A]/50 block uppercase tracking-wider">Interaktywne Zakreślenie</span>
            <span className="text-xs text-[#1A1A1A]/60 font-sans">Podświetlaj kluczowe zdania</span>
          </div>
          <button
            onClick={() => setHighlightsEnabled(!highlightsEnabled)}
            className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
              highlightsEnabled ? "bg-[#F97316]" : "bg-[#1A1A1A]/10"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${
                highlightsEnabled ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="p-5 bg-orange-50/40 border border-[#F97316]/10 rounded-xl space-y-2">
        <span className="text-[10px] font-mono uppercase text-[#F97316] font-bold flex items-center gap-1 tracking-wider">
          <Sparkles className="w-3 h-3 text-[#F97316]" />
          Warsztat AI Coding
        </span>
        <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
          Ten cykl pokazuje praktyczny podział ról między <strong>Codexem</strong>, <strong>Trae</strong>, <strong>Claude</strong> i <strong>AI Studio</strong>. Czytaj sekcjami, komentuj konkretne akapity i sprawdzaj interaktywne moduły pod artykułami.
        </p>
      </div>
    </div>
  );
}

function Settings({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
