import { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { tempMovieData } from "./data.js";
import {Search, NumResults} from "./components/Navbar"
import { ListBox, WatchedBox, MovieList } from "./components/Main";
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <Navbar>
        <Search />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </>
  );
}
