import React from 'react';
import '../styles/YearRangeInput.css';

const YearRangeInput = ({ yearRange, handleYearRangeChange }) => {
    return (
        <div className="form-group-year">
            <label>Rango de Años</label>
            <div className="year-range-inputs">
                <input
                    type="range"
                    min="1900"
                    max="2100"
                    step="1"
                    name="startYear"
                    value={yearRange.startYear}
                    onChange={handleYearRangeChange}
                />
                <span> a </span>
                <input
                    type="range"
                    min="1900"
                    max="2100"
                    step="1"
                    name="endYear"
                    value={yearRange.endYear}
                    onChange={handleYearRangeChange}
                />
            </div>
        </div>
    );
};

export default YearRangeInput;