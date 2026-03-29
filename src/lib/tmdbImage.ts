const TMDB_BASE = "https://image.tmdb.org/t/p";


export function tmdbPosterSrc(posterPath: string | null | undefined): string {
  if (!posterPath) return "/poster-placeholder.svg";
  return `${TMDB_BASE}/w500${posterPath}`;
}

export function tmdbBackdropSrc(
  backdropPath: string | null | undefined,
  posterPath?: string | null
): string {
  if (backdropPath) return `${TMDB_BASE}/original${backdropPath}`;
  if (posterPath) return `${TMDB_BASE}/original${posterPath}`;
  return "/poster-placeholder.svg";
}
