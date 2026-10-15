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

export default function App() {
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);

  const movie = "the%20day%20of%20the%20jackal";

  // fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=af2d2729&s=${movie}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.Search));

  useEffect(function () {
    axios.get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=af2d2729&s=${movie}`,
    ).then(data => setMovies(data));
  }, [])

  return (
    <>
      <Navbar>
        <Search />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        />
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
