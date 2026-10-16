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

export default function App() {
  const [loading, setLoading] = useState(false);
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);

  const query = "the%20day%20of%20the%20jackal";

  // fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=af2d2729&s=${movie}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.Search));

  useEffect(function () {
    async function fetchMovies() {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?i=tt3896198&apikey=af2d2729&s=${query}`,
        );

        setMovies(res.data.Search ?? []);
        console.log(res.data.Search);
      } catch (error) {
        console.log(`Erro fetching the movie: ${error.message}`);
      }
      setLoading(false);
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
        {loading ? <Loader /> : <Box element={<MovieList movies={movies} />} />}
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
