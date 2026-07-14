/**
 * Structured CV data for the "Über mich" timeline and supplementary sections.
 * Content is publicly cleared (see CLAUDE.md). Keep this file as the single
 * source of truth — do not hardcode CV entries in markup.
 *
 * Ordering: newest first (most relevant on top).
 */

/** A single station in the vertical timeline. */
export interface CvEntry {
  /** Display period, e.g. "10/2021 – 01/2025" or "seit 03/2025". */
  period: string;
  /** Role or degree. */
  title: string;
  /** Institution / company, incl. location where relevant. */
  org: string;
  /** Optional one-line description. */
  description?: string;
  /** Marks an ongoing station (rendered with an accent). */
  current?: boolean;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Language {
  name: string;
  level: string;
}

export const education: CvEntry[] = [
  {
    period: "seit 03/2025",
    title: "MSc Applied Geoinformatics",
    org: "Universität Salzburg (Z_GIS)",
    description:
      "Abschluss vorauss. 12/2026. Masterarbeit: mobile Felddatenerfassung mit PostGIS-Backend und OGC-Diensten (WMS/WFS).",
    current: true,
  },
  {
    period: "10/2021 – 01/2025",
    title: "BSc Geographie",
    org: "Universität Klagenfurt",
    description: "Inkl. einem Jahr Informatik; Zertifikat Entrepreneurship.",
  },
  {
    period: "2016 – 2021",
    title: "Maschinenbau (Matura)",
    org: "HTL 1 Lastenstraße, Klagenfurt",
  },
];

export const experience: CvEntry[] = [
  {
    period: "08/2026 – 10/2026",
    title: "Praktikum GIS-Entwicklung",
    org: "KELAG",
    description: "Schwerpunkte: FME, GeoServer, Oracle.",
  },
  {
    period: "02/2026 – 07/2026",
    title: "Stud. Projektmitarbeiter Earth Observation",
    org: "Z_GIS, Universität Salzburg",
    description: "Apache Spark, Apache Sedona.",
  },
  {
    period: "10/2025 – 07/2026",
    title: "Mitgründung Start-up-Projekt",
    org: "Eigenes Projekt",
    description: "Geoinformatik-Automatisierung für Gemeinden.",
  },
  {
    period: "07/2024 – 12/2025",
    title: "GIS-Analyst",
    org: "VUM GmbH",
    description:
      "Kartographie und GIS-Analysen im Energie- und Infrastrukturumfeld.",
  },
  {
    period: "07/2023 – 08/2023",
    title: "Praktikum Java Backend Development",
    org: "Plincs GmbH",
  },
  {
    period: "08/2022 – 09/2022",
    title: "Praktikum Raumplanung und Raumordnung",
    org: "Land Kärnten",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "GIS & Fernerkundung",
    items: [
      "QGIS",
      "ArcGIS Pro",
      "Trimble eCognition",
      "GeoServer",
      "GeoLibre (Eigenentwicklung)",
    ],
  },
  {
    label: "Programmierung & Daten",
    items: [
      "Python (GeoPandas, GDAL, Shapely, Rasterio)",
      "PostgreSQL/PostGIS",
      "DuckDB",
      "Apache Sedona",
    ],
  },
  {
    label: "Werkzeuge",
    items: ["Docker", "Git"],
  },
];

export const publications: string[] = [
  "AGIT 2025 — TVDI-basierte Bodenfeuchteanalyse (Ratschitschacher Moor).",
];

export const languages: Language[] = [
  { name: "Deutsch", level: "Muttersprache" },
  { name: "Englisch", level: "fließend" },
];
