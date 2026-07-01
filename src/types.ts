export interface ProjectMeta {
  id: string;
  title: string;
  industry: string;
  category: string;
  description: string;
  tools: string;
  colorAccent: string;
  colorBg: string;
  tags: string[];
  featured: boolean;
  dateAdded: string;
}

export interface ArticleHighlight {
  id: string;
  text: string;
  paragraphId: string;
}

export interface ParagraphComment {
  id: string;
  paragraphId: string;
  author: string;
  text: string;
  timestamp: string;
}

export const INITIAL_PROJECT_META: ProjectMeta = {
  id: "tirfix",
  title: "TIRFIX — serwis ciężarowy",
  industry: "Motoryzacja",
  category: "automotive",
  description: "Ciemny, premium landing page dla serwisu samochodów ciężarowych.",
  tools: "HTML - CSS - JavaScript",
  colorAccent: "#F97316",
  colorBg: "#111827",
  tags: ["Motoryzacja", "Dark UI", "Vite"],
  featured: true,
  dateAdded: "2026-05"
};

export const MOCK_PROJECTS: ProjectMeta[] = [
  INITIAL_PROJECT_META,
  {
    id: "dentacare",
    title: "DentaCare Clinic",
    industry: "Medycyna",
    category: "medical",
    description: "System rezerwacji wizyt dla sieci gabinetów stomatologicznych.",
    tools: "React - Tailwind - Node.js",
    colorAccent: "#0EA5E9",
    colorBg: "#F8FAFC",
    tags: ["Medycyna", "Clean Tech", "SaaS"],
    featured: true,
    dateAdded: "2026-04"
  },
  {
    id: "ecoleaf",
    title: "EcoLeaf E-Commerce",
    industry: "E-commerce",
    category: "shopping",
    description: "Minimalistyczny sklep internetowy z ekologicznymi plakatami.",
    tools: "Next.js - Shopify - Tailwind",
    colorAccent: "#10B981",
    colorBg: "#F0FDF4",
    tags: ["E-commerce", "Minimalism", "Green"],
    featured: false,
    dateAdded: "2026-06"
  }
];
