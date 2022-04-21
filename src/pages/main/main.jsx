import React from "react";
import BurgerConstructor from "../../components/burgerConstructor/burgerConstructor";
import BurgerIngredients from "../../components/burgerIngredients/burgerIngredients";
import styles from "./main.module.css";
import PropTypes from "prop-types";

const Main = ({ ingredients }) => {
  const [compound, setCompound] = React.useState({
    buns: {},
    sauces: [],
    fillings: [],
  });
  return (
    <div className={styles.container}>
      <BurgerConstructor
        compound={compound}
        setCompound={setCompound}
        ingredients={ingredients}
      />
      <BurgerIngredients
        compound={compound}
        setCompound={setCompound}
        ingredients={ingredients}
      />
    </div>
  );
};
Main.propTypes = {
  ingredients: PropTypes.array,
};

export default Main;
