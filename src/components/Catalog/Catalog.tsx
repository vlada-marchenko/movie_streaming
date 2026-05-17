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
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type Genre = {
  id: number;
  name: string;
};

type CatalogTabType = "all" | "movies" | "series";
type CatalogSortType = "popularity" | "rating" | "newest";

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

  const [genresExpanded, setGenresExpanded] = useState(false);

  const COLLAPSED_GENRE_COUNT = 8;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState(catalogSearchTerm);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(catalogSearchTerm.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [catalogSearchTerm]);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "all" || type === "movies" || type === "series") {
      setCatalogTab(type as CatalogTabType);
    }

    const genre = searchParams.get("genre");
    if (genre) {
      setCatalogGenre(genre);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (catalogTab !== "all") {
      params.set("type", catalogTab);
    }
    if (catalogGenre) {
      params.set("genre", catalogGenre);
    }

    const qs = params.toString();
    router.replace(qs ? `/catalog?${qs}` : "/catalog", { scroll: false });
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
    const sliceForAll = (arr: CatalogItem[]) =>
      catalogTab === "all" ? arr.slice(0, 10) : arr;

    if (debouncedSearchTerm) {
      return [
        ...(catalogTab !== "series"
          ? sliceForAll(normalize(movieSearchData?.results, "movie"))
          : []),
        ...(catalogTab !== "movies"
          ? sliceForAll(normalize(seriesSearchData?.results, "tv"))
          : []),
      ];
    }

    if (genreId) {
      return [
        ...(catalogTab !== "series"
          ? sliceForAll(normalize(moviesByGenre?.results, "movie"))
          : []),
        ...(catalogTab !== "movies"
          ? sliceForAll(normalize(seriesByGenre?.results || [], "tv"))
          : []),
      ];
    }

    return [
      ...(catalogTab !== "series"
        ? sliceForAll(normalize(popularMoviesData?.results, "movie"))
        : []),
      ...(catalogTab !== "movies"
        ? sliceForAll(normalize(popularSeriesData?.results, "tv"))
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
    <div className={css.page}>
      <div className={css.inner}>
        <div className={css.header}>
          <h1 className={css.title}>Catalog</h1>
          <p className={css.subtitle}>Browse movies and series</p>
        </div>

        <SearchBar
          value={catalogSearchTerm}
          onChange={handleSearchChange}
          placeholder="Search movies or series..."
        />

        {/* Tabs */}
        <div className={css.tabs}>
          {(["all", "movies", "series"] as CatalogTabType[]).map((tab) => (
            <button
              key={tab}
              className={`${css.tab} ${catalogTab === tab ? css.activeTab : ""}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className={css.filtersRow}>
          <div className={css.genreChipsWrapper}>
            <div
              className={`${css.genreChips} ${debouncedSearchTerm ? css.chipsDisabled : ""}`}
            >
              <button
                className={`${css.chip} ${!genreId ? css.activeChip : ""}`}
                disabled={!!debouncedSearchTerm}
                onClick={() => handleGenreChange(null)}
              >
                All Genres
              </button>
              {(!isMobile || genresExpanded
                ? genres
                : genres.slice(0, COLLAPSED_GENRE_COUNT)
              ).map((g) => (
                <button
                  key={g.id}
                  className={`${css.chip} ${genreId === g.id ? css.activeChip : ""}`}
                  disabled={!!debouncedSearchTerm}
                  onClick={() => handleGenreChange(g.id)}
                >
                  {g.name}
                </button>
              ))}
            </div>
            {isMobile &&
              genres.length > COLLAPSED_GENRE_COUNT &&
              !debouncedSearchTerm && (
                <button
                  className={css.showMoreGenres}
                  onClick={() => setGenresExpanded((prev) => !prev)}
                >
                  {genresExpanded
                    ? "Show less ↑"
                    : `+${genres.length - COLLAPSED_GENRE_COUNT} more genres ↓`}
                </button>
              )}
            {debouncedSearchTerm && (
              <p className={css.genreHint}>
                Genre filters are unavailable while searching. Clear the search
                to browse by genre.
              </p>
            )}
          </div>

          <select
            className={css.sortSelect}
            value={catalogSort}
            onChange={(e) =>
              handleSortChange(e.target.value as CatalogSortType)
            }
          >
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <MediaGrid items={sortedItems} isLoading={isLoading} />

        {!isLoading && sortedItems.length === 0 && (
          <p className={css.empty}>
            No results found. Try a different search or genre.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={css.pagination}>
            <button
              className={css.pageBtn}
              disabled={page === 1}
              onClick={() =>
                setCatalogPagination(catalogTab, { page: page - 1 })
              }
            >
              Prev
            </button>
            <span className={css.pageNum}>
              {page} / {totalPages}
            </span>
            <button
              className={css.pageBtn}
              disabled={page === totalPages}
              onClick={() =>
                setCatalogPagination(catalogTab, { page: page + 1 })
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
