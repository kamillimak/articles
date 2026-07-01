import heroImage from "../assets/images/portfolio_automation_hero_1782883615362.jpg";
import zanimZrobicZrzut from "../assets/images/zanim_zrobic_zrzut_1782905782962.jpg";
import aiHeroes2026 from "../assets/images/ai_heroes_2026_1782905795977.jpg";
import piecNarzedziAi from "../assets/images/piec_narzedzi_ai_1782905809931.jpg";
import walidatorKontrola from "../assets/images/walidator_kontrola_1782905819848.jpg";

export interface Article {
  id: string;
  title: string;
  titleRich: string;
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
  pullQuote?: string;
  paragraphs: {
    id: string;
    text: string;
    boldSnippet?: string;
    highlightId?: string;
  }[];
  sectionNames: Record<string, string>;
  hasCustomWidget?: "diagram" | "simulator" | "validator" | "checklist" | "tools";
}

export const ARTICLES: Article[] = [
  {
    id: "codex-agent-w-repozytorium",
    title: "Codex jako drugi inżynier w repozytorium",
    titleRich: "Codex jako <span class='font-serif italic font-light text-[#F97316]'>drugi inżynier</span> w repozytorium",
    subtitle: "Jak pracować z agentem, który czyta projekt, planuje zmianę, edytuje pliki i potrafi doprowadzić zadanie od briefu do gotowego commita.",
    category: "CODEX",
    wpis: "Wpis 01",
    readTime: "7 min czytania",
    readTimeMin: 7,
    date: "2026-07",
    heroImage: heroImage,
    imageCaption: "GRAFIKA GŁÓWNA · Codex jako agent operujący bezpośrednio na strukturze repozytorium, testach i przepływie zmian.",
    accentColor: "#F97316",
    description: "Praktyczny przewodnik po tym, jak zlecać Codexowi realne zadania inżynieryjne: od rozpoznania kodu, przez plan, po weryfikację i opis zmian.",
    wordCount: 780,
    initialLikes: 421,
    pullQuote: "Dobry prompt dla Codexa nie opisuje tylko efektu. Opisuje granice odpowiedzialności, kryteria jakości i sposób sprawdzenia pracy.",
    hasCustomWidget: "diagram",
    sectionNames: {
      p1: "Brief, który daje agentowi kontekst",
      p2: "Najpierw rozpoznanie, potem edycja",
      p3: "Delegowanie przez granice plików",
      p4: "Weryfikacja jest częścią zadania",
      p5: "Kiedy Codex działa najlepiej",
    },
    paragraphs: [
      {
        id: "p1",
        text: "Codex nie jest tylko czatem do podpowiadania fragmentów kodu. W praktyce działa jak drugi inżynier, który może wejść do repozytorium, przeczytać strukturę projektu, zrozumieć istniejące wzorce i wykonać zmianę tam, gdzie rzeczywiście powinna powstać. Dlatego pierwszy krok to nie prośba o kod, ale jasny brief: jaki problem rozwiązujemy, jaki jest oczekiwany efekt i czego agent ma nie ruszać.",
        boldSnippet: "Codex nie jest tylko czatem do podpowiadania fragmentów kodu.",
        highlightId: "p1-s1"
      },
      {
        id: "p2",
        text: "Największy skok jakości pojawia się wtedy, gdy pozwalam Codexowi najpierw czytać. Proszę go o odnalezienie plików, sprawdzenie importów, prześledzenie komponentów i dopiero później o edycję. Dzięki temu zmiana nie wygląda jak wklejony obcy fragment, tylko jak naturalna kontynuacja stylu projektu. To szczególnie ważne w aplikacjach React, gdzie jeden pozornie mały komponent może zależeć od danych, stanu, routingu i lokalnej konwencji UI.",
        boldSnippet: "Największy skok jakości pojawia się wtedy, gdy pozwalam Codexowi najpierw czytać.",
        highlightId: "p2-s1"
      },
      {
        id: "p3",
        text: "Codex świetnie sprawdza się przy zadaniach, które mają wyraźne granice: zaktualizuj widok artykułu, popraw walidację formularza, dopisz testy do modułu, uporządkuj dane w jednym pliku. Jeżeli zadanie jest większe, rozbijam je na zakresy odpowiedzialności. Jeden zakres to treść, drugi layout, trzeci weryfikacja. Taki podział ogranicza chaos i ułatwia ocenę rezultatu.",
        boldSnippet: "Codex świetnie sprawdza się przy zadaniach, które mają wyraźne granice",
        highlightId: "p3-s1"
      },
      {
        id: "p4",
        text: "W pracy z Codexem nie traktuję testów jako dodatku na końcu. Dobra instrukcja zawiera od razu sposób sprawdzenia zmiany: uruchom build, lint, testy jednostkowe albo przynajmniej przejrzyj miejsca, które mogły się rozsypać. Agent powinien powiedzieć, czego nie mógł zweryfikować. To buduje zaufanie, bo wynik nie jest tylko wygenerowany, ale też rozliczony.",
        boldSnippet: "Dobra instrukcja zawiera od razu sposób sprawdzenia zmiany",
        highlightId: "p4-s1"
      },
      {
        id: "p5",
        text: "Najlepsze rezultaty dostaję wtedy, gdy traktuję Codexa jak odpowiedzialnego wykonawcę, a nie magiczny przycisk. Daję mu cel, kontekst, ograniczenia i kryteria akceptacji. Potem pozwalam mu pracować, ale wymagam krótkiego raportu: co zmienił, gdzie, dlaczego i jak to sprawdził. W takim modelu Codex staje się realnym elementem procesu inżynieryjnego, a nie tylko szybszą autouzupełniarką.",
        boldSnippet: "Codex staje się realnym elementem procesu inżynieryjnego",
        highlightId: "p5-s1"
      }
    ]
  },
  {
    id: "trae-lokalny-asystent",
    title: "Trae jako lokalny asystent codziennej pracy",
    titleRich: "Trae jako <span class='font-serif italic font-light text-[#8B5CF6]'>lokalny asystent</span> codziennej pracy",
    subtitle: "Jak używać Trae do szybkich, precyzyjnych edycji w edytorze bez gubienia kontroli nad plikami, kontekstem i rytmem pracy.",
    category: "TRAE",
    wpis: "Wpis 02",
    readTime: "6 min czytania",
    readTimeMin: 6,
    date: "2026-07",
    heroImage: zanimZrobicZrzut,
    imageCaption: "GRAFIKA GŁÓWNA · Lokalny edytor jako centrum pracy, w którym asystent AI pomaga przy małych i średnich zmianach.",
    accentColor: "#8B5CF6",
    description: "Trae najlepiej działa jako szybki partner w edytorze: poprawia komponenty, dopina style, porządkuje fragmenty kodu i przyspiesza codzienne decyzje.",
    wordCount: 650,
    initialLikes: 286,
    pullQuote: "Trae jest najmocniejszy wtedy, gdy zadanie mieści się w widoku edytora i ma jasny efekt wizualny albo techniczny.",
    hasCustomWidget: "simulator",
    sectionNames: {
      p1: "Edytor jako źródło prawdy",
      p2: "Małe zmiany, szybkie iteracje",
      p3: "Komunikacja przez intencję",
      p4: "Kontrola nad diffem",
      p5: "Kiedy nie używać Trae",
    },
    paragraphs: [
      {
        id: "p1",
        text: "Trae traktuję jak asystenta siedzącego obok w edytorze. Nie proszę go o projektowanie całej architektury od zera, tylko o szybkie ruchy w konkretnym kontekście: popraw ten formularz, uprość ten komponent, zmień układ kafelka, znajdź błąd w propsach. Dzięki temu lokalny edytor zostaje źródłem prawdy, a zmiany są widoczne natychmiast.",
        boldSnippet: "Trae traktuję jak asystenta siedzącego obok w edytorze.",
        highlightId: "p1-s1"
      },
      {
        id: "p2",
        text: "Największą wartością Trae jest rytm. Zamiast otwierać osobne okno, kopiować pliki i opisywać cały projekt od początku, mogę pracować na małym fragmencie. To świetnie pasuje do frontendowych iteracji: dopasowania spacingu, zmiany etykiety, uporządkowania klas Tailwind, dodania stanu pustego albo poprawienia tekstu w komponencie.",
        boldSnippet: "Największą wartością Trae jest rytm.",
        highlightId: "p2-s1"
      },
      {
        id: "p3",
        text: "Dobre polecenie dla Trae jest krótkie, ale konkretne. Nie piszę: zrób lepszy layout. Piszę: skróć nagłówek, zmniejsz kartę na mobile, zostaw istniejącą paletę i nie zmieniaj logiki filtrowania. Taka instrukcja usuwa zgadywanie. Asystent może działać szybko, bo nie musi wymyślać całej strategii produktu.",
        boldSnippet: "Dobre polecenie dla Trae jest krótkie, ale konkretne.",
        highlightId: "p3-s1"
      },
      {
        id: "p4",
        text: "Po każdej większej edycji sprawdzam diff. To brzmi banalnie, ale jest kluczowe: lokalny asystent potrafi dotknąć kilku sąsiednich miejsc, a ja chcę wiedzieć, czy zmienił tylko to, o co prosiłem. Trae najlepiej działa w modelu krótkich serii: zadanie, diff, korekta, zapis. Wtedy tempo jest wysokie, a kontrola nadal zostaje po mojej stronie.",
        boldSnippet: "Trae najlepiej działa w modelu krótkich serii",
        highlightId: "p4-s1"
      },
      {
        id: "p5",
        text: "Nie używam Trae do wszystkiego. Gdy trzeba przeanalizować duży projekt, zaprojektować migrację albo porównać kilka możliwych architektur, lepszy będzie Codex, Claude lub AI Studio. Trae jest narzędziem blisko kodu. Jego siła nie polega na szerokości spojrzenia, tylko na tym, że pomaga szybko przełożyć decyzję na konkretną edycję.",
        boldSnippet: "Trae jest narzędziem blisko kodu.",
        highlightId: "p5-s1"
      }
    ]
  },
  {
    id: "claude-architekt-refaktoryzacji",
    title: "Claude jako architekt refaktoryzacji",
    titleRich: "Claude jako <span class='font-serif italic font-light text-[#10B981]'>architekt refaktoryzacji</span>",
    subtitle: "Jak wykorzystuję Claude do porządkowania złożonych decyzji technicznych, projektowania modułów i rozbrajania kodu, który urósł za szybko.",
    category: "CLAUDE",
    wpis: "Wpis 03",
    readTime: "7 min czytania",
    readTimeMin: 7,
    date: "2026-07",
    heroImage: aiHeroes2026,
    imageCaption: "GRAFIKA GŁÓWNA · Claude jako warstwa analizy, refaktoryzacji i krytycznego myślenia nad projektem.",
    accentColor: "#10B981",
    description: "Claude sprawdza się przy zadaniach wymagających spokojnego rozumowania: refaktoryzacji, projektowania typów, rozbijania odpowiedzialności i oceny kompromisów.",
    wordCount: 720,
    initialLikes: 338,
    pullQuote: "Claude jest najlepszy tam, gdzie kod potrzebuje myślenia, a nie tylko dopisania kolejnej funkcji.",
    hasCustomWidget: "checklist",
    sectionNames: {
      p1: "Refaktoryzacja zaczyna się od diagnozy",
      p2: "Claude dobrze znosi złożoność",
      p3: "Proś o warianty i kompromisy",
      p4: "Niech pisze plan migracji",
      p5: "Kod końcowy musi wrócić do repo",
    },
    paragraphs: [
      {
        id: "p1",
        text: "Claude najczęściej uruchamiam wtedy, gdy czuję, że projekt zaczyna mieć dług ukryty pod warstwą działającego UI. Komponent robi za dużo, typy są nieczytelne, stan rozlany po kilku miejscach, a każda nowa funkcja wymaga ostrożnego chodzenia po kodzie. W takim momencie nie proszę od razu o refaktor. Najpierw proszę o diagnozę: gdzie są odpowiedzialności, co jest sprzężone i jaki jest najmniejszy sensowny krok naprawczy.",
        boldSnippet: "Claude najczęściej uruchamiam wtedy, gdy czuję, że projekt zaczyna mieć dług",
        highlightId: "p1-s1"
      },
      {
        id: "p2",
        text: "Siłą Claude jest spokojne utrzymywanie kilku warstw problemu naraz. Potrafi przeanalizować API komponentu, przepływ danych, nazewnictwo i przyszłe konsekwencje decyzji. To przydaje się szczególnie przy TypeScript, walidacji danych i architekturze modułów. Zamiast produkować natychmiastową odpowiedź, Claude często pomaga nazwać problem we właściwy sposób.",
        boldSnippet: "Siłą Claude jest spokojne utrzymywanie kilku warstw problemu naraz.",
        highlightId: "p2-s1"
      },
      {
        id: "p3",
        text: "Najlepsze rozmowy z Claude zaczynają się od pytania o warianty. Proszę o dwie lub trzy ścieżki: minimalną, rozsądną i ambitną. Każda ma mieć koszt, ryzyko i moment, w którym warto ją wybrać. Dzięki temu nie podejmuję decyzji na podstawie elegancji kodu, tylko na podstawie realnego wpływu na produkt i tempo pracy.",
        boldSnippet: "Najlepsze rozmowy z Claude zaczynają się od pytania o warianty.",
        highlightId: "p3-s1"
      },
      {
        id: "p4",
        text: "Claude świetnie pisze plany migracji. Może rozpisać kolejność zmian, wskazać miejsca ryzyka, zaproponować nazwy nowych modułów i przygotować checklistę testów regresji. Taki plan później oddaję Codexowi albo realizuję lokalnie w Trae. W praktyce Claude bywa architektem, a Codex wykonawcą zmian w repozytorium.",
        boldSnippet: "Claude świetnie pisze plany migracji.",
        highlightId: "p4-s1"
      },
      {
        id: "p5",
        text: "Najważniejsza zasada: wynik pracy Claude musi wrócić do prawdziwego kodu. Nie zostawiam planów jako pięknych notatek. Jeżeli decyzja ma sens, zamieniam ją w małe zadania, diffy i testy. Dopiero wtedy analiza przestaje być konsultacją, a staje się elementem procesu dostarczania działającego oprogramowania.",
        boldSnippet: "wynik pracy Claude musi wrócić do prawdziwego kodu",
        highlightId: "p5-s1"
      }
    ]
  },
  {
    id: "aistudio-duze-okno-kontekstu",
    title: "AI Studio jako mapa całego systemu",
    titleRich: "AI Studio jako <span class='font-serif italic font-light text-[#3B82F6]'>mapa całego systemu</span>",
    subtitle: "Jak korzystać z dużego okna kontekstu do przeglądu architektury, audytu decyzji i planowania zmian, których nie da się ocenić z jednego pliku.",
    category: "AI STUDIO",
    wpis: "Wpis 04",
    readTime: "8 min czytania",
    readTimeMin: 8,
    date: "2026-07",
    heroImage: piecNarzedziAi,
    imageCaption: "GRAFIKA GŁÓWNA · Szeroki kontekst projektu: komponenty, dane, zależności i decyzje architektoniczne widziane z góry.",
    accentColor: "#3B82F6",
    description: "AI Studio najlepiej wykorzystać jako narzędzie do szerokiej analizy: wrzucić większy kontekst, poprosić o mapę systemu i zaplanować zmianę przed edycją.",
    wordCount: 820,
    initialLikes: 367,
    pullQuote: "AI Studio nie musi pisać ostatniej linijki kodu. Czasem jego największą wartością jest to, że pokazuje, gdzie tej linijki nie pisać.",
    hasCustomWidget: "tools",
    sectionNames: {
      p1: "Po co szeroki kontekst",
      p2: "Audyt przed przebudową",
      p3: "Mapa zależności zamiast intuicji",
      p4: "Planowanie dużych zmian",
      p5: "Jak przenieść analizę do działania",
    },
    paragraphs: [
      {
        id: "p1",
        text: "AI Studio traktuję jak miejsce do szerokiego spojrzenia. Gdy problem nie mieści się w jednym komponencie, potrzebuję narzędzia, które zobaczy większą część systemu: dane, widoki, zależności, style, założenia produktowe i miejsca, w których logika zaczyna się powtarzać. Wtedy duże okno kontekstu nie jest gadżetem, tylko realną przewagą diagnostyczną.",
        boldSnippet: "AI Studio traktuję jak miejsce do szerokiego spojrzenia.",
        highlightId: "p1-s1"
      },
      {
        id: "p2",
        text: "Przed większą przebudową proszę AI Studio o audyt: co w projekcie jest stabilne, co kruche, co jest tylko szybkim prototypem, a co powinno zostać wydzielone. Taka analiza pomaga uniknąć naprawiania objawów. Zamiast od razu przepisywać komponent, mogę odkryć, że prawdziwy problem leży w modelu danych albo w zbyt luźnym kontrakcie między widokiem a treścią.",
        boldSnippet: "Przed większą przebudową proszę AI Studio o audyt",
        highlightId: "p2-s1"
      },
      {
        id: "p3",
        text: "Najbardziej praktyczne pytanie brzmi: pokaż mapę zależności. Które pliki sterują treścią, które layoutem, które interakcją, a które są tylko pomocnicze? Kiedy widzę system w takiej formie, łatwiej zdecydować, czy zmiana powinna trafić do danych, komponentu, stylu czy osobnego helpera. To zmniejsza liczbę przypadkowych edycji.",
        boldSnippet: "Najbardziej praktyczne pytanie brzmi: pokaż mapę zależności.",
        highlightId: "p3-s1"
      },
      {
        id: "p4",
        text: "AI Studio dobrze sprawdza się przy planowaniu zmian, które mają kilka etapów. Na przykład: najpierw uporządkować model artykułu, potem zmienić stronę główną, później widok szczegółowy, a na końcu dopiąć walidację i testy. Taki plan mogę później przekazać Codexowi jako serię zadań albo rozdzielić między narzędzia.",
        boldSnippet: "AI Studio dobrze sprawdza się przy planowaniu zmian, które mają kilka etapów.",
        highlightId: "p4-s1"
      },
      {
        id: "p5",
        text: "Najważniejsze jest domknięcie pętli. Analiza z AI Studio powinna zakończyć się listą decyzji, a nie tylko podsumowaniem. Co zmieniamy teraz? Czego nie ruszamy? Jak sprawdzimy, że architektura po zmianie jest lepsza? Dopiero wtedy szeroki kontekst zamienia się w konkretny postęp, a nie w kolejną długą rozmowę o możliwościach.",
        boldSnippet: "Analiza z AI Studio powinna zakończyć się listą decyzji",
        highlightId: "p5-s1"
      }
    ]
  },
  {
    id: "orkiestracja-czterech-narzedzi",
    title: "Jedno repo, cztery narzędzia AI: mój workflow",
    titleRich: "Jedno repo, <span class='font-serif italic font-light text-[#EF4444]'>cztery narzędzia AI</span>: mój workflow",
    subtitle: "Jak łączę Codex, Trae, Claude i AI Studio w jeden spokojny proces: od analizy, przez plan, po edycję, testy i publikację.",
    category: "WORKFLOW",
    wpis: "Wpis 05",
    readTime: "7 min czytania",
    readTimeMin: 7,
    date: "2026-07",
    heroImage: walidatorKontrola,
    imageCaption: "GRAFIKA GŁÓWNA · Przepływ pracy między narzędziami AI, repozytorium, lokalnym edytorem i etapem walidacji.",
    accentColor: "#EF4444",
    description: "Największa produktywność nie bierze się z jednego modelu, tylko z jasnego podziału ról: kto analizuje, kto planuje, kto edytuje, kto weryfikuje.",
    wordCount: 760,
    initialLikes: 452,
    pullQuote: "Nie wygrywa ten, kto używa najwięcej narzędzi AI. Wygrywa ten, kto wie, kiedy każde z nich ma milczeć.",
    hasCustomWidget: "validator",
    sectionNames: {
      p1: "Problem nie leży w narzędziach",
      p2: "Mój podział ról",
      p3: "Kolejność pracy",
      p4: "Zasady bezpieczeństwa",
      p5: "Efekt końcowy",
    },
    paragraphs: [
      {
        id: "p1",
        text: "Najłatwiej popaść w chaos wtedy, gdy każde narzędzie AI dostaje ten sam problem i każde próbuje rozwiązać go po swojemu. Wtedy powstają cztery wersje architektury, pięć stylów komponentów i zero pewności, która decyzja jest aktualna. Dlatego nie zaczynam od pytania, które narzędzie jest najlepsze. Zaczynam od pytania, jaką rolę ma odegrać w procesie.",
        boldSnippet: "Najłatwiej popaść w chaos wtedy, gdy każde narzędzie AI dostaje ten sam problem",
        highlightId: "p1-s1"
      },
      {
        id: "p2",
        text: "Mój podział jest prosty. AI Studio daje szeroką mapę systemu. Claude pomaga w architekturze i refaktoryzacji. Codex wykonuje zmiany w repozytorium i pilnuje weryfikacji. Trae przyspiesza lokalne, precyzyjne poprawki w edytorze. Dzięki temu narzędzia nie konkurują ze sobą, tylko tworzą łańcuch odpowiedzialności.",
        boldSnippet: "narzędzia nie konkurują ze sobą, tylko tworzą łańcuch odpowiedzialności",
        highlightId: "p2-s1"
      },
      {
        id: "p3",
        text: "Typowy przepływ wygląda tak: najpierw zbieram kontekst i diagnozę, potem wybieram wariant techniczny, następnie rozbijam zmianę na małe zadania, a dopiero na końcu edytuję kod. To odwraca naturalną pokusę generowania od razu. Kod powstaje później, ale jest trafniejszy, bo wynika z rozpoznania, a nie z pierwszego impulsu.",
        boldSnippet: "Kod powstaje później, ale jest trafniejszy",
        highlightId: "p3-s1"
      },
      {
        id: "p4",
        text: "Mam też kilka zasad bezpieczeństwa. Jedno repozytorium jest źródłem prawdy. Jedna zmiana ma jeden cel. Duże przebudowy dzielę na etapy. Nie pozwalam dwóm narzędziom zmieniać tego samego pliku bez świadomego przekazania kontekstu. A każda istotna zmiana kończy się sprawdzeniem: build, lint, test albo przynajmniej ręczny przegląd ryzyk.",
        boldSnippet: "Jedno repozytorium jest źródłem prawdy.",
        highlightId: "p4-s1"
      },
      {
        id: "p5",
        text: "Efekt jest bardzo konkretny: mniej zgadywania, mniej przepisywania i mniej przypadkowych diffów. Codex, Trae, Claude i AI Studio przestają być czterema osobnymi miejscami pracy. Stają się jednym warsztatem, w którym każdy etap ma sens, a decyzje techniczne zostają przełożone na działający, zweryfikowany kod.",
        boldSnippet: "Stają się jednym warsztatem, w którym każdy etap ma sens",
        highlightId: "p5-s1"
      }
    ]
  }
];
