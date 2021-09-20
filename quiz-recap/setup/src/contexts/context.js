import axios from 'axios';
import React, {useContext, useReducer} from 'react';
import {
  ALERT,
  CHOOSE_QUIZ,
  CLOSE_MODAL,
  GET_DATA,
  HANDLE_INDEX,
  HANDLE_SCORE,
  OPEN_MODAL,
  WAITING,
} from './action';
import reducer, {initialState} from './reducer';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const conditionUrl =
  'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (url) => {
    dispatch({type: WAITING});
    try {
      const {
        data: {results},
      } = await axios(url);
      if (results) {
        dispatch({
          type: GET_DATA,
          payload: results,
        });
      } else {
        dispatch({
          type: WAITING,
        });
        dispatch({type: ALERT});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    dispatch({type: OPEN_MODAL});
  };
  const handleCloseModal = () => {
    dispatch({type: CLOSE_MODAL});
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({type: CHOOSE_QUIZ, payload: {name, value}});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {amount, category, difficulty} = state.quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchData(url);
  };

  const handleIndex = () => {
    let nextIndex = state.index + 1;
    if (nextIndex > state.questions.length - 1) {
      handleOpenModal();
      return 0;
    }
    dispatch({type: HANDLE_INDEX, payload: nextIndex});
  };

  const handleScore = (value) => {
    if (value) {
      let nextScore = state.score + 1;
      dispatch({type: HANDLE_SCORE, payload: nextScore});
    }
    handleIndex();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleOpenModal,
        handleCloseModal,
        handleChange,
        handleSubmit,
        handleIndex,
        handleScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export {AppContext, AppProvider};
