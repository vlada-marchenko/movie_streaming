import api from "./api";

// Get a list of tv shows ordered by popularity.
export async function getPopularSeries(page = 1) {
  try {
    const res = await api.get("/tv/popular", {
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

// Get the trending series on TMDB.
export async function getTrendingSeries(timeWindow = "day") {
  try {
    const res = await api.get(`/trending/tv/${timeWindow}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get the list of official genres for tv shows.
export async function getGenresTv() {
  try {
    const res = await api.get("/genre/tv/list");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Find tv shows using over 30 filters and sort options.
export async function getSeriesByGenre(genreId, page = 1) {
  try {
    const res = await api.get("/discover/tv", {
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

// Search for tv shows by their original, translated and alternative titles.
export async function getSearchSeries(query, page = 1) {
  try {
    const res = await api.get("/search/tv", {
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

// Get a list of series ordered by rating.
export async function getTopRatedSeries(page = 1) {
  try {
    const res = await api.get("/tv/top_rated", {
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

// Get a list of series that are currently in theatres.
export async function getNewSeries(page = 1) {
  try {
    const res = await api.get("/movie/on_the_air", {
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

// Get the top level details of a tv show by ID.
export async function getSeriesDetails(series_id) {
  try {
    const res = await api.get(`tv/${series_id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get the crew of the movie.
export async function getSeriesCredits(series_id) {
  try {
    const res = await api.get(`/tv/${series_id}/credits`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get the user reviews for a movie.
export async function getSeriesReviews(series_id) {
  try {
    const res = await api.get(`/tv/${series_id}/reviews`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}




// Get the details of season of a TV show.
export async function getSeasonDetails(season_number ,series_id) {
  try {
    const res = await api.get(`tv/${series_id}/season/${season_number}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get the details of episode of season of a TV show.
export async function getEpisodeDetails(episode_number ,season_number ,series_id) {
  try {
    const res = await api.get(`tv/${series_id}/season/${season_number}/episode/${episode_number}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

