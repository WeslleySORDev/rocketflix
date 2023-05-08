import { useEffect, useState } from "react";
import rocketflixLogo from "./assets/rocketflix-logo.svg";
import { Movie } from "./types/movie";

const genres: { id: number; name: string }[] = [
  {
    id: 28,
    name: "Ação",
  },
  {
    id: 12,
    name: "Aventura",
  },
  {
    id: 16,
    name: "Animação",
  },
  {
    id: 35,
    name: "Comédia",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentário",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Família",
  },
  {
    id: 14,
    name: "Fantasia",
  },
  {
    id: 36,
    name: "História",
  },
  {
    id: 27,
    name: "Terror",
  },
  {
    id: 10402,
    name: "Musical",
  },
  {
    id: 9648,
    name: "Mistério",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Ficção Científica",
  },
  {
    id: 10770,
    name: "Filme de TV",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "Guerra",
  },
  {
    id: 37,
    name: "Ocidental",
  },
];

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
    if (movie) {
      console.log(movie);
    }
  }, [movie]);
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
      <main className="mt-8 flex flex-col items-center lg:justify-center gap-5 lg:mt-16 lg:flex-row lg:items-start lg:gap-8">
        {movie ? (
          <>
            <div className="relative w-fit h-auto">
              <span className="absolute top-2 right-2 rounded-sm px-6 py-1 bg-[linear-gradient(90deg,_rgba(147,56,244,0.3)_1%,__rgba(147,56,244,0.5)_5%,_rgba(147,56,244,0.8)_30%,rgba(147,56,244,1)_85.86%)] font-medium">{movie.vote_average.toFixed(1)}</span>
              <img
                className="h-96"
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                alt={`Poster do filme ${movie?.title}`}
              />
            </div>
            <div className="flex flex-col gap-5 lg:w-1/2">
              <h2 className="text-center text-xl font-bold lg:text-start">
                {movie.title} {" - "}{" "}
                {movie.release_date && movie.release_date.split("-")[0]}
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
