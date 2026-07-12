## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

---

Instructions for this project (in German)

# CLAUDE.md — renestrammer.com

Persönliche Website & Blog von René Strammer. Astro mit AstroPaper als Basis, Deployment auf GitHub Pages, Sprache Deutsch. Dieses Dokument ist die Projekt-Wahrheit: Bei Widerspruch zwischen Code-Zustand und diesem Dokument gilt dieses Dokument als Ziel.

## WICHTIG: Öffentliches Repository

GitHub Pages (Free) = öffentliches Repo. Deshalb gilt absolut:
- KEINE privaten Daten einchecken oder auf die Website schreiben: keine Wohnadresse, keine Telefonnummer, kein Geburtsdatum.
- Kontaktdaten existieren nur als Platzhalter `TODO-RENE`, die René selbst ersetzt. Niemals Kontaktdaten erfinden.
- Keine Arbeitgeber-Interna, keine Parteipolitik (Weltsicht allgemein ja, Parteibezug nein — bewusste Entscheidung während der Bewerbungsphase).

### Secrets-Regeln (verbindlich)
- Secrets leben ausschließlich in `.env`-Dateien, und `.env*` MUSS in `.gitignore` stehen. Bei jedem neuen Scaffold verifizieren, nie annehmen.
- CI-/Deploy-Secrets gehören in GitHub → Settings → Secrets and variables → Actions — niemals in Workflow-Dateien oder Code.
- Diese Site ist rein statisch, es gibt keinen Server: Alles, was der Client zur Laufzeit nutzt (auch `PUBLIC_*`-Variablen), landet im öffentlich ausgelieferten Bundle. `.gitignore` schützt davor NICHT. Client-seitig existieren daher nur public-by-design Keys (PostHog-Projekt-Key) oder domain-beschränkte Keys (z. B. Karten-Provider). Braucht ein Feature ein echtes Secret, braucht es einen externen Dienst/Proxy — nicht diese Site.
- Wurde ein Secret je committet oder gepusht, gilt es als kompromittiert: sofort rotieren. `.gitignore` wirkt nicht rückwirkend auf die Git-Historie.

## Tech-Stack & getroffene Entscheidungen (nicht ohne Not ändern)

- **Astro, rein statisch.** Kein SSR, kein Server-Adapter. Interaktivität nur als Insel (`client:*`-Direktiven sparsam einsetzen).
- **Theme-Basis: AstroPaper** (Tailwind). Erst Struktur und Beispielposts als Doku lesen, dann anpassen. Bestehende Features (RSS, Suche, Tags, OG-Images, Hell/Dunkel-Toggle) erhalten.
- **Deployment:** GitHub Actions (`withastro/action`) → GitHub Pages. `main` = live; Feature-Branches deployen nicht.
- **Domain:** renestrammer.com. `public/CNAME` nie löschen. `site`-URL in der Astro-Config aktuell halten.
- **Analytics: PostHog EU-Cloud** (Frankfurt), Snippet im Basis-Layout, cookieless-Modus. Kein Google Analytics.
- **Sprache der Site: Deutsch** (österreichische Färbung willkommen). Einzelne Blogposts dürfen Englisch sein — pro Post genau eine Sprache.
- Keine neuen Dependencies ohne klaren Grund. Tailwind-Utilities vor Custom-CSS.

## Design-Grundregeln

- Grafische Experimente (Looks, Themes, Redesigns) sind NICHT Teil dieser Datei. Sie laufen ausschließlich in Feature-Branches mit eigenem Briefing-Dokument, das der Agent dort liest. Bis dahin gilt: AstroPaper-Standardlook, keine ungefragten Design-Änderungen.
- **Kontrastregel:** Karten, Diagramme und Code-Blöcke liegen immer auf solidem, ausreichend kontrastierendem Hintergrund. Dunkle Basemaps bevorzugen (z. B. Dark Matter).
- **Barrierefreiheit ist Pflicht:** `prefers-reduced-motion` respektieren, Fokus-Zustände erhalten, semantisches HTML, ausreichender Kontrast.

## Seiten & Features

### Landing (/)
- Einladend, freundlich, persönlich, auf Deutsch: wer René ist, woran er baut, was ihn antreibt.
- **Typewriter-Effekt** mit rotierenden Phrasen. Vanilla-JS (~15 Zeilen) oder CSS — KEINE Library. Anforderungen:
  - Bei `prefers-reduced-motion`: statischer Text sofort sichtbar, keine Animation.
  - Echter Text im DOM (SEO/Screenreader), reservierte Höhe (kein Layout-Shift).
  - Startphrasen: „Geoinformatik für die Energiewirtschaft.", „Von der Datenbank bis zur Karte.", „Ich baue Dinge mit Geodaten." (René ergänzt weitere.)
- Textleitplanken für alles über René: ehrlich, konkret, keine Superlative, keine KI-Floskeln („in der heutigen digitalen Welt" u. Ä. sind verboten). Themen: Geodaten × Energiewirtschaft, Freude am Bauen kleiner Produkte, Lesen, Sport, Österreich positiv mitgestalten.

### Blog (wichtigster Teil der Website)
- AstroPaper-Blogfunktion nutzen und intakt lassen (Posts, Tags, RSS, Suche).
- Zwei Inhaltsarten über Tags: `tech` (GIS, Energie, Daten, Tutorials) und `persoenlich` (Essays, Reflexionen). Sprach-Kennzeichnung pro Post (Frontmatter/Tag).
- Code-Highlighting out of the box. **Mermaid-Support einbauen** (build-time via rehype-Plugin bevorzugt).
- Bilder als WebP über die Astro-Bildpipeline.
- Später vorgesehen: `<MapContainer>`-Astro-Insel für MapLibre-Karten (solider Hintergrund, PMTiles-fähig).

### Über mich (/ueber)
- Persönliche Vorstellung + **Lebenslauf als vertikale Timeline**.
- Timeline als eigene Komponente; Daten aus `src/data/cv.ts` (strukturiert, NICHT im Markup hartkodiert).
- Stationen mit Zeitraum, Titel, Ort, Ein-Zeilen-Beschreibung. Ansprechend, aber lesbar; mobile-first.

### Kontakt (/kontakt)
- Statisch, kein Backend-Formular. mailto-Link und Kanäle als `TODO-RENE`-Platzhalter.
- Als freundliche Panel-Karte gestaltet, kurz gehalten.

## CV-Daten für die Timeline (öffentlich freigegeben)

**Ausbildung**
- 2016–2021 · HTL 1 Lastenstraße, Klagenfurt · Maschinenbau (Matura)
- 10/2021–01/2025 · Universität Klagenfurt · BSc Geographie (inkl. 1 Jahr Informatik; Zertifikat Entrepreneurship)
- seit 03/2025 · Universität Salzburg (Z_GIS) · MSc Applied Geoinformatics, Abschluss vorauss. 12/2026 · Masterarbeit: mobile Felddatenerfassung mit PostGIS-Backend und OGC-Diensten (WMS/WFS)

**Erfahrung**
- 08–09/2022 · Land Kärnten · Praktikum Raumplanung und Raumordnung
- 07–08/2023 · Plincs GmbH · Praktikum Java Backend Development
- 07/2024–12/2025 · VUM GmbH · GIS-Analyst — Kartographie & GIS-Analysen im Energie- und Infrastrukturumfeld
- 10/2025–07/2026 · Mitgründung Start-up-Projekt: Geoinformatik-Automatisierung für Gemeinden
- 02–07/2026 · Z_GIS, Universität Salzburg · Stud. Projektmitarbeiter Earth Observation (Apache Spark, Apache Sedona)
- 08–10/2026 · KELAG · Praktikum GIS-Entwicklung (Schwerpunkte: FME, GeoServer, Oracle)

**Weiteres**
- Publikation: AGIT 2025 — TVDI-basierte Bodenfeuchteanalyse (Ratschitschacher Moor)
- Skills: QGIS, ArcGIS Pro, Trimble eCognition, GeoLibre (Eigenentwicklung); Python (GeoPandas, GDAL, Shapely, Rasterio), PostgreSQL/PostGIS, DuckDB, Docker, Git, GeoServer, Apache Sedona
- Sprachen: Deutsch (Muttersprache), Englisch (fließend)

## Arbeitsweise

- `npm run dev` lokal; vor jedem Merge `npm run build && npm run preview` (Produktions-Build verhält sich gelegentlich anders als der Dev-Server).
- Kleine, thematische Commits mit klaren Messages (Deutsch okay).
- Feature-Branches; nie direkt auf `main` experimentieren.
- Vor strukturellen Eingriffen prüfen, was AstroPaper bereits kann — nichts doppelt bauen.
- Beispielinhalte des Themes erst als Doku lesen, dann entfernen; einen Post als Frontmatter-Vorlage behalten.
- Nichts löschen oder umschreiben, was René selbst geschrieben hat, ohne Rückfrage.
- Alle Stellen, die René selbst befüllen muss, mit `TODO-RENE` markieren.
- Diese Datei unter ~200 Zeilen halten (längere Memory-Dateien senken die Befolgung). Private Ergänzungen gehören in `CLAUDE.local.md` (gitignored, wird automatisch mitgeladen) — nicht hierher.

## Roadmap

- **v0 (Struktur):** Seitenstruktur (Landing, Blog, Über, Kontakt), Typewriter, CV-Timeline, deutsche Grundtexte mit TODO-RENE-Markern.
- **v1 (Launch):** Technisch sauberer Livegang. Fehlerfreier Build; SEO vollständig (Meta-Titel und Descriptions je Seite, Open Graph, Sitemap, robots.txt, Canonical-URLs — prüfen, was AstroPaper schon mitbringt, Lücken schließen); gute Lighthouse-Werte für Performance, Accessibility und SEO; PostHog-Integration (EU-Cloud, cookieless); Custom Domain aktiv mit HTTPS.
- **Danach:** Mermaid- und MapLibre-Ausbau nach Bedarf. Grafische Umbauten ausschließlich in Feature-Branches mit eigenem Briefing-Dokument im jeweiligen Branch — nie über diese Datei.

---

**Weitere Informationen** 
Der Inhalt der Seite ist Deutsch, die Kommentare beim Programmieren sollen aber Englisch sein.
