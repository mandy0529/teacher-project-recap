import React from 'react';
import Buttons from './components/Buttons';
import SearchForm from './components/SearchForm';
import Stories from './components/Stories';

function App() {
  return (
    <main>
      <SearchForm />
      <Buttons />
      <Stories />
    </main>
  );
}

export default App;
