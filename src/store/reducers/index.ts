import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { beersReducer } from "./beersReducer";
import { basketBeersReducer } from "./basketBeersReducer";
import { cardBeerReducer } from "./cardBeerReducer";
import { beers, users } from "../../types";

export interface combineReducersProps {
  basketBeers: {
    BasketBeers: beers[];
    count: number;
  };
  beers: {
    beers: beers[];
    loading: boolean;
    error: string;
    page: number;
  };
  cardBeer: {
    beer: beers;
    loading: boolean;
    error: string;
  };
  users: {
    users: users[];
    loading: boolean;
    error: string;
  };
}

export const rootReducer = combineReducers<combineReducersProps>({
  users: userReducer,
  beers: beersReducer,
  basketBeers: basketBeersReducer,
  cardBeer: cardBeerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
