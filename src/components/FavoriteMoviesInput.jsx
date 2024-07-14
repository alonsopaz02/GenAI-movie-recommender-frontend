import React from 'react';
import '../styles/FavoriteMoviesInput.css';

const FavoriteMoviesInput = ({ movieInput, handleMovieInput, handleMovieKeyPress, favoriteMovies, handleRemoveMovie }) => {
  return (
    <div className="form-group">
      <label>Películas o programas de TV que te gustan</label>
      <input
        type="text"
        name="movieInput"
        value={movieInput}
        onChange={handleMovieInput}
        onKeyPress={handleMovieKeyPress}
        placeholder="Escribe una película y presiona Enter"
      />
      <div className="favorite-movies-list">
        {favoriteMovies.map((movie, index) => (
          <span key={index} className="favorite-movie-item">
            {movie} <button type="button" onClick={() => handleRemoveMovie(movie)}>x</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMoviesInput;