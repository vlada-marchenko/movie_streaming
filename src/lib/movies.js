import api from "./api";

// Get a list of movies ordered by popularity.
export async function getPopularMovies(page = 1) {
  try {
    const res = await api.get("/movie/popular", {
      params: {
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// Get the trending movies on TMDB.
export async function getTrendingMovies(timeWindow = "day") {
  try {
    const res = await api.get(`/trending/movie/${timeWindow}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get a list of movies that are currently in theatres.
export async function getNewMovies(page = 1) {
  try {
    const res = await api.get("/movie/now_playing", {
      params: {
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// Get a list of movies ordered by rating.
export async function getTopRatedMovies(page = 1) {
  try {
    const res = await api.get("/movie/top_rated", {
      params: {
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get the top level details of a movie by ID.
export async function getMovieDetails(movieId) {
    try {
        const res = await api.get(`/movie/${movieId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Get the crew of the movie.
export async function getMovieCredits(movieId) {
    try {
        const res = await api.get(`/movie/${movieId}/credits`);
        return res.data;
        } catch (error) {
        console.log(error);
        throw error;
    }
}

// Get the user reviews for a movie.
export async function getMovieReviews(movieId) {
    try {
        const res = await api.get(`/movie/${movieId}/reviews`); 
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Search for movies by their original, translated and alternative titles.
export async function getSearchMovies(query, page = 1) {
    try {
        const res = await api.get("/search/movie", {
            params: {
                query,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Get the list of official genres for movies.
export async function getGenres() {
    try {
        const res = await api.get("/genre/movie/list");
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;

    }
}

// Find movies using over 30 filters and sort options.
export async function getMoviesByGenre(genreId, page = 1) {
    try {
        const res = await api.get("/discover/movie", {
            params: {
                with_genres: genreId,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}