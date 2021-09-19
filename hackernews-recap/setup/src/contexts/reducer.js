import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

export const initialState = {
  loading: true,
  hits: [],
  nbPages: 0,
  page: 0,
  query: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {...state, loading: true};

    case SET_STORIES:
      return {
        ...state,
        loading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };

    case REMOVE_STORY:
      const removedItem = state.hits.filter(
        (item) => item.objectID !== action.payload
      );
      return {...state, hits: removedItem};

    case HANDLE_SEARCH:
      return {...state, query: action.payload, page: 0};

    case HANDLE_PAGE:
      let nextPage = state.page + 1;
      let prevPage = state.page - 1;
      if (nextPage > state.nbPages - 1) {
        nextPage = 0;
      }
      if (prevPage < 0) {
        prevPage = state.nbPages - 1;
      }
      return action.payload === 'inc'
        ? {...state, page: nextPage}
        : {...state, page: prevPage};

    default:
      throw new Error('no matched any types');
  }
};
export default reducer;
