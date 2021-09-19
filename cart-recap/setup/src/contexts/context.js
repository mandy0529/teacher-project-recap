import React, {useContext, useReducer, useEffect} from 'react';
import {AMOUNT, CAL, CLEAR, DATA, DEL} from '../components/action';
import reducer, {initialState} from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch({type: DATA, payload: data});
  };
  const clearCart = () => {
    dispatch({type: CLEAR});
  };

  const deleteItem = (id) => {
    dispatch({type: DEL, payload: id});
  };

  const plusMinusItem = (id, type) => {
    dispatch({type: AMOUNT, payload: {id, type}});
  };

  const calculatedItem = () => {
    dispatch({type: CAL});
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  useEffect(() => {
    calculatedItem();
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        deleteItem,
        plusMinusItem,
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
