import axios from "types-axios";
import { beers } from "../../types";

interface cardBeerReducerProps {
  beer: beers | any;
  loading: boolean;
  error: string;
}

const initialState: cardBeerReducerProps = {
  beer: {},
  loading: false,
  error: "",
};
export const cardBeerReducer = (
  state = initialState,
  action: any
): cardBeerReducerProps => {
  switch (action.type) {
    case "FETCH_CARDBEER":
      return { ...state, loading: true };
    case "FETCH_CARDBEER_SUCCES":
      return { ...state, loading: false, beer: action.payload };
    case "FETCH_CARDBEER_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fetchBeersCard = (id: number): any => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "FETCH_CARDBEER" });
      const response = await axios.get(
        `https://api.punkapi.com/v2/beers/${id}`
      );
      setTimeout(() => {
        dispatch({
          type: "FETCH_CARDBEER_SUCCES",
          payload: response.data[0],
        });
      }, 500);
    } catch (e) {
      dispatch({
        type: "FETCH_CARDBEER_ERROR",
        payload: "Произошла ошибка при загрузке списка дел",
      });
    }
  };
};
