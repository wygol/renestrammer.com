import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://renestrammer.com/",
    title: "Strammer",
    description:
      "Geoinformatiker aus Kärnten mit Fokus auf Energiewirtschaft und Entrepreneurship — von der Datenbank bis zur Karte. Blog und Werdegang rund um Geodaten.",
    author: "René Strammer",
    profile: "https://renestrammer.com/ueber",
    ogImage: "default-og.jpg",
    lang: "de",
    timezone: "Europe/Vienna",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  // TODO-RENE: eigene Social-Profile eintragen (URLs). Solange die Liste leer
  // ist, wird die Social-Sektion auf Startseite/Footer ausgeblendet.
  socials: [],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});