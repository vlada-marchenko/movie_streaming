"use client";

import { getMoviesByGenre } from "@/lib/movies";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import css from "./GenreCard.module.css";
import Icon from "@/components/Icon/Icon";

interface GenreCardProps {
  genreId: number;
  genreName: string;
  page?: number;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function GenreCard({
  genreId,
  genreName,
  page = 1,
}: GenreCardProps) {
  const { data, error } = useQuery({
    queryKey: ["genre-movies", genreId, page],
    queryFn: () => getMoviesByGenre(genreId, page),
  });

  if (error || !data) {
    return null;
  }

  const previewMovies: Movie[] = data.results.slice(0, 4);

  return (
    <div className={css.container}>
      <div className={css.content}>
        {previewMovies.map((movie: Movie) => (
          <div key={movie.id} className={css.preview}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={css.image}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>

      <div className={css.under}>
        <h3 className={css.text}>{genreName}</h3>
        <button className={css.button}>
        <Icon name='right' width={20} height={20}/>
        </button>
      </div>
    </div>
  );
}
