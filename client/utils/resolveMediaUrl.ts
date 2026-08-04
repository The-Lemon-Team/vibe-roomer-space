/**
 * Resolve stored media paths for display.
 *
 * Local uploads are stored as `/uploads/<file>` (same-origin behind nginx).
 * In Vite dev the API lives on another origin, so those paths must be
 * rewritten to the API host. Absolute / blob / data URLs are left alone.
 */
export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  if (/^(https?:|blob:|data:)/i.test(trimmed)) {
    return trimmed;
  }

  if (!trimmed.startsWith('/')) {
    return trimmed;
  }

  const apiBase =
    typeof window !== 'undefined'
      ? import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`
      : import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // Relative API base (e.g. "/api" in production) → same origin; nginx serves /uploads.
  if (!/^https?:\/\//i.test(apiBase)) {
    return trimmed;
  }

  try {
    const origin = new URL(apiBase).origin;
    return `${origin}${trimmed}`;
  } catch {
    return trimmed;
  }
}
