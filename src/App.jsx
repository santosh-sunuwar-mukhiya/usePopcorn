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

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("the day of the jackal");
  const [selectedId, setSelectedId] = useState(null);


  // fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=af2d2729&s=${movie}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.Search));

  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  useEffect(function () {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("")
        const res = await axios.get(
          `https://www.omdbapi.com/?i=tt3896198&apikey=af2d2729&s=${query}`,
        );

        console.log("API response:", res.data.Search);

        if (res.data.Response === "False") {
          throw new Error("Something went wrong while fetching movies data!");
        }

        setMovies(res.data.Search ?? []);
      } catch (error) {
        console.error("Fetch failed:", error);
        setError(error.response?.data?.Error || error.message || "Something went wrong !");
      } finally {
        setLoading(false);
      }
      
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
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
            <MovieDetails selectedId={selectedId} />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
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
