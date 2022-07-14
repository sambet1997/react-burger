import React from 'react';
import styles from '../burgerConstructor/burgerConstructor.module.css';
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { setCompounds } from '../../store/slices/data';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const Constructor = ({ item, handleDelete, index }) => {
    const dispatch = useDispatch();
    const compound = useSelector((state) => state.data.compound);
    const [, dragRef] = useDrag({
        type: 'test',
        item: { id: item.sort_order },
    });
    const [{ is }, drop] = useDrop({
        accept: 'test',
        drop(dragObject) {
            let tmp = reorder(
                [...compound.sauces, ...compound.fillings].sort(
                    (a, b) => a.sort_order - b.sort_order
                ),
                dragObject.id - 1,
                index
            );
            tmp = tmp.map((i, index) => {
                return { ...i, sort_order: index + 1 };
            });
            dispatch(
                setCompounds({
                    buns: compound.buns,
                    sauces: tmp.filter((item) => item.type === 'sauce'),
                    fillings: tmp.filter((item) => item.type === 'main'),
                })
            );
        },
        collect: (monitor) => ({
            is: monitor.isOver(),
        }),
    });
    const background = is ? '#1C1C21' : 'transparent';

    return (
        <div ref={dragRef}>
            <div
                className={styles.constructor}
                ref={drop}
                style={{ background }}
            >
                <div className="mr-2">
                    <DragIcon type="primary" />
                </div>
                <div className={styles.middleConstructor}>
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        handleClose={handleDelete(item)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Constructor;
