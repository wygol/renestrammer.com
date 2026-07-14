# AstroPaper – Struktur- & Beispiel-Referenz

> **Zweck:** Dieses File ist ein reines Nachschlagewerk. Es liegt bewusst unter
> `docs/` (außerhalb von `src/content/`), wird also **nicht** gebaut, nicht
> veröffentlicht und nicht von Prettier geprüft. Die ursprünglichen
> Theme-Beispielposts wurden aus `src/content/posts/` hierher verschoben, damit
> wir bei Struktur- oder Syntaxfragen nachsehen können, ohne sie live zu haben.
>
> Nicht löschen, solange wir noch am Content bauen.

---

## 1. Frontmatter-Schema (Quelle: `src/content.config.ts`)

Jeder Blogpost (`src/content/posts/**/*.md` oder `.mdx`) hat folgendes Frontmatter:

| Feld           | Typ                    | Pflicht | Default            | Zweck                                                            |
| -------------- | ---------------------- | ------- | ------------------ | ---------------------------------------------------------------- |
| `title`        | string                 | **ja**  | –                  | Titel des Posts, wird als `<h1>` gerendert                       |
| `description`  | string                 | **ja**  | –                  | Excerpt + Meta-Description (SEO, Social)                          |
| `pubDatetime`  | date (ISO 8601)        | **ja**  | –                  | Veröffentlichungsdatum, z. B. `2026-07-13T10:00:00Z`             |
| `modDatetime`  | date, optional/null    | nein    | –                  | Nur setzen, wenn ein Post nachträglich geändert wurde            |
| `author`       | string                 | nein    | `config.site.author` | Autor (Standard = „René Strammer" aus der Config)             |
| `featured`     | boolean                | nein    | `false`            | Post in der „Featured"-Sektion der Startseite zeigen             |
| `draft`        | boolean                | nein    | `false`            | `true` = Entwurf, wird nicht veröffentlicht                      |
| `tags`         | string[]               | nein    | `["others"]`       | Schlagwörter; für dieses Projekt u. a. `tech`, `persoenlich`     |
| `ogImage`      | Bildpfad oder URL      | nein    | auto-generiert     | OG-Bild (1200×640). Ohne Angabe wird eines generiert             |
| `canonicalURL` | string (absolut)       | nein    | `site` + Pfad      | Nur wenn der Artikel primär woanders lebt                        |
| `hideEditPost` | boolean                | nein    | `false`            | „Edit post"-Button unter dem Titel ausblenden                    |
| `timezone`     | string (IANA)          | nein    | `config.site.timezone` | Zeitzone nur für diesen Post überschreiben                   |

> Hinweis: Unbekannte Frontmatter-Felder werden von Zod stillschweigend
> entfernt. Nur die Felder oben werden ausgewertet.

---

## 2. Datei-Ablage & URL-Regeln

- Posts liegen unter `src/content/posts/`. Unterordner werden Teil der URL:
  - `src/content/posts/very-first-post.md` → `/posts/very-first-post`
  - `src/content/posts/2025/example-post.md` → `/posts/2025/example-post`
- **Unterstrich-Präfix** (`_`) bei Datei **oder** Ordner = aus Routing/Collection
  ausgeschlossen (Loader-Pattern: `**/[^_]*.{md,mdx}`). Nützlich für Entwürfe,
  geteilte Assets oder internes Material.
  - `src/content/posts/_2026/another-post.md` → **nicht** veröffentlicht
- Sprachpolitik dieses Projekts: pro Post genau **eine** Sprache; Kennzeichnung
  über Tags/Frontmatter. Site-Grundsprache ist Deutsch.

---

## 3. Konventionen

- **Überschriften:** Der `title` aus dem Frontmatter ist die `<h1>`. Im Fließtext
  daher nur `<h2>`–`<h6>` (`##`–`######`) verwenden – wichtig für A11y & SEO.
- **Inhaltsverzeichnis (TOC):** Optional. Eine `## Table of contents`-Überschrift
  an der gewünschten Stelle einfügen; das TOC wird per `remark-toc` erzeugt.
- **Callouts** (via `rehype-callouts`, Obsidian-Syntax):
  ```md
  > [!NOTE]
  > Ergänzende Information.

  > [!WARNING]- Standardmäßig eingeklappt
  > Erst sichtbar, wenn aufgeklappt.

  > [!TIP]+ Aufgeklappt, aber einklappbar
  > Startet offen.

  > [!DANGER] Eigener Titel
  > Ersetzt die Standard-Überschrift.
  ```
  Typen u. a.: `NOTE`, `INFO`, `TIP`, `SUCCESS`, `WARNING`, `DANGER`, `QUESTION`,
  `EXAMPLE`, `QUOTE` (mit Aliassen wie `IMPORTANT`→`TIP`, `CAUTION`→`WARNING`).
- **Code-Highlighting:** Shiki (Light `min-light`, Dark `night-owl`) plus
  `@shikijs/transformers` (Diff-/Highlight-Notation, Dateinamen-Header).
- **Bilder:**
  - Bevorzugt in `src/assets/` (wird von Astro optimiert). Referenz per
    Markdown und Alias `@/assets/…` oder relativem Pfad:
    `![alt](@/assets/images/example.jpg)`
  - `<img>`/`<Image>` funktioniert **nicht** in reinem Markdown (nur in MDX).
  - `public/`-Bilder werden **nicht** optimiert → vorher komprimieren, absolute
    Pfade nutzen: `![alt](/assets/images/example.jpg)`
  - Projekt-Vorgabe: Bilder als **WebP** über die Astro-Bildpipeline.
- **OG-Image:** 1200×640 px empfohlen; ohne Angabe automatisch generiert.

---

## 4. Frontmatter-Vorlage (kopierbereit)

Minimal (nur Pflichtfelder):

```yaml
---
title: "Titel des Posts"
description: "Ein bis zwei Sätze als Excerpt und Meta-Description."
pubDatetime: 2026-07-13T10:00:00Z
tags:
  - tech
---
```

Vollständig (mit gängigen Optionen):

```yaml
---
title: "Titel des Posts"
description: "Ein bis zwei Sätze als Excerpt und Meta-Description."
pubDatetime: 2026-07-13T10:00:00Z
# modDatetime: 2026-07-20T09:00:00Z   # nur bei späterer Änderung setzen
# author: "René Strammer"            # Default kommt aus der Config
featured: false
draft: false
tags:
  - tech            # oder: persoenlich
# ogImage: "@/assets/images/mein-bild.webp"
---
```

---

## 5. Rohinhalt der ursprünglichen Beispielposts

Ab hier folgt der unveränderte Inhalt der Theme-Beispielposts, jeweils mit
Pfad-Marker. Rein zum Nachschlagen – nicht bearbeiten.


<!-- ============================================================ -->
<!-- FILE: src/content/posts/adding-new-post.mdx -->
<!-- ============================================================ -->

---
author: Sat Naing
pubDatetime: 2022-09-23T15:22:00Z
modDatetime: 2026-06-03T00:00:00.000Z
title: Adding new posts in AstroPaper theme
slug: adding-new-posts-in-astropaper-theme
featured: true
draft: false
tags:
  - docs
description: "Some rules & recommendations for creating or adding new posts using AstroPaper theme."
---
import ResponsiveTable from '@/components/ResponsiveTable.astro';

This guide covers the rules and conventions for creating new posts in AstroPaper — file placement, frontmatter fields, images, and syntax highlighting.

<figure>
  <img
    src="https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="Free Classic wooden desk with writing materials, vintage clock, and a leather bag. Stock Photo"
  />
  <figcaption class="text-center">
    Photo by{" "}
    <a href="https://www.pexels.com/photo/brown-wooden-desk-159618/">Pixabay</a>
  </figcaption>
</figure>

## Table of contents

## Creating a Blog Post

To write a new blog post, create a markdown (or MDX) file inside the `src/content/posts/` directory.

You can organize posts into subdirectories to make content easier to manage. The subdirectory name becomes part of the post URL. For example, `src/content/posts/2025/example-post.md` will be available at `/posts/2025/example-post`.

If you want a subdirectory for organization only, without it affecting the URL, prefix the folder name with an underscore (`_`).

```bash
# Example: post file paths and their URLs
src/content/posts/very-first-post.md          -> mysite.com/posts/very-first-post
src/content/posts/2025/example-post.md        -> mysite.com/posts/2025/example-post
src/content/posts/_2026/another-post.md       -> mysite.com/posts/another-post
src/content/posts/docs/_legacy/how-to.md      -> mysite.com/posts/docs/how-to
src/content/posts/Example Dir/Dummy Post.md   -> mysite.com/posts/example-dir/dummy-post
```

> [!TIP]
> Files and directories prefixed with `_` are excluded from routing. Use them for drafts, shared assets, or internal-only content.

## Frontmatter

Frontmatter is the main place to store metadata about a blog post. It lives at the top of the file in YAML format. Read more about frontmatter and its usage in [Astro documentation](https://docs.astro.build/en/guides/markdown-content/).

Here is the list of frontmatter properties for each post:

<ResponsiveTable variant="striped-minimal">

| Property           | Description                                                                                                                         | Remark                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **_title_**        | Title of the post. (h1)                                                                                                             | required<sup>\*</sup>                          |
| **_description_**  | Description of the post. Used in post excerpt and site description of the post.                                                     | required<sup>\*</sup>                          |
| **_pubDatetime_**  | Published datetime in ISO 8601 format.                                                                                              | required<sup>\*</sup>                          |
| **_modDatetime_**  | Modified datetime in ISO 8601 format. (only add this property when a blog post is modified)                                         | optional                                       |
| **_author_**       | Author of the post.                                                                                                                 | default = `site.author`                        |
| **_featured_**     | Whether or not to display this post in the featured section of the home page.                                                       | default = false                                |
| **_draft_**        | Mark this post as 'unpublished'.                                                                                                    | default = false                                |
| **_tags_**         | Related keywords for this post. Written in array YAML format.                                                                       | default = others                               |
| **_ogImage_**      | OG image of the post. Useful for social media sharing and SEO. Can be a remote URL or an image path relative to the current folder. | default = `site.ogImage` or generated OG image |
| **_canonicalURL_** | Canonical URL (absolute), in case the article already exists on another source.                                                     | default = `Astro.site` + `Astro.url.pathname`  |
| **_hideEditPost_** | Hide the edit-post button under the post title. Applies only to the current post.                                                   | default = false                                |
| **_timezone_**     | Specify a timezone in IANA format for the current post. Overrides the global `site.timezone` config for this post only.             | default = `site.timezone`                      |

</ResponsiveTable>

> [!TIP]
> You can get an ISO 8601 datetime by running `new Date().toISOString()` in the console.

Only `title`, `description`, and `pubDatetime` fields in frontmatter must be specified.

Title and description (excerpt) are important for search engine optimization (SEO) and thus AstroPaper encourages you to include these in all blog posts.

If you omit `tags` in a blog post (in other words, if no tag is specified), the default tag `others` will be used as a tag for that post. You can set the default tag in `src/content.config.ts`:

```ts file="src/content.config.ts"
// ...
tags: z.array(z.string()).default(["others"]), // replace "others" with whatever you want
// ...
```

### Sample Frontmatter

Here is sample frontmatter for a post.

```yaml file="src/content/posts/sample-post.md"
---
title: The title of the post
author: your name
pubDatetime: 2022-09-21T05:17:19Z
featured: true
draft: false
tags:
  - some
  - example
  - tags
ogImage: ../../assets/images/example.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: This is the example description of the example post.
canonicalURL: https://example.org/my-article-was-already-posted-here
---
```

### VS Code snippets (optional)

AstroPaper includes workspace snippets to speed up creating new posts:

- **frontmatter**: inserts the recommended frontmatter block
- **template**: inserts a basic post template (including `## Table of contents`)

These snippets live in `.vscode/astro-paper.code-snippets`. If you use VS Code (or Cursor), they should be available automatically when you open the workspace.

## Callouts

AstroPaper started supporting callouts in AstroPaper v6.1. They use a simple blockquote syntax powered by `rehype-callouts` (Obsidian theme).

Here are the most commonly used types:

> [!NOTE]
> Supplementary information the reader should be aware of.

> [!TIP]
> Helpful advice, shortcuts, or best practices.

> [!WARNING]
> Something that could go wrong or have unintended consequences.

> [!DANGER]
> Serious risk of failure, data loss, or incorrect behavior.

> [!INFO]
> Neutral informational context — less urgent than a note.

> [!SUCCESS]
> Confirmation that something worked or is correct.

The full list of supported types includes: `NOTE`, `ABSTRACT`, `INFO`, `TODO`, `TIP`, `SUCCESS`, `QUESTION`, `WARNING`, `FAILURE`, `DANGER`, `BUG`, `EXAMPLE`, `QUOTE` — each with its own icon and color. Many types also accept aliases (e.g. `HINT` and `IMPORTANT` for `TIP`, `CAUTION` for `WARNING`). See the [rehype-callouts docs](https://github.com/lin-stephanie/rehype-callouts) for the complete reference.

### Collapsible callouts

Add `-` after the type to make the callout collapsed by default, or `+` to make it expanded but collapsible:

> [!WARNING]- Read before proceeding
> This content is hidden until the reader expands it. Useful for long caveats that would otherwise interrupt the flow.

> [!TIP]+ Pro tip (expanded by default)
> This starts open but can be collapsed. Great for optional detail you still want visible on first load.

### Custom titles

Replace the default type label with any title you like by adding text after the type:

> [!NOTE] Did you know?
> The text after the type becomes the callout's heading. Leave it out and the type name is used automatically.

### Syntax summary

```md
> [!NOTE]
> Supplementary information.

> [!WARNING]- Collapsed by default
> Hidden until expanded.

> [!TIP]+ Expanded, but collapsible
> Starts open.

> [!DANGER] Custom title
> Replaces the default heading.
```

## Adding table of contents

By default, a post does not include any table of contents (TOC). To include one, write `Table of contents` as an h2 heading (`##` in Markdown) and place it where you want it to appear:

```md
---
# frontmatter
---

Here are some recommendations, tips & tricks for creating new posts in AstroPaper blog theme.

<!-- [!code ++] -->
## Table of contents

<!-- the rest of the post -->
```

## Headings

There's one thing to note about headings. AstroPaper blog posts use `title` (from frontmatter) as the main heading of the post. Therefore, the rest of the headings in the post should use `h2` \~ `h6`.

This rule is not mandatory, but highly recommended for visual, accessibility, and SEO purposes.

## Syntax Highlighting

AstroPaper uses [Shiki](https://shiki.style/) as the default syntax highlighter, with [@shikijs/transformers](https://shiki.style/packages/transformers) for enhanced fenced code blocks. If you don't want to use the transformers, you can remove them:

```bash
pnpm remove @shikijs/transformers
```

```ts file="astro.config.ts"
// ...
// [!code --:5]
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

export default defineConfig({
  // ...
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName(),
        // [!code --:3]
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  // ...
});
```

## Storing Images for Blog Content

Here are two methods for storing images and using them inside a markdown file.

> [!IMPORTANT]
> If you need to style optimized images in markdown, you should [use MDX](https://docs.astro.build/en/guides/images/#images-in-mdx-files).

### Inside `src/assets/` directory (recommended)

You can store images inside the `src/assets/` directory. These images will be automatically optimized by Astro through the [Image Service API](https://docs.astro.build/en/reference/image-service-reference/).

You can use a relative path or alias path (`@/assets/`) to reference these images.

Example: suppose you want to display `example.jpg` whose path is `src/assets/images/example.jpg`.

```md
![something](@/assets/images/example.jpg)

<!-- OR -->

![something](../../assets/images/example.jpg)

<!-- Using img tag or Image component won't work in markdown ❌ -->
<img src="@/assets/images/example.jpg" alt="something">
<!-- ^^ This is wrong -->
```

> [!TIP]
> Technically, you can store images inside any directory under `src`. `src/assets` is just a recommendation.

### Inside `public/` directory

You can store images inside the `public/` directory. Keep in mind that images stored in `public/` remain untouched by Astro, meaning they will be unoptimized and you need to handle image optimization yourself.

For these images, use an absolute path. They can be displayed using [markdown image syntax](https://www.markdownguide.org/basic-syntax/#images-1) or an HTML `img` tag.

Example: assume `example.jpg` is located at `public/assets/images/example.jpg`.

```md
![something](/assets/images/example.jpg)

<!-- OR -->

<img src="/assets/images/example.jpg" alt="something">
```

## Bonus

### Image compression

> [!WARNING]
> When putting images in a blog post (especially those in the `public/` directory), compress them first. Unoptimized images significantly hurt page performance.

Recommended image compression sites:

- [TinyPng](https://tinypng.com/)
- [TinyJPG](https://tinyjpg.com/)

### OG Image

The default OG image will be used if a post does not specify one. Though not required, an OG image relevant to the post should be specified in the frontmatter. The recommended size for OG images is **_1200 X 640_** px.

> [!TIP]
> Since AstroPaper v1.4.0, OG images are generated automatically if not specified. Check out [the announcement](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/).


<!-- ============================================================ -->
<!-- FILE: src/content/posts/customizing-astropaper-theme-color-schemes.mdx -->
<!-- ============================================================ -->

---
author: Sat Naing
pubDatetime: 2022-09-25T15:20:35Z
modDatetime: 2026-05-17T04:57:06.476Z
title: Customizing AstroPaper theme color schemes
featured: false
draft: false
tags:
  - color-schemes
  - docs
description:
  How you can enable/disable light & dark mode; and customize color schemes
  of AstroPaper theme.
---
import ResponsiveTable from '@/components/ResponsiveTable.astro';

This guide covers how to enable or disable light and dark mode, and how to customize the color scheme for the entire site.

## Table of contents

## Enable/disable light & dark mode

AstroPaper theme includes light and dark mode by default. This default behavior can be disabled in `astro-paper.config.ts`:

```ts file="astro-paper.config.ts"
export default defineAstroPaperConfig({
  // ...
  features: {
    lightAndDarkMode: true, // [!code highlight]
    // ...
  },
});
```

To disable `light & dark mode`, set `features.lightAndDarkMode` to `false`. When disabled, the site will use only the light color scheme defined in `src/styles/theme.css`.

## Customize color schemes

Both light and dark color schemes of AstroPaper theme are defined in `src/styles/theme.css`.

```css file="src/styles/theme.css"
/* Light theme values */
:root,
[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --accent-foreground: #ffffff;
  --muted: #e6e6e6;
  --muted-foreground: #6b7280;
  --border: #ece9e9;
}

/* Dark theme values */
[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --accent-foreground: #ffffff;
  --muted: #343f60;
  --muted-foreground: #afb9ca;
  --border: #ab4b08;
}
```

The `:root` and `[data-theme="light"]` selectors define the light color scheme, while `[data-theme="dark"]` defines the dark color scheme.

To customize your own color scheme, specify your light colors inside `:root, [data-theme="light"]`, and your dark colors inside `[data-theme="dark"]`.

Here is a detailed explanation of each color property:

<ResponsiveTable variant="minimal" class="max-sm:-mx-4 [&_td]:first-of-type:text-nowrap">

| Color Property        | Definition & Usage                                                    |
| --------------------- | --------------------------------------------------------------------- |
| `--background`        | Primary color of the website. Usually the main background.            |
| `--foreground`        | Secondary color of the website. Usually the text color.               |
| `--accent`            | Accent color. Used for links, hover states, and interactive elements. |
| `--accent-foreground` | Foreground color displayed on top of `--accent` backgrounds.          |
| `--muted`             | Muted background color. Used for cards, tags, and hover states.       |
| `--muted-foreground`  | Text color displayed on top of `--muted` backgrounds.                 |
| `--border`            | Border color. Used for dividers and visual separation.                |

</ResponsiveTable>

Here is an example of changing the light color scheme:

```css file="src/styles/theme.css"
/* ... */
:root,
[data-theme="light"] {
  --background: #f6eee1;
  --foreground: #012c56;
  --accent: #e14a39;
  --accent-foreground: #ffffff;
  --muted: #efd8b0;
  --muted-foreground: #6b7280;
  --border: #dc9891;
}
/* ... */
```

> Check out some [predefined color schemes](https://astro-paper.pages.dev/posts/predefined-color-schemes/) AstroPaper has already crafted for you.


<!-- ============================================================ -->
<!-- FILE: src/content/posts/dynamic-og-images.md -->
<!-- ============================================================ -->

---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2026-06-03T00:00:00.000Z
title: Dynamic OG image generation in AstroPaper blog posts
slug: dynamic-og-image-generation-in-astropaper-blog-posts
featured: false
draft: false
tags:
  - docs
  - release
description: New feature in AstroPaper v1.4.0, introducing dynamic OG image generation for blog posts.
---

New feature in AstroPaper v1.4.0, introducing dynamic OG image generation for blog posts.

![Dynamic OG image generation in AstroPaper blog posts](/posts/dynamic-og-image-generation-in-astropaper-blog-posts/index.png)

## Table of contents

## Intro

OG images (aka Social Images) play an important role in social media engagements. In case you don't know what OG image means, it is an image displayed whenever we share our website URL on social media such as Facebook, Discord etc.

> The Social Image used for Twitter is technically not called OG image. However, in this post, I'll be using the term OG image for all types of Social Images.

## Default/Static OG image (the old way)

AstroPaper already provided a way to add an OG image to a blog post. The author can specify the OG image in the frontmatter `ogImage`. Even when the author doesn't define the OG image in the frontmatter, the default OG image will be used as a fallback (in this case `public/default-og.jpg`). But the problem is that the default OG image is static, which means every blog post that does not include an OG image in the frontmatter will always use the same default OG image despite each post title/content being different from others.

## Dynamic OG Image

Generating a dynamic OG image for each post allows the author to avoid specifying an OG image for every single blog post. Besides, this will prevent the fallback OG image from being identical to all blog posts.

In AstroPaper v1.4.0, Vercel's [Satori](https://github.com/vercel/satori) package is used for dynamic OG image generation.

In AstroPaper v6+, the same idea remains (Satori renders SVG, then PNG is produced via [Sharp](https://sharp.pixelplumbing.com/)), but fonts are sourced from Astro's **Fonts** configuration and loaded via [`experimental_getFontFileURL()`](https://astro.build/blog/astro-620/) so OG generation can reuse the same font pipeline as the site.

Dynamic OG images will be generated at build time for blog posts that:

- don't include OG image in the frontmatter
- are not marked as draft.

## Anatomy of AstroPaper dynamic OG image

Dynamic OG images include _the blog post title_, _author name_, and _site title_. Author name and site title are retrieved from `site.author` and `site.title` in `astro-paper.config.ts`. The title is generated from the blog post frontmatter `title`.

![Example Dynamic OG Image link](https://user-images.githubusercontent.com/53733092/209704501-e9c2236a-3f4d-4c67-bab3-025aebd63382.png)

### Issue with Non-Latin Characters

> [!CAUTION]
> Titles with non-latin characters won't display properly out of the box. Switch the Google font family to one that covers your writing system, and include **both** `400` and `700` weights — Satori uses separate buffers for regular and bold, so missing either causes mismatched rendering.

```ts file="astro.config.ts"
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      // Example: Japanese coverage (pick what you need for your audience)
      name: "Noto Sans JP",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [400, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
});
```

If you change `cssVariable`, also update the matching key in:

- `src/pages/og.png.ts`
- `src/pages/posts/[...slug]/index.png.ts`

> Check out [this PR](https://github.com/satnaing/astro-paper/pull/318) for more info.

> [!WARNING] Caveats
>
> - **Build time** grows with content volume — one PNG per eligible post is generated at build time. Generation is faster in v6 (PR [#632](https://github.com/satnaing/astro-paper/pull/632)), but on very large sites you can disable it with `features.dynamicOgImage: false` in `astro-paper.config.ts`.
> - **RTL languages** are not supported yet.
> - **Emoji** in titles can be tricky — some may not render correctly.


<!-- ============================================================ -->
<!-- FILE: src/content/posts/examples/example-draft-post.md -->
<!-- ============================================================ -->

---
title: Example Draft Post
author: Sat Naing
pubDatetime: 2022-06-06T04:06:31Z
slug: example-draft-post
featured: false
draft: true
tags:
  - TypeScript
  - Astro
description:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel
  fringilla est
---

Users cannot see this post because it is in draft.

## Motivation

rec 1


<!-- ============================================================ -->
<!-- FILE: src/content/posts/examples/portfolio-website-development.md -->
<!-- ============================================================ -->

---
title: How Do I Develop My Portfolio Website & Blog
author: Sat Naing
pubDatetime: 2022-03-25T16:55:12.000+00:00
slug: how-do-i-develop-my-portfolio-and-blog
featured: false
draft: false
tags:
  - NextJS
  - TailwindCSS
  - HeadlessCMS
  - Blog
description:
  "EXAMPLE POST: My experience about developing my first portfolio website and a blog
  using NextJS and a headless CMS."
timezone: "Asia/Yangon"
---

> This article is originally from my [blog post](https://satnaing.dev/blog/posts/how-do-i-develop-my-portfolio-and-blog). I put this article to demonstrate how you can write blog posts/articles using AstroPaper theme.

My experience about developing my first portfolio website and a blog using NextJS and a headless CMS.

![Building portfolio](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg&w=2048&q=75)

## Motivation

I've been always thinking about launching my own website with my custom domain name (**satnaing.dev**) since my college student life. But that never happened until this project. I've done several projects and works about web application development but I didn't make an effort to do this.

So, "what about blog?" you may ask. Yeah, blog also has been in my project list for some time. I always wanted to make a blog project using some of the latest technologies. However, I've been busy with my works and other projects so that blog project has never been started.

In these days, I tend to develop my own projects with the focus in good quality rather than quantity. After the project is done, I usually put a proper readme file in the GitHub repo. But GitHub repo readme is only suitable for technical aspects (this is just my thought). I want to write down my experiences and challenges. Thus, I decided to make my own blog. Plus, at this point, I have decent experiences and confidence to develop this project.

## Tech Stack

For the front-end, I wanted to use [React](https://reactjs.org/ "React Official Website"). But React alone is not good enough for SEO; and I did have to consider many factors like routing, image optimization etc. So, I chose [NextJS](https://nextjs.org/ "NextJS Official Website") as my main front-end stack. And of course TypeScript for type checking. (It's said that you'll love TypeScript when you're used to it 😉)

For styling, I use [TailwindCSS](https://tailwindcss.com/ "Tailwind CSS Official Website"). This is because I love developer experience that Tailwind gives and it has a lot of flexibilities compared to other component UI libraries like MUI or React Bootstrap.

All contents of this project reside within the GitHub repository. All my blog posts (including this one) are written in Markdown file format since I'm very used to with this. But to write Markdown along with its frontmatter effortlessly, I use [Forestry](https://forestry.io/ "Forestry Official Website") headless CMS. It is a git-based CMS that can serve Markdown and other contents. Because of this, I can write my contents either using Markdown or wysiwyg editor. Besides, writing frontmatters with this is a breeze.

Images and assets are uploaded and stored in [Cloudinary](https://cloudinary.com/ "Cloudinary Official Website"). I connect Cloudinary via Forestry and manage them directly in the dashboard.

In conclusion, these are the tech stack I've used for this project.

- Front-end: NextJS (TypeScript)
- Styling: TailwindCSS
- Animations: GSAP
- CMS: Forestry Headless CMS
- Deployment: Vercel

## Features

The following are certain features of my portfolio and blog

### SEO Friendly

The entire project is developed with SEO focus in mind. I've used proper meta tags, descriptions and heading alignments. This website is now indexed by Google.

> You can search this website on google by using keywords like 'sat naing dev'

![searching satnaing.dev on google](https://res.cloudinary.com/noezectz/image/upload/v1648231400/SatNaing/satnaing-on-google_asflq6.png "satnaing.dev is indexed")

Moreover, this website will be displayed well when shared to social media due to properly used meta tags.

![satnaing.dev card layout when shared to Facebook](https://res.cloudinary.com/noezectz/image/upload/v1653106955/SatNaing/satnaing-dev-share-on-facebook_1_zjoehx.png "Card layout when shared to Facebook")

### Dynamic Sitemap

Sitemap plays an important part in SEO. Because of this, every single page of this site should be included in sitemap.xml. I made an auto generated sitemap in my website whenever I create a new content or tags or categories.

### Light & Dark Themes

Due to dark theme trend in recent years, many websites include dark theme out of the box nowadays. Certainly, my website also supports light & dark themes.

### Fully Accessible

This website is fully accessible. You can navigate around by only using keyboard. I put all a11y enhancement best practices like including alt text in all images, no skipping headings, using semantic HTML tags, using aria-attributes properly.

### Search box, Categories & Tags

All blog contents can be searched by search box. Moreover, contents can be filtered by categories and tags. In this way, blog readers can search and read what they really want.

### Performance and Lighthouse Score

This website got very good performance and lighthouse score thanks to proper development and best practices. Here's the lighthouse score for this website.

![satnaing.dev Lighthouse score](https://user-images.githubusercontent.com/53733092/159957822-7082e459-11e9-4616-8f1e-49d0881f7cbb.png "satnaing.dev Lighthouse score")

### Animations

Initially I used [Framer Motion](https://www.framer.com/motion/ "Framer Motion") to add animations and micro interactions for this website. However, when I tried to use some complex animations and parallax effects, I found it inconvenient to integrate with Framer Motion (Maybe I'm not very good at and used to working with it). Hence, I decided to use [GSAP](https://greensock.com/ "GSAP Animation Library") for all of my animations. It is one of the most popular animation library and it is capable of doing complex and advanced animations. You can see animations and micro interactions on pretty much every page of this website.

![animations at satnaing.dev](https://res.cloudinary.com/noezectz/image/upload/v1653108324/SatNaing/ezgif.com-gif-maker_2_hehtlm.gif "satnaing.dev website")

## Outro

In conclusion, this project gives me a lot of experience and confidence about developing blog site (SSG). Now, I have gained knowledge of git-based CMS and how it interacts with NextJS. I've also learned about SEO, dynamic sitemap generation and indexing Google procedures. I will make better projects in the future. So, stay tuned! ✌🏻

And... last but not least, I would like to say 'thanks' to my friend [Swann Fevian Kyaw](https://www.facebook.com/bon.zai.3910 "Swann Fevian Kyaw's Facebook Account") (@[ToonHa](https://www.facebook.com/ToonHa-102639465752883 "ToonHa Facebook Page")) who has drawn a beautiful illustration for my hero section of the website.

## Project Links

- Website: [https://satnaing.dev/](https://satnaing.dev/ "https://satnaing.dev/")
- Blog: [https://satnaing.dev/blog](https://satnaing.dev/blog "https://satnaing.dev/blog")
- Repo: [https://github.com/satnaing/my-portfolio](https://github.com/satnaing/my-portfolio "https://github.com/satnaing/my-portfolio")


<!-- ============================================================ -->
<!-- FILE: src/content/posts/examples/tailwind-typography.md -->
<!-- ============================================================ -->

---
title: Tailwind Typography Plugin
author: Sat Naing
pubDatetime: 2022-07-05T02:05:51Z
featured: false
draft: false
tags:
  - TypeScript
  - Astro
description: "EXAMPLE POST: About Tailwind Typography Plugin and how you can use it effectively."
---

> This article is from [TailwindLabs](https://tailwindcss-typography.vercel.app/). I put this article to demonstrate how you can write blog posts/articles using AstroPaper theme.

By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you _really are_ just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.

We get lots of complaints about it actually, with people regularly asking us things like:

> Why is Tailwind removing the default styles on my `h1` elements? How do I disable this? What do you mean I lose all the other base styles too?
> We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a `p` element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look _awesome_, not awful.

The `@tailwindcss/typography` plugin is our attempt to give you what you _actually_ want, without any of the downsides of doing something stupid like disabling our base styles.

It adds a new `prose` class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:

```html
<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread
    with cheese to their children, with the food earning such an iconic status
    in our culture that kids will often dress up as warm, cheesy loaf for
    Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a
    series of rabies cases springing up around the country.
  </p>
  <!-- ... -->
</article>
```

For more information about how to use the plugin and the features it includes, [read the documentation](https://github.com/tailwindcss/typography/blob/master/README.md).

---

## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, _and even italics_.

It's important to cover all of these use cases for a few reasons:

1. We want everything to look good out of the box.
2. Really just the first reason, that's the whole point of the plugin.
3. Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we're going to try out another header style.

### Typography should be easy

So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.
> It's probably important that images look okay here by default as well:

<figure>
  <img
    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
    alt=""
  />
  <figcaption>
    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
    classical Latin literature from 45 BC, making it over 2000 years old.
  </figcaption>
</figure>

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

And that's the end of this section.

## What if we stack headings?

### We should make sure that looks good, too.

Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.

### When a heading comes after a paragraph …

When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.

- **I often do this thing where list items have headings.**

  For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.

  I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.

- **Since this is a list, I need at least two items.**

  I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.

- **It's not a bad idea to add a third item either.**

  I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.

After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.

## Code should look okay by default.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
```

Hopefully that looks good enough to you.

### What about nested lists?

Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.

1. **Nested lists are rarely a good idea.**
   - You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.
   - Nested navigation in UIs is a bad idea too, keep things as flat as possible.
   - Nesting tons of folders in your source code is also not helpful.
2. **Since we need to have more items, here's another one.**
   - I'm not sure if we'll bother styling more than two levels deep.
   - Two is already too much, three is guaranteed to be a bad idea.
   - If you nest four levels deep you belong in prison.
3. **Two items isn't really a list, three is good though.**
   - Again please don't nest lists if you want people to actually read your content.
   - Nobody wants to look at this.
   - I'm upset that we even have to bother styling this.

The most annoying thing about lists in Markdown is that `<li>` elements aren't given a child `<p>` tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.

- **For example, here's another nested list.**

  But this time with a second paragraph.
  - These list items won't have `<p>` tags
  - Because they are only one line each

- **But in this second top-level list item, they will.**

  This is especially annoying because of the spacing on this paragraph.
  - As you can see here, because I've added a second line, this list item now has a `<p>` tag.

    This is the second line I'm talking about by the way.

  - Finally here's another list item so it's more like a list.

- A closing list item, but with no nested list, because why not?

And finally a sentence to close off this section.

## There are other elements we need to style

I almost forgot to mention links, like [this link to the Tailwind CSS website](https://tailwindcss.com). We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.

We even included table styles, check it out:

| Wrestler                | Origin       | Finisher           |
| ----------------------- | ------------ | ------------------ |
| Bret "The Hitman" Hart  | Calgary, AB  | Sharpshooter       |
| Stone Cold Steve Austin | Austin, TX   | Stone Cold Stunner |
| Randy Savage            | Sarasota, FL | Elbow Drop         |
| Vader                   | Boulder, CO  | Vader Bomb         |
| Razor Ramon             | Chuluota, FL | Razor's Edge       |

We also need to make sure inline code looks good, like if I wanted to talk about `<span>` elements or tell you the good news about `@tailwindcss/typography`.

### Sometimes I even use `code` in headings

Even though it's probably a bad idea, and historically I've had a hard time making it look good. This _"wrap the code blocks in backticks"_ trick works pretty well though really.

Another thing I've done in the past is put a `code` tag inside of a link, like if I wanted to tell you about the [`tailwindcss/docs`](https://github.com/tailwindcss/docs) repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.

#### We haven't used an `h4` yet

But now we have. Please don't use `h5` or `h6` in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a `before` pseudo-element to scream at you if you use an `h5` or `h6`.

We don't style them at all out of the box because `h4` elements are already so small that they are the same size as the body copy. What are we supposed to do with an `h5`, make it _smaller_ than the body copy? No thanks.

### We still need to think about stacked headings though.

#### Let's make sure we don't screw that up with `h4` elements, either.

Phew, with any luck we have styled the headings above this text and they look pretty good.

Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.

What I've written here is probably long enough, but adding this final sentence can't hurt.


<!-- ============================================================ -->
<!-- FILE: src/content/posts/examples/terminal-development.md -->
<!-- ============================================================ -->

---
title: How Do I Develop My Terminal Portfolio Website with React
author: Sat Naing
pubDatetime: 2022-06-09T03:42:51Z
slug: how-do-i-develop-my-terminal-portfolio-website-with-react
featured: false
draft: false
tags:
  - JavaScript
  - ReactJS
  - ContextAPI
  - Styled-Components
  - TypeScript
description:
  "EXAMPLE POST: Developing a terminal-like website using ReactJS, TypeScript and Styled-Components.
  Includes features like autocomplete, multiple themes, command hints etc."
timezone: "Asia/Yangon"
---

> This article is originally from my [blog post](https://satnaing.dev/blog/posts/how-do-i-develop-my-terminal-portfolio-website-with-react). I put this article to demonstrate how you can write blog posts/articles using AstroPaper theme.

Developing a terminal-like website using ReactJS, TypeScript and Styled-Components. Includes features like autocomplete, multiple themes, command hints etc.

![Sat Naing's Terminal Portfolio](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png&w=2048&q=75)

## Table of contents

## Intro

Recently, I've developed and published my portfolio + a blog. I’m glad I got some good feedback for it. Today, I want to introduce my new terminal-like portfolio website. It is developed using ReactJS, TypeScript. I got this idea from CodePen and YouTube.

## Tech Stack

This project is a frontend project without any backend codes. The UI/UX part is designed in Figma. For the frontend user-interface, I chose React over pain JavaScript and NextJS. Why?

- Firstly, I want to write declarative code. Managing HTML DOM using JavaScript imperatively is really tedious.
- Secondly, because it is React!!! It is fast, and reliable.
- Lastly, I don’t need much of the SEO features, routing and image optimization provided by NextJS.

And of course there's TypeScript for type checking.

For styling, I took a different approach than what I usually do. Instead of choosing Pure CSS, Sass, or Utility CSS Framework like TailwindCSS, I chose the CSS-in-JS way (Styled-Components). Although I’ve known about Styled-Components for some time, I’ve never tried it out. So, the writing style and structures of Styled-Components in this project may not be very organized or very good.

This project doesn’t need very complex state management. I just use ContextAPI in this project for multiple theming and to avoid prop drilling.

Here’s a quick recap for the tech stack.

- Frontend: [ReactJS](https://reactjs.org/ "React Website"), [TypeScript](https://www.typescriptlang.org/ "TypeScript Website")
- Styling: [Styled-Components](https://styled-components.com/ "Styled-Components Website")
- UI/UX: [Figma](https://figma.com/ "Figma Website")
- State Management: [ContextAPI](https://reactjs.org/docs/context.html "React ContextAPI")
- Deployment: [Netlify](https://www.netlify.com/ "Netlify Website")

## Features

Here are some features of the project.

### Multiple Themes

Users can change multiple themes. At the time of writing this post, there are 5 themes; and more themes will probably be added in the future. The selected theme is saved in local storage so that the theme won’t change on page refresh.

![Setting different theme](https://i.ibb.co/fSTCnWB/terminal-portfolio-multiple-themes.gif)

### Command-line Completion

To look and feel as close to the actual terminal as possible, I put a command-line completion feature which auto fills in partially typed commands by simply pressing ‘Tab’ or ‘Ctrl + i’.

![Demonstrating command-line completion](https://i.ibb.co/CQTGGLF/terminal-autocomplete.gif)

### Previous Commands

Users can go back to the previous commands or navigate the previously typed commands by pressing Up & Down Arrows.

![Going back to previous commands with UP Arrow](https://i.ibb.co/vD1pSRv/terminal-up-down.gif)

### View/Clear Command History

previously typed commands can be viewed by typing ‘history’ in the command line. All the command history and terminal screen can be wiped out by typing ‘clear’ or pressing ‘Ctrl + l’.

![Clearing the terminal with 'clear' or 'Ctrl + L' command](https://i.ibb.co/SJBy8Rr/terminal-clear.gif)

## Outro

This is a really fun project, and one special part of this project is I had to focus on logic rather than user-interface (even though this is kind of a frontend project).

## Project Links

- Website: [https://terminal.satnaing.dev/](https://terminal.satnaing.dev/ "https://terminal.satnaing.dev/")
- Repo: [https://github.com/satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio "https://github.com/satnaing/terminal-portfolio")


<!-- ============================================================ -->
<!-- FILE: src/content/posts/how-to-add-latex-equations-in-blog-posts.md -->
<!-- ============================================================ -->

---
author: Alberto Perdomo
pubDatetime: 2024-09-08T20:58:52.737Z
modDatetime: 2025-03-22T09:25:46.734Z
title: How to add LaTeX Equations in Astro blog posts
tags:
  - docs
description: Learn how to add LaTeX equations in Astro blog posts using Markdown, KaTeX, and remark/rehype plugins.
---

This document demonstrates how to use LaTeX equations in your Markdown files for AstroPaper. LaTeX is a powerful typesetting system often used for mathematical and scientific documents.

<figure>
  <img
    src="https://images.pexels.com/photos/22690748/pexels-photo-22690748/free-photo-of-close-up-of-complicated-equations-written-on-a-blackboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="Free Close-up of complex equations on a chalkboard, showcasing chemistry and math symbols. Stock Photo"
  />
  <figcaption class="text-center">
    Photo by <a href="https://www.pexels.com/photo/close-up-of-complicated-equations-written-on-a-blackboard-22690748/">Vitaly Gariev</a>
  </figcaption>
</figure>

## Table of contents

## Instructions

In this section, you will find instructions on how to add support for LaTeX in your Markdown files for AstroPaper.

1. Install the necessary remark and rehype plugins by running:

   ```bash
   pnpm install rehype-katex remark-math katex
   ```

2. Update the Astro configuration to use the these plugins:

   ```ts file=astro.config.ts
   // ...
   import remarkMath from "remark-math";
   import rehypeKatex from "rehype-katex";

   export default defineConfig({
     // ...
     markdown: {
       remarkPlugins: [
         remarkMath, // [!code ++]
         remarkToc,
         [remarkCollapse, { test: "Table of contents" }],
       ],
       rehypePlugins: [rehypeKatex], // [!code ++]
       shikiConfig: {
         // For more themes, visit https://shiki.style/themes
         themes: { light: "min-light", dark: "night-owl" },
         wrap: false,
       },
     },
     // ...
   });
   ```

3. Import KaTeX CSS in the main layout file

   ```astro file=src/layouts/Layout.astro
   ---
   import { SITE } from "@config";

   // astro code
   ---

   <!doctype html>
   <!-- Other elements  -->
   <meta property="og:image" content={socialImageURL} />

   <!-- [!code highlight:4] -->
   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
   />

   <body>
     <slot />
   </body>
   ```

4. As the last step, add a text-color for `katex` in `typography.css`.

   ```css file=src/styles/typography.css
   @plugin "@tailwindcss/typography";

   @layer base {
     /* other classes */

     /* Katex text color */
     /* [!code highlight:3] */
     .prose .katex-display {
       @apply text-foreground;
     }

     /* ===== Code Blocks & Syntax Highlighting ===== */
     /* other classes */
   }
   ```

And _voilà_, this setup allows you to write LaTeX equations in your Markdown files, which will be rendered properly when the site is built. Once you do it, the rest of the document will appear rendered correctly.

---

## Inline Equations

Inline equations are written between single dollar signs `$...$`. Here are some examples:

1. The famous mass-energy equivalence formula: `$E = mc^2$`
2. The quadratic formula: `$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`
3. Euler's identity: `$e^{i\pi} + 1 = 0$`

---

## Block Equations

For more complex equations or when you want the equation to be displayed on its own line, use double dollar signs `$$...$$`:

The Gaussian integral:

```bash
$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$
```

The definition of the Riemann zeta function:

```bash
$$ \zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} $$
```

Maxwell's equations in differential form:

```bash
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$
```

---

## Using Mathematical Symbols

LaTeX provides a wide range of mathematical symbols:

- Greek letters: `$\alpha$`, `$\beta$`, `$\gamma$`, `$\delta$`, `$\epsilon$`, `$\pi$`
- Operators: `$\sum$`, `$\prod$`, `$\int$`, `$\partial$`, `$\nabla$`
- Relations: `$\leq$`, `$\geq$`, `$\approx$`, `$\sim$`, `$\propto$`
- Logical symbols: `$\forall$`, `$\exists$`, `$\neg$`, `$\wedge$`, `$\vee$`


<!-- ============================================================ -->
<!-- FILE: src/content/posts/how-to-configure-astropaper-theme.mdx -->
<!-- ============================================================ -->

---
author: Sat Naing
pubDatetime: 2022-09-23T04:58:53Z
modDatetime: 2026-06-03T00:00:00.000Z
title: How to configure AstroPaper theme
slug: how-to-configure-astropaper-theme
featured: true
draft: false
tags:
  - configuration
  - docs
description: How you can make AstroPaper theme absolutely yours.
---
import ResponsiveTable from '@/components/ResponsiveTable.astro';

This guide covers the available configuration options in AstroPaper — from site metadata and feature flags to fonts, social links, and layout settings.

## Table of contents

## Configuring astro-paper.config.ts

All site-wide configuration lives in `astro-paper.config.ts` at the root of the project. Use `defineAstroPaperConfig()` to get full IntelliSense support:

```ts file="astro-paper.config.ts"
import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://your-site.com/", // replace with your deployed URL
    title: "AstroPaper",
    description: "A minimal, responsive and SEO-friendly Astro blog theme.",
    author: "Sat Naing",
    profile: "https://satnaing.dev",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Bangkok",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/satnaing/astro-paper/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/satnaing/astro-paper" },
    { name: "x", url: "https://x.com/username" },
    { name: "linkedin", url: "https://www.linkedin.com/in/username/" },
    { name: "mail", url: "mailto:yourmail@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
```

### `site` options

<ResponsiveTable>

| Option               | Description                                                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`                | Your deployed website URL. Used for canonical URLs, OG image URLs, RSS feed, and sitemap. In production this must be set correctly.            |
| `title`              | Your site name.                                                                                                                                |
| `description`        | Your site description. Useful for SEO and social media sharing.                                                                                |
| `author`             | Your name. Used as the default post author.                                                                                                    |
| `profile`            | Your personal/portfolio website URL, used for structured data. Set to `undefined` if you don't have one.                                       |
| `ogImage`            | Default OG image filename in `/public` (e.g. `"default-og.jpg"`). Used when no post-specific OG image is set and `dynamicOgImage` is disabled. |
| `lang`               | HTML ISO language code for `<html lang="...">`. Defaults to `"en"`.                                                                            |
| `timezone`           | IANA timezone for post dates (e.g. `"Asia/Bangkok"`). Ensures consistent timestamps across localhost and your deployed site.                   |
| `dir`                | Text direction for `<html dir="...">`. Supports `"ltr"` \| `"rtl"` \| `"auto"`.                                                                |
| `googleVerification` | Google Search Console verification meta tag value. Optional. Takes precedence over the `PUBLIC_GOOGLE_SITE_VERIFICATION` environment variable. |

</ResponsiveTable>

### `posts` options

<ResponsiveTable>

| Option                | Description                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `perPage`             | Number of posts shown per page on paginated listing pages. Defaults to `4`.                                                       |
| `perIndex`            | Number of posts shown in the Recent section on the home page. Defaults to `4`.                                                    |
| `scheduledPostMargin` | Posts with a future `pubDatetime` within this window (in ms) are treated as published. Defaults to 15 minutes (`15 * 60 * 1000`). |

</ResponsiveTable>

### `features` options

<ResponsiveTable>

| Option             | Description                                                                                                                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lightAndDarkMode` | Enable or disable the light/dark mode toggle. Defaults to `true`.                                                                                                                                                                             |
| `dynamicOgImage`   | Generate a dynamic OG image per post when no `ogImage` is specified in frontmatter. Defaults to `true`. See the [trade-off](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/#trade-off) for details. |
| `showArchives`     | Show the `/archives` page and its header link. Defaults to `true`.                                                                                                                                                                            |
| `showBackButton`   | Show the "Go back" button on post pages. Defaults to `true`.                                                                                                                                                                                  |
| `editPost`         | An "Edit page" link shown under post titles. Set `enabled: true` and provide the base `url` for your repository's edit URL. Per-post override via `hideEditPost` frontmatter.                                                                 |
| `search`           | Search provider. `"pagefind"` is the default. Set to `false` to disable search entirely.                                                                                                                                                      |

</ResponsiveTable>

## Update layout width

The default `max-width` for the entire blog is `768px` (`max-w-3xl`). If you'd like to change it, update the `max-w-app` utility in `src/styles/global.css`:

```css file="src/styles/global.css"
@utility max-w-app {
  /* [!code --:1] */
  @apply max-w-3xl;
  /* [!code ++:1] */
  @apply max-w-4xl xl:max-w-5xl;
}
```

You can explore more `max-width` values in the [Tailwind CSS docs](https://tailwindcss.com/docs/max-width).

## Configuring logo or title

![An arrow pointing at the website logo](https://res.cloudinary.com/noezectz/v1663911318/astro-paper/AstroPaper-logo-config_goff5l.png)

There are 3 options you can do:

### Option 1: Site title text

This is the easiest option. Update `site.title` in `astro-paper.config.ts`.

### Option 2: Astro's SVG component

You might want to use this option if you want to use an SVG logo.

- First add an SVG inside `src/assets/` directory. (e.g. `src/assets/dummy-logo.svg`)
- Then import that SVG inside `Header.astro`

  ```astro file="src/components/Header.astro"
  ---
  // ...
  import DummyLogo from "@/assets/dummy-logo.svg";
  ---
  ```

- Finally, replace `{config.site.title}` with imported logo.

  ```html
  <a
    href="/"
    class="absolute py-1 text-left text-2xl leading-7 font-semibold whitespace-nowrap sm:static"
  >
    <DummyLogo class="scale-75 dark:invert" />
    <!-- {config.site.title} -->
  </a>
  ```

The best part of this approach is that you can customize your SVG styles as needed. In the example above, you can see how the SVG logo color can be inverted in dark mode.

### Option 3: Astro's Image component

If your logo is an image but not SVG, you can use Astro's Image component.

- Add your logo inside `src/assets/` directory. (e.g. `src/assets/dummy-logo.png`)
- Import `Image` and your logo in `Header.astro`

  ```astro file="src/components/Header.astro"
  ---
  // ...
  import { Image } from "astro:assets";
  import dummyLogo from "@/assets/dummy-logo.png";
  ---
  ```

- Then, replace `{config.site.title}` with imported logo.

  ```html
  <a
    href="/"
    class="absolute py-1 text-left text-2xl leading-7 font-semibold whitespace-nowrap sm:static"
  >
    <image src="{dummyLogo}" alt="My Blog" class="dark:invert" />
    <!-- {config.site.title} -->
  </a>
  ```

With this approach, you can still adjust your image's appearance using CSS classes. However, this might not always fit what you want. If you need to display different logo images based on light or dark mode, check how light/dark icons are handled inside the `Header.astro` component.

## Configuring social links

![An arrow pointing at social link icons](https://github.com/user-attachments/assets/8b895400-d088-442f-881b-02d2443e00cf)

Social links are configured in the `socials` array inside `astro-paper.config.ts`. Each entry requires a `name` matching an SVG filename in `src/assets/icons/socials/` and a `url`:

```ts file="astro-paper.config.ts"
export default defineAstroPaperConfig({
  // ...
  socials: [
    { name: "github", url: "https://github.com/satnaing/astro-paper" },
    { name: "x", url: "https://x.com/username" },
    { name: "linkedin", url: "https://www.linkedin.com/in/username/" },
    { name: "mail", url: "mailto:yourmail@gmail.com" },
  ],
});
```

To add a social not in the defaults, add its SVG icon to `src/assets/icons/socials/` and add an entry to the array. The `name` must match the SVG filename without the `.svg` extension.

## Configuring share links

![An arrow pointing at share link icons](https://github.com/user-attachments/assets/4f930b68-b625-45df-8c41-e076dd2b838e)

Share links are configured in the `shareLinks` array. Each entry requires a `name` (matching an SVG in `src/assets/icons/socials/`) and a base `url` to which the post URL is appended:

```ts file="astro-paper.config.ts"
export default defineAstroPaperConfig({
  // ...
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
```

## Configuring fonts

AstroPaper uses Astro's [fonts API](https://docs.astro.build/en/guides/fonts/) with [Google Sans Code](https://fonts.google.com/specimen/Google+Sans+Code) as the default font. This provides consistent typography across all platforms with automatic font optimizations including preloading and caching.

### Using the default font

The font is automatically configured in `astro.config.ts` and loaded in `Layout.astro`. No additional configuration is needed to use the default Google Sans Code font.

### Customizing the font

To use a different font, update three places:

1. **Update the font configuration in `astro.config.ts`:**

```ts file="astro.config.ts"
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  // ...
  fonts: [
    {
      name: "Your Font Name", // [!code highlight]
      cssVariable: "--font-your-font", // [!code highlight]
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
    },
  ],
});
```

2. **Update the Font component in `Layout.astro`:**

```astro file="src/layouts/Layout.astro"
---
import { Font } from "astro:assets";
// ...
---

<head>
  <!-- ... -->
  <Font
    cssVariable="--font-your-font"
    preload={[{ subset: "latin", weight: 400, style: "normal" }]}
  />
  <!-- ... -->
</head>
```

3. **Update the CSS variable mapping in `src/styles/theme.css`:**

```css file="src/styles/theme.css"
@theme inline {
  --font-app: var(--font-your-font); /* [!code highlight] */
  /* ... */
}
```

The `--font-app` variable is used throughout the theme via the `font-app` Tailwind utility class, so updating this single variable applies your custom font everywhere.

> [!WARNING]
> Make sure the font name matches exactly as it appears on [Google Fonts](https://fonts.google.com). For other font providers or local fonts, refer to the [Astro Fonts documentation](https://docs.astro.build/en/guides/fonts/).

## See also

- [Customizing AstroPaper theme color schemes](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/) — change or add color schemes via `src/styles/theme.css`.
- [Adding new posts](https://astro-paper.pages.dev/posts/adding-new-posts-in-astropaper-theme/) — frontmatter reference and file conventions.


<!-- ============================================================ -->
<!-- FILE: src/content/posts/how-to-integrate-giscus-comments.md -->
<!-- ============================================================ -->

---
author: FjellOverflow
pubDatetime: 2024-07-25T11:11:53Z
modDatetime: 2025-03-12T12:28:53Z
title: How to integrate Giscus comments into AstroPaper
slug: how-to-integrate-giscus-comments
featured: false
draft: false
tags:
  - astro
  - blog
  - docs
description: Comment function on a static blog hosted on GitHub Pages with Giscus.
---

Hosting a thin static blog on a platform like [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) has numerous advantages, but also takes away some interactivity. Fortunately, [Giscus](https://giscus.app/) exists and offers a way to embed user comments on static sites.

## Table of contents

## How _Giscus_ works

[Giscus uses the GitHub API](https://github.com/giscus/giscus?tab=readme-ov-file#how-it-works) to read and store comments made by _GitHub_ users in the `Discussions` associated with a repository.

Embed the _Giscus_ client-side script bundle on your site, configure it with the correct repository URL, and users can view and write comments (when logged into _GitHub_).

The approach is serverless, as the comments are stored on _GitHub_ and dynamically loaded from there on client side, hence perfect for a static blog, like _AstroPaper_.

## Setting up _Giscus_

_Giscus_ can be set up easily on [giscus.app](https://giscus.app/), but I will outline the process shortly still.

### Prerequisites

Prerequisites to get _Giscus_ working are

- the repository is [public](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#making-a-repository-public)
- the [Giscus app](https://github.com/apps/giscus) is installed
- the [Discussions](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository) feature is turned on for your repository

If any of these conditions cannot be fulfilled for any reason, unfortunately, _Giscus_ cannot be integrated.

### Configuring _Giscus_

Next, configuring _Giscus_ is necessary. In most cases, the preselected defaults are suitable, and you should only modify them if you have a specific reason and know what you are doing. Don't worry too much about making the wrong choices; you can always adjust the configuration later on.

However you need to

- select the right language for the UI
- specify the _GitHub_ repository you want to connect, typically the repository containing your statically hosted _AstroPaper_ blog on _GitHub Pages_
- create and set an `Announcement` type discussion on _GitHub_ if you want to ensure nobody can create random comments directly on _GitHub_
- define the color scheme

After configuring the settings, _Giscus_ provides you with a generated `<script>` tag, which you will need in the next steps.

## Simple script tag

You should now have a script tag that looks like this:

```html
<script
  src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async
></script>
```

Simply add that to the source code of the site. Most likely, if you're using _AstroPaper_ and want to enable comments on posts, navigate to `PostDetails.astro` and paste it into the desired location where you want the comments to appear, perhaps underneath the `Share this post on:` buttons.

```astro file=src/layouts/PostDetails.astro
<Layout {...layoutProps}>
  <main>
    <ShareLinks />

    <!-- [!code ++:6] -->
    <script
      src="https://giscus.app/client.js"
      data-repo="[ENTER REPO HERE]"
      data-repo-id="[ENTER REPO ID HERE]"
      data-category="[ENTER CATEGORY NAME HERE]"
      data-category-id="[ENTER CATEGORY ID HERE]"></script>
  </main>
  <Footer />
</Layout>
```

And it's done! You have successfully integrated comments in _AstroPaper_!

## React component with light/dark theme

The embedded script tag in the layout is quite static, with the _Giscus_ configuration, including `theme`, hardcoded into the layout. Given that _AstroPaper_ features a light/dark theme toggle, it would be nice for the comments to seamlessly transition between light and dark themes along with the rest of the site. To achieve this, a more sophisticated approach to embedding _Giscus_ is required.

Firstly, we are going to install the [React component](https://www.npmjs.com/package/@giscus/react) for _Giscus_:

```bash
npm i @giscus/react && npx astro add react
```

Then we create a new `Comments.tsx` React component in `src/components`:

```tsx file=src/components/Comments.tsx
import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@/constants";
import { useEffect, useState } from "react";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return currentTheme || browserTheme;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mt-8">
      <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
    </div>
  );
}
```

This _React_ component not only wraps the native _Giscus_ component, but also introduces additional props, namely `lightTheme` and `darkTheme`. Leveraging two event listeners, the _Giscus_ comments will align with the site's theme, dynamically switching between dark and light themes whenever the site or browser theme is changed.

We also need to define the `GISCUS` config, for which the optimal location is in `constants.ts`:

```ts file=src/constants.ts
import type { GiscusProps } from "@giscus/react";

...

export const GISCUS: GiscusProps = {
  repo: "[ENTER REPO HERE]",
  repoId: "[ENTER REPO ID HERE]",
  category: "[ENTER CATEGORY NAME HERE]",
  categoryId: "[ENTER CATEGORY ID HERE]",
  mapping: "pathname",
  reactionsEnabled: "0",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};
```

Note that specifying a `theme` here will override the `lightTheme` and `darkTheme` props, resulting in a static theme setting, similar to the previous approach of embedding _Giscus_ with the `<script>` tag.

To complete the process, add the new Comments component to `PostDetails.astro` (replacing the `script` tag from the previous step).

```jsx file=src/layouts/PostDetails.astro
// [!code ++:1]
import Comments from "@/components/Comments";

<ShareLinks />

// [!code ++:1]
<Comments client:only="react" />

<hr class="my-6 border-dashed" />

<Footer />
```

And that's it!


<!-- ============================================================ -->
<!-- FILE: src/content/posts/how-to-update-dependencies.md -->
<!-- ============================================================ -->

---
title: How to update dependencies of AstroPaper
author: Sat Naing
pubDatetime: 2023-07-20T15:33:05.569Z
slug: how-to-update-dependencies
featured: false
draft: false
ogImage: ../../assets/images/forrest-gump-quote.png
tags:
  - FAQ
description: How to update project dependencies and AstroPaper template.
---

Updating the dependencies of a project can be tedious. However, neglecting to update project dependencies is not a good idea either 😬. In this post, I will share how I usually update my projects, focusing on AstroPaper as an example. Nonetheless, these steps can be applied to other js/node projects as well.

![Forrest Gump Fake Quote](@/assets/images/forrest-gump-quote.png)

## Table of contents

## Updating Package Dependencies

There are several ways to update dependencies, and I've tried various methods to find the easiest path. One way to do it is by manually updating each package using `npm install package-name@latest`. This method is the most straightforward way of updating. However, it may not be the most efficient option.

My recommended way of updating dependencies is by using the [npm-check-updates package](https://www.npmjs.com/package/npm-check-updates). There's a good [article](https://www.freecodecamp.org/news/how-to-update-npm-dependencies/) from freeCodeCamp about that, so I won't be explaining the details of what it is and how to use that package. Instead, I'll show you my typical approach.

First, install `npm-check-updates` package globally.

```bash
npm install -g npm-check-updates
```

Before making any updates, it’s a good idea to check all new dependencies that can be updated.

```bash
ncu
```

Most of the time, patch dependencies can be updated without affecting the project at all. So, I usually update patch dependencies by running either `ncu -i --target patch` or `ncu -u --target patch`. The difference is that `ncu -u --target patch` will update all the patches, while `ncu -i --target patch` will give an option to toggle which package to update. It’s up to you to decide which approach to take.

The next part involves updating minor dependencies. Minor package updates usually won't break the project, but it is always good to check the release notes of the respective packages. These minor updates often include some cool features that can be applied to our projects.

```bash
ncu -i --target minor
```

Last but not least, there might be some major package updates in the dependencies. So, check the rest of the dependency updates by running

```bash
ncu -i
```

If there are any major updates (or some updates you still have to make), the above command will output those remaining packages. If the package is a major version update, you have to be very careful since this will likely break the whole project. Therefore, please read the respective release note (or) docs very carefully and make changes accordingly.

If you run `ncu -i` and found no more packages to be updated, _**Congrats!!!**_ you have successfully updated all the dependencies in your project.

## Updating AstroPaper template

Like other open-source projects, AstroPaper is evolving with bug fixes, feature updates, and so on. So if you’re someone who is using AstroPaper as a template, you might also want to update the template when there’s a new release.

The thing is, you might already have updated the template according to your flavor. Therefore, I can’t exactly show **"the one-size-fits-all perfect way"** to update the template to the most recent release. However, here are some tips to update the template without breaking your repo. Keep in mind that, most of the time, updating the package dependencies might be sufficient for you.

### Files and Directories to keep in mind

In most cases, the files and directories you might not want to override (as you've likely updated those files) are `src/content/blog/`, `src/config.ts`, `src/pages/about.md`, and other assets & styles like `public/` and `src/styles/base.css`.

If you’re someone who only updates the bare minimum of the template, it should be okay to replace everything with the latest AstroPaper except the above files and directories. It’s like pure Android OS and other vendor-specific OSes like OneUI. The less you modify the base, the less you have to update.

You can manually replace every file one by one, or you can use the magic of git to update everything. I won’t show you the manual replacement process since it is very straightforward. If you’re not interested in that straightforward and inefficient method, bear with me 🐻.

### Updating AstroPaper using Git

**IMPORTANT!!!**

> Only do the following if you know how to resolve merge conflicts. Otherwise, you’d better replace files manually or update dependencies only.

First, add astro-paper as the remote in your project.

```bash
git remote add astro-paper https://github.com/satnaing/astro-paper.git
```

Checkout to a new branch in order to update the template. If you know what you’re doing and you’re confident with your git skill, you can omit this step.

```bash
git checkout -b build/update-astro-paper
```

Then, pull the changes from astro-paper by running

```bash
git pull astro-paper main
```

If you face `fatal: refusing to merge unrelated histories` error, you can resolve that by running the following command

```bash
git pull astro-paper main --allow-unrelated-histories
```

After running the above command, you’re likely to encounter conflicts in your project. You'll need to resolve these conflicts manually and make the necessary adjustments according to your needs.

After resolving the conflicts, test your blog thoroughly to ensure everything is working as expected. Check your articles, components, and any customizations you made.

Once you're satisfied with the result, it's time to merge the update branch into your main branch (only if you are updating the template in another branch). Congratulations! You've successfully updated your template to the latest version. Your blog is now up-to-date and ready to shine! 🎉

## Conclusion

In this article, I've shared some of my insights and processes for updating dependencies and the AstroPaper template. I genuinely hope this article proves valuable and assists you in managing your projects more efficiently.

If you have any alternative or improved approaches for updating dependencies/AstroPaper, I would love to hear from you. Thus, don't hesitate to start a discussion in the repository, email me, or open an issue. Your input and ideas are highly appreciated!

Please understand that my schedule is quite busy these days, and I may not be able to respond quickly. However, I promise to get back to you as soon as possible. 😬

Thank you for taking the time to read this article, and I wish you all the best with your projects!


<!-- ============================================================ -->
<!-- FILE: src/content/posts/setting-dates-via-git-hooks.md -->
<!-- ============================================================ -->

---
author: Simon Smale
pubDatetime: 2024-01-03T20:40:08Z
modDatetime: 2024-01-08T18:59:05Z
title: How to use Git Hooks to set Created and Modified Dates
featured: false
draft: false
tags:
  - docs
  - FAQ
canonicalURL: https://smale.codes/posts/setting-dates-via-git-hooks/
description: How to use Git Hooks to set your Created and Modified Dates on AstroPaper
---

In this post I will explain how to use the pre-commit Git hook to automate the input of the created (`pubDatetime`) and modified (`modDatetime`) in the AstroPaper blog theme frontmatter

## Table of contents

## Have them Everywhere

[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) are great for automating tasks like [adding](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea) or [checking](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e) the branch name to your commit messages or [stopping you committing plain text secrets](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000). Their biggest flaw is that client-side hooks are per machine.

You can get around this by having a `hooks` directory and manually copy them to the `.git/hooks` directory or set up a symlink, but this all requires you to remember to set it up, and that is not something I am good at doing.

As this project uses npm, we are able to make use of a package called [Husky](https://typicode.github.io/husky/) (this is already installed in AstroPaper) to automatically install the hooks for us.

> Update! In AstroPaper [v4.3.0](https://github.com/satnaing/astro-paper/releases/tag/v4.3.0), the pre-commit hook has been removed in favor of GitHub Actions. However, you can easily [install Husky](https://typicode.github.io/husky/get-started.html) yourself.

## The Hook

As we want this hook to run as we commit the code to update the dates and then have that as part of our change we are going to use the `pre-commit` hook. This has already been set up by this AstroPaper project, but if it hadn't, you would run `npx husky add .husky/pre-commit 'echo "This is our new pre-commit hook"'`.

Navigating to the `hooks/pre-commit` file, we are going to add one or both of the following snippets.

### Updating the modified date when a file is edited

---

UPDATE:

This section has been updated with a new version of the hook that is smarter. It will now not increment the `modDatetime` until the post is published. On the first publish, set the draft status to `first` and watch the magic happen.

---

```shell
# Modified files, update the modDatetime
git diff --cached --name-status |
grep -i '^M.*\.md$' |
while read _ file; do
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
  if [ "$draft" = "false" ]; then
    echo "$file modDateTime updated"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
    mv tmp $file
    git add $file
  fi
  if [ "$draft" = "first" ]; then
    echo "First release of $file, draft set to false and modDateTime removed"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/" | sed "/---.*/,/---.*/s/^draft:.*$/draft: false/" > tmp
    mv tmp $file
    git add $file
  fi
done
```

`git diff --cached --name-status` gets the files from git that have been staged for committing. The output looks like:

```shell
A       src/content/blog/setting-dates-via-git-hooks.md
```

The letter at the start denotes what action has been taken, in the above example the file has been added. Modified files have `M`

We pipe that output into the grep command where we are looking at each line to find that have been modified. The line needs to start with `M` (`^(M)`), have any number of characters after that (`.*`) and end with the `.md` file extension (`.(md)$`).This is going to filter out the lines that are not modified markdown files `egrep -i "^(M).*\.(md)$"`.

---

#### Improvement - More Explicit

This could be added to only look for files that we markdown files in the `blog` directory, as these are the only ones that will have the right frontmatter

---

The regex will capture the two parts, the letter and the file path. We are going to pipe this list into a while loop to iterate over the matching lines and assign the letter to `a` and the path to `b`. We are going to ignore `a` for now.

To know the draft status of the file, we need its frontmatter. In the following code we are using `cat` to get the content of the file, then using `awk` to split the file on the frontmatter separator (`---`) and taking the second block (the fonmtmatter, the bit between the `---`). From here we are using `awk` again to find the draft key and print is value.

```shell
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
```

Now we have the value for `draft` we are going to do 1 of 3 things, set the modDatetime to now (when draft is false `if [ "$draft" = "false" ]; then`), clear the modDatetime and set draft to false (when draft is set to first `if [ "$draft" = "first" ]; then`), or nothing (in any other case).

The next part with the sed command is a bit magical to me as I don't often use it, it was copied from [another blog post on doing something similar](https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/). In essence, it is looking inside the frontmatter tags (`---`) of the file to find the `pubDatetime:` key, getting the full line and replacing it with the `pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/"` same key again and the current datetime formatted correctly.

This replacement is in the context of the whole file so we put that into a temporary file (`> tmp`), then we move (`mv`) the new file into the location of the old file, overwriting it. This is then added to git ready to be committed as if we made the change ourselves.

---

#### NOTE

For the `sed` to work the frontmatter needs to already have the `modDatetime` key in the frontmatter. There are some other changes you will need to make for the app to build with a blank date, see [further down](#empty-moddatetime-changes)

---

### Adding the Date for new files

Adding the date for a new file is the same process as above, but this time we are looking for lines that have been added (`A`) and we are going to replace the `pubDatetime` value.

```shell
# New files, add/update the pubDatetime
git diff --cached --name-status | egrep -i "^(A).*\.(md)$" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
  mv tmp $b
  git add $b
done
```

---

#### Improvement - Only Loop Once

We could use the `a` variable to switch inside the loop and either update the `modDatetime` or add the `pubDatetime` in one loop.

---

## Populating the frontmatter

If your IDE supports snippets then there is the option to create a custom snippet to populate the frontmatter.[In AstroPaper v4 will come with one for VSCode by default.](https://github.com/satnaing/astro-paper/pull/206)

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0" type="video/mp4">
</video>

## Empty `modDatetime` changes

To allow Astro to compile the markdown and do its thing, it needs to know what is expected in the frontmatter. It does this via the config in `src/content/config.ts`

To allow the key to be there with no value we need to edit line 10 to add the `.nullable()` function.

```ts
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional(), // [!code --]
      modDatetime: z.date().optional().nullable(), // [!code ++]
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional(),
    }),
});
```

To stop the IDE complaining in the blog engine files I have also done the following:

1. added `| null` to line 15 in `src/layouts/Layout.astro` so that it looks like

   ```typescript
   export interface Props {
     title?: string;
     author?: string;
     description?: string;
     ogImage?: string;
     canonicalURL?: string;
     pubDatetime?: Date;
     modDatetime?: Date | null;
   }
   ```

2. added `| null` to line 5 in `src/components/Datetime.tsx` so that it looks like

   ```typescript
   interface DatetimesProps {
     pubDatetime: string | Date;
     modDatetime: string | Date | undefined | null;
   }
   ```
