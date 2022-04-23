import React from "react";
import BurgerIngredients from "../../components/burgerIngredients/burgerIngredients";
import BurgerConstructor from "../../components/burgerConstructor/burgerConstructor";
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
      <BurgerIngredients
        compound={compound}
        setCompound={setCompound}
        ingredients={ingredients}
      />
      <BurgerConstructor
        compound={compound}
        setCompound={setCompound}
        ingredients={ingredients}
      />
    </div>
  );
};

Main.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default Main;
