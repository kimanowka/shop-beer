import { DetailedHTMLProps, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { combineReducersProps } from "../../store/reducers";
import { Button } from "../index";
import styles from "./ModalError.module.css";

interface ModalErrorProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function ModalError({ ...props }: ModalErrorProps): JSX.Element {
  const { error } = useSelector((state: combineReducersProps) => state.beers);

  const dispatch = useDispatch();
  useEffect(() => {
    const intervalId = setTimeout(() => {
      dispatch({ type: "HIDE_MODAL_ERROR" });
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className={styles.wrapper} {...props}>
      Упс, возникла ошибка:{error}
      <Button
        onClick={() => {
          dispatch({ type: "HIDE_MODAL_ERROR" });
        }}
      >
        Закрыть
      </Button>
    </div>
  );
}
