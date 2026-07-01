import { useState } from "react";
import { MessageSquare, Heart, Share2, Bookmark, Flame, Settings, User, Type, ZoomIn, ZoomOut, Sparkles } from "lucide-react";
import InteractiveDiagram from "./InteractiveDiagram";
import CardSimulator from "./CardSimulator";
import { ParagraphComment, ArticleHighlight } from "../types";
import heroImage from "../assets/images/portfolio_automation_hero_1782883615362.jpg";

interface ArticleViewProps {
  fontSize: "sm" | "base" | "lg" | "xl";
  highlightsEnabled: boolean;
  onOpenComments: (paragraphId: string) => void;
  commentsCount: Record<string, number>;
  likesCount: number;
  onLike: () => void;
  isLiked: boolean;
}

export default function ArticleView({
  fontSize,
  highlightsEnabled,
  onOpenComments,
  commentsCount,
  likesCount,
  onLike,
  isLiked
}: ArticleViewProps) {
  // Local state to keep track of user-marked highlights in this session
  const [sessionHighlights, setSessionHighlights] = useState<Record<string, boolean>>({
    "p1-s1": true, // Pre-highlight some key phrases for better design presentation
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

  // Dynamically map font-sizes to class names for the serif article content
  const fontSizeClass = {
    sm: "text-base leading-relaxed",
    base: "text-lg leading-relaxed md:text-[19px] md:leading-8",
    lg: "text-xl leading-relaxed md:text-[22px] md:leading-9",
    xl: "text-2xl leading-relaxed md:text-[25px] md:leading-10",
  }[fontSize];

  return (
    <article className="max-w-[720px] mx-auto px-4 md:px-0 py-8">
      {/* Article Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs font-mono text-[#F97316] mb-6">
          <span className="px-2 py-0.5 bg-[#F97316] text-white text-[9px] font-bold tracking-tighter uppercase rounded-sm">Opublikowane</span>
          <span className="text-[10px] tracking-widest font-semibold uppercase opacity-40 text-[#1A1A1A]">Wpis 01 · 7 min czytania</span>
        </div>

        <h1 className="font-display font-bold text-4xl md:text-7xl text-[#1A1A1A] tracking-tighter leading-[0.95] mb-8">
          Portfolio, które <br/><span className="font-serif italic font-light text-[#F97316]">samo się</span> buduje
        </h1>
        
        <h3 className="font-sans text-lg md:text-xl text-[#1A1A1A]/80 font-normal leading-relaxed mb-8">
          Dlaczego zamiast kolejnej podstrony HTML zbudowałem system oparty na plikach <span className="font-mono text-base bg-white px-1.5 py-0.5 border border-[#1A1A1A]/10 rounded-sm shadow-sm">meta.json</span> — i jak jeden plik JSON zastąpił mi ręczne kodowanie każdej nowej karty projektu.
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isLiked 
                  ? "bg-rose-50 text-rose-600 border border-rose-200" 
                  : "bg-white hover:bg-zinc-50 text-zinc-600 border border-[#1A1A1A]/10 shadow-sm"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 stroke-rose-500" : ""}`} />
              <span>{likesCount}</span>
            </button>
            <span className="text-xs text-[#1A1A1A]/50 font-mono hidden sm:inline">2026-05</span>
          </div>
        </div>
      </header>

      {/* Hero Banner Image */}
      <div className="my-10 -mx-4 md:-mx-12 relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
        <img
          src={heroImage}
          alt="Automated Portfolio Concept Banner"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-cover rounded-none md:rounded-2xl shadow-md border border-zinc-100"
        />
        <div className="mt-3 px-4 md:px-12 text-center">
          <p className="text-xs text-zinc-400 font-mono italic">
            GRAFIKA GŁÓWNA · Wizualizacja zintegrowanego warsztatu dynamicznych metadanych projektu.
          </p>
        </div>
      </div>

      {/* Article Content Area */}
      <div className={`font-serif text-zinc-800 ${fontSizeClass} space-y-7`}>
        {/* Paragraph 1 */}
        <p className="relative group">
          <span 
            onClick={() => toggleHighlight("p1-s1")}
            className={`transition-all rounded px-0.5 cursor-pointer ${
              sessionHighlights["p1-s1"] && highlightsEnabled
                ? "bg-amber-100 border-b-2 border-amber-300 text-zinc-900" 
                : "hover:bg-zinc-50"
            }`}
          >
            Za każdym razem, gdy kończyłem nowy projekt dla klienta, czekał mnie ten sam rytuał: otwórz index.html portfolia, skopiuj fragment karty z poprzedniego projektu, zmień tekst, zmień kolor, popraw literówkę w trzecim miejscu, w którym ją wkleiłem.
          </span>{" "}
          Po dziesiątym projekcie ten rytuał przestał być nieszkodliwy —{" "}
          <span 
            onClick={() => toggleHighlight("p1-s2")}
            className={`transition-all rounded px-0.5 cursor-pointer ${
              sessionHighlights["p1-s2"] && highlightsEnabled
                ? "bg-amber-100 border-b-2 border-amber-300 text-zinc-900" 
                : "hover:bg-zinc-50"
            }`}
          >
            zaczął być realnym ryzykiem operacyjnym.
          </span>

          {/* Margins interaction triggers */}
          <button
            onClick={() => onOpenComments("p1")}
            className="absolute -left-12 top-1 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-full bg-zinc-50 border border-zinc-200 shadow-sm text-zinc-500 hover:text-zinc-800 hover:scale-105 hidden md:block"
            title="Dodaj komentarz"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {commentsCount["p1"] > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[8px] px-1 rounded-full font-mono font-bold">
                {commentsCount["p1"]}
              </span>
            )}
          </button>
        </p>

        {/* Paragraph 2 */}
        <p className="relative group">
          <span 
            onClick={() => toggleHighlight("p2-s1")}
            className={`transition-all rounded px-0.5 cursor-pointer ${
              sessionHighlights["p2-s1"] && highlightsEnabled
                ? "bg-amber-100 border-b-2 border-amber-300 text-zinc-900" 
                : "hover:bg-zinc-50"
            }`}
          >
            Portfolio freelancera ma jedno proste zadanie: pokazać nową robotę szybko i bez drżenia rąk.
          </span>{" "}
          Jeśli dodanie kolejnej realizacji zajmuje pół godziny kopiowania kodu, to prędzej czy później zacznę tego podświadomie unikać.{" "}
          <span 
            onClick={() => toggleHighlight("p2-s2")}
            className={`transition-all rounded px-0.5 cursor-pointer ${
              sessionHighlights["p2-s2"] && highlightsEnabled
                ? "bg-amber-100 border-b-2 border-amber-300 text-zinc-900" 
                : "hover:bg-zinc-50"
            }`}
          >
            A unikanie aktualizacji portfolia to najgorsza rzecz, jaka może się przydarzyć freelancerowi,
          </span>{" "}
          który żyje bezpośrednio z pokazywania świeżej pracy. Postanowiłem więc odwrócić kolejność. Zamiast pisać HTML dla każdego projektu z osobna, portfolio miało czytać dane i samo decydować, jak je wyrenderować.

          <button
            onClick={() => onOpenComments("p2")}
            className="absolute -left-12 top-1 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-full bg-zinc-50 border border-zinc-200 shadow-sm text-zinc-500 hover:text-zinc-800 hover:scale-105 hidden md:block"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {commentsCount["p2"] > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[8px] px-1 rounded-full font-mono font-bold">
                {commentsCount["p2"]}
              </span>
            )}
          </button>
        </p>

        <hr className="border-[#1A1A1A]/10 my-8" />

        {/* Section Heading 1 */}
        <div className="flex items-center gap-3 pt-6 pb-2">
          <span className="w-1.5 h-6 bg-[#F97316] rounded-sm shrink-0"></span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#1A1A1A] tracking-tight">
            Jeden plik, który mówi wszystko o projekcie
          </h2>
        </div>

        <p className="relative group">
          Sercem mojego nowego systemu stał się plik{" "}
          <code className="font-mono text-[14px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-700 font-medium">meta.json</code> — mały, zwięzły plik, który towarzyszy każdej realizacji w folderze{" "}
          <code className="font-mono text-[14px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-700">projects/[slug]/</code>. Zamiast pisać złożone znaczniki HTML karty projektu, skupiam się na opisie samych faktów: tytule, branży, kategorii, użytych narzędziach oraz kolorystyce akcentów.

          <button
            onClick={() => onOpenComments("h1")}
            className="absolute -left-12 top-1 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-full bg-zinc-50 border border-zinc-200 shadow-sm text-zinc-500 hover:text-zinc-800 hover:scale-105 hidden md:block"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
        </p>

        <p>
          Strona główna trzyma kompletną listę wszystkich źródeł w stałej tablicy{" "}
          <code className="font-mono text-[14px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-700 font-medium">PROJECT_SOURCES</code> i przy każdym wejściu użytkownika odpytuje odpowiednie pliki JSON. Karta projektu, filtr kategorii, modal ze szczegółami, kolorystyka hovera — wszystko renderuje się dynamicznie na podstawie tych ustrukturyzowanych danych:
        </p>

        {/* Bullets */}
        <ul className="list-disc list-outside pl-6 space-y-2 text-zinc-700">
          <li><strong>Zasada Single Source of Truth:</strong> Wszystkie informacje o realizacji żyją w jednym, czytelnym miejscu.</li>
          <li><strong>Brak nadmiarowości kodu:</strong> Wspólny silnik wizualny zapewnia, że poprawki w designie automatycznie propagują się na wszystkie projekty.</li>
          <li><strong>Płynne filtrowanie i nawigacja:</strong> Klasyfikacja projektów opiera się bezpośrednio o tagi wpisane w meta.json.</li>
        </ul>

        {/* INTERACTIVE WORKSHOP: LIVE JSON SIMULATION */}
        <div className="font-sans">
          <CardSimulator />
        </div>

        {/* Section Heading 2 */}
        <div className="flex items-center gap-3 pt-8 pb-2">
          <span className="w-1.5 h-6 bg-[#F97316] rounded-sm shrink-0"></span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#1A1A1A] tracking-tight">
            Placeholder zamiast pustki
          </h2>
        </div>

        <p className="relative group">
          <span 
            onClick={() => toggleHighlight("p3-s1")}
            className={`transition-all rounded px-0.5 cursor-pointer ${
              sessionHighlights["p3-s1"] && highlightsEnabled
                ? "bg-amber-100 border-b-2 border-amber-300 text-zinc-900" 
                : "hover:bg-zinc-50"
            }`}
          >
            Jeden mały szczegół okazał się o wiele ważniejszy, niż się początkowo spodziewałem: co się dzieje, gdy nie mam jeszcze wykonanego dobrego screenshotu nowego projektu?
          </span>{" "}
          Zamiast zostawiać szarą, pustą dziurę w kafelkach albo blokować publikację całego wpisu, portfolio automatycznie generuje elegancki placeholder graficzny na podstawie tych samych danych z meta.json — tytułu, kategorii i koloru akcentu. Karta nigdy nie wygląda na niedokończoną, nawet zanim zdążę zrobić ostateczne zrzuty ekranu.

          <button
            onClick={() => onOpenComments("p3")}
            className="absolute -left-12 top-1 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-full bg-zinc-50 border border-zinc-200 shadow-sm text-zinc-500 hover:text-zinc-800 hover:scale-105 hidden md:block"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {commentsCount["p3"] > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[8px] px-1 rounded-full font-mono font-bold">
                {commentsCount["p3"]}
              </span>
            )}
          </button>
        </p>

        {/* Blockquote pull quote */}
        <blockquote className="border-l-4 border-[#F97316] pl-6 py-2 my-8 italic text-[#1A1A1A]/90 text-xl md:text-2xl font-serif leading-relaxed bg-white border border-y-[#1A1A1A]/5 border-r-[#1A1A1A]/5 rounded-r-xl pr-6 shadow-sm">
          "Dobry system nie wymaga, żebym pamiętał o wszystkim w pośpiechu. Wymaga, żebym raz poprawnie zapisał uniwersalną zasadę działania."
        </blockquote>

        {/* Section Heading 3 */}
        <div className="flex items-center gap-3 pt-8 pb-2">
          <span className="w-1.5 h-6 bg-[#F97316] rounded-sm shrink-0"></span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#1A1A1A] tracking-tight">
            Źródła robocze kontra publikacja
          </h2>
        </div>

        <p>
          Drugą kluczową decyzją projektową, która okazała się ważniejsza niż sama specyfikacja techniczna JSON-a, była prosta i sztywna zasada separacji folderów. Pracuję na wielu narzędziach generatywnych i edytorach AI na raz — Claude, Lovable, Replit, AI Studio, Trae — i każde z nich generuje kod inaczej, z innymi specyficznymi zależnościami, czasem z ciężkim folderem <code className="font-mono text-[14px] bg-zinc-100 px-1 py-0.5 rounded">node_modules</code>, którego nikt nie chce widzieć w głównym repozytorium portfolio.
        </p>

        {/* Dynamic Architectural Diagram placed here! */}
        <div className="font-sans">
          <InteractiveDiagram />
        </div>

        <p>
          Rozwiązaniem stał się prosty podział operacyjny, który wdrożyłem krok po kroku:
        </p>

        {/* Numbered Steps list */}
        <ol className="list-decimal list-outside pl-6 space-y-3 text-zinc-700">
          <li>
            <strong>Folder sources/[slug]/:</strong> To mój brudnopis roboczy i warsztat techniczny. Tutaj pliki mogą wyglądać i zachowywać się jak tylko zechcą, zawierając śmieci deweloperskie i tymczasowe konfiguracje.
          </li>
          <li>
            <strong>Folder projects/[slug]/:</strong> To strefa wyłącznie czystych, przetestowanych, w pełni statycznych wersji gotowych do wdrożenia — jeden lekki index.html, ewentualnie warianty historyczne v2.html, v3.html, zawsze obowiązkowo wyposażone w belkę ułatwiającą powrót do portfolia.
          </li>
          <li>
            <strong>Bramka walidacyjna:</strong> Żadna zmiana ani projekt nie ma prawa trafić do folderu dystrybucyjnego publikacji, dopóki nie przejdzie przez tę bramkę porządkującą strukturę.
          </li>
        </ol>

        <p>
          Rozdzielenie „warsztatu deweloperskiego” od „witryny produkcyjnej” to stara, sprawdzona zasada znana z każdego porządnego procesu wytwórczego oprogramowania. W przypadku jednoosobowej firmy freelancerskiej pełni ona dokładnie tę samą funkcję, co formalne code review w dużym zespole programistów — zatrzymuje niedopracowany lub zaśmiecony kod przed ujrzeniem światła dziennego przez klienta.
        </p>

        {/* Section Heading 4 */}
        <div className="flex items-center gap-3 pt-8 pb-2">
          <span className="w-1.5 h-6 bg-[#F97316] rounded-sm shrink-0"></span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#1A1A1A] tracking-tight">
            Co to naprawdę zmienia w mojej pracy
          </h2>
        </div>

        <p className="relative group">
          Najbardziej namacalny i zaskakujący efekt wdrożenia tego systemu zobaczyłem nie w czystości kodu, lecz we własnym nawykowym zachowaniu. Dodanie nowej realizacji do portfolio sprowadza się teraz do czterech prostych, powtarzalnych kroków:
        </p>

        <ul className="list-none pl-2 space-y-3 text-[#1A1A1A]/90">
          <li className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-orange-100 text-[#F97316] font-mono text-xs font-bold flex items-center justify-center shrink-0">1</span>
            <span>Skopiuj gotowy produkcyjny build projektu do folderu.</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-orange-100 text-[#F97316] font-mono text-xs font-bold flex items-center justify-center shrink-0">2</span>
            <span>Szybko wypełnij ankietę danych w <code className="font-mono text-xs bg-white border border-[#1A1A1A]/10 px-1.5 py-0.5 rounded-sm">meta.json</code>.</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-orange-100 text-[#F97316] font-mono text-xs font-bold flex items-center justify-center shrink-0">3</span>
            <span>Dopisz identyfikator projektu do tablicy <code className="font-mono text-xs bg-white border border-[#1A1A1A]/10 px-1.5 py-0.5 rounded-sm">PROJECT_SOURCES</code>.</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-orange-100 text-[#F97316] font-mono text-xs font-bold flex items-center justify-center shrink-0">4</span>
            <span>Uruchom automatyczny skrypt walidacyjny.</span>
          </li>
        </ul>

        <p>
          Żaden z tych etapów nie wymaga myślenia o stylach CSS, pozycjonowaniu elementów czy dbaniu o kompatybilność mobilną kafelka na siatce głównej. Od kiedy koszt czasowy aktualizacji spadł do ułamka sekundy, aktualizuję swoje portfolio regularnie po każdym małym wdrożeniu — a to jedyna metryka, która ma realne znaczenie dla pozyskiwania nowych zleceń przez freelancera.
        </p>

        {/* Conclusion Header */}
        <div className="flex items-center gap-3 pt-8 pb-2">
          <span className="w-1.5 h-6 bg-[#F97316] rounded-sm shrink-0"></span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#1A1A1A] tracking-tight">
            Podsumowanie
          </h2>
        </div>
        
        <p className="text-zinc-700">
          Zaprojektowany system sam w sobie nie jest technologicznie skomplikowany. Jego prawdziwa siła tkwi w prostym fakcie: sztywno zdefiniowany kontrakt danych pozwala mi całkowicie zapomnieć o infrastrukturze technicznej i w 100% skupić się na tym, co faktycznie sprzedaje moją pracę — na samych projektach i ich jakości.
        </p>

        {/* Bottom Horizontal Rule */}
        <hr className="border-zinc-200 my-10" />
      </div>

      {/* "Next Post" Recommendation Teaser */}
      <footer className="bg-white border border-[#1A1A1A]/10 rounded-xl p-6 mt-12 hover:border-[#F97316]/40 transition-all shadow-sm">
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#F97316] font-bold block mb-1">
          Kolejny wpis w Dzienniku
        </span>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h4 className="font-display font-bold text-lg text-[#1A1A1A] hover:text-[#F97316] transition-colors cursor-pointer">
              Zanim zrobię zrzut ekranu
            </h4>
            <p className="text-xs text-[#1A1A1A]/60 font-sans mt-1">
              Jak dynamiczny canvas i meta.json generują okładkę projektu, zanim powstanie porządny screenshot.
            </p>
          </div>
          <a
            href="#card-simulator"
            className="text-xs font-mono font-medium px-4 py-2 bg-[#1A1A1A] hover:bg-[#F97316] text-white rounded-sm whitespace-nowrap transition-all flex items-center gap-1 shrink-0 shadow-md"
          >
            Przejdź do symulatora <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>
    </article>
  );
}

// Arrow helper for the teaser button
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
