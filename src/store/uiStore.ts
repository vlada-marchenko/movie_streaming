import { create } from "zustand";

type TabType = "movies" | "shows";

interface PaginationState {
  page: number;
  items: number;
  mobile: boolean;
}

interface UiState {
  headerMenuOpen: boolean;
  movieCurrentSlide: number;
  movieActiveTab: TabType;
  heroGridSize: number;
  trialGridSize: number;
  paginations: Record<string, PaginationState>;
  expandedReviews: Record<string, boolean>; 
  selectedSeasons: Record<string, number>;
  setExpandedReview: (id: string, expanded: boolean) => void;
  setHeaderMenuOpen: (open: boolean) => void;
  toggleHeaderMenu: () => void;
  setMovieCurrentSlide: (
    slide: number | ((prevSlide: number) => number)
  ) => void;
  setMovieActiveTab: (tab: TabType) => void;
  setHeroGridSize: (size: number) => void;
  setTrialGridSize: (size: number) => void;
  setPaginationState: (key: string, payload: Partial<PaginationState>) => void;
  setSelectedSeasons: (id: string, season: number) => void;
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
  heroGridSize: 36,
  trialGridSize: 36,
  paginations: {},
  expandedReviews: {}, 
  selectedSeasons: {},
  setSelectedSeasons: (id, season) =>
    set((state) => ({
      selectedSeasons: { ...state.selectedSeasons, [id]: season }
    })),
  setExpandedReview: (id, expanded) => 
    set((state) => ({
      expandedReviews: { ...state.expandedReviews, [id]: expanded }
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
}));
