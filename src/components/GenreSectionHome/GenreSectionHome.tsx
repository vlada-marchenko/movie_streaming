"use client";

import { getGenres } from "@/lib/movies";
import { useQuery } from "@tanstack/react-query";
import GenreCard from "../GenreCard/GenreCard";
import { useState } from "react";
import { useEffect } from "react";
import css from "./GenreSectionHome.module.css";
import Icon from "../Icon/Icon";

interface Genre {
  id: number;
  name: string;
}

export default function GenreSectionHome() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(2);
  const [mobile, setMobile] = useState(false);


  useEffect(() => {
    const handleItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItems(2);
        setMobile(true);
      } else if (window.innerWidth < 1920) {
        setItems(5);
        setMobile(false);
      } else {
        setItems(5);
        setMobile(false);
      }
    };

    handleItemsPerPage();
    window.addEventListener("resize", handleItemsPerPage);

    return () => {
      window.removeEventListener("resize", handleItemsPerPage);
    };
  }, []);

  const { data: genresData, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isLoading || !genresData) {
    return <div>Loading genres...</div>;
  }

  const total = Math.ceil(genresData.genres.length / items);
  const startInx = (page - 1) * items;
  const visibleGenres = mobile 
    ? genresData.genres 
    : genresData.genres.slice(startInx, startInx + items);

  return (
    <section className={css.container}>
      <div className={css.content}>
        <div className={css.top}>
          <h2 className={css.title}>Expore our wide variety of categories</h2>
          <p className={css.text}>
            Whether you`re looking for a comedy to make you laugh, a drama to
            make you think, or a documentary to learn something new
          </p>

          {!mobile && (
          <div className={css.pag}>
            <button
              className={css.left}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <Icon name="left" width={20} height={20} />
            </button>

            <div className={css.num}>
              {[...Array(total)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`${css.dot} ${page === i + 1 ? css.activeDot : ""}`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={css.right}
              onClick={() => setPage(page + 1)}
              disabled={page === total}
            >
              <Icon name="right" width={20} height={20} />
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
