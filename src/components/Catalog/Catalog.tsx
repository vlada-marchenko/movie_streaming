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
import { useMemo } from "react";

type Genre = {
  id: number;
  name: string;
};

type CatalogTabType = "all" | "movies" | "series";
type CatalogSortType = "popularity" | "rating" | "newest" | "title";

interface CatalogItem {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  vote_average: number;
  mediaType: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
  popularity?: number;
}

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalize = (items: CatalogItem[], mediaType: "movie" | "tv") => {
    return (
      items ??
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      []
    ).map((item: CatalogItem) => {
      return {
        ...item,
        mediaType,
      };
    });
  };

  const rawItems = useMemo(() => {
    if (debouncedSearchTerm) {
      return [
        ...(catalogTab !== "series"
          ? normalize(movieSearchData?.results, "movie")
          : []),
        ...(catalogTab !== "movies"
          ? normalize(seriesSearchData?.results, "tv")
          : []),
      ];
    }

    if (genreId) {
      return [
        ...(catalogTab !== "series"
          ? normalize(moviesByGenre?.results, "movie")
          : []),
        ...(catalogTab !== "movies"
          ? normalize(seriesByGenre?.results, "tv")
          : []),
      ];
    }

    return [
      ...(catalogTab !== "series"
        ? normalize(popularMoviesData?.results, "movie")
        : []),
      ...(catalogTab !== "movies"
        ? normalize(popularSeriesData?.results, "tv")
        : []),
    ];
  }, [
    debouncedSearchTerm,
    genreId,
    catalogTab,
    movieSearchData,
    seriesSearchData,
    moviesByGenre,
    seriesByGenre,
    popularMoviesData,
    popularSeriesData,
  ]);

  const sortedItems = useMemo(() => {
    const items = [...rawItems];
    switch (catalogSort) {
      case "rating":
        return items.sort(
          (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0),
        );
      case "newest":
        return items.sort((a, b) =>
          (b.release_date || b.first_air_date || "").localeCompare(
            a.release_date || a.first_air_date || "",
          ),
        );
      case "title":
        return items.sort((a, b) =>
          (a.title || a.name || "").localeCompare(b.title || b.name || ""),
        );
      default:
        return items.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
    }
  }, [rawItems, catalogSort]);

  const genres = useMemo(() => {
    const all = [
      ...(catalogTab !== "series" ? (moviesGenreData?.genres ?? []) : []),
      ...(catalogTab !== "movies" ? (seriesGenreData?.genres ?? []) : []),
    ];

    const seen = new Set<number>();
    return all.filter((genre: Genre) => {
      if (seen.has(genre.id)) {
        return false;
      } else {
        seen.add(genre.id);
        return true;
      }
    });
  }, [moviesGenreData, seriesGenreData, catalogTab]);

  const totalPages = Math.min(
    Math.max(
      debouncedSearchTerm
        ? Math.max(
            movieSearchData?.total_pages ?? 1,
            seriesSearchData?.total_pages ?? 1,
          )
        : genreId
          ? Math.max(
              moviesByGenre?.total_pages ?? 1,
              seriesByGenre?.total_pages ?? 1,
            )
          : Math.max(
              popularMoviesData?.total_pages ?? 1,
              popularSeriesData?.total_pages ?? 1,
            ),
      1,
    ),
    20,
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
      <MediaGrid items={sortedItems} isLoading={isLoading} />
    </div>
  );
}
