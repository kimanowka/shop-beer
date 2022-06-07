import React, { useCallback, useState } from "react";
import { beers, users } from "./types";
interface ContextProvidresProps {
  children: React.ReactNode;
}
interface ContextProps {
  beers: beers[];
  setBeers: React.Dispatch<React.SetStateAction<beers[]>>;
  basketBeers: beers[];
  setBasketBeers: React.Dispatch<React.SetStateAction<beers[]>>;
  users: users[];
  setUsers: React.Dispatch<React.SetStateAction<users[]>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  visibleModal: boolean;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  addInBasket: (item: number, count: number) => void;
  deleteBeerFromBasket: (item: number) => void;
  errorFromServer: boolean;
  setErrorFromServer: React.Dispatch<React.SetStateAction<boolean>>;
  errorStatusFromServer: string;
  setErrorStatusFromServer: React.Dispatch<React.SetStateAction<string>>;
}
export const Context = React.createContext<ContextProps>({
  beers: [],
  setBeers: () => {},
  basketBeers: [],
  setBasketBeers: () => {},
  users: [],
  setUsers: () => {},
  isAuth: false,
  setIsAuth: () => {},
  addInBasket: () => {},
  visibleModal: false,
  setVisibleModal: () => {},
  deleteBeerFromBasket: () => {},
  errorFromServer: false,
  setErrorFromServer: () => {},
  errorStatusFromServer: "",
  setErrorStatusFromServer: () => {},
});

export const ContextProvider = ({ children }: ContextProvidresProps) => {
  const [beers, setBeers] = useState<beers[]>([]);
  const [basketBeers, setBasketBeers] = useState<beers[]>([]);
  const [users, setUsers] = useState<users[]>([]);
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [errorFromServer, setErrorFromServer] = useState<boolean>(false);
  const [errorStatusFromServer, setErrorStatusFromServer] =
    useState<string>("");

  const addInBasket = useCallback(
    (id: number, count: number) => {
      const newBeer: beers = beers[id - 1];

      const itemIndex = basketBeers.findIndex(
        (value) => value.id === newBeer.id
      );

      if (itemIndex < 0) {
        const newItem = {
          ...newBeer,
          count: count,
        };
        setBasketBeers([...basketBeers, newItem]);
      } else {
        const newItem = {
          ...basketBeers[itemIndex],
          count: basketBeers[itemIndex].count! + count,
        };
        const newCart = basketBeers.slice();
        newCart.splice(itemIndex, 1, newItem);
        setBasketBeers(newCart);
      }
    },
    [basketBeers, beers]
  );
  const deleteBeerFromBasket = (id: number) => {
    setBasketBeers((prev) =>
      prev.filter((item) => {
        return item.id !== id;
      })
    );
  };
  return (
    <Context.Provider
      value={{
        errorFromServer,
        setErrorFromServer,
        errorStatusFromServer,
        setErrorStatusFromServer,
        beers,
        setBeers,
        users,
        setUsers,
        addInBasket,
        basketBeers,
        setBasketBeers,
        deleteBeerFromBasket,
        isAuth,
        setIsAuth,
        visibleModal,
        setVisibleModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};
