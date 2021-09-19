import React from 'react';
import {VscLoading} from 'react-icons/vsc';

const Loader = () => {
  return (
    <div className="loading">
      <h1>
        <VscLoading />
      </h1>
      <h3>. . . loading</h3>
    </div>
  );
};

export default Loader;
