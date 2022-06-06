import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components";
import styles from "./NoMatch.module.css";
export function NoMatch(): JSX.Element {
  const navigate = useNavigate();
  const [time, setTime] = useState<number>(5);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  return (
    <>
      <Container>
        <div className={styles.wrapper}>
          <h1>
            Что-то пошло не так. Данной страницы не существует... <br />
            Через {time} секунд вы перейдете на главную страницу
          </h1>
        </div>
      </Container>
    </>
  );
}
