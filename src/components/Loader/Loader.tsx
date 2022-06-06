import styles from "./Loader.module.css";

export function Loader(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.loader}>Loading...</h1>
    </div>
  );
}
