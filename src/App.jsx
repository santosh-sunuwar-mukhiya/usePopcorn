import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { tempMovieData } from "./data.js";
import { useState } from "react";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <Navbar movies={movies} />
      <Main movies={movies} />
    </>
  );
}
