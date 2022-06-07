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
        acc = acc + item.ph * item.count!;
        return acc;
      }, 0)
      .toFixed(1);

    setPrice(Number(newPrice));
  }, [basketBeers]);

  return (
    <div className={styles.wrapper}>
      <Container>
        {basketBeers.length < 1 ? (
          <div className={styles.text}>В вашей корзине нет товаров...</div>
        ) : (
          <div>
            <div className={styles.basket_content}>
              {basketBeers.map((item, index) => {
                return (
                  <div key={item.id} className={styles.beer_item}>
                    <span className={styles.text}>{index + 1}.</span>
                    <span className={styles.text}>{item.name}</span>
                    <span className={styles.text}>
                      {(item.ph * item.count!).toFixed(1)} доллара
                    </span>
                    <span className={styles.text}>Кол-во: {item.count}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        deleteBeerFromBasket(Number(item.id));
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
