import { DetailedHTMLProps, useEffect } from "react";
import { Button } from "../index";
import styles from "./ModalError.module.css";

interface ModalErrorProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  error: string;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalError({
  error,
  handleClose,
  ...props
}: ModalErrorProps): JSX.Element {
  useEffect(() => {
    const intervalId = setTimeout(() => {
      handleClose(false);
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className={styles.wrapper} {...props}>
      Упс, возникла ошибка:{error}
      <Button>Закрыть</Button>
    </div>
  );
}
