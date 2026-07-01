import { useState } from "react";
import { CheckCircle, AlertCircle, Award, Terminal, Calendar, User, ShieldCheck } from "lucide-react";

export default function ProofChecklist() {
  const [checks, setChecks] = useState([
    { id: "compilation", label: "Pomyślna kompilacja (npm run build)", status: false, description: "Brak fatalnych błędów składni, czysty kod TypeScript." },
    { id: "linter", label: "Audyt lintera (npm run lint)", status: false, description: "Kod bez martwego kodu, nieużywanych importów i wycieków pamięci." },
    { id: "tests", label: "Pokrycie testami jednostkowymi > 80%", status: false, description: "Kluczowe moduły przetestowane automatycznie przy każdym commicie." },
    { id: "schema", label: "Zgodność z plikiem meta.json", status: false, description: "Wszystkie metadane projektu są kompletne i poprawnie sformatowane." },
    { id: "lighthouse", label: "Wynik Lighthouse dla wydajności i dostępności > 90", status: false, description: "Szybki czas ładowania, właściwy kontrast, pełna responsywność." }
  ]);

  const [authorName, setAuthorName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [generatedCert, setGeneratedCert] = useState<any | null>(null);

  const toggleCheck = (id: string) => {
    setChecks(prev => prev.map(c => c.id === id ? { ...c, status: !c.status } : c));
    setGeneratedCert(null); // Reset cert if checks change
  };

  const allPassed = checks.every(c => c.status);

  const handleGenerateCertificate = () => {
    if (!allPassed) return;
    
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const hash = "0x" + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();
    
    setGeneratedCert({
      author: authorName.trim() || "Kamil Mikołajczyk",
      project: projectName.trim() || "Dziennik Budowy v2.0",
      timestamp,
      hash,
      signature: "VALIDATED_BY_LOCAL_TEST_RUNNER"
    });
  };

  return (
    <div className="my-10 p-6 border border-[#10B981]/20 bg-white rounded-xl shadow-sm hover:border-[#10B981]/40 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-sm font-bold">
            Weryfikacja Proof of Work
          </span>
          <h4 className="text-lg font-display font-bold text-[#1A1A1A] mt-2 tracking-tight">
            Interaktywny Walidator Kompetencji AI 2026
          </h4>
        </div>
        <p className="text-[10px] text-[#1A1A1A]/40 font-mono mt-2 md:mt-0 uppercase">
          * Zaznacz wszystkie punkty, aby dowieść jakości *
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left checklist */}
        <div className="md:col-span-7 space-y-3">
          {checks.map((check) => (
            <div 
              key={check.id}
              onClick={() => toggleCheck(check.id)}
              className={`p-3 border rounded-lg cursor-pointer transition-all flex items-start gap-3 select-none ${
                check.status 
                  ? "bg-emerald-50/40 border-[#10B981]/30 text-zinc-900" 
                  : "bg-[#F9F8F6] border-[#1A1A1A]/5 text-zinc-600 hover:border-[#1A1A1A]/20"
              }`}
            >
              <input
                type="checkbox"
                checked={check.status}
                readOnly
                className="mt-1 accent-[#10B981]"
              />
              <div className="space-y-0.5">
                <span className="text-xs font-sans font-bold block">{check.label}</span>
                <span className="text-[10px] font-sans text-zinc-400 block leading-tight">{check.description}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right certificate view */}
        <div className="md:col-span-5 bg-[#F9F8F6] border border-[#1A1A1A]/10 rounded-lg p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
              Parametry Podpisu
            </span>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-zinc-500 uppercase block">Twoje Imię i Nazwisko</label>
                <input
                  type="text"
                  placeholder="np. Kamil Mikołajczyk"
                  value={authorName}
                  onChange={(e) => {
                    setAuthorName(e.target.value);
                    setGeneratedCert(null);
                  }}
                  className="w-full text-xs font-sans mt-1 px-3 py-1.5 bg-white border border-[#1A1A1A]/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-zinc-500 uppercase block">Nazwa Projektu</label>
                <input
                  type="text"
                  placeholder="np. Dziennik Budowy v2.0"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    setGeneratedCert(null);
                  }}
                  className="w-full text-xs font-sans mt-1 px-3 py-1.5 bg-white border border-[#1A1A1A]/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateCertificate}
              disabled={!allPassed}
              className={`w-full font-mono text-xs font-bold py-2 px-4 rounded-sm transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                allPassed 
                  ? "bg-[#10B981] hover:bg-emerald-600 text-white cursor-pointer" 
                  : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Generuj Dowód Jakości
            </button>
          </div>

          {!allPassed && (
            <div className="mt-4 p-2.5 bg-amber-50 border border-amber-200 text-[10px] text-amber-700 font-sans rounded-md flex items-start gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              <span>Aby aktywować generator, wszystkie 5 kryteriów inżynieryjnych powyżej muszą zostać pomyślnie zaznaczone.</span>
            </div>
          )}

          {generatedCert && (
            <div className="mt-4 p-4 bg-white border-2 border-dashed border-[#10B981]/50 rounded-lg space-y-3 relative overflow-hidden animate-fade-in">
              <div className="absolute top-1 right-1 opacity-10">
                <ShieldCheck className="w-16 h-16 text-[#10B981]" />
              </div>
              <div className="text-center pb-2 border-b border-[#1A1A1A]/5">
                <span className="text-[8px] font-mono uppercase tracking-widest text-[#10B981] font-bold block">ZWERYFIKOWANY DOWÓD REPOZYTORIUM</span>
                <span className="text-[10px] font-serif italic text-zinc-500 mt-1 block">AI Heroes 2026 Quality Seal</span>
              </div>
              <div className="space-y-1.5 text-xs text-zinc-700">
                <div className="flex justify-between"><span className="text-[10px] text-zinc-400 font-mono">AUTOR:</span> <strong className="font-sans text-zinc-950">{generatedCert.author}</strong></div>
                <div className="flex justify-between"><span className="text-[10px] text-zinc-400 font-mono">PROJEKT:</span> <strong className="font-sans text-zinc-950">{generatedCert.project}</strong></div>
                <div className="flex justify-between"><span className="text-[10px] text-zinc-400 font-mono">UKOŃCZONO:</span> <span className="font-mono text-[10.5px]">{generatedCert.timestamp}</span></div>
                <div className="flex justify-between"><span className="text-[10px] text-zinc-400 font-mono">PROOFS:</span> <span className="text-emerald-600 font-mono text-[10.5px]">5 / 5 SUCCESS</span></div>
                <div className="flex justify-between"><span className="text-[10px] text-zinc-400 font-mono">SUMA HASH:</span> <span className="font-mono text-[9px] bg-[#F9F8F6] px-1 rounded border border-[#1A1A1A]/5">{generatedCert.hash}</span></div>
              </div>
              <div className="text-[9px] font-mono text-zinc-400 text-center pt-1 border-t border-[#1A1A1A]/5 flex items-center justify-center gap-1">
                <Terminal className="w-3 h-3 text-[#10B981]" /> STATUS: VERIFIED_AND_SIGNED
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
