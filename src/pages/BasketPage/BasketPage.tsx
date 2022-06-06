import { useContext, useEffect, useState } from "react";
import { Container } from "../../components";
import { Context } from "../../Context";
import styles from "./BasketPage.module.css";
export function BasketPage(): JSX.Element {
  const { basketBeers, deleteBeerFromBasket } = useContext(Context);
  const [price, setPrice] = useState<number>(0);
  useEffect(() => {
    const newPrice = basketBeers
      .reduce((acc: number, item) => {
        acc = acc + item.ph;
        return acc;
      }, 0)
      .toFixed(1);

    setPrice(Number(newPrice));
  }, [basketBeers]);
  useEffect(() => {}, []);
  return (
    <div className={styles.wrapper}>
      <Container>
        {basketBeers.length < 1 ? (
          <div className={styles.text}>В вашей корзине нет товаров...</div>
        ) : (
          <div>
            <div className={styles.basket}>
              {basketBeers.map((item) => {
                return (
                  <div key={item.id} className={styles.beer_item}>
                    <span>{item.name}</span>
                    <span>{item.ph} доллара</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        deleteBeerFromBasket(Number(item.id));
                      }}
                      className={styles.btn}
                    >
                      Х
                    </button>
                  </div>
                );
              })}
            </div>
            <hr />
            Всего: {price} долларов
          </div>
        )}
      </Container>
    </div>
  );
}
