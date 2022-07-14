import React from 'react';
import BurgerIngredients from '../../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../../components/burgerConstructor/burgerConstructor';
import styles from './main.module.css';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from './types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

const Main = () => {
    const ingredients = useSelector((state) => state.data.ingredients);
    const compound = useSelector((state) => state.data.compound);
    return (
        <div className={styles.container}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients
                    compound={compound}
                    ingredients={ingredients}
                />
                {
                    <BurgerConstructor
                        compound={compound}
                        ingredients={ingredients}
                    />
                }
            </DndProvider>
        </div>
    );
};

Main.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes),
};

export default Main;
