import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container } from "../../components";
import { combineReducersProps } from "../../store/reducers";
import styles from "./BasketPage.module.css";
import { beers } from "../../types";

export function BasketPage(): JSX.Element {
  const { BasketBeers } = useSelector(
    (state: combineReducersProps) => state.basketBeers
  );
  const dispatch = useDispatch();
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const newPrice = BasketBeers.reduce((acc: number, item: beers) => {
      acc = acc + item.ph * item.count!;
      return acc;
    }, 0).toFixed(1);

    setPrice(Number(newPrice));
  }, [BasketBeers]);

  return (
    <div className={styles.wrapper}>
      <Container>
        {BasketBeers.length < 1 ? (
          <div className={styles.text}>В вашей корзине нет товаров...</div>
        ) : (
          <div>
            <div className={styles.basket_content}>
              {BasketBeers.map((item: beers, index: number) => {
                return (
                  <div key={item.id} className={styles.beer_item}>
                    <span className={styles.text}>{index + 1}.</span>
                    <span className={styles.text}>{item.name}</span>
                    <span className={styles.text}>
                      {item.ph} доллара за 1 шт.
                    </span>
                    <span className={styles.text}>Кол-во: {item.count}</span>

                    <span className={styles.text}>
                      Общая сумма: {(item.ph * item.count!).toFixed(1)} долларов
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch({
                          type: "BASKET_BEERS_DELETE",
                          payload: item.id,
                        });
                      }}
                      className={styles.btn}
                    >
                      Удалить
                    </button>
                  </div>
                );
              })}
            </div>
            <div className={styles.price}> Всего: {price} долларов</div>
          </div>
        )}
      </Container>
    </div>
  );
}
