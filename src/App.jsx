import React, { useState } from 'react';
import Chat from './components/ChatComponent';
import RecommendationForm from './components/RecommendationForm';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <RecommendationForm />
    </div>
  );
}

export default App;