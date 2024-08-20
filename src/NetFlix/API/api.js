const API_KEY = 'f9b0067fa47ccc733736de1f79a4f59e';
const BASE_PATH = "https://api.themoviedb.org/3";

export async function allMovies() {
  return (await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)).json();
};

export function moviePhoto(path, option = 'original') {
  return `https://image.tmdb.org/t/p/${option}/${path}`;
}