import { create } from "zustand";

type TabType = "movies" | "shows";
type PlanTabType = "basic" | "standard" | "premium";

type CatalogTabType = "all" | "movies" | "series";
type CatalogSortType = "popularity" | "rating" | "newest" | "title";

interface CatalogPaginationState {
  page: number;
  items: number;
}

interface PaginationState {
  page: number;
  items: number;
  mobile: boolean;
}

interface UiState {
  headerMenuOpen: boolean;
  movieCurrentSlide: number;
  movieActiveTab: TabType;
  planActiveTab: PlanTabType;
  heroGridSize: number;
  trialGridSize: number;
  catalogTab: CatalogTabType;
  catalogSort: CatalogSortType;
  catalogPagination: Record<string, CatalogPaginationState>;
  catalogSearchTerm: string;
  catalogGenre: string | null;
  paginations: Record<string, PaginationState>;
  expandedReviews: Record<string, boolean>;
  selectedSeasons: Record<string, number>;
  setExpandedReview: (id: string, expanded: boolean) => void;
  setHeaderMenuOpen: (open: boolean) => void;
  toggleHeaderMenu: () => void;
  setMovieCurrentSlide: (
    slide: number | ((prevSlide: number) => number),
  ) => void;
  setMovieActiveTab: (tab: TabType) => void;
  setHeroGridSize: (size: number) => void;
  setTrialGridSize: (size: number) => void;
  setPaginationState: (key: string, payload: Partial<PaginationState>) => void;
  setSelectedSeasons: (id: string, season: number) => void;
  setPlanActiveTab: (tab: PlanTabType) => void;
  setCatalogTab: (tab: CatalogTabType) => void;
  setCatalogSort: (sort: CatalogSortType) => void;
  setCatalogPagination: (
    key: string,
    payload: Partial<CatalogPaginationState>,
  ) => void;
  setCatalogSearchTerm: (term: string) => void;
  setCatalogGenre: (genre: string | null) => void;
  resetFilters: () => void;
}

const defaultPaginationState: PaginationState = {
  page: 1,
  items: 2,
  mobile: false,
};

export const useUiStore = create<UiState>((set) => ({
  headerMenuOpen: false,
  movieCurrentSlide: 0,
  movieActiveTab: "movies",
  planActiveTab: "basic",
  heroGridSize: 36,
  trialGridSize: 36,
  catalogTab: "all",
  catalogSort: "popularity",
  catalogPagination: {},
  catalogSearchTerm: "",
  catalogGenre: null,
  paginations: {},
  expandedReviews: {},
  selectedSeasons: {},
  setSelectedSeasons: (id, season) =>
    set((state) => ({
      selectedSeasons: { ...state.selectedSeasons, [id]: season },
    })),
  setExpandedReview: (id, expanded) =>
    set((state) => ({
      expandedReviews: { ...state.expandedReviews, [id]: expanded },
    })),
  setHeaderMenuOpen: (open) => set({ headerMenuOpen: open }),
  toggleHeaderMenu: () =>
    set((state) => ({ headerMenuOpen: !state.headerMenuOpen })),
  setMovieCurrentSlide: (slide) =>
    set((state) => ({
      movieCurrentSlide:
        typeof slide === "function" ? slide(state.movieCurrentSlide) : slide,
    })),
  setMovieActiveTab: (tab) => set({ movieActiveTab: tab }),
  setHeroGridSize: (size) => set({ heroGridSize: size }),
  setTrialGridSize: (size) => set({ trialGridSize: size }),
  setPaginationState: (key, payload) =>
    set((state) => ({
      paginations: {
        ...state.paginations,
        [key]: {
          ...(state.paginations[key] ?? defaultPaginationState),
          ...payload,
        },
      },
    })),
  setPlanActiveTab: (tab) => set({ planActiveTab: tab }),
  setCatalogTab: (tab) => set({ catalogTab: tab }),
  setCatalogSort: (sort) => set({ catalogSort: sort }),
  setCatalogPagination: (key, payload) =>
    set((state) => ({
      catalogPagination: {
        ...state.catalogPagination,
        [key]: {
          ...(state.catalogPagination[key] ?? { page: 1, items: 20 }),
          ...payload,
        },
      },
    })),
  setCatalogSearchTerm: (term) => set({ catalogSearchTerm: term }),
  setCatalogGenre: (genre) => set({ catalogGenre: genre }),
  resetFilters: () =>
    set({
      catalogTab: "all",
      catalogSort: "popularity",
      catalogPagination: {},
      catalogSearchTerm: "",
      catalogGenre: null,
    }),
}));
