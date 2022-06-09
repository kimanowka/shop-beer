import React, { useState } from "react";
interface ContextProvidresProps {
  children: React.ReactNode;
}
interface ContextProps {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  visibleModal: boolean;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Context = React.createContext<ContextProps>({
  isAuth: false,
  setIsAuth: () => {},
  visibleModal: false,
  setVisibleModal: () => {},
});

export const ContextProvider = ({ children }: ContextProvidresProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
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
