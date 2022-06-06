import { Outlet } from "react-router-dom";
import { NavBar } from "../index";
import styles from "./Layout.module.css";
export function Layout(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <NavBar />
      <Outlet />
    </div>
  );
}
