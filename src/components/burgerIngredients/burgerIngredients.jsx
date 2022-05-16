import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef, useState } from "react";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../pages/main/types";
import IngredientDetails from "../burgerConstructor/ingredientDetails";

const BurgerIngredients = ({ ingredients, compound, setCompound }) => {
  const [current, setCurrent] = React.useState("one");
  const [data, setData] = React.useState([]);
  const buns = useRef(null);
  const sauces = useRef(null);
  const fillings = useRef(null);
  const offsetToTitle = 292; // heights: header + tabs + margins (можно и через скрипты посчитать, если что поправлю, пока адаптива нет)
  const [ingredientInfo, setIngredientInfo] = useState({});

  React.useEffect(() => {
    if (ingredients) {
      setData([
        {
          key: "buns",
          ref: buns,
          title: "Булки",
          data: ingredients.filter((item) => item.type === "bun"),
        },

        {
          key: "sauces",
          ref: sauces,
          title: "Соусы",
          data: ingredients.filter((item) => item.type === "sauce"),
        },

        {
          key: "fillings",
          ref: fillings,
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
    setIngredientInfo(currentIngredient);
    setModal(true);
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

  const onScrollHandler = (e) => {
    if (e.target.scrollTop < sauces.current.offsetTop - offsetToTitle) {
      setCurrent("one");
    }
    if (
      e.target.scrollTop >= sauces.current.offsetTop - offsetToTitle &&
      e.target.scrollTop < fillings.current.offsetTop - offsetToTitle
    ) {
      setCurrent("two");
    }
    if (e.target.scrollTop >= fillings.current.offsetTop - offsetToTitle) {
      setCurrent("three");
    }
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
  const [modal, setModal] = useState(false);

  return (
    <div className={styles.container}>
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={styles.tabPanel}>
        <a href="#buns">
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauces">
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#fillings">
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div onScroll={onScrollHandler} className={styles.ingredientsContainer}>
        {data.map((ingredients) => (
          <div key={ingredients.key}>
            <p
              id={ingredients.key}
              ref={ingredients.ref}
              className="text text_type_main-medium mb-6"
            >
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
          </div>
        ))}
      </div>
      <IngredientDetails
        ingredientInfo={ingredientInfo}
        isDetailsOpen={modal}
        handleClose={() => setModal(false)}
        title="Детали ингредиента"
      />
    </div>
  );
};

const compoundPropTypes = PropTypes.shape({
  buns: ingredientsPropTypes.isRequired,
  sauces: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
  fillings: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
});

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropTypes),
  compound: compoundPropTypes.isRequired,
  setCompound: PropTypes.func.isRequired,
};

export default BurgerIngredients;
