"use client";

import css from "./Catalog.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MediaGrid from "../MediaGrid/MediaGrid";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getSearchMovies,
  getGenres,
  getMoviesByGenre,
  getPopularMovies,
} from "@/lib/movies";
import {
  getSearchSeries,
  getSeriesByGenre,
  getPopularSeries,
  getGenresTv,
} from "@/lib/series";
import { useUiStore } from "@/store/uiStore";

export default function Catalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const { catalogSearchTerm, setCatalogSearchTerm } = useUiStore();

  return (
    <div>
      <SearchBar value={catalogSearchTerm} onChange={setCatalogSearchTerm} />
      <MediaGrid items={movies || series} isLoading={true} />
    </div>
  );
}
