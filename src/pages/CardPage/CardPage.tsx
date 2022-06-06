import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "types-axios";
import { Context } from "../../Context";
import { Button, Container, Loader } from "../../components/index";
import styles from "./CardPage.module.css";

export function CardPage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [beer, setBeer] = useState<any>({});
  const { addInBasket, isAuth, setVisibleModal } = useContext(Context);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(1);
  const [available, setAvailable] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      axios.get(`https://api.punkapi.com/v2/beers/${id}`).then((beer) => {
        if (beer.data) {
          setBeer(beer.data[0]);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      });
    }, 1500);
  }, [id]);
  useEffect(() => {
    beer.id % 2 === 0 ? setAvailable(true) : setAvailable(false);
  }, [beer]);

  return (
    <div>
      <Container>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <div className={styles.wrapper}>
            <div>
              <img
                src={beer.image_url}
                alt="beer"
                style={{ height: "600px", width: "275px" }}
              />
            </div>
            <div className={styles.left_side}>
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                className={styles.btn}
              >
                Назад
              </button>
              <h1>{beer.name}</h1>
              <span>
                <h3>{beer.description}</h3>
              </span>
              <span>
                <h4>Цена: {beer.ph} доллара</h4>
              </span>
              <input
                type="number"
                placeholder="Cколько угодно?"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCount(Number(e.currentTarget.value));
                }}
                className={styles.input}
              />
              {isAuth ? (
                <Button
                  type="button"
                  disabled={!available}
                  onClick={() => {
                    addInBasket(beer.id, count);
                  }}
                >
                  {available ? "Добавить в корзину" : "Нет в наличии"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    setVisibleModal(true);
                  }}
                >
                  Чтобы добавить товар в корзину залогинтесь
                </Button>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
