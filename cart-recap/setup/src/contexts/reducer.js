import {AMOUNT, CAL, CLEAR, DATA, DEL, LOADING} from '../components/action';

export const initialState = {
  loading: true,
  cart: [],
  amount: 0,
  price: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true};

    case DATA:
      return {...state, loading: false, cart: action.payload};

    case CLEAR:
      return {...state, cart: []};

    case DEL:
      const deletedItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {...state, cart: deletedItem};

    case AMOUNT:
      const amountedItem = state.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            return action.payload.type === 'inc'
              ? {...item, amount: item.amount + 1}
              : {...item, amount: item.amount - 1};
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return {...state, cart: amountedItem};

    case CAL:
      const {price, amount} = state.cart.reduce(
        (total, item) => {
          const {price, amount} = item;
          total.amount += amount;
          total.price += price * amount;
          return total;
        },
        {
          price: 0,
          amount: 0,
        }
      );
      const fixedPrice = price.toFixed(2);
      return {...state, amount, price: fixedPrice};

    default:
      throw new Error('no match any types');
  }
};

export default reducer;
