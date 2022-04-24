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
