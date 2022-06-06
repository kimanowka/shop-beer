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
});

export const ContextProvider = ({ children }: ContextProvidresProps) => {
  const [beers, setBeers] = useState<beers[]>([]);
  const [basketBeers, setBasketBeers] = useState<beers[]>([]);
  const [users, setUsers] = useState<users[]>([]);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const addInBasket = useCallback(
    (id: number, count: number) => {
      const newBeerArray = [];
      const newBeer = beers[id - 1];

      for (let i = 0; i < count; i++) {
        newBeerArray.push(newBeer);
      }
      setBasketBeers([...newBeerArray, ...basketBeers]);
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
