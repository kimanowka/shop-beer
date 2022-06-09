import React, {
  DetailedHTMLProps,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Context } from "../../Context";
import { beers } from "../../types";
import { Button } from "../index";
import styles from "./Card.module.css";

interface CardProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  beer: beers;
}
export function Card({ beer, ...props }: CardProps): JSX.Element {
  const { isAuth, setVisibleModal } = useContext(Context);
  const [available, setAvailable] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    beer.id % 2 === 0 ? setAvailable(true) : setAvailable(false);
  }, [beer]);
  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.right_side}>
        <img
          src={beer.image_url}
          alt="beer"
          style={{ height: "170px", width: "60px" }}
        />
      </div>
      <div className={styles.left_side}>
        <Link to={`beer/${beer.id}`}>
          <h4>{beer.name}</h4>
        </Link>
        <span>Стоимость: {beer.ph} доллара</span>
        {isAuth ? (
          <Button
            type="button"
            disabled={!available}
            onClick={() => {
              dispatch({
                type: "BASKET_BEERS_ADD",
                payload: { item: beer, count: 1 },
              });
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
  );
}
