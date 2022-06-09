import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, Input, Error } from "../../components";
import { Context } from "../../Context";
import { users } from "./../../types";
import { combineReducersProps } from "../../store/reducers";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const { setVisibleModal, setIsAuth } = useContext(Context);
  const [name, setName] = useState<string>("");
  const [nameBlur, setNameBlur] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordBlur, setPasswordBlur] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { users } = useSelector((state: combineReducersProps) => state.users);

  const handleSignIn = () => {
    if (name.length < 1) {
      setNameError("Поле обязательно для заполнения");
    } else {
      setNameError("");
    }
    if (password.length < 1) {
      setPasswordError("Поле обязательно для заполнения");
    } else {
      setPasswordError("");
    }
    let allBlur: boolean = false;
    let allRight: boolean = false;
    let nameRight: boolean = false;
    let passwordRight: boolean = false;
    if (nameBlur && passwordBlur) {
      allBlur = true;
    } else {
      allBlur = false;
    }
    if (nameError === "" && passwordError === "") {
      allRight = true;
    } else {
      allRight = false;
    }
    const arr = users.filter((item: users) => {
      return item.username === name && item.address.zipcode === password;
    });
    if (arr.length < 1) {
      nameRight = false;
      passwordRight = false;
    } else {
      nameRight = true;
      passwordRight = true;
    }

    nameRight || passwordRight
      ? setError("")
      : setError("Неверное имя или пароль");

    if (allRight && allBlur && nameRight && passwordRight) {
      setIsAuth(true);
      setVisibleModal(false);
      navigate("/");
    } else {
      setIsAuth(false);
    }
  };
  useEffect(() => {
    if (nameBlur && name.length < 3) {
      setNameError("Поле обязательно для заполнения");
    } else {
      setNameError("");
    }
  }, [nameBlur, name.length]);
  useEffect(() => {
    if (passwordBlur && password.length < 7) {
      setPasswordError("Пароль должен быть больше 7 символов");
    } else {
      setPasswordError("");
    }
  }, [password.length, passwordBlur]);
  const handleReset = () => {
    setName("");
    setNameBlur(false);
    setNameError("");
    setPassword("");
    setPasswordBlur(false);
    setPasswordError("");
    setError("");
  };
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.modal}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
        }}
      >
        <Input
          label="Имя"
          type="text"
          placeholder="Введите имя"
          name="name"
          value={name}
          error={nameError}
          onBlur={() => setNameBlur(true)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.currentTarget.value.trim());
          }}
        />
        <Input
          label="Пароль"
          type="text"
          placeholder="Введите пароль"
          name="password"
          value={password}
          error={passwordError}
          onBlur={() => setPasswordBlur(true)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value.trim());
          }}
        />
        {error && <Error>неправильное имя или пароль</Error>}
        <div>
          <Button type="button" onClick={handleSignIn}>
            Войти
          </Button>
          <Button type="button" onClick={handleReset}>
            Очистить
          </Button>
        </div>
      </div>
    </div>
  );
}
