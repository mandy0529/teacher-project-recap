import React from 'react';
import Loading from './components/Loading';
import Quiz from './components/Quiz';
import SetupForm from './components/SetupForm';
import {useGlobalContext} from './contexts/context';

function App() {
  const {loading, waiting, questions, index} = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if (waiting) {
    return <SetupForm />;
  }
  return <Quiz {...questions[index]} />;
}

export default App;
