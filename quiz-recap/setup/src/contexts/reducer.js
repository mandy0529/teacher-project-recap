import {
  ALERT,
  CHOOSE_QUIZ,
  CLOSE_MODAL,
  GET_DATA,
  HANDLE_INDEX,
  HANDLE_SCORE,
  LOADING,
  OPEN_MODAL,
  WAITING,
} from './action';

export const initialState = {
  waiting: true,
  loading: false,
  modal: false,
  questions: [],
  index: 0,
  score: 0,
  alert: {show: false, msg: ''},
  quiz: {
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true, waiting: false};

    case WAITING:
      return {...state, loading: false, waiting: true};

    case GET_DATA:
      return {
        ...state,
        loading: false,
        waiting: false,
        modal: false,
        questions: action.payload,
      };

    case ALERT:
      return {
        ...state,
        alert: {show: true, msg: 'no matched your condition. please try again'},
      };

    case OPEN_MODAL:
      return {...state, modal: true};

    case CLOSE_MODAL:
      return {...state, modal: false, waiting: true, score: 0, index: 0};

    case HANDLE_INDEX:
      return {...state, index: action.payload};

    case HANDLE_SCORE:
      return {...state, score: action.payload};

    case CHOOSE_QUIZ:
      return {
        ...state,
        quiz: {...state.quiz, [action.payload.name]: action.payload.value},
      };

    default:
      throw new Error('no match any types you entered');
  }
};

export default reducer;
