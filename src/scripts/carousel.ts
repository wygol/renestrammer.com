/**
 * Progressive-enhancement screenshot carousel.
 *
 * Expected markup (rendered from markdown images inside the post):
 *   <figure class="carousel not-prose" data-carousel>
 *     <div class="carousel__viewport" data-carousel-viewport>
 *       <p><img alt="caption 1"></p>
 *       <p><img alt="caption 2"></p>
 *       ...
 *     </div>
 *   </figure>
 *
 * Without JS this degrades to a horizontally scrollable strip. This adds
 * prev/next buttons, dot indicators, a caption (from each image's alt text)
 * and a counter, and keeps everything in sync with manual swipes/scrolls.
 */
function initCarousel(root: HTMLElement) {
  if (root.dataset.carouselReady) return;
  const viewportEl = root.querySelector<HTMLElement>("[data-carousel-viewport]");
  if (!viewportEl) return;
  // Non-null alias so nested closures keep the narrowed type.
  const viewport = viewportEl;

  const slides = Array.from(viewport.children).filter(
    (el): el is HTMLElement => el instanceof HTMLElement
  );
  if (slides.length <= 1) return;
  root.dataset.carouselReady = "1";

  const total = slides.length;
  let index = 0;

  slides.forEach((slide, i) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} of ${total}`);
  });

  const captionOf = (i: number) =>
    slides[i].querySelector("img")?.getAttribute("alt") ?? "";

  const prefersReduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Controls -------------------------------------------------------------
  const bar = document.createElement("div");
  bar.className = "carousel__bar";

  const prev = document.createElement("button");
  prev.type = "button";
  prev.className = "carousel__btn";
  prev.setAttribute("aria-label", "Previous screenshot");
  prev.innerHTML = "&#8592;";

  const next = document.createElement("button");
  next.type = "button";
  next.className = "carousel__btn";
  next.setAttribute("aria-label", "Next screenshot");
  next.innerHTML = "&#8594;";

  const dots = document.createElement("div");
  dots.className = "carousel__dots";
  const dotButtons = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot";
    dot.setAttribute("aria-label", `Go to screenshot ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dots.appendChild(dot);
    return dot;
  });

  bar.append(prev, dots, next);

  const caption = document.createElement("p");
  caption.className = "carousel__caption";

  root.append(bar, caption);

  function render() {
    dotButtons.forEach((dot, i) =>
      dot.setAttribute("aria-current", i === index ? "true" : "false")
    );
    caption.textContent = `${index + 1} / ${total} — ${captionOf(index)}`;
  }

  function goTo(i: number) {
    index = (i + total) % total;
    viewport.scrollTo({
      left: index * viewport.clientWidth,
      behavior: prefersReduced() ? "auto" : "smooth",
    });
    render();
  }

  prev.addEventListener("click", () => goTo(index - 1));
  next.addEventListener("click", () => goTo(index + 1));

  root.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  });

  // Keep the index in sync when the user swipes/scrolls the strip directly.
  let ticking = 0;
  viewport.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = requestAnimationFrame(() => {
      ticking = 0;
      const i = Math.round(viewport.scrollLeft / viewport.clientWidth);
      if (i !== index) {
        index = i;
        render();
      }
    });
  });

  render();
}

function initCarousels() {
  document.querySelectorAll<HTMLElement>("[data-carousel]").forEach(initCarousel);
}

document.addEventListener("astro:page-load", initCarousels);
