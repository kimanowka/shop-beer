import React, { DetailedHTMLProps } from "react";
import { useSelector } from "react-redux";

import styles from "./Main.module.css";
import { Container, Card } from "../../components";
import Skeleton from "../../components/Skeleton/Skeleton";
import { combineReducersProps } from "../../store/reducers";
import { beers } from "../../types";
interface MainProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isLoading: boolean;
}
export function Main({ isLoading, ...props }: MainProps): JSX.Element {
  const { beers, loading } = useSelector(
    (state: combineReducersProps) => state.beers
  );
  return (
    <>
      <Container>
        <div className={styles.wrapper} {...props}>
          {loading
            ? [...new Array(6)].map((_, index) => {
                return <Skeleton key={index}></Skeleton>;
              })
            : beers.map((item: beers) => {
                return <Card key={item.id} beer={item}></Card>;
              })}
        </div>
      </Container>
    </>
  );
}
