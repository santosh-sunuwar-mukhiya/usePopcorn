import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_MOVIE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export function useMovies(query, callback) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(
        function () {
            callback?.();
            
        const controller = new AbortController();
        async function fetchMovies() {
          try {
            setLoading(true);
            setError("");
            const res = await axios.get(
              `${API_URL}&apikey=${API_KEY}&s=${query}`,
              { signal: controller.signal },
            );

            console.log("API response:", res.data.Search);

            if (res.data.Response === "False") {
              throw new Error(
                "Something went wrong while fetching movies data!",
              );
            }

            setMovies(res.data.Search ?? []);
            setError("");
          } catch (error) {
            if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
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

        // handleCloseMovie();

        fetchMovies();

        return function () {
          controller.abort();
        };
      },
      [query],
    );  
    
    return {loading, error, movies}
}