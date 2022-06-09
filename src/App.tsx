import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "./components";
import {
  Main,
  CardPage,
  About,
  NoMatch,
  BasketPage,
  AccountPage,
  LoginPage,
} from "./pages/index";
import styles from "./App.module.css";
import { throttle } from "./helper";
import RequireAuth from "./hoc/RequireAuth";
import { fetchBeers } from "./store/reducers/beersReducer";
import { fetchUser } from "./store/reducers/userReducer";
import { combineReducersProps } from "./store/reducers";

export default function App(): JSX.Element {
  const { loading, page } = useSelector(
    (state: combineReducersProps) => state.beers
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBeers(page));
  }, [page]);

  useEffect(() => {
    dispatch({ type: "FETCH_BEERS" });
    dispatch(fetchUser());
  }, []);
  const onScroll = throttle((e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch({ type: "SET_BEERS_PAGE" });
    }
  }, 50);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
  useEffect(() => {
    if (page >= 78) {
      document.removeEventListener("scroll", onScroll);
    }
  }, [page, onScroll]);
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main isLoading={loading} />} />
          <Route path="beer/:id" element={<CardPage />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="basket"
            element={
              <RequireAuth>
                <BasketPage />
              </RequireAuth>
            }
          />
          <Route
            path="account"
            element={
              <RequireAuth>
                <AccountPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
