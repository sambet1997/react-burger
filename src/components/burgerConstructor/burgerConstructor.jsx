import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./burgerConstructor.module.css";
import PropTypes from "prop-types";

const BurgerConstructor = ({ ingredients, compound, setCompound }) => {
  const [current, setCurrent] = React.useState("one");
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (ingredients) {
      setData([
        {
          key: "buns",
          title: "Булки",
          data: ingredients.filter((item) => item.type === "bun"),
        },

        {
          key: "sauces",
          title: "Соусы",
          data: ingredients.filter((item) => item.type === "sauce"),
        },

        {
          key: "fillings",
          title: "Начинки",
          data: ingredients.filter((item) => item.type === "main"),
        },
      ]);
    }
  }, [ingredients]);

  React.useEffect(() => {
    setCompound(compound);
  }, [compound, setCompound]);

  const onClickHandler = (ingredients, currentIngredient) => () => {
    setCompound({
      ...compound,
      [ingredients.key]:
        ingredients.key === "buns"
          ? {
              ...currentIngredient,
              price: currentIngredient.price * 2,
            }
          : compound[ingredients.key].concat({
              ...currentIngredient,
              index: `${compound[ingredients.key].length}-${
                currentIngredient._id
              }`,
            }),
    });
  };

  const counter = (currentIngredient) => {
    if (
      currentIngredient.type === "bun" &&
      compound.buns._id === currentIngredient._id
    ) {
      return 1;
    }
    if (currentIngredient.type !== "bun") {
      return [...compound.sauces, ...compound.fillings].filter(
        (item) => item._id === currentIngredient._id
      ).length;
    }
    return 0;
  };

  return (
    <div className={styles.container}>
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={styles.tabPanel}>
        <a className={styles.tab} href="#buns">
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a className={styles.tab} href="#sauces">
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a className={styles.tab} href="#fillings">
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={styles.ingredientsContainer}>
        {data.map((ingredients, index) => (
          <React.Fragment key={index}>
            <p id={ingredients.key} className="text text_type_main-medium mb-6">
              {ingredients.title}
            </p>
            <div className={styles.wrap}>
              {ingredients.data.map((currentIngredient) => (
                <div
                  onClick={onClickHandler(ingredients, currentIngredient)}
                  className={styles.ingredient}
                  key={currentIngredient._id}
                >
                  <div className={styles.ingredientInfo}>
                    <Counter
                      count={counter(currentIngredient)}
                      size="default"
                    />
                    <img
                      alt={""}
                      className={styles.image}
                      src={currentIngredient.image}
                    />
                    <div className={styles.ingredientPrice}>
                      <p className="text text_type_digits-default mr-1">
                        {currentIngredient.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default">
                      {currentIngredient.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

BurgerConstructor.defaultProps = {
  ingredients: {},
  compound: {},
  setCompound: () => {},
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.instanceOf(Object).isRequired,
  compound: PropTypes.instanceOf(Object).isRequired,
  setCompound: PropTypes.func.isRequired,
};

export default BurgerConstructor;
