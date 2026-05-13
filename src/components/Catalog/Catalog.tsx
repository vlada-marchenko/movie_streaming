"use client";

import css from "./Catalog.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MediaGrid from "../MediaGrid/MediaGrid";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getSearchMovies } from "@/lib/movies";
import { getSearchSeries } from "@/lib/series";

type TabType = "all" | "movies" | "series";
type SortType = "popularity" | "rating" | "newest" | "title";

export default function Catalog() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <MediaGrid items={movies || series} isLoading={true} />
    </div>
  );
}
