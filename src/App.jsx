import { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { tempMovieData } from "./data.js";
import {Search, NumResults} from "./components/Navbar"

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <Navbar>
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main movies={movies} />
    </>
  );
}
