import React from 'react';
import BurgerIngredients from '../../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../../components/burgerConstructor/burgerConstructor';
import styles from './main.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Main = () => {
    return (
        <div className={styles.container}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </div>
    );
};

export default Main;
