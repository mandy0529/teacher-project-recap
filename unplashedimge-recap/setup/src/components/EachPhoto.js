import React from 'react';

const EachPhoto = ({
  urls: {regular: url},
  likes,
  user: {
    username: name,
    portfolio_url: portfolio,
    profile_image: {medium: profile},
  },
}) => {
  return (
    <article className="photo">
      <img src={url} alt={name} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes}</p>
        </div>
        <a href={portfolio}>
          <img className="user-img" src={profile} alt={name} />
        </a>
      </div>
    </article>
  );
};

export default EachPhoto;
