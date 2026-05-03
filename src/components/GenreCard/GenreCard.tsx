"use client";

import { getMoviesByGenre } from "@/lib/movies";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import css from "./GenreCard.module.css";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import Icon from "@/components/Icon/Icon";
import { getSeriesByGenre } from "@/lib/series";

interface GenreCardProps {
  genreId: number;
  genreName: string;
  page?: number;
  mediaType: "movie" | "tv";
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function GenreCard({
  genreId,
  genreName,
  page,
  mediaType,
}: GenreCardProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: [
      mediaType === "movie" ? "moviesByGenre" : "tvByGenre",
      genreId,
      page,
    ],
    queryFn: () =>
      mediaType === "movie"
        ? getMoviesByGenre(genreId, page)
        : getSeriesByGenre(genreId, page),
  });

  if (isLoading) {
    return <div className={css.skeleton} />;
  }
 
  if (!data || error || !data.results || data.results.length === 0) {
    return null;
  }

  const previewMovies: Movie[] = data.results
    .filter((m: Movie) => m.poster_path)
    .slice(0, 4);

  if (previewMovies.length === 0) {
    return null;
  }

  return (
    <div className={css.container}>
      <div className={css.content}>
        {previewMovies.map((movie: Movie) => (
          <div key={movie.id} className={css.preview}>
            <Image
              src={tmdbPosterSrc(movie.poster_path)}
              alt={movie.title || "Preview"}
              className={css.image}
              fill 
              sizes="(max-width: 768px) 60px, 115px"
            />
          </div>
        ))}
      </div>

      <div className={css.under}>
        <h3 className={css.text}>{genreName}</h3>
        <button
          className={css.button}
          aria-label={`View ${genreName} ${mediaType === "movie" ? "movies" : "shows"}`}
        >
          <Icon name="right" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
