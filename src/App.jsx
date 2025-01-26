import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]); // Initialize state as an empty array

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(response => {
        console.log(response.data); // Log the API response
        response.data.forEach(movie => console.log(movie.title)); // Log each movie title
        setMovies(response.data); // Set the movie data
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);  

  return (
    <div>
      <h1>Movie Data Visualization</h1>
      {Array.isArray(movies) && movies.length > 0 ? ( // Ensure data is an array and has items
        <ul>
          {movies.map((movie) => (
            <li key={movie.title}> {/* Use the unique title as the key */}
              <strong>{movie.title}</strong> - {movie.genres} (Rating: {movie.vote_average})
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies available or data is loading...</p>
      )}
    </div>
  );
};

export default App;
