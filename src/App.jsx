import { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { tempMovieData, tempWatchedData } from "./data.js";
import {Search, NumResults} from "./components/Navbar"
import {
  Box,
  MovieList,
  WatchedSummary,
  WatchedMoviesList,
} from "./components/Main";
export default function App() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState(tempMovieData);
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
