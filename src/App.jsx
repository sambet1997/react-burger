import React from "react";
import "./App.css";
import AppHeader from "./components/appHeader/appHeader";
import Main from "./pages/main/main";
import { data } from "./utils/data";

const App = () => {
  return (
    <div className="container">
      <AppHeader />
      <Main ingredients={data} />
    </div>
  );
};

export default App;
