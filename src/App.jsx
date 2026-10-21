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

import { useMovies } from "./hooks/useMovies";

const API_URL = import.meta.env.VITE_MOVIE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { error, loading, movies } = useMovies(query, handleCloseMovie);

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");

    return JSON.parse(storedValue);
  });

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
    setWatched((prev) => [...prev, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched],
  );


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
