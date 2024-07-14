import React, { useState } from 'react';
import Chat from './components/Chat';
import RecommendationForm from './components/RecommendationForm';
import './styles/App.css';

function App() {
  const [preferences, setPreferences] = useState(null);

  const handleFormSubmit = (preferences) => {
    setPreferences(preferences);
  };

  return (
    <div className="App">
      {!preferences ? (
        <RecommendationForm onSubmit={handleFormSubmit} />
      ) : (
        <Chat preferences={preferences} />
      )}
    </div>
  );
}

export default App;