import { useEffect, useState } from "react";
import rocketflixLogo from "./assets/rocketflix-logo.svg";
import { Movie } from "./types/movie";

function App() {
  const [movie, setMovie] = useState<Movie>();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_BEARER,
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
  useEffect(() => {
    console.log(import.meta.env.VITE_BEARER);
  }, []);
  return (
    <div className="relative flex flex-col">
      <header className="flex flex-col items-center gap-2">
        <img className="h-12 w-20" src={rocketflixLogo} alt="Rocketflix Logo" />
        <h1 className="text-center text-2xl font-bold">
          Não sabe o que assistir?
          <br />
          <span className="text-center text-xs">
            ( Clique em "Encontrar filme" que traremos informações de algum
            filme para você assistir hoje. )
          </span>
        </h1>
      </header>
      <main className="mt-8 flex flex-col items-center gap-5 lg:mt-16 lg:flex-row lg:items-start lg:gap-8">
        {movie ? (
          <>
            <img
              className="max-h-96 w-auto"
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt={`Poster do filme ${movie?.title}`}
            />
            <div className="flex flex-col gap-5">
              <h2 className="text-center text-xl font-bold lg:text-start">
                {movie.title}
              </h2>
              <span className="line-clamp-6 lg:line-clamp-none">
                {movie.overview}
              </span>
            </div>
          </>
        ) : null}
      </main>
      <button
        onClick={() => getNewMovie()}
        className="fixed bottom-8 right-8 flex items-center gap-4 rounded-full bg-[#E9E6E3] px-4 py-4 text-[#1A1A1A]"
      >
        <img className="h-9 w-9" src={rocketflixLogo} alt="Rocketflix Logo" />
        <span className="text-sm font-bold text-black">Encontrar filme</span>
      </button>
    </div>
  );
}

export default App;
