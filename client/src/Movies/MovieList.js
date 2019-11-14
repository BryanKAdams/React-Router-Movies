import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';


const MovieList = props => {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState("");
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          const movies = response.data.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
          setMovies(movies);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }

    getMovies();
  }, [query]);

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <form className="search">
        <input
          type="text"
          onChange={handleInputChange}
          value={query}
          name="name"
          tabIndex="0"
          className="prompt search-name"
          placeholder="search by name"
          autoComplete="off"
        />
      </form>

      <div className="movie-list">
        {movies.map((movie, index) => (
          <Link key={index} to={`/movies/${movie.id}`}>
            <MovieDetails key={index} movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function MovieDetails({ movie }) {
  const { title, director, metascore, stars } = movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>


      {stars.map((star, index) => (
        <div key={index} className="movie-star">
          {star}
        </div>
      ))}
    </div>
  );
}

export default MovieList;
