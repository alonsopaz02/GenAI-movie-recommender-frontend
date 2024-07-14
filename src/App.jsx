import React, { useState } from 'react';
import Chat from './components/Chat';
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