import React, { DetailedHTMLProps, useContext } from "react";
import { Container, Card } from "../../components";
import Skeleton from "../../components/Skeleton/Skeleton";
import { Context } from "../../Context";
import styles from "./Main.module.css";
interface MainProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isLoading: boolean;
}
export function Main({ isLoading, ...props }: MainProps): JSX.Element {
  const { beers } = useContext(Context);
  return (
    <>
      <Container>
        <div className={styles.wrapper} {...props}>
          {isLoading
            ? [...new Array(6)].map((item, index) => {
                return <Skeleton key={index}></Skeleton>;
              })
            : beers.map((item) => {
                return <Card key={item.id} beer={item}></Card>;
              })}
        </div>
      </Container>
    </>
  );
}
