/**
 * Privacy-friendly YouTube facade (click-to-load).
 *
 * Expected markup (in post content):
 *   <figure class="yt-facade" data-yt-facade data-yt-id="VIDEO_ID" data-yt-title="...">
 *     <a class="yt-facade__trigger" href="https://www.youtube.com/watch?v=VIDEO_ID"
 *        target="_blank" rel="noopener noreferrer">
 *       <img class="yt-facade__poster" ...>
 *       <span class="yt-facade__play">…</span>
 *     </a>
 *   </figure>
 *
 * Nothing is requested from YouTube until the visitor clicks. On click the
 * player is loaded inline via youtube-nocookie.com (the reader stays on the
 * page). Without JS the trigger stays a normal link that opens YouTube in a new
 * tab — so the visitor never loses this site.
 */
function initFacade(fig: HTMLElement) {
  if (fig.dataset.ytReady) return;
  const trigger = fig.querySelector<HTMLAnchorElement>(".yt-facade__trigger");
  const id = fig.dataset.ytId;
  if (!trigger || !id) return;
  fig.dataset.ytReady = "1";

  trigger.addEventListener("click", event => {
    event.preventDefault();
    const iframe = document.createElement("iframe");
    iframe.className = "yt-facade__iframe";
    iframe.src =
      `https://www.youtube-nocookie.com/embed/${id}` +
      "?autoplay=1&rel=0&modestbranding=1";
    iframe.title = fig.dataset.ytTitle ?? "Video";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    trigger.replaceWith(iframe);
  });
}

function initFacades() {
  document
    .querySelectorAll<HTMLElement>("[data-yt-facade]")
    .forEach(initFacade);
}

document.addEventListener("astro:page-load", initFacades);
