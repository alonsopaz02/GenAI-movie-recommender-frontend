import React from 'react';
import '../styles/RecommendationsList.css';

const RecommendationsList = ({ recommendations }) => {
  return (
    <div className="recommendations">
      <h3>Recomendaciones:</h3>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>
            <strong>{rec.title}</strong>: {rec.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsList;