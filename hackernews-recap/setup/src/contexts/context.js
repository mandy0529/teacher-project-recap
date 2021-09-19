import React, {useContext, useEffect, useReducer} from 'react';

import {SET_STORIES, REMOVE_STORY, HANDLE_PAGE, HANDLE_SEARCH} from './actions';

import reducer, {initialState} from './reducer';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    const response = await fetch(
      `${API_ENDPOINT}query=${state.query}&page=${state.page}`
    );
    const data = await response.json();
    dispatch({
      type: SET_STORIES,
      payload: {hits: data.hits, nbPages: data.nbPages},
    });
  };

  const removeHits = (id) => {
    console.log('지우자');
    dispatch({type: REMOVE_STORY, payload: id});
  };

  const handleSearch = (query) => {
    dispatch({type: HANDLE_SEARCH, payload: query});
  };

  const handlePage = (page) => {
    dispatch({type: HANDLE_PAGE, payload: page});
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [state.query, state.page]);
  return (
    <AppContext.Provider
      value={{...state, removeHits, handleSearch, handlePage}}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
