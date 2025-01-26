import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]); // Initialize state as an empty array

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(response => {
        const parsedData = JSON.parse(response.data); // Parse the string into an object
        console.log('Parsed Data:', parsedData);
        const movieData = parsedData
        console.log(movieData); // Extract the movies array from the "movies" key
        if (Array.isArray(movieData)) {
          console.log('Movies:', movieData); // Log the array of movies
          movieData.forEach(movie => console.log(movie.title)); // Log each movie title
          setMovies(movieData); // Set the movie data in state
        } else {
          console.error('Unexpected data format:', response.data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Movie Data Visualization</h1>
      {Array.isArray(movies) && movies.length > 0 ? ( // Ensure movies is an array and has items
        <ul>
          {movies.map((movie) => (
            <li key={movie.title}> {/* Use title as a unique key */}
              <strong>{movie.title}</strong> - {movie.genres} (Rating: {movie.vote_average})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading movies...</p> // Show a loading message while the data is being fetched
      )}
    </div>
  );
};

export default App;
