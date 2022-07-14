import React, { useState } from 'react';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerConstructor.module.css';
import OrderDetails from './orderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setCompounds, setOrder, post } from '../../store/slices/data';
import { useDrop } from 'react-dnd';
import Constructor from '../constructor/constructor';

const EKey = {
    bun: 'buns',
    sauce: 'sauces',
    main: 'fillings',
};

const BurgerConstructor = () => {
    const ingredients = useSelector((state) => state.data.ingredients);
    const compound = useSelector((state) => state.data.compound);
    const [isOrder, setIsOrder] = useState(false);
    const dispatch = useDispatch();

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

    const handleDelete = (item) => (e) => {
        e.stopPropagation();
        e.preventDefault();
        let tmp = {
            buns: compound.buns,

            sauces: [...compound.sauces].filter(
                (ingredient) => ingredient.index !== item.index
            ),
            fillings: [...compound.fillings].filter(
                (ingredient) => ingredient.index !== item.index
            ),
        };
        tmp = {
            ...tmp,
            sauces: tmp.sauces.map((el) => {
                if (el.sort_order > item.sort_order) {
                    return { ...el, sort_order: el.sort_order - 1 };
                }
                return el;
            }),
            fillings: tmp.fillings.map((el) => {
                if (el.sort_order > item.sort_order) {
                    return { ...el, sort_order: el.sort_order - 1 };
                }
                return el;
            }),
        };
        console.log(tmp);
        dispatch(setCompounds(tmp));
    };
    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(itemId) {
            const currentIngredient = ingredients.find(
                (item) => item._id === itemId.id
            );
            dispatch(
                setCompounds({
                    ...compound,
                    [EKey[currentIngredient.type]]:
                        currentIngredient.type === 'bun'
                            ? {
                                  ...currentIngredient,
                                  price: currentIngredient.price * 2,
                              }
                            : compound[EKey[currentIngredient.type]].concat({
                                  ...currentIngredient,
                                  index: `${
                                      compound[EKey[currentIngredient.type]]
                                          .length
                                  }-${currentIngredient._id}`,
                                  sort_order:
                                      compound.sauces.length +
                                      compound.fillings.length +
                                      1,
                              }),
                })
            );
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });
    const borderColor = isHover ? 'lightgreen' : 'transparent';

    return (
        <div
            className={styles.container}
            ref={dropTarget}
            style={{ borderColor }}
        >
            {!compound.buns._id &&
                !compound.sauces.length &&
                !compound.fillings.length && (
                    <p
                        className={`text text_type_main-large ${styles.noCompoundText}`}
                    >
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
                            {[...compound.sauces, ...compound.fillings]
                                .sort((a, b) => a.sort_order - b.sort_order)
                                .map((item, index) => (
                                    <Constructor
                                        index={index}
                                        item={item}
                                        handleDelete={handleDelete}
                                        key={item.index} // Это составленный мною индекс, он и так уникален, строка 87.
                                    />
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
                                {totalPrice(compound, 'price')}
                            </p>
                            <div className={styles.logo}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => {
                                setIsOrder(true);
                                dispatch(
                                    setOrder(
                                        Math.floor(Math.random() * 1000000)
                                    )
                                );
                                dispatch(
                                    post({
                                        ingredients: Object.values(compound)
                                            .flat(1)
                                            .map((item) => item._id),
                                    })
                                );
                            }}
                        >
                            Оформить заказ
                        </Button>
                    </div>
                </>
            )}
            <OrderDetails
                isOrder={isOrder}
                handleClose={() => setIsOrder(false)}
            />
        </div>
    );
};

export default BurgerConstructor;
