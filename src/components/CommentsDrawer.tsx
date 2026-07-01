import { useState, FormEvent } from "react";
import { X, Send, User, MessageSquare, Calendar } from "lucide-react";
import { ParagraphComment } from "../types";

interface CommentsDrawerProps {
  paragraphId: string | null;
  onClose: () => void;
  comments: ParagraphComment[];
  onAddComment: (paragraphId: string, author: string, text: string) => void;
}

export default function CommentsDrawer({
  paragraphId,
  onClose,
  comments,
  onAddComment
}: CommentsDrawerProps) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  if (!paragraphId) return null;

  // Filter comments for this specific paragraph/section
  const filteredComments = comments.filter(c => c.paragraphId === paragraphId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Wpisz treść komentarza.");
      return;
    }
    setError("");
    const finalAuthor = author.trim() || "Anonimowy Czytelnik";
    onAddComment(paragraphId, finalAuthor, text);
    setText("");
    // Keep author saved for subsequent comments
  };

  // Human-friendly paragraph names
  const sectionNames: Record<string, string> = {
    p1: "Akapit 1: Rytuał aktualizacji",
    p2: "Akapit 2: Zadanie portfolia freelancera",
    h1: "Sekcja: Jeden plik meta.json",
    p3: "Sekcja: Generator okładek i placeholderów",
  };

  const displayName = sectionNames[paragraphId] || "Tego akapitu";

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[380px] bg-[#F9F8F6] border-l border-[#1A1A1A]/10 shadow-2xl z-50 flex flex-col justify-between animate-slide-in">
      {/* Drawer Header */}
      <div className="p-5 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#F97316]" />
          <h4 className="font-display font-bold text-[#1A1A1A] text-sm tracking-tight">
            Komentarze do:
          </h4>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-[#F9F8F6] text-zinc-400 hover:text-zinc-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 py-2.5 bg-[#F9F8F6] border-b border-[#1A1A1A]/5 text-xs font-mono text-zinc-500">
        {displayName}
      </div>

      {/* Comments List */}
      <div className="flex-grow p-5 overflow-y-auto space-y-4 bg-[#F9F8F6]">
        {filteredComments.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10 h-full">
            <MessageSquare className="w-8 h-8 text-[#1A1A1A]/10 mb-2 stroke-[1.5]" />
            <p className="text-xs text-zinc-400 font-sans">
              Brak komentarzy do tej sekcji. Bądź pierwszym, który podzieli się przemyśleniem!
            </p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div key={comment.id} className="p-3 border border-[#1A1A1A]/10 rounded-lg bg-white space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-medium text-zinc-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-[#F97316] text-[10px] font-bold flex items-center justify-center">
                    {comment.author.substring(0, 2).toUpperCase()}
                  </span>
                  {comment.author}
                </span>
                <span className="text-[9px] font-mono text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {comment.timestamp}
                </span>
              </div>
              <p className="text-xs text-[#1A1A1A]/80 font-sans leading-relaxed pl-1">
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <div className="p-5 border-t border-[#1A1A1A]/10 bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Twoje imię / podpis (opcjonalnie)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full text-xs font-sans px-3 py-2 bg-[#F9F8F6] border border-[#1A1A1A]/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
            />
          </div>
          <div className="relative">
            <textarea
              placeholder="Dodaj swoją uwagę lub pytanie..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError("");
              }}
              rows={3}
              className="w-full text-xs font-sans p-3 bg-[#F9F8F6] border border-[#1A1A1A]/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F97316] resize-none leading-relaxed"
            />
          </div>

          {error && (
            <span className="text-[10px] text-rose-500 font-mono block">
              {error}
            </span>
          )}

          <button
            type="submit"
            className="w-full bg-[#1A1A1A] hover:bg-[#F97316] text-white font-mono text-xs font-medium py-2 rounded-sm transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <Send className="w-3.5 h-3.5" /> Wyślij przemyślenie
          </button>
        </form>
      </div>
    </div>
  );
}
