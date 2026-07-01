import { useState, useEffect } from "react";
import { ProjectMeta, INITIAL_PROJECT_META } from "../types";
import { Sparkles, Image as ImageIcon, Code, FileJson, AlertTriangle, Eye, HelpCircle, Check, Info } from "lucide-react";

export default function CardSimulator() {
  const [jsonText, setJsonText] = useState<string>(
    JSON.stringify(INITIAL_PROJECT_META, null, 2)
  );
  const [projectData, setProjectData] = useState<ProjectMeta>(INITIAL_PROJECT_META);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Validate and parse JSON in real-time
  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonText);
      // Basic duck typing validation
      if (typeof parsed.title !== "string") throw new Error("Pole 'title' musi być tekstem.");
      if (typeof parsed.colorAccent !== "string") throw new Error("Pole 'colorAccent' musi być tekstem.");
      
      setProjectData({
        id: parsed.id || "project",
        title: parsed.title || "Tytuł projektu",
        industry: parsed.industry || "Branża",
        category: parsed.category || "Inne",
        description: parsed.description || "",
        tools: parsed.tools || "",
        colorAccent: parsed.colorAccent || "#F97316",
        colorBg: parsed.colorBg || "#111827",
        tags: Array.isArray(parsed.tags) ? parsed.tags : ["Projekt"],
        featured: typeof parsed.featured === "boolean" ? parsed.featured : false,
        dateAdded: parsed.dateAdded || "2026-06"
      });
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Niepoprawny format JSON");
    }
  }, [jsonText]);

  // Quick presets to change project values
  const loadPreset = (preset: Partial<ProjectMeta>) => {
    const merged = { ...projectData, ...preset };
    setJsonText(JSON.stringify(merged, null, 2));
  };

  return (
    <div id="card-simulator" className="my-10 border border-[#1A1A1A]/10 bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:border-[#F97316]/30">
      <div className="bg-white border-b border-[#1A1A1A]/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#F97316] bg-orange-50 px-2 py-1 rounded-sm font-bold">
            Interaktywny Warsztat
          </span>
          <h4 className="text-lg font-display font-bold text-[#1A1A1A] mt-2 tracking-tight">
            Zasymuluj "meta.json" & Autogenerator Okładek
          </h4>
          <p className="text-xs text-[#1A1A1A]/60 font-sans mt-1">
            Zmień dane projektu w pliku JSON po lewej, by zobaczyć jak silnik automatycznie generuje kartę i okładkę.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadPreset({ colorAccent: "#A855F7", title: "CyberFlow — Automatyzacja", industry: "AI SaaS", tools: "Next.js - Tailwind - Gemini" })}
            className="text-[10px] font-mono font-bold px-2.5 py-1.5 bg-[#F9F8F6] text-[#1A1A1A]/80 hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A]/10 rounded-sm transition-all"
          >
            SaaS (Fiolet)
          </button>
          <button
            onClick={() => loadPreset({ colorAccent: "#10B981", title: "EcoCart — E-Commerce", industry: "Zielona Energia", tools: "Shopify - Alpine.js" })}
            className="text-[10px] font-mono font-bold px-2.5 py-1.5 bg-[#F9F8F6] text-[#1A1A1A]/80 hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A]/10 rounded-sm transition-all"
          >
            Ecom (Zielony)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#1A1A1A]/10">
        {/* Left Side: Live JSON Editor */}
        <div className="lg:col-span-5 p-5 flex flex-col bg-[#111827] text-zinc-300 min-h-[340px]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-500 pb-2 border-b border-zinc-850">
            <span className="flex items-center gap-1.5 font-bold text-zinc-400">
              <FileJson className="w-3.5 h-3.5 text-[#F97316]" />
              projects/{projectData.id}/meta.json
            </span>
            <span className="text-[9px] bg-zinc-900 px-1.5 py-0.5 rounded text-[#F97316] font-bold uppercase tracking-wider">
              Edytor
            </span>
          </div>

          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full flex-grow bg-transparent text-[#10B981] font-mono text-xs focus:outline-none resize-none leading-relaxed min-h-[220px]"
            spellCheck="false"
          />

          {jsonError ? (
            <div className="mt-3 p-2.5 bg-rose-950/40 border border-rose-900 rounded-lg text-[11px] text-rose-300 font-mono flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <span>{jsonError}</span>
            </div>
          ) : (
            <div className="mt-3 p-2 bg-emerald-950/20 border border-emerald-900/40 rounded-lg text-[10px] text-[#10B981] font-mono flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              Poprawny schemat meta.json
            </div>
          )}
        </div>

        {/* Right Side: Real-time Render View */}
        <div className="lg:col-span-7 p-6 bg-[#F9F8F6] flex flex-col justify-between min-h-[340px]">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold text-[#1A1A1A]/40 uppercase tracking-widest flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#1A1A1A]/30" /> Podgląd karty w portfolio
            </span>

            {/* Selector: Live Screenshot VS Placeholder */}
            <div className="flex bg-white border border-[#1A1A1A]/10 rounded-sm p-0.5 text-xs">
              <button
                onClick={() => setShowPlaceholder(true)}
                className={`px-2.5 py-1 rounded-sm font-bold text-[11px] transition-all ${
                  showPlaceholder
                    ? "bg-[#1A1A1A] text-white"
                    : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                }`}
              >
                Autogenerator
              </button>
              <button
                onClick={() => setShowPlaceholder(false)}
                className={`px-2.5 py-1 rounded-sm font-bold text-[11px] transition-all ${
                  !showPlaceholder
                    ? "bg-[#1A1A1A] text-white"
                    : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                }`}
              >
                Makieta zrzutu
              </button>
            </div>
          </div>

          {/* Actual Card Render */}
          <div className="flex justify-center items-center py-4">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full max-w-[340px] rounded-xl bg-white shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5"
              style={{
                borderColor: isHovered ? projectData.colorAccent : "transparent",
                borderWidth: "1.5px",
                borderStyle: "solid",
                boxShadow: isHovered 
                  ? `0 10px 25px -5px ${projectData.colorAccent}1A, 0 8px 10px -6px ${projectData.colorAccent}1A`
                  : "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)"
              }}
            >
              {/* Card Image Cover Section */}
              <div className="aspect-[16/9] w-full overflow-hidden relative border-b border-[#1A1A1A]/5">
                {showPlaceholder ? (
                  /* THE AUTOGENERATED CANVAS/SVG COVER */
                  <div
                    className="w-full h-full p-4 flex flex-col justify-between transition-colors duration-500 relative"
                    style={{ backgroundColor: projectData.colorBg }}
                  >
                    {/* Background faint grid to give premium technical look */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                      backgroundImage: `radial-gradient(${projectData.colorAccent} 1px, transparent 1px)`,
                      backgroundSize: '12px 12px'
                    }} />

                    <div className="flex justify-between items-start z-10">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ 
                              color: projectData.colorAccent, 
                              backgroundColor: `${projectData.colorAccent}15`,
                              borderColor: `${projectData.colorAccent}30`,
                              borderWidth: '1px'
                            }}>
                        {projectData.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {projectData.dateAdded}
                      </span>
                    </div>

                    <div className="my-auto z-10">
                      <h5 className="font-display font-medium text-base text-zinc-100 tracking-tight leading-tight">
                        {projectData.title}
                      </h5>
                    </div>

                    <div className="flex items-center justify-between z-10 border-t border-zinc-800/60 pt-2">
                      <span className="text-[9px] font-mono text-zinc-400 truncate max-w-[70%]">
                        {projectData.tools}
                      </span>
                      <Sparkles className="w-3.5 h-3.5" style={{ color: projectData.colorAccent }} />
                    </div>
                  </div>
                ) : (
                  /* SIMULATED BLURRED REAL SCREENSHOT WITH BARS */
                  <div className="w-full h-full bg-zinc-900 relative flex flex-col p-2 justify-between">
                    {/* Fake Browser top bar */}
                    <div className="flex items-center gap-1 bg-zinc-800/80 px-2 py-1 rounded text-[8px] text-zinc-400 font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                      <span className="ml-1 opacity-60 font-mono">localhost:3000/{projectData.id}</span>
                    </div>

                    {/* Highly stylized blurred layout mimicking screenshot */}
                    <div className="flex-grow flex items-center justify-center p-3 relative">
                      <div className="w-full h-full opacity-35 filter blur-[3px] rounded bg-gradient-to-tr from-zinc-800 to-zinc-950 border border-zinc-700/50 p-3 flex flex-col gap-2 justify-center">
                        <div className="h-4 w-1/2 bg-zinc-700 rounded" />
                        <div className="h-3 w-3/4 bg-zinc-800 rounded" />
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div className="h-8 bg-zinc-800 rounded border border-zinc-700/20" />
                          <div className="h-8 bg-zinc-800 rounded border border-zinc-700/20" />
                          <div className="h-8 bg-zinc-800 rounded border border-zinc-700/20" style={{ borderColor: projectData.colorAccent }} />
                        </div>
                      </div>
                      
                      {/* Badge in center indicating simulated screenshot */}
                      <div className="absolute bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono text-zinc-300 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                        <ImageIcon className="w-3 h-3 text-emerald-400" />
                        <span>Symulacja zrzutu ekranu</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Meta Description Text */}
              <div className="p-4 bg-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  {projectData.industry}
                </span>
                <h6 className="font-display font-medium text-[#1A1A1A] mt-1 hover:text-[#F97316] transition-colors">
                  {projectData.title}
                </h6>
                <p className="text-xs text-[#1A1A1A]/70 font-sans mt-2 line-clamp-2">
                  {projectData.description || "Brak opisu projektu. Uzupełnij pole 'description' w pliku meta.json."}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {projectData.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono bg-[#F9F8F6] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A]/60 px-2 py-0.5 border border-[#1A1A1A]/5 rounded-sm transition-all"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Info Message */}
          <div className="p-4 border border-[#F97316]/10 bg-orange-50/25 rounded-lg text-xs text-[#1A1A1A]/70 flex gap-2">
            <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <div className="font-sans leading-relaxed">
              <strong>Autogenerator okładek (Placeholder)</strong> czerpie właściwości <code className="font-mono text-[10.5px] bg-white border border-[#1A1A1A]/10 px-1 py-0.5 rounded-sm shadow-sm">colorAccent</code>, <code className="font-mono text-[10.5px] bg-white border border-[#1A1A1A]/10 px-1 py-0.5 rounded-sm shadow-sm">colorBg</code> oraz dane tekstowe bezpośrednio z JSON-a. Strona nigdy nie wygląda na niedokończoną!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
