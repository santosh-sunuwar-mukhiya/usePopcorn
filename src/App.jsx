import { useState, useEffect } from "react";
import axios from "axios"
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import {Search, NumResults} from "./components/Navbar"
import {
  Box,
  MovieList,
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

  const query = "the%20day%20of%20the%20jackal";

  // fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=af2d2729&s=${movie}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.Search));

  useEffect(function () {
    async function fetchMovies() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://www.omdbapi.com/?i=tt3896198&apikey=af2d2729&s=${query}`,
        );

        if (res.data.Response === "False") {
          throw new Error("Something went wrong while fetching movies data!");
        }

        setMovies(res.data.Search ?? []);
      } catch (error) {
        setError(error.response?.data?.Error || error.message || "Something went wrong !");
      } finally {
        setLoading(false);
      }
      
    }

    fetchMovies();
  }, [])

  return (
    <>
      <Navbar>
        <Search />
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
          {!loading && !error && <MovieList movies={movies} />}
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
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
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
