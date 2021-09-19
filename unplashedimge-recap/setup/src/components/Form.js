import React from 'react';
import {useGlobalContext} from '../contexts/context';
import {FaSearch} from 'react-icons/fa';
import {AiOutlineHome} from 'react-icons/ai';

const SearchForm = () => {
  const {handleSubmit, handleChange, query} = useGlobalContext();

  return (
    <section className="search">
      <form className="search-form">
        <h2>
          <a href="/">
            <AiOutlineHome />
          </a>
        </h2>
        <input
          type="text"
          className="form-input"
          onChange={handleChange}
          placeholder="search movies"
          value={query}
        />
        <button className="submit-btn" onClick={handleSubmit}>
          <FaSearch />
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
