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
  getNewMovies,
  getPopularMovies,
} from "@/lib/movies";
import {
  getSearchSeries,
  getSeriesByGenre,
  getNewSeries,
  getPopularSeries,
  getGenresTv,
} from "@/lib/series";
import { useUiStore } from "@/store/uiStore";
import { useQuery } from "@tanstack/react-query";

type Genre = {
  id: number;
  name: string;
};

type CatalogTabType = "all" | "movies" | "series";
type CatalogSortType = "popularity" | "rating" | "newest" | "title";

export default function Catalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    catalogSearchTerm,
    setCatalogSearchTerm,
    catalogTab,
    setCatalogTab,
    catalogSort,
    setCatalogSort,
    catalogGenre,
    setCatalogGenre,
    catalogPagination,
    setCatalogPagination,
  } = useUiStore();

  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState(catalogSearchTerm);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(catalogSearchTerm.trim());
    }, 500);
    return () => clearTimeout(timer); // the key here
  }, [catalogSearchTerm]);

  useEffect(() => {
    const type = searchParams.get("type"); // get it from url
    if (type === "all" || type === "movies" || type === "series") {
      setCatalogTab(type as CatalogTabType); // set to the variable
    }

    const genre = searchParams.get("genre"); // get from url
    if (genre) {
      setCatalogGenre(genre); // set to the variable
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(); // create new url
    if (catalogTab !== "all") {
      params.set("type", catalogTab); // set new params there
    }
    if (catalogGenre) {
      params.set("genre", catalogGenre);
    }

    const qs = params.toString();
    router.replace(qs ? `/catalog?${qs}` : "/catalog", { scroll: false }); // put params to new url
  }, [catalogTab, catalogGenre, router]);

  const page = catalogPagination[catalogTab]?.page ?? 1;
  const genreId = catalogGenre ? Number(catalogGenre) : null;

  const handleTabChange = (tab: CatalogTabType) => {
    setCatalogTab(tab);
    setCatalogGenre(null);
    setCatalogPagination(tab, { page: 1 });
  };

  const handleGenreChange = (id: number | null) => {
    setCatalogGenre(id ? String(id) : null);
    setCatalogPagination(catalogTab, { page: 1 });
  };

  const handleSortChange = (sort: CatalogSortType) => {
    setCatalogSort(sort);
    setCatalogPagination(catalogTab, { page: 1 });
  };

  const handleSearchChange = (value: string) => {
    setCatalogSearchTerm(value);
    setCatalogPagination(catalogTab, { page: 1 });
  };

  // search
  const { data: movieSearchData, isLoading: movieSearchLoading } = useQuery({
    queryKey: ["search-movies", debouncedSearchTerm, page],
    queryFn: () => getSearchMovies(debouncedSearchTerm, page),
    enabled: !!debouncedSearchTerm && catalogTab !== "series",
  });

  const { data: seriesSearchData, isLoading: seriesSearchLoading } = useQuery({
    queryKey: ["search-series", debouncedSearchTerm, page],
    queryFn: () => getSearchSeries(debouncedSearchTerm, page),
    enabled: !!debouncedSearchTerm && catalogTab !== "movies",
  });

  // genres
  const { data: moviesGenreData } = useQuery({
    queryKey: ["movies-genre"],
    queryFn: getGenres,
  });

  const { data: seriesGenreData } = useQuery({
    queryKey: ["series-genre"],
    queryFn: getGenresTv,
  });

  // media by genre
  const { data: moviesByGenre, isLoading: moviesByGenreLoading } = useQuery({
    queryKey: ["movies-by-genre", genreId, page],
    queryFn: () => getMoviesByGenre(genreId!, page),
    enabled: !debouncedSearchTerm && !!genreId && catalogTab !== "series",
  });

  const { data: seriesByGenre, isLoading: seriesByGenreLoading } = useQuery({
    queryKey: ["series-by-genre", genreId, page],
    queryFn: () => getSeriesByGenre(genreId!, page),
    enabled: !debouncedSearchTerm && !!genreId && catalogTab !== "movies",
  });

  // new media
  // const { data: newMoviesData, isLoading: newMoviesLoading } = useQuery({
  //   queryKey: ["new-movies", page],
  //   queryFn: () => getNewMovies(page),
  //   enabled: !debouncedSearchTerm && !genreId && catalogTab !== "series",
  // });

  // const { data: newSeriesData, isLoading: newSeriesLoading } = useQuery({
  //   queryKey: ["new-series", page],
  //   queryFn: () => getNewSeries(page),
  //   enabled: !debouncedSearchTerm && !genreId && catalogTab !== "movies",
  // });

  // popular media
  const { data: popularMoviesData, isLoading: popularMoviesLoading } = useQuery(
    {
      queryKey: ["popular-movies", page],
      queryFn: () => getPopularMovies(page),
      enabled: !debouncedSearchTerm && !genreId && catalogTab !== "series",
    },
  );

  const { data: popularSeriesData, isLoading: popularSeriesLoading } = useQuery(
    {
      queryKey: ["popular-series", page],
      queryFn: () => getPopularSeries(page),
      enabled: !debouncedSearchTerm && !genreId && catalogTab !== "movies",
    },
  );

  const isLoading =
    movieSearchLoading ||
    seriesSearchLoading ||
    moviesByGenreLoading ||
    seriesByGenreLoading ||
    popularMoviesLoading ||
    popularSeriesLoading;

  return (
    <div>
      <SearchBar value={catalogSearchTerm} onChange={setCatalogSearchTerm} />
      <MediaGrid
        items={popularMoviesData || popularSeriesData}
        isLoading={isLoading}
      />
    </div>
  );
}
