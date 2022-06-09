import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Container } from "../Container/Container";
import { Basket } from "../index";
import { useContext } from "react";
import { Context } from "../../Context";

export function NavBar(): JSX.Element {
  const { setVisibleModal, isAuth, setIsAuth } = useContext(Context);
  return (
    <div className={styles.wrapper}>
      <div>
        {isAuth ? (
          <button
            type="button"
            onClick={() => {
              setIsAuth(false);
            }}
            className={styles.btn}
          >
            Выход
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setVisibleModal(true);
            }}
            className={styles.btn}
          >
            Авторизоваться
          </button>
        )}
      </div>

      <Container>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Главная</NavLink>
            </li>
            <li>
              <NavLink to="about">О нас</NavLink>
            </li>
            <li>
              <NavLink to="account">Аккаунт</NavLink>
            </li>
          </ul>
        </nav>
      </Container>
      <div>{isAuth && <Basket />}</div>
    </div>
  );
}
