import React from 'react';
import {useGlobalContext} from '../contexts/context';

const Buttons = () => {
  const {page, nbPages, handlePage} = useGlobalContext();

  return (
    <div className="btn-container">
      <button onClick={() => handlePage('dec')}>⬅</button>
      <p>
        {page + 1} / {nbPages}
      </p>
      <button onClick={() => handlePage('inc')}>➡</button>
    </div>
  );
};

export default Buttons;
