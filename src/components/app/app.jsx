import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import Main from "../../pages/main/main";

const api = `https://norma.nomoreparties.space/api/ingredients`;

const App = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const getData = async () => {
    try {
      const res = await fetch(api);
      if (!res.ok) {
        // кстати удивлен, что свойство ок есть, не видел никогда, спасибо за инфу :)
        // но на работе я все это и так в сервисах проверяю, не знаю почему тут не проверил)
        setIsError(true);
        throw new Error("Ответ сети был не ok.");
      }
      const value = await res.json();
      if (value.success) {
        setData(value.data);
      }
    } catch (err) {
      setIsError(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      {isError && (
        <p className={`text text_type_main-large ${styles.noContent}`}>
          Межгалактическая ошибка, обновите страницу
        </p>
      )}
      {!isError && (
        <>
          <AppHeader />
          <Main ingredients={data} />
        </>
      )}
    </div>
  );
};

export default App;
