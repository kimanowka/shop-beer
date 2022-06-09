import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { combineReducersProps } from "../../store/reducers";
import { Context } from "../../Context";
import { Modal, ModalError, NavBar } from "../index";
import styles from "./Layout.module.css";

export function Layout(): JSX.Element {
  const { visibleModal } = useContext(Context);
  const { error } = useSelector((state: combineReducersProps) => state.beers);

  return (
    <div className={styles.wrapper}>
      {visibleModal && <Modal />}
      <NavBar />
      <Outlet />
      {error && <ModalError />}
    </div>
  );
}
