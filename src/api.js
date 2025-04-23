const API_KEY = 'b9f48cfc8b6048c94fcbf5f540540bf8';

export const fetchMovies = async (query) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return await response.json();
};
