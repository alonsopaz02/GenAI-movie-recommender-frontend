import React, { useState } from 'react';
import { getRecommendations } from '../services/api';
import '../styles/RecommendationForm.css';

const genres = [
  { id: 28, name: 'Acción' },
  { id: 12, name: 'Aventura' },
  { id: 35, name: 'Comedia' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasía' },
  { id: 27, name: 'Terror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Ciencia Ficción' },
  { id: 'other', name: 'Otros' },
];

const RecommendationForm = () => {
  const [preferences, setPreferences] = useState({
    favoriteMovies: [],
    preferredGenre: '',
    otherGenre: '',
    useAdvancedModel: false,
    resultsCount: 3,
    language: 'en-US',
  });
  const [recommendations, setRecommendations] = useState([]);
  const [movieInput, setMovieInput] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGenreChange = (e) => {
    const { value } = e.target;
    setPreferences({
      ...preferences,
      preferredGenre: value,
      otherGenre: value === 'other' ? preferences.otherGenre : '', // Clear otherGenre if not 'Otros'
    });
  };

  const handleMovieInput = (e) => {
    setMovieInput(e.target.value);
  };

  const handleMovieKeyPress = (e) => {
    if (e.key === 'Enter' && movieInput.trim() !== '') {
      e.preventDefault();
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        favoriteMovies: [...prevPreferences.favoriteMovies, movieInput.trim()],
      }));
      setMovieInput('');
    }
  };

  const handleRemoveMovie = (movie) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      favoriteMovies: prevPreferences.favoriteMovies.filter((m) => m !== movie),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedGenre = genres.find((genre) => genre.id.toString() === preferences.preferredGenre);
      const genreId = selectedGenre ? selectedGenre.id : null;
      const query = preferences.preferredGenre === 'other' ? preferences.otherGenre : '';
      const recs = await getMovieRecommendations(genreId, query, preferences.language);
      setRecommendations(recs.slice(0, preferences.resultsCount)); // Limit results based on user preference
    } catch (error) {
      console.error('Error getting recommendations:', error);
    }
  };

  return (
    <div className="recommendation-container">
      <form className="recommendation-form" onSubmit={handleSubmit}>
        <h2>Recomendador de películas</h2>
        <p>Obtén recomendaciones de películas impulsadas por IA basadas en tus películas y programas de TV favoritos</p>
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
            {preferences.favoriteMovies.map((movie, index) => (
              <span key={index} className="favorite-movie-item">
                {movie} <button type="button" onClick={() => handleRemoveMovie(movie)}>x</button>
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Género preferido</label>
          <select className="genre-select" name="preferredGenre" value={preferences.preferredGenre} onChange={handleGenreChange}>
            <option value="">Selecciona un género</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>{genre.name}</option>
            ))}
          </select>
          {preferences.preferredGenre === 'other' && (
            <input
              type="text"
              name="otherGenre"
              placeholder="Ingresa el género"
              value={preferences.otherGenre}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="form-group">
          <label>Número de resultados</label>
          <select name="resultsCount" value={preferences.resultsCount} onChange={handleChange}>
            <option value={1}>1</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="form-group">
          <label>Idioma</label>
          <select name="language" value={preferences.language} onChange={handleChange}>
            <option value="en-US">Inglés</option>
            <option value="es-ES">Español</option>
            <option value="fr-FR">Francés</option>
          </select>
        </div>
        <button type="submit">Generar</button>
      </form>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h3>Recomendaciones:</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>
                <strong>{rec.title}</strong>: {rec.overview}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendationForm;