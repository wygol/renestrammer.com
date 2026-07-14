import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Start",
    posts: "Blog",
    tags: "Tags",
    about: "Über",
    kontakt: "Kontakt",
    archives: "Archiv",
    search: "Suche",
  },
  post: {
    publishedAt: "Veröffentlicht am",
    updatedAt: "Aktualisiert",
    sharePostIntro: "Diesen Beitrag teilen:",
    sharePostOn: "Diesen Beitrag auf {{platform}} teilen",
    sharePostViaEmail: "Diesen Beitrag per E-Mail teilen",
    tagLabel: "Tags",
    backToTop: "Nach oben",
    goBack: "Zurück",
    editPage: "Seite bearbeiten",
    previousPost: "Vorheriger Beitrag",
    nextPost: "Nächster Beitrag",
  },
  pagination: {
    prev: "Zurück",
    next: "Weiter",
    page: "Seite",
  },
  home: {
    socialLinks: "Social Links",
    featured: "Hervorgehoben",
    recentPosts: "Neueste Beiträge",
    allPosts: "Alle Beiträge",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "Alle Rechte vorbehalten.",
  },
  pages: {
    tagTitle: "Tag",
    tagDesc: "Alle Beiträge mit dem Tag",

    tagsTitle: "Tags",
    tagsDesc: "Alle in Beiträgen verwendeten Tags.",

    postsTitle: "Beiträge",
    postsDesc: "Alle Beiträge, die ich veröffentlicht habe.",

    archivesTitle: "Archiv",
    archivesDesc: "Alle archivierten Beiträge.",

    searchTitle: "Suche",
    searchDesc: "Beiträge durchsuchen …",
  },
  a11y: {
    skipToContent: "Zum Inhalt springen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    toggleTheme: "Design wechseln",
    searchPlaceholder: "Beiträge durchsuchen …",
    noResults: "Keine Ergebnisse gefunden",
    goToPreviousPage: "Zur vorherigen Seite",
    goToNextPage: "Zur nächsten Seite",
  },
  notFound: {
    title: "404 – Nicht gefunden",
    message: "Seite nicht gefunden",
    goHome: "Zurück zur Startseite",
  },
} satisfies UIStrings;
