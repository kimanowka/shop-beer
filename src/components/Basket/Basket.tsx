import { DetailedHTMLProps, useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import styles from "./Basket.module.css";
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";

interface BasketProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function Basket({ ...props }: BasketProps): JSX.Element {
  const { basketBeers } = useContext(Context);
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
    <div className={styles.wrapper} {...props}>
      <Link to="basket">
        <FaShoppingBasket style={{ color: "#f8f9fa", height: "25px" }} />
      </Link>
      <span>У вас {basketBeers.length} товара</span>
      <span>На сумму {price} долларов</span>
    </div>
  );
}
