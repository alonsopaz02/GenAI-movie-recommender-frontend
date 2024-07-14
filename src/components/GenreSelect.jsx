import React from 'react';
import '../styles/GenreSelect.css';

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

const GenreSelect = ({ preferredGenre, handleGenreChange, otherGenre, handleChange }) => {
  return (
    <div className="form-group">
      <label className="preferred-genre-label">Género preferido</label>
      <select className="genre-select" name="preferredGenre" value={preferredGenre} onChange={handleGenreChange}>
        <option value="">Selecciona un género</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.name.toString()}>{genre.name}</option>
        ))}
      </select>
      {preferredGenre === 'other' && (
        <input
          type="text"
          name="otherGenre"
          placeholder="Ingresa el género"
          value={otherGenre}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default GenreSelect;