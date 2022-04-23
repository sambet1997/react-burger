import React from "react";
import styles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import Main from "../../pages/main/main";
import { data } from "../../utils/data";

const App = () => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <Main ingredients={data} />
    </div>
  );
};

export default App;
