import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Context } from "../../Context";
import { Modal, ModalError, NavBar } from "../index";
import styles from "./Layout.module.css";
export function Layout(): JSX.Element {
  const {
    visibleModal,
    errorFromServer,
    setErrorFromServer,
    errorStatusFromServer,
  } = useContext(Context);

  return (
    <div className={styles.wrapper}>
      {visibleModal && <Modal />}
      <NavBar />
      <Outlet />
      {errorFromServer && (
        <ModalError
          error={errorStatusFromServer}
          onClick={() => {
            setErrorFromServer(false);
          }}
          handleClose={setErrorFromServer}
        />
      )}
    </div>
  );
}
