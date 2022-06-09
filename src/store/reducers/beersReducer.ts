import axios from "types-axios";
import { beers } from "../../types";
interface beersReducerProps {
  beers: beers[];
  loading: boolean;
  error: string;
  page: number;
}

const initialState: beersReducerProps = {
  beers: [],
  loading: false,
  error: "",
  page: 6,
};
export const beersReducer = (
  state = initialState,
  action: any
): beersReducerProps => {
  switch (action.type) {
    case "FETCH_BEERS":
      return { ...state, loading: true };
    case "FETCH_BEERS_SUCCES":
      return { ...state, loading: false, beers: action.payload };
    case "FETCH_BEERS_ERROR":
      return { ...state, loading: true, error: action.payload };
    case "SET_BEERS_PAGE":
      return { ...state, page: state.page + 6 };
    case "HIDE_MODAL_ERROR":
      return { ...state, loading: true, error: "" };
    default:
      return state;
  }
};

export const fetchBeers = (page = 6): any => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        `https://api.punkapi.com/v2/beers?per_page=${page}`
      );
      setTimeout(() => {
        dispatch({
          type: "FETCH_BEERS_SUCCES",
          payload: response.data,
        });
      }, 500);
    } catch (e: any) {
      dispatch({
        type: "FETCH_BEERS_ERROR",
        payload: e.response.data.statusCode,
      });
    }
  };
};
