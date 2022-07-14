import React from 'react';
import styles from '../burgerIngredients/burgerIngredients.module.css';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../pages/main/types';
import { useDrag } from 'react-dnd';

const Ingredient = ({
    onClickHandler,
    ingredients,
    currentIngredient,
    counter,
}) => {
    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { id: currentIngredient._id },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });
    return (
        <div
            onClick={onClickHandler(ingredients, currentIngredient)}
            className={styles.ingredient}
            key={currentIngredient._id}
            ref={dragRef}
            style={{ opacity }}
        >
            <div className={styles.ingredientInfo}>
                <Counter count={counter(currentIngredient)} size="default" />
                <img
                    alt={''}
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
    );
};

const ingredientPropTypes = PropTypes.shape({
    data: PropTypes.arrayOf(ingredientsPropTypes),
    key: PropTypes.string,
    ref: PropTypes.any,
    title: PropTypes.string,
});

Ingredient.propTypes = {
    ingredients: ingredientPropTypes.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    counter: PropTypes.func.isRequired,
    currentIngredient: ingredientsPropTypes.isRequired,
};

export default Ingredient;
