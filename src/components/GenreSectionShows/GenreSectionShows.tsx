"use client";

import { useQuery } from "@tanstack/react-query";
import GenreCard from "../GenreCard/GenreCard";
import { useEffect } from "react";
import css from "./GenreSectionShows.module.css";
import Icon from "../Icon/Icon";
import { getGenresTv } from "@/lib/series";
import { useUiStore } from "@/store/uiStore";

interface Genre {
  id: number;
  name: string;
}

export default function GenreSectionMovies() {
  const paginationKey = "genre-shows";
  const page = useUiStore((state) => state.paginations[paginationKey]?.page ?? 1);
  const items = useUiStore(
    (state) => state.paginations[paginationKey]?.items ?? 2
  );
  const mobile = useUiStore(
    (state) => state.paginations[paginationKey]?.mobile ?? false
  );
  const setPaginationState = useUiStore((state) => state.setPaginationState);


  useEffect(() => {
    const handleItemsPerPage = () => {
      if (window.innerWidth < 1440) {
        setPaginationState(paginationKey, { items: 2, mobile: true, page: 1 });
      } else if (window.innerWidth < 1920) {
        setPaginationState(paginationKey, { items: 5, mobile: false });
      } else {
        setPaginationState(paginationKey, { items: 5, mobile: false });
      }
    };

    handleItemsPerPage();
    window.addEventListener("resize", handleItemsPerPage);

    return () => {
      window.removeEventListener("resize", handleItemsPerPage);
    };
  }, [paginationKey, setPaginationState]);

  const { data: genresData, isLoading } = useQuery({
    queryKey: ["tvGenres"],
    queryFn: getGenresTv,
  });

  useEffect(() => {
    if (genresData?.genres) {
      const totalPages = Math.ceil(genresData.genres.length / items);
      if (page > totalPages) {
        setPaginationState(paginationKey, { page: totalPages });
      }
    }
  }, [genresData, items, page, paginationKey, setPaginationState])

  if (isLoading || !genresData) {
    return <div>Loading genres...</div>;
  }

  const total = Math.ceil(genresData.genres.length / items);
  const startInx = (page - 1) * items;
  const visibleGenres = mobile 
    ? genresData.genres 
    : genresData.genres.slice(startInx, startInx + items);

  // const showPag = !mobile && total > 1

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
              onClick={() => setPaginationState(paginationKey, { page: page - 1 })}
              disabled={page === 1}
            >
              <Icon name="left" width={22} height={22} />
            </button>

            <div className={css.num}>
              {[...Array(total)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPaginationState(paginationKey, { page: i + 1 })}
                  className={`${css.dot} ${page === i + 1 ? css.activeDot : ""}`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={css.right}
              onClick={() => setPaginationState(paginationKey, { page: page + 1 })}
              disabled={page === total}
            >
              <Icon name="right" width={18} height={18} />
            </button>
          </div>)}
        </div>

        <div className={css.grid}>
          {visibleGenres.map((genre: Genre) => (
            <GenreCard
              key={genre.id}
              genreId={genre.id}
              genreName={genre.name}
              page={1}
              mediaType={'tv'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
