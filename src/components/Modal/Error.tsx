import styles from "./Modal.module.css";

export default function Error(): JSX.Element {
  return <div className={styles.error}>Неверное имя или пароль</div>;
}
