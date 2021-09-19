import React from 'react';
import {useGlobalContext} from '../contexts/context';
import EachPhoto from './EachPhoto';
import Error from './Error';
import Loader from './Loader';

const Hero = () => {
  const {loading, data} = useGlobalContext();

  if (!data) {
    return <Error />;
  }

  return (
    <section className="photos">
      <div className="photos-center">
        {data && data.map((item, index) => <EachPhoto key={index} {...item} />)}
      </div>
      {loading && <Loader />}
    </section>
  );
};

export default Hero;
