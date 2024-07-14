import React, { useState } from 'react';
import FavoriteMoviesInput from './FavoriteMoviesInput';
import GenreSelect from './GenreSelect';
import YearRangeInput from './YearRangeInput';
import TagsInput from './TagsInput';
import RecommendationsList from './RecommendationsList';
import ChatComponent from './ChatComponent';
import '../styles/RecommendationForm.css';
import { getRecommendations, startChat } from '../services/api';

// Generos de peliculas
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
  const [yearRange, setYearRange] = useState({ startYear: '', endYear: '' });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [chatInitialized, setChatInitialized] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const handleYearRangeChange = (e) => {
    const { name, value } = e.target;
    setYearRange(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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
    const recs = await getRecommendations(preferences);
    setRecommendations(recs);

    if (recs.length > 0) {
      const initialMessage = `
        Basado en las siguientes preferencias:
        Películas Favoritas: ${preferences.favoriteMovies.join(', ')}
        Género Preferido: ${preferences.preferredGenre === 'other' ? preferences.otherGenre : preferences.preferredGenre}
        Rango de Años: ${yearRange.startYear} - ${yearRange.endYear}
        Etiquetas: ${tags.join(', ')}
        Por favor proporciona ${preferences.resultsCount} recomendaciones de películas con descripciones cortas.
      `;
      const chatResponse = await startChat(initialMessage);
      setChatMessages([{ role: 'model', text: chatResponse.message }]);
      setChatInitialized(true);
    }
  } catch (error) {
    console.error('Error getting recommendations:', error);
  }
};

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
      setTags([...tags, tagInput.trim()]);
      setTagInput(''); // Limpiar el campo de entrada
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="recommendation-container">
      <form className="recommendation-form" onSubmit={handleSubmit}>
        <h2>Recomendador de películas</h2>
        <p>Obtén recomendaciones de películas impulsadas por IA basadas en tus películas y programas de TV favoritos</p>

        <FavoriteMoviesInput
          movieInput={movieInput}
          handleMovieInput={handleMovieInput}
          handleMovieKeyPress={handleMovieKeyPress}
          favoriteMovies={preferences.favoriteMovies}
          handleRemoveMovie={handleRemoveMovie}
        />

        <GenreSelect
          preferredGenre={preferences.preferredGenre}
          handleGenreChange={handleGenreChange}
          otherGenre={preferences.otherGenre}
          handleChange={handleChange}
        />

        <YearRangeInput
          yearRange={yearRange}
          handleYearRangeChange={handleYearRangeChange}
        />

        <TagsInput
          tags={tags}
          tagInput={tagInput}
          handleTagInputChange={handleTagInputChange}
          handleKeyDown={handleKeyDown}
          removeTag={removeTag}
        />

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
      {chatInitialized && <ChatComponent initialMessages={chatMessages} />}
    </div>
  );
};

export default RecommendationForm;