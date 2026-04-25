"use client";

import { getGenres } from "@/lib/movies";
import { useQuery } from "@tanstack/react-query";
import GenreCard from "../GenreCard/GenreCard";
import { useCallback, useEffect } from "react";
import css from "./GenreSectionMovies.module.css";
import Icon from "../Icon/Icon";
import { useUiStore } from "@/store/uiStore";
import { memo } from "react";

interface Genre {
  id: number;
  name: string;
}

function GenreSectionMovies() {
  const paginationKey = "genre-movies";
  const page = useUiStore(
    (state) => state.paginations[paginationKey]?.page ?? 1,
  );
  const items = useUiStore(
    (state) => state.paginations[paginationKey]?.items ?? 2,
  );
  const mobile = useUiStore(
    (state) => state.paginations[paginationKey]?.mobile ?? false,
  );
  const setPaginationState = useUiStore((state) => state.setPaginationState);

  const handleItemsPerPage = useCallback(() => {
    if (window.innerWidth < 1440) {
      setPaginationState(paginationKey, { items: 2, mobile: true, page: 1 });
    } else if (window.innerWidth < 1920) {
      setPaginationState(paginationKey, { items: 5, mobile: false });
    } else {
      setPaginationState(paginationKey, { items: 5, mobile: false });
    }
  }, [paginationKey, setPaginationState]);

  useEffect(() => {
    handleItemsPerPage();

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleItemsPerPage, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, [handleItemsPerPage]);

  const { data: genresData, isLoading } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: getGenres,
  });

  if (isLoading || !genresData) {
    return (
      <section className={css.container}>
        <div
          className={css.skeletonLoader}
          style={{
            height: "280px",
            background: "#1a1a1a",
            borderRadius: "12px",
          }}
        />
      </section>
    );
  }

  const total = Math.ceil(genresData.genres.length / items);
  const startInx = (page - 1) * items;
  const visibleGenres = mobile
    ? genresData.genres
    : genresData.genres.slice(startInx, startInx + items);

  return (
    <section className={css.section}>
      <div className={css.content}>
        <div className={css.top}>
          <div>
            <h2 className={css.title}>Our Genres</h2>
          </div>

          {!mobile && (
            <div className={css.pag}>
              <button
                className={css.left}
                onClick={() =>
                  setPaginationState(paginationKey, { page: page - 1 })
                }
                disabled={page === 1}
              >
                <Icon name="left" width={22} height={22} />
              </button>

              <div className={css.num}>
                {[...Array(total)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setPaginationState(paginationKey, { page: i + 1 })
                    }
                    className={`${css.dot} ${page === i + 1 ? css.activeDot : ""}`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                className={css.right}
                onClick={() =>
                  setPaginationState(paginationKey, { page: page + 1 })
                }
                disabled={page === total}
              >
                <Icon name="right" width={18} height={18} />
              </button>
            </div>
          )}
        </div>

        <div className={css.grid}>
          {visibleGenres.map((genre: Genre) => (
            <GenreCard
              key={genre.id}
              genreId={genre.id}
              genreName={genre.name}
              page={1}
              mediaType={"movie"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(GenreSectionMovies);
