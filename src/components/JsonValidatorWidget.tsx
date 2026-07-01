import { useState } from "react";
import { Terminal, Play, CheckCircle, XCircle, RefreshCw, Info } from "lucide-react";

export default function JsonValidatorWidget() {
  const initialJson = `{
  "id": "my-awesome-saas",
  "title": "SaaS Platform 2026",
  "industry": "AI SaaS",
  "category": "productivity",
  "description": "System orkiestracji pracy zespołowej.",
  "tools": "React - Tailwind - Node.js",
  "colorAccent": "#F97316",
  "colorBg": "#111827",
  "tags": ["SaaS", "AI", "Vite"]
}`;

  const [jsonText, setJsonText] = useState(initialJson);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System walidacji gotowy do uruchomienia.",
    "Wpisz kod JSON po lewej, a następnie kliknij 'Uruchom Walidację'."
  ]);
  const [validationStatus, setValidationStatus] = useState<"idle" | "success" | "error">("idle");

  const runValidation = () => {
    setTerminalLogs([
      "Initializing project metadata validation...",
      `Checking current workspace configuration...`,
      "Reading projects/my-awesome-saas/meta.json..."
    ]);

    setTimeout(() => {
      try {
        const parsed = JSON.parse(jsonText);
        const logs = [
          "Parsing JSON payload: SUCCESS",
          `Checking required fields in meta.json...`
        ];

        const required = ["id", "title", "industry", "category", "description", "tools", "colorAccent", "colorBg", "tags"];
        const missing = required.filter(field => !parsed[field]);

        if (missing.length > 0) {
          logs.push(`❌ ERROR: Brakujące wymagane pola: ${missing.join(", ")}`);
          logs.push("Validation result: FAILED");
          logs.push("Git pre-commit hook: ABORTED (Commit blocked!)");
          setTerminalLogs(prev => [...prev, ...logs]);
          setValidationStatus("error");
          return;
        }

        logs.push("✓ Required fields: ALL PRESENT");

        // Validate hex codes
        const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
        if (parsed.colorAccent && !hexRegex.test(parsed.colorAccent)) {
          logs.push(`❌ ERROR: Pole colorAccent ("${parsed.colorAccent}") nie jest poprawnym kodem HEX!`);
          logs.push("Validation result: FAILED");
          logs.push("Git pre-commit hook: ABORTED (Commit blocked!)");
          setTerminalLogs(prev => [...prev, ...logs]);
          setValidationStatus("error");
          return;
        }

        logs.push("✓ Accent Color format: VALID HEX");

        if (!Array.isArray(parsed.tags) || parsed.tags.length === 0) {
          logs.push("❌ ERROR: Pole tags musi być niepustą tablicą stringów!");
          logs.push("Validation result: FAILED");
          logs.push("Git pre-commit hook: ABORTED (Commit blocked!)");
          setTerminalLogs(prev => [...prev, ...logs]);
          setValidationStatus("error");
          return;
        }

        logs.push("✓ Tags structure: VALID ARRAY");
        logs.push(`✓ Verified project "${parsed.title}" (ID: ${parsed.id}) successfully.`);
        logs.push("✅ SUCCESS: Wszystkie testy kontraktu przeszły pomyślnie!");
        logs.push("Git pre-commit hook: ALLOWED (Pushing to remote!)");
        setTerminalLogs(prev => [...prev, ...logs]);
        setValidationStatus("success");
      } catch (err: any) {
        setTerminalLogs(prev => [
          ...prev,
          "Parsing JSON payload: FAILED",
          `❌ JSON Parse Error: ${err.message}`,
          "Validation result: FAILED",
          "Git pre-commit hook: ABORTED (Commit blocked!)"
        ]);
        setValidationStatus("error");
      }
    }, 450);
  };

  const handleReset = () => {
    setJsonText(initialJson);
    setTerminalLogs([
      "System walidacji zresetowany.",
      "Wpisz kod JSON po lewej, a następnie kliknij 'Uruchom Walidację'."
    ]);
    setValidationStatus("idle");
  };

  return (
    <div className="my-10 p-6 border border-[#EF4444]/20 bg-white rounded-xl shadow-sm hover:border-[#EF4444]/40 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#EF4444] bg-[#EF4444]/10 px-2 py-1 rounded-sm font-bold">
            Automatyzacja Pre-commit
          </span>
          <h4 className="text-lg font-display font-bold text-[#1A1A1A] mt-2 tracking-tight">
            Symulator Bramki Walidacyjnej
          </h4>
        </div>
        <p className="text-[10px] text-[#1A1A1A]/40 font-mono mt-2 md:mt-0 uppercase">
          * Przetestuj walidator przed wrzuceniem na Git-a *
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* JSON input */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Edytuj projects/[slug]/meta.json</span>
            <button 
              onClick={handleReset}
              className="hover:text-[#EF4444] flex items-center gap-1 transition-colors font-bold uppercase text-[10px]"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full flex-grow bg-zinc-950 text-emerald-400 font-mono text-xs p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EF4444] resize-none leading-relaxed min-h-[220px]"
            spellCheck="false"
          />
        </div>

        {/* Terminal output */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
          <div className="text-xs font-mono text-zinc-500 flex items-center gap-1">
            <Terminal className="w-4 h-4 text-[#EF4444]" /> Terminal / Git Pre-commit Hook Log
          </div>

          <div className="w-full bg-zinc-950 font-mono text-[11px] p-4 rounded-lg overflow-y-auto leading-relaxed min-h-[190px] max-h-[220px] flex-grow shadow-inner">
            {terminalLogs.map((log, index) => {
              let colorClass = "text-zinc-300";
              if (log.startsWith("❌") || log.includes("FAILED") || log.includes("blocked")) {
                colorClass = "text-rose-500 font-bold";
              } else if (log.startsWith("✅") || log.startsWith("✓") || log.includes("SUCCESS") || log.includes("ALLOWED")) {
                colorClass = "text-emerald-400 font-bold";
              } else if (log.startsWith("Initializing") || log.startsWith("Parsing")) {
                colorClass = "text-[#EF4444]";
              }
              return (
                <div key={index} className={`${colorClass} mb-1 border-b border-white/5 pb-0.5 last:border-0`}>
                  {log.startsWith("✓") || log.startsWith("❌") || log.startsWith("✅") ? "" : "$ "}
                  {log}
                </div>
              );
            })}
          </div>

          <button
            onClick={runValidation}
            className="w-full bg-[#1A1A1A] hover:bg-[#EF4444] text-white font-mono text-xs font-bold py-2.5 rounded-sm shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" /> Uruchom Bramkę Walidacyjną
          </button>
        </div>
      </div>

      <div className="mt-5 p-3.5 bg-zinc-50 border border-[#1A1A1A]/5 rounded-lg text-xs text-zinc-600 flex gap-2">
        <Info className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
        <p className="font-sans leading-relaxed">
          <strong>Wypróbuj awaryjny scenariusz:</strong> Skasuj przecinek w kodzie po lewej lub zmień kod koloru <code className="font-mono text-[10.5px] bg-white border border-[#1A1A1A]/10 px-1 rounded-sm">colorAccent</code> na błędny hex (np. <code className="font-mono text-[10.5px] bg-white border border-[#1A1A1A]/10 px-1 rounded-sm">"red"</code> lub <code className="font-mono text-[10.5px] bg-white border border-[#1A1A1A]/10 px-1 rounded-sm">"#FFF"</code> bez poprawnych formatów) i kliknij "Uruchom". Zobaczysz, jak bramka automatycznie przerywa commit!
        </p>
      </div>
    </div>
  );
}
