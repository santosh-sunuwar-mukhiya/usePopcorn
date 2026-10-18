import { useState, useEffect } from "react";
import axios from "axios"
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import {Search, NumResults} from "./components/Navbar"
import {
  Box,
  MovieList,
  MovieDetails,
  WatchedSummary,
  WatchedMoviesList,
} from "./components/Main";
import Loader from "./components/Loader"
import ErrorMessage from "./components/ErrorMessage";

const API_URL = import.meta.env.VITE_MOVIE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);


  // fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=af2d2729&s=${movie}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.Search));

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(prev => [...prev, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(function () {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("")
        const res = await axios.get(`${API_URL}&apikey=${API_KEY}&s=${query}`, { signal: controller.signal});

        console.log("API response:", res.data.Search);

        if (res.data.Response === "False") {
          throw new Error("Something went wrong while fetching movies data!");
        }

        setMovies(res.data.Search ?? []);
        setError("")
      } catch (error) {
        if(
            axios.isCancel(error) ||
            error.code === "ERR_CANCELED"
        ) {
          return;
        }
          setError(
            error.response?.data?.Error ||
              error.message ||
              "Something went wrong !",
          );
      } finally {
        setLoading(false);
      }
      
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie()

    fetchMovies();

    return function () {
      controller.abort();
    }
  }, [query])

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {/* {loading ? (
            <Loader />
          ) : (
            <Box element={<MovieList movies={movies} />} />
          )} */}

          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box

        // element={
        //   <>
        //     <WatchedSummary watched={watched} />
        //     <WatchedMoviesList watched={watched} />
        //   </>
        // }
        >
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
        {/* <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box> */}
      </Main>
    </>
  );
}
