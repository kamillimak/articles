/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import ArticleView from "./components/ArticleView";
import SidebarPanel from "./components/SidebarPanel";
import CommentsDrawer from "./components/CommentsDrawer";
import { ParagraphComment } from "./types";
import { MessageSquare, Sparkles, Heart, Clock, Compass, Menu, HelpCircle, Eye, Check } from "lucide-react";

export default function App() {
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [highlightsEnabled, setHighlightsEnabled] = useState<boolean>(true);
  const [activeParagraphComment, setActiveParagraphComment] = useState<string | null>(null);
  
  // Reading scroll progress percentage
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Likes/Claps counter
  const [likesCount, setLikesCount] = useState<number>(42);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Pre-loaded margins comments representing real user interactions
  const [comments, setComments] = useState<ParagraphComment[]>([
    {
      id: "c1",
      paragraphId: "p1",
      author: "Janusz Biznesu",
      text: "Sam kiedyś spędziłem pół dnia na poprawianiu tagów w 15 różnych plikach HTML. Przejście na schemat danych to jedyne rozsądne rozwiązanie przy rosnącym portfolio.",
      timestamp: "Wczoraj, 18:40"
    },
    {
      id: "c2",
      paragraphId: "p2",
      author: "Marta Kowalska",
      text: "Święta prawda z tym unikaniem aktualizacji. Jak pomyślę o ponownym uruchamianiu webpacka tylko po to, żeby dodać logo klienta, wolę napisać maila bezpośrednio. Ten system rozwiązuje ten opór psychiczny.",
      timestamp: "Dziś, 09:12"
    },
    {
      id: "c3",
      paragraphId: "p3",
      author: "Artur UX",
      text: "Te okładki wygenerowane automatycznie z kolorem akcentu są genialne w swojej prostocie. Na kafelkach wygląda to bardzo profesjonalnie, wręcz estetyczniej niż chaotyczny screenshot niedokończonej strony.",
      timestamp: "Dziś, 14:22"
    }
  ]);

  // Track page scroll to update top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddComment = (paragraphId: string, author: string, text: string) => {
    const newComment: ParagraphComment = {
      id: "comment_" + Date.now(),
      paragraphId,
      author,
      text,
      timestamp: "Przed chwilą"
    };
    setComments(prev => [newComment, ...prev]);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  // Helper map to pass counts to paragraphs
  const commentsCountMap: Record<string, number> = {};
  comments.forEach(c => {
    commentsCountMap[c.paragraphId] = (commentsCountMap[c.paragraphId] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] font-sans selection:bg-orange-100 selection:text-orange-900 transition-all">
      {/* Premium Top Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-orange-400 via-[#F97316] to-amber-500 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Header */}
      <nav className="sticky top-0 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 z-40 px-4 md:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Minimalist Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <span className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white font-serif italic text-lg shadow-md group-hover:bg-[#F97316] transition-all">
                KM
              </span>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#1A1A1A] group-hover:text-[#F97316] transition-colors">
                  Dziennik Budowy
                </span>
                <span className="text-[10px] font-mono text-[#1A1A1A]/50 leading-none mt-0.5">
                  Kamil Mikołajczyk
                </span>
              </div>
            </a>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-[#1A1A1A]/60 hidden lg:inline-flex items-center gap-1.5 bg-white border border-[#1A1A1A]/10 px-2.5 py-1 rounded-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              SYSTEM AKTYWNY: v2.0
            </span>
            
            <a
              href="https://kamillimak.github.io/Projects"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium border-b border-black hover:border-[#F97316] hover:text-[#F97316] transition-all pb-0.5"
            >
              Portfolio ↗
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article column */}
          <div className="lg:col-span-8 bg-[#F9F8F6] border-b lg:border-r border-b-[#1A1A1A]/10 lg:border-r-[#1A1A1A]/10 pb-8 lg:pb-0 lg:pr-10">
            <ArticleView
              fontSize={fontSize}
              highlightsEnabled={highlightsEnabled}
              onOpenComments={(pId) => setActiveParagraphComment(pId)}
              commentsCount={commentsCountMap}
              likesCount={likesCount}
              onLike={handleLike}
              isLiked={isLiked}
            />
          </div>

          {/* Sticky Controls Sidebar column */}
          <div className="lg:col-span-4">
            <SidebarPanel
              fontSize={fontSize}
              setFontSize={setFontSize}
              highlightsEnabled={highlightsEnabled}
              setHighlightsEnabled={setHighlightsEnabled}
              commentsCount={commentsCountMap}
              likesCount={likesCount}
            />
          </div>

        </div>
      </main>

      {/* Margin Comments Sidebar drawer */}
      <CommentsDrawer
        paragraphId={activeParagraphComment}
        onClose={() => setActiveParagraphComment(null)}
        comments={comments}
        onAddComment={handleAddComment}
      />

      {/* Bottom Footer block */}
      <footer className="bg-zinc-950 text-zinc-400 font-sans border-t border-[#1A1A1A]/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-200 flex items-center justify-center font-serif italic text-xs">
              KM
            </span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Future IT · Kamil Mikołajczyk © 2026
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a href="#card-simulator" className="hover:text-zinc-200 transition-colors">Symulator</a>
            <span className="text-zinc-800">|</span>
            <a href="#interactive-diagram" className="hover:text-zinc-200 transition-colors">Diagram Architektury</a>
            <span className="text-zinc-800">|</span>
            <a href="https://kamillimak.github.io/Projects" className="hover:text-zinc-200 transition-colors">Portfolio</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
