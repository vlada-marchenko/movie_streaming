const TMDB_BASE = "https://image.tmdb.org/t/p";

/** Safe poster URL for cards/grids; uses local placeholder when TMDB path is missing. */
export function tmdbPosterSrc(posterPath: string | null | undefined): string {
  if (!posterPath) return "/poster-placeholder.svg";
  return `${TMDB_BASE}/w500${posterPath}`;
}

/** Hero backdrop; falls back to poster, then placeholder. */
export function tmdbBackdropSrc(
  backdropPath: string | null | undefined,
  posterPath?: string | null
): string {
  if (backdropPath) return `${TMDB_BASE}/original${backdropPath}`;
  if (posterPath) return `${TMDB_BASE}/original${posterPath}`;
  return "/poster-placeholder.svg";
}
