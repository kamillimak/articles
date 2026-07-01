import heroImage from "../assets/images/portfolio_automation_hero_1782883615362.jpg";
import zanimZrobicZrzut from "../assets/images/zanim_zrobic_zrzut_1782905782962.jpg";
import aiHeroes2026 from "../assets/images/ai_heroes_2026_1782905795977.jpg";
import piecNarzedziAi from "../assets/images/piec_narzedzi_ai_1782905809931.jpg";
import walidatorKontrola from "../assets/images/walidator_kontrola_1782905819848.jpg";

export interface Article {
  id: string;
  title: string;
  titleRich: string; // Title with HTML/JSX styling for the article page
  subtitle: string;
  category: string;
  wpis: string;
  readTime: string;
  readTimeMin: number;
  date: string;
  heroImage: string;
  imageCaption: string;
  accentColor: string;
  description: string;
  wordCount: number;
  initialLikes: number;
  paragraphs: {
    id: string;
    text: string;
    boldSnippet?: string; // Snippet that can be highlighted or emphasized
    highlightId?: string; // ID used for interactive highlight tracking
  }[];
  sectionNames: Record<string, string>;
  hasCustomWidget?: "diagram" | "simulator" | "validator" | "checklist" | "tools";
}

export const ARTICLES: Article[] = [
  {
    id: "portfolio-samo-sie-buduje",
    title: "Portfolio, które samo się buduje",
    titleRich: "Portfolio, które <span class='font-serif italic font-light text-[#F97316]'>samo się</span> buduje",
    subtitle: "Dlaczego zamiast kolejnej podstrony HTML zbudowałem system oparty na plikach meta.json — i jak jeden plik JSON zastąpił mi ręczne kodowanie każdej nowej karty projektu.",
    category: "ARCHITEKTURA",
    wpis: "Wpis 01",
    readTime: "7 min czytania",
    readTimeMin: 7,
    date: "2026-05",
    heroImage: heroImage,
    imageCaption: "GRAFIKA GŁÓWNA · Wizualizacja zintegrowanego warsztatu dynamicznych metadanych projektu.",
    accentColor: "#F97316",
    description: "Jak uniwersalny kontrakt danych i automatyzacja kafelków uprościły moje workflow z narzędziami AI i eliminowały potrzebę ręcznych edycji HTML.",
    wordCount: 465,
    initialLikes: 342,
    hasCustomWidget: "diagram", // will also show card simulator inside or after it
    sectionNames: {
      p1: "Sekcja 1: Rytuał aktualizacji",
      p2: "Sekcja 2: Dlaczego ignorujemy portfolio",
      p3: "Sekcja 3: Sercem jest meta.json",
      p4: "Sekcja 4: Generator zamiast pustki",
      p5: "Sekcja 5: Separacja środowisk",
      p6: "Sekcja 6: Efekty i krok po kroku",
    },
    paragraphs: [
      {
        id: "p1",
        text: "Za każdym razem, gdy kończyłem nowy projekt dla klienta, czekał mnie ten sam rytuał: otwórz index.html portfolia, skopiuj fragment karty z poprzedniego projektu, zmień tekst, zmień kolor, popraw literówkę w trzecim miejscu, w którym ją wkleiłem. Po dziesiątym projekcie ten rytuał przestał być nieszkodliwy — zaczął być realnym ryzykiem operacyjnym.",
        boldSnippet: "Za każdym razem, gdy kończyłem nowy projekt dla klienta, czekał mnie ten sam rytuał",
        highlightId: "p1-s1"
      },
      {
        id: "p2",
        text: "Największym problemem nie był jednak sam czas tracony na edycję kodu. Chodziło o psychologiczny opór przed aktualizacją. Gdy proces dodawania wpisu wymaga otwarcia edytora kodu, ponownego weryfikowania klas Tailwind i testowania zachowań responsywnych, podświadomie odkładamy to na później. Wynik? Nasze portfolio szybko staje się cyfrowym cmentarzem projektów sprzed roku.",
        boldSnippet: "Chodziło o psychologiczny opór przed aktualizacją.",
        highlightId: "p2-s2"
      },
      {
        id: "p3",
        text: "Rozwiązaniem okazał się ścisły kontrakt danych. Zamiast pisać strukturę wizualną dla każdego kafelka, zaprojektowałem uniwersalny silnik renderujący, który jako jedyne źródło prawdy przyjmuje plik meta.json umieszczony bezpośrednio w folderze projektu. Silnik ten automatycznie odczytuje nazwę, opis, tagi, kolory przewodnie, linki oraz listę technologii.",
        boldSnippet: "Rozwiązaniem okazał się ścisły kontrakt danych.",
        highlightId: "p3-s1"
      },
      {
        id: "p4",
        text: "Co więcej, silnik portfolio rozwiązuje odwieczny problem braku czasu na zrobienie ładnych zrzutów ekranu. Jeśli w pliku meta.json nie zdefiniuję ścieżki do obrazka, system automatycznie generuje minimalistyczny, wektorowy placeholder w oparciu o zdefiniowaną paletę kolorystyczną i inicjały technologii. Strona nigdy nie wygląda na pustą czy rozgrzebaną.",
        boldSnippet: "system automatycznie generuje minimalistyczny, wektorowy placeholder",
        highlightId: "p4-s1"
      },
      {
        id: "p5",
        text: "Kolejnym ważnym krokiem było oddzielenie folderów roboczych od produkcyjnych. Narzędzia AI (jak Claude, Lovable, Replit) generują mnóstwo ciężkich plików i zależności deweloperskich. Przeniesienie do głównego repozytorium portfolio wyłącznie czystego, wybudowanego kodu produkcyjnego wraz z jego plikiem meta.json zapewnia maksymalną wydajność i całkowite bezpieczeństwo.",
        boldSnippet: "Przeniesienie wyłącznie czystego, wybudowanego kodu produkcyjnego",
        highlightId: "p5-s1"
      },
      {
        id: "p6",
        text: "Obecnie dodanie nowego projektu to kwestia 4 prostych kroków: skopiowanie skompilowanego buildu, uzupełnienie ankiety danych w meta.json, dopisanie nazwy folderu do indeksu oraz uruchomienie skryptu sprawdzającego zgodność kontraktu. To uwalnia 100% mojej uwagi, pozwalając skupić się na tym, co naprawdę sprzedaje moją pracę.",
        boldSnippet: "To uwalnia 100% mojej uwagi",
        highlightId: "p6-s1"
      }
    ]
  },
  {
    id: "zanim-zrobie-zrzut-ekranu",
    title: "Zanim zrobię zrzut ekranu",
    titleRich: "Zanim zrobię <span class='font-serif italic font-light text-[#8B5CF6]'>zrzut ekranu</span>",
    subtitle: "Jak dynamiczny canvas i plik meta.json generują estetyczną okładkę projektu, zanim powstanie porządny screenshot.",
    category: "DESIGN & DEV",
    wpis: "Wpis 02",
    readTime: "5 min czytania",
    readTimeMin: 5,
    date: "2026-06",
    heroImage: zanimZrobicZrzut,
    imageCaption: "GRAFIKA GŁÓWNA · Wektorowy generator okładek oparty na metadanych i schemacie kolorów hex.",
    accentColor: "#8B5CF6",
    description: "Jak wyeliminować rozmazane zrzuty ekranu i zaprezentować projekty z najwyższą, responsywną estetyką jeszcze w trakcie ich kodowania.",
    wordCount: 380,
    initialLikes: 198,
    hasCustomWidget: "simulator",
    sectionNames: {
      p1: "Sekcja 1: Klątwa brzydkich zrzutów",
      p2: "Sekcja 2: Matematyka i kolorystyka",
      p3: "Sekcja 3: Kodowanie placeholderów",
      p4: "Sekcja 4: Estetyka ponad realizm",
    },
    paragraphs: [
      {
        id: "p1",
        text: "Pokaż mi swoje portfolio, a powiem ci, jak bardzo spieszyłeś się z jego publikacją. Standardowy widok: rozciągnięty w złej rozdzielczości zrzut ekranu, na którym ledwo widać układ strony, albo puste, smutne szare prostokąty z napisem 'w budowie'. Zrobienie dobrego screenshota wymaga czasu, odpowiednich wymiarów okna i często ręcznego retuszu.",
        boldSnippet: "Zrobienie dobrego screenshota wymaga czasu",
        highlightId: "p1-s1"
      },
      {
        id: "p2",
        text: "Aby rozwiązać ten problem u podstaw, wdrożyłem mechanizm automatycznego generowania okładek (Cover Auto-generator). Jeśli pole 'screenshot' w pliku meta.json jest puste, silnik renderuje wektorowy, responsywny kontener stylizowany na elegancką, abstrakcyjną makietę aplikacji. Wykorzystuje do tego pole 'colorAccent' jako kolor przewodni oraz 'colorBg' jako tło.",
        boldSnippet: "Cover Auto-generator",
        highlightId: "p2-s1"
      },
      {
        id: "p3",
        text: "Używając prostych elementów SVG lub dynamicznych klas CSS, system rysuje uproszczony pasek nawigacji, siatkę modułową (bento) oraz miniaturowe, pulsujące punkty reprezentujące interaktywne elementy. Kolor akcentu pięknie spaja całą kompozycję. W ten sposób, karta projektu wygląda niezwykle estetycznie i profesjonalnie, wręcz przewyższając wyglądem rzeczywisty zrzut ekranu z nadmiarem tekstu.",
        boldSnippet: "karta projektu wygląda niezwykle estetycznie i profesjonalnie",
        highlightId: "p3-s1"
      },
      {
        id: "p4",
        text: "Najlepsze w tym podejściu jest to, że nie muszę czekać na pełne zakończenie prac, by opublikować projekt w portfolio. Mogę dodać projekt w fazie pre-alpha, a silnik sam zadba o to, by strona główna wyglądała na zbalansowaną i skończoną. To triumf projektowania zorientowanego na treść (content-first design), gdzie dane rządzą wyglądem.",
        boldSnippet: "To triumf projektowania zorientowanego na treść",
        highlightId: "p4-s1"
      }
    ]
  },
  {
    id: "ai-heroes-2026-certyfikaty",
    title: "AI Heroes 2026: certyfikaty jako dowód, nie jako dekoracja",
    titleRich: "AI Heroes: certyfikaty jako <span class='font-serif italic font-light text-[#10B981]'>dowód</span>, nie jako dekoracja",
    subtitle: "Jak w erze zalewu narzędzi generatywnych i wysypu 'AI Developerów' udowodnić autentyczne kompetencje inżynieryjne bez popadania w certyfikatozę.",
    category: "KOMPETENCJE",
    wpis: "Wpis 03",
    readTime: "6 min czytania",
    readTimeMin: 6,
    date: "2026-06",
    heroImage: aiHeroes2026,
    imageCaption: "GRAFIKA GŁÓWNA · Repozytorium dowodów inżynieryjnych zamiast tradycyjnych certyfikatów.",
    accentColor: "#10B981",
    description: "Skończmy z kupowaniem bezwartościowych certyfikatów w PDF. Jak zintegrowany system projektów, testów i automatycznych logów buduje prawdziwe zaufanie klientów.",
    wordCount: 410,
    initialLikes: 289,
    hasCustomWidget: "checklist",
    sectionNames: {
      p1: "Sekcja 1: Inflacja dyplomów",
      p2: "Sekcja 2: Kod jako jedyny certyfikat",
      p3: "Sekcja 3: Interaktywna weryfikacja",
      p4: "Sekcja 4: Dowód działania",
    },
    paragraphs: [
      {
        id: "p1",
        text: "W roku 2026 każdy ma w swoim profilu na LinkedIn dopisek 'AI Specialist' lub 'Prompt Engineer'. Internet został zalany kursami obiecującymi certyfikaty w 2 godziny. Problem polega na tym, że te certyfikaty są wyłącznie estetyczną dekoracją — nie niosą za sobą żadnej weryfikowalnej wiedzy technicznej ani umiejętności radzenia sobie z rzeczywistym kodem.",
        boldSnippet: "certyfikaty są wyłącznie estetyczną dekoracją",
        highlightId: "p1-s1"
      },
      {
        id: "p2",
        text: "Dla mnie prawdziwym certyfikatem jest działający, czysty kod i powtarzalność wyników. Kiedy klient wchodzi na moje portfolio, nie widzi listy logotypów szkół online. Widzi w pełni funkcjonalne, interaktywne aplikacje, które może przetestować bezpośrednio w przeglądarce, wraz z linkami do publicznych repozytoriów na GitHubie zawierających historię commitów i testy automatyczne.",
        boldSnippet: "prawdziwym certyfikatem jest działający, czysty kod",
        highlightId: "p2-s1"
      },
      {
        id: "p3",
        text: "Właśnie dlatego mój 'Dziennik Budowy' i centralne repozytorium 'Projects' są ze sobą zintegrowane. Każdy projekt posiada wbudowany moduł weryfikacyjny (Proof of Work). Zamiast słownych zapewnień, silnik zaciąga dane o stanie kompilacji, pokryciu testami (test coverage) oraz statusie automatycznego audytu dostępności i wydajności. To technologia mówi za mnie.",
        boldSnippet: "Każdy projekt posiada wbudowany moduł weryfikacyjny",
        highlightId: "p3-s1"
      },
      {
        id: "p4",
        text: "Przejście od certyfikatów-dekoracji do weryfikowalnych dowodów inżynieryjnych to kluczowa zmiana w pozycjonowaniu się na rynku. Klienci premium nie szukają ludzi, którzy ukończyli kurs. Szukają inżynierów, którzy potrafią dostarczyć stabilny produkt, zarządzać długiem technologicznym i udowodnić stabilność kodu na każdym etapie wdrożenia.",
        boldSnippet: "Klienci premium szukają inżynierów, którzy potrafią dostarczyć stabilny produkt",
        highlightId: "p4-s1"
      }
    ]
  },
  {
    id: "jeden-projekt-piec-narzedzi",
    title: "Jeden projekt, pięć narzędzi AI: jak nie zwariować",
    titleRich: "Pięć narzędzi AI: <span class='font-serif italic font-light text-[#3B82F6]'>jak nie zwariować</span>",
    subtitle: "Przewodnik po orkiestracji pracy między Claude, Lovable, Replit, AI Studio i Trae w jednym zintegrowanym cyklu deweloperskim.",
    category: "WORKFLOW",
    wpis: "Wpis 04",
    readTime: "8 min czytania",
    readTimeMin: 8,
    date: "2026-07",
    heroImage: piecNarzedziAi,
    imageCaption: "GRAFIKA GŁÓWNA · Orkiestracja i podział ról w nowoczesnym warsztacie AI Coding.",
    accentColor: "#3B82F6",
    description: "Każde środowisko AI ma swoje unikalne zalety. Jak mądrze podzielić zadania, unikać konfliktów w kodzie i utrzymać jedną, czystą linię rozwoju aplikacji.",
    wordCount: 520,
    initialLikes: 412,
    hasCustomWidget: "tools",
    sectionNames: {
      p1: "Sekcja 1: Zjawisko przełączania kontekstu",
      p2: "Sekcja 2: Przypisanie ról narzędziom",
      p3: "Sekcja 3: Zasada jednego edytora (Single Source of Truth)",
      p4: "Sekcja 4: Strategia synchronizacji",
    },
    paragraphs: [
      {
        id: "p1",
        text: "Praca z jednym asystentem AI bywa wyzwaniem, ale co się dzieje, gdy do jednego projektu zaprzęgasz ich pięć? Claude świetnie pisze algorytmy i refaktoryzuje, Lovable błyskawicznie buduje interfejsy i makiety, Replit ułatwia natychmiastowe testowanie backendu, AI Studio (Gemini) dysponuje ogromnym oknem kontekstowym i świetnie analizuje architekturę, a Trae działa jako genialny lokalny asystent w edytorze. Bez jasnych zasad to przepis na totalny chaos.",
        boldSnippet: "Bez jasnych zasad to przepis na totalny chaos.",
        highlightId: "p1-s1"
      },
      {
        id: "p2",
        text: "Kluczem do sukcesu jest rygorystyczny podział ról (Role Assignment). Nie pozwalam, by dwa narzędzia pracowały jednocześnie nad tym samym plikiem bez wcześniejszej synchronizacji. Lovable używam wyłącznie do szybkiej iteracji warstwy UI (widoków), Claude'a proszę o skomplikowane kalkulacje i architekturę stanu, a Gemini w AI Studio używam jako nadrzędnego architekta, który z lotu ptaka ocenia cały system i planuje duże kroki.",
        boldSnippet: "Kluczem do sukcesu jest rygorystyczny podział ról",
        highlightId: "p2-s1"
      },
      {
        id: "p3",
        text: "Druga zasada to Single Source of Truth — jedno nadrzędne repozytorium (zazwyczaj na GitHubie) oraz jeden lokalny edytor (np. VS Code z wtyczką Trae lub Cursor), do którego trafiają wszystkie zmiany. Każdy kod wygenerowany przez asystenta webowego musi przejść przez mój lokalny filtr, gdzie uruchamiam kompilację i testy lintera przed zatwierdzeniem commita.",
        boldSnippet: "Jedno nadrzędne repozytorium oraz lokalny edytor jako filtr",
        highlightId: "p3-s1"
      },
      {
        id: "p4",
        text: "Dzięki temu podejściu, wielomodelowość (multi-LLM development) przestaje być źródłem frustracji, a staje się moją największą przewagą konkurencyjną. Łączę szybkość prototypowania z inżynieryjną precyzją, a portfolio zasilane jest projektami o znacznie wyższej jakości technicznej i wizualnej.",
        boldSnippet: "wielomodelowość staje się moją największą przewagą konkurencyjną",
        highlightId: "p4-s1"
      }
    ]
  },
  {
    id: "walidator-ktory-nie-klamie",
    title: "Walidator, który nie daje mi kłamać",
    titleRich: "Walidator, który <span class='font-serif italic font-light text-[#EF4444]'>nie daje mi</span> kłamać",
    subtitle: "Jak automatyczny skrypt weryfikuje poprawność meta.json i strukturę projektu przed każdą publikacją na produkcji.",
    category: "AUTOMATYZACJA",
    wpis: "Wpis 05",
    readTime: "5 min czytania",
    readTimeMin: 5,
    date: "2026-07",
    heroImage: walidatorKontrola,
    imageCaption: "GRAFIKA GŁÓWNA · Schemat działania lokalnego skryptu walidacyjnego w cyklu pre-push.",
    accentColor: "#EF4444",
    description: "Zapomniałeś o tagu? Zły format koloru hex? Skrypt w Node.js uruchamiany w pre-commit natychmiast wychwyci błędy struktury i zablokuje pusha, dbając o bezbłędny stan portfolia.",
    wordCount: 395,
    initialLikes: 254,
    hasCustomWidget: "validator",
    sectionNames: {
      p1: "Sekcja 1: Człowiek zawsze popełni błąd",
      p2: "Sekcja 2: Architektura skryptu walidacyjnego",
      p3: "Sekcja 3: Pre-commit i pre-push",
      p4: "Sekcja 4: Rezultaty w praktyce",
    },
    paragraphs: [
      {
        id: "p1",
        text: "Nawet najprostszy kontrakt danych zawodzi, gdy człowiek jest zmęczony. Dodajesz nowy projekt o pierwszej w nocy, zapominasz o przecinku w JSON-ie, błędnie wpisujesz kod koloru HEX (np. pięć znaków zamiast sześciu) albo zapominasz wrzucić wybudowany folder do repozytorium. Rano okazuje się, że strona główna portfolio leży, a klienci widzą błąd parsowania.",
        boldSnippet: "Nawet najprostszy kontrakt danych zawodzi, gdy człowiek jest zmęczony",
        highlightId: "p1-s1"
      },
      {
        id: "p2",
        text: "Aby temu zapobiec, napisałem lekki, ale niezwykle rygorystyczny skrypt walidacyjny w Node.js (validate.js). Skrypt ten automatycznie skanuje wszystkie foldery w katalogu projects/, odczytuje każdy plik meta.json i sprawdza go pod kątem zgodności ze schematem JSON Schema. Weryfikuje typy danych, obowiązkowość pól (id, title, tools, colorAccent) oraz poprawność ścieżek do plików.",
        boldSnippet: "rygorystyczny skrypt walidacyjny w Node.js",
        highlightId: "p2-s1"
      },
      {
        id: "p3",
        text: "Skrypt ten został wpięty jako pre-commit / pre-push hook przy użyciu narzędzia Husky. Oznacza to, że Git fizycznie zablokuje próbę wysłania kodu na serwer, jeśli jakikolwiek plik meta.json jest uszkodzony lub niepełny. Terminal wyświetla czytelne komunikaty o błędach wraz z numerami linii i sugestią naprawy.",
        boldSnippet: "Git fizycznie zablokuje próbę wysłania kodu na serwer",
        highlightId: "p3-s1"
      },
      {
        id: "p4",
        text: "Ten skromny skrypt to mój najlepszy przyjaciel. Dzięki niemu zyskałem absolutną pewność, że produkcyjne portfolio jest zawsze sprawne, spójne i gotowe do prezentacji. Wolę, żeby to lokalny walidator nazwał mnie kłamcą w terminalu, niż żeby zrobił to klient na spotkaniu rekrutacyjnym.",
        boldSnippet: "produkcyjne portfolio jest zawsze sprawne, spójne i gotowe do prezentacji",
        highlightId: "p4-s1"
      }
    ]
  }
];
