import React from 'react';
import '../styles/YearRangeInput.css';

const YearRangeInput = ({ yearRange, handleYearRangeChange }) => {
    return (
      <div className="form-group">
        <label>Rango de años</label>
        <div className="year-range-inputs">
          <input
            type="number"
            name="startYear"
            value={yearRange.startYear}
            onChange={handleYearRangeChange}
            placeholder="Año de inicio"
          />
          <span> - </span>
          <input
            type="number"
            name="endYear"
            value={yearRange.endYear}
            onChange={handleYearRangeChange}
            placeholder="Año de fin"
          />
        </div>
        <div className="year-range-values">
          {yearRange.startYear && yearRange.endYear && (
            <p>Rango de años seleccionado: {yearRange.startYear} - {yearRange.endYear}</p>
          )}
        </div>
      </div>
    );
  };
  
  export default YearRangeInput;