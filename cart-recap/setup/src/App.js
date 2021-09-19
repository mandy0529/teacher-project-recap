import React from 'react';
import {useGlobalContext} from './contexts/context';

import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Loader from './components/Loader';

const App = () => {
  const {loading} = useGlobalContext();
  if (loading) {
    return <Loader />;
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
