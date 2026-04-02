'use client'

import { getMovieDetails } from "@/lib/movies";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSeriesDetails } from "@/lib/series";
import MoviePage from "@/components/MoviePage/MoviePage";
import ShowPage from "@/components/ShowPage/ShowPage";

export default function MovieDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams()
  const id = params.id ? Number(params.id) : undefined;
  const type = searchParams.get('type') as 'movies' | 'series' || 'movies';

  const { data, isLoading, error } = useQuery({
    queryKey: [type, id],
    queryFn: () => id && (type === 'movies' ? getMovieDetails(id) : getSeriesDetails(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movie details</div>;

}

  return (
    <div>
      {type === 'movies' ? (
        <MoviePage data={data} />
      ) : (
        <ShowPage data={data} />
      )}
    </div>
  );
}