import axios from 'axios';
import React, {useState, useContext} from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const url = '';
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  });

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    try {
      const {
        data: {results},
      } = await axios(url);
      if (results) {
        // const results = response.data.results;
        if (results.length > 0) {
          setQuestions(results);
          setLoading(false);
          setWaiting(false);
          setError(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else {
        setWaiting(true);
      }
    } catch {
      throw new Error('');
    } finally {
      setLoading(false);
      setWaiting(false);
    }
  };

  const handleIndex = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        handleModalOpen();
        return 0;
      } else {
        return index;
      }
    });
  };

  const handleScore = (value) => {
    if (value) {
      setScore((oldScore) => {
        return oldScore + 1;
      });
    }
    handleIndex();
  };

  const handleModalOpen = () => {
    setModal(true);
  };
  const handleModalClose = () => {
    setWaiting(true);
    setScore(0);
    setModal(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({...quiz, [name]: value});
  };

  const handleSubmit = (e) => {
    console.log('무야호');
    e.preventDefault();
    const {amount, category, difficulty} = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        index,
        score,
        questions,
        error,
        handleIndex,
        handleScore,
        handleModalOpen,
        handleModalClose,
        modal,
        handleChange,
        handleSubmit,
        quiz,
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
