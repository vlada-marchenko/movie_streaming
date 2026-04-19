const TMDB_BASE = "https://image.tmdb.org/t/p";


export function tmdbPosterSrc(posterPath: string | null | undefined): string {
  if (!posterPath) return "/poster-placeholder.svg";
  return `${TMDB_BASE}/w342${posterPath}`;
}

export function tmdbBackdropSrc(
  backdropPath: string | null | undefined,
  posterPath?: string | null
): string {
const path = backdropPath || posterPath;
  if (!path) return "/poster-placeholder.svg";
  return `${TMDB_BASE}/w1280${path}`;
}
