import { useState } from "react";
import rocketflixLogo from "./assets/rocketflix-logo.svg";
import { Movie } from "./types/movie";

function App() {
  const [movie, setMovie] = useState<Movie>();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGFlZmJiNzkxZGFhMTZlMjE5YTk2OTM3OWJhMDY3ZSIsInN1YiI6IjYzNTg0YWYzNDJmMTlmMDA3ZjczMjM0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mob1f2fPHg-pXxTt9yBQgsFs04NODQDLi6dtIdbZbgU",
    },
  };
  const getNewMovie = async () => {
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${Math.floor(
        Math.random() * (500 - 1 + 1) + 1
      )}&sort_by=popularity.desc`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const newMovie: Movie =
          response.results[Math.floor(Math.random() * response.results.length)];
        return setMovie(newMovie);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <header className="flex flex-col items-center gap-2">
        <img className="h-12 w-20" src={rocketflixLogo} alt="Rocketflix Logo" />
        <h1 className="text-center text-2xl font-bold">
          Não sabe o que assistir?
        </h1>
      </header>
      <main className="mt-8 flex flex-col items-center gap-5">
        {/* w-500 h-750 */}
        {movie ? (
          <>
            <img
              className="max-h-96"
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt={`Poster do filme ${movie?.title}`}
            />
            <h2 className="text-center text-xl font-bold">{movie.title}</h2>
            <span>{movie.overview}</span>
          </>
        ) : null}
        <button
          onClick={() => getNewMovie()}
          className="mt-8 flex items-center gap-4 rounded-sm bg-[#E9E6E3] px-4 py-3 text-[#1A1A1A]"
        >
          <img className="h-6 w-9" src={rocketflixLogo} alt="Rocketflix Logo" />
          <span className="text-xs font-bold">Encontrar filme</span>
        </button>
        <span className="mt-8 text-center text-xs">
          Clique em "Encontrar filme" que traremos informações de algum filme
          para você assistir hoje.
        </span>
      </main>
    </>
  );
}

export default App;
