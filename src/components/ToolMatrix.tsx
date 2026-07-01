import { useState } from "react";
import { MessageSquare, Heart, Clock, Layers, ArrowRight, Sparkles, Check, Cpu, AlertTriangle, Terminal } from "lucide-react";

interface ToolDetails {
  name: string;
  role: string;
  strength: string;
  weakness: string;
  promptExample: string;
  color: string;
}

export default function ToolMatrix() {
  const [selectedTool, setSelectedTool] = useState<string>("lovable");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const tools: Record<string, ToolDetails> = {
    lovable: {
      name: "Lovable.dev",
      role: "Szybkie prototypowanie interfejsów (UI) i makiety",
      strength: "Błyskawiczne generowanie komponentów React/Tailwind, ładny design, świetna reakcja na zmiany wizualne.",
      weakness: "Gorzej radzi sobie ze skomplikowaną logiką biznesową, bazami danych i skryptami systemowymi.",
      promptExample: 'Stwórz dla mnie minimalistyczny widok listy wpisów na blogu z filtrowaniem po tagach. Użyj ciepłego koloru akcentu i eleganckiej szeryfowej typografii w nagłówkach.',
      color: "#F97316"
    },
    claude: {
      name: "Claude (Anthropic)",
      role: "Złożone algorytmy i refaktoryzacja kodu",
      strength: "Wyjątkowa precyzja matematyczna, świetna strukturyzacja kodu, pisanie optymalnych algorytmów i parserów.",
      weakness: "Wersja webowa nie ma natychmiastowego podglądu kodu w kontekście całego repozytorium.",
      promptExample: 'Napisz funkcję w TypeScript, która przyjmuje nieuporządkowany JSON z plikami i zwraca posortowane, przefiltrowane dane bez duplikatów. Zadbaj o pełne typowanie.',
      color: "#D97706"
    },
    replit: {
      name: "Replit Agent",
      role: "Konfiguracja serwerów backendowych i środowiska",
      strength: "Natychmiastowe uruchomienie kontenera Node/Python, automatyczne instalowanie zależności i konfiguracja portów.",
      weakness: "Mniej dopracowany linter na froncie, wolniejsze reakcje przy dużych plikach statycznych.",
      promptExample: 'Skonfiguruj serwer Express.js obsługujący przesyłanie plików i parsujący pliki meta.json. Dodaj middleware CORS i obsłuż błędy.',
      color: "#2563EB"
    },
    gemini: {
      name: "Gemini (AI Studio)",
      role: "Nadrzędna analiza architektury z dużym oknem kontekstu",
      strength: "Zdolność do przeanalizowania kilkunastu plików jednocześnie (nawet 2 miliony tokenów!), planowanie migracji.",
      weakness: "Może czasami gubić najmniejsze detale składniowe w bardzo krótkich jednolinijkowych edycjach.",
      promptExample: 'Przeanalizuj moją całą strukturę plików i powiedz, w jaki sposób najlepiej wydzielić stan komentarzy, aby pasował do struktury submodule.',
      color: "#8B5CF6"
    },
    trae: {
      name: "Trae / VS Code Agent",
      role: "Lokalne edycje w edytorze kodu (Surgical edits)",
      strength: "Integracja z lokalnym systemem plików, precyzyjne edytowanie pojedynczych linijek kodu bez psucia reszty pliku.",
      weakness: "Zależny od lokalnej mocy obliczeniowej, mniejsze okno kontekstowe w darmowych planach.",
      promptExample: 'Dodaj ID i unikalną klasę CSS do przycisku "Zapisz" w pliku src/components/CommentsDrawer.tsx.',
      color: "#10B981"
    }
  };

  const challenges = [
    { id: "q1", task: "Stworzenie nowego wyglądu kafelka projektu z efektami hover", correct: "lovable" },
    { id: "q2", task: "Napisanie algorytmu sprawdzającego poprawność tagów HEX", correct: "claude" },
    { id: "q3", task: "Uruchomienie serwera proxy dla API i bazy danych na porcie 3000", correct: "replit" },
    { id: "q4", task: "Przeanalizowanie 15 plików kodu pod kątem długu technologicznego", correct: "gemini" }
  ];

  const handleSelectAnswer = (qId: string, toolId: string) => {
    setAnswers(prev => ({ ...prev, [qId]: toolId }));
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const activeTool = tools[selectedTool];

  return (
    <div className="my-10 p-6 border border-[#3B82F6]/20 bg-white rounded-xl shadow-sm hover:border-[#3B82F6]/40 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-1 rounded-sm font-bold">
            Orkiestracja Multi-LLM
          </span>
          <h4 className="text-lg font-display font-bold text-[#1A1A1A] mt-2 tracking-tight">
            Matryca Podziału Ról AI w Projekcie
          </h4>
        </div>
        <p className="text-[10px] text-[#1A1A1A]/40 font-mono mt-2 md:mt-0 uppercase">
          * Klikaj ikony modeli, aby poznać ich supermoce *
        </p>
      </div>

      {/* Tabs list of tools */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {Object.entries(tools).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setSelectedTool(key)}
            className={`p-2.5 text-center border rounded-lg transition-all cursor-pointer ${
              selectedTool === key
                ? "bg-[#3B82F6]/10 border-[#3B82F6] text-[#3B82F6]"
                : "bg-[#F9F8F6] border-[#1A1A1A]/5 text-[#1A1A1A]/60 hover:border-[#1A1A1A]/20"
            }`}
          >
            <span className="text-[10px] md:text-xs font-mono font-bold block">{t.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Selected tool detail card */}
      <div className="bg-[#F9F8F6] border border-[#1A1A1A]/10 rounded-lg p-5 mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-[#3B82F6]" />
          <div>
            <h5 className="text-sm font-display font-bold text-[#1A1A1A]">{activeTool.name}</h5>
            <p className="text-[10.5px] font-mono text-[#F97316] uppercase tracking-wider">{activeTool.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3 border-t border-[#1A1A1A]/5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold block">Główna Zaleta:</span>
            <p className="text-zinc-700 leading-relaxed font-sans">{activeTool.strength}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-rose-600 font-bold block">Słaby Punkt:</span>
            <p className="text-zinc-700 leading-relaxed font-sans">{activeTool.weakness}</p>
          </div>
        </div>

        <div className="p-3.5 bg-white border border-[#1A1A1A]/5 rounded-md space-y-1.5">
          <span className="text-[9px] font-mono uppercase text-zinc-400 font-bold flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" /> Kopiuj Prompt Przepis:
          </span>
          <p className="text-[11px] font-mono text-[#10B981] italic leading-relaxed">{`"${activeTool.promptExample}"`}</p>
        </div>
      </div>

      {/* Mini-challenge workflow matcher */}
      <div className="border-t border-[#1A1A1A]/10 pt-6">
        <h5 className="text-xs font-mono font-bold uppercase text-[#1A1A1A] mb-3 flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-[#F97316]" /> Wyzwanie: Przypisz zadania właściwym modelom
        </h5>
        <p className="text-[11px] text-zinc-500 font-sans mb-4">
          Dopasuj zadania deweloperskie do idealnych asystentów, aby zachować czysty i bezkonfliktowy workflow deweloperski.
        </p>

        <div className="space-y-3">
          {challenges.map((q) => (
            <div key={q.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white border border-[#1A1A1A]/10 rounded-lg gap-3">
              <span className="text-xs font-sans text-zinc-800">{q.task}</span>
              <div className="flex flex-wrap gap-2.5">
                {Object.keys(tools).map((tKey) => (
                  <button
                    key={tKey}
                    onClick={() => handleSelectAnswer(q.id, tKey)}
                    className={`px-2 py-1 text-[10px] font-mono rounded-sm transition-all cursor-pointer ${
                      answers[q.id] === tKey
                        ? "bg-[#1A1A1A] text-white border-transparent"
                        : "bg-[#F9F8F6] text-[#1A1A1A]/60 border border-[#1A1A1A]/5 hover:bg-[#1A1A1A]/5"
                    }`}
                  >
                    {tools[tKey].name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={handleCheckAnswers}
            disabled={Object.keys(answers).length < challenges.length}
            className={`font-mono text-xs font-bold py-2 px-4 rounded-sm shadow-sm transition-all ${
              Object.keys(answers).length === challenges.length
                ? "bg-[#3B82F6] hover:bg-blue-600 text-white cursor-pointer"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
          >
            Sprawdź dopasowanie
          </button>

          {showResults && (
            <div className="text-xs font-mono flex items-center gap-1">
              {challenges.every(q => answers[q.id] === q.correct) ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> 100% POPRAWNYCH PRZYPISAŃ! Jesteś mistrzem orkiestracji!
                </span>
              ) : (
                <span className="text-rose-500 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> Niektóre przypisania można zoptymalizować. Spróbuj ponownie!
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
