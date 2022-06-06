import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "types-axios";

import { Layout, Modal, ModalError } from "./components";
import { Main, CardPage, About, NoMatch, BasketPage } from "./pages/index";
import styles from "./App.module.css";
import { Context } from "./Context";

export default function App(): JSX.Element {
  const { setBeers, setUsers, visibleModal } = useContext(Context);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorFromServer, setErrorFromServer] = useState<boolean>(false);
  const [errorStatusFromServer, setErrorStatusFromServer] =
    useState<string>("");
  useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://api.punkapi.com/v2/beers")
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
    }, 1000);
  }, []);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then(({ data }) => {
      setUsers(data);
    });
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        {visibleModal && <Modal />}
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
      {errorFromServer && (
        <ModalError
          error={errorStatusFromServer}
          onClick={() => {
            setErrorFromServer(false);
          }}
          handleClose={setErrorFromServer}
        />
      )}
    </>
  );
}
