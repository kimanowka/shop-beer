import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "types-axios";
import { Layout } from "./components";
import { Main, CardPage, About, NoMatch, BasketPage } from "./pages/index";
import styles from "./App.module.css";
import { Context } from "./Context";
import { throttle } from "./helper";

const urlBeer = `https://api.punkapi.com/v2/beers?per_page=`;
const urlUser = `https://jsonplaceholder.typicode.com/users`;

export default function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countBeersOnPage, setCountBeersOnPage] = useState<number>(6);
  const { setBeers, setUsers, setErrorFromServer, setErrorStatusFromServer } =
    useContext(Context);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(urlBeer + `${countBeersOnPage}`)
        .then(({ data }) => {
          if (data) {
            setBeers(data);
            setIsLoading(false);
          } else {
            setIsLoading(true);
          }
        })
        .catch((e) => {
          setErrorFromServer(true);
          setErrorStatusFromServer(e.response.data.statusCode);
        });
    }, 500);
  }, [countBeersOnPage, setBeers]);

  useEffect(() => {
    axios.get(urlUser).then(({ data }) => {
      setUsers(data);
    });
  }, []);
  const onScroll = throttle((e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setCountBeersOnPage((prev) => prev + 6);
    }
  }, 50);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
  useEffect(() => {
    if (countBeersOnPage >= 78) {
      document.removeEventListener("scroll", onScroll);
    }
  }, [countBeersOnPage, onScroll]);
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main isLoading={isLoading} />} />
          <Route path="beer/:id" element={<CardPage />} />
          <Route path="about" element={<About />} />
          <Route path="basket" element={<BasketPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
