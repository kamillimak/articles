import { useState } from "react";
import { Folder, FileJson, ArrowRight, Layers, Eye, RefreshCw, Sparkles, BookOpen } from "lucide-react";

interface DiagramNode {
  id: string;
  title: string;
  description: string;
  details: string;
}

export default function InteractiveDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes: Record<string, DiagramNode> = {
    sources: {
      id: "sources",
      title: "Folder roboczy sources/",
      description: "Tzw. 'warsztat' i brudnopis projektów.",
      details: "Miejsce na pliki źródłowe, eksperymenty w AI (Claude, Lovable, Replit), zależności dev i lokalny bałagan. Nie trafia bezpośrednio do witryny publicznej, zapobiegając ładowaniu zbędnego kodu."
    },
    meta: {
      id: "meta",
      title: "Plik konfiguracyjny meta.json",
      description: "Sercem systemu — fakty zamiast kodu.",
      details: "Opisuje dane projektu: branżę, użyte narzędzia, kolor akcentu, datę dodania i flagę wyróżnienia. Pozwala na automatyczne renderowanie kart, filtrów oraz generowanie placeholderów okładek."
    },
    projects: {
      id: "projects",
      title: "Folder dystrybucyjny projects/",
      description: "Zweryfikowany, statyczny build produkcyjny.",
      details: "Zawiera wyłącznie czysty skompilowany kod (index.html, v2.html) z zaimplementowanym paskiem powrotu do portfolia. Czystość i brak zależności gwarantują błyskawiczne wczytywanie."
    },
    engine: {
      id: "engine",
      title: "Silnik Renderujący Portfolio",
      description: "Dynamiczny generator UI.",
      details: "Pobiera dane z pliku PROJECT_SOURCES i wstrzykuje informacje z meta.json. Tworzy siatkę kart, filtry wyszukiwania, okienka szczegółów i inteligentny system okładek w locie."
    }
  };

  return (
    <div id="interactive-diagram" className="my-10 p-6 border border-[#1A1A1A]/10 bg-white rounded-xl shadow-sm transition-all hover:border-[#F97316]/30">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#F97316] bg-orange-50 px-2 py-1 rounded-sm font-bold">
            Diagram Architektury
          </span>
          <h4 className="text-xl font-display font-bold text-[#1A1A1A] mt-2 tracking-tight">
            Architektura Systemu "Portfolio, które samo się buduje"
          </h4>
        </div>
        <p className="text-[10px] text-[#1A1A1A]/40 font-mono mt-2 md:mt-0 uppercase tracking-wider">
          * Kliknij element diagramu, aby sprawdzić szczegóły *
        </p>
      </div>

      {/* SVG Container with Responsive Coordinates */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[640px] relative">
          <svg viewBox="0 0 800 340" className="w-full h-auto text-[#1A1A1A]">
            {/* Background Grid Lines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f4f3ef" strokeWidth="1" />
              </pattern>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#1A1A1A" />
              </marker>
            </defs>
            <rect width="800" height="340" fill="url(#grid)" rx="8" />

            {/* Left Box: Sources (Drafts) */}
            <g 
              onClick={() => setActiveNode("sources")}
              className={`cursor-pointer transition-all ${activeNode === "sources" ? "scale-102 filter drop-shadow-sm" : "hover:opacity-95"}`}
            >
              <rect x="30" y="50" width="180" height="100" rx="8" fill={activeNode === "sources" ? "#fff" : "#fafafa"} stroke={activeNode === "sources" ? "#f97316" : "#1A1A1A"} strokeWidth={activeNode === "sources" ? "2.5" : "1.5"} />
              <foreignObject x="45" y="65" width="150" height="70">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-2">
                    <Folder className={`w-5 h-5 ${activeNode === "sources" ? "text-orange-500" : "text-[#1A1A1A]/80"}`} />
                    <span className="font-mono text-xs font-bold">sources/[slug]/</span>
                  </div>
                  <span className="text-[11px] text-[#1A1A1A]/60 font-sans leading-tight">Warsztat roboczy (AI, Replit, Lovable)</span>
                </div>
              </foreignObject>
            </g>

            {/* Connection Arrow sources -> projects */}
            <path d="M 210 100 L 265 100" stroke="#1A1A1A" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow)" />
            <foreignObject x="215" y="70" width="45" height="30">
              <div className="text-[9px] font-mono text-[#1A1A1A]/40 text-center uppercase tracking-wider font-bold">Weryfikacja</div>
            </foreignObject>

            {/* Right Box: Projects (Static Prod) */}
            <g 
              onClick={() => setActiveNode("projects")}
              className={`cursor-pointer transition-all ${activeNode === "projects" ? "scale-102 filter drop-shadow-sm" : "hover:opacity-95"}`}
            >
              <rect x="270" y="50" width="180" height="100" rx="8" fill={activeNode === "projects" ? "#fff" : "#fafafa"} stroke={activeNode === "projects" ? "#10b981" : "#1A1A1A"} strokeWidth={activeNode === "projects" ? "2.5" : "1.5"} />
              <foreignObject x="285" y="65" width="150" height="70">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className={`w-5 h-5 ${activeNode === "projects" ? "text-emerald-500" : "text-[#1A1A1A]/80"}`} />
                    <span className="font-mono text-xs font-bold text-emerald-700">projects/[slug]/</span>
                  </div>
                  <span className="text-[11px] text-[#1A1A1A]/60 font-sans leading-tight">Zweryfikowana dystrybucja witryny</span>
                </div>
              </foreignObject>
            </g>

            {/* Meta.json Sub-Box (Connected to Projects) */}
            <g 
              onClick={() => setActiveNode("meta")}
              className={`cursor-pointer transition-all ${activeNode === "meta" ? "scale-102 filter drop-shadow-sm" : "hover:opacity-95"}`}
            >
              <rect x="270" y="180" width="180" height="90" rx="8" fill={activeNode === "meta" ? "#fff" : "#fafafa"} stroke={activeNode === "meta" ? "#f97316" : "#1A1A1A"} strokeWidth={activeNode === "meta" ? "2" : "1.2"} />
              <foreignObject x="285" y="195" width="150" height="60">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-2">
                    <FileJson className={`w-4 h-4 ${activeNode === "meta" ? "text-orange-500" : "text-[#1A1A1A]/80"}`} />
                    <span className="font-mono text-xs font-bold text-zinc-700">meta.json</span>
                  </div>
                  <span className="text-[11px] text-[#1A1A1A]/60 font-sans leading-tight">Metadane, kolorystyka i narzędzia</span>
                </div>
              </foreignObject>
            </g>

            {/* Double Lines down from Projects & Meta into Engine */}
            <path d="M 450 100 L 530 100 C 560 100 560 160 580 160" stroke="#1A1A1A" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M 450 225 L 530 225 C 560 225 560 180 580 180" stroke="#1A1A1A" strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Engine Main Receiver Box */}
            <g 
              onClick={() => setActiveNode("engine")}
              className={`cursor-pointer transition-all ${activeNode === "engine" ? "scale-102 filter drop-shadow-md" : "hover:opacity-95"}`}
            >
              <rect x="590" y="110" width="180" height="110" rx="10" fill={activeNode === "engine" ? "#fff" : "#fafafa"} stroke={activeNode === "engine" ? "#f97316" : "#1A1A1A"} strokeWidth="2" />
              <foreignObject x="605" y="125" width="150" height="80">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className={`w-4 h-4 ${activeNode === "engine" ? "text-orange-500 animate-spin" : "text-orange-500"}`} />
                    <span className="font-display text-xs font-bold text-[#1A1A1A]">Silnik Portfolio</span>
                  </div>
                  <span className="text-[11px] text-[#1A1A1A]/60 font-sans leading-tight">
                    Dynamiczny odczyt, filtry, generowanie okładek w locie.
                  </span>
                </div>
              </foreignObject>
            </g>

            {/* Text details labels directly on SVG */}
            <text x="120" y="30" textAnchor="middle" className="font-mono text-[9px] fill-[#1A1A1A]/40 uppercase tracking-widest font-bold">STREFA KODOWANIA</text>
            <text x="360" y="30" textAnchor="middle" className="font-mono text-[9px] fill-[#1A1A1A]/40 uppercase tracking-widest font-bold">STREFA KONTRAKTU</text>
            <text x="680" y="30" textAnchor="middle" className="font-mono text-[9px] fill-[#1A1A1A]/40 uppercase tracking-widest font-bold">EFEKT KOŃCOWY</text>
          </svg>
        </div>
      </div>

      {/* Selected Node Details Display */}
      <div className="mt-4 p-5 bg-[#F9F8F6] border border-[#1A1A1A]/10 rounded-lg min-h-[110px] transition-all">
        {activeNode ? (
          <div className="animate-fade-in">
            <h5 className="font-display font-bold text-[#1A1A1A] flex items-center gap-2 text-base">
              {activeNode === "sources" && <Folder className="w-4 h-4 text-[#F97316]" />}
              {activeNode === "projects" && <Layers className="w-4 h-4 text-emerald-500" />}
              {activeNode === "meta" && <FileJson className="w-4 h-4 text-[#F97316]" />}
              {activeNode === "engine" && <RefreshCw className="w-4 h-4 text-orange-500" />}
              {nodes[activeNode].title}
            </h5>
            <p className="text-[10px] text-[#1A1A1A]/40 font-mono mt-1 uppercase tracking-wider">{nodes[activeNode].description}</p>
            <p className="text-xs md:text-sm text-[#1A1A1A]/80 font-sans mt-3 leading-relaxed">
              {nodes[activeNode].details}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-4 h-full">
            <BookOpen className="w-5 h-5 text-[#1A1A1A]/30 mb-2 animate-pulse" />
            <p className="text-xs md:text-sm text-[#1A1A1A]/50 font-sans">
              Kliknij na dowolny element schematu powyżej, aby zobaczyć jak współpracuje w ekosystemie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
