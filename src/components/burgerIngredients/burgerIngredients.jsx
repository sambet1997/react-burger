import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef, useState } from 'react';
import styles from './burgerIngredients.module.css';
import IngredientDetails from '../burgerConstructor/ingredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import {
    removeIngredientsInfo,
    setCompounds,
    setIngredientsInfo,
} from '../../store/slices/data';
import Ingredient from '../ingredient/ingredient';

const BurgerIngredients = () => {
    const ingredients = useSelector((state) => state.data.ingredients);
    const compound = useSelector((state) => state.data.compound);
    const dispatch = useDispatch();
    const [current, setCurrent] = React.useState('one');
    const [data, setData] = React.useState([]);
    const buns = useRef(null);
    const sauces = useRef(null);
    const fillings = useRef(null);
    const offsetToTitle = 292;
    const [ingredientInfo, setIngredientInfo] = useState({});

    React.useEffect(() => {
        if (ingredients) {
            setData([
                {
                    key: 'buns',
                    ref: buns,
                    title: 'Булки',
                    data: ingredients.filter((item) => item.type === 'bun'),
                },

                {
                    key: 'sauces',
                    ref: sauces,
                    title: 'Соусы',
                    data: ingredients.filter((item) => item.type === 'sauce'),
                },

                {
                    key: 'fillings',
                    ref: fillings,
                    title: 'Начинки',
                    data: ingredients.filter((item) => item.type === 'main'),
                },
            ]);
        }
    }, [ingredients]);

    React.useEffect(() => {
        dispatch(setCompounds(compound));
    }, [compound, dispatch]);

    const onClickHandler = (ingredients, currentIngredient) => () => {
        setIngredientInfo(currentIngredient);
        dispatch(setIngredientsInfo(currentIngredient));
        setModal(true);
    };

    const onScrollHandler = (e) => {
        if (e.target.scrollTop < sauces.current.offsetTop - offsetToTitle) {
            setCurrent('one');
        }
        if (
            e.target.scrollTop >= sauces.current.offsetTop - offsetToTitle &&
            e.target.scrollTop < fillings.current.offsetTop - offsetToTitle
        ) {
            setCurrent('two');
        }
        if (e.target.scrollTop >= fillings.current.offsetTop - offsetToTitle) {
            setCurrent('three');
        }
    };

    const counter = (currentIngredient) => {
        if (
            currentIngredient.type === 'bun' &&
            compound.buns._id === currentIngredient._id
        ) {
            return 1;
        }
        if (currentIngredient.type !== 'bun') {
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
                    <Tab
                        value="one"
                        active={current === 'one'}
                        onClick={setCurrent}
                    >
                        Булки
                    </Tab>
                </a>
                <a href="#sauces">
                    <Tab
                        value="two"
                        active={current === 'two'}
                        onClick={setCurrent}
                    >
                        Соусы
                    </Tab>
                </a>
                <a href="#fillings">
                    <Tab
                        value="three"
                        active={current === 'three'}
                        onClick={setCurrent}
                    >
                        Начинки
                    </Tab>
                </a>
            </div>
            <div
                onScroll={onScrollHandler}
                className={styles.ingredientsContainer}
            >
                {data.map((item) => (
                    <div key={item.key}>
                        <p
                            id={item.key}
                            ref={item.ref}
                            className="text text_type_main-medium mb-6"
                        >
                            {item.title}
                        </p>
                        <div className={styles.wrap}>
                            {item.data.map((currentIngredient) => (
                                <Ingredient
                                    key={currentIngredient._id}
                                    counter={counter}
                                    onClickHandler={onClickHandler}
                                    ingredients={item}
                                    currentIngredient={currentIngredient}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <IngredientDetails
                ingredientInfo={ingredientInfo}
                isDetailsOpen={modal}
                handleClose={() => {
                    setModal(false);
                    dispatch(removeIngredientsInfo());
                }}
                title="Детали ингредиента"
            />
        </div>
    );
};

export default BurgerIngredients;
