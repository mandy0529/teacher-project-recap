import React from 'react';

import {useGlobalContext} from '../contexts/context';
import Loader from './Loader';

const Stories = () => {
  const {loading, hits, removeHits} = useGlobalContext();

  if (loading) {
    return <Loader />;
  }
  return (
    <section className="stories">
      {hits.map((item) => {
        const {objectID, title, num_comments, url, points, author} = item;
        return (
          <article key={objectID} className="story">
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} points by <span>{author} | </span> {num_comments}{' '}
              comments
            </p>
            <div>
              <a
                href={url}
                className="read-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                read more
              </a>
              <button
                className="remove-btn"
                onClick={() => removeHits(objectID)}
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
