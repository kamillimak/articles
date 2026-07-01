# DZIENNIK BUDOWY v2.0
> Interaktywny Magazyn Inżynieryjny i Portal Pre-Commit Walidacji dla Freelancera IT

Projekt stanowi kompletny, w pełni responsywny i wysoce interaktywny moduł portfolio inżynierskiego, który można bez przeszkód wpiąć pod inne centralne repozytorium (np. nadrzędne repozytorium ze spisem wszystkich Twoich prac, np. `Projects`). 

Estetyka projektu opiera się na **Editorial Aesthetic** — czystej, typograficznej formie, wysokim kontraście, ciepłych akcentach kolorystycznych oraz rygorystycznej organizacji przestrzennej.

---

## 🛠️ Architektura i Integracja (GitHub & Submodules)

Zgodnie z wymaganiami technicznymi, projekt został przygotowany jako **niezależny komponent (sub-moduł)**. Można go bez problemu wpiąć bezpośrednio do innego nadrzędnego projektu na dwa zalecane sposoby:

### Opcja A: Jako Git Submodule (Zalecane)
Jeśli Twoje główne portfolio znajduje się w innym repozytorium, możesz dodać ten projekt jako sub-moduł Git, wpisując w katalogu głównym tamtego projektu:
```bash
git submodule add [URL_TEGO_REPOZYTORIUM] dziennik-budowy
```
Dzięki temu Dziennik Budowy rozwija się niezależnie, a Ty możesz aktualizować wpisy bez dotykania kodu głównej strony.

### Opcja B: Budowanie Statyczne (Static Assembly)
Ten projekt kompiluje się do czystych plików statycznych w katalogu `dist/` za pomocą komendy:
```bash
npm run build
```
Wygenerowaną zawartość katalogu `dist/` można wgrać bezpośrednio do wybranego podkatalogu w głównym repozytorium (np. pod ścieżką `projects/dziennik/` na serwerze lub na GitHub Pages).

---

## 📋 Standard Kontraktu Danych (`meta.json`)

Sercem automatyzacji portfolio jest ujednolicony kontrakt danych, który eliminuje ręczne kopiowanie kodu HTML. Każdy nowy podprojekt powinien posiadać w swoim głównym katalogu plik `meta.json` według poniższego schematu:

```json
{
  "id": "unikalny-slug-projektu",
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
}
```

---

## 🚦 Skrypt Walidacyjny (`validate-project.js`)

Aby zapobiec popsutym kafelkom i niespójnym kolorom na produkcji, dołączyliśmy automatyczny skrypt walidacyjny Node.js. Weryfikuje on strukturę `meta.json` w locie (można go podpiąć jako pre-commit hook w Git):

```javascript
/**
 * validate-project.js
 * Uruchomienie: node validate-project.js [sciezka_do_meta.json]
 */
import fs from 'fs';

function validateMeta(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error('❌ Błąd: Plik meta.json nie istnieje!');
      process.exit(1);
    }

    const meta = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const requiredFields = ['id', 'title', 'industry', 'category', 'description', 'tools', 'colorAccent', 'colorBg', 'tags'];
    const missing = requiredFields.filter(field => !meta[field]);

    if (missing.length > 0) {
      console.error(`❌ Brakujące wymagane pola: ${missing.join(', ')}`);
      process.exit(1);
    }

    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    if (!hexRegex.test(meta.colorAccent)) {
      console.error(`❌ Niepoprawny format colorAccent (${meta.colorAccent}). Oczekiwany HEX.`);
      process.exit(1);
    }

    console.log(`✅ Sukces: Plik meta.json projektu "${meta.title}" jest poprawny!`);
  } catch (error) {
    console.error('❌ Błąd parsowania JSON:', error.message);
    process.exit(1);
  }
}

validateMeta(process.argv[2] || './meta.json');
```

---

## ⚡ Przegląd Funkcji Interaktywnych w Aplikacji

Wszystkie pięć artykułów w Dzienniku Budowy posiada przyporządkowane, **dedykowane narzędzia i symulatory**:
1. **Portfolio, które samo się buduje**: Interaktywny diagram orkiestracji assetów i generator podglądu kafelków w czasie rzeczywistym.
2. **Zanim zrobię zrzut ekranu**: Symulator dynamicznego kafelkowania i autogeneracji okładek na bazie pliku konfiguracyjnego.
3. **AI Heroes 2026**: Dowód jakości (*Proof of Work*) — generator certyfikatu z weryfikacją testów, lintera i Lighthouse.
4. **Jeden projekt, pięć narzędzi AI**: Matryca porównawcza z przyporządkowaniem zadań dla konkretnych LLM (Claude, Lovable, Replit, Gemini, Trae).
5. **Walidator, który nie daje mi kłamać**: Żywy edytor JSON z wbudowanym konsolowym parserem symulującym pre-commit hook.

---

## 🚀 Instalacja i Uruchomienie Deweloperskie

1. Zainstaluj zależności:
   ```bash
   npm install
   ```
2. Uruchom serwer deweloperski lokalnie:
   ```bash
   npm run dev
   ```
3. Zbuduj wersję produkcyjną:
   ```bash
   npm run build
   ```
