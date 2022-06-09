import { beers } from "../../types";

export interface BasketBeersReducerProps {
  BasketBeers: beers[];
  count: number;
}

const initialState: BasketBeersReducerProps = {
  BasketBeers: [],
  count: 1,
};
export const basketBeersReducer = (
  state = initialState,
  action: any
): BasketBeersReducerProps => {
  switch (action.type) {
    case "BASKET_BEERS_ADD":
      let newCart = null;
      const itemIndex = state.BasketBeers.findIndex(
        (value) => value.id === action.payload.item.id
      );
      if (itemIndex < 0) {
        const newItem = {
          ...action.payload.item,
          count: action.payload.count,
        };
        newCart = [...state.BasketBeers, newItem];
      } else {
        const newItem = {
          ...state.BasketBeers[itemIndex],
          count: state.BasketBeers[itemIndex].count + action.payload.count,
        };
        newCart = [...state.BasketBeers];
        newCart.splice(itemIndex, 1, newItem);
      }
      return {
        ...state,
        BasketBeers: newCart,
      };
    case "BASKET_BEERS_DELETE":
      return {
        ...state,
        BasketBeers: state.BasketBeers.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
