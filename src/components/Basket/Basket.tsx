import { DetailedHTMLProps, useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { combineReducersProps } from "../../store/reducers";
import styles from "./Basket.module.css";
import { beers } from "../../types";

interface BasketProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function Basket({ ...props }: BasketProps): JSX.Element {
  const { BasketBeers } = useSelector(
    (state: combineReducersProps) => state.basketBeers
  );
  const [price, setPrice] = useState<number>(0);
  useEffect(() => {
    const newPrice = BasketBeers!
      .reduce((acc: number, item: beers) => {
        acc = acc + item.ph * item.count!;
        return acc;
      }, 0)
      .toFixed(1);

    setPrice(Number(newPrice));
  }, [BasketBeers]);
  return (
    <div className={styles.wrapper} {...props}>
      <Link to="basket">
        <FaShoppingBasket style={{ color: "#f8f9fa", height: "25px" }} />
      </Link>
      <span className={styles.text}>У вас {BasketBeers.length} товара</span>
      <span className={styles.text}>На сумму {price} долларов</span>
    </div>
  );
}
