import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../Context";

export default function RequireAuth({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { isAuth } = useContext(Context);
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
