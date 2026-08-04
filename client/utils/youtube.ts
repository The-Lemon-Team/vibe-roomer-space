/** Extract an 11-char YouTube video id from common URL shapes. */
export function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

/** Compare two YouTube URLs by video id (falls back to trimmed string). */
export function youtubeUrlsMatch(a?: string | null, b?: string | null): boolean {
  if (!a || !b) return false;
  const idA = extractYouTubeId(a);
  const idB = extractYouTubeId(b);
  if (idA && idB) return idA === idB;
  return a.trim() === b.trim();
}

/**
 * Public YouTube thumbnail CDN — no API key required.
 * Works as <img src> / CSS background-image.
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: 'default' | 'mq' | 'hq' | 'sd' | 'maxres' = 'hq',
): string {
  const file =
    quality === 'default'
      ? 'default.jpg'
      : quality === 'mq'
        ? 'mqdefault.jpg'
        : quality === 'sd'
          ? 'sddefault.jpg'
          : quality === 'maxres'
            ? 'maxresdefault.jpg'
            : 'hqdefault.jpg';
  return `https://i.ytimg.com/vi/${videoId}/${file}`;
}
