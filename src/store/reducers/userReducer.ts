import axios from "types-axios";
import { users } from "../../types";
interface usersReducerProps {
  users: users[];
  loading: boolean;
  error: string;
}
const initialState: usersReducerProps = {
  users: [],
  loading: false,
  error: "",
};
export const userReducer = (
  state = initialState,
  action: any
): usersReducerProps => {
  switch (action.type) {
    case "FETCH_USERS":
      return { ...state, loading: true, users: [] };
    case "FETCH_USERS_SUCCES":
      return { ...state, loading: false, users: action.payload };
    case "FETCH_USERS_ERROR":
      return { ...state, loading: false, error: action.payload, users: [] };
    default:
      return state;
  }
};

export const fetchUser = (): any => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "FETCH_USERS" });
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setTimeout(() => {
        dispatch({
          type: "FETCH_USERS_SUCCES",
          payload: response.data,
        });
      }, 500);
    } catch (e: any) {
      dispatch({
        type: "FETCH_USERS_ERROR",
        payload: e.response.data.statusCode,
      });
    }
  };
};
