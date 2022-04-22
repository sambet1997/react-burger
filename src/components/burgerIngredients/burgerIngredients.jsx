import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";

const BurgerIngredients = ({ compound, setCompound }) => {
  function totalPrice(obj, key) {
    let fieldIterator = JSON.stringify(obj).matchAll(
      '(?<="' + key + '":)[0-9]*'
    );
    let it = fieldIterator.next(),
      result = 0;
    while (!it.done) {
      result += it.value[0] - 0;
      it = fieldIterator.next();
    }
    return result;
  }

  const handleDelete = (item) => () => {
    setCompound({
      buns: compound.buns,

      sauces: [...compound.sauces].filter(
        (ingredient) => ingredient.index !== item.index
      ),
      fillings: [...compound.fillings].filter(
        (ingredient) => ingredient.index !== item.index
      ),
    });
  };
  return (
    <div className={styles.container}>
      {!compound.buns._id &&
        !compound.sauces.length &&
        !compound.fillings.length && (
          <p className={`text text_type_main-large ${styles.noCompoundText}`}>
            Вы не выбрали ни одного ингредиента
          </p>
        )}
      {!!(
        compound.buns._id ||
        compound.sauces.length ||
        compound.fillings.length
      ) && (
        <>
          <div className={styles.constructorsContainer}>
            {compound && compound.buns && compound.buns._id && (
              <div className={styles.buns}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${compound.buns.name} (верх)`}
                  price={compound.buns.price / 2}
                  thumbnail={compound.buns.image}
                />
              </div>
            )}
            <div className={styles.fillings}>
              {[...compound.sauces, ...compound.fillings].map((item) => (
                <div className={styles.constructor} key={item.index}>
                  <div className="mr-2">
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={handleDelete(item)}
                  />
                </div>
              ))}
            </div>
            {compound && compound.buns && compound.buns._id && (
              <div className={styles.buns}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${compound.buns.name} (низ)`}
                  price={compound.buns.price / 2}
                  thumbnail={compound.buns.image}
                />
              </div>
            )}
          </div>
          <div className={styles.order}>
            <div className={styles.price}>
              <p className="text text_type_digits-medium mr-2">
                {totalPrice(compound, "price")}
              </p>
              <div className={styles.logo}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
            <Button type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

BurgerIngredients.defaultProps = {
  compound: {},
  setCompound: () => {},
};

BurgerIngredients.propTypes = {
  compound: PropTypes.instanceOf(Object).isRequired,
  setCompound: PropTypes.func.isRequired,
};

export default BurgerIngredients;
